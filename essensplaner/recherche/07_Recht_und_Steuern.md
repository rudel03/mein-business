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
- **Wirkung:** Rechnungen ohne USt mit Hinweis („Gemäß § 19 UStG wird keine Umsatzsteuer berechnet“), **kein Vorsteuerabzug**. Seit 2025 ist die Kleinunternehmer-Leistung eine steuerfreie Leistung; keine USt-Voranmeldungen, und auch die Jahreserklärung entfällt grundsätzlich (§ 19 Abs. 1 n. F. i. V. m. § 18 Abs. 3 UStG).
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
## 4. Datenschutz (DSGVO, BDSG, TDDDG), Tracking, Impressum

### 4.1 Welche Eingaben sind besondere Kategorien (Art. 9 DSGVO)?
Maßstab: **Gesundheitsdaten** sind personenbezogene Daten, die sich auf die körperliche oder geistige Gesundheit beziehen und aus denen Informationen über den Gesundheitszustand hervorgehen (Art. 4 Nr. 15, ErwG 35 DSGVO). Nach **EuGH, Urt. v. 01.08.2022 – C-184/20 (OT)** genügt es, dass sensible Informationen **mittelbar** durch gedankliche Verknüpfung oder Ableitung offengelegt werden. Nach **EuGH, Urt. v. 04.10.2024 – C-21/23 (Lindenapotheke)** sind sogar Bestelldaten für **nicht verschreibungspflichtige** Apothekenprodukte Gesundheitsdaten, wenn sich daraus mit einer gewissen Wahrscheinlichkeit Rückschlüsse auf die Gesundheit ziehen lassen – auch wenn die Bestellung für Dritte sein könnte. Zugleich bestätigte der EuGH, dass **Mitbewerber DSGVO-Verstöße per UWG abmahnen** können. Die Art.-29-Gruppe hat für Apps schon 2015 Kriterien formuliert (Daten, die für Gesundheitsschlüsse genutzt werden oder mit anderen Daten kombiniert werden) – Annex zum Schreiben vom 05.02.2015.

| Eingabe | Art. 9? | Begründung | Ampel |
|---|---|---|---|
| Allergien (Erdnuss, Sellerie, Schalenfrüchte …) | **Ja** | Diagnose/Gesundheitszustand | 🔴 |
| Unverträglichkeiten (Laktose, Fruktose, Histamin), Zöliakie/glutenfrei aus medizinischem Grund | **Ja** | Gesundheitszustand; „glutenfrei“ als bloße Vorliebe ist mehrdeutig → nach OT/Lindenapotheke vorsichtshalber Ja | 🔴 |
| Diätform vegan/vegetarisch/pescetarisch | grundsätzlich **Nein** | Lebensstil; Ausnahme: Kombination mit Weltanschauung ist fernliegend | 🟢 |
| Diätform **halal/koscher** | **Ja (religiöse Überzeugung)** | lässt mittelbar auf Religion schließen (OT-Logik) | 🟡/🔴 |
| Diätform „low carb“, „keto“, „Intervallfasten“ | eher Nein | Lebensstil, sofern nicht medizinisch begründet abgefragt („wegen Diabetes“) | 🟡 |
| Makroziele (kcal, Protein, KH, Fett) **allein** | eher Nein | Trainings-/Ernährungsvorliebe | 🟡 |
| Körpergewicht, Größe, Alter, Geschlecht + Ziel „abnehmen/zunehmen“ | **Ja (überwiegend vertreten)** | erlaubt BMI-/Gesundheitsschlüsse (Übergewicht/Untergewicht); Kalorienziel in Kombination mit Gewicht wird ebenfalls sensibel | 🔴 |
| Schwangerschaft/Stillzeit (Honigmama-Synergie!) | **Ja** | Gesundheitszustand | 🔴 |
| Abneigungen („mag keine Pilze“), Geräte, Budget, Laden, Personenzahl | Nein | gewöhnliche Daten (Art. 6) | 🟢 |

### 4.2 Konsequenzen bei Verarbeitung auf dem Server 🔴
- **Rechtsgrundlage nur ausdrückliche Einwilligung** (Art. 9 Abs. 2 lit. a DSGVO). Vertragserfüllung (Art. 6 Abs. 1 lit. b) **genügt nicht** für Art.-9-Daten. Gesonderte, nicht vorangekreuzte Checkbox je Zweck, verständlich, jederzeit widerrufbar (Art. 7), Widerruf so einfach wie Erteilung, Nachweis speichern.
- **Datenminimierung** (Art. 5 Abs. 1 lit. c, Art. 25 DSGVO – Privacy by Design/Default): keine Pflichtfelder für Gewicht/Allergien; Makros direkt eingeben lassen statt aus Gewicht/Größe errechnen; Allergien nur als **Ausschlussfilter** („ohne Erdnuss“), nicht als Diagnose („Ich habe eine Erdnussallergie“).
- **Verzeichnis von Verarbeitungstätigkeiten** (Art. 30) ist trotz < 250 Mitarbeitern Pflicht, weil Art.-9-Daten verarbeitet werden (Art. 30 Abs. 5).
- **Datenschutz-Folgenabschätzung** (Art. 35) wahrscheinlich nötig (systematische Verarbeitung von Gesundheitsdaten, ggf. innovative Technologie/KI; DSK-„Muss-Liste“). **Folge:** Dann ist nach **§ 38 Abs. 1 S. 2 BDSG** unabhängig von der Mitarbeiterzahl ein **Datenschutzbeauftragter** zu benennen (externer DSB ca. 50–150 €/Monat).
- **KI-Planerstellung:** Werden Allergien/Gewicht an eine LLM-API geschickt, ist das Art.-9-Verarbeitung durch einen Auftragsverarbeiter + ggf. Drittlandtransfer (USA: Angemessenheitsbeschluss EU-US Data Privacy Framework vom 10.07.2023; Klage abgewiesen durch EuG, Urt. v. 03.09.2025 – T-553/23 *Latombe*, Rechtsmittel anhängig **[prüfen]**). Besser: nur anonymisierte Constraint-Liste ohne Konto-/IP-Bezug senden, EU-Region, Zero-Data-Retention vertraglich.
- **Hosting in der EU**, AVV nach Art. 28 DSGVO mit Hoster, E-Mail-Dienst, MoR (MoR ist für den Zahlungsvorgang meist eigener Verantwortlicher), Analytics.

### 4.3 Lösung: lokale Speicherung im Gerät 🟢 (Empfehlung)
- Speichert die PWA Profil, Allergien, Gewicht und Ziele **nur im Gerät** (IndexedDB/localStorage) und rechnet der Planer **im Browser** (Rezeptdatenbank wird als statisches Paket geladen), verarbeitet der Inhaber diese Daten **nicht**; er ist dafür nicht Verantwortlicher (Art. 4 Nr. 7 DSGVO – keine Entscheidung über Zwecke/Mittel einer Verarbeitung, auf die er keinen Zugriff hat). Das entschärft Art. 9, DSFA und DSB-Pflicht.
- **§ 25 TDDDG:** Das Speichern im Endgerät ist zustimmungsfrei, wenn es **unbedingt erforderlich** ist, damit der vom Nutzer ausdrücklich gewünschte Dienst funktioniert (§ 25 Abs. 2 Nr. 2 TDDDG). Profil und Pläne lokal zu speichern, damit der Planer funktioniert, fällt darunter; Tracking-IDs fallen nicht darunter.
- Bedingungen: keine stille Übertragung (keine Fehler-Logs mit Profilinhalt, keine Analytics-Events mit Diät/Allergie), Hinweis in der Datenschutzerklärung, Export/Löschen-Knopf.
- **Geräteübergreifende Synchronisation** nur optional, mit ausdrücklicher Einwilligung **oder** Ende-zu-Ende-verschlüsselt (Schlüssel nur beim Nutzer) – dann bleibt das Risiko gering.
- Konto/Abo-Status (E-Mail, Zahlungs-ID) liegt auf dem Server/beim MoR → normale Daten nach Art. 6 Abs. 1 lit. b.

### 4.4 Cookies, Consent, Tracking-Pixel 🔴
- **§ 25 TDDDG** (bis 13.05.2024 TTDSG): Jeder Zugriff auf das Endgerät, der nicht unbedingt erforderlich ist (Meta Pixel, Google Analytics, TikTok Pixel, Hotjar, Fingerprinting), braucht **vorherige Einwilligung** (EuGH C-673/17 *Planet49*, 01.10.2019; BGH, Urt. v. 28.05.2020 – I ZR 7/16 *Cookie-Einwilligung II*). „Ablehnen“ gleichwertig auf erster Ebene (DSK, Orientierungshilfe für Anbieter digitaler Dienste, Stand 2024/Version 1.2 **[prüfen]**; LG Rostock, Urt. v. 15.09.2020 – 3 O 762/19: vorausgewählte Tracking-Häkchen/Nudging unwirksam).
- **Consent-Tool:** z. B. Usercentrics/Cookiebot, consentmanager, Borlabs (für Shopify-fremde Seiten), ca. 0–50 €/Monat. Alternativ **cookielose, serverseitige Reichweitenmessung** ohne Endgerätezugriff (z. B. selbst gehostetes Matomo im Cookieless-Modus, Plausible) – dann oft kein Banner nötig, aber Datenschutzerklärung.
- **Meta Pixel / Conversions API (CAPI):**
  - Pixel: Einwilligung nach § 25 TDDDG + Art. 6 Abs. 1 lit. a DSGVO; gemeinsame Verantwortlichkeit mit Meta für die Erhebung (EuGH C-40/17 *Fashion ID*, 29.07.2019) → Hinweise in Datenschutzerklärung, Meta-Controller-Addendum akzeptieren.
  - CAPI (serverseitig) umgeht **nicht** die DSGVO: Übermittlung von E-Mail-Hash/Event an Meta braucht ebenfalls Einwilligung; nur senden, wenn der Nutzer im Banner zugestimmt hat.
  - **Niemals Gesundheits-/Religions-Signale übertragen:** keine Events oder URLs wie `/plan/laktosefrei`, `AllergySelected`, `Goal=Abnehmen`, keine Custom Audiences aus Allergie-Listen. Das wäre nach *Lindenapotheke* Art.-9-Übermittlung **und** verstößt gegen Metas Business-Tools-Nutzungsbedingungen (Verbot sensibler Daten).
  - **EuGH, Urt. v. 04.07.2023 – C-252/21 (Meta/Bundeskartellamt):** Wer Websites mit sensiblem Bezug besucht und dort Daten eingibt, gibt Daten nicht „offensichtlich öffentlich“ preis; Meta braucht dafür ausdrückliche Einwilligung.
- **Meta-Werbung und Gesundheits-Zielgruppen:**
  - Detailed-Targeting-Optionen zu Gesundheit, Religion, sexueller Orientierung, Politik hat Meta bereits **ab 19.01.2022** weltweit entfernt.
  - **Art. 26 Abs. 3 DSA** (VO (EU) 2022/2065, für Plattformen seit 17.02.2024): Online-Plattformen dürfen **keine Werbung auf Basis von Profiling mit Art.-9-Daten** anzeigen → in der EU kein Targeting nach Gesundheit/Religion möglich, auch nicht über Umwege (Lookalikes aus Allergie-Listen).
  - **Seit Januar 2025** beschränkt Meta Werbetreibende, deren Website/App als „Health & Wellness“ eingestuft wird: untere Funnel-Events (Purchase, AddToCart u. a.) werden blockiert oder nicht zur Optimierung zugelassen; Berichte nennen für EU-Konten eine Ausweitung ab Juni 2025 **[nur Sekundärquellen, Meta-Hilfebereich prüfen]**. Ein Fitness-/Diät-Planer kann in diese Kategorie fallen; ein „Küchen-/Kochplaner“ (Montage, Familie, Budget) eher nicht. **Konsequenz:** Fitness-Variante auf eigener Domain/Subdomain mit neutralen Events (ViewContent, Lead) testen; Positionierung „Kochen/Einkaufen/Meal-Prep“ statt „Diät/Abnehmen“.
- **Double-Opt-in** für Newsletter (BGH, Urt. v. 10.02.2011 – I ZR 164/09; § 7 Abs. 2 Nr. 2 UWG); Bestandskunden-Ausnahme § 7 Abs. 3 UWG nur für ähnliche eigene Produkte mit Widerspruchshinweis.

### 4.5 Impressum § 5 DDG 🟢
- Seit 14.05.2024 **§ 5 DDG** (statt § 5 TMG). Pflichtangaben: vollständiger Name, **ladungsfähige Anschrift** (kein Postfach; reine „Impressumsservice“-Adresse ohne Zustellmöglichkeit ist riskant), **E-Mail** und weiterer schneller Kontaktweg (Kontaktformular oder Telefon), USt-IdNr. (falls vorhanden) bzw. **Wirtschafts-Identifikationsnummer** (§ 139c AO, wird seit Nov. 2024 schrittweise vergeben), bei UG: Registergericht, HRB-Nummer, Geschäftsführer.
- Die E-Mail muss echte Kommunikation ermöglichen (KG Berlin, Urt. v. 11.08.2026 – 5 UKl 1/26, Amazon, laut vzbv **[Volltext prüfen]**).
- Redaktionelle Inhalte (Blog, Rezept-Ratgeber, Newsletter): zusätzlich **Verantwortlicher nach § 18 Abs. 2 MStV** mit Anschrift.
- **OS-Plattform-Link entfernen:** Die ODR-Verordnung (EU) 524/2013 wurde durch VO (EU) 2024/3228 aufgehoben; die Plattform ist seit **20.07.2025** abgeschaltet, ein Link darauf ist überflüssig und kann irreführen. Hinweis nach § 36 VSBG (Teilnahme an Verbraucherschlichtung) ist für Unternehmer mit **≤ 10 Beschäftigten** nicht Pflicht (§ 36 Abs. 3 VSBG), freiwillige Erklärung „Wir nehmen nicht teil“ ist üblich.
- Impressum aus der App heraus mit max. zwei Klicks erreichbar (in PWA: Menü „Impressum“). **Auch die Shopify-Shops prüfen (OS-Link entfernen).**
- Privatsphäre: Wohnadresse wird öffentlich. Alternative: Geschäftsadresse (Coworking/Büroservice mit echter Postannahme und Zustellungsmöglichkeit, ca. 10–30 €/Monat).

---

## 5. Health-Claims-VO, HWG, UWG – was die Werbung sagen darf

### 5.1 Gilt die Health-Claims-VO (EG) 1924/2006 für eine App und ihre Werbung? 🟡
- **Anwendungsbereich (Art. 1 Abs. 2 HCVO):** nährwert- und gesundheitsbezogene Angaben **in kommerziellen Mitteilungen** bei Kennzeichnung, Aufmachung und Werbung **für Lebensmittel**, die als solche an Endverbraucher abgegeben werden. „Angabe“ ist jede Aussage, die einem **Lebensmittel** besondere Eigenschaften zuschreibt (Art. 2 Abs. 2 Nr. 1).
- Die App selbst ist **kein Lebensmittel**. Werbung, die nur die Software bewirbt („Plan in 2 Minuten“, „passt zu deinem Wasserkocher“), fällt **nicht** unter die HCVO.
- **Aber:** Sobald die Werbung **Rezepten, Gerichten oder konkreten Lebensmitteln** Eigenschaften zuschreibt („proteinreiche Gerichte“, „Skyr-Bowl stärkt deine Muskeln“), wird es zur Angabe über Lebensmittel. Der EuGH legt „kommerzielle Mitteilung“ weit aus (EuGH, Urt. v. 14.07.2016 – C-19/15 *Innova Vital*: auch Mitteilungen an Fachkreise; EuGH, Urt. v. 18.07.2013 – C-299/12 *Green – Swan Pharmaceuticals*: Angabe ist auch, was der Durchschnittsverbraucher als Wirkungsversprechen versteht). Zwingend anwendbar ist die HCVO, wenn der Inhaber **konkrete Produkte** bewirbt (Affiliate-Links zu Proteinpulver, Kooperation mit Supermarkt/Marke, eigene Lebensmittel, Meal-Prep-Boxen).
- **Arbeitsregel:** Werbung und App-Texte so formulieren, als gälte die HCVO. Was die HCVO verbietet, ist über **§ 5 UWG** (Irreführung) und § 3a UWG ohnehin abmahnfähig. Die Rechtsprechung zu Kochbüchern/Rezeptportalen ist dünn **[keine einschlägige BGH-Entscheidung bekannt]**, daher vorsichtig.

### 5.2 Nährwertbezogene Angaben (Anhang HCVO) – nur, wenn das Rezept die Bedingung erfüllt
| Angabe | Bedingung (je 100 g bzw. Anteil am Brennwert des Gerichts) |
|---|---|
| **„proteinreich“** / „hoher Proteingehalt“ | mind. **20 %** des Brennwerts aus Protein |
| „Proteinquelle“ | mind. **12 %** des Brennwerts aus Protein |
| „kalorienarm“/„energiearm“ | ≤ 40 kcal/100 g (fest), ≤ 20 kcal/100 ml (flüssig) |
| „energiereduziert“ | mind. 30 % weniger Brennwert als Vergleichsprodukt, Merkmal angeben |
| „fettarm“ | ≤ 3 g Fett/100 g |
| „zuckerarm“ | ≤ 5 g Zucker/100 g |
| „ballaststoffreich“ | ≥ 6 g/100 g oder ≥ 3 g/100 kcal |
| „ballaststoffquelle“ | ≥ 3 g/100 g oder ≥ 1,5 g/100 kcal |
→ Im Planer berechnen und **nur dann** das Label setzen. „High Protein“ ist dieselbe Angabe auf Englisch. Für Mahlzeiten-Pläne („proteinreicher Wochenplan“) gilt dieselbe 20-%-Logik für den Gesamtplan.

### 5.3 Gesundheitsbezogene Angaben, Muskelaufbau 🟡
- Zugelassene Angaben nach **VO (EU) Nr. 432/2012** (Unionsliste, EU Register of health claims):
  - „Protein trägt zu einer **Zunahme an Muskelmasse** bei.“
  - „Protein trägt zur **Erhaltung von Muskelmasse** bei.“
  - „Protein trägt zur Erhaltung normaler Knochen bei.“
  - **Bedingung:** nur für Lebensmittel, die mindestens **„Proteinquelle“** sind (≥ 12 % Energie aus Protein).
- Wortlaut darf nur sinngleich abgewandelt werden („hilft beim Aufbau von Muskelmasse“ ist vertretbar; „baut Muskeln auf“, „mehr Muskeln in 4 Wochen“ nicht).
- **Art. 10 Abs. 3 HCVO:** Allgemeine Wohlbefindens-Aussagen („gut für deine Fitness“) nur mit beigefügter **zugelassener** spezieller Angabe.
- **Art. 12 HCVO – verboten:** (a) Angaben, die nahelegen, die Gesundheit leide, wenn man das Lebensmittel nicht verzehrt; (b) **Angaben über Dauer oder Ausmaß der Gewichtsabnahme**; (c) Verweise auf Empfehlungen **einzelner Ärzte** oder Angehöriger von Gesundheitsberufen.
- Zugelassene Abnehm-Angaben gibt es nur für bestimmte Stoffe/Produkte (z. B. Glucomannan, Mahlzeitenersatz für eine Gewichtskontrolle) – **nicht** für Rezepte oder Pläne.

### 5.4 Krankheitsbezug – § 11 LFGB / Art. 7 Abs. 3 LMIV, HWG 🔴
- Lebensmitteln dürfen **keine Eigenschaften der Vorbeugung, Behandlung oder Heilung menschlicher Krankheiten** zugeschrieben werden (Art. 7 Abs. 3, Abs. 4 LMIV, durchgesetzt über § 11 LFGB). Also kein „Rezepte gegen Bluthochdruck“, „bei Diabetes“.
- **HWG:** Gilt für Werbung für „andere Mittel, **Verfahren**, Behandlungen“, wenn sich die Aussage auf Erkennen, Beseitigen oder Lindern von **Krankheiten**, Leiden, Körperschäden oder krankhaften Beschwerden bezieht (§ 1 Abs. 1 Nr. 2 HWG). Ein Ernährungsplan ist ein solches „Verfahren“, **sobald** die Werbung Krankheiten adressiert (Adipositas, Diabetes, Reizdarm, Gicht, Fettleber). Dann: Irreführungsverbot mit Erfolgsgarantie-Verbot (§ 3 S. 2 Nr. 2a HWG), Verbot von Vorher-nachher-Bildern bei bestimmten Eingriffen (§ 11 Abs. 1 Nr. 5 HWG), Werbeverbot für bestimmte Krankheiten gegenüber Laien (§ 12 HWG i. V. m. Anlage). Bei bloßem Lifestyle („fitter“, „Meal-Prep für die Woche“) ist das HWG **nicht** anwendbar.
- **Abnehmversprechen allgemein:** Auch ohne HCVO irreführend, wenn nicht belegt (§ 5 UWG; strenger Maßstab bei gesundheitsbezogener Werbung: BGH, Urt. v. 06.02.2013 – I ZR 62/11 *Basisinsulin mit Gewichtsvorteil* – Aussagen müssen gesicherter wissenschaftlicher Erkenntnis entsprechen).

### 5.5 UWG, Bewertungen, Influencer 🔴
- **§ 5 UWG:** Keine unbelegten Zahlen („spart 80 € im Monat“) – nur mit eigener nachvollziehbarer Berechnung („Beispielplan: 2 Personen, Aldi, Preisstand 10/2026: 41,20 €/Woche“).
- **Bewertungen:** keine erfundenen oder gekauften Kundenstimmen (UWG Anhang Nr. 23b/23c); bei angezeigten Bewertungen angeben, **ob und wie** geprüft wird, dass sie von echten Nutzern stammen (§ 5b Abs. 3 UWG).
- **Influencer:** Kommerzieller Zweck muss erkennbar sein (§ 5a Abs. 4 UWG; § 6 Abs. 1 Nr. 1 DDG; § 22 Abs. 1 MStV). Kennzeichnung „**Werbung**“ oder „**Anzeige**“ am Anfang, gut sichtbar, nicht nur in Hashtag-Wolke. BGH, Urt. v. 09.09.2021 – I ZR 90/20 (*Cathy Hummels*), I ZR 125/20, I ZR 126/20: Kennzeichnung entbehrlich nur ohne Gegenleistung; bei Provision/Affiliate/Gratis-Zugang ist immer zu kennzeichnen. Der Inhaber haftet als Auftraggeber mit (§ 8 Abs. 2 UWG analog/Beauftragtenhaftung) → schriftliches Creator-Briefing mit Claim-Liste.
- **Vergleichende Werbung** (§ 6 UWG) mit Yazio/HelloFresh nur sachlich, nachprüfbar, aktuell.

### 5.6 Formulierungsliste
**15 erlaubte bzw. vertretbare Formulierungen** 🟢
1. „Dein Wochenplan – passend zu Wasserkocher, Mikrowelle und einer Herdplatte.“
2. „Einkaufsliste nach Laden sortiert – fertig in zwei Minuten.“
3. „Rezepte ohne Erdnüsse, ohne Gluten-Zutaten oder ohne Milch filtern.“ (Filter, kein Gesundheitsversprechen)
4. „Mit Makro-Rechner: Du gibst Kalorien, Protein, Kohlenhydrate und Fett vor, der Plan richtet sich danach.“
5. „Proteinreich: mind. 20 % der Energie aus Protein“ (nur bei Rezepten, die das erfüllen, mit Kennzeichnung im Rezept)
6. „Protein trägt zu einer Zunahme an Muskelmasse bei.“ (nur bei Rezepten ≥ 12 % Energie aus Protein)
7. „Meal-Prep für 5 Arbeitstage, hält gekühlt bis zu 3 Tage“ (mit BfR/BZfE-Quelle zur Haltbarkeit)
8. „Beispielwoche für 2 Personen bei Aldi: 41,20 € (Preisstand 10/2026, regionale Abweichungen möglich).“
9. „Für Leute auf Montage: Kochen im Monteurzimmer ohne Backofen.“
10. „Weniger Grübeln, was es heute gibt.“
11. „Planbar essen in der Schicht- oder Montagewoche.“
12. „Vegetarisch, vegan oder mit Fleisch – du entscheidest.“
13. „Nährwerte pro Portion berechnet aus BLS-Daten“ (wenn zutreffend, mit Hinweis „Richtwerte“)
14. „Kündbar mit zwei Klicks, monatlich.“ (nur wenn wahr; Hinweis auf Gesetzeslage ist keine Werbung mit Selbstverständlichkeiten, wenn nicht als Besonderheit herausgestellt)
15. „Kalorienziel selbst festlegen – Zahlen statt Versprechen.“

**15 verbotene bzw. hochriskante Formulierungen** 🔴
1. „Verliere 5 kg in 4 Wochen.“ (Art. 12 lit. b HCVO, § 5 UWG)
2. „Garantiert abnehmen.“ (§ 3 S. 2 Nr. 2a HWG analog, § 5 UWG)
3. „Bauchfett weg mit unserem Plan.“ (spezifische Gewichts-/Körperfett-Aussage, unbelegt)
4. „Baut in 30 Tagen sichtbar Muskeln auf.“ (Abwandlung des zugelassenen Claims + Zeitversprechen)
5. „Der Ernährungsplan bei Diabetes / Reizdarm / Bluthochdruck.“ (Krankheitsbezug: Art. 7 Abs. 3 LMIV, HWG, MDR-Risiko)
6. „Allergiesicher“, „100 % allergenfrei“. (nicht beherrschbar – Spuren, Rezepturänderungen der Hersteller)
7. „Von Ärzten empfohlen“ / „Dr. X empfiehlt“. (Art. 12 lit. c HCVO, § 11 HWG)
8. „Stärkt dein Immunsystem.“ (nicht zugelassen für Pläne/Rezepte; Immun-Claims nur für bestimmte Nährstoffe mit Bedingungen)
9. „Detox-Wochenplan“, „entgiftet“. (nicht zugelassen, irreführend)
10. „Boostet deinen Stoffwechsel.“ / „Fatburner-Rezepte“. (nicht zugelassen)
11. „Ohne Verzicht abnehmen.“ (Abnehmversprechen ohne Beleg)
12. „Proteinreich“ bei einem Gericht mit 15 % Energie aus Protein. (Anhang HCVO)
13. „Tausende zufriedene Kunden“ / erfundene Bewertungen vor dem Launch. (UWG Anhang Nr. 23b/c, § 5 UWG)
14. „Spare 200 € im Monat.“ ohne Berechnungsgrundlage. (§ 5 UWG)
15. „Jetzt kostenlos testen“ als Bestellbutton bei Auto-Abo. (§ 312j Abs. 3 BGB, UWG Anhang Nr. 21)

---

## 6. MDR (EU) 2017/745 – wann wäre der Planer ein Medizinprodukt?

### 6.1 Maßstab 🟡
- **Medizinprodukt** ist auch **Software**, die vom Hersteller für Diagnose, Verhütung, Überwachung, Vorhersage, Prognose, Behandlung oder Linderung von **Krankheiten** bestimmt ist (Art. 2 Nr. 1 MDR). Entscheidend ist die **Zweckbestimmung des Herstellers** – und dazu gehören ausdrücklich **Werbe- und Verkaufsmaterialien** (Art. 2 Nr. 12 MDR).
- **EuGH, Urt. v. 07.12.2017 – C-329/16 (*Snitem*):** Software ist Medizinprodukt, wenn der Hersteller sie spezifisch für einen medizinischen Zweck bestimmt; eine allgemeine Wellness-Nutzung genügt nicht.
- **ErwG 19 MDR:** Software für **Lebensstil und Wohlbefinden** ist kein Medizinprodukt.
- **MDCG 2019-11** (Qualifizierung und Klassifizierung von Software, Okt. 2019, Rev. 1 Juni 2025 **[Revision prüfen]**): Entscheidungsbaum – Software → führt sie eine Aktion an Daten aus, die über Speichern/Archivieren/einfache Suche hinausgeht? → **zum Nutzen einzelner Patienten** mit **medizinischem Zweck**? Nur dann MDSW.
- **Regel 11 (Anhang VIII):** Software, die Informationen für Entscheidungen zu **diagnostischen oder therapeutischen Zwecken** liefert, ist mindestens **Klasse IIa** (Benannte Stelle, Konformitätsbewertung, QM-System, klinische Bewertung – für einen Ein-Personen-Betrieb wirtschaftlich unmöglich). Übrige MDSW: Klasse I.
- BfArM: Orientierungshilfe „Medical Apps“ / Abgrenzung **[Link prüfen]**.

### 6.2 Abgrenzung für den Essensplaner
| Funktion / Aussage | Einordnung | Ampel |
|---|---|---|
| Geräte-, Budget-, Laden-, Personenfilter | kein Medizinprodukt | 🟢 |
| Makro-/Kalorienziel des Nutzers einhalten | Lifestyle | 🟢 |
| Allergen-**Ausschlussfilter** („ohne Sellerie“) | Lifestyle/Verbraucherinformation, keine Diagnose/Therapie | 🟢 |
| Kalorienbedarf aus Gewicht/Größe/Aktivität schätzen (Mifflin-St-Jeor) „für dein Ziel“ | Grenzbereich, solange allgemein (Fitness) unkritisch | 🟡 |
| „Ernährungsplan **bei Zöliakie**“, „Low-FODMAP **bei Reizdarm**“, „histaminarm **bei Histaminintoleranz**“ | Zweck = Linderung/Management einer Krankheit → **MDSW-Risiko**, zusätzlich HWG | 🔴 |
| Diabetes-Modus mit **BE/KE-, Insulin- oder Blutzucker-Berechnung** | klar MDSW, Regel 11 → IIa/IIb | 🔴 |
| Gewichtsreduktion „bei Adipositas“, BMI-Auswertung mit Handlungsempfehlung | MDSW-Risiko | 🔴 |
| Schwangerschafts-Modus (Lebensmittel meiden: Rohmilch, Listerien) als **Ernährungsinformation** nach BfR | Lifestyle/Information, kein Medizinprodukt, solange keine Diagnose/Therapie | 🟡 |

**Was vermeiden:** Krankheitsnamen in Produktname, Variante, Onboarding, Werbung und App-Store-Text; Begriffe „Therapie“, „Behandlung“, „Symptome“, „Patient“, „heilt/lindert“; Auswertung von Laborwerten, Blutzucker, Medikamenten; personalisierte Empfehlungen „wegen deiner Erkrankung“. **Formulierung stattdessen:** „Filter: ohne Gluten-Zutaten“, „ohne Laktose-Zutaten“ – plus Hinweis „Bei Allergien und Erkrankungen ersetzt der Planer keine ärztliche oder ernährungstherapeutische Beratung.“

---
## 7. Markenrecht & Domain

### 7.1 DPMA-Anmeldung – Ablauf 🟢
1. **Recherche** (kostenlos): DPMAregister (DE), **TMview** (alle EU-/nationalen Register), EUIPO eSearch, WIPO Global Brand Database; identische **und** ähnliche Zeichen in den gewünschten Klassen prüfen (klangliche Ähnlichkeit, z. B. „Plantastic“ vs. „Plantastik“). Zusätzlich Google, App Stores, Handelsregister, Domain (RDAP).
2. **Waren-/Dienstleistungsverzeichnis** mit **TMclass**/DPMA-Klassifikationsdatenbank formulieren (vorformulierte Begriffe beschleunigen die Prüfung).
3. **Online-Anmeldung** über DPMAdirektWeb: **290 €** inkl. bis zu **3 Klassen**, jede weitere Klasse **100 €** (Papier 300 €). Gebühr binnen 3 Monaten zahlen, sonst gilt die Anmeldung als zurückgenommen. Beschleunigte Prüfung: + 200 €.
4. Prüfung auf Formalien und **absolute Schutzhindernisse** (§ 8 MarkenG), keine Prüfung älterer Rechte Dritter.
5. Eintragung (typisch 3–6 Monate, beschleunigt ca. 1–2 Monate), Veröffentlichung → **3 Monate Widerspruchsfrist** (§ 42 MarkenG).
6. Schutzdauer 10 Jahre, Verlängerung 750 € inkl. 3 Klassen; **Benutzungsschonfrist 5 Jahre** (§ 26 MarkenG) – die Marke muss danach benutzt werden.

**Klassen (Nizza, 12. Ausgabe/NCL 2026):**
| Klasse | Inhalt | Empfehlung |
|---|---|---|
| **9** | herunterladbare Software, Apps, herunterladbare E-Books | **ja** |
| **42** | SaaS, Bereitstellung nicht herunterladbarer Software, Plattformen | **ja** |
| **41** | Bereitstellung nicht herunterladbarer elektronischer Publikationen, Online-Kurse, Kochkurse | **ja** (E-Book-/Content-Seite) |
| 44 | Ernährungsberatung, Diätberatung | optional (+100 €), falls die Marke stark auf Fitness/Ernährung zielt – Kollisionsrisiko mit Ernährungsberater-Marken |
| 16 | gedruckte Kochbücher, Planer-Hefte | optional, falls Print geplant |
| 35 | Werbung, Online-Einzelhandel, Vermittlung von Waren | eher nein (nur bei eigenem Shop-/Affiliate-Geschäftsmodell) |
→ **Basis: 9 + 42 + 41 für 290 €.** Dachmarke zuerst; Nischen-Varianten zunächst als Untertitel („[Marke] Montage“), später eigene Marken.

### 7.2 EUIPO 🟢
- Unionsmarke online: **850 €** für 1 Klasse, **50 €** für die 2. Klasse, **150 €** je weitere Klasse → 9+42+41 = **1.050 €**. Schutz in allen 27 EU-Staaten (inkl. AT), nicht Schweiz (CH separat beim IGE oder per WIPO-Madrid).
- **KMU-Fonds** der EUIPO („SME Fund“) erstattete in den Vorjahren 75 % der Anmeldegebühren für KMU (auch Einzelunternehmer) – Neuauflage 2026 **[Antragsfenster prüfen]**.
- Strategie: DPMA zuerst (günstig, schnell), innerhalb von **6 Monaten** Priorität für EUIPO nutzen (Art. 34 UMV), wenn sich das Produkt bewährt.

### 7.3 Beschreibende Namen (§ 8 MarkenG) 🔴
- Zurückgewiesen werden Zeichen **ohne Unterscheidungskraft** (§ 8 Abs. 2 Nr. 1) und **beschreibende Angaben** (§ 8 Abs. 2 Nr. 2), z. B. „Essensplaner“, „Meal Planner“, „Montageküche“, „FitMealPlan“, „Wochenplan24“.
- Selbst eingetragen sind schwache Marken wenig wert: Dritte dürfen beschreibende Angaben weiter nutzen (§ 23 Abs. 1 Nr. 2 MarkenG), Schutzumfang eng.
- Gute Marken: Fantasiewort oder unerwartete Kombination (wie „DURCHSCHICHT“, „BeeQueen“). Wortmarke **und** ggf. später Wort-Bildmarke.

### 7.4 Domain vs. Marke, Werktitel 🟡
- Eine Domain verschafft **kein** Markenrecht. Sie kann aber durch Benutzung ein **Unternehmenskennzeichen** oder einen **Werktitel** begründen (§ 5 MarkenG). Apps sind titelschutzfähig (BGH, Urt. v. 28.01.2016 – I ZR 202/14 *wetter.de*), aber nur mit Unterscheidungskraft.
- **Titelschutzanzeige** (z. B. im Titelschutz-Anzeiger, ca. 50–150 €) sichert den App-Titel bis zu 6 Monate vor Markteintritt vorab – günstige Ergänzung zur Marke.
- Domain nicht kaufen, bevor die Markenrecherche frei ist (Kollision → Unterlassung + Freigabe der Domain, § 14 MarkenG, § 12 BGB).
- Supermarktnamen in der App (Aldi, Lidl, Rewe …): **beschreibende Nennung zulässig** (§ 23 Abs. 1 Nr. 3 MarkenG, Hinweis auf Bestimmung), **keine Logos**, kein Eindruck einer Partnerschaft („in Kooperation mit“), Hinweis „Markennamen gehören den jeweiligen Inhabern, keine Verbindung“.

---

## 8. Lebensmittelinformation (LMIV) & Haftung für Allergen-Angaben

### 8.1 Gilt die LMIV für die App? 🟢 Nein (solange keine Lebensmittel verkauft werden)
- Die **VO (EU) 1169/2011 (LMIV)** verpflichtet **Lebensmittelunternehmer** (Art. 1 Abs. 3, Art. 8 LMIV). Lebensmittelunternehmen ist, wer mit Produktion, Verarbeitung oder Vertrieb von Lebensmitteln befasst ist (Art. 3 Nr. 2 VO (EG) 178/2002). Ein Rezept- und Planungsanbieter, der **keine Lebensmittel abgibt**, ist das nicht. Keine Pflicht zur Allergenkennzeichnung nach Art. 9 Abs. 1 lit. c, Art. 21 LMIV, keine Nährwertdeklaration nach Art. 30 LMIV.
- **Ändert sich**, wenn der Inhaber Lebensmittel, Meal-Prep-Boxen, Gewürzmischungen oder Kochboxen verkauft (dann Fernabsatz-Pflichtangaben vor Kaufabschluss, Art. 14 LMIV) oder in Kooperation mit einem Händler als dessen Vertriebskanal auftritt.
- **Freiwillige Angaben** (Nährwerte, Allergene im Rezept) müssen trotzdem **richtig** sein: Irreführung (§ 5 UWG), Produktmangel (§ 327e BGB), Haftung.
- Orientierung trotzdem an den **14 Hauptallergenen** aus Anhang II LMIV (glutenhaltiges Getreide, Krebstiere, Eier, Fisch, Erdnüsse, Soja, Milch/Laktose, Schalenfrüchte, Sellerie, Senf, Sesam, Schwefeldioxid/Sulfite > 10 mg/kg, Lupinen, Weichtiere) – Nutzer kennen diese Liste.

### 8.2 Haftung bei falschen Allergen-Angaben 🔴
- **Vertrag:** Falsches Allergen-Tag = Mangel (§§ 327e, 327i BGB) → Schadensersatz bei Verschulden (§ 280 BGB); Haftung für Körper/Gesundheit **nicht** per AGB ausschließbar (§ 309 Nr. 7 lit. a BGB).
- **Delikt:** § 823 Abs. 1 BGB (Gesundheitsverletzung) bei Fahrlässigkeit, z. B. ungeprüfte KI-Rezepte.
- **Neue Produkthaftungsrichtlinie (EU) 2024/2853:** Software ist ausdrücklich **Produkt**; verschuldensunabhängige Haftung für Personenschäden durch fehlerhafte Software. Umsetzungsfrist **09.12.2026**, gilt für ab dann in Verkehr gebrachte Produkte (und wesentliche Updates). Deutsches Umsetzungsgesetz (neues ProdHaftG) **[Stand prüfen]**. Haftungsausschluss gegenüber Geschädigten nicht möglich.
- **Disclaimer** hilft nur begrenzt (gegen Mitverschulden § 254 BGB und für Erwartungshorizont), ist aber sinnvoll: „Die Allergen-Filter beruhen auf Standardzutaten. Rezepturen und Spuren-Hinweise der Hersteller ändern sich. **Prüfe bei Allergien immer das Zutatenverzeichnis auf der Verpackung.** Der Planer ersetzt keine ärztliche Beratung.“ – im Onboarding (Allergie-Auswahl) aktiv anzeigen, nicht nur in AGB.
- **Maßnahmen:** konservatives Tagging (im Zweifel „enthält“), Zutaten-Stammdaten mit Allergen-Mapping, Vier-Augen-Prüfung oder Testsuite für jedes Rezept, Versionsprotokoll, keine „allergenfrei“-Aussagen, „Kann Spuren enthalten“-Hinweis bei Fertigprodukten, Fehler-Meldeknopf mit schneller Korrektur. Plus **Betriebshaftpflicht mit Produkt- und Vermögensschadenbaustein**, die Software/Online-Inhalte einschließt.

---

## 9. AGB, Jugendschutz, Barrierefreiheit, KI-Verordnung, Geoblocking

### 9.1 AGB 🟢 (nicht Pflicht, praktisch nötig)
- Gesetzlich keine AGB-Pflicht; Pflichtinformationen (Art. 246a EGBGB: Identität, Eigenschaften, Preis, Laufzeit, Kündigung, Widerruf, Gewährleistung, Funktionalität/Kompatibilität/Interoperabilität digitaler Produkte) müssen aber **vor Vertragsschluss** gegeben werden.
- AGB regeln sinnvoll: Vertragsschluss, Laufzeit/Verlängerung (§ 309 Nr. 9), Kündigung (§ 312k), Testphase, Preise/Preisänderung (Zustimmungslösung), Nutzungsrechte an Rezepten/Plänen (privat, nicht kommerziell weiterverkaufen), Fair-Use bei KI-Generierung, Produktänderungen (§ 327r), Haftung (§ 309 Nr. 7-konform), Verfügbarkeit, Kontosperrung, Rechtswahl (bei Verbrauchern nur ohne Entzug zwingenden Rechts, Art. 6 Abs. 2 Rom I), Gerichtsstand (gegenüber Verbrauchern unwirksam).
- Bei MoR: AGB des MoR für den Kauf + eigene **Nutzungsbedingungen** für die App. Widersprüche vermeiden.
- Vorlagen: Händlerbund, IT-Recht Kanzlei, Trusted Shops (ca. 10–40 €/Monat, inkl. Abmahnschutz-Updates) **oder** einmalig Anwalt (ca. 800–2.000 € für AGB+Datenschutz+Widerruf eines Abo-SaaS).

### 9.2 Jugendschutz und Minderjährige 🟡
- **Art. 8 DSGVO:** Deutschland hat die Altersgrenze nicht abgesenkt → bei **Einwilligung** (z. B. Art. 9-Daten, Tracking) eines Kindes **unter 16** ist die Zustimmung der Eltern nötig. Österreich: 14.
- **Vertragsrecht:** Minderjährige (7–17) sind beschränkt geschäftsfähig (§§ 106 ff. BGB); ein Abo ist über den „Taschengeldparagrafen“ (§ 110 BGB) i. d. R. **nicht** wirksam, weil Raten künftig fällig werden. → **Bezahlabo ab 18**, kostenlose Version ab 16.
- **Fitness/Gewicht:** keine Kalorien-Defizit-Pläne für unter 18-Jährige (Essstörungsrisiko, Reputations- und Haftungsrisiko); Altersabfrage im Onboarding (Selbstauskunft genügt hier), Fitness-Variante ab 18.
- JMStV: Inhalte sind nicht entwicklungsbeeinträchtigend; keine Altersverifikation nötig.

### 9.3 Barrierefreiheitsstärkungsgesetz (BFSG, ab 28.06.2025) 🟢 für den Inhaber derzeit
- Erfasst u. a. **Dienstleistungen im elektronischen Geschäftsverkehr** (§ 1 Abs. 3 Nr. 5 BFSG – jede online angebotene Dienstleistung mit Vertragsschluss, also auch der Abo-Verkauf der App) und **E-Books und dafür bestimmte Software** (§ 1 Abs. 3 Nr. 4 BFSG).
- **Kleinstunternehmen-Ausnahme:** Kleinstunternehmen, die **Dienstleistungen** erbringen, sind **vollständig ausgenommen** (§ 3 Abs. 3 BFSG). Kleinstunternehmen = **weniger als 10 Beschäftigte** und **Jahresumsatz ≤ 2 Mio. €** oder Jahresbilanzsumme ≤ 2 Mio. € (§ 2 Nr. 17 BFSG). Die Ausnahme gilt **nur für Dienstleistungen**; für **Produkte** (Hardware wie E-Reader, Selbstbedienungsterminals) gibt es keine Ausnahme von den Anforderungen, nur Erleichterungen bei Formalitäten. App-Abo und E-Book-Verkauf sind Dienstleistungen → **ausgenommen**.
- Zählweise: Vollzeitäquivalente; ausgebaute Freelancer zählen nicht. Wer über die Grenzen wächst, muss die Anforderungen (WCAG 2.1 AA / EN 301 549, Barrierefreiheitserklärung) dann erfüllen.
- **Empfehlung:** Trotzdem grundlegende Barrierefreiheit bauen (Kontraste, Schriftgrößen, Tastatur, Screenreader-Labels, Alt-Texte) – kostet bei Neubau wenig, verbessert Conversion und erspart späteren Umbau. Kein Hinweis „barrierefrei“ werben, wenn nicht geprüft (§ 5 UWG).

### 9.4 KI-Verordnung (VO (EU) 2024/1689) 🟡
- Ein Ernährungsplaner ist **kein Hochrisiko-KI-System** (Anhang III nicht einschlägig; wäre er Medizinprodukt Klasse IIa, wäre er über Art. 6 Abs. 1 hochriskant – ein weiterer Grund, die MDR zu meiden).
- **Art. 50 Abs. 1** (gilt ab **02.08.2026**): Interagieren Nutzer mit einem KI-System (Chat-Assistent „Frag den Koch“), muss erkennbar sein, dass es eine KI ist. Generierte Pläne ohne Chat: Hinweis „Plan automatisch erstellt“ genügt.
- **Art. 4** (seit 02.02.2025): KI-Kompetenz der Personen, die KI im Betrieb einsetzen – beim Ein-Personen-Betrieb: dokumentieren, dass KI-Rezepte vor Veröffentlichung fachlich geprüft werden.
- KI-generierte **Food-Fotos** (Higgsfield): kein Deepfake i. S. v. Art. 50 Abs. 4, aber Irreführung vermeiden – Fotos müssen das Rezept realistisch zeigen; Hinweis „Abbildung KI-generiert, Serviervorschlag“ ist sauber.
- Hinweis: EU-„Digital Omnibus“ zur Verschiebung einzelner Fristen wurde 2025/2026 diskutiert **[aktuellen Stand prüfen]**.

### 9.5 Geoblocking-VO (EU) 2018/302 🟢
- Kunden aus anderen EU-Staaten dürfen bei elektronischen Dienstleistungen nicht wegen Staatsangehörigkeit/Wohnsitz anders behandelt oder umgeleitet werden (Art. 3, Art. 4 Abs. 1 lit. b). Unterschiedliche Preise je Land sind zulässig, wenn jeder Kunde jede Länderversion kaufen kann. Mit MoR i. d. R. unkritisch.

---
## 10. Checkliste „Vor dem Launch erledigt“

**Gründung & Steuern**
- [ ] Gewerbe-Ummeldung (Tätigkeit „Entwicklung und Vertrieb von Software/Web-Apps und digitalen Inhalten“) bei der Gemeinde – **Inhaber**
- [ ] Steuerberater-Termin: Kleinunternehmer ja/nein für 2027 (Umsatzprognose aller drei Projekte zusammen), Behandlung der MoR-Gutschriften, Bundle-Aufteilung 7 %/19 % – **Inhaber**
- [ ] MoR auswählen (Paddle oder Digistore24), Konto verifizieren, Auszahlungskonto, Steuerdaten hinterlegen – **Inhaber**
- [ ] Buchhaltungssoftware (lexoffice/sevDesk) mit MoR-Gutschriften verbinden; GoBD-Ablage
- [ ] Betriebshaftpflicht mit Produkt-, Vermögensschaden- und Cyber-Baustein (Software/Online-Inhalte mitversichert) – **Inhaber**

**Marke**
- [ ] Namensrecherche DPMAregister + TMview + EUIPO eSearch + App Stores + Google + RDAP (.de/.com)
- [ ] DPMA-Anmeldung Klassen 9, 42, 41 (290 €), ggf. Titelschutzanzeige – **Inhaber zahlt**
- [ ] Domain(s) erst nach freier Recherche registrieren

**Verbraucherrecht im Bestell- und Kündigungsablauf**
- [ ] Bestellübersicht: Eigenschaften, Gesamtpreis, Abrechnungsrhythmus, Laufzeit, Verlängerung, Kündigungsfrist
- [ ] Bestellbutton „zahlungspflichtig bestellen“/„kostenpflichtig abonnieren“ (auch beim Testabo)
- [ ] Checkbox Widerruf (§ 356 Abs. 4 für Abo / Abs. 5 für E-Book/PDF), nicht vorangekreuzt; Text in Bestätigungs-Mail
- [ ] Muster-Widerrufsbelehrung + Muster-Formular; **Widerrufsfunktion** „Vertrag widerrufen“ (seit 19.06.2026)
- [ ] **„Verträge hier kündigen“** im Footer jeder Seite, ohne Login, Bestätigungsseite mit allen Feldern, „jetzt kündigen“, sofortige Bestätigungs-E-Mail, Speicher-/Druckfunktion; keine Halteangebote im Ablauf
- [ ] Laufzeiten: Monatsabo; Jahresabo max. 12 Monate, danach unbefristet mit max. 1 Monat Kündigungsfrist
- [ ] Preisangaben inkl. USt (bzw. § 19-Hinweis), Jahrespreis bei Jahresabo prominent
- [ ] Preisänderungen nur mit aktiver Zustimmung (Prozess + Mail-Vorlage)
- [ ] Test-Käufe und -Kündigungen mit Screenshots dokumentieren (Beweis bei Abmahnung)

**Buchpreisbindung**
- [ ] Kein E-Book als Gratis-Zugabe; Bundles nur als eigenes Festpreis-Produkt, überall gleicher Preis; keine Rabattcodes auf Produkte mit E-Book

**Datenschutz & Tracking**
- [ ] Architektur-Entscheidung: Profil/Allergien/Gewicht **nur lokal**; kein Versand an Server/LLM mit Personenbezug (in `essensplaner/CLAUDE.md` dokumentieren)
- [ ] Falls doch Server-Sync: ausdrückliche Einwilligung Art. 9, Verarbeitungsverzeichnis, DSFA, DSB benennen
- [ ] Datenschutzerklärung (App + Website + Newsletter + MoR + Hoster + Analytics)
- [ ] AVV mit Hoster (EU), Mail-Dienst, Analytics, ggf. KI-API (EU-Region, Zero-Retention)
- [ ] Consent-Tool mit „Ablehnen“ auf erster Ebene; Meta Pixel/CAPI/TikTok erst nach Opt-in
- [ ] **Event- und URL-Hygiene:** keine Gesundheits-, Diät-, Religions-Parameter an Werbenetzwerke
- [ ] Meta: Audience Network aus (Hausregel), keine Health-Interessen, Fitness-Variante mit neutralen Events testen
- [ ] Newsletter nur Double-Opt-in, Einwilligungs-Protokoll
- [ ] Löschen/Export-Funktion im Profil

**Impressum**
- [ ] Impressum nach § 5 DDG (ladungsfähige Anschrift, E-Mail + zweiter Kontaktweg, ggf. W-IdNr.), § 18 Abs. 2 MStV bei redaktionellen Inhalten, **ohne OS-Link**; auch in Shopify-Shops OS-Link entfernen

**Werbung & Inhalte**
- [ ] Claim-Liste (Abschnitt 5.6) als verbindliches Briefing für Texte, Ads und Creator
- [ ] Nährwert-Labels („proteinreich“, „Proteinquelle“) nur automatisch bei erfüllter Bedingung
- [ ] Keine Krankheitsnamen in Produkt, Varianten, Onboarding, Ads, Store-Texten (MDR/HWG)
- [ ] Preis-/Spar-Beispiele mit Datum, Laden, Annahmen
- [ ] Keine Kundenstimmen vor echten Kunden; Bewertungsprüfung offenlegen
- [ ] Influencer-Verträge mit Kennzeichnungspflicht „Werbung/Anzeige“ und Claim-Liste
- [ ] Supermarktnamen ohne Logos, Hinweis „keine Verbindung“

**Produkt & Haftung**
- [ ] Allergen-Mapping aller Zutaten (14 Hauptallergene), Testsuite, Vier-Augen-Prüfung KI-Rezepte
- [ ] Allergie-Hinweis aktiv im Onboarding („Verpackung prüfen“)
- [ ] Update- und Fehlerbehebungsprozess (§ 327f), Changelog
- [ ] KI-Hinweis bei Chat-/Generierungsfunktionen (Art. 50 KI-VO), „Abbildung KI-generiert“ bei Food-Fotos
- [ ] Altersgrenze: Bezahlabo ab 18, Fitness-/Gewichtsfunktionen ab 18
- [ ] AGB/Nutzungsbedingungen (Vorlagendienst oder Anwalt), abgestimmt mit MoR-AGB
- [ ] Grundlegende Barrierefreiheit (WCAG 2.1 AA als Ziel), obwohl BFSG-Ausnahme greift

---

## 11. Kostenaufstellung

### 11.1 Einmalig (Gründung/Launch, Einzelunternehmen)
| Posten | Kosten | Bemerkung |
|---|---|---|
| Gewerbe-Ummeldung | 10–65 € | je nach Gemeinde |
| DPMA-Marke (3 Klassen, online) | 290 € | + 100 € je weitere Klasse, + 200 € beschleunigt |
| Titelschutzanzeige (optional) | 50–150 € | |
| Domains (.de + .com, 1. Jahr) | 10–40 € | |
| Steuerberater-Erstberatung | 150–400 € | |
| Rechtstexte | 0–300 € (Vorlagendienst-Einstieg) **oder** 800–2.000 € (Anwalt, einmalig) | AGB, Datenschutz, Widerruf, Kündigungsstrecke prüfen lassen |
| Anwaltlicher Claim-/Werbe-Check (optional, empfehlenswert für Fitness-Variante) | 300–800 € | |
| **Summe (schlank)** | **ca. 500–1.200 €** | |
| **Summe (mit Anwalt)** | **ca. 1.600–3.700 €** | |
| *Optional später:* EUIPO-Unionsmarke (3 Klassen) | 1.050 € | ggf. 75 % Erstattung über SME Fund |
| *Optional:* UG-Gründung statt Einzelunternehmen | 500–900 € | Notar (Musterprotokoll), Handelsregister, Transparenzregister |

### 11.2 Laufend (pro Jahr, Einzelunternehmen)
| Posten | Kosten/Jahr | Bemerkung |
|---|---|---|
| Steuerberater (EÜR, ESt, GewSt, USt) | 800–1.800 € | bei Regelbesteuerung + laufende USt-VA ca. 600–1.800 € zusätzlich |
| Buchhaltungssoftware | 120–360 € | |
| Rechtstexte-Abo (Händlerbund/IT-Recht Kanzlei) | 120–480 € | inkl. Update-Service |
| Consent-Tool | 0–600 € | entfällt bei cookieloser Analytics ohne Pixel |
| Betriebshaftpflicht + Cyber | 200–600 € | Angebote einholen |
| Geschäftsadresse (optional, Privatsphäre) | 120–360 € | |
| IHK | 0 € (Gewinn ≤ 5.200 €) bzw. ca. 30–300 € | je nach IHK und Gewinn |
| Externer DSB | 0 € (bei lokaler Datenhaltung) bzw. 600–1.800 € | Pflicht, sobald DSFA-pflichtige Server-Verarbeitung |
| MoR-Gebühren | ca. 5–8 % + 0,50–1 € je Transaktion | ersetzt Zahlungsanbieter-Gebühren und OSS-Aufwand |
| **Summe Fixkosten (ohne MoR)** | **ca. 1.400–3.800 €** | Ziel: mit lokaler Datenhaltung unteres Ende |

### 11.3 Zum Vergleich UG (pro Jahr)
StB 1.800–3.500 €, IHK 150–300 €, Offenlegung ca. 10–50 €, Geschäftskonto ca. 100–250 € → **ca. 1.000–1.800 € Mehrkosten** gegenüber Einzelunternehmen. Lohnt sich erst bei deutlich höheren Gewinnen oder erhöhtem Haftungsrisiko.

---

## 12. Quellenverzeichnis (abgerufen am 28.10.2026)

**Gesetze (Normtexte)**
- BGB (§§ 309, 312j, 312k, 327 ff., 356, 357a): https://www.gesetze-im-internet.de/bgb/
- EGBGB, Art. 246a + Anlagen 1/2 (Muster-Widerruf): https://www.gesetze-im-internet.de/bgbeg/
- UStG (§§ 3a, 12, 18j, 19, 19a): https://www.gesetze-im-internet.de/ustg_1980/
- UStAE: https://www.bundesfinanzministerium.de (Umsatzsteuer-Anwendungserlass, aktuelle Fassung)
- BZSt – One-Stop-Shop: https://www.bzst.de/DE/Unternehmen/Umsatzsteuer/One-Stop-Shop_EU/one_stop_shop_eu_node.html
- BZSt – EU-Kleinunternehmerregelung: https://www.bzst.de/DE/Unternehmen/Umsatzsteuer/EU-Kleinunternehmerregelung/eu-kleinunternehmerregelung_node.html
- ESTV Schweiz – MWST für ausländische Unternehmen: https://www.estv.admin.ch
- GewO § 14: https://www.gesetze-im-internet.de/gewo/__14.html
- GewStG § 11: https://www.gesetze-im-internet.de/gewstg/__11.html
- GmbHG §§ 2, 5a, 7, 13: https://www.gesetze-im-internet.de/gmbhg/
- AO §§ 139c, 141, 147: https://www.gesetze-im-internet.de/ao_1977/
- IHKG § 3: https://www.gesetze-im-internet.de/ihkg/__3.html
- BuchPrG: https://www.gesetze-im-internet.de/buchprg/
- PAngV: https://www.gesetze-im-internet.de/pangv_2022/
- UWG: https://www.gesetze-im-internet.de/uwg_2004/
- DDG § 5: https://www.gesetze-im-internet.de/ddg/__5.html
- TDDDG § 25: https://www.gesetze-im-internet.de/ttdsg/__25.html
- BDSG § 38: https://www.gesetze-im-internet.de/bdsg_2018/__38.html
- MStV § 18: https://www.die-medienanstalten.de/service/rechtsgrundlagen
- VSBG § 36: https://www.gesetze-im-internet.de/vsbg/__36.html
- MarkenG (§§ 5, 8, 23, 26, 42): https://www.gesetze-im-internet.de/markeng/
- HWG: https://www.gesetze-im-internet.de/heilmwerbg/
- LFGB § 11: https://www.gesetze-im-internet.de/lfgb/__11.html
- BFSG: https://www.gesetze-im-internet.de/bfsg/
- DSGVO (VO (EU) 2016/679): https://eur-lex.europa.eu/eli/reg/2016/679/oj
- Health-Claims-VO (EG) 1924/2006: https://eur-lex.europa.eu/eli/reg/2006/1924/oj
- VO (EU) 432/2012 (Liste zugelassener Angaben): https://eur-lex.europa.eu/eli/reg/2012/432/oj
- EU Register of nutrition and health claims: https://food.ec.europa.eu/food-safety/labelling-and-nutrition/nutrition-and-health-claims/eu-register-health-claims_en
- LMIV (VO (EU) 1169/2011): https://eur-lex.europa.eu/eli/reg/2011/1169/oj
- MDR (VO (EU) 2017/745): https://eur-lex.europa.eu/eli/reg/2017/745/oj
- MDCG 2019-11: https://health.ec.europa.eu/medical-devices-sector/new-regulations/guidance-mdcg-endorsed-documents-and-other-guidance_en
- DSA (VO (EU) 2022/2065) Art. 26: https://eur-lex.europa.eu/eli/reg/2022/2065/oj
- KI-VO (VO (EU) 2024/1689): https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- Produkthaftungs-RL (EU) 2024/2853: https://eur-lex.europa.eu/eli/dir/2024/2853/oj
- RL (EU) 2023/2673 (Widerrufsfunktion): https://eur-lex.europa.eu/eli/dir/2023/2673/oj
- VO (EU) 2024/3228 (Aufhebung ODR-VO): https://eur-lex.europa.eu/eli/reg/2024/3228/oj
- Geoblocking-VO (EU) 2018/302: https://eur-lex.europa.eu/eli/reg/2018/302/oj

**Rechtsprechung**
- BGH, 22.05.2025 – I ZR 161/24 (Kündigungsbutton bei Einmalzahlung): https://www.bundesgerichtshof.de · Besprechung: https://www.noerr.com/de/insights/kuendigungsbutton-im-onlinevertrieb-neue-rechtsprechung-des-bgh
- BGH, 16.07.2026 – I ZR 200/25 (Bestätigungsseite ohne Ablenkung) – Sekundärquellen: https://www.ra-kotz.de/online-kuendigung-bgh-verbietet-ablenkungsangebote-auf-der-bestaetigungsseite.htm, https://www.mtrlegal.com/bgh-urteil-zum-kuendigungsbutton-klaert-ablauf-ohne-ablenkung/ **[BGH-PM prüfen]**
- OLG Nürnberg, 30.07.2024 – 3 U 2214/23: https://www.gesetze-bayern.de/Content/Document/Y-300-Z-GRURRS-B-2024-N-22885
- LG München I, 10.10.2023 – 33 O 15098/22 (Sky/WOW): https://www.vzbv.de/urteile/kuendigung-von-online-abos-muss-ohne-login-moeglich-sein
- OLG Köln, 10.01.2025 – 6 U 62/24; OLG Koblenz, 19.09.2024 – 2 U 437/23: https://www.verbraucherzentrale.nrw/pressemeldungen/presse-nrw/11-erschwert-einfache-kuendigung-99965
- LG Köln, 29.07.2022 – 33 O 355/22: https://cms.law/de/deu/legal-updates/olg-nuernberg-kuendigungsbutton-nach-login-zulaessig
- Händlerbund-Ratgeber § 312k: https://www.haendlerbund.de/de/ratgeber/recht/kuendigungsbutton-nach-312k-bgb
- EuGH, 07.04.2022 – C-249/21 (Fuhrmann-2): https://curia.europa.eu/juris/liste.jsf?num=C-249/21
- EuGH, 01.08.2022 – C-184/20 (OT): https://curia.europa.eu/juris/liste.jsf?num=C-184/20
- EuGH, 04.10.2024 – C-21/23 (Lindenapotheke): https://curia.europa.eu/juris/liste.jsf?num=C-21/23
- EuGH, 04.07.2023 – C-252/21 (Meta/Bundeskartellamt): https://curia.europa.eu/juris/liste.jsf?num=C-252/21
- EuGH, 29.07.2019 – C-40/17 (Fashion ID): https://curia.europa.eu/juris/liste.jsf?num=C-40/17
- EuGH, 01.10.2019 – C-673/17 (Planet49); BGH, 28.05.2020 – I ZR 7/16: https://curia.europa.eu/juris/liste.jsf?num=C-673/17
- EuGH, 07.12.2017 – C-329/16 (Snitem): https://curia.europa.eu/juris/liste.jsf?num=C-329/16
- EuGH, 14.07.2016 – C-19/15 (Innova Vital); 18.07.2013 – C-299/12 (Green – Swan): https://curia.europa.eu
- EuGH C-349/96 (CPP), C-463/16 (Stadion Amsterdam) – einheitliche Leistung: https://curia.europa.eu
- EuG, 03.09.2025 – T-553/23 (Latombe, Data Privacy Framework): https://curia.europa.eu **[Rechtsmittelstand prüfen]**
- BGH, 27.04.2021 – XI ZR 26/20 (Zustimmungsfiktion); BGH, 15.11.2007 – III ZR 247/06; KG Berlin, 20.12.2019 – 5 U 24/19 (Netflix): https://www.bundesgerichtshof.de, https://www.berlin.de/gerichte/kammergericht/
- BGH, 09.09.2021 – I ZR 90/20, I ZR 125/20, I ZR 126/20 (Influencer): https://www.bundesgerichtshof.de
- BGH, 28.01.2016 – I ZR 202/14 (wetter.de, Titelschutz für Apps): https://www.bundesgerichtshof.de
- BGH, 10.02.2011 – I ZR 164/09 (Double-Opt-in): https://www.bundesgerichtshof.de
- KG Berlin, 11.08.2026 – 5 UKl 1/26 (E-Mail im Impressum) – laut vzbv-Urteilsliste: https://www.vzbv.de/urteile

**Behörden, Verbände, Plattformen**
- DPMA Gebühren Marken: https://www.dpma.de/marken/gebuehren/index.html · DPMAregister: https://register.dpma.de
- EUIPO Gebühren: https://www.euipo.europa.eu/de/trade-marks/before-applying/fees-payable-direct · SME Fund: https://www.euipo.europa.eu/de/discover-ip/sme-fund · TMview: https://www.tmdn.org/tmview · TMclass: https://www.tmdn.org/tmclass
- DSK, Orientierungshilfe für Anbieter digitaler Dienste: https://www.datenschutzkonferenz-online.de/orientierungshilfen.html
- DSK, Liste DSFA-pflichtiger Verarbeitungen: https://www.datenschutzkonferenz-online.de/
- Art.-29-Gruppe, Annex Health data in apps and devices (05.02.2015): https://ec.europa.eu/justice/article-29/documentation/other-document/files/2015/20150205_letter_art29wp_ec_health_data_after_plenary_annex_en.pdf
- Börsenverein, Preisbindung: https://www.boersenverein.de/beratung-service/recht/preisbindung/
- Bundesfachstelle Barrierefreiheit zum BFSG: https://www.bundesfachstelle-barrierefreiheit.de
- BfArM, Abgrenzung Medizinprodukte/Medical Apps: https://www.bfarm.de/DE/Medizinprodukte/Abgrenzung-und-Klassifizierung/_node.html
- Meta, Health & Wellness-Beschränkungen (Sekundärquellen): https://www.haus.io/blog/meta-announces-new-health-wellness-conversion-restrictions, https://www.click.co.uk/insights/metas-new-advertising-restrictions-impacts-health-and-wellness-brands/, https://www.accelerateddigitalmedia.com/insights/guide-to-social-media-health-ad-restrictions-2025/ · Primärquelle Meta Business Hilfebereich **[prüfen]**: https://www.facebook.com/business/help
- Paddle Preise: https://www.paddle.com/pricing · Lemon Squeezy: https://www.lemonsqueezy.com/pricing · Digistore24: https://www.digistore24.com/de/home/prices

**Hinweis zur Prüftiefe:** Mit **[prüfen]** markierte Punkte beruhen auf Sekundärquellen oder auf Entwicklungen nach dem gesicherten Kenntnisstand dieses Berichts (insbesondere 2026er Urteile, nationale Umsetzung der Widerrufsfunktion und der Produkthaftungs-RL, Meta-EU-Zeitplan, Gebühren der Zahlungsanbieter). Vor dem Launch einmal gegen die Primärquelle abgleichen; an der Gesamteinschätzung ändern sie voraussichtlich nichts.
