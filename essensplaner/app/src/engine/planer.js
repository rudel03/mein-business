// Der Planer: Profil + Daten -> Plan (Tage × Mahlzeiten), Einkaufsliste, Kosten, Vorkoch-Ablauf.
//
// Ablauf
// 1. Rezepte filtern (Ernährungsform, Allergene, Abneigungen, Geräte, Lagerung).
// 2. Startplan gierig bauen: jede Mahlzeit wird aus einem „Kochvorgang“ gefüllt. Ein Kochvorgang
//    ergibt mehrere Portionen, die über die Lagerregeln (Kühlschrank 1–2 Tage, Gefrierfach)
//    auf spätere Mahlzeiten verteilt werden – das ist das Vorkochen (Meal-Prep).
// 3. Lokale Suche (Simulated Annealing, fester Seed): Rezepte tauschen, Portionsfaktoren ändern,
//    Mahlzeiten zwischen Kochvorgängen verschieben. Bewertet werden Makro-/Kalorienziel, Budget,
//    Abwechslung, Kochaufwand und Reste in angebrochenen Packungen.
// 4. Einkaufsliste, Kosten, Nährwerte, Lagerhinweise und Vorkoch-Ablauf ableiten.

import { MAHLZEITEN, zufall, ersterWeg, zutatLagerbar, gramm, istOptional, rund } from './grundlagen.js';
import { einkaufsliste } from './einkauf.js';
import { vorkochAblauf } from './ablauf.js';
import { LAEDEN } from './laeden.js';

export const STANDARD_PROFIL = {
  geraete: { herd: 2, topf: true, pfanne: true, ofen: true, airfryer: false, mikrowelle: true, wasserkocher: true,
    puerierstab: false, toaster: false, sandwichmaker: false, kuehlschrank: true, gefrier: true, thermo: false },
  laden: 'aldi',
  eigenmarken: true,
  budget: null, // € für den ganzen Zeitraum und alle Personen, null = egal
  personen: 1,
  tage: 7,
  starttag: 0, // 0 = Montag
  mahlzeiten: ['fruehstueck', 'mittag', 'abend'],
  diaet: 'alles', // alles | vegetarisch | vegan | pescetarisch | ohne_schwein
  allergene: [], // LMIV-Codes, z. B. ['gl', 'mi']
  abneigungen: [], // Zutaten-IDs
  makros: null, // { kcal, p, kh, f } je Person und Tag
  kcalRichtwert: 2000, // ohne Makros: grober Tagesrichtwert je Person
  kochtage: null, // null = täglich frei; sonst Liste von Tagesindizes, an denen gekocht wird (z. B. [0, 3])
  pause: 'zuhause', // zuhause | mikrowelle | kalt | thermo  (wie wird das Mittagessen gegessen?)
  arbeitstage: [0, 1, 2, 3, 4],
  maxAktivProTag: 60, // Minuten aktive Kochzeit, die pro Tag höchstens geplant werden
  seed: 1,
};

const MIN_KCAL = 1200; // darunter wird nicht geplant
const MAX_SLOTS_JE_KOCHEN = 3; // dasselbe Gericht höchstens dreimal hintereinander

export function vervollstaendige(profil) {
  const p = { ...STANDARD_PROFIL, ...profil };
  p.geraete = { ...STANDARD_PROFIL.geraete, ...(profil.geraete || {}) };
  p.personen = Math.max(1, Math.min(8, Math.round(p.personen || 1)));
  p.tage = Math.max(1, Math.min(14, Math.round(p.tage || 7)));
  p.mahlzeiten = MAHLZEITEN.filter((m) => p.mahlzeiten.includes(m));
  return p;
}

// ---------------------------------------------------------------- Prüfung der Makros
export function pruefeMakros(m) {
  const meldungen = [];
  if (!m) return { makros: null, meldungen };
  const z = { kcal: +m.kcal || 0, p: +m.p || 0, kh: +m.kh || 0, f: +m.f || 0 };
  const ausMakros = 4 * z.p + 4 * z.kh + 9 * z.f;
  if (!z.kcal && ausMakros) z.kcal = Math.round(ausMakros);
  if (z.kcal && z.kcal < MIN_KCAL) {
    meldungen.push({ art: 'hinweis', text: `Unter ${MIN_KCAL} kcal am Tag erstellen wir keine Pläne. Wir rechnen mit ${MIN_KCAL} kcal. Für sehr niedrige Kalorienmengen sprich bitte mit einer Ärztin, einem Arzt oder einer Ernährungsfachkraft.` });
    z.kcal = MIN_KCAL;
  }
  if (z.kcal > 6000) {
    meldungen.push({ art: 'hinweis', text: 'Mehr als 6.000 kcal am Tag planen wir nicht. Wir rechnen mit 6.000 kcal.' });
    z.kcal = 6000;
  }
  if (ausMakros && z.kcal && Math.abs(ausMakros - z.kcal) / z.kcal > 0.15) {
    meldungen.push({ art: 'hinweis', text: `Deine Makros ergeben zusammen etwa ${Math.round(ausMakros)} kcal, dein Kalorienziel ist ${z.kcal} kcal. Das passt nicht ganz zusammen. Wir halten uns zuerst an die Kalorien und das Protein, Kohlenhydrate und Fett gleichen sich an.` });
    z.khFettWeich = true;
  }
  return { makros: z.kcal ? z : null, meldungen };
}

// ---------------------------------------------------------------- Filter
function passtDiaet(r, diaet) {
  if (diaet === 'alles') return true;
  return r.diaet.includes(diaet) || (diaet === 'pescetarisch' && r.diaet.includes('vegetarisch')) ||
    (diaet === 'ohne_schwein' && r.diaet.includes('pescetarisch'));
}

export function kandidaten(daten, p) {
  const Z = daten.zutaten;
  const grund = { diaet: 0, allergie: 0, abneigung: 0, geraet: 0, lager: 0 };
  const liste = [];
  for (const r of daten.rezepte) {
    if (!passtDiaet(r, p.diaet)) { grund.diaet++; continue; }
    if (r.al.some((a) => p.allergene.includes(a))) { grund.allergie++; continue; }
    if (r.zutaten.some((z) => !istOptional(z) && p.abneigungen.includes(z[0]))) { grund.abneigung++; continue; }
    const weg = ersterWeg(r, p.geraete);
    if (!weg) { grund.geraet++; continue; }
    if (r.zutaten.some((z) => !istOptional(z) && !zutatLagerbar(Z[z[0]], p.geraete))) { grund.lager++; continue; }
    liste.push({ r, weg });
  }
  return { liste, grund };
}

// Wie lange hält eine Portion? Gibt die Herkunft zurück oder null, wenn es nicht erlaubt ist.
// abstand = Tage zwischen Kochen und Essen.
function haltbarkeit(r, abstand, g) {
  if (abstand === 0) return 'frisch';
  if (r.lager.ungekuehlt_h >= 24 && abstand <= 1) return 'ungekuehlt';
  if (g.kuehlschrank && abstand <= r.lager.kuehl_tage) return 'kuehl';
  if (g.gefrier && g.kuehlschrank && r.lager.einfrierbar) return 'tk';
  if (g.gefrier && g.mikrowelle && r.lager.einfrierbar) return 'tk';
  return null;
}

// Eignet sich das Rezept für diese Mahlzeit (inkl. Pause am Arbeitsplatz)?
function passtSlot(k, slot, p) {
  const r = k.r;
  if (!r.mahlzeit.includes(slot.m)) return false;
  if (slot.m === 'mittag' && slot.arbeit) {
    if (p.pause === 'kalt' && !r.lager.kalt_essbar) return false;
    if (p.pause === 'thermo' && !r.lager.kalt_essbar && !['topf', 'thermo', 'mikrowelle'].includes(r.lager.aufwaermen)) return false;
    if (p.pause === 'thermo' && !r.lager.kalt_essbar && !(p.geraete.herd >= 1 || p.geraete.mikrowelle)) return false;
  }
  return true;
}

// Kochtag für eine Mahlzeit: an festen Kochtagen der letzte Kochtag davor (oder derselbe Tag).
// Mittagessen an Arbeitstagen wird spätestens am Vorabend gekocht.
function kochtagFuer(slot, p, kurz) {
  let spaetester = slot.m === 'mittag' && slot.arbeit && p.pause !== 'zuhause' ? slot.d - 1 : slot.d;
  if (slot.m === 'fruehstueck' && kurz) spaetester = slot.d; // Frühstück macht man morgens frisch
  if (!p.kochtage || !p.kochtage.length || kurz) return Math.max(spaetester, slot.d - 1) < 0 ? slot.d : Math.max(0, spaetester);
  for (let d = spaetester; d >= 0; d--) if (p.kochtage.includes((d + p.starttag) % 7)) return d;
  return 0; // vor dem ersten Kochtag: Planstart gilt als Kochtag
}

// ---------------------------------------------------------------- Bewertung
function naehrSlot(k, faktor) {
  const n = k.r.n;
  return { kcal: n.kcal * faktor, p: n.p * faktor, kh: n.kh * faktor, f: n.f * faktor };
}

function preisJeGramm(Z, laden, eigenmarken) {
  const L = LAEDEN[laden] || LAEDEN.aldi;
  const faktor = eigenmarken ? L.faktorEigenmarke : L.faktorMarke;
  const cache = {};
  for (const id in Z) {
    const z = Z[id];
    const g = z.einheit === 'stk' ? z.pack * (z.stk_g || 1) : z.pack;
    cache[id] = (z.preis * faktor) / g;
  }
  return { cache, faktor };
}

function bewerte(plan, ctx) {
  const { p, ziel, slots } = ctx;
  let strafe = 0;
  // Nährwerte je Tag
  const tag = Array.from({ length: p.tage }, () => ({ kcal: 0, p: 0, kh: 0, f: 0 }));
  for (const e of plan) {
    for (const s of e.slots) {
      const n = naehrSlot(e.k, e.faktor);
      const t = tag[slots[s].d];
      t.kcal += n.kcal; t.p += n.p; t.kh += n.kh; t.f += n.f;
    }
  }
  for (const t of tag) {
    const dk = (t.kcal - ziel.kcal) / ziel.kcal;
    strafe += (p.makros ? 300 : 120) * dk * dk;
    if (p.makros) {
      const dp = (t.p - ziel.p) / Math.max(ziel.p, 1);
      strafe += (dp < 0 ? 260 : 60) * dp * dp;
      if (!ziel.khFettWeich) {
        const dkh = (t.kh - ziel.kh) / Math.max(ziel.kh, 1);
        const df = (t.f - ziel.f) / Math.max(ziel.f, 1);
        strafe += 70 * dkh * dkh + 70 * df * df;
      }
    }
  }
  // Kosten über verbrauchte Mengen + Reste angebrochener Kühlware (Verschwendung)
  const menge = {};
  for (const e of plan) {
    const port = e.slots.length * p.personen * e.faktor;
    for (const z of e.k.r.zutaten) {
      if (istOptional(z)) continue;
      menge[z[0]] = (menge[z[0]] || 0) + gramm(ctx.Z[z[0]], z[1], z[2]) * port / e.k.r.portionen;
    }
  }
  let kosten = 0, rest = 0;
  for (const id in menge) {
    const z = ctx.Z[id];
    if (z.flags.includes('b')) { kosten += menge[id] * ctx.preis[id]; continue; }
    const pg = z.einheit === 'stk' ? z.pack * (z.stk_g || 1) : z.pack;
    const packs = Math.ceil(menge[id] / pg - 1e-9);
    kosten += packs * pg * ctx.preis[id];
    if (z.lager === 'k') rest += (packs * pg - menge[id]) * ctx.preis[id];
  }
  if (p.budget) {
    const ueber = kosten - p.budget;
    if (ueber > 0) strafe += 40 + 25 * ueber * (100 / Math.max(p.budget, 10));
    strafe += 0.5 * kosten / Math.max(p.budget, 1) * 10;
  } else {
    strafe += 0.15 * kosten;
  }
  strafe += 0.4 * rest;
  // Abwechslung: dasselbe Rezept mehrfach gekocht, dieselbe Mahlzeit mehrfach am Stück
  const zaehl = {};
  for (const e of plan) zaehl[e.k.r.id] = (zaehl[e.k.r.id] || 0) + 1;
  for (const id in zaehl) if (zaehl[id] > 1) strafe += 6 * (zaehl[id] - 1) * (zaehl[id] - 1);
  for (const e of plan) if (e.slots.length > 2) strafe += 2 * (e.slots.length - 2);
  // Kochaufwand je Kochtag
  const aufwand = {};
  for (const e of plan) aufwand[e.kochtag] = (aufwand[e.kochtag] || 0) + e.k.weg.aktiv;
  for (const d in aufwand) {
    strafe += 0.04 * aufwand[d];
    if (aufwand[d] > p.maxAktivProTag) strafe += 0.5 * (aufwand[d] - p.maxAktivProTag);
  }
  return { strafe, kosten, tag };
}

// ---------------------------------------------------------------- Aufbau und Suche
function slotsBauen(p) {
  const slots = [];
  for (let d = 0; d < p.tage; d++) {
    const wt = (d + p.starttag) % 7;
    for (const m of p.mahlzeiten) slots.push({ d, m, arbeit: p.arbeitstage.includes(wt) });
  }
  return slots;
}

function istKurz(k) {
  return k.weg.zeit <= 10;
}

// Darf Kochvorgang e (Rezept k, Kochtag) den Slot s bedienen?
function slotErlaubt(k, kochtag, s, ctx) {
  const slot = ctx.slots[s];
  if (!passtSlot(k, slot, ctx.p)) return false;
  if (slot.d < kochtag) return false;
  return !!haltbarkeit(k.r, slot.d - kochtag, ctx.p.geraete);
}

function neuerKochvorgang(k, s, ctx) {
  const kochtag = kochtagFuer(ctx.slots[s], ctx.p, istKurz(k));
  if (!slotErlaubt(k, kochtag, s, ctx)) return null;
  return { k, kochtag, slots: [s], faktor: 1 };
}

function passendeFuer(s, ctx) {
  return ctx.kand.filter((k) => {
    const kt = kochtagFuer(ctx.slots[s], ctx.p, istKurz(k));
    return slotErlaubt(k, kt, s, ctx);
  });
}

function startplan(ctx, rnd) {
  const plan = [];
  const offen = [];
  for (let s = 0; s < ctx.slots.length; s++) {
    // erst Reste aus einem passenden, noch nicht vollen Kochvorgang nutzen
    const rest = plan.find((e) => e.slots.length < 2 && e.slots[e.slots.length - 1] !== s &&
      ctx.slots[e.slots[0]].m !== 'fruehstueck' && ctx.slots[s].d > ctx.slots[e.slots[e.slots.length - 1]].d &&
      e.k.r.mealprep && slotErlaubt(e.k, e.kochtag, s, ctx) && rnd() < 0.6);
    if (rest) { rest.slots.push(s); continue; }
    const pass = ctx.passend[s];
    if (!pass.length) { offen.push(s); continue; }
    const k = pass[Math.floor(rnd() * pass.length)];
    const e = neuerKochvorgang(k, s, ctx);
    if (e) plan.push(e); else offen.push(s);
  }
  return { plan, offen };
}

function kopie(plan) {
  return plan.map((e) => ({ k: e.k, kochtag: e.kochtag, slots: e.slots.slice(), faktor: e.faktor }));
}

function gueltig(e, ctx) {
  if (e.slots.length > MAX_SLOTS_JE_KOCHEN) return false;
  if (e.slots.length > 1 && !e.k.r.mealprep && !(e.k.r.lager.ungekuehlt_h >= 24)) return false;
  return e.slots.every((s) => slotErlaubt(e.k, e.kochtag, s, ctx));
}

function zug(plan, ctx, rnd) {
  const neu = kopie(plan);
  const i = Math.floor(rnd() * neu.length);
  const e = neu[i];
  const art = rnd();
  if (art < 0.4) {
    // Rezept tauschen
    const s0 = e.slots[0];
    const pass = ctx.passend[s0];
    const k = pass[Math.floor(rnd() * pass.length)];
    const kochtag = kochtagFuer(ctx.slots[s0], ctx.p, istKurz(k));
    const t = { k, kochtag, slots: e.slots, faktor: e.faktor };
    if (!gueltig(t, ctx)) {
      // notfalls nur den ersten Slot behalten, die anderen bekommen eigene Kochvorgänge
      t.slots = [s0];
      if (!gueltig(t, ctx)) return null;
      for (const s of e.slots.slice(1)) {
        const pp = ctx.passend[s];
        const k2 = pp[Math.floor(rnd() * pp.length)];
        const e2 = neuerKochvorgang(k2, s, ctx);
        if (!e2) return null;
        neu.push(e2);
      }
    }
    neu[i] = t;
  } else if (art < 0.65) {
    // Portionsfaktor ändern (größere oder kleinere Portionen)
    const f = e.faktor + (rnd() < 0.5 ? -0.25 : 0.25);
    if (f < 0.75 || f > 2) return null;
    e.faktor = f;
  } else if (art < 0.85) {
    // eine Mahlzeit eines anderen Kochvorgangs übernehmen (Vorkochen) …
    const j = Math.floor(rnd() * neu.length);
    if (j === i) return null;
    const b = neu[j];
    if (b.slots.length !== 1) return null;
    const s = b.slots[0];
    const t = { ...e, slots: [...e.slots, s].sort((x, y) => x - y) };
    if (!gueltig(t, ctx)) return null;
    neu[i] = t;
    neu.splice(j, 1);
  } else {
    // … oder abgeben (frisch kochen)
    if (e.slots.length < 2) return null;
    const s = e.slots.pop();
    const pp = ctx.passend[s];
    const k2 = pp[Math.floor(rnd() * pp.length)];
    const e2 = neuerKochvorgang(k2, s, ctx);
    if (!e2) return null;
    neu.push(e2);
  }
  return neu;
}

function optimiere(ctx, seed, runden) {
  const rnd = zufall(seed);
  let { plan, offen } = startplan(ctx, rnd);
  if (!plan.length) return { plan, offen, wert: bewerte(plan, ctx) };
  let wert = bewerte(plan, ctx);
  let best = kopie(plan), bestWert = wert;
  let temp = 8;
  for (let it = 0; it < runden; it++) {
    const neu = zug(plan, ctx, rnd);
    if (!neu) continue;
    const w = bewerte(neu, ctx);
    const delta = w.strafe - wert.strafe;
    if (delta < 0 || rnd() < Math.exp(-delta / temp)) {
      plan = neu; wert = w;
      if (w.strafe < bestWert.strafe) { best = kopie(neu); bestWert = w; }
    }
    temp = Math.max(0.05, temp * 0.9975);
  }
  return { plan: best, offen, wert: bestWert };
}

// ---------------------------------------------------------------- Ergebnis
function ursacheLeer(grund) {
  const teile = [];
  if (grund.diaet) teile.push(`${grund.diaet} wegen der Ernährungsform`);
  if (grund.allergie) teile.push(`${grund.allergie} wegen Allergien/Unverträglichkeiten`);
  if (grund.abneigung) teile.push(`${grund.abneigung} wegen Abneigungen`);
  if (grund.geraet) teile.push(`${grund.geraet}, weil ein Gerät fehlt`);
  if (grund.lager) teile.push(`${grund.lager}, weil Kühlschrank oder Gefrierfach fehlen`);
  return teile.join(', ');
}

export function erstellePlan(daten, profilEingabe) {
  const p = vervollstaendige(profilEingabe || {});
  const meldungen = [];
  const mk = pruefeMakros(p.makros);
  p.makros = mk.makros;
  meldungen.push(...mk.meldungen);
  if (!p.mahlzeiten.length) {
    return { ok: false, profil: p, meldungen: [{ art: 'fehler', text: 'Bitte wähle mindestens eine Mahlzeit aus.' }] };
  }
  const { liste, grund } = kandidaten(daten, p);
  if (!liste.length) {
    return { ok: false, profil: p, meldungen: [...meldungen, { art: 'fehler',
      text: `Mit deinen Einstellungen passt leider kein einziges Rezept. Aussortiert wurden: ${ursacheLeer(grund)}. Lockere am besten zuerst die Einstellung mit der größten Zahl.` }] };
  }
  const ziel = p.makros || { kcal: p.kcalRichtwert, p: 0, kh: 0, f: 0 };
  const { cache: preis, faktor: preisFaktor } = preisJeGramm(daten.zutaten, p.laden, p.eigenmarken);
  const ctx = { p, Z: daten.zutaten, kand: liste, ziel, preis, slots: slotsBauen(p) };
  ctx.passend = ctx.slots.map((_, s) => passendeFuer(s, ctx));
  // Mahlzeiten ohne passendes Rezept: verständlich melden und weglassen
  const fehlend = {};
  ctx.slots.forEach((sl, s) => { if (!ctx.passend[s].length) fehlend[sl.m] = true; });
  for (const m in fehlend) {
    const name = { fruehstueck: 'das Frühstück', mittag: 'das Mittagessen', abend: 'das Abendessen', snack: 'Snacks' }[m];
    const extra = m === 'mittag' && p.pause !== 'zuhause' ? ' (mit deiner Pausensituation am Arbeitsplatz)' : '';
    meldungen.push({ art: 'hinweis', text: `Für ${name}${extra} haben wir mit deinen Einstellungen kein passendes Rezept. Diese Mahlzeit bleibt im Plan frei.` });
  }
  // Mehrere Starts, bester gewinnt
  const runden = 2500;
  let bestes = null;
  for (let v = 0; v < 3; v++) {
    const erg = optimiere(ctx, (p.seed * 7919 + v * 104729) >>> 0, runden);
    if (!bestes || erg.wert.strafe < bestes.wert.strafe) bestes = erg;
  }
  // Budget nicht einzuhalten? Einmal gezielt auf den Preis optimieren.
  if (p.budget && bestes.wert.kosten > p.budget) {
    const spar = { ...ctx, p: { ...p, budget: Math.max(1, p.budget * 0.5) } };
    const erg = optimiere(spar, (p.seed * 31 + 7) >>> 0, runden * 2);
    const w = bewerte(erg.plan, ctx);
    if (w.kosten < bestes.wert.kosten) bestes = { ...erg, wert: w };
    if (bestes.wert.kosten > p.budget) {
      meldungen.push({ art: 'hinweis', text: `Dein Budget von ${p.budget.toFixed(2).replace('.', ',')} € reicht mit diesen Einstellungen nicht ganz. Der günstigste Plan, den wir gefunden haben, kostet etwa ${bestes.wert.kosten.toFixed(2).replace('.', ',')} €. Weniger Mahlzeiten, ein Discounter oder „Eigenmarken“ helfen.` });
    }
  }
  return ergebnis(bestes, ctx, meldungen, preisFaktor);
}

function ergebnis(bestes, ctx, meldungen, preisFaktor) {
  const { p, slots } = ctx;
  const plan = bestes.plan.slice().sort((a, b) => a.slots[0] - b.slots[0]);
  plan.forEach((e, i) => { e.nr = i + 1; });
  const tage = Array.from({ length: p.tage }, (_, d) => ({ d, wochentag: (d + p.starttag) % 7, mahlzeiten: [] }));
  for (const e of plan) {
    e.slots.forEach((s) => {
      const sl = slots[s];
      const abstand = sl.d - e.kochtag;
      tage[sl.d].mahlzeiten.push({
        m: sl.m, rezept: e.k.r.id, titel: e.k.r.titel, faktor: e.faktor, kochnr: e.nr,
        herkunft: haltbarkeit(e.k.r, abstand, p.geraete), gekochtAm: e.kochtag,
        box: sl.m === 'mittag' && sl.arbeit && p.pause !== 'zuhause',
        n: naehrSlot(e.k, e.faktor),
      });
    });
  }
  for (const s of bestes.offen) tage[slots[s].d].mahlzeiten.push({ m: slots[s].m, rezept: null, titel: 'frei' });
  for (const t of tage) t.mahlzeiten.sort((a, b) => MAHLZEITEN.indexOf(a.m) - MAHLZEITEN.indexOf(b.m));
  const kochen = plan.map((e) => ({
    nr: e.nr, rezept: e.k.r.id, titel: e.k.r.titel, kochtag: e.kochtag, weg: e.k.weg, faktor: e.faktor,
    portionen: rund(e.slots.length * p.personen * e.faktor, 2), zutaten: e.k.r.zutaten,
    skal: (e.slots.length * p.personen * e.faktor) / e.k.r.portionen, essen: e.slots.map((s) => ({ d: slots[s].d, m: slots[s].m })),
    lager: lagerHinweise(e, ctx),
  }));
  const einkauf = einkaufsliste(kochen, ctx.Z, p, preisFaktor);
  const ablauf = vorkochAblauf(kochen, p);
  const naehr = bestes.wert.tag.map((t) => ({ kcal: Math.round(t.kcal), p: Math.round(t.p), kh: Math.round(t.kh), f: Math.round(t.f) }));
  return {
    ok: true, profil: p, meldungen, tage, kochen, einkauf, ablauf,
    naehrwerte: { jeTag: naehr, ziel: p.makros, richtwert: p.makros ? null : p.kcalRichtwert },
    kosten: { gesamt: einkauf.summe, jeTag: rund(einkauf.summe / p.tage), jePersonUndTag: rund(einkauf.summe / p.tage / p.personen), budget: p.budget },
  };
}

function lagerHinweise(e, ctx) {
  const { p, slots } = ctx;
  const out = [];
  for (const s of e.slots) {
    const sl = slots[s];
    const abstand = sl.d - e.kochtag;
    const h = haltbarkeit(e.k.r, abstand, p.geraete);
    out.push({ d: sl.d, m: sl.m, art: h, abstand });
  }
  return out;
}
