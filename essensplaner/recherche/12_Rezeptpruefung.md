# 12 – Unabhängige Rezeptprüfung (Ökotrophologie)

Stand: 29.10.2026 · Prüfgegenstand: `app/data/rezepte/{U,H,O,F,C}.json` (195 Rezepte) · Prüfgrundlage: `REZEPTFORMAT.md`, `zutaten.py` (BLS 4.0), BfR/BZfE-Regeln zu Lagerung und Durchgaren, DGE-Orientierungswert Salz (6 g/Tag), Health-Claims-VO (EG) 1924/2006, LMIV/Allergene.

## 1. Methode

1. **Automatische Prüfung** (Python-Skript, liest `build.py`-Funktionen für Nährwerte): für jedes Rezept und jeden Zubereitungsweg
   - Garzeit gegen Mindestgarzeit roher Zutaten (z. B. rote Linsen ≥ 10, Tellerlinsen ≥ 22, Reis ≥ 14, Nudeln ≥ 10, Kartoffeln ≥ 9 Min.) und Summe der Minutenangaben in den Schritten gegen `zeit`,
   - Geflügel/Hack/Fisch/Ei/Schwein: ausdrücklicher Durchgar-Hinweis im Weg (Regex auf „durchgegart“, „nicht mehr rosa“, „kein flüssiges Ei“, „nicht mehr glasig“, „Kerntemperatur“ …),
   - Wasser/Flüssigkeit in ml/l bei Couscous, Bulgur, Reis, Quinoa, Linsen, Haferflocken, Püreeflocken,
   - Mikrowellen-Wege: Wattangabe und Minuten/Sekunden bei jedem Erhitzen-Schritt,
   - Salz je Portion = BLS-NaCl aller Zutaten + Salz-Zutat (> 5 g auffällig, > 6 g = ganzer DGE-Tageswert in einer Mahlzeit),
   - kcal-Ausreißer je Mahlzeitart,
   - Lagerregeln (Reis/Nudeln/Couscous/Fisch/Hack/Ei ≤ 1 Tag; kalt mit Rohkost ≤ 1 Tag; `mealprep` nur bei Lagerbarkeit; `ungekuehlt_h = 24` nur ohne Verderbliches; Einfrieren von Rohkost/Joghurt),
   - Tag `ohne_kuehlschrank`: jede Zutat mit Flag `o` (nach dem Öffnen kühlen) oder Lager `k/t`, von der weniger als 85 % der Packung verbraucht werden,
   - Tags `schnell` (≤ 15 Min.), `eiweiss`, `lowcarb`, `unterkunft` gegen Daten,
   - Geräte: Schritte, die ein nicht gelistetes Gerät oder heißes Wasser ohne Wärmequelle brauchen; zwei Kochgefäße gleichzeitig ohne `herd2`,
   - Zutaten, die in Schritten genannt, aber nicht in `zutaten` stehen (versteckte Allergene),
   - werbliche/gesundheitsbezogene Wörter in `tipp` und `titel`.
2. **Fachliche Durchsicht:** Statt der geforderten Stichprobe (≥ 40, je Datei ≥ 6) habe ich **alle 195 Rezepte vollständig** gelesen (Zutaten, alle Wege, Lager, Tags, Tipp) und auf Kochbarkeit mit den Geräten, Reihenfolge, Mengen-Flüssigkeits-Verhältnisse, Zeiten, Geschmack, Mahlzeit-Zuordnung und Tags geprüft.
3. **Korrektur:** alle kritischen und mittleren Befunde direkt in den JSON-Dateien behoben (nur betroffene Felder, Format `indent=1` beibehalten), danach `python3 build.py --check X` für U, H, O, F, C (alle OK), `python3 build.py` (OK: 195 Rezepte) und `node tests/planer.test.mjs` (0 Fehler).

Schweregrade: **kritisch** = Sicherheit/Allergene/ungar · **mittel** = funktioniert nicht wie beschrieben bzw. Daten führen Planer/Nutzer in die Irre · **leicht** = Stil/Feinschliff.

## 2. Statistik

| Kennzahl | vorher | nachher |
|---|---|---|
| Rezepte gesamt (U/H/O/F/C) | 195 (40/40/40/45/30) | 195 |
| vollständig fachlich gelesen | 195 | – |
| Rezepte mit Tag `ohne_kuehlschrank` | 41 | 20 |
| davon mit angebrochener kühlpflichtiger Packung | 21 | 0 |
| Rezepte > 6 g Salz/Portion | 5 (max. 7,6 g, U15) | 0 (max. 6,0 g, C19) |
| Rezepte 5–6 g Salz/Portion | 8 | 11 (davon 2 durch Absenkung von > 6 g) |
| kcal/Portion Mittelwert ± SD | 619 ± 179 | 614 ± 176 |
| kcal-Spanne | 194 (Snack F41) – 968 (U15) | 194 – 927 (U20) |
| Garzeit roher Zutaten zu kurz | 0 | 0 |
| fehlender Durchgar-Hinweis (Geflügel/Hack/Fisch/Ei) | 0 echte (7 Skript-Treffer waren gleichwertige Formulierungen) | 0 |
| fehlende Wassermenge | 0 echte (19 Skript-Treffer: Flüssigkeit als Milch, in Litern oder „wie beschrieben“) | 0 |
| Mikrowelle ohne Watt/Zeit | 0 (U 800 W, F 600 W; Rührei in 15-/30-Sek.-Schritten) | 0 |
| Verstöße gegen Lagerregeln (≤ 1 Tag, L3, mealprep) | 0 (build.py prüft das bereits) | 0 |
| Heil-/Abnehmversprechen in `tipp` | 0 | 0 |
| Befunde kritisch / mittel / leicht (je Rezept gezählt) | 1 / 37 / 25 Tabellenzeilen | alle kritischen und mittleren behoben |

## 3. Liste: `ohne_kuehlschrank` mit angebrochener Packung (alle behoben: Tag entfernt)

| Rezept | Rest, der nach dem Öffnen gekühlt werden muss |
|---|---|
| U02 Apfel-Zimt-Porridge | H-Milch 750 ml |
| U06 Müsli mit H-Milch | H-Milch 750 ml |
| U08 Schoko-Haferbrei | H-Milch 900 ml |
| U09 Couscous-Bowl mit Ajvar | Ajvar 290 g |
| U10 Bulgur-Chili | Tomatenmark 140 g |
| U11 Püree mit Wiener | H-Milch 880 ml, Wiener (Glas) 250 g |
| U12 Linsen-Kokos-Curry | Kokosmilch 200 ml |
| U13 Dosenlinsen mit Würstchen | Geflügelwiener (Glas) 7 Stück |
| U15 Dosen-Ravioli mit Bohnen | Kidneybohnen 125 g (vor Korrektur) |
| U16 Weiße Bohnen mit Würstchen | Geflügelwiener (Glas) 7 Stück |
| U17 Mikrowellen-Nudeln Thunfisch | Passata 300 g |
| U18 Couscous Thunfisch Mais | Mais 145 g |
| U19 Bulgur mit Sojaschnetzeln | Kidneybohnen 125 g |
| U20 Süßkartoffel mit Bohnen | Kidneybohnen 125 g, Mais 185 g, Tomatensalsa 200 g |
| U27 Thunfisch-Bohnen-Salat | Mais 145 g |
| U39 Schnelle Tomatensuppe | Tomatenmark 140 g |
| C01 Bircher-Müsli | H-Milch 700 ml |
| C04 Porridge Banane | H-Milch 750 ml (Tipp behauptete zusätzlich „alle Zutaten im Vorratsfach“) |
| C18 Rote-Linsen-Curry | Kokosmilch 200 ml |
| C19 Gnocchi-Würstchen-Pfanne | Geflügelwiener (Glas) 200 g |
| C22 Soja-Chili mit Tortillas | Tomatenmark 180 g |

Die verbleibenden 20 Rezepte mit `ohne_kuehlschrank` verbrauchen ihre Packungen ganz oder nutzen nur ungekühlt lagerbare Zutaten bzw. Einzelportionen (Flag `e`). Wer das Tag für einzelne Rezepte zurück will, muss die Menge auf die ganze Packung bringen (z. B. U12/C18: ganze Dose Kokosmilch) oder eine Kleinpackung als eigene Zutat in `zutaten.py` anlegen (z. B. H-Milch 200 ml).

## 4. Befundtabelle

### 4.1 Kritisch (behoben)

| ID | Problem | Korrektur (Feld → neuer Wert) |
|---|---|---|
| F11 | `tipp` „Statt Milch passt auch Haferdrink, dann ist das Frühstück milchfrei.“ Müsli enthält oft Milchbestandteile oder Spuren; eine pauschale Allergen-Entwarnung kann Milchallergiker gefährden. | `tipp` → „Statt Milch passt auch Haferdrink. Bei Milchallergie die Zutatenliste des Müslis prüfen, viele Sorten enthalten Milchbestandteile oder Spuren.“ |

### 4.2 Mittel (behoben)

| ID | Problem | Korrektur (Feld → neuer Wert) |
|---|---|---|
| U02, U06, U08, U09, U10, U11, U12, U13, U15, U16, U17, U18, U19, U20, U27, U39, C01, C04, C18, C19, C22 | Tag `ohne_kuehlschrank`, aber Packungsrest muss nach dem Öffnen gekühlt werden (Liste Abschnitt 3). Planer würde Nutzern ohne Kühlschrank verderbliche Reste empfehlen. | `tags`: `ohne_kuehlschrank` entfernt |
| C04 | `tipp` „Alle Zutaten lagern im Vorratsfach“ ist falsch (angebrochene H-Milch). | `tipp` → „Haferflocken, Erdnussmus und Bananen lagern im Vorratsfach; die angebrochene H-Milch gehört danach in die Kühlung. Wer das Wasser morgens schon für Kaffee heiß macht, gibt einfach einen Teil davon an die Haferflocken.“ |
| U15 | 7,6 g Salz und 968 kcal für 1 Portion (ganze 800-g-Dose Ravioli); 925 g Speise in 5–6 Min. bei 800 W werden nicht durch und durch heiß. | `portionen` 1 → 2; `kidney_dose` 125 → 250 (ganze Dose); Weg 1 `zeit` 8 → 12; Schritt 2 „…4 Minuten erhitzen, umrühren, weitere 3 bis 4 Minuten…“; Schritt 3 „…auf zwei Teller verteilen“; `tipp` → „Die Dose reicht für zwei Portionen. Die zweite Portion abgekühlt in den Kühlschrank stellen und am nächsten Tag einmal dampfend heiß aufwärmen.“ Ergebnis: 4,2 g Salz, 564 kcal |
| U29 | 7,1 g Salz/Portion (150 g Aufschnitt + 3 Tortillas). | `putenbrust_aufschnitt` 150 → 90 (6 Scheiben); jetzt 5,3 g |
| U16 | 6,9 g Salz/Portion. | `gefluegelwiener` 2 → 1 Stk.; jetzt 5,8 g |
| U23 | 6,6 g Salz/Portion; Gnocchi und Mozzarella sind bereits salzig. | `gnocchi` 350 → 300; Zutat `salz` entfernt; Schritt 2 → „Passata, Kräuter und Pfeffer unterrühren (Gnocchi und Mozzarella bringen genug Salz mit).“; jetzt 5,0 g |
| U13 | 6,1 g Salz/Portion. | `gefluegelwiener` 2 → 1 Stk.; jetzt 3,9 g |
| U11 | 100 g Püreeflocken mit nur 370 ml Flüssigkeit (Packungsverhältnis ca. 1 : 7) ergibt eine steife Masse; 100 g sind zudem ca. 3 Packungsportionen. | `kartoffelpueree` 100 → 60; Weg 1 Schritt 2 „300 ml Wasser aufkochen…“, Schritt 3 „60 g Püreeflocken einrühren…“; Weg 2 Schritt 1 „300 ml Wasser und 120 ml Milch … 4 Minuten“, Schritt 2 „60 g Püreeflocken…“, `zeit` 8 → 9 |
| O08 | Masse aus 12 Eiern, 250 g Quark, 300 g Spinat, Paprika, Käse (≈ 1,4 kg) passt nicht in 12 Muffinmulden (≈ 1,1 l) und läuft über. | `eier` 12 → 8, `magerquark` 250 → 150, `tk_spinat` 300 → 200; Schritt 4 „Masse in die 12 Mulden füllen (höchstens drei Viertel hoch, sie geht auf)…“; `mahlzeit` → `["fruehstueck","snack"]` (316 kcal sind kein Mittagessen) |
| O04, F30, F33, C13 | Tag `schnell`, aber schnellster Weg 20–30 Min. (Regel ≤ 15). | `tags`: `schnell` entfernt |
| O22 | Airfryer-Weg: ganze Paprika mit roher Hack-Reis-Füllung in 27–30 Min. bei 180 °C erreichen den Kern meist nicht sicher. | Weg 2 Schritt 2 „…bei 180 °C 30–35 Minuten garen“; `zeit` 55 → 65 |
| O14 | Ofen-Weg verlangt „500 ml heißes Wasser“, obwohl nur `ofen` gelistet ist. | Weg 1 Schritt 1 → „Sojaschnetzel mit Brühepulver in 500 ml sehr heißem Leitungswasser 20 Minuten einweichen (mit kochendem Wasser aus dem Wasserkocher reichen 10 Minuten), dann kräftig ausdrücken.“ |
| F34 | Weg `herd, topf`: Äpfel sollen „in der Mikrowelle oder im Topf“ gedünstet werden, während der einzige Topf 40 Min. mit Milchreis belegt ist; Mikrowelle nicht gelistet. | Schritte umgestellt: neuer Schritt 1 „Äpfel schälen, würfeln und mit 3 EL Wasser und Zimt im Topf 5 Minuten weich dünsten, in eine Schüssel geben. Den Topf kurz ausspülen.“, danach Milchreis; alter Mikrowellen-Schritt entfernt |
| F09 | `tipp` „Ohne Brot dazu ist das Gericht glutenfrei.“ „glutenfrei“ ist eine geregelte Angabe (VO (EU) 828/2014) und für Beilagen nicht zusicherbar. | `tipp` → „Das Omelett enthält keine glutenhaltigen Zutaten. Bei Zöliakie die Zutatenliste von Brot oder anderen Beilagen prüfen.“ |

### 4.3 Leicht (nur aufgelistet, nicht geändert)

| ID | Problem | Vorschlag |
|---|---|---|
| C19 | 6,0 g Salz/Portion | Zutat `salz` (1 g) streichen, Schritt 5 „Mit Pfeffer abschmecken“ → 5,5 g |
| U16, U33, H03, H22, U29, U31, U27, C09, C21, H27 | 5,0–5,8 g Salz/Portion | jeweils Salz-Zutat halbieren bzw. streichen (H03: `salz` 2 → 0, Feta reicht; U33: `kochschinken`/`gouda` 4 → 3) |
| U33 | Zutaten 4 Scheiben Schinken und 4 Gouda, Schritt belegt aber nur 3 Sandwiches „mit je einer Scheibe“ | `kochschinken` 4 → 3, `gouda` 4 → 3 |
| U02 | Wasserkocher-Weg nutzt 100 ml H-Milch, Zutatenliste 250 ml (Nährwerte passen nur zu Weg 1) | Weg 2: „150 ml Wasser … 100 ml H-Milch“ → „100 ml Wasser … 150 ml H-Milch“ und `milch` 250 → 200 |
| U18 | `tipp` „Den restlichen Mais am selben Tag aufbrauchen, zum Beispiel morgens im Wrap“ (morgens liegt vor dem Mittagessen) | `tipp` → „Den restlichen Mais umgefüllt kühlen und innerhalb von 2 Tagen aufbrauchen, etwa in U27.“ |
| U39 | `tipp` „Tomatenmark in der Tube hält geöffnet länger als die Dose“ – auch die Tube muss nach dem Öffnen gekühlt werden | `tipp` → „Tomatenmark aus der Tube nach dem Öffnen im Kühlschrank lagern; ein Rest passt in U10.“ |
| U25 | `ohne_kuehlschrank` bei 2 Portionen; zweite Portion braucht Kühlung (Tipp weist darauf hin) | Tag behalten nur, wenn der Planer P2 ohne Kühlschrank auf „beide sofort essen“ beschränkt, sonst Tag entfernen |
| U25 | Wasserkocher-Weg: rohe Zwiebelwürfel werden durch Übergießen nicht gar (scharf, knackig) | Schritt 1: „Zwiebel sehr fein würfeln“ oder Zwiebel 1 Min. mit dem kochenden Wasser vorab überbrühen |
| U37 / F44 | gleiche Speise (Reiswaffel + Erdnussmus + Obst), `ungekuehlt_h` 2 bzw. 24 | U37 `ungekuehlt_h` 2 lassen (aufgeschnittener Apfel) und F44 auf 2 setzen (geschnittene Banane) |
| H09, H26 | „1 Prise Salz“ im Schritt, nicht in `zutaten` | `["salz", 1]` ergänzen |
| H30 | Schritt „salzen“, keine Salz-Zutat (Salz wird nicht berechnet) | `["salz", 5]` ergänzen |
| O35 | Pfannen-Weg: „in 10 ml Öl anbraten“, Öl fehlt in `zutaten` | `["rapsoel", 10]` ergänzen |
| H25 | Tortillas werden zuerst erwärmt und kühlen während 10 Min. Braten wieder ab | Tortilla-Schritt ans Ende verschieben |
| H28 | `tipp` „saure Gurken aus dem Glas, die ohne Kühlung lagern“ – angebrochen nicht | „…die ungeöffnet ohne Kühlung lagern; angebrochen in den Kühlschrank“ |
| H39, F25 | Fischstäbchen „bis sie innen heiß sind“ | „…bis sie goldbraun und innen durch und durch dampfend heiß sind“ |
| O34 | Airfryer-Weg: rohes Hack unter Püree-Decke, 22–24 Min. bei 180 °C knapp | Hinweis „Kerntemperatur mit Thermometer prüfen, sonst 5 Min. länger“ oder Hack vorher in der Pfanne garen |
| C18 | rote Linsen 10 Min. köcheln + 5 Min. ziehen ist knapp | „12–15 Minuten köcheln“ |
| O13, O30, O34, O37, O38 (Weg 3) | `herd2` gelistet, Schritte laufen aber auch nacheinander | `herd` statt `herd2`, wenn nacheinander gekocht wird (mehr Nutzer erreichbar) |
| O05, O30 | `tipp` „günstige Eiweißquelle(n)“ – nährwertbezogene Angabe im Sinne der VO 1924/2006 (für die Gerichte erfüllt, aber unnötig werblich) | O05 → „TK-Seelachs ist günstig; über Nacht im Kühlschrank aufgetaut gart er gleichmäßiger.“; O30 → „Rote Linsen und Sojaschnetzel sind günstig und zerfallen in der Sauce fast unsichtbar.“ |
| O17, O28 | `tipp` „sättigender“ (Sättigung ist ein gesundheitsbezogenes Wirkversprechen) | „…wenn du eine größere Portion möchtest“ |
| F42 | Titel „Energiekugeln“ kann als Wirkaussage gelesen werden | `titel` → „Dattel-Hafer-Kugeln“ |
| C06 | `tipp` „…gibt es morgens ohne Kochen ein warmes Gefühl“ (unklar) | „…hast du morgens ohne Kochen ein fertiges Frühstück; über Nacht kühl lagern.“ |
| F03, F41 | Tag `eiweiss` bei 19 bzw. 17 g Protein | Tag entfernen oder Protein erhöhen (F03: `sojadrink` → Skyr-Topping 100 g) |
| O11, O04 | 346 bzw. 381 kcal als Haupt-/Mittagsmahlzeit (lowcarb gewollt) | Tipp nennt Beilage bereits; ggf. `mahlzeit` nur `abend` |
| U38, F43 | 304 bzw. 208 kcal als `fruehstueck` | `mahlzeit` nur `snack` oder Brotbeilage ergänzen |
| F24 | Titel „Gemüse-Nudel-Lasagne“ ohne Lasagneplatten | `titel` → „Gemüse-Nudel-Auflauf mit Schmand“ |

### 4.4 Geprüft und ohne Befund (Auszug)

- **Durchgaren:** alle 74 Wege mit Geflügel, Hack, Fisch, Schwein oder Ei nennen ein klares Gar-Kriterium (O-Datei durchgängig „Kerntemperatur mind. 72 °C“; Rührei/Omelett „kein flüssiges Ei“; Fisch „in der Mitte weiß, zerfällt leicht“). Keine rohen Eier, Sprossen oder Rohmilch.
- **Garzeiten:** Reis 15–20 Min. bzw. 40–45 Min. im Ofen mit 2,25-facher Wassermenge, Tellerlinsen 25–40 Min., rote Linsen 15–20 Min., Nudeln Packungszeit oder 10–14 Min. im One-Pot, Kartoffeln 9–12 Min. Mikrowelle bzw. 20–25 Min. gekocht – plausibel.
- **Wassermengen:** Couscous 1 : 1,2–1,6, Bulgur 1 : 2, Reis 1 : 2 (Topf) bzw. 1 : 2,25 (Ofen), Haferbrei 1 : 2,5–3 – plausibel.
- **Lager:** Reis-, Nudel-, Hack-, Fisch- und Eiergerichte stehen auf `kuehl_tage` ≤ 1; kalte Rohkost-Gerichte ≤ 1; Reste-Hinweis „innerhalb von 2 Stunden kühlen“ in allen Kochtag-Rezepten.
- **Geräte:** Nach Korrektur von O14 und F34 braucht kein Weg ein Gerät, das nicht gelistet ist; alle Omnia-Wege nennen `herd`; Unterkunfts-Rezepte haben immer einen Weg mit max. Wasserkocher/Mikrowelle/1 Platte.
- **Versteckte Allergene:** Keine Zutat in den Schritten, die in `zutaten` fehlt (außer Öl in O35, ohne Allergenrelevanz).
- **Tipps:** keine Heil-, Abnehm- oder Krankheitsaussagen; BfR-Hinweis zu TK-Beeren (F03, F43) ist korrekt wiedergegeben und wird in den Schritten umgesetzt.

## 5. Gesamturteil

Die Rezeptsammlung ist **fachlich solide und sicher kochbar**. Durchgaren, Abkühlen und Lagerung sind konsequenter beschrieben als in den meisten Kochbüchern: Garzeiten und Flüssigkeitsmengen stimmen, alle Mikrowellen-Schritte haben Watt und Zeit, Werbeversprechen fehlen. Die Schwächen waren systematisch, nicht handwerklich:

1. **`ohne_kuehlschrank` war zu großzügig vergeben.** Die Hälfte der Rezepte hinterließ angebrochene H-Milch, Konserven, Kokosmilch, Würstchen im Glas, Ajvar oder Tomatenmark. Das ist korrigiert. Für Montage/LKW fehlt jetzt Auswahl bei warmen Gerichten ohne Kühlschrank (20 statt 41). Kleinpackungen als eigene Zutaten (H-Milch 200 ml, Kokosmilch 165 ml, Mais 140 g, Tomatenmark-Portionsbeutel) würden das Tag für viele Rezepte ehrlich zurückbringen.
2. **Salz bei Konserven-Gerichten:** Einzelportionen aus Dosen und Wurst lagen bis 7,6 g. Jetzt liegt nichts mehr über 6 g, aber 11 Rezepte liegen bei 5–6 g. Für eine Tagesplanung mit 3 Mahlzeiten sollte der Planer Salz je Tag summieren und ab ca. 6 g gegensteuern.
3. **Einzelne Mengen-/Ablauffehler** (Püree, Muffins, Milchreis, Ravioli-Erhitzung, Airfryer-Paprika) sind behoben.

Kritisch war nur eine Allergen-Entwarnung im Tipp (F11), sie ist korrigiert. Nach den Korrekturen: `build.py --check` für alle fünf Dateien OK, `build.py` OK (195 Rezepte), Planertests ohne Fehler.
