# SEO: Keywords, Seitenstruktur und Technik für die vier Marken

Stand: 29.10.2026 · Erstellt von Claude (SEO-Rolle) · Methodik nach den Skills `seo-audit`, `programmatic-seo` und `ai-seo` (gesponserte ◆-Tools nicht verwendet)

**Kurz gesagt**
1. Nach eigenen Begriffen wie „monteurzimmer kochen“ oder „kochen auf montage“ sucht fast niemand. Google schlägt dafür nichts vor. **Zimmerherd muss über die Gerätefrage gefunden werden** („kochen ohne herd“, „essen ohne küche“, „rezepte nur mit wasserkocher“, „essen für die baustelle“) und nicht über das Wort „Montage“.
2. **Kochsatz** hat die größte Nachfrage („meal prep rezepte“, „meal prep plan“, „makros berechnen“) und auch die härteste Konkurrenz. Viele Begriffe mit Volumen drehen sich ums Abnehmen oder um Muskelaufbau. **Die nehmen wir bewusst nicht ins Ziel** (HCVO/HWG, Entscheidung R3).
3. **Zweiflammer** hat eine echte Lücke: Nach „omnia rezepte“, „wohnmobil rezepte“ und „camping rezepte gaskocher“ wird viel gesucht. Dort ranken Blogs und Buchshops, ein Planer taucht nicht auf. Mit 8 Omnia-Rezepten sind wir für eine eigene Omnia-Sammlung aber noch zu dünn.
4. **Wochenschmaus** zielt auf Begriffe mit hoher Nachfrage („wochenplan essen“, „essensplaner app“, „günstig kochen wochenplan“). Dort sind Chefkoch, REWE, Verbraucherzentrale und Choosy stark, deshalb gewinnen wir zuerst über Long-Tail-Begriffe (Budget, Personenzahl, Laden).
5. Die vorhandenen Landingpages sind technisch sauber (schlank, Alt-Texte, JSON-LD ohne erfundene Bewertungen). **Die Lücken:** Keyword fehlt in H1 und am Anfang des Titles, drei Meta-Descriptions sind zu lang, Canonical und og:image sind relativ, und es fehlen `robots.txt`, `sitemap.xml`, `llms.txt` und Text-Tiefe. Die Liste mit den konkreten Änderungen steht in **Abschnitt 6**.

---

## 1. Methode und Grenzen (bitte lesen, bevor du Zahlen weitergibst)

| Quelle | Was ich damit gemacht habe | Grenze |
|---|---|---|
| Google-Autocomplete (`suggestqueries.google.com`, hl=de, gl=de), abgerufen am 29.10.2026 | rund 180 Startbegriffe abgefragt (Rohdaten: Scratchpad `ac/*.json`) | zeigt nur, **dass** gesucht wird, nicht **wie oft** |
| Websuche (Ergebnisseiten) | geprüft, wer für Kernbegriffe rankt | Momentaufnahme, kein Ranking-Tracking |
| Google Trends | Abruf versucht, Antwort **HTTP 429 (gesperrt)** | keine Trend-Zahlen |
| Recherche `recherche/05_Wettbewerb.md`, `01_Markt_und_Zahlen.md` | Wettbewerber, Marktzahlen | – |
| Rezeptdaten `app/public/data/daten.json` | Rezepte je Gerät, Mahlzeit und Diät gezählt | Stand heute: 195 Rezepte |

**Echte Suchvolumen habe ich nicht gefunden.** Öffentlich zugängliche Quellen nennen keine absoluten deutschen Zahlen. Ein Fund: seodata.dev nennt etwa 5.400 Suchen pro Monat für „how do i meal prep“, **allerdings nur für die USA**. Für Deutschland taugt die Zahl nicht.

**So lese ich die Nachfrage (eigene Schätzlogik, kein Messwert):**
- **hoch** = Google schlägt 8–10 Verlängerungen vor, darunter viele mit Zahl, Ort oder Zielgruppe (z. B. „wochenplan essen …“ mit 10 Vorschlägen). Ein großer Kopfbegriff.
- **mittel** = 3–7 Vorschläge oder ein Kopfbegriff mit engerer Zielgruppe.
- **niedrig** = 0–2 Vorschläge. Gesucht wird trotzdem, aber selten.

**Bevor Geld fließt:** Google Search Console einrichten, sobald die Domains laufen (gratis, liefert nach 4–8 Wochen echte Impressionen). Zusätzlich lohnt der Keyword-Planer in einem Google-Ads-Konto (gratis, zeigt ohne laufende Kampagne nur Spannen). Beides steht in `FUER_DICH.md` als Aufgabe.

**Fallstricke, die die Recherche gezeigt hat**
- „Montage“ ist doppeldeutig (Küchenmontage, Reifenmontage, Grohe-Armaturen). „monteur essen“ trifft fast nur Stellenanzeigen in der **Stadt Essen**. Deshalb „Montage“ immer mit „kochen“ oder „Zimmer“ kombinieren und nie „Essen“ allein als Keyword nehmen.
- „Omnia“ ist eine fremde Marke (Omnia-Backofen). Den Namen dürfen wir beschreibend nutzen („Rezepte für den Omnia-Backofen“), aber ohne Logo und ohne Hinweis auf eine Partnerschaft. Ins Seiten-Impressum gehört der Satz „Omnia ist eine Marke ihres Inhabers, keine Verbindung zu Zweiflammer“. (Nominative Nutzung, § 23 MarkenG. Bitte im Zweifel mit `recht/` abgleichen.)
- „Makro“ ist als Markenname gesperrt (B3), **als Suchwort** („makros berechnen“) ist es kein Problem.
- Viele Fitness-Begriffe enthalten „abnehmen“, „fettabbau“ oder „kaloriendefizit“. Die sind im Ziel **gestrichen**, auch wenn sie Volumen haben (siehe 3.2).

---

## 2. Domain- und URL-Annahmen

Annahme, bis du entscheidest: **jede Marke bekommt eine eigene Domain** (`zimmerherd.de`, `kochsatz.de`, `zweiflammer.de`, `wochenschmaus.de`; laut `marke/Namen_und_Pruefung.md` am 29.10.2026 frei, aber noch nicht gekauft). Das passt zu A1 (Nischen-Absender) und zu 07 §4.4 (eigene Domain für Fitness).

**Folge für SEO:** Vier Domains bedeuten vierfachen Aufbau von Autorität. Dafür passt jede Domain thematisch genau.
**Gefahr: doppelter Inhalt.** Alle vier nutzen dieselben 195 Rezepte. Wenn jede Domain jede Rezeptseite veröffentlicht, entstehen Duplikate.
**Regel:** Jede Rezeptseite liegt **genau auf einer Domain**, nämlich der Marke, zu der das Rezept am besten passt. Vorschlag: ein neues Feld `heimat` im Rezept-JSON. Startwerte: U → Zimmerherd, O → Kochsatz, C → Zweiflammer, F → Wochenschmaus, H einzeln nach Tags (`unterkunft` → Zimmerherd, sonst Wochenschmaus). Die anderen Marken verlinken auf die Heimat-URL oder zeigen das Rezept nur im Planer, dort ohne eigene indexierbare URL. Ein Cross-Domain-Canonical ginge auch, Google behandelt ihn aber nur als Hinweis. Eine einzige echte URL ist sauberer.

URL-Muster je Domain (Unterordner, klein, Bindestriche):
```
/                      Landingpage (Haupt-Keyword)
/ratgeber/<thema>/     Ratgeber- und Sammlungsseiten (Hub)
/rezepte/<slug>/       einzelne Rezepte (nur die der eigenen Marke)
/rezepte/<geraet>/<mahlzeit>/   programmatische Sammlungen (nur wenn Regeln in 5. erfüllt)
/planer/               App (noindex, siehe 7.)
```

---

## 3. Keywords je Marke

Legende: **Intention** I = informativ (will wissen/kochen), K = kommerziell (vergleicht Lösungen), T = transaktional (will Tool/App nutzen). **Nachfrage** nach der Logik in Abschnitt 1. **Wettbewerb** = wer laut Websuche/Autocomplete vorne ist. **Seite** = Ziel-URL aus Abschnitt 4.

### 3.1 Zimmerherd (Montage, Unterkunft)

**Cluster A – Problem: kein Herd, keine Küche**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 1 | kochen ohne herd | I | hoch (10 Vorschläge) | Frauenmagazine (fuersie.de), Energie-Blogs (enbw.com), lecker.de | `/` (Landing) + `/ratgeber/kochen-ohne-herd/` |
| 2 | was kochen ohne herd | I | mittel | wie 1 | `/ratgeber/kochen-ohne-herd/` |
| 3 | kochen ohne herd und ofen | I | mittel | Rezeptportale | `/ratgeber/kochen-ohne-herd/` |
| 4 | kochen ohne herd und mikrowelle | I | mittel | schwach besetzt | `/ratgeber/rezepte-nur-wasserkocher/` |
| 5 | essen ohne herd und kühlschrank | I | mittel | schwach besetzt, Foren | `/ratgeber/essen-ohne-kuehlschrank/` |
| 6 | warmes essen ohne herd | I | mittel | Foren | `/ratgeber/kochen-ohne-herd/` |
| 7 | essen ohne küche | I | hoch (10 Vorschläge, auch „umzug“) | Ratgeber, Foren | `/ratgeber/essen-ohne-kueche/` |
| 8 | kochen ohne küche rezepte | I | mittel | Rezeptportale | `/ratgeber/essen-ohne-kueche/` |
| 9 | kochen ohne küche im hotel | I | niedrig–mittel | Foren (vielfliegertreff.de) | `/ratgeber/kochen-im-hotelzimmer/` |
| 10 | rezepte ohne herd | I | hoch | Rezeptportale, Thermomix-Seiten | `/ratgeber/kochen-ohne-herd/` |

**Cluster B – Problem: nur bestimmte Geräte**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 11 | rezepte nur mit wasserkocher | I | mittel | Regionalpresse (infranken.de, heidelberg24.de), Digistore-PDF „50 Wasserkocher-Rezepte“ (7,90 €) | `/ratgeber/rezepte-nur-wasserkocher/` |
| 12 | kochen mit wasserkocher | I | hoch | wie 11 | `/ratgeber/rezepte-nur-wasserkocher/` |
| 13 | was kann man mit wasserkocher kochen | I | mittel (Frageform) | wie 11 | `/ratgeber/rezepte-nur-wasserkocher/` (FAQ) |
| 14 | kann man im wasserkocher reis kochen | I | mittel (Frageform) | Presse | FAQ auf `/ratgeber/rezepte-nur-wasserkocher/` |
| 15 | kochen mit wasserkocher und mikrowelle | I | mittel | schwach besetzt | `/ratgeber/wasserkocher-und-mikrowelle/` |
| 16 | kochen nur mit mikrowelle | I | mittel | lecker.de, Gerätehersteller (Haier) | `/ratgeber/rezepte-nur-mikrowelle/` |
| 17 | mikrowelle rezepte | I | hoch | lecker.de, Chefkoch, Kochbücher | `/ratgeber/rezepte-nur-mikrowelle/` |
| 18 | kann man reis in der mikrowelle kochen | I | mittel (Frageform) | Ratgeber | FAQ `/ratgeber/rezepte-nur-mikrowelle/` |
| 19 | rezepte für eine herdplatte | I | niedrig–mittel | kaum passende Seiten | `/ratgeber/rezepte-eine-kochplatte/` |
| 20 | kochen ohne herdplatte | I | mittel | Ratgeber | `/ratgeber/kochen-ohne-herd/` |

**Cluster C – Problem: Kühlung, Arbeit, Pause**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 21 | essen ohne kühlschrank | I | hoch | Camping-Ratgeber, Foren | `/ratgeber/essen-ohne-kuehlschrank/` |
| 22 | lebensmittel ohne kühlschrank haltbar | I | hoch | Verbraucher- und Prepper-Seiten | `/ratgeber/essen-ohne-kuehlschrank/` |
| 23 | proteinreiche lebensmittel ohne kühlschrank | I | niedrig–mittel | kaum besetzt | `/ratgeber/essen-ohne-kuehlschrank/` (Abschnitt) |
| 24 | essen für die baustelle | I | hoch (10 Vorschläge: warm, kalt, ideen …) | Blogs, Pinterest | `/ratgeber/essen-fuer-die-baustelle/` |
| 25 | mittagessen baustelle warm | I | mittel | Blogs | `/ratgeber/essen-fuer-die-baustelle/` |
| 26 | kaltes mittagessen baustelle | I | mittel | Blogs | `/ratgeber/essen-fuer-die-baustelle/` |
| 27 | brotzeit baustelle ideen | I | niedrig | Blogs | `/ratgeber/essen-fuer-die-baustelle/` |
| 28 | thermobehälter essen rezepte | I | mittel | Kinder-/Schulseiten | `/ratgeber/essen-fuer-die-baustelle/` (Abschnitt Thermobehälter) |

**Cluster D – Situation: Montage, Hotel, Lkw**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 29 | essen auf montage | I | niedrig (3 Vorschläge) | **kein passender Inhalt gefunden** | `/` (Landing) |
| 30 | gesund essen auf montage | I | niedrig | kein passender Inhalt | `/ratgeber/essen-auf-montage/` (ohne Gesundheitsversprechen, „ausgewogen“ statt „gesund“ im Text) |
| 31 | kochen auf montage | I | niedrig (keine Verlängerung) | kein Inhalt (05: kein Buch „Kochen auf Montage“) | `/` |
| 32 | monteurzimmer kochen | I | niedrig (0 Vorschläge) | – | `/` (als Nebenbegriff) |
| 33 | essen auf montage absetzen / verpflegungspauschale montage | I | niedrig–mittel | Steuerportale | **nicht targeten** (Steuerberatung, fremdes Thema). Höchstens ein Satz mit Link auf das BMF |
| 34 | kochen im hotelzimmer (erlaubt) | I | mittel | Foren, wandernundmehr.at | `/ratgeber/kochen-im-hotelzimmer/` |
| 35 | essen im hotelzimmer zubereiten | I | mittel | Foren | `/ratgeber/kochen-im-hotelzimmer/` |
| 36 | kochen im lkw | I | niedrig | Buch „Sternköche“ (eurotransport) | später, eigener Ratgeber für Lkw (16 Rezepte mit Tag `lkw`) |

**Cluster E – Lösung**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 37 | essensplan montage / wochenplan monteur | T | niedrig (keine Verlängerung) | **keiner** | `/` |
| 38 | einkaufsliste ohne kühlschrank | T | niedrig | – | `/ratgeber/essen-ohne-kuehlschrank/` |
| 39 | essen vorkochen arbeit | I/T | niedrig | Meal-Prep-Blogs | `/ratgeber/essen-fuer-die-baustelle/` |

**Einordnung:** Die Begriffe mit „Montage“ bringen kaum Besucher, dafür sehr passende. Die Reichweite kommt aus den Clustern A–C, um die auch Studierende, Umziehende und Camper konkurrieren. Die Landingpage zielt deshalb auf „kochen ohne herd“ **plus** Montage im Title. So passt sie zur Gerätefrage und zeigt zugleich, für wen das Angebot ist.

### 3.2 Kochsatz (Fitness, Makros, Meal-Prep, Discounter)

**Bewusst NICHT im Ziel** (Volumen vorhanden, aber Abnehm- oder Muskelversprechen, HCVO/HWG/UWG, R3): „meal prep rezepte abnehmen“, „meal prep kaloriendefizit“, „makros berechnen fettabbau/abnehmen“, „ernährungsplan muskelaufbau (fettabbau)“, „meal prep muskelaufbau“, „lidl wochenplan abnehmen“. Wenn Nutzer über solche Begriffe kommen, ist das in Ordnung. Wir bauen dafür aber keine eigenen Seiten und schreiben keine Titles damit.

**Cluster A – Problem/Info: Meal-Prep**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 1 | meal prep rezepte | I | hoch | Chefkoch, Food-Blogs, Instagram/Pinterest | `/ratgeber/meal-prep-rezepte-proteinreich/` |
| 2 | meal prep rezepte proteinreich | I | hoch | Blogs, Kochbücher | `/ratgeber/meal-prep-rezepte-proteinreich/` |
| 3 | meal prep high protein | I | hoch | Blogs, Kochbücher | `/ratgeber/meal-prep-rezepte-proteinreich/` |
| 4 | meal prep proteinreich kalt | I | mittel | Blogs | Abschnitt auf 1 |
| 5 | meal prep für anfänger | I | mittel | Bücher, Blogs | `/ratgeber/meal-prep-anfaenger/` |
| 6 | meal prep 5 tage (haltbar) | I | hoch | Blogs, oft mit zu langen Haltbarkeiten | `/ratgeber/meal-prep-haltbarkeit/` |
| 7 | meal prep wie lange haltbar | I | hoch (Reis, Hähnchen, Salat …) | Blogs | `/ratgeber/meal-prep-haltbarkeit/` |
| 8 | meal prep reis wie lange haltbar | I | mittel | Blogs | Abschnitt auf 7 (FSA: höchstens 1 Tag, unsere Regel C9) |
| 9 | meal prep hähnchen wie lange haltbar | I | mittel | Blogs | Abschnitt auf 7 |
| 10 | meal prep rezepte zum einfrieren | I | mittel | Blogs | Abschnitt auf 7 |
| 11 | meal prep frühstück | I | hoch | Blogs | programmatisch `/rezepte/meal-prep/fruehstueck/` |
| 12 | meal prep rezepte arbeit | I | mittel | Blogs | `/ratgeber/meal-prep-rezepte-proteinreich/` |

**Cluster B – Problem: Budget und Discounter**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 13 | meal prep aldi / aldi meal prep plan | I/T | mittel (Treffer meist **US-Seiten in Dollar**) | Substack, Lemon8, US-Blogs. **Keine deutsche Seite mit Aldi-Preisen gefunden** | `/ratgeber/meal-prep-plan-aldi/` |
| 14 | meal prep lidl | I/T | mittel | familie.de (Dosen), Lidl-App | `/ratgeber/meal-prep-plan-lidl/` |
| 15 | meal prep günstig (rezepte) | I | mittel | Blogs | `/ratgeber/meal-prep-plan-aldi/` |
| 16 | proteinreiche rezepte günstig | I | mittel | Blogs | `/ratgeber/protein-pro-euro/` |
| 17 | high protein rezepte günstig | I | mittel | Blogs | `/ratgeber/protein-pro-euro/` |
| 18 | billige proteinquellen | I | mittel | Fitness-Blogs | `/ratgeber/protein-pro-euro/` (Tabelle Protein je € aus unseren Daten) |
| 19 | eiweißreiche günstige lebensmittel | I | niedrig–mittel | Blogs | `/ratgeber/protein-pro-euro/` |
| 20 | aldi high protein produkte | I | hoch | Verbraucherportale, Deal-Seiten | **nicht targeten** (Produkt-News, wechselt wöchentlich) |
| 21 | discounter proteinpulver test | K | mittel | Testportale | nicht targeten (kein Pulver im Angebot) |

**Cluster C – Info: Makros und Protein**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 22 | makros berechnen | I/T | hoch | Rechner-Seiten (gymkee, prommer.net, rechner-portal.de), ESN, Sjard | `/ratgeber/makros-berechnen/` mit kleinem Gratis-Rechner |
| 23 | makro rechner (kostenlos) | T | hoch | wie 22 | `/ratgeber/makros-berechnen/` |
| 24 | makronährstoffe berechnen formel | I | mittel | Rechner-Seiten | Abschnitt auf 22 |
| 25 | wie berechne ich meine makros | I | niedrig (Frageform) | wie 22 | FAQ auf 22 |
| 26 | 150 g protein am tag (beispiel, ernährungsplan) | I | hoch (6 Vorschläge) | Fitness-Blogs | `/ratgeber/150-g-protein-am-tag/` als Beispieltag aus dem Planer, ohne Wirkversprechen |
| 27 | wie viel protein am tag | I | hoch | DGE, Gesundheitsportale | **nicht targeten** (Gesundheitsthema). Höchstens ein Satz mit DGE-Wert und Link |

**Cluster D – Lösung**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 28 | meal prep plan | T | hoch (9 Vorschläge) | Pinterest, Blogs, PDF-Verkäufer (Digistore24) | `/` (Landing) |
| 29 | meal prep plan mit einkaufsliste | T | mittel | Blogs | `/` |
| 30 | meal prep wochenplan | T | hoch | Blogs | `/` |
| 31 | meal prep plan high protein | T | mittel | Blogs | `/` + Ratgeber 1 |
| 32 | meal prep plan erstellen | T | mittel | Blogs, KI-Tools | `/` |
| 33 | meal prep app (deutsch) | T | hoch | Lidl-App, Stores, mise, Eat This Much | `/` |
| 34 | meal prep planner app | T | mittel | US-Apps | `/` |
| 35 | essensplan mit makros / makro rechner meal prep | T | niedrig (0 Vorschläge) | Prospre, Strongr Fastr (EN) | `/` |
| 36 | kalorienzähler app ohne abo | K | hoch | Yazio, Fddb, MyFitnessPal | **nicht Ziel**. Wir sind kein Tracker, deshalb höchstens eine Vergleichsseite „Planer statt Tracker“ (später) |

### 3.3 Zweiflammer (Camping: Wohnmobil, Van, Wohnwagen)

**Cluster A – Problem/Info: Kochen in der Bordküche**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 1 | camping rezepte | I | hoch | lecker.de, REWE, paulcamper, camperstyle.de | `/ratgeber/camping-rezepte-einfach/` |
| 2 | camping rezepte einfach (und schnell) | I | hoch | Blogs | `/ratgeber/camping-rezepte-einfach/` |
| 3 | camping rezepte wenig zutaten | I | mittel | Blogs | Abschnitt auf 1 |
| 4 | camping rezepte gaskocher | I | mittel | Blogs, Outdoor-Shops | `/ratgeber/rezepte-gaskocher/` |
| 5 | gaskocher rezepte / campingkocher rezepte | I | mittel | Outdoor-Blogs (Trekking) | `/ratgeber/rezepte-gaskocher/` |
| 6 | one pot camping (rezepte, vegetarisch) | I | hoch (10 Vorschläge) | Kochbücher, Blogs | `/ratgeber/one-pot-camping/` |
| 7 | camping rezepte vegetarisch | I | hoch | Blogs | programmatisch `/rezepte/vegetarisch/` |
| 8 | camping rezepte familie / kinder | I | mittel | Blogs | Abschnitt auf 1 |
| 9 | camping frühstück (ohne kühlung) | I | hoch | Blogs, Shops | `/rezepte/fruehstueck/` (programmatisch) |
| 10 | camping kochen ohne kühlschrank / camping essen ohne kühlung | I | mittel | Blogs (wandernundmehr.at, utopia.de) | `/ratgeber/camping-essen-ohne-kuehlschrank/` |
| 11 | wohnmobil kochen | I | hoch | promobil.de, Kochbücher | `/` (Landing) |
| 12 | wohnmobil rezepte (pdf) | I | hoch | Buchshops, promobil.de | `/ratgeber/wohnmobil-rezepte/` |
| 13 | wohnwagen kochen rezepte | I | mittel | Blogs | `/ratgeber/wohnmobil-rezepte/` |
| 14 | vanlife rezepte / van kochen | I | niedrig | Blogs, Instagram | Abschnitt auf 12 |
| 15 | wohnmobil kochen ohne gas / mit induktion | I | mittel | Technik-Ratgeber | später (Gerät Induktion = `herd` im Planer, Hinweis genügt) |

**Cluster B – Omnia**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 16 | omnia rezepte | I | hoch | camperstyle.de, tcs.ch, Kochbücher (GU „Backofen to go“), Hersteller-Hefte | `/ratgeber/omnia-rezepte/` (**erst ab 12 eigenen Omnia-Rezepten**, heute 8) |
| 17 | omnia rezepte ohne vorkochen | I | mittel | **kein passendes Ergebnis** gefunden, also eine Lücke | Abschnitt auf 16 |
| 18 | omnia rezepte herzhaft / auflauf | I | mittel | Blogs | Abschnitt auf 16 |
| 19 | omnia brot backen | I | hoch | Blogs, Foren | späterer Ratgeber (Brot fehlt in unseren Rezepten) |
| 20 | omnia kuchen | I | hoch | Blogs | später |
| 21 | was kann man im omnia machen | I | mittel (Frageform) | Foren | FAQ auf 16 |
| 22 | omnia rezepte app | T | niedrig | kein Planer | `/` + 16 |

**Cluster C – Planung, Vorräte, Gas**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 23 | camping einkaufsliste (lebensmittel) | T | mittel | Packlisten-Blogs | `/ratgeber/camping-einkaufsliste/` |
| 24 | einkaufsliste camping wochenende / mit kindern | T | niedrig–mittel | Blogs | Abschnitt auf 23 |
| 25 | camping essensplan | T | niedrig (keine Verlängerung) | **keiner** | `/` |
| 26 | camping essen vorbereiten | I | niedrig | Blogs | `/ratgeber/camping-einkaufsliste/` |
| 27 | camping vorräte (liste) | I | niedrig | Blogs | `/ratgeber/camping-einkaufsliste/` |
| 28 | welche lebensmittel ohne kühlschrank haltbar | I | hoch | Ratgeber | `/ratgeber/camping-essen-ohne-kuehlschrank/` |
| 29 | wie lange hält eine gasflasche camping(kocher) | I | mittel (5 Vorschläge) | Camping-Shops, Foren | `/ratgeber/gas-sparen-beim-kochen/`. **Nur mit belegten Brennwerten** (Herstellerangaben), keine eigenen Verbrauchsversprechen |
| 30 | gasverbrauch wohnmobil kochen | I | niedrig | Foren | Abschnitt auf 29 |

**Cluster D – Lösung**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 31 | wohnmobil app / camping app | T | hoch, aber **gemeint sind Stellplatz-Apps** (park4night usw.) | Stellplatz-Apps | **nicht Ziel**, falsche Intention |
| 32 | wohnmobil essen ideen | I | mittel | Blogs | `/ratgeber/wohnmobil-rezepte/` |
| 33 | kochen im wohnmobil wochenplan / essensplan wohnmobil | T | niedrig | keiner | `/` |

### 3.4 Wochenschmaus (Alltag, Familie, Budget)

**Cluster A – Lösung: Planer und Vorlagen**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 1 | wochenplan essen | T/I | hoch | REWE, lecker.de, dm, Chefkoch | `/` (Landing) |
| 2 | wochenplan essen mit einkaufsliste | T | mittel | Vorlagen-Seiten | `/` |
| 3 | wochenplan essen familie | T | hoch | lecker.de, familie.de, Weight Watchers | `/ratgeber/wochenplan-familie/` |
| 4 | wochenplan essen 2 personen (günstig) | T | hoch | Blogs | programmatisch `/wochenplan/2-personen/` |
| 5 | wochenplan essen vorlage (pdf, zum ausdrucken) | T | hoch | Vorlagen-Seiten, Etsy | `/ratgeber/wochenplan-vorlage/` (druckbarer Plan aus dem Planer; PDF ist Plus, eine leere Vorlage gratis) |
| 6 | essensplaner | T | hoch | Etsy, Magnettafeln, Apps | `/` |
| 7 | essensplaner app | T | hoch | Choosy, mise, KptnCook, Store-Listen | `/` |
| 8 | essensplaner app kostenlos | T | mittel (Choosy und mise werden vorgeschlagen) | Choosy, mise | `/` + FAQ „Was ist gratis?“ |
| 9 | essensplaner mit rezepten | T | mittel | Apps | `/` |
| 10 | wochenplaner essen app | T | mittel | Apps | `/` |
| 11 | essensplan erstellen | T | hoch (auch „ki“, „online“) | KI-Tools, Vorlagen | `/ratgeber/essensplan-erstellen/` |
| 12 | menüplan erstellen | T | mittel | Vorlagen | `/ratgeber/essensplan-erstellen/` |
| 13 | mahlzeiten planen app | T | mittel | Yazio, Apps | `/` |

**Cluster B – Problem: Geld**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 14 | günstig kochen wochenplan | T/I | hoch (1 Person, 2 Personen, Familie) | Blogs, Chefkoch | `/ratgeber/guenstig-kochen-wochenplan/` |
| 15 | günstig kochen rezepte unter 5 euro | I | mittel | Blogs | Abschnitt auf 14 |
| 16 | günstige rezepte für die ganze woche | I | mittel | Blogs | `/ratgeber/guenstig-kochen-wochenplan/` |
| 17 | günstige rezepte familie | I | hoch | Chefkoch, Weight Watchers | `/ratgeber/wochenplan-familie/` |
| 18 | billig kochen für familie / 4 personen | I | mittel | Blogs | `/ratgeber/wochenplan-familie/` |
| 19 | wochenplan aldi (essen, rezepte) | T | mittel (Aldi-Süd-Wochenplan der Tafel u. ä. mischen sich hinein) | Aldi-eigene Rezeptseiten | programmatisch `/wochenplan/aldi/` |
| 20 | lidl wochenplan rezepte | T | mittel | Lidl-Kochen | `/wochenplan/lidl/` |
| 21 | wie viel geld für essen pro woche (1, 2, 4 personen) | I | hoch (8 Vorschläge) | Finanzportale, Destatis-Zitate | `/ratgeber/was-kostet-essen-pro-woche/` mit Destatis-Zahlen **und** unseren Planer-Schätzungen, klar getrennt |
| 22 | lebensmittelkosten pro monat (1 person, 4-köpfige familie) | I | hoch | Finanzportale | `/ratgeber/was-kostet-essen-pro-woche/` |
| 23 | essen für 50 euro die woche | I | niedrig | Blogs | programmatisch `/wochenplan/50-euro/` (nur wenn ein Plan das wirklich schafft) |
| 24 | einkaufsliste für eine woche (1, 2, 4 personen) | T | hoch | Blogs, Vorlagen | `/wochenplan/2-personen/` usw. |

**Cluster C – Problem: Alltag, Ideen, Ernährungsform**
| # | Keyword | Int. | Nachfrage | Wettbewerb | Seite |
|---|---|---|---|---|---|
| 25 | was koche ich diese woche | I | hoch (10 Vorschläge) | Chefkoch, Rezeptportale | `/ratgeber/was-koche-ich-diese-woche/` (mit Gratis-Tagesplan als Antwort) |
| 26 | was koche ich heute (schnell und einfach) | I | hoch | Chefkoch, Zufallsgeneratoren | Abschnitt auf 25 |
| 27 | familienessen schnell (und einfach) | I | hoch | Blogs | `/rezepte/familie/schnell/` (programmatisch) |
| 28 | wochenplan essen kinder | I | hoch | Kita- und Elternseiten | **Vorsicht:** Kleinkind ist DURCHSCHICHT/Honigmama-Gebiet (A2). Nur „Familie mit Schulkindern“ |
| 29 | vegetarischer wochenplan (familie, günstig) | T | hoch | REWE, Blogs | `/wochenplan/vegetarisch/` |
| 30 | glutenfrei wochenplan | T | niedrig–mittel | Fachseiten | `/wochenplan/ohne-gluten/` (68 Rezepte ohne Gluten-Kennzeichnung). **Hinweis:** kein Ersatz für Zöliakie-Diät, Spuren nicht geprüft |
| 31 | resteverwertung rezepte (zutaten eingeben) | I/T | hoch | Chefkoch, Apps | später, braucht Funktion „Zutaten eingeben“ |
| 32 | wochenplan essen günstig und gesund | T | mittel | Blogs | `/ratgeber/guenstig-kochen-wochenplan/`. „Ausgewogen“ statt „gesund“ |

---

## 4. Seitenstruktur je Marke

Alle Zahlen sind am 29.10.2026 aus `app/public/data/daten.json` gezählt, nach derselben Regel wie `tools/landing.py` (Gerät **und** Lagerung). Auf den Seiten werden sie per Skript eingesetzt, nie von Hand. Ändern sich die Rezepte, ändern sich auch die Zahlen.

Für jede Ratgeberseite gilt dasselbe Grundgerüst (es dient Menschen und hilft AI-Suchsystemen, Passagen zu zitieren, siehe 7.4):
1. **Antwort zuerst:** 2–3 Sätze (40–60 Wörter) beantworten die Suchfrage direkt.
2. **Tabelle oder Liste** mit echten Rezepten aus der Datenbank (Foto, Zeit, Geräte, Lagerhinweis).
3. **Praxisteil** mit Wissen, das es woanders kaum gibt: Lagerregeln nach BfR, FSA und USDA, teils strenger (unsere Tabelle C9), Gerätekniffe, Einkauf.
4. **FAQ** (3–5 Fragen aus Autocomplete-Frageformen).
5. **CTA:** „Mit deiner Ausstattung einen Tag gratis planen“, mit Link `/planer/?v=…` und vorausgefüllten Geräten.
6. Datum „Zuletzt geprüft“ und Autor oder Prüfer mit Namen (E-E-A-T). Quellen (BfR, BLS 4.0) verlinken.

### 4.1 Zimmerherd

**Landingpage `/`**
- Haupt-Keyword: **kochen ohne herd** (Nebenbegriffe: essen auf montage, monteurzimmer kochen, essensplan montage)
- Title (53 Zeichen): `Kochen ohne Herd auf Montage: Wochenplan | Zimmerherd`
- Meta (150 Zeichen): `Wasserkocher, Mikrowelle oder eine Kochplatte: Zimmerherd plant deine Woche im Monteurzimmer, mit Einkaufsliste und Kostenschätzung. Tagesplan gratis.`
- H1: `Kochen ohne Herd: dein Wochenplan fürs Monteurzimmer` (Claim „Was steht im Zimmer?“ als Dachzeile darüber, nicht als H1)
- H2-Gliederung:
  1. Was steht in deinem Zimmer? (Zimmer-Check, live gezählt)
  2. Kochen auf Montage: die drei typischen Probleme
  3. So entsteht dein Wochenplan
  4. 59 Rezepte mit Wasserkocher, Mikrowelle und Kühlschrank (Beispiele)
  5. Ohne Kühlschrank: was ungekühlt sicher bleibt
  6. Preise und Montage-Pass
  7. Häufige Fragen

**Ratgeber und Sammlungen (7)**
| URL | Haupt-Keyword | Arbeitstitel H1 | Rezepte heute |
|---|---|---|---|
| `/ratgeber/kochen-ohne-herd/` | kochen ohne herd (rezepte) | Kochen ohne Herd: was geht, was nicht, und 59 Rezepte | 59 (Wasserkocher + Mikrowelle + Kühlschrank) |
| `/ratgeber/rezepte-nur-wasserkocher/` | rezepte nur mit wasserkocher | 47 Rezepte nur mit Wasserkocher | 47 (16 Frühstück, 21 Mittag, 13 Abend, 15 Snack) |
| `/ratgeber/rezepte-nur-mikrowelle/` | kochen nur mit mikrowelle | 56 Rezepte nur mit Mikrowelle | 56 |
| `/ratgeber/rezepte-eine-kochplatte/` | rezepte für eine herdplatte | Eine Kochplatte, ein Topf: 66 Rezepte | 66 (mit Pfanne: 95) |
| `/ratgeber/essen-ohne-kuehlschrank/` | essen ohne kühlschrank | Essen ohne Kühlschrank: was hält, was nicht | 38 mit Wasserkocher + Mikrowelle, 18 ganz ohne Gerät |
| `/ratgeber/essen-fuer-die-baustelle/` | essen für die baustelle | Essen für die Baustelle: warm, kalt, vorgekocht | 69 mit Tag `box`, 100 kalt essbar |
| `/ratgeber/kochen-im-hotelzimmer/` | kochen im hotelzimmer | Kochen im Hotelzimmer: erlaubt? Und was geht? | Auswahl aus 59. Rechtlicher Teil: Hausordnung gilt, keine Rechtsberatung |

Später: `/ratgeber/kochen-im-lkw/` (16 Rezepte mit Tag `lkw`), `/ratgeber/wasserkocher-und-mikrowelle/`.

### 4.2 Kochsatz

**Landingpage `/`**
- Haupt-Keyword: **meal prep plan** (Nebenbegriffe: meal prep wochenplan, meal prep plan mit einkaufsliste, meal prep app)
- Title (55): `Meal-Prep-Plan nach Makros mit Einkaufsliste | Kochsatz`
- Meta (142): `Makros, Discounter und Budget eingeben: Kochsatz plant dein Meal-Prep mit zwei Kochtagen, Einkaufsliste und Boxen mit Datum. Tagesplan gratis.`
- H1: `Dein Meal-Prep-Plan nach Makros, vom Discounter`
- H2:
  1. Protein pro Euro bei deinem Laden (Tabelle)
  2. Meal-Prep nach Plan: zwei Kochtage, Boxen mit Datum
  3. So rechnet Kochsatz deine Portionen (Methode, BLS 4.0, Testläufe 94–100 % Protein im Wochenschnitt)
  4. 80 Rezepte mit mindestens 30 g Protein je Portion
  5. Wie lange hält Meal-Prep? Unsere Lagerregeln
  6. Preise
  7. Häufige Fragen

**Ratgeber (8)**
| URL | Haupt-Keyword | H1 | Daten heute |
|---|---|---|---|
| `/ratgeber/meal-prep-plan-aldi/` | aldi meal prep plan | Meal-Prep-Plan mit Aldi: eine Woche, Einkaufsliste, Kosten | Plan aus dem Planer (Laden Aldi), Kosten als Schätzung mit Datum |
| `/ratgeber/meal-prep-plan-lidl/` | meal prep lidl | Meal-Prep mit Lidl: Wochenplan und Einkaufsliste | wie oben, Laden Lidl. **Eigener Plan**, kein Kopie-Text |
| `/ratgeber/meal-prep-rezepte-proteinreich/` | meal prep rezepte proteinreich | 43 proteinreiche Meal-Prep-Rezepte | 43 (Meal-Prep und ≥ 30 g Protein, ≥ 20 % Energie aus Protein) |
| `/ratgeber/meal-prep-haltbarkeit/` | meal prep wie lange haltbar | Wie lange hält Meal-Prep? Reis, Hähnchen, Salat | Regeln C9 + Quellen BfR, FSA, USDA. 50 einfrierbare Meal-Prep-Rezepte |
| `/ratgeber/protein-pro-euro/` | billige proteinquellen | Protein pro Euro: günstige Eiweißquellen im Discounter | Tabelle aus `zutaten.py` (Grundpreis + BLS), Stand-Datum |
| `/ratgeber/makros-berechnen/` | makros berechnen | Makros berechnen: Formel, Beispiel, Rechner | kleiner Rechner (Mifflin-St Jeor, offen erklärt), Ergebnis → Planer. Kein Abnehmziel als Voreinstellung |
| `/ratgeber/150-g-protein-am-tag/` | 150g protein am tag beispiel | 150 g Protein am Tag: ein Beispieltag vom Discounter | ein Planer-Tag mit Nährwerten und Kosten. Kein Wirkversprechen |
| `/ratgeber/meal-prep-anfaenger/` | meal prep für anfänger | Meal-Prep für Anfänger: der erste Kochtag Schritt für Schritt | Vorkoch-Ablauf aus dem Planer |

### 4.3 Zweiflammer

**Landingpage `/`**
- Haupt-Keyword: **wohnmobil kochen** (Nebenbegriffe: camping essensplan, kochen im wohnmobil, wohnwagen kochen)
- Title (59): `Kochen im Wohnmobil: Essensplan für 2 Flammen | Zweiflammer`
- Meta (135): `Wohnmobil, Van oder Wohnwagen: Flammen, Omnia und Kühlbox ankreuzen, Wochenplan und Einkaufsliste für die Tour bekommen. Läuft offline.`
- H1: `Kochen im Wohnmobil: der Wochenplan für deine Bordküche`
- H2:
  1. Bordküchen-Check: was hast du an Bord?
  2. 107 Rezepte für zwei Flammen, Omnia und Kühlbox
  3. Eine Flamme, ein Topf: 95 Rezepte
  4. Weniger Kühlschrank-Tetris: was ungekühlt mitfährt
  5. Einkaufsliste vor der Abfahrt
  6. Offline auf dem Stellplatz
  7. Saison-Pass und Preise
  8. Häufige Fragen

**Ratgeber und Sammlungen (7)**
| URL | Haupt-Keyword | H1 | Rezepte heute |
|---|---|---|---|
| `/ratgeber/camping-rezepte-einfach/` | camping rezepte einfach | Einfache Camping-Rezepte für zwei Flammen | 107 möglich, Auswahl 30 mit Tag `camping` |
| `/ratgeber/rezepte-gaskocher/` | camping rezepte gaskocher | Rezepte für den Gaskocher: mit einer Flamme | 95 (1 Flamme + Topf + Pfanne + Kühlung), 29 ohne Kühlung |
| `/ratgeber/one-pot-camping/` | one pot camping rezepte | One-Pot beim Camping: ein Topf, wenig Abwasch | 23 mit Tag `wenig_abwasch` (**prüfen**, ob wirklich ein Topf. Erst ab 15 echten One-Pot-Rezepten veröffentlichen) |
| `/ratgeber/camping-essen-ohne-kuehlschrank/` | camping essen ohne kühlschrank | Camping ohne Kühlschrank: Vorräte und Rezepte | 41 (2 Flammen, Omnia, Wasserkocher, ohne Kühlung) |
| `/ratgeber/camping-einkaufsliste/` | camping einkaufsliste lebensmittel | Camping-Einkaufsliste für eine Woche | Beispiel-Einkaufsliste aus dem Planer, 2 Personen, 7 Tage |
| `/ratgeber/wohnmobil-rezepte/` | wohnmobil rezepte | Wohnmobil-Rezepte: Frühstück bis Abendessen | 107, gegliedert nach Mahlzeit |
| `/ratgeber/omnia-rezepte/` | omnia rezepte | Omnia-Rezepte ohne Vorkochen | **heute 8, gesperrt bis mindestens 12**, Ziel 20 (Lücke „ohne vorkochen“) |

Später: `/ratgeber/gas-sparen-beim-kochen/` (10 Rezepte mit Tag `gas_sparen`, Verbrauchswerte nur aus Herstellerangaben), Grillseite (heute 6 Rezepte, zu wenig).

### 4.4 Wochenschmaus

**Landingpage `/`**
- Haupt-Keyword: **wochenplan essen** (Nebenbegriffe: essensplaner app, wochenplan essen mit einkaufsliste, essensplaner woche)
- Title (50): `Wochenplan Essen mit Einkaufsliste | Wochenschmaus`
- Meta (143): `Wochenplan nach Budget, Laden, Personen und Allergien, mit Einkaufsliste nach Abteilungen und geschätzten Kosten. Ohne Konto, Tagesplan gratis.`
- H1: `Wochenplan fürs Essen, mit Einkaufsliste und Budget`
- H2:
  1. Was geht mit meiner Küche? (Check)
  2. Die Frage um 17:30 Uhr, einmal pro Woche beantwortet
  3. Ganze Packungen, geschätzte Kosten
  4. Allergien und Abneigungen raus aus dem Plan
  5. 195 Rezepte mit Foto, 71 für 4 Portionen
  6. Essensplaner-App ohne Konto: was gratis ist
  7. Preise
  8. Häufige Fragen

**Ratgeber und Sammlungen (8)**
| URL | Haupt-Keyword | H1 | Daten heute |
|---|---|---|---|
| `/ratgeber/wochenplan-familie/` | wochenplan essen familie | Wochenplan für die Familie: 7 Tage mit Einkaufsliste | 71 Rezepte für 4 Portionen, 48 mit Tag `familie` |
| `/ratgeber/guenstig-kochen-wochenplan/` | günstig kochen wochenplan | Günstig kochen: Wochenplan mit Kosten pro Portion | 107 mit Tag `guenstig` (≤ 1,50 €/Portion geschätzt) |
| `/ratgeber/was-kostet-essen-pro-woche/` | wie viel geld für essen pro woche | Was kostet Essen pro Woche? 1, 2 und 4 Personen | amtliche Zahlen (Destatis, Laufende Wirtschaftsrechnungen, mit Jahr) **getrennt** von Planer-Schätzungen |
| `/ratgeber/was-koche-ich-diese-woche/` | was koche ich diese woche | Was koche ich diese Woche? 7 Ideen und ein Plan | wöchentlich neu erzeugter Beispielplan (Datum sichtbar) |
| `/ratgeber/essensplan-erstellen/` | essensplan erstellen | Essensplan erstellen in 4 Schritten | Anleitung + Planer |
| `/ratgeber/wochenplan-vorlage/` | wochenplan essen vorlage pdf | Wochenplan-Vorlage zum Ausdrucken | leere Vorlage gratis (PDF), ausgefüllt aus dem Planer = Plus |
| `/ratgeber/vegetarischer-wochenplan/` | vegetarischer wochenplan | Vegetarischer Wochenplan, auch günstig | 112 vegetarisch, davon 81 günstig |
| `/ratgeber/essensplaner-app-vergleich/` | essensplaner app (test) | Essensplaner-Apps im Vergleich | neutrale Tabelle aus `recherche/05` (Preise mit Datum und Quelle). Wochenschmaus fair einordnen, keine erfundenen Testsiege |

---

## 5. Programmatische Seiten (Vorlagen × Daten)

Playbooks nach `programmatic-seo`: **Curation** (Rezepte nach Gerät × Mahlzeit) und **Personas/Conversions** (Wochenplan × Laden × Budget × Personen). Unser Datenschatz ist eigen (Rezepte, Lagerregeln, Preistabelle, BLS-Nährwerte), und das ist die stärkste Stufe in der Daten-Hierarchie des Skills.

### 5.1 Muster und Mengen

| Muster | URL | Marke | Variablen | Kandidaten | davon heute veröffentlichbar* |
|---|---|---|---|---|---|
| Rezepte nach Gerät × Mahlzeit | `/rezepte/<geraet>/<mahlzeit>/` | Zimmerherd, Zweiflammer, Kochsatz (Airfryer) | Wasserkocher, Mikrowelle, 1 Kochplatte, 2 Flammen, Airfryer, ohne Gerät × Frühstück, Mittag, Abend, Snack | 24 | ca. 17 (siehe 5.3) |
| Wochenplan × Laden × Budget | `/wochenplan/<laden>-<budget>-euro/` | Wochenschmaus, Kochsatz | Aldi, Lidl, Netto, Penny, Kaufland, Rewe, Edeka × 30/50/70/100 € × 1/2/4 Personen | 84 | **nur die, bei denen der Planer das Budget wirklich schafft**, geschätzt 10–20 |
| Wochenplan × Personen | `/wochenplan/<n>-personen/` | Wochenschmaus | 1, 2, 4 | 3 | 3 |
| Wochenplan × Ernährungsform | `/wochenplan/<form>/` | Wochenschmaus | vegetarisch (112), vegan (44), ohne Gluten (68), ohne Milch (93), ohne Schwein (179) | 5 | 5 (vegan knapp, siehe Regel 4) |
| Meal-Prep × Laden | `/meal-prep/<laden>/` | Kochsatz | 7 Läden | 7 | 2 zum Start (Aldi, Lidl) |

\* Veröffentlichbar heißt: Die Regeln in 5.2 sind erfüllt.

**Matrix Gerät × Mahlzeit (Rezepte, gezählt mit Kühlschrank)**
| Gerät | Frühstück | Mittag | Abend | Snack |
|---|---|---|---|---|
| nur Wasserkocher | 16 | 21 | 13 | 15 |
| nur Mikrowelle | 19 | 27 | 20 | 15 |
| Wasserkocher + Mikrowelle | 19 | 30 | 22 | 15 |
| 1 Kochplatte + Topf + Pfanne | 24 | 57 | 59 | 15 |
| 2 Flammen + Omnia | 26 | 65 | 67 | 18 |
| Airfryer (als ein Weg) | 4 | 39 | 46 | 3 |
| ohne Gerät | 13 | 9 | 3 | 13 |

### 5.2 Regeln gegen Thin Content und Doorway-Seiten

1. **Mindestmenge:** Eine Sammlungsseite erscheint erst ab **12 passenden Rezepten**, eine Seite mit Wochenplan nur, wenn der Planer für diese Kombination einen **vollständigen 7-Tage-Plan** ohne Regelverstoß erzeugt. Darunter: keine Seite, keine URL. Kein `noindex`-Friedhof.
2. **Eigener Text je Seite:** mindestens 150 Wörter, die **aus den Daten** entstehen und sich wirklich unterscheiden, z. B. „Mit Wasserkocher allein gelingt kein Abendessen mit Fleisch, weil …“, die häufigsten Zutaten, die Spanne der Zubereitungszeit, die Lagerhinweise dieser Auswahl, Kosten von–bis. Ein Satz, in dem nur das Gerät ausgetauscht wird, zählt nicht.
3. **Überschneidung messen:** Haben zwei Seiten mehr als 70 % gleiche Rezepte (z. B. „Wasserkocher“ und „Wasserkocher + Mikrowelle“ beim Frühstück: 16 von 19), wird nur die größere veröffentlicht. Die kleinere wird ein Filter-Abschnitt darin.
4. **Ein Keyword, eine Seite:** keine zweite Seite für Synonyme („rezepte ohne herd“ und „kochen ohne herd“ landen auf **einer** URL).
5. **Ehrliche Kosten:** Jede Kostenangabe heißt „geschätzt“, nennt Datum und Laden und verlinkt auf die Methode (`/ratgeber/so-schaetzen-wir-preise/`). Kein Budget-Versprechen im Title, wenn der Plan es nur mit Glück schafft.
6. **Keine Seiten für Läden ohne eigene Preisdaten.** Wenn der Ladenfaktor nur geschätzt ist, steht das auf der Seite. Läden ohne Stichprobe (`recherche/09`) zunächst weglassen.
7. **Aktualität:** Wochenpläne mit Preisen bekommen „Stand: Monat Jahr“ und werden beim Bauen neu erzeugt. Fällt eine Seite unter Regel 1, wird ihre URL mit 301 auf die Hub-Seite umgeleitet.
8. **Interne Links:** Hub (Ratgeber) → Spokes (programmatische Seiten) → einzelne Rezepte. Jede Seite hat Breadcrumbs (mit `BreadcrumbList`) und 3–6 Querverweise auf Nachbarn (gleiches Gerät, andere Mahlzeit). Keine Waisen-Seiten.
9. **Start klein:** zuerst 10–15 programmatische Seiten. Nach 8 Wochen in der Search Console prüfen: Indexierungsquote und Impressionen. Erst dann ausbauen.

### 5.3 Startliste programmatisch (Vorschlag)

- Zimmerherd: `/rezepte/wasserkocher/fruehstueck/` (16), `/rezepte/wasserkocher/mittag/` (21), `/rezepte/wasserkocher/abend/` (13), `/rezepte/wasserkocher/snack/` (15), `/rezepte/mikrowelle/mittag/` (27), `/rezepte/mikrowelle/abend/` (20), `/rezepte/mikrowelle/fruehstueck/` (19), `/rezepte/eine-kochplatte/mittag/` (57), `/rezepte/eine-kochplatte/abend/` (59), `/rezepte/ohne-geraet/fruehstueck/` (13), `/rezepte/ohne-geraet/snack/` (13)
- Zweiflammer: `/rezepte/zwei-flammen/fruehstueck/` (26), `/rezepte/zwei-flammen/abend/` (67) – plus die Ratgeber aus 4.3
- Kochsatz: `/rezepte/airfryer/abend/` (46), `/meal-prep/aldi/`, `/meal-prep/lidl/`
- Wochenschmaus: `/wochenplan/2-personen/`, `/wochenplan/4-personen/`, `/wochenplan/vegetarisch/`, `/wochenplan/aldi-50-euro/` (**nur wenn der Plan es schafft**, für 1 Person prüfen)

**Vorlage Title/Meta (programmatisch)**
- Rezepte: `{n} Rezepte nur mit {Gerät}: {Mahlzeit} | {Marke}` · Meta: `{n} {Mahlzeit}-Rezepte, die nur {Gerät} brauchen. Mit Zeit, Lagerhinweis und Einkaufsliste. Einen Tag damit gratis planen.` (Länge im Build prüfen, ≤ 60/155)
- Wochenplan: `Wochenplan {Laden} für {Budget} €: {Personen} | {Marke}` · Meta: `7 Tage, Einkaufsliste für {Laden}, geschätzt {Kosten} € für {Personen}. Stand {Monat}. Mit deinen Allergien und Geräten neu planen.`

---

## 6. Abgleich mit den vorhandenen Landingpages (konkrete Änderungen)

Geprüft: `app/public/{montage,fitness,camping,alltag}.html`, erzeugt aus `app/tools/landing.py`, am 29.10.2026.

### 6.1 Ist-Stand

| Seite | Title heute (Zeichen) | Meta heute (Zeichen) | H1 heute | Befund |
|---|---|---|---|---|
| montage | „Zimmerherd – Essensplan für Monteure im Monteurzimmer“ (53) | 166 ❌ zu lang | „Was steht im Zimmer?“ | Marke steht vorn und das Keyword fehlt. „Monteurzimmer“ wird kaum gesucht |
| fitness | „Kochsatz – Meal-Prep-Plan nach Makros vom Discounter“ (52) | 161 ❌ | „Deine Makros. Dein Discounter. Dein Plan.“ | Keyword vorhanden, aber hinter der Marke. H1 ohne „Meal-Prep“ |
| camping | „Zweiflammer – Wochenplan für die Bordküche im Wohnmobil“ (55) | 183 ❌ | „Kochen, wie dein Camper es kann.“ | „Bordküche“ wird kaum gesucht, „Wohnmobil kochen“ dagegen oft |
| alltag | „Wochenschmaus – Wochenplan mit Einkaufsliste nach Budget“ (56) | 157 ⚠️ knapp drüber | „Die Woche ist geplant. Der Einkauf auch.“ | „Wochenplan“ ohne „Essen“. Gesucht wird „wochenplan essen“ |

**Was schon gut ist:** `lang="de"`, eine H1 pro Seite, alle Bilder mit `alt` (Hero absichtlich leer, Rezeptbilder mit Titel), `width`/`height` gegen Layout-Verschiebung, `loading="lazy"`, Hero mit `preload` + `fetchpriority`, nur eine CSS-Datei, Seiten rund 9 KB, JSON-LD `SoftwareApplication` **ohne** `aggregateRating`, Zahlen per Skript aus den Daten, FAQ als HTML **und** JSON-LD identisch.

### 6.2 Änderungen in `app/tools/landing.py`

| # | Wo | Änderung | Warum |
|---|---|---|---|
| 1 | `VARIANTEN[*]["titel"]` | Titles aus 4.1–4.4 übernehmen (Keyword vorn, Marke hinten mit „\|“) | Keyword nah am Anfang, Marke wird so nicht abgeschnitten |
| 2 | `VARIANTEN[*]["beschreibung"]` | Metas aus 4.1–4.4 übernehmen (135–150 Zeichen). Zahlen dürfen bleiben, wenn die Länge passt. Montage z. B.: „Wasserkocher, Mikrowelle oder Kochplatte: Zimmerherd plant deine Woche im Monteurzimmer. {N_MIKRO_WK} Rezepte ohne Herd, mit Einkaufsliste.“ | drei von vier sind zu lang und werden abgeschnitten |
| 3 | Build-Prüfung | am Ende von `landing.py`: `assert len(titel) <= 60 and len(beschreibung) <= 155` | damit Zahlenwechsel die Länge nicht still sprengen |
| 4 | `h1` | H1 = Keyword-Satz aus 4.x. Den bisherigen Claim als `<p class="dachzeile">` **über** die H1 | Claim bleibt sichtbar, die H1 trägt das Suchwort |
| 5 | H2 „Kennst du das?“, „So geht's“, „Was drin ist“, „Fragen“ | beschreibende H2 aus 4.x, z. B. „Kochen auf Montage: die drei typischen Probleme“, „Häufige Fragen zu Zimmerherd“ | H2 als Antwort-Anker für Google und AI-Suche |
| 6 | `KOPF`: `<link rel="canonical" href="{datei}">` | **absolute** URL: `https://zimmerherd.de/` (Landing liegt dann unter `/`, nicht `montage.html`) | relative Canonicals sind fehleranfällig, sobald die Domains stehen |
| 7 | `KOPF`: `og:image` | absolute URL, dazu `og:url`, `og:type="website"`, `og:locale="de_DE"`, `og:site_name` = Markenname, `twitter:card="summary_large_image"` | relative og:image wird von Messengern und Social oft nicht geladen |
| 8 | `faq_ld()` → `SoftwareApplication` | ergänzen: `url`, `description` (= Meta), `inLanguage: "de"`, `image`, `publisher` (`Organization` Tellerkontor mit Impressum-Adresse), weitere `offers` für Plus Monat/Jahr und Pass mit echten Preisen aus `CONFIG.preise`. `applicationCategory` kann bleiben. **Weiterhin kein `aggregateRating`.** | vollständige, wahre Entität. Google zeigt für SoftwareApplication ohne Bewertungen kein Rich Result, das ist in Ordnung |
| 9 | `FAQPage` | bleibt. Erwartung: Google zeigt FAQ-Rich-Results seit 2023 fast nur noch Behörden- und Gesundheitsseiten, also **kein Sternchen-Effekt**. Das Markup hilft trotzdem beim Verständnis durch Bing, ChatGPT und Perplexity | ehrliche Erwartung |
| 10 | FAQ-Inhalt | je Marke 5 Fragen aus Abschnitt 8 (heute 4) | mehr Suchfragen abdecken |
| 11 | Text-Tiefe | je Landing 700–1.000 Wörter sichtbarer Text (heute gezählt 398–454, inklusive Fußzeile und Navigation): Absatz „Für wen ist das?“, Methode (BLS, BfR, Preisschätzung) mit Quellenlinks, Beispiel-Tagesplan als HTML-Tabelle | heute zu dünn, um gegen Ratgeber-Seiten zu ranken |
| 12 | Fußzeile „Weitere Planer“ | Links zwischen den Marken behalten, aber **nicht auf jeder Ratgeberseite**, nur auf Landing und Impressum | vier Domains, die sich überall gegenseitig verlinken, wirken wie ein Linknetz |
| 13 | Links mit `?v=` (preise, impressum …) | auf eigenen Domains wird `?v=` überflüssig. Bis dahin: Rechtsseiten mit `<link rel="canonical">` auf die Version ohne Parameter, `kuendigen`/`widerrufen` mit `noindex` | doppelte URLs vermeiden |
| 14 | Montage-Text „{N_MIKRO_WK} Rezepte gehen schon ohne Herd“ | ergänzen: „mit Wasserkocher, Mikrowelle und Kühlschrank“ | ohne Kühlschrank sind es 38, die Aussage muss genau sein (UWG) |
| 15 | Camping-Meta „Kühlbox“ | Zahl 107 gilt mit Kühlung. Ohne Kühlung 41. In der Meta „mit Kühlbox“ stehen lassen, in der FAQ beide Zahlen | Genauigkeit |
| 16 | Startseite `index.html` (Dachmarke) | `noindex` **nicht** nötig, aber `ld="{}"` durch `Organization` ersetzen. Title ok (46) | Entität Tellerkontor |
| 17 | `planer.html` | `<meta name="robots" content="noindex, follow">` | App-Zustände sind keine Suchseiten |


---

## 7. Technische SEO-Checkliste für die statische PWA

Reihenfolge nach `seo-audit`: zuerst Crawling und Indexierung, dann Technik, dann Inhalt.

### 7.1 Crawling, Indexierung, URLs
- [ ] **Je Domain HTTPS**, eine Variante (ohne `www`), `http`→`https` und `www`→ ohne per 301. HSTS-Header.
- [ ] **Schöne URLs:** jede Seite als Ordner mit `index.html` (`/ratgeber/kochen-ohne-herd/index.html`). Ein Schrägstrich-Stil überall: mit Slash am Ende. Kleinbuchstaben, ä→ae, ö→oe, ü→ue, ß→ss.
- [ ] **`robots.txt`** je Domain (Vorschlag):
  ```
  User-agent: *
  Allow: /
  Disallow: /planer/
  Sitemap: https://zimmerherd.de/sitemap.xml
  ```
  Ein Wildcard-Block für alle Bots (Empfehlung `ai-seo`). Ob Trainings-Crawler (`GPTBot`, `ClaudeBot`, `Google-Extended`, `meta-externalagent`) ausgesperrt werden, **entscheidest du**. Das Aussperren verhindert keine Zitate durch Such-Bots (`OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`). Standardvorschlag: alles erlauben.
- [ ] **`/planer/`** zusätzlich `<meta name="robots" content="noindex, follow">`. Disallow allein entfernt nichts aus dem Index, deshalb beides. Achtung: Ein Disallow verhindert, dass Google das noindex liest. Wenn der Planer schon indexiert ist: erst noindex, Disallow später.
- [ ] **`sitemap.xml`** im Build (`tools/landing.py` oder eigenes `tools/sitemap.py`) erzeugen: nur kanonische, indexierbare 200-URLs, `lastmod` = echtes Änderungsdatum. Getrennt nach Typ, wenn es mehr wird (`sitemap-ratgeber.xml`, `sitemap-rezepte.xml`) unter einem Sitemap-Index. Rechtsseiten (Impressum, Datenschutz, AGB) dürfen drin sein, `kuendigen`/`widerrufen` nicht.
- [ ] **Canonical** absolut und selbstreferenzierend auf jeder Seite.
- [ ] **Keine Parameter-URLs im Index** (`?v=` fällt mit eigenen Domains weg, siehe 6.2 Nr. 13).
- [ ] **404-Seite** mit Links auf Landing und Ratgeber, echter Status 404 (nicht 200).
- [ ] **Search Console** je Domain (Domain-Property per DNS), Sitemap einreichen. **Bing Webmaster Tools** ebenso (Import aus der GSC geht), dazu **IndexNow** (gratis, eine Schlüsseldatei plus Ping beim Deploy). Bing ist die Basis für Copilot und Teile der ChatGPT-Suche.
- [ ] **hreflang: nicht nötig.** Nur Deutsch, ein Markt (DE, AT und CH lesen dieselbe Seite). `<html lang="de">` reicht und ist schon da.

### 7.2 Strukturierte Daten (JSON-LD, nur wahre Angaben)

| Seitentyp | Schema | Pflicht-/Kernfelder | Was wir **nicht** tun |
|---|---|---|---|
| Landing | `SoftwareApplication` (oder `WebApplication`) + `Organization` + `FAQPage` | `name`, `url`, `description`, `applicationCategory`, `operatingSystem: "Web"`, `offers` (0 € Tagesplan, 6,99 €/Monat, 44,99 €/Jahr, Pass), `inLanguage`, `publisher` | **kein `aggregateRating`/`review`**, solange es keine echten, prüfbaren Bewertungen auf der eigenen Seite gibt. Keine „Testsieger“-Angaben |
| Rezeptseite | `Recipe` | `name`, `image` (≥ 3 Seitenverhältnisse: 1:1, 4:3, 16:9, mind. 1200 px breit), `description`, `recipeIngredient` (mit Mengen), `recipeInstructions` als `HowToStep`, `prepTime`/`cookTime`/`totalTime` (ISO 8601, aus `wege[0].aktiv`/`zeit`), `recipeYield`, `recipeCategory` (Frühstück …), `keywords` (Geräte), `nutrition` (`NutritionInformation`, kcal, Protein, Fett, Kohlenhydrate **je Portion**, Hinweis „berechnet nach BLS 4.0“ im Text), `author` (`Organization`), `datePublished` | kein `aggregateRating`, kein `video`, das es nicht gibt. `suitableForDiet` nur `VegetarianDiet`/`VeganDiet` (aus `diaet`). **Kein `GlutenFreeDiet`**, weil Spuren nicht geprüft sind |
| Sammlung/programmatisch | `ItemList` (Rezept-URLs in Reihenfolge) + `BreadcrumbList` | `itemListElement` mit `url` und `position` | keine Rezepte in der Liste, die keine eigene Seite haben |
| Ratgeber | `Article` + `BreadcrumbList` (+ `FAQPage`, wenn FAQ sichtbar) | `headline`, `datePublished`, `dateModified`, `author` (Person mit Name, wenn möglich), `publisher` | `HowTo` lohnt nicht mehr (Google zeigt es seit 2023 nicht mehr an) |
| Dachmarke `index.html` | `Organization` | `name: Tellerkontor`, `url`, `logo`, `address`, `email` (= Impressum) | – |

- [ ] Testen mit **Rich-Results-Test** und **Schema-Validator** (beide gratis). `curl` sieht unser JSON-LD, weil es statisch im HTML steht (der Hinweis aus `seo-audit` zu JS-injiziertem Schema betrifft uns nicht).
- [ ] **Vor Veröffentlichung von Rezeptseiten:** Rezepte sind laut C8 „nicht testgekocht“. Rezeptseiten erst online stellen, wenn sie testgekocht sind (oder sichtbar „noch nicht testgekocht“ dranschreiben und mit `noindex` starten). Sonst leiden E-E-A-T und Vertrauen.
- [ ] Rezeptfotos sind KI-generiert. Das steht in der Fußzeile, besser zusätzlich an jedem Rezept („Foto: KI-generiert, zeigt das Gericht beispielhaft“). Nur Bilder, die das Gericht realistisch zeigen. Sobald es echte Fotos vom Testkochen gibt, diese bevorzugen.

### 7.3 Core Web Vitals und Technik
- [ ] Ziele (mobil, 75. Perzentil): **LCP < 2,5 s, INP < 200 ms, CLS < 0,1.** Prüfen mit PageSpeed Insights und Lighthouse (lokal), später CrUX in der Search Console.
- [ ] Hero-Bild: zusätzlich **AVIF/WebP** per `<picture>`, Breiten 480/900/1350. Heute JPG mit `preload`, das ist gut.
- [ ] Schriften: lokal (gut, B8). `font-display: swap`, nur die genutzten Schnitte vorladen (heute 10 Dateien insgesamt, je Marke höchstens 2–3 laden).
- [ ] `js/check.js` als `type="module"`, wird also schon verzögert geladen. Der Zimmer-Check darf beim Start kein Layout verschieben: Platz reservieren (`min-height` für `#check-ergebnis`).
- [ ] Rezeptbilder `loading="lazy"` (schon so), `decoding="async"` ergänzen.
- [ ] **Service Worker:** HTML mit „Network first“, damit Google und Nutzer neue Versionen bekommen. Googlebot führt keinen SW aus, aber zurückkehrende Nutzer könnten sonst alte Titles sehen. `sw.js` darf keine Weiterleitung für Crawler erzeugen.
- [ ] Manifest je Marke (gibt es schon). `start_url` auf `/planer/`, `scope` passend zur eigenen Domain.
- [ ] Caching-Header: HTML kurz (`max-age=300`), Bilder, Fonts und CSS lang mit Dateinamen-Hash.
- [ ] Barrierefreiheit hilft auch Agenten: Labels an allen Checkboxen (gibt es), Fokus sichtbar, Kontrast je Theme prüfen.

### 7.4 AI-SEO (ChatGPT, Perplexity, Copilot, Claude, Google AI Overviews)

Laut Google braucht es für AI Overviews nichts Besonderes, gutes normales SEO reicht. Andere Systeme belohnen klar herauslösbare Antworten und maschinenlesbare Dateien. Darum:
- [ ] **`/llms.txt`** je Domain (Vorlage Zimmerherd):
  ```
  # Zimmerherd
  > Wochenplaner fürs Essen auf Montage: Geräte im Zimmer ankreuzen (Wasserkocher, Mikrowelle, Kochplatte, Kühlschrank), Laden und Budget wählen, Wochenplan mit Einkaufsliste und geschätzten Kosten bekommen. Web-App (PWA), Deutsch, ohne Konto; Eingaben bleiben im Gerät.

  ## Fakten (Stand 10/2026)
  - 195 Rezepte; 59 davon mit Wasserkocher, Mikrowelle und Kühlschrank, 47 nur mit Wasserkocher
  - Nährwerte: Bundeslebensmittelschlüssel 4.0 (Max Rubner-Institut); Preise: eigene Schätzung je Laden
  - Lagerregeln nach BfR, FSA und USDA, teils strenger, bei höchstens 7 °C: Kühlschrank max. 2 Tage, Reis/Nudeln/Fisch/Hack/Ei max. 1 Tag
  - Preise: Tagesplan gratis; Montage-Pass 17,99 € einmalig für 3 Monate (endet automatisch); Plus 6,99 €/Monat oder 44,99 €/Jahr

  ## Seiten
  - [Kochen ohne Herd](https://zimmerherd.de/ratgeber/kochen-ohne-herd/)
  - [Rezepte nur mit Wasserkocher](https://zimmerherd.de/ratgeber/rezepte-nur-wasserkocher/)
  - [Preise](https://zimmerherd.de/preise/)
  ```
  Zahlen im Build aus den Daten einsetzen, wie in `landing.py`.
- [ ] **`/preise.md`** (maschinenlesbare Preise, Empfehlung `ai-seo`) mit denselben Werten wie `preise.html`, im Build aus `config.js` erzeugt.
- [ ] **Antwortblöcke:** Jede H2 beginnt mit 1–3 Sätzen (40–60 Wörter), die die Frage ohne Kontext beantworten. Zahlen mit Quelle und Datum. Tabellen für Vergleiche (Geräte × Rezepte, Protein je €).
- [ ] **Frische:** „Zuletzt geprüft: TT.MM.JJJJ“ sichtbar, `dateModified` im Schema.
- [ ] **Präsenz außerhalb der eigenen Seite** (ehrlich, keine gekauften oder erfundenen Erwähnungen): Antworten in Foren mit echter Hilfe und offenem Absender, z. B. Wohnmobil- und Camping-Foren, Monteurzimmer-Portale (Ratgeberbereich, Kooperation anfragen), Reddit-Fitness-Communities. Gastbeiträge bei Camping-Magazinen. Einträge in Listen von Essensplaner-Apps nur mit wahren Angaben.
- [ ] **Monatlicher Handtest** (kostet nur Zeit): 15 Prompts je Marke in ChatGPT, Perplexity, Copilot und Google, je 3 Durchläufe, Ergebnis als Quote („zitiert 1/3“). Beispiel-Prompts: „Was kann ich im Monteurzimmer ohne Herd kochen?“, „App für Meal-Prep-Plan mit Aldi-Einkaufsliste“, „Wochenplan für Wohnmobil mit zwei Gasflammen“, „Essensplaner-App ohne Konto“. Tabelle in `marketing/AI_Sichtbarkeit.md` führen.
- [ ] Bezahlte AI-Monitoring-Tools sind für den Start nicht nötig.

---

## 8. FAQ je Marke (für Seite und `FAQPage`-Schema)

Regeln: kurze, wahre Antworten. Zahlen kommen im Build aus `daten.json` bzw. `config.js` (hier mit Stand 29.10.2026). Keine Heil-, Abnehm- oder Muskelversprechen. Sichtbarer Text und Schema sind identisch.

### 8.1 Zimmerherd
1. **Kann ich ohne Herd warm essen?**
   Ja. Mit Wasserkocher und Mikrowelle gehen viele warme Gerichte, zum Beispiel Couscous, Haferflocken, Suppen oder Nudeln in der mikrowellenfesten Schüssel. Mit Wasserkocher, Mikrowelle und Kühlschrank plant Zimmerherd aus 59 von 195 Rezepten.
2. **Was kann man nur mit dem Wasserkocher kochen?**
   Alles, was in heißem Wasser quillt oder gart, etwa Couscous, Haferflocken oder Suppe. Das Wasser kocht im Wasserkocher, das Essen zieht in einer Schüssel mit Deckel. Mit Wasserkocher und Kühlschrank sind es 47 Rezepte.
3. **Was esse ich, wenn im Zimmer kein Kühlschrank steht?**
   Dann plant Zimmerherd Kühlware nur für den Einkaufstag, sonst nur Zutaten, die ungekühlt lagern. Fertige Speisen stehen höchstens 2 Stunden ungekühlt (Empfehlung des BfR). Mit Wasserkocher und Mikrowelle bleiben 38 Rezepte.
4. **Darf ich im Hotel- oder Monteurzimmer kochen?**
   Das regelt die Hausordnung der Unterkunft. Frag vorher, ob Wasserkocher, Mikrowelle oder Kochplatte erlaubt sind. Zimmerherd plant nur mit den Geräten, die du ankreuzt.
5. **Was kostet Zimmerherd?**
   Ein Tagesplan mit Einkaufsliste ist gratis. Für ganze Wochen gibt es den Montage-Pass für 17,99 € einmalig für 3 Monate (endet automatisch) oder Plus für 6,99 € im Monat bzw. 44,99 € im Jahr.

### 8.2 Kochsatz
1. **Wie berechne ich meine Makros?**
   Schätze zuerst deinen Kalorienbedarf, etwa mit der Formel nach Mifflin-St Jeor und einem Aktivitätsfaktor. Dann teilst du ihn auf Protein, Kohlenhydrate und Fett auf: 1 g Protein oder Kohlenhydrate hat etwa 4 kcal, 1 g Fett etwa 9 kcal. Kochsatz plant mit den Zahlen, die du eingibst.
2. **Wie lange hält Meal-Prep im Kühlschrank?**
   Kochsatz plant gegarte Gerichte für höchstens 2 Tage im Kühlschrank (bis 7 °C). Gerichte mit Reis, Nudeln, Fisch, Hackfleisch oder Ei höchstens 1 Tag. Was länger halten soll, wird eingefroren. Aufwärmen bis zum Kern auf mindestens 70 °C für 2 Minuten.
3. **Kann ich mit Discounter-Zutaten proteinreich planen?**
   Ja. Kochsatz zeigt, welche Zutaten bei deinem Laden am meisten Protein pro Euro bringen, und plant danach. 80 Rezepte haben mindestens 30 g Protein je Portion. Die Preise sind Schätzwerte, keine Tagespreise.
4. **Ist Kochsatz ein Diätprogramm?**
   Nein. Kochsatz plant Essen nach den Zahlen, die du eingibst. Unter 1.200 kcal am Tag planen wir nicht. Die Nährwerte stammen aus dem Bundeslebensmittelschlüssel 4.0, echte Produkte können abweichen.
5. **Was kostet Kochsatz?**
   Ein Tagesplan ist gratis. Plus kostet 6,99 € im Monat oder 44,99 € im Jahr, die ersten 7 Tage 0 €. Kündigen geht jederzeit über „Verträge hier kündigen“, ohne Login.

### 8.3 Zweiflammer
1. **Welche Rezepte gehen mit zwei Gasflammen?**
   Mit zwei Flammen, Topf, Pfanne, Omnia-Backofen und Kühlbox plant Zweiflammer aus 107 von 195 Rezepten. Mit nur einer Flamme, Topf und Pfanne sind es 95.
2. **Was koche ich beim Camping ohne Kühlschrank?**
   Gerichte aus Zutaten, die ungekühlt lagern, zum Beispiel Nudeln, Reis, Couscous, Konserven, H-Milch, Kartoffeln und Zwiebeln. Ohne Kühlung plant Zweiflammer aus 41 Rezepten und lässt angebrochene Kühlpackungen weg.
3. **Was kann man im Omnia-Backofen machen?**
   Der Omnia steht auf der Gasflamme und backt Aufläufe, Gratins, Brot oder Kuchen. In Zweiflammer haben 8 Rezepte einen Omnia-Weg. Wer keinen Omnia hat, lässt das Kästchen leer.
4. **Funktioniert Zweiflammer ohne Internet?**
   Ja. Einmal geöffnet, läuft der Planer auch offline auf dem Stellplatz. Installier ihn dafür auf dem Startbildschirm.
5. **Was kostet Zweiflammer?**
   Ein Tagesplan ist gratis. Der Saison-Pass kostet 24,99 € einmalig für 6 Monate und endet von selbst. Alternativ gibt es Plus für 6,99 € im Monat oder 44,99 € im Jahr.

### 8.4 Wochenschmaus
1. **Wie erstelle ich einen Wochenplan fürs Essen?**
   Leg fest, wer mitisst und was nicht auf den Teller soll. Dann wählst du Budget und Laden und verteilst Gerichte so, dass sich Zutaten und Reste über die Woche ergänzen. Zum Schluss kommt die Einkaufsliste nach Abteilungen. Wochenschmaus macht die letzten beiden Schritte für dich.
2. **Was kostet Essen für eine Woche?**
   Das hängt von Personenzahl, Laden und Gerichten ab. Wochenschmaus zeigt für deinen Plan geschätzte Kosten je Laden, mit ganzen Packungsgrößen. Es sind Schätzwerte, keine Tagespreise.
3. **Kann ich Allergien und Abneigungen ausschließen?**
   Ja, mit Filtern für die 14 Hauptallergene und für Zutaten, die du nicht magst. Grundlage sind die Zutaten der Rezepte. Spuren und Herstellerrezepturen kann der Planer nicht prüfen, lies deshalb die Etiketten.
4. **Brauche ich ein Konto?**
   Nein. Der Planer läuft im Browser, deine Eingaben bleiben auf deinem Gerät.
5. **Ist die Essensplaner-App kostenlos?**
   Ein Tagesplan mit Einkaufsliste ist gratis, so oft du willst. Für ganze Wochen gibt es Plus für 6,99 € im Monat oder 44,99 € im Jahr, die ersten 7 Tage 0 €.

---

## 9. Reihenfolge (passt zu A3: Montage zuerst, Camping ab Februar)

| Wann | Was | Wer |
|---|---|---|
| sofort | 6.2 Nr. 1–7, 14, 17 in `landing.py` umsetzen, `robots.txt`, `sitemap.xml`, `llms.txt`, `preise.md` im Build | Claude |
| sofort | Domains kaufen (mindestens `zimmerherd.de`), Search Console und Bing Webmaster einrichten | **du** |
| Woche 1–3 | Zimmerherd: 4 Ratgeber (kochen ohne herd, nur Wasserkocher, ohne Kühlschrank, Baustelle) + 6 programmatische Seiten | Claude, du prüfst |
| bis Januar | Zweiflammer: 5 Ratgeber, **Omnia erst ab 12 Rezepten**. Rezepte testkochen (C8) | Claude + du |
| Februar | Zweiflammer live vor der Saison. Google braucht erfahrungsgemäß Wochen bis Monate, deshalb früh veröffentlichen | – |
| danach | Kochsatz (Aldi/Lidl, Protein pro Euro, Haltbarkeit), Wochenschmaus (Familie, günstig, Kosten pro Woche) | Claude |
| monatlich | GSC-Auswertung (Impressionen, Positionen 8–20 nachschärfen), AI-Handtest | Claude |

**Offene Punkte für dich**
1. Domains kaufen und bestätigen, dass jede Marke ihre eigene Domain bekommt (Abschnitt 2).
2. Trainings-Crawler erlauben oder sperren (7.1). Mein Vorschlag: erlauben.
3. Wer steht als Autor oder Prüfer auf den Ratgebern? Für E-E-A-T am besten ein echter Name, z. B. du als Herausgeber.
4. Testkochen vor Veröffentlichung der Rezeptseiten (C8).
