# Website-Agentur (Arbeitstitel) – Websites per Cold E-Mail an neue Firmen im Ausland

Stand: 26.11.2026 · Phase: Machbarkeitstest

## Idee
Neue Firmen ohne Website finden, eine personalisierte Demo-Seite bauen (Higgsfield `create_website`) und sie per Cold E-Mail (oder per Postkarte) anbieten. Festpreis plus optional eine Monatsgebühr für Hosting und Pflege.

## Entscheidungen
- **Zielmarkt 1: Großbritannien, nur Ltd/LLP** (PECR erlaubt B2B-Mails an Kapitalgesellschaften ohne Einwilligung; Einzelunternehmer und Partnerships nicht). **Zielmarkt 2: USA** (CAN-SPAM, Opt-out).
- **Nicht anschreiben:** DE, AT, CH, EU, Kanada, Australien (Einwilligung nötig).
- **Kein Google-Scraping** (verstößt gegen die Google-Nutzungsbedingungen). Quelle ist Companies House (offene Daten, Open Government Licence).
- **Die DSGVO gilt für uns**, weil wir aus Deutschland handeln: berechtigtes Interesse dokumentieren, Art.-14-Hinweis in der ersten Mail, Abmeldung und Sperrliste, Rohdaten nicht committen (`daten_roh/` steht in `.gitignore`), Nichtantworter nach 90 Tagen löschen.

## Testergebnis 1: neue UK-Firmen vom 16. bis 22.11.2026 (eine Woche)
Quelle: kostenlose CSV-Suche auf find-and-update.company-information.service.gov.uk (ohne API-Schlüssel, bis zu 5.000 Treffer pro Download).

| SIC | Branche | neu/Woche | passende Domain gefunden* |
|---|---|---|---|
| 56103 | Takeaways | 413 | – |
| 96020 | Friseur & Kosmetik | 250 | 28 % |
| 86900 | sonstige Gesundheit (Therapeuten usw.) | 249 | – |
| 96090 | sonstige persönliche Dienste | 229 | – |
| 56102 | Cafés/Restaurants ohne Alkohollizenz | 227 | 35 % |
| 43999 | sonstiges Bauhandwerk | 204 | – |
| 45200 | Kfz-Werkstätten | 191 | – |
| 56101 | Restaurants mit Lizenz | 168 | – |
| 43210 | Elektriker | 145 | 35 % |
| 43390 | sonstiger Ausbau | 134 | – |
| 81210 | Gebäudereinigung | 129 | 35 % |
| 43220 | Sanitär/Heizung/Klima | 128 | 36 % |
| 49320 | Taxi | 102 | – |
| 81300 | Garten- & Landschaftsbau | 72 | – |
| 93130 | Fitnessstudios | 66 | 45 % |
| 43341 | Maler | 48 | – |

*Stichprobe mit 60 Firmen je Branche: Ich habe geprüft, ob `firmenname.co.uk`, `.com` oder `.uk` existiert. Das ist eine **Obergrenze**, denn manche Treffer gehören fremden Firmen oder sind geparkt. **Grob 2 von 3 neuen Firmen haben also noch keine eigene Domain**, das sind mehrere Hundert potenzielle Kunden pro Woche allein in diesen Branchen.

## Fallstricke
- **Companies House liefert keine E-Mail-Adressen und keine Telefonnummern**, nur Name, Firmennummer, Branche und Sitz. Der Sitz ist oft die Adresse eines Steuerberaters oder einer Gründungsagentur. Die E-Mail-Suche ist der Engpass (Facebook, Instagram, Google-Unternehmensprofil, Branchenportale).
- Wer keine E-Mail-Adresse hat, kann **per Post** angeschrieben werden. Das ist in UK erlaubt, aber nicht an Steuerberater-Adressen.
- Die API (`api.company-information.service.gov.uk`) braucht einen kostenlosen Schlüssel. Für den Anfang reicht die CSV-Suche.

## Werkzeuge
- `tools/neue_firmen.sh VON BIS SIC...` lädt die CSVs nach `daten_roh/`.
- `tools/webcheck.py datei.csv N` prüft für die ersten N Firmen, ob eine passende Domain existiert.

## Nächste Schritte
1. Eine Nische wählen (Vorschlag: Elektriker + Sanitär, 270 pro Woche, hoher Auftragswert, Kunden suchen sie über Google).
2. Für 30 Firmen ohne Domain von Hand prüfen, ob eine E-Mail-Adresse oder eine Social-Media-Seite auffindbar ist (Trefferquote messen).
3. Eine Demo-Vorlage für die Nische bauen (Higgsfield), dazu Preisangebot und Mailtext (Skill cold-email/copywriting).
4. Versanddomain, SPF/DKIM/DMARC, Aufwärmen. Gewerbe anmelden, Impressum, Datenschutzerklärung, Steuerberater (Leistungsort § 3a Abs. 2 UStG).
