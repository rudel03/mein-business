# Entscheidungen

Jede Entscheidung mit Datum, Optionen, Begründung und wer entschieden hat. **„Claude (autonom)“ heißt: von dir noch nicht bestätigt.** Alles ist so gebaut, dass du es leicht ändern kannst – die Spalte „Ändern in“ sagt, wo.

Belege stehen in `recherche/01`–`12`. Kurz: 01 Markt, 02 Stimmen Montage, 03 Stimmen Fitness/Allgemein, 04 Nischenvergleich, 05 Wettbewerb, 06 Daten & Machbarkeit, 07 Recht & Steuern, 08 Pricing & Unit Economics, 09 Preisstichprobe, 10 Faktencheck, 11 Advocatus Diaboli, 12 Rezeptprüfung.

## A. Grundsatz

| # | Datum | Thema | Entscheidung | Beste Alternativen | Begründung | Wer | Ändern in |
|---|---|---|---|---|---|---|---|
| A1 | 29.10.2026 | Markenarchitektur | **Eine Technik, eine Dachmarke (klein), vier Nischen-Marken** mit eigener Landingpage, eigenem Stil und eigener Ansprache | (a) eine Marke mit Modi; (b) vier getrennte Produkte | Nischen-Anzeigen wirken nur mit Nischen-Absender (Erfahrung DURCHSCHICHT); eine Technik hält den Aufwand für eine Person klein: ein Planer, eine Rezeptdatenbank, eine Kasse. (b) kostet vierfache Pflege. | Claude (autonom) | `app/public/js/config.js` → `varianten` |
| A2 | 29.10.2026 | Dritte Nische | **Camping-Küche** (Reisemobil, Van, Wohnwagen, Dauercamping) | Familien mit knappem Budget/Alleinerziehende (2. Platz, wird Modus in „Alltag“); Studierende | Score 4,05/5, in allen 8 Gewichtungen Platz 1; zahlungsfähige Zielgruppe 50–69 J.; Camping-E-Kochbücher werden schon für 14,99–17,99 € gekauft; kein vergleichbarer Planer (04). Pflege und Kleinkind-Eltern ausgeschlossen (würden DURCHSCHICHT/Honigmama Kunden wegnehmen), Diabetes ausgeschlossen (Art. 9 DSGVO, MDR, Health-Claims). | Claude (autonom) | `config.js`, Rezepte `C.json` |
| A3 | 29.10.2026 | Reihenfolge im Marketing | **Alle vier Landingpages bereit, aktiv beworben wird eine Nische nach der anderen:** 1. Montage (sofort), 2. Camping (ab Februar, Saison März–September), 3. Fitness, „Alltag“ über Suchmaschinen | alle gleichzeitig; nur Montage | Advocatus Diaboli (11): vier Marken für eine Person = Fokusrisiko. Montage hat die klarste Lücke (kein Monteur-Planer gefunden, 05) und das einfachste Angebot (Pass). | Claude (autonom) | `marketing/Launchplan.md` |
| A4 | 29.10.2026 | Validierung vor Ausgaben | **Vor bezahlter Werbung: Warteliste + 5–10 Interviews + Preis-Test je Nische**, Abbruchkriterien im Launchplan | gleich mit Anzeigen starten | Zahlungsbereitschaft ist nicht gemessen (11, Risiko 2). | Claude (autonom) | `marketing/Launchplan.md` |

## B. Namen und Marke

| # | Datum | Thema | Entscheidung | Beste Alternativen | Begründung | Wer | Ändern in |
|---|---|---|---|---|---|---|---|
| B1 | 29.10.2026 | Dachmarke | **Tellerkontor** | Kellenhaus, Kochbund | .de und .com frei (RDAP 29.10.2026); neutral, erweiterbar; steht nur klein in Fußzeile/Impressum | Claude (autonom) | `config.js` → `dachmarke`, dann `python3 tools/seiten.py` |
| B2 | 29.10.2026 | Montage | **Zimmerherd** – „Satt werden mit dem, was dasteht.“ | Topfkumpel, Feierabendtopf | Bild im Kopf (Herd im Zimmer), nicht rein beschreibend, Domains frei | Claude (autonom) | `config.js` → `varianten.montage` |
| B3 | 29.10.2026 | Fitness | **Kochsatz** – „Deine Makros. Dein Discounter. Dein Plan.“ | Repteller, Tellerhantel | Trainings-„Satz“ + Kochen; kein „Makro“ (Metro-Marke), kein Abnehm-Bezug | Claude (autonom) | `config.js` → `varianten.fitness` |
| B4 | 29.10.2026 | Camping | **Zweiflammer** – „Zwei Flammen. Eine Woche. Entspannt.“ | Bordtopf, Markisenküche | trifft die Bordküche (2-Flammen-Kocher), kein „Omnia“ (fremde Marke) | Claude (autonom) | `config.js` → `varianten.camping` |
| B5 | 29.10.2026 | Allgemein | **Wochenschmaus** – Claim „Die Woche ist geplant. Der Einkauf auch.“ | Tellerzettel, Löffelplan | warm, alltagstauglich; Namensagent-Claim „Jede Woche gut versorgt“ als Alternative | Claude (autonom) | `config.js` → `varianten.alltag` |
| B6 | 29.10.2026 | Markenprüfung | **DPMA/EUIPO-Recherche durch dich** (Register technisch nicht abrufbar, Websuche ohne Kollision) | – | Nichts erfinden: Registerergebnis fehlt, Anleitung in `marke/Namen_und_Pruefung.md` Abschnitt 9 | Claude | `FUER_DICH.md` |
| B7 | 29.10.2026 | Stile | Vier klar getrennte Stile: Montage „Baustellenlicht“ (Asphalt/Helmgelb, Archivo, Absperrband), Fitness „Kreidehalle“ (Eisblau, Space Grotesk, Makro-Balken), Camping „Stellplatz“ (Kiefer/Markisengelb, Zilla Slab, Markisenstreifen), Alltag „Wochenmarkt“ (Tomate/Basilikum, Bricolage Grotesque) | eine gemeinsame Optik | Auftrag verlangt unterscheidbare Stile; bewusst weg von Honigmama (Creme/Honig) und DURCHSCHICHT (Navy/Orange) | Claude (autonom) | `app/public/css/themes.css`, `marke/` |
| B8 | 29.10.2026 | Grundschrift | **Atkinson Hyperlegible** in allen Varianten, lokal gehostet | Inter, Systemschrift | entworfen für gute Lesbarkeit (ältere Camper, müde Monteure), OFL-Lizenz, Datenschutz (keine Google-Fonts-Anfrage) | Claude (autonom) | `app/public/css/app.css` |

## C. Produkt und Technik

| # | Datum | Thema | Entscheidung | Beste Alternativen | Begründung | Wer | Ändern in |
|---|---|---|---|---|---|---|---|
| C1 | 29.10.2026 | Plattform | **PWA (Web-App, installierbar, offline)**, kein App-Store | native App; Web + später Store | keine 15–30 % Store-Gebühr, kein Store-Prüfprozess, Kündigungsbutton selbst steuerbar (06, 08) | Claude (autonom) | – |
| C2 | 29.10.2026 | Technik | **Statische Seite, reines JavaScript ohne Framework**, Planer rechnet im Browser | React/Next.js; Server-Planer | Lighthouse 100, Hosting für ~0–5 €/Monat, keine Server-Daten = kein Art.-9-Problem | Claude (autonom) | `app/` |
| C3 | 29.10.2026 | Daten & Datenschutz | **Alle Eingaben (Allergien, Makros …) nur im Gerät**, kein Konto | Konto mit Server-Profil | Allergien/Unverträglichkeiten = Gesundheitsdaten (Art. 9 DSGVO); lokal entfällt DSFA/DSB-Pflicht (07 §4.3) | Claude (autonom) | – |
| C4 | 29.10.2026 | Plus freischalten | **Lizenzschlüssel per E-Mail (Ed25519-Signatur), Prüfung offline im Browser** | Konto + Login | kein Login nötig, Kündigung ohne Login ohnehin Pflicht (OLG Nürnberg 3 U 2214/23) | Claude (autonom) | `tools/lizenz.mjs`, `js/lizenz.js` |
| C5 | 29.10.2026 | Nährwerte | **BLS 4.0** (Max Rubner-Institut, CC BY 4.0, kostenlos) | USDA (CC0), Open Food Facts (ODbL, Share-Alike) | deutsche Referenzdatenbank, kommerziell nutzbar mit Quellenangabe | Claude | `app/data/bls_kompakt.csv` |
| C6 | 29.10.2026 | Preise | **Eigene Preistabelle (156 Zutaten, Discounter-Grundpreis) + Ladenfaktor**, als „Schätzung“ gekennzeichnet | Scraping; Partner-API | keine offizielle Händler-API; Scraping rechtlich riskant (§§ 87a ff. UrhG) und instabil (06); Stichprobe in 09 | Claude (autonom) | `app/data/zutaten.py`, `js/engine/laeden.js` |
| C7 | 29.10.2026 | Planer-Algorithmus | **Regeln + Optimierung (Simulated Annealing, fester Seed) im Browser**, kein LLM | Lineare Optimierung (HiGHS, 1,2 MB); LLM-Planer | < 0,3 s, deterministisch, keine Kosten je Plan, keine KI-Fehler bei Allergenen; trifft Makros im Test zu 94–100 % | Claude (autonom) | `js/engine/planer.js` |
| C8 | 29.10.2026 | Rezepte | **195 eigene Rezepte** (KI-Entwurf → automatische Prüfung → fachliche Zweitprüfung), Status „nicht testgekocht“ | lizenzierte Rezepte | Zutatenlisten nicht schutzfähig, Texte eigen; Testkochen durch dich vor Launch (FUER_DICH) | Claude | `app/data/rezepte/*.json` |
| C9 | 29.10.2026 | Lagerregeln | Kühlschrank max. 2 Tage; Reis/Nudeln/Getreide, Fisch, Hack, Ei max. 1 Tag; kalt mit Rohkost max. 1 Tag; ungekühlt max. 2 h; aufwärmen ≥ 70 °C 2 Min.; ohne Kühlschrank keine angebrochenen Kühl-Packungen | BfR 2–3 Tage | konservative Wahl wie bei DURCHSCHICHT (06 Tabelle L1–L12) | Claude | `data/build.py`, `js/engine/planer.js` |
| C10 | 29.10.2026 | Gratis-Umfang | **1-Tages-Plan mit Einkaufsliste unbegrenzt gratis**; Plus = bis 14 Tage, Vorkoch-Ablauf, PDF | 3-Tage-Plan gratis; nur Probeabo | Konkurrenz mise wird für „Nutzung nur mit Probeabo“ kritisiert (05); der Gratis-Tag zeigt den Nutzen sofort | Claude (autonom) | `config.js` → `kostenlos` |
| C11 | 29.10.2026 | Frische über die Tage (nach Advocatus Diaboli 13) | **Einkaufstage im Plan**: Nutzer wählt „einmal / zweimal pro Woche / fast täglich“ (Standard zweimal, Camping einmal), feste Kochtage gelten auch als Einkaufstage. Je Zutat Haltbarkeit nach dem Einkauf: Frischfleisch/-fisch 2 Tage, Hack 1, Obst/Gemüse aus der Kühlung 4, übrige Kühlware 5; ohne Kühlschrank Kühlware nur am Einkaufstag. Angebrochene Dosen (Flag o) mit Kühlschrank 2 Tage, ohne nur am selben Tag. Einkaufsliste nach Einkäufen getrennt | eine Liste für alles (alt); feste Einkaufstage ohne Wahl | Skyr ungekühlt 5 Tage, Hähnchen an Tag 13 – echte Sicherheitslücke. Die Wahl kostet einen Klick und erklärt sich selbst | Claude (autonom) | `js/engine/grundlagen.js` (`haltbarTage`), `einkauf.js`, `config.js` |
| C12 | 29.10.2026 | Protein pro Euro | Check zeigt nur die **Reihenfolge** und Protein je 100 g, keine €-Werte, bis der Kassenbon-Test bestanden ist | €-Werte mit Hinweis | Claim-Freigabe sperrt Euro-Aussagen | Claude (autonom) | `js/check.js`, `tools/landing.py` |
| C13 | 29.10.2026 | Warteliste | Formular mit eigener Einwilligung (nicht vorangekreuzt) auf jeder Landingpage, schickt an den Mail-Dienst (Double-Opt-in); ohne Adresse in `config.js` inaktiv | eigener Server | Validierung vor Werbegeld braucht messbare Anmeldungen (A4) | Claude (autonom) | `config.js` → `warteliste.url` |
| C14 | 29.10.2026 | Angle „Sonntagskiste“ | **zurückgestellt**, bis der Planer „zu Hause kochen, im Zimmer essen“ (zwei Geräteprofile) kann | jetzt schalten | würde etwas versprechen, das der Planer nicht abbildet (13, D-8) | Claude (autonom) | `marketing/Kampagnen.md` |

## P. Preise und Geld

| # | Datum | Thema | Entscheidung | Beste Alternativen | Begründung | Wer | Ändern in |
|---|---|---|---|---|---|---|---|
| P1 | 29.10.2026 | Preisstruktur | **Plus Monat 6,99 €, Plus Jahr 44,99 € (vorgewählt, 7 Tage 0 €), Montage-Pass 17,99 €/3 Monate, Camping-Saisonpass 24,99 €/6 Monate** (beide enden automatisch) | B: nur Pässe 17,99 €/49,99 €; C: 9,99 €/59,99 € | Median Planer-Apps 5,99–6,99 €/Monat, Jahr 30–60 € (05); mise 44,99 €; Pässe passen zu Montage-Einsätzen und Camping-Saison (08) | Claude (autonom) | `config.js` → `preise`, dann `python3 tools/seiten.py` |
| P2 | 29.10.2026 | Kasse | **Merchant of Record: Paddle** (übernimmt USt/OSS, Rechnungen) | Digistore24 (DE, 7,9 % + 1 €), Stripe (günstiger, aber USt selbst) | eine Person, Kunden in DE/AT/CH: MoR spart OSS und Schweizer MWST (07 §1.6) | Claude (autonom) | `config.js` → `kasse` |
| P3 | 29.10.2026 | Buchpreisbindung | App/Abo **nicht** preisgebunden; E-Books (Honigmama, DURCHSCHICHT) nie gratis oder verbilligt im Bundle; Cross-Selling nur als Hinweis/Link | Bundle mit Rabatt | BuchPrG gilt für E-Books, nicht für Software (07 §2) | Claude | – |
| P4 | 29.10.2026 | Werbebudget | **Nur gedeckelter Test (max. 150 € je Nische) mit Abbruchregel**, Schwerpunkt organisch | sofort skalieren | Ziel-CAC ≈ 12 € bei LTV ≈ 36 € (08); Advocatus: Werbung trägt sich anfangs nicht | Claude (autonom) | `marketing/Launchplan.md` |

## R. Recht und Gründung

| # | Datum | Thema | Entscheidung | Beste Alternativen | Begründung | Wer | Ändern in |
|---|---|---|---|---|---|---|---|
| R1 | 29.10.2026 | Rechtsform | **Einzelunternehmen, bestehendes Gewerbe erweitern** | UG (Haftung, aber ~1.000 € Gründung + Bilanz) | geringe Kosten; Haftungsrisiko über Haftpflichtversicherung und sorgfältige Allergen-Hinweise abdecken (07) | Claude (Empfehlung) – **du entscheidest mit Steuerberatung** | – |
| R2 | 29.10.2026 | Kündigung/Widerruf | „Verträge hier kündigen“ und „Vertrag widerrufen“ ohne Login auf jeder Seite, mit Zeitstempel-Bestätigung | Kündigung nur über MoR | § 312k BGB, BGH I ZR 161/24 (auch für Pässe), Widerrufsfunktion seit 19.06.2026 (07) | Claude | `tools/seiten.py` |
| R3 | 29.10.2026 | Werbeaussagen | keine Abnehm-, Muskel- oder Gesundheitsversprechen, keine Krankheitsnamen; „proteinreich“ nur bei ≥ 20 % Energie aus Protein | – | HCVO, HWG, UWG, MDR-Abgrenzung (07 §5–6) | Claude | `marketing/` |
