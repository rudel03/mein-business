# Produktkontext: Wochenbon

Wird von den Marketing-Skills (ads, ad-creative, copywriting, cro, meta-ads-de …) gelesen. Stand 04.11.2026. Quellen: `recherche/14`, `recherche/08` §9, `marke/Claim_Freigabe.md`, `ENTSCHEIDUNGEN.md` C17.

## Produkt
Web-App (PWA): Wochenplan, Einkaufszettel nach Abteilungen und geschätzter Preis für Aldi, Lidl, Netto, Penny, Kaufland, Rewe, Edeka. Passt sich Küche, Personen, Ernährung, Allergien an. 195 Rezepte, Nährwerte BLS 4.0. Ohne Konto, Daten bleiben im Browser.

## Angebot
Gratis: 1 Tag voll, Woche als Vorschau. Plus: 6,99 €/Monat oder 44,99 €/Jahr (12 Monate, danach monatlich kündbar), 7 Tage 0 €. Kein Rabatt, keine Pässe.

## Zielgruppe
Preisbewusste Haushalte mit 1–4 Personen, 22–45 Jahre, kaufen meist beim Discounter, planen am Wochenende. Erweiterungen über Werbemittel: Singles/Studierende, Paare, junge Familien, mehr Eiweiß, kleine Küche.

## Positionierung und Angles
Kernsatz: „Du weißt, was deine Woche ungefähr kostet, bevor du an der Kasse stehst.“ Angles: Vorher wissen, Sonntagsfrage, ganze Packungen, Eiweiß aus dem normalen Regal, nach deinen Regeln (Küche, Allergien). Lücke: Genauigkeit (Wettbewerber mise mit falschen Preisen/Sortiment in Rezensionen).

## Belege
- mise (gleiches Versprechen) Platz 2 Umsatz „Essen & Trinken“ DE am 04.11.2026 (recherche/14).
- 59 % achten beim Einkauf auf den Preis (Ernährungsreport 2025); Discounter 38 % Marktanteil.
- Protein-Produkte ca. 40 % teurer (NielsenIQ, 07/2026).

## Gesperrt
Euro-Beträge bis zum Kassenbon-Test (`preiseInWerbung` in config.js), Sparversprechen, Vergleiche mit Kochboxen/Lieferdiensten, Zeitangaben ohne Messung („in 2 Minuten“), „gesund“, „sättigend“, Händler-Logos, persönliche Eigenschaften unterstellen.

## Paid Ads
- **Ziel-CAC:** 11 € (LTV realistisch 33 € ÷ 3). **Obergrenze:** 33 €.
- **Conversions:** `PlanerStart` (Klick „Woche planen“ auf der Startseite, Optimierungsziel Test 1), `Lead` (nach Double-Opt-in), `InitiateCheckout`, `StartTrial`, `Purchase` (Paddle → Conversions API).
- **Annahme:** 4 % der Planer-Starts werden zahlend [S] → Zielkosten je Planer-Start 0,45 €.
- **Budget Test 1:** höchstens 300 € (20 €/Tag, 14 Tage), Start Januar 2027.
- **Claude darf:** Daten lesen, auswerten, Anzeigen und Texte entwerfen, Änderungen vorschlagen. **Nicht:** Geld ausgeben, starten, Budgets ändern ohne Freigabe.
- Strategie: `marketing/Meta_Strategie.md`.

## Learnings
(noch keine Tests gelaufen)
