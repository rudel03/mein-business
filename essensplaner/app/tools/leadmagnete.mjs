// Lead-Magnet-PDFs aus den echten Daten: Zimmer-Check (Zimmerherd), Protein-Liste (Kochsatz),
// Bordküchen-Check (Zweiflammer), Reste-Retter-Wochenpläne (Wochenschmaus) → public/pdf/.
// Aufruf (aus app/): node tools/leadmagnete.mjs [montage|fitness|camping|alltag …]
//
// Inhalt folgt den Versprechen in marketing/Mails_alle_Marken.md und der Claim-Freigabe:
// keine Euro-Beträge und Spar-Aussagen (bis Kassenbon-Test), keine Zeitangaben ohne Messung,
// keine Gesundheitsversprechen, Lagerregeln mit Quelle je Regel (Z10), Allergenhinweis.
// Rezeptzahlen werden genau wie in tools/landing.py (moeglich/lagerbar/zaehle) gezählt.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { erstellePlan } from '../public/js/engine/planer.js';
import { CONFIG } from '../public/js/config.js';
import { TAGE, TAGE_KURZ, MAHLZEIT_NAME, ABTEILUNG, gramm, packGramm, istOptional } from '../public/js/engine/grundlagen.js';
import { LAEDEN } from '../public/js/engine/laeden.js';

const { chromium } = createRequire(import.meta.url)('playwright');
const HIER = path.dirname(fileURLToPath(import.meta.url));
const PUB = path.join(HIER, '..', 'public');
const ZIEL = path.join(PUB, 'pdf');
const D = JSON.parse(fs.readFileSync(path.join(PUB, 'data', 'daten.json'), 'utf8'));
const R = D.rezepte, Z = D.zutaten;
const heute = new Date();
const STAND = heute.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
const STAND_MONAT = `${String(heute.getMonth() + 1).padStart(2, '0')}/${heute.getFullYear()}`;

// ---------------------------------------------------------------- Zählung wie landing.py
const moeglich = (r, g) => r.wege.some((w) => w.geraete.every((x) =>
  x === 'herd' ? (g.herd || 0) >= 1 : x === 'herd2' ? (g.herd || 0) >= 2 : !!g[x]));
const lagerbar = (z, g) => z.lager === 'k' ? !!g.kuehlschrank || z.flags.includes('e') : z.lager === 't' ? !!g.gefrier : true;
const passend = (g) => R.filter((r) => moeglich(r, g) && r.zutaten.every((z) => istOptional(z) || lagerbar(Z[z[0]], g)));
const zaehle = (g) => passend(g).length;
// Kontrolle gegen die Zahlen in Mails und Landingpages
const PRUEF = [[{ wasserkocher: 1, kuehlschrank: 1 }, 47], [{ wasserkocher: 1, mikrowelle: 1, kuehlschrank: 1 }, 59]];
for (const [g, n] of PRUEF) if (zaehle(g) !== n) console.warn(`ACHTUNG: Zählung ${JSON.stringify(g)} = ${zaehle(g)}, Mails nennen ${n}. Texte prüfen!`);

// ---------------------------------------------------------------- Hilfen
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const zahl = (x, st = 1) => (Math.round(x * 10 ** st) / 10 ** st).toLocaleString('de-DE');
const GERAET = { wasserkocher: 'Wasserkocher', mikrowelle: 'Mikrowelle', herd: 'Platte', herd2: '2 Platten', topf: 'Topf', pfanne: 'Pfanne',
  ofen: 'Backofen', airfryer: 'Heißluftfritteuse', omnia: 'Omnia-Backofen', grill: 'Grill', sandwichmaker: 'Sandwichmaker', toaster: 'Toaster', puerierstab: 'Pürierstab' };
const ALLERGEN = { gl: 'Gluten', mi: 'Milch', ei: 'Ei', fi: 'Fisch', kr: 'Krebstiere', wt: 'Weichtiere', er: 'Erdnüsse', nu: 'Schalenfrüchte',
  so: 'Soja', se: 'Sellerie', sf: 'Senf', ss: 'Sesam', sw: 'Sulfite', lu: 'Lupinen' };
const geraeteText = (weg, herdName = 'Platte') => weg && weg.geraete.length
  ? weg.geraete.map((g) => g === 'herd' ? herdName : g === 'herd2' ? `2 × ${herdName}` : GERAET[g] || g).join(', ') : 'ohne Gerät';
const hauptgericht = (r) => r.mahlzeit.includes('abend') || r.mahlzeit.includes('mittag');
function mengeText(z, g) {
  if (z.einheit === 'stk' && z.stk_g) { const n = g / z.stk_g; return `${n < 1 ? zahl(n) : Math.ceil(n - 0.05)} Stück`; }
  const e = z.einheit === 'ml' ? 'ml' : 'g';
  if (g >= 1000) return `${zahl(g / 1000, 2)} ${e === 'ml' ? 'l' : 'kg'}`;
  return `${Math.round(g)} ${e}`;
}
const packText = (z) => z.einheit === 'stk' ? `${z.pack} Stück` : z.pack >= 1000 ? `${zahl(z.pack / 1000, 2)} ${z.einheit === 'ml' ? 'l' : 'kg'}` : `${z.pack} ${z.einheit}`;
const tagName = (d, start = 0) => d < 0 ? `${TAGE[(start + 6) % 7]} davor` : TAGE[(d + start) % 7];

// Beispielgerichte, die mit dieser Stufe neu dazukommen (bevorzugt aus der eigenen Nische)
function beispiele(g, vorher, eigene, n = 5) {
  const alt = new Set(vorher ? passend(vorher).map((r) => r.id) : []);
  const haupt = passend(g).filter(hauptgericht);
  const neu = haupt.filter((r) => !alt.has(r.id));
  const sortiert = (l) => [...l.filter((r) => eigene.includes(r.id[0])), ...l.filter((r) => !eigene.includes(r.id[0]))];
  const out = sortiert(neu).slice(0, n);
  if (out.length < n) out.push(...sortiert(haupt.filter((r) => !out.includes(r))).slice(0, n - out.length));
  return out.map((r) => r.titel);
}

// ---------------------------------------------------------------- Marke: Farben, Schriften, Logo
const css = fs.readFileSync(path.join(PUB, 'css', 'themes.css'), 'utf8');
const THEMES = {};
for (const m of css.matchAll(/\[data-theme=(\w+)\]\s*\{([^}]*)\}/g)) {
  THEMES[m[1]] = Object.fromEntries([...m[2].matchAll(/--([\w-]+):\s*([^;]+);/g)].map((x) => [x[1], x[2].trim()]));
}
const font = (datei) => `url(data:font/woff2;base64,${fs.readFileSync(path.join(PUB, 'fonts', datei)).toString('base64')}) format('woff2')`;
const SCHRIFT = {
  montage: ['Archivo', [['archivo-latin-800-normal.woff2', 800], ['archivo-latin-600-normal.woff2', 600]]],
  fitness: ['Space Grotesk', [['space-grotesk-latin-700-normal.woff2', 700], ['space-grotesk-latin-500-normal.woff2', 500]]],
  camping: ['Zilla Slab', [['zilla-slab-latin-700-normal.woff2', 700], ['zilla-slab-latin-600-normal.woff2', 600]]],
  alltag: ['Bricolage Grotesque', [['bricolage-grotesque-latin-800-normal.woff2', 800], ['bricolage-grotesque-latin-700-normal.woff2', 700]]],
};
const logo = (v) => fs.readFileSync(path.join(PUB, 'img', `logo-${v}.svg`), 'utf8').replace(/<title>.*?<\/title>/, '').replace('role="img"', 'aria-hidden="true"');

function stil(v) {
  const t = THEMES[v];
  const [fam, dateien] = SCHRIFT[v];
  return `
${dateien.map(([d, w]) => `@font-face{font-family:'${fam}';src:${font(d)};font-weight:${w};}`).join('\n')}
@font-face{font-family:'Atkinson Hyperlegible';src:${font('atkinson-hyperlegible-latin-400-normal.woff2')};font-weight:400;}
@font-face{font-family:'Atkinson Hyperlegible';src:${font('atkinson-hyperlegible-latin-700-normal.woff2')};font-weight:700;}
@page{size:A4;margin:0}
:root{--text:${t.text};--leise:${t['text-leise']};--akzent:${t.akzent};--dunkel:${t['akzent-dunkel']};--flaeche:${t['flaeche-2']};
 --linie:${t['linie-stark']};--kopf:${t.kopf};--kopf-text:${t['kopf-text']};--band:${t.band};--radius:${Math.min(parseInt(t.radius, 10), 10)}px}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff;color:var(--text);font:10pt/1.4 'Atkinson Hyperlegible',Arial,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.seite{width:210mm;height:297mm;padding:11mm 14mm 0;position:relative;overflow:hidden;break-after:page}
.seite:last-child{break-after:auto}
.kopf{display:flex;align-items:center;gap:3.5mm}
.kopf svg{width:12mm;height:12mm;flex:none}
.kopf .marke{font-family:'${fam}';font-weight:${dateien[0][1]};font-size:17pt;letter-spacing:-.01em}
.kopf .doc{margin-left:auto;text-align:right;font-size:8.5pt;color:var(--leise)}
.band{height:2.6mm;background:var(--band);margin:3mm 0 5mm;border-top:.3mm solid var(--text);border-bottom:.3mm solid var(--text)}
h1,h2,h3{font-family:'${fam}';font-weight:${dateien[0][1]};line-height:1.12;margin:0 0 2.5mm;letter-spacing:-.01em}
h1{font-size:23pt}h2{font-size:14pt;margin-top:5mm}h3{font-size:11pt;margin-top:3.5mm}
p{margin:0 0 2.5mm}.klein{font-size:8.5pt;color:var(--leise)}.gross{font-size:11.5pt}
table{width:100%;border-collapse:collapse;margin:1mm 0 3mm}
th,td{border:.25mm solid var(--linie);padding:1.6mm 2mm;vertical-align:top;text-align:left}
th{background:var(--flaeche);font-weight:700;font-size:9pt}
td.zahl,th.zahl{text-align:right;white-space:nowrap}
.riesig{font-family:'${fam}';font-weight:${dateien[0][1]};font-size:20pt;line-height:1}
.kasten{display:inline-block;width:4.2mm;height:4.2mm;border:.4mm solid var(--text);border-radius:.6mm;vertical-align:-.8mm;margin-right:1.8mm;background:#fff}
ul.check{list-style:none;padding:0;margin:0 0 3mm;columns:2;column-gap:8mm}
ul.check li{margin:0 0 1.8mm;break-inside:avoid}
.box{border:.5mm solid var(--text);border-left:3mm solid var(--dunkel);border-radius:var(--radius);padding:3mm 4mm;margin:2mm 0 4mm;break-inside:avoid}
.vorlage{border:.35mm dashed var(--text);border-radius:var(--radius);padding:3mm 4mm;margin:1.5mm 0 3.5mm;font-size:10.5pt;background:#fff}
.regeln{width:100%;border-collapse:collapse}
.regeln td{border:none;border-bottom:.25mm solid var(--linie);padding:1.3mm 1mm;font-size:9.5pt;line-height:1.3}
.regeln td.wert{font-family:'${fam}';font-weight:${dateien[0][1]};font-size:12pt;white-space:nowrap;width:33mm}
.regeln td.quelle{font-size:8pt;color:var(--leise);width:30mm;text-align:right}
.karte{border:.6mm solid var(--text);border-radius:var(--radius);padding:4mm 5mm 3mm;position:relative}
.karte::before{content:'';position:absolute;left:0;right:0;top:0;height:2.2mm;background:var(--band);border-radius:var(--radius) var(--radius) 0 0}
.etiketten{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:.3mm dashed var(--leise);border-left:.3mm dashed var(--leise)}
.etikett{height:var(--eh,34mm);padding:3mm 3.5mm;border-right:.3mm dashed var(--leise);border-bottom:.3mm dashed var(--leise);display:flex;flex-direction:column;justify-content:space-between;font-size:8.5pt}
.etikett .kopfz{display:flex;align-items:center;gap:1.5mm;font-weight:700}
.etikett .kopfz svg{width:5mm;height:5mm}
.etikett .zeile{border-bottom:.3mm solid var(--text);padding-top:2.6mm;color:var(--leise);font-size:8pt;line-height:1.2}
table.eng th,table.eng td{padding:1mm 1.6mm;font-size:8.8pt;line-height:1.25}
.zwei{display:grid;grid-template-columns:1fr 1fr;gap:7mm}
.woche td{height:20mm;font-size:8.8pt;line-height:1.25}
.woche td .g{display:block;font-size:7.5pt;color:var(--leise);margin-top:.8mm}
.woche th.tag{width:22mm;background:var(--flaeche)}
.zettel{columns:2;column-gap:8mm;font-size:9pt}
.zettel h3{break-after:avoid;margin-top:2.5mm;font-size:10pt;border-bottom:.4mm solid var(--text);padding-bottom:.6mm}
.zettel div{margin:0 0 1.2mm;break-inside:avoid}
.zettel .rest{color:var(--leise);font-size:8pt}
.fuss{position:absolute;left:14mm;right:14mm;bottom:7mm;border-top:.3mm solid var(--text);padding-top:1.6mm;font-size:7.2pt;line-height:1.35;color:var(--leise);display:flex;gap:4mm}
.fuss .nr{margin-left:auto;white-space:nowrap;font-weight:700;color:var(--text)}
`;
}

const QUELLEN_STD = 'Nährwerte: Bundeslebensmittelschlüssel (BLS) 4.0, Max Rubner-Institut (2025), CC BY 4.0. Lagerregeln: BfR, FSA, USDA, teils strenger ausgelegt.';
function dokument(v, titel, seiten, quellen = QUELLEN_STD) {
  const name = CONFIG.varianten[v].name;
  const lg = logo(v);
  const html = seiten.map((inhalt, i) => `<section class="seite">
<header class="kopf">${lg}<span class="marke">${esc(name)}</span><span class="doc">${esc(titel)}<br>Stand ${STAND}</span></header>
<div class="band"></div>
${inhalt}
<footer class="fuss"><span>${esc(name)} · ein Angebot von ${esc(CONFIG.dachmarke)} · Stand ${STAND}. ${esc(quellen)} Allergene: immer das Etikett prüfen. Kein Ersatz für ärztlichen Rat.</span><span class="nr">Seite ${i + 1} von ${seiten.length}</span></footer>
</section>`).join('\n');
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${esc(name)} – ${esc(titel)}</title><style>${stil(v)}</style></head><body>${html}</body></html>`;
}

// ---------------------------------------------------------------- gemeinsame Bausteine
// Lagerregeln: Wortlaut nach Claim-Freigabe Z10 (Quelle je Regel), ENTSCHEIDUNGEN C9
function lagerkarte(v, { titel = 'Lagerkarte', zusatz = [], thermometer = false } = {}) {
  const regeln = [
    ['Kühlschrank', 'höchstens 7 °C', 'besser 5 °C. Alle Fristen unten gelten nur bei höchstens 7 °C.', 'BfR'],
    ['Gekochtes', '2 Tage', 'im Kühlschrank, gut verschlossen. Das BfR nennt 2–3 Tage, wir planen strenger.', 'BfR, bei uns strenger'],
    ['Reis', '1 Tag', 'gekochten Reis schnell abkühlen und gekühlt höchstens 1 Tag aufheben.', 'FSA (UK)'],
    ['Nudeln, Fisch, Hack, Ei', '1 Tag', 'Gerichte damit höchstens 1 Tag im Kühlschrank.', 'eigene Vorsichtsregel'],
    ['Ungekühlt', 'höchstens 2 Std.', 'Gekochtes nicht länger ohne Kühlung stehen lassen, auch nicht in Tasche oder Auto.', 'USDA (USA)'],
    ['Aufwärmen', '70 °C, 2 Min.', 'durch und durch heiß, in der Mikrowelle zwischendurch umrühren.', 'BfR'],
    ...zusatz,
  ];
  return `<div class="karte"><h2 style="margin-top:1.5mm">${esc(titel)}</h2>
<table class="regeln">${regeln.map(([a, w, t, q]) => `<tr><td style="width:36mm"><b>${esc(a)}</b></td><td class="wert">${esc(w)}</td><td>${esc(t)}</td><td class="quelle">${esc(q)}</td></tr>`).join('')}</table>
<p class="klein" style="margin-top:2mm">${thermometer ? 'Wie kalt Kühlbox oder Bordkühlschrank wirklich sind, wissen wir nicht. Ein Kühlschrankthermometer zeigt es. ' : ''}Im Zweifel: wegwerfen. Riecht oder sieht etwas komisch aus, nicht mehr essen. BfR = Bundesinstitut für Risikobewertung, FSA = Food Standards Agency, USDA = US-Landwirtschaftsministerium.</p></div>`;
}

function etiketten(v, felder, n = 15) {
  const lg = logo(v);
  const name = CONFIG.varianten[v].name;
  return `<div class="etiketten" style="--eh:${felder.length > 3 ? 42 : 32}mm">${Array.from({ length: n }, () => `<div class="etikett"><div class="kopfz">${lg}<span>${esc(name)}</span></div>${felder.map((f) => `<div class="zeile">${esc(f)}</div>`).join('')}</div>`).join('')}</div>`;
}

function geraeteTabelle(stufen, eigene, spalteOhne) {
  return `<table><thead><tr><th style="width:7mm"></th><th>Ausstattung</th><th class="zahl">Rezepte</th>${spalteOhne ? `<th class="zahl">ohne Kühlung</th>` : ''}<th>5 Beispiele, die dazukommen</th></tr></thead><tbody>
${stufen.map((s, i) => {
    const mit = zaehle(s.g);
    const ohne = zaehle({ ...s.g, kuehlschrank: 0 });
    const abend = s.abend ? `<br><span class="klein">davon ${passend(s.g).filter((r) => r.mahlzeit.includes('abend')).length} fürs Abendessen</span>` : '';
    return `<tr><td><span class="kasten"></span></td><td><b>${esc(s.name)}</b>${s.unter ? `<br><span class="klein">${esc(s.unter)}</span>` : ''}</td>
<td class="zahl"><span class="riesig">${mit}</span>${abend}</td>${spalteOhne ? `<td class="zahl">${ohne}</td>` : ''}
<td class="klein" style="color:var(--text)">${beispiele(s.g, i ? stufen[i - 1].g : null, eigene).map(esc).join(' · ')}</td></tr>`;
  }).join('\n')}</tbody></table>`;
}

// ---------------------------------------------------------------- Zimmerherd: Zimmer-Check · Montagekoffer
function zimmerCheck() {
  const v = 'montage';
  const K = { kuehlschrank: 1 };
  const stufen = [
    { name: 'Nur Wasserkocher', unter: 'und ein Kühlschrank im Zimmer oder auf dem Flur', g: { wasserkocher: 1, ...K } },
    { name: 'Wasserkocher und Mikrowelle', g: { wasserkocher: 1, mikrowelle: 1, ...K } },
    { name: 'dazu eine Kochplatte mit Topf und Pfanne', unter: 'erst den Vermieter fragen (Seite 2)', g: { wasserkocher: 1, mikrowelle: 1, herd: 1, topf: 1, pfanne: 1, ...K } },
  ];
  const s1 = `<h1>Zimmer-Check</h1>
<p class="gross"><b>Kreuz an, was im Zimmer steht.</b> Die Zahl sagt, wie viele unserer ${R.length} Rezepte damit gehen. Gezählt wie im Planer: Das Gerät ist da, und jede Zutat lässt sich lagern. Ohne Gefrierfach zählen keine Rezepte mit Tiefkühlware.</p>
${geraeteTabelle(stufen, 'UH', true)}
<p class="klein">„Rezepte“ = mit Kühlschrank. „ohne Kühlung“ = nur Gerichte, deren Zutaten ungekühlt lagern oder am Einkaufstag verbraucht werden. Ganz ohne Gerät und ohne Kühlschrank gehen ${zaehle({})} Rezepte, etwa für Pausen und Kabine. Stand ${STAND_MONAT}.</p>
<div class="box"><b>So geht's weiter:</b> Im Planer kreuzt du dieselben Geräte an. Einen Tag mit Einkaufszettel bekommst du gratis, ohne Konto. Den Link findest du in deiner Mail.</div>
<h2>Was im Zimmer noch zählt</h2>
<ul class="check">${['Kühlschrank im Zimmer oder ein eigenes Fach', 'Gefrierfach (sonst keine TK-Ware)', 'Steckdose nah am Tisch', 'Spüle oder Waschbecken in der Nähe', 'Teller, Besteck, Schüssel vorhanden', 'Laden in der Nähe (Name, Öffnungszeiten)'].map((x) => `<li><span class="kasten"></span>${esc(x)}</li>`).join('')}</ul>`;

  const packliste = ['Kochplatte (nur mit Erlaubnis des Vermieters)', 'kleiner Topf mit Deckel', 'kleine Pfanne', 'scharfes Messer mit Schutz', 'Schneidebrett', 'Dosenöffner',
    'zwei Boxen mit Deckel, mikrowellenfest', 'Klebeband und Stift für die Etiketten', 'Kühltasche mit Kühlakku für die Fahrt', 'Kühlschrankthermometer',
    'Löffel, Gabel, Schüssel', 'Spülmittel und Lappen', 'Gefrierbeutel oder Dose für Reste', 'Grundvorrat: Salz, Pfeffer, Öl'];
  const s2 = `<h1>Montagekoffer</h1>
<p class="gross">Was in den Koffer gehört, damit du mit dem kochen kannst, was vor Ort steht.</p>
<ul class="check">${packliste.map((x) => `<li><span class="kasten"></span>${esc(x)}</li>`).join('')}</ul>
<h2>Erst fragen, dann einstecken</h2>
<p>Mobile Kochgeräte im Zimmer brauchen oft die Erlaubnis des Vermieters. Frag vorher. Zwei Vorlagen zum Abschreiben oder Abfotografieren:</p>
<p class="klein"><b>Kurz, per SMS oder WhatsApp</b></p>
<div class="vorlage">Guten Tag, ich wohne ab [Datum] in Ihrem Zimmer [Nr.]. Darf ich dort eine eigene Kochplatte benutzen? Danke und viele Grüße, [Name]</div>
<p class="klein"><b>Ausführlich, per Mail</b></p>
<div class="vorlage">Guten Tag [Name des Vermieters],<br><br>ich bin vom [Datum] bis [Datum] in Ihrer Unterkunft (Zimmer [Nr.]) für meinen Arbeitgeber [Firma] auf Montage. Ich möchte abends selbst kochen. Darf ich im Zimmer eine eigene Kochplatte ([Watt] W) benutzen? Falls nein: Gibt es eine Gemeinschaftsküche oder einen Platz, an dem das erlaubt ist? Darf ich den Kühlschrank mitbenutzen?<br><br>Vielen Dank und freundliche Grüße<br>[Name], [Telefon]</div>
<p class="klein">Gerät nie unbeaufsichtigt laufen lassen. Nur auf einer festen, nicht brennbaren Fläche benutzen. Die Hausordnung der Unterkunft gilt.</p>`;

  const s3 = `${lagerkarte(v, { titel: 'Lagerkarte fürs Fach' })}
<p class="klein" style="margin-top:2mm">Ausschneiden, an Fach oder Kühlschranktür kleben. Ohne Kühlschrank plant Zimmerherd Kühlware nur für den Einkaufstag.</p>
<h2>Allergene</h2>
<p>Im Planer kannst du die 14 Hauptallergene ausschließen. Wir filtern nach unseren Zutatendaten. Rezepturen der Hersteller ändern sich: <b>Prüf bei Allergien immer das Etikett</b> der Packung, die du kaufst.</p>
<h2>Die Sonntagskiste</h2>
<p>Zu Hause vorgekocht, in der Kühltasche mitgenommen: <b>Montag</b> zuerst alles mit Reis oder Nudeln (hält 1 Tag), <b>Dienstag</b> Eintopf ohne Reis und Nudeln (hält 2 Tage), <b>ab Mittwoch</b> frisch vor Ort. Jede Box bekommt ein Etikett (Seite 4).</p>`;

  const s4 = `<h2 style="margin-top:0">Etiketten für Boxen und Fach</h2>
<p class="klein">Ausschneiden, mit Klebeband auf die Box. Mit Kugelschreiber oder wasserfestem Stift ausfüllen.</p>
${etiketten(v, ['Name', 'Gericht', 'gekocht am', 'essen bis'])}`;
  return dokument(v, 'Zimmer-Check · Montagekoffer', [s1, s2, s3, s4]);
}

// ---------------------------------------------------------------- Kochsatz: Protein-Liste
function proteinListe() {
  const v = 'fitness';
  const L = LAEDEN.aldi;
  if (LAEDEN.lidl.faktorEigenmarke !== L.faktorEigenmarke) console.warn('ACHTUNG: Aldi und Lidl haben verschiedene Preisfaktoren – Protein-Liste je Laden trennen.');
  const anteil = (z) => (4 * z.n100.p) / z.n100.kcal;
  // gleiche Rangfolge wie js/check.js (Landingpage): geschätztes Protein je Euro, Werte nicht gedruckt
  const rang = (liste) => liste.map((z) => ({ z, pje: (z.n100.p * packGramm(z) / 100) / (z.preis * L.faktorEigenmarke) })).sort((a, b) => b.pje - a.pje);
  const basis = Object.values(Z).filter((z) => z.n100.kcal > 0 && !z.flags.includes('b'));
  const haupt = rang(basis.filter((z) => anteil(z) >= 0.2)).slice(0, 12);
  const beilagen = rang(basis.filter((z) => anteil(z) >= 0.12 && anteil(z) < 0.2 && z.n100.p >= 5)).slice(0, 6);
  const zeile = ({ z }, i) => `<tr><td class="zahl">${i + 1}.</td><td><b>${esc(z.name)}</b></td><td>${esc(packText(z))}</td><td class="zahl"><b>${zahl(z.n100.p)} g</b></td><td class="zahl">${Math.round(z.n100.kcal)}</td><td class="zahl">${Math.round(anteil(z) * 100)} %</td><td>${z.al.map((a) => ALLERGEN[a]).filter(Boolean).join(', ') || '–'}</td></tr>`;
  const kopf = '<thead><tr><th class="zahl">Platz</th><th>Zutat</th><th>Packung</th><th class="zahl">Protein je 100 g</th><th class="zahl">kcal je 100 g</th><th class="zahl">Energie aus Protein</th><th>Allergene laut Zutatendaten</th></tr></thead>';
  const s1 = `<h1>Protein-Liste vom Discounter</h1>
<p class="gross">Welche Zutaten bei Aldi und Lidl voraussichtlich viel Protein fürs Geld bringen. <b>Die Reihenfolge</b> folgt unserer Schätzung „Gramm Protein je Euro“ aus geschätzten Packungspreisen (Stand ${STAND_MONAT}, teils per Stichprobe geprüft). Für Aldi und Lidl schätzen wir dieselben Preise, darum gilt eine Liste für beide.</p>
<table class="eng">${kopf}<tbody>${haupt.map(zeile).join('')}</tbody></table>
<p class="klein">Aufgenommen sind Zutaten, bei denen mindestens 20 % der Energie aus Protein stammen. Euro-Werte drucken wir erst, wenn wir die Preise an der Kasse nachgeprüft haben. Preise schwanken je Laden, Region und Woche.</p>
<h3>Beilagen mit etwas Protein</h3>
<table class="eng">${kopf}<tbody>${beilagen.map(zeile).join('')}</tbody></table>
<p class="klein">Beilagen: 12 bis unter 20 % der Energie aus Protein. Sie stehen getrennt von der Liste oben, damit Mehl und Nudeln dort nicht vorn landen.</p>`;

  const P = erstellePlan(D, { ...CONFIG.varianten.fitness.profil, tage: 7 });
  const m = P.profil.makros;
  const kochtage = P.ablauf.filter((a) => a.boxen && a.boxen.length);
  const s2 = `<h1>Zwei Kochtage statt einem</h1>
<p class="gross">Gekochtes hält im Kühlschrank höchstens 2 Tage. Wer sonntags für Freitag kocht, isst eine fünf Tage alte Box. Darum plant Kochsatz zwei Kochtage, zum Beispiel Sonntag und Mittwoch.</p>
<p class="klein">Beispiel aus dem Planer: 1 Person, ${m.kcal.toLocaleString('de-DE')} kcal und ${m.p} g Protein am Tag, Lidl, Küche mit Herd, Ofen, Heißluftfritteuse und Mikrowelle. Reihenfolge: was am längsten im Ofen oder Topf braucht, startet zuerst.</p>
${kochtage.map((a) => `<h3>Kochtag ${esc(a.wochentag.replace(' (vor Planbeginn)', ' vor dem Plan'))}</h3>
<table class="eng"><thead><tr><th class="zahl">Nr.</th><th>Gericht, in dieser Reihenfolge starten</th><th>Gerät</th><th class="zahl">Portionen</th></tr></thead><tbody>
${a.schritte.map((s, i) => `<tr><td class="zahl">${i + 1}.</td><td>${esc(s.titel)}</td><td>${esc(geraeteText({ geraete: s.geraete }, 'Herd'))}</td><td class="zahl">${zahl(s.portionen, 2)}</td></tr>`).join('')}</tbody></table>
<table class="eng"><thead><tr><th>Box</th><th>für</th><th>Lagerung</th></tr></thead><tbody>
${a.boxen.map((b) => `<tr><td>${b.anzahl} × ${esc(b.titel)}</td><td>${esc(b.fuer)}</td><td>${esc(b.lager)}</td></tr>`).join('')}</tbody></table>`).join('')}
<p class="klein">Nährwerte je Portion sind Richtwerte aus dem BLS 4.0. Echte Produkte weichen ab. Kochsatz plant nicht unter 1.200 kcal am Tag.</p>`;

  const s3 = `${lagerkarte(v, { titel: 'Wie lange hält die Box?' })}
<h2>So steht es auf der Box</h2>
<div class="vorlage" style="font-family:monospace;font-size:12pt">Box 3 · gekocht So · essen bis Di</div>
<h2>Etiketten für die Boxen</h2>
${etiketten(v, ['Box Nr. / Gericht', 'gekocht am', 'essen bis'], 9)}`;
  return dokument(v, 'Protein-Liste · Discounter', [s1, s2, s3]);
}

// ---------------------------------------------------------------- Zweiflammer: Bordküchen-Check
function bordkuechenCheck() {
  const v = 'camping';
  const K = { kuehlschrank: 1 };
  const stufen = [
    { name: 'Eine Flamme, ein Topf', g: { herd: 1, topf: 1, ...K } },
    { name: 'Eine Flamme, Topf und Pfanne', g: { herd: 1, topf: 1, pfanne: 1, ...K } },
    { name: 'Zwei Flammen und Omnia-Backofen', unter: 'mit Topf und Pfanne', g: { herd: 2, topf: 1, pfanne: 1, omnia: 1, ...K }, abend: true },
    { name: 'dazu Landstrom', unter: 'für Heißluftfritteuse, Mikrowelle und Wasserkocher', g: { herd: 2, topf: 1, pfanne: 1, omnia: 1, airfryer: 1, mikrowelle: 1, wasserkocher: 1, ...K } },
  ];
  const s1 = `<h1>Bordküchen-Check</h1>
<p class="gross"><b>Kreuzt an, was an Bord ist.</b> Die Zahl sagt, wie viele unserer ${R.length} Rezepte damit gehen, mit Bordkühlschrank oder Kühlbox. Gezählt wie im Planer: Gerät da, jede Zutat lagerbar, ohne Gefrierfach keine Tiefkühlware.</p>
${geraeteTabelle(stufen, 'C', true)}
<p class="klein">„ohne Kühlung“ = nur Gerichte, deren Zutaten ungekühlt lagern oder am Einkaufstag verbraucht werden. Stand ${STAND_MONAT}. „Omnia“ steht hier nur beschreibend für den Backofen-Aufsatz für die Gasflamme.</p>
<div class="box"><b>So geht's weiter:</b> Im Planer kreuzt ihr dieselbe Ausstattung an. Den ersten Reisetag plant Zweiflammer gratis, ohne Konto. Der Link steht in deiner Mail.</div>`;

  // Vorratskiste: ungekühlt lagerbare Zutaten, die in den Rezepten für zwei Flammen + Omnia oft vorkommen
  const g = stufen[2].g;
  const zaehler = {};
  for (const r of passend(g)) for (const z of r.zutaten) if (!istOptional(z)) zaehler[z[0]] = (zaehler[z[0]] || 0) + 1;
  const vorrat = Object.entries(zaehler).map(([id, n]) => ({ z: Z[id], n }))
    .filter(({ z, n }) => z.lager === 'r' && !z.flags.includes('b') && ['TR', 'GW', 'NU'].includes(z.abt) && n >= 3).sort((a, b) => b.n - a.n).slice(0, 28);
  const gruppen = ['TR', 'GW', 'NU'].map((abt) => ({ abt, liste: vorrat.filter((x) => x.z.abt === abt) })).filter((x) => x.liste.length);
  const packliste = ['Topf mit Deckel', 'Pfanne', 'Omnia-Backofen, falls vorhanden', 'Schneidebrett', 'scharfes Messer', 'Dosenöffner', 'Boxen mit Deckel',
    'Klebeband und Stift für die Etiketten', 'Kühlschrankthermometer', 'Kühlakkus für die Fahrt', 'Spülschüssel, Spülmittel, Lappen', 'Ersatzkartusche bzw. Gasflasche prüfen'];
  const s2 = `<h1>Packliste Bordküche</h1>
<ul class="check">${packliste.map((x) => `<li><span class="kasten"></span>${esc(x)}</li>`).join('')}</ul>
<p class="klein">Schwere Geräte bleiben zu Hause, wenn die Zuladung knapp ist.</p>
<h2>Vorratskiste von zu Hause</h2>
<p>Was ohne Kühlung lagert und in unseren Rezepten für zwei Flammen und Omnia oft vorkommt. Die Zahl sagt, in wie vielen dieser Rezepte die Zutat steht. <b>*</b> = nach dem Öffnen kühlen.</p>
<div class="zettel">${gruppen.map((gr) => `<h3>${esc(ABTEILUNG[gr.abt])}</h3>${gr.liste.map(({ z, n }) => `<div><span class="kasten"></span>${esc(z.name)}${z.flags.includes('o') ? ' <b>*</b>' : ''} <span class="rest">(${n})</span></div>`).join('')}`).join('')}
<h3>Grundvorrat</h3>${Object.values(Z).filter((z) => z.flags.includes('b')).map((z) => `<div><span class="kasten"></span>${esc(z.name)}</div>`).join('')}</div>
<p class="klein">Frisches zuerst essen: Was gekühlt werden muss, kommt in die ersten ein, zwei Tage. Danach Gerichte aus dem Vorrat. Mindesthaltbarkeit vor der Abfahrt prüfen.</p>`;

  const s3 = `${lagerkarte(v, { titel: 'Kühlschrank-Karte für die Tür', thermometer: true, zusatz: [['Aufgetaut', '2 Tage', 'zu Hause Eingefrorenes nach dem Auftauen wie Gekochtes behandeln.', 'eigene Vorsichtsregel']] })}
<p class="klein" style="margin-top:2mm">In der Sonne steigt die Temperatur in Kühlbox und Fahrzeug schnell. Die 2 Stunden gelten ab dem Moment, in dem das Essen nicht mehr gekühlt ist.</p>
<h2>Etiketten für die Boxen</h2>
${etiketten(v, ['Gericht', 'gekocht am', 'essen bis'], 9)}`;

  // Beispiel-Wochenplan: 2 Personen, zwei Flammen + Omnia (Voreinstellung Zweiflammer)
  const P = erstellePlan(D, { ...CONFIG.varianten.camping.profil, tage: 7, seed: 1 });
  const s4 = `<h1>Beispielwoche für zwei</h1>
<p>Aus dem Planer: 2 Personen, zwei Flammen, Topf, Pfanne, Omnia-Backofen, Bordkühlschrank ohne Gefrierfach, ein Einkauf vor der Abfahrt (${esc(P.einkauf.laden)}). Kosten zeigt der Planer als Schätzung; Beträge drucken wir erst nach dem Kassenbon-Test.</p>
${wochenTabelle(P, 'Flamme')}`;
  const s5 = `<h1>Einkaufszettel zur Beispielwoche</h1>
${zettel(P)}`;
  return dokument(v, 'Bordküchen-Check · Erste Tour der Saison', [s1, s2, s3, s4, s5]);
}

// ---------------------------------------------------------------- Wochenplan-Bausteine
function wochenTabelle(P, herdName) {
  const weg = Object.fromEntries(P.kochen.map((k) => [k.nr, k]));
  const mz = P.profil.mahlzeiten;
  return `<table class="woche"><thead><tr><th class="tag">Tag</th>${mz.map((m) => `<th>${MAHLZEIT_NAME[m]}</th>`).join('')}</tr></thead><tbody>
${P.tage.map((t) => `<tr><th class="tag">${TAGE[t.wochentag]}</th>${mz.map((m) => {
    const x = t.mahlzeiten.find((y) => y.m === m);
    if (!x || !x.rezept) return '<td>frei</td>';
    const k = weg[x.kochnr];
    const her = x.gekochtAm !== t.d ? (x.herkunft === 'tk' ? `vorgekocht ${TAGE_KURZ[((x.gekochtAm % 7) + 7 + P.profil.starttag) % 7]}, eingefroren` : `vorgekocht ${TAGE_KURZ[((x.gekochtAm % 7) + 7 + P.profil.starttag) % 7]}, aus dem Kühlschrank`) : geraeteText(k.weg, herdName);
    return `<td>${esc(x.titel)}<span class="g">${esc(her)}</span></td>`;
  }).join('')}</tr>`).join('\n')}</tbody></table>
<p class="klein">Mengen für ${P.profil.personen} ${P.profil.personen === 1 ? 'Person' : 'Personen'}. „vorgekocht“ = Rest aus einem früheren Kochgang, innerhalb der Lagerfristen. Rezepte mit allen Schritten stehen im Planer.</p>`;
}

function zettel(P) {
  const start = P.profil.starttag;
  const teile = P.einkauf.einkaeufe.map((e) => `<div style="break-inside:auto"><h3 style="font-size:11pt;border:none;margin-top:1mm">Einkauf ${esc(tagName(e.tag, start))}</h3></div>
${e.gruppen.map((g) => `<h3>${esc(g.name)}</h3>${g.posten.map((x) => `<div><span class="kasten"></span><b>${x.packungen} × ${esc(x.packung)}</b> ${esc(x.name)} <span class="rest">(brauchst ${esc(x.menge)}${x.rest ? `, übrig ${esc(x.rest)}` : ''})</span></div>`).join('')}`).join('')}`).join('');
  const vorrat = P.einkauf.vorrat.map((x) => esc(x.name)).join(', ');
  return `<p class="klein">Nach Abteilungen sortiert, wie sie bei ${esc(P.einkauf.laden)} meist liegen. Mengen in ganzen Packungen, Packungsgrößen geschätzt. Sortiment je Laden prüfen.</p>
<div class="zettel">${teile}</div>
${vorrat ? `<p style="margin-top:3mm"><b>Hast du wahrscheinlich schon:</b> ${vorrat}.</p>` : ''}`;
}

// Reste-Fahrplan: Zutaten, die in mehreren Kochgängen derselben Woche stecken (Kühlware zuerst)
function resteFahrplan(P) {
  const start = P.profil.starttag;
  const nutz = {};
  for (const k of P.kochen) for (const zl of k.zutaten) {
    if (istOptional(zl)) continue;
    const z = Z[zl[0]];
    if (z.flags.includes('b')) continue;
    (nutz[zl[0]] ||= []).push({ d: k.kochtag, titel: k.titel, g: gramm(z, zl[1], zl[2]) * k.skal });
  }
  const zeilen = Object.entries(nutz).filter(([, l]) => new Set(l.map((x) => x.titel)).size > 1).map(([id, l]) => ({ z: Z[id], l: l.sort((a, b) => a.d - b.d) }))
    .filter(({ z, l }) => l.reduce((s, x) => s + x.g, 0) < packGramm(z) * 1.05 || z.lager === 'k' || z.flags.includes('o'))
    .sort((a, b) => (b.z.lager === 'k' || b.z.flags.includes('o')) - (a.z.lager === 'k' || a.z.flags.includes('o')) || b.l.length - a.l.length).slice(0, 10);
  const posten = P.einkauf.einkaeufe.flatMap((e) => e.gruppen.flatMap((g) => g.posten));
  // Reste je Zutat über alle Einkäufe zusammenfassen
  const sammel = {};
  for (const x of posten) if (x.rest) sammel[x.id] ||= { id: x.id, name: x.name, lager: x.lager };
  const restG = {};
  for (const x of posten) { const z = Z[x.id]; restG[x.id] = (restG[x.id] || 0) + x.packungen * packGramm(z); }
  const verbraucht = {};
  for (const k of P.kochen) for (const zl of k.zutaten) if (!istOptional(zl)) verbraucht[zl[0]] = (verbraucht[zl[0]] || 0) + gramm(Z[zl[0]], zl[1], zl[2]) * k.skal;
  const uebrig = Object.values(sammel).map((x) => ({ ...x, rest: mengeText(Z[x.id], Math.max(0, restG[x.id] - (verbraucht[x.id] || 0))) , gRest: restG[x.id] - (verbraucht[x.id] || 0) }))
    .filter((x) => x.gRest > packGramm(Z[x.id]) * 0.1).sort((a, b) => a.name.localeCompare(b.name, 'de'));
  const uebrigKuehl = uebrig.filter((x) => x.lager === 'k' || Z[x.id].flags.includes('o'));
  const uebrigVorrat = uebrig.filter((x) => !(x.lager === 'k' || Z[x.id].flags.includes('o')));
  return `<h1>Reste-Fahrplan</h1>
<p class="gross">Wo eine angebrochene Packung als Nächstes landet. Kühlware steht oben.</p>
<table class="eng"><thead><tr><th style="width:42mm">Zutat (Packung)</th><th>Gericht und Menge, in dieser Reihenfolge</th></tr></thead><tbody>
${zeilen.map(({ z, l }) => `<tr><td><b>${esc(z.name)}</b><br><span class="klein">${esc(packText(z))}${z.lager === 'k' ? ', Kühlregal' : z.flags.includes('o') ? ', nach dem Öffnen kühlen' : ''}</span></td><td>${l.map((x) => `${TAGE_KURZ[((x.d % 7) + 7 + start) % 7]} ${esc(x.titel)} (${esc(mengeText(z, x.g))})`).join(' → ')}</td></tr>`).join('')}</tbody></table>
<h2>Was am Ende der Woche übrig bleibt</h2>
<p>Ganz ohne Rest geht es nicht immer, weil der Laden nur ganze Packungen verkauft. Laut Plan bleibt übrig:</p>
<p><b>Kühlware:</b> ${uebrigKuehl.length ? uebrigKuehl.map((x) => `${esc(x.name)} (${esc(x.rest)})`).join(', ') : 'nichts'}. Tipp: früh einfrieren oder im Tagesplan der nächsten Woche einplanen.</p>
<p><b>Vorrat für die nächste Woche:</b> ${uebrigVorrat.length ? uebrigVorrat.map((x) => `${esc(x.name)} (${esc(x.rest)})`).join(', ') : 'nichts'}.</p>`;
}

function allergenListe(P) {
  const ids = [...new Set(P.kochen.map((k) => k.rezept))];
  const rz = Object.fromEntries(R.map((r) => [r.id, r]));
  return `<h2>Allergene der Gerichte dieser Woche</h2>
<p class="klein">Laut unseren Zutatendaten. Rezepturen der Hersteller ändern sich: <b>Allergene: immer das Etikett prüfen.</b></p>
<table class="eng"><tbody>${ids.map((id) => `<tr><td>${esc(rz[id].titel)}</td><td class="klein" style="color:var(--text)">${rz[id].al.map((a) => ALLERGEN[a]).filter(Boolean).join(', ') || 'keine der 14 Hauptallergene'}</td></tr>`).join('')}</tbody></table>`;
}

// ---------------------------------------------------------------- Wochenschmaus: Reste-Retter-Wochenplan
function wochenplan(personen) {
  const v = 'alltag';
  const profil = { ...CONFIG.varianten.alltag.profil, personen, tage: 7, laden: 'aldi', seed: 1 };
  const P = erstellePlan(D, profil);
  const Pl = erstellePlan(D, { ...profil, laden: 'lidl' });
  if (JSON.stringify(P.tage) !== JSON.stringify(Pl.tage)) console.warn(`ACHTUNG: Plan für ${personen} Personen unterscheidet sich bei Aldi und Lidl – getrennte PDFs bauen.`);
  const wer = personen === 1 ? '1 Person' : `${personen} Personen`;
  const zusatz = personen === 3 ? ' Gerechnet mit drei Erwachsenenportionen; einen eigenen Modus für Kinderportionen hat der Planer noch nicht.' : '';
  const s1 = `<h1>Reste-Retter-Wochenplan</h1>
<p class="gross"><b>${wer}, Montag bis Sonntag, für Aldi und Lidl.</b> Gebaut mit unserem Planer: Küche mit Herd, Ofen, Mikrowelle, Kühlschrank und Gefrierfach, Frühstück, Mittag und Abendessen, zweimal einkaufen. Angebrochene Packungen plant er, wo es geht, in die nächsten Tage ein.${zusatz}</p>
${wochenTabelle(P, 'Herd')}`;
  const s2 = `<h1>Einkaufszettel</h1>
${zettel(P).replace(`bei ${esc(P.einkauf.laden)} meist`, 'bei Aldi und Lidl meist')}
<p class="klein">Kosten: Der Planer zeigt sie als Schätzung für deinen Laden. Beträge drucken wir erst, wenn wir sie an der Kasse nachgeprüft haben.</p>`;
  const s3 = resteFahrplan(P);
  const s4 = `${allergenListe(P)}
<h2>Etiketten für Reste</h2>
${etiketten(v, ['Gericht', 'gekocht am', 'essen bis'], 6)}`;
  const s5 = `${lagerkarte(v, { titel: 'Lagerkarte für den Kühlschrank', zusatz: [['Rohes Hack, roher Fisch', 'am Kauftag', 'verarbeiten oder einfrieren.', 'eigene Vorsichtsregel']] })}
<div class="box" style="margin-top:5mm"><b>Lieber mit deinem eigenen Laden und Budget?</b> Einen Tag plant Wochenschmaus gratis, ohne Konto. Der Link steht in deiner Mail.</div>`;
  return dokument(v, `Reste-Retter-Wochenplan · ${wer}`, [s1, s2, s3, s4, s5]);
}

// ---------------------------------------------------------------- PDF erzeugen und prüfen
const AUFTRAEGE = [
  ['montage', 'zimmer-check.pdf', zimmerCheck],
  ['fitness', 'protein-liste.pdf', proteinListe],
  ['camping', 'bordkuechen-check.pdf', bordkuechenCheck],
  ['alltag', 'wochenplan-1-person.pdf', () => wochenplan(1)],
  ['alltag', 'wochenplan-2-personen.pdf', () => wochenplan(2)],
  ['alltag', 'wochenplan-3-personen.pdf', () => wochenplan(3)],
];
const wahl = process.argv.slice(2);
fs.mkdirSync(ZIEL, { recursive: true });
const browser = await chromium.launch();
let fehler = 0;
for (const [v, datei, bau] of AUFTRAEGE) {
  if (wahl.length && !wahl.includes(v) && !wahl.includes(datei)) continue;
  const html = bau();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  // Prüfung: kein Inhalt darf in die Fußzeile oder über den Seitenrand laufen
  const ueber = await page.evaluate(() => [...document.querySelectorAll('.seite')].map((s, i) => {
    const fuss = s.querySelector('.fuss').getBoundingClientRect().top;
    const unten = Math.max(...[...s.children].filter((c) => !c.classList.contains('fuss')).map((c) => c.getBoundingClientRect().bottom));
    const breit = s.scrollWidth > s.clientWidth + 1;
    return unten > fuss - 2 || breit ? `Seite ${i + 1}: ${Math.round(unten - fuss)} px zu lang${breit ? ', zu breit' : ''}` : null;
  }).filter(Boolean));
  const ziel = path.join(ZIEL, datei);
  await page.pdf({ path: ziel, format: 'A4', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await page.close();
  const kb = Math.round(fs.statSync(ziel).size / 1024);
  if (ueber.length || kb > 2000) fehler++;
  console.log(`${datei}: ${kb} KB${ueber.length ? ' – ÜBERLAUF: ' + ueber.join('; ') : ''}${kb > 2000 ? ' – ZU GROSS' : ''}`);
}
await browser.close();
process.exit(fehler ? 1 : 0);
