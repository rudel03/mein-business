// App-Icons (PNG) aus dem Logo rendern. Aufruf: node tools/icons.mjs (Testserver auf Port 8765 muss laufen)
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
for (const s of [192, 512]) {
  const page = await browser.newPage({ viewport: { width: s, height: s } });
  await page.setContent(`<body style="margin:0"><img src="http://localhost:8765/img/logo-wochenbon.svg" style="width:${s}px;height:${s}px;display:block"></body>`);
  await page.waitForTimeout(200);
  await page.screenshot({ path: `public/img/icon-${s}.png` });
  await page.close();
}
await browser.close();
