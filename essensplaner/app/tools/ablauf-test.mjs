// End-to-End: Planer (alle Varianten), Rezeptdialog, Reiter, Kündigung und Widerruf im echten Browser.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const B = 'http://localhost:8765/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const fehler = [];
page.on('pageerror', (e) => fehler.push(e.message));
let ok = 0, nok = 0;
const pruef = (bed, text) => { if (bed) ok++; else { nok++; console.log('FEHLER:', text); } };
for (const v of ['montage', 'fitness', 'camping', 'alltag']) {
  await page.goto(B + 'planer.html?v=' + v, { waitUntil: 'networkidle' });
  await page.click('button[type=submit]');
  await page.waitForSelector('.tag');
  pruef(await page.locator('.essen button.titel').count() > 0, v + ': keine Gerichte');
  await page.locator('.essen button.titel').first().click();
  pruef(await page.locator('dialog[open] h2').isVisible(), v + ': Rezeptdialog');
  await page.click('dialog .schliessen button');
  await page.click('[data-reiter=einkauf]');
  pruef(await page.locator('.posten').count() > 3, v + ': Einkaufsliste');
  await page.click('[data-reiter=naehr]');
  pruef(await page.locator('.nw-tabelle tbody tr').count() >= 1, v + ': Nährwerte');
  const breite = await page.evaluate(() => document.documentElement.scrollWidth);
  pruef(breite <= 390, v + ': horizontaler Scroll ' + breite);
}
for (const [seite, knopf] of [['kuendigen.html', 'Jetzt kündigen'], ['widerrufen.html', 'Widerruf bestätigen']]) {
  await page.goto(B + seite, { waitUntil: 'networkidle' });
  await page.click(`button[type=submit]:has-text("${knopf}")`);
  pruef(/Bitte fülle/.test(await page.locator('#vertragstatus').textContent()), seite + ': Pflichtfeld-Meldung');
  await page.fill('#name', 'Erika Muster'); await page.fill('#email', 'erika@example.org'); await page.fill('#vertrag', 'Plus Jahr');
  await page.click(`button[type=submit]:has-text("${knopf}")`);
  const bestaetigung = await page.locator('#vertragbereich').textContent();
  pruef(/Eingang:|Erstellt:/.test(bestaetigung), seite + ': Bestätigung mit Zeitstempel');
  // ohne Server darf die Seite keinen Eingang behaupten
  pruef(!/eingegangen/.test(bestaetigung) && /nicht übermittelt/.test(bestaetigung), seite + ': ohne Server kein falscher Eingang');
}
pruef(fehler.length === 0, 'JS-Fehler: ' + fehler.join(' | '));
console.log(`E2E: ${ok} ok, ${nok} Fehler`);
await browser.close();
process.exit(nok ? 1 : 0);
