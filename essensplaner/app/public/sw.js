// Offline-Fähigkeit: Seiten, Skripte, Schriften und Rezeptdaten werden zwischengespeichert.
// Bei neuer Version CACHE hochzählen.
const CACHE = 'planer-v1';
const DATEIEN = ['planer.html', 'preise.html', 'kuendigen.html', 'widerrufen.html', 'impressum.html', 'datenschutz.html', 'agb.html', 'widerruf.html',
  'css/app.css', 'css/themes.css', 'js/app.js', 'js/seiten.js', 'js/config.js', 'js/lizenz.js',
  'js/engine/planer.js', 'js/engine/grundlagen.js', 'js/engine/einkauf.js', 'js/engine/ablauf.js', 'js/engine/laeden.js', 'data/daten.json',
  'img/logo-montage.svg', 'img/logo-fitness.svg', 'img/logo-camping.svg', 'img/logo-alltag.svg', 'img/logo-dach.svg', 'manifest-montage.webmanifest', 'manifest-fitness.webmanifest', 'manifest-camping.webmanifest', 'manifest-alltag.webmanifest',
  'fonts/atkinson-hyperlegible-latin-400-normal.woff2', 'fonts/atkinson-hyperlegible-latin-700-normal.woff2'];

self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(DATEIEN)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  // Netz zuerst (immer aktuelle Daten), bei fehlendem Netz der Zwischenspeicher
  e.respondWith(fetch(e.request).then((r) => {
    const kopie = r.clone();
    if (r.ok) caches.open(CACHE).then((c) => c.put(e.request, kopie));
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
