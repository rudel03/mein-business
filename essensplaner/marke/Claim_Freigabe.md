# Claim-Freigabe · Essensplaner (Zimmerherd, Zweiflammer, Kochsatz, Wochenschmaus)

Stand: 29.10.2026 · Prüfung: Wettbewerbs-, Lebensmittel- und IT-Recht plus Ernährungsfachkraft (Ökotrophologie, DGE/BfR) · **Kein Ersatz für eine anwaltliche Prüfung** (Abschnitt 7).

## 1. Methode

**Prüfgegenstand**
- Markenbücher: `marke/zimmerherd/Markenbuch_Zimmerherd.md`, `marke/zweiflammer/Markenbuch_Zweiflammer.md`, `marke/kochsatz/Markenbuch_Kochsatz.md`, `marke/wochenschmaus/Markenbuch_Wochenschmaus.md` (Positionierung, Kernversprechen, Claims, Zweitzeilen, alle Angle-Headlines und Primärtexte, Do & Don't, Lead-Magnet-Versprechen, Mail-Strecken, Preis- und Testphasen-Texte, Leitplanken-Tabellen).
- App-Texte: `app/public/js/config.js` (Claims, Kurztexte, Preistexte), `app/tools/seiten.py` (Preise, AGB, Widerruf, Datenschutz, Kündigung, Impressum), `app/tools/planer.vorlage.html`, `app/public/js/app.js` (Lager-, Allergen-, Makro-, Preis-Hinweise), `app/public/js/engine/ablauf.js` (Vorkoch-Hinweise), `app/tools/landing.py` (vier Landingpages und Startseite, nachträglich in den Auftrag aufgenommen).

**Grundlagen**
- `recherche/07_Recht_und_Steuern.md` §§ 3 (Abo, Button, Testphase, Widerruf, PAngV), 4 (DSGVO, Tracking), 5 (HCVO, HWG, UWG, Formulierungsliste 5.6), 6 (MDR), 8 (LMIV, Allergen-Haftung).
- `recherche/10_Faktencheck.md` (u. a. § 356a BGB Widerrufsfunktion in Kraft).
- `recherche/06_Daten_und_Machbarkeit.md` Abschnitt 4 (Lagerregeln L1–L12 mit Primärzitaten BfR, BZfE, FSA, USDA).
- `recherche/09_Preisstichprobe.md` (37 von 56 Zutaten belegt; **Fleisch, Fisch, Aufschnitt 16–48 % zu niedrig geschätzt**, Butter, Wraps, Reis, Nudeln u. a. 22–46 % zu hoch; Obst, Gemüse, Linsen, Thunfisch, Kaufland, Netto, Penny unbelegt).
- `ENTSCHEIDUNGEN.md` (C6 Preise, C8 Rezepte nicht testgekocht, C9 Lagerregeln, C10 Gratis-Umfang, P1 Preise), App-Code (`planer.js`, `laeden.js`, `ablauf.js`, `tests/planer.test.mjs`).

**Normen, an denen jede Aussage gemessen wurde**
| Bereich | Normen |
|---|---|
| Irreführung, Vergleich, Blacklist | §§ 5, 5a, 5b, 6 UWG; UWG Anhang Nr. 10 (Werbung mit Selbstverständlichkeiten), Nr. 21 („gratis“), Nr. 23b/c (Bewertungen), Nr. 28 (Kinder) |
| Lebensmittelbezogene Angaben | VO (EG) 1924/2006 (HCVO) Art. 2, 5, 6, 8, 10, 12, 13 und Anhang; VO (EU) 432/2012; Art. 7 LMIV; § 11 LFGB; VO (EU) 828/2014 („glutenfrei“) |
| Krankheit, Medizinprodukt | §§ 1, 3, 11, 12 HWG; Art. 2 Nr. 1 und 12 MDR, MDCG 2019-11 |
| Abo, Kasse, Preise | §§ 312j, 312k, 356 Abs. 4, 356a, 357a BGB; § 309 Nr. 9 BGB; Art. 246a EGBGB; §§ 1, 3 PAngV |
| Daten | Art. 9 DSGVO; § 25 TDDDG; § 7 UWG (Double-Opt-in) |
| Umwelt | RL (EU) 2024/825 (Empowering Consumers, Anwendung ab 27.09.2026), umgesetzt im UWG **[Fundstelle der deutschen Umsetzung durch Anwältin bestätigen lassen]** |
| Lebensmittelsicherheit | BfR-Verbrauchertipps 2020, BfR-FAQ Vorkochen, BfR-Stellungnahme 016/2024 (Heißhalten ≥ 60 °C), BfR-Mitteilung B. cereus 09.01.2026; FSA/NHS (Reis), USDA (2-Stunden-Regel) |

**Ampel**
- 🟢 **frei**: so verwendbar, auch in Anzeigen (Zahlen vor jeder Schaltung neu zählen bzw. Datum angeben).
- 🟡 **frei mit Änderung**: nur in der angegebenen Neuformulierung oder mit der genannten Auflage. In den Markenbüchern bzw. App-Dateien bereits umgesetzt.
- 🔴 **gesperrt**: nicht verwenden, bis der genannte Beleg oder die Produktfunktion vorliegt. In den Markenbüchern sichtbar mit „🔴 GESPERRT: Grund“ markiert.

**Strenge Prüfregeln (für alle Marken)**
1. Kosten: Konkrete Euro-Beträge nur aus einem echten Plan, mit „geschätzt“ bzw. „ca.“, Laden, Personen, Preisstand. **Zusätzlich gesperrt bis** (a) die Korrekturliste aus `09` §5b in `zutaten.py` übernommen ist (sonst sind fleischlastige Pläne systematisch zu billig, das wäre trotz „geschätzt“ irreführend, § 5 Abs. 1 S. 2 Nr. 2 UWG) und (b) der Kassenbon-Test (±15 %, `11` Punkt 4.1) bestanden ist. Spar-Aussagen („spart X €“, „günstiger als …“) bleiben gesperrt, bis eine Ersparnis gemessen ist.
2. Lagerung: Zahlen nur so, wie sie belegt sind. Das BfR nennt **2–3 Tage** für gegarte Reste und **1 Tag** für Gerichte mit Rohkost. Die **1-Tages-Regel für Reis** stammt von FSA/NHS, für Nudeln, Fisch, Hack und Ei ist sie eine **eigene, strengere Regel** (C9). Die **2-Stunden-Regel ungekühlt** stammt von der USDA. Wer „höchstens 2 Tage (BfR)“ oder „Reis 1 Tag (BfR)“ schreibt, schreibt der Behörde eine Zahl zu, die sie nicht nennt (§ 5 UWG). Alle Haltbarkeitsangaben gelten nur bei **höchstens 7 °C** (BfR). Bordkühlschränke (Absorber) und thermoelektrische 24-V-Kühlboxen schaffen das im Sommer oft nicht.
3. „gesund“, „leicht“, „fit“, „gut für …“: allgemeine Gesundheitsaussage, nur mit zugelassener spezieller Angabe (Art. 10 Abs. 3 HCVO) → für Rezepte und Pläne praktisch nie.
4. „sättigend“, „macht (lange) satt“ als Eigenschaft eines Gerichts: gesundheitsbezogene Angabe zum Sättigungsgefühl (Art. 13 Abs. 1 lit. c HCVO), nicht zugelassen. „Satt werden“ als Beschreibung der Essenssituation (genug zu essen haben) ist vertretbar.
5. Protein: „Proteinquelle“ nur ab 12 %, „proteinreich“/„High Protein“ nur ab 20 % der Energie aus Protein (HCVO Anhang). Muskel-Claim nur wörtlich nach VO (EU) 432/2012, nur bei ≥ 12 % Energie aus Protein, **mit den Pflichtangaben nach Art. 10 Abs. 2 HCVO**, nur in der Rezeptansicht, **nie in Anzeigen**.
6. Abnehmen, Körperfett, Krankheiten, Ärzte: gesperrt (Art. 12 lit. b, c HCVO; Art. 7 Abs. 3 LMIV; HWG; MDR).
7. Umwelt: „nachhaltig“, „umweltfreundlich“, „klimafreundlich“, „Zero Waste“, „weniger Verschwendung“ als Pauschal- oder Vergleichsaussage gesperrt. Erlaubt ist die konkrete, wahre Funktionsbeschreibung („rechnet mit ganzen Packungen und zeigt, was übrig bleibt“).
8. Vergleich: Kein Wettbewerbername (mise, Yazio, HelloFresh, „mobile cooking“, Omnia-Bücher) in Werbung. Auch Kategorie-Vergleiche („Kochbox“, „Tracker“) nur sachlich, ohne Herabsetzung, ohne Preisvergleich ohne eigene dokumentierte Rechnung (§ 6 UWG; bei wenigen Anbietern ist auch die Kategorie „erkennbar“).
9. Alleinstellung („als einziger“, „kein anderer Planer“, „erstmals“): gesperrt, solange nur 32 Anbieter geprüft sind (§ 5 UWG; Alleinstellung braucht Marktübersicht und dauerhaften Vorsprung).
10. „Gratis“: nur für den 1-Tages-Plan und Lead-Magnete. Bei Lead-Magneten offenlegen, dass es gegen Mail-Anmeldung kommt. Bei der Testphase nie „gratis testen“ als Knopf; Preis danach und Laufzeit in gleicher Sichtbarkeit.
11. Kündigung: „Kündigen ohne Login“ ist gesetzliche Pflicht (§ 312k BGB). Als Vorteil herausgestellt (Headline, Anzeige) ist das Werbung mit Selbstverständlichkeiten (UWG Anhang Nr. 10). Nur als Information auf Preis-, FAQ- und Kassenseite. „Zwei Klicks“ ist falsch (Formular mit Name, E-Mail, Vertrag).
12. Jahresabo: „jederzeit kündbar“ ist falsch (Erstlaufzeit 12 Monate). Immer: „Laufzeit 12 Monate, danach monatlich kündbar“.

**Zählung:** Jede Zeile in Abschnitt 2 ist eine geprüfte Aussage. Zusammenfassung in Abschnitt 2.7.

---

## 2. Tabelle aller geprüften Aussagen

Kürzel Datei: **ZH** = Markenbuch Zimmerherd, **ZF** = Zweiflammer, **KS** = Kochsatz, **WS** = Wochenschmaus, **CFG** = `config.js`, **SEI** = `seiten.py`, **VOR** = `planer.vorlage.html`, **APP** = `app.js`, **ABL** = `engine/ablauf.js`, **LAN** = `landing.py`. „§“ = Abschnitt im Markenbuch.

### 2.1 Zimmerherd

| Nr | Datei | Aussage | Ampel | Neuformulierung / Begründung | Norm |
|---|---|---|---|---|---|
| Z01 | ZH §5, CFG | Claim „Satt werden mit dem, was dasteht.“ | 🟢 | „Satt werden“ beschreibt die Essenssituation, keine Sättigungswirkung eines Lebensmittels. Auflage: nie mit „macht satt“/„sättigend“ an einem Gericht kombinieren | Art. 13 Abs. 1 lit. c HCVO (nicht berührt) |
| Z02 | ZH §5 | Zweitzeile „… ankreuzen, Laden und Budget wählen, und du hast deinen Wochenplan samt Einkaufsliste.“ | 🟢 | beschreibt das Produkt mit Pass/Plus; neben „gratis“ immer „Tagesplan“ sagen | § 5 UWG |
| Z03 | ZH §5 | Kurzform „Kreuz an, was dasteht.“ | 🟢 | Funktionsbeschreibung | – |
| Z04 | CFG | Kurztext „Für Monteure, Bau, Außendienst und Fernfahrer in Unterkünften.“ | 🟢 | Zielgruppenansprache | – |
| Z05 | ZH §2 | Positionierung „… sortiert die Einkaufsliste nach dem Laden am Einsatzort …“ | 🟡 | „… sortiert die Einkaufsliste für die Kette, die du am Einsatzort hast …“ Eine Laden-Suche nach Ort gibt es nicht | § 5 Abs. 1 S. 2 Nr. 1 UWG |
| Z06 | ZH §2 | „er sagt dir, was mit deinem Zimmer in 10 Minuten satt macht“ | 🟡 | „er sagt dir, was mit deinem Zimmer in 10 Minuten auf dem Teller ist“ (Sättigung als Eigenschaft eines Gerichts) | Art. 13 Abs. 1 lit. c HCVO |
| Z07 | ZH §2 | Kernversprechen „Ein Plan, der zu deinem Zimmer passt, nicht zu einer Einbauküche.“ | 🟢 | wahr (Gerätefilter) | – |
| Z08 | ZH §2 | Beleg 1 „Gerätefilter über mehrere Geräte bietet kein Planer-Anbieter“ | 🟡 | intern ok. In Werbung keine Alleinstellung („als einziger“), nur „Filtert nach Wasserkocher, Mikrowelle, Kochplatte und Kühlbox.“ | § 5 UWG (Alleinstellung) |
| Z09 | ZH §2 | „Ohne Konto: Daten bleiben auf dem Handy, kein Login, Montage-Pass endet von selbst“ | 🟢 | wahr (localStorage, `app.js`); Lizenz-E-Mail in FAQ nennen | § 5 UWG, Art. 13 DSGVO |
| Z10 | ZH §1, §4 Angle 8, §8, §9 | „Lagerregeln nach BfR: Kühlschrank höchstens 2 Tage, Reis, Nudeln, Fisch, Hack und Ei höchstens 1 Tag, ungekühlt höchstens 2 Stunden …“ | 🟡 | „Lagerregeln nach BfR, bei uns strenger: gekocht höchstens 2 Tage im Kühlschrank bei höchstens 7 °C (BfR: 2–3 Tage), Reis 1 Tag (FSA), Nudeln, Fisch, Hack und Ei 1 Tag (eigene Vorsichtsregel), ungekühlt höchstens 2 Stunden (USDA), aufwärmen auf mind. 70 °C für 2 Minuten (BfR).“ | § 5 UWG (falsche Quellenzuschreibung); BfR-FAQ |
| Z11 | ZH §2 Abgrenzung | mise „Probeabo-Zwang, 9,99 €/Monat“, „Sortiment und Preise stimmen laut Rezensionen nicht“ | 🟡 | nur intern. Nie in Werbung, Presse, Foren (Herabsetzung, Einzelmeinungen) | § 6 Abs. 2 Nr. 2, 5 UWG; § 4 Nr. 1 UWG |
| Z12 | ZH §3 Persona A | „17,99 € für 90 Tage ist weniger als ein Raststättenessen“ | 🟡 | Hypothese intern. Werblich: „17,99 € einmalig für 3 Monate.“ Ohne Preisvergleich; „90 Tage“ ≠ „3 Monate“ in `config.js` | § 5 UWG, § 1 PAngV (Klarheit) |
| Z13 | ZH §4 Angle 1 Headline | „Kreuz an, was dasteht. Wir planen damit.“ | 🟢 | – | – |
| Z14 | ZH §4 Angle 1 Primärtext | „… plant nur Gerichte, die damit wirklich gehen. Einkaufsliste nach Laden sortiert. Den Tagesplan bekommst du gratis, ohne Konto.“ | 🟢 | Tagesplan ist dauerhaft gratis, keine Zahlungsdaten | UWG Anhang Nr. 21 |
| Z15 | ZH §4 Angle 2 Headline | „28 € Spesen. Was bleibt davon übrig?“ | 🟡 | „28 € Spesen. Was kostet dein Essen?“ „Was bleibt übrig“ unterstellt eine Ersparnis, die nicht gemessen ist | § 5 UWG; `07` 5.5 |
| Z16 | ZH §4 Angle 2 Primärtext | „An der Autobahn kostet ein Gericht knapp 20 €, der Kaffee 4,50 € … beim Discounter am Einsatzort …“ | 🟡 | „Laut VerkehrsRundschau (03/2026) zahlt man an der Autobahn für ein Gericht bis knapp 20 €, für den Kaffee 4,50 €. Zimmerherd schätzt, was deine Woche beim Discounter deiner Wahl kostet, mit Preisstand.“ Einzelbeispiel nicht verallgemeinern; keine Ortssuche. **Betrag in der Anzeige 🔴 bis Beleg** (Abschnitt 4) | § 5 UWG |
| Z17 | ZH §4 Angle 2 Pflichtzusatz | „… Ob und wie viel Pauschale du bekommst, regelt dein Arbeitgeber.“ | 🟡 | „Die 14 € / 28 € sind steuerliche Pauschalen (§ 9 Abs. 4a EStG). Ob dein Arbeitgeber sie zahlt, regeln Vertrag oder Tarif; sonst ggf. über die Steuererklärung. Keine Steuerberatung.“ | § 5 UWG; StBerG (keine Beratung) |
| Z18 | ZH §4 Angle 3 Headline | „Ein Kühlschrank, sechs Mann, dein Fach.“ | 🟢 | Fach-Funktion wird nicht versprochen | – |
| Z19 | ZH §4 Angle 3 Primärtext | „… fragt, ob du überhaupt einen Kühlschrank hast, und plant ohne ihn mit Gerichten aus dem Vorrat.“ | 🟢 | wahr (Tag „ohne_kuehlschrank“, in `12` geprüft) | – |
| Z20 | ZH §4 Angle 4 Headline | „Nur ein Wasserkocher? Reicht.“ | 🟢 | Auflage: Rezeptzahl im Primärtext mit Zähldatum | § 5 UWG |
| Z21 | ZH §4 Angle 4 Primärtext | „48 Rezepte … 21 fürs Mittag- oder Abendessen, von Bulgur-Chili bis Kartoffelpüree mit Würstchen.“ | 🟢 | Zahlen vor Schaltung neu zählen (Landingpage zählt live) | § 5 UWG |
| Z22 | ZH §4 Angle 5 Headline | „Zwölf Stunden Baustelle. Zehn Minuten Küche.“ | 🟢 | 61 Rezepte ≤ 10 Min. aktive Zeit belegt | – |
| Z23 | ZH §4 Angle 5 Primärtext | „61 Gerichte … höchstens 10 Minuten Arbeit … Kein Herd nötig, wenig Abwasch. Tagesplan gratis.“ | 🟡 | „wenig Abwasch“ streichen: nur 23 Rezepte tragen das Tag, für die 61 nicht geprüft | § 5 UWG |
| Z24 | ZH §4 Angle 6 Headline | „21:15, alles zu. Dein Essen ist da.“ | 🟢 | – | – |
| Z25 | ZH §4 Angle 6 Primärtext | „… Frühstück, Snacks und ein paar warme Gerichte aus dem Vorrat, der ohne Kühlschrank auskommt.“ | 🟢 | ehrlich (4 Hauptgerichte) | – |
| Z26 | ZH §4 Angle 7 Headline/Primärtext | „Was in den Montagekoffer gehört.“ / Packliste, Vermieter fragen | 🟢 | Sicherheitshinweis ist gut | – |
| Z27 | ZH §4 Angle 8 Headline | „Sonntag kochen, bis Dienstag essen.“ | 🟡 | Nur, wenn der Primärtext Kühlung auf dem Weg nennt. Sonntag gekocht, Dienstag gegessen = 2 Tage, nur bei ≤ 7 °C ohne Unterbrechung | BfR-FAQ (Kühltasche) |
| Z28 | ZH §4 Angle 8 Primärtext | „… hält im Kühlschrank höchstens 2 Tage, mit Reis oder Nudeln nur 1 Tag (BfR) …“ | 🟡 | „Was du sonntags vorkochst, planen wir für höchstens 2 Tage im Kühlschrank (BfR: 2–3 Tage), mit Reis oder Nudeln nur für 1 Tag. Auf der Fahrt in die Kühltasche. Zimmerherd plant die Sonntagskiste für Montag und Dienstag und ab Mittwoch frisch vor Ort.“ | § 5 UWG; BfR-FAQ, FSA |
| Z29 | ZH §4 Angle 9 Headline/Primärtext | „Für ihn auf Montage. Statt Fresspaket.“ / „… Der Tagesplan ist gratis, ohne Konto. Schick ihm den Link.“ | 🟢 | – | UWG Anhang Nr. 21 |
| Z30 | ZH §4 Angle 10 Headline | „24-V-Mikrowelle und Kühlbox reichen.“ | 🟡 | „24-V-Mikrowelle und Kühlbox: Das reicht für den Plan.“ plus Hinweis im Text: Kühlbox zählt nur als Kühlschrank, wenn sie unter 7 °C hält (Kompressor, Thermometer). Thermoelektrische Boxen kühlen nur 15–20 K unter Umgebung | BfR (≤ 7 °C) |
| Z31 | ZH §4 Angle 10 Primärtext | „… ohne Gaskocher. Einkaufsliste für den nächsten Discounter, Kosten geschätzt.“ | 🟡 | „… ohne Gaskocher. Einkaufsliste für den Discounter deiner Wahl, Kosten geschätzt. Die Kühlbox muss unter 7 °C halten.“ | § 5 UWG; BfR |
| Z32 | ZH §4 Angle 11 | Polnisch/Rumänisch | 🔴 | Wartestand bleibt (keine Übersetzung, keine Nachfrage belegt) | § 5 UWG |
| Z33 | ZH §5 Do 2 | „Hält im Kühlschrank höchstens 2 Tage (BfR).“ | 🟡 | „Hält im Kühlschrank (höchstens 7 °C) 2 Tage. Wir planen vorsichtiger als das BfR (2–3 Tage).“ | § 5 UWG |
| Z34 | ZH §5 Do 3 | „Dein Plan: geschätzt [X,XX] € pro Tag bei Aldi, Preisstand [MM/JJJJ].“ | 🟡 | Format frei, **konkreter Betrag 🔴 bis Beleg** (Korrektur `zutaten.py` nach `09` §5b, Kassenbon-Test) | § 5 UWG; `09` |
| Z35 | ZH §5 Do 4, 5, 6, 8 | „Zehn Minuten Arbeit, dann Feierabend.“, „Nur ein Wasserkocher? Reicht für 48 Rezepte.“, „Frag erst den Vermieter …“, „Deine Allergien bleiben auf deinem Handy.“ | 🟢 | wahr bzw. Sicherheitshinweis | – |
| Z36 | ZH §5 Do 7 | „Montage-Pass: 17,99 € für 90 Tage, endet von selbst.“ | 🟡 | „Montage-Pass: 17,99 € einmalig für 3 Monate, endet automatisch.“ (gleiche Laufzeitangabe wie `config.js` und Kasse) | § 1 Abs. 3 PAngV, § 5 UWG |
| Z37 | ZH §5 Tonregel 4 | „‚Satt‘, ‚warm‘, ‚deftig‘ statt ‚gesund‘ …“ | 🟡 | ergänzt: „satt“ nur als „satt werden“, nie „macht satt“/„sättigend“ für ein Gericht | Art. 13 HCVO |
| Z38 | ZH §7.1 | Presse-Info „Raststättenpreise gegen Discounter-Plan“ | 🔴 | 🔴 GESPERRT bis Kassenbon-Test und Preiskorrektur. Danach nur mit dokumentierter Rechnung, Quelle der Raststättenpreise, ohne Betreibernamen | § 5, § 6 UWG |
| Z39 | ZH §8 | Zimmer-Check-Ergebnis „Mit Wasserkocher und Mikrowelle gehen 64 Rezepte …“ | 🟢 | live gezählt | – |
| Z40 | ZH §8 | „Das PDF ‚Zimmer-Check · Montagekoffer‘ (kostenlos)“ | 🟡 | „gratis, wenn du dich für unsere Mails anmeldest“ (Gegenleistung Einwilligung offenlegen) | UWG Anhang Nr. 21; Art. 7 Abs. 4 DSGVO |
| Z41 | ZH §8 Punkt 4 | „Lagerkarte nach BfR: … ungekühlt höchstens 2 Stunden …“ | 🟡 | wie Z10: Quelle je Regel (BfR, FSA, USDA, eigene) | § 5 UWG |
| Z42 | ZH §8 Mail (c) | „‚Was kostet deine Woche?‘ mit echtem Beispielplan und Preisstand“ | 🔴 | 🔴 GESPERRT bis Beleg (Abschnitt 4). Bis dahin: „Was deine Woche ungefähr kostet, zeigt dir der Planer, als Schätzung“ ohne Betrag | § 5 UWG |
| Z43 | ZH §8 Mail (d) | „Montage-Pass: 17,99 € für 90 Tage, endet von selbst.“ | 🟡 | wie Z36 | § 1 PAngV |
| Z44 | ZH §9 Gratis | „Beim Jahresabo: ‚7 Tage 0 €, danach 44,99 € pro Jahr‘“ | 🟡 | „7 Tage 0 €, danach 44,99 € für 12 Monate (Laufzeit 12 Monate, danach monatlich kündbar)“ | § 312j Abs. 2 BGB; Art. 246a § 1 Nr. 5, 11 EGBGB |
| Z45 | ZH §9 Montage-Pass | „‚17,99 € für 3 Monate, endet automatisch‘ … Knopf ‚Verträge hier kündigen‘ und ‚Vertrag widerrufen‘ ohne Login“ | 🟢 | BGH I ZR 161/24; § 356a BGB laut `10` in Kraft | § 312k, § 356a BGB |
| Z46 | ZH §9 Datenschutz | „Deine Geräte, Allergien und Pläne bleiben auf deinem Handy.“ | 🟢 | wahr; auf Werbeseiten mit Pixel nur nach Einwilligung | Art. 9 DSGVO, § 25 TDDDG |
| Z47 | ZH Persona-Zitate 02/Nr. … | Forenzitate | 🟢 intern / 🔴 als Kundenstimme | nie als Zitat einer Person in Werbung (steht im Markenbuch) | UWG Anhang Nr. 23b/c |

### 2.2 Zweiflammer

| Nr | Datei | Aussage | Ampel | Neuformulierung / Begründung | Norm |
|---|---|---|---|---|---|
| F01 | ZF §5, CFG | Claim „Zwei Flammen. Eine Woche. Entspannt.“ | 🟢 | Werbesprache ohne Tatsachenkern | – |
| F02 | ZF §5 | Zweitzeile „Euer Wochenplan für Gasflammen, Omnia-Backofen und Kühlbox, mit Einkaufsliste nach Laden sortiert und Hinweisen, wie lange etwas hält.“ | 🟢 | „Omnia“ beschreibend (§ 23 Abs. 1 Nr. 3 MarkenG) | § 23 MarkenG |
| F03 | ZF §5 | Kurzform „Die Bordküche, fertig geplant.“ | 🟢 | – | – |
| F04 | CFG | Kurztext „Für Wohnmobil, Van, Wohnwagen und Dauercamping.“ | 🟢 | – | – |
| F05 | ZF §2 | Positionierung „… sagt ehrlich, wie lange etwas im Bordkühlschrank hält.“ | 🟡 | „… sagt, wie lange etwas im Bordkühlschrank hält, wenn er höchstens 7 °C schafft.“ Absorber-Kühlschränke halten bei Hitze und während der Fahrt oft keine 7 °C (04/Nr. 17) | BfR (≤ 7 °C); § 5 UWG |
| F06 | ZF §2 | Kernversprechen „Eine fertige Woche für eure Bordküche, statt jeden Abend neu zu überlegen.“ | 🟢 | – | – |
| F07 | ZF §2 | Beleg 3 „Ohne Konto, ohne Abo-Falle: Saisonpass … endet von selbst“ | 🟡 | „Ohne Konto. Der Saisonpass endet von selbst.“ „Ohne Abo-Falle“ unterstellt anderen Fallen und passt nicht zu Plus (Abo) | § 4 Nr. 1, § 5 UWG |
| F08 | ZF §1, §8 | „Lagerregeln nach BfR (Kühlschrank höchstens 2 Tage, Reis, Nudeln, Fisch, Hack und Ei 1 Tag, ungekühlt höchstens 2 Stunden)“ | 🟡 | wie Z10, plus „bei höchstens 7 °C“ | § 5 UWG |
| F09 | ZF §2 Abgrenzung, §3 Persona A | „mobile cooking“ 3,6 Sterne, Omnia-Bücher teurer; „Saisonpass kostet weniger als ein gedrucktes Omnia-Buch“ | 🟡 | nur intern. In Werbung kein Wettbewerbername, kein Preisvergleich mit Büchern | § 6 UWG |
| F10 | ZF §4 Angle 1 Headline | „Kühlschrank-Tetris? Der Plan sortiert.“ | 🟡 | „Kühlschrank-Tetris? Der Plan hält die Fristen.“ Eine Ansicht „Kühlschrank-Reihenfolge“ gibt es nicht (Backlog) | § 5 Abs. 1 S. 2 Nr. 1 UWG |
| F11 | ZF §4 Angle 1 Primärtext | „… dass Gekochtes nicht länger liegt als 2 Tage (BfR) und möglichst wenig angebrochene Kühlware übrig bleibt.“ | 🟡 | „… dass Gekochtes höchstens 2 Tage im Kühlschrank liegt (BfR nennt 2–3 Tage, bei höchstens 7 °C) und möglichst wenig angebrochene Kühlware übrig bleibt.“ | § 5 UWG; BfR |
| F12 | ZF §4 Angle 2 Headline | „Mit Landstrom 192 Rezepte. Ohne 136.“ | 🟢 | mit Zähldatum, vor Schaltung neu zählen | § 5 UWG |
| F13 | ZF §4 Angle 2 Primärtext | „Kreuzt an, was gerade geht … Zweiflammer plant nur, was damit klappt.“ | 🟢 | – | – |
| F14 | ZF §4 Angle 3 Headline/Primärtext | „Gratin vom Gasherd. Steht im Plan.“ / „… Kartoffelgratin oder Apfel-Crumble …“ | 🟢 | beide Rezepte vorhanden (C07, C27) | – |
| F15 | ZF §4 Angle 4 | „Eine Flamme, ein Topf: 78 Rezepte.“ / Primärtext | 🟢 | Zähldatum | – |
| F16 | ZF §4 Angle 5 Headline | „Weit zum Laden? Eine Liste reicht.“ | 🟡 | „Weit zum Laden? Eine Liste für die Woche.“ „Reicht“ widerspricht dem eigenen Hinweis, dass Frisches nach 1–2 Tagen nachgekauft werden muss | § 5 UWG |
| F17 | ZF §4 Angle 5 Primärtext | „… Einkaufsliste in der Reihenfolge des Ladens … Frisches planen wir für die ersten Tage.“ | 🟡 | „… Einkaufsliste nach Abteilungen, wie sie im Laden meist liegen, und zeigt, was ihr aus dem Vorrat schon habt. Frisches, das schnell verdirbt, kauft ihr unterwegs nach.“ Der Planer sortiert nach Ketten-Schema, nicht nach dem einzelnen Markt; „Frisches zuerst“ ist nicht gebaut | § 5 UWG |
| F18 | ZF §4 Angle 6 Headline | „Die Woche steht, bevor der Wagen rollt.“ | 🟢 | – | – |
| F19 | ZF §4 Angle 6 Primärtext | „… Den ersten Tag gibt es gratis, ohne Konto.“ | 🟡 | „Den Tagesplan gibt es gratis, ohne Konto. Die ganze Reisewoche mit dem Saisonpass (24,99 € für 6 Monate).“ „Den ersten Tag“ klingt nach Probetag einer Woche | § 5, § 5a UWG; Anhang Nr. 21 |
| F20 | ZF §4 Angle 7 | „Die Kissen sollen nach Urlaub riechen.“ / „Bratkartoffeln … riechen noch Tage später aus den Polstern.“ | 🟡 | Headline 🟢. Primärtext: „… können noch Tage später aus den Polstern riechen.“ (Anekdote, keine Regel) | § 5 UWG |
| F21 | ZF §4 Angle 8 Headline | „Ein Topf und ein Brett reichen.“ | 🟢 | – | – |
| F22 | ZF §4 Angle 8 Primärtext | „Weniger Geschirr heißt weniger Wasser aus dem Tank …“ | 🟡 | „Weniger Geschirr, weniger Abwasch, mehr Abend vor dem Wagen. Zweiflammer markiert Gerichte mit wenig Abwasch, von Bircher-Müsli bis Omnia-Gratin.“ Wasser-Ersparnis ist nicht gemessen (eigene Regel §9) | § 5 UWG |
| F23 | ZF §4 Angle 9 Headline | „Erste Tour der Saison? Vorrat zuerst.“ | 🟢 | – | – |
| F24 | ZF §4 Angle 9 Primärtext | „… Holt euch den Bordküchen-Check kostenlos per Mail.“ | 🟡 | „Holt euch den Bordküchen-Check gratis, wenn ihr euch für unsere Mails anmeldet.“ | UWG Anhang Nr. 21; § 7 UWG |
| F25 | ZF §4 Angle 10 | „Freitag hin, Sonntag heim, wenig übrig.“ / Primärtext | 🟢 | „möglichst wenig“, keine Garantie | – |
| F26 | ZF §4 Angle 11 Primärtext | „Bevor ihr losfahrt, wisst ihr, was die Campingwoche in der Küche ungefähr kostet … Beispiel: [… X,XX €]“ | 🔴 | 🔴 GESPERRT bis Beleg (Preiskorrektur + Kassenbon-Test; Lidl-Preise online nicht belegt). Headline „Selbst kochen: was kostet die Woche?“ 🟢 | § 5 UWG; `09` |
| F27 | ZF §4 Angle 12 | „Der Plan fährt mit ins Ausland“ | 🔴 | Wartestand bleibt | § 5 UWG |
| F28 | ZF §5 Do 2 | „Im Bordkühlschrank hält Gekochtes höchstens 2 Tage (BfR).“ | 🟡 | „Bei höchstens 7 °C planen wir Gekochtes für 2 Tage (BfR: 2–3 Tage). Ein Thermometer im Bordkühlschrank zeigt, ob er das schafft.“ | § 5 UWG; BfR |
| F29 | ZF §5 Do 3 | „Gerichte mit kurzer Flammenzeit sind markiert.“ | 🔴 | 🔴 GESPERRT bis Minuten am Rezept stehen. Tag „gas_sparen“ (10 Rezepte) nie als „Gas sparen“ anzeigen oder bewerben, umbenennen in „kurze Kochzeit“ | § 5 UWG |
| F30 | ZF §5 Do 5, 6, 7, 8 | Saisonpass-Satz, „Mehr Zeit unter der Markise.“, „Mit Landstrom 192 Rezepte, ohne 136.“, „Kocht draußen oder nehmt die Pfanne raus.“ | 🟢 | – | – |
| F31 | ZF §8 | „Das PDF ‚Bordküchen-Check · Erste Tour der Saison‘ (kostenlos)“ | 🟡 | wie Z40 | UWG Anhang Nr. 21 |
| F32 | ZF §8 Punkt 4 | „Kühlschrank-Karte für die Tür nach BfR …“ | 🟡 | wie Z10, plus „Thermometer: höchstens 7 °C“ | § 5 UWG |
| F33 | ZF §8 Punkt 5 | „Beispiel-Wochenplan … Kosten geschätzt mit Preisstand“ | 🟡 | Betrag 🔴 bis Beleg; bis dahin ohne Betrag oder „Preisniveau“ | § 5 UWG |
| F34 | ZF §8 Mail (c) | „‚Was kostet die Campingwoche?‘ mit echtem Beispielplan“ | 🔴 | 🔴 GESPERRT bis Beleg | § 5 UWG |
| F35 | ZF §9 Gratis | „Beim Jahresabo ‚7 Tage 0 €, danach 44,99 € pro Jahr‘“ | 🟡 | wie Z44 | § 312j BGB |
| F36 | ZF §9 Saisonpass | „Umrechnung (‚entspricht ca. 4,17 € im Monat‘) nur neben dem Gesamtpreis“ | 🟢 | – | § 3 PAngV |
| F37 | ZF §9 Umweltaussagen | „Seit dem 27.09.2026 gelten verschärfte Regeln …“ | 🟢 | inhaltlich richtig (Anwendung RL 2024/825 ab 27.09.2026). Fundstelle der deutschen Umsetzung prüfen | RL (EU) 2024/825 |

### 2.3 Kochsatz

| Nr | Datei | Aussage | Ampel | Neuformulierung / Begründung | Norm |
|---|---|---|---|---|---|
| K01 | KS §5, CFG | Claim „Deine Makros. Dein Discounter. Dein Plan.“ | 🟢 | keine Wirkungsaussage | – |
| K02 | KS §5 | Zweitzeile „Wochenplan, Einkaufsliste und Kochtag aus deinen Zahlen.“ | 🟢 | – | – |
| K03 | CFG | Kurztext „Für Training, Meal-Prep und feste Kalorien- und Proteinziele.“ | 🟢 | Ziele setzt der Nutzer | – |
| K04 | KS Lesehilfe, §1 | „… die Preisstichprobe `recherche/09` gibt es noch nicht“ | 🟡 | veraltet: „`09` (29.10.2026) belegt 37 von 56 Zutaten. Fleisch und Fisch sind 16–32 % zu niedrig geschätzt. Mit Kosten wird erst nach Korrektur und Kassenbon-Test geworben.“ | § 5 UWG |
| K05 | KS §1 | „Nährwerte aus einer einzigen geprüften Quelle, dem BLS 4.0“ | 🟢 | wahr, „Richtwerte“ dazu | – |
| K06 | KS §2 | Positionierung „… Einkaufsliste nach Gang …“, Beleg 2 „nach Gängen sortiert“ | 🟡 | „nach Abteilungen sortiert“ (Ketten-Schema, nicht Gänge des einzelnen Markts) | § 5 UWG |
| K07 | KS §2 Beleg 3, §9 Nr. 7, Vokabular | „Haltbarkeit nach BfR (Kühlschrank höchstens 2 Tage, Reis/Nudeln/Fisch/Hack/Ei 1 Tag)“, „hält gekühlt 1–2 Tage (BfR)“ | 🟡 | wie Z10: „nach BfR, bei uns strenger“ mit Quelle je Regel | § 5 UWG |
| K08 | KS §2 | Kernversprechen „Du gibst die Zahlen vor. Kochsatz gibt dir die Woche, den Einkaufszettel und den Kochtag.“ | 🟢 | `07` 5.6 Nr. 4 | – |
| K09 | KS §2 Abgrenzung | mise „Preise laut Nutzern falsch“, „Gleiche Idee, nachprüfbar gebaut“, „Eigene geprüfte Rezepte“; Kochboxen „reicht aber manchmal für eine“; Coach-PDFs „mit Streichpreis und Gewichtsversprechen“ | 🟡 | nur intern (§ 6 UWG, Herabsetzung). „Eigene geprüfte Rezepte“ → „eigene, fachlich durchgesehene Rezepte (noch nicht testgekocht, C8)“ | § 5, § 6 UWG |
| K10 | KS §4 A1 Headline | „Wie viel Protein gibt's für 1 Euro?“ | 🟢 | Nährstoffmenge, keine Wirkung | – |
| K11 | KS §4 A1 Primärtext | „… zeigt Gramm Protein pro Euro bei Aldi und Lidl. Mit geschätzten Preisen, Stand 10/2026 …“ | 🟡 | „… zeigt Gramm Protein pro Euro für Aldi und Lidl, mit geschätzten Preisen (Stand und Quelle je Zutat) …“ **Werte in Anzeigen 🔴 bis Preiskorrektur** | § 5 UWG; `09` |
| K12 | KS §4 A1 Beleg, §8 Tabelle | Protein pro €: Linsen ≈ 86 g, Magerquark ≈ 54 g, Skyr ≈ 34 g, Tofu ≈ 33 g, Eier ≈ 28 g, Hähnchen ≈ 26 g, Thunfisch ≈ 21 g, Lachs ≈ 12 g | 🔴 | 🔴 GESPERRT bis Preiskorrektur. Nach `09` (Aldi Süd, 29.10.2026): Hähnchen ca. 21 g (11,32 €/kg), Lachs ca. 10 g (19,96 €/kg), Magerquark ca. 50 g (1,19 €/500 g), Skyr ca. 41 g (1,29 €/500 g). Linsen, Tofu, Thunfisch: Preis unbelegt | § 5 UWG |
| K13 | KS §4 A1, §7 SEO | „günstige Proteinquellen Aldi/Lidl“ | 🟡 | „Proteinquelle“ nur für Lebensmittel mit ≥ 12 % Energie aus Protein; nie „die günstigste Proteinquelle“ | HCVO Anhang; § 5 UWG |
| K14 | KS §4 A2 Headline | „20 g gebraucht, 500 g gekauft?“ | 🟢 | – | – |
| K15 | KS §4 A2 Primärtext | „… angebrochenen Quark oder Spinat plant der Planer in weitere Rezepte der Woche ein.“ | 🟡 | „… für angebrochenen Quark oder Spinat sucht der Planer weitere Rezepte in der Woche.“ Der Planer gewichtet Reste, er garantiert keine Verwertung (`planer.js`) | § 5 UWG |
| K16 | KS §4 A3 Beleg | „BfR nennt 2–3 Tage, BZfE und FSA 2 Tage“ | 🟡 | „BfR nennt 2–3 Tage, die FSA 48 Stunden.“ BZfE nennt keine Tageszahl (`06` 4.1) | § 5 UWG |
| K17 | KS §4 A3 Headline | „Hält die Freitagsbox wirklich?“ | 🟢 | Frage | – |
| K18 | KS §4 A3 Primärtext | „… Auf jeder Box steht, bis wann sie gegessen sein sollte, nach den Lagerregeln des BfR. Was länger halten soll, kommt in den Tiefkühler.“ | 🟡 | „… nach den Empfehlungen des BfR, bei Reis, Nudeln, Fisch, Hack und Ei strenger. …“ | § 5 UWG |
| K19 | KS §4 A4 | „Gleiche Makros, andere Teller“ / „… aus 195 eigenen Rezepten … wiederholt keins öfter als nötig.“ | 🟢 | Abwechslungsregel im Code | – |
| K20 | KS §4 A5 Headline | „Erst planen, dann essen“ | 🟢 | – | – |
| K21 | KS §4 A5 Primärtext | „… Makros in Gramm, pro Tag und pro Mahlzeit. Nachtragen musst du nur, was du spontan anders machst.“ | 🟡 | letzten Satz streichen: Kochsatz hat keine Tracking-Funktion, „nachtragen“ deutet eine an | § 5 UWG |
| K22 | KS §4 A5 Einsatz | „Vergleichstabelle auf der Landingpage ohne Markennamen“ | 🟡 | nur sachliche Funktionsmerkmale „Tracker / Planer“, keine Preise, keine Wertung | § 6 Abs. 2 Nr. 2 UWG |
| K23 | KS §4 A6 | „Nährwerte aus einer Quelle“ / „… Bundeslebensmittelschlüssel 4.0 … Richtwerte, die Quelle steht dabei.“ | 🟢 | MRI nur als Quelle (CC BY 4.0), nie „empfohlen“ | Art. 12 lit. c HCVO analog |
| K24 | KS §4 A7 | „Kein Mixer? Dann ohne Mixer.“ / Primärtext | 🟢 | – | – |
| K25 | KS §4 A8 Headline | „3.000 kcal, Budget festgelegt“ | 🟢 | Zahl ist Eingabe des Nutzers | – |
| K26 | KS §4 A8 Primärtext | „… Reicht das Budget nicht, sagt der Plan dir das und zeigt die günstigste Variante.“ | 🟡 | „… sagt der Plan dir das und nennt, was der günstigste gefundene Plan ungefähr kostet.“ (Wortlaut der App-Meldung) | § 5 UWG |
| K27 | KS §4 A9 | „Deine Makros gehen nur dich an“ / Primärtext | 🟢 | wahr; nicht „DSGVO-konform“, nicht „100 % anonym“ | – |
| K28 | KS §4 A10 Headline | „Neue Phase? Neue Zahlen.“ | 🟡 | organisch frei. In Anzeigen „Andere Zahlen? Neue Woche.“ („Phase“ = Masse/Definition, Körperziel; Meta-Einstufung) | Art. 12 lit. b HCVO (Nähe), `07` 4.4 |
| K29 | KS §4 A10 Primärtext | „Du stellst dein Kalorien- und Proteinziel um, Kochsatz baut die Woche neu …“ | 🟢 | keine Körperaussage | – |
| K30 | KS §4 Reserve Vegan | Vegan mit viel Protein | 🔴 | Sperre bleibt (5 von 44 vegan „proteinreich“) | HCVO Anhang |
| K31 | KS §5 Do 1 | „160 g Protein, 2.600 kcal, Lidl. Hier ist deine Woche.“ | 🟢 | Eingabewerte | – |
| K32 | KS §5 Do 2 | „Box 3 · gekocht Sa 17:40 · essen bis So.“ | 🟢 | – | – |
| K33 | KS §5 Do 3 | „Magerquark: ca. 54 g Protein pro Euro (Schätzung, Stand 10/2026).“ | 🟡 | „Magerquark: ca. 50 g Protein pro Euro (Aldi Süd 1,19 €/500 g, Stand 29.10.2026).“ | § 5 UWG; `09` |
| K34 | KS §5 Do 5 | „Dein Budget reicht nicht ganz. Der günstigste Plan kostet etwa X €.“ | 🟢 | App-Meldung, Wert aus dem Plan | – |
| K35 | KS §5 Do 6 | „Proteinreich: mindestens 20 % der Energie aus Protein.“ | 🟢 | nur am Rezept/Plan, der es erfüllt | HCVO Anhang |
| K36 | KS §5 Do 7 | „Kündigen ohne Login, zwei Klicks.“ | 🟡 | „Kündigen über ‚Verträge hier kündigen‘, ohne Login.“ Nur Preis-/FAQ-Seite, nicht als Werbevorteil | UWG Anhang Nr. 10; § 5 UWG |
| K37 | KS §5 Do 8 | „Neue Phase? Zahlen ändern, Plan neu bauen.“ | 🟢 | organisch | – |
| K38 | KS §7 Studios | „Gratis-Vortrag ‚Kochtag in 90 Minuten‘“ | 🟡 | Zeitangabe nur nach Messung eines echten Kochtags; sonst „Kochtag planen“ | § 5 UWG |
| K39 | KS §8 | Lead-Magnet-Rechner „Laden (Aldi Nord, Aldi Süd, Lidl, Netto, Penny)“ | 🟡 | Netto, Penny, Aldi Nord unbelegt (`09`). Nur mit Hinweis „Schätzung, nur teilweise per Stichprobe geprüft“ | § 5 UWG |
| K40 | KS §8 Mail 3 | „Hinweis auf Plus (7 Tage 0 €, danach 44,99 €/Jahr oder 6,99 €/Monat …)“ | 🟡 | „7 Tage 0 €, danach 44,99 € für 12 Monate (danach monatlich kündbar) oder 6,99 € im Monat“ | § 312j Abs. 2 BGB |
| K41 | KS §9 Nr. 1–4, 6, 8, 9 | Makro-Rechner, Kalorienziel selbst festlegen, proteinreich ab 20 %, Proteinquelle ab 12 %, BLS-Richtwerte, vegetarisch/vegan/Fleisch, Allergen-Filter | 🟢 | `07` 5.6 Nr. 3, 4, 5, 12, 13, 15 | HCVO Anhang |
| K42 | KS §9 Nr. 5 | „Protein trägt zu einer Zunahme an Muskelmasse bei.“ nur Rezeptansicht | 🟡 | zusätzlich Pflichtangaben Art. 10 Abs. 2 HCVO direkt daneben: „Wichtig sind eine abwechslungsreiche, ausgewogene Ernährung und eine gesunde Lebensweise.“ plus Menge (Portion) und Verzehrmuster. Wortlaut vor Einbau mit dem EU-Register (deutsche Fassung) abgleichen. **Nie in Anzeigen** | VO (EU) 432/2012; Art. 10 Abs. 2 HCVO |
| K43 | KS §9 Nr. 10 | „Kündbar ohne Login, mit zwei Klicks.“ | 🟡 | wie K36 | UWG Anhang Nr. 10 |
| K44 | KS §9 Nr. 11 | „Beispielwoche: 1 Person, Lidl, 2.600 kcal, Preisstand MM/JJJJ: XX,XX € …“ | 🟡 | Format frei, Betrag 🔴 bis Beleg (Preiskorrektur + Kassenbon-Test) | § 5 UWG |
| K45 | KS §9 Nr. 12 | „7 Tage 0 €, danach 44,99 € pro Jahr. Jederzeit kündbar.“ | 🟡 | „7 Tage 0 €, danach 44,99 € für 12 Monate. In den 7 Tagen kostenlos kündbar, danach Laufzeit 12 Monate, anschließend monatlich kündbar.“ „Jederzeit kündbar“ ist beim Jahresabo falsch | § 5 UWG; § 312j BGB |
| K46 | KS §9 Verboten 1–14 | Liste der gesperrten Formulierungen | 🟢 | korrekt; ergänzt um „sättigend“ (Art. 13 HCVO) | – |

### 2.4 Wochenschmaus

| Nr | Datei | Aussage | Ampel | Neuformulierung / Begründung | Norm |
|---|---|---|---|---|---|
| W01 | WS §5, CFG | Claim „Die Woche ist geplant. Der Einkauf auch.“ | 🟢 | Produktbeschreibung mit Plus; auf der Gratis-Seite immer „Tagesplan gratis“ daneben | § 5 UWG |
| W02 | WS §5 | Zweitzeile „Gerichte, Einkaufszettel und Kosten für eure Woche, passend zu Laden und Budget.“ | 🟡 | „Gerichte, Einkaufszettel und geschätzte Kosten für eure Woche …“ | § 5 UWG |
| W03 | WS §5 | Alternativer Claim „Jede Woche gut versorgt.“ | 🟢 | keine Gesundheitsaussage, solange nicht „gut versorgt mit Nährstoffen“ | Art. 10 Abs. 3 HCVO (nicht berührt) |
| W04 | CFG | Kurztext „Für alle, die nicht jeden Tag neu überlegen wollen, was es gibt.“ | 🟢 | – | – |
| W05 | WS Lesehilfe | „die Preisstichprobe `recherche/09` fehlt noch“ | 🟡 | wie K04 | § 5 UWG |
| W06 | WS §2 | Positionierung „… und plant angebrochene Reste ins nächste Essen ein.“ | 🟡 | „… und sucht für angebrochene Packungen weitere Gerichte in der Woche.“ | § 5 UWG |
| W07 | WS §2 | Kernversprechen „Einmal planen, einmal einkaufen, und die Frage … ist für die Woche beantwortet.“ | 🟡 | „Einmal planen, gezielt einkaufen, und die Frage … ist für die Woche beantwortet.“ Ernährungsfachlich: Hack, Geflügel, Fisch halten roh nur bis zum Verbrauchsdatum (Hack meist Kauftag). Der Planer prüft das Kaufdatum roher Zutaten nicht. Bis zur Produktfunktion Hinweis „Hack und Fisch am Kauftag verarbeiten oder einfrieren“ | § 5 UWG; Art. 24 LMIV (Verbrauchsdatum) |
| W08 | WS §2 Beleg 1–3 | „Plan in Sekunden“, Liste nach Abteilungen in ganzen Packungen, Allergien als harter Filter im Gratis-Tagesplan | 🟢 | technisch belegt | – |
| W09 | WS §2 Abgrenzung | mise, Chefkoch, KptnCook, Kitchen Stories, HelloFresh, MealDeal, „eigene geprüfte Rezepte“ | 🟡 | nur intern. „eigene, fachlich durchgesehene Rezepte (noch nicht testgekocht)“ | § 6 UWG; C8 |
| W10 | WS §4 W1 Headline | „17:30. Was gibt's heute?“ | 🟢 | – | – |
| W11 | WS §4 W1 Primärtext | „Die Antwort steht schon fest, wenn du sonntags zwei Minuten planst … Den ersten Tag probierst du gratis, ohne Konto.“ | 🟡 | „Die Antwort steht schon fest, wenn du sonntags kurz planst. Wochenschmaus baut aus Laden, Budget und Personen eure Woche mit Einkaufszettel. Den Tagesplan gibt es gratis, ohne Konto, die ganze Woche mit Plus.“ „Zwei Minuten“ nicht gemessen; „ersten Tag“ klingt nach Probetag | § 5, § 5a UWG |
| W12 | WS §4 W1 Einsatz | Pin „Wochenplan in 2 Minuten“ | 🔴 | 🔴 GESPERRT bis Zeitmessung mit 5 Testpersonen (Median dokumentieren) | § 5 UWG |
| W13 | WS §4 W2 Headline | „Die halbe Avocado gibt's nicht“ | 🟢 | – | – |
| W14 | WS §4 W2 Primärtext | „… Den angebrochenen Becher Sahne vom Montag plant es am Mittwoch wieder ein. …“ | 🟡 | „… Für den angebrochenen Becher Sahne sucht es in den nächsten Tagen ein zweites Gericht. Auf dem Einkaufszettel steht, was übrig bleibt.“ Konkretes Beispiel nur, wenn ein echter Plan es zeigt | § 5 UWG |
| W15 | WS §4 W3 Headline | „Der Zettel kennt deinen Laden“ | 🟡 | „Der Zettel kennt deine Kette“ (Sortierung nach Ketten-Schema, nicht nach dem einzelnen Markt) | § 5 UWG |
| W16 | WS §4 W3 Primärtext | „… sortiert die Einkaufsliste nach den Abteilungen deines Ladens, vom Gemüse bis zur Kasse.“ | 🟡 | „… sortiert die Einkaufsliste nach Abteilungen, so wie sie bei deiner Kette meist liegen.“ Sperre „Sortiment je Laden prüfen“ bleibt | § 5 UWG |
| W17 | WS §4 W4 | „Du sagst den Betrag“ / „… steht da ehrlich, was der günstigste Plan ungefähr kostet.“ | 🟢 | App-Meldung belegt (`planer.js`) | – |
| W18 | WS §4 W5 | „Eine kocht, drei essen mit“ | 🔴 | Sperre bleibt bis Modus „Allein mit Kindern“ gebaut und Abdeckungstest bestanden | § 5 UWG |
| W19 | WS §4 W6 Headline | „‚Das esse ich nicht‘ kostet nichts“ | 🟢 | Filter ist gratis | – |
| W20 | WS §4 W6 Primärtext | „… Was du ausschließt, kommt im Plan nicht vor. … Bitte trotzdem immer die Zutatenliste … lesen.“ | 🟡 | „… Was du ausschließt, filtert der Planer nach unseren Zutatendaten heraus, schon im kostenlosen Tagesplan. Prüf bei Allergien trotzdem immer die Zutatenliste auf der Packung.“ | § 5 UWG; § 823 BGB, `07` 8.2 |
| W21 | WS §4 W7 | „Planen ohne Anmeldung“ / „… Im Planer gibt es keine Werbung.“ | 🟢 | geprüft (keine Werbeskripte) | – |
| W22 | WS §4 W8 Headline | „Kochbox-Plan, eigener Einkauf“ | 🟢 | Kategorie, keine Wertung | § 6 UWG (nicht berührt) |
| W23 | WS §4 W8 Primärtext | „… Eingekauft wird in deinem Laden, so viel ihr wirklich braucht.“ | 🟡 | „… Eingekauft wird in deinem Laden, in ganzen Packungen, und was übrig bleibt, steht auf dem Zettel.“ „So viel ihr wirklich braucht“ widerspricht der Packungslogik | § 5 UWG |
| W24 | WS §4 W8 Sperre | Preisvergleich mit Kochboxen | 🔴 | bleibt gesperrt | § 6 UWG |
| W25 | WS §4 W9 | „Eine Woche aus dem Airfryer“ / Primärtext | 🟢 | 49 Rezepte mit Airfryer-Weg | – |
| W26 | WS §4 W10 Beleg | „Fast jeder zweite Haushalt ist ein Single-Haushalt“ | 🟡 | „Gut vier von zehn Haushalten“ (41,6 %) | § 5 UWG |
| W27 | WS §4 W10 Primärtext | „… plant so, dass angebrochene Packungen in den nächsten Tagen aufgebraucht werden, und kocht an einem Abend gleich für den nächsten mit.“ | 🟡 | „… sucht für angebrochene Packungen weitere Gerichte und plant auf Wunsch an einem Abend gleich für den nächsten mit (Kochtage mit Plus).“ | § 5 UWG |
| W28 | WS §5 Do 2 | „Woche für 3 Personen bei Aldi: ca. XX € (Schätzung, Preisstand MM/JJJJ).“ | 🟡 | Format frei, Betrag 🔴 bis Beleg | § 5 UWG |
| W29 | WS §5 Do 4 | „Was ihr ausschließt, kommt nicht auf den Teller.“ | 🟡 | „Was ihr ausschließt, filtert der Planer heraus.“ (auf den Teller kommt, was gekauft wird; Rezepturen der Hersteller ändern sich) | § 5 UWG; `07` 8.2 |
| W30 | WS §5 Do 5 | „Den ersten Tag gibt's gratis, ohne Konto.“ | 🟡 | „Den Tagesplan gibt's gratis, ohne Konto.“ | § 5 UWG |
| W31 | WS §5 Do 7 | „Kinder essen mit: 22 Rezepte mit dem Kinder-Tag.“ | 🟡 | „Für Familien: 22 Rezepte, die wir als kindgeeignet markiert haben.“ Ob Kinder sie essen, ist nicht belegt | § 5 UWG |
| W32 | WS §5 Do 8 | „Kündigen ohne Login, zwei Klicks.“ | 🟡 | wie K36 | UWG Anhang Nr. 10 |
| W33 | WS §6 | Preisschild „Nur mit echten berechneten Werten, immer mit ‚ca.‘ und Preisstand“ | 🟡 | zusätzlich: Betrag 🔴 bis Beleg | § 5 UWG |
| W34 | WS §8 | Lead-Magnet „Reste-Retter-Wochenplan … jede angebrochene Packung in der Woche aufgebraucht“ | 🟡 | Name frei. Versprechen nur, wenn die drei PDF-Pläne das nachweislich erfüllen (vor Versand prüfen). Keine Aussage „rettet Lebensmittel“, „weniger Verschwendung“ ohne Messung | § 5 UWG; RL 2024/825 |
| W35 | WS §8 | „geschätzte Wochenkosten mit Preisstand“ im PDF | 🟡 | Betrag 🔴 bis Beleg (Sperre 1 steht schon da) | § 5 UWG |
| W36 | WS §8 | Lagerkarte „nach BfR (gekochte Reste höchstens 2 Tage, Reis und Nudeln höchstens 1 Tag)“ | 🟡 | wie Z10 | § 5 UWG |
| W37 | WS §8 Mail 3 | „Hinweis auf Plus mit Preis in gleicher Sichtbarkeit wie ‚0 €‘“ | 🟢 | plus Laufzeit Jahresabo (wie K40) | § 312j BGB |
| W38 | WS §9 Nr. 1 | „Einkaufsliste nach Laden sortiert, fertig in zwei Minuten.“ | 🟡 | „Einkaufsliste nach Laden sortiert.“ Zeitangabe 🔴 bis Messung (W12) | § 5 UWG |
| W39 | WS §9 Nr. 2–4, 7–9, 11 | „Weniger Grübeln …“, vegetarisch/vegan, Allergen-Filter, Budget selbst festlegen, ohne Konto, Tagesplan gratis, BLS-Richtwerte | 🟢 | `07` 5.6 | – |
| W40 | WS §9 Nr. 6 | „Rechnet mit ganzen Packungen und plant angebrochene Reste ein.“ | 🟡 | „Rechnet mit ganzen Packungen und berücksichtigt angebrochene Packungen bei der Rezeptwahl.“ | § 5 UWG |
| W41 | WS §9 Nr. 10 | „7 Tage 0 €, danach 44,99 € pro Jahr. Jederzeit kündbar.“ | 🟡 | wie K45 | § 5 UWG; § 312j BGB |
| W42 | WS §9 Nr. 12 | Kündbar ohne Login, mit zwei Klicks | 🟡 | wie K36 | UWG Anhang Nr. 10 |
| W43 | WS §9 Verboten 12 | „… soll ab dem 27.09.2026 gelten …“ | 🟡 | „gilt seit dem 27.09.2026“ (RL 2024/825); Fundstelle der UWG-Umsetzung prüfen | RL (EU) 2024/825 |
| W44 | WS §1 | UBA 74,5 kg Lebensmittelabfall je Kopf | 🟢 intern / 🟡 Werbung | als Kontext mit Quelle zulässig. Nie mit Wochenschmaus verknüpfen („wir senken …“) ohne Messung | RL 2024/825; § 5 UWG |

### 2.5 App-Texte (config.js, seiten.py, planer.vorlage.html, app.js, ablauf.js)

| Nr | Datei | Aussage | Ampel | Neuformulierung / Begründung (✔ = in der Datei umgesetzt) | Norm |
|---|---|---|---|---|---|
| A01 | CFG preise | „6,99 € im Monat · monatlich kündbar“, „44,99 € im Jahr · nach dem ersten Jahr monatlich kündbar“, „17,99 € einmalig für 3 Monate · Endet automatisch“, „24,99 € einmalig für 6 Monate“ | 🟢 | Endpreise, Laufzeit klar | § 3 PAngV; § 309 Nr. 9 BGB |
| A02 | SEI Preiskarte Jahr | „44,99 € im Jahr. Die ersten 7 Tage kosten 0 €. Erste Abbuchung am 8. Tag. Laufzeit 12 Monate, danach monatlich kündbar.“ | 🔴 (Lücke) | Preis **nach** dem ersten Jahr fehlt (Abrechnung monatlich oder jährlich mit anteiliger Erstattung?). Inhaber entscheidet, dann in Karte, AGB Nr. 3 und Kasse eintragen. Bis dahin Kasse nicht freischalten | § 312j Abs. 2 BGB i. V. m. Art. 246a § 1 Abs. 1 Nr. 5 EGBGB |
| A03 | SEI Preiskarte Monat | „6,99 € im Monat. Die ersten 7 Tage kosten 0 €. Jederzeit zum Monatsende kündbar.“ | 🟡 | ✔ „… Erste Abbuchung am 8. Tag. Kündbar zum Ende des laufenden Abrechnungsmonats.“ (Kalender-Monatsende ≠ Abrechnungsmonat; Datum der ersten Abbuchung fehlte) | § 5a UWG; § 312j Abs. 2 BGB |
| A04 | SEI Knöpfe | „Jetzt zahlungspflichtig abonnieren“, „Zahlungspflichtig kaufen“ | 🟢 | eindeutig; der rechtlich maßgebliche Bestellknopf liegt in der Paddle-Kasse: deutsche Beschriftung dort per Screenshot dokumentieren | § 312j Abs. 3 BGB; EuGH C-249/21 |
| A05 | SEI Preise | „Ohne Plus planst du einen Tag mit Einkaufsliste, so oft du willst. Mit Plus … bis zu 14 Tage …, Vorkoch-Ablauf, Boxen-Plan und PDF“ | 🟢 | entspricht C10 und Code | – |
| A06 | SEI Preise | „Alle Preise sind Endpreise … Zahlungsdienstleister, der als Verkäufer auftritt … Kündigen kannst du jederzeit über ‚Verträge hier kündigen‘ – ohne Login.“ | 🟢 | Information, keine Werbung | § 312k BGB |
| A07 | SEI kuendigen.html | Knopf/Überschrift „Verträge hier kündigen“, Felder Art, Grund, Name, E-Mail, Vertrag, Zeitpunkt, Knopf „Jetzt kündigen“ | 🟢 | alle Pflichtfelder § 312k Abs. 2 BGB, kein Login. Bestätigungs-Mail und Speichermöglichkeit (Abs. 3, 4) im Worker prüfen | § 312k BGB |
| A08 | SEI widerrufen.html | „Vertrag widerrufen“, Knopf „Widerruf bestätigen“ | 🟢 | entspricht § 356a BGB (`10`) | § 356a BGB |
| A09 | SEI widerruf.html | Muster-Belehrung, Wertersatz bei vorzeitigem Beginn | 🟡 | inhaltlich am Muster. **Widerspruch:** AGB nennt Paddle als Vertragspartner, die Belehrung nennt den Inhaber als Empfänger. Anwältin klärt, wer belehrt und erstattet (Abschnitt 7). Zustimmungs-Checkbox für sofortigen Beginn muss in der Kasse sein | Anlage 1 zu Art. 246a EGBGB; § 356 Abs. 4, § 357a BGB |
| A10 | SEI datenschutz.html | „… wird nur auf deinem Gerät gespeichert … nicht an uns oder Dritte übertragen. Wir können diese Angaben nicht sehen.“ | 🟢 | Code geprüft: keine Übertragung der Formularwerte, Lizenz wird lokal geprüft | Art. 13 DSGVO; § 25 Abs. 2 TDDDG |
| A11 | SEI agb.html Nr. 2 | „Preise sind Schätzwerte … Nährwerte … können abweichen … prüf bei Allergien immer das Etikett. Der Planer ist kein Medizinprodukt, keine Ernährungstherapie und keine Diät.“ | 🟢 | gute Erwartungssteuerung | MDR Art. 2; § 327e BGB |
| A12 | SEI agb.html Nr. 3 | „Plus Monat: … jederzeit zum Ende des laufenden Monats kündbar.“ | 🟡 | ✔ „… zum Ende des laufenden Abrechnungsmonats kündbar.“ | § 307 Abs. 1 S. 2 BGB (Transparenz) |
| A13 | SEI agb.html Nr. 3 Testphase | „Die ersten 7 Tage eines Abos kosten 0 €. Kündigst du in dieser Zeit, zahlst du nichts.“ | 🟢 | – | – |
| A14 | SEI agb.html Nr. 4, 6 | Preiserhöhung nur mit Zustimmung; Haftung | 🟢 | BGH XI ZR 26/20; § 309 Nr. 7 BGB | – |
| A15 | SEI impressum.html | „Lagerhinweise nach Verbrauchertipps des BfR.“ | 🟡 | ✔ „Lagerhinweise nach den Verbrauchertipps des BfR, teils strenger (u. a. FSA für Reis, USDA für die 2-Stunden-Regel).“ | § 5 UWG |
| A16 | VOR Fußzeile | „Preise sind Schätzungen. Lagerhinweise nach BfR.“ | 🟡 | ✔ „… Lagerhinweise nach BfR, teils strenger.“ | § 5 UWG |
| A17 | VOR meta description | „Wochenplan, Einkaufsliste mit Kosten und Vorkoch-Ablauf …“ | 🟡 | ✔ „… Einkaufsliste mit geschätzten Kosten …“ | § 5 UWG |
| A18 | VOR | „Kein Konto nötig. Was du hier eingibst, bleibt in diesem Browser und wird nicht an uns gesendet.“ | 🟢 | wahr | – |
| A19 | APP Geräte-Hinweis | „Kreuz an, was es dort gibt, wo du kochst. Wir planen nur Rezepte, die damit klappen.“ | 🟡 | ✔ ergänzt: „Eine Kühlbox zählt als Kühlschrank nur, wenn sie zuverlässig unter 7 °C kühlt.“ (Lagerfristen setzen ≤ 7 °C voraus; 24-V- und Camping-Kühlboxen schaffen das oft nicht) | BfR-Verbrauchertipps |
| A20 | APP Preis-Hinweis | „Preise sind Schätzwerte je Laden (Stand 10/2026), keine Tagespreise.“ / „Geschätzt“ / „Sortiert wie im …-Markt üblich.“ | 🟢 | – | § 5 UWG |
| A21 | APP Allergen-Hinweis | „Wir filtern nach den 14 Hauptallergenen. Spuren können wir nicht erkennen: Prüf bei Allergien immer das Etikett.“ | 🟡 | ✔ ergänzt: „Der Planer ersetzt keine ärztliche Beratung.“ (`07` 6.2, 8.2: aktiv im Onboarding anzeigen) | § 823 BGB; `07` 8.2 |
| A22 | APP Makro-Hinweis | „Je Person und Tag. Diese Angaben bleiben auf deinem Gerät. Der Planer ist kein Diät- oder Therapieprogramm.“ | 🟢 | – | MDR ErwG 19 |
| A23 | APP Richtwerte | „Eher wenig Bewegung (ca. 1.900 kcal)“, „Normal aktiv (ca. 2.200 kcal)“, „Körperlich harte Arbeit (ca. 2.800 kcal)“ | 🟢 | liegt in der Spanne der DGE-Referenzwerte für Erwachsene (Frauen und Männer gemischt, PAL 1,4–1,8). Empfehlung (nicht zwingend): Zusatz „grobe Richtwerte für Erwachsene“ | DGE-Referenzwerte Energie |
| A24 | APP Vorkoch-Hinweis | „Mit Kochtagen planen wir Boxen …, nach den Lagerregeln des BfR.“ | 🟡 | ✔ „… nach den Lagerempfehlungen des BfR, teils strenger.“ | § 5 UWG |
| A25 | APP Rezept Lagern | „Im Kühlschrank (höchstens 7 °C) bis zu 1 Tag / 2 Tage.“ | 🟡 | ✔ „Im Kühlschrank (höchstens 7 °C, besser 5 °C) …“ | BfR-Verbrauchertipps |
| A26 | APP Rezept Lagern | „Ungekühlt höchstens 2 Stunden.“ / „Hält auch ungekühlt bis zum nächsten Tag.“ | 🟢 | 2 h = USDA (vorsichtig); „bis zum nächsten Tag“ nur bei 8 Trocken-Snacks (geprüft, ohne Kühlpflicht-Zutaten) | USDA; `12` |
| A27 | APP Rezept Lagern | „Zum Aufwärmen durch und durch erhitzen (dampfend heiß, mindestens 70 °C für 2 Minuten).“ | 🟢 | BfR wörtlich | BfR |
| A28 | APP Rezept Lagern Thermo | „Für den Thermobehälter: Behälter mit kochendem Wasser vorwärmen, Essen kochend heiß einfüllen.“ | 🟡 | ✔ ergänzt: „Bis zum Essen muss es mindestens 60 °C heiß bleiben. Ist es nur noch lauwarm, nicht mehr essen.“ (BfR 016/2024; lauwarm = Vermehrungsbereich 10–60 °C) | BfR 016/2024 |
| A29 | APP Rezept Allergene | „Enthält: … / keines der 14 Hauptallergene laut unseren Zutatendaten. Prüf bei Allergien immer das Etikett deiner Produkte.“ | 🟢 | kein „allergenfrei“ | `07` 8.2 |
| A30 | APP Nährwerte | „Berechnet aus dem BLS 4.0 … Echte Produkte weichen ab.“ | 🟢 | Quelle und Lizenz genannt | CC BY 4.0 |
| A31 | APP Sperre | „Ohne Plus planst du einen Tag. Mit Plus bis zu 14 Tage, mit Vorkoch-Ablauf und PDF.“ / Knopf „Plus ansehen“ | 🟢 | Knopf führt zur Preisseite, ist kein Bestellknopf | § 312j BGB (nicht berührt) |
| A32 | APP Vorrat | „Öl, Salz und Gewürze. Wir rechnen nur den verbrauchten Anteil in die Kosten ein.“ | 🟢 | transparent | § 5 UWG |
| A33 | ABL Abkühlen | „… innerhalb von etwa 2 Stunden in den Kühlschrank stellen.“ | 🟡 | ✔ „… innerhalb von etwa 2 Stunden, Reis innerhalb von 1 Stunde, in den Kühlschrank stellen.“ (eigene Regel L5; B. cereus-Toxin wird beim Aufwärmen nicht zerstört, BfR 09.01.2026) | BfR; FSA |
| A34 | ABL Auftauen | „… oder in der Mikrowelle auftauen“ | 🟡 | ✔ „… oder in der Mikrowelle auftauen und gleich erhitzen“ | BfR-FAQ (Auftauen im Kühlschrank) |
| A35 | ABL | „Später durch und durch erhitzen (… mindestens 70 °C für 2 Minuten) und nur einmal aufwärmen.“ / „Jede Box mit Inhalt, Kochdatum und ‚essen bis‘ beschriften.“ | 🟢 | BfR, FSA | – |
| A36 | Produkt (kein Text) | Planer prüft das Verbrauchsdatum roher Zutaten nicht (Hack, Fisch, Geflügel am Tag 6 einer Woche mit einem Einkauf) | 🟡 | Backlog: frische Fleisch-/Fischgerichte an die ersten 1–2 Tage nach dem Einkauf binden oder TK-Ware vorschlagen; bis dahin Hinweis in der Einkaufsliste | Art. 24 LMIV; Lebensmittelsicherheit |

### 2.6 Landingpages (landing.py)

| Nr | Seite | Aussage | Ampel | Neuformulierung / Begründung (✔ = umgesetzt) | Norm |
|---|---|---|---|---|---|
| L01 | alle | Knopf „Tagesplan gratis erstellen“, „Ohne Konto. Deine Eingaben bleiben auf deinem Gerät.“ | 🟢 | Tagesplan wirklich gratis, ohne Zahlungsdaten | UWG Anhang Nr. 21 |
| L02 | alle, „So geht's“ | „Vorkochen – … Lagerhinweise nach BfR.“ | 🟡 | ✔ „Lagerhinweise nach BfR, teils strenger.“ | § 5 UWG |
| L03 | alle, Preise | „Plus: 6,99 € im Monat oder 44,99 € im Jahr, die ersten 7 Tage 0 €“ | 🟡 | ✔ ergänzt: „Jahr: Laufzeit 12 Monate, danach monatlich kündbar.“ | § 312j Abs. 2 BGB; § 5a UWG |
| L04 | alle, Preise | „Kündigen jederzeit über ‚Verträge hier kündigen‘, ohne Login.“ | 🟡 | ✔ „Kündigen über ‚Verträge hier kündigen‘, ohne Login, wirksam zum Ende der Laufzeit.“ („jederzeit“ ist beim Jahresabo missverständlich) | § 5 UWG |
| L05 | alle, Fußzeile | „Rezeptfotos: KI-generiert (Higgsfield), zeigen die Gerichte beispielhaft.“ | 🟢 | Transparenz gut | Art. 50 KI-VO (freiwillig) |
| L06 | montage, unter | „… schreibt den Einkaufszettel für den Discounter um die Ecke …“ | 🟡 | ✔ „… für den Laden deiner Wahl …“ (keine Ortssuche) | § 5 UWG |
| L07 | montage, Probleme | „Viele Gerichte brauchen zehn Minuten Arbeit oder weniger …“, „Raststätte zu, Imbiss teuer“ | 🟢 | – | – |
| L08 | montage, Punkte | „Lagerregeln nach BfR: was in den Kühlschrank muss und wie lange es hält“ | 🟡 | ✔ „Lagerregeln nach BfR, teils strenger: …“ | § 5 UWG |
| L09 | montage, Punkte | „Ohne Kühlschrank planen wir nur, was ungekühlt sicher ist“ | 🟡 | ✔ „Ohne Kühlschrank planen wir nur Zutaten, die ungekühlt lagern dürfen“ („sicher“ ist ein Sicherheitsversprechen) | § 5 UWG; § 823 BGB |
| L10 | montage, Punkte | „Einmal kochen, zwei Tage essen: Boxen mit Datum“ | 🟡 | ✔ „Einmal kochen, bis zu zwei Tage essen: Boxen mit Datum“ (Reis, Nudeln, Fisch, Hack, Ei 1 Tag) | § 5 UWG |
| L11 | montage, FAQ | Konto, Wasserkocher, Preisgenauigkeit, Kosten | 🟢 | Preis-FAQ nennt Stichprobe ehrlich | – |
| L12 | fitness, unter | „… schreibt die Einkaufsliste in der Reihenfolge des Markts.“ | 🟡 | ✔ „… schreibt die Einkaufsliste nach Abteilungen sortiert.“ | § 5 UWG |
| L13 | fitness, Problem 1 | „In unseren Testläufen (2.000–3.200 kcal) lag das Protein im Wochenschnitt bei 94–100 % des Ziels.“ | 🟡 | ✔ „Im automatischen Test (2.800 kcal, 180 g Protein) liegt das Protein im Wochenschnitt bei mindestens 90 % des Ziels.“ Nur das ist im Test (`tests/planer.test.mjs`) reproduzierbar belegt | § 5 UWG |
| L14 | fitness, Problem 2 | „… Boxen mit ‚essen bis‘-Datum nach den Lagerregeln des BfR.“ | 🟡 | ✔ „… nach den Lagerempfehlungen des BfR, teils strenger.“ | § 5 UWG |
| L15 | fitness, Check | „Berücksichtigt sind nur Lebensmittel, bei denen mindestens 20 % der Energie aus Protein stammen.“ / „Packungspreise sind Schätzwerte (Stand 10/2026, teils per Stichprobe geprüft).“ | 🟡 | ✔ Hinweis ergänzt: „Fleisch und Fisch kosten laut Stichprobe oft mehr als hier geschätzt.“ (Protein/€ bei Fleisch sonst zu hoch, `09`) | § 5 UWG |
| L16 | fitness, Punkte | „N Rezepte mit mindestens 30 g Protein je Portion“, „Kalorien und Budget in einem Plan“, „Deine Zahlen bleiben auf deinem Handy“ | 🟢 | Mengenangabe, keine Wirkung | HCVO (Nährwertinformation) |
| L17 | fitness, FAQ | „Nein. Kochsatz plant Essen nach den Zahlen, die du eingibst. Unter 1.200 kcal am Tag planen wir nicht.“ | 🟢 | Untergrenze im Formular gesetzt | – |
| L18 | camping, beschreibung | „… Einkaufsliste für die ganze Tour.“ | 🟡 | ✔ „… Einkaufsliste für bis zu 14 Tage.“ (Planer-Grenze; Frisches muss nachgekauft werden) | § 5 UWG |
| L19 | camping, Problem 1 | „Zweiflammer bevorzugt Zutaten, die ungekühlt lagern, und plant angebrochene Packungen mit ein.“ | 🟡 | ✔ „Zweiflammer plant ohne Kühlschrank nur ungekühlt lagerbare Zutaten und sucht für angebrochene Packungen weitere Gerichte.“ („bevorzugt“ ist im Code nicht so gebaut) | § 5 UWG |
| L20 | camping, Problem 2 | „Der Omnia macht Gratin und Kuchen auf dem Gasherd.“ | 🟡 | ✔ „Gratin und Crumble“ (kein Kuchen-Rezept im Bestand) | § 5 UWG |
| L21 | camping, Punkte/FAQ | „Funktioniert offline“, „Saison-Pass: 6 Monate, endet von selbst“, Omnia-Erklärung | 🟢 | Auflage: Offline-Betrieb vor Launch auf zwei Handys testen | § 5 UWG |
| L22 | camping, unter/beschreibung | „… eine kleine Kühlbox …“ | 🟡 | Zählung setzt Kühlschrank ≤ 7 °C voraus; Kühlbox-Hinweis steht jetzt im Planer (A19) | BfR |
| L23 | alltag, unter | „… schreibt die Einkaufsliste in der Reihenfolge deines Ladens …“ | 🟡 | ✔ „… nach Abteilungen sortiert …“ | § 5 UWG |
| L24 | alltag, Problem 1 | „… mit Resten, die am nächsten Tag weiterverwendet werden.“ | 🟡 | ✔ „… angebrochene Packungen plant der Planer, wo es geht, in die nächsten Tage ein.“ | § 5 UWG |
| L25 | alltag, Problem 2 | Überschrift „Ganze Packungen, ehrliche Kosten“ | 🟡 | ✔ „Ganze Packungen, geschätzte Kosten“ (Schätzwerte mit bekannter Abweichung sind nicht „ehrlich“ im Sinne von genau) | § 5 UWG |
| L26 | alltag, Problem 3 | „… Was nicht passt, kommt nicht in den Plan.“ | 🟡 | ✔ „Was du ausschließt, filtert der Planer nach unseren Zutatendaten heraus. Prüf bei Allergien immer das Etikett.“ | § 5 UWG; `07` 8.2 |
| L27 | alltag, Punkte | „195 Rezepte, alle mit Foto“, „Ohne Konto und ohne Werbung im Planer“ | 🟢 | 195 Fotos vorhanden (KI, gekennzeichnet) | – |
| L28 | Startseite | „Alle vier planen mit denselben 195 Rezepten und Lagerregeln.“ | 🟢 | – | – |

### 2.7 Rezeptzahlen (alle Marken)

| Nr | Datei | Aussage | Ampel | Neuformulierung / Begründung | Norm |
|---|---|---|---|---|---|
| N01 | ZH §1, §4, §5, §8 | „Nur Wasserkocher: 48“, „Wasserkocher + Mikrowelle: 64 (24 Abendessen)“, „+ Kochplatte: 147“, „61 Rezepte ≤ 10 Min.“ | 🟡 | Die Markenbuch-Zählung ließ die Lagerregel des Planers weg (ohne Gefrierfach keine TK-Zutaten). Mit derselben Regel wie Planer und Landingpage (Kühlschrank ja, Gefrierfach nein, 29.10.2026): **47** (21 Mittag/Abend), **59** (22 Abendessen), **119**, **56** Rezepte ≤ 10 Min. Arbeit. In den Markenbüchern ersetzt | § 5 UWG |
| N02 | ZF §1, §4, §5, §8 | „zwei Flammen + Omnia: 136 (92 Abendessen)“, „eine Flamme Topf + Pfanne: 121“, „ein Topf: 78“, „mit Landstrom: 192“ | 🟡 | Planer-Zählweise: **107** (67 Abendessen), **95**, **66**, **152**. Headline Angle 2 wird „Mit Landstrom 152 Rezepte. Ohne 107.“, Angle 4 „Eine Flamme, ein Topf: 66 Rezepte.“ | § 5 UWG |
| N03 | alle | Zahlen, die die Landingpage live zählt | 🟢 | Regel: Werbung übernimmt nur Zahlen aus `tools/landing.py`-Ausgabe oder Planer, mit Datum | § 5 UWG |
