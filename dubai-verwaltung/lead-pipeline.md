# Lead-Pipeline: Eigentümer finden, die selbst einen Verwalter suchen

## Problem
Reddit, Upwork und Facebook blockieren Abfragen aus der Claude-Cloud (getestet am 25.11.2026: Reddit 403, Upwork 403). Die normale Websuche findet keine einzelnen, aktuellen Beiträge. Deshalb übernehmen kostenlose Benachrichtigungsdienste das Suchen und schicken Treffer an Gmail. Claude liest dort mit.

## Aufbau
```
Benachrichtigungsdienste ──► Gmail (Label "Dubai-Leads") ──► Claude (täglich)
                                                                ├─ bewertet jeden Treffer (heiß / warm / unbrauchbar)
                                                                ├─ trägt ihn in leads/lead-liste.md ein
                                                                └─ schreibt einen Antwortvorschlag
Inhaber prüft ──► postet oder schickt die Antwort selbst
```

## Einrichtung durch den Inhaber (einmalig, ca. 20 Minuten)
1. **F5Bot** (https://f5bot.com, kostenlos): schickt eine Mail, sobald ein Suchbegriff auf Reddit oder Hacker News auftaucht. Konto anlegen und diese Begriffe eintragen:
   - `holiday home management dubai`
   - `holiday home company dubai`
   - `airbnb management dubai`
   - `co-host dubai`
   - `dubai property manager`
   - `Verwalter Dubai`
2. **Google Alerts** (https://www.google.com/alerts): dieselben Begriffe, "So oft wie möglich", "Alle Ergebnisse".
3. **Upwork**: kostenloses Freelancer-Profil, Jobsuche speichern ("Airbnb Dubai", "co-host Dubai", "holiday home Dubai") und E-Mail-Benachrichtigung einschalten.
4. **Facebook-Gruppen** beitreten (Stichworte: "Dubai holiday home owners", "Airbnb hosts Dubai", "Dubai property investors", "Immobilien Dubai", "Auswandern Dubai"). Benachrichtigungen einschalten. Regeln lesen: Angebote oft nur in Antworten erlaubt.
5. **Gmail-Filter**: Mails von f5bot.com, googlealerts-noreply@google.com und Upwork-Jobmails automatisch mit dem Label `Dubai-Leads` versehen.

## Was Claude dann täglich macht
- Gmail-Label `Dubai-Leads` auslesen (Gmail-Connector, nur lesen und Entwürfe anlegen).
- Jeden Treffer bewerten:
  - **heiß** = sucht aktiv einen Verwalter oder ist unzufrieden mit dem aktuellen
  - **warm** = überlegt, ob sich Ferienvermietung lohnt
  - **unbrauchbar** = Werbung, Gäste, Jobsuchende
- Heiße und warme Treffer in `leads/lead-liste.md` eintragen: Link, Datum, worum es geht, Antwortvorschlag.
- Nichts automatisch posten oder verschicken.

## Regeln
- Nur auf Beiträge antworten, in denen jemand **selbst fragt**. Keine Direktnachrichten an Leute, die nicht gefragt haben.
- Regeln der Plattform beachten (Upwork: Abwicklung anfangs über die Plattform).
- Nur Link und Inhalt des Beitrags speichern, keine weiteren Daten zur Person.
- Keine Renditeversprechen, keine unbelegten Aussagen.
