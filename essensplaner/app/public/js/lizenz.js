// Plus-Zugang ohne Konto: Nach dem Kauf schickt die Kasse einen Lizenzschlüssel per E-Mail
// (server/vertrag-worker.js signiert ihn). Der Schlüssel wird hier mit dem öffentlichen Schlüssel geprüft –
// offline, ohne dass Daten das Gerät verlassen. Format: base64url(JSON).base64url(Ed25519-Signatur)
// JSON: { id, art: 'monat'|'jahr'|'pass'|'saison', bis: 'JJJJ-MM-TT' }

import { CONFIG } from './config.js';

function b64url(s) {
  const b = atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4));
  return Uint8Array.from(b, (c) => c.charCodeAt(0));
}

let schluessel = null;
async function oeffentlich() {
  if (!schluessel) {
    schluessel = await crypto.subtle.importKey('spki', b64url(CONFIG.lizenzSchluessel.replace(/=+$/, '')), { name: 'Ed25519' }, false, ['verify']);
  }
  return schluessel;
}

export async function pruefeLizenz(text, heute = new Date()) {
  try {
    const [daten, sig] = String(text || '').trim().split('.');
    if (!daten || !sig) return { ok: false, grund: 'Der Schlüssel ist unvollständig. Bitte kopiere ihn ganz aus der E-Mail.' };
    const gueltig = await crypto.subtle.verify({ name: 'Ed25519' }, await oeffentlich(), b64url(sig), new TextEncoder().encode(daten));
    if (!gueltig) return { ok: false, grund: 'Dieser Schlüssel passt nicht. Bitte prüfe, ob er vollständig kopiert ist.' };
    const info = JSON.parse(new TextDecoder().decode(b64url(daten)));
    if (info.bis && new Date(info.bis + 'T23:59:59') < heute) return { ok: false, grund: `Dieser Zugang ist am ${info.bis.split('-').reverse().join('.')} abgelaufen.`, info };
    return { ok: true, info };
  } catch (e) {
    return { ok: false, grund: 'Der Schlüssel konnte nicht geprüft werden. Bitte versuche es erneut oder schreib uns.' };
  }
}

export function gespeicherteLizenz() {
  try { return localStorage.getItem('ep_lizenz') || ''; } catch { return ''; }
}
export function speichereLizenz(text) {
  try { localStorage.setItem('ep_lizenz', text); } catch { /* privater Modus: dann nur für diese Sitzung */ }
}
