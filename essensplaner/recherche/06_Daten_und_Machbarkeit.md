# 06 – Daten und Machbarkeit (Essensplaner)

Stand: 28.10.2026 · Abrufdatum aller Links: 28.10.2026, sofern nicht anders angegeben · Rollen: Software-Architektur + Ökotrophologie

Kennzeichnung: **[belegt]** = mit Quelle geprüft · **[unsicher]** = nicht abschließend geprüft, vor Umsetzung klären · **[Einschätzung]** = fachliche Bewertung ohne Primärquelle. Keine Rechtsberatung.

## Kurzfazit

| Punkt | Empfehlung | Wichtigste Alternative | Machbar? |
|---|---|---|---|
| 1 Nährwerte | **BLS 4.0** (CC BY 4.0, kostenlos, ~7.140 Lebensmittel, 138 Nährstoffe), MRI nennen | USDA FDC (CC0), Schweizer DB (kommerziell mit Quellenvermerk), CIQUAL (Lizenz 2025 prüfen) | **ja**, 0 € |
| 2 Allergene | 14 LMIV-Gruppen + Untergruppen an der **Zutat**, Rezept automatisch, harte Filter, Etikett-Hinweis | – | **ja** |
| 3 Preise | **Kein Scraping.** Eigener Warenkorb (~150 Zutaten), Preisstufen je Kette, Nutzer überschreibt, „ca.“ + Datum | Affiliate (Rewe/Awin 2–8 %, Picnic) als Erlös, nicht als Datenquelle | **ja**, ca. 18 h Vollerhebung, danach ~1 h/Monat |
| 4 Lagerung | BfR-Werte als Regelwerk L1–L12, strengere Wahl bei Meal-Prep (2 Tage, Reis 24 h) | – | **ja** |
| 5 Rezepte | **Eigene Rezepte**: KI-Entwurf → Code-Prüfung → Fachprüfung → Testkochen | Lizenz von Foodbloggern (später) | **ja**, größter Zeitposten (~90–180 h für 120 Rezepte) |
| 6 Algorithmus | **Hybrid:** Regeln + MILP (HiGHS-WASM, MIT, ~1,2 MB gzip) im Browser; LLM nur für Texte | yalps (MIT, 30 KB) | **ja**, 0 € laufend |
| 7 Technik | **PWA**, statisch gehostet, Supabase EU optional, **Paddle** (MoR) oder Stripe, eigener Kündigungsbutton, pdfmake | native App später | **ja** |

Größte Unsicherheiten: aktueller iOS-PWA-Stand in der EU (auf Gerät testen), Lizenz CIQUAL 2025, Kündigungsbutton-Umsetzung bei MoR-Anbietern, Hetzner-Preise 2026, OpenAI-Preise, Rechenzeit HiGHS auf alten Handys (Benchmark im MVP).

### Was der Inhaber tun muss
1. Bei Awin als Publisher registrieren (Rewe, Picnic) – erst nach Launch sinnvoll.
2. Entscheidung Kleinunternehmer/Regelbesteuerung abwarten (Steuerbericht) → dann Paddle oder Stripe.
3. Ein iPhone (EU-Konto) für den PWA-Test bereithalten.
4. Optional: Minijob/Hilfskraft für Preiserhebung einplanen.

## 1. Nährwertdaten

**Empfehlung:** **BLS 4.0 als Primärquelle** für alle generischen Zutaten (CC BY 4.0, kostenlos, deutsche Lebensmittel und Verzehrgewohnheiten). **USDA FDC** (CC0) und **Schweizer Nährwertdatenbank** (kommerziell mit Quellenvermerk) als Lückenfüller. **CIQUAL** als dritte Reserve, Lizenz vor Nutzung prüfen. **Open Food Facts nicht in die Kern-Nährwertdatenbank mischen**, sondern höchstens später getrennt (Barcode-Scan, Markenprodukt-Allergene) und dann mit sauberer ODbL-Trennung.

### 1.1 Vergleich

| Quelle | Lizenz | Kosten | Umfang | Qualität / Herkunft | Eignung „Haferflocken“, „Hähnchenbrust“ |
|---|---|---|---|---|---|
| **BLS 4.0** (Max Rubner-Institut) | **CC BY 4.0**: „Die Nutzung ist unter der Lizenz CC BY 4.0 (Creative Commons Namensnennung 4.0 International) gestattet.“ „Bei Verwendung ist das Max Rubner-Institut als Herausgeber zu nennen.“ [belegt, blsdb.de/download] | kostenlos seit 16.12.2025 (vorher kostenpflichtige Lizenz) [belegt] | „rund 7.140 … Lebensmittel mit insgesamt 138 Nährstoffen“ [belegt, BLS-FAQ] | Datenpunkte mit Herkunftskennung (13 Kategorien, u. a. Analyse, Rezeptberechnung, Formelberechnung, Labelangabe) [belegt]. Auswahl nach deutschen Verzehrsstudien. | **sehr gut**: generische DE-Lebensmittel, roh und zubereitet, deutsche Bezeichnungen. FAQ nennt ausdrücklich „App- und Softwareentwicklung“ als Nutzung. |
| **USDA FoodData Central** | „in the public domain … not copyrighted“, CC0 1.0; Quellenangabe erbeten, nicht Pflicht [belegt] | kostenlos; API-Key (data.gov), 1.000 Anfragen/Stunde/IP [belegt] | sehr groß (Foundation Foods, SR Legacy, Branded Foods) [Einschätzung: Umfangszahlen nicht geprüft] | hoch für Foundation/SR Legacy; US-Lebensmittel und US-Sorten | gut als Reserve (z. B. exotischere Zutaten); englische Namen, US-Produkte (z. B. angereichertes Mehl) können abweichen → nur nach Prüfung zuordnen |
| **Open Food Facts** | Datenbank **ODbL**, Einzelinhalte **Database Contents License 1.0**, Fotos **CC BY-SA** [belegt, Terms of use] | kostenlos | Markenprodukte weltweit, Crowdsourcing; DE-Anteil groß, genaue Zahl nicht abrufbar (Server 503) [unsicher] | „does not guarantee its accuracy, completeness …“, „must not be used for medical purposes“ [belegt]. Fehler aus Etikett, Eingabe, Verarbeitung. | **schlecht** für generische Zutaten (eine „Haferflocken“-Suche liefert viele Markenprodukte mit Etikettwerten); gut für Barcode-Scan |
| **CIQUAL** (ANSES, Frankreich) | „Open Licence“/Licence Ouverte (Etalab) laut älteren Ausgaben und OFF-Wiki; **für Ausgabe 2025 nicht direkt bestätigt** [unsicher] | kostenlos | **3.484 Lebensmittel, 74 Bestandteile** (Update 19.11.2025) [belegt, ANSES] | hoch, französische Produkte und Bezeichnungen | gut als Reserve; Namen französisch/englisch |
| **Schweizer Nährwertdatenbank** (BLV) | keine benannte Standardlizenz; Download-Seite: Daten dürfen „unter Angabe eines Quellenvermerks auch für kommerzielle“ Zwecke genutzt werden (Beispiel Diät-Apps); opendata.swiss: „Commercial Allowed / Reference Required“ [belegt] | kostenlos | Version 7.1, Excel (DE/FR/IT/EN), API vorhanden; Zahl der Lebensmittel nicht genannt [unsicher, früher ca. 1.100 – nicht geprüft] | hoch, Schweizer Marktprodukte | gut als deutschsprachige Reserve |

### 1.2 Pflichten bei Open Food Facts (falls doch genutzt)
- **Namensnennung:** „attribute the authorship to Open Food Facts with a link to https://openfoodfacts.org“, Lizenz nennen; gilt auch für abgeleitete Werke [belegt].
- **Share-Alike:** „Derivative works must be shared under the same conditions.“ [belegt] Nach ODbL heißt das: Wird eine aus OFF **abgeleitete Datenbank** öffentlich genutzt, muss diese Datenbank (bzw. die Änderungen) ebenfalls unter ODbL bereitgestellt werden. Ein bloß **erzeugtes Werk** (Anzeige in der App, PDF-Plan) braucht nur einen Hinweis. [Einschätzung zur ODbL-Systematik „Derivative Database“ vs. „Produced Work“, Lizenztext vor Umsetzung lesen]
- **Konsequenz für die Architektur:** Eigene Rezept- und Nährwertdatenbank **nie mit OFF-Datensätzen vermischen**. Falls Barcode-Scan kommt: OFF-Abfrage live, Ergebnis getrennt anzeigen, nicht in die eigene Datenbank übernehmen („Collective Database“ statt „Derivative Database“). Fotos von Verpackungen nicht übernehmen (CC BY-SA + Markenrechte Dritter, laut Terms ausdrücklich vom Nutzer zu prüfen).

### 1.3 Umsetzung
- Eigene Tabelle `zutat` (≈ 150–300 Grundzutaten) mit Feld `bls_code` (Primär), optional `fdc_id`/`ciqual_code`/`ch_id`, plus `quelle` und `herkunftskennung` je Wert. Die App rechnet Nährwerte aus Gramm × BLS-Wert.
- **Roh vs. gegart:** BLS führt viele Lebensmittel in Zubereitungsformen. Rezepte einheitlich mit **Rohgewicht** rechnen und das in der App sagen [Einschätzung, ökotrophologische Standardpraxis].
- **Pflicht-Hinweis** im Impressum/„Datenquellen“: „Nährwerte: Max Rubner-Institut (2025): Bundeslebensmittelschlüssel (BLS), Version 4.0 – Deutsche Nährstoffdatenbank. Karlsruhe. DOI 10.25826/Data20251217-134202-0, Lizenz CC BY 4.0; Werte vom Essensplaner umgerechnet.“ (CC BY verlangt Hinweis auf Änderungen.)
- Nährwerte immer als **Richtwerte** kennzeichnen („berechnet, ca.“). Bei Makro-Zielen Toleranzband anzeigen statt Grammgenauigkeit.
- Aufwand: einmalig ca. 2–4 Arbeitstage für Zuordnung von 200 Zutaten zu BLS-Codes inkl. Stichprobenprüfung [Einschätzung].

## 2. Allergene

**Empfehlung:** Allergene **nicht vom Rezept ableiten lassen, sondern an jeder Zutat fest hinterlegen** (14 LMIV-Gruppen + Untergruppen), Rezept-Allergene automatisch als Vereinigungsmenge berechnen, Filter **hart** (ausschließen) statt weich. Kein LLM entscheidet über Allergene. Klare Hinweise, dass Markenprodukte abweichen und das Etikett gilt.

### 2.1 Die 14 Hauptallergene (Anhang II LMIV, VO (EU) Nr. 1169/2011)
Rechtsgrundlage: [VO (EU) Nr. 1169/2011, Anhang II (EUR-Lex)](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32011R1169); Übersicht: [Verbraucherzentrale NRW](https://www.verbraucherzentrale.nrw/kennzeichnung-von-allergenen-und-zusatzstoffen-94938) [belegt]

| Nr. | Gruppe (Kurzform) | Untergruppen für die Datenbank |
|---|---|---|
| 1 | Glutenhaltiges Getreide | Weizen (inkl. Dinkel, Khorasan/Kamut), Roggen, Gerste, Hafer, Hybride; Ausnahmen laut Anhang II (z. B. Glukosesirupe auf Weizenbasis) |
| 2 | Krebstiere | |
| 3 | Eier | |
| 4 | Fisch | Ausnahmen laut Anhang II (z. B. Fischgelatine als Trägerstoff) |
| 5 | Erdnüsse | |
| 6 | Sojabohnen | Ausnahmen (z. B. vollständig raffiniertes Sojaöl) |
| 7 | Milch (einschl. Laktose) | Laktose separat als Unverträglichkeit führen |
| 8 | Schalenfrüchte | Mandel, Haselnuss, Walnuss, Cashew, Pekan, Paranuss, Pistazie, Macadamia (je einzeln!) |
| 9 | Sellerie | |
| 10 | Senf | |
| 11 | Sesamsamen | |
| 12 | Schwefeldioxid und Sulfite | > 10 mg/kg bzw. 10 mg/l (als SO₂) |
| 13 | Lupinen | |
| 14 | Weichtiere | |

Die genauen Ausnahmen stehen nur im Verordnungstext. **Vor dem Datenmodell Anhang II wörtlich übernehmen** (Pflegeaufgabe, 1 Stunde).

### 2.2 Abbildung in den Daten
- `zutat.allergene[]`: Codes der 14 Gruppen + Untergruppen (z. B. `A1_weizen`, `A8_haselnuss`). Dazu `unvertraeglichkeit[]` (Laktose, Fruktose, Histamin – **nicht** LMIV, nur als Nutzerfilter mit Hinweis).
- `zutat.allergen_risiko_markenprodukt[]`: typische Zusatzrisiken im Handel (z. B. Haferflocken: oft Gluten-Kontamination; Gewürzmischungen: Sellerie/Senf; Brühe: Sellerie). Grundlage dafür: Allgemeinwissen der Ökotrophologie [Einschätzung], im Zweifel konservativ setzen.
- `rezept.allergene` = automatisch berechnet (nicht von Hand pflegbar), inkl. Optional-Zutaten und Toppings.
- **Filter:** Bei gesetzter Allergie werden Rezepte mit dem Allergen **ausgeschlossen**, nicht „ersetzt“. Ersatz nur über geprüfte Varianten (eigene Rezeptversion mit eigener Zutatenliste).
- **Tests:** Automatischer Test, dass kein Plan bei gesetzter Allergie ein Rezept mit der Gruppe enthält (Eigenschaftstest über alle Kombinationen).

### 2.3 „Spuren“, Produktwechsel und Haftung
- Spurenhinweise („Kann Spuren von … enthalten“) sind **gesetzlich nicht geregelt**. Art. 36 Abs. 3 Buchst. a LMIV sieht dafür Durchführungsrechtsakte der Kommission vor; nach meinem Stand (Juni 2026) gibt es dazu keine erlassene EU-Regel [unsicher, vor Launch prüfen]. Ob „Spuren“ drauf stehen, entscheidet jeder Hersteller selbst, und es ändert sich mit Rezeptur und Werk. Eine App mit generischen Zutaten **kann Spuren nicht abbilden**.
- Der Essensplaner ist **kein Lebensmittelunternehmer** im Sinne der LMIV (er verkauft keine Lebensmittel); die Allergenkennzeichnungspflicht trifft ihn nicht direkt [Einschätzung]. Haftungsrisiko besteht trotzdem (Produkthaftung bei Software ist seit der neuen EU-Produkthaftungsrichtlinie (EU) 2024/2853 ein Thema; Umsetzung in DE bis Dezember 2026) [unsicher, im Rechtsbericht prüfen].
- **Pflichthinweise in der App** (Text-Entwurf):
  - Beim Setzen eines Allergiefilters: „Wir filtern nach den 14 Hauptallergenen der EU-Lebensmittelkennzeichnung, bezogen auf typische Zutaten. Markenprodukte können andere Zutaten oder Spuren enthalten. Bitte prüfe immer das Etikett des gekauften Produkts. Bei schwerer Allergie (Anaphylaxie) ersetzt die App keine ärztliche oder ernährungstherapeutische Beratung.“
  - In der Einkaufsliste bei kritischen Zutaten ein Symbol „Etikett prüfen“ (z. B. Hafer bei Glutenfilter: „nur als glutenfrei gekennzeichnete Haferflocken“).
- Keine Aussagen wie „allergenfrei“, „sicher für Allergiker“ oder „glutenfrei“ als Gesamtversprechen (Irreführung, UWG) [Einschätzung].

## 3. Supermarktpreise

**Empfehlung:** **Kein Scraping.** Stattdessen ein **eigener Referenz-Warenkorb** (ca. 150 Grundzutaten, Preis je kg/l/Stück der günstigsten Eigenmarke) für 7 Ketten, **von Hand erhoben** (Stichprobe aus Onlineshop bzw. Filiale), daraus **Preisstufen je Kette**. Nutzer können jeden Preis überschreiben. Alle Kosten als **„ca.“** mit Stand-Datum. Affiliate-Links (Rewe, Picnic, Knuspr) später als Zusatzerlös, nicht als Datenquelle.

### 3.1 Legale Datenwege im Überblick

| Weg | Lage (Stand 28.10.2026) | Bewertung |
|---|---|---|
| **Offizielle Händler-APIs** (Rewe, Edeka, Kaufland, Aldi, Lidl, Netto, Penny) | **Keine öffentliche Preis-/Produkt-API gefunden.** Kaufland hat eine **Verkäufer**-API für den Marketplace (OAuth, nur für registrierte Verkäufer: Bestellungen, Angebote, Lager), keine Supermarktpreise ([Kaufland Global Marketplace](https://www.kauflandglobalmarketplace.com/en/seller-university/selling/listing-via-api-interface/)). Für Rewe existieren nur **inoffizielle** Shop-Endpunkte, die Dritte (z. B. Apify-Scraper) abgreifen ([Apify Rewe-Scraper](https://apify.com/studio-amba/rewe-scraper)) [belegt, dass es sie gibt; nicht nutzen]. | nicht verfügbar |
| **Affiliate-Programme** | **Rewe DE über Awin** (ID 11652): 8 % Neukunden, 4 % Neukunden mit Gutschein, 4 % Bestandskunden, 2 % Bestandskunden mit Gutschein, Cookie 30 Tage; „Handzettel“ und Rewe-„Prospekte“ dürfen nicht zur Bewerbung genutzt werden; Browser-Erweiterungen verboten ([Awin-Profil](https://ui.awin.com/merchant-profile/11652)) [belegt]. **Picnic DE** über Awin (ID 116041), Cookie 30 Tage, Provision nicht öffentlich ([Awin-Profil](https://ui.awin.com/merchant-profile/116041)) [belegt laut Suchergebnis, Profil nicht selbst geöffnet]. **Knuspr** über FlexOffers/CJ gelistet, Cookie laut Verzeichnis 4 Tage, Provision nicht veröffentlicht ([FlexOffers](https://www.flexoffers.com/affiliate-programs/knuspr-de-affiliate-program/)) [unsicher]. **Flink:** kein Programm gefunden [unsicher]. Ein Produkt-Preis-Feed ist bei keinem Programm öffentlich bestätigt [unsicher – bei Aufnahme ins Programm erfragen]. | **Erlösquelle**, nicht Datenquelle. Lieferpreise weichen von Filialpreisen ab. Nur Großstädte. |
| **Prospekt-Plattformen** (Marktguru, kaufDA/Bonial, MeinProspekt) | **Keine öffentliche Daten-API oder Datenlizenz gefunden** [unsicher]. Prospektdaten bilden nur Aktionspreise ab, keine Dauerpreise. | höchstens später: B2B-Anfrage stellen (Kontakt über Website). Nicht einplanen. |
| **Preisvergleichsdienste** | **SupermarktCheck.de**: Nutzer melden seit 2008 Preise, legen Produkte an ([Über uns](https://www.supermarktcheck.de/ueber-uns/)) [belegt]. Keine Datenlizenz gefunden. **heisse-preise.io (AT)**: nicht-kommerzielles Open-Source-Projekt von Mario Zechner, scrapt Onlineshops österreichischer Händler täglich ([Impressum](https://heissepreise.github.io/imprint.html); [FM4](https://fm4.orf.at/stories/3034417/)). **Einen Rechtsstreit habe ich nicht gefunden** [unsicher]. Die österreichische Wettbewerbsbehörde (BWB, Fokuspapier 09/2023) hält fest: Alle Plattformbetreiber nannten „die unklare bzw. unsichere rechtliche Lage bzgl. ‚Web Crawling‘“; manche Händler-AGB verbieten „jede Nutzung von Inhalten dieser Website, insbesondere die Speicherung in Datenbanken“ ohne schriftliche Zustimmung; Händler könnten die Scraping-IP blockieren ([BWB-Fokuspapier](https://www.bwb.gv.at/fileadmin/user_upload/Fokuspapier_Preisvergleichsplattformen_Sept_2023_barrierefrei_14.09.2023.pdf)) [belegt]. | Daten nicht übernehmen (Rechte unklar). Gut als Plausibilitätskontrolle beim Ansehen. |
| **Manueller Warenkorb** | eigene Erhebung, eigene Datenbank → eigenes Datenbankherstellerrecht | **empfohlen** |
| **Preisniveaus statt Einzelpreise** | Faktor je Kette auf Basispreis | **empfohlen als Ergänzung** |

### 3.2 Rechtslage Scraping in Deutschland (Einschätzung, keine Rechtsberatung)
1. **Datenbankherstellerrecht §§ 87a ff. UrhG.** Geschützt ist eine Datenbank, wenn ihre Beschaffung, Überprüfung oder Darstellung eine „nach Art oder Umfang wesentliche Investition“ erfordert (§ 87a). Verboten ist die Entnahme eines **wesentlichen Teils** und die **wiederholte und systematische** Entnahme unwesentlicher Teile, wenn sie der normalen Auswertung zuwiderläuft oder die Interessen des Herstellers unzumutbar beeinträchtigt (§ 87b Abs. 1 S. 2) ([§ 87b UrhG, gesetze-im-internet.de](https://www.gesetze-im-internet.de/urhg/__87b.html)).
   - **EuGH C-762/19 CV-Online Latvia (03.06.2021):** Eine Suchmaschine, die Inhalte einer Datenbank kopiert und weiterverwendet, verletzt das Sui-generis-Recht, **wenn dadurch die Investition des Datenbankherstellers beeinträchtigt wird**; das prüft das nationale Gericht ([SCL-Bericht](https://www.scl.org/12290-cjeu-search-engine-copying-of-databases-infringes-sui-generis-right-where-it-adversely-affects-database-maker-investment/); [Bird & Bird](https://www.twobirds.com/en/insights/2021/uk/cv-online-latvia-cjeu-complicates-the-enforcement-of-database-rights)) [belegt über Sekundärquellen].
   - **BGH, 22.06.2011, I ZR 159/10 „Automobil-Onlinebörse“** (GRUR 2011, 1018): Ein einzelner Nutzer, der mit einer Software die Börse durchsucht, verletzt § 87b Abs. 1 S. 1 nicht; anders erst bei bewusstem, koordiniertem Zusammenwirken mehrerer Nutzer; außerdem war keine wesentliche Investition in die betroffenen Angebote dargelegt ([rewis.io](https://rewis.io/urteile/urteil/rlw-21-06-2011-i-zr-15910/); [Betriebs-Berater](https://betriebs-berater.ruw.de/wirtschaftsrecht/urteile/Zur-automatisierten-Auswertung-von-Online-Datenbanken---Automobil-Onlineboerse-17656)) [belegt über Auszüge].
   - **Wichtiger Punkt für Preise:** Nach EuGH C-203/02 *British Horseracing Board* (09.11.2004) zählt Investition in das **Erzeugen** von Daten nicht, nur in Beschaffung/Prüfung/Darstellung vorhandener Daten. Preise **erzeugt** der Händler selbst. Ob eine Preisliste deshalb überhaupt sui-generis-geschützt ist, ist offen; der Onlineshop als Ganzes (Fotos, Texte, Struktur) ist es wahrscheinlich [Einschätzung].
2. **Vertrag/AGB – EuGH C-30/14 Ryanair (15.01.2015):** Ist eine Datenbank **nicht** durch Urheber- oder Sui-generis-Recht geschützt, darf der Betreiber die Nutzung **vertraglich** (AGB) beschränken; die Schranken der Richtlinie gelten dann nicht [belegt aus Fachwissen; Urteilstext: [curia, C-30/14](https://curia.europa.eu/juris/liste.jsf?num=C-30/14)]. Ob bloßes Aufrufen einer Website einen Vertrag mit AGB begründet, ist in DE umstritten („virtuelles Hausrecht“) [unsicher].
3. **UWG – BGH, 30.04.2014, I ZR 224/12 „Flugvermittlung im Internet“:** Screen-Scraping ist **nicht per se** gezielte Behinderung (damals § 4 Nr. 10 UWG, heute **§ 4 Nr. 4 UWG**). Ein bloßer entgegenstehender Wille bzw. AGB-Verbot reicht nicht; unlauter kann es werden, wenn **technische Schutzmaßnahmen überwunden** werden ([LTO](https://www.lto.de/recht/hintergruende/h/bgh-urteil-izr22412-screen-scraping-flugdaten-automatisiert-auslesen-ryanair-reiseportal); [Kanzlei Plutte](https://www.ra-plutte.de/bgh-zum-automatisierten-auslesen-fremder-websites-via-screen-scraping/)) [belegt].
4. **Praxis:** Händler schützen ihre Shops heute technisch (Bot-Schutz, Markt-ID nötig für Preise, gesperrte Endpunkte). Wer das umgeht, ist nach BGH I ZR 224/12 im Risiko; dazu Abmahnkosten, IP-Sperren und Datenlücken ohne Vorwarnung. **Für ein Ein-Personen-Unternehmen nicht tragbar.**

**Fazit:** Rechtlich nicht sicher verboten, aber riskant und technisch instabil. Die Preisgenauigkeit, die Scraping bringt, braucht ein Essensplaner nicht (Nutzer wollen „etwa 35 € die Woche“, nicht 34,87 €).

### 3.3 Empfohlenes Preismodell
- **Basispreis je Zutat** = Preis je kg/l/Stück der günstigsten regulären Eigenmarke (z. B. „ja!“, „Gut & Günstig“, „K-Classic“, „Milsani“) [Einschätzung: Einstiegs-Eigenmarken liegen kettenübergreifend oft nah beieinander – mit der ersten Stichprobe prüfen].
- **Ketten-Faktor** (z. B. Discounter 1,00 / Kaufland 1,0x / Vollsortimenter 1,1x) **aus eigener Stichprobe berechnen**, nicht schätzen. Zahlen erst nach Erhebung eintragen.
- **Packungsgrößen** hinterlegen (500 g Haferflocken, 1 kg Reis …), weil man ganze Packungen kauft. Die App zeigt „Einkauf 4,80 €, davon diese Woche verbraucht ca. 3,10 €; Rest bleibt im Vorrat“. Das ist für Budget-Nutzer der eigentliche Mehrwert.
- **Nutzer überschreibt Preise** (lokal gespeichert, optional synchronisiert). Später freiwillig anonymisiert melden lassen (Crowd-Preise, eigene Datenbank).
- **Anzeige:** „ca. 32 € (Preisstand Okt. 2026, Kette Lidl, Richtwert ohne Angebote)“. Kein „günstigster Laden“-Versprechen (UWG-Irreführung).
- **Erhebung:** Preise vom Bildschirm der Onlineshops bzw. Filialbesuch abschreiben, je Kette nur ca. 150 Positionen, kein Kopieren von Texten/Bildern. Das ist keine Entnahme eines wesentlichen Teils (150 von mehreren Tausend Artikeln) [Einschätzung].

### 3.4 Pflegeaufwand
- 150 Zutaten × 7 Ketten = 1.050 Preispunkte. Bei ca. 1 Minute je Preis **ca. 17–18 Stunden für eine Vollerhebung** [Einschätzung].
- Rhythmus: **Vollerhebung halbjährlich**, **monatlich 30 volatile Positionen** (Butter, Eier, Gemüse, Obst, Kaffee, Öl) bei 2 Ketten (≈ 1 Stunde), Faktoren daraus nachziehen.
- Alternative mit weniger Aufwand: nur **3 Referenzketten** erheben (1 Discounter, Kaufland, 1 Vollsortimenter), übrige Ketten über Faktor. Kann mit studentischer Hilfskraft (Minijob) ausgelagert werden.

## 4. Lagerung und Haltbarkeit

**Empfehlung:** Die App setzt **die BfR-Werte als Standard** und wählt bei abweichenden Behördenangaben die **strengere** Regel, wenn sie Meal-Prep über mehrere Tage plant (Plan „Kochtag + max. 2 Tage Kühlschrank, Rest einfrieren“). Jede Regel wird mit Quelle in einer Konfigurationsdatei geführt (`app/data/lagerregeln.json`), damit sie zentral geändert werden kann. Vorarbeit mit weiteren Belegen: `../../recherche/Schichtkochbuch Markt und Vermarktung/hygiene_rezepte.md`.

### 4.1 Wörtliche Zitate (Primärquellen, geprüft am 28.10.2026)

**BfR, Verbrauchertipps „Schutz vor Lebensmittelinfektionen im Privathaushalt“ (Berlin 2020)** – [PDF](https://www.bfr.bund.de/cm/350/verbrauchertipps_schutz_vor_lebensmittelinfektionen_im_privathaushalt.pdf):
- „Speisen bei der Zubereitung und beim Aufwärmen ausreichend erhitzen (mindestens 70 °C für zwei Minuten an allen Stellen des Lebensmittels; im Zweifelsfall die Temperatur mit einem Fleischthermometer überprüfen)“
- „bei der Zubereitung in der Mikrowelle auf gleichmäßiges Erwärmen achten, Speisen zwischendurch umrühren“
- „warme Speisen ausreichend heiß halten (mindestens 60 °C an allen Stellen des Lebensmittels) bzw. innerhalb von wenigen Stunden auf unter 7 °C abkühlen (größere Speisemengen dafür in mehrere flache Schalen füllen)“
- „bei Speisen, die rohe und gekochte Zutaten enthalten, die gekochten Zutaten zunächst ausreichend kühlen, bevor die anderen Zutaten hinzugefügt werden“
- „Reste gegarter Speisen im Kühlschrank aufbewahren und innerhalb von zwei bis drei Tagen verbrauchen“
- „Kühlschranktemperatur auf maximal 7 °C einstellen (besser unter 5 °C), Temperatur regelmäßig an verschiedenen Stellen im Kühlschrank überprüfen“
- Bakterien „können sich zwischen 10 °C und 60 °C vermehren. Einige Bakterienarten bilden bei ihrer Vermehrung hitzestabile Giftstoffe.“
- Transport: „Im Sommer ist es zudem bei längeren Transportwegen ratsam, empfindliche Lebensmittel in Kühlboxen zu transportieren.“ „Gleiche Vorsichtsmaßnahmen gelten auch, wenn zubereitete leicht verderbliche Speisen zu Feiern oder Festen mitgenommen werden.“ Außer Haus gekaufte warme Speisen „sollten schnell transportiert und sofort verzehrt werden, weil sich vorhandene Krankheitserreger bei Temperaturen unterhalb von 60 °C sehr schnell vermehren können.“

**BfR-FAQ „Vorkochen für mehrere Tage: Was ist zu beachten?“** – [englische Fassung](https://www.bfr.bund.de/en/service/frequently-asked-questions/topic/pre-cooking-for-several-days-what-should-i-bear-in-mind/), [deutsches PDF](https://www.bfr.bund.de/assets/01_Ver%C3%B6ffentlichungen/FAQ_deutsch/faq-vorkochen-fuer-mehrere-tage.pdf):
- erhitzte Mahlzeiten „within 2-3 days or freeze them“ verbrauchen; Mahlzeiten mit rohen Komponenten innerhalb von **einem Tag** nach Zubereitung.
- Kühlschrank max. 7 °C, „5 °C would be better“; kältester Bereich meist unten hinten.
- Obst, Gemüse, Blattsalat **getrennt** von anderen Komponenten verpacken.
- Aufwärmen: mindestens 70 °C für zwei Minuten an allen Stellen; tiefgekühlte Beeren ca. 90 °C.
- Einfrieren portioniert und abgekühlt, wenig Luft; bei −18 °C: Rind/Schwein 3–6 Monate, Geflügel 3 Monate, Fisch 6 Monate, Gemüse/Obst 6–12 Monate. Auftauen im Kühlschrank.
- Transport in der **Kühltasche**; Kühlmöglichkeit am Verzehrort (z. B. Arbeitsplatz) vorher klären.

**BfR-Stellungnahme 016/2024 „Schutz vor lebensmittelbedingten Erkrankungen beim Heißhalten von Speisen“ (19.03.2024)** – [PDF](https://www.bfr.bund.de/cm/343/schutz-vor-lebensmittelbedingten-erkrankungen-beim-heisshalten-von-speisen-aktualisiert.pdf):
- „… rät das BfR seit 2020, erhitzte Speisen bis zum Verzehr so heiß zu halten, dass sie an allen Stellen eine Temperatur von mindestens 60 °C aufweisen.“
- Ab 57 °C ist Wachstum von B. cereus, B. cytotoxicus oder C. perfringens unwahrscheinlich, einzelne Studien zeigen geringes Wachstum bis 60 °C.

**BfR-Mitteilung „Infektionen mit Bacillus cereus“ (09.01.2026)** – [PDF](https://www.bfr.bund.de/assets/01_Ver%C3%B6ffentlichungen/Mitteilungen_deutsch/bacillus-cereus-in-lebensmitteln-bei-vermehrung-kann-das-bakterium-ein-gift-bilden.pdf):
- „Beim Erhitzen wird Cereulid nicht inaktiviert, sodass auch ein Abkochen von Lebensmitteln das Toxin nicht beseitigt.“ → Aufwärmen rettet falsch gelagerten Reis nicht.

**BZfE „Mealprep für die Mittagspause“ (Stand 23.04.2025)** – [bzfe.de](https://www.bzfe.de/presse/pressemeldungen-archiv/mealprep-fuer-die-mittagspause):
- „Nach dem Kochen werden die Gerichte abgekühlt“, dann verschlossen in den Kühlschrank; „Salatdressing, Dip und Soße werden getrennt gelagert“; „Die meisten Gerichte sind bei richtiger Lagerung einige Tage lang haltbar“ (**keine Tageszahl**). Warme Speisen „vor dem Verzehr gut erhitzt“.
- **Korrektur zur Vorgabe „BZfE 2 Tage“:** In den heute geprüften BZfE-Seiten (Mealprep, „Lagerung“ in einfacher Sprache) steht **keine** Zahl. Die frühere Angabe „BZfE ≤ 2 Tage“ in der DURCHSCHICHT-Recherche ist **nicht neu belegt** [unsicher]. Strengste belegte Zahl: **FSA (UK) 48 Stunden**, Reis 24 Stunden ([FSA](https://www.food.gov.uk/safety-hygiene/home-food-fact-checker)) – laut Vorrecherche.

**DGE:** Für Privathaushalte keine eigene Zahl gefunden; die DGE-Qualitätsstandards für Gemeinschaftsverpflegung (Warmhaltezeit max. 3 Stunden) betreffen Großküchen [unsicher, Fundstelle vor Übernahme prüfen]. Für die App nicht nötig.

**Ohne Kühlung max. 2 Stunden:** stammt von **USDA** (2 h, über 32 °C nur 1 h) ([USDA](https://www.usda.gov/node/15671), laut Vorrecherche), **nicht vom BfR**. Das BfR sagt „innerhalb von wenigen Stunden auf unter 7 °C“. Die App nutzt die 2-h-Regel als vorsichtige Faustregel und nennt USDA als Quelle.

**Reis:** BfR nennt für Reis **keine eigene Tageszahl**. FSA/NHS: Reis innerhalb 1 Stunde kühlen und innerhalb 24 Stunden essen, nur einmal aufwärmen (laut Vorrecherche, [NHS](https://www.nhs.uk/live-well/eat-well/food-types/starchy-foods-and-carbohydrates/)).

**Thermobehälter und Kühlbox im Fahrzeug:** Keine Behördenquelle mit Zeitangabe gefunden [unsicher]. Ableitung aus BfR-Regeln: Thermobehälter nur dann „heiß gehalten“, wenn das Essen beim Öffnen noch **≥ 60 °C** hat; sonst gilt es als abkühlend und muss wie Kühlware behandelt werden. Fahrzeuginnenraum im Sommer: Kühlbox mit Akkus, nicht in die Sonne; Haltezeit nicht belegt → Thermometer-Test empfehlen.

### 4.2 Regeln für die App (maschinenlesbar umsetzbar)

| ID | Regel in der App | Wert | Quelle | Status |
|---|---|---|---|---|
| L1 | Kühlschrank-Hinweis | ≤ 7 °C, besser ≤ 5 °C; Thermometer | BfR Verbrauchertipps | belegt |
| L2 | Gegartes Gericht im Kühlschrank | **max. 2 Tage** nach Kochtag (Planer), Anzeige „BfR: 2–3 Tage“ | BfR 2–3 Tage; FSA 48 h | belegt; 2 Tage = konservative Wahl |
| L3 | Gericht mit rohen Komponenten (Salat, rohes Gemüse, frische Kräuter) | max. 1 Tag; Rohkomponenten getrennt packen | BfR-FAQ | belegt |
| L4 | Gekochter Reis | max. 1 Tag (24 h), danach einfrieren; schnell abkühlen; nur 1× aufwärmen | FSA/NHS | belegt (UK), DE ohne Zahl |
| L5 | Abkühlen | flach portionieren, Ziel ≤ 2 h bis Kühlschrank (Reis ≤ 1 h) | BfR „wenige Stunden“; USDA 2 h; FSA Reis 1 h | strengste Variante |
| L6 | Aufwärmen | ≥ 70 °C, 2 Min., überall; Mikrowelle umrühren | BfR | belegt |
| L7 | Heißhalten / Thermobehälter | ≥ 60 °C bis zum Verzehr; Behälter mit kochendem Wasser vorwärmen, Essen kochend heiß einfüllen | BfR 016/2024; Vorwärmen = Einschätzung | teils belegt |
| L8 | Ungekühlt | max. 2 h, bei Hitze (> 32 °C) 1 h | USDA | belegt (US) |
| L9 | Transport | Kühltasche/Kühlbox mit Akkus; im Sommer immer | BfR | belegt; Haltedauer unbelegt |
| L10 | Einfrieren | portioniert, abgekühlt, −18 °C; Fristen je Gruppe (siehe oben); Auftauen im Kühlschrank | BfR-FAQ | belegt |
| L11 | Geräteprofil „kein Kühlschrank“ | nur Gerichte, die sofort gegessen werden, oder ungekühlt lagerfähige Zutaten (Brot, Nüsse, ganzes Obst, Konserven ungeöffnet); kein Meal-Prep über Nacht | aus L1/L8 abgeleitet | Einschätzung |
| L12 | Risikogruppen (Schwangere, Ältere, Immungeschwächte) | Hinweis Listerien, kalt gegessene Gerichte strenger | BfR Listerien (Vorrecherche) | belegt |

Anzeige-Text Beispiel: „Hält im Kühlschrank (≤ 7 °C, besser ≤ 5 °C) bis Mittwoch. Danach einfrieren. Quelle: BfR.“ Nie „hält 5 Tage“.

## 5. Rezeptquelle

**Empfehlung:** **Eigene Rezepte**, mit KI **entworfen**, von der Ernährungsfachkraft **strukturiert geprüft** und **testgekocht**, Fotos mit Higgsfield. Keine Übernahme fremder Rezepttexte oder Fotos, keine Open-Datensätze mit unklarer Lizenz. Startumfang **120 Rezepte** (davon 40 „Montage-tauglich“ mit Wasserkocher/Mikrowelle/1 Platte), Ausbau auf 200.

### 5.1 Rechtslage Rezepte (Einschätzung, keine Rechtsberatung)
- Geschützt sind nur „persönliche geistige Schöpfungen“ (§ 2 Abs. 2 UrhG). **Die Idee eines Gerichts und eine einfache Zutatenliste mit Mengen sind nicht geschützt**; ausführliche, individuell formulierte Zubereitungstexte können geschützt sein. In einem von e-recht24 beschriebenen Fall wurden 127 Rezepte samt Bildern kopiert, nur **zwei** Rezepte erreichten die Schöpfungshöhe ([e-recht24](https://www.e-recht24.de/urheberrecht/8208-abmahnung-rezepte-kochbuch.html); [netzpolitik.org](https://netzpolitik.org/2006/stehen-kochrezepte-unter-dem-copyright/)) [belegt über Sekundärquellen].
- **Fotos sind immer geschützt** – als Lichtbildwerk (§ 2 Abs. 1 Nr. 5) oder als einfaches Lichtbild (§ 72 UrhG, 50 Jahre). Fremde Rezeptfotos nie verwenden.
- **Sammlungen/Datenbanken** können als Sammelwerk (§ 4 UrhG) oder sui generis (§ 87a UrhG) geschützt sein, auch wenn einzelne Rezepte frei sind → kein massenhaftes Abschreiben aus Chefkoch & Co.
- **KI-Ausgaben** sind mangels menschlicher Schöpfung in DE in der Regel **nicht** urheberrechtlich geschützt [Einschätzung, h. M.]. Folge: Eigene Rezepte werden erst durch eigene Bearbeitung (Texte, Auswahl, Struktur) schützbar; die **eigene Rezeptdatenbank** ist über § 87a UrhG (Investition in Prüfung/Testkochen) geschützt [Einschätzung].
- Die Nutzungsbedingungen der KI-Anbieter (Anthropic, OpenAI) überlassen dem Nutzer die Rechte an der Ausgabe [Einschätzung, Stand meines Wissens; vor Launch AGB lesen].

### 5.2 Optionen

| Option | Lizenz/Recht | Kosten | Qualität | Bewertung |
|---|---|---|---|---|
| **Eigene Rezepte (KI-Entwurf + Prüfung + Testkochen)** | volle Kontrolle | Zeit + Lebensmittel (Testkochen ca. 3–5 € pro Rezept-Portion [Einschätzung]) | so gut wie der QS-Prozess | **empfohlen** |
| Rezeptlizenz von Verlag/Foodblogger | Vertrag nötig, oft teuer, Fotos extra | unbekannt [unsicher] | gut, aber nicht auf Geräte/Unterkunft zugeschnitten | später für Premium-Kooperationen |
| **Wikibooks-Kochbuch** (deutsch) | **CC BY-SA 4.0** (Wikimedia-Standard) [Einschätzung, Seite nicht einzeln geprüft] → Share-Alike: abgeleitete Texte müssen ebenfalls CC BY-SA sein | kostenlos | sehr uneinheitlich | **nicht empfohlen** (Share-Alike infiziert eigene Rezepttexte) |
| **RecipeNLG** (2,2 Mio. englische Rezepte) | Zugangsbedingungen: „only for non-commercial research and educational purposes“ ([Hugging Face](https://huggingface.co/datasets/mbien/recipe_nlg)) [belegt] | – | englisch, US | **ausgeschlossen** |
| TheMealDB / Spoonacular / Edamam (APIs) | eigene AGB, kommerziell kostenpflichtig [unsicher, nicht geprüft] | laufend | US-lastig, keine Gerätelogik | nicht empfohlen |
| Chefkoch & Co. abschreiben | Sammelwerk-/Datenbankschutz, AGB | – | – | **ausgeschlossen** |

### 5.3 Qualitätssicherungsprozess (Vorschlag, 7 Stufen)
1. **Steckbrief** je Rezept: Zielgruppe/Variante, erlaubte Geräte, max. Zeit, Ziel-Kosten/Portion, Diätformen, Meal-Prep ja/nein.
2. **KI-Entwurf** im festen JSON-Schema (Zutaten nur aus der eigenen Zutatenliste mit BLS-Code, Mengen in g/ml, Schritte mit Gerät und Zeit). Freitext-Zutaten werden vom Validator abgelehnt.
3. **Automatische Prüfung (Code):** Zutaten existieren; Geräte in den Schritten ⊆ erlaubte Geräte; Nährwerte und Kosten aus BLS + Preisdatenbank berechnet (nie aus dem LLM übernommen); Allergene automatisch abgeleitet; Lagerregel automatisch aus L1–L12 (z. B. Reis → L4); Plausibilität (Salz < x g/Portion, Garzeiten Geflügel/Hack vorhanden).
4. **Fachprüfung Ökotrophologie** (Checkliste): Durchgaren (Geflügel, Hack, Eier, Hülsenfrüchte – rohe Kidneybohnen!), Lagerfähigkeit, Allergen-Fallen (Brühe, Gewürzmischung, Sojasauce = Weizen), Mengen realistisch, Diät-Tags korrekt (vegan, vegetarisch, laktosefrei – keine Gesundheitsversprechen).
5. **Testkochen** mit genau den angegebenen Geräten (z. B. im Hotelzimmer-Setup: Wasserkocher + Mikrowelle), Zeit stoppen, Foto für interne Doku, Abweichungen einarbeiten. Pflicht für alle „Montage“-Rezepte, sonst Stichprobe ≥ 30 %.
6. **Sprachprüfung** (copy-editing): kurz, Schritt für Schritt, Du-Form, keine Werbeversprechen.
7. **Freigabe & Versionierung:** Rezept bekommt Status `geprüft`, Prüfer, Datum, Version. Nur `geprüft` wird im Planer genutzt. Nutzerfeedback („hat nicht geklappt“) öffnet automatisch ein Ticket.

Aufwand: ca. 45–90 Minuten pro Rezept inkl. Testkochen [Einschätzung] → 120 Rezepte ≈ 90–180 Stunden. Größter einzelner Zeitposten des MVP.

## 6. Planungs-Algorithmus

**Empfehlung: Hybrid, mit klarer Arbeitsteilung.**
1. **Harte Filter regelbasiert** (Code, testbar): Allergene, Diät, Abneigungen, Geräte, Kühlschrank ja/nein, max. Zubereitungszeit, Lagerregeln L1–L12.
2. **Auswahl per ganzzahliger Optimierung (MILP) im Browser** mit **HiGHS (WebAssembly, MIT)**: Ziel = Kosten minimieren bzw. Makro-Abweichung minimieren, Nebenbedingungen = Budget, Kalorien/Protein-Band, Abwechslung (Rezept max. 2×/Woche), Reste-Verwertung (Packungen aufbrauchen), Meal-Prep-Blöcke (Kochtag + max. 2 Tage).
3. **Fallback regelbasiert (Greedy + Zufall)**, falls der Solver keine Lösung findet oder das Gerät zu schwach ist; mit klarer Meldung, welche Bedingung gelockert wurde.
4. **LLM nur optional und nur für Text** (z. B. „Plan erklären“, Rezept-Variation als Entwurf für die Redaktion). **Kein LLM entscheidet über Allergene, Mengen, Nährwerte oder Kosten.**

### 6.1 Solver-Bibliotheken (geprüft über npm-Registry, 28.10.2026)

| Paket | Version | Lizenz | Größe | Eignung |
|---|---|---|---|---|
| **highs** (HiGHS, Uni Edinburgh → WebAssembly) | 1.15.4 | **MIT** | `highs.wasm` 3,53 MB, **gzip ca. 1,21 MB** (selbst gemessen) + JS-Lader ca. 168 KB | **empfohlen**: echter MILP-Solver, schnell; WASM lazy laden (erst beim Planen), per Service Worker cachen |
| **yalps** | 0.6.4 | MIT | ca. 30 KB JS | gute leichte Alternative (Neuschreibung von javascript-lp-solver), für kleine Modelle |
| **javascript-lp-solver** | 1.0.3 | Unlicense | ca. 2,4 MB entpackt (Paket) | funktioniert, aber langsamer bei MIP [Einschätzung] |
| **glpk.js** | 5.0.0 | **GPL-3.0** | ca. 2,6 MB entpackt | **nicht verwenden**: GPL bei Auslieferung an den Browser = Weitergabe → eigener Code müsste GPL-kompatibel offengelegt werden [Einschätzung] |

**Modellgröße und Rechenzeit:** 7 Tage × 3–4 Mahlzeiten × ca. 120–200 Kandidaten nach Filter → ca. 2.500–5.600 Binärvariablen, dazu Packungs-Variablen (ganzzahlig, ca. 150). Für HiGHS ist das ein kleines Modell; erwartete Rechenzeit **unter 1–3 Sekunden** auf einem Mittelklasse-Handy [Einschätzung, **nicht gemessen** – im MVP mit Benchmark-Test auf einem älteren Android-Gerät prüfen]. Gegenmaßnahmen: Vorfilter auf 30–50 Kandidaten je Mahlzeit, Zeitlimit für den Solver (z. B. 3 s) und beste gefundene Lösung nehmen, Berechnung im Web Worker (UI friert nicht ein).

### 6.2 LLM-Kosten pro Plan (Preise laut Anthropic, Stand 06.10.2026, [Pricing](https://platform.claude.com/docs/en/about-claude/pricing))

| Modell | Input $/1 Mio. Tokens | Output $/1 Mio. Tokens | Plan „Auswahl aus Katalog“ (≈ 6.000 in / 2.000 out) | Plan „Rezepte frei schreiben“ (≈ 6.000 in / 15.000 out) |
|---|---|---|---|---|
| Claude Haiku 5.5 | 0,10 (bis 100K Prompt) | 0,50 | ≈ 0,0016 $ | ≈ 0,008 $ |
| Claude Haiku 4.5 | 1,00 | 5,00 | ≈ 0,016 $ | ≈ 0,081 $ |
| Claude Sonnet 5.5 | 2,00 | 10,00 | ≈ 0,032 $ | ≈ 0,16 $ |
| OpenAI GPT-4o-mini / Nachfolger | **nicht geprüft** (Preisseite nicht abrufbar, 403) [unsicher] | | | |

Batch-API: 50 % Rabatt (asynchron); Prompt-Caching senkt wiederholten Systemprompt/Katalog stark [laut Anthropic-Dokumentation]. Denk-Tokens (adaptives Denken) kommen als Output hinzu und können die Output-Kosten vervielfachen [Einschätzung]. Rechnung: Token-Schätzung von mir, nicht gemessen.

**Bewertung:** Kosten sind mit Haiku 5.5 vernachlässigbar (unter 1 Cent je Plan), mit Sonnet bei 2–3 Plänen pro Nutzer und Woche ca. 0,30–2 $ pro Nutzer und Monat. **Das Problem ist nicht der Preis, sondern die Zuverlässigkeit:**
- LLMs halten Summen (Kalorien, Budget) nicht zuverlässig ein und erfinden Nährwerte [Einschätzung, bekannt aus Praxis].
- **Allergen-Halluzination** (z. B. Pesto „ohne Nüsse“, Sojasauce „glutenfrei“) ist ein Haftungsrisiko; ein Fehler bei Anaphylaxie ist nicht hinnehmbar.
- Ergebnisse sind nicht reproduzierbar, schwer testbar; Datenschutz (Allergien/Gewicht = möglicherweise Gesundheitsdaten nach Art. 9 DSGVO) würde an einen US-Anbieter übermittelt.
- Offline-Nutzung (Monteurzimmer ohne WLAN) wäre unmöglich.

**Regelbasiert/MILP:** deterministisch, testbar (Eigenschaftstests: „nie Allergen X“, „nie Budget überschritten“), offline, 0 € laufende Kosten, keine Gesundheitsdaten verlassen das Gerät. Nachteil: Qualität hängt an der Rezeptdatenbank und an guten Tags.

## 7. Technik

**Empfehlung:** **PWA** (statisch gehostet, offline-fähig, Planung im Gerät), **Konto optional** (Supabase EU-Region mit Magic Link, nur für Sync und Abo), **Bezahlung über einen Merchant of Record (Paddle)** zum Start, **Kündigungsbutton selbst bauen** (Webhook/API), **PDF clientseitig** (pdfmake oder Druck-CSS). Native App erst, wenn Zahlen es rechtfertigen.

### 7.1 PWA vs. native App
| Kriterium | PWA | Native (iOS/Android) |
|---|---|---|
| Kosten | 0 € Store-Gebühr; ein Code | Apple 99 $/Jahr, Google 25 $ einmalig [Einschätzung, bekannte Gebühren]; In-App-Kauf-Provision 15–30 % (siehe Auftrag) |
| Offline | Service Worker + IndexedDB (z. B. Dexie, Apache-2.0) | ja |
| Installieren | Android: Installations-Aufforderung; **iOS: nur manuell über „Teilen → Zum Home-Bildschirm“**, kein `beforeinstallprompt` ([MagicBell](https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide); [MobiLoud](https://www.mobiloud.com/blog/progressive-web-apps-ios)) [belegt, Sekundärquellen]. Seit iOS 26 öffnen Seiten vom Home-Bildschirm standardmäßig als Web-App [laut Sekundärquelle, unsicher] | Store-Auffindbarkeit |
| Push | iOS ab 16.4 **nur für installierte Web-Apps**; Safari 18.4 brachte Declarative Web Push [Sekundärquellen] | voll |
| EU/DMA | Apple wollte mit iOS 17.4 (Feb. 2024) Home-Screen-Web-Apps in der EU abschalten und hat das nach Kritik **zurückgenommen**; sie laufen weiter auf WebKit-Basis ([Apple: DMA and apps in the EU](https://developer.apple.com/support/dma-and-apps-in-the-eu/); [heise/iphone-ticker-Berichte](https://www.iphone-ticker.de/keine-web-apps-in-europa-apple-huellt-sich-in-schweigen-229991/)) [Stand meines Wissens; aktuellen Stand 2026 **auf einem iPhone mit EU-Konto testen**] | – |
| Reichweite | Link teilen (Facebook-Gruppen, WhatsApp) = ideal für Monteure | Store-Suche |

**Fazit:** Für ein Ein-Personen-Unternehmen ohne Budget ist die PWA klar besser. Push ist für den Kern (Plan, Einkaufsliste) nicht nötig; Erinnerungen notfalls per E-Mail (Double-Opt-in). Später optional als Store-App verpacken (z. B. Capacitor/TWA) [Einschätzung].

### 7.2 Hosting (EU)
| Option | Kosten | Hinweis |
|---|---|---|
| Statisches Hosting (Cloudflare Pages, Netlify, Vercel – US-Firmen mit EU-Rechenzentren; Bunny.net – EU-Firma) | Starttarife kostenlos bzw. wenige € [Einschätzung, Tarife nicht einzeln geprüft] | PWA ist statisch → kein eigener Server nötig. Auftragsverarbeitungsvertrag (AVV) und Drittlandtransfer prüfen. |
| **Hetzner Cloud** (DE) | Preise 2026 zweimal erhöht (April und Juni 2026), kleinster Server laut Berichten ca. 4–5 €/Monat ([heise](https://heise.de/-11333037); [Hetzner Docs](https://docs.hetzner.cloud/whats-new)) [unsicher, exakte Preise auf Hetzner-Seite prüfen] | volle EU-Kontrolle, aber Wartung selbst |
| **Supabase** (Auth + Postgres) | **Free:** 500 MB DB, 50.000 MAU, Projekt pausiert nach 1 Woche Inaktivität; **Pro: ab 25 $/Monat**, 100.000 MAU, 8 GB ([Supabase Pricing](https://supabase.com/pricing)) [belegt] | EU-Region (Frankfurt) wählbar [Einschätzung, auf Pricing-Seite nicht genannt]; Supabase Inc. ist US-Firma → Datenschutzerklärung/AVV, Drittlandtransfer |

**Datenschutz-Architektur:** Allergien, Gewicht und Makros **standardmäßig nur lokal im Gerät** speichern (IndexedDB). Sync ins Konto nur mit ausdrücklicher Einwilligung. So bleibt die Frage Art. 9 DSGVO (Gesundheitsdaten) klein [Einschätzung, im Rechtsbericht klären].

### 7.3 Auth/Konto
- **Supabase Auth mit Magic Link** (E-Mail-Link statt Passwort). Für Monteure ohne festes Gerät praktisch. Achtung: Standard-E-Mail-Versand von Supabase ist stark limitiert; eigener SMTP-Anbieter (EU, z. B. Brevo/Mailjet) nötig [Einschätzung, Limits nicht geprüft].
- **Ohne Konto nutzbar** (Gastmodus, lokal) senkt die Einstiegshürde; Konto erst beim Kauf.

### 7.4 Bezahlung
| Anbieter | Gebühr | Übernimmt USt/OSS? | Kündigungsbutton (§ 312k BGB) |
|---|---|---|---|
| **Stripe** (eigener Händler) | EWR-Karten **1,5 % + 0,25 €**; UK 2,5 % + 0,25 €; international 3,15 % + 0,25 €; SEPA-Lastschrift 0,35 €; **Billing (Abos) 0,7 %**; **Stripe Tax 0,5 %** (No-Code) bzw. 0,45 €/Transaktion (API) ([Stripe Preise DE](https://stripe.com/de/pricing)) [belegt] | **Nein** – Stripe Tax berechnet, aber Verkäufer bleibt Steuerschuldner (OSS-Meldung selbst) | Kundenportal vorhanden; § 312k-Button muss man selbst auf der Website bauen (API) [Einschätzung] |
| **Stripe Managed Payments** (MoR) | **3,5 % zusätzlich** zu den Zahlungsgebühren ([Stripe Preise DE](https://stripe.com/de/pricing)) [belegt]; nur mit Stripe Checkout/Payment Links [Sekundärquelle] | ja (MoR) | wie oben, Umfang [unsicher] |
| **Paddle** (MoR) | **5 % + 0,50 $** pro Transaktion, keine Monatsgebühr; Sonderpreise unter 10 $ auf Anfrage ([Paddle Pricing](https://www.paddle.com/pricing)) [belegt] | **ja**: Paddle ist Merchant of Record, erhebt und führt Steuern ab [belegt] | Kündigung per API möglich → eigener Button; ob Paddle-Standardstrecke § 312k erfüllt [unsicher] |
| **Lemon Squeezy** (MoR) | 5 % + 0,50 $ [Sekundärquellen]; 2024 von Stripe übernommen, Entwicklung geht in Stripe Managed Payments über ([Finextra](https://finextra.com/pressarticle/101686/stripe-acquires-lemon-squeezy); [Fungies](https://fungies.io/lemon-squeezy-stripe-acquisition-saas-founders-2026/)) | ja | **nicht empfohlen** (Zukunft unklar) |
| **Digistore24** (DE, MoR/Wiederverkäufer) | **7,9 % + 1 €** pro Verkauf [mehrere Sekundärquellen, z. B. [ecom-tools](https://ecom-tools.de/digistore24/)]; vzbv-Verfahren wegen Abo-Transparenz erwähnt [Sekundärquelle, unsicher] | ja (Digistore24 verkauft im eigenen Namen) | [unsicher] – beim Anbieter erfragen |
| **CopeCart** (DE) | **4,9 % + 1 €** pro Verkauf (EU-Vendor), Pro 3,9 % + 1 € laut OMR ([CopeCart-Hilfe](https://intercom.help/copehelp/de/articles/6990780-copecart-gebuhr); [OMR](https://omr.com/de/reviews/product/copecart/pricing)) [belegt/Sekundär] | ja (Wiederverkäufer) | [unsicher] |
| **PayPal** | nicht geprüft [unsicher] | nein | – |

Rechenbeispiel Abo 4,99 €/Monat (brutto, EWR-Karte):
- Stripe: 1,5 % + 0,25 € + 0,7 % Billing + 0,5 % Tax ≈ **0,38 €** (≈ 7,6 %), USt/OSS selbst.
- Paddle: 5 % + 0,50 $ ≈ 0,25 € + ca. 0,43 € ≈ **0,68 €** (≈ 14 %) [Wechselkurs ca. 1,16 $/€ geschätzt], alles inklusive.
- CopeCart: 4,9 % + 1 € ≈ **1,24 €** (≈ 25 %). Digistore24: 7,9 % + 1 € ≈ **1,39 €** (≈ 28 %).
→ Bei kleinen Monatsbeträgen fressen Fixgebühren viel. **Jahresabo** (z. B. 39 €/Jahr) senkt den Anteil deutlich.

**Empfehlung:** Start mit **Paddle** (MoR: keine OSS-Meldungen, keine Rechnungen, Steuerhaftung beim MoR) oder – falls Inhaber ohnehin Kleinunternehmer bleibt und nur DE-Kunden hat – Stripe direkt (günstiger). Entscheidung hängt am Steuerbericht. **Kündigungsbutton immer selbst auf der eigenen Seite** („Verträge hier kündigen“ → Bestätigungsseite „Jetzt kündigen“), technisch über die Kündigungs-API des Anbieters. Kein Shopify nötig (Abos digitaler Dienste passen schlecht zur Digital-Downloads-App).

### 7.5 PDF-Export clientseitig
| Bibliothek | Lizenz | Hinweis |
|---|---|---|
| **pdfmake** 0.3.13 | MIT | Tabellen, Seitenumbrüche, eigene Schriften (lokal einbetten, DSGVO) → **empfohlen** für Wochenplan + Einkaufsliste |
| jsPDF 4.2.1 | MIT | eher Zeichenebene, viel Handarbeit |
| pdf-lib 1.17.1 | MIT | Bearbeiten/Ausfüllen, weniger Layout |
| @react-pdf/renderer 4.9.0 | MIT | gut, wenn die App React nutzt |
| Druck-CSS (`@media print`, „Als PDF speichern“) | – | 0 KB extra, funktioniert überall; als Sofort-Lösung im MVP |
Zusätzlich: Einkaufsliste als Text teilen (Web Share API → WhatsApp) und `.ics` für Kochtage [Einschätzung].

## Quellen (alle abgerufen am 28.10.2026)

**Nährwerte**
- BLS-Download und Lizenz: https://blsdb.de/download · BLS-FAQ: https://blsdb.de/faq · BLS-Dokumentation: https://blsdb.de/assets/uploads/BLS_4_0_Dokumentation_DE.pdf · MRI: https://www.mri.bund.de/de/institute/ernaehrungsverhalten/forschungsbereiche/bundeslebensmittelschluessel-bls/ · heise: https://heise.de/-11123877
- USDA FDC API-Guide (Lizenz, Limits): https://fdc.nal.usda.gov/api-guide/
- Open Food Facts Terms of use: https://world.openfoodfacts.org/terms-of-use
- CIQUAL-Update 19.11.2025: https://www.anses.fr/en/content/new-enhanced-and-more-representative-version-ciqual-table · data.gouv: https://www.data.gouv.fr/datasets/table-de-composition-nutritionnelle-des-aliments-ciqual/
- Schweizer Nährwertdatenbank: https://naehrwertdaten.ch/de/downloads/ · https://www.blv.admin.ch/de/schweizer-naehrwertdatenbank · https://ckan.opendata.swiss/dataset/naehrwerte_lebensmittel

**Allergene**
- VO (EU) 1169/2011: https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32011R1169 · Verbraucherzentrale NRW: https://www.verbraucherzentrale.nrw/kennzeichnung-von-allergenen-und-zusatzstoffen-94938

**Preise und Recht**
- Awin Rewe DE: https://ui.awin.com/merchant-profile/11652 · Awin Picnic DE: https://ui.awin.com/merchant-profile/116041 · Knuspr (FlexOffers): https://www.flexoffers.com/affiliate-programs/knuspr-de-affiliate-program/
- Kaufland Marketplace API: https://www.kauflandglobalmarketplace.com/en/seller-university/selling/listing-via-api-interface/ · Apify Rewe-Scraper (Beleg für inoffizielle Endpunkte): https://apify.com/studio-amba/rewe-scraper
- SupermarktCheck: https://www.supermarktcheck.de/ueber-uns/ · heisse-preise Impressum: https://heissepreise.github.io/imprint.html · FM4: https://fm4.orf.at/stories/3034417/
- BWB-Fokuspapier 09/2023: https://www.bwb.gv.at/fileadmin/user_upload/Fokuspapier_Preisvergleichsplattformen_Sept_2023_barrierefrei_14.09.2023.pdf
- § 87b UrhG: https://www.gesetze-im-internet.de/urhg/__87b.html
- EuGH C-762/19: https://www.scl.org/12290-cjeu-search-engine-copying-of-databases-infringes-sui-generis-right-where-it-adversely-affects-database-maker-investment/ · https://www.twobirds.com/en/insights/2021/uk/cv-online-latvia-cjeu-complicates-the-enforcement-of-database-rights
- EuGH C-30/14 Ryanair: https://curia.europa.eu/juris/liste.jsf?num=C-30/14
- BGH I ZR 159/10: https://rewis.io/urteile/urteil/rlw-21-06-2011-i-zr-15910/ · https://betriebs-berater.ruw.de/wirtschaftsrecht/urteile/Zur-automatisierten-Auswertung-von-Online-Datenbanken---Automobil-Onlineboerse-17656
- BGH I ZR 224/12: https://www.lto.de/recht/hintergruende/h/bgh-urteil-izr22412-screen-scraping-flugdaten-automatisiert-auslesen-ryanair-reiseportal · https://www.ra-plutte.de/bgh-zum-automatisierten-auslesen-fremder-websites-via-screen-scraping/

**Lagerung**
- BfR Verbrauchertipps Privathaushalt: https://www.bfr.bund.de/cm/350/verbrauchertipps_schutz_vor_lebensmittelinfektionen_im_privathaushalt.pdf
- BfR-FAQ Vorkochen: https://www.bfr.bund.de/en/service/frequently-asked-questions/topic/pre-cooking-for-several-days-what-should-i-bear-in-mind/ · https://www.bfr.bund.de/assets/01_Ver%C3%B6ffentlichungen/FAQ_deutsch/faq-vorkochen-fuer-mehrere-tage.pdf
- BfR Stellungnahme 016/2024 Heißhalten: https://www.bfr.bund.de/cm/343/schutz-vor-lebensmittelbedingten-erkrankungen-beim-heisshalten-von-speisen-aktualisiert.pdf
- BfR Bacillus cereus (09.01.2026): https://www.bfr.bund.de/assets/01_Ver%C3%B6ffentlichungen/Mitteilungen_deutsch/bacillus-cereus-in-lebensmitteln-bei-vermehrung-kann-das-bakterium-ein-gift-bilden.pdf
- BZfE Mealprep: https://www.bzfe.de/presse/pressemeldungen-archiv/mealprep-fuer-die-mittagspause · BZfE Lagerung: https://www.bzfe.de/einfache-sprache/kochen-und-aufbewahren/lagerung
- FSA: https://www.food.gov.uk/safety-hygiene/home-food-fact-checker · NHS: https://www.nhs.uk/live-well/eat-well/food-types/starchy-foods-and-carbohydrates/ · USDA: https://www.usda.gov/node/15671 (aus Vorrecherche)

**Rezepte**
- e-recht24: https://www.e-recht24.de/urheberrecht/8208-abmahnung-rezepte-kochbuch.html · netzpolitik.org: https://netzpolitik.org/2006/stehen-kochrezepte-unter-dem-copyright/ · RecipeNLG: https://huggingface.co/datasets/mbien/recipe_nlg

**Algorithmus**
- npm-Registry (Lizenz/Version): https://registry.npmjs.org/highs · /glpk.js · /javascript-lp-solver · /yalps · WASM-Datei: https://unpkg.com/highs@1.15.4/build/highs.wasm
- Anthropic-Preise: https://platform.claude.com/docs/en/about-claude/pricing

**Technik**
- Stripe DE: https://stripe.com/de/pricing · Paddle: https://www.paddle.com/pricing · Supabase: https://supabase.com/pricing
- CopeCart: https://intercom.help/copehelp/de/articles/6990780-copecart-gebuhr · OMR: https://omr.com/de/reviews/product/copecart/pricing · Digistore24 (Sekundär): https://ecom-tools.de/digistore24/
- Lemon Squeezy/Stripe: https://finextra.com/pressarticle/101686/stripe-acquires-lemon-squeezy · https://fungies.io/lemon-squeezy-stripe-acquisition-saas-founders-2026/
- iOS-PWA: https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide · https://www.mobiloud.com/blog/progressive-web-apps-ios · https://developer.apple.com/support/dma-and-apps-in-the-eu/
- Hetzner: https://heise.de/-11333037 · https://docs.hetzner.cloud/whats-new
