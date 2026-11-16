// Vertrags-Worker (Cloudflare Workers, ES-Module, keine Abhängigkeiten). VORLAGE – vor dem Einsatz prüfen lassen (README.md).
//
//   POST /paddle-webhook   Paddle Billing → Lizenzschlüssel (Ed25519, Format wie tools/lizenz.mjs) per Mail an den Käufer
//   POST /kuendigen        Kündigung ohne Login (§ 312k BGB) → speichern, Eingangsbestätigung, Inhaber, Paddle vormerken
//   POST /widerrufen       Widerruf (§ 356a BGB) → speichern, Eingangsbestätigung, Inhaber (Erstattung macht der Inhaber)
//   POST /vertrag          wie oben, Art aus Feld „typ“ (so sendet js/seiten.js an config.vertragEndpoint)
//
// Bindings/Variablen: siehe wrangler.toml.beispiel. Secrets: PADDLE_WEBHOOK_SECRET, PADDLE_API_KEY, LIZENZ_PRIVAT, MAIL_TOKEN.
// Gesundheitsdaten (Allergien, Ziele, Makros) kommen hier nie an: nur die Felder aus FELDER werden angenommen.

const LAUFZEIT_MONATE = { monat: 1, jahr: 12, pass: 3, saison: 6 };
const FELDER = { name: 200, email: 254, vertrag: 500, art: 20, grund: 2000, zum: 10, bestellt: 10, zeitpunktEingang: 40 };
const TEXT = new TextEncoder();

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    try {
      if (url.pathname === '/paddle-webhook' && request.method === 'POST') return await paddleWebhook(request, env);
      const typ = { '/kuendigen': 'kuendigung', '/widerrufen': 'widerruf', '/vertrag': null, '/': null }[url.pathname];
      if (typ !== undefined) {
        const cors = corsKoepfe(request, env);
        if (request.method === 'OPTIONS') return new Response(null, { status: cors ? 204 : 403, headers: cors || {} });
        if (request.method === 'POST') {
          if (!cors) return json({ ok: false, fehler: 'Herkunft nicht erlaubt' }, 403);
          return await vertragseingang(request, env, typ, cors);
        }
        if (request.method === 'GET' && url.pathname === '/') return new Response('ok', { headers: { 'Content-Type': 'text/plain' } });
      }
      return json({ ok: false, fehler: 'Nicht gefunden' }, 404);
    } catch (e) {
      console.error('Fehler', url.pathname, e && e.stack || e);
      return json({ ok: false, fehler: 'Interner Fehler' }, 500);
    }
  },
};

// ---------- Hilfen ----------

function json(daten, status = 200, koepfe = {}) {
  return new Response(JSON.stringify(daten), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...koepfe } });
}

const b64url = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64bytes = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/').replace(/\s+/g, '')), (c) => c.charCodeAt(0));
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

function gleich(a, b) { // zeitkonstanter Vergleich
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

function datum(d) { return d.toISOString().slice(0, 10); }
function plusMonate(d, n) {
  const r = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, d.getUTCDate()));
  if (r.getUTCDate() !== d.getUTCDate()) r.setUTCDate(0); // 31.01. + 1 Monat → 28./29.02.
  return r;
}
function plusTage(d, n) { return new Date(d.getTime() + n * 86400000); }
function deDatum(iso) { return iso ? iso.slice(0, 10).split('-').reverse().join('.') : ''; }
function deZeit(iso) {
  return new Date(iso).toLocaleString('de-DE', { timeZone: 'Europe/Berlin', dateStyle: 'full', timeStyle: 'medium' }) + ' (deutsche Zeit)';
}

// ---------- Paddle ----------

export async function pruefePaddleSignatur(kopf, rohtext, secret, jetzt = Date.now(), toleranzSek = 300) {
  if (!kopf || !secret) return false;
  const teile = Object.create(null); const h1 = [];
  for (const t of kopf.split(';')) {
    const [k, v] = t.split('=');
    if (k === 'h1') h1.push((v || '').trim()); else teile[(k || '').trim()] = (v || '').trim();
  }
  const ts = Number(teile.ts);
  if (!ts || !h1.length || Math.abs(jetzt / 1000 - ts) > toleranzSek) return false;
  const key = await crypto.subtle.importKey('raw', TEXT.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const soll = hex(await crypto.subtle.sign('HMAC', key, TEXT.encode(`${teile.ts}:${rohtext}`)));
  return h1.some((h) => gleich(h, soll)); // mehrere h1 bei Secret-Wechsel
}

function paddleBasis(env) {
  return env.PADDLE_UMGEBUNG === 'live' ? 'https://api.paddle.com' : 'https://sandbox-api.paddle.com';
}
async function paddle(env, pfad, init = {}) {
  const r = await fetch(paddleBasis(env) + pfad, {
    ...init, headers: { Authorization: `Bearer ${env.PADDLE_API_KEY}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  if (!r.ok) throw new Error(`Paddle ${pfad}: ${r.status} ${(await r.text()).slice(0, 300)}`);
  return (await r.json()).data;
}

// Tarif aus price.custom_data.tarif (in Paddle beim Preis eintragen) oder aus PADDLE_PREISE = {"pri_…":"jahr", …}
function tarifAus(items, env) {
  let karte = {};
  try { karte = JSON.parse(env.PADDLE_PREISE || '{}'); } catch { /* leer */ }
  for (const it of items || []) {
    const p = it.price || {};
    const t = p.custom_data?.tarif || karte[p.id];
    if (LAUFZEIT_MONATE[t]) return t;
  }
  return null;
}

async function kundenEmail(env, kundeId, data) {
  if (env.PADDLE_API_KEY && kundeId) return (await paddle(env, `/customers/${kundeId}`)).email;
  return data.custom_data?.email || null; // nur für wrangler dev ohne API-Schlüssel
}

async function paddleWebhook(request, env) {
  const roh = await request.text();
  if (!(await pruefePaddleSignatur(request.headers.get('Paddle-Signature'), roh, env.PADDLE_WEBHOOK_SECRET))) {
    return json({ ok: false, fehler: 'Signatur ungültig' }, 401);
  }
  const ereignis = JSON.parse(roh);
  const kv = env.VERTRAG_KV;
  const eid = ereignis.event_id || ereignis.notification_id;
  if (eid && await kv.get(`ereignis:${eid}`)) return json({ ok: true, doppelt: true });

  const d = ereignis.data || {};
  let ergebnis = { ok: true, ignoriert: ereignis.event_type };
  if (ereignis.event_type === 'transaction.completed') {
    const art = tarifAus(d.items, env);
    if (!art) throw new Error(`Tarif für Transaktion ${d.id} unbekannt (price.custom_data.tarif oder PADDLE_PREISE)`);
    ergebnis = await lizenzAusstellen(env, {
      art, kundeId: d.customer_id, aboId: d.subscription_id || null, transaktion: d.id,
      periodeEnde: d.subscription_id ? d.billing_period?.ends_at : null, data: d,
    });
  } else if (ereignis.event_type === 'subscription.updated' && ['active', 'trialing'].includes(d.status) && d.current_billing_period?.ends_at) {
    // Verlängerung: neue Abrechnungsperiode → neuer Schlüssel (doppelte Ausstellung verhindert der Periodenschlüssel)
    const art = tarifAus(d.items, env);
    if (art) ergebnis = await lizenzAusstellen(env, { art, kundeId: d.customer_id, aboId: d.id, transaktion: null, periodeEnde: d.current_billing_period.ends_at, data: d });
  }
  if (eid) await kv.put(`ereignis:${eid}`, '1', { expirationTtl: 60 * 60 * 24 * 30 });
  return json(ergebnis);
}

async function lizenzAusstellen(env, { art, kundeId, aboId, transaktion, periodeEnde, data }) {
  const kv = env.VERTRAG_KV;
  const kulanz = Number(env.KULANZ_TAGE ?? 3); // Puffer, bis der Folgeschlüssel ankommt
  const bis = periodeEnde
    ? datum(plusTage(new Date(periodeEnde), kulanz))
    : datum(plusMonate(new Date(), LAUFZEIT_MONATE[art]));
  const merker = aboId ? `lizenz:${aboId}:${bis}` : `lizenz:${transaktion}`;
  if (await kv.get(merker)) return { ok: true, doppelt: true };

  const id = transaktion || `${aboId}-${bis}`;
  const schluessel = await signiereLizenz(env.LIZENZ_PRIVAT, { id, art, bis });
  const email = await kundenEmail(env, kundeId, data);
  if (!email) throw new Error(`Keine E-Mail für Kunde ${kundeId}`);

  const seite = (env.SEITE_URL || '').replace(/\/$/, '');
  const name = env.ABSENDER_NAME || 'Tellerkontor';
  await sendeMail(env, {
    an: email,
    betreff: `Dein Plus-Zugang (${art}) – Lizenzschlüssel`,
    text: [
      'Hallo,', '', 'danke für deinen Kauf. Hier ist dein Lizenzschlüssel für Plus:', '', schluessel, '',
      `Gültig bis: ${deDatum(bis)}`, aboId ? 'Bei jeder Verlängerung deines Abos bekommst du automatisch einen neuen Schlüssel.' : 'Der Zugang endet automatisch, es gibt keine Verlängerung.', '',
      'So schaltest du Plus frei:', `1. Öffne ${seite}/preise.html`, '2. Kopiere den ganzen Schlüssel in das Feld „Dein Lizenzschlüssel aus der E-Mail“.', '3. Tippe auf „Plus freischalten“.', '',
      `Lizenznummer (für Rückfragen und Kündigung): ${id}`,
      `Kündigen ohne Login: ${seite}/kuendigen.html`, '', `Viele Grüße`, name,
    ].join('\n'),
  });
  const eintrag = { id, art, bis, aboId, kundeId, transaktion, email: email.toLowerCase(), am: new Date().toISOString() };
  const ttl = { expirationTtl: 60 * 60 * 24 * 365 * 3 };
  await kv.put(merker, JSON.stringify(eintrag), ttl);
  await kv.put(`lizenzid:${id}`, JSON.stringify(eintrag), ttl); // Zuordnung Lizenznummer → Abo für Kündigungen
  return { ok: true, lizenz: id, bis };
}

// ---------- Lizenzschlüssel ----------

async function privaterSchluessel(privat) {
  const s = String(privat || '').trim();
  if (!s) throw new Error('LIZENZ_PRIVAT fehlt');
  if (s.startsWith('{')) return crypto.subtle.importKey('jwk', JSON.parse(s), { name: 'Ed25519' }, false, ['sign']);
  return crypto.subtle.importKey('pkcs8', b64bytes(s), { name: 'Ed25519' }, false, ['sign']); // Base64 aus tools/lizenz.mjs neu
}

// Gleiches Format wie tools/lizenz.mjs: base64url(JSON{id,art,bis}).base64url(Signatur über den ersten Teil)
export async function signiereLizenz(privat, { id, art, bis }) {
  const daten = b64url(TEXT.encode(JSON.stringify({ id, art, bis })));
  const sig = await crypto.subtle.sign({ name: 'Ed25519' }, await privaterSchluessel(privat), TEXT.encode(daten));
  return `${daten}.${b64url(sig)}`;
}

// ---------- Mail ----------
// MAIL_ANBIETER: postmark | brevo | generisch | log (nur Konsole, für wrangler dev)

export async function sendeMail(env, { an, betreff, text, antwortAn }) {
  const von = env.MAIL_ABSENDER; const name = env.ABSENDER_NAME || 'Tellerkontor';
  const anbieter = env.MAIL_ANBIETER || 'log';
  let url, koepfe, body;
  if (anbieter === 'log') { console.log(`[Mail an ${an}] ${betreff}\n${text}`); return; }
  if (anbieter === 'postmark') {
    url = 'https://api.postmarkapp.com/email';
    koepfe = { 'X-Postmark-Server-Token': env.MAIL_TOKEN, Accept: 'application/json' };
    body = { From: `${name} <${von}>`, To: an, Subject: betreff, TextBody: text, ReplyTo: antwortAn || undefined, MessageStream: env.MAIL_STREAM || 'outbound' };
  } else if (anbieter === 'brevo') {
    url = 'https://api.brevo.com/v3/smtp/email';
    koepfe = { 'api-key': env.MAIL_TOKEN, Accept: 'application/json' };
    body = { sender: { email: von, name }, to: [{ email: an }], subject: betreff, textContent: text, replyTo: antwortAn ? { email: antwortAn } : undefined };
  } else {
    url = env.MAIL_URL;
    koepfe = { Authorization: `Bearer ${env.MAIL_TOKEN}` };
    body = { from: von, fromName: name, to: an, subject: betreff, text, replyTo: antwortAn };
  }
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...koepfe }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`Mail (${anbieter}) ${r.status}: ${(await r.text()).slice(0, 300)}`);
}

// ---------- Kündigung und Widerruf ----------

function corsKoepfe(request, env) {
  const erlaubt = String(env.ERLAUBTE_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
  const origin = request.headers.get('Origin');
  if (!origin || !erlaubt.includes(origin)) return null;
  return { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400', Vary: 'Origin' };
}

async function rateLimit(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unbekannt';
  const stunde = new Date().toISOString().slice(0, 13);
  const kurz = hex(await crypto.subtle.digest('SHA-256', TEXT.encode(`${ip}|${stunde}`))).slice(0, 24); // IP nicht im Klartext speichern
  const schluessel = `rl:${kurz}`;
  const n = Number(await env.VERTRAG_KV.get(schluessel)) || 0;
  if (n >= Number(env.RATE_LIMIT_STUNDE || 10)) return false;
  await env.VERTRAG_KV.put(schluessel, String(n + 1), { expirationTtl: 3600 });
  return true;
}

async function formular(request) {
  const art = request.headers.get('Content-Type') || '';
  const roh = art.includes('application/json') ? await request.json() : Object.fromEntries(await request.formData());
  const d = {};
  for (const [k, max] of Object.entries(FELDER)) if (roh[k] != null) d[k] = String(roh[k]).trim().slice(0, max);
  return { daten: d, typ: roh.typ };
}

async function vertragseingang(request, env, pfadTyp, cors) {
  if (!(await rateLimit(request, env))) return json({ ok: false, fehler: 'Zu viele Anfragen. Bitte später erneut oder per E-Mail.' }, 429, cors);
  let daten, typ;
  try { ({ daten, typ } = await formular(request)); } catch { return json({ ok: false, fehler: 'Formular nicht lesbar' }, 400, cors); }
  typ = pfadTyp || typ;
  if (!['kuendigung', 'widerruf'].includes(typ)) return json({ ok: false, fehler: 'Unbekannte Art' }, 400, cors);
  if (!daten.name || !daten.vertrag || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(daten.email || '')) {
    return json({ ok: false, fehler: 'Bitte Name, E-Mail und Vertrag angeben.' }, 400, cors);
  }
  if (typ === 'widerruf') { delete daten.art; delete daten.grund; delete daten.zum; } else delete daten.bestellt;

  const eingang = new Date().toISOString(); // maßgeblich ist die Serverzeit; zeitpunktEingang ist die Browserzeit
  const referenz = `${typ === 'kuendigung' ? 'K' : 'W'}-${eingang.slice(0, 10).replace(/-/g, '')}-${crypto.randomUUID().slice(0, 8)}`;
  const eintrag = { referenz, typ, eingang, ...daten };
  const kv = env.VERTRAG_KV;
  const ttl = { expirationTtl: 60 * 60 * 24 * Number(env.AUFBEWAHRUNG_TAGE || 1095) }; // Nachweis (Verjährung 3 Jahre)
  await kv.put(`eingang:${typ}:${eingang}:${referenz}`, JSON.stringify(eintrag), ttl);

  let paddleStand = { automatisch: false, grund: typ === 'widerruf' ? 'Widerruf: Erstattung und Beendigung bitte in Paddle selbst auslösen.' : '' };
  if (typ === 'kuendigung') {
    try { paddleStand = await kuendigungVormerken(env, daten); } catch (e) { paddleStand = { automatisch: false, grund: `Paddle-Fehler: ${e.message}` }; }
    eintrag.paddle = paddleStand;
    await kv.put(`eingang:${typ}:${eingang}:${referenz}`, JSON.stringify(eintrag), ttl);
  }

  await sendeMail(env, { an: daten.email, betreff: bestaetigungBetreff(typ, referenz), text: bestaetigungText(env, eintrag, paddleStand), antwortAn: env.INHABER_EMAIL });
  await sendeMail(env, {
    an: env.INHABER_EMAIL,
    betreff: `${paddleStand.automatisch ? '' : 'HANDELN: '}${typ === 'kuendigung' ? 'Kündigung' : 'Widerruf'} ${referenz}`,
    text: [
      `Eingang: ${deZeit(eingang)}`, `Art: ${typ}`, ...Object.entries(daten).map(([k, v]) => `${k}: ${v}`), '',
      paddleStand.automatisch ? `Bei Paddle vorgemerkt: Abo ${paddleStand.aboId} endet am ${deDatum(paddleStand.endetAm)}.` : `Manuell bearbeiten: ${paddleStand.grund}`,
    ].join('\n'),
    antwortAn: daten.email,
  });
  return json({ ok: true, referenz, eingang }, 200, cors);
}

function bestaetigungBetreff(typ, referenz) {
  return typ === 'kuendigung' ? `Eingangsbestätigung deiner Kündigung (${referenz})` : `Eingangsbestätigung deines Widerrufs (${referenz})`;
}

// Textform-Bestätigung: Inhalt, Datum und Uhrzeit des Eingangs, bei Kündigung der Zeitpunkt der Beendigung (§ 312k Abs. 4 BGB)
function bestaetigungText(env, e, p) {
  const name = env.ABSENDER_NAME || 'Tellerkontor';
  const zeilen = [`Hallo ${e.name},`, ''];
  if (e.typ === 'kuendigung') {
    zeilen.push(
      'deine Kündigung ist bei uns eingegangen.', '',
      `Eingang: ${deZeit(e.eingang)}`, `Referenz: ${e.referenz}`, `Vertrag: ${e.vertrag}`,
      `Art: ${e.art === 'ausserordentlich' ? 'außerordentliche Kündigung' : 'ordentliche Kündigung'}`,
      ...(e.grund ? [`Grund: ${e.grund}`] : []), `Gewünschter Zeitpunkt: ${e.zum ? deDatum(e.zum) : 'frühestmöglicher Termin'}`, '',
      p.automatisch
        ? `Dein Vertrag endet am ${deDatum(p.endetAm)}. Bis dahin kannst du Plus wie gewohnt nutzen. Danach wird nichts mehr abgebucht.`
        : 'Wir ordnen die Kündigung deinem Vertrag zu und schicken dir das genaue Vertragsende innerhalb von zwei Werktagen. Die Kündigung ist trotzdem wirksam eingegangen.',
    );
  } else {
    zeilen.push(
      'dein Widerruf ist bei uns eingegangen.', '',
      `Eingang: ${deZeit(e.eingang)}`, `Referenz: ${e.referenz}`, `Vertrag: ${e.vertrag}`, ...(e.bestellt ? [`Bestellt am: ${deDatum(e.bestellt)}`] : []), '',
      'Wir wickeln den Vertrag ab und erstatten bereits gezahlte Beträge innerhalb von 14 Tagen über das ursprüngliche Zahlungsmittel (abzüglich eines etwaigen anteiligen Wertersatzes laut Widerrufsbelehrung).',
    );
  }
  zeilen.push('', 'Bitte bewahre diese E-Mail als Nachweis auf. Bei Fragen antworte einfach auf diese Nachricht.', '', 'Viele Grüße', name);
  return zeilen.join('\n');
}

// Abo finden: Lizenznummer/Schlüssel/sub_-Nummer aus dem Feld „vertrag“, sonst per E-Mail. Nur bei genau einem
// passenden, aktiven Abo mit derselben E-Mail wird automatisch vorgemerkt – alles andere bearbeitet der Inhaber.
async function kuendigungVormerken(env, d) {
  if (d.art === 'ausserordentlich') return { automatisch: false, grund: 'Außerordentliche Kündigung: Grund prüfen.' };
  if (!env.PADDLE_API_KEY) return { automatisch: false, grund: 'Kein PADDLE_API_KEY hinterlegt.' };
  const email = d.email.toLowerCase();
  const kandidaten = new Set();
  const text = d.vertrag;
  for (const m of text.matchAll(/\bsub_[a-z0-9]{10,}\b/gi)) kandidaten.add(m[0].toLowerCase());
  const ids = [...text.matchAll(/\btxn_[a-z0-9]{10,}\b/gi)].map((m) => m[0].toLowerCase());
  for (const m of text.matchAll(/[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{40,}/g)) { // ganzer Lizenzschlüssel eingefügt
    try { ids.push(JSON.parse(new TextDecoder().decode(b64bytes(m[0].split('.')[0]))).id); } catch { /* kein Schlüssel */ }
  }
  for (const id of ids) {
    const e = JSON.parse((await env.VERTRAG_KV.get(`lizenzid:${id}`)) || 'null');
    if (e?.aboId) kandidaten.add(e.aboId);
    else if (e) return { automatisch: false, grund: `Lizenz ${id} ist ein Pass ohne Abo – endet automatisch am ${deDatum(e.bis)}. Kunde informieren.` };
  }
  if (!kandidaten.size) {
    const kunden = await paddle(env, `/customers?email=${encodeURIComponent(email)}`);
    for (const k of kunden || []) {
      const abos = await paddle(env, `/subscriptions?customer_id=${k.id}&status=active,trialing,past_due`);
      for (const a of abos || []) kandidaten.add(a.id);
    }
  }
  if (kandidaten.size !== 1) return { automatisch: false, grund: kandidaten.size ? `Mehrere Abos gefunden (${[...kandidaten].join(', ')}).` : 'Kein aktives Abo zu Angaben/E-Mail gefunden.' };

  const aboId = [...kandidaten][0];
  const abo = await paddle(env, `/subscriptions/${aboId}`);
  const kunde = await paddle(env, `/customers/${abo.customer_id}`);
  if ((kunde.email || '').toLowerCase() !== email) return { automatisch: false, grund: `E-Mail passt nicht zum Abo ${aboId} (Schutz vor fremden Kündigungen).` };
  if (!['active', 'trialing', 'past_due'].includes(abo.status)) return { automatisch: false, grund: `Abo ${aboId} hat Status ${abo.status}.` };
  if (abo.scheduled_change?.action === 'cancel') return { automatisch: true, aboId, endetAm: abo.scheduled_change.effective_at, schonVorgemerkt: true };
  const ende = abo.current_billing_period?.ends_at || abo.next_billed_at;
  // Wunschtermin nach dem Periodenende → nicht automatisch (sonst endete der Vertrag früher als gewünscht)
  if (d.zum && ende && d.zum > ende.slice(0, 10)) return { automatisch: false, grund: `Wunschtermin ${deDatum(d.zum)} liegt nach dem Periodenende ${deDatum(ende)}.` };
  const neu = await paddle(env, `/subscriptions/${aboId}/cancel`, { method: 'POST', body: JSON.stringify({ effective_from: 'next_billing_period' }) });
  return { automatisch: true, aboId, endetAm: neu.scheduled_change?.effective_at || ende };
}
