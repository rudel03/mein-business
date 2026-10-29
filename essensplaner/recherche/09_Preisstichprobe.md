# 09 – Preisstichprobe: Discounter-Grundpreise und Ladenfaktoren

Stand: 29.10.2026 · Geprüft: `app/data/zutaten.py` (Spalte „Preis €“) und `app/public/js/engine/laeden.js` (Ladenfaktoren) · Bearbeitung: Marktforschung Preise

> **Kurzfazit:** 26 von 34 geprüften Zutaten haben einen vergleichbaren, belegten Marktpreis. Die mittlere Abweichung beträgt -6,4 % (Median -2,9 %, mittlere absolute Abweichung 17,7 %). Negativ heißt: Der Markt ist billiger als unsere Schätzung. Das Bild ist zweigeteilt. **Fleisch und Fisch schätzen wir zu niedrig** (+16 bis +32 %). **Butter, Nudeln, Reis im Kochbeutel, Süßkartoffeln, Wraps und Müsli schätzen wir zu hoch** (−22 bis −46 %). Die Einstiegs-Eigenmarken bei Rewe (ja!) und Edeka (Gut & Günstig) kosten in der Stichprobe meist genauso viel wie Aldi und Lidl. Der Faktor 1,08 bzw. 1,10 in `laeden.js` ist dafür eher zu hoch, siehe Abschnitt 4.

## 1. Methode

**Vorgehen**
1. Auswahl: die Zutaten, die im Planer am häufigsten vorkommen oder am meisten kosten (Fleisch, Fisch, Milchprodukte, Grundnahrungsmittel), ergänzt um Konserven, Brot und Vorrat.
2. **Aldi Süd:** Einzelabruf der öffentlichen Produktsuche und Produktseiten auf aldi-sued.de, je Zutat eine Suchseite oder Produktseite. Gewertet wird nur der **Normalpreis**. Artikel mit Aktionshinweis (Fußnote „Aktionsartikel“, Label „Aktion“, durchgestrichener Preis, „Verfügbar ab …“ in der Zukunft) sind ausgeschlossen oder nur als Hinweis genannt. Datum = Abrufdatum 29.10.2026.
3. **Lidl:** lidl.de zeigt für Lebensmittel online **keine Dauerpreise** (Eigenmarken-Seiten ohne Preise, Onlineshop nur Non-Food). Ersatzquelle: das Preisvergleichsportal **supermarktcheck.de** (nutzergemeldete Preise mit Meldedatum). Gewertet nur Preise, die dort als aktuell markiert sind („🟢“ bzw. nicht „abgelaufen“) und keine „Sonderangebote“. Datum = Meldedatum laut Seite.
4. **Rewe / Edeka / Kaufland:** shop.rewe.de und kaufland.de antworten auf automatisierte Abrufe mit **HTTP 403**. Das wurde respektiert und **nicht umgangen**. Ersatzquelle ebenfalls supermarktcheck.de, Eigenmarken ja! (Rewe) und Gut & Günstig (Edeka). **Kaufland K-Classic:** alle gefundenen Meldungen waren als „abgelaufen“ markiert und wurden deshalb nicht gewertet.
5. Vergleich: Umrechnung auf €/kg, €/l oder €/Stück. Abweichung = (Marktpreis je Einheit ÷ unsere Schätzung je Einheit − 1) × 100. Referenz ist Aldi, sonst Lidl, sonst (mit * markiert) Rewe/Edeka-Einstiegsmarke. Werte mit ⚠ (andere Sorte) gehen nicht in den Mittelwert ein.

**Rechtshinweis**
- Es wurden nur **einzelne, öffentlich ohne Anmeldung sichtbare Seiten** abgerufen: rund 30 Seiten bei aldi-sued.de und rund 50 Seiten bei supermarktcheck.de, mit Pausen zwischen den Abrufen. Das robots.txt von supermarktcheck.de erlaubt den Abruf.
- Es gab **kein massenhaftes Auslesen und keine Entnahme wesentlicher Teile einer Datenbank** (§ 87b UrhG). Es wurden einzelne Preisangaben für eine interne Plausibilitätsprüfung übernommen, keine Datensätze gespiegelt. Es gab **keine Umgehung technischer Sperren**: 403-Antworten (Rewe, Kaufland, Aldi bei Abruf per curl) wurden hingenommen, ohne IP-Wechsel, Header-Tricks oder Login.
- Die Preise dienen nur der Kalibrierung unserer **eigenen Schätzwerte**. In der App erscheinen keine Händlerpreise als Tatsachenbehauptung, sondern weiterhin eine gekennzeichnete Schätzung. Händlernamen und Preise nicht ohne erneute Prüfung in Werbung verwenden (UWG, Irreführung).
- Nutzergemeldete Preise (supermarktcheck.de) sind **Sekundärquellen** und können regional abweichen. Sie sind im Bericht mit Meldedatum gekennzeichnet.

**Grenzen der Stichprobe**
- Aldi Süd zeigt **frisches Obst und Gemüse** (Kartoffeln, Zwiebeln, Äpfel) online praktisch nicht. Diese Preise sind „nicht gefunden“. Gerade diese Positionen schwanken saisonal stark.
- Aldi Nord und Aldi Süd können sich unterscheiden. Erhoben wurde nur Aldi Süd.
- Rewe- und Edeka-Werte stammen teils aus Mai bis Juni 2026. Die Butterpreise sind 2026 deutlich gefallen, die Fleischpreise gestiegen.

## 2. Vergleichstabelle

Unsere Schätzung = Packung und Preis aus `zutaten.py`. Die Abweichung bezieht sich auf die in Klammern genannte Referenz.

| Zutat | unsere Schätzung | Aldi Süd | Lidl | Rewe / Edeka (Kaufland) | Datum | Link | Abweichung |
|---|---|---|---|---|---|---|---|
| H-Milch 3,5 % (`milch`) | 0,99 € / 1000 ml (0,99 €/l) | nicht gefunden | 0,95 € / 1000 ml (0,95 €/l) | nicht erhoben | 24.08.2026 | [Lidl](https://www.supermarktcheck.de/product/10623-milbona-haltbare-vollmilch-35-1l) | -4 % (Lidl) |
| Naturjoghurt 3,5 % (`joghurt`) | 0,89 € / 500 g (1,78 €/kg) | 0,89 € / 500 g (1,78 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/milsani-joghurt-3-5-fett-500-g-milder-naturjoghurt-000000000000202925) | +0 % (Aldi) |
| Naturjoghurt im Becher (`joghurt_becher`) | 0,39 € / 150 g (2,60 €/kg) | 0,89 € / 600 g (1,48 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/milsani-joghurt-3-5-fett-4-x-150-g-milder-naturjoghurt-000000000000202813) | -43 % (Aldi) |
| Schmand (`schmand`) | 0,79 € / 200 g (3,95 €/kg) | 0,79 € / 200 g (3,95 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/milsani-h-schmand-200-g-000000000000202669) | +0 % (Aldi) |
| Skyr natur (`skyr`) | 1,39 € / 450 g (3,09 €/kg) | 1,29 € / 500 g (2,58 €/kg) | 2,29 € / 1000 g (2,29 €/kg) | Rewe: 1,19 € / 500 g (2,38 €/kg), 18.05.2026; Edeka: 1,49 € / 500 g (2,98 €/kg), 10.06.2026 | 10.06.2026, 18.05.2026, 29.10.2026, o. D. | [Aldi](https://www.aldi-sued.de/produkt/milsani-skyr-500-g-000000000000203092) [Lidl](https://www.supermarktcheck.de/product/547686-milbona-sykr-pur-1kg) [Rewe](https://www.supermarktcheck.de/product/209576-ja-skyr-natur-500g) [Edeka](https://www.supermarktcheck.de/product/207114-gut-guenstig-skyr) | -16 % (Aldi) |
| Magerquark (`magerquark`) | 1,09 € / 500 g (2,18 €/kg) | 1,19 € / 500 g (2,38 €/kg) | 1,19 € / 500 g (2,38 €/kg) | Rewe: 0,99 € / 500 g (1,98 €/kg), 16.05.2026 | 16.05.2026, 24.08.2026, 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/milsani-speisequark-magerstufe-500-g-0-3-000000000000558481) [Lidl](https://www.supermarktcheck.de/product/41528-milbona-speisequark-magerstufe-500g) [Rewe](https://www.supermarktcheck.de/product/6481-ja-speisequark-magerstufe-500g) | +9 % (Aldi) |
| Eier (`eier`) | 2,79 € / 10 stk (0,28 €/Stk) | 2,99 € / 10 stk (0,30 €/Stk) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/landfreude-eier-aus-freilandhaltung-10er-packung-000000000000205265) | +7 % (Aldi) |
| Hähnchenbrustfilet (`haehnchenbrust`) | 8,99 € / 1000 g (8,99 €/kg) | 6,79 € / 600 g (11,32 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/meine-metzgerei-haehnchen-brustfilet-600-g-000000000000211427) | +26 % (Aldi) |
| Rinderhackfleisch (`rinderhack`) | 4,99 € / 500 g (9,98 €/kg) | 5,79 € / 500 g (11,58 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/meine-metzgerei-hackfleisch-vom-rind-500-g-000000000000550925) | +16 % (Aldi) |
| Hackfleisch gemischt (`gemischtes_hack`) | 3,79 € / 500 g (7,58 €/kg) | 4,99 € / 500 g (9,98 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/meine-metzgerei-hackfleisch-gemischt-500-g-000000000000648898) | +32 % (Aldi) |
| Lachsfilet (`lachs`) | 3,99 € / 250 g (15,96 €/kg) | 4,99 € / 250 g (19,96 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/golden-seafood-lachsfilets-250-g-000000000000191385) | +25 % (Aldi) |
| Butter (`butter`) | 2,19 € / 250 g (8,76 €/kg) | 1,19 € / 250 g (4,76 €/kg) | 1,05 € / 250 g (4,20 €/kg) | Rewe-Gruppe (Hit): 1,19 € / 250 g (4,76 €/kg), 21.09.2026; Edeka: 1,19 € / 250 g (4,76 €/kg), 28.09.2026 | 21.09.2026, 24.08.2026, 28.09.2026, 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/milsani-deutsche-markenbutter-250-g-000000000000202682) [Lidl](https://www.supermarktcheck.de/product/52694-milbona-deutsche-markenbutter) [Rewe-Gruppe](https://www.supermarktcheck.de/product/5352-ja-markenbutter-mild-gesaeuert-250g) [Edeka](https://www.supermarktcheck.de/product/5977-gut-guenstig-deutsche-markenbutter-250g) | -46 % (Aldi) |
| Pflanzenmargarine (`margarine`) | 1,49 € / 500 g (2,98 €/kg) | 1,49 € / 500 g (2,98 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/bellasan-pflanzen-margarine-500-g-000000000000212182) | +0 % (Aldi) |
| Gouda in Scheiben (`gouda`) | 2,79 € / 400 g (6,98 €/kg) | 2,45 € / 400 g (6,12 €/kg) | 2,45 € / 400 g (6,12 €/kg) | Rewe: 2,45 € / 400 g (6,12 €/kg), 16.05.2026; Edeka: 2,79 € / 400 g (6,98 €/kg), o. D. | 16.05.2026, 24.08.2026, 29.10.2026, o. D. | [Aldi](https://www.aldi-sued.de/produkt/milsani-gouda-scheiben-400-g-000000000000554730) [Lidl](https://www.supermarktcheck.de/product/77131-milbona-gouda-jung-scheiben-400g) [Rewe](https://www.supermarktcheck.de/product/12170-ja-gouda-jung-48-fett-400g) [Edeka](https://www.supermarktcheck.de/product/83514-gutgUEnstig-junger-gouda-in-scheiben-48-fett-i-tr) | -12 % (Aldi) |
| geriebener Käse (`reibekaese`) | 1,49 € / 200 g (7,45 €/kg) | 1,79 € / 250 g (7,16 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/milsani-gouda-250-g-gerieben-000000000000474280) | -4 % (Aldi) |
| Mozzarella (`mozzarella`) | 0,79 € / 125 g (6,32 €/kg) | 0,85 € / 125 g (6,80 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/cucina-nobile-mozzarella-125-g-classic-000000000202689001) | +8 % (Aldi) |
| Nudeln (Hartweizen) (`nudeln`) | 0,89 € / 500 g (1,78 €/kg) | 0,69 € / 500 g (1,38 €/kg) | nicht gefunden | Rewe: 0,69 € / 500 g (1,38 €/kg), 06.02.2026 | 06.02.2026, 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/cucina-spaghetti-500-g-000000000000631119) [Rewe](https://www.supermarktcheck.de/product/80482-ja-spaghetti-500g) | -22 % (Aldi) |
| Haferflocken (`haferflocken`) | 0,79 € / 500 g (1,58 €/kg) | nicht gefunden | nicht gefunden | Rewe: 0,69 € / 500 g (1,38 €/kg), 18.05.2026; Edeka: 0,69 € / 500 g (1,38 €/kg), o. D. | 18.05.2026, o. D. | [Rewe](https://www.supermarktcheck.de/product/37860-ja-zarte-haferflocken-500g) [Edeka](https://www.supermarktcheck.de/product/90147-gut-guenstig-haferflocken-500g) | -13 % (Rewe*) |
| Müsli ohne Zuckerzusatz (`muesli`) | 2,29 € / 750 g (3,05 €/kg) | 1,69 € / 750 g (2,25 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/bio-bio-basis-muesli-750-g-5-kornmix-000000000635201001) | -26 % (Aldi) |
| Langkornreis (`reis`) | 1,79 € / 1000 g (1,79 €/kg) | 1,39 € / 1000 g (1,39 €/kg) ⚠ andere Sorte | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/bon-ri-parboiled-reis-1-kg-000000000000194682) | -22 % (Aldi⚠) |
| Parboiled-Reis im Kochbeutel (`parboiled`) | 1,29 € / 500 g (2,58 €/kg) | 0,79 € / 500 g (1,58 €/kg) | 1,59 € / 1000 g (1,59 €/kg) | nicht erhoben | 15.07.2026, 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/bon-ri-kochbeutel-reis-500-g-000000000000194038) [Lidl](https://www.supermarktcheck.de/product/15327-golden-sun-spitzen-langkornreis-8x125g-1kg) | -39 % (Aldi) |
| Süßkartoffeln (`suesskartoffel`) | 2,29 € / 1000 g (2,29 €/kg) | 1,49 € / 1000 g (1,49 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/no-brand-suesskartoffeln-lose-000000000000230754) | -35 % (Aldi) |
| passierte Tomaten (`passata`) | 0,69 € / 500 g (1,38 €/kg) | 0,65 € / 500 g (1,30 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/king-s-crown-passierte-tomaten-500-g-000000000000263580) | -6 % (Aldi) |
| Tomatenmark (`tomatenmark`) | 0,79 € / 200 g (3,95 €/kg) | 0,89 € / 200 g (4,45 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/king-s-crown-tomatenmark-200-g-000000000000381423) | +13 % (Aldi) |
| Kidneybohnen (Dose, abgetropft 250 g) (`kidney_dose`) | 0,69 € / 250 g (2,76 €/kg) | 0,69 € / 255 g (2,71 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/king-s-crown-rote-kidney-bohnen-255-g-000000000000622583) | -2 % (Aldi) |
| Mais (Dose, abgetropft 285 g) (`mais_dose`) | 0,79 € / 285 g (2,77 €/kg) | 0,89 € / 285 g (3,12 €/kg) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/king-s-crown-sonnenmais-285-g-000000000000192131) | +13 % (Aldi) |
| Weizen-Tortillas (`tortilla`) | 1,49 € / 6 stk (0,25 €/Stk) | 1,69 € / 496g stk (0,14 €/Stk) | nicht gefunden | nicht erhoben | 29.10.2026 | [Aldi](https://www.aldi-sued.de/produkt/goldaehren-weizen-wraps-496-g-000000000000665948) | -45 % (Aldi) |
| Bananen (`banane`) | 1,39 € / 1000 g (1,39 €/kg) | nicht gefunden | nicht gefunden | nicht erhoben | – | – | – |
| Kartoffeln (`kartoffel`) | 2,49 € / 2000 g (1,25 €/kg) | nicht gefunden | nicht gefunden | nicht erhoben | – | – | – |
| Zwiebeln (`zwiebel`) | 1,29 € / 1000 g (1,29 €/kg) | nicht gefunden | nicht gefunden | nicht erhoben | – | – | – |
| Äpfel (`apfel`) | 1,99 € / 1000 g (1,99 €/kg) | nicht gefunden | nicht gefunden | nicht erhoben | – | – | – |
| Thunfisch im eigenen Saft (abgetropft 140 g) (`thunfisch`) | 1,49 € / 140 g (10,64 €/kg) | nicht gefunden | nicht gefunden | nicht erhoben | – | – | – |
| Rapsöl (`rapsoel`) | 1,99 € / 1000 ml (1,99 €/l) | nicht gefunden | nicht gefunden | nicht erhoben | – | – | – |
| Kichererbsen (Dose, abgetropft 240 g) (`kichererbsen_dose`) | 0,69 € / 240 g (2,88 €/kg) | nicht gefunden | nicht gefunden | nicht erhoben | – | – | – |

**Anmerkungen je Zutat**
- `milch`: Aldi: Milsani H-Milch 3,5 % online nicht gelistet (1,5 %: 0,85 €).
- `joghurt_becher`: Einzelbecher nur als 4er-Pack: 0,22 € je Becher.
- `skyr`: Packung bei allen 500 g, nicht 450 g.
- `eier`: Bodenhaltung bei Aldi nur 18er: 4,19 € (= 2,33 € je 10).
- `haehnchenbrust`: Aktion 1,5 kg für 12,99 € (8,66 €/kg) ab 06.11. nicht gewertet. Lidl-Preise bei supermarktcheck abgelaufen.
- `rinderhack`: 800 g: 8,79 € (10,99 €/kg).
- `gemischtes_hack`: XXL 800 g: 5,29 € (6,61 €/kg).
- `lachs`: Frisch 300 g: 5,79 € (19,30 €/kg).
- `butter`: Butterpreis ist 2025/26 stark gefallen.
- `reibekaese`: Packung 250 g statt 200 g; Vergleich über €/kg.
- `haferflocken`: Aldi: Eigenmarke online nicht gefunden (nur Marke Kölln 0,99 €). Lidl: Meldung abgelaufen. Abweichung gegen Rewe ja! (Einstiegsmarke, gleiches Preisniveau).
- `muesli`: Basismüsli (Flockenmix), Zuckerfreiheit nicht geprüft.
- `reis`: Langkornreis (nicht parboiled) 1 kg online nicht gefunden; Parboiled als Näherung.
- `kidney_dose`: Seite nennt 255 g (vermutlich Abtropfgewicht).
- `tortilla`: Unsere Packung: 6 x 40 g = 240 g. Übliche Wraps wiegen rund 60 g (8 Stück = 496 g); Vergleich über €/kg.
- `banane`: Aldi: nur Bio-Fairtrade lose 1,89 €/kg online (nicht vergleichbar). Konventionell nicht gefunden.
- `kartoffel`: Aldi Süd: Speisekartoffeln online nicht gelistet (alte Produktseite 410). Nicht gefunden.
- `zwiebel`: Aldi Süd: Zwiebel-Produktseite 410 (nicht mehr gelistet). Nicht gefunden.
- `apfel`: Nicht gefunden (Aldi-Suche ohne Treffer).
- `thunfisch`: Aldi: nur Thunfischfilets in Sonnenblumenöl 185 g 1,29 € (anderes Produkt). Im eigenen Saft nicht gefunden.
- `rapsoel`: Aldi: nur natives Rapsöl 500 ml 1,39 € (2,78 €/l, Premiumvariante). Raffiniertes Rapsöl 1 l nicht gefunden.
- `kichererbsen_dose`: Aldi: nur getrocknete Kichererbsen 500 g als Aktion. Dose nicht gefunden.

## 3. Mittlere Abweichung

| Kennzahl | Wert |
|---|---|
| Zutaten geprüft | 34 |
| davon mit vergleichbarem Preis | 26 |
| mittlere Abweichung (mit Vorzeichen) | -6,4 % |
| Median | -2,9 % |
| mittlere absolute Abweichung | 17,7 % |
| Markt ≥ 10 % teurer als Schätzung (wir zu niedrig) | 6 |
| Markt ≥ 10 % billiger als Schätzung (wir zu hoch) | 10 |
| innerhalb ± 10 % | 10 |

Bedeutung für die App: Im Mittel liegt der Wochenkorb ungefähr richtig, weil sich Über- und Unterschätzungen ausgleichen. **Fleischlastige Pläne werden aber zu billig berechnet** (Hähnchen +26 %, Hack +16 bis +32 %, Lachs +25 %). Vegetarische Pläne mit Nudeln, Butter und Wraps werden zu teuer berechnet. Für eine Abo-App, die mit „du sparst“ argumentiert, ist die Unterschätzung bei Fleisch das größere Risiko.

## 4. Ladenfaktoren (Einstiegs-Eigenmarke Vollsortimenter ÷ Discounter)

Paare, bei denen derselbe Artikeltyp beim Discounter (Aldi/Lidl) und als Einstiegsmarke bei Rewe (ja!) oder Edeka (Gut & Günstig) belegt ist:

| Zutat | Laden | Faktor |
|---|---|---|
| `skyr` | Rewe | 0,98 |
| `skyr` | Edeka | 1,22 |
| `magerquark` | Rewe | 0,83 |
| `butter` | Rewe-Gruppe (Hit) | 1,06 |
| `butter` | Edeka | 1,06 |
| `gouda` | Rewe | 1,00 |
| `gouda` | Edeka | 1,14 |
| `nudeln` | Rewe | 1,00 |

| Laden | Faktor in Stichprobe (Mittel) | n | `laeden.js` faktorEigenmarke |
|---|---|---|---|
| Rewe (ja!) | 0,97 | 5 | 1,08 |
| Edeka (Gut & Günstig) | 1,14 | 3 | 1,10 |
| Kaufland (K-Classic) | nicht belegbar (Meldungen abgelaufen) | 0 | 1,03 |
| alle Paare | Mittel 1,04, Median 1,03 | – | – |

**Einordnung:** Bei Trockenware und Molkereiprodukten (Butter, Quark, Gouda, Nudeln, Haferflocken, Skyr) folgen ja! und Gut & Günstig den Discounterpreisen fast centgenau. Das deckt sich mit dem Muster, dass die Einstiegsmarken als Preiseinstieg gegen Aldi und Lidl geführt werden. Der Faktor 1,08 bzw. 1,10 passt deshalb nur, wenn man annimmt, dass Kund:innen bei Rewe und Edeka **nicht durchgehend** die Einstiegsmarke finden oder kaufen. Das trifft bei Frischfleisch, Fisch, Obst und Gemüse zu, wo es oft nur die teurere Hausmarke (REWE Beste Wahl, EDEKA) oder Bedientheke gibt. Für diese Abteilungen hat die Stichprobe keine belastbaren Vollsortimenter-Preise.

## 5. Korrekturliste für `zutaten.py`

Automatisch abgeleitet für alle Zutaten mit belegter Abweichung von mindestens 10 %. „neu“ = Marktpreis je Einheit × unsere Packungsgröße. Wo ein Packungswechsel sinnvoller ist, steht das in der Spalte „Empfehlung“ in Abschnitt 5b.

| id | Zutat | alt | neu (rechnerisch) | Quelle | Abweichung |
|---|---|---|---|---|---|
| `joghurt_becher` | Naturjoghurt im Becher | 0,39 € | 0,22 € | Aldi | -43 % |
| `skyr` | Skyr natur | 1,39 € | 1,16 € | Aldi | -16 % |
| `haehnchenbrust` | Hähnchenbrustfilet | 8,99 € | 11,32 € | Aldi | +26 % |
| `rinderhack` | Rinderhackfleisch | 4,99 € | 5,79 € | Aldi | +16 % |
| `gemischtes_hack` | Hackfleisch gemischt | 3,79 € | 4,99 € | Aldi | +32 % |
| `lachs` | Lachsfilet | 3,99 € | 4,99 € | Aldi | +25 % |
| `butter` | Butter | 2,19 € | 1,19 € | Aldi | -46 % |
| `gouda` | Gouda in Scheiben | 2,79 € | 2,45 € | Aldi | -12 % |
| `nudeln` | Nudeln (Hartweizen) | 0,89 € | 0,69 € | Aldi | -22 % |
| `haferflocken` | Haferflocken | 0,79 € | 0,69 € | Rewe* | -13 % |
| `muesli` | Müsli ohne Zuckerzusatz | 2,29 € | 1,69 € | Aldi | -26 % |
| `parboiled` | Parboiled-Reis im Kochbeutel | 1,29 € | 0,79 € | Aldi | -39 % |
| `suesskartoffel` | Süßkartoffeln | 2,29 € | 1,49 € | Aldi | -35 % |
| `tomatenmark` | Tomatenmark | 0,79 € | 0,89 € | Aldi | +13 % |
| `mais_dose` | Mais (Dose, abgetropft 285 g) | 0,79 € | 0,89 € | Aldi | +13 % |
| `tortilla` | Weizen-Tortillas | 1,49 € | 0,82 € | Aldi | -45 % |

### 5b. Empfehlungen (gerundet, für die Übernahme)

_wird ergänzt (Stichprobe läuft)_

## 6. Korrektur Ladenfaktoren (`laeden.js`)

_wird ergänzt (Stichprobe läuft)_

## 7. Offene Punkte

_wird ergänzt (Stichprobe läuft)_
