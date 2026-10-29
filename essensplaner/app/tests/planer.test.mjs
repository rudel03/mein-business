// Automatische Tests für Planer, Einkaufsliste, Makros, Budget und Lagerregeln.
// Aufruf: cd app && node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { erstellePlan, pruefeMakros, kandidaten, vervollstaendige } from '../src/engine/planer.js';
import { wegMoeglich, zutatLagerbar, zufall, MAHLZEITEN } from '../src/engine/grundlagen.js';
import { LAEDEN } from '../src/engine/laeden.js';

const daten = JSON.parse(fs.readFileSync(new URL('../public/data/daten.json', import.meta.url)));
const R = Object.fromEntries(daten.rezepte.map((r) => [r.id, r]));
const Z = daten.zutaten;

const ALLES = { herd: 4, topf: true, pfanne: true, ofen: true, airfryer: true, mikrowelle: true, wasserkocher: true,
  puerierstab: true, toaster: true, sandwichmaker: true, kuehlschrank: true, gefrier: true, thermo: true };
const NICHTS = { herd: 0, topf: false, pfanne: false, ofen: false, airfryer: false, mikrowelle: false, wasserkocher: false,
  puerierstab: false, toaster: false, sandwichmaker: false, kuehlschrank: false, gefrier: false, thermo: false };
const MONTAGE = { ...NICHTS, wasserkocher: true, mikrowelle: true, kuehlschrank: true };

// Prüft alle Regeln, die für jeden Plan gelten müssen.
function invarianten(erg) {
  const p = erg.profil;
  for (const t of erg.tage) {
    for (const m of t.mahlzeiten) {
      if (!m.rezept) continue;
      const r = R[m.rezept];
      assert.ok(r.mahlzeit.includes(m.m), `${r.id} passt nicht zu ${m.m}`);
      // Lagerregeln
      const abstand = t.d - m.gekochtAm;
      assert.ok(abstand >= 0, 'Essen vor dem Kochen');
      if (m.herkunft === 'kuehl') {
        assert.ok(p.geraete.kuehlschrank, 'Kühlschrank-Lagerung ohne Kühlschrank');
        assert.ok(abstand <= r.lager.kuehl_tage, `${r.id}: ${abstand} Tage im Kühlschrank, erlaubt ${r.lager.kuehl_tage}`);
      }
      if (m.herkunft === 'tk') { assert.ok(p.geraete.gefrier && r.lager.einfrierbar, `${r.id}: einfrieren nicht erlaubt`); }
      if (m.herkunft === 'ungekuehlt') assert.ok(r.lager.ungekuehlt_h >= 24 && abstand <= 1);
      if (m.herkunft === 'frisch') assert.equal(abstand, 0);
      assert.ok(m.herkunft, `${r.id}: unerlaubte Lagerung`);
      // Ernährung und Allergene
      for (const a of p.allergene) assert.ok(!r.al.includes(a), `${r.id} enthält Allergen ${a}`);
      if (p.diaet === 'vegan') assert.ok(r.diaet.includes('vegan'));
      if (p.diaet === 'vegetarisch') assert.ok(r.diaet.includes('vegetarisch'));
      for (const z of r.zutaten) if (z[3] !== 'opt') assert.ok(!p.abneigungen.includes(z[0]), `${r.id} enthält Abneigung ${z[0]}`);
    }
  }
  for (const k of erg.kochen) {
    assert.ok(wegMoeglich(k.weg, p.geraete), `${k.rezept}: Gerät fehlt`);
    for (const z of R[k.rezept].zutaten) if (z[3] !== 'opt') assert.ok(zutatLagerbar(Z[z[0]], p.geraete), `${k.rezept}: ${z[0]} nicht lagerbar`);
    assert.ok(k.portionen > 0);
  }
  // Einkaufsliste: Reihenfolge des Ladens, Summe stimmt
  const reihe = LAEDEN[p.laden].reihenfolge;
  const idx = erg.einkauf.gruppen.map((g) => reihe.indexOf(g.abt));
  assert.deepEqual(idx, [...idx].sort((a, b) => a - b), 'Abteilungen nicht in Ladenreihenfolge');
  const summe = erg.einkauf.gruppen.flatMap((g) => g.posten).reduce((s, x) => s + x.preis, 0) +
    erg.einkauf.vorrat.reduce((s, x) => s + x.preisAnteil, 0);
  assert.ok(Math.abs(summe - erg.einkauf.summe) < 0.05 + 0.01 * erg.einkauf.gruppen.length * 3, `Summe ${summe} ≠ ${erg.einkauf.summe}`);
  for (const g of erg.einkauf.gruppen) for (const x of g.posten) assert.ok(x.packungen >= 1 && x.preis > 0);
  // Vorkoch-Ablauf: Endzeit nach Start, keine negativen Zeiten
  for (const a of erg.ablauf) for (const s of a.schritte) assert.ok(s.start >= 0 && s.ende > s.start);
}

function gefuellt(erg) {
  return erg.tage.flatMap((t) => t.mahlzeiten).filter((m) => m.rezept).length;
}

test('Datenbestand: mindestens 120 Rezepte, jede Mahlzeit vielfach vorhanden', () => {
  assert.ok(daten.rezepte.length >= 120, `nur ${daten.rezepte.length} Rezepte`);
  for (const m of MAHLZEITEN) assert.ok(daten.rezepte.filter((r) => r.mahlzeit.includes(m)).length >= 20, m);
});

test('Standardprofil: alle Mahlzeiten der Woche gefüllt, Regeln eingehalten', () => {
  const erg = erstellePlan(daten, { seed: 3 });
  assert.equal(erg.ok, true);
  assert.equal(gefuellt(erg), 21);
  invarianten(erg);
});

test('Gleiche Eingabe ergibt denselben Plan (fester Seed)', () => {
  const a = erstellePlan(daten, { seed: 11, personen: 2 });
  const b = erstellePlan(daten, { seed: 11, personen: 2 });
  assert.deepEqual(a.tage, b.tage);
});

test('Montage: nur Wasserkocher + Mikrowelle, kalte Pause – kein Herd- oder Ofenrezept', () => {
  const erg = erstellePlan(daten, { geraete: MONTAGE, pause: 'kalt', kcalRichtwert: 2800, seed: 5 });
  assert.equal(erg.ok, true);
  invarianten(erg);
  for (const k of erg.kochen) for (const g of k.weg.geraete) assert.ok(['wasserkocher', 'mikrowelle'].includes(g), g);
  for (const t of erg.tage) for (const m of t.mahlzeiten) if (m.m === 'mittag' && m.box && m.rezept) assert.ok(R[m.rezept].lager.kalt_essbar);
});

test('Ganz ohne Geräte und ohne Kühlschrank: trotzdem ein Plan, nur ungekühlte Zutaten', () => {
  const erg = erstellePlan(daten, { geraete: NICHTS, seed: 2 });
  assert.equal(erg.ok, true, JSON.stringify(erg.meldungen));
  invarianten(erg);
  assert.ok(gefuellt(erg) > 0);
  for (const k of erg.kochen) assert.deepEqual(k.weg.geraete, []);
});

test('Vegan + glutenfrei + ohne Soja + ohne Nüsse: Plan oder verständliche Meldung, nie leer ohne Grund', () => {
  const erg = erstellePlan(daten, { diaet: 'vegan', allergene: ['gl', 'so', 'nu', 'er'], seed: 4 });
  if (erg.ok) invarianten(erg);
  else assert.ok(erg.meldungen.some((m) => m.art === 'fehler' && m.text.length > 30));
});

test('Unmögliche Kombination: alle Allergene → keine Rezepte, verständliche Meldung', () => {
  const erg = erstellePlan(daten, { allergene: ['gl', 'mi', 'ei', 'fi', 'er', 'so', 'nu', 'se', 'sf', 'ss', 'sw'], diaet: 'vegan', geraete: NICHTS });
  if (!erg.ok) {
    assert.match(erg.meldungen[0].text, /kein einziges Rezept/);
    assert.match(erg.meldungen[0].text, /Allergien/);
  } else invarianten(erg);
});

test('Keine Mahlzeit gewählt → Meldung statt Absturz', () => {
  const erg = erstellePlan(daten, { mahlzeiten: [] });
  assert.equal(erg.ok, false);
  assert.match(erg.meldungen[0].text, /mindestens eine Mahlzeit/);
});

test('Budget wird eingehalten, wenn es realistisch ist', () => {
  const erg = erstellePlan(daten, { budget: 45, personen: 1, seed: 8 });
  assert.equal(erg.ok, true);
  invarianten(erg);
  assert.ok(erg.kosten.gesamt <= 45, `Kosten ${erg.kosten.gesamt}`);
});

test('Mini-Budget (5 € für eine Woche) → günstigster Plan + ehrliche Meldung', () => {
  const erg = erstellePlan(daten, { budget: 5, seed: 8 });
  assert.equal(erg.ok, true);
  invarianten(erg);
  assert.ok(erg.meldungen.some((m) => /Budget/.test(m.text)));
});

test('Teurer Laden ist teurer als Discounter (gleicher Plan, anderer Preisfaktor)', () => {
  const a = erstellePlan(daten, { laden: 'aldi', seed: 9 });
  const b = erstellePlan(daten, { laden: 'edeka', eigenmarken: false, seed: 9 });
  assert.ok(b.einkauf.preisFaktor > a.einkauf.preisFaktor);
});

test('Makros: 2.800 kcal / 180 g Protein werden im Wochenschnitt getroffen (±10 % / ≥ 90 %)', () => {
  const ziel = { kcal: 2800, p: 180, kh: 300, f: 90 };
  const erg = erstellePlan(daten, { makros: ziel, mahlzeiten: ['fruehstueck', 'mittag', 'abend', 'snack'], seed: 6 });
  assert.equal(erg.ok, true);
  invarianten(erg);
  const t = erg.naehrwerte.jeTag;
  const kcal = t.reduce((s, x) => s + x.kcal, 0) / t.length;
  const p = t.reduce((s, x) => s + x.p, 0) / t.length;
  assert.ok(Math.abs(kcal - ziel.kcal) / ziel.kcal <= 0.1, `kcal ${kcal}`);
  assert.ok(p >= 0.9 * ziel.p, `Protein ${p}`);
});

test('Makros: niedriger Bedarf 1.800 kcal wird nicht weit überschritten', () => {
  const erg = erstellePlan(daten, { makros: { kcal: 1800, p: 120, kh: 180, f: 60 }, seed: 6 });
  const t = erg.naehrwerte.jeTag;
  const kcal = t.reduce((s, x) => s + x.kcal, 0) / t.length;
  assert.ok(kcal <= 1800 * 1.12, `kcal ${kcal}`);
});

test('Widersprüchliche Makros → Hinweis, Plan trotzdem', () => {
  const m = pruefeMakros({ kcal: 2000, p: 300, kh: 300, f: 150 });
  assert.ok(m.meldungen.some((x) => /passt nicht ganz/.test(x.text)));
  const erg = erstellePlan(daten, { makros: { kcal: 2000, p: 300, kh: 300, f: 150 }, seed: 1 });
  assert.equal(erg.ok, true);
});

test('Unter 1.200 kcal wird nicht geplant', () => {
  const m = pruefeMakros({ kcal: 800, p: 60, kh: 60, f: 30 });
  assert.equal(m.makros.kcal, 1200);
  assert.ok(m.meldungen.length >= 1);
});

test('Feste Kochtage (So + Mi): Hauptgerichte werden nur an Kochtagen oder frisch-schnell gekocht', () => {
  const erg = erstellePlan(daten, { kochtage: [6, 2], starttag: 0, seed: 12 });
  assert.equal(erg.ok, true);
  invarianten(erg);
  for (const k of erg.kochen) {
    const wt = (k.kochtag + erg.profil.starttag) % 7;
    if (k.weg.zeit > 10) assert.ok([6, 2].includes(wt) || k.kochtag === 0, `${k.titel} an Tag ${wt}`);
  }
});

test('4 Personen, 14 Tage: Mengen skalieren, Einkaufsliste deckt Bedarf', () => {
  const erg = erstellePlan(daten, { personen: 4, tage: 14, seed: 13 });
  assert.equal(erg.ok, true);
  invarianten(erg);
  for (const k of erg.kochen) assert.ok(k.portionen >= 4 * 0.75 - 1e-9);
});

test('Ohne Gefrierfach wird nichts eingefroren, ohne Kühlschrank nichts gekühlt', () => {
  const erg = erstellePlan(daten, { geraete: { ...ALLES, gefrier: false, kuehlschrank: false }, seed: 14 });
  invarianten(erg);
  for (const t of erg.tage) for (const m of t.mahlzeiten) assert.ok(!['kuehl', 'tk'].includes(m.herkunft));
});

test('Zufallstest: 250 zufällige Profile – kein Absturz, alle Regeln eingehalten', () => {
  const rnd = zufall(2026);
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const alleAl = ['gl', 'mi', 'ei', 'fi', 'er', 'so', 'nu', 'se', 'sf', 'ss'];
  let ok = 0;
  for (let i = 0; i < 250; i++) {
    const geraete = {};
    for (const g of Object.keys(ALLES)) geraete[g] = g === 'herd' ? pick([0, 1, 2, 4]) : rnd() < 0.5;
    const profil = {
      geraete, laden: pick(Object.keys(LAEDEN)), personen: 1 + Math.floor(rnd() * 5), tage: 1 + Math.floor(rnd() * 14),
      starttag: Math.floor(rnd() * 7), mahlzeiten: MAHLZEITEN.filter(() => rnd() < 0.7),
      diaet: pick(['alles', 'vegetarisch', 'vegan', 'pescetarisch', 'ohne_schwein']),
      allergene: alleAl.filter(() => rnd() < 0.12), abneigungen: Object.keys(Z).filter(() => rnd() < 0.03),
      budget: rnd() < 0.4 ? Math.round(5 + rnd() * 120) : null,
      makros: rnd() < 0.3 ? { kcal: Math.round(1000 + rnd() * 3500), p: Math.round(rnd() * 250), kh: Math.round(rnd() * 400), f: Math.round(rnd() * 150) } : null,
      kochtage: rnd() < 0.3 ? [0, 1, 2, 3, 4, 5, 6].filter(() => rnd() < 0.3) : null,
      pause: pick(['zuhause', 'mikrowelle', 'kalt', 'thermo']), seed: i,
    };
    const erg = erstellePlan(daten, profil);
    assert.ok(Array.isArray(erg.meldungen));
    if (erg.ok) { invarianten(erg); ok++; } else assert.ok(erg.meldungen.some((m) => m.art === 'fehler'));
  }
  assert.ok(ok > 150, `nur ${ok} von 250 Profilen ergaben einen Plan`);
});

test('Kandidatenfilter: Geräte und Lagerung', () => {
  const p = vervollstaendige({ geraete: MONTAGE });
  const { liste } = kandidaten(daten, p);
  for (const { weg } of liste) assert.ok(weg.geraete.every((g) => ['wasserkocher', 'mikrowelle'].includes(g)));
});
