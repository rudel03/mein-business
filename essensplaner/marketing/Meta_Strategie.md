# Meta-Ads-Strategie Wochenbon

Stand 04.11.2026. Grundlagen: `recherche/14_Eine_Ausrichtung.md` (Zielgruppe, Angles), `recherche/08` Abschnitt 9 (Kosten, Ziel-CAC), `marke/Claim_Freigabe.md` (was gesagt werden darf), Skills `ads` (Meta-Entscheidungssystem, Andromeda-Playbook), `ad-creative` (Format-Rangliste), `meta-ads-de` (deutsches Recht, unsere Regeln). **Nichts davon ist gestartet.** Konto, Zahlungsmittel und Start liegen bei dir (Abschnitt 10).

## 1. Kurzfassung
1. **Ziel:** zahlende Plus-Kunden für höchstens **11 € je Kunde** (Ziel-CAC = LTV ÷ 3, realistisch). Obergrenze 33 € (LTV): Darüber verliert jede Anzeige Geld.
2. **Start im Januar 2027,** nicht vorher. Gründe: Im November/Dezember sind die Klickpreise wegen Black Friday und Weihnachten am höchsten, im Januar am niedrigsten. Dazu kommen die Vorsätze („Kosten im Griff“) und der Kassensturz nach den Feiertagen.
3. **Vorher drei Pflichtschritte:** Kassenbon-Test bestanden, Tracking mit Einwilligung eingebaut, 12 Werbemittel fertig. Ohne bestandenen Kassenbon-Test läuft die Kampagne ohne Euro-Beträge, also mit den Angles 2, 3 und 5 statt mit dem stärksten Angle 1.
4. **Aufbau nach dem Andromeda-Prinzip:** breite Zielgruppe (Deutschland, 22–55 Jahre, keine Interessen), **die Werbemittel machen die Zielgruppe.** Eine Test-Kampagne, später eine Skalier-Kampagne.
5. **Budget Test 1:** 20 € am Tag, 14 Tage, **höchstens 300 €.** Danach wird entschieden, mit festen Regeln (Abschnitt 7).
6. **Stärkster Hebel nach dem Test:** Partnerschaftsanzeigen mit 2–3 Spar- und Familien-Creatorn (gekennzeichnet als Werbung).

## 2. Wer, was, wohin
- **Zielgruppe** (aus 14, 5.1): preisbewusste Haushalte mit 1 bis 4 Personen, 22 bis 45 Jahre, kaufen meist beim Discounter, planen gern am Sonntag. Erweiterungen per Werbemittel statt per Targeting: Singles und Studierende, Paare, junge Familien, „viel Eiweiß“, kleine Küche.
- **Angebot:** Tagesplan gratis, ohne Konto. Plus mit 7 Tagen für 0 €, danach 6,99 € im Monat oder 44,99 € im Jahr.
- **Ziel der Anzeige:** die Startseite (`index.html`), Knopf „Woche planen“. Keine Anzeige führt direkt in die Kasse.
- **Trichter:** Anzeige → Startseite → Planer (Gratis-Tag, Vorschau der Woche) → Preisseite → Probezeit → erste Abbuchung.

## 3. Messung (vor dem ersten Euro)
| Ereignis | Wo | Wann | Bemerkung |
|---|---|---|---|
| `PageView` | Startseite, Preisseite | nach Einwilligung | Pixel nur mit Einwilligung (TDDDG § 25) |
| `PlanerStart` (eigenes Ereignis) | Startseite | Klick auf „Woche planen“ | **Optimierungsziel in Test 1**, weil häufig genug (Meta braucht ca. 50 je Woche) |
| `Lead` | Mail-Dienst | erst nach bestätigtem Double-Opt-in | über Webhook, nicht beim Absenden |
| `InitiateCheckout` | Preisseite | Klick auf Kaufknopf | |
| `StartTrial`, `Purchase` | Paddle-Webhook → Conversions API | Probezeit begonnen, erste Zahlung | nur Tarif und Preis, **keine** Ernährungs-, Allergie- oder Gerätedaten |
- **Im Planer läuft kein Pixel.** Dort stehen Allergien und Ernährung, und die Seite verspricht „wird nicht an uns gesendet“. Das bleibt so.
- **UTM an jeder Anzeige:** `?utm_source=meta&utm_medium=paid&utm_campaign=wb-test1&utm_content=<angle>-<format>-<nr>`. Damit lässt sich jede Anzeige in der eigenen Statistik prüfen, unabhängig von Metas Zahlen.
- **Auswertung:** Meta-Zahlen sind zu hoch angesetzt. Maßgeblich ist der CAC aus den echten Paddle-Käufen (Summe Werbekosten ÷ neue zahlende Kunden), daneben die UTM-Zahlen.
- Vorlage: `app/public/js/einwilligung.js` (lädt den Pixel erst nach „Akzeptieren“), Skill `conversion-tracking` für Einbau und Prüfung.

## 4. Kontoaufbau
- Business-Manager, Werbekonto, Pixel, **Domain bestätigen** (wochenbon.de), Zahlungsmittel. Zwei-Faktor-Anmeldung für alle Zugänge.
- Platzierung: Advantage+, aber **Audience Network aus** (Projektregel). Messenger aus.
- Sprache Deutsch, Land Deutschland, Alter 22–55 (Mindestalter 18 für alles).
- Keine Sonderkategorie nötig (kein Kredit, Wohnen, Job, Politik).
- Benennung: `WB_<Ziel>_<Phase>_<Datum>`, Anzeigen `<angle>-<format>-<nr>`, z. B. `WB_PlanerStart_Test1_2027-01` und `a3-bon-static-02`.

## 5. Kampagnenaufbau
**Test 1 (14 Tage, Januar):**
- 1 Kampagne mit Kampagnenbudget (CBO), 20 € am Tag, Optimierung auf `PlanerStart`.
- 1 Anzeigengruppe: breit, Deutschland, 22–55, ohne Interessen, Advantage+ Zielgruppe an.
- **10 Anzeigen = 10 verschiedene Konzepte** (Abschnitt 6). Keine Mini-Varianten desselben Motivs: Meta wertet Anzeigen, die sich zu ähnlich sind, als eine.
- Nichts ändern in den ersten 72 Stunden.

**Ab Test 2 (nach bestandenem Test 1):**
- **Skalieren** (80 % des Budgets): nur die Gewinner aus Test 1.
- **Testen** (20 %): je Woche 2–3 neue Konzepte, damit die Skalier-Kampagne nie ohne Nachschub ist.
- **Wiederansprache** (nur Besucher mit Einwilligung, 30 Tage): **anderes Angebot statt derselben Anzeige.** Zum Beispiel „Ein fertiger Wochenplan per Mail“ (Lead) oder „7 Tage Plus für 0 €“ mit einem Einwand-Thema („Muss ich ein Konto anlegen? Nein.“).
- Optimierungsziel wechseln auf `StartTrial`, sobald es 50 je Woche gibt. Vorher bleibt `PlanerStart` das Ziel, bewertet wird trotzdem nach Käufen.

## 6. Werbemittel: 10 Konzepte für Test 1
Matrix nach Konzept, Angle und Wissensstand (Skill `ad-creative`). Format-Priorität: Gründer-Video und Partnerschaft (S), Bildanzeigen als Raster und Bon (A/B). Notizen-App-Optik bewusst **nicht**: Sie fällt auf, bringt aber nach der Format-Rangliste keine Käufer.

| Nr. | Angle (14, 5.3) | Format | Headline (≤ 40 Zeichen) | Primärtext |
|---|---|---|---|---|
| 1 | Vorher wissen | Bild: der Bon mit Zackenrand, Gerichte statt Preise | Erst der Plan, dann der Bon | Sonntag: Wochenbon plant sieben Abende und schreibt den Einkaufszettel für deinen Discounter, nach Abteilungen sortiert. Einen Tag kannst du gratis planen, ohne Konto. |
| 2 | Sonntagsfrage | Reel: Bildschirmaufnahme, App öffnen, Plan steht, 3 Antipper | Was essen wir diese Woche? | Drei Fragen, und Plan und Einkaufszettel stehen. Küche, Personen, Laden. Den Rest übernimmt Wochenbon. |
| 3 | Ganze Packungen | Bild: Quarkbecher, drei Gerichte daneben | Der Rest vom Quark kommt am Donnerstag dran | Wochenbon rechnet mit ganzen Packungen und plant, was übrig ist, in die nächsten Tage ein. Auf dem Zettel steht, was am Ende bleibt. |
| 4 | Eiweiß aus dem normalen Regal | Raster-Bild: Quark, Eier, Linsen, Hähnchen | Eiweiß aus dem normalen Regal | Protein-Produkte kosten im Schnitt rund 40 % mehr (NielsenIQ, 07/2026). Wochenbon plant mit Quark, Eiern und Linsen vom Discounter. Ein Schalter, und der Plan setzt auf mehr Eiweiß. |
| 5 | Nach deinen Regeln | Bild: Küchen-Situationen als Antipp-Flächen | Nur Mikrowelle und Wasserkocher? | Wähl, was in deiner Küche steht, und der Plan nimmt nur Rezepte, die damit gehen. Auch ohne Fisch, ohne Nüsse oder vegetarisch. |
| 6 | Vorher wissen, 2 Personen | Bild: Bon „7 Abendessen, 2 Personen“ | Wocheneinkauf für zwei, fertig geplant | Für zwei Personen, sieben Abende: Plan, Einkaufszettel und was übrig bleibt. Gratis ausprobieren, ohne Konto. |
| 7 | Vorher wissen, 1 Person | Bild: Bon „1 Person“ | Kochen für eine Person, ohne halbe Packungen | Für eine Person plant Wochenbon so, dass Packungen aufgebraucht werden: einmal kochen, am nächsten Tag noch einmal essen. |
| 8 | Familie | Bild: Bon „4 Personen“, Familientisch | Was essen wir? Für vier, die ganze Woche | Plan für vier Personen mit Einkaufszettel nach Abteilungen. Allergien filtert der Plan heraus, prüf trotzdem immer das Etikett. |
| 9 | Gründer | Reel: du erzählst 30 Sekunden, warum es Wochenbon gibt | Warum ich Wochenbon gebaut habe | (deine Geschichte, ohne erfundene Zahlen: die Sonntagsfrage, falsche Preise in anderen Apps, warum ohne Konto) |
| 10 | Abhaken im Laden | Reel: Hand mit Handy im Markt, Häkchen, Balken füllt sich | Abhaken, bis alles im Wagen ist | Der Zettel liegt in der Reihenfolge der Abteilungen. Abhaken, und du siehst, was noch fehlt. Funktioniert auch ohne Netz. |

**Nach bestandenem Kassenbon-Test** kommen vier Konzepte mit Beträgen dazu, immer mit „ca.“, Laden und Preisstand, zum Beispiel: „7 Abendessen für 2 Personen: ca. 38 € bei Aldi (geschätzt, Stand 01/2027).“ **Nie** „spart X €“ und kein Vergleich mit Kochboxen oder Lieferdiensten.

**Identitäts-Wort-Trick** (Andromeda-Playbook): Ist ein Konzept ein Gewinner, laufen danach Kopien mit genau einem Wort mehr: „für Studierende“, „für Paare“, „für Familien“, „für Lidl-Kunden“. Wichtig: Das Wort beschreibt die Zielgruppe, nicht die Person, die die Anzeige sieht (Abschnitt 8).

**Herstellung:** Bilder mit Higgsfield (sobald wieder verbunden) plus App-Screenshots aus dem Planer. Reels als Bildschirmaufnahme mit Untertiteln, 9:16, Hook in Sekunde 1. Je Konzept ein Bild 1:1 und eines 4:5, Reels 9:16.

## 7. Entscheidungsregeln
**Ankerwerte:** Ziel-CAC 11 €. Annahme für Test 1: Von 100 Planer-Starts werden 4 zahlende Kunden **[S]**. Daraus folgt: **Zielkosten je Planer-Start = 0,45 €.** Ehrlich gerechnet: Bei Klickpreisen von 0,40–0,90 € (08) ist dieser Wert schwer zu erreichen. Test 1 misst vor allem, ob die Annahme stimmt. Die echte Kaufquote ersetzt die 4 % nach dem Test.

| Wann | Regel | Folge |
|---|---|---|
| Tag 3 | nichts ändern | Lernphase |
| Tag 7 | Anzeige mit weniger als der Hälfte des fairen Anteils (Budget ÷ Anzahl Anzeigen × 7 × 0,5) | aus, Meta hat sie aussortiert |
| Tag 7 | Link-CTR unter 0,8 % bei mindestens 1.000 Impressionen | Hook oder Bild tauschen |
| ab 10 € je Anzeige | Kosten je Planer-Start über 1,35 € (dreifacher Zielwert) | aus, Konzept abhaken |
| ab 25 € je Anzeige ohne Probezeit-Start | | aus (Regel aus Entscheidungsvorlage) |
| Tag 14 | CAC über alle Käufe über 33 € **oder** Kaufquote je Linkklick unter 1 % | **kein weiteres Werbegeld**, nur organisch und Creator |
| Tag 14 | CAC 11–33 € | Test 2 mit neuen Konzepten, gleiches Budget |
| Tag 14 | CAC unter 11 € bei mindestens 10 Käufen | skalieren |
| Skalieren | +20 % Budget alle 5 Tage, nie mehr | Lernphase bleibt stabil |
| Ermüdung | Frequenz über 2,5 oder CTR −20 % in 7 Tagen | neue Ausführung desselben Konzepts nachschieben |
- **Nie pausieren ohne Ersatz.** Für jeden Gewinner liegen 2 neue Fassungen bereit.
- **Nie eine laufende Anzeige bearbeiten**, das setzt das Lernen zurück. Stattdessen eine neue Anzeige anlegen.
- Wöchentlicher Ablauf: Montag Entscheidungen, Mittwoch neue Anzeigen, Freitag Budget. Ich werte mit dem Windsor.ai-Connector aus und schlage vor, **du** gibst Änderungen frei.

## 8. Recht und Meta-Richtlinien
- **Keine persönlichen Eigenschaften unterstellen** (Meta-Richtlinie): nicht „Du hast wenig Geld?“, nicht „Bist du pleite?“. Erlaubt ist „für Familien“ oder „Wocheneinkauf für zwei“.
- **Euro-Beträge** nur nach bestandenem Kassenbon-Test, immer „ca.“, mit Laden und Stand. Keine Sparversprechen, keine Vergleiche (§ 5, § 6 UWG).
- **Eiweiß:** „mehr Eiweiß“ beschreibt den Plan, nicht ein Lebensmittel. Keine Muskel-, Abnehm- oder Gesundheitsaussagen (HCVO, HWG). „Proteinreich“ nur für Rezepte mit mindestens 20 % Energie aus Protein. Für die Anwältin markiert.
- **Keine erfundenen Kundenstimmen**, keine „Tausende Nutzer“, solange es sie nicht gibt.
- **Creator:** Kennzeichnung „Werbung“ bzw. „Bezahlte Partnerschaft“, kein vorgegebener Sparbetrag, Nutzungsrechte schriftlich.
- **Keine Logos von Aldi, Lidl und Co.** in Anzeigen, nur die Ladennamen im Text.
- **Probezeit:** Der Preis nach der Probezeit steht gleich sichtbar wie „0 €“.
- Prüfung jeder Anzeige vor dem Start mit `marketing-psychology:dark-pattern-check` und der Claim-Freigabe.

## 9. Ablauf bis zum Start
| Woche | Was | Wer |
|---|---|---|
| KW 46–47 (Nov.) | Kassenbon-Test, Gewerbe, Paddle-Sandbox, Domain | Inhaber |
| KW 47 | Pixel und Einwilligung einbauen, `PlanerStart` testen | Claude, Inhaber gibt Pixel-ID |
| KW 48–49 | 10 Konzepte herstellen (Bilder, 3 Reels inkl. Gründer-Video) | Claude (Bilder, Texte), Inhaber (Gründer-Video) |
| KW 48–51 | **organisch** posten (Instagram, TikTok): dieselben Motive, um zu sehen, was ohne Geld zieht | Inhaber postet |
| KW 50 | Meta-Werbebibliothek: Anzeigen von mise, NatiMate, Disha ansehen (Skill `competitor-ads-analyst`) | Inhaber schaut, Claude wertet aus |
| KW 1 (Jan.) | Konto prüfen, Anzeigen hochladen, **Start Test 1** | Inhaber |
| KW 1–2 | tägliche Kurzprüfung, Entscheidungen nach Abschnitt 7 | Claude schlägt vor, Inhaber gibt frei |
| KW 3 | Auswertung Test 1, Entscheidung Test 2 oder Stopp | gemeinsam |
| ab KW 3 | 2–3 Creator anfragen (Spar-, Familien-, Studi-Creator, 10–100 Tsd. Follower) | Inhaber, Claude schreibt Anfrage und Briefing |

## 10. Für dich
- [ ] Meta Business-Manager, Werbekonto, Zahlungsmittel, Pixel anlegen. Pixel-ID mir geben.
- [ ] Domain bei Meta bestätigen.
- [ ] Budget für Test 1 freigeben: Vorschlag höchstens 300 € (20 € am Tag, 14 Tage).
- [ ] Gründer-Video drehen (30 Sekunden, Handy reicht, Leitfaden schreibe ich).
- [ ] Windsor.ai mit dem Werbekonto verbinden, damit ich auswerten kann.
- [ ] Anwältin: Einwilligungsbanner, Conversions API, Eiweiß-Formulierung.
