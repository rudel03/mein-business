// Einwilligungsbanner für den Meta Pixel (TDDDG § 25, DSGVO Art. 6 Abs. 1 lit. a). VORLAGE – noch nirgends eingebunden.
//
// Einbinden NUR auf Landingpages (index/montage/fitness/camping/alltag.html) und preise.html, NIE im Planer
// (dort stehen Allergien und Ziele). Im <head> nach den übrigen Skripten:
//   <script type="module" src="js/einwilligung.js"></script>
// Pixel-ID in config.js: tracking: { metaPixelId: '…' } – leer oder fehlend = es wird nichts geladen, kein Banner.
// Vorher: Datenschutzerklärung um Meta Pixel ergänzen (Empfänger, Drittland, Widerruf), Meta: Audience Network aus.
//
// Ablauf: ohne Entscheidung lädt nichts. „Akzeptieren“ und „Ablehnen“ sind gleich groß und gleich gestaltet.
// Nach „Akzeptieren“: Pixel laden, PageView; Klick auf einen Kauf-Knopf (Kassen-URL aus config oder [data-kauf]) → InitiateCheckout.
// Widerruf jederzeit über „Einwilligung ändern“ in der Fußzeile. Gespeichert wird nur die Entscheidung (ep_einwilligung).

import { CONFIG } from './config.js';

const SPEICHER = 'ep_einwilligung';
const VERSION = 1; // erhöhen, wenn sich Zweck oder Anbieter ändern → alle werden neu gefragt
const PIXEL_ID = String(CONFIG.tracking?.metaPixelId || '').trim();
const IM_PLANER = /planer(\.html)?$/.test(location.pathname) || !!document.querySelector('#planer, [data-planer]');

function entscheidung() {
  try {
    const e = JSON.parse(localStorage.getItem(SPEICHER) || 'null');
    return e && e.version === VERSION ? e : null;
  } catch { return null; }
}
function merke(meta) {
  try { localStorage.setItem(SPEICHER, JSON.stringify({ meta, version: VERSION, zeit: new Date().toISOString() })); } catch { /* privater Modus: dann nur für diese Seite */ }
}

// ---------- Meta Pixel ----------

let geladen = false;
function ladePixel() {
  if (geladen || !/^\d{5,20}$/.test(PIXEL_ID)) return;
  geladen = true;
  /* eslint-disable */
  !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq('set', 'autoConfig', false, PIXEL_ID); // keine automatische Erfassung von Knöpfen/Formularen
  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');
  document.addEventListener('click', kaufKlick, true);
}

const KASSEN = Object.entries(CONFIG.kasse?.urls || {}).filter(([, u]) => u);
function kaufKlick(e) {
  const a = e.target.closest?.('a[href], [data-kauf]');
  if (!a || !window.fbq) return;
  const tarif = a.dataset.kauf || KASSEN.find(([, u]) => a.href === u || a.getAttribute('href') === u)?.[0];
  if (!tarif) return;
  const preis = CONFIG.preise[tarif]?.betrag;
  window.fbq('track', 'InitiateCheckout', preis ? { value: preis, currency: 'EUR' } : {}); // keine Ernährungs- oder Planerdaten
}

function entfernePixel() {
  if (window.fbq) window.fbq('consent', 'revoke');
  for (const c of ['_fbp', '_fbc']) {
    document.cookie = `${c}=; Max-Age=0; path=/`;
    document.cookie = `${c}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, '')}`;
  }
}

// ---------- Banner ----------

function zeigeBanner() {
  if (document.getElementById('einwilligung')) return;
  const box = document.createElement('section');
  box.id = 'einwilligung';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-labelledby', 'einwilligung-titel');
  box.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:50;background:var(--grund,#fff);color:var(--text,#111);border-top:2px solid var(--linie-stark,#555);padding:16px 0;box-shadow:0 -4px 16px rgba(0,0,0,.15)';
  box.innerHTML = `<div class="wrap">
    <h2 id="einwilligung-titel" style="font-size:1.15rem">Darf Meta messen, ob unsere Anzeigen wirken?</h2>
    <p>Mit deiner Einwilligung laden wir auf dieser Seite den Meta Pixel (Meta Platforms Ireland Ltd.). Er setzt Cookies und übermittelt Seitenaufruf und Klick auf „Kaufen“ an Meta, auch in die USA. Im Planer wird nie etwas an Meta gesendet. Ohne Einwilligung funktioniert alles genauso. Du kannst deine Wahl jederzeit über „Einwilligung ändern“ unten auf der Seite widerrufen. Mehr in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <button class="knopf" type="button" data-wahl="nein">Ablehnen</button>
      <button class="knopf" type="button" data-wahl="ja">Akzeptieren</button>
    </div></div>`;
  box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-wahl]');
    if (!b) return;
    const ja = b.dataset.wahl === 'ja';
    const vorher = entscheidung()?.meta;
    merke(ja);
    box.remove();
    if (ja) ladePixel();
    else if (vorher || geladen) { entfernePixel(); location.reload(); } // Widerruf: Seite ohne Pixel neu laden
  });
  document.body.append(box);
  box.querySelector('[data-wahl="nein"]').focus({ preventScroll: true });
}

function fussLink() {
  const nav = document.querySelector('.fuss nav');
  if (!nav || document.getElementById('einwilligung-aendern')) return;
  const a = document.createElement('a');
  a.id = 'einwilligung-aendern'; a.href = '#einwilligung'; a.textContent = 'Einwilligung ändern';
  a.addEventListener('click', (e) => { e.preventDefault(); zeigeBanner(); });
  nav.append(a);
}

export function starteEinwilligung() {
  if (IM_PLANER || !PIXEL_ID) return; // kein Pixel konfiguriert oder Planer: nichts tun
  fussLink();
  const e = entscheidung();
  if (!e) zeigeBanner();
  else if (e.meta) ladePixel();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', starteEinwilligung);
else starteEinwilligung();
