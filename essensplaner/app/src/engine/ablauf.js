// Vorkoch-Ablauf je Kochtag: Gerichte so auf Geräte und Hände verteilen, dass Lange-Garendes zuerst
// startet und nie zwei Gerichte gleichzeitig dasselbe Gerät brauchen. Danach Abkühlen, Portionieren,
// Beschriften und Lagern nach den Lagerregeln.

import { TAGE, MAHLZEIT_NAME } from './grundlagen.js';

// Wie viele Gerichte ein Gerät gleichzeitig schafft
function kapazitaet(gr, g) {
  if (gr === 'herd') return Math.max(1, g.herd || 1);
  if (gr === 'ofen') return 2; // zwei Bleche bei gleicher Temperatur
  return 1;
}

function uhr(min) {
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return `${h}:${String(m).padStart(2, '0')}`;
}

export function lagerText(art, tag, starttag) {
  const wt = TAGE[(tag + starttag) % 7];
  if (art === 'kuehl') return `Kühlschrank, essen bis ${wt}`;
  if (art === 'tk') return `einfrieren, am Vortag (${TAGE[(tag - 1 + starttag + 7) % 7]}) in den Kühlschrank zum Auftauen oder in der Mikrowelle auftauen`;
  if (art === 'ungekuehlt') return `ungekühlt haltbar bis ${wt}`;
  return 'gleich essen';
}

export function vorkochAblauf(kochen, p) {
  const tage = {};
  for (const k of kochen) (tage[k.kochtag] ||= []).push(k);
  const out = [];
  for (const d of Object.keys(tage).map(Number).sort((a, b) => a - b)) {
    // Nur echtes Vorkochen (mehrere Portionen oder Essen an späteren Tagen) gehört in den Ablauf.
    const liste = tage[d].filter((k) => k.essen.length > 1 || k.essen.some((e) => e.d > d));
    if (!liste.length) continue;
    liste.sort((a, b) => (b.weg.zeit - b.weg.aktiv) - (a.weg.zeit - a.weg.aktiv));
    const belegt = {}; // Gerät -> Liste der Endzeiten
    let haende = 0;
    const schritte = [];
    for (const k of liste) {
      const geraete = k.weg.geraete.map((g) => (g === 'herd2' ? 'herd' : g));
      const bedarf = {};
      for (const g of geraete) bedarf[g] = (bedarf[g] || 0) + (k.weg.geraete.includes('herd2') && g === 'herd' ? 2 : 1);
      let start = haende;
      for (const g in bedarf) {
        const enden = (belegt[g] || []).slice().sort((a, b) => a - b);
        const frei = kapazitaet(g, p.geraete) - bedarf[g];
        if (frei < 0) continue;
        if (enden.length > frei) start = Math.max(start, enden[enden.length - frei - 1]);
      }
      const ende = start + k.weg.zeit;
      for (const g in bedarf) {
        belegt[g] = (belegt[g] || []).filter((t) => t > start);
        for (let i = 0; i < bedarf[g]; i++) belegt[g].push(ende);
      }
      haende = start + k.weg.aktiv;
      schritte.push({ start, ende, aktiv: k.weg.aktiv, titel: k.titel, rezept: k.rezept, nr: k.nr, geraete: k.weg.geraete, portionen: k.portionen,
        text: `${uhr(start)} ${k.titel} (${k.portionen.toString().replace('.', ',')} Portionen) – ${k.weg.aktiv} Min. Arbeit, fertig um ${uhr(ende)}` });
    }
    const gesamt = Math.max(...schritte.map((s) => s.ende));
    const boxen = [];
    for (const k of liste) {
      const gruppen = {};
      for (const l of k.lager) {
        if (l.art === 'frisch') continue;
        const key = `${l.art}|${l.d}`;
        (gruppen[key] ||= { art: l.art, d: l.d, n: 0, m: l.m }).n += p.personen * k.faktor;
      }
      for (const key in gruppen) {
        const g = gruppen[key];
        boxen.push({ titel: k.titel, anzahl: Math.max(1, Math.round(g.n)), fuer: `${TAGE[(g.d + p.starttag) % 7]} ${MAHLZEIT_NAME[g.m]}`, lager: lagerText(g.art, g.d, p.starttag), art: g.art });
      }
    }
    out.push({
      d, wochentag: TAGE[(d + p.starttag) % 7], dauer: gesamt, aktiv: schritte.reduce((s, x) => s + x.aktiv, 0), schritte, boxen,
      abschluss: [
        'Gerichte zügig abkühlen lassen (flache Boxen, Deckel erst schließen, wenn nur noch lauwarm) und innerhalb von etwa 2 Stunden in den Kühlschrank stellen.',
        'Jede Box mit Inhalt, Kochdatum und „essen bis“ beschriften.',
        'Später durch und durch erhitzen (dampfend heiß, mindestens 70 °C für 2 Minuten) und nur einmal aufwärmen.',
      ],
    });
  }
  return out;
}
