# Kampagnen – alle vier Marken

Stand 29.10.2026 · Grundlage: Markenbücher (`marke/*/Markenbuch_*.md`), Claim-Freigabe (`marke/Claim_Freigabe.md`), Pricing (`recherche/08`), Recht (`recherche/07` Abschnitt 5). **Nichts davon ist gestartet** – Start nur durch dich (FUER_DICH.md).

## Regeln für alle Anzeigen
- Maßgeblich ist `marke/Claim_Freigabe.md` (🟢/🟡/🔴). Gesperrt u. a.: Euro-Beträge und Sparaussagen, Zeitangaben ohne Messung, „jederzeit kündbar“ beim Jahresabo, „ohne Login kündigen“ als Vorteil, „sättigend“, Umwelt- und Alleinstellungsaussagen.
- Keine Kosten- oder Sparversprechen, bis der Kassenbon-Test bestanden ist (Preise sind Schätzwerte, Stichprobe `recherche/09`). Erlaubt: „geschätzte Kosten“, „Einkaufsliste mit Preisschätzung“.
- Keine Gesundheits-, Abnehm-, Muskel- oder Leistungsversprechen. Keine Krankheitsnamen. Keine Vorher-nachher-Körper.
- Keine erfundenen Kundenstimmen, keine Zitate aus der Recherche als „Kundenmeinung“.
- Zahlen in Anzeigen (z. B. „47 Rezepte mit Wasserkocher“) stammen aus `app/tools/landing.py` und werden dort aus den Rezeptdaten gezählt – nach jeder Rezeptänderung prüfen.
- Meta: **Audience Network aus**, nur Facebook/Instagram Feed, Reels, Stories. Keine Zielgruppen nach Gesundheit, Religion oder anderen sensiblen Merkmalen (Meta-Richtlinie + DSGVO). Alter ab 18 (Kochsatz ab 18 wegen Fitness/Ernährung).
- „Gratis“ nur für den Tagesplan (wirklich ohne Zahlung). Das Probeabo heißt „die ersten 7 Tage 0 €, danach …“ mit Preis in gleicher Sichtbarkeit.
- Ziel-URL immer die Landingpage der Marke mit UTM: `?utm_source=meta&utm_medium=paid&utm_campaign=<marke>-test1&utm_content=<angle>`.

## Teststruktur (für jede Marke gleich)
1. **Vorphase (ohne Werbegeld, 2–4 Wochen):** Landingpage + Warteliste/Lead-Magnet mit Double-Opt-in, 5–10 Interviews (Leitfaden in `recherche/04` bzw. Markenbuch), organische Posts in den erlaubten Kanälen (Markenbuch Abschnitt 7).
2. **Test 1 – Angle-Test:** 1 Kampagne „Leads“ (Optimierung auf bestätigte Warteliste-Anmeldung bzw. Tagesplan-Start), 1 Anzeigengruppe Broad (Land DE, Alter laut Marke, Sprache Deutsch), **8 Bild-Anzeigen + 3 Videos** (je Angle eine). Budget **15 €/Tag, 10 Tage = max. 150 € je Marke**. Kein Eingreifen in den ersten 72 h.
3. **Auswertung nach 10 Tagen:** Gewinner = niedrigste Kosten je bestätigtem Lead bei mindestens 1.000 Impressionen je Anzeige. Verlierer pausieren. Die 2–3 besten Angles gehen in Test 2.
4. **Test 2 – Angebot:** Pass vs. Abo (Montage/Camping) bzw. Monat vs. Jahr (Fitness/Alltag) auf der Preisseite; gleiche Anzeigen, Ziel „Kauf“.
5. **Abbruchregeln** (gleich wie in `recherche/Entscheidungsvorlage.md`, dort maßgeblich):
   - Kosten je bestätigtem Lead > 3 € **oder** Kaufquote je Linkklick < 1 % → keine weitere bezahlte Werbung für diese Marke, nur organisch und B2B.
   - Eine einzelne Anzeige stoppt nach etwa 25–30 € ohne Kauf.
   - CPA (Kauf) dauerhaft > 12 € (Ziel-CAC aus `recherche/08`) → nicht skalieren.

## Tracking (vorbereitet, nicht aktiv)
- Meta Pixel + Conversions API **nur auf den Landingpages und der Preisseite**, nicht im Planer (dort werden Allergien/Ziele eingegeben – keine Übertragung an Meta).
- Ereignisse: `PageView`, `Lead` (erst nach bestätigtem Double-Opt-in, vom Mail-Dienst per Webhook), `InitiateCheckout` (Klick auf Kauf-Knopf), `Purchase` (Paddle-Webhook → CAPI, ohne Produktdetails außer Tarif und Preis). **Keine** Ereignisse mit Ernährungsform, Allergenen, Makros.
- Einwilligung über ein Banner (TDDDG § 25), Pixel lädt erst nach „Akzeptieren“. Umsetzung: FUER_DICH.md Abschnitt Tracking.

---

## Zimmerherd (Montage)
Zielgruppe Meta: DE, 20–60, Broad. Optional Interessen (nur zum Vergleich in Test 1b): Bauwesen, Elektroinstallation, Berufskraftfahrer, Monteurzimmer. Ausspielung abends 18–22 Uhr und Sonntag 15–20 Uhr (Sonntagskiste).
| Nr. | Angle | Motiv | Headline (≤ 40) | Primärtext |
|---|---|---|---|---|
| 1 | Was steht im Zimmer? | `creatives/montage/01_was-steht-im-zimmer.jpg`, Video V1 | Was steht im Zimmer? | Wasserkocher, Mikrowelle, eine Kochplatte? Kreuz an, was dasteht. Zimmerherd plant die Woche und schreibt den Einkaufszettel. Tagesplan gratis, ohne Konto. |
| 2 | Ein Kühlschrank, sechs Mann | `02_ein-kuehlschrank-sechs-mann.jpg` | Der Plan weiß, was rein muss | Geteilter Kühlschrank im Monteurhaus? Zimmerherd zeigt, was gekühlt werden muss und wie lange es hält. Lagerfristen nach BfR, FSA und USDA, teils strenger, bei höchstens 7 °C. |
| 3 | Nur Wasserkocher | `03_nur-wasserkocher.jpg`, Video V2 | Nur ein Wasserkocher? | Mit Wasserkocher und Kühlschrank gehen 47 unserer 195 Rezepte. Mit Mikrowelle 59. Kreuz an, was da ist. |
| 4 | Zehn Minuten | `04_zehn-minuten.jpg` | Zehn Minuten. Dann Feierabend. | Viele Gerichte brauchen nicht mehr Arbeit. Die Box für morgen entsteht gleich mit. |
| 5 | 21:15 Raststätte zu | `05_raststaette-zu.jpg` | 21:15. Raststätte zu. | Der Plan rechnet damit: Die Box für heute Abend ist schon vorbereitet. Einkaufszettel für den Discounter um die Ecke. |
| 6 | Montagekoffer | `06_montagekoffer.jpg` | Der Montagekoffer | Was mit muss, damit du im Zimmer kochen kannst. Und was du damit kochst. Zimmerherd plant nach deiner Ausstattung. |
| 7 | Sonntagskiste | `07_sonntagskiste.jpg`, Video V3 | Die Sonntagskiste | (⏸ zurückgestellt: Der Planer kann „zu Hause kochen, im Zimmer essen“ noch nicht mit zwei Geräteprofilen planen.) Sonntag zu Hause vorkochen, Montag losfahren. Boxen mit Datum, in der Kühltasche transportieren, höchstens 2 Tage, Reis 1 Tag. |
| 8 | Kabine statt Küche | `08_kabine-24-volt.jpg` | Kabine statt Küche | Rezepte für Wasserkocher, 24-Volt-Box oder ganz ohne Gerät. Kreuz an, was in der Kabine geht. |
CTA-Knopf: „Mehr dazu“. Angebot auf der Landingpage: Tagesplan gratis → Montage-Pass 17,99 € (3 Monate, endet von selbst).

## Kochsatz (Fitness)
Zielgruppe Meta: DE, 18–45, Broad. Vergleich 1b: Interessen Meal Prep, Kraftsport, Fitnessstudio (keine Gesundheits- oder Abnehm-Interessen).
| Nr. | Angle | Motiv | Headline | Primärtext |
|---|---|---|---|---|
| 1 | Protein pro Euro (🔴 gesperrt bis Kassenbon-Test, Claim_Freigabe) | `creatives/fitness/01_protein-pro-euro.jpg` | Protein pro Euro | Erst nach korrigierten Fleisch-/Fischpreisen schalten. |
| 2 | Die ganze Packung | `02_die-ganze-packung.jpg`, Video V1 | Die ganze Packung | Ein Kilo Hähnchen, sechs Boxen. Kochsatz plant so, dass Packungen aufgebraucht werden. |
| 3 | Datum auf der Box | `03_datum-auf-der-box.jpg`, Video V3 | Zwei Kochtage. Datum drauf. | Zwei Kochtage, ein Ablauf mit Uhrzeiten, Boxen mit „essen bis“, Fristen teils strenger als BfR, bei höchstens 7 °C. |
| 4 | Gleiche Makros, andere Teller | `04_gleiche-makros.jpg` | Gleiche Makros. Andere Teller. | Kalorien und Makros eingeben. Der Plan wechselt die Gerichte, deine Zahlen bleiben. |
| 5 | Vorher planen | `05_vorher-planen.jpg` | Vorher planen statt eintragen | Statt nach dem Essen zu tracken: Die Woche steht, bevor du einkaufst. Nährwerte aus dem BLS 4.0. |
| 6 | Airfryer oder Ofen | `06_airfryer-oder-ofen.jpg`, Video V2 | Airfryer oder Ofen | Die meisten Ofenrezepte haben einen zweiten Weg für die Heißluftfritteuse. |
| 7 | Deine Zahlen bleiben bei dir | `07_deine-zahlen.jpg` | Deine Zahlen bleiben bei dir | Kein Konto. Ziele und Allergien bleiben auf deinem Handy. |
| 8 | Kein Mixer | `08_ohne-mixer.jpg` | Kein Mixer? Dann ohne. | Kreuz an, was in deiner Küche steht. Der Plan nimmt nur Rezepte, die damit gehen. |
Angebot: Tagesplan gratis → Plus Jahr 44,99 € (7 Tage 0 €) bzw. Monat 6,99 €.

## Zweiflammer (Camping)
Saison: Test 1 **Februar/März** (Vorbereitung der ersten Tour), nicht im November. Zielgruppe Meta: DE, 40–70, Broad; Vergleich 1b: Interessen Wohnmobil, Camping, Kastenwagen, Wohnwagen.
| Nr. | Angle | Motiv | Headline | Primärtext |
|---|---|---|---|---|
| 1 | Kühlschrank-Tetris | `creatives/camping/01_kuehlschrank-tetris.jpg` | Kühlschrank-Tetris | Wenig Platz in der Kühlung? Zweiflammer bevorzugt Zutaten, die ungekühlt lagern, und plant angebrochene Packungen mit ein. |
| 2 | Gratin vom Gasherd | `02_gratin-vom-gasherd.jpg`, Video V1 | Gratin vom Gasherd | Rezepte für den Omnia-Backofen auf der Flamme, Schritt für Schritt. |
| 3 | Eine Flamme | `03_eine-flamme.jpg`, Video V2 | Eine Flamme. Ein Topf. | 95 Rezepte gehen mit einer Flamme, Topf und Pfanne. Kreuz an, was deine Bordküche hat. |
| 4 | Weit zum Laden | `04_weit-zum-laden.jpg` | Weit zum nächsten Laden? | Einkauf für mehrere Tage, vor der Abfahrt, nach Abteilungen sortiert. |
| 5 | Vor der Abfahrt | `05_vor-der-abfahrt.jpg`, Video V3 | Die Woche steht vor der Abfahrt | Plan und Einkaufsliste für die ganze Tour, für 2 bis 14 Tage. |
| 6 | Ein Topf, ein Brett | `06_ein-topf-ein-brett.jpg` | Ein Topf und ein Brett | Viel mehr braucht es für die meisten Gerichte nicht. |
| 7 | Erste Tour der Saison | `07_erste-tour.jpg` | Erste Tour der Saison | Der Saison-Pass gilt 6 Monate und endet von selbst. 24,99 € einmalig. |
| 8 | Freitag hin, Sonntag heim | `08_freitag-hin.jpg` | Freitag hin. Sonntag heim. | Auch fürs Wochenende: Plan für 2 Personen, mit Einkaufsliste. |
Angebot: Tagesplan gratis → Saison-Pass 24,99 € (6 Monate, endet von selbst).

## Wochenschmaus (Alltag)
Zielgruppe Meta: DE, 25–55, Broad. Schwerpunkt SEO und Pinterest (organisch), bezahlt nur Test 1.
| Nr. | Angle | Motiv | Headline | Primärtext |
|---|---|---|---|---|
| 1 | Die Frage um 17:30 | `creatives/alltag/01_die-frage-um-1730.jpg`, Video V1 | Die Frage um 17:30 | Was gibt es heute? Mit Wochenschmaus ist die Woche geplant und der Einkauf auch. |
| 2 | Die halbe Avocado | `02_halbe-avocado.jpg` | Die halbe Avocado gibt's nicht | Wir rechnen mit ganzen Packungen und zeigen, was übrig bleibt. |
| 3 | Dein Laden, deine Gänge | `03_dein-laden.jpg`, Video V2 | Dein Laden. Deine Gänge. | Die Einkaufsliste nach Abteilungen sortiert, passend zur Kette: Aldi, Lidl, Rewe, Edeka und mehr. |
| 4 | Allergien | `04_allergien.jpg` | Allergien sind kein Extra | Filter für die 14 Hauptallergene in jedem Plan, auch gratis. |
| 5 | Ohne Konto | `05_ohne-konto.jpg` | Ohne Konto. Ohne Werbung. | Im Planer gibt es keine Werbung und kein Konto. Deine Eingaben bleiben auf deinem Gerät. |
| 6 | Planen wie die Kochbox | `06_kochbox-plan.jpg` | Planen wie die Kochbox | Wochenplan mit Rezepten wie bei der Kochbox, Einkauf im Laden deiner Wahl. |
| 7 | Die Airfryer-Woche | `07_airfryer-woche.jpg`, Video V3 | Die Airfryer-Woche | Kreuz die Heißluftfritteuse an. Der Plan nutzt sie. |
| 8 | Tisch für eine Person | `08_tisch-fuer-einen.jpg` | Tisch für eine Person | Mengen für 1 bis 8 Personen. |
Angebot: Tagesplan gratis → Plus Jahr 44,99 € (7 Tage 0 €).

## Organisch (ohne Geld) je Marke
- **Zimmerherd:** TikTok/Reels mit den Videos (Hook in Sekunde 1), Beiträge in Monteur-Facebook-Gruppen **nur wo Werbung erlaubt** (Regeln vorher lesen), Kooperationsanfrage an Monteurzimmer-Portale und Zeitarbeitsfirmen (Vorlage: `marketing/Launchplan.md`).
- **Kochsatz:** Reels, Pinterest-Pins „Meal-Prep-Woche Discounter“, Kooperation mit kleinen Fitness-Creatorn (Werbung kennzeichnen, keine Leistungsversprechen).
- **Zweiflammer:** Pinterest (Omnia, One-Pot), Gastbeiträge in Camping-Blogs, Caravan Salon (Aug./Sep.) als Messe-Idee; wohnwagen-forum.de: Werbung verboten, nur Admin anfragen.
- **Wochenschmaus:** SEO-Seiten aus `marketing/SEO_Keywords_und_Seiten.md`, Pinterest.
