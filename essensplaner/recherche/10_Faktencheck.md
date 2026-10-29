# 10 – Faktencheck der Recherche-Berichte 01–08

Stand: 29.10.2026 · unabhängige Prüfung, nur auf Basis der fertigen Berichte · die Berichte selbst wurden **nicht** geändert.

## Kurzfazit

- **122 Prüfpunkte** zu **122 eindeutigen Links** (27 % aller eindeutigen Links). Geprüft wurde jeder Bericht mit mindestens 23 %.
- Ergebnis: **97 ✅ bestätigt · 14 ⚠️ teilweise/abweichend · 0 ❌ falsch · 11 🚫 nicht abrufbar** (bei 8 der 11 wurde die Aussage über eine Ersatzquelle bestätigt).
- **Fehlerquote:** 0 % harte Fehler. 12,6 % der abrufbaren Punkte (14 von 111) weichen ab, meist durch veraltete Zahlen, einen ungenauen Quellenverweis oder fehlende Einschränkungen.
- Alle besonders geprüften Kernpunkte halten: BGH I ZR 161/24, Widerrufsbutton ab 19.06.2026, BLS 4.0 unter CC BY 4.0, Stripe-, PayPal-, Paddle- und Digistore24-Gebühren, DSSV 12,36 Mio., Verpflegungspauschale 14/28 €, mise-Bewertungen, Mealime-Einstellung, KBA 1 Mio. Reisemobile.
- Wichtigste inhaltliche Korrekturen: **OLG Nürnberg** lässt eine Ausnahme beim Login zu. Die Widerrufsfunktion ist in **§ 356a BGB** schon umgesetzt. Die **Camping-Branche** schrumpfte 2025 bei Umsatz und Neuzulassungen. Die **BALM-Fahrerzahl** für 2023 ist falsch übernommen. Preise für **HelloFresh, Cookidoo und mise** sind veraltet oder ungenau.

## 1. Methode

1. **Links zählen:** `grep -o 'https\?://…'` je Bericht, einmal alle Treffer und einmal die eindeutigen URLs. Platzhalter wie `id<ID>` und `<Paket>` wurden mitgezählt.
2. **Stichprobe:** In jedem Bericht mindestens 20 % der eindeutigen Links, über den ganzen Bericht verteilt. Schwerpunkt auf Zahlen, die Entscheidungen tragen: Marktgrößen, Konkurrenzpreise, Gebühren, Normen und Urteile, BfR-Regeln, Kundenzitate.
3. **Abruf:** Alle Seiten per `curl` (Browser-User-Agent) geladen, HTML und PDF in Text umgewandelt und nach den behaupteten Zahlen und Zitaten durchsucht.
   - Bei App-Store-Zitaten wurde der offizielle Rezensions-Feed `itunes.apple.com/de/rss/customerreviews/…/json` (Seiten 1–4) und die Lookup-API ausgewertet.
   - Wo `curl` blockiert wurde (Trustpilot, GitHub), kam WebFetch zum Einsatz.
   - Bei 🚫 wurde per WebSearch eine Ersatzquelle gesucht.
4. **Bewertung:**
   - ✅ Zahl, Aussage oder Zitat steht so auf der Seite (Zitate wörtlich), Jahr und Datum stimmen.
   - ⚠️ teilweise oder abweichend.
   - ❌ nicht bestätigt oder falsch.
   - 🚫 nicht abrufbar.
5. **Grenzen:** Inhalte, die per JavaScript nachgeladen werden, Grafiken und Paywalls sind nicht textlich prüfbar. Seiten können sich seit der Recherche (28.10.2026) geändert haben. Gerichtsurteile wurden über Volltext (gesetze-bayern.de) oder mindestens zwei Sekundärquellen geprüft, nicht über juris.

## 2. Stichprobengröße je Bericht

| Bericht | Link-Treffer gesamt | eindeutige Links | geprüft | Quote (eindeutig) |
|---|---|---|---|---|
| 01 Markt und Zahlen | 77 | 72 | 19 | 26 % |
| 02 Stimmen Montage | 42 | 40 | 11 | 28 % |
| 03 Stimmen Fitness/Allgemein | 84 | 34 | 8 | 24 % |
| 04 Nischen-Vergleich | 120 | 53 | 12 | 23 % |
| 05 Wettbewerb | 152 | 64 | 16 | 25 % |
| 06 Daten und Machbarkeit | 108 | 62 | 17 | 27 % |
| 07 Recht und Steuern | 81 | 76 | 19 | 25 % |
| 08 Pricing und Unit Economics | 111 | 54 | 20 | 37 % |
| **Summe** | **775** | **455** | **122** | **27 %** |

Hinweis zu 03: Viele Treffer verweisen auf dieselbe App-Store-Seite. Geprüft wurden hier die Zitate selbst: 22 Einzelzitate über 3 Rezensions-Feeds, dazu 1 Trustpilot-Zitat je für Yazio und HelloFresh.

## 3. Alle Prüfpunkte

### 01 Markt und Zahlen

| Behauptung (Zeile) | Link | Ergebnis | Anmerkung |
|---|---|---|---|
| App-Markt DE 2,2 Mrd. € (+2,3 %); 42 Apps, unter 30 J. 55, ab 65 J. 21 (Z. 11–12) | bitkom.org/…/Durchschnittlich-42-Apps-auf-Smartphones | ✅ | wörtlich; Umsatzzahl von research2guidance |
| YAZIO Spitze ca. 520 Tsd. US$/Woche, komoot 441 Tsd.; Rang 3 Strava, 4 Fitbit, 5 Flo (Z. 14) | sensortower.com/blog/2025-q2-… | ⚠️ | Zahlen stimmen. Die Seite listet aber Flo vor Fitbit (Fitbit-Spitze 139K, Flo 131K). Eine Rangfolge nennt die Seite nicht ausdrücklich. |
| Ernährungs-Apps weltweit ca. 5,5 Mrd. US$ (Z. 17) | de.statista.com/outlook/…/ernaehrungs-apps/weltweit | 🚫 | Seite lädt, der Wert ist hinter der Paywall verborgen. Keine Ersatzquelle gesucht. |
| Chefkoch 20,0 Mio. Unique User; 7–8 Mio. registriert (Z. 19) | bcn.group/…/chefkoch | ✅ | „20.00 m“ Unique Users; „8 million registered users“ |
| Chefkoch PLUS 5,99 €/Monat, 29,99–49,99 €/Jahr (Z. 20) | apps.apple.com/DE/app/id478618165 | ✅ | dazu PUR 1,99 €/14,99 € |
| HelloFresh Umsatz DE 476,4 Mio. € (2024: 498,5), S. 83 (Z. 22) | lobbyregister…/Annual-Report-2025.pdf | ✅ | wörtlich, S. 83 |
| SOKA-BAU 606.815 gewerbliche AN (Ø 2025) (Z. 44) | api.soka-bau.de/…geschaeftsbericht_soka-bau_2025.pdf | ✅ | |
| Berufskraftfahrer 559.347 (−2,0 %) 2023 (Z. 54) | ihk.de/…/marktbeobachtung-…-balm-data.pdf | ⚠️ | Die Quelle widerspricht sich selbst. Fließtext: „2023 … rund 2,0 Prozent auf 559.347“. Tabelle 1 (Stichtag 31.12.): 2021 561.561, **2022 559.347, 2023 547.919**. Die −2,0 % passen nur zu 547.919. |
| Leiharbeit 622.000 (1,8 %) 06/2025 (Z. 57) | statistik.arbeitsagentur.de/…/Zeitarbeit-Aktuelle-Entwicklung.html | 🚫 → ✅ | Abruf mit HTTP 429. Per WebSearch im BA-Text bestätigt („Im Juni 2025 waren 622.000 …, 1,8 Prozent“). |
| Wohnmobile 1.002.562 (erstmals > 1 Mio.) 04/2025 (Z. 60) | news.de/auto/858654331/… | ✅ | „Anfang April lag der Bestand bei 1.002.562“ (KBA) |
| Verpflegungspauschale 14 € / 28 € (Z. 72) | gesetze-im-internet.de/estg/__9.html | ✅ | § 9 Abs. 4a EStG live geprüft: 28 € / 14 € / 14 € An- und Abreise |
| DSSV 12,36 Mio. Mitglieder (+5,6 %); Ø-Beitrag 48,55 € (Z. 104, 230) | dssv.de/…/03_18_pm_eckdaten.pdf | ✅ | wörtlich |
| Nachtarbeit 9,3 % ≈ 4,0 Mio. (2024) (Z. 132) | destatis.de/…/PD26_13_p002.html | ✅ | „9,3 % der 42,6 Millionen“ |
| VPI 2025 +2,2 % (2024 2,2; 2023 5,9; 2022 6,9) (Z. 188) | destatis.de/…/PD26_019_611.html | ✅ | Seite heißt jetzt „KORREKTUR: …“, die Werte sind unverändert |
| RevenueCat Trial→Paid H&F 39,9 % (Top 10 % 68,3 %) (Z. 238) | revenuecat.com/state-of-subscription-apps-2025/ | ✅ | wörtlich |
| Adapty: Preisindex 1,3; DE = 4,4× Türkei; 9,5 % / 42,2 % / 67,7 % (Z. 231, 248) | adapty.io/blog/health-fitness-app-subscription-benchmarks/ | ⚠️ | Nur „4.4x (Germany vs Turkey)“ steht im Text. Index 1,3 und 9,5/42,2/67,7 % sind im Seitentext nicht auffindbar, vermutlich aus Grafiken. |
| Lieferung 16 % (14–29 J. 22 %); kalorienarm 36 % (Z. 31, 117) | tageskarte.io/…/ernaehrungsreport-2025.pdf | ✅ | |
| Einkaufsliste oft bis immer 54 %, Frauen „immer“ 37 %, Männer 25 %; „Jahr n. v.“ (Z. 29) | yougov.com/de-de/artikel/47920-… | ⚠️ | Zahlen stimmen. Das Datum steht auf der Seite: **21.11.2023**. |
| Europa 75,5 Mio. Mitglieder, 39,1 Mrd. €, 67.515 Clubs (Z. 113) | europeactive.eu/…-140 | ✅ | |

### 02 Stimmen Montage

| Behauptung (Zeile) | Link | Ergebnis | Anmerkung |
|---|---|---|---|
| Zitat 1 „…Döner, Mac Doof, Pizza, was vom Chinesen etc.“, 06.06.2013 (Z. 10) | mamiweb.de/…/4538468_verpflegung-auf-montage.html | ✅ | wörtlich, Datum stimmt |
| Zitat 6 „…sehr gut ausgestattete Lkw eine Mikrowelle eingebaut.“, 24.05.2016 (Z. 15) | saschas-fanforum.de/…/221-essen-auf-lkw-touren/ | ✅ | |
| Zitat 11 „Aber eine Dose im LKW warm machen ist überhaupt kein Problem.“, 21.06.2014 (Z. 20) | brummionline.com/…/17742-kochen-im-lkw/page2 | ✅ | |
| Zitat 17 „I'm starting to feel like crap from all of the McDonalds!“, 02.02.2012 (Z. 26) | thetruckersreport.com/…/sick-of-eating-on-the-go.168528/ | ✅ | |
| Raststätte „Gericht für knapp 20 Euro“, „Kaffee für 4,50“, Spesen 14 €/28 €, 27.03.2026 (Z. 58) | verkehrsrundschau.de/…-3785275 | ✅ | wörtlich, datePublished 2026-03-27 |
| Pauschalen 14/28 €, nach 3 Monaten am selben Ort entfällt sie (Z. 59) | deutschland-monteurzimmer.de/ratgeber/reisekosten-… | ✅ | 14/28 € und „Dreimonatsfrist“. Die Kürzungssätze stehen auf der kep-Seite (nächste Zeile). |
| LKW-Übernachtung 9 €; Kürzung Frühstück 20 %, Mittag/Abend 40 % (Z. 59) | kep-ag.de/spesen-fuer-lkw-fahrer/ | ✅ | |
| 2.794 von 4.186 Unterkünften mit eigener Küche (Z. 84) | monteur-zimmer.info/monteurwohnung/küche-eigene-küche | ✅ | |
| „Sternköche“, 40 Rezepte, 12,80 € (Z. 136) | eurotransport.de/shop-…/buch-sternköche/… | ✅ | |
| „The Healthy Trucker Blueprint“ 4,99 $ (Z. 139) | payhip.com/b/HK38T | 🚫 | HTTP 403, kein Ersatz gefunden; Randaussage |
| „Mobile Kochgeräte … nur …, wenn der Vermieter dies ausdrücklich erlaubt“ (Z. 60) | deutschland-monteurzimmer.de/ratgeber/schnelle-rezepte-… | ✅ | wörtlich |

### 03 Stimmen Fitness/Allgemein

| Behauptung (Zeile) | Link | Ergebnis | Anmerkung |
|---|---|---|---|
| Yazio A1–A7 (Zitate, Sterne, Daten 15.–26.10.2026) (Z. 22–28) | apps.apple.com/de/app/id946099227 (Feed) | ✅ | Alle 7 Zitate wörtlich im Feed, Sterne und Daten stimmen |
| Yazio A10 „72 CHF für drei Monate … schlicht lächerlich.“, 04.09.2026 (Z. 31) | de.trustpilot.com/review/yazio.com | ✅ | Per WebFetch (Filter 1★): Alisa Peters, 04.09.2026 |
| mise B1–B12 (Z. 107–118), Preiszitate 44,99 €/34 €/10 € (Z. 180) | apps.apple.com/de/app/id6777471316 (Feed) | ✅ | 12 von 12 wörtlich gefunden, Sterne und Daten stimmen |
| Chefkoch B13–B15 (16.10., 26.10., 10.10.2026) (Z. 119–121) | apps.apple.com/de/app/id478618165 (Feed) | ✅ | |
| Massephase-Plan 19,99 € („statt 49,95 €“) (Z. 93) | digistore24.com/product/325424 | ✅ | Seite: „Nur für kurze Zeit: nur 19,99 € (statt 49,95 €)“. Achtung, das ist genau die Countdown- und Streichpreis-Taktik, die wir nicht nutzen. |
| mydealz-Serie „Pumpermarkt x MuskelMarkt“ (Z. 82) | mydealz.de/deals/pumpermarkt-x-muskelmarkt-1726-2767038 | ✅ | Deal abgelaufen, die Serie existiert |
| gutefrage-Zitate Protein/Budget (Z. 52–56) | gutefrage.net/frage/billige-proteinquelle-fuer-kraftsport | 🚫 | HTTP 403. Der Bericht kennzeichnet diese Zitate selbst als Suchmaschinen-Auszug. |
| HelloFresh B30 „Die Portionen sind … zu klein und der enorme Verpackungsmüll“, 3★, 30.09.2026 (Z. 136) | de.trustpilot.com/review/www.hellofresh.de | ✅ | WebFetch: Carmen, 3★, 30.09.2026 |

### 04 Nischen-Vergleich

| Behauptung (Zeile) | Link | Ergebnis | Anmerkung |
|---|---|---|---|
| 1 Mio. Reisemobile (KBA 04/2025); Halter 60–69 J. 318.589, 50–59 J. 265.073, unter 40 J. < 10 % (Z. 74–75) | promobil.de/ratgeber/so-alt-sind-… | ✅ | dazu unter 40 J.: 96.201 Fahrzeuge |
| 1,045 Mio. Reisemobile, 0,786 Mio. Caravans 2025 (Z. 74) | news.at/…caravan-salon-… | ✅ | |
| 44,66 bzw. 44,7 Mio. Campingnächte 2025, 39,9 Mio. Inländer, 4. Rekordjahr (Z. 74, 211) | promobil.de/…/camping-rekord-2025-… | ✅ | „39,92 Millionen“ Inland |
| Caravan Salon 2025: 269.000 Besucher (Z. 76) | caravan-salon.com/…_269,000_visitors | ⚠️ | Der Link leitet heute auf die Startseite um, dort steht **2026: 259.000 Besucher**. Der Wert 269.000 für 2025 ist per WebSearch bestätigt (PM 07.09.2025). Den Rückgang 2026 nennt der Bericht nicht. |
| Alleinerziehende Armutsgefährdung 28,7 % (Z. 35) | destatis.de/…/PD26_039_63.html | ✅ | |
| Regelsatz 563 € (Nullrunde 2026), 34,7 % = 195,36 € für Nahrung (Z. 85) | buergergeld.org/leistungen/regelsatz/ | ✅ | |
| Ausbildungsvergütung Ø 1.133 €, 14 % unter 950 € (Z. 105) | bibb.de/de/pressemitteilung_204110.php | ✅ | |
| Airfryer in 47 % der Haushalte (YouGov) (Z. 144) | yougov.com/de-de/artikel/54606-… | ✅ | |
| 2.882.900 Studierende WS 2025/26 (Z. 24) | statistiken-aktuell.de/studierende-… | ✅ | |
| Branche 14,1 Mrd. € Umsatz 2025 (CIVD via motor1) (Z. 75) | de.motor1.com/news/784807/… | ⚠️ | Im motor1-Artikel steht kein Betrag, nur „Der Branchenumsatz ging zwar zurück“; dazu 94.134 Neuzulassungen. 14,1 Mrd. € stehen in der CIVD-PM (19.01.2026), dort **−6,5 %** ggü. 2024. Neuzulassungen −2,3 %. |
| GU „Backofen to go“ (Z. 75) | lesejury.de/nico-stanitzok/… | 🚫 | HTTP 503 |
| Sinzenich „Stressfrei kochen mit Wochenplänen“ (Z. 37) | lesejury.de/steffi-sinzenich/… | 🚫 | HTTP 503; Randaussage |

### 05 Wettbewerb

| Behauptung (Zeile) | Link | Ergebnis | Anmerkung |
|---|---|---|---|
| **Mealime wird am 21.10.2026 eingestellt**; „über 200 Personalisierungsoptionen“, 4,5 Mio. Nutzer (Z. 40, 113) | mealime.com | ✅ | Banner: „Mealime will shut down on October 21, 2026“ |
| **mise**: TEGS LABS LTD, 4,5 ★ (1.540), Start 10.06.2026, AS-Sprache Englisch; Monthly 9,99 €; Yearly 22,99–59,99 €; 3 Tage gratis (Z. 59, 88) | apps.apple.com/de/app/id6777471316 + itunes lookup | ⚠️ | Bewertung, Anbieter, Start, Sprache und 9,99 € stimmen (Lookup: 4,494, 1.540). Sichtbare Jahrespreise: **29,99–59,99 €**. **22,99 € und „3 Tage gratis“ stehen nicht auf der Seite**, Apple zeigt nur 10 In-App-Preise. |
| mise: von 77 neuesten DE-Rezensionen 62 (81 %) mit 1–3★ (Z. 88) | itunes RSS mise, Seiten 1–4 | ✅ | Nachgezählt: 77 Rezensionen; 1★ 40, 2★ 13, 3★ 9 = 62 |
| Eat This Much Web „$5.00/month with annual subscription“ (Z. 39) | eatthismuch.com/pricing/ | ✅ | |
| Plan to Eat $5.95/Monat, $49/Jahr, 14 Tage gratis (Z. 42) | plantoeat.com/pricing | ✅ | |
| Chefkoch PLUS Web „2,50 €/Monat im Jahresabo“, „nur für kurze Zeit“, 1 Woche Test (Z. 49) | chefkoch.de/plus/ | ✅ | |
| Yazio AS 23,90/35,90/83,90 €; 6 M 14,99; 3 M 35,99; 447.827 Bewertungen (Z. 44) | apps.apple.com/de/app/id946099227 | ✅ | dazu 22,49 € als weiterer Preis |
| PlateJoy eingestellt seit 01.07.2025 (Z. 43, 117) | mealthinker.com/blog/platejoy-alternative | ✅ | „July 2025 – Service officially discontinued“ (Sekundärquelle) |
| Ollie Free / $25 / $100 (Z. 68) | ollie.ai/pricing | ✅ | |
| DS24 „Über 50 schnelle Wasserkocher Rezepte“ 7,90 € (Z. 69) | digistore24.com/product/291747 | ✅ | |
| HelloFresh ab ca. 4,22–4,60 €/Portion + Versand (Z. 52) | giga.de/artikel/hello-fresh-kosten-… | ⚠️ | 4,22 € gilt nur für die größte Box (4 Pers. × 5 Gerichte), **inkl. Versand, „Stand: Juni 2022“**. 4,60 € nicht gefunden. Für 2026 veraltet. |
| ChatGPT Go 8 €/Monat, Plus 23 € (Z. 66) | giga.de/tech/chatgpt-guenstiger-… | ✅ | |
| Mealie AGPL-3.0, 13,7k Sterne (Z. 55) | github.com/mealie-recipes/mealie | ✅ | per WebFetch, da curl 403 |
| KptnCook AS 5,99 / 29,99–59,90 / 41,99 / 59,99 €; 50.080 (Z. 51) | apps.apple.com/de/app/id795495986 | ✅ | |
| Jojo-Planer: Woche 3,99, Monat 4,99, Jahr 19,99, Lebenslang 29,99 €; 603 (Z. 60) | apps.apple.com/de/app/id1619509620 | ✅ | |
| HelloFresh Trustpilot 3,8 (58.004) (Z. 52) | de.trustpilot.com/review/www.hellofresh.de | ✅ | |

### 06 Daten und Machbarkeit

| Behauptung (Zeile) | Link | Ergebnis | Anmerkung |
|---|---|---|---|
| **BLS 4.0 unter CC BY 4.0**, MRI als Herausgeber nennen, DOI 10.25826/Data20251217-134202-0 (Z. 35, 49) | blsdb.de/download | ✅ | wörtlich: „Die Nutzung ist unter der Lizenz CC BY 4.0 … gestattet. Bei Verwendung ist das Max Rubner-Institut als Herausgeber zu nennen.“ |
| BLS rund 7.140 Lebensmittel, 138 Nährstoffe (Z. 35) | blsdb.de/faq | ✅ | wörtlich |
| BLS jetzt kostenlos, vorher Lizenzgebühr (Z. 35) | heise.de/-11123877 | ✅ | „previous license fees are completely waived“ |
| BfR-FAQ Vorkochen: 2–3 Tage, roh 1 Tag, ≤ 7 °C (besser 5 °C), 70 °C/2 min, Beeren 90 °C, −18 °C-Zeiten, Kühltasche (Z. 149–155) | bfr.bund.de/…/faq-vorkochen-fuer-mehrere-tage.pdf | ✅ | alle Werte wörtlich |
| dieselbe FAQ, englisch „within 2-3 days or freeze them“ (Z. 149) | bfr.bund.de/en/…/pre-cooking-… | ✅ | |
| BfR-Stellungnahme 016/2024 vom 19.03.2024: seit 2020 ≥ 60 °C, ab 57 °C Wachstum unwahrscheinlich (Z. 157–159) | bfr.bund.de/cm/343/…heisshalten….pdf | ✅ | wörtlich |
| BfR B. cereus (09.01.2026): „Beim Erhitzen wird Cereulid nicht inaktiviert …“ (Z. 161–162) | bfr.bund.de/…/bacillus-cereus-….pdf | ✅ | wörtlich, Datum 9. Januar 2026 |
| BZfE Mealprep (23.04.2025): „einige Tage“, keine Tageszahl (Z. 164–166) | bzfe.de/…/mealprep-fuer-die-mittagspause | ✅ | |
| Stripe 1,5 %+0,25 €, UK 2,5 %, intl. 3,15 %, SEPA 0,35 €, Billing 0,7 %, Tax 0,5 % bzw. 0,45 €, Managed Payments +3,5 % (Z. 298–299) | stripe.com/de/pricing | ✅ | alle Werte auf der Seite |
| Paddle 5 % + 0,50 $ (Z. 300) | paddle.com/pricing | ✅ | „5% + 50¢“ |
| Digistore24 7,9 % + 1 € (Z. 302) | ecom-tools.de/digistore24/ | ✅ | |
| CopeCart 4,9 % + 1 € vom Brutto (Z. 303) | intercom.help/copehelp/de/… | ✅ | |
| Open Food Facts: ODbL, DbCL, Fotos CC BY-SA, „must not be used for medical purposes“ (Z. 37) | world.openfoodfacts.org/terms-of-use | ✅ | |
| USDA FDC: public domain/CC0, 1.000 Anfragen/h/IP (Z. 36) | fdc.nal.usda.gov/api-guide/ | ✅ | |
| Supabase Free 500 MB / 50.000 MAU / Pause nach 1 Woche; Pro ab 25 $, 100.000 MAU, 8 GB (Z. 287) | supabase.com/pricing | ✅ | |
| Claude Haiku 5.5 0,10/0,50 $; Haiku 4.5 1/5 $; Sonnet 5.5 2/10 $ (Z. 247–253) | platform.claude.com/docs/en/about-claude/pricing | ✅ | |
| Schweizer Nährwertdatenbank kostenlos, kommerziell mit Quellenvermerk (Z. 11, 331) | naehrwertdaten.ch/de/downloads/ | ✅ | wörtlich, Version 7.1 |

### 07 Recht und Steuern

| Behauptung (Zeile) | Link | Ergebnis | Anmerkung |
|---|---|---|---|
| **BGH 22.05.2025 – I ZR 161/24**: Kündigungsbutton auch bei Laufzeitvertrag mit Einmalzahlung (Z. 35, 143, 161) | noerr.com/…/kuendigungsbutton-…-bgh | ✅ | „22.05.2025 – Az. I ZR 161/24“; auch vzbv, it-recht-kanzlei, beck-aktuell (siehe 08): OTTO UP Plus, 9,90 €/12 Monate |
| BGH 16.07.2026 – I ZR 200/25: keine Halteangebote auf der Bestätigungsseite (Z. 162) | ra-kotz.de/online-kuendigung-bgh-… | ✅ | Az., Datum und Vorinstanz OLG Düsseldorf 20 UKl 1/25 bestätigt (Sekundärquelle) |
| dto. (Z. 610) | mtrlegal.com/bgh-urteil-zum-kuendigungsbutton-… | ✅ | |
| **OLG Nürnberg 30.07.2024 – 3 U 2214/23**: Button erst nach Login genügt nicht (Z. 35, 163) | gesetze-bayern.de/…GRURRS-B-2024-N-22885 | ⚠️ | Leitsatz bestätigt, aber verkürzt. Das OLG fügt an: **„Eine Ausnahme ist denkbar, wenn die Nutzung des Dienstes … seiner Natur nach ohnehin ein Login erfordert.“** |
| dto., zweite Quelle (Z. 614) | cms.law/…/olg-nuernberg-kuendigungsbutton-nach-login-zulaessig | ⚠️ | Die Überschrift lautet „Kündigungsbutton nach Login zulässig“ und betont die Ausnahme. Als Beleg für „genügt nicht“ ist der Link missverständlich. |
| LG München I 10.10.2023 – 33 O 15098/22 (Sky/WOW), rechtskräftig, ohne Login (Z. 164) | vzbv.de/urteile/kuendigung-von-online-abos-muss-ohne-login-moeglich-sein | ✅ | Berufung (OLG München 6 U 4292/23 e) zurückgenommen |
| Händlerbund-Ratgeber § 312k (Z. 615) | haendlerbund.de/…/kuendigungsbutton-nach-312k-bgb | ✅ | Hinweis der Seite: Login vorschalten vermeiden, „solange die BGH-Entscheidung dazu noch aussteht“ |
| **Widerrufsfunktion**: RL (EU) 2023/2673 fügt Art. 11a VRRL ein, gilt seit **19.06.2026** (Z. 199, 604) | eur-lex.europa.eu/eli/dir/2023/2673/oj | ✅ (Ersatz) | EUR-Lex lieferte leere Seite (HTTP 202). Per WebSearch: Art. 11a, Anwendung ab 19.06.2026, Umsetzungsfrist 19.12.2025 |
| Deutsche Umsetzung „[Paragraf und Wortlaut prüfen]“ (Z. 199) | gesetze-im-internet.de/bgb/ → § 356a | ⚠️ | **§ 356a BGB „Elektronische Widerrufsfunktion bei Fernabsatzverträgen“ ist in Kraft.** Beschriftung „Vertrag widerrufen“, Bestätigung „Widerruf bestätigen“, Eingangsbestätigung auf dauerhaftem Datenträger mit Datum und Uhrzeit. Der offene Prüfpunkt lässt sich schließen. |
| Digistore24-Preise (Z. 642) | digistore24.com/de/home/prices | 🚫 → ✅ | 404. Offizielle Hilfe per WebSearch: „Base Digistore24 fee 7.9% + €1 per transaction“ |
| Lemon Squeezy 5 % + 50¢; gehört zu Stripe (Z. 642) | lemonsqueezy.com/pricing | ✅ | „Sold through Link, LLC f/k/a Lemon Squeezy LLC“, „2026 Update: … Stripe Managed Payments“ |
| DPMA online 290 € bis 3 Klassen, +100 €/Klasse, Papier 300 €, beschleunigt +200 € (Z. 387, 633) | dpma.de/marken/gebuehren/index.html | 🚫 → ✅ | 404. Werte bestätigt unter dpma.de/service/gebuehren/marken/index.html |
| EUIPO 850 € / 50 € / 150 € (Z. 404, 634) | euipo.europa.eu/de/…/fees-payable-direct | 🚫 → ✅ | Seite lädt die Gebühren per JS nach. Per WebSearch bestätigt (UMV Anhang I, Übersichten 2026) |
| Börsenverein: Apps nur preisgebunden, wenn im Kern Buch (Z. 120, 638) | boersenverein.de/…/preisbindung/ | 🚫 | 404. Ersatz: nur sinngemäß („Produkte, die Bücher … ersetzen“, § 2 BuchPrG; Börsenverein: Datenbankzugänge und vernetzte Inhalte sind keine E-Books). Eine Börsenverein-Aussage zu Apps wurde nicht gefunden. |
| EU-Kleinunternehmerregelung (Z. 71, 575) | bzst.de/…/eu-kleinunternehmerregelung_node.html | 🚫 | 404. Inhalt über § 19 UStG geprüft (nächste Zeile) |
| § 19 UStG: 25.000 € Vorjahr / 100.000 € laufendes Jahr; EU-weit 100.000 € (Z. 67, 71) | gesetze-im-internet.de/ustg_1980/ (§ 19) | ✅ | wörtlich Abs. 1 und Abs. 4 |
| Meta schränkt Health & Wellness seit Januar 2025 bei Lower-Funnel-Events ein (Z. 264) | haus.io/blog/meta-announces-… | ✅ | Sekundärquelle, wie im Bericht markiert |
| OLG Koblenz 19.09.2024 – 2 U 437/23 (1&1) (Z. 166) | verbraucherzentrale.nrw/…/11-erschwert-einfache-kuendigung-99965 | ✅ | |
| Paddle (Z. 642) | paddle.com/pricing | ✅ | siehe 06 |

### 08 Pricing und Unit Economics

| Behauptung (Zeile) | Link | Ergebnis | Anmerkung |
|---|---|---|---|
| Mealime Pro 2,99 $, kein Jahresabo mehr; „Preissenkung angekündigt“, „zeigt das Gegenrisiko“ (Z. 35, 43) | mealime.com/lower-prices | ⚠️ | Die Ankündigung stammt von **2021** („from August 12, 2021“). Mealime wird am **21.10.2026 eingestellt** (Startseite). Als aktueller Preis-Benchmark ungeeignet. |
| Cookidoo 60 € (Erhöhung von 48 €) (Z. 41) | iphone-ticker.de/thermomix-…-237796/ | ⚠️ | Artikel vom **05.07.2024**. Im App Store 2026 laut Bericht 05 (Z. 48): 69,99 €. Die Berichte widersprechen sich. |
| Yazio/KptnCook/Chefkoch-Preise (Z. 31, 38, 39) | App-Store-Seiten | ✅ | siehe 01/05 |
| Eat This Much „Web: Dritte nennen 8,99–14,99 $/Monat“ (Z. 34) | promealplan.com/en/blog/eat-this-much-review-2026 | ⚠️ | Quelle nennt **$5/Monat (jährlich) oder $14,99 monatlich**. 8,99 $ steht dort nicht. |
| Plan to Eat 5,95 $ / 49 $ / 14 Tage (Z. 37) | plantoeat.com/pricing | ✅ | |
| RevenueCat 2026: Trial→Paid H&F 37,7 % (Top-Quartil > 51,4 %); Download→Trial H&F 6,9 % (Z. 49, 52) | revenuecat.com/state-of-subscription-apps | ✅ | wörtlich |
| Stripe 1,5 % + 0,25 €, SEPA 0,35 €, Billing 0,7 %, Tax 0,5 %, Rückbuchung 20 € (Z. 94–99) | stripe.com/de/pricing | ✅ | |
| Stripe Managed Payments ca. +3,5 %, „Preisseite nicht erreichbar [Prüfen]“ (Z. 103) | (userjot/dodopayments) → stripe.com/de/pricing | ✅ | **Steht auf der Stripe-Preisseite:** „3,5 % pro erfolgreicher Transaktion mit Managed Payments zusätzlich zu Zahlungsgebühren“. Den [Prüfen]-Vermerk kann man streichen. |
| **PayPal Checkout 2,99 % + 0,39 €**; Seite Stand 07.09.2026 (Z. 100) | paypal.com/de/business/paypal-business-fees | ✅ | „Letzte Aktualisierung: 7. September 2026“; 2,49 % gilt für Waren/Dienstleistungen senden/empfangen |
| **Paddle 5 % + 0,50 $** (Z. 101) | paddle.com/pricing | ✅ | |
| Lemon Squeezy 5 % + 0,50 $, Link LLC (Z. 102) | lemonsqueezy.com/pricing | ✅ | |
| **Digistore24 7,9 % + 1 €** (Z. 104) | help.digistore24.com/…/23694504392721 | 🚫 → ✅ | 403. Text per WebSearch-Auszug derselben Seite bestätigt; Erstattung 0,60–1 € und Reserve 10 %/60 Tage nur Drittquellen |
| CopeCart 4,9 % + 1 € (Z. 105) | help-eu.copecart.com/…/9061163 | ✅ | „4.9% + €1 per sale“ |
| Apple EU ab 01.10.2026: 26 % Standard, 20/10 % … (Z. 106) | daringfireball.net/2026/08/… | ✅ | „commission will be 26 percent“, „October 1“, 20 % / 10 % |
| Cloudflare Pages Free 500 Builds/Monat (Z. 133) | developers.cloudflare.com/pages/platform/limits | ✅ | |
| MailerLite Free 250 Abonnenten / 2.500 Mails; bezahlt ab 12 $ (Z. 136) | mailerlite.com/pricing | ✅ | |
| **BGH I ZR 161/24**, 22.05.2025, OTTO UP Plus (Z. 334) | vzbv.de/urteile/bundesgerichtshof-kuendigungsbutton-ist-auch-bei-laufzeitvertraegen-mit-einmalzahlung | ✅ | „Otto Up Plus … zwölf Monaten Laufzeit für einmalig 9,90 Euro“ |
| dto. (Z. 334) | it-recht-kanzlei.de/kuendigungsbutton-bgh-… | ✅ | |
| dto. (Z. 334) | beck-aktuell.de/…/bgh-izr16124-… | ✅ | „Urteil vom 22.05.2025 – I ZR 161/24“ |
| Verpflegungspauschale 14/28 € (§ 9 Abs. 4a EStG) (Z. 316) | steuerschroeder.de / EStG | ✅ | per Gesetzestext bestätigt (siehe 01) |

## 4. Besonders geprüfte Punkte

| Punkt | Ergebnis |
|---|---|
| BGH I ZR 161/24 (Kündigungsbutton bei Einmalzahlung?) | ✅ Ja. Urteil vom 22.05.2025, OTTO UP Plus (9,90 € einmalig, 12 Monate, endet automatisch). Vier unabhängige Quellen. |
| OLG Nürnberg 3 U 2214/23 | ⚠️ Datum, Az. und Leitsatz stimmen. Die Ausnahme fehlt im Bericht: Login vorab kann genügen, wenn der Dienst seiner Natur nach ohnehin Login erfordert. Für eine App mit Konto ist das relevant. Für die geplante PWA ohne Konto ändert sich nichts. |
| Widerrufsbutton ab 19.06.2026 (RL (EU) 2023/2673) | ✅ Datum stimmt. In DE umgesetzt als **§ 356a BGB**. Der Prüfvermerk in 07 Z. 199 ist damit erledigt. |
| BLS 4.0 CC BY 4.0 | ✅ wörtlich auf blsdb.de, kostenlos (heise), 7.140 / 138 |
| Stripe / PayPal / Paddle / Digistore24 | ✅ alle Sätze bestätigt (Digistore24 über den Suchauszug der offiziellen Hilfeseite). Stripe Managed Payments 3,5 % steht auch auf der Stripe-Seite. |
| DSSV 2025: 12,36 Mio. Mitglieder | ✅ (+5,6 %; Ø-Beitrag 48,55 €) |
| Verpflegungspauschale 14/28 € | ✅ § 9 Abs. 4a EStG live geprüft |
| mise: Preise und Bewertungen | ⚠️/✅ 4,5 ★ (1.540), Start 10.06.2026, TEGS LABS, 81 % 1–3★ bei den neuesten 77 und alle Zitate bestätigt. Jahrespreis „ab 22,99 €“ und „3 Tage gratis“ nicht sichtbar; sichtbar sind 29,99–59,99 € und 9,99 €/Monat. |
| Mealime-Einstellung | ✅ 21.10.2026 laut Banner auf mealime.com. In 08 wird Mealime aber noch als Preis-Benchmark geführt (⚠️). |
| KBA Reisemobile 1 Mio. | ✅ 1.002.562 Anfang April 2025 (news.de/dpa), 1,0 Mio. (promobil) |

## 5. Fehlerquote

| | Anzahl | Anteil an 122 | Anteil an 111 abrufbaren |
|---|---|---|---|
| ✅ bestätigt | 97 | 79,5 % | 87,4 % |
| ⚠️ teilweise/abweichend | 14 | 11,5 % | 12,6 % |
| ❌ nicht bestätigt/falsch | 0 | 0 % | 0 % |
| 🚫 nicht abrufbar | 11 | 9,0 % | – |
| davon per Ersatzquelle bestätigt | 8 | | |

Nach Bericht: 01 4 ⚠️ · 02 0 · 03 0 · 04 2 · 05 2 · 06 0 · 07 3 · 08 3.
Zitate (02, 03): 0 Abweichungen bei 33 wörtlich geprüften Zitaten.
Insgesamt sind die Berichte sauber belegt. Die Abweichungen sind fast alle Aktualitäts- oder Präzisionsfehler und keine erfundenen Werte.

## 6. Nötige Korrekturen (konkret)

**Mit Einfluss auf Entscheidungen**

1. **07 Z. 199**: „Deutsche Umsetzung im BGB [Paragraf und Wortlaut … prüfen]“ ersetzen durch: „umgesetzt in **§ 356a BGB** (Elektronische Widerrufsfunktion): Beschriftung ‚Vertrag widerrufen‘, Pflichtangaben Name, Vertrag, Kontaktweg; Bestätigung ‚Widerruf bestätigen‘; Eingangsbestätigung mit Datum/Uhrzeit auf dauerhaftem Datenträger.“
2. **07 Z. 163** (und Kurzform Z. 35, 08 Z. 333): bei OLG Nürnberg ergänzen: „Ausnahme denkbar, wenn der Dienst seiner Natur nach ohnehin Login erfordert. Höchstrichterlich ist das nicht geklärt, deshalb Button ohne Login bauen.“ In Z. 614 zum cms-Link vermerken: „Überschrift betont die Ausnahme“.
3. **04 Z. 9 und Z. 211** („wachsender Markt“, „Wächst“): präzisieren. Der Bestand wächst (1,045 Mio., Rekord-Campingnächte). **Branchenumsatz 2025 −6,5 % auf 14,1 Mrd. € und Neuzulassungen −2,3 % auf 94.134** (CIVD-PM 19.01.2026); Caravan Salon 2026 mit 259.000 Besuchern unter Vorjahr (269.000).
4. **04 Z. 75**: Quelle für 14,1 Mrd. € von motor1 auf die CIVD-PM umstellen (civd.de/wp-content/uploads/2026/01/01_PM_Jahresbilanz-Deutschland.pdf) und „−6,5 % ggü. Vorjahr“ ergänzen.
5. **05 Z. 59** (und Z. 318, mise in der Jahrespreis-Liste): „Yearly 22,99–59,99 €; 3 Tage gratis“ → „Yearly 29,99–59,99 € (laut AS sichtbar; 22,99 € und Testdauer nicht belegt)“. Der Median 29,99 €/Jahr in Z. 318 bleibt davon unberührt.
6. **05 Z. 52**: HelloFresh „ab ca. 4,22–4,60 €/Portion + Versand“ → „4,22 €/Portion **inkl. Versand** nur bei 4 Pers. × 5 Gerichten, **Stand Juni 2022** (giga); aktueller Preis 2026 nicht belegt“.
7. **08 Z. 41**: Cookidoo „60 € (Erhöhung von 48 €)“ als Stand 07/2024 kennzeichnen und den aktuellen AS-Preis **69,99 €/Jahr** aus 05 Z. 48 übernehmen. Die Preisband-Aussage Z. 43 („30–60 €“) entsprechend prüfen.
8. **08 Z. 35 und Z. 43**: Mealime aus der Preis-Benchmark nehmen oder ergänzen: „Preissenkung auf 2,99 $ war 2021; Mealime wird am 21.10.2026 eingestellt“. Die Interpretation „zeigt das Gegenrisiko: Preissenkung“ umformulieren, denn das Gegenrisiko ist die Einstellung.

**Präzisierungen und Quellenpflege**

9. **01 Z. 54**: Berufskraftfahrer 2023 = **547.919** (Tabelle 1, Stichtag 31.12.2023). 559.347 ist der Wert für 2022; der Fließtext der BALM-Quelle verwechselt die beiden.
10. **01 Z. 14**: Ränge 4/5 lauten in der Seitenreihenfolge „4. Flo, 5. Fitbit“. Alternativ ohne Rang nennen, da Sensor Tower Wochen-Spitzenwerte zeigt.
11. **01 Z. 29**: YouGov-Jahr „n. v.“ → **21.11.2023**.
12. **01 Z. 72**: „Gesetz nicht live geprüft“ streichen. § 9 Abs. 4a EStG wurde am 29.10.2026 geprüft (14/28 €).
13. **01 Z. 231 und Z. 248**: Adapty-Werte „Index 1,3“ und „9,5 % / 42,2 % / 67,7 %“ als „aus Grafik, im Text nicht prüfbar“ markieren. Belegt ist im Text nur „4,4× DE vs. Türkei“.
14. **01 Z. 17**: Statista-Wert als „hinter Paywall, nicht nachprüfbar“ kennzeichnen.
15. **08 Z. 34**: „Dritte nennen 8,99–14,99 $/Monat“ → „$5/Monat bei Jahreszahlung, $14,99 monatlich (promealplan 2026)“.
16. **08 Z. 103**: Stripe Managed Payments: Primärquelle stripe.com/de/pricing („3,5 % … zusätzlich zu Zahlungsgebühren“) eintragen, „Preisseite nicht erreichbar [Prüfen]“ streichen.
17. **04 Z. 76**: Caravan-Salon-Link ist tot (Umleitung auf Startseite). Ersetzen durch die Pressemitteilungsliste caravan-salon.com/en/Media_News/Press/Press_Releases (PM 07.09.2025).
18. **07 Z. 633**: DPMA-Link (404) → https://www.dpma.de/service/gebuehren/marken/index.html (Werte 290/100/300/200 € bestätigt).
19. **07 Z. 642**: Digistore24-Preislink (404) → https://help.digistore24.com/hc/en-us/articles/23694504392721.
20. **07 Z. 638 und Z. 575**: Börsenverein-Link und BZSt-Link liefern 404. Neue URLs eintragen. Die Börsenverein-Aussage zu Apps (Z. 120) bis dahin als „sinngemäß, Primärquelle offen“ kennzeichnen.
21. **07 Z. 162**: BGH I ZR 200/25 ist durch zwei Kanzleiquellen mit Az., Datum und Vorinstanz bestätigt. Den Vermerk „[nur über Sekundärquellen]“ kann man belassen, bis die BGH-PM 128/2026 verlinkt ist.

Keine Korrekturen nötig in **02, 03 und 06**. Dort wurden alle geprüften Zitate, Zahlen, BfR-Regeln, Lizenzen und Gebühren bestätigt.

## Quellen zu Ersatzprüfungen (WebSearch)

- BA Zeitarbeit: [statistik.arbeitsagentur.de](https://statistik.arbeitsagentur.de/DE/Statischer-Content/Statistiken/Themen-im-Fokus/Zeitarbeit/generische-Publikation/Arbeitsmarkt-Deutschland-Zeitarbeit-Aktuelle-Entwicklung.html)
- RL 2023/2673: [iubenda](https://www.iubenda.com/en/blog/the-new-online-withdrawal-function-what-eu-directive-2023-2673-means-for-your-business/), [JD Supra](https://www.jdsupra.com/legalnews/eu-consumer-protection-law-update-new-9377759/), [Andersen](https://be.andersen.com/en/news/the-eus-new-mandatory-withdrawal-button-key-compliance-steps-for-online-traders-before-june-2026)
- Digistore24: [Digistore24-Hilfe](https://help.digistore24.com/hc/en-us/articles/23694504392721), [Fastlancer](https://www.fastlancer.org/fastlancer-blog/digistore24-review/)
- DPMA: [dpma.de Gebühren Marken](https://www.dpma.de/service/gebuehren/marken/index.html)
- EUIPO: [ippt.eu UMV Anhang I](https://www.ippt.eu/legal-texts/eu-trade-mark-regulation-2017/annex-i), [tmarkmetric 2026](https://tmarkmetric.com/insights/eu-trademark-cost)
- Caravan Salon 2025: [Modern Campground](https://moderncampground.com/europe/germany/269000-visitors-signal-strong-market-demand-at-caravan-salon-dusseldorf-2025/), [RV PRO](https://rv-pro.com/news/caravan-salon-dusseldorf-touts-269k-visitors-from-80-countries/)
- CIVD 2025: [CIVD-PM Jahresbilanz (PDF)](https://www.civd.de/wp-content/uploads/2026/01/01_PM_Jahresbilanz-Deutschland.pdf)
- Buchpreisbindung: [onwalt](https://www.onwalt.de/akademie/buchpreisbindung-und-umsatzsteuer-fuer-digitale-inhalte), [Händlerbund](https://www.haendlerbund.de/de/ratgeber/recht/3885-buchpreisbindung)
