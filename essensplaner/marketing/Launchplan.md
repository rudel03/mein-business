# Launchplan Essensplaner (Tellerkontor)

Stand 29.10.2026. Grundlage: Entscheidungen A3, A4, P4 (`ENTSCHEIDUNGEN.md`), Abbruchkriterien (`recherche/Entscheidungsvorlage.md`), Kampagnen (`marketing/Kampagnen.md`). **Nichts davon ist gestartet.** Jeder Schritt mit „Inhaber“ ist für dich, weil er Geld kostet, ein Konto braucht oder etwas veröffentlicht.

## Grundsatz
1. **Eine Nische nach der anderen.** Alle vier Landingpages sind fertig, aktiv beworben wird zuerst nur **Zimmerherd (Montage)**, ab Februar **Zweiflammer (Camping)**, danach **Kochsatz (Fitness)**. **Wochenschmaus (Alltag)** wächst nur über Suche und Pinterest.
2. **Erst prüfen, dann zahlen.** Vor dem ersten Werbe-Euro: Warteliste, 5–10 Gespräche, Preistest.
3. **Werbung nur als gedeckelter Test:** höchstens 150 € je Nische, Abbruchregeln stehen vorher fest (unten).
4. **Keine Kosten-Werbung, bis der Kassenbon-Test bestanden ist** (Claim-Freigabe 🔴).

## Phase 0 – Startklar machen (Woche 1–3, Inhaber, ohne Werbegeld)
| Nr. | Aufgabe | Wer | Details |
|---|---|---|---|
| 0.1 | Marken prüfen lassen (DPMA/EUIPO) und Domains kaufen | Inhaber | `FUER_DICH.md` 1 |
| 0.2 | Gewerbe, Steuerberatung (Kleinunternehmer über alle drei Projekte) | Inhaber | `FUER_DICH.md` 2 |
| 0.3 | Paddle-Konto, Produkte und Checkout-Links anlegen | Inhaber | `FUER_DICH.md` 3 |
| 0.4 | Lizenzschlüssel erzeugen, Worker einrichten | Inhaber, Claude hilft | `server/README.md` |
| 0.5 | Impressum-Daten eintragen, Rechtstexte anwaltlich prüfen | Inhaber | `FUER_DICH.md` 4 |
| 0.6 | 20 Rezepte testkochen, Kassenbon-Test in 2 Läden | Inhaber | `FUER_DICH.md` 5 |
| 0.7 | Hosting einrichten (statisch, gzip, Cache-Header), `basisUrl` in `config.js` setzen, `python3 tools/seiten.py && python3 tools/landing.py` | Inhaber, Claude hilft | |
| 0.8 | Mail-Dienst mit Double-Opt-in (Warteliste, Lead-Magnete) | Inhaber | `marketing/Mails_alle_Marken.md` |
| 0.9 | **Testkauf** mit Paddle-Sandbox: Kauf → Mail mit Schlüssel → Freischaltung → Kündigen → Bestätigung | Inhaber + Claude | Abnahme „Testkauf“ aus AUFTRAG §9 |

## Phase 1 – Validierung Zimmerherd (Woche 4–7, 0 €)
| Woche | Was | Wer | Messgröße |
|---|---|---|---|
| 4 | Landingpage live, Warteliste mit Double-Opt-in, Lead-Magnet „Zimmer-Check“ | Inhaber (live schalten) | Besucher, bestätigte Einträge |
| 4 | Anfragen an 2 Kanal-Partner (Monteurzimmer-Portal, Fahrer-Community) | Inhaber verschickt, Claude entwirft | Antwort ja/nein |
| 4–6 | 5–10 Interviews (Leitfaden `recherche/04`) | Inhaber führt, Claude wertet aus | Anteil mit Planungsproblem, genannte Zahlungsbereitschaft |
| 5–7 | Organisch: 3 Videos als Reels/TikTok, Beiträge nur in Gruppen, die Werbung erlauben | Inhaber postet | Klicks, Wartelisten-Einträge |
| 6–7 | Preistest: Montage-Pass vorbestellbar (oder echter Kauf, wenn Phase 0 fertig) | Inhaber | Vorbesteller je 300 Besucher |

## Phase 2 – Bezahlter Test Zimmerherd (Woche 8–9, max. 150 €)
- Nur wenn Phase 1 die Schwellen schafft (Tabelle unten).
- Aufbau: `marketing/Kampagnen.md`, 8 Bilder + 3 Videos, 15 €/Tag, 10 Tage, Meta Audience Network **aus**.
- Tracking nur mit Einwilligung (`app/public/js/einwilligung.js`, Vorlage).
- Auswertung an Tag 10 durch Claude, Entscheidung durch Inhaber.

## Phase 3 – Zweiflammer (Februar–April)
- Ab Anfang Februar: gleiche Schritte wie Phase 1 (Warteliste, Interviews in Camping-Foren nur mit Erlaubnis der Admins, Pinterest).
- März: bezahlter Test max. 150 € zur Vorbereitung der ersten Tour.
- Caravan Salon (Ende August) als Messe-Idee prüfen, nur wenn bis Mai ≥ 5 Vorbestellungen.

## Phase 4 – Kochsatz (frühestens Mai)
- Erst nach korrigierten Fleisch-/Fischpreisen (Protein pro Euro ist gesperrt).
- Kooperation mit kleinen Creatorn, Werbung gekennzeichnet, keine Leistungs- oder Körperversprechen.

## Laufend – Wochenschmaus und SEO
- Ratgeberseiten aus `marketing/SEO_Keywords_und_Seiten.md` Abschnitt 4–5, je Monat 2–4 Seiten (Claude schreibt, Inhaber prüft und stellt online).
- Search Console und Bing Webmaster Tools je Domain (Inhaber), monatlicher AI-Sichtbarkeitstest (Claude).

## Abbruch- und Weiter-Regeln (vorher festgelegt)
| Test | Weiter, wenn … | Abbruch, wenn … | Folge bei Abbruch |
|---|---|---|---|
| Reichweite 4 Wochen ohne Werbung | ≥ 150 Besucher und ≥ 30 bestätigte Einträge | darunter | Geschäftsmodell neu rechnen |
| Interviews je Nische | ≥ 50 % bestätigen ein Planungsproblem und ≥ 1/3 nennt spontan ≥ 15 € | darunter | Nische wird nur Filter in der App |
| Preistest je Nische | ≥ 5 zahlende Vorbesteller bei ≥ 300 Besuchern | darunter | kein Werbegeld für diese Nische |
| Bezahlter Test (150 €) | Kosten je bestätigtem Lead ≤ 3 € und Kaufquote je Linkklick ≥ 1 % | darüber/darunter | nur organisch und B2B |
| Kanal-Partner Montage | mindestens 1 von 2 antwortet | keiner | Montage-Kanäle neu planen |
| Camping | ≥ 5 Vorbestellungen bis Mai | weniger | Camping wird Filter |
| Kassenbon-Test | mittlere Abweichung ≤ ±15 %, kein Plan > ±25 % | darüber | keine Kosten-Werbung |
| Testkochen | ≤ 3 von 20 Rezepten brauchen wesentliche Änderungen | mehr | alle Rezepte vor Launch testkochen |
| 6 Monate am Markt | ≥ 15 zahlende Nutzer | weniger | umbauen oder beenden |

## KPIs (wöchentlich, Tabelle in `marketing/KPI.md` anlegen, sobald live)
Besucher je Landingpage · Tagesplan-Starts · bestätigte Wartelisten-Einträge · Kaufquote · Umsatz je Tarif · Kündigungen und Widerrufe · Kosten je Lead und je Kauf (nur bei Test) · Support-Anfragen.
Messung ohne Cookies: Server-Logs bzw. ein cookieloses Statistik-Tool (Inhaber wählt), Pixel nur mit Einwilligung.

## Querverkauf mit Honigmama und DURCHSCHICHT
- Hinweis auf Zimmerherd im DURCHSCHICHT-Newsletter (Schichtarbeit und Montage überschneiden sich) und umgekehrt, **nur an Abonnenten mit Double-Opt-in**, mit Abmeldelink.
- **Kein Preisvorteil** für E-Book-Käufer (Buchpreisbindung bei E-Books, CLAUDE.md). Erlaubt ist ein Gratis-Tagesplan, den ohnehin alle bekommen.
- Kein Bündel E-Book + Abo mit Rabatt.

## Wer macht was
| Aufgabe | Claude | Inhaber |
|---|---|---|
| Texte, Seiten, Anzeigenmotive, Auswertung | ✔ | prüft und gibt frei |
| Konten, Zahlungen, Domains, Verträge | – | ✔ |
| Veröffentlichen, Posten, Anzeigen starten, Mails senden | – | ✔ |
| Interviews führen | Leitfaden, Auswertung | ✔ |
| Testkochen, Kassenbon-Test | Vorlage, Auswertung | ✔ |
| Entscheidung weiter/stopp | Empfehlung mit Zahlen | ✔ |
