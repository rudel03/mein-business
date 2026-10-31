// Einkaufsliste: Mengen aller Kochvorgänge je Einkauf summieren, auf Packungen aufrunden, nach den
// Abteilungen des gewählten Ladens sortieren, Kosten schätzen und Reste ausweisen.
// Kurz haltbare Zutaten kommen in den Einkauf vor dem Kochtag, Vorräte in den ersten Einkauf.
// Angebrochene Packungen, die nach dem Öffnen gekühlt werden müssen (Flag o), werden nur
// innerhalb von 2 Tagen (mit Kühlschrank) bzw. am selben Tag (ohne) weiterverwendet.

import { ABTEILUNG, gramm, packGramm, istOptional, rund, haltbarTage, einkaufVor, VORRAT_TAGE } from './grundlagen.js';
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

// kochen: [{ kochtag, zutaten, skal }] -> { "id@einkaufstag": { id, tag, g, packs } }
export function bedarf(kochen, Z, p, tage) {
  const roh = {};
  for (const k of kochen) {
    for (const zeile of k.zutaten || []) {
      if (istOptional(zeile)) continue;
      const z = Z[zeile[0]];
      const vorrat = haltbarTage(z, p.geraete) >= VORRAT_TAGE;
      (roh[zeile[0]] ||= []).push({ d: k.kochtag, g: gramm(z, zeile[1], zeile[2]) * k.skal, vorrat });
    }
  }
  const out = {};
  for (const id in roh) {
    const z = Z[id];
    const pg = packGramm(z);
    const liste = roh[id].sort((a, b) => a.d - b.d);
    const ersterEinkauf = einkaufVor(liste[0].d, tage);
    const fenster = z.flags.includes('o') ? (p.geraete.kuehlschrank ? 2 : 0) : Infinity;
    const haltbar = haltbarTage(z, p.geraete);
    let rest = 0, offenSeit = null, gekauft = null;
    for (const x of liste) {
      const tag = x.vorrat ? ersterEinkauf : einkaufVor(x.d, tage);
      const schl = `${id}@${tag}`;
      const o = (out[schl] ||= { id, tag, g: 0, packs: 0 });
      o.g += x.g;
      if (z.flags.includes('b')) continue;
      let g = x.g;
      if (rest > 0 && x.d - offenSeit <= fenster && x.d - gekauft <= haltbar) { const nutz = Math.min(rest, g); rest -= nutz; g -= nutz; }
      if (g > 1e-9) {
        const n = Math.ceil(g / pg - 1e-9);
        o.packs += n;
        rest = n * pg - g;
        offenSeit = x.d;
        gekauft = tag;
      }
    }
  }
  return out;
}

export function einkaufsliste(kochen, Z, p, preisFaktor, tage) {
  const L = LAEDEN[p.laden] || LAEDEN.aldi;
  const b = bedarf(kochen, Z, p, tage);
  const posten = [];
  const vorrat = {};
  let summe = 0;
  for (const schl in b) {
    const { id, tag, g, packs } = b[schl];
    const z = Z[id];
    const pg = packGramm(z);
    const preisJeG = (z.preis * preisFaktor) / pg;
    if (z.flags.includes('b')) {
      // Basisvorrat (Salz, Öl …): nur der verbrauchte Anteil zählt, über alle Einkäufe zusammen
      const v = (vorrat[id] ||= { id, name: z.name, g: 0, packung: packText(z), packungPreis: rund(z.preis * preisFaktor) });
      v.g += g;
      summe += g * preisJeG;
      continue;
    }
    if (!packs) continue; // reicht aus einer früher gekauften Packung
    const preis = packs * z.preis * preisFaktor;
    summe += preis;
    const rest = packs * pg - g;
    posten.push({
      id, tag, name: z.name, abt: z.abt, menge: mengeText(z, g), packungen: packs, packung: packText(z), preis: rund(preis),
      rest: rest > pg * 0.1 ? mengeText(z, rest) : null, lager: z.lager,
    });
  }
  const gruppieren = (liste) => L.reihenfolge.map((abt) => ({
    abt, name: ABTEILUNG[abt], posten: liste.filter((x) => x.abt === abt).sort((a, b) => a.name.localeCompare(b.name, 'de')),
  })).filter((g) => g.posten.length);
  const einkaufTage = [...new Set(posten.map((x) => x.tag))].sort((a, b) => a - b);
  const einkaeufe = einkaufTage.map((tag) => {
    const liste = posten.filter((x) => x.tag === tag);
    return { tag, gruppen: gruppieren(liste), summe: rund(liste.reduce((s, x) => s + x.preis, 0)) };
  });
  const vorratListe = Object.values(vorrat).map((v) => ({ id: v.id, name: v.name, menge: mengeText(Z[v.id], v.g), packung: v.packung,
    preisAnteil: rund(v.g * (Z[v.id].preis * preisFaktor) / packGramm(Z[v.id])), packungPreis: v.packungPreis }));
  return { laden: L.name, einkaeufe, gruppen: gruppieren(posten), vorrat: vorratListe.sort((a, b) => a.name.localeCompare(b.name, 'de')), summe: rund(summe), preisFaktor };
}
