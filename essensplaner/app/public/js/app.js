// Wochenbon – Oberfläche des Planers.
// Kein Formular: Der Plan steht beim Öffnen. Vier Schalter (Küche, Personen, Laden, Essen) öffnen je ein Blatt;
// jede Wahl plant sofort neu. Unten drei Bereiche: Woche, Einkauf (der Bon), Küchenbuch.
// Alle Eingaben bleiben im Browser (localStorage). Es wird nichts gesendet.

import { CONFIG } from './config.js';
import { erstellePlan, kandidaten, vervollstaendige, STANDARD_PROFIL } from './engine/planer.js';
import { MAHLZEIT_NAME, TAGE, TAGE_KURZ, euro, gramm, istOptional, ersterWeg, rund } from './engine/grundlagen.js';
import { LAEDEN } from './engine/laeden.js';
import { pruefeLizenz, gespeicherteLizenz } from './lizenz.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const zahl = (x, st = 0) => Number(x).toLocaleString('de-DE', { maximumFractionDigits: st, minimumFractionDigits: st });
const ruhigeBewegung = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

const GERAETE = [
  ['herd', 'Herd'], ['ofen', 'Backofen'], ['airfryer', 'Heißluftfritteuse'], ['mikrowelle', 'Mikrowelle'], ['wasserkocher', 'Wasserkocher'],
  ['kuehlschrank', 'Kühlschrank'], ['gefrier', 'Gefrierfach'], ['omnia', 'Omnia-Backofen'], ['grill', 'Grill'], ['toaster', 'Toaster'],
  ['sandwichmaker', 'Sandwichmaker'], ['puerierstab', 'Pürierstab'], ['thermo', 'Thermobehälter'],
];
const OHNE_GERAETE = Object.fromEntries(GERAETE.map(([g]) => [g, g === 'herd' ? 0 : false]));
const ALLERGENE = [['gl', 'Gluten'], ['mi', 'Milch/Laktose'], ['ei', 'Ei'], ['fi', 'Fisch'], ['kr', 'Krebstiere'], ['wt', 'Weichtiere'], ['er', 'Erdnüsse'],
  ['nu', 'Schalenfrüchte (Nüsse)'], ['so', 'Soja'], ['se', 'Sellerie'], ['sf', 'Senf'], ['ss', 'Sesam'], ['sw', 'Sulfite'], ['lu', 'Lupinen']];
const ABNEIGUNGEN = [['champignon', 'Pilze'], ['kichererbsen_dose', 'Kichererbsen'], ['rote_linsen,tellerlinsen,linsen_dose', 'Linsen'], ['kidney_dose,weisse_bohnen_tomate', 'Bohnen'],
  ['tofu', 'Tofu'], ['sojagranulat', 'Sojaschnetzel'], ['aubergine', 'Aubergine'], ['zucchini', 'Zucchini'], ['brokkoli,tk_brokkoli', 'Brokkoli'], ['kokosmilch', 'Kokosmilch'],
  ['thunfisch,makrele_dose,sardinen_dose,hering_tomate', 'Dosenfisch'], ['leberwurst_dose', 'Leberwurst'], ['quinoa', 'Quinoa'], ['feta,halloumi', 'Schafskäse/Halloumi'], ['rosinen', 'Rosinen']];
const DIAETEN = [['alles', 'Alles', 'Fleisch, Fisch, Gemüse'], ['ohne_schwein', 'Ohne Schweinefleisch', ''], ['pescetarisch', 'Mit Fisch, ohne Fleisch', ''], ['vegetarisch', 'Vegetarisch', ''], ['vegan', 'Vegan', '']];
const PAUSEN = [['zuhause', 'Ich esse zu Hause'], ['mikrowelle', 'Box, Mikrowelle da'], ['kalt', 'Box, kalt essen'], ['thermo', 'Box im Thermobehälter']];
const EINKAUF = [['woche', 'Einmal pro Woche'], ['zweimal', 'Zweimal pro Woche'], ['taeglich', 'Fast jeden Tag']];
const SIT = CONFIG.situationen;

const IKON = {
  tauschen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>',
  haken: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12.5l5 5 10-11"/></svg>',
  herz: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.9 3.8 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.4 0 5.6 3.4 4.4 6.7-1.7 4.7-9.2 9.3-9.2 9.3z"/></svg>',
  schloss: '<svg class="schloss" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
};

// Abzeichen für echte Taten. Nichts verfällt, nichts wird verglichen, alles bleibt auf dem Gerät.
const ABZEICHEN = [
  ['erster', 'Erster Teller', 'Ein Gericht aus dem Plan gekocht', (s) => s.anzahl >= 1],
  ['fuenf', 'Fünf Teller', 'Fünf Gerichte gekocht', (s) => s.anzahl >= 5],
  ['entdecker', 'Entdecker', 'Zehn verschiedene Rezepte probiert', (s) => s.verschieden >= 10],
  ['sammler', 'Sammler', '25 verschiedene Rezepte probiert', (s) => s.verschieden >= 25],
  ['ohneherd', 'Ohne Herd', 'Fünf Gerichte nur mit Wasserkocher, Mikrowelle oder ganz ohne Gerät', (s) => s.ohneHerd >= 5],
  ['vorgekocht', 'Vorgekocht', 'Drei Mahlzeiten aus dem Kühlschrank oder Gefrierfach gegessen', (s) => s.vor >= 3],
  ['woche', 'Volle Woche', 'An sieben verschiedenen Tagen gekocht', (s) => s.tage >= 7],
  ['geschmack', 'Geschmack gefunden', 'Drei Lieblingsgerichte gemerkt', (s) => s.lieblinge >= 3],
];

let daten = null;
let plus = false;
let plan = null; // letztes Ergebnis
let ansicht = 'woche';
let tagAuswahl = 0;
let ausschluss = []; // getauschte Gerichte, gelten bis zur nächsten Änderung der Einstellungen

// ---------------------------------------------------------------- Speicher
function lade(schl, fallback) {
  try { const x = localStorage.getItem(schl); return x ? JSON.parse(x) : fallback; } catch { return fallback; }
}
function speichere(schl, wert) {
  try { localStorage.setItem(schl, JSON.stringify(wert)); } catch { /* ohne Speicher geht es trotzdem */ }
}

const heuteWochentag = () => (new Date().getDay() + 6) % 7;
let profil = {
  ...STANDARD_PROFIL, ...CONFIG.profil, starttag: heuteWochentag(), extra: {}, eiweiss: false, kcalRichtwert: 2200, diaet: 'alles',
  ...lade('wb_profil', {}),
};
function profilSpeichern() { const { seed, ...rest } = profil; speichere('wb_profil', rest); }

// Aus dem gespeicherten Profil das Planer-Profil machen (Situation + einzelne Geräte, Eiweiß-Schalter)
function planerProfil(p = profil) {
  const s = SIT[p.situation] || SIT.normal;
  const geraete = { ...OHNE_GERAETE, ...s.geraete, ...p.extra };
  if (geraete.herd >= 1) { geraete.topf = true; geraete.pfanne = true; }
  const kcal = p.kcalRichtwert || 2200;
  // Eiweißreich: 25 % der Energie aus Eiweiß, Rest ausgewogen (Kohlenhydrate und Fett passen sich an)
  const makros = p.makros || (p.eiweiss ? { kcal, p: Math.round((kcal * 0.25) / 4), kh: Math.round((kcal * 0.45) / 4), f: Math.round((kcal * 0.3) / 9) } : null);
  return {
    ...p, geraete, makros, pause: p.pause ?? s.pause ?? 'zuhause', einkauf: p.einkauf ?? s.einkauf ?? 'zweimal',
    lieblinge: lade('wb_lieblinge', []), ausschluss,
  };
}

// ---------------------------------------------------------------- Planen im Hintergrund (Web Worker)
let werker = null;
const offen = new Map();
let nrZaehler = 0;
let auftrag = 0;
function werkerStarten() {
  try {
    werker = new Worker('js/planer-worker.js', { type: 'module' });
    werker.onmessage = (ev) => { const f = offen.get(ev.data.nr); offen.delete(ev.data.nr); if (f) f(ev.data); };
    werker.onerror = () => { werker = null; for (const [nr, f] of offen) { offen.delete(nr); f(null); } };
    werker.postMessage({ art: 'daten', daten });
  } catch { werker = null; }
}
function rechne(p, ganz) {
  const direkt = () => {
    const e = erstellePlan(daten, p);
    const g = ganz && e.ok ? erstellePlan(daten, ganz) : null;
    return { e, vorschau: g?.ok ? g.tage.slice(p.tage) : null };
  };
  if (!werker) return Promise.resolve(direkt());
  return new Promise((ok) => {
    const nr = ++nrZaehler;
    offen.set(nr, (antwort) => ok(antwort || direkt()));
    werker.postMessage({ art: 'plan', nr, profil: p, ganz });
  });
}

async function planen({ neuerSeed = false } = {}) {
  if (!daten) return;
  if (neuerSeed) profil.seed = (profil.seed || 1) + 1;
  const p = planerProfil();
  const lauf = { ...p };
  if (!plus) lauf.tage = Math.min(p.tage, CONFIG.kostenlos.tage);
  const nr = ++auftrag;
  $('#inhalt').setAttribute('aria-busy', 'true');
  // Gratis: der Rest der Woche als ehrliche Vorschau (nur Namen und Fotos)
  const { e, vorschau } = await rechne(lauf, !plus && p.tage > lauf.tage ? p : null);
  if (nr !== auftrag) return; // inzwischen wurde wieder etwas geändert
  $('#inhalt').setAttribute('aria-busy', 'false');
  if (vorschau) e.vorschau = vorschau;
  plan = e;
  if (tagAuswahl >= (e.tage?.length || 0) + (e.vorschau?.length || 0)) tagAuswahl = 0;
  zeichne();
}

let warte = null;
function neuPlanen() {
  profilSpeichern();
  schalterZeichnen();
  clearTimeout(warte);
  warte = setTimeout(() => { ausschluss = []; planen(); }, 350);
}

// ---------------------------------------------------------------- Schalter oben
function schalterZeichnen() {
  const s = SIT[profil.situation] || SIT.normal;
  const extra = Object.values(profil.extra || {}).filter(Boolean).length;
  const diaet = DIAETEN.find(([d]) => d === profil.diaet)?.[1] || 'Alles';
  const zusatz = [profil.eiweiss && 'eiweißreich', profil.allergene?.length && `${profil.allergene.length} Allergene`].filter(Boolean).join(', ');
  $('#schalter').innerHTML = [
    ['kueche', 'Küche', s.name + (extra ? ` +${extra}` : '')],
    ['personen', 'Personen', `${profil.personen} ${profil.personen === 1 ? 'Person' : 'Personen'}`],
    ['laden', 'Laden', LAEDEN[profil.laden]?.name || 'Aldi'],
    ['essen', 'Essen', diaet + (zusatz ? `, ${zusatz}` : '')],
    ['mehr', 'Woche', `${profil.tage} Tage, ab ${TAGE[profil.starttag]}`],
  ].map(([k, l, w]) => `<button class="pille" type="button" data-blatt="${k}"><small>${l}</small>${esc(w)}</button>`).join('');
}

// ---------------------------------------------------------------- Woche
function planDatum(d) {
  const heute = new Date(); heute.setHours(12, 0, 0, 0);
  const start = new Date(heute); start.setDate(heute.getDate() + ((profil.starttag - heuteWochentag() + 7) % 7) + d);
  return start;
}
const iso = (d) => planDatum(d).toISOString().slice(0, 10);

function alleTage() {
  return [...(plan.tage || []).map((t) => ({ ...t, frei: true })), ...(plan.vorschau || []).map((t) => ({ ...t, frei: false }))];
}

function wocheZeichnen() {
  const ziel = $('#ansicht-woche');
  if (!plan.ok) { ziel.innerHTML = ''; return; }
  const tage = alleTage();
  const gekocht = lade('wb_gekocht', {});
  const leiste = `<div class="tage" role="tablist" aria-label="Tage">${tage.map((t, i) => {
    const fertig = t.frei && t.mahlzeiten.length && t.mahlzeiten.every((m) => !m.rezept || gekocht[`${iso(t.d)}|${m.m}|${m.rezept}`]);
    return `<button class="tag-knopf${fertig ? ' fertig' : ''}" type="button" role="tab" aria-selected="${i === tagAuswahl}" data-tag="${i}" aria-label="${TAGE[t.wochentag]}${t.frei ? '' : ', mit Plus'}">${TAGE_KURZ[t.wochentag]}<b>${planDatum(t.d).getDate()}</b>${t.frei ? '' : IKON.schloss}</button>`;
  }).join('')}</div>`;
  const t = tage[tagAuswahl];
  const datum = planDatum(t.d).toLocaleDateString('de-DE', { day: 'numeric', month: 'long' });
  const nw = plan.naehrwerte?.jeTag?.[t.d];
  const kopf = `<div class="tag-titel"><h2>${TAGE[t.wochentag]}, ${datum}</h2>${t.frei && nw && plan.profil.makros ? `<small>${zahl(nw.kcal)} kcal · ${zahl(nw.p)} g Eiweiß je Person</small>` : ''}</div>`;
  let inhalt;
  if (t.frei) {
    const kalt = plan.profil.pause === 'kalt' && t.mahlzeiten.some((m) => m.box)
      ? '<p class="meldung">Boxen in der Kühltasche mit Kühlakku mitnehmen. Ungekühlt höchstens 2 Stunden.</p>' : '';
    inhalt = kalt + `<div class="gerichte">${t.mahlzeiten.map((m) => gerichtHtml(t, m, gekocht)).join('')}</div>`;
  } else {
    inhalt = `<div class="vorschau-gerichte">${t.mahlzeiten.filter((m) => m.rezept).map((m) => `<figure><img src="img/rezepte/klein/${m.rezept}.jpg" alt="" width="240" height="180" loading="lazy"><figcaption><small>${MAHLZEIT_NAME[m.m]}</small>${esc(m.titel)}</figcaption></figure>`).join('')}</div>${plusKarte()}`;
  }
  const unten = `<div class="mehr-unten"><button class="knopf zweit" type="button" id="neu">Andere Gerichte vorschlagen</button>
    ${plus && plan.ablauf.length ? '<button class="knopf zweit" type="button" data-blatt="vorkochen">Vorkoch-Ablauf</button>' : ''}
    ${plus ? '<button class="knopf zweit" type="button" id="drucken">Als PDF speichern</button>' : ''}</div>`;
  ziel.innerHTML = leiste + `<div class="tag-ansicht" id="tag-ansicht">${kopf}${inhalt}</div>` + (plus || tage.length === 1 ? '' : (t.frei ? plusHinweis() : '')) + unten;
}

function gerichtHtml(t, m, gekocht) {
  if (!m.rezept) return `<div class="gericht leer"><b>${MAHLZEIT_NAME[m.m]}</b>: frei, kein passendes Rezept mit deinen Einstellungen.</div>`;
  const schl = `${iso(t.d)}|${m.m}|${m.rezept}`;
  const fertig = !!gekocht[schl];
  const r = daten.rezepte.find((x) => x.id === m.rezept);
  const weg = ersterWeg(r, plan.profil.geraete) || r.wege[0];
  const lieb = lade('wb_lieblinge', []).includes(m.rezept);
  const merkmale = [
    `<span class="merkmal">${weg.zeit} Min.</span>`,
    m.herkunft === 'kuehl' ? '<span class="merkmal kuehl">aus dem Kühlschrank</span>' : '',
    m.herkunft === 'tk' ? '<span class="merkmal tk">aus dem Gefrierfach</span>' : '',
    m.box ? `<span class="merkmal">${plan.profil.pause === 'kalt' ? 'Box, Kühltasche' : 'Box'}</span>` : '',
    lieb ? '<span class="merkmal lieb">gemerkt</span>' : '',
    plan.profil.makros ? `<span>${zahl(m.n.kcal)} kcal · ${zahl(m.n.p)} g Eiweiß</span>` : '',
  ].join('');
  const erstes = t.mahlzeiten.find((x) => x.rezept) === m;
  return `<article class="gericht${fertig ? ' gekocht' : ''}">
    <div class="foto"><img src="img/rezepte/${m.rezept}.jpg" alt="" width="800" height="600"${erstes ? ' fetchpriority="high"' : ' loading="lazy"'}><span class="wann">${MAHLZEIT_NAME[m.m]}</span></div>
    <div class="koerper">
      <h3><button type="button" data-rezept="${m.rezept}" data-faktor="${m.faktor}">${esc(m.titel)}</button></h3>
      <div class="merkmale">${merkmale}</div>
      <div class="aktionen">
        <button class="aktion" type="button" data-tauschen="${m.rezept}">${IKON.tauschen}Tauschen</button>
        <button class="aktion" type="button" data-gekocht="${schl}" data-herkunft="${m.herkunft || ''}" aria-pressed="${fertig}">${IKON.haken}Gekocht</button>
      </div>
    </div></article>`;
}

function plusAngebot() {
  const P = CONFIG.preise;
  return `Plus: ${P.monat.text} oder ${P.jahr.text}, die ersten ${CONFIG.probeTage} Tage 0 €.`;
}
function plusHinweis() {
  const n = plan.vorschau?.length || 0;
  return n ? `<p class="hilfe" style="margin-top:14px">Die übrigen ${n} Tage stehen schon fest. Tipp oben auf einen Tag mit Schloss, um sie anzusehen.</p>` : '';
}
function plusKarte() {
  return `<div class="plus-karte"><h3>Die ganze Woche ist schon geplant</h3>
    <p>Mit Plus bekommst du für alle Tage die Rezepte, den Einkaufszettel und den Vorkoch-Ablauf.</p>
    <div class="preis-zeile"><span class="preisschild">${CONFIG.preise.monat.betrag.toFixed(2).replace('.', ',')} €</span><span>${esc(plusAngebot())}</span></div>
    <a class="knopf" href="preise.html">Ganze Woche freischalten</a></div>`;
}

// ---------------------------------------------------------------- Einkauf (der Bon)
function einkaufTitel(tag) {
  if (tag < 0) return 'Einkauf am Vortag';
  const d = planDatum(tag);
  return `Einkauf ${TAGE[(d.getDay() + 6) % 7]}, ${d.toLocaleDateString('de-DE', { day: 'numeric', month: 'numeric' })}`;
}
function wagenText(drin, gesamt) { return drin >= gesamt ? 'Alles im Wagen.' : `${drin} von ${gesamt} im Wagen`; }

function einkaufZeichnen() {
  const ziel = $('#ansicht-einkauf');
  if (!plan.ok) { ziel.innerHTML = ''; return; }
  const E = plan.einkauf;
  const haken = lade('wb_haken', {});
  const alle = E.einkaeufe.flatMap((ek) => ek.gruppen.flatMap((g) => g.posten));
  const drin = alle.filter((x) => haken[`${x.id}@${x.tag}`]).length;
  const von = planDatum(0).toLocaleDateString('de-DE', { day: 'numeric', month: 'numeric' });
  const bis = planDatum(plan.profil.tage - 1).toLocaleDateString('de-DE', { day: 'numeric', month: 'numeric' });
  const mehrere = E.einkaeufe.length > 1;
  const zeilen = E.einkaeufe.map((ek) => `${mehrere ? `<div class="bon-einkauf">${esc(einkaufTitel(ek.tag))}</div>` : ''}
    ${ek.gruppen.map((g) => `<div class="bon-gang">${esc(g.name)}</div>${g.posten.map((x) => `<label class="bon-zeile"><input type="checkbox" data-haken="${x.id}@${x.tag}"${haken[`${x.id}@${x.tag}`] ? ' checked' : ''}>
      <span><b>${x.packungen} × ${esc(x.name)}</b><small>${esc(x.packung)} · gebraucht ${esc(x.menge)}${x.rest ? `, Rest ca. ${esc(x.rest)}` : ''}</small></span>
      <span class="betrag">${euro(x.preis)}</span></label>`).join('')}`).join('')}`).join('');
  const vorrat = E.vorrat.length ? `<div class="bon-gang">Hast du wahrscheinlich schon (nur Anteil gerechnet)</div>${E.vorrat.map((x) => `<label class="bon-zeile vorrat"><input type="checkbox" data-haken="${x.id}"${haken[x.id] ? ' checked' : ''}>
      <span><b>${esc(x.name)}</b><small>${esc(x.menge)}</small></span><span class="betrag">${euro(x.preisAnteil)}</span></label>`).join('')}` : '';
  ziel.innerHTML = `<div class="bon" id="bon">
    <div class="bon-kopf"><b>Wochenbon</b><small>${esc(E.laden)} · ${plan.profil.tage === 1 ? von : `${von} bis ${bis}`} · ${plan.profil.personen} ${plan.profil.personen === 1 ? 'Person' : 'Personen'}</small></div>
    <div class="bon-wagen${drin >= alle.length ? ' voll' : ''}" id="wagen" data-gesamt="${alle.length}"><span id="wagen-text">${wagenText(drin, alle.length)}</span><div class="balken"><i style="width:${alle.length ? (100 * drin) / alle.length : 0}%"></i></div></div>
    ${zeilen}${vorrat}
    <div class="bon-summe"><span>Summe ca.</span><span class="preisschild">${euro(E.summe)}</span></div>
    <p class="bon-fuss">Geschätzt nach Packungspreisen bei ${esc(E.laden)}, Stand 10/2026. Nach Abteilungen sortiert, wie es im Markt meist liegt.${mehrere ? ' Frisches kaufst du kurz vor dem Kochen, Vorräte beim ersten Einkauf.' : ''}</p>
  </div>
  <div class="mehr-unten" style="justify-content:center"><button class="knopf zweit" type="button" id="teilen">Liste teilen oder kopieren</button></div>
  ${!plus && plan.vorschau?.length ? plusKarte() : ''}`;
  $('#einkauf-zahl').hidden = !alle.length;
  $('#einkauf-zahl').textContent = alle.length - drin;
}

function teilen() {
  const E = plan.einkauf;
  const text = [`Wochenbon ${E.laden} (ca. ${euro(E.summe)})`, ...E.einkaeufe.flatMap((ek) => [
    ...(E.einkaeufe.length > 1 ? ['', `== ${einkaufTitel(ek.tag)} ==`] : []),
    ...ek.gruppen.flatMap((g) => ['', g.name, ...g.posten.map((x) => `- ${x.packungen} × ${x.name} (${x.packung})`)])])].join('\n');
  if (navigator.share) navigator.share({ title: 'Einkaufszettel', text }).catch(() => {});
  else navigator.clipboard?.writeText(text).then(() => meldeKurz('Liste kopiert.'));
}

// ---------------------------------------------------------------- Küchenbuch
function statistik() {
  const g = Object.values(lade('wb_gekocht', {}));
  return {
    anzahl: g.length, verschieden: new Set(g.map((x) => x.r)).size, ohneHerd: g.filter((x) => x.ohneHerd).length,
    vor: g.filter((x) => x.vor).length, tage: new Set(g.map((x) => x.d)).size, lieblinge: lade('wb_lieblinge', []).length,
  };
}
function erreicht(s) { return ABZEICHEN.filter(([, , , bed]) => bed(s)).map(([id]) => id); }

function buchZeichnen() {
  const s = statistik();
  const gesamt = daten?.rezepte.length || 195;
  const hat = erreicht(s);
  const lieb = lade('wb_lieblinge', []).map((id) => daten?.rezepte.find((r) => r.id === id)).filter(Boolean);
  const leer = !s.anzahl && !lieb.length ? `<div class="leer-karte"><h3>Noch leer</h3><p>Tipp im Plan bei einem Gericht auf „Gekocht“, sobald es auf dem Teller war. Hier sammeln sich dann deine Gerichte, Abzeichen und Lieblinge. Alles bleibt auf diesem Gerät.</p></div>` : '';
  $('#ansicht-buch').innerHTML = `<div class="buch">${leer}
    <div class="sammlung"><b>${s.verschieden}</b><span>von ${gesamt} Rezepten entdeckt</span>
      <div class="balken"><i style="width:${(100 * s.verschieden) / gesamt}%"></i></div>
      <small>${s.anzahl} ${s.anzahl === 1 ? 'Gericht' : 'Gerichte'} gekocht, an ${s.tage} ${s.tage === 1 ? 'Tag' : 'Tagen'}</small></div>
    <h2>Abzeichen</h2>
    <ul class="abzeichen">${ABZEICHEN.map(([id, name, wie]) => `<li class="${hat.includes(id) ? 'hat' : ''}"><span class="plakette" aria-hidden="true">${IKON.haken}</span><b>${esc(name)}</b><small>${esc(wie)}</small><span class="sr">${hat.includes(id) ? 'erreicht' : 'noch offen'}</span></li>`).join('')}</ul>
    ${lieb.length ? `<h2>Deine Lieblinge</h2><p class="hilfe">Gemerkte Gerichte plant Wochenbon öfter ein. Merken geht im Rezept.</p>
      <ul class="lieblinge">${lieb.map((r) => `<li><button type="button" data-rezept="${r.id}" data-faktor="1"><img src="img/rezepte/klein/${r.id}.jpg" alt="" width="240" height="180" loading="lazy">${esc(r.titel)}</button></li>`).join('')}</ul>` : ''}
    ${s.anzahl ? '<p><button class="knopf zweit" type="button" id="buch-leeren">Küchenbuch leeren</button></p>' : ''}
  </div>`;
}

function gekochtUmschalten(knopf) {
  const schl = knopf.dataset.gekocht;
  const g = lade('wb_gekocht', {});
  const vorher = erreicht(statistik());
  if (g[schl]) delete g[schl];
  else {
    const [d, , r] = schl.split('|');
    const rz = daten.rezepte.find((x) => x.id === r);
    const weg = ersterWeg(rz, plan.profil.geraete) || rz.wege[0];
    g[schl] = { r, d, ohneHerd: weg.geraete.every((x) => ['wasserkocher', 'mikrowelle'].includes(x)), vor: ['kuehl', 'tk'].includes(knopf.dataset.herkunft) };
  }
  speichere('wb_gekocht', g);
  const an = !!g[schl];
  knopf.setAttribute('aria-pressed', an);
  knopf.closest('.gericht').classList.toggle('gekocht', an);
  const neu = erreicht(statistik()).filter((id) => !vorher.includes(id));
  if (neu.length) meldeKurz(`Neues Abzeichen: ${ABZEICHEN.find((x) => x[0] === neu[0])[1]}. Steht im Küchenbuch.`);
  buchZeichnen();
  // Tagesleiste: Punkt, wenn alle Gerichte des Tages gekocht sind
  const t = alleTage()[tagAuswahl];
  const alleFertig = t.mahlzeiten.every((m) => !m.rezept || g[`${iso(t.d)}|${m.m}|${m.rezept}`]);
  $(`.tag-knopf[data-tag="${tagAuswahl}"]`)?.classList.toggle('fertig', alleFertig);
}

function merkenUmschalten(knopf) {
  const id = knopf.dataset.merken;
  const l = lade('wb_lieblinge', []);
  const an = !l.includes(id);
  const neu = an ? [...l, id] : l.filter((x) => x !== id);
  speichere('wb_lieblinge', neu);
  knopf.setAttribute('aria-pressed', an);
  meldeKurz(an ? (neu.length === 3 ? 'Neues Abzeichen: Geschmack gefunden.' : 'Gemerkt. Wochenbon plant es öfter ein.') : 'Nicht mehr gemerkt.');
  buchZeichnen();
}

// ---------------------------------------------------------------- Blätter (Einstellungen von unten)
function wahl(name, wert, titel, kurz, an, typ = 'radio') {
  return `<label class="wahl"><input type="${typ}" name="${name}" value="${esc(wert)}"${an ? ' checked' : ''}><span><b>${esc(titel)}</b>${kurz ? `<small>${esc(kurz)}</small>` : ''}</span><span class="punkt" aria-hidden="true"></span></label>`;
}
function chips(name, liste, an, typ = 'checkbox') {
  return `<div class="chips">${liste.map(([w, t]) => `<label class="chip"><input type="${typ}" name="${name}" value="${esc(w)}"${an(w) ? ' checked' : ''}><span>${esc(t)}</span></label>`).join('')}</div>`;
}
function schalter(name, titel, kurz, an) {
  return `<label class="schalter-zeile"><span><b>${esc(titel)}</b>${kurz ? `<br><small class="hilfe">${esc(kurz)}</small>` : ''}</span><input type="checkbox" role="switch" name="${name}"${an ? ' checked' : ''}></label>`;
}

const BLAETTER = {
  kueche: () => ['Deine Küche', `<p class="treffer" id="treffer"><b id="treffer-zahl">…</b><span id="treffer-text">Rezepte passen</span></p>
    <div class="wahl-liste">${Object.entries(SIT).map(([k, s]) => wahl('situation', k, s.name, s.kurz, profil.situation === k)).join('')}</div>
    <h3>Einzelne Geräte dazu</h3>
    ${chips('extra', GERAETE.filter(([g]) => !(SIT[profil.situation] || SIT.normal).geraete[g]), (g) => profil.extra?.[g])}
    <p class="hilfe">Topf und Pfanne setzen wir beim Herd voraus. Eine Kühlbox zählt als Kühlschrank nur, wenn sie zuverlässig unter 7 °C kühlt.</p>`],
  personen: () => ['Für wie viele?', `<div class="zahlen-wahl">${[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `<label class="chip"><input type="radio" name="personen" value="${n}"${profil.personen === n ? ' checked' : ''}><span>${n}</span></label>`).join('')}</div>
    <p class="hilfe">Mengen und Einkauf werden umgerechnet.</p>`],
  laden: () => ['Wo kaufst du ein?', `<div class="wahl-liste">${Object.entries(LAEDEN).map(([k, l]) => wahl('laden', k, l.name, '', profil.laden === k)).join('')}</div>
    <h3>Feinheiten</h3>
    ${schalter('eigenmarken', 'Eigenmarken bevorzugen', 'günstigere Hausmarken des Ladens', profil.eigenmarken)}
    <div class="feld" style="margin-top:12px"><label for="budget">Budget für den ganzen Plan (€)</label><input id="budget" name="budget" type="number" inputmode="decimal" min="0" step="1" placeholder="egal" value="${profil.budget ?? ''}"></div>
    <p class="hilfe">Preise sind Schätzwerte je Laden, Stand 10/2026, keine Tagespreise.</p>`],
  essen: () => ['Was isst du?', `<div class="wahl-liste">${DIAETEN.map(([d, t, k]) => wahl('diaet', d, t, k, profil.diaet === d)).join('')}</div>
    <h3>Mehr Eiweiß</h3>
    ${schalter('eiweiss', 'Eiweißreich planen', 'etwa ein Viertel der Energie aus Eiweiß, aus dem normalen Regal', profil.eiweiss)}
    <h3>Allergien und Unverträglichkeiten</h3>
    ${chips('allergen', ALLERGENE, (a) => profil.allergene?.includes(a))}
    <p class="hilfe">Wir filtern nach den 14 Hauptallergenen laut unseren Zutatendaten. Spuren erkennen wir nicht: Prüf bei Allergien immer das Etikett. Wochenbon ersetzt keine ärztliche Beratung.</p>
    <h3>Das mag ich nicht</h3>
    ${chips('abneigung', ABNEIGUNGEN, (w) => w.split(',').every((id) => profil.abneigungen?.includes(id)))}`],
  mehr: () => ['Deine Woche', `<h3 style="margin-top:4px">Wie viele Tage?</h3>
    <div class="zahlen-wahl">${[3, 5, 7, 14].map((n) => `<label class="chip"><input type="radio" name="tage" value="${n}"${profil.tage === n ? ' checked' : ''}><span>${n}</span></label>`).join('')}</div>
    <div class="feld" style="margin-top:12px"><label for="starttag">Los geht’s am</label><select id="starttag" name="starttag">${TAGE.map((t, i) => `<option value="${i}"${profil.starttag === i ? ' selected' : ''}>${t}${i === heuteWochentag() ? ' (heute)' : ''}</option>`).join('')}</select></div>
    <h3>Mahlzeiten</h3>
    ${chips('mahlzeit', Object.entries(MAHLZEIT_NAME), (m) => profil.mahlzeiten.includes(m))}
    <h3>Mittags unter der Woche</h3>
    <div class="wahl-liste">${PAUSEN.map(([k, t]) => wahl('pause', k, t, '', (profil.pause ?? SIT[profil.situation]?.pause ?? 'zuhause') === k)).join('')}</div>
    <h3>Wie oft kaufst du ein?</h3>
    <div class="wahl-liste">${EINKAUF.map(([k, t]) => wahl('einkauf', k, t, '', (profil.einkauf ?? SIT[profil.situation]?.einkauf ?? 'zweimal') === k)).join('')}</div>
    <p class="hilfe">Frisches Fleisch planen wir höchstens 2 Tage nach dem Einkauf, Hackfleisch 1 Tag.</p>
    <h3>Feste Kochtage</h3>
    ${chips('kochtag', TAGE_KURZ.map((t, i) => [String(i), t]), (i) => (profil.kochtage || []).includes(Number(i)))}
    <p class="hilfe">Leer lassen heißt: jeden Tag frisch. Mit Kochtagen plant Wochenbon Boxen für die Tage danach.</p>
    <h3>Wie viel brauchst du?</h3>
    <div class="wahl-liste">${[[1900, 'Eher wenig Bewegung', 'ca. 1.900 kcal'], [2200, 'Normal aktiv', 'ca. 2.200 kcal'], [2800, 'Körperlich harte Arbeit', 'ca. 2.800 kcal']].map(([k, t, z]) => wahl('kcal', String(k), t, z, (profil.kcalRichtwert || 2200) === k)).join('')}</div>
    <p class="hilfe">Je Person und Tag. Wochenbon ist kein Diät- oder Therapieprogramm.</p>`],
  vorkochen: () => ['Vorkoch-Ablauf', ablaufHtml()],
};

function blattOeffnen(art) {
  const [titel, html] = BLAETTER[art]();
  $('#blatt-titel').textContent = titel;
  $('#blatt-inhalt').innerHTML = html;
  $('#blatt').dataset.art = art;
  $('#blatt').showModal();
  if (art === 'kueche') zaehleTreffer();
}

function blattAenderung(ev) {
  const el = ev.target;
  const f = $('#blatt-inhalt');
  const alle = (n) => $$(`[name="${n}"]:checked`, f).map((x) => x.value);
  switch (el.name) {
    case 'situation': profil.situation = el.value; profil.extra = {}; profil.pause = undefined; profil.einkauf = undefined;
      blattOeffnen('kueche'); break; // Geräteliste passt sich der Situation an
    case 'extra': profil.extra = Object.fromEntries(alle('extra').map((g) => [g, g === 'herd' ? 2 : true])); zaehleTreffer(); break;
    case 'personen': profil.personen = Number(el.value); break;
    case 'laden': profil.laden = el.value; break;
    case 'eigenmarken': profil.eigenmarken = el.checked; break;
    case 'budget': profil.budget = el.value ? Math.max(0, Number(String(el.value).replace(',', '.'))) || null : null; break;
    case 'diaet': profil.diaet = el.value; break;
    case 'eiweiss': profil.eiweiss = el.checked; break;
    case 'allergen': profil.allergene = alle('allergen'); break;
    case 'abneigung': profil.abneigungen = alle('abneigung').flatMap((x) => x.split(',')); break;
    case 'tage': profil.tage = Number(el.value); break;
    case 'starttag': profil.starttag = Number(el.value); break;
    case 'mahlzeit': profil.mahlzeiten = alle('mahlzeit'); if (!profil.mahlzeiten.length) { el.checked = true; profil.mahlzeiten = [el.value]; } break;
    case 'pause': profil.pause = el.value; break;
    case 'einkauf': profil.einkauf = el.value; break;
    case 'kochtag': { const k = alle('kochtag').map(Number); profil.kochtage = k.length ? k : null; break; }
    case 'kcal': profil.kcalRichtwert = Number(el.value); break;
    default: return;
  }
  neuPlanen();
}

// Treffer-Zähler im Küchen-Blatt: wie viele Rezepte passen zur gewählten Küche?
function zaehleTreffer() {
  const el = $('#treffer-zahl');
  if (!el || !daten) return;
  const n = kandidaten(daten, vervollstaendige(planerProfil())).liste.length;
  rollen(el, Number(el.dataset.wert) || 0, n);
  el.dataset.wert = n;
  $('#treffer').classList.toggle('null', n === 0);
  $('#treffer-text').textContent = n === 0 ? 'Rezepte passen. Lockere Allergien oder Abneigungen.' : n === 1 ? 'Rezept passt zu deiner Küche' : 'Rezepte passen zu deiner Küche';
}
function rollen(el, von, bis) {
  if (ruhigeBewegung() || von === bis) { el.textContent = bis; return; }
  const t0 = performance.now();
  const schritt = (t) => {
    const x = Math.min(1, (t - t0) / 380);
    el.textContent = Math.round(von + (bis - von) * (1 - (1 - x) ** 3));
    if (x < 1) requestAnimationFrame(schritt);
  };
  requestAnimationFrame(schritt);
  el.classList.remove('stoss'); void el.offsetWidth; el.classList.add('stoss');
}

// ---------------------------------------------------------------- Rezept und Vorkochen
function rezeptOeffnen(id, faktor) {
  const r = daten.rezepte.find((x) => x.id === id);
  if (!r) return;
  const p = plan.profil;
  const weg = ersterWeg(r, p.geraete) || r.wege[0];
  const portionen = p.personen * faktor;
  const skal = portionen / r.portionen;
  const Z = daten.zutaten;
  const zut = r.zutaten.map((z) => {
    const zi = Z[z[0]];
    const g = gramm(zi, z[1], z[2]) * skal;
    const menge = z[2] === 'stk' ? `${zahl(z[1] * skal, 1)} Stück` : `${zahl(g < 20 ? rund(g, 1) : Math.round(g))} ${zi.einheit === 'ml' ? 'ml' : 'g'}`;
    return `<li>${menge} ${esc(zi.name)}${istOptional(z) ? ' (optional)' : ''}</li>`;
  }).join('');
  const AL = Object.fromEntries(ALLERGENE);
  const L = r.lager;
  const lager = [
    L.kuehl_tage ? `Im Kühlschrank (höchstens 7 °C, besser 5 °C) bis zu ${L.kuehl_tage === 1 ? '1 Tag' : '2 Tage'}.` : 'Am besten gleich essen.',
    L.einfrierbar ? 'Lässt sich einfrieren.' : 'Nicht zum Einfrieren geeignet.',
    L.ungekuehlt_h >= 24 ? 'Hält auch ungekühlt bis zum nächsten Tag.' : 'Ungekühlt höchstens 2 Stunden.',
    L.aufwaermen !== 'nein' && L.aufwaermen !== 'thermo' ? 'Zum Aufwärmen durch und durch erhitzen (dampfend heiß, mindestens 70 °C für 2 Minuten).' : '',
    L.aufwaermen === 'thermo' ? 'Für den Thermobehälter: Behälter mit kochendem Wasser vorwärmen, Essen kochend heiß einfüllen. Bis zum Essen muss es mindestens 60 °C heiß bleiben. Ist es nur noch lauwarm, nicht mehr essen.' : '',
  ].filter(Boolean).map((x) => `<li>${x}</li>`).join('');
  const geraete = weg.geraete.map((g) => (g === 'herd' ? '1 Platte' : g === 'herd2' ? '2 Platten' : GERAETE.find((x) => x[0] === g)?.[1] || g)).join(', ') || 'ohne Gerät';
  const lieb = lade('wb_lieblinge', []).includes(r.id);
  $('#rezept-titel').textContent = r.titel;
  $('#rezept-inhalt').innerHTML = `
    <img class="foto" src="img/rezepte/${r.id}.jpg" alt="" width="800" height="600" onerror="this.remove()">
    <p class="merkmale"><span class="merkmal">${zahl(portionen, 2)} ${portionen === 1 ? 'Portion' : 'Portionen'}</span><span class="merkmal">${weg.zeit} Min., davon ${weg.aktiv} Min. Arbeit</span><span class="merkmal">${esc(geraete)}</span></p>
    <p><button class="merken" type="button" data-merken="${r.id}" aria-pressed="${lieb}">${IKON.herz}Merken, Wochenbon plant es öfter ein</button></p>
    <h3>Zutaten</h3><ul class="zutaten">${zut}</ul>
    <h3>So geht’s</h3><ol>${weg.schritte.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
    <h3>Lagern</h3><ul>${lager}</ul>
    <p><b>Je Portion:</b> ${zahl(r.n.kcal)} kcal, ${zahl(r.n.p)} g Eiweiß, ${zahl(r.n.kh)} g Kohlenhydrate, ${zahl(r.n.f)} g Fett.</p>
    <p><b>Enthält:</b> ${r.al.length ? r.al.map((a) => AL[a] || a).join(', ') : 'keines der 14 Hauptallergene laut unseren Zutatendaten'}. Prüf bei Allergien immer das Etikett deiner Produkte.</p>
    ${r.tipp ? `<p><b>Tipp:</b> ${esc(r.tipp)}</p>` : ''}`;
  $('#rezept').showModal();
}

function ablaufHtml() {
  if (!plan?.ablauf?.length) return '<p>In diesem Plan wird alles frisch gekocht. Mit festen Kochtagen (unter „Woche“) plant Wochenbon Boxen zum Vorkochen.</p>';
  return plan.ablauf.map((a) => `<section class="ablauf"><h3>${esc(a.wochentag)}: etwa ${a.dauer} Minuten, davon ${a.aktiv} Minuten Arbeit</h3>
    <ol>${a.schritte.map((s) => `<li><span class="zeit">${Math.floor(s.start / 60)}:${String(s.start % 60).padStart(2, '0')}</span> ${esc(s.titel)} (${zahl(s.portionen, 1)} Portionen, ${s.aktiv} Min. Arbeit, fertig nach ${s.ende} Min.)</li>`).join('')}</ol>
    <h3>Boxen</h3><ul class="box-liste">${a.boxen.map((b) => `<li><b>${b.anzahl} × ${esc(b.titel)}</b> für ${esc(b.fuer)}, ${esc(b.lager)}</li>`).join('')}</ul>
    <ul>${a.abschluss.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>`).join('');
}

// ---------------------------------------------------------------- Zeichnen und Navigation
function zeichne() {
  $('#meldungen').innerHTML = (plan.meldungen || []).map((m) => `<p class="meldung${m.art === 'fehler' ? ' fehler' : ''}" role="status">${esc(m.text)}</p>`).join('');
  const kurz = plan.ok ? `${plan.profil.tage === 1 ? 'Heute' : `${plan.profil.tage} Tage`} geplant, Einkauf ca. ${euro(plan.kosten.gesamt)} bei ${plan.einkauf.laden}.` : '';
  $('#untertitel').textContent = plan.ok ? `${kurz} Tipp oben, wenn etwas nicht passt.` : 'Mit diesen Einstellungen klappt es noch nicht.';
  wocheZeichnen();
  einkaufZeichnen();
  buchZeichnen();
}

function zeigeAnsicht(a) {
  ansicht = a;
  for (const k of ['woche', 'einkauf', 'buch']) $(`#ansicht-${k}`).hidden = k !== a;
  $$('.leiste [data-ansicht]').forEach((b) => (b.dataset.ansicht === a ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current')));
  $('#titel').textContent = { woche: 'Deine Woche', einkauf: 'Dein Einkauf', buch: 'Dein Küchenbuch' }[a];
  $('.app-kopf .schalter').hidden = a === 'buch';
  window.scrollTo({ top: 0, behavior: ruhigeBewegung() ? 'auto' : 'smooth' });
}

function tagWaehlen(i) {
  const n = alleTage().length;
  tagAuswahl = Math.max(0, Math.min(n - 1, i));
  wocheZeichnen();
  $(`.tag-knopf[data-tag="${tagAuswahl}"]`)?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: ruhigeBewegung() ? 'auto' : 'smooth' });
}

function meldeKurz(text) {
  const t = $('#toast');
  t.textContent = text;
  t.hidden = false;
  clearTimeout(meldeKurz.zeit);
  meldeKurz.zeit = setTimeout(() => { t.hidden = true; }, 3400);
}

async function start() {
  schalterZeichnen();
  const laden = fetch('data/daten.json').then((r) => r.json()).then((d) => { daten = d; });
  const schl = gespeicherteLizenz();
  const lizenz = schl ? pruefeLizenz(schl).then((r) => { plus = r.ok; }) : Promise.resolve();
  lizenz.then(() => { if (plus) $('#status').innerHTML = '<span class="plus-schild">Plus aktiv</span>'; });
  if (plus || profil.tage === undefined) profil.tage = 7;

  document.addEventListener('click', (ev) => {
    const t = ev.target;
    const b = t.closest('[data-blatt]'); if (b) return blattOeffnen(b.dataset.blatt);
    const zu = t.closest('[data-zu]'); if (zu) return zu.closest('dialog').close();
    const a = t.closest('[data-ansicht]'); if (a) return zeigeAnsicht(a.dataset.ansicht);
    const tag = t.closest('[data-tag]'); if (tag) return tagWaehlen(Number(tag.dataset.tag));
    const r = t.closest('[data-rezept]'); if (r) return rezeptOeffnen(r.dataset.rezept, Number(r.dataset.faktor) || 1);
    const m = t.closest('[data-merken]'); if (m) return merkenUmschalten(m);
    const g = t.closest('[data-gekocht]'); if (g) return gekochtUmschalten(g);
    const w = t.closest('[data-tauschen]');
    if (w) {
      const titel = daten.rezepte.find((x) => x.id === w.dataset.tauschen)?.titel || 'Das Gericht';
      ausschluss = [...new Set([...ausschluss, w.dataset.tauschen])];
      planen().then(() => meldeKurz(`„${titel}“ getauscht.`));
      return;
    }
    if (t.id === 'neu') { ausschluss = []; return planen({ neuerSeed: true }).then(() => meldeKurz('Neue Gerichte, gleiche Einstellungen.')); }
    if (t.id === 'drucken') return window.print();
    if (t.id === 'teilen') return teilen();
    if (t.id === 'buch-leeren') {
      if (!confirm('Küchenbuch leeren? Gekochte Gerichte und Abzeichen werden auf diesem Gerät gelöscht. Deine Lieblinge bleiben.')) return;
      speichere('wb_gekocht', {}); buchZeichnen(); wocheZeichnen();
    }
  });
  // Dialoge schließen beim Tippen auf den abgedunkelten Rand
  $$('dialog').forEach((d) => d.addEventListener('click', (ev) => { if (ev.target === d) d.close(); }));
  $('#blatt').addEventListener('change', blattAenderung);
  $('#ansicht-einkauf').addEventListener('change', (ev) => {
    const id = ev.target.dataset?.haken;
    if (!id) return;
    const h = lade('wb_haken', {}); h[id] = ev.target.checked; speichere('wb_haken', h);
    const box = $('#wagen');
    const gesamt = Number(box.dataset.gesamt);
    const drin = $$('#bon .bon-zeile:not(.vorrat) input').filter((x) => x.checked).length;
    box.querySelector('i').style.width = `${(100 * drin) / Math.max(gesamt, 1)}%`;
    $('#wagen-text').textContent = wagenText(drin, gesamt);
    box.classList.toggle('voll', drin >= gesamt);
    $('#einkauf-zahl').textContent = gesamt - drin;
    if (drin === gesamt && ev.target.checked) meldeKurz('Alles im Wagen.');
  });
  // Tage wischen
  let x0 = null;
  $('#ansicht-woche').addEventListener('pointerdown', (ev) => { if (ev.target.closest('#tag-ansicht')) x0 = [ev.clientX, ev.clientY]; });
  $('#ansicht-woche').addEventListener('pointerup', (ev) => {
    if (!x0) return;
    const dx = ev.clientX - x0[0], dy = ev.clientY - x0[1];
    x0 = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > 2 * Math.abs(dy)) tagWaehlen(tagAuswahl + (dx < 0 ? 1 : -1));
  });
  $('#ansicht-woche').addEventListener('keydown', (ev) => {
    if (!ev.target.closest('.tage') || !['ArrowRight', 'ArrowLeft'].includes(ev.key)) return;
    tagWaehlen(tagAuswahl + (ev.key === 'ArrowRight' ? 1 : -1));
    $(`.tag-knopf[data-tag="${tagAuswahl}"]`)?.focus();
  });

  await Promise.all([laden, lizenz]);
  werkerStarten();
  planen();
  if (/iPhone|iPad|iPod/.test(navigator.userAgent) && !navigator.standalone && !lade('wb_ios_hinweis', false)) {
    speichere('wb_ios_hinweis', true);
    setTimeout(() => meldeKurz('Tipp: Über „Teilen“ → „Zum Home-Bildschirm“ bleibt Wochenbon offline nutzbar.'), 2500);
  }
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) navigator.serviceWorker.register('sw.js').catch(() => {});
}

start();
