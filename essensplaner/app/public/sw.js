// Offline-Fähigkeit: Seiten, Skripte, Schriften und Rezeptdaten werden zwischengespeichert.
// Bei neuer Version CACHE hochzählen.
const CACHE = 'planer-v2';
const DATEIEN = ['planer.html', 'preise.html', 'kuendigen.html', 'widerrufen.html', 'impressum.html', 'datenschutz.html', 'agb.html', 'widerruf.html',
  'css/stil.css', 'js/app.js', 'js/check.js', 'js/seiten.js', 'js/config.js', 'js/lizenz.js',
  'js/engine/planer.js', 'js/engine/grundlagen.js', 'js/engine/einkauf.js', 'js/engine/ablauf.js', 'js/engine/laeden.js', 'data/daten.json',
  'img/logo-montage.svg', 'img/logo-fitness.svg', 'img/logo-camping.svg', 'img/logo-alltag.svg', 'img/logo-dach.svg', 'manifest-montage.webmanifest', 'manifest-fitness.webmanifest', 'manifest-camping.webmanifest', 'manifest-alltag.webmanifest',
  'fonts/atkinson-hyperlegible-latin-400-normal.woff2', 'fonts/atkinson-hyperlegible-latin-700-normal.woff2'];

self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(DATEIEN)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  // Netz zuerst (immer aktuelle Daten). Bei fehlendem oder sehr langsamem Netz (Stellplatz, Funkloch)
  // nach 3 Sekunden der Zwischenspeicher; die Antwort aus dem Netz aktualisiert ihn trotzdem.
  const netz = fetch(e.request).then((r) => {
    const kopie = r.clone();
    if (r.ok) caches.open(CACHE).then((c) => c.put(e.request, kopie));
    return r;
  });
  const gespeichert = () => caches.match(e.request, { ignoreSearch: true });
  const warten = new Promise((ok) => setTimeout(ok, 3000)).then(gespeichert).then((r) => r || netz);
  e.respondWith(Promise.race([netz, warten]).catch(() => gespeichert().then((r) => r || Response.error())));
});
