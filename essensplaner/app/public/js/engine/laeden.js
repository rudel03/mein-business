// Läden: Preisfaktor gegenüber dem Discounter-Grundpreis in zutaten.py und typische Reihenfolge der
// Abteilungen. ALLE Faktoren sind Schätzungen (Stand 10/2026), siehe recherche/09_Preisstichprobe.md.
// faktorEigenmarke: Einstiegs-/Eigenmarken (z. B. ja!, Gut & Günstig, K-Classic); faktorMarke: Markenmix.

const DISCOUNTER = ['OG', 'BR', 'TR', 'GW', 'NU', 'KU', 'FL', 'TK'];
const VOLL = ['OG', 'BR', 'FL', 'KU', 'TR', 'GW', 'NU', 'TK'];

export const LAEDEN = {
  aldi: { name: 'Aldi', faktorEigenmarke: 1.0, faktorMarke: 1.25, reihenfolge: DISCOUNTER },
  lidl: { name: 'Lidl', faktorEigenmarke: 1.0, faktorMarke: 1.25, reihenfolge: DISCOUNTER },
  netto: { name: 'Netto Marken-Discount', faktorEigenmarke: 1.02, faktorMarke: 1.25, reihenfolge: DISCOUNTER },
  penny: { name: 'Penny', faktorEigenmarke: 1.02, faktorMarke: 1.25, reihenfolge: DISCOUNTER },
  kaufland: { name: 'Kaufland', faktorEigenmarke: 1.03, faktorMarke: 1.3, reihenfolge: VOLL },
  rewe: { name: 'Rewe', faktorEigenmarke: 1.03, faktorMarke: 1.45, reihenfolge: VOLL },
  edeka: { name: 'Edeka', faktorEigenmarke: 1.05, faktorMarke: 1.45, reihenfolge: VOLL },
};
