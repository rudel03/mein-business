// Aufruf: node render3d.mjs plan.json out.mp4   (plan: {scene, W, H, fps, shots:[{name,start,dur}]})
// Optional: --stills t1,t2,...  speichert nur Einzelbilder (Vorschau)
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // global vorinstalliert (NODE_PATH)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const [planPath, out] = process.argv.slice(2);
const stillsArg = process.argv.indexOf('--stills');
const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
const fps = plan.fps || 30;
const total = Math.max(...plan.shots.map(s => s.start + s.dur));

const types = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.html': 'text/html' };
const srv = http.createServer((q, r) => {
  const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]));
  if (!f.startsWith(ROOT) || !fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(r);
}).listen(0);
const port = srv.address().port;

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: plan.W, height: plan.H } });
page.on('pageerror', e => console.error('PAGE ERROR', e.message));
page.on('console', m => { if (m.type() === 'error') console.error('CONSOLE', m.text()); });
await page.goto(`http://127.0.0.1:${port}/index.html`);
await page.waitForFunction(() => window.init);
await page.evaluate(p => window.init(p), plan);

const b64 = (d) => Buffer.from(d.split(',')[1], 'base64');
if (stillsArg > 0) {
  const ts = process.argv[stillsArg + 1].split(',').map(Number);
  for (const t of ts) fs.writeFileSync(`${out}_${t.toFixed(2)}.jpg`, b64(await page.evaluate(t => window.frame(t), t)));
} else {
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const N = Math.ceil(total * fps); const t0 = Date.now();
  for (let f = 0; f < N; f++) {
    const buf = b64(await page.evaluate(t => window.frame(t), f / fps));
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % 150 === 0) console.error(`Bild ${f}/${N} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
}
await browser.close(); srv.close();
