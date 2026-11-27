---
name: geschaeftsmodell-video
description: "Produziert ein Faceless-Kurzvideo im vom Inhaber freigegebenen Stil 'Geschäftsmodelle, auf die keiner kommt' (Referenz faceless-videos/ausgabe/005-umzug-v2.mp4): Recherche, Skript mit Umgangssprache + Kraftausdrücken, Rechnung zum Mitrechnen, absurder Plotwist, Stimme Orion, 3D-Szenen per Code, Untertitel. Verwenden bei: 'neues Video', 'mach ein Video über', 'Geschäftsmodell', 'Faceless', 'Short über', 'nächstes Thema', 'Video zu Umzug/Callcenter/Folierer/...', 'mach weitere Videos'."
---

# Geschäftsmodell-Video (freigegebener Stil)

1. **Zuerst lesen:** `faceless-videos/FORMAT.md` (Regeln, Muster-Skript, Ablauf) und `faceless-videos/CLAUDE.md` (Stand, Nicht-machen-Liste). Das Referenzvideo `faceless-videos/ausgabe/005-umzug-v2.mp4` und `skripte/005-umzug/video_v2.json` sind die Vorlage – Stil nicht eigenmächtig ändern.
2. **Thema** aus `faceless-videos/skripte/themen.md` (oder vom Inhaber). Status dort pflegen (☐ → ▶ → ✅).
3. **Recherche:** echte Zahlen mit Quelle (Preise, Löhne, Gebühren, Regeln, Zugangshürden). Mindestlohn aktuell prüfen. Rechnungen nachrechnen.
4. **Skript: 60–70 s, ~200 Wörter, 10 Beats, starker Hook (Zahl + Neugier-Lücke), kein Gelaber** (FORMAT.md Kasten oben). Bausteine aus Abschnitt 2 verdichtet: Hook → Name + offene Schleife → „Pass auf, ganz easy“ → Preis → Rechnung Umsatz → Rechnung Kosten → was bleibt (ehrlich) → „Das Krasseste“ → Extras → fettester Trick → Pro-Tipp → Plotwist 1 → Plotwist 2 + trockene Pointe. Kraftausdrücke („verfickt“, „scheiß“, „geil“, „Digga“, „Bruder“, „safe“) in fast jeder Zeile, nie gegen echte Firmen/Personen/Gruppen.
5. **Dateien:** `faceless-videos/skripte/<nr>-<thema>/video.json` (Stimm-Vorlage `005-umzug/video_v2.json`, Szenen-Vorlage `011-mietweihnachtsmann`) + `skript.md` mit Quellen. **Kein `series`, kein `source` in video.json** (Inhaber will keinen Text oben/unten).
6. **Stimme (🔒 eingefroren, nur mit OK des Inhabers ändern):** Orion `ed69c516-92d2-4b30-a967-617737a342e5`, **jeder Beat einzeln** per `generate_audio_batch` (max. 6 gleichzeitig, Zahlen ausgeschrieben) → `audio/01.mp3 …`, in video.json pro Beat `audio` + `"voice": {"tempo": 1.15, "tight": true}`. KEIN `audio_full`, kein `pitch`. Kein Ende-Teaser am Anfang, „Digga“ max. 1×.
6b. **Akzent-Check (Pflicht):** `python3 -I faceless-videos/pipeline/check_voice.py faceless-videos/skripte/<nr>-<thema>/video.json`. Markierte Zeilen (⚠) mit gleicher Stimme/Einstellung neu sprechen, 2–3 Takes vergleichen, besten nehmen.
7. **Szenen (FORMAT.md Abschnitt 3b beachten!):** pro Satz eine eigene, zum Gesagten passende Szene, keine Wiederholung, Hintergrund-Leben, Zahlen als 3D-Etiketten an Objekten. `faceless-videos/engine/scenes/<thema>.js`; vorhandene Bausteine aus `world.js` und `_common.js` nutzen. Vor dem Rendern Standbilder prüfen (`node engine/render3d.mjs plan.json st --stills …`), Kamera nie in Figuren/Wänden.
8. **Rendern:** (neue Sitzung vorher `bash faceless-videos/pipeline/setup.sh`) `python3 -I faceless-videos/pipeline/make_video.py faceless-videos/skripte/<nr>-<thema>/video.json`.
9. **Prüfen:** Standbilder (10 Zeitpunkte), eine Zeile per Whisper gegenlesen, Länge 60–85 s. Dann dem Inhaber schicken (SendUserFile), `CLAUDE.md` aktualisieren, committen, pushen.
