# Mein Business – Übersicht aller Projekte

Wird beim Start jeder Sitzung gelesen. Ein Repository, ein Ordner pro Projekt. Projektübergreifendes Wissen gehört hierher, Details in die `CLAUDE.md` im Projektordner. **Vor der Arbeit an einem Projekt dessen `CLAUDE.md` lesen.**

## Projekte
| Projekt | Ordner | Shopify-Store | Stand |
|---|---|---|---|
| Honigmama / BeeQueen (Koch-E-Books Schwangerschaft & erstes Jahr) | `honigmama/` | jctx4r-bu.myshopify.com | live; Entwurf mit Verbesserungen wartet aufs Veröffentlichen |
| DURCHSCHICHT (E-Book für Schichtarbeit) | `durchschicht/` | mystore | Buch + Theme fertig, Upload in den Store offen |
| Essensplaner | `essensplaner/` | – | Auftrag steht in `essensplaner/AUFTRAG.md`, Recherche noch nicht begonnen |

## Arbeitsweise
- **Eine Sitzung pro Projekt** (der Kontext bleibt sauber). Andere Projektordner nur lesen, wenn sie relevant sind.
- Am Ende jeder Arbeitsrunde: `CLAUDE.md` des Projekts aktualisieren (Stand, Entscheidungen, Fallstricke), dann committen und pushen. Sitzungs-Container sind flüchtig, und nur was gepusht ist, bleibt erhalten. Große Rohdateien (über 50 MB) nicht committen.
- Antworten an den Inhaber auf Deutsch, Schritt für Schritt, ohne Kleinigkeiten zu vergessen.

## Regeln für alle Projekte
- Content (Bilder, Anzeigen, Mockups) **mit Higgsfield** erstellen und verschiedene Stile ausprobieren.
- Shopify: **Live-Theme nie direkt ändern.** Immer duplizieren und im Entwurf arbeiten, der Inhaber veröffentlicht selbst.
- E-Books in DE: **Buchpreisbindung**, also Festpreise und keine Rabattcodes. Pakete als eigene Festpreis-Produkte.
- Werbung: keine unbelegten Aussagen (UWG), keine Heil- oder Abnehmversprechen (HWG, Health-Claims-VO), keine erfundenen Kundenstimmen.
- Mails nur mit Double-Opt-in. Meta: Audience Network aus.
- Digitale Inhalte: Widerruf nach § 356 Abs. 5 BGB mit Zustimmungs-Checkbox.

## Werkzeuge & Fallstricke
- **Shopify-Connector:** immer nur ein Store gleichzeitig, Wechsel über `switch-shop`. Nach einem Wechsel kann eine neue Anmeldung nötig sein (claude.ai/customize/connectors, danach eine neue Sitzung).
- `themeFilesUpsert`: TEXT-Typ nutzen (der URL-Typ scheitert still), Schema-Namen höchstens 25 Zeichen.
- **Digital Downloads App:** keine API, 1 Datei pro Variante. Dateien lädt der Inhaber selbst hoch.
- **Higgsfield:** `gpt_image_2_5` als Standard, ungefähr 8 Jobs pro Batch (sonst Fehler 429), `jobs_wait` nimmt höchstens 12 Jobs. Referenzbilder mit Rolle `image_references`.
- **Meta-Anzeigen** laufen über den Windsor.ai-Connector.
- Domains prüfen per RDAP: `rdap.denic.de/domain/<name>.de`; 404 bedeutet frei.

## Recherche
- `recherche/Schichtkochbuch Markt und Vermarktung.md` – großer Marktbericht zu Schichtarbeit und Ernährung.
- `recherche/Schichtkueche_Konzept.md`, `Schichtkueche_Markenkonzept.pdf`, `Honigmama_Reihe_Investoren.pdf`.
