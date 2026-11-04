// Oberfläche des Planers: Formular → Plan, Einkaufsliste, Vorkochen, Nährwerte, Rezeptansicht, Export.
// Alle Eingaben (auch Allergien, Ziele) bleiben im Browser (localStorage). Es wird nichts gesendet.

import { CONFIG } from './config.js';
import { erstellePlan, STANDARD_PROFIL, kandidaten, vervollstaendige } from './engine/planer.js';
import { MAHLZEIT_NAME, TAGE, TAGE_KURZ, euro, gramm, istOptional, ersterWeg, rund } from './engine/grundlagen.js';
import { LAEDEN } from './engine/laeden.js';
import { lagerText } from './engine/ablauf.js';
import { pruefeLizenz, gespeicherteLizenz, speichereLizenz } from './lizenz.js';

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const zahl = (x, st = 0) => Number(x).toLocaleString('de-DE', { maximumFractionDigits: st, minimumFractionDigits: st });

const VARIANTE = (() => {
  const v = new URLSearchParams(location.search).get('v') || document.documentElement.dataset.variante || 'alltag';
  return CONFIG.varianten[v] ? v : 'alltag';
})();
const V = CONFIG.varianten[VARIANTE];
document.documentElement.dataset.theme = V.theme;

const GERAETE = [
  ['wasserkocher', 'Wasserkocher'], ['mikrowelle', 'Mikrowelle'], ['topf', 'Topf'], ['pfanne', 'Pfanne'], ['ofen', 'Backofen'],
  ['airfryer', 'Heißluftfritteuse'], ['omnia', 'Omnia-Backofen'], ['grill', 'Grill'], ['toaster', 'Toaster'], ['sandwichmaker', 'Sandwichmaker'],
  ['puerierstab', 'Pürierstab'], ['kuehlschrank', 'Kühlschrank'], ['gefrier', 'Gefrierfach'], ['thermo', 'Thermobehälter'],
];
const ALLERGENE = [['gl', 'Gluten'], ['mi', 'Milch/Laktose'], ['ei', 'Ei'], ['fi', 'Fisch'], ['kr', 'Krebstiere'], ['wt', 'Weichtiere'], ['er', 'Erdnüsse'],
  ['nu', 'Schalenfrüchte (Nüsse)'], ['so', 'Soja'], ['se', 'Sellerie'], ['sf', 'Senf'], ['ss', 'Sesam'], ['sw', 'Sulfite'], ['lu', 'Lupinen']];
const ABNEIGUNGEN = [['champignon', 'Pilze'], ['kichererbsen_dose', 'Kichererbsen'], ['rote_linsen,tellerlinsen,linsen_dose', 'Linsen'], ['kidney_dose,weisse_bohnen_tomate', 'Bohnen'],
  ['tofu', 'Tofu'], ['sojagranulat', 'Sojaschnetzel'], ['aubergine', 'Aubergine'], ['zucchini', 'Zucchini'], ['brokkoli,tk_brokkoli', 'Brokkoli'], ['kokosmilch', 'Kokosmilch'],
  ['thunfisch,makrele_dose,sardinen_dose,hering_tomate', 'Dosenfisch'], ['leberwurst_dose', 'Leberwurst'], ['quinoa', 'Quinoa'], ['feta,halloumi', 'Schafskäse/Halloumi'], ['rosinen', 'Rosinen']];
const DIAETEN = [['alles', 'Alles'], ['ohne_schwein', 'Ohne Schweinefleisch'], ['pescetarisch', 'Mit Fisch, ohne Fleisch'], ['vegetarisch', 'Vegetarisch'], ['vegan', 'Vegan']];
const PAUSEN = [['zuhause', 'Ich esse zu Hause'], ['mikrowelle', 'Box, Mikrowelle da'], ['kalt', 'Box, kalt essen'], ['thermo', 'Box im Thermobehälter']];
const EINKAUF = [['woche', 'Einmal pro Woche'], ['zweimal', 'Zweimal pro Woche'], ['taeglich', 'Fast jeden Tag']];
const RICHTWERTE = [[1900, 'Eher wenig Bewegung (ca. 1.900 kcal)'], [2200, 'Normal aktiv (ca. 2.200 kcal)'], [2800, 'Körperlich harte Arbeit (ca. 2.800 kcal)']];

let daten = null;
let plus = false;
let letztes = null;
let ausschluss = []; // getauschte Gerichte, gelten bis zum nächsten „Plan erstellen“

const IKON = {
  herz: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.9 3.8 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.4 0 5.6 3.4 4.4 6.7-1.7 4.7-9.2 9.3-9.2 9.3z"/></svg>',
  tauschen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>',
  haken: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12.5l5 5 10-11"/></svg>',
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

// ---------------------------------------------------------------- Speicher
function lade(schl, fallback) {
  try { const x = localStorage.getItem(schl); return x ? JSON.parse(x) : fallback; } catch { return fallback; }
}
function speichere(schl, wert) {
  try { localStorage.setItem(schl, JSON.stringify(wert)); } catch { /* ohne Speicher geht es trotzdem */ }
}

function startProfil() {
  const p = structuredClone({ ...STANDARD_PROFIL, ...V.profil, geraete: { ...STANDARD_PROFIL.geraete, ...V.profil.geraete } });
  const gespeichert = lade('ep_profil_' + VARIANTE, null);
  return gespeichert ? { ...p, ...gespeichert, geraete: { ...p.geraete, ...gespeichert.geraete } } : p;
}

// ---------------------------------------------------------------- Formular
function chips(name, liste, typ, aktiv) {
  return `<div class="chips">${liste.map(([w, t]) => `<label class="chip"><input type="${typ}" name="${name}" value="${esc(w)}"${aktiv(w) ? ' checked' : ''}><span>${esc(t)}</span></label>`).join('')}</div>`;
}
function stepper(name, wert, min, max, label) {
  return `<div class="feld"><span class="lbl" id="l-${name}">${label}</span><div class="stepper" role="group" aria-labelledby="l-${name}">
    <button type="button" data-step="${name}" data-d="-1" aria-label="${label}: weniger">−</button>
    <output id="o-${name}" aria-live="polite">${wert}</output>
    <button type="button" data-step="${name}" data-d="1" aria-label="${label}: mehr">+</button></div>
    <input type="hidden" name="${name}" value="${wert}" data-min="${min}" data-max="${max}"></div>`;
}

function formular(p) {
  const laeden = Object.entries(LAEDEN).map(([k, l]) => [k, l.name]);
  const abn = (w) => w.split(',').every((id) => p.abneigungen.includes(id));
  const eigeneMakros = !!p.makros;
  return `
  <form id="planform" novalidate>
    <fieldset><legend>Was steht dir zur Verfügung?</legend>
      <p class="hilfe">Kreuz an, was es dort gibt, wo du kochst. Wir planen nur Rezepte, die damit klappen. Eine Kühlbox zählt als Kühlschrank nur, wenn sie zuverlässig unter 7 °C kühlt.</p>
      <div class="zeile">${stepper('herd', p.geraete.herd, 0, 4, V.herdName)}</div>
      ${chips('geraet', GERAETE.filter(([g]) => VARIANTE === 'camping' || !['omnia', 'grill'].includes(g)), 'checkbox', (g) => p.geraete[g])}
    </fieldset>

    <fieldset><legend>Wo kaufst du ein?</legend>
      ${chips('laden', laeden, 'radio', (l) => p.laden === l)}
      <div class="zeile">
        <div class="feld"><label for="budget">Budget für den ganzen Plan (€)</label><input id="budget" name="budget" type="number" inputmode="decimal" min="0" step="1" placeholder="egal" value="${p.budget ?? ''}"></div>
        <label class="chip"><input type="checkbox" name="eigenmarken"${p.eigenmarken ? ' checked' : ''}><span>Eigenmarken bevorzugen</span></label>
      </div>
      <p class="hilfe">Preise sind Schätzwerte je Laden (Stand 10/2026), keine Tagespreise.</p>
    </fieldset>

    <fieldset><legend>Für wen kochst du?</legend>
      <div class="zeile">${stepper('personen', p.personen, 1, 8, 'Personen')}</div>
      <p class="lbl"><b>Ernährungsform</b></p>
      ${chips('diaet', DIAETEN, 'radio', (d) => p.diaet === d)}
      <details class="mehr"${p.allergene.length ? ' open' : ''}><summary>Allergien und Unverträglichkeiten</summary>
        ${chips('allergen', ALLERGENE, 'checkbox', (a) => p.allergene.includes(a))}
        <p class="hilfe">Wir filtern nach den 14 Hauptallergenen. Spuren können wir nicht erkennen: Prüf bei Allergien immer das Etikett. Der Planer ersetzt keine ärztliche Beratung.</p>
      </details>
      <details class="mehr"${p.abneigungen.length ? ' open' : ''}><summary>Das mag ich nicht</summary>
        ${chips('abneigung', ABNEIGUNGEN, 'checkbox', abn)}
      </details>
    </fieldset>

    <fieldset><legend>Wie viel brauchst du?</legend>
      ${chips('richtwert', [...RICHTWERTE.map(([k, t]) => [String(k), t]), ['makros', 'Eigene Kalorien und Makros']], 'radio', (w) => (eigeneMakros ? w === 'makros' : String(p.kcalRichtwert) === w))}
      <div class="makros" id="makrofelder"${eigeneMakros ? '' : ' hidden'}>
        <div class="feld"><label for="kcal">Kalorien (kcal)</label><input id="kcal" name="kcal" type="number" inputmode="numeric" min="1200" max="6000" value="${p.makros?.kcal ?? 2400}"></div>
        <div class="feld"><label for="p">Protein (g)</label><input id="p" name="p" type="number" inputmode="numeric" min="0" value="${p.makros?.p ?? 140}"></div>
        <div class="feld"><label for="kh">Kohlenhydrate (g)</label><input id="kh" name="kh" type="number" inputmode="numeric" min="0" value="${p.makros?.kh ?? 260}"></div>
        <div class="feld"><label for="f">Fett (g)</label><input id="f" name="f" type="number" inputmode="numeric" min="0" value="${p.makros?.f ?? 80}"></div>
      </div>
      <p class="hilfe">Je Person und Tag. Diese Angaben bleiben auf deinem Gerät. Der Planer ist kein Diät- oder Therapieprogramm.</p>
    </fieldset>

    <fieldset><legend>Deine Woche</legend>
      <div class="zeile">${stepper('tage', p.tage, 1, 14, 'Tage')}
        <div class="feld"><label for="starttag">Start am</label><select id="starttag" name="starttag">${TAGE.map((t, i) => `<option value="${i}"${p.starttag === i ? ' selected' : ''}>${t}</option>`).join('')}</select></div></div>
      <p class="lbl"><b>Mahlzeiten</b></p>
      ${chips('mahlzeit', Object.entries(MAHLZEIT_NAME), 'checkbox', (m) => p.mahlzeiten.includes(m))}
      <p class="lbl"><b>Mittags unter der Woche</b></p>
      ${chips('pause', PAUSEN, 'radio', (x) => p.pause === x)}
      <p class="lbl"><b>Wie oft kaufst du ein?</b></p>
      ${chips('einkauf', EINKAUF, 'radio', (x) => (p.einkauf || 'zweimal') === x)}
      <p class="hilfe">Frisches Fleisch planen wir höchstens 2 Tage, Hackfleisch 1 Tag nach dem Einkauf. Ohne Kühlschrank kommt Kühlware nur am Einkaufstag auf den Teller.</p>
      <details class="mehr"${p.kochtage?.length ? ' open' : ''}><summary>Feste Kochtage (Vorkochen)</summary>
        <p class="hilfe">Leer lassen = jeden Tag frisch. Mit Kochtagen planen wir Boxen für die Tage danach, nach den Lagerempfehlungen des BfR, teils strenger.</p>
        ${chips('kochtag', TAGE_KURZ.map((t, i) => [String(i), t]), 'checkbox', (i) => (p.kochtage || []).includes(Number(i)))}
      </details>
    </fieldset>
    <div class="aktion">
      <div class="treffer" id="treffer"><b class="treffer-zahl" id="treffer-zahl">…</b><span class="treffer-text"><span id="treffer-text">Rezepte werden gezählt</span><small id="treffer-tipp"></small></span></div>
      <button class="knopf" type="submit">Plan erstellen</button></div>
  </form>`;
}

function liesFormular(form) {
  const fd = new FormData(form);
  const alle = (n) => fd.getAll(n);
  const geraete = { herd: Number(fd.get('herd')) };
  for (const [g] of GERAETE) geraete[g] = alle('geraet').includes(g);
  const rw = fd.get('richtwert');
  const p = {
    geraete, laden: fd.get('laden') || 'aldi', eigenmarken: !!fd.get('eigenmarken'),
    budget: fd.get('budget') ? Math.max(0, Number(String(fd.get('budget')).replace(',', '.'))) || null : null,
    personen: Number(fd.get('personen')), tage: Number(fd.get('tage')), starttag: Number(fd.get('starttag')),
    diaet: fd.get('diaet') || 'alles', allergene: alle('allergen'), abneigungen: alle('abneigung').flatMap((x) => x.split(',')),
    mahlzeiten: alle('mahlzeit'), pause: fd.get('pause') || 'zuhause', einkauf: fd.get('einkauf') || 'zweimal',
    kochtage: alle('kochtag').map(Number), seed: letztes?.profil?.seed || 1,
    lieblinge: lade('ep_lieblinge', []), ausschluss,
    arbeitstage: V.profil.arbeitstage ?? STANDARD_PROFIL.arbeitstage,
  };
  if (!p.kochtage.length) p.kochtage = null;
  if (rw === 'makros') p.makros = { kcal: Number(fd.get('kcal')), p: Number(fd.get('p')), kh: Number(fd.get('kh')), f: Number(fd.get('f')) };
  else { p.makros = null; p.kcalRichtwert = Number(rw) || 2200; }
  return p;
}

// ---------------------------------------------------------------- Ergebnis
function herkunftMarke(m) {
  if (m.herkunft === 'kuehl') return `<span class="marke kuehl">aus dem Kühlschrank</span>`;
  if (m.herkunft === 'tk') return `<span class="marke tk">aus dem Gefrierfach</span>`;
  if (m.herkunft === 'ungekuehlt') return `<span class="marke">vorbereitet</span>`;
  return '';
}

// Datum eines Plantags: der nächste gewählte Starttag ab heute
function planDatum(e, d) {
  const heute = new Date(); heute.setHours(12, 0, 0, 0);
  const wt = (heute.getDay() + 6) % 7;
  const start = new Date(heute); start.setDate(heute.getDate() + ((e.profil.starttag - wt + 7) % 7));
  start.setDate(start.getDate() + d);
  return start.toISOString().slice(0, 10);
}

function essenHtml(e, t, m, lieblinge, gekocht) {
  if (!m.rezept) return `<div class="essen leer"><span class="wann">${MAHLZEIT_NAME[m.m]}</span><span>frei – kein passendes Rezept</span></div>`;
  const schl = `${planDatum(e, t.d)}|${m.m}|${m.rezept}`;
  const lieb = lieblinge.includes(m.rezept);
  const fertig = !!gekocht[schl];
  return `<div class="essen${fertig ? ' gekocht' : ''}">
    <img class="mini" src="img/rezepte/klein/${m.rezept}.jpg" alt="" width="120" height="90" loading="lazy" onerror="this.style.visibility='hidden'">
    <div class="essen-text"><span class="wann">${MAHLZEIT_NAME[m.m]}</span>
      <button class="titel" type="button" data-rezept="${m.rezept}" data-faktor="${m.faktor}">${esc(m.titel)}</button>
      <span class="info">${herkunftMarke(m)}${m.box ? `<span class="marke">${e.profil.pause === 'kalt' ? 'Box, Kühltasche' : 'Box'}</span>` : ''}${zahl(m.n.kcal)} kcal · ${zahl(m.n.p)} g Protein${m.faktor !== 1 ? ` · Portion ×${Number(m.faktor).toLocaleString('de-DE', { maximumFractionDigits: 2 })}` : ''}</span></div>
    <div class="essen-aktion">
      <button class="ikon merken" type="button" data-merken="${m.rezept}" aria-pressed="${lieb}" title="Merken">${IKON.herz}<span>Merken</span></button>
      <button class="ikon" type="button" data-tauschen="${m.rezept}" title="Anderes Gericht">${IKON.tauschen}<span>Tauschen</span></button>
      <button class="ikon gekocht-knopf" type="button" data-gekocht="${schl}" data-herkunft="${m.herkunft || ''}" aria-pressed="${fertig}" title="Gekocht">${IKON.haken}<span>Gekocht</span></button>
    </div></div>`;
}

function planHtml(e) {
  const kalt = e.profil.pause === 'kalt' && e.tage.some((t) => t.mahlzeiten.some((m) => m.box))
    ? '<p class="meldung" role="note">Boxen für die Pause in einer Kühltasche mit Kühlakku mitnehmen und bis zum Essen kühl halten. Ungekühlt höchstens 2 Stunden.</p>' : '';
  const lieblinge = lade('ep_lieblinge', []);
  const gekocht = lade('ep_gekocht', {});
  const tage = e.tage.map((t) => `
    <article class="tag"><h3>${TAGE[t.wochentag]}</h3>
      ${t.mahlzeiten.map((m) => essenHtml(e, t, m, lieblinge, gekocht)).join('')}
    </article>`).join('');
  return kalt + `<div class="woche${e.tage.length === 1 ? ' einzeln' : ''}">${tage}</div>` + vorschauHtml(e);
}

// Gratis: die übrigen Tage als Vorschau mit Foto und Namen. Rezepte, Einkauf und Ablauf gibt es mit Plus.
function vorschauHtml(e) {
  if (!e.vorschau?.length) return '';
  const tage = e.vorschau.map((t) => `<li class="vorschau-tag"><b>${TAGE[t.wochentag]}</b>
    <span class="vorschau-bilder">${t.mahlzeiten.filter((m) => m.rezept).map((m) => `<span class="vorschau-essen"><img src="img/rezepte/klein/${m.rezept}.jpg" alt="" width="120" height="90" loading="lazy"><small>${esc(m.titel)}</small></span>`).join('')}</span></li>`).join('');
  const P = CONFIG.preise;
  const angebot = P.pass.varianten.includes(VARIANTE) ? `Montage-Pass: ${P.pass.text}, endet automatisch.`
    : P.saison.varianten.includes(VARIANTE) ? `Saison-Pass: ${P.saison.text}, endet automatisch.`
    : `Plus: ${P.monat.text} oder ${P.jahr.text}, die ersten ${CONFIG.probeTage} Tage 0 €.`;
  return `<section class="vorschau" aria-labelledby="vorschau-titel">
    <h3 id="vorschau-titel">So geht deine Woche weiter</h3>
    <p>Die übrigen ${e.vorschau.length} Tage hat der Planer schon zusammengestellt. Mit Plus bekommst du die Rezepte, die Einkaufsliste und den Vorkoch-Ablauf dafür.</p>
    <ol class="vorschau-liste">${tage}</ol>
    <p class="vorschau-angebot">${angebot}</p>
    <a class="knopf" href="preise.html?v=${VARIANTE}">Ganze Woche freischalten</a>
  </section>`;
}

function wagenText(drin, gesamt) {
  return drin >= gesamt ? 'Alles im Wagen.' : `${drin} von ${gesamt} im Wagen`;
}

function einkaufTitel(e, tag) {
  if (tag < 0) return 'Einkauf am Vortag (vor dem ersten Kochtag)';
  return `Einkauf am ${TAGE[e.tage[tag].wochentag]}${e.profil.tage > 7 ? ` (Tag ${tag + 1})` : ''}`;
}

function einkaufHtml(e) {
  const haken = lade('ep_haken', {});
  const mehrere = e.einkauf.einkaeufe.length > 1;
  const alle = e.einkauf.einkaeufe.flatMap((ek) => ek.gruppen.flatMap((g) => g.posten));
  const drin = alle.filter((x) => haken[`${x.id}@${x.tag}`]).length;
  const wagen = `<div class="wagen${drin === alle.length ? ' voll' : ''}" id="wagen" data-gesamt="${alle.length}"><div class="balken"><i style="width:${alle.length ? (100 * drin) / alle.length : 0}%"></i></div>
    <span id="wagen-text">${wagenText(drin, alle.length)}</span></div>`;
  const g = e.einkauf.einkaeufe.map((ek) => `${mehrere ? `<h3 class="einkauf-titel">${esc(einkaufTitel(e, ek.tag))} · ca. ${euro(ek.summe)}</h3>` : ''}
    ${ek.gruppen.map((gr) => `<section class="gruppe"><h3>${esc(gr.name)}</h3>
    ${gr.posten.map((x) => `<label class="posten"><input type="checkbox" data-haken="${x.id}@${x.tag}"${haken[`${x.id}@${x.tag}`] ? ' checked' : ''}>
      <div><b>${esc(x.name)}</b><small>${x.packungen} × ${esc(x.packung)} · gebraucht ${esc(x.menge)}${x.rest ? ` · Rest ca. ${esc(x.rest)}` : ''}</small></div>
      <span class="preis">${euro(x.preis)}</span></label>`).join('')}</section>`).join('')}`).join('');
  const v = e.einkauf.vorrat.length ? `<section class="gruppe vorrat"><h3>Hast du wahrscheinlich schon</h3>
    <p class="hilfe">Öl, Salz und Gewürze. Wir rechnen nur den verbrauchten Anteil in die Kosten ein.</p>
    ${e.einkauf.vorrat.map((x) => `<label class="posten"><input type="checkbox" data-haken="${x.id}"${haken[x.id] ? ' checked' : ''}><div><b>${esc(x.name)}</b><small>${esc(x.menge)} (Packung ${esc(x.packung)} ca. ${euro(x.packungPreis)})</small></div><span class="preis">${euro(x.preisAnteil)}</span></label>`).join('')}</section>` : '';
  const hinweis = mehrere ? ' Frisches kaufst du erst kurz vor dem Kochen, Vorräte gleich beim ersten Einkauf.' : '';
  return `${wagen}<p class="hilfe">Nach Abteilungen sortiert, wie es im ${esc(e.einkauf.laden)}-Markt meist liegt. Preise sind Schätzungen.${hinweis}</p>${g}${v}
    <div class="summe"><span>Geschätzt</span><span>${euro(e.einkauf.summe)}</span></div>
    <button class="knopf leise" type="button" id="teilen">Liste teilen oder kopieren</button>`;
}

function ablaufHtml(e) {
  if (!e.ablauf.length) return '<p>In diesem Plan wird alles frisch gekocht. Mit festen Kochtagen planen wir Boxen zum Vorkochen.</p>';
  return e.ablauf.map((a) => `<section class="ablauf gruppe"><h3>${esc(a.wochentag)}: etwa ${a.dauer} Minuten, davon ${a.aktiv} Minuten Arbeit</h3>
    <ol>${a.schritte.map((s) => `<li><span class="zeit">${Math.floor(s.start / 60)}:${String(s.start % 60).padStart(2, '0')}</span> ${esc(s.titel)} (${zahl(s.portionen, 1)} Portionen, ${s.aktiv} Min. Arbeit, fertig nach ${s.ende} Min.) – <button class="titel knopf-link" type="button" data-rezept="${s.rezept}" data-faktor="1">Rezept</button></li>`).join('')}</ol>
    <h3>Boxen</h3><ul class="box-liste">${a.boxen.map((b) => `<li><b>${b.anzahl} × ${esc(b.titel)}</b> für ${esc(b.fuer)} – ${esc(b.lager)}</li>`).join('')}</ul>
    <ul>${a.abschluss.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>`).join('');
}

function naehrHtml(e) {
  const z = e.naehrwerte.ziel;
  const ref = z || { kcal: e.naehrwerte.richtwert };
  const zeilen = e.naehrwerte.jeTag.map((t, i) => `<tr><td>${TAGE_KURZ[e.tage[i].wochentag]}</td><td>${zahl(t.kcal)}</td><td>${zahl(t.p)}</td><td>${zahl(t.kh)}</td><td>${zahl(t.f)}</td></tr>`).join('');
  const schnitt = (k) => e.naehrwerte.jeTag.reduce((s, t) => s + t[k], 0) / e.naehrwerte.jeTag.length;
  const balken = (k, name) => (z && z[k] ? `<div><b>${name}</b>: ${zahl(schnitt(k))} von ${zahl(z[k])} ${k === 'kcal' ? 'kcal' : 'g'}<div class="balken"><i style="width:${Math.min(100, (100 * schnitt(k)) / z[k])}%"></i></div></div>` : '');
  return `${z ? balken('kcal', 'Kalorien') + balken('p', 'Protein') + balken('kh', 'Kohlenhydrate') + balken('f', 'Fett') : `<p>Richtwert: ${zahl(ref.kcal)} kcal je Person und Tag. Durchschnitt im Plan: ${zahl(schnitt('kcal'))} kcal.</p>`}
    <table class="nw-tabelle"><thead><tr><th>Tag</th><th>kcal</th><th>Protein g</th><th>KH g</th><th>Fett g</th></tr></thead><tbody>${zeilen}</tbody></table>
    <p class="hilfe">Je Person. Berechnet aus dem Bundeslebensmittelschlüssel (BLS 4.0, Max Rubner-Institut, CC BY 4.0). Echte Produkte weichen ab.</p>`;
}

function ergebnisHtml(e) {
  const m = e.meldungen.map((x) => `<p class="meldung${x.art === 'fehler' ? ' fehler' : ''}" role="status">${esc(x.text)}</p>`).join('');
  if (!e.ok) return m;
  const kcal = Math.round(e.naehrwerte.jeTag.reduce((s, t) => s + t.kcal, 0) / e.naehrwerte.jeTag.length);
  const sperre = !plus && !e.vorschau?.length ? `<div class="sperre"><h3>Die ganze Woche planen</h3>
    <p>Ohne Plus planst du einen Tag. Mit Plus bis zu 14 Tage, mit Vorkoch-Ablauf und PDF.</p>
    <a class="knopf" href="preise.html?v=${VARIANTE}">Plus ansehen</a></div>` : '';
  return `${m}
    <div class="zusammenfassung">
      <div class="kennzahl"><b>${euro(e.kosten.gesamt)}</b><small>geschätzt für ${e.profil.tage} ${e.profil.tage === 1 ? 'Tag' : 'Tage'}</small></div>
      <div class="kennzahl"><b>${euro(e.kosten.jePersonUndTag)}</b><small>je Person und Tag</small></div>
      <div class="kennzahl"><b>${zahl(kcal)}</b><small>kcal am Tag (Ø)</small></div>
    </div>
    <div class="reiter" role="tablist" aria-label="Ansicht">
      ${[['plan', 'Plan'], ['einkauf', 'Einkauf'], ['vorkochen', 'Vorkochen'], ['naehr', 'Nährwerte'], ['buch', 'Küchenbuch']].map(([k, t], i) => `<button role="tab" id="t-${k}" aria-controls="r-${k}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-reiter="${k}">${t}</button>`).join('')}
    </div>
    <section class="reiterinhalt" id="r-plan" role="tabpanel" aria-labelledby="t-plan">${planHtml(e)}</section>
    <section class="reiterinhalt" id="r-einkauf" role="tabpanel" aria-labelledby="t-einkauf" hidden>${einkaufHtml(e)}</section>
    <section class="reiterinhalt" id="r-vorkochen" role="tabpanel" aria-labelledby="t-vorkochen" hidden>${plus ? ablaufHtml(e) : '<p>Der Vorkoch-Ablauf gehört zu Plus.</p>'}</section>
    <section class="reiterinhalt" id="r-naehr" role="tabpanel" aria-labelledby="t-naehr" hidden>${naehrHtml(e)}</section>
    <section class="reiterinhalt" id="r-buch" role="tabpanel" aria-labelledby="t-buch" hidden>${buchHtml()}</section>
    ${sperre}
    <div class="zeile" style="margin-top:16px">
      <button class="knopf leise" type="button" id="neu">Andere Gerichte vorschlagen</button>
      ${plus ? '<button class="knopf leise" type="button" id="drucken">Als PDF speichern oder drucken</button>' : ''}
    </div>`;
}

// ---------------------------------------------------------------- Küchenbuch
function statistik() {
  const g = Object.values(lade('ep_gekocht', {}));
  return {
    anzahl: g.length, verschieden: new Set(g.map((x) => x.r)).size, ohneHerd: g.filter((x) => x.ohneHerd).length,
    vor: g.filter((x) => x.vor).length, tage: new Set(g.map((x) => x.d)).size, lieblinge: lade('ep_lieblinge', []).length,
    liste: g,
  };
}
function erreicht(s) { return ABZEICHEN.filter(([, , , bed]) => bed(s)).map(([id]) => id); }

function buchHtml() {
  const s = statistik();
  const gesamt = daten?.rezepte.length || 195;
  const hat = erreicht(s);
  const lieb = lade('ep_lieblinge', []).map((id) => daten?.rezepte.find((r) => r.id === id)).filter(Boolean);
  if (!s.anzahl && !lieb.length) {
    return `<div class="buch-leer"><p><b>Dein Küchenbuch ist noch leer.</b></p>
      <p>Tipp im Plan bei einem Gericht auf „Gekocht“, sobald es auf dem Teller war. Hier sammeln sich dann deine Gerichte, Abzeichen und Lieblinge. Alles bleibt auf diesem Gerät.</p></div>`;
  }
  return `<div class="buch">
    <div class="sammlung"><b>${s.verschieden}</b><span>von ${gesamt} Rezepten entdeckt</span>
      <div class="balken"><i style="width:${(100 * s.verschieden) / gesamt}%"></i></div>
      <small>${s.anzahl} ${s.anzahl === 1 ? 'Gericht' : 'Gerichte'} gekocht, an ${s.tage} ${s.tage === 1 ? 'Tag' : 'Tagen'}</small></div>
    <h3>Abzeichen</h3>
    <ul class="abzeichen">${ABZEICHEN.map(([id, name, wie]) => `<li class="${hat.includes(id) ? 'hat' : ''}"><span class="plakette" aria-hidden="true">${IKON.haken}</span><b>${esc(name)}</b><small>${esc(wie)}</small><span class="sr">${hat.includes(id) ? 'erreicht' : 'noch offen'}</span></li>`).join('')}</ul>
    ${lieb.length ? `<h3>Deine Lieblinge</h3><p class="hilfe">Gemerkte Gerichte plant der Planer öfter ein.</p>
      <ul class="lieblinge">${lieb.map((r) => `<li><button class="titel" type="button" data-rezept="${r.id}" data-faktor="1"><img src="img/rezepte/klein/${r.id}.jpg" alt="" width="120" height="90" loading="lazy"><span>${esc(r.titel)}</span></button></li>`).join('')}</ul>` : ''}
    <p><button class="knopf leise" type="button" id="buch-leeren">Küchenbuch leeren</button></p>
  </div>`;
}

function meldeKurz(text) {
  const t = $('#toast');
  t.textContent = text;
  t.hidden = false;
  clearTimeout(meldeKurz.zeit);
  meldeKurz.zeit = setTimeout(() => { t.hidden = true; }, 3600);
}

function gekochtUmschalten(knopf) {
  const schl = knopf.dataset.gekocht;
  const g = lade('ep_gekocht', {});
  const vorher = erreicht(statistik());
  if (g[schl]) delete g[schl];
  else {
    const [d, , r] = schl.split('|');
    const rz = daten.rezepte.find((x) => x.id === r);
    const weg = ersterWeg(rz, letztes.profil.geraete) || rz.wege[0];
    g[schl] = { r, d, ohneHerd: weg.geraete.every((x) => ['wasserkocher', 'mikrowelle'].includes(x)), vor: ['kuehl', 'tk'].includes(knopf.dataset.herkunft) };
  }
  speichere('ep_gekocht', g);
  const an = !!g[schl];
  knopf.setAttribute('aria-pressed', an);
  knopf.closest('.essen').classList.toggle('gekocht', an);
  const neu = erreicht(statistik()).filter((id) => !vorher.includes(id));
  if (neu.length) meldeKurz(`Neues Abzeichen: ${ABZEICHEN.find((x) => x[0] === neu[0])[1]}. Steht im Küchenbuch.`);
  $('#r-buch').innerHTML = buchHtml();
}

function merkenUmschalten(id) {
  const l = lade('ep_lieblinge', []);
  const an = !l.includes(id);
  const neu = an ? [...l, id] : l.filter((x) => x !== id);
  speichere('ep_lieblinge', neu);
  document.querySelectorAll(`[data-merken="${id}"]`).forEach((b) => b.setAttribute('aria-pressed', an));
  if (an) meldeKurz('Gemerkt. Der Planer nimmt das Gericht öfter.');
  if (an && neu.length === 3) meldeKurz('Neues Abzeichen: Geschmack gefunden. Steht im Küchenbuch.');
  $('#r-buch').innerHTML = buchHtml();
}

// ---------------------------------------------------------------- Treffer-Zähler
const GERAET_NAME = Object.fromEntries(GERAETE);
function zaehleTreffer(form) {
  if (!daten) return;
  const p = vervollstaendige({ ...liesFormular(form), ausschluss: [] });
  const n = kandidaten(daten, p).liste.length;
  // nächster sinnvoller Schritt: welches fehlende Gerät bringt die meisten Rezepte dazu?
  let tipp = '';
  if (n > 0) {
    let best = null;
    // nur Vorschläge, die in diese Lebenslage passen (im Monteurzimmer kein Backofen, im Camper kein Ofen)
    const TIPP = {
      montage: ['wasserkocher', 'mikrowelle', 'sandwichmaker', 'airfryer', 'kuehlschrank', 'topf', 'pfanne'],
      camping: ['omnia', 'grill', 'topf', 'pfanne', 'wasserkocher', 'kuehlschrank'],
    }[VARIANTE] || GERAETE.map(([g]) => g).filter((g) => !['thermo', 'gefrier'].includes(g));
    const proben = TIPP.filter((g) => !p.geraete[g]).map((g) => [GERAET_NAME[g], { ...p.geraete, [g]: true }]);
    const platte = V.herdName === 'Gasflammen' ? 'einer Gasflamme' : 'einer Kochplatte';
    if (!(p.geraete.herd >= 1)) proben.push([`${platte}${p.geraete.topf && p.geraete.pfanne ? '' : ', Topf und Pfanne'}`, { ...p.geraete, herd: 1, topf: true, pfanne: true }]);
    for (const [name, g] of proben) {
      const mehr = kandidaten(daten, { ...p, geraete: g }).liste.length - n;
      if (mehr > 0 && (!best || mehr > best[1])) best = [name, mehr];
    }
    if (best) tipp = `Mit ${best[0]} kämen ${best[1]} dazu.`;
  }
  const zahlEl = $('#treffer-zahl');
  rollen(zahlEl, Number(zahlEl.dataset.wert) || 0, n);
  zahlEl.dataset.wert = n;
  $('#treffer').classList.toggle('null', n === 0);
  $('#treffer-text').textContent = n === 0 ? 'Rezepte passen. Lockere zuerst Allergien, Abneigungen oder die Ernährungsform.'
    : n === 1 ? 'Rezept passt zu deiner Küche' : 'Rezepte passen zu deiner Küche';
  $('#treffer-tipp').textContent = tipp;
}

function rollen(el, von, bis) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || von === bis) { el.textContent = bis; return; }
  const t0 = performance.now();
  const schritt = (t) => {
    const x = Math.min(1, (t - t0) / 380);
    el.textContent = Math.round(von + (bis - von) * (1 - (1 - x) ** 3));
    if (x < 1) requestAnimationFrame(schritt);
  };
  requestAnimationFrame(schritt);
  el.classList.remove('stoss'); void el.offsetWidth; el.classList.add('stoss');
}

// ---------------------------------------------------------------- Rezeptansicht
function rezeptDialog(id, faktor) {
  const r = daten.rezepte.find((x) => x.id === id);
  if (!r) return;
  const p = letztes.profil;
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
  const dlg = $('#rezept');
  $('.inhalt', dlg).innerHTML = `
    <img class="foto" src="img/rezepte/${r.id}.jpg" alt="" width="800" height="600" loading="lazy" onerror="this.remove()">
    <h2 id="rezept-titel">${esc(r.titel)}</h2>
    <p>${zahl(portionen, 2)} ${portionen === 1 ? 'Portion' : 'Portionen'} · ${weg.zeit} Min. (${weg.aktiv} Min. Arbeit) · ${esc(weg.geraete.length ? weg.geraete.map((g) => (g === 'herd' ? '1 Platte' : g === 'herd2' ? '2 Platten' : (GERAETE.find((x) => x[0] === g) || [g, g])[1])).join(', ') : 'ohne Gerät')}</p>
    <h3>Zutaten</h3><ul class="zutaten">${zut}</ul>
    <h3>So geht's</h3><ol>${weg.schritte.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
    <h3>Lagern</h3><ul>${lager}</ul>
    <p><b>Je Portion:</b> ${zahl(r.n.kcal)} kcal · ${zahl(r.n.p)} g Protein · ${zahl(r.n.kh)} g Kohlenhydrate · ${zahl(r.n.f)} g Fett</p>
    <p><b>Enthält:</b> ${r.al.length ? r.al.map((a) => AL[a] || a).join(', ') : 'keines der 14 Hauptallergene laut unseren Zutatendaten'}. Prüf bei Allergien immer das Etikett deiner Produkte.</p>
    ${r.tipp ? `<p><b>Tipp:</b> ${esc(r.tipp)}</p>` : ''}`;
  dlg.showModal();
}

// ---------------------------------------------------------------- Ablauf
function zeige(e, ruhig) {
  letztes = e;
  const ziel = $('#ergebnis');
  ziel.innerHTML = ergebnisHtml(e);
  ziel.hidden = false;
  if (ruhig) return;
  ziel.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  $('#ergebnis-titel').focus({ preventScroll: true });
}

function planen(form, neuerSeed, ruhig) {
  const p = liesFormular(form);
  if (neuerSeed) p.seed = (p.seed || 1) + 1;
  const { ausschluss: _a, lieblinge: _l, ...merken } = p;
  speichere('ep_profil_' + VARIANTE, merken);
  const lauf = { ...p };
  if (!plus) lauf.tage = Math.min(p.tage, CONFIG.kostenlos.tage);
  const e = erstellePlan(daten, lauf);
  e.profil.seed = p.seed;
  // Gratis: Rest der Woche als ehrliche Vorschau (gleiche Einstellungen, nur Namen und Fotos)
  if (!plus && e.ok && p.tage > lauf.tage) {
    const ganz = erstellePlan(daten, p);
    if (ganz.ok) e.vorschau = ganz.tage.slice(lauf.tage);
  }
  zeige(e, ruhig);
}

function teilen() {
  const e = letztes;
  const text = [`Einkauf ${e.einkauf.laden} (ca. ${euro(e.einkauf.summe)})`, ...e.einkauf.einkaeufe.flatMap((ek) => [
    ...(e.einkauf.einkaeufe.length > 1 ? [``, `== ${einkaufTitel(e, ek.tag)} ==`] : []),
    ...ek.gruppen.flatMap((g) => [``, g.name, ...g.posten.map((x) => `- ${x.packungen} × ${x.name} (${x.packung})`)])])].join('\n');
  if (navigator.share) navigator.share({ title: 'Einkaufsliste', text }).catch(() => {});
  else navigator.clipboard?.writeText(text).then(() => { $('#teilen').textContent = 'Liste kopiert'; });
}

async function start() {
  $('#vname').textContent = V.name;
  $('#logo').src = `img/logo-${VARIANTE}.svg`;
  $('#heimlink').href = `${VARIANTE}.html`; // Landingpage der Variante
  document.querySelectorAll('.fuss nav a').forEach((a) => { a.href += `?v=${VARIANTE}`; });
  document.title = `${V.name} – Wochenplan nach deinen Geräten`;
  // Formular sofort zeigen, Rezeptdaten parallel laden (vermeidet Layout-Sprünge)
  const laden = fetch('data/daten.json').then((r) => r.json()).then((d) => { daten = d; });
  const p = startProfil();
  $('#formular').innerHTML = formular(p);
  $('#formular').style.minHeight = 'auto';
  const form = $('#planform');
  const schl = gespeicherteLizenz();
  const lizenz = schl ? pruefeLizenz(schl).then((r) => { plus = r.ok; }) : Promise.resolve();
  lizenz.then(() => { $('#status').innerHTML = plus ? 'Plus aktiv' : `<a href="preise.html?v=${VARIANTE}">Plus</a>`; });
  form.addEventListener('submit', async (ev) => { ev.preventDefault(); await Promise.all([laden, lizenz]); ausschluss = []; planen(form); });
  laden.then(() => zaehleTreffer(form));
  form.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-step]');
    if (!b) return;
    const inp = form.elements[b.dataset.step];
    const w = Math.max(Number(inp.dataset.min), Math.min(Number(inp.dataset.max), Number(inp.value) + Number(b.dataset.d)));
    inp.value = w; $('#o-' + b.dataset.step).textContent = w;
    zaehleTreffer(form);
  });
  form.addEventListener('change', (ev) => {
    if (ev.target.name === 'richtwert') $('#makrofelder').hidden = ev.target.value !== 'makros';
    zaehleTreffer(form);
  });
  $('#ergebnis').addEventListener('click', (ev) => {
    const t = ev.target;
    const r = t.closest('[data-rezept]');
    if (r) return rezeptDialog(r.dataset.rezept, Number(r.dataset.faktor) || 1);
    const m = t.closest('[data-merken]');
    if (m) return merkenUmschalten(m.dataset.merken);
    const g = t.closest('[data-gekocht]');
    if (g) return gekochtUmschalten(g);
    const w = t.closest('[data-tauschen]');
    if (w) {
      const titel = daten.rezepte.find((x) => x.id === w.dataset.tauschen)?.titel || 'Das Gericht';
      ausschluss = [...new Set([...ausschluss, w.dataset.tauschen])];
      planen(form, false, true);
      return meldeKurz(`„${titel}“ getauscht. Es kommt in diesem Plan nicht mehr vor.`);
    }
    if (t.id === 'buch-leeren') {
      if (!confirm('Küchenbuch leeren? Gekochte Gerichte und Abzeichen werden auf diesem Gerät gelöscht. Deine Lieblinge bleiben.')) return;
      speichere('ep_gekocht', {});
      $('#r-buch').innerHTML = buchHtml();
      return;
    }
    const tab = t.closest('[data-reiter]');
    if (tab) {
      document.querySelectorAll('[data-reiter]').forEach((b) => { const an = b === tab; b.setAttribute('aria-selected', an); b.tabIndex = an ? 0 : -1; $('#r-' + b.dataset.reiter).hidden = !an; });
      return;
    }
    if (t.id === 'neu') return planen(form, true);
    if (t.id === 'drucken') return window.print();
    if (t.id === 'teilen') return teilen();
  });
  $('#ergebnis').addEventListener('keydown', (ev) => {
    const tab = ev.target.closest('[data-reiter]');
    if (!tab || !['ArrowRight', 'ArrowLeft'].includes(ev.key)) return;
    const alle = [...document.querySelectorAll('[data-reiter]')];
    const n = alle[(alle.indexOf(tab) + (ev.key === 'ArrowRight' ? 1 : alle.length - 1)) % alle.length];
    n.focus(); n.click();
  });
  $('#ergebnis').addEventListener('change', (ev) => {
    const id = ev.target.dataset?.haken;
    if (!id) return;
    const h = lade('ep_haken', {}); h[id] = ev.target.checked; speichere('ep_haken', h);
    const box = $('#wagen');
    if (box && !ev.target.closest('.vorrat')) {
      const gesamt = Number(box.dataset.gesamt);
      const drin = [...document.querySelectorAll('#r-einkauf .gruppe:not(.vorrat) [data-haken]')].filter((x) => x.checked).length;
      box.querySelector('i').style.width = `${(100 * drin) / Math.max(gesamt, 1)}%`;
      $('#wagen-text').textContent = wagenText(drin, gesamt);
      box.classList.toggle('voll', drin >= gesamt);
    }
  });
  $('#rezept .schliessen button').addEventListener('click', () => $('#rezept').close());
  // iPhone/iPad: Safari löscht Website-Daten nach 7 Tagen ohne Besuch, außer die App liegt auf dem Home-Bildschirm
  if (/iPhone|iPad|iPod/.test(navigator.userAgent) && !navigator.standalone) {
    const h = document.createElement('p');
    h.className = 'hilfe';
    h.textContent = 'Tipp fürs iPhone: Über „Teilen“ → „Zum Home-Bildschirm“ bleibt der Planer offline nutzbar und Safari löscht deine Einstellungen nicht. Den Plus-Schlüssel findest du jederzeit in deiner Kauf-Mail.';
    document.querySelector('.intro')?.append(h);
  }
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) navigator.serviceWorker.register('sw.js').catch(() => {});
}

start();
