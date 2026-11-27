---
name: geschaeftsmodell-video
description: "Produziert ein Faceless-Kurzvideo im vom Inhaber freigegebenen Stil 'Geschäftsmodelle, auf die keiner kommt' (Referenz faceless-videos/ausgabe/005-umzug-v2.mp4): Recherche, Skript mit Umgangssprache + Kraftausdrücken, Rechnung zum Mitrechnen, absurder Plotwist, Stimme Orion, 3D-Szenen per Code, Untertitel. Verwenden bei: 'neues Video', 'mach ein Video über', 'Geschäftsmodell', 'Faceless', 'Short über', 'nächstes Thema', 'Video zu Umzug/Callcenter/Folierer/...', 'mach weitere Videos'."
---

# Geschäftsmodell-Video (freigegebener Stil)

1. **Zuerst lesen:** `faceless-videos/FORMAT.md` (Regeln, Muster-Skript, Ablauf) und `faceless-videos/CLAUDE.md` (Stand, Nicht-machen-Liste). Das Referenzvideo `faceless-videos/ausgabe/005-umzug-v2.mp4` und `skripte/005-umzug/video_v2.json` sind die Vorlage – Stil nicht eigenmächtig ändern.
2. **Thema** aus `faceless-videos/skripte/themen.md` (oder vom Inhaber). Status dort pflegen (☐ → ▶ → ✅).
3. **Recherche:** echte Zahlen mit Quelle (Preise, Löhne, Gebühren, Regeln, Zugangshürden). Mindestlohn aktuell prüfen. Rechnungen nachrechnen.
4. **Skript** exakt nach FORMAT.md Abschnitt 2 (13 Bausteine): Hook → Name + offene Schleife → „Pass auf, ganz easy“ → Preis → Rechnung Umsatz → Rechnung Kosten → was bleibt (ehrlich) → „Das Krasseste“ → Extras → fettester Trick → Pro-Tipp → Plotwist 1 → Plotwist 2 + trockene Pointe. Kraftausdrücke („verfickt“, „scheiß“, „geil“, „Digga“, „Bruder“, „safe“) in fast jeder Zeile, nie gegen echte Firmen/Personen/Gruppen.
5. **Dateien:** `faceless-videos/skripte/<nr>-<thema>/video.json` (Vorlage `009-golfball-taucher/video_v2.json`, kein `pitch`) + `skript.md` mit Quellen.
6. **Stimme:** Higgsfield `generate_audio` (EIN Auftrag für den ganzen Text), `text2speech_v2`, `variant: elevenlabs`, `voice_type: preset`, `voice_id: ed69c516-92d2-4b30-a967-617737a342e5` (Orion), Zahlen ausgeschrieben, wenig Kommas/Doppelpunkte. Nach `audio/full.mp3` laden; in video.json `audio_full` + `voice: {tempo: 1.12, tight: 0.25}`. Kein Ende-Teaser am Anfang, „Digga“ max. 1×.
7. **Szenen (FORMAT.md Abschnitt 3b beachten!):** pro Satz eine eigene, zum Gesagten passende Szene, keine Wiederholung, Hintergrund-Leben, Zahlen als 3D-Etiketten an Objekten. `faceless-videos/engine/scenes/<thema>.js`; vorhandene Bausteine aus `world.js` und `_common.js` nutzen. Vor dem Rendern Standbilder prüfen (`node engine/render3d.mjs plan.json st --stills …`), Kamera nie in Figuren/Wänden.
8. **Rendern:** (neue Sitzung vorher `bash faceless-videos/pipeline/setup.sh`) `python3 -I faceless-videos/pipeline/make_video.py faceless-videos/skripte/<nr>-<thema>/video.json`.
9. **Prüfen:** Standbilder (10 Zeitpunkte), eine Zeile per Whisper gegenlesen, Länge 60–85 s. Dann dem Inhaber schicken (SendUserFile), `CLAUDE.md` aktualisieren, committen, pushen.
