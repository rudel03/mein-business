# 00 – Gesamtbericht Phase A (Recherche)

Stand: 29.10.2026 · Rolle: Produktmanagement · Grundlage: Teilberichte `01`–`12` in diesem Ordner, `../ENTSCHEIDUNGEN.md`, `../marke/Namen_und_Pruefung.md`, `../AUFTRAG.md`.

> **Wie dieser Bericht gebaut ist:** Hier steht keine neue Zahl. Jede Zahl ist aus einem Teilbericht übernommen, die Fundstelle steht in Klammern, zum Beispiel „(01, 2.1)“ für Bericht 01, Abschnitt 2.1. Dort steht der Link mit Abrufdatum. Wo der Faktencheck (10) eine Zahl korrigiert hat, steht hier der **korrigierte Wert** und der Hinweis „korr. 10“. **[S]** heißt Schätzung oder Annahme, keine Messung.
>
> Die Entscheidungsvorlage zum Ankreuzen steht in `Entscheidungsvorlage.md`. Die Einwände des Advocatus Diaboli und die Antworten des Teams stehen in `11_Advocatus_Diaboli_Phase_A.md`.

---

## 1. Kurzfassung in 10 Punkten

1. **Das Problem „Was koche ich, und womit?“ ist echt und kostet Geld.** HelloFresh setzt allein in Deutschland 476,4 Mio. € um (2025, −4,4 %) (01, 1). Die Kochbox schrumpft, während 59 % beim Einkauf auf den Preis achten (2020: 46 %) (01, 5.2).
2. **Die Lücke ist belegt:** Kein App-Anbieter filtert nach mehreren Geräten (Wasserkocher, Mikrowelle, 1 Platte, kein Kühlschrank). Kein Produkt richtet sich an Monteure. Niemand zeigt einen Vorkoch-Ablauf mit Uhrzeiten oder Lagerregeln mit Quelle (05, 5).
3. **Der engste Konkurrent mise** verspricht „Budget + Supermarkt + Plan“ und scheitert sichtbar daran. 81 % der 77 neuesten geschriebenen Rezensionen haben 1–3 Sterne: falsches Sortiment, falsche Preise, missachtete Allergien (05, 2.1; bestätigt 10).
4. **Vier Nischen, eine Technik:** Zimmerherd (Montage), Kochsatz (Fitness), Zweiflammer (Camping), Wochenschmaus (Alltag), Dachmarke Tellerkontor. Alle .de- und .com-Domains sind frei (RDAP 29.10.2026). **Ein Ergebnis aus dem Markenregister fehlt noch** (Namen, Kurzfassung).
5. **Die dritte Nische ist Camping.** Unter 16 Kandidaten liegt sie in allen 8 Gewichtungen auf Platz 1 (Score 4,05/5) (04, 0). Die Wahl hängt aber an der Annahme „Camper zahlen“: Sinkt die Zahlungsbereitschaft von 5 auf 3 Punkte, kippt der Sieger (04, 3).
6. **Technisch ist alles machbar, und laufend fast kostenlos:** Nährwerte aus BLS 4.0 (CC BY 4.0, 0 €), eigene Preistabelle statt Scraping, Planer im Browser ohne KI-Kosten, PWA ohne App-Store-Gebühr (06; ENTSCHEIDUNGEN C1–C7). 26 automatische Tests laufen grün.
7. **Recht ist lösbar, aber mit Pflichtarbeit:** Kündigungsbutton ohne Login (auch beim Pass), Widerrufsfunktion nach § 356a BGB, Allergien nur im Gerät speichern (Art. 9 DSGVO), keine Abnehm- oder Gesundheitsversprechen (07; korr. 10).
8. **Das Geld ist der schwächste Punkt.** Ziel-CAC ≈ 12 €, aber bezahlte Werbung kostet im realistischen Fall ≈ 83 € je Kunde (08, 3.5). Nach 12 Monaten realistisch 79 Zahlende und kumuliert −2.081 € (08, 3.8). **Ohne kostenlose Reichweite trägt sich das Projekt nicht.**
9. **Die Qualität ist geprüft:** Faktencheck 27 % der Quellen, 0 falsche Angaben (10). Alle 195 Rezepte fachlich gelesen, 1 kritischer und 37 mittlere Befunde behoben (12). 31 Zutatenpreise nach Stichprobe korrigiert (09).
10. **Nicht gemessen ist bisher, ob Menschen zahlen.** Es gibt kein Interview, keinen Preistest, keinen Kassenbon-Abgleich und kein Testkochen. **Empfehlung: Ja, starten, aber erst validieren und dann Werbegeld ausgeben**, eine Nische nach der anderen (siehe Entscheidungsvorlage).

---

## 2. Markt und Zielgruppen

### 2.1 Gesamtmarkt

| Kennzahl | Wert | Fundstelle | Sicherheit |
|---|---|---|---|
| App-Markt Deutschland (Umsatz) | 2,2 Mrd. € (+2,3 %), Prognose 2025 | 01, 1 (Bitkom) | belegt, ✅ 10 |
| Chefkoch Reichweite | 20,0 Mio. Unique User/Monat, 7–8 Mio. registriert | 01, 1 | Selbstangabe, ✅ 10 |
| HelloFresh Umsatz Deutschland | 476,4 Mio. € (2024: 498,5 Mio. €) | 01, 1 (Geschäftsbericht 2025, S. 83) | belegt, ✅ 10 |
| Privathaushalte / davon Single | 40,998 Mio. / 41,6 % | 01, 5.1 | belegt |
| Achten beim Einkauf auf den Preis | 59 % (2020: 46 %) | 01, 5.2 (Ernährungsreport 2025) | belegt |
| Essen soll „einfach und schnell“ sein | 57 % (2015: 45 %) | 01, 5.2 | belegt |
| Einkaufsliste „oft bis immer“ | 54 % (YouGov, **21.11.2023**) | 01, 1; Datum korr. 10 | belegt |
| Lebensmittelhandel: Aldi, Lidl, Rewe, Edeka, Kaufland, Netto, Penny | ca. 24.900 Filialen, gut 190 Mrd. € Umsatz 2024; Discounter ≈ die Hälfte | 01, 5.5 | belegt (Summe eigene Rechnung) |
| Airfryer im Haushalt | 47 % (YouGov) | 04, 1.16 | ✅ 10 |
| Freemium: Downloads, die zahlen (Tag 35) | 2,18 % (Hard Paywall 12,11 %), App-Store-Werte | 01, 6.2 (RevenueCat 2025) | belegt; für Web-Apps fehlt ein Vergleichswert |
| Gesundheit & Fitness: Testphase → Zahler | 39,9 % (Bericht 2025) bzw. 37,7 % (Bericht 2026) | 01, 6.2; 08, 1.2 | ✅ 10 |
| Ernährungs-Apps Umsatz Deutschland | **nicht gefunden** (Statista hinter Paywall) | 01, 1 | Lücke |

### 2.2 Montage (Zimmerherd)

| Kennzahl | Wert | Fundstelle |
|---|---|---|
| Bauhauptgewerbe, gewerbliche Arbeitnehmer | 606.815 (Ø 2025) | 01, 2.1 (SOKA-BAU), ✅ 10 |
| Entsandte Bauarbeitnehmer | 65.102 (2025, −13,5 %), vor allem aus PL, AT, SK, RO | 01, 2.1 |
| Berufskraftfahrer (BA-Daten via BALM) | **547.919** (31.12.2023, −2,0 %) | korr. 10 (Bericht 01 nannte 559.347, das ist der Wert für 2022) |
| Berufskraftfahrer laut BGL | ca. 535.000, davon ca. 32 % Ausländer | 01, 2.1 (Verbandsschätzung 11/2025) |
| Leiharbeitnehmende | 622.000 (06/2025) | 01, 2.1, ✅ 10 |
| **Kernzielgruppe** „wohnt wochenweise auswärts mit eingeschränkter Küche“ | **ca. 0,47–0,82 Mio. Menschen [S]** | 01, 2.4 (grobe Herleitung, keine amtliche Zahl) |
| Verpflegungspauschale | 14 € (> 8 h) / 28 € (24 h), nach 3 Monaten am selben Ort entfällt sie | 01, 2.2; § 9 Abs. 4a EStG live geprüft (10) |
| Raststätte | „Ein Gericht für knapp 20 Euro“, Kaffee 4,50 € | 02, 1 (VerkehrsRundschau 27.03.2026), ✅ 10 |
| Unterkünfte mit eigener Küche | 2.794 von 4.186 = 67 % (also rund 1/3 ohne) | 02, 2, ✅ 10 |
| Geräte in 38 Monteurzimmer-Inseraten | Kühlschrank 95 %, Wasserkocher 89 %, Mikrowelle 82 %, Airfryer 0 % | 02, 2 |
| SOM nach 3 Jahren | 2.400–9.800 Zahlende, ca. 90.000–350.000 €/Jahr **[S]** | 01, 7 |

### 2.3 Fitness (Kochsatz)

| Kennzahl | Wert | Fundstelle |
|---|---|---|
| Mitglieder in Fitnessanlagen DE | 12,36 Mio. (+5,6 %), Ende 2025 | 01, 3 (DSSV), ✅ 10 |
| Ø Monatsbeitrag | 48,55 € | 01, 3, ✅ 10 |
| Dazu über Firmen-Fitness-Anbieter | 1,47 Mio., gesamt 13,83 Mio. | 01, 3 |
| Umsatzstärkste Gesundheits-/Fitness-App DE | YAZIO (Spitzenwoche ca. 520 Tsd. US$, Q2/2025) | 01, 1 (Sensor Tower); Rangfolge 4/5 korr. 10 |
| Makro-affine Zielgruppe | ca. 1,9–3,1 Mio. **[S]** (Quote 15–25 % angenommen) | 01, 3 |
| SOM nach 3 Jahren | 1.000–6.000 Zahlende, ca. 40.000–240.000 €/Jahr **[S]**, „starker Wettbewerb“ | 01, 7 |

### 2.4 Camping (Zweiflammer)

| Kennzahl | Wert | Fundstelle |
|---|---|---|
| Wohnmobile im Bestand | 1.002.562 (erstmals > 1 Mio., 04/2025) | 01, 2.1; 04, 1.6 (KBA), ✅ 10 |
| Reisemobile / Caravans 2025 | 1,045 Mio. / 0,786 Mio. | 04, 1.6, ✅ 10 |
| Campingübernachtungen 2025 | 44,66 Mio. (Rekord), davon 39,9 Mio. Inländer | 04, 1.6, ✅ 10 |
| Alter der Halter | 60–69 J.: 318.589 Fahrzeuge; 50–59 J.: 265.073; unter 40 J.: < 10 % | 04, 1.6, ✅ 10 |
| **Branchenumsatz 2025** | 14,1 Mrd. €, **−6,5 %** gegenüber 2024 | **korr. 10** (CIVD-PM 19.01.2026) |
| **Neuzulassungen 2025** | 94.134, **−2,3 %** | **korr. 10** |
| Caravan Salon | 2025: 269.000 Besucher; **2026: 259.000** | korr. 10 |
| Saison | Juli/August = 18,7 der 44,7 Mio. Übernachtungen (≈ 42 %) | 04, 4; 11, D |
| Digitale Camping-Kochbücher | 9,99–17,99 € je Buch (App „mobile cooking“) | 04, 5.6 |

**Wichtige Korrektur:** Bericht 04 nennt Camping einen „wachsenden Markt“. Das stimmt nur für den **Bestand** an Fahrzeugen und die Übernachtungen. **Umsatz, Neuzulassungen und Messebesuch sind 2025/2026 gesunken** (10, Korrektur 3).

### 2.5 Alltag (Wochenschmaus)

| Kennzahl | Wert | Fundstelle |
|---|---|---|
| Kochen mindestens 2–3× pro Woche | 80 % (43 % fast täglich, 37 % 2–3×) | 01, 5.2 |
| Alleinlebende wollen „einfach und schnell“ | 64 % | 01, 5.2 |
| Familien / müssen beim Einkauf einschränken | 11,8 Mio. Familien / 45 % (vzbv 11/2025) | 04, 1.5 |
| Alleinerziehende, armutsgefährdet | 28,7 % | 04, 1.2, ✅ 10 |
| SOM nach 3 Jahren | 3.300–6.600 Zahlende, ca. 120.000–240.000 €/Jahr **[S]** | 01, 7 |

**Gesamtbild Markt:** Die Marktgröße ist nicht der Engpass. In allen vier Nischen liegt der erreichbare Umsatz nach drei Jahren in derselben Größenordnung, ca. 0,1–0,35 Mio. € pro Jahr **[S]**. Der Engpass ist die **Reichweite pro Werbe-Euro** (01, 7 und 8).

---

## 3. Schmerzpunkte je Nische (mit Beispielzitaten)

Gesammelt wurden **151 Zitate**: Montage 44, Fitness 35, Allgemein 42, Camping 30 (02, 03, 04). Der Faktencheck hat 33 Zitate wörtlich nachgeprüft, **ohne eine einzige Abweichung** (10, 5).

### 3.1 Montage (02)

**Top-Schmerzpunkte:** 1. zu müde zum Kochen nach 10–12 Stunden, deshalb Imbiss · 2. Fast Food und Raststätte sind teuer im Verhältnis zu 14/28 € Spesen · 3. Kühlschrank fehlt, ist klein oder wird mit Kollegen geteilt · 4. vorher unklar, welche Küche da ist · 5. Strom im Lkw (02, 7).

| Zitat | Fundstelle |
|---|---|
| „von 7-19 Uhr geschuftet, dann zur Pension fahren, duschen und dann noch kochen? nee.“ | mamiweb.de, 06.06.2013 (02, Nr. 2; Suchauszug) |
| „Weißt du was ich letztens für 2 belegte Brötchen auf der Autobahn gezahlt habe?“ | Saschas-Fanforum, 24.05.2016 (02, Nr. 8) |
| „Wir mussten nicht jeden Abend auswärts essen und konnten unsere Ausgaben besser planen.“ | deutschland-monteurzimmer.de, 14.08.2026 (02, Nr. 31; redaktionell geglättet) |
| „Ein einzelner kleiner Topf, zwei Teller oder ein Kühlschrank ohne ausreichenden Platz“ | ebd., 14.08.2026 (02, Nr. 32) |
| „Dosengerichte wie Ravioli, Tütensuppen, Mie Nudeln“ (auf die Frage: nur Mikrowelle und Wasserkocher) | gutefrage.net, Datum k. A. (02, Nr. 42; Suchauszug) |

**Vorbehalt:** Viele deutsche Belege sind von 2012–2016, 14 der 44 Zitate stammen von US-Fahrern (02, 8). Der stärkste Schmerz ist **Müdigkeit**. Ein Planer nimmt das Kochen nicht ab, er macht es nur kürzer (11, Punkt 2).

### 3.2 Fitness (03, Teil A)

**Top-Schmerzpunkte:** 1. eigene Rezepte anlegen ist mühsam · 2. Tracking nervt und wird aufgegeben · 3. Paywall auf Grundfunktionen · 4. Abo zu teuer und steigend · 5. Nährwert-Datenbanken unzuverlässig (03, A2).

| Zitat | Fundstelle |
|---|---|
| „Ich kann keine festen Mahlzeiten mit einem Klick für einige Tage eintragen. … Ich plane schon Tage im Voraus“ | App Store, Yazio 2★, 23.10.2026 (03, A2) |
| „Seit das ist, Track ich kaum noch sauber weil es einfach zu viel Aufwand is.“ | App Store, Yazio 3★, 26.10.2026 (03, A4) |
| „Aldi Coffee Protein, rechnet er 5 gr Protein und 125 Kalorien. Stimmt aber überhaupt nicht.“ | App Store, Lifesum 2★, 28.09.2026 (03, A15) |
| „every meal had either meat or eggs in it which for me is way too expensive.“ | App Store DE, MealPrepPro 3★, 25.03.2024 (03, A27) |
| „Kein Geld für Proteinreiches essen. Hat irgendjemand tipps?“ | gutefrage.net, Fragetitel (03, A31) |

**Kernaussage:** Fitness-Leute wollen keinen weiteren Tracker. Sie wollen einen fertigen Plan, der die Makros trifft und sich für mehrere Tage wiederholen lässt (03, A2).

### 3.3 Camping (04, Abschnitt 5)

**Top-Schmerzpunkte:** 1. Urlaub statt Küchendienst · 2. Geräte-Grenzen (1 Flamme, Kartusche, kein Backofen) · 3. Einkauf unterwegs · 4. Fertiggerichte und Essen gehen auf Dauer teuer · 5. Ideenlosigkeit (04, 5.3).

| Zitat | Fundstelle |
|---|---|
| „Allerdings würde ich gerne die Essenszubereitung fürs Campen etwas vereinfachen“ | wohnwagen-forum.de, 17.06.2026 (04, Nr. 1) |
| „Es geht um Essen, was man im Vorzelt, vor dem Wagen oder im Wagen auf einem Gasherd/Kartuschenkocher o.ä. kochen kann.“ | wohnwagen-forum.de, 30.11.2024 (04, Nr. 7) |
| „da ich nicht wusste wie der Platz abgesichert ist“ (Strom für die Heißluftfritteuse) | wohnwagen-forum.de, 06.12.2024 (04, Nr. 13) |
| „wobei mir die auf Dauer zu teuer sind.“ (Fertiggerichte) | gs-forum.eu, 23.07.2024 (04, Nr. 24) |
| „Aber in der heutigen Zeit 17,99.- für a digitales Kochbuch zu verlangen ist zu viel.“ | App Store, „mobile cooking“, 18.12.2025 (04, Nr. 28) – **Gegenbeleg zur Zahlungsbereitschaft** |

### 3.4 Alltag (03, Teil B)

**Top-Schmerzpunkte:** 1. Abo- und Werbe-Müdigkeit · 2. die tägliche Frage „Was essen wir heute?“ · 3. der gewählte Supermarkt muss stimmen · 4. Kosten unrealistisch · 5. Allergien werden nicht zuverlässig beachtet (03, B2).

| Zitat | Fundstelle |
|---|---|
| „Ich wollte die App eigentlich nutzen um der ständigen Frage: ‚Was essen wir heute?' vorzubeugen.“ | App Store, mise 1★, 27.10.2026 (03, B1) |
| „Viele Produkte die zum Kauf vorgeschlagen werden gibt es bei Aldi gar nicht. (Lüge: Vertrauen verspielt!)“ | App Store, mise 1★, 27.10.2026 (03, B2) |
| „der angebliche Preis … stimmt nicht mal ansatzweise. Berechnet wird z.B. eine halbe Avocado“ | App Store, mise 2★, 20.10.2026 (03, B4) |
| „trotz eingegebener Abneigung wurde ein Gericht mit dieser Zutat vorgeschlagen - für Allergiker absolut unvorteilhaft“ | App Store, mise 3★, 26.10.2026 (03, B7) |
| „Ich zahle gerne einen akzeptablen Einmalbetrag … aber Apps dauerhaft mit Abos zu belegen … geht mir langsam zu weit“ | App Store, Chefkoch 1★, 10.10.2026 (03, B15) |

**Projektübergreifend:** Genauigkeit ist das Hauptversprechen, noch vor dem Funktionsumfang. Allergien sind ein harter Filter und gehören nicht hinter die Paywall. Kostenlose KI ist der Vergleich im Kopf der Nutzer (03, Erkenntnisse 1, 3, 7).

### 3.5 Zahlungsbereitschaft je Nische (nur Indizien)

| Nische | Indiz | Fundstelle |
|---|---|---|
| Montage | Spesen 14/28 € pro Tag als Budget; Kühlboxen mit Tausenden Bewertungen; **kein** Software-Beleg | 02, 4 |
| Fitness | zahlt 40–100 €/Jahr für Tracker, 19,99 € für ein PDF; abo-müde | 03, A4 |
| Camping | 9,99–17,99 € je digitalem Kochbuch; Gegenstimme „17,99 … zu viel“ | 04, 5.6 |
| Alltag | niedrige Schmerzgrenze (3,99–40 €/Jahr), viele lehnen Abos ab | 03, B4 |

---

## 4. Wettbewerb

Bericht 05 vergleicht 32 Anbieter und Alternativen. Hier die 20 wichtigsten, mit den Korrekturen aus dem Faktencheck.

| # | Anbieter | Art | Preis DE (28.10.2026) | Bewertung | Wichtigste Schwäche / Hinweis | Fundstelle |
|---|---|---|---|---|---|---|
| 1 | **mise** (TEGS Labs Ltd) | KI-Planer mit Budget + Supermarkt | 9,99 €/Monat; Jahr **29,99–59,99 €** sichtbar, in Rezensionen meist 44,99 € | AS 4,5 ★ (1.540); 81 % der 77 neuesten geschriebenen Rezensionen 1–3★ | falsches Sortiment und falsche Preise, Allergien missachtet, Nutzung nur mit Probeabo | 05, 2.1; Preis korr. 10 |
| 2 | Eat This Much (US) | Makro-/Budget-Planer | AS 8,99/17,99 €; Web $5/Monat bei Jahreszahlung, $14,99 monatlich | AS 4,6 (339) | US-Produkte und Einheiten, nur Englisch | 05, 2.2; korr. 10 |
| 3 | **Mealime** (US) | Gratis-Planer | – | – | **eingestellt am 21.10.2026**, kein Preis-Vergleich mehr | 05, 2.3; ✅ 10 |
| 4 | PlateJoy (US) | personalisierter Planer | – | – | **eingestellt seit 01.07.2025** | 05, 2.4 |
| 5 | Samsung Food | Rezepte + Planer | 7,99 €/Monat, 69,99 €/Jahr | AS 4,7 (166) | Werbung, Registrierungszwang | 05, 2.5 |
| 6 | Plan to Eat (US) | Rezepte + Planer | $5.95/Monat, $49/Jahr, 14 Tage gratis | AS 4,7 (29) | nur Englisch; Jahresplan ohne automatische Verlängerung (Vertrauenssignal) | 05, 2.6 |
| 7 | Yazio | Kalorien-Tracker | 12 Monate 23,90–83,90 € | AS 4,6 (447.827) | Popup-Werbung, Abo-Ärger | 05, 2.7 |
| 8 | MyFitnessPal | Tracker | 9,99–21,99 €/Monat, 49,99–87,99 €/Jahr | AS 4,5 (80.276) | Updates, Paywall | 05, 2.8 |
| 9 | Lifesum | Tracker, Diätpläne | 9,99–14,99 €/Monat, 99,99 €/Jahr | AS 4,5 (81.875) | Preis verdoppelt | 05, 2.9 |
| 10 | Fddb | deutscher Tracker | 3,99 €/Monat, 19,99–39,99 €/Jahr | AS 4,6 (17.554) | doppelte Einträge | 05, 2.10 |
| 11 | Kitchen Stories | Rezept-App | 7,99 €/Monat, 79,99 €/Jahr | AS 4,8 (45.148) | Registrierungszwang | 05, 2.11 |
| 12 | Chefkoch PLUS | größte deutsche Rezeptplattform | 5,99 €/Monat, 29,99–49,99 €/Jahr | AS 4,7 (269.982) | Kontopflicht seit Okt. 2026, viel Werbung | 05, 2.12 |
| 13 | **Cookidoo** (Thermomix) | Geräte-Rezepte | **69,99 €/Jahr** | AS 4,8 (585.762) | nur ein Gerät | 05, 1; Preis korr. 10 (08 nannte 60 €, Stand 07/2024) |
| 14 | KptnCook | Rezept-App + Wochenplaner | 5,99 €/Monat, 29,99–59,99 €/Jahr | AS 4,8 (50.080) | „Das esse ich nicht“ nur gegen Geld | 05, 2.14 |
| 15 | Choosy | deutscher Familien-Planer | 5,99 €/Monat, 39,99–49,99 €/Jahr | AS 4,9 (3.603) | Probeabo-Zwang, Rewe-Anbindung laut Nutzern fehlerhaft | 05, 1 und 4 |
| 16 | Wochenplaner Essen (Jojo) | Planer | 4,99 €/Monat, 19,99 €/Jahr, lebenslang 29,99 € | AS 4,5 (603) | Einkaufslisten gelöscht | 05, 1; ✅ 10 |
| 17 | **HelloFresh** | Kochbox | **4,22 €/Portion inkl. Versand, nur bei 4 Pers. × 5 Gerichten, Stand Juni 2022**; aktueller Preis nicht belegt | TP 3,8 (58.004) | teuer ohne Rabatt, Portionen klein | 05, 1; korr. 10 |
| 18 | ChatGPT | Allzweck-KI | Go ca. 8 €, Plus ca. 23 €/Monat | – | keine geprüften Preise, Allergene ungeprüft | 05, 2.20 |
| 19 | Digistore24-PDFs / Coaches | Einmal-PDF | 7,90 € (Wasserkocher) bis 37 € | – | nicht personalisiert | 05, 2.21 |
| 20 | MealDeal, Disha | Budget-Planer nach Prospekt | nicht ermittelt | – | direkte Konkurrenz für „Familie mit kleinem Budget“ | 04, 1.5 |

**Preisanker:** Median Monatspreis 6,99 € (reine Planer 5,99 €), normaler Jahrespreis 30–60 €, Lifetime ca. 20 €, Einmal-PDFs ca. 10–13 € (05, 6).

**Was niemand löst (05, 5):**
1. Gerätefilter über mehrere Geräte und „kein Kühlschrank“.
2. Unterkunft und Montage als Nutzungsfall (kein Produkt, kein Buch „Monteurküche“).
3. Ehrliche Discounter-Kosten mit echten Packungsgrößen.
4. Ein Budget unter 65 € pro Woche.
5. Vorkoch-Ablauf mit Uhrzeiten.
6. Lagerregeln mit Quelle (BfR/BZfE).
7. Nutzung ohne Konto, ohne Abo-Zwang, offline.

**Gegenprobe:** „Niemand löst es“ kann auch heißen, dass die Nachfrage zu klein ist (05, 5). Das klären nur die Tests vor dem Werbegeld.

**Nicht erreichbar:** Meta-Werbebibliothek, Google-Anzeigen-Center, TikTok, Etsy, Amazon. Die Anzeigen der Konkurrenz sind deshalb **nicht ausgewertet** (05, 0 und 3.3). Das muss der Inhaber im Browser nachholen.

---

## 5. Daten und Machbarkeit (06, ENTSCHEIDUNGEN C1–C10)

| Baustein | Lösung | Stand |
|---|---|---|
| Nährwerte | BLS 4.0 vom Max Rubner-Institut, CC BY 4.0, kostenlos, ca. 7.140 Lebensmittel, 138 Nährstoffe | ✅ 10; eingebaut |
| Allergene | 14 Hauptallergene je Zutat, harter Filter im Planer | eingebaut |
| Supermarktpreise | **kein Scraping** (§§ 87a ff. UrhG, Händler-AGB, BGH I ZR 224/12). Eigene Tabelle mit 156 Zutaten, Ladenfaktor je Kette, Anzeige als Schätzung mit Stand 10/2026 | eingebaut; Stichprobe 09 übernommen |
| Lagerregeln | BfR-Werte, bewusst strenger: Kühlschrank max. 2 Tage; Reis, Nudeln, Fisch, Hack, Ei max. 1 Tag; ungekühlt max. 2 h; aufwärmen ≥ 70 °C 2 Min. | eingebaut (C9) |
| Regel „nach dem Öffnen kühlen“ | Ohne Kühlschrank plant der Planer kein Rezept, das eine kühlpflichtige Packung angebrochen zurücklässt (mehr als 20 % Rest) | **eingebaut** in `planer.js` (Funktion `angebrochen`) |
| Rezepte | 195 eigene Rezepte (KI-Entwurf → automatische Prüfung → fachliche Zweitprüfung), Status „nicht testgekocht“ | 12 geprüft; Testkochen offen |
| Planer | Regeln + Optimierung im Browser, fester Startwert, kein LLM; < 0,3 s; trifft die Makros im Test zu 94–100 % | 21 Planer-Tests grün |
| Freischalten | Lizenzschlüssel per E-Mail, Prüfung offline im Browser, kein Login | 5 Lizenz-Tests grün |
| Plattform | PWA, statisch gehostet (0–5 €/Monat), offline nutzbar | eingebaut |

**Offene technische Punkte:** iPhone-Test auf Datenverlust nach 7+ Tagen ohne Nutzung (06, Kurzfazit; 11, A). Export und Import des Profils als Datei fehlen noch. Ein Status-Feld je Rezept (geprüft, Prüfer, Datum, testgekocht) fehlt noch (11, Punkt 5).

---

## 6. Recht und Steuern (07, mit Korrekturen aus 10)

Ampel: 🟢 geklärt und einfach · 🟡 lösbar, Entscheidung oder Prüfung nötig · 🔴 bei Fehlern teuer (Abmahnung), muss sauber gebaut werden.

| Thema | Ampel | Kern | Stand |
|---|---|---|---|
| Rechtsform | 🟢 | Einzelunternehmen, bestehendes Gewerbe um „Software/Web-Apps“ erweitern; UG erst bei höherem Gewinn oder Risiko | Empfehlung, Inhaber entscheidet mit Steuerberatung (R1) |
| Kleinunternehmer § 19 UStG | 🟡 | Grenzen 25.000 €/100.000 € gelten für **alle drei Projekte zusammen** | Steuerberatung offen |
| Umsatzsteuer | 🟡 | App/Abo 19 %, E-Book 7 % | – |
| Verkauf in EU/CH | 🟢 | Merchant of Record (Paddle 5 % + 0,50 $) übernimmt OSS, Schweizer MWST, Rechnungen | gewählt (P2) |
| Buchpreisbindung | 🟡 | gilt nicht für die App, aber für jedes beigelegte E-Book. Kein „E-Book gratis zum Abo“ | P3 |
| Kündigungsbutton § 312k BGB | 🔴 → 🟢 | ohne Login, auch für Pässe mit Einmalzahlung (BGH I ZR 161/24 ✅ 10). Keine Halteangebote (BGH I ZR 200/25). **Korrektur 10:** OLG Nürnberg lässt eine Ausnahme zu, wenn der Dienst ohnehin Login braucht; für die PWA ohne Konto ändert das nichts | Seite `kuendigen.html` gebaut (R2) |
| Widerrufsfunktion | 🔴 → 🟢 | **Korrektur 10:** in Deutschland umgesetzt als **§ 356a BGB**: Button „Vertrag widerrufen“, Bestätigung „Widerruf bestätigen“, Eingangsbestätigung mit Datum und Uhrzeit | Seite `widerrufen.html` gebaut |
| Datenschutz Art. 9 DSGVO | 🔴 → 🟡 | Allergien, Unverträglichkeiten, Gewicht = Gesundheitsdaten; „halal/koscher“ = religiöse Überzeugung. Lösung: **nur im Gerät speichern** | umgesetzt (C3) |
| Tracking / Meta | 🔴 | Pixel nur nach Einwilligung, nie Gesundheits-Ereignisse senden. Meta schränkt Gesundheits-Werbetreibende seit 2025 ein (Fitness betroffen) | vor Werbestart prüfen |
| Werbeaussagen | 🔴 | keine Abnehm-, Muskel- oder Krankheitsaussagen; „proteinreich“ nur bei ≥ 20 % Energie aus Protein | Regel R3 |
| Medizinprodukt (MDR) | 🟡 | kein Medizinprodukt, solange keine Krankheit genannt wird. Allergie-**Filter** ja, „Allergie-Sicherheit“ nicht versprechen | Diabetes-Nische deshalb ausgeschlossen |
| Produkthaftung | 🔴 | Richtlinie (EU) 2024/2853: Software gilt als Produkt, Haftung für Personenschäden ohne Verschulden, Umsetzungsfrist 09.12.2026 | Versicherung (200–600 €/Jahr) noch nicht abgeschlossen |
| Marke | 🟡 | DPMA 290 € für 3 Klassen (✅ 10); Register war technisch nicht abfragbar | **Inhaber prüft DPMA/EUIPO** (B6) |
| Impressum | 🟢 | § 5 DDG, ohne OS-Link | Seite gebaut |

**Kosten Recht und Gründung:** einmalig ca. 500–1.200 € schlank, ca. 1.600–3.700 € mit Anwalt. Laufend ca. 1.400–3.800 € pro Jahr ohne Zahlungsgebühren (07, 11). **Hinweis:** Die Anwaltsprüfung (800–2.000 €) ist in den Startkosten der Szenarien (08) noch **nicht** enthalten (11, E).

**Grenze:** Alle rechtlichen Aussagen stammen aus einer Recherche, nicht aus einer anwaltlichen Prüfung. Vor dem Start schaut eine echte Kanzlei auf Kasse, Kündigung und Datenschutz.

---

## 7. Geschäftsmodell und Unit Economics (08, ENTSCHEIDUNGEN P1–P4)

**Preise (P1, zentral änderbar in `config.js`):**

| Stufe | Preis | Inhalt |
|---|---|---|
| Gratis | 0 € | 1-Tages-Plan mit Einkaufsliste, unbegrenzt oft (C10) |
| Plus Monat | 6,99 € | bis 14 Tage, Vorkoch-Ablauf, PDF |
| Plus Jahr (vorgewählt) | 44,99 €, 7 Tage 0 € | wie Monat |
| Montage-Pass | 17,99 € für 3 Monate, endet automatisch | wie Plus |
| Camping-Saisonpass | 24,99 € für 6 Monate, endet automatisch | wie Plus |

**Zahlen aus dem Modell (08, gerechnet mit Stripe):**

| Kennzahl | Wert | Fundstelle |
|---|---|---|
| Netto je Zahlung nach 19 % USt und Gebühren | 5,37 € (Monat) · 36,24 € (Jahr) · 14,43 € (Pass) | 08, 0 |
| Mehrkosten Paddle statt Stripe | ca. 0,30–1,10 € je Zahlung | 08, 0 |
| Kundenwert (LTV) realistisch, Mix | 36,28 € | 08, 3.2 |
| **Ziel-CAC** (LTV ÷ 3) | **≈ 12 €** | 08, 3.2 |
| **Werbekosten je Kunde** (konservativ / realistisch / optimistisch) | **281 € / 83 € / 35 €** | 08, 3.5 |
| Fixkosten | ca. 90–150 €/Monat | 08, 2.3 |
| Break-even der Fixkosten | ca. 30–40 Zahlende | 08, 3.3 |
| Zahlende nach 12 Monaten | 11 / 79 / 452 | 08, 3.7–3.9 |
| Ergebnis kumuliert nach 12 Monaten | −3.654 € / −2.081 € / +3.235 € | 08, 3.7–3.9 |

**Was das heißt:** Werbung allein trägt das Projekt nicht. Der größte Hebel ist der Anteil Besucher → Käufer und die kostenlose Reichweite (08, 3.10). Für die Besucherzahlen gibt es **noch keinen gemessenen Wert** (11, Punkt 1). Deshalb sind Werbetests gedeckelt: höchstens 150 € je Nische, mit Abbruchregel (P4).

**Noch nicht nachgerechnet:** Seit 08 haben sich drei Annahmen geändert: Paddle statt Stripe (P2), der Gratis-Tag ist unbegrenzt statt „1 Tagesplan pro Woche“ (C10), und es gibt einen Camping-Saisonpass (P1). Dazu fehlen Anwalt und Versicherung in den Startkosten. Die Szenarien müssen mit diesen Werten neu gerechnet werden (`finanzen/szenarien.csv`).

**Web-App statt App-Store:** Bei 44,99 € bleiben in der PWA 36,24 €, im App Store 32,14 € (15 %) bzw. ca. 28,00 € (26 % EU-Standard ab 01.10.2026) (08, 5; ✅ 10).

---

## 8. Nischenwahl und Markenarchitektur

**Architektur (A1):** eine Technik (ein Planer, eine Rezeptdatenbank, eine Kasse), eine kleine Dachmarke Tellerkontor, vier Nischen-Marken mit eigener Landingpage, eigenem Stil und eigener Ansprache. Begründung: Nischen-Anzeigen wirken nur mit Nischen-Absender. Vier getrennte Produkte würden die Pflege vervierfachen.

**Dritte Nische (A2, 04):** 16 Kandidaten nach 8 Kriterien bewertet.

| Platz | Kandidat | Score (Basis) | Umgang |
|---|---|---|---|
| 1 | **Camping** (Reisemobil, Van, Wohnwagen, Dauercamper) | 4,05 (weit gefasst 4,20) | eigene Marke Zweiflammer |
| 2 | Airfryer-Haushalte | 3,60 | Filter, keine Zielgruppe |
| 3 | Familien mit kleinem Budget / Alleinerziehende | 3,55 / 3,50 | Modus in Wochenschmaus, später eventuell vierte Nische |
| – | Pflegekräfte, Eltern Kleinkinder | 3,30 / 3,55 | ausgeschlossen: nehmen DURCHSCHICHT bzw. Honigmama Kunden weg |
| – | Diabetes | 3,35 | ausgeschlossen: Art. 9 DSGVO, MDR, Health-Claims |

**Belastbarkeit:** Camping bleibt in allen 8 Gewichtungen vorn. Am knappsten ist es, wenn der Schmerz stärker zählt (Vorsprung 0,05). Kippt die Zahlungsbereitschaft auf 3 Punkte, gewinnt eine andere Nische (04, 3).

**Reihenfolge im Marketing (A3):** Alle vier Landingpages sind bereit. Aktiv beworben wird eine Nische nach der anderen: 1. Montage (sofort), 2. Camping (ab Februar, Saison März bis September), 3. Fitness. „Alltag“ läuft über Suchmaschinen.

**Namen (B1–B5):** Tellerkontor, Zimmerherd, Kochsatz, Zweiflammer, Wochenschmaus. Alle .de und .com frei (RDAP 29.10.2026). Web-Suche ohne Kollision. **Kein Ergebnis aus DPMA/EUIPO**, weil die Register sich nicht automatisch abfragen ließen. Das muss der Inhaber vor Logo-Druck, Domain-Kauf und Werbung prüfen (Namen, Abschnitt 9).

---

## 9. Qualitätssicherung

### 9.1 Faktencheck (10)

| | Wert |
|---|---|
| Geprüfte Links | 122 von 455 eindeutigen Links = **27 %** (jeder Bericht mindestens 23 %) |
| Ergebnis | 97 ✅ bestätigt · 14 ⚠️ abweichend · **0 ❌ falsch** · 11 🚫 nicht abrufbar (8 davon über Ersatzquelle bestätigt) |
| Abweichungsquote | 12,6 % der abrufbaren Punkte, fast immer veraltete Zahl oder ungenauer Verweis |
| Zitate | 33 wörtlich geprüft, 0 Abweichungen |
| Wichtigste Korrekturen | Berufskraftfahrer 547.919 · Camping-Umsatz −6,5 % · Cookidoo 69,99 € · Mealime eingestellt · mise-Jahrespreise 29,99–59,99 € · HelloFresh-Preis von 2022 · § 356a BGB · OLG-Nürnberg-Ausnahme |

Die Teilberichte 01–08 selbst wurden **nicht** geändert. Die Korrekturen gelten über diesen Gesamtbericht und die Liste in 10, Abschnitt 6.

### 9.2 Rezeptprüfung (12)

| | vorher | nachher |
|---|---|---|
| Rezepte, alle vollständig fachlich gelesen | 195 | 195 |
| Befunde kritisch / mittel / leicht | 1 / 37 / 25 | kritische und mittlere behoben, 25 leichte aufgelistet |
| Rezepte mit Tag „ohne Kühlschrank“ | 41 | 20 (21 ließen angebrochene Kühl-Packungen zurück) |
| Rezepte mit mehr als 6 g Salz je Portion | 5 (max. 7,6 g) | 0 |
| Heil- oder Abnehmversprechen | 0 | 0 |

Der kritische Befund war eine Allergen-Entwarnung im Tipp („dann ist das Frühstück milchfrei“, F11). Sie ist korrigiert. **Grenze:** Die Prüfung hat eine KI-Rolle gemacht, kein Mensch. Gekocht wurde noch nichts.

### 9.3 Preisstichprobe (09)

| | Wert |
|---|---|
| Geprüfte Zutaten | 56, davon 37 mit vergleichbarem belegtem Preis |
| Abweichung unserer Schätzung | Mittel −6,0 %, Median −4,0 %, mittlere absolute Abweichung 18,9 % |
| Zu billig geschätzt | Fleisch, Fisch, Aufschnitt (Hähnchenbrust +26 %, Hack +16 bis +32 %, Kochschinken +48 %) |
| Zu teuer geschätzt | Butter −46 %, Wraps −45 %, Kochbeutelreis −39 %, Nudeln −22 % |
| Übernommen | **31 Preise** korrigiert (10 zu niedrig, 16 zu hoch, 5 kleine Anpassungen); Ladenfaktor Rewe 1,08 → 1,03, Edeka 1,10 → 1,05 |
| Nicht belegt | Obst und Gemüse, einige Konserven, Kaufland |
| Recht | nur einzelne öffentliche Seiten, keine Sperren umgangen (403 hingenommen) |

---

## 10. Offene Lücken

| # | Lücke | Warum wichtig | Wer / wie |
|---|---|---|---|
| 1 | **Zahlungsbereitschaft nicht gemessen** (keine Interviews, kein Preistest) | trägt Nische, Preis und Positionierung | 5–10 Interviews je Nische, Warteliste mit Preis (A4) |
| 2 | **Organische Reichweite nicht gemessen** | alle Szenarien hängen daran | 4 Wochen Landingpages ohne Werbung |
| 3 | **Kassenbon-Test** fehlt | Kernversprechen „Kosten stimmen“ | 6 Wochenpläne nachkaufen oder als Warenkorb nachbauen; Inhaber fotografiert Kassenbons (09, 7) |
| 4 | **Testkochen** fehlt | Rezepte sind nur am Schreibtisch geprüft | Inhaber kocht 20 Montage-Rezepte mit Wasserkocher und Mikrowelle |
| 5 | **Menschliche Fachprüfung** (Ökotrophologie, Anwalt) fehlt | Haftung, Abmahnrisiko | Werkvertrag Ökotrophologin; Kanzlei für Kasse, Kündigung, Datenschutz |
| 6 | DPMA/EUIPO-Recherche der Namen | Kollisionsrisiko | Inhaber, Anleitung in `marke/Namen_und_Pruefung.md` Abschnitt 9 |
| 7 | Gesperrte Quellen: Reddit, Facebook-Gruppen, YouTube, Google Play, Meta-Werbebibliothek | Stimmen und Konkurrenz-Werbung fehlen | Inhaber im Browser |
| 8 | Viele Montage-Belege sind alt (2012–2016) oder aus den USA | Aktualität | Interviews |
| 9 | Szenarien mit Paddle, Gratis-Tag, Saisonpass, Anwalt und Versicherung neu rechnen | Zahlen in 08 sind teils überholt | Finanzanalyse |
| 10 | Rezept-Status-Feld, Abdeckungstest der 20 häufigsten Filter-Kombinationen, Profil-Export | Planer darf nicht leer oder eintönig planen | Entwicklung |
| 11 | Preise für Obst, Gemüse und Kaufland | Lücke in 09 | Kassenbon |
| 12 | B2B (Montagefirmen, Personaldienstleister): keine Daten zur Zahlungsbereitschaft | möglicher größerer Hebel | 10 Gespräche |
| 13 | `marketing/Launchplan.md` mit Abbruchkriterien ist in ENTSCHEIDUNGEN A3/A4/P4 genannt, aber noch nicht geschrieben | Abbruchregeln müssen schriftlich stehen | Phase B; Kriterien vorläufig in der Entscheidungsvorlage |
| 14 | PDF-Fassung dieses Berichts | Auftrag 3 verlangt Markdown + PDF | nach Freigabe durch den Inhaber |

---

## 11. Abnahme Phase A

Prüfung gegen `AUFTRAG.md`, Abschnitt 9 „Recherche (Phase A) ist fertig, wenn …“.

| # | Kriterium | Ergebnis | Beleg |
|---|---|---|---|
| 1 | Jede Zahl hat eine Quelle mit Link und Datum, unsichere Zahlen sind als Schätzung markiert | **teilweise** | Die Berichte trennen „belegt“, „Schätzung“ und „nicht gefunden“ (01 Methodik, 04 [Q]/[S], 06 [belegt]/[unsicher], 08 [Annahme]). Abrufdatum steht in jedem Bericht. Lücken: einige Werte ohne Jahr („Jahr n. v.“, 01, 2.1 und 6.1), ein Statista-Wert hinter Paywall, 5 tote Links (10, Korrekturen 17–20). Die Korrekturen aus 10 stehen in diesem Bericht, die Teilberichte selbst sind noch nicht nachgezogen. |
| 2 | Je Nische mindestens 15 echte Kundenzitate/Schmerzpunkte mit Fundstelle | **erfüllt** | Montage 44 (02), Fitness 35 (03 A), Allgemein 42 (03 B), Camping 30 (04, 5.2). 33 Zitate wörtlich nachgeprüft, 0 Abweichungen (10). Vorbehalt: Montage-Belege oft alt, 14 aus den USA, einige nur aus Suchauszügen. |
| 3 | Mindestens 15 Wettbewerber in einer Vergleichstabelle | **erfüllt** | 32 Anbieter in 05, 1; Lückenmatrix mit 25 Zeilen in 05, 4; 20 davon in Abschnitt 4 dieses Berichts. Vorbehalt: Konkurrenz-Werbung nicht auswertbar (Meta-Bibliothek gesperrt). |
| 4 | Ein Faktencheck-Agent hat stichprobenartig 20 % der Quellen geprüft | **erfüllt** | 122 von 455 eindeutigen Links = 27 %, jeder Bericht ≥ 23 %; 0 falsche Angaben (10). Hinweis: 09 und 12 sind nach dem Faktencheck entstanden und nicht Teil der Stichprobe. |
| 5 | Der Advocatus Diaboli hat seine Einwände geliefert, und sie sind beantwortet | **erfüllt** | 5 Schwachstellen + 5 Kurz-Einwände (11). Alle Felder „Antwort des Teams“ sind ausgefüllt, mit Stand „umgesetzt“ bzw. „offen“. Mehrere Antworten sind Zusagen, die erst vor dem Launch eingelöst werden (Interviews, Testkochen, Kassenbon, Anwalt). |
| 6 | Es gibt eine Entscheidungsvorlage mit klarer Empfehlung | **erfüllt** | `Entscheidungsvorlage.md`: Empfehlung, 8 Entscheidungen mit Alternative, Kästchen zum Ankreuzen, Abbruchkriterien. |

**Weitere Punkte aus Auftrag Abschnitt 3 (nicht in der Definition of Done, aber verlangt):**

| Punkt | Ergebnis |
|---|---|
| Marktgröße DE/DACH je Nische | erfüllt, mit Schätzungen und Lücken (01, 04) |
| Zahlungsbereitschaft je Nische | teilweise: nur Indizien, nicht gemessen |
| Werbe-Creatives der Konkurrenz (Meta-Bibliothek) | nicht erfüllt: technisch gesperrt, Aufgabe für den Inhaber (05, 3.3) |
| Datenquellen, Preise, Rezepte, Algorithmus | erfüllt (06, 09, 12) |
| Recht und Gründung | erfüllt als Recherche, anwaltliche Prüfung offen (07) |
| Markenrecherche DPMA/EUIPO | teilweise: RDAP erledigt, Register nicht abfragbar (Namen, Abschnitt 2) |
| Geschäftsmodell, Unit Economics, Szenarien | erfüllt, Nachrechnung nach den Entscheidungen offen (08) |
| Bericht als Markdown **und PDF** | teilweise: Markdown fertig, PDF offen |

**Gesamturteil Abnahme Phase A: bestanden mit Auflagen.** Die Recherche reicht, um zu entscheiden, *ob* und *in welcher Reihenfolge* gestartet wird. Sie reicht **nicht**, um Werbegeld auszugeben. Die Auflagen sind die Validierungsschritte aus der Entscheidungsvorlage (Interviews, Warteliste mit Preis, Kassenbon, Testkochen, Anwalt), jeweils mit Abbruchkriterium.
