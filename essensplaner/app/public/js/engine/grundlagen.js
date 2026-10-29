// Grundlagen für den Planer: Zufallszahlen, Mengen, Preise, Geräte- und Lagerprüfung.
// Reine Funktionen ohne DOM, laufen im Browser und in Node (Tests).

export const MAHLZEITEN = ['fruehstueck', 'mittag', 'abend', 'snack'];
export const MAHLZEIT_NAME = { fruehstueck: 'Frühstück', mittag: 'Mittag', abend: 'Abendessen', snack: 'Snack' };
export const TAGE = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
export const TAGE_KURZ = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export const ABTEILUNG = {
  OG: 'Obst & Gemüse', BR: 'Brot & Backwaren', KU: 'Kühlregal', FL: 'Fleisch & Fisch',
  TR: 'Trockenwaren & Konserven', GW: 'Gewürze, Öl & Saucen', TK: 'Tiefkühl', NU: 'Nüsse & Snacks',
};

// Deterministischer Zufall (mulberry32), damit gleiche Eingaben gleiche Pläne liefern.
export function zufall(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Menge einer Rezeptzeile in Gramm/Milliliter.
export function gramm(z, menge, einheit) {
  if (einheit === 'stk') return menge * (z.stk_g || 0);
  return menge;
}

// Packungsgröße in Gramm/Milliliter.
export function packGramm(z) {
  return z.einheit === 'stk' ? z.pack * (z.stk_g || 1) : z.pack;
}

export function istOptional(zeile) {
  return zeile.length > 3 && zeile[3] === 'opt';
}

// Hat der Nutzer alle Geräte eines Zubereitungswegs?
export function wegMoeglich(weg, g) {
  for (const gr of weg.geraete) {
    if (gr === 'herd' && !(g.herd >= 1)) return false;
    if (gr === 'herd2' && !(g.herd >= 2)) return false;
    if (gr !== 'herd' && gr !== 'herd2' && !g[gr]) return false;
  }
  return true;
}

export function ersterWeg(rezept, g) {
  return rezept.wege.find((w) => wegMoeglich(w, g)) || null;
}

// Darf eine Zutat bei dieser Ausstattung gekauft werden?
// k = Kühlschrank nötig (außer Einzelportionen, die sofort verbraucht werden), t = Gefrierfach nötig.
export function zutatLagerbar(z, g) {
  if (z.lager === 'k') return !!g.kuehlschrank || z.flags.includes('e');
  if (z.lager === 't') return !!g.gefrier;
  return true;
}

// Wie viele Tage nach dem Einkauf darf eine Zutat noch verarbeitet werden? (vorsichtige Richtwerte bei ≤ 7 °C)
// Ohne Kühlschrank muss Kühlware am Einkaufstag verbraucht werden.
export function haltbarTage(z, g) {
  if (z.lager === 'k') {
    if (!g.kuehlschrank) return 0;
    if (z.abt === 'FL') return z.id.includes('hack') ? 1 : 2;
    if (z.abt === 'OG') return 4;
    return 5;
  }
  if (z.lager === 't') return g.gefrier ? 99 : 0;
  if (z.abt === 'OG') return 6;
  if (z.abt === 'BR') return 4;
  return 99;
}

// Ab dieser Haltbarkeit wird eine Zutat beim ersten Einkauf für den ganzen Plan gekauft.
export const VORRAT_TAGE = 14;

// Einkaufstage im Plan: Tag 0, feste Kochtage (dort wird meist eingekauft) und je nach Gewohnheit.
export function einkaufstage(p) {
  const tage = new Set([0]);
  const abstand = { woche: 7, zweimal: 3.5, taeglich: 1 }[p.einkauf] || 7;
  for (let x = 0; x < p.tage; x += abstand) tage.add(Math.floor(x));
  if (p.kochtage) for (let d = 0; d < p.tage; d++) if (p.kochtage.includes((d + p.starttag) % 7)) tage.add(d);
  return [...tage].sort((a, b) => a - b);
}

// Letzter Einkaufstag an oder vor Tag d (Kochtag -1 = Vortag des Plans: dort wird auch eingekauft).
export function einkaufVor(d, tage) {
  if (d < 0) return d;
  let e = 0;
  for (const t of tage) if (t <= d) e = t;
  return e;
}

export function rund(x, stellen = 2) {
  const f = 10 ** stellen;
  return Math.round(x * f) / f;
}

export function euro(x) {
  return x.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}
