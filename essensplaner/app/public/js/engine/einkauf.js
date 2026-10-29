// Einkaufsliste: Mengen aller Kochvorgänge summieren, auf Packungen aufrunden, nach den
// Abteilungen des gewählten Ladens sortieren, Kosten schätzen und Reste ausweisen.

import { ABTEILUNG, gramm, packGramm, istOptional, rund } from './grundlagen.js';
import { LAEDEN } from './laeden.js';

function mengeText(z, g) {
  if (z.einheit === 'stk' && z.stk_g) {
    const n = g / z.stk_g;
    return `${n < 1 ? rund(n, 1).toString().replace('.', ',') : Math.ceil(n - 0.05)} Stück`;
  }
  const e = z.einheit === 'ml' ? 'ml' : 'g';
  if (g >= 1000) return `${rund(g / 1000, 2).toString().replace('.', ',')} ${e === 'ml' ? 'l' : 'kg'}`;
  return `${Math.round(g)} ${e}`;
}

function packText(z) {
  if (z.einheit === 'stk') return `${z.pack} Stück`;
  if (z.pack >= 1000) return `${rund(z.pack / 1000, 2).toString().replace('.', ',')} ${z.einheit === 'ml' ? 'l' : 'kg'}`;
  return `${z.pack} ${z.einheit}`;
}

export function einkaufsliste(kochen, Z, p, preisFaktor) {
  const L = LAEDEN[p.laden] || LAEDEN.aldi;
  const menge = {};
  // Mengen je Zutat in g/ml; skal = gekochte Portionen / Grundportionen des Rezepts
  for (const k of kochen) {
    for (const zeile of k.zutaten || []) {
      if (istOptional(zeile)) continue;
      const z = Z[zeile[0]];
      menge[zeile[0]] = (menge[zeile[0]] || 0) + gramm(z, zeile[1], zeile[2]) * k.skal;
    }
  }
  const posten = [];
  const vorrat = [];
  let summe = 0;
  for (const id in menge) {
    const z = Z[id];
    const g = menge[id];
    const pg = packGramm(z);
    const preisJeG = (z.preis * preisFaktor) / pg;
    if (z.flags.includes('b')) {
      const anteil = g * preisJeG;
      summe += anteil;
      vorrat.push({ id, name: z.name, menge: mengeText(z, g), packung: packText(z), preisAnteil: rund(anteil), packungPreis: rund(z.preis * preisFaktor) });
      continue;
    }
    const packs = Math.max(1, Math.ceil(g / pg - 1e-9));
    const preis = packs * z.preis * preisFaktor;
    summe += preis;
    const rest = packs * pg - g;
    posten.push({
      id, name: z.name, abt: z.abt, menge: mengeText(z, g), packungen: packs, packung: packText(z), preis: rund(preis),
      rest: rest > pg * 0.1 ? mengeText(z, rest) : null, lager: z.lager,
    });
  }
  const reihenfolge = L.reihenfolge;
  const gruppen = reihenfolge.map((abt) => ({
    abt, name: ABTEILUNG[abt], posten: posten.filter((x) => x.abt === abt).sort((a, b) => a.name.localeCompare(b.name, 'de')),
  })).filter((g) => g.posten.length);
  return { laden: L.name, gruppen, vorrat: vorrat.sort((a, b) => a.name.localeCompare(b.name, 'de')), summe: rund(summe), preisFaktor };
}
