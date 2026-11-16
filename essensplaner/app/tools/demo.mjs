// Beispiel-Bons für die Startseite: echte Pläne aus dem Planer (7 Abendessen) je Personenzahl und Laden.
// Aufruf über tools/landing.py; Ausgabe JSON auf stdout.
import fs from 'node:fs';
import { erstellePlan } from '../public/js/engine/planer.js';
import { CONFIG } from '../public/js/config.js';

const daten = JSON.parse(fs.readFileSync(new URL('../public/data/daten.json', import.meta.url)));
const out = {};
for (const personen of [1, 2, 3, 4]) for (const laden of ['aldi', 'lidl', 'rewe']) {
  const e = erstellePlan(daten, { geraete: CONFIG.situationen.normal.geraete, personen, laden, tage: 7, starttag: 0, mahlzeiten: ['abend'], seed: 7 });
  out[`${personen}-${laden}`] = {
    gerichte: e.tage.map((t) => ({ tag: t.wochentag, id: t.mahlzeiten[0]?.rezept, titel: t.mahlzeiten[0]?.titel })),
    posten: e.einkauf.einkaeufe.reduce((s, ek) => s + ek.gruppen.reduce((a, g) => a + g.posten.length, 0), 0),
    summe: e.einkauf.summe, laden: e.einkauf.laden,
  };
}
process.stdout.write(JSON.stringify(out));
