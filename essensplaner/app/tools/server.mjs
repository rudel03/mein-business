// Lokaler Testserver wie ein echter Hoster: gzip/brotli und Cache-Header. Aufruf: node tools/server.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
const WURZEL = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../public');
const TYP = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json' };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const datei = path.join(WURZEL, p);
  if (!datei.startsWith(WURZEL) || !fs.existsSync(datei) || fs.statSync(datei).isDirectory()) { res.writeHead(404); return res.end('404'); }
  const ext = path.extname(datei);
  const kopf = { 'Content-Type': TYP[ext] || 'application/octet-stream',
    'Cache-Control': ['.html', '.webmanifest', '.json'].includes(ext) || p === '/sw.js' ? 'no-cache' : 'public, max-age=31536000',
    'X-Content-Type-Options': 'nosniff' };
  let daten = fs.readFileSync(datei);
  if (/text|json|svg|javascript|manifest/.test(kopf['Content-Type']) && /br/.test(req.headers['accept-encoding'] || '')) { daten = zlib.brotliCompressSync(daten); kopf['Content-Encoding'] = 'br'; }
  else if (/text|json|svg|javascript|manifest/.test(kopf['Content-Type']) && /gzip/.test(req.headers['accept-encoding'] || '')) { daten = zlib.gzipSync(daten); kopf['Content-Encoding'] = 'gzip'; }
  res.writeHead(200, kopf); res.end(daten);
}).listen(Number(process.argv[2] || 8766));
