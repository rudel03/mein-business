// Tests für den Vertrags-Worker: Paddle-Signatur, Lizenzformat (mit app/public/js/lizenz.js geprüft),
// Kündigung/Widerruf mit gemocktem fetch und KV. Aufruf: node --test test/  (aus server/)
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { neuesPaar, signiere } from '../../app/tools/lizenz.mjs';
import worker, { pruefePaddleSignatur, signiereLizenz } from '../vertrag-worker.js';

const paar = neuesPaar();
const { CONFIG } = await import('../../app/public/js/config.js');
CONFIG.lizenzSchluessel = paar.oeffentlich;
const { pruefeLizenz } = await import('../../app/public/js/lizenz.js');

const SECRET = 'pdl_ntfset_test_geheim';
const ORIGIN = 'https://tellerkontor.de';

function neuesKV() {
  const m = new Map();
  return { m, get: async (k) => (m.has(k) ? m.get(k) : null), put: async (k, v) => { m.set(k, v); }, delete: async (k) => { m.delete(k); } };
}

let env, aufrufe, antworten;
beforeEach(() => {
  env = {
    VERTRAG_KV: neuesKV(), PADDLE_WEBHOOK_SECRET: SECRET, PADDLE_API_KEY: 'pdl_test', PADDLE_UMGEBUNG: 'sandbox',
    LIZENZ_PRIVAT: paar.privat, MAIL_ANBIETER: 'postmark', MAIL_TOKEN: 'pm', MAIL_ABSENDER: 'plus@tellerkontor.de',
    INHABER_EMAIL: 'inhaber@tellerkontor.de', ERLAUBTE_ORIGIN: ORIGIN, SEITE_URL: ORIGIN, KULANZ_TAGE: '3',
  };
  aufrufe = [];
  antworten = {}; // Pfad (ohne Host) → data
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(url);
    aufrufe.push({ url: String(url), method: init.method || 'GET', body: init.body ? JSON.parse(init.body) : null });
    if (u.host === 'api.postmarkapp.com') return new Response('{"ErrorCode":0}', { status: 200 });
    const pfad = u.pathname + u.search;
    if (pfad in antworten) return new Response(JSON.stringify({ data: antworten[pfad] }), { status: 200 });
    return new Response('{"error":"nicht gemockt"}', { status: 404 });
  };
});

const mails = () => aufrufe.filter((a) => a.url.includes('postmark')).map((a) => a.body);

function webhookAnfrage(ereignis, { secret = SECRET, ts = Math.floor(Date.now() / 1000), roh } = {}) {
  const body = roh ?? JSON.stringify(ereignis);
  const h1 = createHmac('sha256', secret).update(`${ts}:${body}`).digest('hex');
  return new Request('https://vertrag.example/paddle-webhook', { method: 'POST', headers: { 'Paddle-Signature': `ts=${ts};h1=${h1}` }, body });
}

function formAnfrage(pfad, daten, origin = ORIGIN) {
  return new Request(`https://vertrag.example${pfad}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin, 'CF-Connecting-IP': '203.0.113.7' }, body: JSON.stringify(daten),
  });
}

// ---------- Signatur ----------

test('Paddle-Signatur: richtig, falsches Secret, veränderter Body, zu alt', async () => {
  const body = '{"event_type":"x"}'; const ts = Math.floor(Date.now() / 1000);
  const h1 = createHmac('sha256', SECRET).update(`${ts}:${body}`).digest('hex');
  assert.equal(await pruefePaddleSignatur(`ts=${ts};h1=${h1}`, body, SECRET), true);
  assert.equal(await pruefePaddleSignatur(`ts=${ts};h1=${h1}`, body, 'anderes'), false);
  assert.equal(await pruefePaddleSignatur(`ts=${ts};h1=${h1}`, body + ' ', SECRET), false);
  assert.equal(await pruefePaddleSignatur(`ts=${ts};h1=${h1}`, body, SECRET, (ts + 3600) * 1000), false);
  assert.equal(await pruefePaddleSignatur(`ts=${ts};h1=00;h1=${h1}`, body, SECRET), true, 'mehrere h1 bei Secret-Wechsel');
  assert.equal(await pruefePaddleSignatur(null, body, SECRET), false);
});

test('Webhook mit falscher Signatur → 401, keine Mail', async () => {
  const r = await worker.fetch(webhookAnfrage({ event_type: 'transaction.completed' }, { secret: 'falsch' }), env);
  assert.equal(r.status, 401);
  assert.equal(mails().length, 0);
});

// ---------- Lizenz ----------

test('Worker-Schlüssel hat dasselbe Format wie tools/lizenz.mjs und besteht lizenz.js', async () => {
  const s = await signiereLizenz(paar.privat, { id: 'txn_1', art: 'jahr', bis: '2099-12-31' });
  assert.equal(s, signiere(paar.privat, 'jahr', '2099-12-31', 'txn_1')); // Ed25519 ist deterministisch
  const r = await pruefeLizenz(s);
  assert.equal(r.ok, true);
  assert.deepEqual(r.info, { id: 'txn_1', art: 'jahr', bis: '2099-12-31' });
});

test('Privater Schlüssel auch als JWK', async () => {
  const { createPrivateKey } = await import('node:crypto');
  const jwk = createPrivateKey({ key: Buffer.from(paar.privat, 'base64'), format: 'der', type: 'pkcs8' }).export({ format: 'jwk' });
  const s = await signiereLizenz(JSON.stringify(jwk), { id: 'a', art: 'monat', bis: '2099-01-01' });
  assert.equal((await pruefeLizenz(s)).ok, true);
});

test('transaction.completed (Pass) → Schlüssel 3 Monate per Mail, doppeltes Ereignis nur einmal', async () => {
  antworten['/customers/ctm_01'] = { id: 'ctm_01', email: 'kunde@example.de' };
  const ereignis = {
    event_id: 'evt_01', event_type: 'transaction.completed',
    data: { id: 'txn_01pass', customer_id: 'ctm_01', subscription_id: null, items: [{ price: { id: 'pri_pass', custom_data: { tarif: 'pass' } } }] },
  };
  const r = await worker.fetch(webhookAnfrage(ereignis), env);
  assert.equal(r.status, 200);
  const m = mails();
  assert.equal(m.length, 1);
  assert.equal(m[0].To, 'kunde@example.de');
  const schluessel = m[0].TextBody.match(/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]{80,}/)[0];
  const p = await pruefeLizenz(schluessel);
  assert.equal(p.ok, true);
  assert.equal(p.info.art, 'pass');
  assert.equal(p.info.id, 'txn_01pass');
  const erwartet = new Date(); erwartet.setUTCMonth(erwartet.getUTCMonth() + 3);
  assert.ok(Math.abs(new Date(p.info.bis) - erwartet) < 4 * 86400000);

  await worker.fetch(webhookAnfrage(ereignis), env);
  assert.equal(mails().length, 1, 'gleiche event_id nicht erneut');
});

test('Abo: Kauf und Verlängerung → je ein Schlüssel bis Periodenende + Kulanz; subscription.updated doppelt nicht', async () => {
  antworten['/customers/ctm_02'] = { id: 'ctm_02', email: 'abo@example.de' };
  env.PADDLE_PREISE = JSON.stringify({ pri_jahr: 'jahr' });
  const kauf = { event_id: 'evt_a', event_type: 'transaction.completed', data: { id: 'txn_02abc', customer_id: 'ctm_02', subscription_id: 'sub_02', billing_period: { starts_at: '2026-10-29T10:00:00Z', ends_at: '2027-10-29T10:00:00Z' }, items: [{ price: { id: 'pri_jahr' } }] } };
  await worker.fetch(webhookAnfrage(kauf), env);
  const verl = { event_id: 'evt_b', event_type: 'transaction.completed', data: { ...kauf.data, id: 'txn_03def', billing_period: { starts_at: '2027-10-29T10:00:00Z', ends_at: '2028-10-29T10:00:00Z' } } };
  await worker.fetch(webhookAnfrage(verl), env);
  const upd = { event_id: 'evt_c', event_type: 'subscription.updated', data: { id: 'sub_02', status: 'active', customer_id: 'ctm_02', current_billing_period: verl.data.billing_period, items: [{ price: { id: 'pri_jahr' } }] } };
  await worker.fetch(webhookAnfrage(upd), env);
  const m = mails();
  assert.equal(m.length, 2);
  const bis = await Promise.all(m.map(async (x) => (await pruefeLizenz(x.TextBody.match(/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]{80,}/)[0])).info.bis));
  assert.deepEqual(bis, ['2027-11-01', '2028-11-01']);
});

test('Unbekannter Tarif → 500 (Paddle wiederholt), keine Mail', async () => {
  const e = { event_id: 'evt_x', event_type: 'transaction.completed', data: { id: 'txn_x', customer_id: 'ctm_01', items: [{ price: { id: 'pri_unbekannt' } }] } };
  const r = await worker.fetch(webhookAnfrage(e), env);
  assert.equal(r.status, 500);
  assert.equal(mails().length, 0);
  assert.equal(await env.VERTRAG_KV.get('ereignis:evt_x'), null);
});

// ---------- Kündigung / Widerruf (Format wie js/seiten.js) ----------

const kuendigung = { art: 'ordentlich', name: 'Erika Muster', email: 'Abo@Example.de', vertrag: 'Plus Jahr', zum: '', typ: 'kuendigung', zeitpunktEingang: '2026-10-29T12:00:00.000Z' };

function paddleAbo() {
  antworten['/customers?email=abo%40example.de'] = [{ id: 'ctm_02', email: 'abo@example.de' }];
  antworten['/subscriptions?customer_id=ctm_02&status=active,trialing,past_due'] = [{ id: 'sub_02' }];
  antworten['/subscriptions/sub_02'] = { id: 'sub_02', status: 'active', customer_id: 'ctm_02', current_billing_period: { ends_at: '2027-10-29T10:00:00Z' }, scheduled_change: null };
  antworten['/customers/ctm_02'] = { id: 'ctm_02', email: 'abo@example.de' };
  antworten['/subscriptions/sub_02/cancel'] = { id: 'sub_02', scheduled_change: { action: 'cancel', effective_at: '2027-10-29T10:00:00Z' } };
}

test('Kündigung über /vertrag (config.vertragEndpoint): gespeichert, Paddle vorgemerkt, zwei Mails', async () => {
  paddleAbo();
  const r = await worker.fetch(formAnfrage('/vertrag', kuendigung), env);
  assert.equal(r.status, 200);
  assert.equal(r.headers.get('Access-Control-Allow-Origin'), ORIGIN);
  const a = await r.json();
  assert.equal(a.ok, true);
  assert.match(a.referenz, /^K-/);
  const gespeichert = [...env.VERTRAG_KV.m.entries()].find(([k]) => k.startsWith('eingang:kuendigung:'));
  const e = JSON.parse(gespeichert[1]);
  assert.equal(e.name, 'Erika Muster');
  assert.equal(e.paddle.automatisch, true);
  const cancel = aufrufe.find((x) => x.url.endsWith('/subscriptions/sub_02/cancel'));
  assert.deepEqual(cancel.body, { effective_from: 'next_billing_period' });
  const [kunde, inhaber] = mails();
  assert.equal(kunde.To, 'Abo@Example.de');
  assert.match(kunde.TextBody, /Eingang: .*2026/);
  assert.match(kunde.TextBody, /endet am 29\.10\.2027/);
  assert.equal(inhaber.To, 'inhaber@tellerkontor.de');
  assert.doesNotMatch(inhaber.Subject, /HANDELN/);
});

test('Kündigung nicht eindeutig (zwei Abos) → nicht bei Paddle, Inhaber soll handeln', async () => {
  paddleAbo();
  antworten['/subscriptions?customer_id=ctm_02&status=active,trialing,past_due'] = [{ id: 'sub_02' }, { id: 'sub_03' }];
  const r = await worker.fetch(formAnfrage('/kuendigen', { ...kuendigung, typ: undefined }), env);
  assert.equal(r.status, 200);
  assert.equal(aufrufe.some((x) => x.url.includes('/cancel')), false);
  const [kunde, inhaber] = mails();
  assert.match(kunde.TextBody, /innerhalb von zwei Werktagen/);
  assert.match(inhaber.Subject, /^HANDELN/);
});

test('Kündigung mit fremder sub_-Nummer (E-Mail passt nicht) → manuell', async () => {
  paddleAbo();
  antworten['/subscriptions/sub_09abcdefghij'] = { id: 'sub_09abcdefghij', status: 'active', customer_id: 'ctm_09', current_billing_period: { ends_at: '2027-10-29T10:00:00Z' } };
  antworten['/customers/ctm_09'] = { id: 'ctm_09', email: 'jemand.anders@example.de' };
  await worker.fetch(formAnfrage('/vertrag', { ...kuendigung, vertrag: 'Plus Jahr sub_09abcdefghij' }), env);
  assert.equal(aufrufe.some((x) => x.url.includes('/cancel')), false);
  assert.match(mails()[1].TextBody, /E-Mail passt nicht/);
});

test('Widerruf: gespeichert, Bestätigung, keine Paddle-Aktion, fremde Felder verworfen', async () => {
  const r = await worker.fetch(formAnfrage('/widerrufen', { name: 'Max M', email: 'max@example.de', vertrag: 'Plus Monat', bestellt: '2026-10-25', typ: 'widerruf', allergien: 'Nüsse', kcal: '2600' }), env);
  assert.equal(r.status, 200);
  assert.equal(aufrufe.some((x) => x.url.includes('paddle.com')), false);
  const [, wert] = [...env.VERTRAG_KV.m.entries()].find(([k]) => k.startsWith('eingang:widerruf:'));
  assert.equal(wert.includes('Nüsse'), false);
  assert.equal(wert.includes('2600'), false);
  const [kunde, inhaber] = mails();
  assert.match(kunde.Subject, /Widerruf/);
  assert.match(kunde.TextBody, /Bestellt am: 25\.10\.2026/);
  assert.match(inhaber.Subject, /^HANDELN: Widerruf/);
});

test('Fremde Origin → 403, OPTIONS für eigene Origin → 204', async () => {
  const r = await worker.fetch(formAnfrage('/vertrag', kuendigung, 'https://boese.example'), env);
  assert.equal(r.status, 403);
  const o = await worker.fetch(new Request('https://vertrag.example/vertrag', { method: 'OPTIONS', headers: { Origin: ORIGIN } }), env);
  assert.equal(o.status, 204);
  assert.equal(o.headers.get('Access-Control-Allow-Origin'), ORIGIN);
});

test('Pflichtfelder fehlen → 400; Rate-Limit greift', async () => {
  const r = await worker.fetch(formAnfrage('/vertrag', { ...kuendigung, email: 'kaputt' }), env);
  assert.equal(r.status, 400);
  env.RATE_LIMIT_STUNDE = '2';
  env.PADDLE_API_KEY = '';
  await worker.fetch(formAnfrage('/vertrag', kuendigung), env); // zweite Anfrage dieser Stunde
  const zuviel = await worker.fetch(formAnfrage('/vertrag', kuendigung), env);
  assert.equal(zuviel.status, 429);
});
