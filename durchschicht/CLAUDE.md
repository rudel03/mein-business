# DURCHSCHICHT – Projektgedächtnis

Wird beim Start jeder Sitzung gelesen. Am Ende jeder Arbeitsrunde „Stand & offene Aufgaben“ aktualisieren. Details stehen in `README.md` (in diesem Ordner). Übergreifende Regeln: `../CLAUDE.md`.

## Projekt
- **Marke:** DURCHSCHICHT – „Essen nach Dienstplan.“ Zielgruppe: Schichtarbeitende (Pflege, Rettung, Polizei, Logistik, Produktion). Bewusst ganz anders als Honigmama: Industrie-Stil, Direktblitz-Nachtfotos.
- **Produkt:** E-Book (PDF, 75 Seiten): 48 Rezepte, 6 Dienstplan-Pläne, Lagerkarte, Koffein-Übersicht, „Die Übergabe“, Kollegen-Kochkette, Etiketten. 19,90 €. Datei: `final/DURCHSCHICHT_Essen-nach-Dienstplan.pdf`
- **Shopify-Store:** „My Store“ / mystore, `q2e8xh-pz.myshopify.com` (Trial-Plan).
- **Lead-Magnet:** Schichtplan-Rechner („Dienstplan rein, Essensplan raus“) auf der Startseite.

## Marke
- Farben: Navy #0E1A2B, Signalorange #FF5B1F, Kreide #F3F0E8, Stahl #8A97A8, Reflexgelb #E9F24A. Schichtfarben: Früh #F2C230, Spät #FF5B1F, Nacht #3B6FE0, Frei #8A97A8.
- Schriften: Barlow Condensed 800/700/600, Inter, JetBrains Mono. Sie liegen lokal in `brand/fonts` und im Theme als Assets, nicht über Google Fonts (Datenschutz).
- Logo: 24-h-Zifferblatt mit drei Schichtsegmenten, Zeiger auf 3 Uhr nachts (`brand/make_logo.py`).
- Bildstil (Higgsfield `gpt_image_2_5`): Direktblitz bei Nacht, navy Stahlfläche, ein orangener Akzent, Filmkorn. Fleisch, Fisch und Eier vollständig durchgegart.

## Die 8 Nischen-Angles
1. Dienstplan rein, Essensplan raus · 2. Morgen erste Nacht? · 3. Pausenraum ohne Mikrowelle · 4. Mikrowellen-Schlange · 5. Datum UND Uhrzeit (Lagerangst) · 6. Übergabe für zu Hause (Partner, Geschenk) · 7. Kollegen-Kochkette · 8. Feierabend 22:30

## Feste Regeln
- Content immer mit Higgsfield erstellen.
- Live-Theme nie direkt ändern, nur Entwurf, der Inhaber veröffentlicht.
- **Buchpreisbindung** gilt auch für E-Books: überall 19,90 €, keine Rabattcodes. Tests über den Shopify-Testmodus.
- Keine Heil- oder Abnehmversprechen, keine erfundenen Zahlen oder Kundenstimmen. Lager- und Aufwärmregeln nur mit Quelle (BfR: Kühlschrank max. 2 Tage, Reis 24 h, Aufwärmen 70 °C für 2 Min., Heißhalten über 60 °C; DGE; DGUV-Information 206-027).
- Mails nur mit Double-Opt-in.
- Produktbilder dürfen keine Inhalte zeigen, die nicht im Buch sind (darum wird `mockups/mock_flatlay.png` NICHT verwendet).

## Bauen
- Buch: `cd buch && python3 ds_build.py && node render.js ds.html ds.pdf && node check.js`. Die Meldung „overflow 1:0“ beim Cover ist harmlos.
- Theme: `cd theme && python3 build.py` erzeugt `sections/ds-home.liquid`, `sections/ds-product.liquid`, `templates/index.json`, `templates/product.json`, `assets/*` und `preview.html`. Vor dem Upload mit dem Liquid-Parser prüfen.
- Rechner-Logik: `web/ds-rechner.js`. Rezeptdaten `web/recipes.json` = [Titel, Ausstattung, Slots, Kühlschrank-Tage, einfrierbar, aktive Min.]. Sie werden aus `buch/ds_data.py` erzeugt.
- Produktdaten für Shopify: `theme/produkt.json` (Titel, Handle `durchschicht`, SEO, Beschreibung, Bildliste).

## Stand & offene Aufgaben (28.10.2026)
- [x] Recherche, Marke, Logo, Buch mit allen Fotos, Rechner, Theme-Sections, 8 Anzeigen, Kampagnen-Plan (`ads/Kampagne_DURCHSCHICHT.md`), Rechtstext-Entwurf.
- [x] Theme „DURCHSCHICHT“ (210480726355) in mystore (`q2e8xh-pz.myshopify.com`) – in einer anderen Sitzung hochgeladen, ist seit 28.10. **Haupt-Theme (live)**. Altes Horizon-Theme: 210465784147 (unveröffentlicht).
- [x] Produkt „DURCHSCHICHT – Essen nach Dienstplan“ (gid://shopify/Product/11039085330771, Handle `durchschicht`) angelegt, Status **Entwurf**.
- [ ] Store ist im **Trial-Plan** – vor dem Verkauf bezahlten Plan wählen.
- [ ] Änderungen aus der Upload-Sitzung wurden nicht ins Repository gepusht – vor weiteren Theme-Änderungen den Live-Stand aus Shopify lesen statt der Dateien hier.
- [ ] Inhaber: Impressum-Daten; Kleinunternehmer ja/nein (sonst Preisangabe „inkl. MwSt.“, E-Books 7 %).
- [ ] Inhaber: PDF über Digital Downloads anhängen; Domains durchschicht.de/.com (am 28.10. frei); DPMA-Recherche.
- [ ] Rechtstexte (Widerruf digitale Inhalte § 356 Abs. 5 BGB mit Checkbox), Cookie-Banner, Meta-Pixel.
- [ ] Testkauf, danach Kampagnen A (Rechner) + B (Verkauf) starten.
