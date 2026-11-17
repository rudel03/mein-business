# Beispiel: Termin-Autopilot für „Salon Lieblingsschnitt“ (fiktiv)

Durchgespieltes Beispiel für einen Betrieb: vom Erstkontakt bis zum Angebot.
Alle Zahlen sind **Beispielwerte**. Im echten Fall mit den Zahlen des Betriebs rechnen.

Demo-Seite: `demo-salon.html` (als Artifact veröffentlicht, Link siehe `../CLAUDE.md`).

---

## 1. Der Betrieb

| | |
|---|---|
| Betrieb | Salon Lieblingsschnitt, 3 Friseurinnen, Inhaberin arbeitet selbst mit |
| Heute | Termine nur per Telefon, Papierkalender, keine Erinnerungen |
| Problem | Telefon klingelt während der Arbeit, ca. 6–8 ausgefallene Termine pro Woche |
| Durchschnittlicher Termin | ca. 45 € |

## 2. Erreichbarkeits-Test (vor dem Erstkontakt)

Innerhalb einer Woche 5-mal zu Stoßzeiten anrufen und protokollieren:

| Datum | Uhrzeit | Ergebnis |
|---|---|---|
| Di | 10:15 | niemand erreichbar |
| Mi | 12:40 | angenommen nach 6× Klingeln |
| Do | 16:30 | niemand erreichbar |
| Fr | 11:05 | niemand erreichbar |
| Sa | 10:20 | angenommen |

**Ergebnis: 3 von 5 Anrufen nicht angenommen.**
Wichtig: Nur echte Anrufe zu normalen Zeiten, nicht ständig anrufen und nichts vortäuschen (z. B. keinen falschen Termin buchen).

## 3. Brief an die Inhaberin (Post, kein E-Mail)

> **Salon Lieblingsschnitt**
> z. H. der Inhaberin
> Musterstraße 12, 12345 Musterstadt
>
> **3 von 5 Anrufen gingen letzte Woche ins Leere**
>
> Guten Tag,
>
> ich habe Ihren Salon letzte Woche fünfmal zu üblichen Zeiten angerufen. Dreimal ging niemand ran. Das ist kein Vorwurf: Wer gerade Haare schneidet, kann nicht ans Telefon. Aber jeder dieser Anrufe ist eine Kundin, die vielleicht beim nächsten Salon bucht.
>
> Ich habe Ihnen deshalb eine Beispielseite gebaut, mit Ihren Leistungen und Öffnungszeiten:
>
> **[QR-Code] → demo.ihre-domain.de/lieblingsschnitt**
>
> Dort sehen Sie in einer Minute:
> - wie Kundinnen rund um die Uhr selbst einen Termin buchen,
> - wie sie am Vortag automatisch per SMS erinnert werden (weniger ausgefallene Termine),
> - wie ein KI-Assistent Standardfragen beantwortet, wenn Sie keine Hand frei haben.
>
> Ich richte das in 7 Tagen komplett ein. Sie brauchen dafür etwa 30 Minuten Zeit für ein Gespräch. Die Einrichtung zahlen Sie erst, wenn alles läuft, und Sie können monatlich kündigen.
>
> Ich komme gern für 10 Minuten vorbei und zeige es Ihnen auf dem Tablet. Rufen Sie mich an oder tragen Sie sich auf der Beispielseite ein.
>
> Viele Grüße
> [Name] · [Firma] · [Telefon] · [Anschrift]
>
> *Sie möchten keine Post mehr von mir? Ein kurzer Anruf oder eine Mail genügt.*

## 4. Gesprächsleitfaden (Besuch vor Ort, 10 Minuten)

1. **Einstieg (1 Min.):** „Ich hatte Ihnen den Brief mit den Anrufen geschickt. Haben Sie kurz Zeit, ich zeige Ihnen die Seite?“ Passt es gerade nicht, nach einem besseren Zeitpunkt fragen.
2. **Fragen statt reden (3 Min.):**
   - „Wie viele Termine fallen pro Woche aus, ohne dass jemand absagt?“
   - „Wie oft klingelt das Telefon, während Sie bei einer Kundin sind?“
   - „Was kostet ein durchschnittlicher Termin bei Ihnen?“
3. **Demo zeigen (3 Min.):** Termin buchen, SMS-Erinnerung, KI-Assistent. Die Inhaberin selbst klicken lassen.
4. **Rechnung mit IHREN Zahlen (2 Min.):** siehe Abschnitt 5.
5. **Angebot und nächster Schritt (1 Min.):** „Ich richte das in 7 Tagen ein. Einrichtung zahlen Sie erst, wenn es läuft. Darf ich Ihnen das Angebot per Mail schicken?“ → **Einwilligung schriftlich festhalten** (Formular/Tablet, Datum, Mail-Adresse).

**Häufige Einwände:**

| Einwand | Antwort |
|---|---|
| „Meine Kundinnen rufen lieber an.“ | „Das Telefon bleibt. Die Online-Buchung kommt dazu, für alle, die abends buchen wollen.“ |
| „Zu teuer.“ | Mit der eigenen Rechnung antworten: „Wenn nur 2 ausgefallene Termine im Monat weniger sind, ist es bezahlt.“ |
| „KI am Telefon finde ich unpersönlich.“ | „Der Assistent beantwortet nur Standardfragen und sagt, dass er eine KI ist. Alles andere landet bei Ihnen.“ |
| „Und der Datenschutz?“ | „Server in der EU, Auftragsverarbeitungsvertrag ist dabei, SMS nur mit Einwilligung der Kundin.“ |
| „Ich habe keine Zeit für so was.“ | „Genau deshalb mache ich alles. Sie brauchen 30 Minuten für ein Gespräch.“ |

## 5. Rechnung für die Inhaberin (Beispielwerte)

| Posten | Wert |
|---|---|
| Ausgefallene Termine pro Woche | 7 |
| Durchschnittlicher Umsatz pro Termin | 45 € |
| **Verlust pro Monat** (7 × 45 € × 4,3 Wochen) | **ca. 1.350 €** |
| Wenn Erinnerungen davon ein Drittel verhindern | ca. 450 € mehr pro Monat |
| Kosten Termin-Autopilot | 169 € pro Monat |
| **Ergebnis** | **ca. 280 € mehr pro Monat**, dazu weniger Telefonstress und zusätzliche Online-Buchungen |

Keine festen Prozent-Versprechen machen, solange keine eigenen Messwerte vorliegen (UWG).

## 6. Das Angebot

**Termin-Autopilot für Salon Lieblingsschnitt**

| Baustein | Inhalt |
|---|---|
| Online-Buchung | eigene Buchungsseite mit Leistungen, Preisen, Öffnungszeiten, Einbindung in Website und Google-Profil |
| Erinnerungen | SMS oder WhatsApp 24 Stunden vorher, nur mit Einwilligung, Absagen mit einem Klick |
| Warteliste | frei gewordene Termine gehen automatisch an die Warteliste |
| KI-Assistent | beantwortet Standardfragen (Website und Anrufbeantworter), gibt sich als KI zu erkennen |
| Bewertungen | freundliche Bitte um Google-Bewertung nach dem Besuch, ohne Gegenleistung |
| Datenschutz-Paket | Auftragsverarbeitungsvertrag, Text für Datenschutzerklärung, KI-Hinweis |
| Messung | Ausfälle und verpasste Anrufe vorher und nach 60 Tagen |

| Preis | |
|---|---|
| Einrichtung | 490 € (zahlbar erst, wenn alles läuft) |
| Monatlich | 169 € inkl. Betreuung und Anpassungen, **monatlich kündbar** |
| Pilotkunden (die ersten 3) | Einrichtung kostenlos, dafür Messung vorher/nachher und bei Zufriedenheit eine namentliche Kundenstimme |

**Garantie:** Läuft das System nach 7 Tagen nicht, zahlt der Salon nichts. Sinken die ausgefallenen Termine nach 60 Tagen nicht, gibt es die Monatsgebühren zurück.

## 7. Technik (Vorschlag, noch zu prüfen)

- Buchung und Erinnerungen: fertiges Buchungstool mit EU-Servern statt Eigenbau (Anbieter neutral vergleichen)
- KI-Assistent Telefon: deutscher Anbieter mit EU-Hosting, Preise ca. 40–100 € pro Monat (siehe Recherche)
- Eigene Marge: Differenz zwischen Toolkosten und 169 € plus Einrichtung

## 8. Rechtliche Punkte

- Erstkontakt nur per Post oder persönlich, keine Kalt-Mails (§ 7 UWG).
- SMS-Erinnerungen nur mit Einwilligung der Kundin (Checkbox, nicht vorab angehakt).
- KI-Assistent muss sich als KI zu erkennen geben (EU AI Act, Transparenzpflicht).
- Bewertungsanfragen ohne Gegenleistung und ohne nur zufriedene Kundinnen auszuwählen.
- Auftragsverarbeitungsvertrag mit dem Salon und mit allen eingesetzten Tools.
- Kundenstimmen nur echt und mit Einwilligung.
