# Ferienvermietung Europa (Verwaltung nahe Ruhrgebiet)

## Ziel
Ferienwohnungen für Eigentümer verwalten (Provision), Start in Reichweite des Ruhrgebiets. Später eventuell Dubai (siehe `../dubai-verwaltung/`).

## Stand (25.11.2026)
- Marktdaten von 492 Orten (NRW, Rheinland-Pfalz, NL: Limburg, Zeeland, Nordholland; BE: Provinz Luxemburg, Westflandern) in `marktdaten/airroi_2026-11.csv`. Quelle: öffentliche Seiten von AirROI, 12 Monate bis Okt. 2026. Werte sind **Durchschnitte pro aktivem Inserat**. Darin sind auch Inserate enthalten, die nur gelegentlich vermietet werden, deshalb liegt der Wert eher zu niedrig für professionell geführte Wohnungen.
- Offen: Regeln pro Zielort prüfen (Gemeinde), Steuerberater (Tätigkeit in Belgien oder Niederlande aus Deutschland heraus), erste Eigentümer gewinnen.

## Erkenntnisse
- **Ruhrgebiet ist schwach:** im Schnitt 7.000 bis 10.600 € Umsatz pro Inserat und Jahr (Dortmund 10.641 €, Essen 10.375 €, Duisburg 9.832 €). Bei 20 % Provision nur ca. 2.000 € pro Wohnung. **Korrektur:** Die frühere Schätzung von ca. 25.000 € für Dortmund (AirDNA-Momentaufnahme) war zu hoch.
- **Stark und eher wenig reguliert:**
  - **Belgische Ardennen** (Provinz Luxemburg: Houffalize 37.840 €, Vielsalm 33.336 €, Bastogne, Durbuy 28.191 €, La Roche): 28.000 bis 38.000 €, ca. 2 bis 2,5 h vom Ruhrgebiet. Wallonien: Registrierung bei Tourisme Wallonie vor der ersten Vermietung, Brandschutzbescheinigung vom Bürgermeister (Ausnahme laut UVCW: Gebäude mit weniger als 10 Personen). Keine Begrenzung der Nächte gefunden. Kurtaxe je nach Gemeinde.
  - **Deutsche Eifel** (Monschau 26.044 €, Dahlem 21.230 €, Blankenheim 18.566 €): ca. 1,5 h entfernt, keine Wohnraum-ID-Pflicht bekannt (nicht auf der NRW-Liste).
- **Stark, aber reguliert:** Amsterdam und Umgebung, Brügge, Maastricht (29.432 €, +27 %) und die Küste der Niederlande (Gemeinden begrenzen Nächte bei Wohnungen). Pro Gemeinde prüfen.
- **Voll:** Winterberg (661 Inserate, 30,6 % Belegung).

## Fallstricke
- AirDNA blockiert Abfragen aus der Cloud (403), AirROI ist erreichbar. Skript zum Nachladen: Seiten `airroi.com/airbnb-data/<land>/<region>/<ort>` abrufen und die Zeilen "Avg. annual revenue", "Occupancy rate", "Avg. daily rate (ADR)" und "With N active listings" auslesen.
- Belgien und Niederlande: Umsatzsteuer und Gewerbeanmeldung im Ausland mit dem Steuerberater klären.
- Werbung nur legal (keine Cold Mails an Privatleute, siehe `../dubai-verwaltung/CLAUDE.md`).
