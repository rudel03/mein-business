# 05 – Wettbewerbsanalyse Essensplaner (DE)

Stand: 28.10.2026 · Rolle: Wettbewerbsanalyst:in · Methodik: Skills `competitor-profiling` (Beobachtet / Abgeleitet / Implikation getrennt, „nicht beobachtet“ ≠ „nicht vorhanden“) und `competitor-ads-analyst` (Muster statt Einzelanzeigen, Lücken suchen). Prüfung durch eine zweite Rolle steht noch aus (Pricing/Angles).

> **Korrigiert nach Faktencheck (10) am 29.10.2026:** mise-Jahrespreise auf sichtbare 29,99–59,99 € korrigiert (22,99 € und „3 Tage gratis“ nicht belegt), HelloFresh-Portionspreis als Stand Juni 2022 inkl. Versand gekennzeichnet. Median 29,99 €/Jahr bleibt. Geänderte Stellen tragen „(korr. 10)“.

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
| 14 | **HelloFresh** | Kochbox (Alternative) | 4,22 €/Portion **inkl. Versand** nur bei 4 Pers. × 5 Gerichten, **Stand Juni 2022** (giga); aktueller Preis 2026 nicht belegt (korr. 10) (nur Drittquellen, Website zeigt Preise erst nach PLZ-Eingabe; [Websuche-Zusammenfassung, u. a. giga.de](https://www.giga.de/artikel/hello-fresh-kosten-pro-box-mahlzeit-im-ueberblick/)) | 4,5 (60.407) [AS](https://apps.apple.com/de/app/id970107419) | 4,2 (210.000) | 3,8 (58.004) [TP](https://de.trustpilot.com/review/www.hellofresh.de) | ja | aktiv |
| 15 | **Marley Spoon / Dinnerly** | Kochbox (Alternative) | Dinnerly DE: 29,70 € für 2 Pers. × 3 Rezepte, 51,00 € für 4 Pers. × 3 (Dritt-Tracker, Preise geprüft 18.03.2026, [subger.com](https://subger.com/de/service/dinnerly)); Marley Spoon: nicht gefunden | 4,4 (1.846) [AS](https://apps.apple.com/de/app/id1088840761) | 3,9 (4.150) | MS 3,0 (2.624) [TP](https://de.trustpilot.com/review/marleyspoon.de); Dinnerly 4,2 (354) [TP](https://de.trustpilot.com/review/dinnerly.de) | ja | aktiv |
| 16 | **Paprika** | Rezeptverwaltung (Kauf-App) | AS: App 5,99 € einmalig; In-App „Paprika 4 Premium“ 17,99 € (Rabatt 9,99 €) – Laufzeit nicht ausgewiesen ([AS](https://apps.apple.com/de/app/id1303222868)) | 4,8 (2.142) | 4,6 (20.800) | nicht geprüft | ja | aktiv |
| 17 | **Mealie** | Open-Source, selbst gehostet | kostenlos (AGPL-3.0), 13,7k GitHub-Sterne ([GitHub](https://github.com/mealie-recipes/mealie)) | – (inoffizielle Clients) | – | – | ja (35+ Sprachen) | aktiv |
| 18 | **Too Good To Go** | Lebensmittelrettung (Alternative) | App gratis, Bezahlung je Tüte; Servicegebühr 0,49 € laut Nutzerrezension (nicht offiziell geprüft) | 4,9 (481.451) [AS](https://apps.apple.com/de/app/id1060683933) | 4,8 (2,02 Mio.) | nicht geprüft | ja | aktiv |
| 19 | **Bring!** | Einkaufsliste | AS: Premium 1 Monat 1,99 €, 1 Jahr 9,99 € ([AS](https://apps.apple.com/de/app/id580669177)) | 4,7 (162.371) | 4,3 (144.000) | nicht geprüft | ja | aktiv |
| 20 | **Choosy** | dt. Essensplaner (Familie) | AS: Monatsabo 5,99 €, weitere 6,99 / 7,99 €; 39,99 / 49,99 € (vermutl. Jahr) ([AS](https://apps.apple.com/de/app/id1577201493)) | 4,9 (3.603) | 4,8 (6.080) | nicht geprüft | ja (nur DE) | aktiv |
| 21 | **mise – Essensplaner** (TEGS Labs Ltd) | KI-Planer mit Budget + Supermarkt + Kalorienziel | AS: Monthly 9,99 €; Yearly 29,99–59,99 € (laut AS sichtbar; 22,99 € und Testdauer nicht belegt) (korr. 10) ([AS](https://apps.apple.com/de/app/id6777471316)) | 4,5 (1.540) | GP: 10.000+ Downloads, keine Sterne angezeigt | nicht geprüft | Beschreibung DE, AS-Sprache „Englisch“ | aktiv, Start 10.06.2026 |
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

---

## 2. Anbieterprofile

Zitate stammen aus App-Store-DE-Rezensionen (1–3 Sterne). Quelle jeweils: App-Store-Seite plus RSS-Feed `https://itunes.apple.com/de/rss/customerreviews/id=<ID>/sortby=mostrecent/json`, abgerufen 28.10.2026. Die Angabe „x % von n“ meint den Anteil der 1–3-Sterne-Rezensionen unter den n neuesten **geschriebenen** DE-Rezensionen. Dieser Wert ist kein Zufriedenheitsmaß, er zeigt nur, wie stark Ärger gerade öffentlich geäußert wird.

Legende Funktionen: ✓ = auf Anbieterseite/Store beschrieben · (✓) = teilweise · ✗ = laut Quelle nicht vorhanden · – = nicht beobachtet (geprüft: Store-Beschreibung, Preisseite, Rezensionen)

### 2.1 mise – Essensplaner (TEGS LABS LTD) – **engster direkter Wettbewerber**

**Beobachtet**
- **Fakten:** Erstveröffentlichung im AS DE am 10.06.2026, Version 1.1.23 vom 15.10.2026, Anbieter „TEGS LABS LTD“ (Rechtsform „Ltd“, Sitz nicht ausgewiesen). Im AS als Sprache **nur Englisch** hinterlegt, die Store-Beschreibung ist aber deutsch. Kategorien: Essen und Trinken, Gesundheit und Fitness. [AS](https://apps.apple.com/de/app/id6777471316)
- **Versprechen (Store-Text):** „personalisierte Essenspläne … basierend auf deinen Ernährungspräferenzen, Kalorienzielen, bevorzugten Supermärkten, deinem Budget und den Zutaten, die du bereits zu Hause hast.“ Funktionen laut Store: Wochenpläne, Planung mit vorhandenen Zutaten, automatische Einkaufslisten, „Wähle aus beliebten Supermärkten“, Ernährungsweisen-Filter.
- **Preise:** Monthly Membership 9,99 €; Yearly 29,99 / 34,99 / 39,99 / 44,99 / 59,99 € (laut AS sichtbar; mehrere Preispunkte, vermutlich Preistests oder Aktionen; 22,99 € und Testdauer nicht belegt) (korr. 10). In Rezensionen genannt: 44,99 € und „45 €“ Jahresabo, „34 € im Jahr“, „€22 for a year“, „10 € pro Monat“, „50 €/Jahr“. Der Jahrespreis liegt also je nach Nutzer zwischen 22 und 50 €; am häufigsten genannt werden **ca. 45 €/Jahr**.
- **Bewertungen:** AS 4,5 ★ (1.540). Von den 77 neuesten geschriebenen DE-Rezensionen haben aber **62 (81 %) 1–3 Sterne**. Das ist der höchste Wert aller untersuchten Planer-Apps. Google Play: Ein Eintrag „Mise: Meal Plan & Grocery List“ (10.000+ Downloads, ohne Sterne) wurde gefunden, ob er zum selben Anbieter gehört, ist **nicht geprüft**.
- **Datenschutz:** Datenschutzerklärung und AGB liegen laut Store-Text als **Google-Docs-Dokumente** vor (Links in der Beschreibung).
- **Werbung:** Mehrere Rezensionen erwähnen Werbung: „Wird überall beworben, ohne zu zeigen, dass die App was kostet“ (04.10.2026), „ich hab gerade Werbung von dieser App gesehen“ (11.08.2026). Wo die Anzeigen laufen, ist nicht belegt (Meta-Bibliothek nicht erreichbar).

**Funktionen im Raster:** Gerätefilter – · Unterkunft ohne Küche – · deutsche Läden (✓, Aldi wählbar laut Rezension) · echte Ladenpreise ✗ (laut mehreren Rezensionen unrealistisch) · Budget ✓ (Wochenbudget, laut einer Rezension **nicht unter 65 €/Woche einstellbar**) · Makros (✓) (Kalorienziel; Tages-Makros fehlen laut Nutzerwunsch) · Meal-Prep-Ablauf – · Lagerhinweise – · Export – · Vorrat ✓ · Konto/Paywall: **Hard Paywall, keine Nutzung ohne Probeabo**.

**Hauptschwächen (aus 1–3★):**
1. *Ladenbezug stimmt nicht:* „Viele Produkte die zum Kauf vorgeschlagen werden gibt es bei Aldi gar nicht. (Lüge: Vertrauen verspielt!)“ (1★, 27.10.2026). „Die Produkte sind wiederholt gar nicht im Sortiment des angegebenen Supermarktes, die Preise stimmen nicht, die Übersetzung ist fehlerhaft“ (2★, 26.08.2026).
2. *Kosten unrealistisch, Packungsgrößen ignoriert:* „Berechnet wird z.B. eine halbe Avocado (muss trotzdem eine ganze kaufen). Wenn die Preise realistischer wären und im Idealfall noch an die wöchentlichen Angebote ausgerichtet wären …“ (2★, 20.10.2026). „Wir kaufen für 2 Personen deutlich günstiger ein, als man in der App auswählen kann“ (1★, 27.07.2026).
3. *Abo-Ärger und Testphase:* „Nach Ablauf meiner kostenlosen Testversion wurden mir 44,99 € für ein Jahresabo berechnet“ (1★, 18.10.2026); „Ohne Probeabo kommt man nichtmal in die App“ (1★, 11.08.2026); „Welchen Sinn hat es, eine App als kostenlos zu tarnen …? Halte ich für Irreführung“ (1★, 28.08.2026).
4. *Allergien/Diät unzuverlässig, Englisch-Reste:* „muss man die Abneigungen auf Englisch eintippen … trotz eingegebener Abneigung wurde ein Gericht mit dieser Zutat vorgeschlagen – für Allergiker absolut unvorteilhaft“ (3★, 26.10.2026); „Gerichte … die nicht vegan sind, obwohl ich vegan ausgewählt habe“ (2★, 09.10.2026).
5. *KI-Qualität:* „vieles macht den Eindruck, als sei es schnell KI-generiert worden“ (1★, 02.10.2026); Mengenfehler in Rezepten (2★, 25.10.2026).

**Abgeleitet (mittlere Sicherheit):** mise belegt, dass es **Nachfrage und Werbe-Reichweite** für genau das Versprechen „Budget + Lieblingssupermarkt + Kalorien“ in DE gibt. Das Produkt scheitert an der Ausführung: keine echten Sortiments-/Preisdaten, LLM-Rezepte ohne Prüfung, ein aggressiver Abo-Trichter und kein Datenschutz auf EU-Niveau erkennbar.

**Implikation:** Wer das gleiche Versprechen **überprüfbar** einlöst (Preisniveaus pro Laden mit Stand-Datum, Packungsgrößen und Restverwertung, geprüfte Rezepte, Allergene als harte Ausschlüsse, Test ohne Abo-Zwang, § 312k-Kündigungsbutton), kann sich direkt gegen mise positionieren. Achtung: mise kann nachbessern. Die Version wird etwa alle 2 Wochen aktualisiert.

### 2.2 Eat This Much (US)
- **Funktionen:** Planer auf Kalorien- und Makroziel ✓, Budget ✓ („Tell us your diet goals, the foods you like, your budget, and what your schedule looks like“, Store-Text), Reste/Leftovers ✓ (Premium), Einkaufsliste ✓, Vorrat ✓, PDF-Export ✓ (Premium), Lieferintegration nur US (Instacart, Amazon Fresh, Walmart) ([Pricing](https://www.eatthismuch.com/pricing/)). Gerätefilter –, deutsche Läden ✗.
- **Zielgruppe:** Fitness/Diät, US-Markt. App nur Englisch.
- **Schwächen (7 von 21 geschriebenen DE-Rezensionen):** „meal prepping feels unnecessarily complicated. I just want to easily repeat the same day or meals for multiple days“ (1★, 10.01.2026); „shows everthing in US units and using US products“ (2★, 2019); „the recipes are very bad. You can still like it though if you are an American“ (3★, 2025). [AS](https://apps.apple.com/de/app/id981637806)
- **Marketing:** Facebook, Instagram (Links auf Website).
- **Bedeutung:** Vorbild für die Makro-/Budget-Logik, aber für DE unbrauchbar (Einheiten, Produkte, Sprache).

### 2.3 Mealime (US) – eingestellt
- Kostenloser Wochenplaner mit „über 200 Personalisierungsoptionen“ (Diät, Allergien, Abneigungen, Portionen) und sortierter Einkaufsliste; „Join over 4,500,000 others“. **Laut Banner auf mealime.com wird Mealime am 21.10.2026 eingestellt.** Im AS DE und GP DE am 28.10.2026 nicht mehr gefunden. [mealime.com](https://www.mealime.com/)
- **Implikation:** Ein Gratis-Planer mit Millionen Nutzern hat sich offenbar nicht getragen (Grund nicht öffentlich belegt, also keine Motivunterstellung). Für uns spricht das gegen „gratis + Werbung“ als Modell.

### 2.4 PlateJoy (US) – eingestellt
- Laut einem Help-Center-Hinweis vom 08.05.2025, den MealThinker und Swoodie zitieren, waren App und Website **ab 01.07.2025 nicht mehr verfügbar**; Rezepte zogen in die App „Wellos“ um. Das Original-Help-Center war am 28.10.2026 ohne Inhalt abrufbar, platejoy.com antwortete mit HTTP 502. Sicherheit mittel (Sekundärquellen). [MealThinker](https://mealthinker.com/blog/platejoy-alternative), [Swoodie](https://swoodie.app/blog/mealime-vs-platejoy-vs-swoodie-2026)

### 2.5 Samsung Food (ex Whisk)
- **Funktionen:** Rezepte von Websites speichern, Wochenplanung, „intelligente Einkaufslisten“, 14 Ernährungsweisen (Store-Text). Gerätefilter –, Budget –, DE-Preise –.
- **Preise:** 7,99 €/Monat, 69,99 €/Jahr (AS).
- **Schwächen:** „Nun mit Werbung … von der Nutzer sich im Abo freikaufen können“ (1★, 2023); „zwingende Registrierung…nööö Wieder gelöscht!!!“ (1★, 2023); Rezept-Import scheitert bei manchen Seiten (3★, 13.10.2026). [AS](https://apps.apple.com/de/app/id1133637674)
- **Zielgruppe:** Hobbyköche, Samsung-Geräte-Ökosystem. AS DE nur 166 Bewertungen, also in DE schwach verbreitet.

### 2.6 Plan to Eat (US)
- Rezept-Clipper, Planungskalender, Einkaufsliste nach Laden und Gang, Nährwerte und Tagesmakros, Haushaltskonto, „No ads“, 14 Tage Test ohne Kreditkarte, 60 Tage Geld-zurück; Jahresplan **verlängert sich nicht automatisch** ([Pricing](https://www.plantoeat.com/pricing)). App nur Englisch. GP 3,5 ★. In DE kaum Rezensionen (AS: 29 Bewertungen, 0 geschriebene 1–3★).
- **Lernpunkt:** „Kein Auto-Renew beim Jahresplan“ ist ein Vertrauenssignal, das in DE gegen Abo-Ärger (siehe mise, Yazio) gut wirken kann.

### 2.7 Yazio
- **Funktionen:** Kalorien- und Makro-Tracking, KI-Foto, Rezepte, Fasten- und Ernährungspläne. Planer mit Gerätefilter/Budget –.
- **Preise:** 12 Monate 23,90 / 35,90 / 83,90 €; 6 Monate 14,99 €; 3 Monate 35,99 € (AS). Trustpilot 4,5 (6.406).
- **Schwächen (76 % von 200):** „unüberspringbare Popup Werbung bei JEDEM eingeben einer Mahlzeit“ (1★, 27.10.2026); „Meine Pro Version funktioniert nicht trotz Bezahlung … keine Rückmeldung“ (2★, 26.10.2026); Gamification „nervt brutal“ (3★, 26.10.2026). [AS](https://apps.apple.com/de/app/id946099227)
- **Marketing:** Facebook, Instagram, TikTok (@yazioapp) (Website-Links). Größte DE-Reichweite im Segment (447.827 AS-Bewertungen).

### 2.8 MyFitnessPal
- Tracker mit Makros, Premium mit Mahlzeitenplanung (Store). Preise: 9,99 / 21,99 €/Monat, 49,99 / 87,99 €/Jahr (AS). TP 4,3 (13.200).
- **Schwächen (84 % von 200):** „Seit dem Update unbenutzbar“ (1★, 13.10.2026); „Premium App für ein Jahr bezahlt. Nach einer erfolgreichen Woche ist der PremiumZugang gesperrt“ (1★, 22.10.2026); Konto lässt sich nicht löschen (1★, 21.10.2026). [AS](https://apps.apple.com/de/app/id341232718)

### 2.9 Lifesum
- Tracker und Diätpläne. Preise: 9,99–14,99 €/Monat, 99,99 €/Jahr (AS). TP 3,5 (400).
- **Schwächen (70 % von 200):** Premium-Preis habe sich „seit 2021 … verdoppelt von 50€ auf 100€ im Jahr“, Popup bei jedem Öffnen (1★, 23.10.2026); „Makronährstoffe stehen trotz … Premium Abo dauerhaft auf 0“ (1★, 15.10.2026). [AS](https://apps.apple.com/de/app/id286906691)
- **Marketing:** Facebook, Instagram, Pinterest, X, YouTube.

### 2.10 Fddb
- Dt. Lebensmitteldatenbank und Tracker (Food Database GmbH). Preise: 3,99 €/Monat, 11,99 €/6 Monate, 19,99 bzw. 39,99 €/12 Monate (AS); GP 4,5 (45.500).
- **Schwächen (42 % von 200):** Aktivitätskalorien doppelt gezählt (2★, 21.10.2026); „Nach dem neusten Update öffnet die App nicht mehr“ (1★, 14.10.2026). [AS](https://apps.apple.com/de/app/id1105332761)
- **Bedeutung:** Fitness-Nutzer in DE tracken oft mit Fddb oder Yazio. Ein Planer sollte Makros **exportieren oder übergeben können**, statt ein weiterer Tracker zu sein.
- **Marketing:** Facebook (inkl. Gruppe), Instagram, TikTok.

### 2.11 Kitchen Stories
- Rezept-App mit Videos, Plus-Abo 7,99 € (vermutl. Monat) / 79,99 € (vermutl. Jahr), häufige Aktionen 19,99–39,99 € (AS). GP nur 3,9 ★.
- **Schwächen (70 % von 200):** Rezepte nach Kontozwang verloren: „Im Zuge des Registrierungszwangs sind alle meine Rezepte verloren gegangen“ (1★, 29.08.2026); „KI Bilder machen die App kaputt“ (1★, 25.09.2026); Krankenkassen-Gutschein-Abo intransparent (1★, 09.08.2026). [AS](https://apps.apple.com/de/app/id771068291)
- **Lernpunkt:** Krankenkassen-Gutscheine sind ein Vertriebskanal (beobachtet, Kasse nicht genannt).

### 2.12 Chefkoch (PLUS, PUR, Wochenplaner)
- Größte dt. Rezeptplattform mit eigenem **Wochenplaner** ([chefkoch.de/wochenplan](https://www.chefkoch.de/wochenplan/)), „Was koche ich heute?“. PLUS: werbefrei, Magazinrezepte, laut Website „2,50 €/Monat im Jahresabo“ (−40 %); AS: PLUS 5,99 €/Monat, 29,99–49,99 €/Jahr; PUR 1,99 €/Monat bzw. 14,99 €/Jahr.
- **Schwächen (88 % von 200, höchster Wert):** „Eine Frechheit, dass man jetzt sich registrieren muss“ (1★, 27.10.2026); „Werbung ohne Ende, man hat das Gefühl ist es ein mobile Game“ (1★, 26.10.2026); „Kontozwang für den Werbespam“ (1★, 18.10.2026). TP 2,9 (299): „Seit kurzer Zeit muss man pauschal allen, wirklich allen Cookies zustimmen“ (1★, 18.07.2026). [AS](https://apps.apple.com/de/app/id478618165)
- **Implikation:** **Kein Konto, keine Werbung** ist im Herbst 2026 ein echtes Unterscheidungsmerkmal gegenüber dem Marktführer.

### 2.13 Cookidoo (Thermomix)
- Rezepte und Wochenplan für **ein** Gerät (Thermomix), Jahreszugang 69,99 € (AS). AS 4,8 (585.762), GP 4,6 (167.000).
- **Schwächen (34 % von 200):** „Einkaufsliste ist absoluter Müll … ständig fehlen Dinge“ (2★, 17.10.2026); „Ich bin vegan, es gibt keinen Filter dafür“ (2★, 11.10.2026). [AS](https://apps.apple.com/de/app/id714004506)
- **Lernpunkt:** Cookidoo beweist die Zahlungsbereitschaft für **gerätespezifische** Rezepte (ca. 70 €/Jahr). Für Mikrowelle, Wasserkocher, Airfryer oder 1 Herdplatte gibt es so etwas nicht.

### 2.14 KptnCook
- Rezept-App mit Premium-Wochenplaner; „Wochenplaner für Rezepte“ 41,99 €, „Wochenplan 1 Jahr“ 59,99 €, Premium 5,99 € (vermutl. Monat) bis 47,99 € (AS).
- **Schwächen (60 % von 200):** „Filter für omnivore Personen kostenlos für vegan kostenpflichtig“ (1★, 05.09.2026); „Zu viele Bezahlschranken“ (1★, 31.08.2026); „Keine Familienfreigabe“ (3★, 11.10.2026). [AS](https://apps.apple.com/de/app/id795495986)
- **Marketing:** Instagram, TikTok, YouTube; Kooperation mit Miele (Pressemitteilung 2022, [Miele PDF](https://m.miele.de/media/ex/ce/presseartikel/2022/2022-005-miele-und-kptncook-bauen-erfolgreiche-zusammenarbeit-weiter-aus.pdf)).

### 2.15 Choosy (Choosy UG)
- Dt. Familien-Essensplaner: lernt den Geschmack des Haushalts, Portionen für Erwachsene und Kinder, Rezeptimport aus Instagram/TikTok, Vorrat, **REWE-Anbindung** (laut Rezensionen). Preise: 5,99 €/Monat, 39,99 / 49,99 € (vermutl. Jahr) (AS). AS 4,9 (3.603), GP 4,8 (6.080). Niedrigster Ärger-Anteil (19 % von 200).
- **Schwächen:** „musste … feststellen, dass ich sie nicht mehr nutzen kann, wenn ich nicht ein Probe-Abo abschließe“ (1★, 07.10.2026); „leider funktioniert die Anbindung an Rewe nicht“ (2★, 23.08.2026); „diese App-Werbung versprach mir kostenlose Gerichte, was nicht der Fall ist“ (1★, 06.09.2026). [AS](https://apps.apple.com/de/app/id1577201493)
- **Marketing:** Facebook, Instagram, LinkedIn; Testimonial im Store-Text („Anja, 37“).

### 2.16 Weitere DE-Planer (klein)
- **Wochenplaner Essen – Menüplan (Jojo Apps):** Generator nach Diät, Allergien, Personen und Vorrat; Echtzeit-Einkaufsliste. **Lebenslang 29,99 €**, Jahr 19,99 €, Monat 4,99 €, Woche 3,99 € (AS). Ärger-Anteil 28 % von 47. [AS](https://apps.apple.com/de/app/id1619509620)
- **Essensplaner Woche (yinqs):** GP 4,6 (22.400), 1 Mio.+ Downloads, also hohe Nachfrage nach einfachen Planern. [GP](https://play.google.com/store/apps/details?id=com.yinqs.weeklymealplanner&hl=de&gl=de)
- **Wochenplan & Essensplaner (R. Martinez):** Einmal-Freischaltung 9,99 € plus Themes. [AS](https://apps.apple.com/de/app/id6460821436)
- **„Was kann ich essen?“ (NatiMate GmbH):** Rezeptimport, Einkaufsliste; Abo oder **Einmalkauf 55 €**. Schwäche: „Ich hasse es, dass so viele Apps … sich fälschlicher Weise als kostenlos ausgeben“ (1★, 10.10.2026). [AS](https://apps.apple.com/de/app/id6742485790)
- **„foodwise“ / „Mealy“:** Unter diesen Namen nur kleine Apps gefunden (FoodWise Vorrats-Tracker: 1 Bewertung; vier „Mealy“-Apps mit 0–2 Bewertungen). Für DE **ohne Bedeutung**.
- **„MealDeal – Günstig Kochen“:** Eine Suchmaschine nannte eine Play-App, die Aldi-/Lidl-Angebote mit Budget-Wochenplanung verknüpfen soll. Der Play-Eintrag war **nicht auffindbar, also nicht verifiziert**. Im Auge behalten.

### 2.17 HelloFresh, Marley Spoon, Dinnerly (Kochboxen als Alternative)
- Sie lösen „was und womit kochen“ durch Lieferung, setzen aber voll ausgestattete Küchen voraus (Herd, Ofen). Preise: HelloFresh 4,22 €/Portion **inkl. Versand** nur bei 4 Pers. × 5 Gerichten, **Stand Juni 2022** (giga); aktueller Preis 2026 nicht belegt (korr. 10) (nur Drittquellen); Dinnerly 29,70 € für 2 Pers. × 3 Rezepte (Dritt-Tracker).
- **Schwächen:** HelloFresh TP 3,8 (58.004): „Kundenservice ist absolut schlechter KI Mist“ (1★); AS (82 % von 200): Lieferung trotz Kündigung (1★, 01.10.2026). Marley Spoon TP 3,0 (2.624): „Support reagiert nicht“; AS: „Für zwei Personen wird erwartet dass eine halbe Karotte reicht“ (2★, 24.05.2026). [AS HF](https://apps.apple.com/de/app/id970107419), [AS MS](https://apps.apple.com/de/app/id1088840761)
- **Abgeleitet:** Für Monteure in wechselnden Unterkünften sind Kochboxen unpraktisch (feste Lieferadresse, Ofen nötig). Für Unterkünfte ist das plausibel, aber nicht durch Rezensionen belegt.

### 2.18 Paprika, Mealie, ReciMe (Rezeptverwaltung)
- **Paprika:** 5,99 € einmalig, Premium-In-App 17,99 €; Schwächen: kein Import aus Instagram/TikTok (1★, 14.08.2026 und 25.10.2025). [AS](https://apps.apple.com/de/app/id1303222868)
- **Mealie:** Open Source (AGPL-3.0), selbst gehostet, Planer, Einkaufsliste nach Supermarkt-Abteilungen, 35+ Sprachen, 13,7k Sterne. Für Technik-Affine. Zeigt, dass Datensouveränität ein Thema ist. [GitHub](https://github.com/mealie-recipes/mealie)
- **ReciMe:** Rezeptimport + Planer, 22,99–39,99 € (AS).
- Keiner davon **erzeugt** Pläne nach Geräten oder Budget.

### 2.19 Too Good To Go und Bring! (Alternativen im Alltag)
- **TGTG:** löst „billig essen“ durch Restposten, aber ohne Planbarkeit. Schwächen: „Servicegebühr von 0,49 Cent ist eine absolute Frechheit“ (1★, 24.10.2026), „Keine Umkreissuche“ auf dem Dorf (2★, 23.10.2026). [AS](https://apps.apple.com/de/app/id1060683933)
- **Bring!:** Einkaufsliste, Prospekte von Händlern, Premium 1,99 €/Monat bzw. 9,99 €/Jahr. Schwächen: Apple-Watch-Unterstützung entfernt (3★, 14.10.2026), Konto-Aufforderung beim Start (2★, 01.10.2026), Prospekt-Artikel nicht in die Liste übernehmbar (3★, 28.09.2026). [AS](https://apps.apple.com/de/app/id580669177)
- **Implikation:** Export der Einkaufsliste **nach Bring!** (oder als Text/Teilen-Link) ist für DE-Nutzer naheliegend.

### 2.20 KI-Planer (ChatGPT-Prompts, DishGen, Ollie, „PlanEat AI“)
- **ChatGPT:** kann Pläne mit Geräte- und Budgetvorgaben per Prompt erstellen. Es gibt aber keine geprüften Ladenpreise, keine Haltbarkeitsquellen und keine Garantie für Allergene; ein Konto ist nötig. Preis Go ca. 8 €/Monat, Plus ca. 23 €/Monat (Ratgeberseiten). Die Rezension zu mise sagt selbst: „ask AI for recommendations that fit your budget … free“ (1★, 08.09.2026). Kostenlose KI ist also der **Standard-Vergleich** im Kopf der Nutzer.
- **DishGen:** Basic gratis (15 Credits/Woche), Premium $72/Jahr, Pro $159/Jahr ([dishgen.com](https://www.dishgen.com/)). DE-Sprache nicht beobachtet.
- **Ollie:** zum allgemeinen Familienassistenten umgebaut (Free / $25 / $100 pro Monat, [ollie.ai/pricing](https://ollie.ai/pricing)); die alte Meals-App ist im AS nicht mehr abrufbar.
- **„PlanEat AI“:** drei Apps dieses Namens im AS DE, alle mit 0 Bewertungen. Ohne Bedeutung.

### 2.21 Meal-Prep-Coaches und PDF-Pläne (Digistore24, Instagram)
- **Beobachtet:** Digistore24 führt Einmalkauf-PDFs: „Über 50 schnelle Wasserkocher Rezepte“ 7,90 € ([DS24](https://www.digistore24.com/product/291747)), „Zunehmen-Ernährungsplan für Frauen 2.200 kcal“ 19,99 € statt 49,95 € mit Versprechen „6–10 kg in 12 Wochen“ ([DS24](https://www.digistore24.com/product/332881)), dazu laut Websuche „Meal-Prep leicht gemacht – 4-Wochen-Plan“ 37,00 €, „Meal Prep One“ 9,95 €, Bundle „Der Ernährungsplan + Der Vegane Ernährungsplan“ 49,80 €. Den Autor oder die Qualifikation nennt die geprüfte Seite nicht.
- **Abgeleitet:** Typisch sind Streichpreise, Gewichtsversprechen und anonyme Autoren, also genau das, was wir nach UWG/HWG/Health-Claims-VO **nicht** machen. Der Wasserkocher-Titel ist ein Nachfrage-Signal für die Unterkunfts-Nische.
- **Instagram-Coaches:** Ohne Zugriff auf die Meta-Bibliothek und ohne Instagram-Login nicht systematisch erfasst → **nicht gefunden** (offene Aufgabe, Abschnitt 3.3).

### 2.22 Etsy-Vorlagen (Excel, Google Sheets, Notion, PDF)
- Etsy blockiert automatisierte Abrufe (403). Laut Suchmaschinen-Zusammenfassung der Etsy-Marktseiten „Essensplaner“, „Wochenplan Essen“ und „Wochenplaner Essen“: deutschsprachige Vorlagen für Excel/Google Sheets und PDF (A4/A5), Wochenraster, Einkaufsliste nach Kategorien, Rezeptkarten, Vorratsliste; **ca. 2–9 US-$**; die beliebtesten Angebote haben „mehrere hundert“ Bewertungen. **Verkaufszahlen: nicht gefunden.** Auf Gumroad: Notion-„Jahresplaner“ mit Essensplaner-Seite 9 € ([Gumroad](https://8612332540035.gumroad.com/l/notionjahresplaner)).
- **Abgeleitet:** Leere Vorlagen sind der Billig-Anker (unter 10 €). Sie nehmen das Denken nicht ab, das ist der Unterschied zu unserem Produkt.

### 2.23 Bücher: Mikrowelle, Lkw, Montage
- „Mikrowellen Kochbuch für Anfänger, Studenten, Berufstätige & Faule“ (Corinna Lameyer, Edition Dreiblatt, 18.09.2025, 192 S.), eBook 7,99 €, Hardcover 18,90 €, auf ebook.de 0 Bewertungen ([ebook.de](https://www.ebook.de/de/product/51767418/.html)). Ein weiterer Titel desselben Typs mit „Bestseller“-Label bei Ex Libris CH (CHF 13,90) ([exlibris.ch](https://www.exlibris.ch/de/buecher-buch/deutschsprachige-buecher/konstantin-berner/mikrowellen-kochbuch-fuer-anfaenger-berufstaetige-studenten-amp/id/9783969304532/)).
- „Sternköche“: Fahrerhandbuch mit 40 Rezepten für Lkw-Fahrer (Jan Bergrath, FERNFAHRER), 12,80 € ([eurotransport-Shop](https://www.eurotransport.de/shop-buecher-kalender-sport-und-freizeit/buch-sternk%C3%B6che/7040124387526/)).
- **„Monteurküche“, „Kochen auf Montage“, „Kochen im Monteurzimmer“: kein Buch und kein E-Book gefunden** (Websuche 28.10.2026). Amazon.de war nicht abrufbar (503), daher sind Amazon-Ränge und Rezensionszahlen **nicht gefunden**.

---

## 3. Marketing-Kanäle und Ad-Creatives

### 3.1 Social-Kanäle laut Website (verlinkte Profile, 28.10.2026)

| Anbieter | Kanäle auf der Website |
|---|---|
| Yazio | Facebook, Instagram, TikTok (@yazioapp) |
| KptnCook | Instagram, TikTok, YouTube |
| Choosy | Facebook, Instagram, LinkedIn |
| Kitchen Stories | Facebook, Instagram, LinkedIn, TikTok, YouTube |
| Eat This Much | Facebook, Instagram (inkl. Gründer-Profil) |
| Lifesum | Facebook, Instagram, Pinterest, X, YouTube |
| Fddb | Facebook (Seite + Gruppe), Instagram, TikTok |
| HelloFresh DE | Facebook, Instagram, X |
| Bring! | Facebook, Instagram, X |
| Paprika | Facebook, X |
| Ollie | Instagram, LinkedIn, X |
| Samsung Food, Plan to Eat, Cookidoo, TGTG, DishGen, mise | keine Profil-Links im ausgelieferten HTML gefunden (Seiten laden per JavaScript oder haben keine) |

Weitere beobachtete Kanäle: **Krankenkassen-Gutscheine** (Kitchen Stories, laut Rezension 09.08.2026), **Geräte-Kooperation** (KptnCook × Miele, 2022; Cookidoo als Teil des Thermomix-Geräts), **Gutschein- und Deal-Portale** (HelloFresh bis 120 € Neukundenrabatt, mydealz), **Affiliate-Netzwerke** (Digistore24-Produkte, HelloFresh über Awin), **App-Store-Suche** (alle).

### 3.2 Ad-Creatives
- **Meta-Werbebibliothek:** **nicht erreichbar** (HTTP 403). **Google Ads Transparency:** nicht erreichbar (Captcha). **TikTok Ad Library:** nicht erreichbar (nur JavaScript). Konkrete Anzeigen, Formate und Laufzeiten sind daher **nicht belegt**.
- **Indirekte Belege aus Rezensionen (Nutzer berichten über Anzeigen):**
  - mise: „Wird überall beworben, ohne zu zeigen, dass dir App was kostet“ (04.10.2026); „ich hab gerade Werbung von dieser App gesehen“ (11.08.2026); in der Anzeige werde mit „Rezepte die an deinen Lieblingsmarkt und Geldbeutel angepasst sind“ geworben (Rezension 29.07.2026).
  - Choosy: „diese App-Werbung versprach mir kostenlose Gerichte“ (06.09.2026).
  - NatiMate: Apps, die „sich fälschlicher Weise als kostenlos ausgeben“ (10.10.2026).
- **Muster (abgeleitet, mittlere Sicherheit):** Die Planer-Apps werben mit „spar Geld / Lieblingssupermarkt / kostenlos laden“ und führen dann in eine Hard Paywall. Die enttäuschte Erwartung „gratis“ ist die häufigste Ursache für 1★ bei mise, Choosy und NatiMate.
- **Lücke in der Botschaft (abgeleitet):** Keiner der untersuchten Anbieter wirbt nachweisbar mit **Geräten** („nur Wasserkocher und Mikrowelle“), **Unterkunft/Montage**, **Haltbarkeit ohne Kühlschrank** oder **ehrlichem Preis vorab**.

### 3.3 Offene Aufgabe für den Inhaber (manuell, ca. 30 Minuten)
Im Browser, eingeloggt, Land Deutschland, „Alle Anzeigen“: Meta-Werbebibliothek <https://www.facebook.com/ads/library/> nach **mise, Choosy, KptnCook, Yazio, HelloFresh, Fddb, „Essensplaner“, „Meal Prep“, „Monteur“** durchsuchen. Je Treffer notieren: Bild/Video/Karussell, Hook (erste Zeile), Angebot (gratis/Test/Rabatt), Startdatum, Anzahl Varianten. Länger als 30 Tage aktive Anzeigen gelten als Gewinner. Dasselbe in <https://adstransparency.google.com/?region=DE> und <https://library.tiktok.com/>. Diesen Punkt in `FUER_DICH.md` aufnehmen.

---

## 4. Lückenanalyse-Matrix (Feature × Anbieter)

✓ = belegt vorhanden · (✓) = teilweise · ✗ = belegt nicht vorhanden/unbrauchbar · – = nicht beobachtet (Store-Text, Preisseite, Rezensionen geprüft; kein Test-Account). „Offline-PWA“ meint eine installierbare Web-App, die ohne Netz läuft. „Kein Konto“: ✓ nur, wenn die Kernfunktion ohne Registrierung nutzbar ist.

| Anbieter | Gerätefilter | Unterkunft ohne Küche | DE-Discounter-Preise | Budget-Obergrenze | Makro-Optimierung | Meal-Prep-Ablauf mit Uhrzeiten | Lager-/Haltbarkeitsregeln mit Quelle | Offline-PWA | kein Konto nötig | DSGVO/EU-Hosting belegt |
|---|---|---|---|---|---|---|---|---|---|---|
| **mise** | – | – | (✓) Laden wählbar, Preise laut Nutzern falsch | (✓) Mindestbudget 65 €/Woche (Rezension) | (✓) Kalorienziel | – | – | ✗ (native App) | ✗ (Hard Paywall, persönliche Daten) | ✗ nicht belegt (Ltd, Datenschutz als Google Doc) |
| Eat This Much | – | – | ✗ (US-Produkte) | ✓ | ✓ | (✓) Reste/Leftovers | – | ✗ | ✗ (Login laut Rezension) | – |
| Mealime | – | – | ✗ | – | – | – | – | ✗ | – | – (eingestellt) |
| Samsung Food | – | – | – | – | – | – | – | ✗ | ✗ (Registrierung) | – |
| Plan to Eat | – | – | ✗ | – | (✓) Tagesmakros anzeigen | – | – | ✗ | ✗ | – |
| Yazio | – | – | – | – | (✓) Tracking/Pläne | – | – | ✗ | – | – |
| MyFitnessPal | – | – | – | – | (✓) Tracking | – | – | ✗ | ✗ | – |
| Lifesum | – | – | – | – | (✓) Tracking/Pläne | – | – | ✗ | – | – |
| Fddb | – | – | – | – | (✓) Tracking | – | – | ✗ | – | – (dt. GmbH, Hosting nicht geprüft) |
| Kitchen Stories | – | – | – | – | – | – | – | ✗ | ✗ (Registrierungszwang) | – |
| Chefkoch | – | – | – | – | – | – | – | ✗ | ✗ (Kontopflicht seit Okt. 2026) | – |
| Cookidoo | (✓) nur Thermomix | – | – | – | – | – | – | ✗ | ✗ | – |
| KptnCook | – | – | – | – | – | – | – | ✗ | – | – |
| Choosy | – | – | (✓) REWE-Anbindung (laut Nutzern fehlerhaft) | – | – | – | – | ✗ | – (Probe-Abo-Zwang) | – |
| Jojo Wochenplaner | – | – | – | – | – | – | – | ✗ | – | – |
| NatiMate | – | – | – | – | – | – | – | ✗ | – | – |
| Paprika | – | – | – | – | – | – | – | ✗ (native) | – | – |
| Mealie | – | – | – | – | – | – | – | (✓) Web-App, Selbst-Hosting | ✓ beim eigenen Server | (✓) bei Selbst-Hosting in EU |
| HelloFresh / Marley Spoon / Dinnerly | ✗ (Ofen/Herd vorausgesetzt) | ✗ | ✗ (eigene Box-Preise) | – | – | – | – | ✗ | ✗ | – |
| Too Good To Go | ✗ | – | – | – | ✗ | ✗ | – | ✗ | ✗ | – |
| Bring! | ✗ | ✗ | (✓) Prospekte | ✗ | ✗ | ✗ | – | ✗ | (✓) versteckt überspringbar | – |
| ChatGPT / DishGen | (✓) per Prompt, ungeprüft | (✓) per Prompt, ungeprüft | ✗ (keine geprüften Preise) | (✓) per Prompt | (✓) ungeprüft | (✓) per Prompt | ✗ (keine Quellen) | ✗ | ✗ | – |
| Digistore-PDFs | (✓) ein Gerät (z. B. Wasserkocher) | (✓) | – | – | (✓) feste kcal-Pläne | – | – | ✓ (PDF) | ✓ | – |
| Etsy-Vorlagen | ✗ (leere Vorlage) | ✗ | ✗ | (✓) selbst eintragen | ✗ | ✗ | ✗ | ✓ (Datei) | ✓ | – |
| Bücher (Mikrowelle, Lkw) | (✓) ein Gerät | (✓) Lkw-Kabine | ✗ | ✗ | ✗ | ✗ | – | ✓ (Papier/eBook) | ✓ | – |

---

## 5. Was löst niemand?

Belegt durch die Matrix, mit Vorbehalt „nicht beobachtet“ (keine Test-Accounts):

1. **Gerätefilter über mehrere Geräte** (Wasserkocher + Mikrowelle + 1 Herdplatte + Airfryer + „kein Kühlschrank“): Kein App-Anbieter zeigt das. Es gibt nur Einzelgeräte-Lösungen (Cookidoo/Thermomix, Mikrowellen-Buch, Wasserkocher-PDF).
2. **Unterkunft/Montage als Nutzungsfall:** Kein Produkt, kein Buch („Monteurküche“ nicht gefunden), keine beobachtete Werbung. Der nächste Verwandte ist das Lkw-Fahrerbuch „Sternköche“ (12,80 €).
3. **Ehrliche Discounter-Kosten mit Packungsgrößen:** mise versucht es und scheitert laut Nutzern an Sortiment, Preisen und halben Packungen („halbe Avocado“, „2 Eier benötigt und 6 kaufen“).
4. **Echtes Budget nach unten:** mise lässt laut einer Rezension kein Wochenbudget unter 65 € zu. Kleines Budget (Studierende, Bürgergeld, Monteure mit Spesen-Pauschale) bedient niemand nachweisbar.
5. **Meal-Prep-Ablauf mit Uhrzeiten** (z. B. „So 17:00 Reis aufsetzen, 17:10 …“): bei keinem Anbieter beobachtet. Eat This Much hat Reste-Logik, laut Nutzern aber „unnecessarily complicated“.
6. **Lager- und Haltbarkeitsregeln mit Quelle** (BfR/BZfE, „ohne Kühlschrank max. 2 h“): bei keinem Anbieter beobachtet.
7. **Kein Konto, kein Abo-Zwang, offline:** Die großen Apps gehen 2026 in die Gegenrichtung (Chefkoch und Kitchen Stories mit Kontozwang, mise und Choosy mit Probeabo-Zwang). Offline-PWA bietet nur Mealie (Selbst-Hosting, technisch anspruchsvoll).
8. **DSGVO und Gesundheitsdaten:** Kein Anbieter wirbt nachweisbar mit EU-Hosting oder lokaler Speicherung von Allergien und Makros (Art. 9 DSGVO prüfen, siehe Recht-Teilbericht).

**Gegenprobe (Advocatus Diaboli):** „Niemand löst es“ kann auch heißen, dass die Nachfrage zu klein ist. Dagegen sprechen die Belege: Wasserkocher-E-Book und Mikrowellen-Bücher existieren, mise wirbt breit mit Budget und Supermarkt, „Essensplaner Woche“ hat 1 Mio.+ Downloads, Cookidoo verkauft gerätespezifische Rezepte für ca. 70 €/Jahr. Die Größe der Montage-Nische selbst muss der Marktforschungs-Teilbericht belegen.

---

## 6. Preisanker-Übersicht

Basis: Listenpreise App Store DE (28.10.2026), je App der **niedrigste** und der **höchste** angegebene Preis der jeweiligen Laufzeit. Aktionsartikel mit „Rabatt/Angebot/Sale/Black Friday“ im Namen sind ausgeschlossen. USD-Preise sind nicht umgerechnet und nicht im Median.

### 6.1 Monatspreise (niedrigster regulärer Monatspreis je App)
Bring! 1,99 · Fddb 3,99 · NatiMate 4,69 · Jojo 4,99 · Chefkoch PLUS 5,99 · KptnCook 5,99 · Choosy 5,99 · Samsung Food 7,99 · Kitchen Stories 7,99 · Eat This Much 8,99 · MyFitnessPal 9,99 · Lifesum 9,99 · mise 9,99 · Fastic 17,99 (n = 14)
- **Median gesamt: 6,99 €/Monat** (Mittel aus 5,99 und 7,99)
- **Median reine Planer/Rezept-Apps** (Jojo, NatiMate, Chefkoch, KptnCook, Choosy, Samsung, Eat This Much, mise; n = 8): **5,99 €/Monat**
- Spanne: 1,99–17,99 €. US-Vergleich: Plan to Eat $5.95, Ollie $25 (Assistent), ChatGPT Plus ca. 23 €.

### 6.2 Jahrespreise
- Niedrigster Jahrespreis je App (n = 16: Bring 9,99 · Fddb 19,99 · Jojo 19,99 · ReciMe 22,99 · Yazio 23,90 · NatiMate 24,99 · Chefkoch 29,99 · KptnCook 29,99 · mise 29,99 (korr. 10) · Choosy 39,99 · MFP 49,99 · Plan to Eat 59,99 · Samsung 69,99 · Cookidoo 69,99 · Kitchen Stories 79,99 · Lifesum 99,99): **Median 29,99 €/Jahr**
- Höchster Jahrespreis je App (gleiche 16 Apps): **Median 59,99 €/Jahr**
- **Ergebnis: Der „normale“ Jahrespreis liegt bei 30–60 €.** mise wird in Rezensionen meist mit 44,99 € erlebt, also mitten in diesem Band. Schon dieser Preis löst bei schwacher Leistung 1★-Wut aus („10 € pro Monat – lächerlich für eine Rezepte-App“).

### 6.3 Lifetime und Einmalkauf
| Angebot | Preis |
|---|---|
| Paprika (App-Kauf) | 5,99 € |
| Wochenplan & Essensplaner (Einmal-Freischaltung) | 9,99 € |
| Jojo Wochenplaner Lebenslang | 29,99 € (Rabatt 14,99 €) |
| NatiMate Einmalkauf | 55,00 € |
| **Median Lifetime (n = 4)** | **ca. 20 €** (Mittel aus 9,99 und 29,99) |

### 6.4 Einmal-Inhalte (PDF, Vorlage, Buch)
Etsy-Vorlage ca. 2–9 US-$ · Wasserkocher-E-Book 7,90 € · Mikrowellen-eBook 7,99 € · Meal Prep One 9,95 € · Lkw-Kochbuch 12,80 € · Mikrowellen-Hardcover 18,90 € · Ernährungsplan-PDF 19,99 € (Streichpreis 49,95 €) · Meal-Prep-4-Wochen-PDF 37,00 €. **Median ca. 10–13 €.**

### 6.5 Kochboxen (Kostenanker für Lebensmittel, nicht fürs Tool)
HelloFresh 4,22 € **pro Portion** inkl. Versand nur bei 4 Pers. × 5 Gerichten, **Stand Juni 2022** (giga); aktueller Preis 2026 nicht belegt (korr. 10), Dinnerly ca. 29,70 € für 6 Portionen (Drittquellen). Damit lässt sich zeigen, was ein Discounter-Plan pro Portion spart. Die Ersparnis-Aussage braucht aber eigene, belegte Warenkorb-Rechnungen (UWG).

**Implikation für Pricing (zur Prüfung durch die Pricing-Rolle):** Ein Preis unter dem Planer-Median (z. B. Jahrespreis unter 30 € oder Einmalkauf um 20–30 €) plus **Test ohne Abo-Zwang** setzt sich direkt von mise und Choosy ab. Buchpreisbindung gilt nur für E-Books, nicht für eine App, gebündelte E-Book-Inhalte aber prüfen (Recht-Teilbericht).

> Hinweis zu 6.2: Bei KptnCook, Choosy, ReciMe, Kitchen Stories und Eat This Much nennt Apple die Laufzeit nicht. Werte ab ca. 20 € wurden als Jahrespreis gewertet („vermutl. Jahr“). Bei Eat This Much ist die Zuordnung zu unsicher, daher fehlt die App in 6.2.

---

## 7. Fünf Positionierungsoptionen gegen die Konkurrenz

Jede Option nennt den Beleg, den Gegner und das Risiko. Die Auswahl trifft die Strategie-Rolle (Phase B), geprüft durch Pricing und Angles.

| # | Positionierung | Kernversprechen (Entwurf, ohne unbelegte Zahlen) | Gegen wen | Beleg für die Lücke | Risiko |
|---|---|---|---|---|---|
| **1** | **„Kocht mit dem, was da ist“ – Geräte zuerst** (Montage/Unterkunft) | „Sag uns, ob du Wasserkocher, Mikrowelle oder eine Platte hast, und ob ein Kühlschrank da ist. Wir planen nur, was damit wirklich geht.“ | Kochboxen, Chefkoch, Cookidoo (ein Gerät), Einzelgeräte-Bücher/PDFs | Gerätefilter für mehrere Geräte bei keinem App-Anbieter beobachtet; kein Monteur-Kochbuch gefunden; Wasserkocher-PDF und Mikrowellen-Bücher zeigen Nachfrage | Nischengröße und Erreichbarkeit der Monteure müssen belegt werden; das Rezeptangebot für „kein Kühlschrank“ ist begrenzt |
| **2** | **„Discounter-ehrlich“ – Budget, das an der Kasse stimmt** | „Wochenkosten mit echten Packungsgrößen für deinen Laden. Reste werden eingeplant, nicht weggeworfen. Preisstand immer mit Datum.“ | **mise** (direkt), Choosy, ChatGPT | mise-Rezensionen: falsches Sortiment, halbe Avocado, Mindestbudget 65 €/Woche, „10 € über der Schätzung“ | Preisdaten legal und aktuell halten (Datenbankrecht, siehe Daten-Teilbericht). Lieber „Preisniveau mit Stand“ als falsche Cent-Genauigkeit |
| **3** | **„Ohne Konto, ohne Abo-Falle, deine Daten bleiben bei dir“** | „Sofort ausprobieren, ohne Anmeldung. Läuft offline als Web-App. Allergien und Makros bleiben auf deinem Handy. Kündigen mit einem Klick.“ | Chefkoch (Kontopflicht), Kitchen Stories, mise und Choosy (Probeabo-Zwang), Yazio/MFP (Abo-Ärger) | Kontozwang- und Abo-Beschwerden sind im Okt. 2026 die häufigsten 1★-Themen; Plan to Eat nutzt „kein Auto-Renew“ als Vertrauenssignal | „Ohne Konto“ erschwert Sync und Abo-Prüfung; Monetarisierung eher über Einmalkauf oder Lizenzschlüssel. „DSGVO-konform“ nur mit Beleg bewerben |
| **4** | **„Der Meal-Prep-Fahrplan“** (Fitness/Makros + Schichtarbeit) | „Makros treffen ist die halbe Arbeit. Du bekommst auch den Ablauf: was um wie viel Uhr in den Topf kommt, was in welche Box geht und wie lange es hält (Quelle BfR/BZfE).“ | Eat This Much, Yazio, Fddb, MFP, Coach-PDFs | Uhrzeiten-Ablauf und Haltbarkeit mit Quelle bei niemandem beobachtet; ETM-Rezension: Meal-Prep „unnecessarily complicated“; Tracker-Apps planen nicht, sie zählen | Fitness-Markt ist laut und werbeintensiv; Health-Claims- und HWG-Grenzen (keine Abnehmversprechen). Anbindung an Fddb/Yazio nur als Export |
| **5** | **„Fertige Woche statt leerer Vorlage“** – personalisiertes PDF/Export als Brücke zwischen 8-€-PDF und 60-€-Abo | „Kein weiteres Rezept-Archiv. Du bekommst deine fertige Woche: Plan, Einkaufsliste nach Gängen, Kosten, Ablauf. Zum Ausdrucken, für Bring! oder fürs Handy.“ | Etsy-Vorlagen, Digistore-PDFs, Bücher, ChatGPT | Vorlagen sind leer (Denken bleibt beim Nutzer); PDFs sind nicht personalisiert; Einmal-Inhalte haben einen Median von ca. 10–13 €, Planer-Abos 30–60 €/Jahr | Niedriger Preis, geringerer Lifetime-Wert; Abgrenzung zu kostenloser KI muss über Verlässlichkeit laufen (geprüfte Rezepte, Allergene, Haltbarkeit) |

**Empfehlung der Wettbewerbsanalyse (zur Prüfung):** **Option 1 + 2 + 3 als Kern kombinieren.** Geräte-Filter und ehrliche Discounter-Kosten sind die Lücke, die mise offengelassen hat. „Ohne Konto, ohne Abo-Falle“ ist das Vertrauensversprechen gegen den gesamten Markt im Herbst 2026. Option 4 eignet sich als Fitness-Modus, Option 5 als Einstiegsprodukt bzw. Lead-Magnet-Variante. Jede Werbeaussage braucht vor dem Einsatz einen eigenen Beleg (UWG). Vergleichende Werbung mit Namen der Konkurrenz nur nach rechtlicher Prüfung (§ 6 UWG).

---

## 8. Quellen (alle abgerufen am 28.10.2026)

**App Store DE (Produktseite = Preis + Sterne; Rezensionen über RSS-Feed `https://itunes.apple.com/de/rss/customerreviews/page=1..4/id=<ID>/sortby=mostrecent/json`)**
- mise – Essensplaner: https://apps.apple.com/de/app/id6777471316 · Metadaten: https://itunes.apple.com/lookup?id=6777471316&country=de
- Eat This Much: https://apps.apple.com/de/app/id981637806
- Samsung Food: https://apps.apple.com/de/app/id1133637674
- Plan to Eat: https://apps.apple.com/de/app/id1215348056
- Yazio: https://apps.apple.com/de/app/id946099227
- MyFitnessPal: https://apps.apple.com/de/app/id341232718
- Lifesum: https://apps.apple.com/de/app/id286906691
- Fddb: https://apps.apple.com/de/app/id1105332761
- Kitchen Stories: https://apps.apple.com/de/app/id771068291
- Chefkoch: https://apps.apple.com/de/app/id478618165
- Cookidoo: https://apps.apple.com/de/app/id714004506
- KptnCook: https://apps.apple.com/de/app/id795495986
- HelloFresh: https://apps.apple.com/de/app/id970107419
- Marley Spoon: https://apps.apple.com/de/app/id1088840761
- Paprika: https://apps.apple.com/de/app/id1303222868
- Too Good To Go: https://apps.apple.com/de/app/id1060683933
- Bring!: https://apps.apple.com/de/app/id580669177
- Choosy: https://apps.apple.com/de/app/id1577201493
- Wochenplaner Essen (Jojo): https://apps.apple.com/de/app/id1619509620
- Wochenplan & Essensplaner: https://apps.apple.com/de/app/id6460821436
- Was kann ich essen? (NatiMate): https://apps.apple.com/de/app/id6742485790
- ReciMe: https://apps.apple.com/de/app/id1593779280
- Fastic: https://apps.apple.com/de/app/id1459260306

**Google Play DE** (`https://play.google.com/store/apps/details?id=<Paket>&hl=de&gl=de`): com.yazio.android · com.myfitnesspal.android · com.sillens.shapeupclub · com.fddb · com.ajnsnewmedia.kitchenstories · de.pixelhouse · com.vorwerk.cookidoo · com.kptncook.app.kptncook · com.hellofresh.androidapp · com.marleyspoon · com.eatthismuch · com.foodient.whisk · com.plantoeat.mobile · com.hindsightlabs.paprika.android.v3 · com.app.tgtg · ch.publisheria.bring · de.choosy.app · com.natimate.wkie · com.frommfanthamhenley.miseapp · com.yinqs.weeklymealplanner · com.mealime (nicht gefunden)

**Trustpilot:** https://de.trustpilot.com/review/www.hellofresh.de · https://de.trustpilot.com/review/yazio.com · https://www.trustpilot.com/review/eatthismuch.com · https://de.trustpilot.com/review/www.chefkoch.de · https://de.trustpilot.com/review/marleyspoon.de · https://de.trustpilot.com/review/www.myfitnesspal.com · https://de.trustpilot.com/review/lifesum.com · https://de.trustpilot.com/review/dinnerly.de

**Anbieter-Websites:** https://www.eatthismuch.com/pricing/ · https://www.mealime.com/ · https://www.plantoeat.com/pricing · https://www.chefkoch.de/plus/ · https://www.chefkoch.de/wochenplan/ · https://www.dishgen.com/ · https://ollie.ai/pricing · https://github.com/mealie-recipes/mealie · https://www.hellofresh.de/plans (Preise erst nach PLZ)

**Sekundärquellen (niedrigere Verlässlichkeit):** PlateJoy-Einstellung: https://mealthinker.com/blog/platejoy-alternative · https://swoodie.app/blog/mealime-vs-platejoy-vs-swoodie-2026 · HelloFresh-Portionspreis: https://www.giga.de/artikel/hello-fresh-kosten-pro-box-mahlzeit-im-ueberblick/ · Dinnerly: https://subger.com/de/service/dinnerly · ChatGPT-Preise: https://www.giga.de/tech/chatgpt-guenstiger-nutzen-neue-go-version-in-deutschland-gestartet--01KES3TZBGYGNCK8MZ862MYZE9 · https://www.monsterdealz.de/magazin/chatgpt-kosten · KptnCook × Miele: https://m.miele.de/media/ex/ce/presseartikel/2022/2022-005-miele-und-kptncook-bauen-erfolgreiche-zusammenarbeit-weiter-aus.pdf

**Digitale Produkte und Bücher:** https://www.digistore24.com/product/291747 · https://www.digistore24.com/product/332881 · https://www.ebook.de/de/product/51767418/.html · https://www.exlibris.ch/de/buecher-buch/deutschsprachige-buecher/konstantin-berner/mikrowellen-kochbuch-fuer-anfaenger-berufstaetige-studenten-amp/id/9783969304532/ · https://www.eurotransport.de/shop-buecher-kalender-sport-und-freizeit/buch-sternk%C3%B6che/7040124387526/ · https://8612332540035.gumroad.com/l/notionjahresplaner · https://www.etsy.com/market/essensplaner (403)

**Nicht erreichbar:** https://www.facebook.com/ads/library/ (403) · https://adstransparency.google.com/ (Captcha) · https://library.tiktok.com/ (nur JavaScript) · https://www.amazon.de/ (503) · Etsy (403)
