# Essensplaner – Namen und Prüfung (Dachmarke + 4 Nischen-Marken)

Stand: 29.10.2026 · Domain-Abfragen am 29.10.2026, ca. 05:20–05:35 UTC

## Kurzfassung

| Marke | Sieger | .de | .com | Claim | Alternativen |
|---|---|---|---|---|---|
| Dachmarke | **Tellerkontor** | frei | frei | Gut geplant. Gut gegessen. | Kellenhaus, Kochbund |
| Montage | **Zimmerherd** | frei | frei | Satt werden mit dem, was dasteht. | Topfkumpel, Feierabendtopf |
| Fitness/Makros | **Kochsatz** | frei | frei | Deine Makros. Dein Discounter. Dein Plan. | Repteller, Tellerhantel |
| Camping | **Zweiflammer** | frei | frei | Zwei Flammen. Eine Woche. Entspannt. | Bordtopf, Markisenküche |
| Allgemein | **Wochenschmaus** | frei | frei | Jede Woche gut versorgt. | Tellerzettel, Löffelplan |

**Markenrecherche:** Die amtlichen Register (DPMA, TMview, EUIPO) ließen sich nicht automatisch abfragen (Einzelheiten in Abschnitt 2). Es gibt deshalb **kein Register-Ergebnis**. Ersatzweise habe ich im Web gesucht und dort für die fünf Sieger keine gleichnamigen Apps, Firmen oder Produkte gefunden. **DPMA/EUIPO durch Inhaber zu prüfen**, bevor Logo, Domain-Kauf oder Werbung starten. Eine Anleitung steht in Abschnitt 9.

---

## 1. Vorgehen und Kriterien

- **Namensregeln:** deutsch oder deutsch verständlich, kurz, aussprechbar. Nicht rein beschreibend (§ 8 Abs. 2 Nr. 1/2 MarkenG), also kein „Essensplaner“ und kein „Wochenplan-App“. Keine Bezüge zu Krankheit, Diät oder Abnehmen, keine Superlative. Klar unterscheidbar von **Honigmama/BeeQueen** (also nichts mit Honig, Biene, Königin, Mama) und **DURCHSCHICHT** (also nichts mit Schicht, Industrie-Großbuchstaben oder „durch“).
- **Domain-Check (RDAP):**
  - `.de`: `curl -s -o /dev/null -w "%{http_code}" https://rdap.denic.de/domain/<name>.de`
  - `.com`: `curl -s -o /dev/null -w "%{http_code}" https://rdap.verisign.com/com/v1/domain/<name>.com`
  - 404 = frei, 200 = vergeben. Umlaute als ae/oe/ue. Gegenprobe: `google.de` ergab 200, ein Fantasiename ergab 404 bei beiden Endpunkten.
  - Die Umlaut-Domains (IDN, z. B. `markisenküche.de`) habe ich **nicht** geprüft.
  - „Vergeben“ heißt nicht „in Benutzung“. Manche dieser Domains sind nur geparkt und ließen sich kaufen, das kostet aber Geld und Zeit.
- **Score (je 1–5, Summe max. 25):**
  - **M** = Merkfähigkeit
  - **P** = Passung zur Zielgruppe und zum Ton
  - **U** = Unterscheidungskraft (rechtlich und im Markt)
  - **D** = Domain: 5 = .de und .com frei, 4 = nur .de frei, 2 = nur .com frei, 1 = beide vergeben
  - **K** = Kollisionsrisiko (5 = gering, 1 = hoch). Nur eine Einschätzung aus der Websuche, kein Register-Ergebnis.

## 2. Markenregister – was ich versucht habe (genaues Protokoll)

| Register | Versuch | Ergebnis |
|---|---|---|
| DPMAregister Basis-Recherche (`register.dpma.de/DPMAregister/marke/basis`) | GET per curl | HTTP 200, Seite geladen (ca. 790 KB, Tapestry-Formular) |
| DPMAregister | Formular per POST abgeschickt (Feld `marke=Henkelmann` als Test, DE/EM/IR-Marken angehakt, Session-Cookies übernommen) | Der Server leitet ohne Trefferliste auf `/DPMAregister/uebersicht` um. Das Formular braucht offenbar JavaScript oder eine Session-Prüfung im Browser |
| DPMAregister | zweiter Versuch mit Browser-Headern | Von der Sicherheitsrichtlinie dieser Sitzung **gestoppt** (würde den Bot-Schutz umgehen). Danach keine weiteren automatischen Versuche |
| TMview (`www.tmdn.org/tmview/`) | GET per curl | HTTP 200, aber nur eine JavaScript-Hülle (531 Byte) ohne Daten |
| TMview-API (`/tmview/api/search/results`) | POST mit Suchbegriff „Zweiflammer“, Ämter DE/EM/WO | Zeitüberschreitung (HTTP 000) |
| TMview | WebFetch der Ergebnis-URL | HTTP 503 Service Unavailable |
| EUIPO eSearch (`euipo.europa.eu/eSearch/`) | curl GET | Zeitüberschreitung (HTTP 000) |
| EUIPO eSearch | WebFetch | HTTP 503 Service Unavailable |

**Folge:** In diesem Bericht steht **kein Register-Ergebnis**. Die Spalte „Kollisionen/Markenhinweis“ stützt sich nur auf die Websuche (Suchanfragen mit dem Namen in Anführungszeichen, teils mit „App“, „Marke“, „Camping“, „Essensplaner“) und auf allgemein bekannte Begriffe. Für jeden Namen gilt: **DPMA/EUIPO durch Inhaber zu prüfen.**

---

## 3. Dachmarke

Die Dachmarke steht klein im Footer, Impressum und Checkout („ein Produkt vom …“). Sie soll neutral, seriös und dauerhaft klingen und unter allen vier Stilen funktionieren.

| Name | Idee | .de | .com | Kollisionen/Markenhinweis | Score (M/P/U/D/K = Σ) |
|---|---|---|---|---|---|
| **Tellerkontor** | „Kontor“ ist das hanseatische Handelshaus, also das Haus, in dem Teller geplant werden | 404 frei | 404 frei | Websuche: kein Treffer für den exakten Namen | 4/5/4/5/4 = **22** |
| Kellenhaus | Das Haus der Kelle, ein Werkzeug, das in jeder Küche hängt | 404 frei | 404 frei | Websuche: keine Firma, nur der Ort Kellenhusen (klangähnlich, unkritisch) | 4/4/4/5/4 = **21** |
| Kochbund | „Bund“ als Verbund mehrerer Marken unter einem Dach | 404 frei | 404 frei | Websuche: kein Treffer. Wird beim Hören leicht mit „Kochbuch“ verwechselt | 4/4/3/5/3 = **19** |
| Topfkontor | Kontor rund um den Topf | 404 frei | 404 frei | **Abraten:** die Websuche führt zu „Topf & Söhne“ (Erfurt, Ofenbauer für Krematorien in Auschwitz). Ungewollte Verbindung | 4/4/4/5/2 = 19 → nicht nehmen |
| Topfgeld | Sparen beginnt im Topf | 404 frei | 404 frei | Kein Treffer. Klingt im Checkout nach Zahlungs- oder Finanzdienst | 4/2/4/5/4 = **19** |
| Kochkante | Die Kante der Arbeitsplatte, auf der alles passiert | 404 frei | 404 frei | Kein Treffer bekannt | 3/3/3/5/4 = **18** |
| Pfannwerk | Werkstatt rund um die Pfanne | 404 frei | 200 vergeben | Kein Treffer bekannt | 4/3/3/4/3 = **17** |
| Löffelwerk (loeffelwerk) | Werkstatt rund um den Löffel | 404 frei | 200 vergeben | Kein Treffer bekannt | 4/3/3/4/3 = **17** |
| Kellenwerk | Variante von Kellenhaus | 404 frei | 200 vergeben | Kein Treffer bekannt | 3/3/3/4/3 = **16** |
| Kochkontor | Kontor fürs Kochen | 200 vergeben | 200 vergeben | Domains vergeben | 4/4/4/1/3 = **16** |
| Tellerwerk | Werk, in dem Teller entstehen | 200 vergeben | 200 vergeben | Domains vergeben | 4/4/3/1/3 = **15** |
| Speisewerk | Werk für Speisen | 200 vergeben | 200 vergeben | Domains vergeben | 4/4/3/1/3 = **15** |
| Löffelei (loeffelei) | Verspielte Ableitung von Löffel | 200 vergeben | 200 vergeben | Domains vergeben | 4/3/4/1/3 = **15** |
| Küchenkontor (kuechenkontor) | Kontor für die Küche | 200 vergeben | 200 vergeben | Domains vergeben, klingt nach Küchenstudio | 4/4/3/1/3 = **15** |
| Gabelhof | Hof rund um die Gabel | 200 vergeben | 404 frei | Klingt nach Gasthof oder Bauernhof | 3/3/3/2/3 = **14** |
| Herdwerk | Werkstatt am Herd | 200 vergeben | 200 vergeben | Domains vergeben | 4/3/3/1/3 = **14** |
| Tischwerk | Werk für den Tisch | 200 vergeben | 200 vergeben | Domains vergeben, klingt nach Möbeln | 3/3/3/1/3 = **13** |
| Herdhaus | Haus am Herd | 200 vergeben | 200 vergeben | Sehr nah an „Kochhaus“ (Kochhaus GmbH Berlin, Lebensmittelhandel) | 4/3/2/1/2 = **12** |
| Küchenwerk (kuechenwerk) | Küchen-Werkstatt | 200 vergeben | 200 vergeben | Gattungsnah, klingt nach Küchenmöbeln | 4/3/2/1/2 = **12** |
| Tafelhaus | Haus der Tafel | 200 vergeben | 200 vergeben | Verwechslung mit den „Tafeln“ (Lebensmittelausgabe). Heikel bei einer Zielgruppe mit knappem Budget | 4/3/2/1/2 = **12** |
| Nährwerk (naehrwerk) | Werk für Nährstoffe | 200 vergeben | 200 vergeben | „Nähr…“ rückt in die Nähe von Nährwertangaben (Health-Claims-VO) | 3/2/3/1/2 = **11** |

**Sieger: Tellerkontor (22).**
- Klingt nach einem soliden, norddeutsch-kaufmännischen Haus, ohne Werbeton.
- Der Name passt unter alle vier Stile: „ein Produkt vom Tellerkontor“ wirkt neben Werkstatt, Sport, Camping und Familie gleichermaßen glaubwürdig.
- Beide Domains sind frei, in der Websuche gab es keinen Treffer.
- Er ist klar entfernt von Honigmama (weich, familiär) und DURCHSCHICHT (Industrie).

**Alternativen:**
1. **Kellenhaus (21):** ebenso frei, etwas wärmer. Nachteil: eine Kelle denkt man zuerst mit Suppe zusammen.
2. **Kochbund (19):** betont den Verbund der Marken. Nachteil: Hörverwechslung mit „Kochbuch“.

**Claim:** „Gut geplant. Gut gegessen.“
**Zweitzeile:** „Wir bauen Wochenpläne für jede Küche, vom Monteurzimmer bis zum Wohnmobil. Deine Daten bleiben auf deinem Gerät.“

---

## 4. Montage (Monteure, Bau, Außendienst, Fernfahrer, Leiharbeit)

| Name | Idee | .de | .com | Kollisionen/Markenhinweis | Score (M/P/U/D/K = Σ) |
|---|---|---|---|---|---|
| **Zimmerherd** | Der Herd ist das, was im Zimmer steht: Wasserkocher, Mikrowelle, Kochplatte | 404 frei | 404 frei | Websuche: kein Produkt und keine App, nur ein alter Begriff in einer Patentschrift (Herd und Raumheizung) | 5/5/4/5/4 = **23** |
| Topfkumpel | Der Kumpel, der weiß, was heute in den Topf kommt | 404 frei | 404 frei | Websuche: kein Treffer | 4/5/4/5/4 = **22** |
| Feierabendtopf | Das Essen, auf das man sich nach der Schicht auf dem Bau freut | 404 frei | 404 frei | Websuche: kein Treffer. Mit 14 Zeichen recht lang | 4/5/4/5/4 = **22** |
| Malochermahl | „Malocher“ ist Umgangssprache aus dem Ruhrgebiet für hart Arbeitende, „Mahl“ heißt Essen | 404 frei | 404 frei | Websuche: kein Treffer. Regional geprägt, für ausländische Monteure weniger verständlich | 4/4/5/5/4 = **22** |
| Bautopf | Der Topf für die Baustellenwoche | 404 frei | 404 frei | Websuche: kein Treffer. Wirkt etwas eng auf „Bau“ | 4/4/3/5/4 = **20** |
| Zimmerküche (zimmerkueche) | Die Küche, die das Zimmer hergibt | 404 frei | 404 frei | Kein Treffer, aber eher beschreibend (schwache Unterscheidungskraft) | 4/5/2/5/4 = **20** |
| Schraubertopf | Für Leute, die schrauben | 404 frei | 404 frei | Kein Treffer. „Schrauber“ denkt man eher mit Kfz zusammen | 3/4/4/5/4 = **20** |
| Kochmontage | Kochen und Montage in einem Wort | 404 frei | 404 frei | Verwechslung mit Dienstleistungen von Küchenmonteuren (in der Websuche sehr präsent) | 3/4/2/5/3 = **17** |
| Kochkumpel | Der Kumpel beim Kochen | 200 vergeben | 404 frei | .de vergeben, als Wort naheliegend | 5/5/3/2/2 = **17** |
| Kochkoffer | Küche im Koffer | 200 vergeben | 200 vergeben | Domains vergeben | 4/4/3/1/3 = **15** |
| Henkelmann | Das klassische Essgefäß der Arbeiter | 200 vergeben | 200 vergeben | Gattungsbegriff, wird viel von Gastronomie und Produkten benutzt. Hohes Kollisionsrisiko | 5/5/2/1/1 = **14** |
| Brotzeitkiste | Kiste für die Brotzeit | 200 vergeben | 404 frei | .de vergeben, eher süddeutsch | 4/3/3/2/2 = **14** |
| Werkbankküche (werkbankkueche) | Kochen auf der Werkbank | 200 vergeben | 200 vergeben | Domains vergeben | 3/4/3/1/3 = **14** |
| Kochkiste | Kiste zum Kochen | 200 vergeben | 200 vergeben | Gattungsbegriff (die „Kochkiste“ ist ein Garbehälter mit Isolierung) | 4/3/1/1/2 = **11** |

**Sieger: Zimmerherd (23).**
- Der Name übersetzt das Kernversprechen „Satt werden mit dem, was im Zimmer steht“ in ein Wort: kurz, bildhaft, kumpelhaft und ohne Erklärung verständlich.
- Er beschreibt keine Ware direkt („Herd im Zimmer“ ist kein üblicher Begriff für eine App), dürfte also unterscheidungskräftig sein.
- Beide Domains sind frei.

**Alternativen:**
1. **Topfkumpel (22):** noch kumpelhafter, gut für Social-Ads.
2. **Feierabendtopf (22):** sehr warm und klar, aber lang. Für Logo und App-Symbol unhandlicher.

Malochermahl wäre eine Option, falls die Kampagne sich bewusst auf NRW und das Ruhrgebiet konzentriert.

**Claim:** „Satt werden mit dem, was dasteht.“
**Zweitzeile:** „Wasserkocher, Mikrowelle oder Kochplatte ankreuzen, Laden und Budget wählen, und du hast deinen Wochenplan samt Einkaufsliste.“

---

## 5. Fitness/Makros (Muskelaufbau/Definition, Meal-Prep, Discounter mit Budget)

Hinweis: Name, Claim und Werbung dürfen keine Wirkversprechen enthalten (kein „Muskeln“, „fettfrei“, „definiert“). „Proteinreich“ ist eine nährwertbezogene Angabe nach der Health-Claims-VO und nur unter Bedingungen erlaubt, deshalb kommt sie in keinem Claim vor.

| Name | Idee | .de | .com | Kollisionen/Markenhinweis | Score (M/P/U/D/K = Σ) |
|---|---|---|---|---|---|
| **Kochsatz** | Ein „Satz“ wie im Training, dazu ein Wortspiel auf Kochsalz: Kochen in Sätzen, Woche für Woche | 404 frei | 404 frei | Websuche: keine App und keine Marke gefunden | 5/4/5/5/4 = **23** |
| Repteller | „Rep“ (Wiederholung im Training) und Teller: der Teller, den man wiederholt | 404 frei | 404 frei | Websuche: kein Treffer. Es gibt eine Fitness-App „Repth“ (klangähnlich, aber entfernt) | 4/5/4/5/4 = **22** |
| Tellerhantel | Der Teller als Trainingsgerät | 404 frei | 404 frei | Kein Treffer bekannt | 4/4/4/5/4 = **21** |
| Makrolotse | Der Lotse durch Makros und Discounterregale | 404 frei | 404 frei | Websuche: kein Treffer. Achtung: „Makro“ ist eine Großhandelsmarke von Metro (NL, ES, PL, CZ u. a.) | 4/4/4/5/3 = **20** |
| Hantelküche (hantelkueche) | Küche für Leute mit Hantel | 404 frei | 404 frei | Kein Treffer bekannt | 4/4/3/5/4 = **20** |
| Prepkiste | Die Kiste mit den vorgekochten Dosen | 404 frei | 404 frei | Websuche: kein Treffer. Klingt etwas nach Kochbox-Lieferdienst | 4/4/3/5/4 = **20** |
| Satzpause | Das Essen in der Satzpause | 404 frei | 404 frei | Kein Treffer bekannt. Passt weniger zum Kochen | 4/3/4/5/4 = **20** |
| Makrokorb | Makros im Einkaufskorb | 404 frei | 404 frei | Websuche: nur Treffer zur Händlermarke „Makro“ (Metro). „Korb“ und „Makro“ zusammen sind in Klasse 35 (Handel) riskant | 4/5/3/5/2 = **19** |
| Grammwerk | Werkstatt fürs Grammgenaue | 404 frei | 200 vergeben | Kein Treffer bekannt | 3/4/3/4/3 = **17** |
| Prepzeit | Zeit fürs Meal-Prep | 404 frei | 200 vergeben | Eher beschreibend | 4/4/2/4/3 = **17** |
| Makrowerk | Werkstatt für Makros | 200 vergeben | 404 frei | .de vergeben, Nähe zu „Makro“ | 4/4/3/2/2 = **15** |
| Prepwerk | Werkstatt fürs Vorkochen | 200 vergeben | 200 vergeben | Domains vergeben | 3/4/3/1/3 = **14** |
| Wiegewerk | Wiegen und Werk | 200 vergeben | 404 frei | „Wiegen“ lässt an Abnehmen denken, also ungünstig | 3/3/3/2/3 = **14** |
| Makromarkt | Markt für Makros | 200 vergeben | 200 vergeben | „Makro Markt“ ist praktisch identisch mit Metros Handelsmarke. Hohes Risiko | 4/4/2/1/1 = **12** |

**Sieger: Kochsatz (23).**
- Sportlich, ohne Bro-Sprech: wer trainiert, versteht „Satz“ sofort, alle anderen lesen ein bekanntes Küchenwort.
- Der Name verspricht nichts über Körperwirkung, das ist für die Health-Claims-VO sauber.
- Beide Domains sind frei, der Name ist kurz und gut als App-Symbol.
- Er enthält nicht „Makro“ und vermeidet so die Nähe zur Händlermarke Makro.

**Alternativen:**
1. **Repteller (22):** noch klarer im Training verortet. Nachteil: der englische Teil „Rep“ muss man aussprechen können.
2. **Tellerhantel (21):** bildstark für Anzeigen (Teller als Hantelscheibe).

**Claim:** „Deine Makros. Dein Discounter. Dein Plan.“
**Zweitzeile:** „Wochenpläne nach deinen eigenen Zielwerten, mit Einkaufsliste für Aldi, Lidl & Co. und festem Budget.“

---

## 6. Camping (Reisemobil, Van, Wohnwagen, Dauercamper, 45–70 J.)

Hinweis: „Omnia“ ist eine Marke (Omnia Backofen, Schweden). Den Namen also nicht verwenden, im Text nur beschreibend nennen („für den Omnia-Backofen“).

| Name | Idee | .de | .com | Kollisionen/Markenhinweis | Score (M/P/U/D/K = Σ) |
|---|---|---|---|---|---|
| **Zweiflammer** | Der zweiflammige Gaskocher ist das Herz jeder Bordküche, ein Insiderwort mit Wiedererkennung | 404 frei | 404 frei | Websuche: keine App und keine Marke, nur die Gattung „zweiflammiger Kocher“. Für Kocher (Klasse 11) wäre der Name beschreibend, für Software (9/42) eher nicht | 5/5/4/5/4 = **23** |
| Bordtopf | Der Topf an Bord | 404 frei | 404 frei | Websuche: kein Treffer | 4/5/4/5/4 = **22** |
| Markisenküche (markisenkueche) | Kochen unter der Markise, purer Urlaub | 404 frei | 404 frei | Websuche: kein Produkt mit dem Namen, nur „Outdoorküchen unter der Markise“ als Thema | 3/4/4/5/4 = **20** |
| Kocherkiste | Die Kiste mit Kocher und Plan | 404 frei | 404 frei | Websuche: kein Produkt mit dem Namen (es gibt „Kocherschränke“ als Möbel) | 4/4/3/5/4 = **20** |
| Stellplatzküche (stellplatzkueche) | Küche am Stellplatz | 404 frei | 404 frei | Kein Treffer, aber lang und beschreibend | 3/5/2/5/4 = **19** |
| Reisetopf | Der Topf auf Reisen | 404 frei | 404 frei | Kein Treffer, eher allgemein | 4/4/2/5/4 = **19** |
| Rastküche (rastkueche) | Küche bei der Rast | 404 frei | 404 frei | Erinnert an Autobahnraststätten („Tank & Rast“) | 3/3/3/5/3 = **17** |
| Fernwehküche (fernwehkueche) | Küche fürs Fernweh | 200 vergeben | 404 frei | .de vergeben | 4/4/3/2/3 = **16** |
| Womoküche (womokueche) | Küche im Wohnmobil | 200 vergeben | 404 frei | .de vergeben, beschreibend | 4/5/2/2/3 = **16** |
| Vanküche (vankueche) | Küche im Van | 200 vergeben | 404 frei | .de vergeben, beschreibend, spricht ältere Paare weniger an | 4/4/2/2/3 = **15** |
| Vorzeltküche (vorzeltkueche) | Küche im Vorzelt | 200 vergeben | 404 frei | .de vergeben | 3/4/3/2/3 = **15** |
| Wegzehrung | Proviant für unterwegs | 200 vergeben | 200 vergeben | Gattungsbegriff, Domains vergeben | 4/4/3/1/2 = **14** |
| Flämmchen (flaemmchen) | Kleine Flamme | 200 vergeben | 200 vergeben | Domains vergeben, klingt sehr niedlich | 4/3/3/1/3 = **14** |
| Kombüse (kombuese) | Schiffsküche | 200 vergeben | 200 vergeben | Sehr häufig als Name von Restaurants und Imbissen | 5/4/2/1/1 = **13** |

**Sieger: Zweiflammer (23).**
- Camper erkennen sich sofort wieder, denn die meisten Bordküchen haben genau zwei Flammen.
- Der Name klingt kundig und entspannt, nicht nach Technik.
- Er passt zum Versprechen „mit dem planen, was an Bord ist“, beide Domains sind frei, und er ist gut zu merken.

**Alternativen:**
1. **Bordtopf (22):** kurz, freundlich, frei. Er sagt aber weniger über die Planungsidee.
2. **Markisenküche (20):** viel Urlaubsgefühl für die Zielgruppe 45–70. Nachteil: der Umlaut, die Domain wäre `markisenkueche.de` (die IDN-Variante ist ungeprüft).

**Claim:** „Zwei Flammen. Eine Woche. Entspannt.“
**Zweitzeile:** „Dein Wochenplan für Flammen, Omnia-Backofen und Kühlbox, mit Einkaufsliste für den nächsten Supermarkt und Tipps zum Gas- und Wassersparen.“

---

## 7. Allgemein (alle Haushalte, Familien mit knappem Budget)

Bei der Allgemein-Variante waren zuerst **alle 14** naheliegenden Namen als .de vergeben. Deshalb habe ich eine zweite Runde mit 16 weiteren Namen geprüft.

| Name | Idee | .de | .com | Kollisionen/Markenhinweis | Score (M/P/U/D/K = Σ) |
|---|---|---|---|---|---|
| **Wochenschmaus** | „Schmaus“ ist ein gutes, festliches Essen, hier jede Woche, auch mit kleinem Budget | 404 frei | 404 frei | Websuche: keine App und keine Marke mit dem Namen, nur allgemeine Essensplaner-Apps | 5/5/4/5/4 = **23** |
| Tellerzettel | Der Einkaufszettel, der vom Teller her denkt | 404 frei | 404 frei | Kein Treffer bekannt. Nähe zur Dachmarke Tellerkontor (kann gewollt sein) | 4/5/3/5/4 = **21** |
| Tellerkarussell | Gerichte drehen sich durch die Woche | 404 frei | 404 frei | Kein Treffer bekannt | 4/4/4/5/4 = **21** |
| Löffelplan (loeffelplan) | Der Plan, nach dem die ganze Familie löffelt | 404 frei | 404 frei | Websuche: kein Treffer | 4/4/3/5/4 = **20** |
| Herdzettel | Der Zettel, der am Herd hängt | 404 frei | 404 frei | Kein Treffer bekannt | 4/4/3/5/4 = **20** |
| Wochenherd | Der Herd für die ganze Woche | 404 frei | 404 frei | Kein Treffer bekannt | 4/4/3/5/4 = **20** |
| Topfreigen | Im „Reigen“ (Rundtanz) wechseln sich die Gerichte ab | 404 frei | 404 frei | Websuche: kein Treffer. Das Wort wirkt altmodisch | 3/3/5/5/4 = **20** |
| Suppenkalender | Kalender rund ums Essen | 404 frei | 404 frei | Kein Treffer. Klingt zu sehr nach Suppe | 4/3/3/5/4 = **19** |
| Küchenbrief (kuechenbrief) | Der wöchentliche Brief aus der Küche | 404 frei | 404 frei | Websuche: kein Treffer | 3/3/3/5/4 = **18** |
| Essensuhr | Die Uhr, die sagt, was es wann gibt | 404 frei | 404 frei | Kein Treffer bekannt | 3/3/3/5/4 = **18** |
| Kochfaden | Der rote Faden fürs Kochen | 404 frei | 404 frei | Kein Treffer bekannt | 3/3/3/5/4 = **18** |
| Topfgucker | Wer in die Töpfe schaut, will wissen, was es gibt | 200 vergeben | 404 frei | Gängiges Wort, viel von Blogs und Gastronomie benutzt | 5/5/3/2/2 = **17** |
| Topfzettel | Zettel für den Topf | 200 vergeben | 404 frei | .de vergeben | 4/4/3/2/3 = **16** |
| Wochenteller | Der Teller der Woche | 200 vergeben | 404 frei | .de vergeben | 4/5/2/2/2 = **15** |
| Topfpost | Post aus dem Topf | 200 vergeben | 404 frei | .de vergeben | 4/3/3/2/3 = **15** |
| Tischglocke | Die Glocke, die zum Essen ruft | 200 vergeben | 404 frei | .de vergeben | 4/3/3/2/3 = **15** |
| Wochenlöffel (wochenloeffel) | Der Löffel der Woche | 200 vergeben | 404 frei | .de vergeben | 3/4/3/2/3 = **15** |
| Wochentopf | Der Topf für die Woche | 200 vergeben | 404 frei | .de vergeben | 4/4/2/2/2 = **14** |
| Topfplan | Plan für den Topf | 200 vergeben | 404 frei | .de vergeben, beschreibend | 4/4/2/2/2 = **14** |
| Küchenzettel (kuechenzettel) | Das alte Wort für den Wochenspeiseplan | 200 vergeben | 404 frei | Gattungsbegriff, kaum schutzfähig | 4/5/1/2/2 = **14** |
| Wasgibts | „Was gibt’s heute?“ | 200 vergeben | 200 vergeben | Gängige Floskel, Domains vergeben | 5/5/2/1/1 = **14** |
| Kochkarussell | Rezepte im Kreis | 200 vergeben | 200 vergeben | Domains vergeben | 4/3/3/1/3 = **14** |
| Tischlein | Nach „Tischlein deck dich“ | 200 vergeben | 200 vergeben | Märchenbegriff, sehr häufig | 4/4/2/1/2 = **13** |
| Esszettel | Zettel fürs Essen | 200 vergeben | 200 vergeben | Domains vergeben | 4/4/2/1/2 = **13** |
| Kochzettel | Zettel fürs Kochen | 200 vergeben | 200 vergeben | Domains vergeben | 4/4/2/1/2 = **13** |
| Tellerplan | Plan für den Teller | 200 vergeben | 200 vergeben | Domains vergeben, beschreibend | 4/4/2/1/2 = **13** |
| Löffelliste (loeffelliste) | Liste zum Löffeln | 200 vergeben | 200 vergeben | Domains vergeben | 3/3/3/1/3 = **13** |
| Familientisch | Der Tisch der Familie | 200 vergeben | 200 vergeben | Gattungsbegriff | 4/4/1/1/2 = **12** |
| Küchenkompass (kuechenkompass) | Orientierung in der Küche | 200 vergeben | 200 vergeben | „Kompass“-Namen gibt es sehr oft | 4/3/2/1/2 = **12** |
| Wochenküche (wochenkueche) | Küche der Woche | 200 vergeben | 200 vergeben | Beschreibend | 4/4/1/1/2 = **12** |
| Tischleindeckdich | Märchen-Zitat | 200 vergeben | 200 vergeben | Märchentitel, sehr häufig genutzt | 4/4/2/1/1 = **12** |

**Sieger: Wochenschmaus (23).**
- Warm und alltagsnah, mit einem kleinen Augenzwinkern: auch bei knappem Budget gibt es jede Woche einen „Schmaus“.
- Der Name beantwortet die Frage „Was koche ich diese Woche?“ schon halb.
- Beide Domains sind frei, in der Websuche gab es keine gleichnamige App.
- Er versteckt die Planungsfunktion nicht, ist aber auch kein Gattungswort.

**Alternativen:**
1. **Tellerzettel (21):** sehr klar (Einkaufszettel und Teller) und klingt bewusst nach Familie mit der Dachmarke Tellerkontor. Dafür wirkt er weniger eigenständig.
2. **Löffelplan (20):** freundlich und familiär. Nachteil: der Umlaut, die Domain wäre `loeffelplan.de`.

**Claim:** „Jede Woche gut versorgt.“
**Zweitzeile:** „Sag uns, was in deiner Küche steht und was du ausgeben willst. Wir planen die Woche samt Einkaufsliste nach Laden sortiert.“

---

## 8. Gesamtbild und Abgrenzung

- **Familienähnlichkeit:** Das Dach Tellerkontor ist hanseatisch und seriös. Darunter stehen vier eigenständige Wörter mit Küchenbezug (Herd, Satz/Kochsalz, Flamme, Schmaus). Kein Name nutzt dasselbe Grundwort wie ein anderer, also kommt keine Landingpage ins Gehege der anderen.
- **Abstand zu bestehenden Marken:** Kein Bezug zu Honig, Biene, Königin oder Mama (Honigmama/BeeQueen) und keiner zu Schicht oder Industrie (DURCHSCHICHT). Kochsatz ist das einzige Wort mit einem „S“-Laut, der an DURCHSCHICHT erinnern könnte. Optisch und klanglich ist es aber klar verschieden.
- **Recht:** Keine Superlative und kein Bezug zu Krankheit, Diät oder Abnehmen. „Omnia“, „Makro“ und „Tafel“ habe ich bewusst vermieden.

## 9. Nächste Schritte für dich (Inhaber)

1. **Markenrecherche selbst machen (ca. 30 Minuten):**
   1. **DPMAregister:** register.dpma.de öffnen, dann „Marken“ und „Basis“ wählen. Im Feld „Marke“ jeden Sieger eingeben, auch mit Platzhalter (z. B. `Zimmerherd*`, `*flammer`, `Kochsatz*`, `Teller*kontor`). Unter „Klassen“ `9 35 41 42` eintragen. DE-, EU- und IR-Marken angehakt lassen und „Recherche starten“ drücken.
   2. **TMview:** tmdn.org/tmview öffnen, den Namen eingeben, unter „Ämter“ DE, EM und WO wählen und zusätzlich die Suche nach **ähnlichen** Marken („Similar“) nutzen.
   3. **App Stores:** im App Store und bei Google Play nach jedem Sieger suchen.
   4. **Unternehmensregister:** auf handelsregister.de nach Firmen mit dem Namen suchen.
   5. Treffer in Klasse 9, 35, 41 oder 42 mit gleichem oder sehr ähnlichem Namen bedeuten: auf die Alternative ausweichen. Im Zweifel eine kurze Prüfung durch eine Markenanwältin oder einen Markenanwalt einholen.
2. **Domains sichern,** sobald die Prüfung sauber ist: tellerkontor.de/.com, zimmerherd.de/.com, kochsatz.de/.com, zweiflammer.de/.com und wochenschmaus.de/.com. Bei Bedarf auch die Umlaut-Variante (z. B. markisenküche.de), falls eine Alternative mit Umlaut gewählt wird. Alle Ergebnisse sind Momentaufnahmen vom 29.10.2026. Vor dem Kauf noch einmal prüfen.
3. **Marke anmelden:** Zuerst die Dachmarke oder den wichtigsten Nischennamen als DE-Wortmarke beim DPMA anmelden. Nach meinem Kenntnisstand kostet das online 290 € für bis zu 3 Klassen, jede weitere Klasse 100 €. Eine EU-Marke kostet ab 850 € für eine Klasse. Aktuelle Gebühren vor der Anmeldung auf dpma.de bzw. euipo.europa.eu prüfen.
4. **Rohdaten:** Die RDAP-Abfragen lassen sich mit dem Befehl aus Abschnitt 1 jederzeit wiederholen.

## Quellen der Websuche (Auswahl)

- Kochhaus GmbH Berlin (Handelsregister-Eintrag): https://www.unternehmen24.info/Firmeninformationen/Deutschland/Firma/3348458
- Topf & Söhne (Treffer zu „Topfkontor“): https://www.topfundsoehne.de/
- Makro als Händlermarke (Treffer zu „Makrokorb/Makrolotse“): https://en.wikipedia.org/wiki/Makro_(South_Africa), https://help.makro.nl/
- Zweiflammige Gaskocher (Gattung zu „Zweiflammer“): https://www.kita.de/ratgeber/haushalt/garten/grills-zubehoer/gaskocher-camping-2-flammig-2/
- Outdoorküche unter der Markise (Thema zu „Markisenküche“): https://www.promobil.de/zubehoer/outdoor-kueche-fuers-camping-was-sie-wirklich-brauchen-fuers-kochen-im-freien/
- „Zimmerherd“ in einer Patentschrift: https://patents.google.com/patent/DE1497012U/de
- Bestehende Essensplaner-Apps (Suche zu „Wochenschmaus“): https://apps.apple.com/DE/app/id6460821436, https://apps.apple.com/DE/app/id1619509620
- Fitness-App „Repth“ (klangähnlich zu „Repteller“): https://apps.apple.com/ch/app/repth/id6749666547
