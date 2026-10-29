# 11 – Advocatus Diaboli, Phase A (Recherche & Grundsatzentscheidungen)

Stand: 29.10.2026 · Rolle: Advocatus Diaboli · Grundlage: nur die Ergebnisse in `recherche/01`–`08` und die Rezeptdaten in `app/data/rezepte/*.json` (dazu `app/data/zutaten.py`, `REZEPTFORMAT.md`, `AUFTRAG.md`). Der Lösungsweg der anderen Rollen war nicht bekannt.

> Zweck: Ich suche die Stellen, an denen das Vorhaben scheitern kann, und schlage für jede einen Test mit Abbruchkriterium vor. Ich halte das Vorhaben nicht für falsch. Ich halte aber mehrere tragende Annahmen für unbelegt. Die Spalte bzw. Zeile **„Antwort des Teams“** bleibt leer und wird später ausgefüllt.

**Vorbemerkung zur Rezeptstatistik:** Der Auftrag nennt 165 Rezepte. In `app/data/rezepte/` liegen inzwischen **180** (F 45, H 40, O 40, U 40, C 15; `C.json` mit Camping-Rezepten kam am 29.10. um 05:32 dazu). Die Zahlen unten beziehen sich auf alle 180 Rezepte. Ausgewertet habe ich mit den Allergenen und Flags aus `zutaten.py` und mit der Planer-Regel „erster Weg, für den alle Geräte vorhanden sind“.

---

## Übersicht

| # | Schwachstelle | Wahrscheinlichkeit | Auswirkung | Antwort des Teams |
|---|---|---|---|---|
| 1 | Bezahlte Reichweite rechnet sich nicht, und die organische Reichweite ist nur angenommen (CAC ≫ LTV) | **hoch** | existenziell | |
| 2 | Nachfrage und Zahlungsbereitschaft sind nicht validiert, die Belege sind dünn, alt oder nur Suchauszüge | **hoch** | existenziell | |
| 3 | Fokus: vier Marken plus zwei bestehende Shops für eine Person | **hoch** | hoch | |
| 4 | Das Kernversprechen „Kosten stimmen an der Kasse“ steht auf Schätzpreisen, und an genau diesem Punkt scheitert mise | **mittel bis hoch** | hoch | |
| 5 | Rezeptqualität, Rezeptabdeckung und Allergen-Haftung ohne menschliche Fachprüfung und ohne Testkochen | **mittel** | hoch bis existenziell (Personenschaden) | |

---

## 1. Bezahlte Reichweite rechnet sich nicht, organische Reichweite ist nur angenommen

**Behauptung:** Das Modell trägt sich nur, wenn kostenlose Besucher in großer Zahl kommen. Für diese Besucher gibt es keinen Beleg. Bezahlte Werbung liegt selbst im optimistischen Szenario über dem tragbaren CAC.

**Belege aus den Berichten**
- `08_Pricing_und_Unit_Economics.md`, 0. Kurzfassung: „Ziel-CAC (LTV/3) nur ≈ 11–16 €“ und „Bezahlte Werbung trägt sich am Anfang voraussichtlich nicht“.
- `08`, 3.5: Kaufquote je Besucher 0,32 % / 0,72 % / 1,28 % → **„Paid-CAC 281 € / 83 € / 35 €“**. Der realistische Paid-CAC liegt also beim **6- bis 7-Fachen** des Ziel-CAC von 12,09 € (Mix).
- `08`, 3.6: Organische Besucher in Monat 1 = 250 / 500 / 800, Wachstum +8 bis +15 % pro Monat, **„[alle Annahme]“**. Quellen dafür: „SEO, Cross-Sell Honigmama/DURCHSCHICHT, Gruppen, Creator“. Laut `../CLAUDE.md` ist das DURCHSCHICHT-Produkt aber noch ein **Entwurf** und hat damit keine Kundenliste. SEO für eine neue Domain bringt in Monat 1 praktisch nichts.
- `08`, 3.8: Realistisch sind es nach 12 Monaten **79 Zahlende**, kumuliert **−2.081 €**. Konservativ (3.7) sind es 11 Zahlende und −3.654 €.
- `01_Markt_und_Zahlen.md`, 6.2: Freemium wandelt **„2,18 %“** (D35) um, und das gilt für App-Store-Apps. „Für das Web (PWA) gibt es keine gleichwertigen Benchmarks.“
- `07_Recht_und_Steuern.md`, 4.4: Meta beschränkt „Health & Wellness“-Werbetreibende seit 2025 bei Purchase-Events. Für die Fitness-Variante kann deshalb die Kampagnen-Optimierung auf Käufe wegfallen.

**Warum gefährlich:** Selbst im *realistischen* Fall bringt das Projekt nach einem Jahr rund 400 € Nettoerlös im Monat (`08`, 3.8, Monat 12: 391 €), und davon sind die Startkosten noch nicht zurück. Die Zeit fehlt in den beiden bestehenden Shops. Alle drei Szenarien hängen an der organischen Besucherkurve. Für sie gibt es keinen einzigen gemessenen Wert. Fällt sie aus, landet man im konservativen Szenario, und dort werden die Fixkosten nie gedeckt. Dazu kommt das Gratis-Angebot: Mit „1 Tagesplan pro Woche“ (`08`, 4.2) sieht der Nutzer die eigentlichen Vorteile gar nicht, also Wocheneinkauf mit Packungsresten, Meal-Prep-Ablauf und Wochenkosten. Das drückt die Quote von Lead zu Käufer, den laut `08`, 3.10 „größten Hebel“.

**Wahrscheinlichkeit:** hoch · **Auswirkung:** existenziell (kein tragfähiges Geschäft, Opportunitätskosten bei Honigmama/DURCHSCHICHT)

**Gegenmaßnahme / Test mit Abbruchkriterium**
1. **Reichweite vor dem Bau messen (4 Wochen):** Je Nische eine Landingpage mit Preis und Warteliste (Double-Opt-in). Werbung kommt noch nicht dazu. Die organischen Kanäle werden real bespielt: 3 Foren- bzw. Gruppenbeiträge mit Erlaubnis der Moderation, 1 Mail an die Honigmama-Liste, 2 Kooperationsanfragen (z. B. deutschland-monteurzimmer.de, gesunde-trucker.com laut `02`, Abschnitt 5). **Abbruchkriterium:** Kommen in 4 Wochen weniger als 150 organische Besucher bzw. weniger als 30 bestätigte Wartelisten-Einträge über alle Nischen, gilt die Besucherannahme aus `08`, 3.6 als widerlegt. Dann wird das Modell neu gerechnet, bevor weiter gebaut wird.
2. **Bezahlter Test mit hartem Deckel:** 300 € auf Meta, 2 Nischen, gemessen über Windsor.ai. **Abbruchkriterium:** Liegen die Kosten je bestätigtem DOI-Lead über 3 € oder die Kaufquote je Linkklick (Pass oder Vorbestellung) unter 1 %, gibt es keine weitere bezahlte Werbung. Wachstum muss dann allein über B2B und Partner kommen, siehe Punkt 3.
3. **B2B ernsthaft prüfen**, bevor B2C skaliert wird. Laut `01`, 7 gibt es dazu „keine Zahlungsbereitschaftsdaten (Lücke)“. Geplant sind 10 Gespräche mit Montagefirmen, Personaldienstleistern und Monteurzimmer-Vermietern. **Abbruchkriterium für den B2B-Zweig:** Unter 2 Absichtserklärungen (Pilot gegen Rechnung).
4. Für das Gratis-Angebot einen **Wochenplan mit Einkaufsliste einmalig gratis** prüfen statt nur eines Tagesplans (A/B-Test, sobald genug Besucher da sind).

| Antwort des Teams | |
|---|---|

---

## 2. Nachfrage und Zahlungsbereitschaft sind nicht validiert, die Belege sind dünn, alt oder nur Suchauszüge

**Behauptung:** Die Recherche zeigt, dass es ein Problem gibt. Sie zeigt nicht, dass die Zielgruppen für *dieses* Produkt *diesen* Preis zahlen. Kein einziges Interview, keine Umfrage, kein Preistest.

**Belege aus den Berichten**
- **Montage:** `02_Stimmen_Montage.md`, 8.8: „Viele deutsche Forenbelege stammen aus 2012–2016. Neuere Belege (2025/2026) gibt es nur aus den USA.“ Von 44 Zitaten sind 14 US-englisch. Reddit, gutefrage (Direktabruf), YouTube, Facebook und TikTok waren gesperrt (Kopfzeile von `02`). Zahlungsbereitschaft wird aus **Kühlbox-Bewertungen** abgeleitet (`02`, 4), also aus Geräten, nicht aus Software.
- **Montage-Schmerz Nr. 1** ist „Zu müde zum Kochen nach 10–12-h-Tag“, dazu „dann noch kochen? nee.“ (`02`, 7, Rang 1, Zitat 2). Ein Planer nimmt das Kochen nicht ab. Er ordnet es nur.
- **Camping:** `04_Nischen_Vergleich.md`, 3: „**Erst bei Z = 3 kippt der Sieger** … Die Empfehlung hängt also an der Annahme ‚Camper zahlen‘.“ Für Z = 5 gibt es als direkten Software-Beleg nur die App „mobile cooking“ mit „3,6 Sterne aus 28 Bewertungen, letzte Version 10/2023“ (`04`, 1.6). Dazu kommt ein Gegenbeleg aus derselben Tabelle: „17,99.- … ist zu viel“ (`04`, 5.6, Zitat 28).
- **Allgemein:** `03_Stimmen_Fitness_Allgemein.md`, B4: „niedrige Schmerzgrenze für Rezept-Apps (3,99–40 €/Jahr) und viele lehnen ein Abo grundsätzlich ab“. Dazu das Zitat „maximal 3,99 als Jahresabo“ (B22). Geplant sind 44,99 €.
- **Fitness:** `03`, A4: „abo-müde und vergleichen mit kostenlosen Apps und mit KI“. Laut `01`, 7 liegt das SOM bei nur 0,2–0,5 % des SAM, „starker Wettbewerb“.
- **Quellenlage allgemein:** `01`, Quellenhinweis: Alles außer einer kurzen Liste von PDFs „stammt aus Suchauszügen oder Sekundärquellen“. Im selben Bericht steht als „belegt, **veraltet**“: Zahlungsbereitschaft für Apps „vermutlich ≤ 2016“ (`01`, 6.1). Die Monteur-Kerngruppe von 0,47–0,82 Mio. ist eine Kette aus Annahmen von 10–50 % (`01`, 2.4: „Die Herleitung ist grob“).
- Eine Gegenprobe steht selbst in `05_Wettbewerb.md`, 5: „‚Niemand löst es‘ kann auch heißen, dass die Nachfrage zu klein ist.“

**Warum gefährlich:** Wahl der Nische, Preise (6,99 / 44,99 / 17,99 €) und Positionierung hängen an Annahmen, die nur aus Indizien abgeleitet sind. Eine Lücke im Markt ist kein Beleg für Nachfrage. Gibt es in der Montage-Nische kein Planungsproblem, sondern ein Müdigkeitsproblem, löst der Planer das Falsche.

**Wahrscheinlichkeit:** hoch · **Auswirkung:** existenziell (falsche Nische, falscher Preis, falsches Produkt)

**Gegenmaßnahme / Test mit Abbruchkriterium**
1. **Interviews vor weiterer Rezeptarbeit:** je Nische 6–8 Gespräche nach `customer-research`, Mode 3 (Leitfaden für Camping in `04`, 5.7). Für Montage die Frage stellen: „Würdest du lieber gar nicht kochen?“ **Abbruchkriterium je Nische:** Bestätigen weniger als die Hälfte der Befragten ein Planungsproblem (nicht nur ein Kochproblem), und nennt weniger als ein Drittel spontan einen Betrag ≥ 15 € für eine Lösung, wird die Nische zum Filter herabgestuft.
2. **Preistest auf der Landingpage** (aus Schwachstelle 1): zwei Preisvarianten mit Vorbestellung bzw. „Pass sichern“ über echten Checkout. Kein Fake-Checkout, denn das wäre irreführend nach UWG. Wer zahlt, bekommt sein Geld bis zum Start auf Wunsch sofort zurück. **Abbruchkriterium:** Unter 5 zahlende Vorbesteller je Nische bei mindestens 300 Landingpage-Besuchern.
3. **Gesperrte Quellen von Hand nachholen** (Reddit, gutefrage, Facebook-Gruppen, Google Play). Das sind laut `02`, 8 und `03` ausdrücklich offene Lücken. Gleichzeitig den Faktencheck mit 20 % der Quellen erledigen, den `AUFTRAG.md` 9 vorschreibt.

| Antwort des Teams | |
|---|---|

---

## 3. Fokus: vier Marken plus zwei bestehende Shops für eine Person

**Behauptung:** „Vier Nischen-Marken auf einer Technik“ spart Code, aber keine Arbeit. Markenaufbau, Inhalte, Kanäle, Rezepte und Rechtsprüfung skalieren mit der Zahl der Marken und nicht mit der Technik.

**Belege aus den Berichten**
- `AUFTRAG.md`, 9 (Phase B): „jede Variante ein eigenes Markenbuch, Logo-Dateien und 3 Beispielbilder“ sowie DPMA/EUIPO/RDAP-Prüfung je Name. Das sind vier Markenauftritte.
- `01`, 8.8: „Die Marktgröße ist nicht der Engpass, die Reichweite ist es.“ Reichweite muss für jede Marke einzeln aufgebaut werden: eigene Communities (Monteurzimmer-Portale, Wohnwagen-Forum, Fitness-Creator), eigene SEO-Keywords, eigene Werbekonten bzw. Domains. `07`, 4.4 empfiehlt für Fitness sogar eine eigene Domain wegen der Meta-Einschränkungen.
- Die Rezeptanforderungen gehen weit auseinander (eigene Auswertung `app/data/rezepte`):
  - Montage mit Standardgeräten (Wasserkocher + Mikrowelle; laut `02`, 2 ist der Herd im Monteurzimmer selten ausgewiesen, und rund 1/3 hat keine eigene Küche): **59 von 180 Rezepten** passen, davon nur **23 Abendessen**.
  - Camping hat **15 eigene Rezepte**, davon **6 mit Omnia**, dem Kern-USP aus `04`, 4.
  - Die Geräteverteilung zielt auf Haushalte mit Küche: `herd` 103-mal, `ofen` 57-mal, `airfryer` 49-mal, `wasserkocher` nur 17-mal. Laut `02`, 2 ist der Airfryer in Monteurzimmern „0 von 38“-mal angegeben.
- Der Inhaber betreibt bereits zwei Shops. Bei Honigmama wartet ein Entwurf aufs Veröffentlichen, bei DURCHSCHICHT fehlen PDF, Impressum und der bezahlte Plan (`../CLAUDE.md`).

**Warum gefährlich:** Vier halbe Marken verlieren gegen eine ganze. Jede Nische bekommt ein Viertel der Zeit, ein Viertel der Rezepte und ein Viertel des Testbudgets. Mit 300 € Testbudget (`08`, 3.6) verteilt auf vier Nischen gibt es keine aussagekräftige Messung. Kommt kein klares Signal, wird nichts beendet, und alle vier Marken laufen weiter mit.

**Wahrscheinlichkeit:** hoch · **Auswirkung:** hoch (Verzettelung, kein Testergebnis, Stillstand bei den bestehenden Shops)

**Gegenmaßnahme / Test mit Abbruchkriterium**
1. **Eine Marke zuerst.** Technik bleibt eine, aber in Phase B bekommt nur die Siegernische Markenbuch, Logo und Bilder. Die anderen laufen als **Modus/Filter** in derselben App, so wie `04` es für Airfryer, Singles und Vegan ohnehin empfiehlt.
2. Den Sieger bestimmen die Tests aus Schwachstelle 1 und 2 (gleiche Landingpage-Vorlage, gleiches Budget je Nische, 4 Wochen). **Abbruchkriterium:** Nischen, die bei Wartelisten-Quote oder Vorbestellungen weniger als halb so gut abschneiden wie die beste, werden für 6 Monate eingefroren.
3. **Zeitbudget festlegen:** höchstens X Stunden pro Woche für den Essensplaner, solange die offenen Punkte bei Honigmama und DURCHSCHICHT nicht erledigt sind. X entscheidet der Inhaber.

| Antwort des Teams | |
|---|---|

---

## 4. Kernversprechen „Kosten stimmen an der Kasse“ ohne Live-Preise

**Behauptung:** Die empfohlene Positionierung gegen mise lautet „Discounter-ehrlich“ (`05`, 7, Option 2). Sie verspricht genau das, was mit geschätzten Preisniveaus am schwersten einzulösen ist. Weicht die Schätzung sichtbar ab, wird aus dem Hauptargument der Hauptgrund für schlechte Bewertungen.

**Belege aus den Berichten**
- `03`, Projektübergreifende Erkenntnis 1: „**Genauigkeit ist das Hauptversprechen**, noch vor dem Funktionsumfang … Hier ist mise sichtbar gescheitert.“
- `05`, 2.1: Die Hauptschwäche von mise ist „Ladenbezug stimmt nicht“ und „die Preise stimmen nicht“. Nutzer wünschen sich Preise, die „an den wöchentlichen Angeboten ausgerichtet“ sind (B5). Genau das schließt `06`, 3.3 aus: „Richtwert ohne Angebote“.
- `06`, 3.3: Ketten-Faktor „**aus eigener Stichprobe berechnen, nicht schätzen**. Zahlen erst nach Erhebung eintragen.“ `06`, 3.4: Vollerhebung „ca. 17–18 Stunden“, danach monatliche Pflege.
- `app/data/zutaten.py`, Kopf: Preis = „**SCHÄTZUNG** je Packung, Discounter-Eigenmarke (Aldi/Lidl), Stand 10/2026 … Stichprobe zur Prüfung: recherche/09_Preisstichprobe.md“. **Diese Datei gibt es nicht** (in `recherche/` liegen nur 01–08). Alle 156 Zutatenpreise sind also derzeit ungeprüft.
- `08`, 3.10: „Bei Supermarkt-Preisdaten fallen eventuell Lizenzkosten an … im Modell **nicht** enthalten [Unbekannt]“.
- Für Camping im Ausland schreibt `04`, 4 selbst: „Preise im Ausland nur als Niveau angeben“. Für die Siegernische ist der Laden-USP also schon heute abgeschwächt.

**Warum gefährlich:** Ein Planer mit Budget wird an der Kasse überprüft, jede Woche, und der Nutzer sieht das Ergebnis selbst. Liegt die Schätzung regelmäßig 15–20 % daneben, ist die Glaubwürdigkeit weg, genauso wie bei mise. Werbeaussagen zur Ersparnis sind ohne gemessenen Warenkorb nach UWG ohnehin unzulässig (`08`, 4.3; `05`, 6.5). Die Pflege kostet dauerhaft Zeit und belastet zusätzlich die Fokusfrage aus Schwachstelle 3.

**Wahrscheinlichkeit:** mittel bis hoch · **Auswirkung:** hoch (Kernversprechen, Bewertungen, UWG)

**Gegenmaßnahme / Test mit Abbruchkriterium**
1. **Kassenbon-Test vor dem Launch:** 6 echte Wochenpläne aus der App (2 Ketten × 3 Budgets) wirklich einkaufen oder im Onlineshop als Warenkorb nachbauen, dann Plan-Summe und Kassenbon vergleichen. **Abbruchkriterium:** Liegt die mittlere Abweichung über ±15 % oder ein einzelner Plan über ±25 %, wird nicht mit Kosten geworben. Die Positionierung „Discounter-ehrlich“ wird dann durch „Geräte zuerst“ ersetzt (`05`, Option 1).
2. `recherche/09_Preisstichprobe.md` tatsächlich erstellen, mindestens 3 Referenzketten nach `06`, 3.4, mit Datum.
3. In der App die Spanne zeigen statt eines Punktwerts („ca. 31–36 €“), dazu einen Preis, den der Nutzer selbst überschreiben kann (steht schon in `06`, 3.3). Beim Kassenbon-Test messen, ob die Spanne trifft.

| Antwort des Teams | |
|---|---|

---

## 5. Rezeptqualität, Rezeptabdeckung und Allergen-Haftung ohne Menschen

**Behauptung:** Die Rezepte sind KI-Entwürfe. Die vorgesehene Fachprüfung und das Testkochen sind nicht nachweisbar erfolgt, und die „Ernährungsfachkraft“ sowie die „Jurist:in“ sind Rollen im KI-Team, keine Menschen. Gleichzeitig reicht der Bestand für typische Kombinationen von Filtern nicht aus. Dann wiederholt der Planer Gerichte oder liefert leere Pläne.

**Belege aus den Berichten und Daten**
- `06`, 5.3, Stufen 4, 5 und 7: Fachprüfung, Testkochen („Pflicht für alle ‚Montage‘-Rezepte“) und Freigabe mit „Status `geprüft`, Prüfer, Datum“. „Nur `geprüft` wird im Planer genutzt.“ **In keinem der 180 Rezepte gibt es ein Feld für Status, Prüfer oder Datum** (eigene Auswertung: Felder sind nur id, titel, mahlzeit, portionen, zutaten, wege, lager, mealprep, tags, tipp, foto). Aufwand laut `06`: „ca. 90–180 Stunden“ für 120 Rezepte, „größter einzelner Zeitposten“.
- `AUFTRAG.md`, 8: Die Ernährungsfachkraft ist eine Rolle des KI-Expertenteams. Die Freigaben in Phase B („Jurist:in und Ernährungsfachkraft alle Claims freigegeben“) wären damit KI-Freigaben.
- `05`, 2.1: An mise wird kritisiert: „vieles macht den Eindruck, als sei es schnell KI-generiert worden“ und „Mengenfehler in Rezepten“. Wir hätten dieselbe Herkunft.
- **Abdeckung bei Filtern** (eigene Auswertung, Geräte Wasserkocher + Mikrowelle = Monteur-Standard ohne Herd):

  | Filter | passende Rezepte | davon Abendessen |
  |---|---|---|
  | keiner | 59 | 23 |
  | ohne Gluten | 12 | **5** |
  | ohne Milch | 31 | 14 |
  | ohne Gluten + ohne Milch | 7 | **2** |
  | vegan | 20 | 7 |
  | vegetarisch + ohne Gluten | 10 | **3** |

  Bei „max. 2× pro Woche“ (`06`, 6, Abwechslungsregel) sind 7 Abendessen mit 2–3 Rezepten nicht zu planen.
- Ein kleiner Widerspruch im Datensatz: 6 Rezepte mit dem Tag `ohne_kuehlschrank` (C01, C04, U02, U06, U08, U11) enthalten Milch. Das ist nach `REZEPTFORMAT.md` nur zulässig, wenn die Milch als Einzelportion sofort verbraucht wird, und eine 1-l-H-Milch ist das nicht. Der Tipp in C01 („Geöffnete H-Milch gehört in die Kühlung“) widerspricht dem Tag.
- Haftung: `07`, ca. Z. 432: Mit der **Produkthaftungsrichtlinie (EU) 2024/2853** gilt Software als Produkt, mit „verschuldensunabhängige[r] Haftung für Personenschäden“. Umsetzungsfrist **09.12.2026**, also vor einem realistischen Launch. „Haftungsausschluss gegenüber Geschädigten nicht möglich.“ `06`, 2.3: Spuren kann die App „nicht abbilden“.

**Warum gefährlich:** Ein einziger Allergen-Fehler mit Anaphylaxie ist ein Personenschaden. Dafür wird verschuldensunabhängig gehaftet, und die Versicherung (`07`: 200–600 €/Jahr, „Angebote einholen“) ist noch nicht abgeschlossen. Ein nicht testgekochtes Rezept, das im Hotelzimmer mit Wasserkocher nicht funktioniert, kostet in der Zielgruppe sofort das Vertrauen. Leere oder sich ständig wiederholende Pläne bei Allergikern widersprechen dem Versprechen „Allergien als harter Filter, nicht hinter der Paywall“ (`03`, Erkenntnis 3).

**Wahrscheinlichkeit:** mittel · **Auswirkung:** hoch, im Allergiefall existenziell

**Gegenmaßnahme / Test mit Abbruchkriterium**
1. **Statusfeld einführen** (`status`, `geprueft_von`, `datum`, `testgekocht`). Der Planer nutzt nur freigegebene Rezepte, und ein automatischer Test prüft das.
2. **Testkochen als Stichprobe vor dem Launch:** 20 Montage-Rezepte, wirklich mit Wasserkocher und Mikrowelle (Hotelzimmer-Setup). **Abbruchkriterium:** Muss bei mehr als 3 von 20 ein Schritt, eine Menge oder eine Zeit wesentlich geändert werden, wird der KI-Bestand insgesamt als ungeprüft behandelt. Dann folgt vollständiges Testkochen vor dem Launch statt Stichprobe.
3. **Menschliche Fachprüfung einkaufen:** Allergen-Mapping in `zutaten.py` und die Lagerregeln von einer echten Ökotrophologin oder Diätassistentin prüfen lassen (Werkvertrag, wenige Stunden), ebenso den Checkout von einer echten Anwaltskanzlei. Die Versicherung **vor** dem Launch abschließen.
4. **Abdeckungstest im QA:** Für die 20 häufigsten Kombinationen aus Gerät, Allergen und Diät muss ein 7-Tage-Plan mit höchstens 2 Wiederholungen je Rezept möglich sein. **Abbruchkriterium (Launch-Gate):** Scheitern mehr als 3 Kombinationen, wird der Filter in der Werbung nicht genannt, oder es gibt erst gezielt neue Rezepte.
5. Den Widerspruch bei `ohne_kuehlschrank` + Milch korrigieren, z. B. mit Milch in Portionspackungen oder Milchpulver, oder den Tag entfernen.

| Antwort des Teams | |
|---|---|

---

## Weitere Einwände (Kurzform)

| # | Einwand | Beleg | Vorschlag | Antwort des Teams |
|---|---|---|---|---|
| A | **„Daten nur lokal“ beißt sich mit Abo, Kündigungsbutton und Gerätewechsel.** Ein Abo braucht E-Mail und Zahlungs-ID auf dem Server. Der Kündigungsbutton braucht Name und E-Mail, auch für den Pass. Browser können lokal gespeicherte Daten löschen, vor allem Safari auf iOS bei nicht installierten Web-Apps. Monteure wechseln Handys, und dann sind Profil und Pläne weg. | `07`, 3.1 (BGH I ZR 161/24: Button auch bei Einmalzahlung), `07`, 4.3 (Sync nur optional), `06`, Kurzfazit („iOS-PWA-Stand in der EU (auf Gerät testen)“) | Lizenzschlüssel- bzw. Magic-Link-Konzept festlegen, Export/Import des Profils als Datei, iPhone-Test auf Datenverlust nach 7+ Tagen ohne Nutzung. | |
| B | **mise wird unterschätzt.** Die „81 % 1–3★“ stammen aus den *geschriebenen* Rezensionen, die laut eigener Methodik „deutlich negativer als der Sterne-Schnitt“ sind. Der Gesamtwert liegt bei **4,5★ aus 1.540 Bewertungen**, Updates kommen alle 2 Wochen, und mise hat Werbereichweite. Der Vergleich im Kopf der Nutzer ist außerdem die kostenlose KI. | `05`, 0 (Methodik), `05`, 2.1, `05`, 2.20 („Kostenlose KI ist also der Standard-Vergleich“) | Monatlich ein Konkurrenz-Check (Version, Preis, Funktionen). Den eigenen Mehrwert gegenüber ChatGPT in einem 30-Sekunden-Demo-Vergleich belegen, sonst nicht damit werben. | |
| C | **Monteure sind schwer erreichbar, und ein Teil spricht kein Deutsch.** 32 % der Berufskraftfahrer sind Ausländer, die Entsandten am Bau kommen vor allem aus PL/RO. Facebook-Gruppen und TikTok waren nicht abrufbar. Die Kanäle (Portale, Vermieter) sind Vermutungen ohne Zusage. | `01`, 2.3, `02`, 8.3 und 8.6 (rumänische Quellen „nicht gefunden“) | Zwei Kanal-Partner vor Phase B anfragen (Abbruch, wenn keiner antwortet). Polnisch und Rumänisch nur nach Nachfragetest einbauen, nicht vorab. | |
| D | **Saisonalität beim Camping und Abo-Unlust.** Juli und August bringen 18,7 von 44,7 Mio. Übernachtungen (≈ 42 %). Ein Monats- oder Jahresabo passt schlecht zu 2–3 Reisen im Jahr. Der Pass zu 17,99 € liegt genau an der geäußerten Grenze „17,99 … ist zu viel“. Im Winter gibt es praktisch keine Neukunden, und ein Launch im Herbst/Winter verfehlt die Saison. | `04`, 4 (Risiken), `04`, 5.6, `08`, 4.2 | Den Camping-Test auf Februar bis April legen (Planung der Reisesaison, Messen). Für Camping einen günstigeren Reisepass testen. Abbruch, wenn bis Mai weniger als 5 Vorbestellungen vorliegen. | |
| E | **Recht: viele 🔴-Punkte bauen auf „[prüfen]“, und es gibt keine menschliche Prüfung.** Die BGH-Entscheidung zu Halteangeboten ist „nur über Sekundärquellen erfasst“, die Meta-Health-Einschränkung ebenso. Bei der Kleinunternehmergrenze zählen beide Shops mit. „halal/koscher“ ist ein Art.-9-Datum. Abmahnstreitwerte liegen bei 10.000–30.000 €. | `07`, 0 (Punkte 2, 6, 7, 8), `07`, 3.1, `07`, Schlusshinweis zur Prüftiefe | Einmalige anwaltliche Prüfung von Checkout, Kündigungsstrecke und Datenschutzerklärung vor dem Launch einplanen und das Budget in `08` aufnehmen (fehlt derzeit in den Startkosten). Steuerberatung zur Kleinunternehmerfrage über alle drei Projekte. | |

---

## Mein Fazit als Advocatus Diaboli

Der Markt hat eine echte Lücke: Gerätefilter, kleine Budgets, Meal-Prep-Ablauf, Lagerhinweise. Die Recherche ist fleißig und weist ihre Lücken offen aus. Gefährlich ist die **Reihenfolge**. Rezepte und App entstehen schon, bevor ein einziger Mensch aus einer Zielgruppe gesagt hat, dass er zahlen würde, und bevor klar ist, woher die Besucher kommen. Meine Empfehlung vor dem Übergang zu Phase B:

1. Vier Wochen lang Landingpages, Interviews und Vorbestellungen testen (Schwachstellen 1 und 2), mit den oben genannten Abbruchkriterien.
2. Danach **eine** Nische als Marke aufbauen, die anderen als Filter führen (Schwachstelle 3).
3. Vor dem Launch Kassenbon-Test, Testkochen und Fachprüfung durch Menschen (Schwachstellen 4 und 5).
