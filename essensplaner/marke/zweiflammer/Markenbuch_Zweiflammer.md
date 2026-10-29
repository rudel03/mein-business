# Zweiflammer · Markenbuch

Stand: 29.10.2026 · Arbeitsgrundlage für Landingpage, App-Texte, Anzeigen und Kooperationen · ein Produkt vom Tellerkontor

> **Wie die Belege zu lesen sind:** „04/Nr. 12“ heißt Zitat 12 in Abschnitt 5.2 von `essensplaner/recherche/04_Nischen_Vergleich.md`. „Datenzählung“ heißt: von mir am 29.10.2026 aus `app/data/rezepte/*.json` gezählt (195 Rezepte, davon 30 eigene Camping-Rezepte in `C.json`), mit der Planer-Regel „ein Weg, für den alle Geräte da sind“. Alle Rezepte haben den Status „nicht testgekocht“ (ENTSCHEIDUNGEN C8). Korrekturen aus dem Faktencheck `10` sind eingearbeitet. **Hypothese** = nicht belegt, muss in Interviews oder Tests bestätigt werden.

---

## 1. Warum es diese Marke gibt

Camping ist in Deutschland ein Massenhobby mit kleiner Küche.

| Kennzahl | Wert | Quelle |
|---|---|---|
| Zugelassene Wohnmobile | 1.002.562, erstmals über 1 Mio. (04/2025) | KBA via promobil/dpa (`04`, 1.6; `01`, 2.1) |
| Bestand Reisemobile und Caravans 2025 | 1,045 Mio. Reisemobile, 0,786 Mio. Caravans | CIVD via news.at (`04`, 1.6) |
| Alter der Wohnmobil-Halter | 60–69 J.: 318.589 Fahrzeuge, 50–59 J.: 265.073, unter 40 J.: 96.201 (unter 10 %) | KBA 04/2025 via promobil (`04`, 1.6; `10` bestätigt) |
| Campingübernachtungen 2025 | 44,7 Mio., Rekord, davon 39,9 Mio. von Inländern | Destatis via promobil (`04`, 1.6; `10` bestätigt) |
| Saison | Juli und August bringen 18,7 der 44,7 Mio. Übernachtungen (ca. 42 %) | `04`, Abschn. 4; `11`, Einwand D |
| Haushalte mit Freizeitfahrzeug | ca. 1,6–1,8 Mio. | **Schätzung** (`04`, 1.6) |
| Gegenwind | Branchenumsatz 2025 14,1 Mrd. € (−6,5 %), Neuzulassungen 94.134 (−2,3 %), Caravan Salon 2026 mit 259.000 Besuchern unter Vorjahr (269.000) | CIVD-PM 19.01.2026 und Messe (`10`, Korrektur 3). **Der Bestand wächst, das Neugeschäft nicht.** |

**Was die Zielgruppe heute hat und was fehlt:**

1. **Die Bordküche hat harte Grenzen.** Zwei Flammen oder eine Kartusche, kein Backofen, kleiner Kühlschrank ohne richtiges Gefrierfach, Strom nur am Platz. „Es geht um Essen, was man im Vorzelt, vor dem Wagen oder im Wagen auf einem Gasherd/Kartuschenkocher o.ä. kochen kann.“ (04/Nr. 7). „Fleisch anbraten und Röstaromen kann man natürlich vergessen.“ (04/Nr. 10, über den Multikocher).
2. **Urlaub soll nicht nach Küchendienst aussehen.** „Allerdings würde ich gerne die Essenszubereitung fürs Campen etwas vereinfachen“ (04/Nr. 1, 17.06.2026). Der Forums-Thread „Schnelles Essen“ hat 427 Antworten (`04`, 5.1). Schmerzpunkt Rang 1, hohe Konfidenz (`04`, 5.3).
3. **Rezepte werden zusammengesucht, nicht geplant.** „Meine Frau hat mittlerweile so viel Rezepte aus den Netz gezogen“ (04/Nr. 6).
4. **Es gibt keinen Planer dafür.** Am Markt gibt es Kochbücher und E-Books (Omnia, One-Pot), die App „mobile cooking“ (3,6 Sterne aus 28 Bewertungen, letzte Version 10/2023) und PDF-Wochenpläne für 4 Personen. **Kein Planer verbindet Bordküche, Laden und Budget** (`04`, 1.6). Stellplatz-Apps haben keine Küche (ebd.).
5. **Gezahlt wird schon, mit Grenze.** Digitale Camping- und Omnia-Kochbücher kosten 9,99–17,99 € pro Buch (App „mobile cooking“), gedruckte Omnia-Bücher 19,50–30,29 € (`04`, 5.6). Gegenstimme: „Aber in der heutigen Zeit 17,99.- für a digitales Kochbuch zu verlangen ist zu viel.“ (04/Nr. 28, 12/2025).

**Was Zweiflammer damit macht (Produktstand 29.10.2026, Datenzählung):**
- Mit zwei Gasflammen, Topf, Pfanne und Omnia-Backofen (Standard-Profil in `config.js`) gehen **136 der 195 Rezepte**, davon 92 fürs Abendessen.
- Mit nur einer Flamme, Topf und Pfanne: **121**. Mit einem Topf auf einer Flamme: **78**.
- Mit Landstrom (Airfryer, Mikrowelle, Wasserkocher dazu): **192**.
- **8 Omnia-Rezepte** (z. B. Kartoffelgratin, Tortilla-Auflauf, Apfel-Crumble), **6 Rezepte mit Grill-Weg**, **23** mit dem Tag „wenig Abwasch“, **10** mit „Gas sparen“.
- Einkaufsliste nach Laden sortiert, mit einer Liste „Hast du wahrscheinlich schon“ für den Vorrat. Lagerregeln nach BfR (Kühlschrank höchstens 2 Tage, Reis, Nudeln, Fisch, Hack und Ei 1 Tag, ungekühlt höchstens 2 Stunden; ENTSCHEIDUNGEN C9).

**Ehrliche Grenzen (aus `11` Advocatus Diaboli):**
- Der Schmerz ist eher Organisation als Not (`04`, 1.6, Kriterium S). Darum verkaufen wir **Entlastung**, nicht Rettung.
- Zahlungsbereitschaft für Software ist nur dünn belegt. Der Sieger kippt, wenn Camper weniger zahlen als angenommen (`04`, Abschn. 3; `11`, Risiko 2).
- Saison: Test und Werbung von **Februar bis April**, wenn Reisen geplant werden (`11`, Einwand D; ENTSCHEIDUNGEN A3).
- Preise im Ausland kennt der Planer nicht. Er rechnet mit deutschem Preisniveau.

---

## 2. Positionierung

> Für Paare mit Wohnmobil, Kastenwagen oder Wohnwagen, die im Urlaub lieber unter der Markise sitzen als Rezepte aus dem Netz zusammenzusuchen, ist Zweiflammer der Wochenplaner für die Bordküche. Er plant mit dem, was an Bord ist: zwei Flammen oder eine Kartusche, Omnia-Backofen, kleiner Kühlschrank, Strom nur, wenn der Platz ihn hat. Die Einkaufsliste kommt nach Laden sortiert, und Zweiflammer sagt ehrlich, wie lange etwas im Bordkühlschrank hält.

**Kernversprechen:** *Eine fertige Woche für eure Bordküche, statt jeden Abend neu zu überlegen.*

Drei Belege tragen das Versprechen:
1. **Bordküche zuerst:** Flammen, Omnia, Kühlschrank, Landstrom werden abgefragt. Das kombiniert kein Planer mit Laden und Budget (`04`, 1.6).
2. **Fertiger Plan statt Rezeptsammlung:** Der Workaround heute ist das Zusammensuchen (04/Nr. 6, Thread mit 427 Antworten). Wettbewerbsoption 5 „Fertige Woche statt leerer Vorlage“ (`05`, Abschn. 7).
3. **Ohne Konto, ohne Abo-Falle:** Saisonpass 24,99 € für 6 Monate, endet von selbst (ENTSCHEIDUNGEN P1). Passt zu 2–3 Reisen im Jahr besser als ein Abo (`11`, Einwand D).

**Was Zweiflammer nicht ist:** kein Stellplatzführer, kein Kochbuch zum Blättern, keine Diät, kein Gaskocher-Ratgeber mit Sicherheitsversprechen.

### Abgrenzung

| | Honigmama / BeeQueen | DURCHSCHICHT | mise (Wettbewerber) | „mobile cooking“ und Omnia-Bücher | **Zweiflammer** |
|---|---|---|---|---|---|
| Wer | Schwangere, junge Eltern | Schichtarbeitende | breite Masse mit Kalorien- und Budgetziel | Camper, die Rezepte suchen | Camper-Paare 45–70, Reise- und Dauercamping |
| Ordnet nach | Lebensphase | Dienstplan | Kalorien, Supermarkt | Buchkapitel | **Bordküche, Reisetage, Laden** |
| Ort | Küche zu Hause | Pausenraum | Küche zu Hause | Wohnmobil | Wohnmobil, Van, Wohnwagen, Vorzelt, Dauerplatz |
| Produkt | E-Book, Festpreis | E-Book 19,90 € | App, Probeabo-Zwang | E-Book je 9,99–17,99 € bzw. Buch 19,50–30,29 € | PWA, Tagesplan gratis, Saisonpass 24,99 € / 6 Monate |
| Ton | warm, mütterlich | kollegial, Schicht-Humor | – | – | gelassen, kundig, Forum unter Gleichen |
| Stil | Creme, Honig, gemalt | Nachtblau, Signalorange | – | – | Kiefer, Seeblau, Markisengelb, Leinen, Markisenstreifen |

**Abgrenzung zur Schwester-Marke Zimmerherd:** Die Rezeptbasis überschneidet sich stark (wenige Geräte, kleine Kühlung, `04`, 1.6). Die Botschaft nie: Zimmerherd ist Arbeit, Müdigkeit und Spesen. Zweiflammer ist Freizeit, Genuss und Gelassenheit. Zweiflammer sagt nie „Spesen“, „Feierabend“ oder „satt werden“, Zimmerherd nie „Urlaub“ oder „Stellplatz“. Kunden überschneiden sich kaum (`04`, 1.6, Kriterium P).

---

## 3. Zielgruppe: drei Personas

Die **Kernelemente** (Fahrzeug, Ausstattung, Problem, Workaround, Wortlaut) sind belegt. **Namen, Alter, Lebensumstände und Zahlungsmotiv sind Ausgestaltung und als Hypothese markiert.** Vor dem Launch 6–8 Interviews nach dem Leitfaden in `04`, 5.7 (Rekrutierung über Foren nur mit Erlaubnis, Campingplätze, Dauercamper-Vereine).

**Verzerrung beachten:** Die Forenzitate kommen vor allem von erfahrenen, älteren Wohnwagen-Campern. Van-Neulinge und Mieter fehlen fast (`04`, 5.1). Persona C ist darum am schwächsten belegt.

### Persona A · „Das Reisepaar im Wohnmobil“

| | Belegt | Hypothese (Ausgestaltung) |
|---|---|---|
| Wer | Halter meist 50–69 J. (KBA 04/2025) | „Heike und Bernd“, 63 und 66, Bernd seit einem Jahr in Rente, 3–4 Reisen im Jahr, Skandinavien und Italien |
| Ausstattung | Zwei-Flammen-Gasherd, Absorber-Kühlschrank, Omnia als Ergänzung (`04`, 5.4, 5.5); „während der Fahrt hat mein Kühlschrank keinen Strom“ (04/Nr. 17) | Kompressor-Kühlbox für Getränke |
| Problem | Kochen soll schnell gehen und wenig Arbeit machen (04/Nr. 1, 8); Rezepte werden zusammengesucht (04/Nr. 6); Essen gehen als „die teurere Variante“ (04/Nr. 21) | will vor der Abfahrt wissen, was mitkommt, und nicht jeden Tag neu einkaufen |
| Workaround | einige Mahlzeiten von zu Hause mitnehmen (04/Nr. 20), Onepot-Gerichte (`04`, 5.5) | Zettel mit Lieblingsgerichten im Handschuhfach |
| Will | zügig, herzhaft, wenig Abwasch (04/Nr. 8, 27) | gemeinsam draußen essen |
| Zahlt, weil | zahlt für Camping-Kochbücher und Komfortgeräte (`04`, 5.6) | Saisonpass kostet weniger als ein gedrucktes Omnia-Buch und ist auf die eigene Küche zugeschnitten |

### Persona B · „Die Dauercamperin im Wohnwagen“

| | Belegt | Hypothese (Ausgestaltung) |
|---|---|---|
| Wer | eigenes Forums-Board „Dauercamping spezial“ (`04`, 1.13); „zügige Gerichte fürs Dauer- und Reisecamping“ (04/Nr. 8) | „Sabine“, 58, berufstätig, jedes Wochenende von April bis Oktober am Saisonplatz am See |
| Ausstattung | Gasherd im Wagen, oft Landstrom am Dauerplatz; Mikrowelle oder Heißluftfritteuse nur, wenn der Platz abgesichert ist (04/Nr. 13, 14, 16) | Kühlschrank im Wagen plus kleiner Kühlschrank im Vorzelt |
| Problem | weiter Weg zum Einkaufen: „wo wir wegen der Entfernung selten einkaufen.“ (04/Nr. 15); Reste: Thread „Reste essen von vorgestern“ (04/Nr. 16) | Freitag Anreise, Sonntag Abreise, am Ende soll der Kühlschrank leer sein |
| Workaround | „Man kann Alles kalt zusammenmengen und anschließend portionsweise in 1 Mikrowelle erhitzen.“ (04/Nr. 16) | kocht Freitag zu Hause vor |
| Will | herzhaft, schnell, Reste sinnvoll verwerten | Plan fürs Wochenende plus Einkaufszettel für Freitag |
| Zahlt, weil | – | Saisonpass deckt genau April bis September |

### Persona C · „Das Van-Paar mit wenig Platz“

| | Belegt | Hypothese (Ausgestaltung) |
|---|---|---|
| Wer | Kastenwagen und Van gehören zum Forums-Vokabular (`04`, 5.4); Van-Neulinge und Mieter sind in den Belegen unterrepräsentiert (`04`, 5.1); unter 40 J. unter 10 % der Halter | „Jana und Tim“, 46 und 49, beide berufstätig, Kurztrips am Wochenende und zwei Wochen im Sommer, oft Stellplatz ohne Strom |
| Ausstattung | ein- oder zweiflammiger Kartuschenkocher (04/Nr. 22), Kompressor-Kühlbox (04/Nr. 12), wenig Zuladung: die Heißluftfritteuse „bleibt zu Hause, da zu groß, zu schwer, zuviel Leistung“ (04/Nr. 14) | autark auf Stellplätzen |
| Problem | „abends dann meistens das, was keine Arbeit benötigt“ (04/Nr. 23); Abwasch (04/Nr. 27); Müll (04/Nr. 26); kein Bäcker in der Nähe (04/Nr. 25) | Wassertank schonen, wenig Müll |
| Workaround | Fertiggerichte, „auf Dauer zu teuer“ (04/Nr. 24) | Instant-Nudeln als Notreserve |
| Will | ein Topf, wenig Abwasch, kalt essbar | Plan, der mit einer Kartusche auskommt |
| Zahlt, weil | – | **Hypothese:** zahlt eher monatlich in der Saison als für 6 Monate. Preis testen |

**Nebengruppe (keine eigene Persona):** Familien mit Teenagern. „zumal unsere beiden Teenager (13 und 16) meist wenig Lust auf Gemüse schneiden haben.“ (04/Nr. 2). Niedrige Konfidenz (`04`, 5.3, Rang 10). Personenzahl im Planer reicht dafür.

**Nicht Zielgruppe (Anti-Persona):** „wir im Urlaub echt viel und gerne essen gehen“ (04/Nr. 11). Wer im Urlaub essen geht, braucht keinen Plan. Auch nicht: Zelt-Rucksackreisende mit Trekkingnahrung und Motorrad-Camper mit einer Flamme (Nachbarsegment, nur am Rand über das Ein-Flammen-Profil).

### Sprache und Vokabular der Zielgruppe

Aus `04`, 5.4, wörtlich belegt:

| Feld | So reden sie | So schreiben wir |
|---|---|---|
| Fahrzeug | Womo, WoWa, Kasten(wagen), Van | im Fließtext „Wohnmobil“, „Wohnwagen“, „Van“. Abkürzungen nur in Foren und Social |
| Ort | CP (Campingplatz), Stellplatz, Vorzelt, Dauercamping, Reisecamping | genau so |
| Küche | Bordküche, Gasherd, Kartuschenkocher, einflammig, Omnia, Dutch Oven | „Bordküche“, „zwei Flammen“, „Kartusche“, „Omnia-Backofen“ (nur beschreibend, Marke von Dritten) |
| Strom | Landstrom, „wie der Platz abgesichert ist“, Watt, 12 V, autark | „Landstrom ja oder nein“ |
| Kühlung | Kompressor-Kühlbox, Absorber, „kühlt nicht“ | „Bordkühlschrank“, „Kühlbox“ |
| Essen | Onepot, zügige Gerichte, schnelles Essen, „was keine Arbeit benötigt“, „vereinfachen“, Reste-Essen, Vorrat von zu Hause | „Onepot“, „zügig“, „Vorrat“. **Nicht** „Meal-Prep“, „Makros“, „Superfood“ (`04`, 5.4) |
| Ton | Forum unter Gleichen, Humor über Kühlschrank-Tetris und Kartuschen | Anrede „ihr“ fürs Paar, in der App „du“. Siehe Abschnitt 5 |

**Glossar der Marke:** *Bordküchen-Check* (Geräte ankreuzen), *Reisewoche* (der Plan für 3–14 Tage), *Vorratskiste* (was von zu Hause mitkommt), *Kühlschrank-Reihenfolge* (was zuerst dran ist).

> **Produktstand beachten:** Ein Schalter „Landstrom ja/nein“ und eine Watt-Angabe je Rezept sind **nicht gebaut**. Heute heißt das: Airfryer, Mikrowelle und Wasserkocher nur ankreuzen, wenn Strom da ist. Eine getrennte Liste „Vorrat von zu Hause“ gegen „frisch vor Ort“ gibt es nicht, nur „Hast du wahrscheinlich schon“. Preise und Läden im Ausland gibt es nicht. Texte versprechen nur, was es gibt.

---

## 4. Nischen-Angles (10 aktiv, 1 im Wartestand)

**Regeln für alle Angles:** Forenzitate sind *Belege für uns*, keine Kundenstimmen. Nie mit Nutzername, nie als Zitat einer Person in der Anzeige (`04`, 5.1; UWG Anhang Nr. 23b/c). Vor jeder Verwendung den Link gegenprüfen. Headlines auf Meta-Länge (ca. 40 Zeichen), Kern des Primärtexts in den ersten 125 Zeichen. Keine Ausrufezeichen, keine Gedankenstriche in Anzeigen. Ausspielung vor allem **Februar bis April** (Reiseplanung) und vor Pfingsten und Sommerferien.

**Warum die Angles frei sind (gilt für alle):** Es gibt keinen Planer für die Bordküche (`04`, 1.6). Die Konkurrenz sind Bücher und eine App ohne Update seit 2023. Die Spalte „Warum noch frei“ nennt, was *zusätzlich* niemand anspricht.

### Übersicht

| # | Angle | Echtes Problem | Beleg | Einsatz |
|---|---|---|---|---|
| 1 | Kühlschrank-Tetris | kleiner Bordkühlschrank, Fahrt ohne Strom | 04/Nr. 12, 17; 5 Kühlschrank-Threads 08–10/2026 (`04`, 5.3 Rang 7) | Anzeige, App-Funktion zeigen |
| 2 | Wie ist der Platz abgesichert? | Strom nur manchmal | 04/Nr. 9, 13, 14; Datenzählung 136 / 192 | Anzeige, Landingpage-Schalter |
| 3 | Gratin vom Gasherd | kein Backofen an Bord | Omnia-Kultur (`04`, 5.3 Rang 2, 5.5); Datenzählung 8 Rezepte | Anzeige, Pinterest/SEO |
| 4 | Eine Flamme, ein Topf | Kartuschenkocher, Van, wenig Platz | 04/Nr. 22, 23; Datenzählung 78 | Anzeige an Van-Paare |
| 5 | Weit zum Laden | seltener Einkauf, kein Bäcker | 04/Nr. 4, 15, 25 (`04`, 5.3 Rang 3) | Anzeige, Landingpage |
| 6 | Die Woche steht vor der Abfahrt | Rezepte aus dem Netz zusammensuchen | 04/Nr. 6; Thread „Schnelles Essen“ mit 427 Antworten (`04`, 5.1) | Hero der Landingpage |
| 7 | Die Kissen riechen nach Urlaub | Bratgeruch im Wagen | 04/Nr. 19; Camperstyle-Podcast („Kissen noch 3 Tage nach dem Braten“) | Anzeige, Social |
| 8 | Ein Topf und ein Brett reichen | Abwasch, Wassertank, Müll | 04/Nr. 26, 27; Datenzählung 23 „wenig Abwasch“ | Anzeige, Filter zeigen |
| 9 | Erste Tour der Saison | Vorrat und Plan vor dem Saisonstart | 04/Nr. 20; Saisonalität (`04`, Abschn. 4); `11`, Einwand D | Lead-Magnet, Messe |
| 10 | Freitag hin, Sonntag heim | Dauercamping-Wochenende, Reste | 04/Nr. 8, 15, 16; Board „Dauercamping spezial“ (`04`, 1.13) | Anzeige Do/Fr, Platz-Aushang |
| 11 | Selbst kochen: was kostet die Woche? | Essen gehen und Fertiggerichte teuer | 04/Nr. 18, 21, 24 (`04`, 5.3 Rang 4) | Landingpage-Block, Mail |
| (12) | Der Plan fährt mit ins Ausland | Lidl und Aldi gibt es auch in vielen Reiseländern | `04`, Abschn. 4 (Risiken) | **Wartestand**: Planer kennt nur deutsche Preise |

### Angle 1 · Kühlschrank-Tetris

- **Echtes Problem:** Der Bordkühlschrank ist klein, ein Gefrierfach fehlt oft, und während der Fahrt kühlt er manchmal gar nicht.
- **Beleg:** „während der Fahrt hat mein Kühlschrank keinen Strom“ (04/Nr. 17, 19.08.2026). Zusätzliche Kompressor-Kühlbox „für das Fahrzeug während der Fahrt und für das Vorzelt“ (04/Nr. 12). Im Forum 5 Kühlschrank-Threads zwischen August und Oktober 2026 (`04`, 5.3).
- **Warum noch frei:** Kochbücher sagen, was man kocht, nicht wann. Die Reihenfolge nach Haltbarkeit plant niemand (`05`, Abschn. 5, Punkt 6: Lagerregeln mit Quelle bei keinem Anbieter).
- **Einsatz:** Anzeige mit Blick in einen aufgeräumten Bordkühlschrank, Landingpage-Block „Was zuerst dran ist“.
- **Was das Produkt heute kann:** Der Planer legt Gerichte so, dass nichts länger liegt, als die Lagerregel erlaubt (Haltbarkeits-Prüfung in `js/engine/planer.js`), und rechnet Reste angebrochener Kühlware als Verschwendung ein, damit möglichst wenig übrig bleibt. Garantiert ist das nicht. Eine eigene Ansicht „Kühlschrank-Reihenfolge“ ist ein Vorschlag (Backlog).
- **Headline:** Kühlschrank-Tetris? Der Plan sortiert.
- **Primärtext:** Kleiner Kühlschrank, kein Gefrierfach, und unterwegs kühlt er nicht immer. Zweiflammer plant eure Woche so, dass Gekochtes nicht länger liegt als 2 Tage (BfR) und möglichst wenig angebrochene Kühlware übrig bleibt.

### Angle 2 · Wie ist der Platz abgesichert?

- **Echtes Problem:** Ob Heißluftfritteuse oder Mikrowelle gehen, entscheidet der Platz, nicht der Camper.
- **Beleg:** „da ich nicht wusste wie der Platz abgesichert ist“ (04/Nr. 13). „Sicherlich ändert sich die Gerätezusammenstellung auch nach dem Stromverbrauch“ (04/Nr. 9). Die Heißluftfritteuse „bleibt zu Hause, da zu groß, zu schwer, zuviel Leistung“ (04/Nr. 14). Datenzählung: **136 Rezepte** ohne Strom (2 Flammen, Omnia), **192** mit Landstrom-Geräten.
- **Warum noch frei:** Rezepte für die Heißluftfritteuse und Rezepte für den Gaskocher stehen in getrennten Büchern. Niemand plant eine Reise, auf der beides wechselt.
- **Einsatz:** Anzeige, auf der Landingpage zwei Knöpfe „mit Landstrom / ohne Landstrom“, die die Rezeptzahl zeigen.
- **Headline:** Mit Landstrom 192 Rezepte. Ohne 136.
- **Primärtext:** Am Stellplatz gibt es keinen Strom, auf dem Campingplatz schon? Kreuzt an, was gerade geht: zwei Flammen, Omnia-Backofen, Heißluftfritteuse oder Mikrowelle. Zweiflammer plant nur, was damit klappt.
- **Hinweis:** Zahlen vor jeder Anzeige neu zählen, sie ändern sich mit jedem neuen Rezept.

### Angle 3 · Gratin vom Gasherd

- **Echtes Problem:** An Bord gibt es meist keinen Backofen. Der Omnia-Backofen auf der Flamme ist die Lösung, aber die Rezepte stehen in eigenen Büchern.
- **Beleg:** Omnia gehört zum Kern der Bordküche (`04`, 5.3 Rang 2, 5.4, 5.5). Omnia-Kochbücher kosten 19,50–30,29 € gedruckt, E-Books 9,99–17,99 € (`04`, 5.6). Datenzählung: **8 Omnia-Rezepte** (Kartoffelgratin mit Schinken, Tortilla-Auflauf, Gnocchi in Tomatensoße, Hähnchen mit Kartoffeln, Ofenhafer, Aufbackbrötchen, Apfel-Crumble, Kaiserschmarrn).
- **Warum noch frei:** Omnia-Bücher sind Sammlungen. Keins baut die Omnia-Gerichte in eine Woche mit Einkaufsliste ein.
- **Einsatz:** Anzeige, SEO-Seite „Omnia-Rezepte für die Woche“, Pinterest (Hypothese: Omnia-Rezepte werden dort gesucht, prüfen).
- **Markenregel:** „Omnia“ ist eine fremde Marke. Nur beschreibend („für den Omnia-Backofen“), nie im Logo, nie als „Zweiflammer Omnia-Plan“, kein Omnia-Schriftzug im Bild (`marke/Namen_und_Pruefung.md`, Abschn. 6).
- **Ehrlichkeit:** 8 Rezepte sind wenig. Nicht „die Omnia-App“ nennen. Mehr Omnia-Rezepte sind Backlog.
- **Headline:** Gratin vom Gasherd. Steht im Plan.
- **Primärtext:** Kein Backofen an Bord, aber ein Omnia-Backofen im Schrank? Zweiflammer baut Gerichte wie Kartoffelgratin oder Apfel-Crumble in eure Woche ein, mit Einkaufsliste für alles andere.

### Angle 4 · Eine Flamme, ein Topf

- **Echtes Problem:** Im Van oder beim Kurztrip gibt es oft nur einen Kartuschenkocher.
- **Beleg:** „Da habe ich normalerweise nur einen Gaskocher (einflammig) mit Kartusche dabei.“ (04/Nr. 22). „abends dann meistens das, was keine Arbeit benötigt“ (04/Nr. 23). Datenzählung: **78 Rezepte** mit einem Topf auf einer Flamme, **121** mit Topf und Pfanne auf einer Flamme.
- **Warum noch frei:** Camping-Rezepte gehen meist von zwei Flammen aus. Ein Plan für eine Flamme fehlt.
- **Einsatz:** Anzeige an Van- und Kastenwagen-Interessen, Ein-Flammen-Profil auf der Landingpage.
- **Headline:** Eine Flamme, ein Topf: 78 Rezepte.
- **Primärtext:** Nur ein Kartuschenkocher im Van? Stellt bei Zweiflammer eine Flamme und einen Topf ein, und der Plan nimmt nur Gerichte, die damit gehen. Einkaufsliste nach Laden sortiert, Tagesplan gratis.

### Angle 5 · Weit zum Laden

- **Echtes Problem:** Am Platz ist der nächste Supermarkt weit weg, einen Bäcker gibt es nicht.
- **Beleg:** „wo wir wegen der Entfernung selten einkaufen.“ (04/Nr. 15). „besonders wenn es mal keinen Bäcker in der Nähe hat.“ (04/Nr. 25). „aber ab und an gibt's keine frischen Produkte“ (04/Nr. 4). Schmerzpunkt Rang 3, hohe Konfidenz (`04`, 5.3).
- **Warum noch frei:** Kochbücher kennen keinen Einkaufsrhythmus. Stellplatz-Apps zeigen den Laden, aber nicht, was man dort braucht.
- **Einsatz:** Anzeige, Landingpage-Block „Ein Einkauf, eine Liste“.
- **Was das Produkt heute kann:** Einkaufsliste für den ganzen Plan nach Laden sortiert, Vorrat als „Hast du wahrscheinlich schon“. Frisches mit kurzer Haltbarkeit muss trotzdem nach 1–2 Tagen nachgekauft werden. Das sagen wir.
- **Headline:** Weit zum Laden? Eine Liste reicht.
- **Primärtext:** Der Supermarkt ist weit, der Bäcker gar nicht da. Zweiflammer macht aus eurem Wochenplan eine Einkaufsliste in der Reihenfolge des Ladens und zeigt, was ihr aus dem Vorrat schon habt. Frisches planen wir für die ersten Tage.

### Angle 6 · Die Woche steht vor der Abfahrt

- **Echtes Problem:** Vor der Reise werden Rezepte gesammelt, am Platz wird dann doch improvisiert.
- **Beleg:** „Meine Frau hat mittlerweile so viel Rezepte aus den Netz gezogen“ (04/Nr. 6). Thread „Schnelles Essen“ mit 427 Antworten, „Fertiggerichte“ mit 91 (`04`, 5.1). Schmerzpunkt Rang 5, Workaround Nr. 6 (`04`, 5.5).
- **Warum noch frei:** Alle Anbieter verkaufen Rezepte. Eine fertige Reisewoche mit Liste verkauft niemand für die Bordküche (`05`, Option 5).
- **Einsatz:** Hero der Landingpage, Anzeige in der Planungszeit (Februar bis April).
- **Headline:** Die Woche steht, bevor der Wagen rollt.
- **Primärtext:** Statt Rezepte aus dem Netz zu sammeln: Kreuzt an, was an Bord ist, wie viele ihr seid und wo ihr einkauft. Zweiflammer plant die Reisewoche mit Einkaufsliste und Lagerregeln. Den ersten Tag gibt es gratis, ohne Konto.

### Angle 7 · Die Kissen riechen nach Urlaub

- **Echtes Problem:** Braten im Wohnwagen riecht tagelang.
- **Beleg:** „Wir wollen nur sehr bedingt (tagelange Geruchsbelästigung) den Herd im Wohnwagen nutzen.“ (04/Nr. 19, 2012, alt). Camperstyle-Podcast: Kissen rochen „noch 3 Tage nach dem Braten nach Kartoffeln“ (camperstyle, 12.12.2020, redaktionell). Schmerzpunkt Rang 9 (`04`, 5.3).
- **Warum noch frei:** Rezeptfilter fragen nach Diät, nie nach Geruch.
- **Einsatz:** Social-Post mit Humor, Anzeige.
- **Was das Produkt heute kann:** Wer drinnen nicht braten will, nimmt die Pfanne aus den Geräten. Dann plant Zweiflammer ohne Pfannengerichte. Ein eigener Filter „draußen kochen“ ist nicht gebaut.
- **Headline:** Die Kissen sollen nach Urlaub riechen.
- **Primärtext:** Bratkartoffeln im Wohnwagen riechen noch Tage später aus den Polstern. Nehmt bei Zweiflammer die Pfanne raus, und der Plan kommt mit Topf und Omnia-Backofen aus. Oder ihr kocht draußen auf dem Kocher.

### Angle 8 · Ein Topf und ein Brett reichen

- **Echtes Problem:** Abwasch kostet Wasser aus dem Tank und Zeit, Fertiggerichte machen Müll.
- **Beleg:** „das Reinigen ist mir zu aufwendig.“ (04/Nr. 27). „leider Müll-intensiv“ (04/Nr. 26, über Fertiggerichte). Onepot als Standard (`04`, 5.5). Datenzählung: **23 Rezepte** mit Tag „wenig Abwasch“.
- **Warum noch frei:** Onepot-Bücher gibt es, aber keinen Plan, der Abwasch als Kriterium führt.
- **Einsatz:** Anzeige, Filter „wenig Abwasch“ auf der Landingpage zeigen.
- **Recht:** Kein „spart Wasser“ oder „umweltfreundlich“ ohne Messung (Abschnitt 9, Umweltaussagen).
- **Headline:** Ein Topf und ein Brett reichen.
- **Primärtext:** Weniger Geschirr heißt weniger Wasser aus dem Tank und mehr Abend vor dem Wagen. Zweiflammer markiert Gerichte mit wenig Abwasch, von Bircher-Müsli bis Omnia-Gratin.
- **Produktstand:** Der Planer gewichtet „wenig Abwasch“ heute nicht (`js/engine/planer.js`). Darum nur „markiert“ sagen. Eine Vorliebe „wenig Abwasch“ ist Backlog.

### Angle 9 · Erste Tour der Saison

- **Echtes Problem:** Nach dem Winter muss alles neu gepackt werden: Vorrat, Gas, Küche.
- **Beleg:** „Von zuhause werden nur ein paar Mahlzeiten mitgenommen, damit man am Urlaubsort nicht sofort einkaufen gehen muss.“ (04/Nr. 20). Saison: Planung im Frühjahr, Juli/August sind 42 % der Übernachtungen (`04`, Abschn. 4). Advocatus Diaboli: Camping-Test auf Februar bis April legen (`11`, Einwand D).
- **Warum noch frei:** Saisonstart-Checklisten drehen sich um Technik (Gas, Wasser, Reifen). Die Küche fehlt darin.
- **Einsatz:** Lead-Magnet (Abschnitt 8), Messe-Aktion, Anzeige Februar bis April.
- **Headline:** Erste Tour der Saison? Vorrat zuerst.
- **Primärtext:** Bevor der Wagen vom Winterplatz kommt: Packliste für die Bordküche, Vorratskiste für die ersten zwei Tage und ein Plan für die erste Woche. Holt euch den Bordküchen-Check kostenlos per Mail.

### Angle 10 · Freitag hin, Sonntag heim

- **Echtes Problem:** Am Dauerplatz wird am Wochenende gekocht, und am Sonntag soll nichts übrig bleiben.
- **Beleg:** „herzhafte, „zügige Gerichte“ fürs Dauer- und Reisecamping sammeln“ (04/Nr. 8). Thread „Reste essen von vorgestern“ (04/Nr. 16). Eigenes Board „Dauercamping spezial“ im wohnwagen-forum.de (`04`, 1.13).
- **Warum noch frei:** Dauercamper sind für Kochinhalte unsichtbar, alle reden von der großen Reise.
- **Einsatz:** Anzeige Do/Fr, Aushang an der Rezeption von Campingplätzen mit vielen Saisonplätzen (mit Erlaubnis).
- **Headline:** Freitag hin, Sonntag heim, wenig übrig.
- **Primärtext:** Drei Tage am Dauerplatz, ein Einkauf am Freitag. Zweiflammer plant das Wochenende so, dass möglichst wenig angebrochene Kühlware übrig bleibt, und sagt bei jedem Gericht, wie lange es hält.

### Angle 11 · Selbst kochen: was kostet die Woche?

- **Echtes Problem:** Essen gehen und Fertiggerichte gehen ins Geld, aber was Selbstkochen kostet, weiß vorher keiner.
- **Beleg:** „Wenn keine Lust zum Kochen da ist, dann kommt die teurere Variante (Essen gehen)“ (04/Nr. 21, 2012). Fertiggerichte „auf Dauer zu teuer“ (04/Nr. 24). „Das Essen kann, fertig gekauft aus dem Supermarkt, sehr teuer und eintönig sein.“ (04/Nr. 18, 2012). Schmerzpunkt Rang 4 (`04`, 5.3).
- **Warum noch frei:** Camping-Kochbücher nennen keine Kosten.
- **Einsatz:** Landingpage-Block mit einem echten Beispielplan (2 Personen, Lidl, Preisstand), Mail in der Willkommensstrecke.
- **Recht:** Nur der errechnete Wert eines echten Plans, als Schätzung mit Preisstand. Kein Vergleich mit „Essen gehen kostet X“ ohne Quelle (§ 5 UWG).
- **Headline:** Selbst kochen: was kostet die Woche?
- **Primärtext:** Bevor ihr losfahrt, wisst ihr, was die Campingwoche in der Küche ungefähr kostet. Zweiflammer schätzt die Kosten für euren Plan beim Laden eurer Wahl, mit Preisstand. Beispiel: [2 Personen, 7 Tage, Lidl: X,XX €, Preisstand MM/JJJJ].

### Angle 12 (Wartestand) · Der Plan fährt mit ins Ausland

- **Idee:** „Dein Lidl-Plan funktioniert auch in Kroatien“ (`04`, Abschn. 4).
- **Warum Wartestand:** Die Ladenliste und die Preise im Planer sind deutsch (`js/engine/laeden.js`). Sortiment und Preise im Ausland weichen ab. Werben erst, wenn es Länderprofile mit Preisniveau gibt, und dann nur „Preisniveau geschätzt“, nie Einzelpreise (`04`, Abschn. 4).

---

## 5. Name, Claim, Ton

- **Name:** Zweiflammer. Immer so geschrieben. Bedeutung: Der zweiflammige Gaskocher ist das Herz der meisten Bordküchen, Camper erkennen das Wort sofort (`marke/Namen_und_Pruefung.md`, Abschn. 6, Score 23/25). Für Software (Klassen 9/42) dürfte der Name unterscheidungskräftig sein, für Kocher (Klasse 11) wäre er beschreibend. **DPMA/EUIPO-Recherche steht aus** (ebd., Abschn. 9).
- **Absender:** „Zweiflammer · ein Produkt vom Tellerkontor“ (Fußzeile, Impressum, Kasse).
- **Claim:** *Zwei Flammen. Eine Woche. Entspannt.*
- **Zweitzeile:** *Euer Wochenplan für Gasflammen, Omnia-Backofen und Kühlbox, mit Einkaufsliste nach Laden sortiert und Hinweisen, wie lange etwas hält.*
  - Geändert gegenüber `Namen_und_Pruefung.md`: „für den nächsten Supermarkt“ und „Tipps zum Gas- und Wassersparen“ sind gestrichen. Eine Laden-Suche gibt es nicht, und Spar-Aussagen zu Gas und Wasser sind nicht gemessen (Abschnitt 9).
- **Kurzform:** *Die Bordküche, fertig geplant.*
- **Ton in einem Satz:** Wie die erfahrenen Platznachbarn, die beim Kaffee verraten, was bei ihnen auf den Kocher kommt: gelassen, kundig, mit einem Augenzwinkern, nie belehrend.

**Tonregeln**
1. **Anrede:** „ihr“, wenn das Paar gemeint ist (Anzeigen, Landingpage), „du“ in der App. **Hypothese:** Ein Teil der 60–69-Jährigen erwartet „Sie“. Darum in den ersten Anzeigen „ihr“ gegen „Sie“ testen (Messgröße: Klickrate und DOI-Leads je 1.000 Impressionen).
2. Sätze bis 18 Wörter. Ruhiger Rhythmus, kein Ausrufezeichen, kein Countdown.
3. Fachwörter der Szene richtig benutzen (Landstrom, Vorzelt, Kartusche, Absorber). Wer sie falsch benutzt, ist raus.
4. Genuss vor Pflicht: Es ist Urlaub. „Entspannt“, „zügig“, „mehr Zeit unter der Markise“ statt „effizient“, „optimiert“.
5. Humor über Kühlschrank-Tetris, Kartuschen und Bratgeruch, nie über Alter oder Technikferne.

### Do & Don't (je 8 Beispiele)

| # | Do | Don't | Warum |
|---|---|---|---|
| 1 | „Kreuzt an, was an Bord ist.“ | „Smarte KI-Küche für dein Camper-Lifestyle.“ | Anglizismen und „KI“: der Planer ist regelbasiert (ENTSCHEIDUNGEN C7), die Zielgruppe redet anders |
| 2 | „Im Bordkühlschrank hält Gekochtes höchstens 2 Tage (BfR).“ | „Mit Zweiflammer verdirbt nichts mehr.“ | nicht garantierbar, § 5 UWG |
| 3 | „Gerichte mit kurzer Flammenzeit sind markiert.“ (erst wenn die Minuten am Rezept stehen) | „Spart die Hälfte Gas.“ | nicht gemessen, § 5 UWG |
| 4 | „Für den Omnia-Backofen“ (beschreibend) | „Die offizielle Omnia-App“ | fremde Marke, Täuschung über Partnerschaft |
| 5 | „Saisonpass: 24,99 € für 6 Monate, endet von selbst.“ | „Nur noch 3 Tage: Saisonpass zum Frühbucherpreis.“ | Fake-Verknappung (`08`, 4.4) |
| 6 | „Mehr Zeit unter der Markise.“ | „Genieße deinen wohlverdienten Ruhestand gesund.“ | Gesundheitsaussage und Alters-Schublade |
| 7 | „Mit Landstrom 192 Rezepte, ohne 136.“ (mit Datum gezählt) | „Hunderte Rezepte für jede Situation.“ | ungenau, Zahl ist belegbar |
| 8 | „Kocht draußen oder nehmt die Pfanne raus.“ | „Grillen im Vorzelt geht auch bei Regen.“ | Kohlenmonoxid und Brand, gefährlich |

Zusätzlich gilt: keine Wildcamping-Romantik („einfach irgendwo hinstellen“), keine Aussagen über Gassicherheit („sicher kochen“).

---

## 6. Visueller Stil „Stellplatz“

**Stimmung:** Später Nachmittag am See, Kiefernschatten, die gestreifte Markise. Echte Bordküchen mit Gebrauchsspuren, Emaille und Leinen. Bewusst weg von Honigmama (Creme, Honig, gemalt), DURCHSCHICHT (Nacht, Blitz, Navy) und Zimmerherd (Asphalt, Gelb, Kunstlicht).

### 6.1 Farben

| Name | Hex | Rolle | Einsatz |
|---|---|---|---|
| Kiefer | `#1F4D3A` | Hauptfarbe | Kopfzeile, Knöpfe, Logo-Fläche, Links |
| Seeblau | `#3B7EA1` | Zweitfarbe | Flächen, Illustrationen, Fokusrahmen auf Hell. **Text nur groß** (siehe Tabelle) |
| Markisengelb | `#F2C14E` | Akzent | Flammen im Logo, Markisenstreifen, Text auf Kiefer. **Nie als Text auf Hell** |
| Leinen | `#EEF1EA` | Grund hell | Seitenhintergrund |
| Weiß | `#FFFFFF` | Fläche | Karten, Streifen im Markisenmuster |
| Waldboden (Text) | `#1D2E26` | Text | Fließtext, Fußzeile (aus `themes.css`) |
| Ergänzend aus `themes.css` | `#46564D` Text leise, `#DDE4D8` Fläche 2, `#74867B` Linie stark, `#2F6C9E` Kühl-Hinweis | | |

**Kontrastpaare (WCAG 2.2, berechnet nach relativer Leuchtdichte, 29.10.2026)**

| Vordergrund auf Hintergrund | Verhältnis | Normaltext AA (4,5) | AAA (7) | Großtext / Bedienelement (3) | Einsatz |
|---|---|---|---|---|---|
| Waldboden `#1D2E26` auf Weiß | **14,28 : 1** | ✓ | ✓ | ✓ | Fließtext auf Karten |
| Waldboden auf Leinen | **12,51 : 1** | ✓ | ✓ | ✓ | Fließtext auf Seitengrund |
| Waldboden auf Markisengelb | 8,51 : 1 | ✓ | ✓ | ✓ | Text auf gelben Hinweisflächen und gelben Knöpfen |
| Kiefer auf Weiß | **9,63 : 1** | ✓ | ✓ | ✓ | Überschriften, Links |
| Kiefer auf Leinen | **8,44 : 1** | ✓ | ✓ | ✓ | Überschriften, Links auf Seitengrund |
| Weiß auf Kiefer | 9,63 : 1 | ✓ | ✓ | ✓ | Knopftext |
| Kiefer auf Fläche 2 `#DDE4D8` | 7,41 : 1 | ✓ | ✓ | ✓ | Chips |
| Markisengelb auf Kiefer | **5,74 : 1** | ✓ | ✗ | ✓ | Kopfzeile, Logo-Wortmarke auf Grün |
| Text leise `#46564D` auf Leinen | 6,82 : 1 | ✓ | ✗ | ✓ | Nebentext |
| Text leise auf Weiß | 7,78 : 1 | ✓ | ✓ | ✓ | Nebentext auf Karten |
| Kühl-Blau `#2F6C9E` auf Weiß | 5,59 : 1 | ✓ | ✗ | ✓ | Hinweis „aus dem Kühlschrank“ |
| **Weiß auf Seeblau** (heute `--tag-kopf` in `themes.css`) | **4,48 : 1** | **✗ knapp** | ✗ | ✓ | nur Großtext (ab 24 px oder 18,7 px fett). **Vorschlag:** Text-Seeblau `#336E8D` (5,59 : 1 auf Weiß, 4,90 : 1 auf Leinen) für Tag-Köpfe und kleinen Text |
| Seeblau auf Leinen | 3,93 : 1 | ✗ | ✗ | ✓ | Fokusrahmen, Icons, Linien |
| Linie stark `#74867B` auf Leinen | 3,38 : 1 | ✗ | ✗ | ✓ | Rahmen von Eingabefeldern |
| **Seeblau auf Kiefer** | **2,15 : 1** | ✗ | ✗ | **✗** | **verboten**. Fokus auf Kiefer = Markisengelb-Rahmen (5,74 : 1) |
| **Markisengelb auf Weiß** | **1,68 : 1** | ✗ | ✗ | ✗ | **verboten** für Text und Icons |
| **Markisengelb auf Leinen** | **1,47 : 1** | ✗ | ✗ | ✗ | **verboten**. Gelb auf Hell nur als Fläche mit dunklem Text |
| Warnfarbe `#A86B00` auf Weiß (heute in `themes.css`) | 4,40 : 1 | ✗ knapp | ✗ | ✓ | **zu schwach für Text.** Vorschlag: `#976000` (5,26 : 1 auf Weiß, 4,61 : 1 auf Leinen) |

**Aufgaben in `app/public/css/themes.css` (Camping):** `--tag-kopf` von `#3b7ea1` auf `#336e8d`, `--warn` von `#a86b00` auf `#976000`. Fokusrahmen 2 px mit 2 px Abstand: auf Hell Seeblau, auf Kiefer Markisengelb.

### 6.2 Schriften (lokal gehostet, keine Google-Fonts-Anfrage)

| Rolle | Schrift | Schnitt | Datei |
|---|---|---|---|
| Überschriften, Logo-Wortmarke, Anzeigen-Headlines | Zilla Slab | 700 | `/home/user/mein-business/essensplaner/app/public/fonts/zilla-slab-latin-700-normal.woff2` |
| Zwischenzeilen, Preise | Zilla Slab | 600 | `/home/user/mein-business/essensplaner/app/public/fonts/zilla-slab-latin-600-normal.woff2` |
| Fließtext, Rezepte, Einkaufsliste | Atkinson Hyperlegible | 400 | `/home/user/mein-business/essensplaner/app/public/fonts/atkinson-hyperlegible-latin-400-normal.woff2` |
| Hervorhebung | Atkinson Hyperlegible | 700 | `/home/user/mein-business/essensplaner/app/public/fonts/atkinson-hyperlegible-latin-700-normal.woff2` |

- Lizenzen: beide SIL Open Font License. Atkinson Hyperlegible ist für gute Lesbarkeit gebaut, passend für ältere Augen und Lesen in der Sonne (ENTSCHEIDUNGEN B8).
- Mindestgröße Fließtext **17 px**, Einkaufsliste und Mengen **18 px** (Zielgruppe 45–70, Handy im Freien). Knöpfe mindestens 48 × 48 px.
- Zilla Slab nur für Überschriften ab 22 px, nie für Fließtext.
- Fallstrick: Nur das Latin-Subset liegt vor. Für Länderprofile mit z. B. kroatischen Ortsnamen (č, ć, đ) bräuchte es `latin-ext`.

### 6.3 Markenzeichen: Markisenstreifen

- Senkrechte Streifen Markisengelb und Weiß, je 26 px (`--band` in `themes.css`: `#F2C14E` / `#FFFFFF`).
- Einsatz als **Oberkante** (wie eine ausgefahrene Markise über der Seite), als Rahmen um den Preisblock und als Unterkante von Anzeigen. Oberkante darf mit leichter Wellenkante enden wie ein Markisen-Volant.
- Auf Leinen fast unsichtbar (1,47 : 1), darum immer mit einer Kiefer-Linie (1 px) darunter oder auf Kiefer-Grund.
- Nie hinter Text, nie als Vollfläche, nicht schräg (schräg gehört Zimmerherd).

### 6.4 Logo-Regeln

Datei: `/home/user/mein-business/essensplaner/app/public/img/logo-camping.svg` (64 × 64, Kiefer-Quadrat mit großem 18er-Radius, zwei Markisengelb-Flammen nebeneinander, darunter ein Leinen-Balken als Kocher). App-Icons: `icon-camping-192.png`, `icon-camping-512.png`.

- **Schutzraum:** rundum mindestens **25 % der Kantenlänge** (bei 64 px also 16 px).
- **Mindestgröße:** Bildzeichen digital **24 px**, Druck **8 mm**. Darunter (Favicon 16 px) Variante mit einer zusammengezogenen Doppelflamme ohne Balken (**noch zu erstellen**).
- **Wortbildmarke (zu erstellen):** Bildzeichen links, „Zweiflammer“ in Zilla Slab 700 rechts. Wortmarke Kiefer auf Hell, Markisengelb oder Weiß auf Kiefer. Höhe der Großbuchstaben = 45 % der Zeichenhöhe, Abstand = 25 % der Zeichenbreite.
- **Varianten:**
  1. **Standard:** Kiefer-Fläche, gelbe Flammen, Leinen-Balken (wie die Datei).
  2. **Auf Foto:** Standard mit Fläche, nie die Flammen allein auf ein Foto setzen.
  3. **Einfarbig Kiefer** (Flammen und Balken Kiefer, ohne Fläche) für Aushänge in Schwarz-Weiß-Druck. **Noch zu erstellen.**
  4. **Einfarbig Weiß** für dunkle Flächen. **Noch zu erstellen.**
- **Verboten:** eine dritte Flamme, Flammen in Rot oder Orange (wirkt wie Brandwarnung), drehen, verzerren, Schatten, Verläufe, Logo auf dem Markisenstreifen, Logo kleiner als 24 px.

### 6.5 Bildstil für Higgsfield

**Modell:** `gpt_image_2_5`, Stapel von höchstens ca. 8 Jobs (sonst 429), `jobs_wait` höchstens 12 Jobs. Für Serien ein freigegebenes Bild als `image_references` geben. Je Angle zwei Stile testen: Stimmungsfoto am Platz und Detail in der Bordküche.

**Prompt-Baustein A · Am Platz, später Nachmittag**
```
Golden hour at a quiet lakeside campsite in Germany, a white motorhome with a yellow-and-white striped awning extended, an outdoor camping table with a linen tablecloth, a two-burner camping gas stove standing stable on the table outdoors, one pot of fully cooked one-pot pasta with tomato sauce and tuna, two enamel plates and spoons, hands of a couple in their sixties serving, pine trees and the lake softly out of focus, natural film photo look, pine green, lake blue and awning yellow palette, faces not visible, no logos, no text, no brand names on vehicle or stove
```

**Prompt-Baustein B · Bordküche, Gratin aus dem Ring-Backofen**
```
Close-up in a compact caravan galley, an unbranded ring-shaped aluminium stovetop oven sitting on a low gas flame, lid lifted to show a golden, fully baked potato gratin, steam rising, small window open with pine trees outside, morning light, wooden cutting board and a linen towel, realistic editorial food photo, no brand markings on any object, no text, no people
```

**Prompt-Baustein C · Blick in den Bordkühlschrank**
```
Straight-on view into an open compact motorhome fridge, neatly stacked reusable food boxes with handwritten masking tape labels showing weekday names, a few vegetables and a carton of milk with a plain unbranded label, a handwritten paper week plan clipped to the fridge door, soft daylight, linen and pine green tones, tidy, realistic, no logos on any packaging, no text except the handwritten weekday names
```

**Was auf Bildern nie zu sehen sein darf**
1. Marken-Logos und erkennbare Produkte: Fahrzeughersteller, Omnia-Schriftzug, Gasmarken, Kühlbox-Hersteller, Supermärkte. KI-Bilder auf „erfundene“ Logos prüfen.
2. Grill, Kartuschenkocher oder Holzkohle im geschlossenen Vorzelt, im Fahrzeug oder im Zelt (Kohlenmonoxid, Brand). Gasflaschen liegend oder ungesichert.
3. Rohes Fleisch, Geflügel oder Fisch ungekühlt in der Sonne. Fertige Gerichte mit Fleisch, Fisch und Ei sichtbar durchgegart (`app/data/REZEPTFORMAT.md`).
4. Alkohol, auch nicht als Deko. Nie Essen oder Trinken des Fahrers während der Fahrt, nie eine Fahrszene mit Essen.
5. Offenes Feuer im Wald, Lagerfeuer bei Trockenheit, Wildcamping in Naturschutzgebieten, Müll am Platz.
6. Erfundene Personen mit Gesicht und Zitat (wirkt wie Kundenstimme). Menschen nur als Hände, von hinten oder unscharf.
7. Erkennbare reale Campingplätze oder Stellplätze ohne Erlaubnis des Betreibers.
8. Gerichte oder Funktionen, die es im Produkt nicht gibt (z. B. Länderpreise, Laden-Suche, Stellplatzkarte).
9. Klischees über Alter („Rentner mit Socken in Sandalen“) und Körper, keine Waagen, kein Vorher-nachher.
10. Wasserverschwendung (laufender Hahn beim Abwasch), denn wir reden über den Wassertank.

---

## 7. Kanäle

**Reihenfolge (ENTSCHEIDUNGEN A3, A4, P4):** Zweiflammer wird als zweite Nische beworben, **ab Februar** für die Saison März bis September. Davor Warteliste mit Double-Opt-in, 6–8 Interviews (Leitfaden `04`, 5.7) und Preistest. Bezahlter Test höchstens 150 €. **Abbruch:** weniger als 5 Vorbestellungen bis Mai (`11`, Einwand D) oder DOI-Lead über 3 € (`11`, Risiko 1).

**Was nirgends erlaubt ist:** verdeckte Werbung, Fake-Konten, gekaufte Bewertungen. Wer im Forum schreibt, sagt: „Ich habe das gebaut.“ Creator kennzeichnen „Werbung“ oder „Anzeige“ am Anfang (`07`, 5.5).

### 7.1 Foren und Communities

| Ort | Wer dort ist | Was wir tun | Regeln (Stand) |
|---|---|---|---|
| **wohnwagen-forum.de**, Boards „Koch- und Grillrezepte im Wohnwagen“ (20 aktive Threads, letzter Beitrag 27.10.2026) und „Dauercamping spezial“ | erfahrene Wohnwagen- und Dauercamper, eher älter (`04`, 5.1) | zuerst Administrator anschreiben, Interview-Aufruf und Testzugang anbieten; danach nur hilfreiche Beiträge | **Forumsregeln am 29.10.2026 gelesen** (wohnwagen-forum.de/forumsregeln): Nr. 4 „Kommerzielle Werbung und Promotion für Produkte oder Webseiten sind im Forum nicht gestattet, solange sie überwiegend Werbezwecken dienen. Zuwiderhandlungen werden kommentarlos gelöscht.“ Nr. 5: „Händler und Hersteller melden sich bitte beim Administrator“. Nr. 6: Links nur themenbezogen. Nr. 7: Signatur höchstens 3 Zeilen. **Folge:** Wir sind Hersteller, also erst Admin, dann Beiträge. |
| **wohnmobilforum.de** | Wohnmobil-Fahrer | wie oben | Abruf am 29.10.2026 blockiert (403), Regeln im Browser lesen. Lücke laut `02`, Abschn. 8.7 |
| **GS-Forum**, Thread „Camping-Küche und Gerichte“ | Motorrad-Camper mit einer Flamme (Nachbarsegment) | nur Ein-Flammen-Profil vorstellen, wenn erlaubt | Regeln nicht geprüft |
| **Facebook-Gruppen** zu Wohnmobil, Kastenwagen, Wohnwagen und Omnia-Rezepten; Herstellerseiten (Hymer allein 173.000 Follower, `04`, 1.6) | breite Camper-Gemeinde | Admin fragen, ob Umfrage oder Testaufruf erlaubt ist | Gruppen und Größen **nicht geprüft** (`04`, Abschn. 6). Gruppenregeln beim Beitritt lesen |

### 7.2 Medien, Apps, Händler, Vermieter (Kooperationen)

| Ort | Konkret | Was wir anbieten | Regeln / Stand |
|---|---|---|---|
| Fachmedien | **promobil** (Ratgeber „Kochen im Wohnmobil“), **Camperstyle** (Magazin, Podcast „Kochen und Backen im Camper“, Übersicht Camping-Kochbücher), **Reisemobil International** | Gastbeitrag „Bordküche planen“, Rezept-Serie, Podcast-Gespräch | redaktionell nur mit Nachrichtenwert; bezahlte Formate als „Anzeige“ gekennzeichnet. Mediadaten nicht geprüft |
| Stellplatz-Apps | **park4night**, **Campercontact**, **PiNCAMP** (ADAC) | Inhalte-Kooperation („Was kocht man am Stellplatz?“) oder Anzeige | Stellplatz-Apps haben keine Küche (`04`, 1.6). Werbeangebote **nicht geprüft**, anfragen |
| Händler | **Fritz Berger**, **Reimo** (verkaufen u. a. Omnia-Bücher, `04`, 5.6) | Hinweis-Karte „Tagesplan gratis“ im Paket oder Ratgeber-Beitrag. Rabattcodes sind für die App rechtlich möglich (keine Buchpreisbindung, ENTSCHEIDUNGEN P3), aber nicht geplant: Entscheidung des Inhabers | Händler-Kooperation per Kontaktformular, Gegenleistung schriftlich |
| Vermieter | **roadsurfer**, **PaulCamper** und regionale Vermieter | „Erste Woche im Mietcamper“-Plan als Service in der Übergabe-Mail | Mieter sind in unseren Belegen unterrepräsentiert (`04`, 5.1), also echter Test. B2B-Mail nur mit Einwilligung, sonst Kontaktformular oder Telefon mit mutmaßlicher Einwilligung (§ 7 UWG) |
| Campingplätze | Plätze mit vielen Saison- und Dauerplätzen | Aushang an der Rezeption mit QR-Code (Angle 10), Beitrag im Platz-Newsletter | nur mit Erlaubnis des Betreibers; Absender drauf |
| Vereine | Dauercamper-Vereine, Camping-Clubs (z. B. DCC) | Vortrag „Bordküche ohne Stress“ beim Treffen, Beitrag im Vereinsheft | Vereinsregeln, keine Mitgliederlisten nutzen |
| Eigene Marken | Honigmama-Liste | Hinweis nur, wenn die Einwilligung solche Hinweise abdeckt | Double-Opt-in-Text prüfen |

### 7.3 Messen (Hauptsaison der Planung)

| Messe | Warum | Stand |
|---|---|---|
| **CMT Stuttgart** (Januar) | große Publikumsmesse für Caravan und Reise am Beginn der Planungszeit | Termin 2027 **prüfen**. Als Besucher für Interviews, Stand erst nach Validierung |
| **f.re.e München** (Februar) | Reise- und Freizeitmesse im Süden | Termin **prüfen** |
| **Caravan Salon Düsseldorf** (Ende August / Anfang September) | 269.000 Besucher 2025, 259.000 2026 (`10`) | für Kooperationen mit Händlern und Medien; als Kanal spät in der Saison |

### 7.4 Bezahlt (erst nach Validierung)

| Kanal | Ausrichtung | Hinweise |
|---|---|---|
| **Meta** über den Windsor.ai-Connector | Interessen Wohnmobil, Camping, Kastenwagen, Wohnwagen, Alter 45–70 (`04`, Abschn. 4); Ausspielung Februar bis April, Do/Fr vor Wochenenden (Angle 10) | **Audience Network aus**. Pixel nur nach Einwilligung, keine Allergie- oder Gesundheitssignale (`07`, 4.4). Zielgruppengröße **MISSING**, in der Anzeigenverwaltung prüfen |
| **Google Suche** | „kochen im wohnmobil“, „omnia rezepte“, „camping essen woche“, „wohnwagen rezepte schnell“ | Suchvolumen **MISSING**. Erst SEO-Seiten (Angle 3, 6), dann kleiner Test |
| **Pinterest** | Omnia- und Onepot-Rezepte als Pins mit Link auf den Tagesplan | **Hypothese**, nicht recherchiert. Erst organisch testen |

---

## 8. Lead-Magnet: „Bordküchen-Check“

**Idee:** Auf der Landingpage kreuzt man an, was an Bord ist (Flammen, Omnia, Kühlschrank, Landstrom ja/nein). Sofort und **ohne E-Mail** steht da: „Mit zwei Flammen und Omnia gehen 136 Rezepte, davon 92 Abendessen. Mit Landstrom 192.“ (Datenzählung, live aus den Rezeptdaten). Wer mehr will, bekommt das PDF per Mail. Beworben **Januar bis April** (Angle 9).

**Das PDF „Bordküchen-Check · Erste Tour der Saison“ (kostenlos):**
1. **Geräte-Tabelle:** welche Ausstattung wie viele Rezepte möglich macht (eine Flamme mit Topf 78, eine Flamme mit Topf und Pfanne 121, zwei Flammen mit Omnia 136, mit Landstrom 192), je 5 Beispielgerichte.
2. **Packliste Bordküche:** Topf, Pfanne, Omnia-Backofen falls vorhanden, Brett, Messer, Dosenöffner, Boxen, Klebeband und Stift für Etiketten. Mit Hinweis: Schwere Geräte bleiben zu Hause, wenn die Zuladung knapp ist (04/Nr. 14; promobil zur Zuladung, `04`, 5.2).
3. **Vorratskiste für die ersten zwei Tage:** ungekühlt haltbare Zutaten aus den Rezepten (Datenbasis: Zutaten ohne Kühlpflicht).
4. **Kühlschrank-Karte für die Tür** nach BfR: Gekochtes höchstens 2 Tage, Reis, Nudeln, Fisch, Hack und Ei 1 Tag, ungekühlt höchstens 2 Stunden, Aufwärmen auf 70 °C für 2 Minuten (ENTSCHEIDUNGEN C9).
5. **Ein Beispiel-Wochenplan** für 2 Personen mit zwei Flammen und Omnia, Einkaufsliste nach Laden, Kosten geschätzt mit Preisstand.
6. **Etiketten** für Boxen: Gericht, Datum, „essen bis“.

**Ablauf mit Double-Opt-in:**
1. Formular: nur E-Mail-Adresse, Hinweis auf Datenschutz und Abmeldung. **Keine** Allergien, Ernährungsform oder Geräte zusammen mit der Adresse speichern (Art. 9 DSGVO; ENTSCHEIDUNGEN C3).
2. Bestätigungsmail, erst nach dem Klick das PDF (BGH I ZR 164/09, `07`, 4.4).
3. Danach höchstens vier Mails bis zum Saisonstart, jede mit Abmeldelink: (a) PDF und Tagesplan-Link, (b) Omnia-Woche (Angle 3), (c) „Was kostet die Campingwoche?“ mit echtem Beispielplan (Angle 11), (d) Saisonpass: 24,99 € für 6 Monate, endet von selbst.
4. Meta bekommt höchstens das Ereignis „Lead“ nach Einwilligung, ohne weitere Daten.

**Ziel und Messung:** Kosten je bestätigtem Lead unter 3 € (`11`, Risiko 1). Vorbestellungen des Saisonpasses bis Mai: mindestens 5 (`11`, Einwand D).

**Testidee (ab-testing):** Lead-Magnet als PDF gegen eine ausdruckbare Kühlschrank-Karte allein. Hypothese: Das vollständige PDF bringt mehr bestätigte Leads je 100 Besucher, weil es die Reisevorbereitung abnimmt. Messgröße: DOI-Leads je 100 Besucher, Laufzeit bis je 300 Besucher pro Variante.

---

## 9. Rechtliche Leitplanken für Werbetexte (aus `07`)

| Thema | Regel für Zweiflammer | Grundlage |
|---|---|---|
| Gesundheit | Kein „gesund“, „leicht“, „fit im Ruhestand“, keine Krankheiten. Zweiflammer wirbt mit Bordküche, Zeit, Kosten und Lagerung | HCVO Art. 10, 12; § 11 LFGB; HWG (`07`, 5.1–5.4) |
| Nährwerte | Keine Nährwertangaben in Camping-Werbung („kalorienarm“, „proteinreich“). Wenn doch, nur mit den Schwellen der HCVO und am Rezept | HCVO Anhang (`07`, 5.2) |
| Zahlen | Rezeptzahlen nur mit Zähldatum. Kosten nur aus einem echten Plan, als Schätzung mit Laden, Personen, Preisstand. Kein „spart X €“ | § 5 UWG (`07`, 5.5, 5.6 Erlaubt Nr. 8, Verboten Nr. 14) |
| Gas und Wasser | Kein „spart Gas“, „spart Wasser“ mit Mengen ohne Messung. Erlaubt ist die Angabe der Flammenzeit in Minuten, sobald sie am Rezept steht | § 5 UWG |
| Umweltaussagen | Kein „umweltfreundlich“, „nachhaltig“, „klimafreundlich“, „weniger Müll“ ohne konkreten, belegten Bezug. Seit dem 27.09.2026 gelten verschärfte Regeln gegen allgemeine Umweltaussagen | § 5 UWG; Richtlinie (EU) 2024/825 **[Umsetzung im UWG und Geltungsbeginn vor Kampagnenstart prüfen, nicht in `07` behandelt]** |
| Sicherheit | Keine Aussagen wie „sicher kochen“ oder Tipps zu Gasanlage, Gasprüfung, CO-Melder. Kein Grill im Vorzelt, kein Kocher im Innenraum, wenn er dafür nicht gebaut ist | Haftung; Bildregeln Abschnitt 6.5 |
| Fremde Marken | „Omnia“ nur beschreibend („für den Omnia-Backofen“), nie im Namen, Logo oder als Partner. Händler- und Herstellernamen ohne Logo, ohne Partnerschafts-Andeutung | Markenrecht; `marke/Namen_und_Pruefung.md`, Abschn. 6 |
| Kundenstimmen | Keine erfundenen oder umformulierten Stimmen. Forenzitate nur als Recherche. Echte Bewertungen erst nach dem Launch, mit Hinweis zur Prüfung | UWG Anhang Nr. 23b/c, § 5b Abs. 3 UWG (`07`, 5.5) |
| Creator | „Werbung“/„Anzeige“ am Anfang, auch bei Gratis-Zugang. Schriftliches Briefing mit dieser Tabelle | § 5a Abs. 4 UWG; BGH I ZR 90/20 (`07`, 5.5) |
| Vergleiche | Kein Name von Wettbewerbern (z. B. „mobile cooking“) ohne rechtliche Prüfung | § 6 UWG |
| Saisonpass | „24,99 € für 6 Monate, endet automatisch“ mit Gesamtpreis. Umrechnung („entspricht ca. 4,17 € im Monat“) nur neben dem Gesamtpreis. Kündigungsknopf „Verträge hier kündigen“ und „Vertrag widerrufen“ trotzdem ohne Login | BGH I ZR 161/24; § 312k, § 356a BGB; PAngV (`07`, 3.1, 3.7; `10`, Korrektur 1) |
| Keine Frühbucher-Tricks | Keine Countdowns, kein „nur bis Sonntag“, keine Streichpreise ohne früheren echten Preis | `08`, 4.4; § 5 UWG |
| „Gratis“ | „Gratis“ nur für den 1-Tages-Plan. Beim Jahresabo „7 Tage 0 €, danach 44,99 € pro Jahr“ in gleicher Sichtbarkeit | UWG Anhang Nr. 21; § 312j BGB (`07`, 3.3, 3.4) |
| Bestellknopf | „zahlungspflichtig bestellen“ oder „Jetzt kaufen“ | § 312j Abs. 3 BGB (`07`, 3.3) |
| Widerruf | Planer = digitale Dienstleistung: Widerrufsrecht 14 Tage, bei ausdrücklichem Wunsch nach sofortigem Start anteiliger Wertersatz, Checkbox nicht vorangekreuzt | § 356 Abs. 4, § 357a BGB (`07`, 3.5) |
| Datenschutz | „Eure Geräte, Allergien und Pläne bleiben auf dem Handy“ ist wahr. Für Kauf und Lizenzschlüssel braucht es die E-Mail. „DSGVO-konform“ nur mit Beleg | `07`, 4.3; `11`, Einwand A |
| Allergien | „Rezepte ohne Nüsse filtern“ ja, „allergiesicher“ nie | `07`, 5.6 |
| Lagerung | Haltbarkeit nur mit BfR-Quelle und den Werten aus ENTSCHEIDUNGEN C9 | `07`, 5.6 (Erlaubt 7) |
| Ausland | Keine Preise für Läden im Ausland, solange der Planer sie nicht kennt | § 5 UWG; Angle 12 |
| KI-Bilder | Fotos zeigen das echte Rezept realistisch, Hinweis „Abbildung KI-generiert, Serviervorschlag“ | `07`, 9.4 |
| Werbemails | nur mit Double-Opt-in, auch an Händler und Vermieter keine Werbe-Mail ohne Einwilligung | § 7 UWG, BGH I ZR 164/09 (`07`, 4.4) |
| Tracking | Pixel und CAPI nur nach Einwilligung, ohne sensible Signale | § 25 TDDDG, Art. 9 DSGVO (`07`, 4.4) |

**Freigabe-Check vor jeder Anzeige (5 Fragen):**
1. Hat jede Zahl eine Quelle oder ein Zähl- bzw. Preisdatum?
2. Steht irgendwo „gesund“, „nachhaltig“, „spart Gas“ oder eine Krankheit?
3. Ist „Omnia“ oder eine andere fremde Marke nur beschreibend benutzt?
4. Zeigt das Bild etwas Unsicheres (Grill im Vorzelt, Alkohol, rohes Fleisch in der Sonne) oder etwas, das es im Produkt nicht gibt?
5. Steht beim Saisonpass der Gesamtpreis, und ist „gratis“ wirklich gratis?
