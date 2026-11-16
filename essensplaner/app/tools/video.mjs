// Kurzvideos: Higgsfield-Clip (9:16) + Hook-Text oben + Endkarte mit Logo (Markenschrift), per ffmpeg.
// Aufruf: node tools/video.mjs  (liest marketing/creatives/videos.json)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const { chromium } = createRequire(import.meta.url)('playwright');
const APP = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const MK = path.resolve(APP, '../marketing/creatives');
const spec = JSON.parse(fs.readFileSync(path.join(MK, 'videos.json'), 'utf8'));
const STIL = {
  montage: ['Zimmerherd', '#FFC72C', '#23262B', 'Archivo', 800], fitness: ['Kochsatz', '#2B2F36', '#FFFFFF', 'Space Grotesk', 700],
  camping: ['Zweiflammer', '#1F4D3A', '#F2C14E', 'Zilla Slab', 700], alltag: ['Wochenschmaus', '#FFFFFF', '#C4401C', 'Bricolage Grotesque', 800],
};
const css = fs.readFileSync(path.join(APP, 'public/css/themes.css'), 'utf8').replace(/url\('\.\.\/fonts\//g, `url('file://${APP}/public/fonts/`)
  + fs.readFileSync(path.join(APP, 'public/css/app.css'), 'utf8').split('*, *::before')[0].replace(/url\('\.\.\/fonts\//g, `url('file://${APP}/public/fonts/`);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 720, height: 1280 } });
async function karte(html, datei) {
  fs.writeFileSync('/tmp/claude-0/v.html', `<html><head><style>${css} body{margin:0;width:720px;height:1280px;background:transparent;font-family:'Atkinson Hyperlegible'}</style></head><body>${html}</body></html>`);
  await page.goto('file:///tmp/claude-0/v.html'); await page.waitForTimeout(250);
  await page.screenshot({ path: datei, omitBackground: true });
}
for (const v of spec) {
  const [name, bg, fg, font, w] = STIL[v.marke];
  const logo = `file://${APP}/public/img/logo-${v.marke}.svg`;
  await karte(`<div style="position:absolute;left:36px;right:36px;top:90px;background:${bg};color:${fg};padding:26px 30px;border-radius:14px;font:${w} 64px/1.05 '${font}'">${v.hook}</div>`, '/tmp/claude-0/hook.png');
  await karte(`<div style="position:absolute;inset:0;background:${bg};color:${fg};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;text-align:center;padding:60px">
    <img src="${logo}" style="width:170px;height:170px"><div style="font:${w} 74px '${font}'">${name}</div><div style="font:700 40px/1.3 'Atkinson Hyperlegible'">${v.ende}</div>
    <div style="font:700 34px 'Atkinson Hyperlegible';border:4px solid ${fg};padding:16px 26px;border-radius:12px">Tagesplan gratis</div></div>`, '/tmp/claude-0/ende.png');
  const ein = path.join(MK, v.marke, 'video', v.clip);
  const aus = path.join(MK, v.marke, 'video', v.datei);
  // Clip auf 720x1280, Hook 0–4,2 s, danach 2 s Endkarte
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', ein, '-loop', '1', '-t', '2', '-i', '/tmp/claude-0/ende.png', '-i', '/tmp/claude-0/hook.png',
    '-filter_complex', `[0:v]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,setsar=1,fps=30[c];[c][2:v]overlay=0:0:enable='lt(t,4.2)'[ch];[1:v]scale=720:1280,setsar=1,fps=30,format=yuv420p[e];[ch]format=yuv420p[chf];[chf][e]concat=n=2:v=1:a=0[v]`,
    '-map', '[v]', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-crf', '24', aus]);
  console.log('fertig', aus);
}
await browser.close();
