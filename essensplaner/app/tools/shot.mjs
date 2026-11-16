// Screenshots (Handy 390 px + Desktop 1280 px) und Prüfung auf horizontales Scrollen.
// Aufruf: node tools/shot.mjs <url-pfad> <name> [klick-selector]
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const [pfad, name, ...aktionen] = process.argv.slice(2);
const basis = 'http://localhost:8765/';
const browser = await chromium.launch();
for (const [art, vp] of [['handy', { width: 390, height: 844 }], ['desktop', { width: 1280, height: 900 }]]) {
  const page = await browser.newPage({ viewport: vp, deviceScaleFactor: art === 'handy' ? 2 : 1 });
  const fehler = [];
  page.on('pageerror', (e) => fehler.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') fehler.push(m.text()); });
  await page.goto(basis + pfad, { waitUntil: 'networkidle' });
  for (const a of aktionen) {
    if (a.startsWith('wait:')) await page.waitForTimeout(Number(a.slice(5)));
    else await page.click(a);
    await page.waitForTimeout(400);
  }
  const breite = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
  await page.screenshot({ path: `/home/user/mein-business/essensplaner/app/shots/shot_${name}_${art}.png`, fullPage: true });
  console.log(art, 'scrollWidth', breite[0], 'innerWidth', breite[1], breite[0] > breite[1] ? 'HORIZONTALER SCROLL!' : 'ok', fehler.length ? 'FEHLER: ' + fehler.join(' | ') : '');
  await page.close();
}
await browser.close();
