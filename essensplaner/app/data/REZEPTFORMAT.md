# Rezeptformat (JSON) – verbindlich für alle Rezeptdateien in `rezepte/`

Jede Datei ist ein JSON-Array von Rezepten. Nährwerte, Kosten, Allergene und Ernährungsform werden **automatisch** aus `zutaten.py` (BLS 4.0) berechnet – nicht ins Rezept schreiben.

```json
{
  "id": "W01",
  "titel": "Couscous-Kichererbsen-Bowl",
  "mahlzeit": ["mittag", "abend"],
  "portionen": 2,
  "zutaten": [["couscous", 120], ["kichererbsen_dose", 240], ["paprika", 1, "stk"], ["olivenoel", 15], ["salz", 2]],
  "wege": [
    {"geraete": ["wasserkocher"], "zeit": 12, "aktiv": 8,
     "schritte": ["Couscous in eine Schüssel geben, 240 ml kochendes Wasser aus dem Wasserkocher darübergießen, abdecken, 5 Minuten quellen lassen.", "…"]},
    {"geraete": ["herd", "topf"], "zeit": 12, "aktiv": 8, "schritte": ["…"]}
  ],
  "lager": {"kuehl_tage": 1, "einfrierbar": false, "ungekuehlt_h": 2, "kalt_essbar": true, "aufwaermen": "mikrowelle"},
  "mealprep": true,
  "tags": ["unterkunft", "schnell"],
  "tipp": "Ein Satz Praxis-Tipp (kein Gesundheitsversprechen).",
  "foto": "english photo prompt describing the finished dish only"
}
```

## Felder
- **id**: Präfix je Datei + Nummer, eindeutig.
- **mahlzeit**: `fruehstueck`, `mittag`, `abend`, `snack` (mehrere erlaubt). `mittag` = auch als Box zur Arbeit geeignet.
- **portionen**: Grundmenge (1, 2 oder 4). Mengen in `zutaten` gelten für genau diese Portionen.
- **zutaten**: `[zutat_id, menge]` in g bzw. ml (Einheit der Zutat in `zutaten.py`), oder `[zutat_id, anzahl, "stk"]` für Stück. Nur IDs aus `zutaten.py`! Optionales 4. Feld `"opt"` = optional (fließt nicht in Kosten/Nährwerte ein). Salz/Pfeffer/Gewürze mit realistischer Grammzahl (1–5 g).
- **wege**: 1–3 Zubereitungswege mit unterschiedlichen Geräten. Der Planer nimmt den ersten Weg, für den der Nutzer alle Geräte hat. `geraete` = ALLE nötigen Geräte dieses Wegs (leere Liste `[]` = gar kein Gerät, nur Messer/Schüssel/Gabel). Schritte konkret mit Zeit, Temperatur und Gerät, Du-Form, kurze Sätze.
- **Geräte-IDs**: `herd` (eine Kochplatte reicht), `herd2` (zwei Platten gleichzeitig nötig), `topf`, `pfanne`, `ofen`, `airfryer`, `mikrowelle`, `wasserkocher`, `puerierstab`, `toaster`, `sandwichmaker`. Kühlschrank/Gefrierfach/Thermobehälter sind keine Zubereitungsgeräte, sondern Lagerung (siehe `lager`). Grundausstattung, die immer angenommen wird: Messer, Brett, Schüssel, Teller, Besteck, Dosenöffner, mikrowellen-/hitzefeste Schüssel mit Deckel oder Teller.
- **lager** (nach BfR/BZfE, siehe unten):
  - `kuehl_tage`: wie viele Tage die fertige Speise im Kühlschrank (≤ 7 °C) hält: 0 = sofort essen, 1 = bis morgen, 2 = höchstens. Reis, Couscous, Bulgur, Quinoa, Nudeln gegart, Fisch, Hackfleisch-Gerichte, Eiergerichte (außer hartgekochte Eier in Schale) → **höchstens 1**. Sonst gegarte Speisen höchstens 2.
  - `einfrierbar`: true/false (Gerichte mit Reis nur, wenn sofort nach dem Abkühlen eingefroren; Salate mit Rohkost/Gurke/Joghurt-Dressing: false).
  - `ungekuehlt_h`: wie lange die FERTIGE Speise ohne Kühlung sicher bleibt: 2 = Standard für leicht Verderbliches (BfR: nicht länger als 2 h bei Raumtemperatur), 24 = ungekühlt haltbar (z. B. Nussmischung, Brot mit Erdnussmus, Obst), 0 = muss sofort gegessen werden.
  - `kalt_essbar`: schmeckt kalt (für Pausen ohne Mikrowelle).
  - `aufwaermen`: `mikrowelle`, `topf`, `pfanne`, `wasserkocher` (Heißwasser-Methode), `nein` (wird kalt gegessen) oder `thermo` (morgens kochend heiß in den vorgewärmten Thermobehälter).
- **mealprep**: true, wenn sich das Rezept zum Vorkochen in mehreren Portionen eignet (Regeln oben beachten).
- **tags** (frei, aber bevorzugt): `unterkunft` (machbar mit max. Wasserkocher/Mikrowelle/1 Platte), `ohne_kuehlschrank` (alle Zutaten ungekühlt lagerbar ODER als Einzelportion sofort verbraucht), `schnell` (≤ 15 Min.), `guenstig` (≤ 1,50 €/Portion geschätzt), `eiweiss` (viel Protein), `familie`, `kinder`, `lkw`, `box`, `kochtag`, `einhand`, `sportnach` …
- **tipp**: sachlich, KEINE Heil-, Abnehm- oder Gesundheitsversprechen, keine erfundenen Zahlen.
- **foto**: englischer Bild-Prompt, nur das fertige Gericht (ohne Personen, ohne Text, ohne Marken).

## Lebensmittelsicherheit (Pflicht, Quellen: BfR, BZfE, DGE)
- Gegarte Speisen zügig abkühlen (innerhalb ca. 2 h) und dann in den Kühlschrank; im Kühlschrank höchstens 2 Tage.
- Gegarter Reis (Bacillus cereus): schnell abkühlen, kühl lagern, innerhalb 1 Tag essen.
- Aufwärmen: durch und durch auf mindestens 70 °C für 2 Minuten (dampfend heiß, umrühren). Nur einmal aufwärmen.
- Heißhalten über 60 °C (Thermobehälter vorwärmen, kochend heiß einfüllen).
- Ohne Kühlung höchstens 2 Stunden für leicht Verderbliches.
- Geflügel, Hackfleisch, Fisch und Eier vollständig durchgaren (Kerntemperatur mind. 72 °C bzw. bis kein rosa Fleischsaft austritt); Eier in Gerichten für Unterkunft immer durchgegart.
- Rohe Sprossen, Rohmilchprodukte, rohes Ei: nicht verwenden.
