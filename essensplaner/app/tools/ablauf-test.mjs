// End-to-End im echten Browser: Startseite, Planer (Woche, Blätter, Rezept, Tauschen, Gekocht, Einkauf, Küchenbuch),
// Kündigung und Widerruf. Aufruf: node tools/server.mjs 8765 & dann node tools/ablauf-test.mjs
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const B = 'http://localhost:8765/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const fehler = [];
page.on('pageerror', (e) => fehler.push(e.message));
let ok = 0, nok = 0;
const pruef = (bed, text) => { if (bed) ok++; else { nok++; console.log('FEHLER:', text); } };
const breit = async (wo) => pruef(await page.evaluate(() => document.documentElement.scrollWidth) <= 390, wo + ': horizontaler Scroll');

// Startseite
await page.goto(B, { waitUntil: 'networkidle' });
pruef(/Woche kostet/.test(await page.textContent('h1')), 'Startseite: Überschrift');
await page.click('label.chip:has(input[name=demo-personen][value="4"])');
pruef(/4 Personen/.test(await page.textContent('#demo-bon')), 'Startseite: Beispiel-Bon schaltet um');
await page.click('#leadform button[type=submit]');
pruef(/gültige E-Mail/.test(await page.textContent('#leadstatus')), 'Startseite: Warteliste prüft die E-Mail');
await breit('Startseite');

// Planer: Plan steht ohne Klick
await page.goto(B + 'planer.html', { waitUntil: 'networkidle' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle' });
await page.waitForSelector('.gericht');
pruef(await page.locator('.gericht h3 button').count() >= 3, 'Planer: Gerichte sofort da');
pruef(await page.locator('.pille').count() >= 4, 'Planer: Schalter oben');
await breit('Planer');

// Rezept öffnen und merken
await page.locator('.gericht h3 button').first().click();
pruef(await page.locator('#rezept[open] h2').isVisible(), 'Rezept öffnet');
const herz = page.locator('#rezept [data-merken]');
await herz.click();
pruef(await herz.getAttribute('aria-pressed') === 'true', 'Merken im Rezept');
await page.click('#rezept [data-zu]');

// Gekocht und Tauschen
await page.locator('[data-gekocht]').first().click();
pruef(/Erster Teller/.test(await page.textContent('#toast')), 'Abzeichen nach dem ersten Gekocht');
const titel = await page.locator('.gericht h3 button').first().textContent();
await page.locator('[data-tauschen]').first().click();
await page.waitForTimeout(1500);
pruef(!(await page.locator('.gericht h3 button').allTextContents()).includes(titel), 'Tauschen ersetzt das Gericht');

// Gesperrter Tag zeigt Vorschau und Plus
await page.locator('.tag-knopf[data-tag="1"]').click();
pruef(await page.locator('.vorschau-gerichte figure').count() >= 2 && await page.locator('#ansicht-woche .plus-karte').isVisible(), 'Gesperrter Tag: Vorschau und Plus-Angebot');
await page.locator('.tag-knopf[data-tag="0"]').click();

// Küche wechseln: Zähler und Plan reagieren
await page.click('[data-blatt=kueche]');
await page.waitForFunction(() => /\d/.test(document.querySelector('#treffer-zahl')?.textContent || ''));
await page.waitForTimeout(600); // Zahl rollt kurz
const vorher = Number(await page.textContent('#treffer-zahl'));
await page.click('.wahl:has(input[value=zimmer])');
await page.waitForTimeout(700);
const nachher = Number(await page.textContent('#treffer-zahl'));
pruef(nachher > 0 && nachher < vorher, `Treffer-Zähler (${vorher} → ${nachher})`);
await page.click('#blatt [data-zu]');
await page.waitForTimeout(1500);
pruef(/Wasserkocher/.test(await page.textContent('#schalter')), 'Schalter zeigt die neue Küche');

// Personen
await page.click('[data-blatt=personen]');
await page.click('#blatt label.chip:has(input[value="4"])');
await page.click('#blatt [data-zu]');
pruef(/4 Personen/.test(await page.textContent('#schalter')), 'Personen umgestellt');
await page.waitForTimeout(1500);

// Einkauf (Bon)
await page.click('[data-ansicht=einkauf]');
pruef(await page.locator('#bon .bon-zeile').count() > 3, 'Einkauf: Bon mit Posten');
await page.locator('#bon .bon-zeile:not(.vorrat) input').first().check();
pruef(/^1 von \d+ im Wagen$/.test(await page.textContent('#wagen-text')), 'Einkauf: Wagen zählt mit');
pruef(/€/.test(await page.textContent('.bon-summe')), 'Einkauf: Summe');

// Küchenbuch
await page.click('[data-ansicht=buch]');
pruef(await page.locator('.abzeichen li.hat').count() === 1, 'Küchenbuch: ein Abzeichen');
pruef(await page.locator('.lieblinge li').count() >= 1, 'Küchenbuch: Liebling');
await breit('Küchenbuch');
await page.evaluate(() => localStorage.clear());

// Kündigen und Widerrufen ohne Login
for (const [seite, knopf] of [['kuendigen.html', 'Jetzt kündigen'], ['widerrufen.html', 'Widerruf bestätigen']]) {
  await page.goto(B + seite, { waitUntil: 'networkidle' });
  await page.click(`button[type=submit]:has-text("${knopf}")`);
  pruef(/Bitte fülle/.test(await page.locator('#vertragstatus').textContent()), seite + ': Pflichtfeld-Meldung');
  await page.fill('#name', 'Erika Muster'); await page.fill('#email', 'erika@example.org'); await page.fill('#vertrag', 'Plus Jahr');
  await page.click(`button[type=submit]:has-text("${knopf}")`);
  const bestaetigung = await page.locator('#vertragbereich').textContent();
  pruef(/Eingang:|Erstellt:/.test(bestaetigung), seite + ': Bestätigung mit Zeitstempel');
  pruef(!/eingegangen/.test(bestaetigung) && /nicht übermittelt/.test(bestaetigung), seite + ': ohne Server kein falscher Eingang');
}
pruef(fehler.length === 0, 'JS-Fehler: ' + fehler.join(' | '));
console.log(`E2E: ${ok} ok, ${nok} Fehler`);
await browser.close();
process.exit(nok ? 1 : 0);
