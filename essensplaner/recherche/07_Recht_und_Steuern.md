# 07 – Recht & Steuern für den Essensplaner (DE/DACH)

Stand: 28.10.2026 · Abrufdatum aller Links: 28.10.2026 · Perspektive: IT-, Wettbewerbs-, Lebensmittelrecht + Steuern
Gegenstand: Web-App/PWA „Essensplaner“ (Abo und/oder Einmalkauf), Varianten Montage, Fitness, dritte Nische (Familien/Studierende), Allgemein. Betreiber: Privatperson, die bereits zwei Shopify-E-Book-Shops betreibt.

**Legende Risiko-Ampel:** 🟢 geringes Risiko / Standard · 🟡 handhabbar, aber Pflichten oder Graubereich · 🔴 hohes Abmahn-/Bußgeld-/Haftungsrisiko, vor Launch zwingend lösen.

> Quellenhinweis: Normtexte über gesetze-im-internet.de bzw. EUR-Lex. Urteile mit Gericht, Datum, Aktenzeichen. Wo eine Aussage nur auf Sekundärquellen (Kanzlei-Blogs) beruht oder nach dem Wissensstand dieses Berichts nicht im Volltext geprüft werden konnte, ist das mit **[prüfen]** markiert.

## Inhalt
0. Kurzfassung: die zehn wichtigsten Punkte
1. Gründung & Steuern
2. Buchpreisbindung
3. Abo- und Verbraucherrecht
4. Datenschutz (DSGVO/TDDDG), Tracking, Impressum
5. Health-Claims, HWG, UWG – was Werbung sagen darf
6. MDR – wann wäre die App ein Medizinprodukt?
7. Markenrecht & Domain
8. Lebensmittelinformation (LMIV), Allergen-Haftung
9. AGB, Jugendschutz, Barrierefreiheit (BFSG)
10. Checkliste „Vor dem Launch erledigt“
11. Kostenaufstellung Gründung & laufend
12. Quellenverzeichnis

---
## 0. Kurzfassung: die zehn wichtigsten Punkte

| # | Thema | Einschätzung | Ampel |
|---|---|---|---|
| 1 | Rechtsform | Als **Einzelunternehmen** starten (bestehendes Gewerbe um „Betrieb von Software/Web-Apps“ erweitern). UG erst, wenn Haftung (Allergie-/Gesundheitsfunktionen) oder Gewinne > ca. 60–80 T€ es rechtfertigen. Betriebshaftpflicht + Vermögensschaden-/Cyber-Police statt UG als Haftungsschutz am Anfang. | 🟢 |
| 2 | Kleinunternehmer | Grenzen 25.000 € (Vorjahr) / 100.000 € (laufendes Jahr) gelten für **alle Umsätze des Inhabers zusammen** – die beiden E-Book-Shops zählen mit. Bei Abo-Plänen mit Werbebudget eher Regelbesteuerung wählen (Vorsteuerabzug auf Ads, Tools, Higgsfield). | 🟡 |
| 3 | USt-Satz | App/Abo = elektronische Dienstleistung **19 %**. E-Book **7 %**. Bundle = zwei Leistungen, Entgelt nach Einzelverkaufspreisen aufteilen. | 🟡 |
| 4 | Verkauf & Steuern EU/CH | **Merchant of Record** (Paddle, Lemon Squeezy, Digistore24) nimmt OSS, Schweizer MWST, Rechnungen, Chargebacks ab. Für ein Ein-Personen-Unternehmen klare Empfehlung. | 🟢 |
| 5 | Buchpreisbindung | Gilt **nicht** für die Planer-App/das Abo. Gilt für jedes beigelegte E-Book: kein „E-Book gratis zum Abo“, Bundles nur als eigenes Festpreis-Produkt, das der Inhaber als Verleger festsetzt und veröffentlicht. | 🟡 |
| 6 | Abo-Recht | Kündigungsbutton ohne Login (OLG Nürnberg 3 U 2214/23, LG München I 33 O 15098/22), auch für „Lifetime“/Einmalzahlung mit Laufzeit (BGH I ZR 161/24). Bestellbutton „zahlungspflichtig bestellen“. Neue **Widerrufsfunktion** seit 19.06.2026. | 🔴 (wenn falsch) → 🟢 (wenn sauber gebaut) |
| 7 | Datenschutz | Allergien, Unverträglichkeiten, Gewicht/Ziel = **Gesundheitsdaten** (Art. 9 DSGVO); Diätform „halal/koscher“ kann religiöse Überzeugung offenbaren. Lösung: **Daten nur lokal im Gerät** speichern + ausdrückliche Einwilligung für alles, was doch auf den Server muss. | 🔴 → 🟡 |
| 8 | Tracking/Meta | Meta Pixel/CAPI nur nach Einwilligung (§ 25 TDDDG) und **niemals** mit Gesundheits-Events (z. B. „Allergie gewählt“). Meta schränkt Health-&-Wellness-Werbetreibende seit 2025 bei Conversion-Events ein – Fitness-/Diät-Variante kann betroffen sein. | 🔴 |
| 9 | Werbung | Health-Claims-VO gilt für Werbung, die Lebensmittel/Rezepte bewirbt, sobald Nährwert- oder Gesundheitsaussagen gemacht werden. Keine Gewichtsverlust-Mengen/-Zeiten (Art. 12 lit. b HCVO), keine Krankheitsbezüge (§ 11 LFGB, HWG). | 🔴 |
| 10 | MDR | Solange **keine** Krankheits-Zweckbestimmung („bei Diabetes“, „bei Reizdarm“, „Therapie“), ist die App kein Medizinprodukt. Allergie-**Filter** ist unkritisch, Allergie-„Sicherheit“ nicht versprechen. | 🟡 |

---

## 1. Gründung & Steuern

### 1.1 Gewerbeanmeldung 🟢
- **Pflicht:** Ja. Der Betrieb einer kostenpflichtigen Web-App ist gewerbliche Tätigkeit (§ 14 Abs. 1 GewO, § 15 Abs. 2 EStG). Freiberuflichkeit (§ 18 EStG, „schriftstellerisch“) trägt nur für das Verfassen der E-Books, nicht für Software-Abos mit Marketing-Funnel.
- **Der Inhaber hat bereits ein Gewerbe** (Shopify-Shops). Dann genügt eine **Gewerbe-Ummeldung** (Erweiterung des Tätigkeitsbereichs, z. B. „Entwicklung und Vertrieb von Software und digitalen Inhalten, Online-Dienstleistungen“), Formular GewA 2. Neue Anmeldung (GewA 1) nur bei neuem Betrieb/Standort.
- **Kosten:** von Gemeinde zu Gemeinde verschieden, nach den Gebührenordnungen der Länder; Praxisspanne **ca. 10–65 €** (Ummeldung meist gleich oder günstiger als Anmeldung). Konkreter Betrag: Website der eigenen Gemeinde/Stadt oder Online-Portal des Landes (z. B. „Gewerbe-Service-Portal“ NRW, BayernPortal) **[prüfen für Wohnort]**.
- **Folgen:** Finanzamt erhält Kopie automatisch; ggf. „Fragebogen zur steuerlichen Erfassung“ nur bei Neuanmeldung (ELSTER). IHK-Zugehörigkeit automatisch (§ 2 IHKG).
- **Gewerbesteuer:** Einzelunternehmen haben Freibetrag **24.500 €** Gewerbeertrag (§ 11 Abs. 1 Nr. 1 GewStG), Gewerbesteuer wird über § 35 EStG weitgehend auf die Einkommensteuer angerechnet. UG/GmbH: kein Freibetrag.

### 1.2 Rechtsform: Einzelunternehmen vs. UG vs. GmbH

| Kriterium | Einzelunternehmen | UG (haftungsbeschränkt) | GmbH |
|---|---|---|---|
| Haftung | **unbeschränkt** mit Privatvermögen | auf Gesellschaftsvermögen beschränkt (§ 13 Abs. 2 GmbHG); persönliche Haftung bleibt z. B. bei eigener Pflichtverletzung, Steuer-/SV-Haftung des Geschäftsführers (§§ 69, 34 AO), Durchgriff bei Vermögensvermischung | wie UG |
| Mindestkapital | – | 1 € (realistisch ≥ 1.000 €), 25 % Gewinnthesaurierung bis 25.000 € (§ 5a Abs. 3 GmbHG) | 25.000 €, davon mind. 12.500 € bei Anmeldung (§ 7 Abs. 2 GmbHG) |
| Gründungskosten | Gewerbeanmeldung 10–65 € | Notar mit Musterprotokoll ca. 300–500 €, Handelsregister ca. 150 €, Transparenzregister, Bankkonto; online per Video-Beurkundung möglich (§ 2 Abs. 3 GmbHG, DiRUG) | Notar ohne Musterprotokoll ca. 800–1.200 €, HR ca. 150–300 € |
| Buchhaltung | **EÜR** (§ 4 Abs. 3 EStG), Buchführungspflicht erst ab 800.000 € Umsatz oder 80.000 € Gewinn (§ 141 AO) | **doppelte Buchführung + Bilanz** (§§ 238, 242 HGB), Offenlegung im Unternehmensregister (§ 325 HGB), Körperschaft- und Gewerbesteuererklärung | wie UG |
| Steuern auf Gewinn | ESt progressiv (bis 42/45 %) | KSt 15 % + Soli + GewSt ≈ 30 %; Ausschüttung zusätzlich 25 % AbgSt/Teileinkünfte | wie UG |
| Laufende Zusatzkosten | StB ca. 600–1.500 €/Jahr | StB ca. 1.800–3.500 €/Jahr, IHK ohne Freibetrag, Geschäftsführer-Gehalt/Verträge | wie UG |
| Image | neutral | teils „Billig-GmbH“-Image, für B2C unerheblich | seriös |

**Empfehlung:** Start als **Einzelunternehmen** unter dem bestehenden Gewerbe. Die größten Haftungsrisiken (Abmahnung, DSGVO-Bußgeld, Schadensersatz bei Allergie-Fehler) lassen sich durch saubere Umsetzung (Abschnitte 3, 4, 8) und eine **Betriebs-/Produkthaftpflicht mit Vermögensschaden- und Cyber-Baustein** (ca. 200–600 €/Jahr, Angebote einholen) abdecken. Wechsel in eine UG/GmbH, wenn (a) Gewinn dauerhaft > ca. 60–80 T€ (Steuersatzvorteil), (b) Investoren/Mitgründer kommen oder (c) Funktionen mit erhöhtem Haftungsrisiko (Allergie-Garantien, klinische Zielgruppen) geplant sind. Achtung: Die UG schützt **nicht** vor Abmahnkosten aus eigener Handlung als Geschäftsführer in allen Fällen und nicht vor DSGVO-Pflichten. 🟢

### 1.3 Kleinunternehmerregelung § 19 UStG (seit 01.01.2025) 🟡
- **Grenzen:** Gesamtumsatz (netto) **im Vorjahr ≤ 25.000 €** und **im laufenden Jahr ≤ 100.000 €** (§ 19 Abs. 1 UStG n. F., Jahressteuergesetz 2024). Die 100.000-€-Grenze ist **hart**: Ab dem Umsatz, mit dem sie überschritten wird, gilt sofort Regelbesteuerung (BMF-Schreiben zur Kleinunternehmerregelung vom 18.03.2025 **[prüfen]**, Abschn. 19.1 UStAE n. F.).
- **Unternehmenseinheit:** Ein Unternehmer hat nur **ein** Unternehmen (§ 2 Abs. 1 S. 2 UStG). Honigmama, DURCHSCHICHT und der Essensplaner werden **zusammengerechnet**.
- **Wirkung:** Rechnungen ohne USt mit Hinweis („Gemäß § 19 UStG wird keine Umsatzsteuer berechnet“), **kein Vorsteuerabzug**. Seit 2025 ist die Kleinunternehmer-Leistung eine steuerfreie Leistung; keine USt-Voranmeldungen, aber jährliche Erklärung entfällt grundsätzlich (§ 19 Abs. 1 n. F. i. V. m. § 18 Abs. 3 UStG).
- **Option zur Regelbesteuerung** (§ 19 Abs. 3 UStG): Bindung **5 Jahre**. Lohnt sich, wenn Vorsteuern aus Werbung (Meta: Reverse Charge, praktisch neutral), Software, Higgsfield, Hardware, Agentur hoch sind oder überwiegend B2B verkauft wird. Bei Endkunden-Abos zu 4,99–9,99 € ist Kleinunternehmer **preislich ein Vorteil** (19 % mehr Marge oder günstigerer Preis), solange die Grenzen sicher eingehalten werden.
- **EU-Kleinunternehmerregelung** (§ 19a UStG, RL (EU) 2020/285, seit 01.01.2025): Ein deutscher Kleinunternehmer kann die Steuerbefreiung auch in anderen EU-Staaten nutzen, wenn sein **EU-weiter Jahresumsatz ≤ 100.000 €** ist und er die jeweilige nationale Grenze (z. B. Österreich 55.000 €) einhält. Voraussetzung: vorherige Anmeldung beim **BZSt** (Kleinunternehmer-Identifikationsnummer mit Suffix „-EX“) und **vierteljährliche Umsatzmeldungen**. Für Mini-Umsätze in AT/Benelux in der Praxis meist zu aufwendig – siehe MoR.

### 1.4 Regelbesteuerung, USt-Sätze 🟡
| Leistung | Satz | Begründung |
|---|---|---|
| Web-App/PWA-Abo, Planerzugang, KI-Pläne | **19 %** | Auf elektronischem Weg erbrachte sonstige Leistung (§ 3a Abs. 5 S. 2 Nr. 3 UStG, Art. 7 MwSt-DVO 282/2011, Anhang II MwStSystRL: „Bereitstellung von Software“, „Bereitstellung von Datenbanken“) |
| E-Book (PDF/EPUB) | **7 %** | § 12 Abs. 2 Nr. 14 UStG (seit 18.12.2019) – elektronische Bücher; ausgenommen Inhalte, die überwiegend Werbung, Video oder Musik sind |
| Einzelner, statischer Plan als PDF („Wochenplan zum Download“) | **eher 19 %** | Personalisiert generiertes Dokument ist kein „Buch“ i. S. v. Anlage 2 Nr. 49; ein feststehendes Rezept-E-Book bleibt 7 % **[mit StB abstimmen]** |
| Bundle App-Abo + E-Book | **aufteilen** | Zwei selbständige Leistungen, wenn der Kunde beide als eigenständig nutzbar ansieht (Abschn. 3.10 UStAE; EuGH C-349/96 *CPP*, C-111/05 *Aktiebolaget NN*). Bei verschiedenen Steuersätzen Aufteilung des Gesamtpreises nach dem Verhältnis der **Einzelverkaufspreise** (Abschn. 10.1 Abs. 11 UStAE; ständige BFH-Rspr. zur Aufteilung nach Marktwerten **[Fundstelle mit StB prüfen]**) – auf der Rechnung zwei Positionen. Ausnahme: Ist das E-Book nur unselbständige Nebenleistung (z. B. „Einkaufslisten-PDF“), gilt einheitlich 19 % (EuGH C-463/16 *Stadion Amsterdam*: einheitliche Leistung = ein Satz). |

### 1.5 Digitale Dienstleistungen an Verbraucher in anderen EU-Staaten (OSS) 🟡
- **Ort der Leistung** bei elektronischen Dienstleistungen an Nichtunternehmer: **Wohnsitz des Kunden** (§ 3a Abs. 5 UStG, Art. 58 MwStSystRL).
- **10.000-€-Schwelle** (§ 3a Abs. 5 S. 3 UStG): Solange die **grenzüberschreitenden** B2C-Umsätze (elektronische Leistungen + innergemeinschaftliche Fernverkäufe, alle EU-Staaten zusammen, netto) im Vorjahr und im laufenden Jahr ≤ 10.000 € liegen, bleibt der Ort in **Deutschland** (deutsche USt bzw. § 19). Bei Überschreiten: USt des Kundenlandes (AT 20 %, NL 21 %, …).
- **OSS** (§ 18j UStG): Registrierung über das BZSt-Online-Portal, **Quartalserklärung** bis Ende des Folgemonats, Zahlung an das BZSt. Nachweis des Kundenlandes: bis 100.000 € ein Beweismittel, darüber zwei widerspruchsfreie (Art. 24b MwSt-DVO: IP, Rechnungsadresse, Bank/Karte, SIM).
- **Schweiz** (kein OSS): Ausländische Anbieter elektronischer Dienstleistungen an Schweizer Privatkunden werden **ab CHF 100.000 weltweitem Umsatz** MWST-pflichtig (Art. 10 MWSTG; Satz 8,1 %). Unter dieser Grenze keine Pflicht. **[aktuellen Stand ESTV prüfen]**
- **Österreich:** 20 % USt über OSS; zusätzlich österreichische Buchpreisbindung für E-Books (siehe 2.).

### 1.6 Merchant of Record (MoR) 🟢 – klare Empfehlung
Beim MoR verkauft der Plattformbetreiber die Leistung **im eigenen Namen** an den Endkunden (umsatzsteuerlich Dienstleistungskommission, § 3 Abs. 11 UStG bzw. Art. 9a MwSt-DVO). Der Inhaber leistet nur noch **B2B an den MoR**.

| Anbieter | Sitz/Vertragspartner | Gebühr (Stand laut Websites, **[prüfen]**) | Was er übernimmt | Steuerfolge für den Inhaber |
|---|---|---|---|---|
| **Paddle** | Paddle.com Market Ltd (UK) | ca. 5 % + 0,50 $ je Transaktion | USt/OSS/CH/weltweit, Rechnungen, Abo-Verwaltung, Kündigung, Refunds, Chargebacks | B2B-Leistung an UK-Unternehmen: in DE nicht steuerbar (§ 3a Abs. 2 UStG), Gutschrift ohne USt; in USt-Erklärung bzw. ZM angeben. Für § 19: zählt nur steuerbarer Umsatz **[mit StB klären]** |
| **Lemon Squeezy** (seit 2024 Teil von Stripe) | Lemon Squeezy LLC (USA) | ca. 5 % + 0,50 $ (+ Zuschläge international/PayPal) | wie Paddle | wie Paddle (Drittland-B2B) |
| **Digistore24** | Digistore24 GmbH (DE) | ca. 7,9 % + 1 € je Verkauf | USt-Abwicklung EU, Rechnungen, Zahlungsarten, Affiliate-System, Abo + Kündigungs-Seite | Inländische B2B-Leistung: Provisionsgutschrift mit 19 % (bzw. § 19-Hinweis); einfache Buchhaltung, DE-Vertragspartner |
| Stripe Billing (kein MoR) | Stripe Payments Europe (IE) | ca. 1,5 % + 0,25 € (EWR-Karten) + Billing-Gebühr | nur Zahlung | Inhaber ist selbst Verkäufer → OSS, CH, Rechnungen selbst |
| Apple/Google In-App | ADI/Google Commerce | 15 % (Small-Business-Programm) bis 30 % | MoR für In-App-Käufe | wie MoR |

**Was der MoR vereinfacht:** kein OSS, keine Schweizer Registrierung, keine Länderkenntnis bei Steuersätzen, keine Rechnungspflichten gegenüber Endkunden, kein Zahlungsausfallrisiko bei Chargebacks, monatlich **eine** Gutschrift = ein Buchungssatz.
**Was er nicht abnimmt:** Impressum, Datenschutz in der App, Werberecht, Kündigungsbutton auf der **eigenen** Website (soweit dort Verträge angebahnt/geschlossen werden), Buchpreisbindung für E-Books (Digistore24 verkauft dann zum festgesetzten Preis), Einkommensteuer/Gewerbesteuer.
**Empfehlung:** **Paddle** (internationalste Abo-Logik) oder **Digistore24** (deutsch, Affiliate für Fitness-Creator, deutschsprachige Checkout-Texte bereits auf DE-Recht getrimmt). Entscheidung nach Gebühren-Szenario in `finanzen/`.

### 1.7 IHK-Beitrag 🟢
- Pflichtmitgliedschaft (§ 2 Abs. 1 IHKG). Natürliche Personen **ohne Handelsregistereintrag** sind beitragsfrei, solange der Gewerbeertrag/Gewinn **≤ 5.200 €** liegt (§ 3 Abs. 3 S. 3 IHKG). Darüber: Grundbeitrag (je nach IHK ca. 30–150 €) + Umlage (ca. 0,1–0,3 % des Gewerbeertrags über Freibetrag). Existenzgründer-Befreiung (§ 3 Abs. 3 S. 4 IHKG) greift beim Inhaber wegen der bestehenden Shops voraussichtlich nicht mehr.
- UG/GmbH: Grundbeitrag ab dem ersten Jahr (ca. 150–300 €) **[Beitragsordnung der zuständigen IHK prüfen]**.

### 1.8 Steuerberater-Kosten 🟢
- Vergütung nach **StBVV** (Steuerberatervergütungsverordnung) oder Pauschale. Realistische Spannen:
  - Einzelunternehmen, EÜR + ESt-Anlage G + GewSt + USt-Erklärung: **ca. 800–1.800 €/Jahr**; bei Kleinunternehmer und sauberer Software-Buchhaltung (lexoffice, sevDesk, ca. 10–30 €/Monat) eher unteres Ende.
  - Laufende Buchhaltung/USt-Voranmeldungen bei Regelbesteuerung: zusätzlich ca. 50–150 €/Monat.
  - UG: Jahresabschluss + KSt/GewSt/USt-Erklärungen + Offenlegung: **ca. 1.800–3.500 €/Jahr**, laufende FiBu extra.
  - Einmalige Gründungsberatung (Kleinunternehmer ja/nein, MoR, Bundle-Aufteilung): ca. 150–400 €.
- Buchhaltungspflichten unabhängig von der Rechtsform: **GoBD**-konforme Aufbewahrung (Rechnungen 8 Jahre seit BEG IV, Bücher 10 Jahre, § 147 AO), seit 01.01.2025 Pflicht zum **Empfang von E-Rechnungen** im B2B-Bereich (§ 14 UStG n. F.), Versand ab 2027/2028 je nach Umsatz.

---
## 2. Buchpreisbindung

### 2.1 Gilt sie für die App / das Abo? 🟢 Nein
- **§ 2 Abs. 1 BuchPrG** erfasst Bücher, Musiknoten, kartografische Produkte (Nr. 1–2), **Produkte, die Bücher reproduzieren oder substituieren und bei Würdigung der Gesamtumstände als überwiegend verlagstypisch anzusehen sind** (Nr. 3 – darunter E-Books, seit der Klarstellung 2016 ausdrücklich) und **kombinierte Objekte, bei denen eines dieser Erzeugnisse die Hauptsache bildet** (Nr. 4).
- Ein Planer, der aus Eingaben (Geräte, Budget, Makros) Pläne, Einkaufslisten und Kosten **errechnet**, ist Software, kein Buchsubstitut. Er ist nicht „verlagstypisch“. Der Börsenverein ordnet Apps nur dann als preisgebunden ein, wenn sie im Kern ein Buch in App-Form sind (z. B. ein linear lesbares Kochbuch mit ein paar Lesezeichen-Funktionen) **[Börsenverein-Hinweis „Preisbindung von E-Books und Apps“ prüfen]**.
- **Grenzfall:** Eine reine „Rezeptsammlung im Abo“ ohne Planungslogik, inhaltlich identisch mit einem E-Book, könnte als Substitut (Nr. 3) gelten. Deshalb: Planungsfunktion ist der Kern des Produkts, Rezepte sind Datenbasis. 🟢
- Österreich: Bundesgesetz über die Preisbindung bei Büchern (BPrBG) erfasst seit 2014 auch E-Books – gleiche Logik wie DE. Schweiz: keine Buchpreisbindung.

### 2.2 E-Book-Flatrates und Abos
- Gebundene Preise gelten für den **Verkauf an Letztabnehmer** (§ 3 BuchPrG). Ob Zugangsmodelle (Flatrate wie Kindle Unlimited, Skoobe) „Verkauf“ sind, ist **höchstrichterlich nicht entschieden**. Die h. M. und der Börsenverein behandeln Flatrates als zulässig, wenn der **Verlag** dem Modell zustimmt bzw. einen Preis für die Flatrate-Nutzung festsetzt (Verlagshoheit, § 5 BuchPrG); ohne Zustimmung des Verlags darf ein Händler gebundene E-Books nicht in eine Flatrate packen. **[Börsenverein-Position im Volltext prüfen]**
- **Für den Inhaber unkritisch**, weil er bei eigenen E-Books **selbst Verleger** ist: Er bestimmt, ob und zu welchem Preis seine E-Books in einem Abo enthalten sind. Er muss die Festsetzung aber **veröffentlichen** und dann **selbst einhalten** (§ 3 S. 1 BuchPrG gilt auch für den Selbstverlag, der direkt an Endkunden verkauft).

### 2.3 Bundle App + E-Book 🟡
| Gestaltung | Bewertung |
|---|---|
| „Kaufe das Jahresabo, **E-Book gratis dazu**“ | 🔴 Der gebundene E-Book-Preis wird faktisch unterschritten (0 €). Auch die Ausnahme für geringwertige Zugaben (§ 7 Abs. 4 Nr. 1 BuchPrG) greift nicht, weil das Buch selbst die Zugabe ist. Abmahnfähig durch Mitbewerber/Preisbindungstreuhänder (§ 9 BuchPrG). |
| „Abo + E-Book für zusammen 59 €“, E-Book einzeln 14,99 €, Abo einzeln 49,99 € | 🟡 Nur zulässig, wenn der Inhaber als Verleger für das **Kombi-Produkt einen eigenen festen Preis** festsetzt (§ 5 Abs. 1, Abs. 4 BuchPrG – Paket-/Serienpreise) und diesen überall gleich anwendet. Keine Rabatt-Kommunikation („spare 20 %“) auf den E-Book-Anteil. |
| E-Book-Inhalte als **Rezepte in der App** (nicht als Datei) | 🟢 Keine Buchpreisbindung, weil kein Buch übergeben wird. |
| Rabattcode auf das Bundle | 🔴 Wenn das Bundle als „kombiniertes Objekt“ mit Buch als Hauptsache gilt oder der E-Book-Anteil reduziert wird. Generell: **keine Rabattcodes** auf Produkte mit E-Book (bestehende Hausregel beibehalten). Rabatte nur auf das reine App-Abo. |

**Pflicht:** Bundle als eigenes Produkt mit eigenem Festpreis, auf allen Kanälen identisch (Shopify, MoR, Landingpage). Rechnung mit Aufteilung 7 %/19 % (1.4).

---

## 3. Abo- und Verbraucherrecht

### 3.1 Kündigungsbutton § 312k BGB 🔴 (bei Fehlern)
**Anwendungsbereich:** Jeder Verbrauchervertrag über ein **Dauerschuldverhältnis** mit entgeltlicher Leistung, das über eine Website/App geschlossen werden *kann* (§ 312k Abs. 1 BGB). Das gilt auch für Laufzeitverträge mit **Einmalzahlung** (z. B. „12 Monate für 39 €“ oder „Lifetime“-Zugang): **BGH, Urt. v. 22.05.2025 – I ZR 161/24**. Gilt auch, wenn die Kündigung über den MoR läuft – der Inhaber muss auf seiner Website trotzdem den Button vorhalten oder unmittelbar auf eine konforme MoR-Kündigungsstrecke verlinken.

**Genaue Anforderungen (§ 312k Abs. 2–5 BGB):**
1. **Kündigungsschaltfläche**, gut lesbar, **nur** mit „Verträge hier kündigen“ oder einer entsprechenden eindeutigen Formulierung beschriftet.
2. Sie führt **unmittelbar** zu einer **Bestätigungsseite**, auf der der Verbraucher angeben kann:
   - Art der Kündigung (ordentlich/außerordentlich) und bei außerordentlicher den Grund,
   - seine eindeutige Identifizierbarkeit (Name, E-Mail),
   - die eindeutige Bezeichnung des Vertrags,
   - den Zeitpunkt, zu dem gekündigt werden soll,
   - eine Angabe zur schnellen elektronischen Übermittlung der Kündigungsbestätigung (E-Mail).
3. **Bestätigungsschaltfläche** „jetzt kündigen“ oder eindeutig gleichwertig.
4. Beide Schaltflächen und die Bestätigungsseite **ständig verfügbar, unmittelbar und leicht zugänglich** (Footer jeder Seite + im Konto).
5. Kündigung muss gespeichert werden können (Datum/Uhrzeit, z. B. Druck/PDF) – Abs. 3.
6. **Unverzügliche Bestätigung in Textform** (E-Mail) mit Inhalt, Datum/Uhrzeit des Zugangs und Zeitpunkt, zu dem die Kündigung wirkt (Abs. 4).
7. Ohne Angabe des Zeitpunkts: Wirkung zum frühestmöglichen Termin (Abs. 5).
8. **Sanktion:** Fehlt/ist der Button fehlerhaft, kann der Verbraucher **jederzeit fristlos** kündigen (Abs. 6); zusätzlich Abmahnung nach UWG (§ 3a UWG) und UKlaG (Verbraucherzentralen).

**Rechtsprechung 2022–2026 (Auswahl):**
- **BGH, Urt. v. 22.05.2025 – I ZR 161/24:** Button auch bei Einmalzahlung für befristete Laufzeit.
- **BGH, Urt. v. 16.07.2026 – I ZR 200/25** (BGH-PM Nr. 128/2026): Die in § 312k Abs. 2 BGB genannten Inhalte der Bestätigungsseite sind abschließend; **keine Halteangebote, Rabatte, „Bist du sicher?“-Schleifen** im Kündigungsablauf. **[nur über Sekundärquellen erfasst – Volltext/PM prüfen]**
- **OLG Nürnberg, Urt. v. 30.07.2024 – 3 U 2214/23** (Deutschlandticket): Button, der erst **nach Login** erreichbar ist, genügt nicht.
- **LG München I, Urt. v. 10.10.2023 – 33 O 15098/22** (Sky/WOW, rechtskräftig): Kündigung muss **ohne Login** möglich sein; Name + Identifikationsmerkmale genügen.
- **OLG Köln, Urt. v. 10.01.2025 – 6 U 62/24:** Button, der erst nach mehreren Eingabeschritten erscheint, ist unzulässig.
- **OLG Koblenz, Urt. v. 19.09.2024 – 2 U 437/23** (1&1): Umleitung der Kunden weg von der gesetzlichen Kündigungsstrecke unzulässig.
- **LG Köln, Beschl. v. 29.07.2022 – 33 O 355/22:** Login-Pflicht vor dem Button unzulässig (einstweilige Verfügung).
- Abmahnpraxis: Verbraucherzentralen (vzbv, VZ NRW) und Wettbewerbsverbände mahnen seit 2022 flächendeckend ab; Streitwerte typischerweise 10.000–30.000 €.

**Umsetzung für die PWA:** Footer-Link „Verträge hier kündigen“ auf **jeder** Seite (auch ausgeloggt) → Formular mit den fünf Feldern → „jetzt kündigen“ → sofortige Bestätigungs-E-Mail + Download der Bestätigung. Kein Login, kein Captcha-Labyrinth, keine Halteangebote **vor** der Bestätigung. Eine Exit-Umfrage ist nur **nach** abgeschlossener Kündigung und freiwillig vertretbar.

### 3.2 Laufzeiten – Gesetz für faire Verbraucherverträge (§ 309 Nr. 9 BGB) 🟢
Seit 01.03.2022 (Verträge ab diesem Datum) sind in AGB unwirksam:
- **Erstlaufzeit > 2 Jahre** (lit. a),
- **stillschweigende Verlängerung**, außer auf **unbestimmte Zeit** mit Kündigungsmöglichkeit **jederzeit mit höchstens einem Monat Frist** (lit. b),
- **Kündigungsfrist > 1 Monat** vor Ablauf der Erstlaufzeit (lit. c).
**Empfehlung:** Monatsabo (monatlich kündbar) + Jahresabo mit 12 Monaten Erstlaufzeit, danach unbefristet, monatlich kündbar (oder automatisches Ende). Hinweis auf die Verlängerung klar in Bestellübersicht und Bestätigungs-Mail.

### 3.3 Button-Lösung § 312j BGB 🔴 (bei Fehlern)
- Unmittelbar vor der Bestellung klar und hervorgehoben: wesentliche Eigenschaften, **Gesamtpreis**, bei Abos **Mindestlaufzeit**, Verlängerung und Kündigungsbedingungen (§ 312j Abs. 2 BGB i. V. m. Art. 246a § 1 Abs. 1 S. 1 Nr. 1, 4, 5, 11, 12 EGBGB).
- Bestellbutton **nur** mit „**zahlungspflichtig bestellen**“ oder eindeutig gleichwertig (z. B. „Jetzt kaufen“, „kostenpflichtig abonnieren“) beschriftet (§ 312j Abs. 3 BGB). Sonst **kommt kein Vertrag zustande** (§ 312j Abs. 4 BGB).
- **EuGH, Urt. v. 07.04.2022 – C-249/21 (Fuhrmann-2):** Es kommt allein auf die Beschriftung des Buttons an, Umstände drumherum heilen nichts. „Anmelden“, „Weiter“, „Jetzt starten“, „Kostenlos testen“ (wenn später kostenpflichtig) sind **unzulässig**.
- Über den MoR-Checkout ist das in der Regel abgedeckt; deutsche Beschriftung im Checkout trotzdem prüfen (Screenshot-Dokumentation).

### 3.4 Kostenlose Testphase → Abo 🟡
- Ein Testabo, das automatisch kostenpflichtig wird, ist **schon beim Start** ein entgeltlicher Vertrag → Button-Lösung gilt **beim Start** der Testphase (Button z. B. „Testphase starten – danach 6,99 €/Monat zahlungspflichtig“ ist riskant; sicherer: „**Jetzt zahlungspflichtig abonnieren**“ mit Hinweis „Die ersten 7 Tage kosten 0 €“).
- Klar angeben: Dauer der Testphase, Preis danach, Abrechnungsrhythmus, Kündigungsweg, Datum der ersten Abbuchung (§ 312j Abs. 2 BGB, § 5a UWG).
- „**Gratis**“/„kostenlos“ nur, wenn außer unvermeidbaren Kosten nichts anfällt (UWG Anhang Nr. 21). Bei Testabo mit Folgekosten: „**7 Tage gratis testen, danach …**“ mit Preis in gleicher Sichtbarkeit.
- Kündigung in der Testphase muss über § 312k-Strecke gehen; Erinnerungs-Mail 2–3 Tage vor Ende der Testphase ist gesetzlich (noch) nicht vorgeschrieben, senkt aber Chargebacks und ist für die EU-Initiative „Digital Fairness Act“ ohnehin zu erwarten **[Stand des Kommissionsvorschlags prüfen]**.
- Alternative mit geringstem Risiko: **Freemium ohne Zahlungsdaten** (kostenlose Basisversion, kein Auto-Upgrade).

### 3.5 Widerrufsrecht: digitale Dienstleistung vs. digitaler Inhalt 🟡
| | App-Abo / Planer-Zugang = **digitale Dienstleistung** (§ 327 Abs. 2 S. 2 BGB) | E-Book / PDF-Plan zum Download = **digitaler Inhalt** (§ 327 Abs. 2 S. 1 BGB) |
|---|---|---|
| Erlöschen | **§ 356 Abs. 4 BGB:** Bei Zahlungspflicht erst mit **vollständiger Erbringung**, wenn der Verbraucher (1) ausdrücklich zugestimmt hat, dass vor Fristablauf begonnen wird, (2) seine Kenntnis vom Erlöschen bei vollständiger Erfüllung bestätigt hat. Bei einem Monats-/Jahresabo ist die Leistung innerhalb von 14 Tagen nie „vollständig erbracht“ → **Widerrufsrecht bleibt 14 Tage bestehen.** | **§ 356 Abs. 5 BGB:** Erlischt mit Beginn der Bereitstellung, wenn (1) ausdrückliche Zustimmung zum vorzeitigen Beginn, (2) Kenntnisbestätigung über den Verlust des Widerrufsrechts, (3) **Vertragsbestätigung** auf dauerhaftem Datenträger (§ 312f Abs. 3 BGB), die Zustimmung und Kenntnis enthält. |
| Folge bei Widerruf | Verbraucher schuldet **anteiligen Wertersatz** für bereits genutzte Tage, wenn er ausdrücklich den Beginn vor Fristende verlangt hat und ordnungsgemäß belehrt wurde (§ 357a Abs. 2 BGB). **[Anwendung auf digitale Dienstleistungen mit RA abstimmen]** | Kein Wertersatz, aber Widerrufsrecht weg, wenn alle drei Schritte erfüllt sind. |
| Umsetzung | Checkbox (nicht vorangekreuzt): „Ich verlange ausdrücklich, dass mit der Leistung vor Ablauf der Widerrufsfrist begonnen wird. Mir ist bekannt, dass ich bei Widerruf einen anteiligen Betrag für die bis dahin erbrachte Leistung zahle.“ | Checkbox: „Ich stimme ausdrücklich zu, dass mit der Ausführung des Vertrags vor Ablauf der Widerrufsfrist begonnen wird. Mir ist bekannt, dass ich mit Beginn der Ausführung mein Widerrufsrecht verliere.“ + Bestätigungs-Mail mit diesem Text (Haus-Regel aus den Shops). |
- **Muster-Widerrufsbelehrung:** Anlage 1 zu Art. 246a § 1 Abs. 2 S. 2 EGBGB; Muster-Widerrufsformular: Anlage 2. Gestaltungshinweis für digitale Inhalte/Dienstleistungen jeweils einsetzen. Wer das Muster korrekt nutzt, genießt Gesetzlichkeitsfiktion (Art. 246a § 1 Abs. 2 S. 3 EGBGB).
- **NEU – Widerrufsfunktion („Widerrufsbutton“):** Richtlinie (EU) 2023/2673 fügt Art. 11a in die Verbraucherrechte-RL ein; seit **19.06.2026** müssen online geschlossene Verträge eine gut sichtbare Funktion „Vertrag widerrufen“ (o. ä.) während der Widerrufsfrist bieten, mit Bestätigungsschritt und Eingangsbestätigung – analog zum Kündigungsbutton. Deutsche Umsetzung im BGB **[Paragraf und Wortlaut des Umsetzungsgesetzes prüfen]**. Für die PWA: im Footer neben „Verträge hier kündigen“ auch „Vertrag widerrufen“ vorsehen.

### 3.6 Digitale-Produkte-Recht §§ 327 ff. BGB 🟡
- **Bereitstellung** (§ 327b), **Produktmangel** (§§ 327d, 327e): Die App muss die vereinbarten und üblichen Eigenschaften haben (Funktion, Kompatibilität, Sicherheit). Falsche Nährwerte/Allergen-Tags, nicht funktionierender Export oder ein Planer, der vegetarische Pläne mit Fleisch liefert, sind **Mängel** → Nacherfüllung, Minderung, Vertragsbeendigung, Schadensersatz (§ 327i).
- **Aktualisierungspflicht** (§ 327f): Funktions- und **Sicherheitsupdates** für die Vertragslaufzeit (bei Einmalkauf: für den Zeitraum, den der Verbraucher erwarten kann). Update-Hinweise im Changelog dokumentieren.
- **Beweislastumkehr:** bei dauerhafter Bereitstellung während der gesamten Laufzeit (§ 327k Abs. 2).
- **Änderungen am Produkt** (§ 327r): nur, wenn im Vertrag vorgesehen, mit triftigem Grund, ohne Zusatzkosten und mit klarer Information; bei mehr als unerheblicher Beeinträchtigung **Kündigungsrecht binnen 30 Tagen**. → AGB-Klausel „Produktänderungen“ aufnehmen.
- Haftungsbeschränkungen nur im Rahmen von § 309 Nr. 7 BGB (keine Beschränkung bei Leben/Körper/Gesundheit, grober Fahrlässigkeit).

### 3.7 Preisangaben (PAngV 2022) 🟢
- **Gesamtpreis** inkl. USt (§ 3 Abs. 1 PAngV); bei Kleinunternehmer Endpreis + Hinweis § 19 UStG.
- Bei Abos Preis **je Abrechnungszeitraum** und Gesamtkosten der Mindestlaufzeit transparent: „59,88 € jährlich (entspricht 4,99 €/Monat)“ – nicht nur „4,99 €/Monat“, wenn jährlich vorab abgebucht wird (Irreführung § 5 UWG, § 3 PAngV).
- **Grundpreis** (§ 4 PAngV) nur für Waren nach Gewicht/Volumen/Länge/Fläche → **nicht nötig**.
- **30-Tage-Tiefstpreis** bei Preisermäßigungen (§ 11 PAngV) gilt für **Waren**, nicht für Dienstleistungen; bei E-Books ohnehin keine Rabatte (Buchpreisbindung).
- Preise in der Schweiz in CHF bzw. klar EUR; AT gleiche Regeln (PrAG).

### 3.8 Preiserhöhungen bei Abos 🔴 (Klausel) / 🟢 (Zustimmungslösung)
- **Einseitige Preisanpassungsklauseln** in AGB sind gegenüber Verbrauchern regelmäßig unwirksam (§ 307 BGB), wenn sie nicht transparent an Kosten gebunden sind und auch Senkungen vorsehen: **BGH, Urt. v. 15.11.2007 – III ZR 247/06** (Pay-TV); **KG Berlin, Urt. v. 20.12.2019 – 5 U 24/19** (Netflix: Preisanpassungsklausel unwirksam).
- **Zustimmungsfiktion** („Wenn Sie nicht widersprechen, gilt der neue Preis“) für Hauptleistungspflichten unwirksam: **BGH, Urt. v. 27.04.2021 – XI ZR 26/20** (Banken-AGB), übertragbar auf Abo-Preise. Seither zahlreiche Rückforderungsurteile gegen Streamingdienste (Instanzgerichte) **[aktuelle Urteile Netflix/Spotify prüfen]**.
- **Sicherer Weg:** Bestandskunden behalten ihren Preis bis Laufzeitende; Preiserhöhung nur mit **aktiver Zustimmung** (Klick „neuen Preis akzeptieren“), sonst endet das Abo zum nächsten Termin. Neukunden zahlen den neuen Preis.

---
