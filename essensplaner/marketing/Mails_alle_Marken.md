# E-Mail-Strecken · alle vier Marken

Stand: 29.10.2026 · Entwurf zur Freigabe durch den Inhaber, **vor dem Versand anwaltlich prüfen lassen** (Vertrags-, Kündigungs- und Widerrufsmails) · Marken: Zimmerherd (Montage), Kochsatz (Fitness), Zweiflammer (Camping), Wochenschmaus (Alltag) · Dachmarke Tellerkontor

**Grundlagen:** Skills `emails`, `churn-prevention`, `onboarding`, `copywriting` (US-Taktiken nur, wo deutsches Recht sie erlaubt), Markenbücher `marke/*/Markenbuch_*.md`, Recht `recherche/07_Recht_und_Steuern.md` (§ 3, § 4.4, § 4.5, § 5.6), Entscheidungen C3, C4, C9, P1, P2, R2. Produktstand aus `app/` (Plus: bis zu 14 Tage, Vorkoch-Ablauf, Boxen-Plan, PDF; gratis: 1-Tages-Plan mit Einkaufsliste, so oft man will; Freischalten unter Preise → „Schon gekauft? Plus freischalten“).

---

## 0. Spielregeln für alle Mails

| Regel | Umsetzung | Grundlage |
|---|---|---|
| Werbung nur mit Double-Opt-in | Lead-Magnet-, Wartelisten- und Rückgewinnungsmails gehen nur an Adressen mit bestätigtem Klick. Einwilligung speichern: Zeitpunkt, IP, Text und Version des Formulars | § 7 Abs. 2 Nr. 2 UWG, BGH I ZR 164/09 |
| Bestätigungsmail (DOI) ohne Werbung | nur Zweck, Bestätigungsknopf, Hinweis „nicht du? ignorieren“, Pflichtfußzeile. Kein Produktlob, keine Preise | herrschende Praxis nach OLG München 29 U 1682/12 |
| Keine Halteangebote in der Kündigungsstrecke | Kündigungsbestätigung enthält nur die Pflichtangaben und Infos zum Ende. Kein Rabatt, kein „Bist du sicher?“, keine Pause | § 312k BGB, BGH I ZR 200/25 (laut `07` nur über Sekundärquellen erfasst, Volltext prüfen) |
| Rückgewinnung erst nach Vertragsende | nur bei bestehender Werbeeinwilligung, frühestens 30 Tage nach Wirkzeitpunkt, ohne Rabatt, ohne Druck | § 7 UWG; Markenregel |
| Keine Fake-Dringlichkeit | keine Countdowns, kein „nur heute“, keine Streichpreise, keine erfundenen Zahlen oder Stimmen | § 5 UWG, UWG Anhang Nr. 7, 23b/c |
| Gratis nur für Gratis | „gratis“ nur für den 1-Tages-Plan. Testphase immer: „7 Tage 0 €, danach 44,99 € im Jahr“ bzw. „6,99 € im Monat“ in gleicher Größe | UWG Anhang Nr. 21, § 312j BGB |
| Keine Gesundheits-, Abnehm-, Spar- oder Umweltversprechen | kein „gesund“, „fit“, „spart X €“, „weniger Müll“, „spart Gas“, „allergiesicher“ | HCVO, HWG, § 5 UWG, RL (EU) 2024/825 |
| Haltbarkeit nur nach unserer Lagerregel (BfR, FSA, USDA, teils strenger) | Kühlschrank höchstens 2 Tage; Reis, Nudeln, Fisch, Hack, Ei höchstens 1 Tag; ungekühlt höchstens 2 Stunden; aufwärmen auf mindestens 70 °C für 2 Minuten | ENTSCHEIDUNGEN C9 |
| Keine App-Daten im Mail-Tool | Geräte, Allergien, Makros, Personen, Kinder nie mit der Adresse speichern oder für Segmente nutzen | Art. 9 DSGVO, ENTSCHEIDUNGEN C3 |
| Zahlen mit Stand | Rezeptzahlen „Stand 10/2026“, vor jedem Versand neu zählen. Kosten nur nach Kassenbon-Test, sonst Absatz streichen | `11` Punkt 4 |
| Form | Betreff höchstens 45 Zeichen, ohne Ausrufezeichen, ohne Gedankenstrich, ohne Emoji, ohne „Re:“. Vorschauzeile wiederholt den Betreff nicht | Skill `emails` |
| Name | Bei Leads kennen wir nur die Adresse: Anrede „Hallo,“. Nach dem Kauf {{NAME}} nur, wenn Paddle ihn liefert, sonst „Hallo,“ | Datensparsamkeit |

**Mailarten:**
- **W = Werbung** (DOI nötig, Abmeldelink Pflicht): Lead-Magnet-Strecke, Rückgewinnung.
- **T = Transaktion/Vertrag** (kein Abmeldelink, keine Werbung): DOI-Bestätigung, Kaufbestätigung, Vertragsbestätigung, Testphase-Erinnerung, Kündigungs- und Widerrufsbestätigung, Pass-Ende.
- **S = Service-Tipp an Kunden** (Tag 2): kein Verkauf darin, trotzdem Link „Keine Tipps mehr“, weil es fair ist und Beschwerden vermeidet.

---

## 0.1 Gemeinsame Bausteine

Die Bausteine werden im Mail-Tool als Snippets angelegt und in jeder Marke gleich verwendet. Rechtstexte bleiben in allen Marken wortgleich, nur Marke und Absender wechseln.

### B1 · Impressum-Fußzeile (jede Mail)

```
{{MARKE}} · ein Produkt vom Tellerkontor
{{INHABER_NAME}} · {{ANSCHRIFT}} (keine Postfachadresse)
E-Mail: {{KONTAKT_EMAIL}} · Telefon: {{TELEFON}}
{{USTID_ODER_WIDNR}}
Impressum: {{URL_IMPRESSUM}} · Datenschutz: {{URL_DATENSCHUTZ}}
Verträge hier kündigen: {{URL_KUENDIGEN}} · Vertrag widerrufen: {{URL_WIDERRUFEN}}
```
- Der Link „Verträge hier kündigen“ steht in **Kundenmails** (T, S) immer. In Lead-Mails ohne Vertrag kann er entfallen, schadet aber nicht.
- Bei Werbemails mit redaktionellem Inhalt zusätzlich: „Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: {{INHABER_NAME}}, {{ANSCHRIFT}}“ (`07` § 4.5).
- Kein Link auf die OS-Plattform (abgeschaltet seit 20.07.2025, `07` § 4.5).

### B2 · Werbe-Fußzeile (nur W-Mails, über B1)

```
Du bekommst diese Mail, weil du dich am {{DOI_DATUM}} für {{LEADMAGNET}} angemeldet
und die Anmeldung bestätigt hast. Abmelden geht mit einem Klick: {{ABMELDELINK}}
Deine Adresse nutzen wir nur für diese Mails. Was du im Planer eingibst, bleibt auf deinem Gerät.
```
- Technisch zusätzlich Kopfzeilen `List-Unsubscribe` und `List-Unsubscribe-Post` (Ein-Klick-Abmeldung, wird von Gmail und Yahoo für Massenversender verlangt).
- Abmeldung wirkt sofort, ohne Login, ohne Nachfrage nach dem Grund.

### B3 · Vertragsdaten (in der Vertragsbestätigung, je nach Produkt)

```
Vertrag:            {{PRODUKT}}  (Plus Monat | Plus Jahr | Montage-Pass | Saison-Pass)
Bestellnummer:      {{BESTELLNR}}
Vertragsschluss:    {{DATUM_BESTELLUNG}}, {{UHRZEIT_BESTELLUNG}} Uhr
Verkäufer:          Paddle.com Market Ltd., London, als Wiederverkäufer („Merchant of Record“).
                    Paddle schickt dir die Rechnung in einer eigenen Mail.
Leistung erbringt:  {{INHABER_NAME}}, Tellerkontor, {{ANSCHRIFT}}
Leistung:           {{MARKE}} Plus: Wochenpläne bis zu 14 Tage am Stück, Vorkoch-Ablauf,
                    Boxen-Plan, PDF zum Ausdrucken. Nutzung im Browser, ohne Konto.
                    Freischaltung per Lizenzschlüssel, geprüft auf deinem Gerät.
Preis:              {{PREIS}} inkl. USt
```

**Laufzeit-Block je Produkt (genau einen einsetzen):**

- **Plus Monat:** „Die ersten 7 Tage kosten 0 €. Erste Abbuchung von 6,99 € am {{ABBUCHUNG_DATUM}}, danach jeden Monat am gleichen Tag. Der Vertrag verlängert sich jeweils um einen Monat und ist jederzeit zum Ende des laufenden Monats kündbar. Kündigst du in den ersten 7 Tagen, zahlst du nichts.“
- **Plus Jahr:** „Die ersten 7 Tage kosten 0 €. Erste Abbuchung von 44,99 € am {{ABBUCHUNG_DATUM}}. Erstlaufzeit 12 Monate bis {{ENDE_ERSTLAUFZEIT}}. Danach läuft der Vertrag auf unbestimmte Zeit weiter und ist jederzeit mit einer Frist von einem Monat kündbar. Preis und Abrechnung danach: {{PREIS_NACH_ERSTLAUFZEIT}}. Kündigst du in den ersten 7 Tagen, zahlst du nichts.“
  **[OFFEN, vor Kassenstart klären:** Preis und Abrechnungsrhythmus nach den ersten 12 Monaten sind in `config.js` und den AGB nicht festgelegt. Ohne klare Angabe ist die Verlängerung angreifbar (§ 309 Nr. 9 BGB, § 312j Abs. 2 BGB).**]**
- **Montage-Pass / Saison-Pass:** „Einmalzahlung {{PREIS}}. Feste Laufzeit von {{PASS_START}} bis {{PASS_ENDE}} (3 bzw. 6 Monate). Der Pass endet automatisch. Es gibt keine Verlängerung und keine weitere Abbuchung. Eine Testphase gibt es beim Pass nicht.“

**Kündigungsweg (immer):** „Kündigen kannst du jederzeit ohne Login über ‚Verträge hier kündigen‘: {{URL_KUENDIGEN}}. Oder per E-Mail an {{KONTAKT_EMAIL}}.“

### B4 · Widerruf und Zustimmungsvermerk (in der Vertragsbestätigung)

```
Widerrufsrecht: Du kannst diesen Vertrag innerhalb von 14 Tagen ab Vertragsschluss
ohne Angabe von Gründen widerrufen. Am einfachsten über „Vertrag widerrufen“:
{{URL_WIDERRUFEN}}. Die vollständige Widerrufsbelehrung und das Muster-Widerrufsformular
findest du im Anhang dieser Mail (PDF) und unter {{URL_WIDERRUFSBELEHRUNG}}.

Deine Zustimmung zum sofortigen Start: Du hast bei der Bestellung am {{DATUM_BESTELLUNG}}
um {{UHRZEIT_BESTELLUNG}} Uhr ausdrücklich verlangt, dass wir mit der Leistung vor Ablauf
der Widerrufsfrist beginnen. Du hast bestätigt, dass dir bekannt ist: Widerrufst du,
zahlst du einen anteiligen Betrag für die bis dahin erbrachte Leistung.
```
- **Textform:** Die Vertragsbestätigung muss den Inhalt selbst tragen (§ 312f Abs. 2 BGB). Ein Link genügt nicht. Darum **AGB, Widerrufsbelehrung und Muster-Widerrufsformular als PDF anhängen** (Muster: Anlage 1 und 2 zu Art. 246a EGBGB).
- Der Zustimmungsvermerk wird **nur** eingesetzt, wenn die Checkbox (nicht vorangekreuzt) wirklich angeklickt wurde. Datum und Uhrzeit kommen aus dem Kassen-Protokoll.
- **[OFFEN, Anwalt:** Bei Paddle als Wiederverkäufer ist zu klären, wer Widerrufsadressat ist und ob die Widerrufsbelehrung auf `widerruf.html` (nennt den Inhaber) zu Paddles Bedingungen passt. Bis dahin nichts versenden.**]**

### B5 · Kündigungsdaten (in jeder Kündigungsbestätigung, § 312k Abs. 4 BGB)

```
Deine Kündigung ist bei uns eingegangen am {{EINGANG_DATUM}} um {{EINGANG_UHRZEIT}} Uhr (MEZ/MESZ).

Das hast du uns geschickt:
  Art der Kündigung:   {{KUEND_ART}}  (ordentlich | außerordentlich)
  Grund:               {{KUEND_GRUND}}  (nur bei außerordentlicher Kündigung, sonst Zeile weglassen)
  Name:                {{KUEND_NAME}}
  E-Mail:              {{KUEND_EMAIL}}
  Vertrag:             {{KUEND_VERTRAG}}  (Angabe aus dem Formular, ggf. mit Bestell- oder Lizenznummer)
  Gewünschter Termin:  {{KUEND_ZUM}}  (oder: „frühestmöglicher Termin“)

Die Kündigung wirkt zum: {{WIRKDATUM}}
```
Dazu genau einen **Wirk-Satz** einsetzen:
- **In der Testphase:** „Du hast in der Testphase gekündigt. Es wird nichts abgebucht. Plus bleibt bis {{WIRKDATUM}} nutzbar.“
- **Plus Monat:** „Plus läuft bis zum Ende des bezahlten Monats am {{WIRKDATUM}}. Danach wird nichts mehr abgebucht.“
- **Plus Jahr, in den ersten 12 Monaten:** „Plus läuft bis zum Ende der Erstlaufzeit am {{WIRKDATUM}}. Danach wird nichts mehr abgebucht.“
- **Plus Jahr, nach 12 Monaten:** „Die Frist beträgt einen Monat. Plus läuft bis {{WIRKDATUM}}. Danach wird nichts mehr abgebucht.“
- **Gewünschter Termin zu früh:** „Zu deinem Wunschtermin {{KUEND_ZUM}} ist die ordentliche Kündigung nicht möglich. Sie wirkt deshalb zum frühestmöglichen Termin, dem {{WIRKDATUM}}.“
- **Pass:** „Dein Pass hat eine feste Laufzeit und endet am {{PASS_ENDE}} ohnehin automatisch. Wir haben deine Kündigung gespeichert. Es gibt keine weitere Abbuchung.“ **[Anwalt: Ob bei einem Pass mit Einmalzahlung eine vorzeitige ordentliche Kündigung mit anteiliger Erstattung geschuldet ist, klären.]**
- **Außerordentlich:** „Wir prüfen den genannten Grund und melden uns bis {{ANTWORT_BIS}}. Ist die Kündigung berechtigt, wirkt sie ab Eingang.“

Pflicht: Die Mail geht **automatisch und sofort** nach dem Klick auf „Jetzt kündigen“ raus. Die gleiche Bestätigung steht auf der Bestätigungsseite zum Speichern oder Drucken bereit (§ 312k Abs. 3 BGB). Die Kündigung wird bei Paddle sofort ausgeführt.

### B6 · Widerrufsdaten (in jeder Widerrufs-Eingangsbestätigung)

```
Dein Widerruf ist bei uns eingegangen am {{EINGANG_DATUM}} um {{EINGANG_UHRZEIT}} Uhr (MEZ/MESZ).

Das hast du uns geschickt:
  Name:        {{WID_NAME}}
  E-Mail:      {{WID_EMAIL}}
  Vertrag:     {{WID_VERTRAG}}  (mit Bestellnummer, falls angegeben)
  Bestellt am: {{DATUM_BESTELLUNG}}
```
Dazu den passenden **Folgen-Block**:
- **Noch nichts bezahlt (Widerruf in der Testphase):** „Es wurde noch nichts abgebucht, und es wird auch nichts abgebucht. Dein Vertrag ist damit beendet.“
- **Schon bezahlt:** „Wir erstatten dir {{ERSTATTUNG}} spätestens 14 Tage nach Eingang deines Widerrufs, also bis {{ERSTATTUNG_BIS}}. Die Erstattung läuft über Paddle auf dasselbe Zahlungsmittel, mit dem du bezahlt hast. Dafür fallen keine Gebühren an.“ Falls Wertersatz verlangt wird, zusätzlich: „Du hattest verlangt, dass wir sofort beginnen. Für die {{GENUTZTE_TAGE}} Tage bis zu deinem Widerruf behalten wir anteilig {{WERTERSATZ}} ein.“
  **[Entscheidung Inhaber:** Wertersatz einbehalten oder voll erstatten. Volle Erstattung ist einfacher und vermeidet Streit über Centbeträge. Mit Anwalt abstimmen, `07` § 3.5.**]**
- **Nach Ablauf der 14 Tage:** „Dein Widerruf kam nach Ablauf der Widerrufsfrist am {{FRISTENDE}}. Wir behandeln ihn als ordentliche Kündigung zum frühestmöglichen Termin, dem {{WIRKDATUM}}. Du bekommst dazu gleich eine eigene Kündigungsbestätigung. Wenn du das nicht willst, antworte einfach auf diese Mail.“ **[Anwalt prüfen]**
- **Immer:** „Mit dem Widerruf endet dein Recht, Plus zu nutzen. Den kostenlosen 1-Tages-Plan kannst du weiter nutzen. Was du im Planer eingegeben hast, bleibt auf deinem Gerät.“

### B7 · Neuer Lizenzschlüssel nach Verlängerung (technisch nötig)

Der Schlüssel trägt ein Ablaufdatum („bis“, `tools/lizenz.mjs`). Bei jeder erfolgreichen Abbuchung braucht der Kunde einen neuen Schlüssel, sonst meldet die App „abgelaufen“.

- **Absender:** {{MARKE}} <hallo@{{DOMAIN}}> · **Art:** T · **Auslöser:** Paddle meldet erfolgreiche Verlängerungszahlung
- **Betreff:** Dein neuer Plus-Schlüssel bis {{LIZENZ_BIS}} (40 mit Datum)
- **Vorschau:** Einmal einfügen, dann läuft Plus weiter. Dein alter Schlüssel gilt noch bis {{LIZENZ_BIS_ALT}}.
- **Text:**
  > Hallo,
  >
  > deine Zahlung für {{PRODUKT}} ist angekommen. Hier ist dein neuer Schlüssel:
  >
  > `{{LIZENZ}}`
  >
  > So geht's: Öffne {{URL_PREISE}}, scroll zu „Schon gekauft? Plus freischalten“, füge den Schlüssel ein und tippe auf „Plus freischalten“.
  >
  > Die Rechnung kommt wie immer von Paddle.
  >
  > [B1]
- **Empfehlung Technik:** Die App holt den neuen Schlüssel besser selbst ab (z. B. über einen Abruf mit Bestellnummer). Dann entfällt diese Mail. Bis dahin ist sie Pflicht, sonst verliert der Kunde bezahlten Zugang.

---
## 1. Zimmerherd (Montage)

**Ton:** wie ein Kollege im Bauwagen. Kurz, trocken, hilfsbereit. Sätze unter 15 Wörtern, viele lesen Deutsch als Zweitsprache. Geräte und Zahlen konkret. Nie „gesund“, nie „spart X €“, keine Witze über Herkunft oder Sprache.
**Absender:** Marketing und Tipps: `Zimmerherd <hallo@{{DOMAIN_ZIMMERHERD}}>` · Verträge: `Zimmerherd Verträge <vertrag@{{DOMAIN_ZIMMERHERD}}>` · Antworten gehen an ein Postfach, das gelesen wird.
**Einwilligungstext im Formular** (Häkchen nicht vorangekreuzt): „Ja, schickt mir den Zimmer-Check als PDF und in den nächsten zwei Wochen bis zu vier Mails mit Tipps und Angeboten zu Zimmerherd, danach höchstens eine im Monat. Abmelden geht jederzeit über den Link in jeder Mail. [Datenschutz]“
**Obergrenze:** höchstens vier Werbemails in der Startstrecke (Markenbuch, Abschnitt 8).

### Z-0 · Double-Opt-in (T)

- **Auslöser:** sofort nach Absenden des Formulars. Link gilt 7 Tage. Ohne Klick: keine weitere Mail, Adresse nach 30 Tagen löschen.
- **Absender:** Zimmerherd <hallo@…>
- **Betreff:** Bitte bestätigen: dein Zimmer-Check (35)
- **Vorschau:** Ein Klick, dann kommt das PDF. Warst du das nicht? Dann ignorier diese Mail einfach.
- **Text:**
  > Hallo,
  >
  > du hast den Zimmer-Check bei Zimmerherd angefordert.
  > Bitte bestätige deine Adresse mit diesem Knopf:
  >
  > **[Ja, Adresse bestätigen]** → {{DOI_LINK}}
  >
  > Danach bekommst du das PDF „Zimmer-Check · Montagekoffer“. In den nächsten zwei Wochen schicken wir dir bis zu vier Mails mit Tipps und Angeboten zu Zimmerherd. Danach höchstens eine im Monat. Abmelden geht in jeder Mail mit einem Klick.
  >
  > Der Link gilt 7 Tage. Du warst das nicht? Dann musst du nichts tun. Ohne Klick schreiben wir dir nicht wieder.
  >
  > Mehr zum Datenschutz: {{URL_DATENSCHUTZ}}
- **Variante Warteliste** (solange die Kasse nicht offen ist): Satz 1 ersetzen durch „du willst wissen, wann Zimmerherd Plus und der Montage-Pass zu kaufen sind.“ Satz 3 ersetzen durch „Danach schreiben wir dir einmal, wenn es losgeht, und bis dahin höchstens eine Mail im Monat mit Tipps.“ Betreff: „Bitte bestätigen: Zimmerherd-Warteliste“ (39).
- **Pflichtangaben:** B1. Keine Werbung, keine Preise in dieser Mail.

### Z-L1 · Tag 0: Dein Zimmer-Check ist da (W)

- **Auslöser:** sofort nach dem DOI-Klick
- **Betreff:** Dein Zimmer-Check ist da (24)
- **Vorschau:** Drei Dinge für den nächsten Einsatz: Geräte ankreuzen, Vermieter fragen, Lagerkarte ins Fach.
- **Text:**
  > Hallo,
  >
  > hier ist dein PDF: **[Zimmer-Check herunterladen]** → {{LINK_PDF}}
  >
  > Drei Dinge, die sich vor dem nächsten Einsatz lohnen:
  >
  > **1. Kreuz an, was im Zimmer steht.** Nur Wasserkocher: 47 Rezepte. Mit Mikrowelle: 59. Mit einer Kochplatte dazu: 119 (jeweils mit Kühlschrank, Stand 10/2026). Die Tabelle steht auf Seite 1.
  >
  > **2. Frag den Vermieter, bevor die Platte mitkommt.** Mobile Kochgeräte im Zimmer brauchen oft seine Erlaubnis. Eine Textvorlage für die Frage ist im PDF.
  >
  > **3. Die Lagerkarte gehört an dein Fach.** Gekochtes hält im Kühlschrank höchstens 2 Tage. Reis, Nudeln, Fisch, Hack und Ei nur 1 Tag. Ungekühlt höchstens 2 Stunden. Die Quellen je Regel (BfR, FSA, USDA, teils strenger) stehen auf der Karte.
  >
  > Den Plan für einen Tag bekommst du gratis. Ohne Konto, ohne E-Mail:
  > **[Tagesplan machen]** → {{URL_PLANER}}?v=montage
  >
  > Gruß
  > Zimmerherd
- **Pflichtangaben:** B2 + B1

### Z-L2 · Tag 3: Die Sonntagskiste (W)

- **Auslöser:** 3 Tage nach Z-L1, Versand Sonntag 15 Uhr, falls der Tag passt (sonst nächster Sonntag, höchstens 6 Tage später)
- **Betreff:** Sonntag kochen, bis Dienstag essen (34)
- **Vorschau:** Was du zu Hause vorkochst, hält nicht die ganze Woche. So teilst du Montag bis Mittwoch auf.
- **Text:**
  > Hallo,
  >
  > viele kochen sonntags vor und nehmen Boxen mit. Gute Idee. Nur hält das nicht bis Donnerstag.
  >
  > So teilst du es auf:
  >
  > - **Montag:** alles mit Reis oder Nudeln. Das hält gekühlt nur 1 Tag. Zum Beispiel Chili con Carne mit Reis aus einem Topf.
  > - **Dienstag:** Eintopf ohne Reis und Nudeln. Der hält 2 Tage. Zum Beispiel Linseneintopf mit Wiener Würstchen.
  > - **Ab Mittwoch:** frisch vor Ort, mit dem, was im Zimmer steht.
  >
  > Zwei Regeln für unterwegs:
  > - Die Kiste kommt in die Kühltasche. Ungekühlt höchstens 2 Stunden.
  > - Aufwärmen, bis es durch und durch heiß ist: mindestens 70 °C für 2 Minuten. In der Mikrowelle einmal umrühren.
  >
  > Mit Plus plant Zimmerherd die Sonntagskiste mit Boxen, Reihenfolge und Datum. Den Tagesplan probierst du gratis:
  > **[Tagesplan machen]** → {{URL_PLANER}}?v=montage
  >
  > Gruß
  > Zimmerherd
- **Pflichtangaben:** B2 + B1

### Z-L3 · Tag 6: Nur ein Wasserkocher (W)

- **Auslöser:** 6 Tage nach Z-L1, Versand Mo–Do 18 Uhr
- **Betreff:** Nur ein Wasserkocher? Reicht. (29)
- **Vorschau:** 21 warme Mittag- und Abendessen gehen nur mit heißem Wasser. Zwei davon in 5 Minuten Arbeit.
- **Text:**
  > Hallo,
  >
  > Hotel ohne Küche. Auf dem Schrank steht ein Wasserkocher. Das reicht für mehr als Tütensuppe.
  >
  > Bei Zimmerherd gehen 47 Rezepte nur mit Wasserkocher und Kühlschrank. 21 davon sind Mittag- oder Abendessen (Stand 10/2026). Zwei Beispiele:
  >
  > - **Kartoffelpüree mit Wiener Würstchen und Senf.** Rund 5 Minuten Arbeit.
  > - **Couscous-Salat mit Kichererbsen.** Rund 10 Minuten Arbeit, geht auch als Box für den nächsten Mittag. Hält gekühlt 1 Tag.
  >
  > Spät angekommen, alles zu? Ein kleiner Vorrat ohne Kühlschrank hilft: Haferflocken, Nussmix, Erdnussmus, Reiswaffeln. Im Planer findest du die Rezepte mit dem Haken „ohne Kühlschrank“.
  >
  > **[Wasserkocher ankreuzen und Tag planen]** → {{URL_PLANER}}?v=montage
  >
  > Gruß
  > Zimmerherd
- **Optionaler Kosten-Absatz, nur nach bestandenem Kassenbon-Test:** „Was kostet so ein Tag? Ein echter Plan für 1 Person bei {{LADEN}}: geschätzt {{BETRAG}} € pro Tag (Preisstand {{PREISSTAND}}, regional abweichend). Deine Pauschale liegt bei 14 € bzw. 28 € (§ 9 Abs. 4a EStG). Ob und wie viel du bekommst, regelt dein Arbeitgeber.“ Ohne Test: Absatz streichen.
- **Pflichtangaben:** B2 + B1

### Z-L4 · Tag 10: Montage-Pass und Plus (W)

- **Auslöser:** 10 Tage nach Z-L1. Nicht senden, wenn die Adresse schon Kunde ist.
- **Betreff:** Ein Pass für den Einsatz: 17,99 € (33)
- **Vorschau:** 3 Monate Plus, endet von selbst. Oder Plus im Abo. Beide Preise auf einen Blick.
- **Text:**
  > Hallo,
  >
  > der Tagesplan bleibt gratis, so oft du willst. Für die ganze Woche gibt es Plus:
  >
  > - Plan bis zu 14 Tage am Stück, mit einer Einkaufsliste nach Laden sortiert
  > - Vorkoch-Ablauf für die Sonntagskiste, mit Boxen und Datum
  > - PDF zum Ausdrucken, falls das Handy im Zimmer keinen Empfang hat
  >
  > Zwei Wege:
  >
  > **Montage-Pass: 17,99 € einmalig für 3 Monate.** Endet automatisch. Keine Verlängerung, kein Abo.
  >
  > **Plus im Abo:** 6,99 € im Monat oder 44,99 € im Jahr. Die ersten 7 Tage kosten 0 €, danach zahlst du den Preis. Monatlich kündbar bzw. nach dem ersten Jahr monatlich kündbar.
  >
  > Kündigen geht ohne Login über „Verträge hier kündigen“. Deine Geräte und Pläne bleiben auf deinem Handy. Für den Schlüssel brauchen wir nur deine E-Mail.
  >
  > **[Preise ansehen]** → {{URL_PREISE}}?v=montage
  >
  > Passt gerade nicht? Kein Problem. Der Tagesplan bleibt.
  >
  > Gruß
  > Zimmerherd
- **Pflichtangaben:** B2 + B1. Danach Wechsel in den Monatsrhythmus (höchstens eine Mail im Monat, nur mit neuem Inhalt).

### Z-K1 · Kaufbestätigung mit Lizenzschlüssel (T)

- **Auslöser:** sofort, wenn Paddle die Bestellung meldet (Webhook). Für Abo und Pass.
- **Absender:** Zimmerherd <hallo@…>
- **Betreff:** Dein Zimmerherd-Schlüssel ist da (32)
- **Vorschau:** Einmal einfügen, dann läuft Plus. So geht's in drei Schritten.
- **Text:**
  > Hallo {{NAME}},
  >
  > danke für deinen Kauf: **{{PRODUKT}}**. Hier ist dein Lizenzschlüssel:
  >
  > `{{LIZENZ}}`
  >
  > **Plus freischalten:**
  > 1. Öffne {{URL_PREISE}}?v=montage auf dem Handy, mit dem du planst.
  > 2. Scroll zu „Schon gekauft? Plus freischalten“. Kopier den Schlüssel ganz und füg ihn ein.
  > 3. Tipp auf „Plus freischalten“. Oben im Planer steht dann „Plus aktiv“.
  >
  > **Gut zu wissen:**
  > - Der Schlüssel wird nur auf deinem Gerät gespeichert. Neues Handy oder anderer Browser? Einfach noch mal einfügen.
  > - Löschst du die Browserdaten, ist auch der Schlüssel weg. Heb diese Mail auf.
  > - Der Schlüssel gilt bis {{LIZENZ_BIS}}.
  > - *Nur Abo:* Die ersten 7 Tage kosten 0 €. Erste Abbuchung am {{ABBUCHUNG_DATUM}}.
  > - *Nur Pass:* Dein Pass läuft bis {{PASS_ENDE}} und endet dann von selbst.
  >
  > Die Rechnung kommt in einer eigenen Mail von Paddle, unserem Zahlungsdienstleister. Die Vertragsunterlagen schicken wir dir gleich getrennt.
  >
  > Erster Schritt im Planer: Kreuz an, was im Zimmer steht.
  >
  > Klappt was nicht? Antworte einfach auf diese Mail.
  >
  > Gruß
  > Zimmerherd
- **Pflichtangaben:** B1

### Z-K2 · Vertragsbestätigung (T, Textform)

- **Auslöser:** sofort nach Z-K1, spätestens vor Beginn der Leistung (§ 312f Abs. 2 BGB). **Anhänge:** AGB, Widerrufsbelehrung, Muster-Widerrufsformular als PDF.
- **Absender:** Zimmerherd Verträge <vertrag@…>
- **Betreff:** Deine Vertragsbestätigung: {{PRODUKT}} (Montage-Pass: 39)
- **Vorschau:** Laufzeit, Preis, Kündigung und Widerruf auf einen Blick. Bitte aufheben.
- **Text:**
  > Hallo {{NAME}},
  >
  > hier stehen alle Angaben zu deinem Vertrag. Bitte heb diese Mail auf.
  >
  > [B3 Vertragsdaten + passender Laufzeit-Block + Kündigungsweg]
  >
  > [B4 Widerruf und Zustimmungsvermerk]
  >
  > Im Anhang: AGB, Widerrufsbelehrung, Muster-Widerrufsformular.
  >
  > Fragen? Antworte auf diese Mail.
  >
  > Zimmerherd
- **Pflichtangaben:** B1

### Z-K3 · Tag 2: Dein erster Vorkochtag (S)

- **Auslöser:** 2 Tage nach Kauf, 17 Uhr. Für alle Käufer.
- **Absender:** Zimmerherd <hallo@…>
- **Betreff:** Dein erster Vorkochtag in 4 Schritten (37)
- **Vorschau:** Plan auf zwei Tage, Boxen beschriften, Reihenfolge nach Haltbarkeit. Zehn Minuten Planung.
- **Text:**
  > Hallo,
  >
  > Plus kann mehr als einen Tag. So machst du deinen ersten Vorkochtag:
  >
  > 1. **Plan auf 2 bis 3 Tage stellen.** Mehr lohnt sich zum Vorkochen nicht. Gekochtes hält im Kühlschrank höchstens 2 Tage.
  > 2. **Reiter „Vorkochen“ öffnen.** Dort steht die Reihenfolge: was zuerst auf die Platte, was in die Mikrowelle.
  > 3. **Boxen beschriften.** Gericht, Datum, „essen bis“. Etiketten sind im Zimmer-Check-PDF. Klebeband und Stift tun es auch.
  > 4. **Reis und Nudeln zuerst essen.** Die halten nur 1 Tag.
  >
  > Kein Platz im Fach? Nimm den Kühlschrank aus den Geräten. Dann plant Zimmerherd nur Gerichte aus dem Vorrat.
  >
  > **[Plan für morgen machen]** → {{URL_PLANER}}?v=montage
  >
  > Gruß
  > Zimmerherd
  >
  > Keine Tipps mehr? {{TIPPS_ABMELDEN}}
- **Pflichtangaben:** B1. Kein Verkauf in dieser Mail.

### Z-K4 · Tag 5: Testphase endet (T, nur Abo)

- **Auslöser:** Tag 5 nach Abo-Start, 2 Tage vor Ende der Testphase. Nicht für Pass-Käufer. Nicht, wenn schon gekündigt.
- **Absender:** Zimmerherd Verträge <vertrag@…>
- **Betreff:** Deine Testphase endet am {{DATUM}} (35 mit Datum)
- **Vorschau:** Danach kostet Plus {{PREIS}}. Wenn das passt, musst du nichts tun. Kündigen geht ohne Login.
- **Text:**
  > Hallo {{NAME}},
  >
  > kurz zur Erinnerung, damit nichts überraschend kommt:
  >
  > - Deine 7 Tage zu 0 € enden am **{{DATUM}}**.
  > - Danach kostet {{PRODUKT}} **{{PREIS}}**. Erste Abbuchung am {{ABBUCHUNG_DATUM}}.
  >
  > Passt das, musst du nichts tun. Plus läuft einfach weiter.
  >
  > Passt es nicht, kündige vor dem {{DATUM}}. Dann zahlst du nichts.
  > **[Verträge hier kündigen]** → {{URL_KUENDIGEN}}
  >
  > Lieber kein Abo, aber Plus für den nächsten Einsatz? Den Montage-Pass gibt es für 17,99 € für 3 Monate. Er endet von selbst.
  >
  > Gruß
  > Zimmerherd
- **Pflichtangaben:** B1. Freiwillige Mail (gesetzlich noch nicht Pflicht, `07` § 3.4). Hinweis auf den Pass ist eine echte Alternative ohne Abo, kein Halteangebot, weil keine Kündigung läuft. Wer es strenger will: Satz streichen.

### Z-E1 · Kündigungsbestätigung (T, § 312k Abs. 4 BGB)

- **Auslöser:** sofort nach „Jetzt kündigen“
- **Absender:** Zimmerherd Verträge <vertrag@…>
- **Betreff:** Deine Kündigung ist angekommen (30)
- **Vorschau:** Eingang {{EINGANG_DATUM}}, {{EINGANG_UHRZEIT}} Uhr. Wirksam zum {{WIRKDATUM}}. Alle Angaben im Überblick.
- **Text:**
  > Hallo {{KUEND_NAME}},
  >
  > wir bestätigen deine Kündigung.
  >
  > [B5 Kündigungsdaten + passender Wirk-Satz]
  >
  > Du musst nichts weiter tun.
  >
  > Danach geht der 1-Tages-Plan weiter gratis. Deine Geräte und Einstellungen bleiben auf deinem Handy.
  >
  > Hast du unseren Newsletter abonniert, läuft der davon getrennt. Abmelden geht über den Link in jeder Newsletter-Mail.
  >
  > Zimmerherd
- **Pflichtangaben:** B1. Keine Umfrage, kein Angebot, kein „Schade“ mit Rückholversuch.

### Z-E2 · Widerrufs-Eingangsbestätigung (T)

- **Auslöser:** sofort nach „Widerruf bestätigen“ oder nach Eingang eines Widerrufs per Mail
- **Absender:** Zimmerherd Verträge <vertrag@…>
- **Betreff:** Dein Widerruf ist angekommen (28)
- **Vorschau:** Eingang {{EINGANG_DATUM}}, {{EINGANG_UHRZEIT}} Uhr. So geht es mit deinem Geld weiter.
- **Text:**
  > Hallo {{WID_NAME}},
  >
  > wir bestätigen den Eingang deines Widerrufs.
  >
  > [B6 Widerrufsdaten + passender Folgen-Block]
  >
  > Fragen? Antworte auf diese Mail.
  >
  > Zimmerherd
- **Pflichtangaben:** B1

### Z-P1 · Pass endet in 7 Tagen (T)

- **Auslöser:** 7 Tage vor {{PASS_ENDE}}, 18 Uhr
- **Absender:** Zimmerherd <hallo@…>
- **Betreff:** Dein Montage-Pass läuft am {{PASS_ENDE}} aus (41 mit Datum)
- **Vorschau:** Er endet von selbst. Es wird nichts abgebucht. Was danach bleibt, steht hier.
- **Text:**
  > Hallo {{NAME}},
  >
  > dein Montage-Pass endet am **{{PASS_ENDE}}**. Das ist nur eine Info.
  >
  > - Er endet von selbst. Es gibt keine Verlängerung und keine Abbuchung.
  > - Danach planst du wieder einen Tag gratis, so oft du willst.
  > - Deine Geräte und Einstellungen bleiben auf deinem Handy.
  > - Brauchst du die Einkaufsliste vom aktuellen Plan? Speicher sie vorher als PDF.
  >
  > Steht der nächste Einsatz schon an? Ein neuer Pass kostet wieder 17,99 € für 3 Monate: {{URL_PREISE}}?v=montage
  >
  > Gruß
  > Zimmerherd
- **Pflichtangaben:** B1. Der letzte Absatz ist ein sachlicher Hinweis auf dasselbe Produkt (§ 7 Abs. 3 UWG nur, wenn beim Kauf auf das Widerspruchsrecht hingewiesen wurde). Sonst den Absatz streichen.

### Z-R1 · Rückgewinnung, 30 Tage nach Ende (W)

- **Auslöser:** 30 Tage nach Wirkzeitpunkt der Kündigung bzw. nach Pass-Ende. **Nur** mit bestätigter Werbeeinwilligung, nicht abgemeldet, nicht wieder Kunde.
- **Betreff:** Neuer Einsatz, neues Zimmer? (28)
- **Vorschau:** Der Tagesplan ist weiter gratis. Und ein Tipp für Zimmer mit Mikrowelle.
- **Text:**
  > Hallo,
  >
  > seit einem Monat bist du ohne Plus unterwegs. Der Tagesplan läuft weiter gratis.
  >
  > Ein Tipp für Zimmer mit Mikrowelle: Mit Wasserkocher, Mikrowelle und Kühlschrank gehen 59 Rezepte, 22 davon zum Abendessen (Stand 10/2026). Kreuz beides an, und der Plan nimmt nur diese.
  >
  > {{NEU_SEIT_ENDE}} *(nur einsetzen, wenn es wirklich Neues gibt, z. B. neue Rezepte mit Zahl. Sonst Absatz streichen.)*
  >
  > Wenn du für einen Einsatz wieder Plus willst: Montage-Pass 17,99 € für 3 Monate, endet von selbst. Oder Plus im Abo ab 6,99 € im Monat.
  > **[Tagesplan machen]** → {{URL_PLANER}}?v=montage
  >
  > Gruß
  > Zimmerherd
- **Pflichtangaben:** B2 + B1

### Z-R2 · Rückgewinnung, 90 Tage nach Ende (W)

- **Auslöser:** 90 Tage nach Ende, gleiche Bedingungen. Danach keine weitere Rückgewinnungsmail.
- **Betreff:** Sollen wir dir weiter schreiben? (32)
- **Vorschau:** Eine Frage, ein Klick. Wenn nicht, tragen wir dich sofort aus.
- **Text:**
  > Hallo,
  >
  > wir schreiben nur, wenn es dir was bringt. Darum fragen wir einmal.
  >
  > **[Ja, weiter Tipps bekommen]** → {{LINK_BLEIBEN}}
  > **[Nein, bitte austragen]** → {{ABMELDELINK}}
  >
  > Klickst du nichts, bekommst du höchstens eine Mail im Monat.
  >
  > Zum Schluss ein Tipp aus der Lagerkarte: Ungekühlt hält Gekochtes höchstens 2 Stunden. Im Sommer im Auto ist das schnell vorbei. Kühltasche mit Akku hilft.
  >
  > Gruß
  > Zimmerherd
- **Pflichtangaben:** B2 + B1

---
## 2. Kochsatz (Fitness)

**Ton:** wie ein Trainingspartner, der rechnen kann. Sachlich, knapp, in Gramm, Minuten und Uhrzeiten. Humor nur über die Küche, **nie über Körper**. Keine Wörter wie „Muskeln“, „Fett weg“, „Form“, „fit“, „gesund“, „Traumkörper“. „Proteinreich“ nur für Rezepte ab 20 % Energie aus Protein. Den zugelassenen Claim zu Protein und Muskelmasse **nicht** in Mails verwenden (Markenregel, Abschnitt 9).
**Absender:** `Kochsatz <hallo@{{DOMAIN_KOCHSATZ}}>` · Verträge: `Kochsatz Verträge <vertrag@{{DOMAIN_KOCHSATZ}}>` · eigene (Sub-)Domain, getrennt von den anderen Marken (Meta-Einstufung „Health & Wellness“, `07` § 4.4).
**Einwilligungstext** (aus dem Markenbuch, um die Startstrecke ergänzt): „Ja, schickt mir die Protein-Liste, in den nächsten zehn Tagen bis zu fünf Mails mit Tipps und Angeboten zu Kochsatz und danach einmal im Monat die aktualisierte Liste. Abmelden geht jederzeit über den Link in jeder Mail. [Datenschutz]“
**Alter:** Bezahlabo ab 18 (`07` § 9.2). Keine Mails mit Kaufaufforderung an Adressen, bei denen ein Hinweis auf Minderjährigkeit vorliegt.
**Sperre:** Alle Preise und „Protein pro Euro“-Werte sind Schätzungen (Stand 10/2026). Kein Betrag für einen Wochenplan vor dem Kassenbon-Test. Bis dahin zeigen Liste und PDF (`app/public/pdf/protein-liste.pdf`) nur die Reihenfolge und Protein je 100 g, keine Euro-Werte (K12).

### K-0 · Double-Opt-in (T)

- **Auslöser:** sofort nach dem Formular. Link gilt 7 Tage. Ohne Klick keine weitere Mail, Löschung nach 30 Tagen.
- **Betreff:** Bitte bestätigen: deine Protein-Liste (32)
- **Vorschau:** Ein Klick, dann kommt das PDF. Nicht angefordert? Dann ignorier die Mail.
- **Text:**
  > Hallo,
  >
  > du hast bei Kochsatz die Protein-Liste angefordert. Bitte bestätige deine Adresse:
  >
  > **[Adresse bestätigen]** → {{DOI_LINK}}
  >
  > Danach bekommst du die Liste als PDF. In den nächsten zehn Tagen schicken wir dir bis zu fünf Mails mit Tipps und Angeboten zu Kochsatz, danach einmal im Monat die aktualisierte Liste. Abmelden geht in jeder Mail mit einem Klick.
  >
  > Der Link gilt 7 Tage. Du hast nichts angefordert? Dann musst du nichts tun. Ohne Klick bekommst du keine weitere Mail.
  >
  > Datenschutz: {{URL_DATENSCHUTZ}}
- **Variante Warteliste:** Satz 1: „du willst wissen, wann Kochsatz Plus zu kaufen ist.“ Satz 3: „Danach schreiben wir dir einmal zum Start und bis dahin höchstens eine Mail im Monat.“ Betreff: „Bitte bestätigen: Kochsatz-Warteliste“ (37).
- **Pflichtangaben:** B1. Keine Werbung.

### K-L1 · Tag 0: Die Liste (W)

- **Auslöser:** sofort nach DOI-Klick
- **Betreff:** Deine Protein-Liste ist da (26)
- **Vorschau:** Rote Linsen vorn. Zwölf Zutaten in Reihenfolge, mit Protein je 100 g und Quelle.
- **Text:**
  > Hallo,
  >
  > hier ist deine Liste: **[PDF herunterladen]** → {{LINK_PDF}}
  >
  > Die ersten sechs Plätze (Reihenfolge nach unserer Schätzung „Protein je Euro“, Schätzpreise Aldi und Lidl, Stand 10/2026; Nährwerte aus dem BLS 4.0):
  >
  > | Platz | Zutat | Protein je 100 g |
  > |---|---|---|
  > | 1 | rote Linsen, 500 g | 25,6 g |
  > | 2 | Tellerlinsen, 500 g | 23,4 g |
  > | 3 | Sojaschnetzel, 200 g | 50,2 g |
  > | 4 | Magerquark, 500 g | 11,9 g |
  > | 5 | Linsen (Dose), 400 g | 9 g |
  > | 6 | Skyr natur, 500 g | 10,4 g |
  >
  > Euro-Werte zeigen wir erst, wenn wir die Preise an der Kasse nachgeprüft haben. Preise schwanken je Laden und Woche.
  >
  > Was die Liste nicht sagt: was du daraus kochst. Das macht der Planer. Ein Tag mit deinen Zahlen ist gratis, ohne Konto:
  > **[Makroziel eingeben, Tag planen]** → {{URL_PLANER}}?v=fitness
  >
  > Kochsatz
- **Pflichtangaben:** B2 + B1. Nur „Lead“ an Meta, nie Filter oder Ziele.

### K-L2 · Tag 2: Wie lange hält die Box? (W)

- **Auslöser:** 2 Tage nach K-L1, 18 Uhr
- **Betreff:** Hält die Freitagsbox wirklich? (30)
- **Vorschau:** Sonntag kochen, Freitag essen: das sind fünf Tage. Zwei kurze Kochtage passen besser.
- **Text:**
  > Hallo,
  >
  > „Sonntag kochen, bis Freitag essen“: Die Freitagsbox ist dann fünf Tage alt. Kochsatz plant vorsichtiger:
  >
  > - Gekochtes im Kühlschrank: höchstens **2 Tage**
  > - Mit Reis, Nudeln, Fisch, Hack oder Ei: höchstens **1 Tag**
  > - Ungekühlt, etwa in der Sporttasche: höchstens **2 Stunden**
  > - Aufwärmen: mindestens **70 °C für 2 Minuten**
  >
  > Quellen: Verbrauchertipps des BfR, dazu die Reis-Regel der britischen FSA und die 2-Stunden-Regel der US-Behörde USDA, für den Planer bewusst streng ausgelegt. Alle Fristen gelten bei höchstens 7 °C.
  >
  > Daraus folgt: **zwei Kochtage statt einem.** Zum Beispiel Sonntag und Mittwoch. Was länger halten soll, kommt in den Tiefkühler.
  >
  > So steht es auf der Box:
  > `Box 3 · gekocht So 17:40 · essen bis Di`
  >
  > Den Vorkoch-Ablauf mit Uhrzeiten und Boxen gibt es in Plus. Einen Tag planen kannst du gratis:
  > **[Tag planen]** → {{URL_PLANER}}?v=fitness
  >
  > Kochsatz
- **Pflichtangaben:** B2 + B1

### K-L3 · Tag 4: Gleiche Makros, andere Teller (W)

- **Auslöser:** 4 Tage nach K-L1, 18 Uhr
- **Betreff:** Gleiche Makros, andere Teller (29)
- **Vorschau:** Drei proteinreiche Gerichte für den Kochtag, alle vorkochfähig. Mit Haltbarkeit.
- **Text:**
  > Hallo,
  >
  > wer seine Zahlen trifft, isst oft wochenlang dasselbe. Muss nicht sein. Drei Gerichte aus dem Planer, alle proteinreich (mindestens 20 % der Energie aus Protein) und vorkochfähig:
  >
  > - **Hähnchen-Kartoffel-Blech mit Paprika.** Ofen oder Airfryer, 15 Minuten Arbeit. Hält gekühlt 2 Tage.
  > - **Hähnchen-Satay-Reispfanne mit Asiagemüse.** Pfanne, 15 Minuten Arbeit. Mit Reis: 1 Tag, einfrierbar.
  > - **Tofu-Gemüse-Reispfanne mit Erdnusssauce.** Pfanne, 20 Minuten Arbeit. 1 Tag, einfrierbar.
  >
  > 91 der 195 Rezepte erfüllen „proteinreich“ (Stand 10/2026). Der Planer wählt aus ihnen passend zu deinem Ziel und wiederholt keins öfter als nötig.
  >
  > Nährwerte je Portion sind Richtwerte aus dem BLS 4.0. Echte Produkte weichen ab.
  >
  > **[Tag mit deinen Zahlen planen]** → {{URL_PLANER}}?v=fitness
  >
  > Kochsatz
- **Pflichtangaben:** B2 + B1

### K-L4 · Tag 7: Erst planen, dann essen (W)

- **Auslöser:** 7 Tage nach K-L1, Sonntag 17 Uhr bevorzugt
- **Betreff:** Erst planen, dann essen (23)
- **Vorschau:** Makroziel rein, Laden wählen, Küche ankreuzen. Raus kommen Einkaufsliste und Kochtag.
- **Text:**
  > Hallo,
  >
  > Tracker lassen dich hinterher eintragen. Kochsatz dreht das um.
  >
  > Du gibst ein:
  > - kcal, Protein, Kohlenhydrate, Fett in Gramm
  > - deinen Laden, z. B. Lidl oder Aldi
  > - was in der Küche steht, z. B. zwei Platten und Airfryer
  > - auf Wunsch ein Wochenbudget
  >
  > Du bekommst:
  > - die Gerichte, passend zu deinen Zahlen
  > - eine Einkaufsliste nach Gängen, in ganzen Packungen
  > - Reste angebrochener Packungen, eingeplant in weitere Rezepte
  >
  > Reicht dein Budget nicht, sagt der Plan das offen.
  >
  > Deine Zahlen bleiben auf deinem Gerät. Ein Konto gibt es nicht.
  >
  > **[Jetzt einen Tag planen]** → {{URL_PLANER}}?v=fitness
  >
  > Kochsatz
- **Pflichtangaben:** B2 + B1

### K-L5 · Tag 10: Plus vorstellen (W)

- **Auslöser:** 10 Tage nach K-L1. Nicht an Kunden.
- **Betreff:** Plus: 14 Tage Plan, zwei Kochtage (33)
- **Vorschau:** 7 Tage 0 €, danach 44,99 € im Jahr oder 6,99 € im Monat. Kündigen ohne Login.
- **Text:**
  > Hallo,
  >
  > der Tagesplan bleibt gratis. Mit Plus planst du weiter:
  >
  > - bis zu 14 Tage am Stück, mit deinem Makroziel
  > - Vorkoch-Ablauf mit Uhrzeiten, z. B. „17:40 Reis aufsetzen“
  > - Boxen-Plan mit „essen bis“
  > - PDF zum Ausdrucken für die Kühlschranktür
  >
  > **Preise:**
  > - **Plus Jahr: 7 Tage 0 €, danach 44,99 € im Jahr.** Laufzeit 12 Monate, danach monatlich kündbar.
  > - **Plus Monat: 7 Tage 0 €, danach 6,99 € im Monat.** Monatlich kündbar.
  >
  > Kündigst du in den ersten 7 Tagen, zahlst du nichts. Kündigen geht ohne Login über „Verträge hier kündigen“. Für den Lizenzschlüssel brauchen wir nur deine E-Mail.
  >
  > **[Preise ansehen]** → {{URL_PREISE}}?v=fitness
  >
  > Nächsten Monat kommt die Liste mit neuem Preisstand.
  >
  > Kochsatz
- **Pflichtangaben:** B2 + B1. Danach monatlich nur die aktualisierte Liste, keine Verkaufsmail ohne neuen Inhalt.

### K-K1 · Kaufbestätigung mit Lizenzschlüssel (T)

- **Auslöser:** sofort nach Paddle-Webhook
- **Betreff:** Dein Kochsatz-Schlüssel ist da (30)
- **Vorschau:** Einfügen, freischalten, Makroziel eintragen. Drei Schritte, zwei Minuten.
- **Text:**
  > Hallo {{NAME}},
  >
  > danke für **{{PRODUKT}}**. Dein Lizenzschlüssel:
  >
  > `{{LIZENZ}}`
  >
  > **Plus freischalten:**
  > 1. Öffne {{URL_PREISE}}?v=fitness auf dem Gerät, mit dem du planst.
  > 2. Unter „Schon gekauft? Plus freischalten“ den ganzen Schlüssel einfügen.
  > 3. „Plus freischalten“ tippen. Oben steht dann „Plus aktiv“.
  >
  > **Wichtig:**
  > - Der Schlüssel liegt nur auf deinem Gerät. Zweites Gerät oder neuer Browser: noch mal einfügen.
  > - Browserdaten gelöscht heißt Schlüssel weg. Heb diese Mail auf.
  > - Gültig bis {{LIZENZ_BIS}}.
  > - 7 Tage 0 €. Erste Abbuchung am {{ABBUCHUNG_DATUM}}.
  >
  > Die Rechnung schickt Paddle, unser Zahlungsdienstleister, separat. Die Vertragsunterlagen kommen gleich in einer eigenen Mail.
  >
  > Erster Schritt: Makroziel in Gramm eintragen, Laden wählen, Plan auf 3 Tage stellen.
  >
  > Fragen? Antworte auf diese Mail.
  >
  > Kochsatz
- **Pflichtangaben:** B1

### K-K2 · Vertragsbestätigung (T, Textform)

- **Auslöser, Anhänge, Aufbau:** wie Z-K2 (B3 mit Laufzeit-Block Monat oder Jahr, Kündigungsweg, B4, PDF-Anhänge)
- **Absender:** Kochsatz Verträge <vertrag@…>
- **Betreff:** Deine Vertragsbestätigung: {{PRODUKT}} (Plus Jahr: 36)
- **Vorschau:** Laufzeit, Preis, Kündigung und Widerruf auf einen Blick. Bitte aufheben.
- **Text:**
  > Hallo {{NAME}},
  >
  > hier sind alle Angaben zu deinem Vertrag. Bitte aufheben.
  >
  > [B3 + Laufzeit-Block + Kündigungsweg]
  >
  > [B4]
  >
  > Im Anhang: AGB, Widerrufsbelehrung, Muster-Widerrufsformular.
  >
  > Kochsatz
- **Pflichtangaben:** B1

### K-K3 · Tag 2: Dein erster Kochtag (S)

- **Auslöser:** 2 Tage nach Kauf. Läge Tag 2 nicht auf einem Wochenende, trotzdem senden, der Kochtag ist frei wählbar.
- **Betreff:** Dein erster Kochtag in 4 Schritten (34)
- **Vorschau:** Plan auf 3 Tage, Ablauf mit Uhrzeiten, Boxen mit Datum. So nutzt du den Reiter Vorkochen.
- **Text:**
  > Hallo,
  >
  > so sieht ein erster Kochtag mit Plus aus. Beispiel für 2 Mahlzeiten an 3 Tagen:
  >
  > 1. **Plan auf 3 Tage stellen.** Länger nicht, sonst wird die letzte Box zu alt.
  > 2. **Reiter „Vorkochen“ öffnen.** Dort steht der Ablauf mit Uhrzeiten. Zuerst das, was lange gart, z. B. das Blech in den Ofen. Dann Reis aufsetzen. Dann die Pfanne.
  > 3. **Boxen beschriften:** Gericht, gekocht am, essen bis. Die Reisgerichte sind am nächsten Tag dran, Eintöpfe und Blechgerichte am übernächsten.
  > 4. **Tag 3 aus dem Tiefkühler** oder am zweiten Kochtag frisch kochen.
  >
  > Wie lange so ein Kochtag dauert, hängt von deiner Küche ab. Der Ablauf zeigt die Zeiten je Schritt.
  >
  > **[Plan auf 3 Tage stellen]** → {{URL_PLANER}}?v=fitness
  >
  > Kochsatz
  >
  > Keine Tipps mehr? {{TIPPS_ABMELDEN}}
- **Pflichtangaben:** B1

### K-K4 · Tag 5: Testphase endet (T)

- **Auslöser:** Tag 5, nur wenn nicht gekündigt
- **Absender:** Kochsatz Verträge <vertrag@…>
- **Betreff:** Deine Testphase endet am {{DATUM}} (35 mit Datum)
- **Vorschau:** Danach {{PREIS}}. Wenn das passt, musst du nichts tun. Kündigen geht ohne Login.
- **Text:**
  > Hallo {{NAME}},
  >
  > damit nichts überraschend kommt:
  >
  > - Deine 7 Tage zu 0 € enden am **{{DATUM}}**.
  > - Danach kostet {{PRODUKT}} **{{PREIS}}**, erste Abbuchung am {{ABBUCHUNG_DATUM}}.
  >
  > Passt das, läuft Plus einfach weiter.
  >
  > Passt es nicht, kündige vor dem {{DATUM}}, dann zahlst du nichts:
  > **[Verträge hier kündigen]** → {{URL_KUENDIGEN}}
  >
  > Kochsatz
- **Pflichtangaben:** B1

### K-E1 · Kündigungsbestätigung (T)

- **Betreff:** Deine Kündigung ist angekommen (30)
- **Vorschau:** Eingang {{EINGANG_DATUM}}, {{EINGANG_UHRZEIT}} Uhr. Wirksam zum {{WIRKDATUM}}.
- **Text:**
  > Hallo {{KUEND_NAME}},
  >
  > wir bestätigen deine Kündigung.
  >
  > [B5 + Wirk-Satz]
  >
  > Du musst nichts weiter tun. Danach bleibt der 1-Tages-Plan gratis. Deine Zahlen und Einstellungen bleiben auf deinem Gerät.
  >
  > Den Newsletter mit der Protein-Liste bekommst du davon getrennt. Abmelden geht über den Link in jeder Newsletter-Mail.
  >
  > Kochsatz
- **Auslöser, Absender, Pflichtangaben:** wie Z-E1

### K-E2 · Widerrufs-Eingangsbestätigung (T)

- **Betreff:** Dein Widerruf ist angekommen (28)
- **Vorschau:** Eingang {{EINGANG_DATUM}}, {{EINGANG_UHRZEIT}} Uhr. So geht es mit deinem Geld weiter.
- **Text:** wie Z-E2, Gruß „Kochsatz“. [B6 + Folgen-Block]
- **Auslöser, Absender, Pflichtangaben:** wie Z-E2

### K-R1 · Rückgewinnung, 30 Tage nach Ende (W)

- **Auslöser:** 30 Tage nach Wirkzeitpunkt, nur mit Werbeeinwilligung
- **Betreff:** Neue Phase, neue Zahlen? (24)
- **Vorschau:** Der Tagesplan rechnet weiter gratis mit deinem Ziel. Ein Tipp zum Umstellen.
- **Text:**
  > Hallo,
  >
  > Plus ist seit einem Monat aus. Der Tagesplan mit deinem Makroziel bleibt gratis.
  >
  > Falls du deine Zahlen gerade umstellst: Ziel neu eintragen, und der Plan baut sich neu. Andere Mengen, neue Einkaufsliste. Welche Zahlen du wählst, entscheidest du.
  >
  > {{NEU_SEIT_ENDE}} *(nur echte Neuerungen, sonst streichen)*
  >
  > Plus gibt es weiter für 6,99 € im Monat oder 44,99 € im Jahr.
  > **[Tag planen]** → {{URL_PLANER}}?v=fitness
  >
  > Kochsatz
- **Pflichtangaben:** B2 + B1. Hinweis: Wer bereits eine Testphase hatte, bekommt bei erneutem Abschluss **keine** zweite Testphase, falls Paddle das so einstellt. Dann im Text „7 Tage 0 €“ weglassen, so wie hier.

### K-R2 · Rückgewinnung, 90 Tage nach Ende (W)

- **Betreff:** Liste weiter bekommen oder austragen? (37)
- **Vorschau:** Einmal im Monat neue Preise, oder Ruhe. Du entscheidest mit einem Klick.
- **Text:**
  > Hallo,
  >
  > einmal im Monat schicken wir die Protein-Liste mit neuem Preisstand. Willst du sie weiter?
  >
  > **[Ja, Liste weiter bekommen]** → {{LINK_BLEIBEN}}
  > **[Nein, austragen]** → {{ABMELDELINK}}
  >
  > Danach schreiben wir dir keine Mail mehr zu Plus, nur noch die Liste, falls du bleibst.
  >
  > Kochsatz
- **Auslöser, Pflichtangaben:** 90 Tage nach Ende, B2 + B1. Letzte Rückgewinnungsmail.

*Kochsatz hat keinen Pass, deshalb keine Mail „Pass endet“.*

---
## 3. Zweiflammer (Camping)

**Ton:** wie die erfahrenen Platznachbarn beim Kaffee. Gelassen, kundig, mit Augenzwinkern, nie belehrend. Sätze bis 18 Wörter. Szenewörter richtig (Landstrom, Vorzelt, Kartusche, Bordkühlschrank). „Omnia“ nur beschreibend („für den Omnia-Backofen“). Kein „spart Gas“, „spart Wasser“, „nachhaltig“, keine Aussagen zur Gassicherheit, kein Kochen im Vorzelt mit Grill.
**Anrede:** Die Mail geht an eine Person, darum **du**. Wo das Paar gemeint ist, „ihr“ und „eure Reisewoche“. Der Test „ihr“ gegen „Sie“ aus dem Markenbuch gilt für Anzeigen; in Mails erst umstellen, wenn der Test „Sie“ klar vorn sieht.
**Absender:** `Zweiflammer <hallo@{{DOMAIN_ZWEIFLAMMER}}>` · Verträge: `Zweiflammer Verträge <vertrag@{{DOMAIN_ZWEIFLAMMER}}>`
**Einwilligungstext:** „Ja, schickt mir den Bordküchen-Check als PDF und bis zum Saisonstart bis zu vier Mails mit Tipps und Angeboten zu Zweiflammer, danach höchstens eine im Monat. Abmelden geht jederzeit über den Link in jeder Mail. [Datenschutz]“
**Saison:** Strecke vor allem Januar bis April. Obergrenze laut Markenbuch: vier Werbemails bis zum Saisonstart.

### F-0 · Double-Opt-in (T)

- **Auslöser:** sofort. Link gilt 7 Tage, ohne Klick keine weitere Mail, Löschung nach 30 Tagen.
- **Betreff:** Bitte bestätigen: dein Bordküchen-Check (39)
- **Vorschau:** Ein Klick, dann kommt das PDF. Nicht angefordert? Dann einfach ignorieren.
- **Text:**
  > Hallo,
  >
  > du hast bei Zweiflammer den Bordküchen-Check angefordert. Bitte bestätige deine Adresse:
  >
  > **[Adresse bestätigen]** → {{DOI_LINK}}
  >
  > Danach kommt das PDF „Bordküchen-Check · Erste Tour der Saison“. Bis zum Saisonstart schicken wir dir bis zu vier Mails mit Tipps und Angeboten zu Zweiflammer, danach höchstens eine im Monat. Abmelden geht in jeder Mail mit einem Klick.
  >
  > Der Link gilt 7 Tage. Du warst das nicht? Dann musst du nichts tun, wir schreiben dir nicht wieder.
  >
  > Datenschutz: {{URL_DATENSCHUTZ}}
- **Variante Warteliste:** Satz 1: „du möchtest wissen, wann der Saisonpass von Zweiflammer zu haben ist.“ Satz 3: „Danach schreiben wir dir einmal, wenn es losgeht, und bis dahin höchstens eine Mail im Monat.“ Betreff: „Bitte bestätigen: Zweiflammer-Warteliste“ (40).
- **Pflichtangaben:** B1. Keine Werbung.

### F-L1 · Tag 0: Bordküchen-Check (W)

- **Auslöser:** sofort nach DOI-Klick
- **Betreff:** Dein Bordküchen-Check ist da (28)
- **Vorschau:** Wie viele Gerichte eure Bordküche schafft, was in die Vorratskiste kommt und die Karte für die Kühlschranktür.
- **Text:**
  > Hallo,
  >
  > hier ist das PDF: **[Bordküchen-Check herunterladen]** → {{LINK_PDF}}
  >
  > Auf Seite 1 steht, was eure Ausstattung hergibt (Stand 10/2026):
  >
  > - eine Flamme, ein Topf: 66 Rezepte
  > - eine Flamme, Topf und Pfanne: 95
  > - zwei Flammen und Omnia-Backofen: 107, davon 67 fürs Abendessen
  > - mit Landstrom für Heißluftfritteuse, Mikrowelle und Wasserkocher: 152
  >
  > Die Kühlschrank-Karte gehört an die Tür. Gekochtes hält höchstens 2 Tage, Reis, Nudeln, Fisch, Hack und Ei 1 Tag. Ungekühlt höchstens 2 Stunden, das geht in der Sonne schnell.
  >
  > Den ersten Tag eurer Reise plant Zweiflammer gratis, ohne Konto:
  > **[Kreuzt an, was an Bord ist]** → {{URL_PLANER}}?v=camping
  >
  > Gute Fahrt beim Planen
  > Zweiflammer
- **Pflichtangaben:** B2 + B1

### F-L2 · Tag 3: Gratin vom Gasherd (W)

- **Auslöser:** 3 Tage nach F-L1, 19 Uhr
- **Betreff:** Gratin vom Gasherd. Steht im Plan. (34)
- **Vorschau:** Kein Backofen an Bord, aber ein Omnia im Schrank? Acht Gerichte, die damit gehen.
- **Text:**
  > Hallo,
  >
  > ein Backofen fehlt in den meisten Bordküchen. Wer einen Omnia-Backofen dabei hat, kommt trotzdem an Gratin und Crumble.
  >
  > Acht Gerichte für den Omnia-Backofen hat Zweiflammer im Bestand (Stand 10/2026), zum Beispiel:
  >
  > - **Omnia-Kartoffelgratin mit Schinken.** Rund 15 Minuten Arbeit, hält gekühlt 2 Tage.
  > - **Omnia-Tortilla-Auflauf mit Bohnen und Mais.** Rund 10 Minuten Arbeit.
  > - **Omnia-Kaiserschmarrn mit Apfelmark.** Für den Nachmittag unter der Markise.
  >
  > Das ist eine kleine Auswahl, keine Omnia-Sammlung. Der Planer baut die Gerichte in eure Woche ein, mit Einkaufsliste für alles andere.
  >
  > Und wer drinnen nicht braten will, weil die Polster sonst tagelang nach Bratkartoffeln riechen: Pfanne aus den Geräten nehmen. Dann plant Zweiflammer mit Topf und Omnia.
  >
  > **[Omnia ankreuzen und Tag planen]** → {{URL_PLANER}}?v=camping
  >
  > Zweiflammer
- **Pflichtangaben:** B2 + B1. „Omnia“ ist eine fremde Marke, nur beschreibend, kein Logo im Mailbild.

### F-L3 · Tag 6: Weit zum Laden (W)

- **Auslöser:** 6 Tage nach F-L1, Donnerstag 18 Uhr bevorzugt
- **Betreff:** Weit zum Laden? Eine Liste reicht. (34)
- **Vorschau:** Vorratskiste von zu Hause, Frisches für die ersten Tage, eine Liste in Ladenreihenfolge.
- **Text:**
  > Hallo,
  >
  > am Platz ist der Supermarkt oft weit und der Bäcker gar nicht da. Drei Dinge helfen:
  >
  > **1. Vorratskiste von zu Hause.** Was ohne Kühlung auskommt, fährt mit: Nudeln, Couscous, rote Linsen, Dosentomaten, Kokosmilch, Haferflocken. Die Liste steht im PDF.
  >
  > **2. Frisches zuerst essen.** Was gekühlt werden muss, kommt in die ersten ein, zwei Tage. Danach Gerichte aus dem Vorrat, zum Beispiel One-Pot-Nudeln mit Thunfisch-Tomatensoße oder Rote-Linsen-Curry mit Kokosmilch.
  >
  > **3. Ein Einkauf, eine Liste.** Zweiflammer sortiert die Einkaufsliste nach dem Laden eurer Wahl und zeigt unter „Hast du wahrscheinlich schon“, was im Vorrat ist.
  >
  > Zu Hause vorgekocht und eingefroren? Dann hilft das der Kühlbox auf der Fahrt. Aufgetaut gilt wieder: höchstens 2 Tage, vor dem Essen auf 70 °C für 2 Minuten.
  >
  > **[Tag planen]** → {{URL_PLANER}}?v=camping
  >
  > Zweiflammer
- **Optionaler Kosten-Absatz, nur nach Kassenbon-Test:** „Was kostet die Woche in der Bordküche? Ein echter Plan für 2 Personen, 7 Tage, {{LADEN}}: geschätzt {{BETRAG}} € (Preisstand {{PREISSTAND}}, regional abweichend, Preise im Ausland kennt der Planer nicht).“
- **Pflichtangaben:** B2 + B1

### F-L4 · Tag 10: Saisonpass (W)

- **Auslöser:** 10 Tage nach F-L1. Nicht an Kunden.
- **Betreff:** Saisonpass: 24,99 € für 6 Monate (32)
- **Vorschau:** Endet von selbst, kein Abo. Wer öfter plant, nimmt Plus. Beide Preise hier.
- **Text:**
  > Hallo,
  >
  > der erste Reisetag bleibt gratis. Für die ganze Reisewoche gibt es Plus:
  >
  > - Plan bis zu 14 Tage am Stück, für eure Bordküche
  > - eine Einkaufsliste in Ladenreihenfolge
  > - Boxen-Plan und Vorkoch-Ablauf für das, was zu Hause vorbereitet wird
  > - PDF zum Ausdrucken, falls am Platz das Netz schwach ist
  >
  > **Saisonpass: 24,99 € einmalig für 6 Monate.** Endet automatisch, ohne Verlängerung und ohne Abo. Passt, wenn ihr zwei, drei Reisen im Jahr macht.
  >
  > **Plus im Abo:** 6,99 € im Monat oder 44,99 € im Jahr, die ersten 7 Tage kosten 0 €. Monatlich kündbar bzw. nach dem ersten Jahr monatlich kündbar.
  >
  > Kündigen geht ohne Login über „Verträge hier kündigen“. Eure Ausstattung und Pläne bleiben auf dem Handy, für den Schlüssel brauchen wir nur die E-Mail.
  >
  > **[Preise ansehen]** → {{URL_PREISE}}?v=camping
  >
  > Wenn die Reise noch weit weg ist: Der Pass läuft ab dem Kauf. Kauf ihn ruhig erst kurz vor der Abfahrt.
  >
  > Zweiflammer
- **Pflichtangaben:** B2 + B1. Der letzte Satz ist bewusst ehrlich (6 Monate zählen ab Kauf) und das Gegenteil von Druck.

### F-K1 · Kaufbestätigung mit Lizenzschlüssel (T)

- **Auslöser:** sofort nach Paddle-Webhook
- **Betreff:** Dein Zweiflammer-Schlüssel ist da (33)
- **Vorschau:** Einfügen, freischalten, Bordküche ankreuzen. So geht's in drei Schritten.
- **Text:**
  > Hallo {{NAME}},
  >
  > danke für **{{PRODUKT}}**. Hier ist dein Lizenzschlüssel:
  >
  > `{{LIZENZ}}`
  >
  > **Plus freischalten:**
  > 1. Öffne {{URL_PREISE}}?v=camping auf dem Handy, das mit auf Reisen geht.
  > 2. Unter „Schon gekauft? Plus freischalten“ den ganzen Schlüssel einfügen.
  > 3. „Plus freischalten“ tippen. Oben steht dann „Plus aktiv“.
  >
  > **Gut zu wissen:**
  > - Der Schlüssel liegt nur auf diesem Gerät. Plant ihr zu zweit auf zwei Handys, fügt ihn auf beiden ein. *(Nur stehen lassen, wenn die AGB Nutzung auf mehreren eigenen Geräten erlauben.)*
  > - Browserdaten gelöscht heißt Schlüssel weg. Heb diese Mail auf.
  > - Gültig bis {{LIZENZ_BIS}}.
  > - *Nur Pass:* Dein Saisonpass läuft bis {{PASS_ENDE}} und endet dann von selbst.
  > - *Nur Abo:* Die ersten 7 Tage kosten 0 €, erste Abbuchung am {{ABBUCHUNG_DATUM}}.
  >
  > Die Rechnung kommt separat von Paddle, unserem Zahlungsdienstleister. Die Vertragsunterlagen schicken wir gleich in einer eigenen Mail.
  >
  > Erster Schritt: Kreuzt an, was an Bord ist, und stellt die Reisedauer ein.
  >
  > Fragen? Einfach antworten.
  >
  > Zweiflammer
- **Pflichtangaben:** B1

### F-K2 · Vertragsbestätigung (T, Textform)

- **Absender:** Zweiflammer Verträge <vertrag@…>
- **Betreff:** Deine Vertragsbestätigung: {{PRODUKT}} (Saison-Pass: 38)
- **Vorschau:** Laufzeit, Preis, Kündigung und Widerruf auf einen Blick. Bitte aufheben.
- **Text:**
  > Hallo {{NAME}},
  >
  > hier sind alle Angaben zu deinem Vertrag. Bitte heb die Mail auf.
  >
  > [B3 + Laufzeit-Block + Kündigungsweg]
  >
  > [B4]
  >
  > Im Anhang: AGB, Widerrufsbelehrung, Muster-Widerrufsformular.
  >
  > Zweiflammer
- **Auslöser, Anhänge, Pflichtangaben:** wie Z-K2

### F-K3 · Tag 2: Vorkochen vor der Abfahrt (S)

- **Auslöser:** 2 Tage nach Kauf, 18 Uhr
- **Betreff:** Vorkochen vor der Abfahrt: so geht's (36)
- **Vorschau:** Zwei Gerichte zu Hause, die Reise beginnt entspannt. Mit Reihenfolge und Haltbarkeit.
- **Text:**
  > Hallo,
  >
  > die ersten Abende am Platz werden entspannter, wenn zwei Gerichte schon fertig sind. So geht euer erster Vorkochtag zu Hause:
  >
  > 1. **Plan ab Abreisetag erstellen**, Reisedauer einstellen.
  > 2. **Reiter „Vorkochen“ öffnen.** Dort stehen die Gerichte, die sich vorbereiten lassen, mit Reihenfolge.
  > 3. **Gut geeignet:** Eintöpfe und Currys ohne Reis, zum Beispiel Chili mit Sojaschnetzeln oder Rote-Linsen-Curry. Beide halten gekühlt 2 Tage und lassen sich einfrieren.
  > 4. **Boxen beschriften:** Gericht, gekocht am, essen bis. Etiketten sind im Bordküchen-Check.
  > 5. **Ab in die Kühlbox,** gekühlt bleiben. Am Platz auf mindestens 70 °C für 2 Minuten aufwärmen.
  >
  > Reis und Nudeln lieber frisch am Platz kochen. Gekocht halten sie nur 1 Tag.
  >
  > **[Reiseplan erstellen]** → {{URL_PLANER}}?v=camping
  >
  > Zweiflammer
  >
  > Keine Tipps mehr? {{TIPPS_ABMELDEN}}
- **Pflichtangaben:** B1

### F-K4 · Tag 5: Testphase endet (T, nur Abo)

- **Auslöser:** Tag 5, nur Abo, nur wenn nicht gekündigt
- **Absender:** Zweiflammer Verträge <vertrag@…>
- **Betreff:** Deine Testphase endet am {{DATUM}} (35 mit Datum)
- **Vorschau:** Danach {{PREIS}}. Passt es, musst du nichts tun. Kündigen geht ohne Login.
- **Text:**
  > Hallo {{NAME}},
  >
  > eine kurze Erinnerung:
  >
  > - Deine 7 Tage zu 0 € enden am **{{DATUM}}**.
  > - Danach kostet {{PRODUKT}} **{{PREIS}}**, erste Abbuchung am {{ABBUCHUNG_DATUM}}.
  >
  > Passt das, läuft Plus weiter, und du musst nichts tun.
  >
  > Passt es nicht, kündige vor dem {{DATUM}}. Dann zahlst du nichts:
  > **[Verträge hier kündigen]** → {{URL_KUENDIGEN}}
  >
  > Lieber ohne Abo? Den Saisonpass gibt es für 24,99 € für 6 Monate, er endet von selbst.
  >
  > Zweiflammer
- **Pflichtangaben:** B1. Zum Pass-Hinweis gilt dasselbe wie bei Z-K4.

### F-E1 · Kündigungsbestätigung (T)

- **Betreff:** Deine Kündigung ist angekommen (30)
- **Vorschau:** Eingang {{EINGANG_DATUM}}, {{EINGANG_UHRZEIT}} Uhr. Wirksam zum {{WIRKDATUM}}.
- **Text:**
  > Hallo {{KUEND_NAME}},
  >
  > wir bestätigen deine Kündigung.
  >
  > [B5 + Wirk-Satz]
  >
  > Du musst nichts weiter tun. Den ersten Reisetag planst du weiter gratis. Eure Ausstattung und Einstellungen bleiben auf dem Handy.
  >
  > Der Newsletter läuft davon getrennt. Abmelden geht über den Link in jeder Newsletter-Mail.
  >
  > Zweiflammer
- **Auslöser, Absender, Pflichtangaben:** wie Z-E1

### F-E2 · Widerrufs-Eingangsbestätigung (T)

- **Betreff:** Dein Widerruf ist angekommen (28)
- **Vorschau:** Eingang {{EINGANG_DATUM}}, {{EINGANG_UHRZEIT}} Uhr. So geht es mit deinem Geld weiter.
- **Text:** wie Z-E2, Gruß „Zweiflammer“. [B6 + Folgen-Block]
- **Auslöser, Absender, Pflichtangaben:** wie Z-E2

### F-P1 · Saisonpass endet in 7 Tagen (T)

- **Auslöser:** 7 Tage vor {{PASS_ENDE}}, 18 Uhr
- **Absender:** Zweiflammer <hallo@…>
- **Betreff:** Dein Saisonpass läuft am {{PASS_ENDE}} aus (39 mit Datum)
- **Vorschau:** Er endet von selbst, es wird nichts abgebucht. Was danach bleibt, steht hier.
- **Text:**
  > Hallo {{NAME}},
  >
  > dein Saisonpass endet am **{{PASS_ENDE}}**. Nur zur Info:
  >
  > - Er endet von selbst. Keine Verlängerung, keine Abbuchung.
  > - Danach plant Zweiflammer wieder den ersten Reisetag gratis.
  > - Eure Ausstattung und Einstellungen bleiben auf dem Handy.
  > - Seid ihr gerade unterwegs? Speichert den aktuellen Plan vorher als PDF, dann habt ihr Gerichte und Liste bis zum Ende der Reise.
  >
  > Für die nächste Saison gibt es wieder einen Pass, 24,99 € für 6 Monate: {{URL_PREISE}}?v=camping
  >
  > Zweiflammer
- **Pflichtangaben:** B1. Letzter Satz wie bei Z-P1 nur mit Widerspruchshinweis beim Kauf (§ 7 Abs. 3 UWG), sonst streichen.

### F-R1 · Rückgewinnung, 30 Tage nach Ende (W)

- **Auslöser:** 30 Tage nach Kündigungs-Wirkzeitpunkt oder Pass-Ende, nur mit Werbeeinwilligung
- **Betreff:** Wie war die Saison in der Bordküche? (36)
- **Vorschau:** Ein Tipp für die nächste Tour und was gratis bleibt. Mehr nicht.
- **Text:**
  > Hallo,
  >
  > die Saison ist für dich vorbei, der Plan ruht. Der erste Reisetag bleibt gratis.
  >
  > Ein Tipp für die nächste Tour: Schreibt nach der Reise auf, welche Geräte ihr wirklich benutzt habt. Was nie aus dem Schrank kam, bleibt nächstes Mal zu Hause. Dann bleibt mehr Zuladung frei, und der Plan passt besser zu eurer Küche.
  >
  > {{NEU_SEIT_ENDE}} *(nur echte Neuerungen, sonst streichen)*
  >
  > Saisonpass 24,99 € für 6 Monate oder Plus ab 6,99 € im Monat, wenn ihr wieder losfahrt.
  >
  > Zweiflammer
- **Pflichtangaben:** B2 + B1

### F-R2 · Rückgewinnung, 90 Tage nach Ende (W)

- **Auslöser:** 90 Tage nach Ende. **Saisonregel:** Fällt der Termin in November oder Dezember, auf den ersten Dienstag im Februar verschieben (Planungszeit, Markenbuch Abschnitt 1). Letzte Rückgewinnungsmail.
- **Betreff:** Erste Tour geplant? Vorrat zuerst. (34)
- **Vorschau:** Packliste für die Bordküche und eine Frage: weiter Post von uns oder nicht?
- **Text:**
  > Hallo,
  >
  > bevor der Wagen vom Winterplatz kommt, lohnt der Blick in die Vorratskiste. Was ist abgelaufen, was fehlt? Die Packliste aus dem Bordküchen-Check hilft dabei: {{LINK_PDF}}
  >
  > Und eine Frage: Sollen wir dir weiter schreiben?
  >
  > **[Ja, gern]** → {{LINK_BLEIBEN}}
  > **[Nein, austragen]** → {{ABMELDELINK}}
  >
  > Klickst du nichts, kommt höchstens eine Mail im Monat.
  >
  > Zweiflammer
- **Pflichtangaben:** B2 + B1

---
## 4. Wochenschmaus (Alltag)

**Ton:** wie die Nachbarin am Marktstand, die rechnen kann. Herzlich, praktisch, unaufgeregt. Du, bei Familien auch „ihr“. Konkrete Gerichte und Uhrzeiten. Humor über den Alltag, **nie über Geldsorgen**. Nie „gesund“, „Zero Waste“, „nachhaltig“, „spart X €“, „arme Familien“, „Mama-Hack“. Gratis ist nur der 1-Tages-Plan, die Woche ist Plus.
**Absender:** `Wochenschmaus <hallo@{{DOMAIN_WOCHENSCHMAUS}}>` · Verträge: `Wochenschmaus Verträge <vertrag@{{DOMAIN_WOCHENSCHMAUS}}>`
**Einwilligungstext** (aus dem Markenbuch, um die Startstrecke ergänzt): „Ja, schickt mir den Reste-Retter-Wochenplan, in den nächsten zehn Tagen bis zu fünf Mails mit Tipps und Angeboten zu Wochenschmaus und danach alle zwei Wochen einen neuen Plan. Abmelden geht jederzeit über den Link in jeder Mail. [Datenschutz]“
**Sperre aus dem Markenbuch:** Der Reste-Retter-Plan geht erst raus, wenn er einmal wirklich eingekauft (Kassenbon-Test) und testgekocht ist. Bis dahin im PDF „Preisniveau“ statt Betrag. Keine Familien- oder Kinderangaben an das Mail-Tool oder Meta.

### W-0 · Double-Opt-in (T)

- **Auslöser:** sofort. Link gilt 7 Tage, ohne Klick keine weitere Mail, Löschung nach 30 Tagen.
- **Betreff:** Bitte bestätigen: dein Reste-Retter-Plan (40)
- **Vorschau:** Ein Klick, dann kommt der Wochenplan als PDF. Nicht angefordert? Einfach ignorieren.
- **Text:**
  > Hallo,
  >
  > du hast bei Wochenschmaus den Reste-Retter-Wochenplan angefordert. Bitte bestätige deine Adresse:
  >
  > **[Adresse bestätigen]** → {{DOI_LINK}}
  >
  > Danach bekommst du den Plan als PDF. In den nächsten zehn Tagen schicken wir dir bis zu fünf Mails mit Tipps und Angeboten zu Wochenschmaus, danach alle zwei Wochen einen neuen Plan. Abmelden geht in jeder Mail mit einem Klick.
  >
  > Der Link gilt 7 Tage. Du warst das nicht? Dann musst du nichts tun, wir melden uns nicht wieder.
  >
  > Datenschutz: {{URL_DATENSCHUTZ}}
- **Variante Warteliste:** Satz 1: „du möchtest wissen, wann Wochenschmaus Plus zu haben ist.“ Satz 3: „Danach schreiben wir dir einmal zum Start und bis dahin höchstens alle zwei Wochen.“ Betreff: „Bitte bestätigen: Wochenschmaus-Warteliste“ (42).
- **Pflichtangaben:** B1. Keine Werbung.

### W-L1 · Tag 0: Der Reste-Retter-Plan (W)

- **Auslöser:** sofort nach DOI-Klick
- **Betreff:** Dein Reste-Retter-Wochenplan ist da (35)
- **Vorschau:** Sieben Tage, ein Einkaufszettel und ein Reste-Fahrplan: wo die angebrochene Packung als Nächstes landet.
- **Text:**
  > Hallo,
  >
  > hier ist dein Plan. Such dir die passende Fassung aus:
  >
  > - **[1 Person]** → {{LINK_PDF_1}}
  > - **[2 Personen]** → {{LINK_PDF_2}}
  > - **[3 Personen]** → {{LINK_PDF_3}} (gerechnet mit drei Erwachsenenportionen)
  >
  > Jede Fassung passt für Aldi und Lidl. Drin sind die Gerichte von Montag bis Sonntag, der Einkaufszettel nach Abteilungen sortiert, der Reste-Fahrplan und was am Ende übrig bleibt. Da steht zum Beispiel, in welchem Gericht die zweite Hälfte vom Sahnebecher landet.
  >
  > Auf der letzten Seite ist die Lagerkarte für den Kühlschrank: gekochte Reste höchstens 2 Tage, Reis und Nudeln höchstens 1 Tag.
  >
  > Lieber mit deinem eigenen Laden und Budget? Einen Tag plant Wochenschmaus gratis, ohne Konto:
  > **[Tag planen]** → {{URL_PLANER}}?v=alltag
  >
  > Liebe Grüße
  > Wochenschmaus
- **Pflichtangaben:** B2 + B1

### W-L2 · Tag 2: Die halbe Avocado gibt's nicht (W)

- **Auslöser:** 2 Tage nach W-L1, 17 Uhr
- **Betreff:** Die halbe Avocado gibt's nicht (30)
- **Vorschau:** Rezepte rechnen mit Bruchstücken, der Laden verkauft ganze Packungen. So plant Wochenschmaus den Rest ein.
- **Text:**
  > Hallo,
  >
  > das Rezept will 100 ml Sahne. Im Laden gibt es 200 ml. Die andere Hälfte steht dann im Kühlschrank, bis sie keiner mehr will.
  >
  > Wochenschmaus rechnet anders: mit ganzen Packungen, so wie sie im Regal stehen. Was übrig bleibt, plant es ein paar Tage später in ein anderes Gericht ein. Auf dem Einkaufszettel steht, was am Ende noch übrig ist.
  >
  > Drei kleine Regeln für die Reste:
  > - Angebrochenes nach vorn stellen, dann wird es gesehen.
  > - Gekochte Reste höchstens 2 Tage aufheben, mit Reis oder Nudeln nur 1 Tag.
  > - Was du nicht schaffst, früh einfrieren, nicht erst am letzten Tag.
  >
  > **[Tag mit deinem Laden planen]** → {{URL_PLANER}}?v=alltag
  >
  > Liebe Grüße
  > Wochenschmaus
- **Pflichtangaben:** B2 + B1. Kein „rettet X kg“, keine Umweltaussage.

### W-L3 · Tag 4: Die Frage um 17:30 (W)

- **Auslöser:** 4 Tage nach W-L1, werktags 16 Uhr
- **Betreff:** 17:30. Was gibt's heute? (24)
- **Vorschau:** Drei Gerichte, die in rund 20 Minuten auf dem Tisch stehen. Und wie die Frage für die Woche wegfällt.
- **Text:**
  > Hallo,
  >
  > das Kochen ist selten das Problem. Die Frage davor ist es, am Ende eines langen Tages.
  >
  > Drei Gerichte aus dem Planer für so einen Abend:
  >
  > - **Käse-Spinat-Nudeln aus einem Topf.** Rund 18 Minuten, ein Topf.
  > - **Schinken-Erbsen-Nudeln in Sahnesauce.** Rund 18 Minuten. Da passt die halbe Sahne vom Wochenanfang rein.
  > - **Bananen-Hafer-Pfannkuchen.** Rund 20 Minuten, für den Abend, an dem nichts mehr geht.
  >
  > 83 Rezepte bei Wochenschmaus brauchen höchstens 20 Minuten, 22 tragen den Kinder-Tag (Stand 10/2026).
  >
  > Die Frage fällt ganz weg, wenn sonntags die Woche steht. Den Anfang machst du mit einem Tag, gratis:
  > **[Tag planen]** → {{URL_PLANER}}?v=alltag
  >
  > Liebe Grüße
  > Wochenschmaus
- **Pflichtangaben:** B2 + B1

### W-L4 · Tag 7: Du sagst den Betrag (W)

- **Auslöser:** 7 Tage nach W-L1, Sonntag 18 Uhr bevorzugt
- **Betreff:** Du sagst, was die Woche kosten darf (35)
- **Vorschau:** Budget eintragen, auch wenn es wenig ist. Reicht es nicht, sagt der Plan das offen.
- **Text:**
  > Hallo,
  >
  > viele Planer verlangen ein Mindestbudget. Bei Wochenschmaus gibt es keins.
  >
  > Du trägst ein, was die Woche kosten darf. Der Planer sucht Gerichte, die dazu passen, und rechnet mit Schätzpreisen deines Ladens. Reicht der Betrag nicht, steht da ehrlich, was der günstigste Plan ungefähr kostet.
  >
  > Die Preise sind Schätzungen mit Preisstand. Sie können von deinem Kassenbon abweichen, je nach Region und Woche.
  >
  > Dazu ein Tipp: Ein Laden, ein Einkauf, ein Zettel. Der Zettel ist nach den Abteilungen deines Ladens sortiert, vom Gemüse bis zum Kühlregal. Mit dem Teilen-Knopf schickst du ihn an alle, die mit einkaufen.
  >
  > **[Budget eintragen, Tag planen]** → {{URL_PLANER}}?v=alltag
  >
  > Liebe Grüße
  > Wochenschmaus
- **Optionaler Satz, nur nach Kassenbon-Test:** „Beispiel: Woche für {{PERSONEN}} Personen bei {{LADEN}}: ca. {{BETRAG}} € (Schätzung, Preisstand {{PREISSTAND}}, regional abweichend).“
- **Pflichtangaben:** B2 + B1

### W-L5 · Tag 10: Plus vorstellen (W)

- **Auslöser:** 10 Tage nach W-L1. Nicht an Kunden.
- **Betreff:** Die ganze Woche planen: so geht Plus (36)
- **Vorschau:** 7 Tage 0 €, danach 44,99 € im Jahr oder 6,99 € im Monat. Der Tagesplan bleibt gratis.
- **Text:**
  > Hallo,
  >
  > der Tagesplan bleibt gratis, so oft du willst. Für die ganze Woche gibt es Plus:
  >
  > - Plan bis zu 14 Tage, für deinen Laden, dein Budget, eure Personenzahl
  > - ein Einkaufszettel für alles, in ganzen Packungen, mit Resten
  > - Vorkoch-Ablauf, wenn du an einem Abend für den nächsten mitkochst
  > - PDF für die Kühlschranktür
  >
  > **Preise:**
  > - **Plus Jahr: 7 Tage 0 €, danach 44,99 € im Jahr.** Laufzeit 12 Monate, danach monatlich kündbar.
  > - **Plus Monat: 7 Tage 0 €, danach 6,99 € im Monat.** Monatlich kündbar.
  >
  > Kündigst du in den ersten 7 Tagen, zahlst du nichts. Kündigen geht ohne Login über „Verträge hier kündigen“. Allergien und Vorlieben bleiben auf deinem Handy, für den Schlüssel brauchen wir nur deine E-Mail. Im Planer gibt es keine Werbung.
  >
  > **[Preise ansehen]** → {{URL_PREISE}}?v=alltag
  >
  > In zwei Wochen kommt der nächste Plan.
  >
  > Liebe Grüße
  > Wochenschmaus
- **Pflichtangaben:** B2 + B1. Danach Rhythmus alle zwei Wochen, nur mit neuem Plan.

### W-K1 · Kaufbestätigung mit Lizenzschlüssel (T)

- **Auslöser:** sofort nach Paddle-Webhook
- **Betreff:** Dein Wochenschmaus-Schlüssel ist da (35)
- **Vorschau:** Einfügen, freischalten, die erste Woche planen. Drei Schritte.
- **Text:**
  > Hallo {{NAME}},
  >
  > schön, dass du dabei bist. Du hast **{{PRODUKT}}** gebucht. Hier ist dein Lizenzschlüssel:
  >
  > `{{LIZENZ}}`
  >
  > **Plus freischalten:**
  > 1. Öffne {{URL_PREISE}}?v=alltag auf dem Handy, mit dem du planst.
  > 2. Unter „Schon gekauft? Plus freischalten“ den ganzen Schlüssel einfügen.
  > 3. „Plus freischalten“ tippen. Oben steht dann „Plus aktiv“.
  >
  > **Gut zu wissen:**
  > - Der Schlüssel liegt nur auf deinem Gerät. Neues Handy oder anderer Browser: noch mal einfügen.
  > - Browserdaten gelöscht heißt Schlüssel weg. Heb diese Mail gut auf.
  > - Gültig bis {{LIZENZ_BIS}}.
  > - Die ersten 7 Tage kosten 0 €, erste Abbuchung am {{ABBUCHUNG_DATUM}}.
  >
  > Die Rechnung schickt Paddle, unser Zahlungsdienstleister, in einer eigenen Mail. Die Vertragsunterlagen kommen gleich separat.
  >
  > Erster Schritt: Laden, Budget und Personen eintragen und den Plan auf 7 Tage stellen.
  >
  > Fragen? Antworte einfach auf diese Mail.
  >
  > Liebe Grüße
  > Wochenschmaus
- **Pflichtangaben:** B1

### W-K2 · Vertragsbestätigung (T, Textform)

- **Absender:** Wochenschmaus Verträge <vertrag@…>
- **Betreff:** Deine Vertragsbestätigung: {{PRODUKT}} (Plus Jahr: 36)
- **Vorschau:** Laufzeit, Preis, Kündigung und Widerruf auf einen Blick. Bitte aufheben.
- **Text:**
  > Hallo {{NAME}},
  >
  > hier sind alle Angaben zu deinem Vertrag. Bitte heb die Mail auf.
  >
  > [B3 + Laufzeit-Block + Kündigungsweg]
  >
  > [B4]
  >
  > Im Anhang: AGB, Widerrufsbelehrung, Muster-Widerrufsformular.
  >
  > Wochenschmaus
- **Auslöser, Anhänge, Pflichtangaben:** wie Z-K2

### W-K3 · Tag 2: Dein erster Vorkochabend (S)

- **Auslöser:** 2 Tage nach Kauf, 17 Uhr
- **Betreff:** Einmal kochen, zweimal essen (28)
- **Vorschau:** Am Sonntag planen, am Montag doppelt kochen. So nutzt du den Vorkoch-Ablauf.
- **Text:**
  > Hallo,
  >
  > Vorkochen heißt bei Wochenschmaus nicht, den ganzen Sonntag in der Küche zu stehen. Es reicht ein Abend, an dem du für den nächsten mitkochst.
  >
  > So geht's:
  >
  > 1. **Sonntag die Woche planen** und einmal einkaufen.
  > 2. **Reiter „Vorkochen“ öffnen.** Dort steht, welches Gericht sich für zwei Tage eignet.
  > 3. **Gut geeignet** sind Eintöpfe wie Linseneintopf mit Wiener Würstchen. Der hält gekühlt 2 Tage und lässt sich einfrieren. Gerichte mit Reis oder Nudeln besser am nächsten Tag essen, die halten nur 1 Tag.
  > 4. **Box beschriften** mit Datum und „essen bis“, damit es nicht hinten im Kühlschrank verschwindet.
  >
  > Den Einkaufszettel kannst du mit dem Teilen-Knopf an alle schicken, die mit einkaufen.
  >
  > **[Woche planen]** → {{URL_PLANER}}?v=alltag
  >
  > Liebe Grüße
  > Wochenschmaus
  >
  > Keine Tipps mehr? {{TIPPS_ABMELDEN}}
- **Pflichtangaben:** B1

### W-K4 · Tag 5: Testphase endet (T)

- **Auslöser:** Tag 5, nur wenn nicht gekündigt
- **Absender:** Wochenschmaus Verträge <vertrag@…>
- **Betreff:** Deine Testphase endet am {{DATUM}} (35 mit Datum)
- **Vorschau:** Danach {{PREIS}}. Wenn das passt, musst du nichts tun. Kündigen geht ohne Login.
- **Text:**
  > Hallo {{NAME}},
  >
  > damit nichts überraschend vom Konto geht:
  >
  > - Deine 7 Tage zu 0 € enden am **{{DATUM}}**.
  > - Danach kostet {{PRODUKT}} **{{PREIS}}**, erste Abbuchung am {{ABBUCHUNG_DATUM}}.
  >
  > Passt das, läuft Plus weiter, du musst nichts tun.
  >
  > Passt es nicht, kündige vor dem {{DATUM}}, dann zahlst du nichts:
  > **[Verträge hier kündigen]** → {{URL_KUENDIGEN}}
  >
  > Liebe Grüße
  > Wochenschmaus
- **Pflichtangaben:** B1

### W-E1 · Kündigungsbestätigung (T)

- **Betreff:** Deine Kündigung ist angekommen (30)
- **Vorschau:** Eingang {{EINGANG_DATUM}}, {{EINGANG_UHRZEIT}} Uhr. Wirksam zum {{WIRKDATUM}}.
- **Text:**
  > Hallo {{KUEND_NAME}},
  >
  > wir bestätigen deine Kündigung.
  >
  > [B5 + Wirk-Satz]
  >
  > Du musst nichts weiter tun. Den Tagesplan kannst du weiter gratis nutzen. Vorlieben und Allergien bleiben auf deinem Handy.
  >
  > Die Wochenpläne per Mail laufen davon getrennt. Abmelden geht über den Link in jeder dieser Mails.
  >
  > Wochenschmaus
- **Auslöser, Absender, Pflichtangaben:** wie Z-E1

### W-E2 · Widerrufs-Eingangsbestätigung (T)

- **Betreff:** Dein Widerruf ist angekommen (28)
- **Vorschau:** Eingang {{EINGANG_DATUM}}, {{EINGANG_UHRZEIT}} Uhr. So geht es mit deinem Geld weiter.
- **Text:** wie Z-E2, Gruß „Wochenschmaus“. [B6 + Folgen-Block]
- **Auslöser, Absender, Pflichtangaben:** wie Z-E2

### W-R1 · Rückgewinnung, 30 Tage nach Ende (W)

- **Auslöser:** 30 Tage nach Wirkzeitpunkt, nur mit Werbeeinwilligung
- **Betreff:** Was gibt's diese Woche bei dir? (31)
- **Vorschau:** Der Tagesplan bleibt gratis. Dazu ein Tipp für Wochen, in denen es eng wird.
- **Text:**
  > Hallo,
  >
  > Plus ist seit einem Monat aus. Den Tagesplan kannst du weiter gratis nutzen, mit deinem Laden und deinem Budget.
  >
  > Ein Tipp für Wochen, in denen es eng wird: Trag das Budget ruhig niedrig ein. Reicht es nicht, sagt dir der Plan, was der günstigste Tag ungefähr kostet. Dann weißt du es vor dem Einkauf und nicht an der Kasse.
  >
  > {{NEU_SEIT_ENDE}} *(nur echte Neuerungen, sonst streichen)*
  >
  > Plus gibt es weiter für 6,99 € im Monat oder 44,99 € im Jahr.
  > **[Tag planen]** → {{URL_PLANER}}?v=alltag
  >
  > Liebe Grüße
  > Wochenschmaus
- **Pflichtangaben:** B2 + B1

### W-R2 · Rückgewinnung, 90 Tage nach Ende (W)

- **Auslöser:** 90 Tage nach Ende. Letzte Rückgewinnungsmail.
- **Betreff:** Weiter Wochenpläne per Mail? (28)
- **Vorschau:** Alle zwei Wochen ein neuer Plan, oder Ruhe im Postfach. Ein Klick reicht.
- **Text:**
  > Hallo,
  >
  > alle zwei Wochen schicken wir einen neuen Plan mit Einkaufszettel. Magst du ihn weiter bekommen?
  >
  > **[Ja, gern]** → {{LINK_BLEIBEN}}
  > **[Nein, austragen]** → {{ABMELDELINK}}
  >
  > Klickst du nichts, bleibt alles wie bisher: alle zwei Wochen ein Plan, mehr nicht.
  >
  > Liebe Grüße
  > Wochenschmaus
- **Pflichtangaben:** B2 + B1

*Wochenschmaus hat keinen Pass, deshalb keine Mail „Pass endet“.*

---
## 5. Technische Umsetzung (neutral)

### 5.1 Ablauf

```
Formular (nur E-Mail + Einwilligungs-Häkchen)  →  Mail-Tool: DOI-Mail (Z/K/F/W-0)  →  Klick  →  Liste der Marke, Strecke L1–L5
Paddle-Kasse  →  Webhook  →  eigener kleiner Server (server/vertrag-worker.js): Schlüssel signieren
              →  Mail-Tool (Transaktions-API): K1 Kaufbestätigung, K2 Vertragsbestätigung mit PDF-Anhängen
              →  Zeitsteuerung: K3 (Tag 2), K4 (Tag 5, nur Abo), B7 (bei jeder Verlängerung), P1 (Pass-Ende −7 Tage)
kuendigen.html / widerrufen.html  →  Worker: Zeitstempel speichern, Paddle-Kündigung bzw. Erstattung auslösen
              →  E1 bzw. E2 sofort, dieselben Daten auf der Bestätigungsseite zum Speichern
Vertragsende + 30 / + 90 Tage  →  R1 / R2, **nur** wenn Kontakt Werbeeinwilligung = ja und nicht abgemeldet
```

### 5.2 Anforderungen an den Mail-Anbieter

1. Double-Opt-in eingebaut, mit Protokoll (Zeitpunkt, IP, Formulartext, Version), exportierbar als Nachweis.
2. Server und Datenverarbeitung in der EU, Auftragsverarbeitungsvertrag nach Art. 28 DSGVO, Liste der Unterauftragnehmer.
3. Transaktionsmails per API oder SMTP **und** Marketing-Automationen, am besten in einem Werkzeug. Sonst zwei Dienste: einer für Verträge, einer für Werbung.
4. Vier Absender-Domains mit SPF, DKIM und DMARC. Getrennte Listen je Marke, damit Abmeldung und Rhythmus je Marke gelten.
5. Ein-Klick-Abmeldung mit `List-Unsubscribe-Post`.
6. Anhänge an Transaktionsmails (PDF für die Vertragsbestätigung).
7. Öffnungs- und Klick-Tracking **abschaltbar**. Empfehlung: aus, oder in Einwilligungstext und Datenschutzerklärung ausdrücklich nennen (Zählpixel in Mails sind nach § 25 TDDDG und DSGVO umstritten).
8. Keine Felder für Geräte, Allergien, Ziele, Personen oder Kinder anlegen (Art. 9 DSGVO, ENTSCHEIDUNGEN C3). Erlaubte Felder: E-Mail, Marke, Einwilligung (ja/nein, Datum, Text-Version), Kundenstatus, Produkt, Vertragsende, Lizenz bis, Tipps abbestellt.

### 5.3 Anbieter im Vergleich

Keiner der Anbieter ist ein Partner oder Sponsor, keine Empfehlung aus Provisionsgründen. Die Werkzeugliste im Skill `emails` (Customer.io, Mailchimp, Resend, SendGrid, Kit, Nitrosend) wurde nicht übernommen. Diese Anbieter haben überwiegend Sitz und Server in den USA und passen daher schlechter zu Anforderung 2. **Preise, Freikontingente und Serverstandorte ändern sich. Vor der Wahl auf der Anbieterseite prüfen** (hier bewusst keine Preise, damit keine veralteten Zahlen in die Entscheidung gehen).

| Kriterium | Brevo | CleverReach | MailerLite | rapidmail (Ergänzung) |
|---|---|---|---|---|
| Sitz | Frankreich (früher Sendinblue) | Deutschland (Rastede) | Litauen (EU) | Deutschland (Freiburg) |
| Serverstandort | laut Anbieter EU **[prüfen]** | laut Anbieter Deutschland **[prüfen]** | **[prüfen]**, teils US-Infrastruktur genannt, Standardvertragsklauseln klären | laut Anbieter Deutschland **[prüfen]** |
| Double-Opt-in | ja, eingebaut | ja, eingebaut | ja, eingebaut | ja, eingebaut |
| Transaktionsmails per API/SMTP | ja, im selben Konto | eingeschränkt bzw. Zusatz **[prüfen]** | über eigenes Zusatzprodukt **[prüfen]** | nein bzw. **[prüfen]** |
| Automationen (Zeitversatz, Bedingungen) | ja | ja | ja | einfach |
| Deutschsprachige Oberfläche und Hilfe | ja | ja | teilweise | ja |
| Passt gut, wenn … | ein Werkzeug für Verträge **und** Werbung gewünscht ist | Werbung im Vordergrund steht und Transaktionen separat laufen | ein schlankes, günstiges Newsletter-Werkzeug gesucht ist | nur Newsletter, deutscher Anbieter gewünscht |
| Zu beachten | Abrechnung nach Mailvolumen **[prüfen]** | Transaktionsweg extra lösen | Datenexport in Drittland klären | Transaktionsweg extra lösen |

**Einordnung:** Weil Kaufbestätigung, Vertrags-, Kündigungs- und Widerrufsmails zwingend und sofort raus müssen, ist ein Anbieter mit **beidem in einem Konto** am einfachsten zu betreiben. Die Wahl trifft der Inhaber nach Prüfung der aktuellen Preise. Wichtig ist der AV-Vertrag vor der ersten Adresse.

### 5.4 Prüfliste vor dem ersten Versand

1. Anwalt prüft B3 bis B6, die Rolle von Paddle als Verkäufer und die Widerrufsbelehrung (`07` § 3, `11` Einwand E).
2. Preis und Abrechnung von Plus Jahr nach 12 Monaten festlegen (B3, offen).
3. Lizenzschlüssel: Verlängerung (B7) technisch lösen. Bei Kündigung oder Widerruf lässt sich ein ausgegebener Schlüssel offline nicht sperren. Darum kurze Laufzeiten „bis“ je Abrechnungszeitraum wählen.
4. Rezeptzahlen in allen Mails neu zählen (Stand 10/2026 → Versanddatum).
5. Kosten-Absätze nur nach Kassenbon-Test, sonst löschen. Reste-Retter-PDF erst nach Testkochen.
6. Impressum-Daten in B1 eintragen (`config.js` → `betreiber`).
7. Testversand jeder Mail an Gmail, GMX, web.de, Outlook und iPhone-Mail. Betreff und Vorschau auf dem Handy lesen.
8. Kündigungs- und Widerrufsstrecke einmal komplett durchspielen: Zeitstempel in Mail und Bestätigungsseite gleich?
9. Freigabe-Check aus dem Markenbuch auf jede W-Mail anwenden (Zahl mit Quelle? „gesund“, „fit“, „spart“? Zitat, das wie Kundenstimme aussieht? Gratis wirklich gratis?).

### 5.5 Messen (ohne sensible Daten)

| Kennzahl | Ziel bzw. Grenze | Quelle |
|---|---|---|
| Kosten je bestätigtem DOI-Lead | höchstens 3 € | `11` Punkt 1.2 |
| DOI-Bestätigungsquote | beobachten, unter 50 % Formular und DOI-Mail prüfen **[Hypothese, kein Benchmark belegt]** | – |
| Lead → Kauf binnen 30 Tagen | Hauptgröße, je Marke | `08` 3.10 laut `11` |
| Freischaltquote (K1 → „Plus aktiv“) | nicht messbar ohne Tracking in der App. Ersatz: Antworten „klappt nicht“ zählen | Datensparsamkeit |
| Kündigung in der Testphase | beobachten, nicht „optimieren“ durch Hürden | § 312k BGB |
| Abmelderate je W-Mail | über 1 % je Mail: Inhalt prüfen **[Hypothese]** | – |

---

## 6. Platzhalter

| Platzhalter | Inhalt | Quelle |
|---|---|---|
| `{{MARKE}}` | Zimmerherd, Kochsatz, Zweiflammer, Wochenschmaus | fest je Liste |
| `{{DOMAIN}}`, `{{DOMAIN_ZIMMERHERD}}`, `{{DOMAIN_KOCHSATZ}}`, `{{DOMAIN_ZWEIFLAMMER}}`, `{{DOMAIN_WOCHENSCHMAUS}}` | Absender- und Seiten-Domain je Marke | Inhaber |
| `{{NAME}}` | Name des Käufers, falls Paddle ihn liefert, sonst Anrede „Hallo,“ | Paddle |
| `{{INHABER_NAME}}`, `{{ANSCHRIFT}}`, `{{KONTAKT_EMAIL}}`, `{{TELEFON}}`, `{{USTID_ODER_WIDNR}}` | Impressumsangaben | `config.js` → `betreiber` |
| `{{URL_IMPRESSUM}}`, `{{URL_DATENSCHUTZ}}`, `{{URL_KUENDIGEN}}`, `{{URL_WIDERRUFEN}}`, `{{URL_WIDERRUFSBELEHRUNG}}` | Rechtsseiten (`impressum.html`, `datenschutz.html`, `kuendigen.html`, `widerrufen.html`, `widerruf.html`) | Seiten-Generator |
| `{{URL_PLANER}}`, `{{URL_PREISE}}` | `planer.html`, `preise.html`, jeweils mit `?v=montage`, `fitness`, `camping`, `alltag` | App |
| `{{DOI_LINK}}`, `{{DOI_DATUM}}` | Bestätigungslink, Datum der Bestätigung | Mail-Tool |
| `{{LEADMAGNET}}` | Zimmer-Check, Protein-Liste, Bordküchen-Check, Reste-Retter-Wochenplan, Warteliste | fest je Formular |
| `{{LINK_PDF}}`, `{{LINK_PDF_1}}` bis `{{LINK_PDF_3}}` | Download des Lead-Magneten | Inhaber |
| `{{ABMELDELINK}}`, `{{LINK_BLEIBEN}}`, `{{TIPPS_ABMELDEN}}` | Abmeldung Werbung, Bestätigung „weiter schreiben“, Abbestellen der Kunden-Tipps | Mail-Tool |
| `{{PRODUKT}}` | Plus Monat, Plus Jahr, Montage-Pass, Saison-Pass | Paddle |
| `{{PREIS}}` | 6,99 € im Monat · 44,99 € im Jahr · 17,99 € einmalig · 24,99 € einmalig | `config.js` → `preise` |
| `{{PREIS_NACH_ERSTLAUFZEIT}}` | Preis und Rhythmus von Plus Jahr ab Monat 13 | **offen** |
| `{{BESTELLNR}}`, `{{DATUM_BESTELLUNG}}`, `{{UHRZEIT_BESTELLUNG}}` | aus der Bestellung, inkl. Zeitpunkt der Zustimmungs-Checkbox | Paddle/Worker |
| `{{LIZENZ}}`, `{{LIZENZ_BIS}}`, `{{LIZENZ_BIS_ALT}}` | signierter Schlüssel, sein Ablaufdatum, Ablauf des vorigen Schlüssels | `tools/lizenz.mjs` |
| `{{DATUM}}` | Ende der Testphase (Tag 7) | Worker |
| `{{ABBUCHUNG_DATUM}}` | erste Abbuchung (Tag 8) | Paddle |
| `{{ENDE_ERSTLAUFZEIT}}` | Ende der 12 Monate bei Plus Jahr | Worker |
| `{{PASS_START}}`, `{{PASS_ENDE}}` | Laufzeit des Passes | Worker |
| `{{EINGANG_DATUM}}`, `{{EINGANG_UHRZEIT}}` | Zugang von Kündigung bzw. Widerruf, Serverzeit in MEZ/MESZ | Worker |
| `{{KUEND_ART}}`, `{{KUEND_GRUND}}`, `{{KUEND_NAME}}`, `{{KUEND_EMAIL}}`, `{{KUEND_VERTRAG}}`, `{{KUEND_ZUM}}` | Angaben aus dem Kündigungsformular, unverändert | `kuendigen.html` |
| `{{WIRKDATUM}}` | Zeitpunkt, zu dem die Kündigung wirkt (bei Leerfeld: frühestmöglicher Termin) | Worker |
| `{{ANTWORT_BIS}}` | Frist für Antwort bei außerordentlicher Kündigung | Inhaber |
| `{{WID_NAME}}`, `{{WID_EMAIL}}`, `{{WID_VERTRAG}}` | Angaben aus dem Widerrufsformular | `widerrufen.html` |
| `{{ERSTATTUNG}}`, `{{ERSTATTUNG_BIS}}`, `{{GENUTZTE_TAGE}}`, `{{WERTERSATZ}}`, `{{FRISTENDE}}` | Beträge und Fristen beim Widerruf | Worker/Paddle |
| `{{NEU_SEIT_ENDE}}` | echte Neuerung seit Vertragsende (z. B. „23 neue Rezepte ohne Kühlschrank“). Leer = Absatz entfällt | Inhaber |
| `{{LADEN}}`, `{{BETRAG}}`, `{{PREISSTAND}}`, `{{PERSONEN}}` | nur für Kosten-Absätze nach Kassenbon-Test | echter Plan |

## 7. Offene Punkte für den Inhaber

1. **Anwalt:** Paddle als Verkäufer gegenüber Widerrufsbelehrung mit Inhaber als Adressat; Wertersatz ja oder nein; vorzeitige Kündigung beim Pass; Umgang mit verspätetem Widerruf; BGH I ZR 200/25 im Volltext.
2. **Preis Plus Jahr ab Monat 13** festlegen und in `config.js`, AGB, Kasse und B3 gleich formulieren.
3. **Mail-Anbieter wählen** (Abschnitt 5.3), AV-Vertrag schließen, Domains einrichten.
4. **Widerspruchshinweis beim Kauf** einbauen, falls die sachlichen Hinweise auf neuen Pass bzw. Pass statt Abo in Z-P1, F-P1, Z-K4, F-K4 bleiben sollen (§ 7 Abs. 3 UWG). Sonst diese Sätze streichen.
5. **Mehrere Geräte pro Schlüssel** in den AGB regeln (F-K1).
6. Lead-Magnet-PDFs: gebaut mit `node tools/leadmagnete.mjs` (aus `app/`) nach `app/public/pdf/` (zimmer-check, protein-liste, bordkuechen-check, wochenplan-1-person / -2-personen / -3-personen). Reste-Retter-Plan erst nach Kassenbon-Test und Testkochen versenden. Die Strecken setzen sie voraus.
