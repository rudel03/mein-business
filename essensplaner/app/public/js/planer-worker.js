// Rechnet Pläne im Hintergrund, damit die Seite beim Öffnen und bei jeder Änderung flüssig bleibt.
import { erstellePlan } from './engine/planer.js';

let daten = null;
self.onmessage = (ev) => {
  const { art, nr } = ev.data;
  if (art === 'daten') { daten = ev.data.daten; return; }
  if (art !== 'plan') return;
  const e = erstellePlan(daten, ev.data.profil);
  let vorschau = null;
  // Gratis: der Rest der Woche als Vorschau (nur Namen und Fotos)
  if (ev.data.ganz && e.ok) {
    const g = erstellePlan(daten, ev.data.ganz);
    if (g.ok) vorschau = g.tage.slice(ev.data.profil.tage);
  }
  self.postMessage({ nr, e, vorschau });
};
