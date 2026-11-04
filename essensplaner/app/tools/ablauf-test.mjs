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
  // der Plan ist ohne Klick sofort da
  await page.waitForSelector('.tag');
  pruef(await page.locator('.essen button.titel').count() > 0, v + ': keine Gerichte');
  await page.locator('.essen button.titel').first().click();
  pruef(await page.locator('dialog[open] h2').isVisible(), v + ': Rezeptdialog');
  await page.click('dialog .schliessen button');
  await page.click('[data-reiter=einkauf]');
  pruef(await page.locator('.posten').count() > 3, v + ': Einkaufsliste');
  if (v === 'fitness') {
    await page.click('[data-reiter=naehr]');
    pruef(await page.locator('.nw-tabelle tbody tr').count() >= 1, v + ': Nährwerte');
  }
  pruef(await page.locator('#planform > details.anpassen:not([open])').count() === 1, v + ': Feineinstellungen eingeklappt');
  const breite = await page.evaluate(() => document.documentElement.scrollWidth);
  pruef(breite <= 390, v + ': horizontaler Scroll ' + breite);
}
// Spielerisches: Treffer-Zähler, Merken, Gekocht, Tauschen, Einkaufswagen, Küchenbuch, Vorschau
{
  await page.goto(B + 'planer.html?v=montage', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForFunction(() => /\d/.test(document.querySelector('#treffer-zahl')?.textContent || ''));
  const vorher = Number(await page.textContent('#treffer-zahl'));
  await page.click('label.chip:has(input[value=mikrowelle])');
  await page.waitForTimeout(600);
  const nachher = Number(await page.textContent('#treffer-zahl'));
  pruef(vorher > 0 && nachher < vorher, `Treffer-Zähler reagiert (${vorher} → ${nachher})`);
  pruef((await page.textContent('#treffer-tipp')).startsWith('Mit '), 'Treffer-Zähler nennt den nächsten Schritt');
  await page.click('label.chip:has(input[value=mikrowelle])');
  await page.waitForTimeout(1500); // Plan passt sich ohne Knopf an
  await page.waitForSelector('.tag');
  pruef(await page.locator('.vorschau .vorschau-essen').count() > 3, 'Gratis-Vorschau der übrigen Tage');
  await page.locator('.essen button.titel').first().click();
  const herz = page.locator('dialog[open] [data-merken]');
  await herz.click();
  pruef(await herz.getAttribute('aria-pressed') === 'true', 'Merken im Rezept schaltet um');
  await page.click('dialog .schliessen button');
  await page.locator('[data-gekocht]').first().click();
  pruef(/Erster Teller/.test(await page.textContent('#toast')), 'Abzeichen-Meldung nach dem ersten Gekocht');
  const titel = await page.locator('.essen button.titel').first().textContent();
  await page.locator('[data-tauschen]').first().click();
  await page.waitForTimeout(800);
  pruef(!(await page.locator('.essen button.titel').allTextContents()).includes(titel), 'Tauschen entfernt das Gericht aus dem Plan');
  await page.click('[data-reiter=einkauf]');
  await page.locator('#r-einkauf .gruppe:not(.vorrat) [data-haken]').first().check();
  pruef(/^1 von \d+ im Wagen$/.test(await page.textContent('#wagen-text')), 'Einkaufswagen zählt mit');
  await page.click('[data-reiter=buch]');
  pruef(/1\s*von 195/.test(await page.textContent('#r-buch .sammlung')), 'Küchenbuch zählt das gekochte Gericht');
  pruef(await page.locator('#r-buch .abzeichen li.hat').count() === 1, 'genau ein Abzeichen erreicht');
  await page.evaluate(() => localStorage.clear());
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
