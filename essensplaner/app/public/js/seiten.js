// Gemeinsames für Preis-, Rechts- und Vertragsseiten: Variante (Stil/Name), Lizenz eingeben,
// Kündigung und Widerruf ohne Login (§ 312k BGB, Widerrufsfunktion seit 19.06.2026).

import { CONFIG } from './config.js';
import { pruefeLizenz, speichereLizenz } from './lizenz.js';

const $ = (s) => document.querySelector(s);
const v = new URLSearchParams(location.search).get('v');
const VARIANTE = CONFIG.varianten[v] ? v : 'alltag';
const V = CONFIG.varianten[VARIANTE];
document.documentElement.dataset.theme = V.theme;

function setze() {
  const n = $('#vname'); if (n) n.textContent = V.name;
  const l = $('#logo'); if (l) l.src = `img/logo-${VARIANTE}.svg`;
  const h = $('#heimlink'); if (h) h.href = `planer.html?v=${VARIANTE}`;
  document.querySelectorAll('.fuss nav a, a[data-v]').forEach((a) => { const u = new URL(a.href, location.href); u.searchParams.set('v', VARIANTE); a.href = u.pathname.split('/').pop() + u.search; });
  document.querySelectorAll('[data-feld]').forEach((el) => {
    const pfad = el.dataset.feld.split('.');
    let w = CONFIG; for (const k of pfad) w = w?.[k];
    if (w != null) el.textContent = w;
  });
}

function lizenzFormular() {
  const f = $('#lizenzform');
  if (!f) return;
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const s = f.elements.schluessel.value;
    const r = await pruefeLizenz(s);
    const out = $('#lizenzstatus');
    if (r.ok) {
      speichereLizenz(s.trim());
      out.innerHTML = `Plus ist freigeschaltet${r.info.bis ? ` bis ${r.info.bis.split('-').reverse().join('.')}` : ''}. <a href="planer.html?v=${VARIANTE}">Zum Planer</a>`;
    } else out.textContent = r.grund;
  });
}

// Kündigung oder Widerruf: Formular → Bestätigungsschaltfläche → Eingangsbestätigung zum Speichern.
function vertragFormular() {
  const f = $('#vertragform');
  if (!f) return;
  f.addEventListener('change', () => {
    const grund = $('#grund-feld');
    if (grund) grund.hidden = f.elements.art?.value !== 'ausserordentlich';
  });
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const daten = Object.fromEntries(new FormData(f));
    const fehlt = ['name', 'email', 'vertrag'].filter((k) => !String(daten[k] || '').trim());
    if (fehlt.length) { $('#vertragstatus').textContent = 'Bitte fülle Name, E-Mail und Vertrag aus, damit wir dich und den Vertrag eindeutig zuordnen können.'; return; }
    daten.typ = f.dataset.typ;
    daten.zeitpunktEingang = new Date().toISOString();
    let gesendet = false;
    if (CONFIG.vertragEndpoint) {
      try {
        const r = await fetch(CONFIG.vertragEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(daten) });
        gesendet = r.ok;
      } catch { gesendet = false; }
    }
    const eingang = new Date(daten.zeitpunktEingang).toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'medium' });
    const was = daten.typ === 'kuendigung' ? 'Kündigung' : 'Widerruf';
    const wirkung = daten.typ === 'kuendigung'
      ? (daten.zum ? `Gewünschter Zeitpunkt: ${new Date(daten.zum).toLocaleDateString('de-DE')} (sonst zum frühestmöglichen Termin).` : 'Die Kündigung wirkt zum frühestmöglichen Termin.')
      : 'Der Vertrag wird rückabgewickelt. Bereits gezahlte Beträge erhältst du innerhalb von 14 Tagen zurück (abzüglich eines etwaigen anteiligen Wertersatzes laut Widerrufsbelehrung).';
    $('#vertragbereich').innerHTML = `
      <h2>${gesendet ? `${was} eingegangen` : `${was} noch nicht übermittelt`}</h2>
      ${gesendet ? `<p><b>Eingang:</b> ${eingang}</p>` : `<p class="meldung fehler" role="alert">Deine Erklärung ist noch <b>nicht bei uns angekommen</b>. Bitte schick sie per E-Mail (Link unten), damit sie wirksam wird.</p><p><b>Erstellt:</b> ${eingang}</p>`}
      <p><b>Name:</b> ${esc(daten.name)} · <b>E-Mail:</b> ${esc(daten.email)}</p>
      <p><b>Vertrag:</b> ${esc(daten.vertrag)}${daten.art ? ` · <b>Art:</b> ${daten.art === 'ausserordentlich' ? 'außerordentlich' : 'ordentlich'}` : ''}${daten.grund ? ` · <b>Grund:</b> ${esc(daten.grund)}` : ''}</p>
      <p>${wirkung}</p>
      <p>${gesendet ? 'Eine Bestätigung schicken wir dir sofort an die angegebene E-Mail-Adresse.' : `Die Online-Übermittlung ist gerade nicht erreichbar. Bitte schick diese Seite als PDF oder den Text an <a href="mailto:${CONFIG.betreiber.email}?subject=${encodeURIComponent(was)}&body=${encodeURIComponent(`${was}\nName: ${daten.name}\nE-Mail: ${daten.email}\nVertrag: ${daten.vertrag}\nArt: ${daten.art || '-'}\nGrund: ${daten.grund || '-'}\nZeitpunkt: ${daten.zum || 'frühestmöglich'}\nErstellt: ${eingang}`)}">${CONFIG.betreiber.email}</a>.`}</p>
      <button class="knopf leise" type="button" onclick="window.print()">Bestätigung speichern oder drucken</button>`;
    $('#vertragbereich').focus();
  });
}

function esc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

function datenLoeschen() {
  const b = $('#loeschen');
  if (!b) return;
  b.addEventListener('click', () => {
    try { Object.keys(localStorage).filter((k) => k.startsWith('ep_')).forEach((k) => localStorage.removeItem(k)); } catch { /* nichts gespeichert */ }
    b.textContent = 'Alle Eingaben auf diesem Gerät sind gelöscht';
  });
}

setze(); lizenzFormular(); vertragFormular(); datenLoeschen();
