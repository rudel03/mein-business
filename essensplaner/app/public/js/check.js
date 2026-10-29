// Lead-Magnet auf den Landingpages: Geräte-Check (zählt passende Rezepte live) bzw. Protein pro Euro.
import { wegMoeglich, packGramm, istOptional } from './engine/grundlagen.js';
import { LAEDEN } from './engine/laeden.js';

const box = document.getElementById('check');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let daten = null;

async function lade() {
  if (!daten) daten = await (await fetch('data/daten.json')).json();
  return daten;
}

async function geraeteCheck() {
  const d = await lade();
  const chips = [...box.querySelectorAll('#check-geraete input')];
  const zaehle = () => {
    const g = { herd: 0 };
    for (const c of chips) if (c.checked) { if (c.value === 'herd') g.herd = 2; else g[c.value] = true; }
    const passt = d.rezepte.filter((r) => r.wege.some((w) => wegMoeglich(w, g)) &&
      r.zutaten.every((z) => istOptional(z) || (d.zutaten[z[0]].lager === 'k' ? g.kuehlschrank || d.zutaten[z[0]].flags.includes('e') : d.zutaten[z[0]].lager === 't' ? g.gefrier : true)));
    box.querySelector('#check-ergebnis').textContent = `${passt.length} von ${d.rezepte.length} Rezepten gehen mit dieser Ausstattung.`;
    // Beispiele bevorzugt aus den Rezepten der eigenen Nische (U/H Montage, O Fitness, C Camping, F Alltag)
    const eigene = { montage: 'UH', fitness: 'O', camping: 'C', alltag: 'F' }[box.dataset.variante] || '';
    const haupt = passt.filter((r) => r.mahlzeit.includes('abend') || r.mahlzeit.includes('mittag'));
    const bsp = [...haupt.filter((r) => eigene.includes(r.id[0])), ...haupt.filter((r) => !eigene.includes(r.id[0]))].slice(0, 3);
    box.querySelector('#check-beispiele').innerHTML = bsp.map((r) => `<figure class="rk"><img src="img/rezepte/${r.id}.jpg" alt="" width="800" height="600" loading="lazy"><figcaption>${esc(r.titel)}</figcaption></figure>`).join('');
  };
  chips.forEach((c) => c.addEventListener('change', zaehle));
  zaehle();
}

async function proteinProEuro() {
  const d = await lade();
  const sel = box.querySelector('#check-laden');
  const zeige = () => {
    const L = LAEDEN[sel.value];
    const liste = Object.values(d.zutaten).filter((z) => z.n100.kcal > 0 && (4 * z.n100.p) / z.n100.kcal >= 0.2 && !z.flags.includes('b')) // mind. 20 % Energie aus Protein
      .map((z) => { const preis = z.preis * L.faktorEigenmarke; return { z, preis, pje: (z.n100.p * packGramm(z) / 100) / preis }; })
      .sort((a, b) => b.pje - a.pje).slice(0, 12);
    box.querySelector('#check-protein tbody').innerHTML = liste.map(({ z, preis, pje }) =>
      `<tr><td>${esc(z.name)}</td><td>${Math.round(pje)} g</td><td>${preis.toFixed(2).replace('.', ',')} €</td></tr>`).join('');
  };
  sel.addEventListener('change', zeige);
  zeige();
}

if (box) (box.querySelector('#check-geraete') ? geraeteCheck() : proteinProEuro()).catch(() => {
  box.insertAdjacentHTML('beforeend', '<p class="meldung">Der Check konnte nicht geladen werden. Der Planer funktioniert trotzdem.</p>');
});
