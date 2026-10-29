# Essensplaner – Projektgedächtnis

Wird beim Start jeder Sitzung gelesen. Auftrag: `AUFTRAG.md`. Entscheidungen: `ENTSCHEIDUNGEN.md`. Risiken: `RISIKEN.md`. Aufgaben für den Inhaber: `FUER_DICH.md`. Übergreifende Regeln: `../CLAUDE.md`.

## Stand (29.10.2026, nach der ersten Nachtschicht)
- **Phase A Recherche:** fertig, „bestanden mit Auflagen“ (`recherche/00_Gesamtbericht_Phase_A.md` + PDF, Faktencheck 27 %, Advocatus Diaboli 11). Offen: Interviews, Zahlungsbereitschaft (Inhaber).
- **Phase B Marke:** fertig. Dachmarke **Tellerkontor**, Marken **Zimmerherd** (Montage), **Kochsatz** (Fitness), **Zweiflammer** (Camping, gewählte Nische), **Wochenschmaus** (Alltag). Markenbücher, Logos, Beispielbilder, Claim-Freigabe (241 Aussagen, 13 gesperrt). Offen: DPMA/EUIPO (Inhaber).
- **Phase C Produkt:** PWA fertig, 29 Unit-Tests + 27 E2E grün (Frische über die Tage mit Einkaufstagen seit Gegenprüfung 13), Server-Vorlage `server/` mit 13 Tests, Lighthouse Landingpages 97–100 in allen Kategorien (Planer SEO 66, weil absichtlich noindex). Offen: Paddle, Schlüsselpaar, Worker-Deployment, Impressum-Daten, Anwaltsprüfung, Testkochen, Kassenbon-Test (alles Inhaber).
- **Phase D Launch:** 4 Landingpages mit Wartelisten-Formular (inaktiv bis Mail-Dienst), 6 Lead-Magnet-PDFs, 32 Bild-Anzeigen, 12 Videos, 57 Mails, Kampagnen, Launchplan, SEO (robots, sitemap, llms.txt). Nichts gestartet. Testkauf blockiert bis Paddle-Konto.

## Ordner
| Ordner | Inhalt |
|---|---|
| `recherche/` | 00 Gesamtbericht (MD + PDF), 01–12 Teilberichte (nach Faktencheck korrigiert, 08 §9 mit Paddle-Rechnung), 10 Faktencheck, 11/13 Advocatus Diaboli, Entscheidungsvorlage |
| `marke/` | `Namen_und_Pruefung.md`, `Claim_Freigabe.md`, je Marke `Markenbuch_*.md` + `bilder/` |
| `app/` | PWA: `public/` (wird hochgeladen), `data/` (Zutaten, Rezepte, Build), `tests/`, `tools/` |
| `server/` | Cloudflare-Worker-Vorlage (Paddle-Webhook, Lizenz, Kündigen/Widerrufen), nicht deployt |
| `marketing/` | Kampagnen, Launchplan, SEO, Mails, `creatives/<marke>/` (8 Bilder + 3 Videos je Marke) |

## Befehle (aus `app/`)
- Rezeptdaten bauen und prüfen: `python3 data/build.py` (einzeln: `--check data/rezepte/U.json`) → `public/data/daten.json`
- Nach Änderung an `public/js/config.js`: `python3 tools/seiten.py && python3 tools/landing.py` (baut stil.css, Rechtsseiten, Preiskarten, Planer-HTML, Landingpages, robots/sitemap/llms)
- Tests: `npm test` · E2E: `node tools/server.mjs 8765 &` dann `node tools/ablauf-test.mjs`
- Screenshots + Scroll-Prüfung: `node tools/shot.mjs <seite.html> <name>` → `shots/`
- Lighthouse: `CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome npx lighthouse <url> --chrome-flags="--headless --no-sandbox"`
- Anzeigen: `node tools/creative.mjs` (aus `marketing/creatives/creatives.json`), Videos: `node tools/video.mjs` (aus `videos.json`, braucht `clipN.mp4` je Marke; Rohclips danach löschen)
- Lizenz: `node tools/lizenz.mjs neu` / `signieren`
- Lead-Magnet-PDFs (Zimmer-Check, Protein-Liste, Bordküchen-Check, Wochenpläne 1/2/3 Personen): `node tools/leadmagnete.mjs [montage|fitness|camping|alltag]` → `public/pdf/`. Prüft Überlauf je Seite und < 2 MB; Zahlen wie `landing.py`. Ohne Euro-Beträge bis Kassenbon-Test.

## Fallstricke
- Rezeptzahlen in Texten **immer aus `landing.py` (zaehle)** nehmen: sie berücksichtigen die Lagerregel (ohne Gefrierfach keine TK-Zutaten). Handzählungen lagen falsch.
- Claim-Freigabe beachten: keine Euro-/Spar-Aussagen in Werbung bis Kassenbon-Test, „jederzeit kündbar“ nicht beim Jahresabo, „ohne Login“ nicht als Vorteil, keine „BfR“-Zuschreibung für FSA/USDA-Regeln, keine Zeitangaben ohne Messung, kein „sättigend“, „nach Abteilungen sortiert“ statt „Reihenfolge deines Ladens“.
- `creative.mjs` rendert alle Bilder neu (Bytes ändern sich): unveränderte per `git checkout` zurücksetzen.
- Higgsfield: Video `seedance_2_0_mini` 720p 5 s ≈ 5 Credits, `start_image` = Job-ID eines Bildes; Batches nacheinander, sonst 429.
- `[hidden]` braucht `display:none!important` (sonst überschreibt `display:grid`).
- Kontrast je Theme prüfen (Lighthouse), Akzentfarben wurden mehrfach abgedunkelt.
- Planer und Kündigen/Widerrufen sind absichtlich `noindex`.
- `basisUrl` in `config.js` ist ein Platzhalter (`https://tellerkontor.de/`), bis der Inhaber die Domains entschieden hat.
- Frische: Jede neue Zutat braucht korrektes `lager` (k/r/t) und `abt` – daraus folgt `haltbarTage`. Neue Lagerlogik immer mit dem Zufallstest prüfen (Invariante in `tests/planer.test.mjs`).
- Anleitung zum lokalen Testen für den Inhaber: `TESTEN.md`.
