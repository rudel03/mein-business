# Auftrag: Essensplaner (Arbeitstitel) – digitales Produkt von der Idee bis zum Launch

Stand: 28.10.2026 · Auftraggeber: Inhaber von `mein-business`

Lies zuerst `../CLAUDE.md` (Regeln für alle Projekte) und `../durchschicht/CLAUDE.md` + `../durchschicht/README.md`. DURCHSCHICHT ist der Qualitätsmaßstab: Dieses Projekt soll mindestens genauso gründlich recherchiert, durchdacht und umgesetzt werden. Der Inhaber will keine Kleinigkeit vergessen haben. Arbeite Schritt für Schritt, hake ab und belege jede Aussage.

---

## 1. Die Produktidee (Worte des Inhabers, sinngemäß)

Ein digitales Produkt, das Kunden die tägliche Last abnimmt zu überlegen, **was** sie kochen und **womit**.
- Kunden kreuzen an, **welche Geräte sie haben oder nicht haben**: Ofen, Airfryer, Pfanne, Topf, Mikrowelle, Wasserkocher, Herdplatte, Kühlschrank, Gefrierfach, Thermobehälter … was auch immer.
- Sie wählen ein **Budget**, einen **Laden ihrer Wahl** (Aldi, Lidl, Rewe, Edeka, Kaufland, Netto, Penny …), Personenzahl, Allergien, Abneigungen und **Ernährungsform/Diät**.
- Für Fitness-Leute: **Makros** einstellen (Kalorien, Protein, Kohlenhydrate, Fett).
- Ergebnis: ein **Plan für den Tag, die Woche oder länger**, mit Rezepten, Einkaufsliste, Kosten, Vorkoch-Ablauf (Meal-Prep), Lagerhinweisen und Export (PDF/Handy).
- Zielgruppen: Schichtarbeitende, **Monteure / Leute auf Montage in Unterkünften** (Pension, Monteurzimmer, Wohnmobil, oft nur Wasserkocher, Mikrowelle oder 1–2 Herdplatten, kleiner oder kein Kühlschrank), **Fitness-Leute** und Normalverbraucher.

## 2. Gewünschte Varianten (jede als eigene, vollständig ausgearbeitete Variante)

1. **Montage-Variante:** Monteure, Außendienst, Bau, Fernfahrer, Leute in Unterkünften.
2. **Fitness-Variante:** Makros, Muskelaufbau, Definition, Meal-Prep.
3. **Eine weitere Nische deiner Wahl.** Sie muss laut Recherche profitabel sein (Zahlungsbereitschaft, Größe, Erreichbarkeit, wenig Konkurrenz). Finde mehrere Kandidaten, vergleiche sie mit Zahlen und begründe die Wahl. Beispiele zum Prüfen, nicht vorgegeben: Studierende/WG, Alleinerziehende, Senioren, Pflegekräfte (Überschneidung mit DURCHSCHICHT), Familien mit kleinem Budget, Camper/Vanlife, Bürgergeld-Budget, Diabetes-Lifestyle (Achtung Health-Claims) …
4. **Allgemeine Variante** für alle.

Zu klären: Sind das getrennte Marken/Produkte, eine Marke mit Modi oder eine Plattform mit Nischen-Landingpages? Empfehlung mit Begründung.

## 3. Phase A – Recherche (vor jeder Entwicklung, alles mit Quellen)

Ergebnis als ausführlicher Bericht in `essensplaner/recherche/` (Markdown + PDF). Mehrere Recherche-Agenten parallel sind ausdrücklich erlaubt.

**Markt & Zielgruppen**
- Marktgröße DE/DACH: Meal-Planning-Apps, Meal-Prep, Fitness-Ernährung, Zahl der Monteure, Schichtarbeitenden und Fitnessstudio-Mitglieder (Destatis, BAuA, DSSV, Statista-Zahlen nur mit Quelle).
- Echte Schmerzpunkte jeder Nische aus Foren, Reddit, Facebook-Gruppen, YouTube-Kommentaren, App-Store-Rezensionen (1–3 Sterne der Konkurrenz!), Monteur-Foren und Unterkunfts-Bewertungen. Zitate sammeln.
- Zahlungsbereitschaft und Kaufverhalten je Nische.

**Wettbewerb**
- Vollständige Liste: Eat This Much, Mealime, Samsung Food (Whisk), Plan to Eat, PlateJoy, Yazio, MyFitnessPal, Lifesum, Fddb, Kitchen Stories, Chefkoch, Cookidoo, KptnCook, HelloFresh/Marley Spoon (als Alternative), deutsche Meal-Prep-Coaches, Excel/Notion-Vorlagen auf Etsy …
- Je Anbieter: Funktionen, Preise, Zielgruppe, Bewertungen, Schwächen, Marketing-Kanäle und Ad-Creatives (Meta-Werbebibliothek, sofern erreichbar).
- Lückenanalyse: Was löst niemand? (Gerätefilter, Unterkunft, deutsche Läden, Budget …)

**Daten & Machbarkeit**
- Nährwertdaten: BLS (Lizenz/Kosten), USDA FoodData Central, Open Food Facts (ODbL-Pflichten), CIQUAL – Lizenz, Qualität, Eignung für DE-Produkte.
- **Supermarktpreise:** Welche legalen Wege gibt es (offizielle APIs, Partnerprogramme, Prospekt-Daten, manuelle Pflege, Preisniveaus statt Einzelpreisen)? Rechtliche Lage beim Scrapen (Datenbankherstellerrecht §§ 87a ff. UrhG, AGB). Lösung mit Begründung.
- Rezeptquelle: eigene Rezepte (Higgsfield-Fotos), Lizenzen, KI-generiert und geprüft? Qualitätssicherung.
- Planungs-Algorithmus: regelbasiert, Optimierung (z. B. lineare Optimierung für Makros und Budget), LLM-unterstützt? Kosten pro Plan und Zuverlässigkeit.

**Recht & Gründung (DE)**
- Gewerbeanmeldung, Kleinunternehmerregelung vs. Regelbesteuerung, USt auf digitale Dienste/Abos (OSS bei EU-Kunden), Rechtsform (Einzelunternehmen/UG), Kosten.
- Abo-Recht: Kündigungsbutton (§ 312k BGB), Laufzeiten, Widerruf bei digitalen Diensten, Preisangaben, AGB, Datenschutz (Gesundheitsdaten? Makros/Gewicht/Allergien = Art. 9 DSGVO prüfen!), Impressum.
- Health-Claims-VO, HWG und UWG: Was darf Fitness-/Diät-Marketing sagen, was nicht? Keine Medizinprodukt-Abgrenzungsprobleme (MDR) durch Diätfunktionen?
- Markenrecherche (DPMA/EUIPO) und Domain-Verfügbarkeit (RDAP) für alle Namensvorschläge.

**Geschäftsmodell & Pricing**
- Einmalkauf vs. Abo vs. Freemium vs. Lifetime vs. Bundle mit E-Books (Honigmama/DURCHSCHICHT). Benchmarks der Konkurrenz und Preispsychologie.
- Unit Economics: Hosting, Daten, KI-Kosten pro Nutzer, Zahlungsgebühren (Stripe/PayPal/App-Stores 15–30 %), Ziel-CAC, LTV, Break-even. Szenario-Rechnung (konservativ/realistisch/optimistisch).
- Web-App vs. native App vs. PWA: Kosten, Store-Gebühren, Reichweite. Empfehlung.

## 4. Phase B – Strategie & Marke (für jede Variante)

- Positionierung, Kernversprechen, Zielgruppen-Personas.
- **Namen:** mindestens 10 Vorschläge je Variante bzw. für die Dachmarke, mit DPMA- und Domain-Check, dann Auswahl mit Begründung.
- Markenbuch wie bei DURCHSCHICHT: Farben, Schriften (lokal gehostet), Logo als echte Pfade, Bildstil, Tonalität, Do & Don't. **Jede Nische mit eigenem, klar unterscheidbarem Stil.** Auch anders als Honigmama und DURCHSCHICHT.
- **Marketing-Angles:** je Variante mindestens 8 Nischen-Angles, die noch kaum jemand nutzt, die Sinn ergeben und echte Probleme lösen (Belege aus der Recherche).
- Kanäle je Nische (z. B. Monteure: Facebook-Gruppen, TikTok, Monteurzimmer-Portale, Kooperationen mit Montagefirmen/Leiharbeit; Fitness: Instagram/TikTok-Creator, Studios).

## 5. Phase C – Produkt bauen

- Technisches Konzept und Architektur-Entscheidung (dokumentiert in `essensplaner/CLAUDE.md`).
- Rezept-Datenbank mit Tags: Geräte, Zeit, Kosten/Portion, Nährwerte, Allergene, Diät, Haltbarkeit/Lagerung (Regeln wie in DURCHSCHICHT: BfR/BZfE-Quellen), Eignung für Unterkunft, Meal-Prep-fähig. Startumfang realistisch (z. B. 120–200 Rezepte), Fotos mit Higgsfield **in verschiedenen Stilen je Nische**.
- Planer-Logik: Geräte, Budget/Laden, Makros/Diät, Personen, Zeitraum → Plan + Einkaufsliste (nach Laden-Abteilungen sortiert) + Kosten + Vorkoch-Ablauf + Export. Mit automatischen Tests.
- Onboarding, Konto, Bezahlung/Abo, Kündigung (gesetzeskonform), Datenschutz.
- Kostenloser Lead-Magnet je Nische (wie der Schichtplan-Rechner bei DURCHSCHICHT).
- Erst eine kleine Version (MVP), dann ausbauen. Jeden Schritt mit Screenshots (Desktop + Handy) prüfen.

## 6. Phase D – Launch & Marketing

- Landingpages je Variante, SEO (Keyword-Recherche je Nische), Rechtstexte-Entwürfe.
- Ad-Creatives mit Higgsfield: je Angle Bilder **und** kurze Videos (Reels/TikTok), Texte, Zielgruppen, Budget- und Teststruktur.
- E-Mail-Strecken (Double-Opt-in), Onboarding-Mails, Rückgewinnung von Kündigern.
- Launch-Plan mit Zeitachse, KPIs und Auswertungsregeln. Was der Inhaber selbst tun muss, klar markiert.
- Cross-Selling mit Honigmama und DURCHSCHICHT prüfen.

## 7. Arbeitsregeln

- Ordner `essensplaner/` mit eigener `CLAUDE.md` (Stand, Entscheidungen, Fallstricke) anlegen und **nach jeder Arbeitsrunde committen und pushen**.
- Regeln aus `../CLAUDE.md` gelten: Higgsfield für Content, keine unbelegten Aussagen, keine Heil- oder Abnehmversprechen, Live-Themes nie direkt ändern, Double-Opt-in.
- Bei Entscheidungen, die nur der Inhaber treffen kann (Geld, Rechtsform, Name, Preis), Optionen mit Empfehlung vorlegen und fragen. Alles andere selbst entscheiden und dokumentieren.
- Am Ende jeder Phase eine kurze Zusammenfassung für den Inhaber (Deutsch, verständlich, ohne Fachchinesisch) plus die Dateien.

---

## 8. Arbeite wie ein Expertenteam

Jede Aufgabe wird von der passenden Rolle erledigt und von mindestens einer **anderen** Rolle geprüft, bevor sie als fertig gilt. Für parallele Recherche und unabhängige Prüfungen Sub-Agenten mit der jeweiligen Rolle einsetzen. Prüfer bekommen nur das Ergebnis, nicht den Lösungsweg, damit sie unvoreingenommen sind.

| Rolle | Verantwortung | Prüft auch |
|---|---|---|
| **Marktforscher:in** | Marktgrößen, Zielgruppen, Schmerzpunkte, Zitate, Quellen | Positionierung |
| **Wettbewerbsanalyst:in** | Konkurrenz, Preise, Bewertungen, Ads, Lücken | Pricing, Angles |
| **Produktmanager:in** | Varianten, Funktionsumfang, MVP-Schnitt, Prioritäten, Roadmap | alles gegen den Nutzen für Kunden |
| **Ernährungsfachkraft (Ökotrophologie)** | Rezepte, Nährwerte, Makro-Logik, Allergene, Lagerung (BfR/BZfE/DGE) | Marketing-Aussagen auf fachliche Richtigkeit |
| **Jurist:in (IT-, Wettbewerbs-, Lebensmittelrecht)** | Gründung, Abo-Recht, DSGVO (Art. 9), Health-Claims, UWG, Marken | jeden Werbetext, jede Landingpage, jeden Checkout |
| **Steuerberater:in** | Rechtsform, USt/OSS, Kleinunternehmer, Kosten | Unit Economics |
| **Finanzanalyst:in** | Unit Economics, CAC/LTV, Szenarien, Break-even | Pricing |
| **Brand-Strateg:in & Designer:in** | Namen, Markenbücher, Logos, Bildstil je Nische | UI, Ads, Landingpages (Design-Kritik) |
| **UX-Designer:in** | Onboarding, Formulare, Plan-Darstellung, Handy zuerst, Barrierefreiheit | Produkt-Screenshots |
| **Software-Architekt:in & Entwickler:in** | Architektur, Datenmodell, Planer-Algorithmus, Bezahlung, Tests, Sicherheit | technische Machbarkeit aller Ideen |
| **QA-Tester:in** | automatische Tests, Grenzfälle (keine Geräte, Mini-Budget, widersprüchliche Makros, Allergien), Handy/Desktop | jede Version vor der Abnahme |
| **Performance-Marketer:in** | Angles, Creatives, Zielgruppen, Teststruktur, KPIs | Landingpages auf Conversion |
| **Copywriter:in** | alle Texte auf Deutsch, Tonalität je Nische | — |
| **SEO-Spezialist:in** | Keywords je Nische, Seitenstruktur, Inhalte | — |
| **Advocatus Diaboli** | sucht am Ende jeder Phase die 5 größten Schwachstellen und Gründe, warum es scheitern könnte | alles |

## 9. Qualitätsregeln (Definition of Done)

**Recherche (Phase A) ist fertig, wenn:**
- jede Zahl eine Quelle mit Link und Datum hat und unsichere Zahlen als Schätzung markiert sind,
- je Nische mindestens 15 echte Kundenzitate/Schmerzpunkte mit Fundstelle gesammelt sind,
- mindestens 15 Wettbewerber in einer Vergleichstabelle stehen,
- ein Faktencheck-Agent stichprobenartig 20 % der Quellen geprüft hat,
- der Advocatus Diaboli seine Einwände geliefert hat und diese beantwortet sind,
- es eine Entscheidungsvorlage für den Inhaber mit klarer Empfehlung gibt.

**Strategie & Marke (Phase B) ist fertig, wenn:**
- jeder Name per DPMA/EUIPO und RDAP geprüft ist,
- jede Variante ein eigenes Markenbuch, Logo-Dateien und 3 Beispielbilder (Higgsfield) hat,
- jeder Angle mit einem Recherche-Beleg verknüpft ist,
- Jurist:in und Ernährungsfachkraft alle Claims freigegeben haben.

**Produkt (Phase C) ist fertig, wenn:**
- automatische Tests für Planer-Logik, Einkaufsliste, Makros und Budget laufen und grün sind,
- Grenzfälle getestet sind und es keine Abstürze oder leeren Pläne gibt (bei Unmöglichem eine verständliche Meldung),
- Screenshots (Handy + Desktop) aller Hauptseiten geprüft sind und es keinen horizontalen Scroll gibt,
- Lighthouse Performance und Barrierefreiheit jeweils mindestens 90 erreichen,
- Kündigungsbutton, Widerruf, Datenschutz und Impressum vorhanden sind (Entwürfe, vom Inhaber prüfen lassen),
- keine Rezept-Kombination die Lagerregeln verletzt (wie bei DURCHSCHICHT).

**Launch (Phase D) ist fertig, wenn:**
- je Variante Landingpage, mindestens 8 Bild-Creatives, mindestens 3 Video-Creatives, Anzeigentexte und Zielgruppen bereitstehen,
- Tracking (Pixel/Conversions-API) und Testkauf funktionieren,
- ein Launch-Kalender mit Verantwortlichkeiten (Claude / Inhaber) existiert.

## 10. Laufende Dokumentation in `essensplaner/`

- `CLAUDE.md`: Stand, offene Aufgaben, Fallstricke (nach jeder Runde aktualisieren).
- `ENTSCHEIDUNGEN.md`: jede wichtige Entscheidung mit Datum, Optionen, Begründung und wer entschieden hat.
- `RISIKEN.md`: Risiko, Wahrscheinlichkeit, Auswirkung, Gegenmaßnahme.
- `recherche/`, `marke/`, `app/`, `marketing/`, `recht/`, `finanzen/` als Unterordner.
