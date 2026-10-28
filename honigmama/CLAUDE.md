# Honigmama / BeeQueen – Projektgedächtnis

Wird beim Start jeder Sitzung gelesen. Am Ende jeder Arbeitsrunde „Stand & offene Aufgaben“ aktualisieren. Übergreifende Regeln: `../CLAUDE.md`.

## Projekt
- **Marke:** Honigmama (Shop-Name BeeQueen). Kochbuch-Reihe als PDF-E-Books für Schwangerschaft, Wochenbett und das erste Jahr.
  - Band 1 „Was darf ich essen?“ (Schwangerschaft) – `band1/BeeQueen_Honigmama_Was_darf_ich_essen_v5.pdf`
  - Band 2 „Vorkochen fürs Wochenbett“ – 55 Rezepte („über 160 warme Portionen“), 2 Kochtage, 6-Wochen-Plan
  - Band 3 „Kraft-Küche fürs erste Jahr“ – 65 Rezepte, 4 Wochenpläne
  - Pakete: Band 1+2 (29,90 €, kommuniziert als 125 Rezepte), Komplett 1–3 (39,90 €, 190 Rezepte). Einzelbände 19,90 €.
- **Shopify-Store:** `jctx4r-bu.myshopify.com`
- **Live-Theme:** 198627295614. **Neuester Entwurf:** 198629622142 „Honigmama – mehr Rezepte (Entwurf)“. Er ist UNVERÖFFENTLICHT und enthält die Rezeptzahlen, die Paket-Auswahl über dem Kaufknopf und das kleinere Produktbild.

## Feste Regeln (vom Inhaber)
- Content (Bilder, Werbemittel) **immer mit Higgsfield** erstellen und verschiedene Stile ausprobieren.
- **Live-Theme nie direkt ändern.** Immer `themeDuplicate` → im Entwurf arbeiten → der Inhaber veröffentlicht selbst.
- Band-Cover unterscheiden sich farblich: B2 Terracotta, B3 Senf. **Band 1 bekommt kein Nummern-Badge**, und die Farben werden nicht extrem durchgezogen.
- Kaufentscheidung lenken: Auf der Produktseite gibt es eine Paket-Auswahl („was kaufe ich“ statt „ob ich kaufe“). „Bestes Angebot“ steht beim Komplett-Paket.
- **Buchpreisbindung:** feste Preise, keine Rabattcodes auf Bücher. Pakete sind eigene Festpreis-Produkte.
- Keine unbelegten Werbeaussagen (UWG), keine Heilversprechen. Fachliche Inhalte gehören von einer Hebamme oder Ernährungsfachkraft gegengelesen.
- Antworten an den Inhaber auf Deutsch.

## Ordner
| Ordner | Inhalt |
|---|---|
| `work/` | Buchbau: `build_book.py`, Rezeptdaten `b2_data.py`/`b3_data.py` (+ `_extra`), `render.js`, Fotos `ph/` `ph_new/`, Theme-Dateien `theme/` |
| `buecher/` | fertige PDFs (alte Versionen in `alt/`) |
| `cover/`, `produktbilder/`, `web/` | Cover, Shopify-Produktbilder, Bilder für das Theme |
| `band1/` | Band-1-PDF, Vorschauen |
| `ads/` | Meta-Anzeigen (10 Creatives) und `Meta-Ads-Strategie.md` |
| `Launch-Paket_Honigmama_Band2_3.md`, `Abbrecher-Mails_und_Bestellmail.md` | Launch-Anleitung, Mails |

## Theme-Bausteine (in `work/theme/`)
- `hm-home.liquid` Startseite („Honigmama Startseite“), `bq-product.liquid` Produktseite (Variablen je Produkt, `hm-choice` Paket-Auswahl), `hm-pdp`, `hm-series`, `hm-bundle-offer`, `bq-header.liquid` mit Seitenmenü `#hm-drawer` zu allen 5 Produkten.

## Technische Fallstricke
- `themeFilesUpsert`: Der URL-Typ läuft asynchron und scheitert still, deshalb TEXT-Typ nutzen. Schema-`name` höchstens 25 Zeichen.
- Liquid vorher mit `@shopify/liquid-html-parser` prüfen; kein `<` in `<script>`-Blöcken.
- Horizon-Theme: Für Screenshots `html/body overflow` überschreiben, gescrollt wird in `.page-wrapper`.
- Digital Downloads: nur 1 Datei pro Variante, und die App hat keine API. Der Inhaber muss Dateien selbst tauschen (Admin → Produkt → Weitere Aktionen → Digitale Downloads).
- Higgsfield: `gpt_image_2_5`, ungefähr 8 Bilder pro Batch, sonst gibt es Fehler 429. `jobs_wait` nimmt höchstens 12 Jobs.
- pymupdf `insert_pdf` verliert interne Links, darum als LINK_GOTO mit Seitenversatz neu setzen.

## Meta-Anzeigen
- Audience Network ist aus (der Inhaber hat es abgeschaltet).
- 28.10.2026: 10 Anzeigen pausiert, danach 8 wieder aktiviert „für ein paar Tage“. Creative 1 und 13 bleiben pausiert. Nach ein paar Tagen auswerten.

## Stand & offene Aufgaben (28.10.2026)
- [ ] Inhaber: Entwurf 198629622142 prüfen und veröffentlichen.
- [ ] Anzeigen nach ein paar Tagen auswerten und Verlierer pausieren.
- [ ] Fachliches Gegenlesen (Hebamme/Ernährungsfachkraft), Testkochen der Kochtage aus Band 2.
