// Anzeigenmotive: Higgsfield-Hintergrundbild + Überschrift/Logo in Markenschrift (gestochen scharfer deutscher Text).
// Aufruf: node tools/creative.mjs  (liest marketing/creatives/creatives.json, schreibt marketing/creatives/<marke>/NN_*.png)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const APP = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const MK = path.resolve(APP, '../marketing/creatives');
const spec = JSON.parse(fs.readFileSync(path.join(MK, 'creatives.json'), 'utf8'));
const STIL = {
  montage: { name: 'Zimmerherd', block: '#FFC72C', text: '#23262B', unten: '#23262B', untenText: '#FFC72C', font: 'Archivo', w: 800, band: 'repeating-linear-gradient(-45deg,#FFC72C 0 22px,#23262B 22px 44px)', radius: 0 },
  fitness: { name: 'Kochsatz', block: '#2B2F36', text: '#FFFFFF', unten: '#F5F6F3', untenText: '#2B2F36', font: 'Space Grotesk', w: 700, band: 'linear-gradient(90deg,#2F6BFF 0 46%,#F2A33A 46% 78%,#8B5CF6 78%)', radius: 18 },
  camping: { name: 'Zweiflammer', block: '#1F4D3A', text: '#F2C14E', unten: '#EEF1EA', untenText: '#1F4D3A', font: 'Zilla Slab', w: 700, band: 'repeating-linear-gradient(90deg,#F2C14E 0 40px,#FFFFFF 40px 80px)', radius: 28 },
  alltag: { name: 'Wochenschmaus', block: '#FFFFFF', text: '#C4401C', unten: '#2E7D4F', untenText: '#FFFFFF', font: 'Bricolage Grotesque', w: 800, band: 'repeating-linear-gradient(90deg,#E4572E 0 34px,#FFFFFF 34px 40px,#2E7D4F 40px 74px,#FFFFFF 74px 80px)', radius: 22 },
};
const fontFace = fs.readFileSync(path.join(APP, 'public/css/themes.css'), 'utf8').replace(/url\('\.\.\/fonts\//g, `url('file://${APP}/public/fonts/`)
  + fs.readFileSync(path.join(APP, 'public/css/app.css'), 'utf8').split('*, *::before')[0].replace(/url\('\.\.\/fonts\//g, `url('file://${APP}/public/fonts/`);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
for (const c of spec) {
  const S = STIL[c.marke];
  const bild = 'file://' + path.join(MK, c.marke, 'bg', c.bild);
  const logo = 'file://' + path.join(APP, 'public/img', `logo-${c.marke}.svg`);
  const html = `<html><head><style>${fontFace}
  body{margin:0;width:1080px;height:1350px;position:relative;overflow:hidden;font-family:'Atkinson Hyperlegible',sans-serif}
  .bg{position:absolute;inset:0;background:url('${bild}') center/cover}
  .kopf{position:absolute;left:48px;right:48px;top:48px;background:${S.block};color:${S.text};padding:36px 40px 34px;border-radius:${S.radius}px;box-shadow:0 10px 30px rgba(0,0,0,.25)}
  h1{font-family:'${S.font}';font-weight:${S.w};font-size:${c.gross || 84}px;line-height:1.02;margin:0;letter-spacing:-.01em}
  p{font-size:36px;line-height:1.25;margin:18px 0 0;font-weight:700}
  .fuss{position:absolute;left:0;right:0;bottom:0;background:${S.unten};color:${S.untenText};display:flex;align-items:center;gap:20px;padding:26px 48px 30px}
  .fuss img{width:76px;height:76px}.fuss b{font-family:'${S.font}';font-weight:${S.w};font-size:46px}.fuss span{margin-left:auto;font-size:30px;font-weight:700}
  .band{position:absolute;left:0;right:0;bottom:132px;height:16px;background:${S.band}}
  </style></head><body><div class="bg"></div><div class="kopf"><h1>${c.titel}</h1>${c.unter ? `<p>${c.unter}</p>` : ''}</div>
  <div class="band"></div><div class="fuss"><img src="${logo}"><b>${S.name}</b><span>${c.knopf || 'Tagesplan gratis'}</span></div></body></html>`;
  fs.writeFileSync('/tmp/claude-0/creative.html', html);
  await page.goto('file:///tmp/claude-0/creative.html');
  await page.waitForTimeout(300);
  fs.mkdirSync(path.join(MK, c.marke), { recursive: true });
  await page.screenshot({ path: path.join(MK, c.marke, c.datei), type: 'jpeg', quality: 88 });
  console.log('fertig', c.marke, c.datei);
}
await browser.close();
