// Tests für die Lizenzprüfung (läuft mit der WebCrypto-API von Node, wie im Browser).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { neuesPaar, signiere } from '../tools/lizenz.mjs';

// localStorage und atob stehen in Node global zur Verfügung bzw. werden hier nicht gebraucht.
const paar = neuesPaar();
const { CONFIG } = await import('../public/js/config.js');
CONFIG.lizenzSchluessel = paar.oeffentlich;
const { pruefeLizenz } = await import('../public/js/lizenz.js');

test('Gültiger Jahresschlüssel wird akzeptiert', async () => {
  const s = signiere(paar.privat, 'jahr', '2099-12-31', 'test-1');
  const r = await pruefeLizenz(s);
  assert.equal(r.ok, true);
  assert.equal(r.info.art, 'jahr');
});

test('Abgelaufener Schlüssel wird mit Datum abgelehnt', async () => {
  const s = signiere(paar.privat, 'pass', '2020-01-31');
  const r = await pruefeLizenz(s);
  assert.equal(r.ok, false);
  assert.match(r.grund, /31\.01\.2020/);
});

test('Veränderter Schlüssel (anderes Ablaufdatum) wird abgelehnt', async () => {
  const s = signiere(paar.privat, 'monat', '2026-01-01');
  const [, sig] = s.split('.');
  const gefaelscht = Buffer.from(JSON.stringify({ id: 'x', art: 'monat', bis: '2099-01-01' })).toString('base64url') + '.' + sig;
  const r = await pruefeLizenz(gefaelscht);
  assert.equal(r.ok, false);
});

test('Schlüssel von fremdem Schlüsselpaar wird abgelehnt', async () => {
  const fremd = neuesPaar();
  const r = await pruefeLizenz(signiere(fremd.privat, 'jahr', '2099-01-01'));
  assert.equal(r.ok, false);
});

test('Unvollständige Eingabe → verständliche Meldung', async () => {
  const r = await pruefeLizenz('abc');
  assert.equal(r.ok, false);
  assert.match(r.grund, /unvollständig/);
});
