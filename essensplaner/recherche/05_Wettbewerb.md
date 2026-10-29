# 05 – Wettbewerbsanalyse Essensplaner (DE)

Stand: 28.10.2026 · Rolle: Wettbewerbsanalyst:in · Methodik: Skills `competitor-profiling` (Beobachtet / Abgeleitet / Implikation getrennt, „nicht beobachtet“ ≠ „nicht vorhanden“) und `competitor-ads-analyst` (Muster statt Einzelanzeigen, Lücken suchen). Prüfung durch eine zweite Rolle steht noch aus (Pricing/Angles).

**Alle Abrufe am 28.10.2026.** Kürzel in Tabellen: **AS** = Apple App Store Deutschland (`apps.apple.com/de/app/id…`), **GP** = Google Play Deutschland (`play.google.com/store/apps/details?id=…&hl=de&gl=de`), **TP** = Trustpilot. Vollständige Links stehen in den Zellen und in Abschnitt 8.

---

## 0. Methodik, Datenqualität und Grenzen

| Quelle | Was wurde abgerufen | Verlässlichkeit |
|---|---|---|
| App Store DE, Produktseiten | Sterne, Anzahl Bewertungen, In-App-Kauf-Preise (Liste „In-App-Käufe“) | hoch für Preise und Sterne. **Achtung:** Apple listet In-App-Käufe ohne Laufzeit und inklusive alter Aktions-Preise. Zuordnung „Monat/Jahr“ nur, wenn der Produktname sie nennt. |
| App Store DE, RSS-Feed der Rezensionen (`itunes.apple.com/de/rss/customerreviews/id=…/sortby=mostrecent/json`) | bis zu 200 neueste geschriebene DE-Rezensionen je App, gefiltert auf 1–3 Sterne | hoch für Zitate. Geschriebene Rezensionen sind deutlich negativer als der Sterne-Schnitt (Ein-Klick-Bewertungen fehlen), daher nur für **Schwächen**, nicht für Zufriedenheit nutzen. |
| Google Play DE | Sterne, Anzahl Rezensionen, Downloads | mittel: Google zeigt eine gewichtete Bewertung; die Anzahl ist i. d. R. weltweit, nicht nur DE. |
| Trustpilot (de.trustpilot.com) | TrustScore, Anzahl, 1-Stern-Zitat | mittel: Trustpilot prüft Inhalte nicht; Firmen laden teils selektiv ein. |
| Anbieter-Websites | Preise, Funktionen, Social-Kanäle | hoch, aber Momentaufnahme. |
| Drittseiten (Ratgeber, Preis-Tracker) | nur wo keine Erstquelle erreichbar war, ausdrücklich markiert | niedrig bis mittel. |

**Nicht erreichbar (28.10.2026):**
- **Meta-Werbebibliothek** (`facebook.com/ads/library`): HTTP 403 für automatisierte Abrufe (curl und WebFetch). → **nicht erreichbar.** Muss der Inhaber manuell im Browser prüfen (Checkliste in Abschnitt 3.3).
- **Google Ads Transparency Center**: Weiterleitung auf Google-Captcha („sorry“-Seite). → nicht erreichbar.
- **TikTok Ad Library / Creative Center**: Seite lädt nur per JavaScript, leerer Inhalt. → nicht erreichbar.
- **Etsy** (Suche und Marktseiten): HTTP 403. Verkaufszahlen daher **nicht gefunden**.
- **Amazon.de** (Suche): HTTP 503. Bestseller-Ränge und Rezensionszahlen **nicht gefunden**.
- **chefkoch.de** über WebFetch gesperrt, per curl erreichbar (genutzt).
- Der Windsor.ai-Connector liefert nur Daten **eigener** Werbekonten, keine Konkurrenz-Anzeigen.

Rohdaten (App-Store-Seiten, Rezensionen, Play-Seiten) liegen nur im flüchtigen Sitzungs-Scratchpad und werden nicht committet.

---

## 1. Vergleichstabelle (Überblick, 32 Anbieter/Alternativen)

Preise: Listenpreise aus dem App Store DE (In-App-Käufe) oder von der Anbieter-Website. „vermutl.“ = Laufzeit nicht im Produktnamen genannt.

| # | Anbieter | Typ | Preise DE (Stand 28.10.2026) | AS ★ (Anzahl) | GP ★ (Anzahl) | Trustpilot | Sprache DE | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | **Eat This Much** | KI-/Regel-Essensplaner mit Makros (US) | AS: 8,99 / 17,99 € (vermutl. Monat), 48,99–84,99 € (vermutl. Jahr). Web: Premium „$5.00/month with annual subscription“ ([AS](https://apps.apple.com/de/app/id981637806), [Web](https://www.eatthismuch.com/pricing/)) | 4,6 (339) | 4,1 (10.500) | 3,2 (2) [TP](https://www.trustpilot.com/review/eatthismuch.com) | **nein** (AS: Englisch) | aktiv |
| 2 | **Mealime** | Gratis-Wochenplaner (US) | gratis; **wird am 21.10.2026 eingestellt** (Hinweis auf [mealime.com](https://www.mealime.com/)) | nicht mehr im AS DE gefunden | nicht im GP DE gefunden | – | nein | **eingestellt (21.10.2026)** |
| 3 | **Samsung Food** (ex Whisk) | Rezeptsammler + Planer | AS: Monthly 7,99 €, Yearly 69,99 € ([AS](https://apps.apple.com/de/app/id1133637674)) | 4,7 (166) | 4,3 (23.100) | nicht geprüft | ja | aktiv |
| 4 | **Plan to Eat** | Rezeptsammler + Planer (US) | Web: $5.95/Monat, $49/Jahr, 14 Tage gratis; AS: 59,99 €/Jahr ([Web](https://www.plantoeat.com/pricing), [AS](https://apps.apple.com/de/app/id1215348056)) | 4,7 (29) | 3,5 (3.340) | nicht geprüft | nein (AS: Englisch) | aktiv |
| 5 | **PlateJoy** | personalisierter Planer (US) | – | – | aus GP entfernt | – | nein | **eingestellt seit 01.07.2025** (laut Help-Center-Hinweis vom 08.05.2025, zitiert bei [MealThinker](https://mealthinker.com/blog/platejoy-alternative) und [Swoodie](https://swoodie.app/blog/mealime-vs-platejoy-vs-swoodie-2026); platejoy.com am 28.10.2026: HTTP 502) |
| 6 | **Yazio** | Kalorien-Tracker mit Rezepten/Plänen | AS: „12 Monate“ 23,90 / 35,90 / 83,90 €, „6 Monate“ 14,99 €, „3 Monate“ 35,99 € ([AS](https://apps.apple.com/de/app/id946099227)) | 4,6 (447.827) | 4,2 (876.000) | 4,5 (6.406) [TP](https://de.trustpilot.com/review/yazio.com) | ja | aktiv |
| 7 | **MyFitnessPal** | Kalorien-/Makro-Tracker | AS: Monthly 9,99 / 21,99 €, Yearly 49,99 / 87,99 € ([AS](https://apps.apple.com/de/app/id341232718)) | 4,5 (80.276) | 3,9 (2,92 Mio.) | 4,3 (13.200) [TP](https://de.trustpilot.com/review/www.myfitnesspal.com) | ja | aktiv |
| 8 | **Lifesum** | Kalorien-Tracker, Diätpläne | AS: 1 Monat 9,99 / 14,99 €, 3 Monate 21,99 / 39,99 €, 1 Jahr 99,99 € ([AS](https://apps.apple.com/de/app/id286906691)) | 4,5 (81.875) | 4,3 (379.000) | 3,5 (400) [TP](https://de.trustpilot.com/review/lifesum.com) | ja | aktiv |
| 9 | **Fddb** | dt. Kalorien-/Makro-Tracker | AS: 1 Monat 3,99 €, 6 Monate 11,99 €, 12 Monate 19,99 € („Gold“) bzw. 39,99 € ([AS](https://apps.apple.com/de/app/id1105332761)) | 4,6 (17.554) | 4,5 (45.500) | nicht geprüft | ja | aktiv |
| 10 | **Kitchen Stories** | Rezept-App/Video | AS: Plus Abo 7,99 € (vermutl. Monat), 79,99 € (vermutl. Jahr); Aktionen 19,99–39,99 € ([AS](https://apps.apple.com/de/app/id771068291)) | 4,8 (45.148) | 3,9 (34.300) | nicht geprüft | ja | aktiv |
| 11 | **Chefkoch** (PLUS/PUR, Wochenplaner) | größte dt. Rezeptplattform | Web: PLUS „2,50 €/Monat im Jahresabo“ (−40 %, „nur für kurze Zeit“), 1 Woche Test nur im Jahresabo ([chefkoch.de/plus](https://www.chefkoch.de/plus/)); AS: PLUS Monat 5,99 €, Jahr 29,99 / 39,99 / 49,99 €; PUR (werbefrei) Monat 1,99 €, Jahr 14,99 € ([AS](https://apps.apple.com/de/app/id478618165)) | 4,7 (269.982) | 4,3 (114.000) | 2,9 (299) [TP](https://de.trustpilot.com/review/www.chefkoch.de) | ja | aktiv; Kontopflicht in App seit ca. Okt. 2026 (Rezensionen) |
| 12 | **Cookidoo** (Thermomix) | Geräte-Rezeptplattform | AS: Jahres-Zugang 69,99 € (CH 99,99 €; „One Year Membership“ 79,99 €) ([AS](https://apps.apple.com/de/app/id714004506)) | 4,8 (585.762) | 4,6 (167.000) | nicht geprüft | ja | aktiv |
| 13 | **KptnCook** | dt. Rezept-App mit Wochenplaner | AS: Premium 5,99 € (vermutl. Monat), Premium/Pro 29,99–59,90 € (vermutl. Jahr), „Wochenplaner für Rezepte“ 41,99 €, „KptnCook Wochenplan 1 Jahr“ 59,99 € ([AS](https://apps.apple.com/de/app/id795495986)) | 4,8 (50.080) | 4,4 (28.200) | nicht geprüft | ja | aktiv |
| 14 | **HelloFresh** | Kochbox (Alternative) | ab ca. 4,22–4,60 €/Portion + Versand (nur Drittquellen, Website zeigt Preise erst nach PLZ-Eingabe; [Websuche-Zusammenfassung, u. a. giga.de](https://www.giga.de/artikel/hello-fresh-kosten-pro-box-mahlzeit-im-ueberblick/)) | 4,5 (60.407) [AS](https://apps.apple.com/de/app/id970107419) | 4,2 (210.000) | 3,8 (58.004) [TP](https://de.trustpilot.com/review/www.hellofresh.de) | ja | aktiv |
| 15 | **Marley Spoon / Dinnerly** | Kochbox (Alternative) | Dinnerly DE: 29,70 € für 2 Pers. × 3 Rezepte, 51,00 € für 4 Pers. × 3 (Dritt-Tracker, Preise geprüft 18.03.2026, [subger.com](https://subger.com/de/service/dinnerly)); Marley Spoon: nicht gefunden | 4,4 (1.846) [AS](https://apps.apple.com/de/app/id1088840761) | 3,9 (4.150) | MS 3,0 (2.624) [TP](https://de.trustpilot.com/review/marleyspoon.de); Dinnerly 4,2 (354) [TP](https://de.trustpilot.com/review/dinnerly.de) | ja | aktiv |
| 16 | **Paprika** | Rezeptverwaltung (Kauf-App) | AS: App 5,99 € einmalig; In-App „Paprika 4 Premium“ 17,99 € (Rabatt 9,99 €) – Laufzeit nicht ausgewiesen ([AS](https://apps.apple.com/de/app/id1303222868)) | 4,8 (2.142) | 4,6 (20.800) | nicht geprüft | ja | aktiv |
| 17 | **Mealie** | Open-Source, selbst gehostet | kostenlos (AGPL-3.0), 13,7k GitHub-Sterne ([GitHub](https://github.com/mealie-recipes/mealie)) | – (inoffizielle Clients) | – | – | ja (35+ Sprachen) | aktiv |
| 18 | **Too Good To Go** | Lebensmittelrettung (Alternative) | App gratis, Bezahlung je Tüte; Servicegebühr 0,49 € laut Nutzerrezension (nicht offiziell geprüft) | 4,9 (481.451) [AS](https://apps.apple.com/de/app/id1060683933) | 4,8 (2,02 Mio.) | nicht geprüft | ja | aktiv |
| 19 | **Bring!** | Einkaufsliste | AS: Premium 1 Monat 1,99 €, 1 Jahr 9,99 € ([AS](https://apps.apple.com/de/app/id580669177)) | 4,7 (162.371) | 4,3 (144.000) | nicht geprüft | ja | aktiv |
| 20 | **Choosy** | dt. Essensplaner (Familie) | AS: Monatsabo 5,99 €, weitere 6,99 / 7,99 €; 39,99 / 49,99 € (vermutl. Jahr) ([AS](https://apps.apple.com/de/app/id1577201493)) | 4,9 (3.603) | 4,8 (6.080) | nicht geprüft | ja (nur DE) | aktiv |
| 21 | **mise – Essensplaner** (TEGS Labs Ltd) | KI-Planer mit Budget + Supermarkt + Kalorienziel | AS: Monthly 9,99 €; Yearly 22,99–59,99 €; 3 Tage gratis ([AS](https://apps.apple.com/de/app/id6777471316)) | 4,5 (1.540) | GP: 10.000+ Downloads, keine Sterne angezeigt | nicht geprüft | Beschreibung DE, AS-Sprache „Englisch“ | aktiv, Start 10.06.2026 |
| 22 | **Wochenplaner Essen – Menüplan** (Jojo Apps) | Planer + Rezeptverwaltung | AS: Woche 3,99 €, Monat 4,99 € (Rabatt 1,99 €), Jahr 19,99 € (Rabatt 9,99 €), **Lebenslang 29,99 €** (Rabatt 14,99 €) ([AS](https://apps.apple.com/de/app/id1619509620)) | 4,5 (603) | nicht ermittelt | – | ja | aktiv |
| 23 | **Essensplaner Woche** (yinqs) | einfacher Planer | nicht ermittelt | – | 4,6 (22.400), 1 Mio.+ Downloads ([GP](https://play.google.com/store/apps/details?id=com.yinqs.weeklymealplanner&hl=de&gl=de)) | – | ja | aktiv |
| 24 | **Wochenplan & Essensplaner** (R. Martinez) | einfacher Planer | AS: „Erweiterte Menüplanung“ 9,99 €, Themes je 2,99 € ([AS](https://apps.apple.com/de/app/id6460821436)) | 4,6 (620) | – | – | ja | aktiv |
| 25 | **„Was kann ich essen?“** (NatiMate GmbH) | dt. Rezept-Import/„Was koche ich heute“ | AS: Monat 4,69–9,99 €, Jahr 24,99–47,95 €, **Einmalkauf 55,00 €** ([AS](https://apps.apple.com/de/app/id6742485790)) | 4,7 (5.311) | 4,5 (9.780) | – | ja | aktiv |
| 26 | **ReciMe** | Rezeptimport + Planer | AS: ReciMe Plus 22,99 / 34,99 / 39,99 € ([AS](https://apps.apple.com/de/app/id1593779280)) | 4,6 (5.503) | nicht ermittelt | – | ja | aktiv |
| 27 | **Fastic** | Fasten-/Abnehm-App (Randwettbewerb) | AS: 1 Monat 17,99 €, 3 Monate 29,99 €, bis 79,99 € ([AS](https://apps.apple.com/de/app/id1459260306)) | 4,7 (131.132) | nicht ermittelt | – | ja | aktiv |
| 28 | **ChatGPT** (Prompt-Planung) | Allzweck-KI | Go ca. 7,99–8 €/Monat, Plus ca. 22,99 €/Monat (Ratgeberseiten, nicht OpenAI direkt: [giga.de](https://www.giga.de/tech/chatgpt-guenstiger-nutzen-neue-go-version-in-deutschland-gestartet--01KES3TZBGYGNCK8MZ862MYZE9), [monsterdealz.de](https://www.monsterdealz.de/magazin/chatgpt-kosten)) | – | – | – | ja | aktiv |
| 29 | **DishGen** | KI-Rezept-/Planer (US) | Basic gratis (15 Credits/Woche), Premium $72/Jahr, Pro $159/Jahr, 7 Tage Test ([dishgen.com](https://www.dishgen.com/)) | nicht gefunden | nicht gefunden | – | nicht beobachtet | aktiv |
| 30 | **Ollie** (ollie.ai) | KI-Familienassistent (US), früher „Ollie for Meals“ | Free, Everyday $25/Monat, Always-On $100/Monat ([ollie.ai/pricing](https://ollie.ai/pricing)); App „Ollie for Meals“ (id6480014476) im AS DE/US nicht mehr abrufbar | – | – | – | nicht beobachtet | umgebaut |
| 31 | **Meal-Prep-/Ernährungs-PDFs** (Digistore24, Coaches) | Einmalkauf-PDF | z. B. „Über 50 schnelle Wasserkocher Rezepte“ 7,90 € ([DS24](https://www.digistore24.com/product/291747)); „Zunehmen-Ernährungsplan 2.200 kcal“ 19,99 € statt 49,95 € ([DS24](https://www.digistore24.com/product/332881)); „Meal-Prep leicht gemacht – 4-Wochen-Plan“ 37,00 €, „Meal Prep One“ 9,95 € (laut Websuche, Produktseiten nicht einzeln geprüft) | – | – | – | ja | aktiv |
| 32 | **Etsy-Vorlagen** (Excel/Sheets/Notion/PDF) und **Bücher** (Mikrowelle, Lkw) | Einmalkauf | Etsy: ca. 2–9 US-$ je Vorlage (nur Suchmaschinen-Zusammenfassung, Etsy 403; [etsy.com/market/essensplaner](https://www.etsy.com/market/essensplaner)); Verkaufszahlen **nicht gefunden**. Bücher: „Mikrowellen Kochbuch für Anfänger, Studenten, Berufstätige & Faule“ (Lameyer, 18.09.2025) eBook 7,99 €, Hardcover 18,90 € ([ebook.de](https://www.ebook.de/de/product/51767418/.html)); „Sternköche“ – Fahrerhandbuch mit 40 Rezepten für Lkw-Fahrer, 12,80 € ([eurotransport-Shop](https://www.eurotransport.de/shop-buecher-kalender-sport-und-freizeit/buch-sternk%C3%B6che/7040124387526/)); **„Monteurküche“/„Kochen auf Montage“: kein Titel gefunden** | – | – | – | ja | aktiv |

**Beobachtung (Bewertungsniveau):** Fast alle großen Apps liegen bei 4,5–4,9 Sternen im App Store. Sterne trennen die Anbieter also kaum. Die Unterschiede zeigen sich erst in den geschriebenen Rezensionen (Abschnitt 2).

