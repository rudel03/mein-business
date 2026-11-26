# Faceless-Videos – Projektgedächtnis

Wird beim Start jeder Sitzung zu diesem Projekt gelesen. Übergreifende Regeln: `../CLAUDE.md`. Gesamtplan: `PLAN.md`.

## Ziel
**Neues Format (26.11.2026): „Geschäftsmodelle, auf die keiner kommt“ → Regeln in `FORMAT.md` (Pflichtlektüre vor jedem Video).**
Ein **neuer, eigenständiger Faceless-Kanal** (kein Gesicht, keine Persona). Claude produziert automatisch Kurzvideos (9:16, 20–45 s) aus **KI-Bildern + KI-Sprecherstimme + eingebrannten Untertiteln** und veröffentlicht sie **voll automatisch** auf YouTube Shorts, Instagram Reels und TikTok.

## Stand (26.11.2026)
- Projekt angelegt, Plan in `PLAN.md`.
- Entscheidungen des Inhabers: eigener Kanal (nicht Produktwerbung) · Stil „KI-Bilder + Sprecher“ · **voll automatisch** posten · noch **keine Konten** (kein Postiz, keine Kanäle).
- **Offen (in dieser Reihenfolge):**
  1. ~~Nische wählen~~ → **Entschieden 26.11.2026: „Business-Modelle leicht erklärt“** (wie verdienen Firmen ihr Geld, warum ist X so billig, Tricks hinter bekannten Geschäftsideen). Themenvorrat: `skripte/themen.md`.
  2. Kanalname wählen, Verfügbarkeit auf allen 3 Plattformen prüfen.
  3. Konten anlegen: E-Mail, YouTube-Kanal, Instagram (Creator) + TikTok → Postiz-Konto → alle 3 in Postiz verbinden → Postiz-API-Key hinterlegen.
  4. Pipeline bauen und 5 Testvideos produzieren (Higgsfield-Kosten pro Video messen).
  5. Erste 2 Wochen: 1 Video/Tag, dann geplante Aufgabe für Vollautomatik einrichten.
- ❌ Testvideo 001 (Standbilder + Zoom, seed_audio-Stimme) vom Inhaber **abgelehnt**: „Sprecher hat Akzent, sieht kacke aus“. `pipeline/render.py` nur noch als Billig-Variante.
- **Neuer Stil = Referenz des Inhabers** (TikTok @ai_cliipz-artig, Thema dort Nachbarrecht): animierte **Low-Poly-3D-Spielegrafik**, echte Bewegung, ~2-s-Schnitte, **Ein-Wort-Untertitel** (weiß, schwarzer Rand, Schlüsselwörter gelb), **Etiketten/Pills** („5 cm“, „max. 30 m²“), rote Kreise/Icons, **frecher Ton mit Sprüchen** an den Zuschauer. Wir machen es ähnlich, aber nicht 1:1: eigene Hauptfigur (gelber Hoodie, schwarze Cap rückwärts), Abendsonne statt Mittag.
- ❌ Testvideo 002 (Higgsfield-Clips + ElevenLabs „Bram“, 46 Credits) vom Inhaber abgelehnt: Sprecher „schlimm, zu langsam“, Sprüche unlustig. Inhaber will **ohne Higgsfield, per Code** (wie andere Creator).
- ✅ **005-umzug-v2** (26.11.2026 spät): nach Feedback „mehr Umgangssprache, öfter verfickt/scheiß, für Dumme erklären (warum macht das nicht jeder), Stimme kacke + gedoppelt“. Neue Stimme **Orion** (tief, gemessen mit librosa pyin: 103 Hz; Dylan 172 Hz), `tight`-Pausen + Tempo 1,15, kein Pitch-Filter. Rechnung zum Mitrechnen, Klasse-B-Detail. 77 s. Stimmproben tiefer Stimmen: `ausgabe/stimmproben-tief.mp3` (1 Brooks, 2 Marcus, 3 Knox, 4 Orion, 5 Harrison, 6 Callum). **006–008 noch im alten Stil** → nach Stimm-Freigabe neu sprechen + Skripte frecher/einfacher umschreiben.
- (überholt) **Videos 005–008** (26.11.2026, nach Feedback „Stimme tiefer, weniger Umgangssprache, Plotwist richtig absurd“): 005 Umzug (Haus fliegt mit dir zum Mond), 006 Callcenter (ruft sich selbst an, Callcenter des Jahres), 007 Folierer (foliert den Mond in Chrom, Rechnung an NASA), 008 Schlüsseldienst (300 Türen → Australien). Stimme Dylan, `voice.tempo` 1.2 + `voice.pitch` −2 Halbtöne (rubberband, Formanten erhalten). 44 Zeilen ≈ 20 Credits. Configs generiert mit `skripte/_mk_configs.py` aus `skripte/_neu_005_008.json`. Warten auf Feedback.
- ✅ **Testvideo 004 Entrümpelung** (26.11.2026): neues Format (Hook → Details mit Zahlen → Pro-Tipp → Plotwist „kaufst deine eigene Couch zurück“), Stimme ElevenLabs **Dylan** über Higgsfield (≈ 6 Credits), Video per Code. `ausgabe/004-entruempelung-test.mp4`. Wartet auf Feedback.
- ❌ Testvideo 003: Piper-Stimme „grauenhaft, alt und gelangweilt“; Slang klang wie „30-Jähriger, der auf jung macht“. Piper nur noch Notlösung.
- (alt) Testvideo 003 komplett per Code (26.11.2026): `ausgabe/003-costco-code-test.mp4`, 30 s, **0 Credits, ~4 min Rechenzeit**. Wartet auf Feedback. Stimmproben `ausgabe/stimmproben-piper.mp3` (Reihenfolge: 1 Thorsten high, 2 Thorsten amüsiert, 3 Thorsten wütend, 4 Thorsten überrascht, 5 Karlsson, 6 Pavoque).
- (alt) Testvideo 002 Costco im Game-Stil (26.11.2026): `ausgabe/002-costco-gamestyle-test.mp4`, 41,7 s. Skript/Belege/Config in `skripte/002-costco-gamestyle/`. **≈ 46 Credits**. Wartet auf Feedback des Inhabers. Stimmproben (5 ElevenLabs-Stimmen) in `ausgabe/stimmproben.mp3`, Reihenfolge Cillian, Marcus, Brooks, Bram, Max (Pieps davor, Ton steigt).
- ✅ Pipeline `pipeline/render_blocks.py`: 10-s-Clips + 1 Sprecherzeile je Clip → Ein-Wort-Untertitel per faster-whisper (Modell small) an Skripttext ausgerichtet, Pills per Wort ausgelöst, Quellenzeile, −14 LUFS. Ist eine Zeile länger als der Clip, wird der Clip verlangsamt (max. 20 %), nie die Stimme.
- Werkzeuge im Container geprüft: ffmpeg 6.1, ffprobe, Node 22, jq vorhanden. Postiz-CLI noch nicht installiert (`npm i -g postiz`).

## Entscheidungen
- **26.11.2026: Produktion OHNE Higgsfield** (ausdrücklicher Wunsch des Inhabers, Ausnahme von der Repo-Regel). Ablauf: `pipeline/make_video.py video.json` → Piper-Stimme je Zeile → `engine/render3d.mjs` nimmt Three.js-Szenen im Headless-Chromium auf (SwiftShader, 1080×1920, 30 fps, ~0,3 s/Bild) → Ein-Wort-Untertitel per faster-whisper → ffmpeg. Neue Sitzung: zuerst `bash pipeline/setup.sh`.
- 3D-Baukasten `engine/world.js` (Figuren mit Posen walk/armsUp/handsOnHead/stop/holdUp/push/shrug/jawDrop, Auto, Lagerhalle, Drehkreuz mit Ampel, Einkaufswagen, Münze/Münzturm, Karte, Chipstüte, Angelhaken, Regale, Kasse, Tresor). Pro Video eine Szenendatei `engine/scenes/<name>.js` mit `shots` {setup, update(t,d,cam,ctx)}. Look: Abendhimmel lila→orange, Lambert-Flat-Shading, Held = gelber Hoodie + schwarze Cap.
- **Stimme ab 26.11. spät: ElevenLabs „Orion“** `ed69c516-92d2-4b30-a967-617737a342e5`, `voice: {tempo: 1.15, tight: true}`. `pitch` (rubberband) NICHT nutzen → klingt gedoppelt.
- (alt) **Stimme: ElevenLabs „Dylan“** über Higgsfield `text2speech_v2`/`elevenlabs` (`b847bc29-f184-583a-8ad9-d1f1e16d1a60`), Tempo ×1,25 per atempo in `make_video.py` (`voice.tempo`, Beat-Feld `audio`). Getestet: Cody (Fehler), Kevin/Benji (hängen in Warteschlange), minimax-Varianten. Piper (`de_DE-thorsten-high`) klingt alt → nur Notlösung. edge-tts geht im Container nicht (WebSocket über Proxy blockiert). Beste Qualität wäre ElevenLabs-API direkt mit deutscher Stimme (kostenpflichtig) oder Stimmklon.
- Engine-Struktur: gemeinsame Kulissen/Einstellungen in `engine/scenes/_common.js` (street, floorRoom, towersShot, tipShot, flyBills). Neue Requisiten 26.11.: truck, tower, noParkingSign, storageUnit, moon, desk, headset, officeBuilding, clock, foilRoll, heatGun, door (echter Rahmen, `backing`), palm, trophy, contractStack, `chromeify` (Chrom-Plotwist). Himmel `night`.
- 4 Renderings parallel auf 4 Kernen gehen, dauern dann zusammen ~35 min.
- **Thema: unterschätzte Geschäftsmodelle** (Entrümpelung, Umzug, Callcenter, Folierer …), jedes Detail + Mehrwert, Plotwist am Ende. Themenliste `skripte/themen.md`.
- **Ton: Kraftausdrücke als Füllwörter** („verfickte“, „scheiß“, „Bruder“) – Wunsch des Inhabers. Nie gegen echte Firmen/Personen/Gruppen richten (z. B. nicht „Scheißladen Costco“). Hinweis: starke Flüche → YouTube schränkt Werbung ein; TikTok/IG ok.
- ~~Stil 001: Standbilder + seed_audio „Julian“~~ → abgelehnt (Akzent).
- Untertitel: Schrift Inter Display Black (im Container vorhanden). Zahlen im Sprechertext als Ziffern in `phrases` schreiben, damit sie gelb werden.
- Fertige Videos nicht ins Repo (nur dieser eine Test); sie liegen in Postiz.
- Generierung nur mit Higgsfield (Repo-Regel). **Clips: `seedance_2_0_mini`, 10 s, 9:16, 720p, `generate_audio:false`, 10 Credits/Clip** (günstigstes brauchbares Modell; minimax_h3 2K = 20, seedance_2_5_flash = 50). Prompt: „Simple low-poly 3D mobile video game graphics …“, 5 Shots à 2 s ausgeschrieben, „Characters only gesture, they do not talk. No text, no letters, no logos“, Referenzbilder (Figur + Ort) als `image_references`.
- **Stimme: `text2speech_v2`, `variant:"elevenlabs"`** (deutsch ohne Akzent). Test mit „Bram“ (`549ff70a-3ee7-4f04-a4d9-89a24fab7709`). Pro Clip eine Zeile, Ziel 8–9,5 s (≈ 22 Wörter). Jahreszahlen nicht ausschreiben lassen (werden langsam gesprochen).
- Figur-Referenz: Higgsfield-Job `d646161e-73be-4e02-9134-c0f48cf4bfb4` (gelber Hoodie). Weitere Orte: Lager innen `3818a27b-…`, Eingang/Wachmann `730e6673-…`, Parkplatz `bbf1e187-…` (zu realistisch).
- Humor: freche Sprüche an den Zuschauer („du Lauch“, „Bruder“, „du Hirsch“) ja; **keine Beleidigungen echter Personen/Gruppen, keine Schimpfwörter unter der Gürtellinie** (Strafrecht § 185 StGB, Plattformregeln; starke Flüche kosten auf YouTube Werbeeinnahmen).
- Schnitt/Untertitel/Ken-Burns-Zoom mit ffmpeg im Container (kostet keine Credits).
- Posten über Postiz (eine Schnittstelle für alle 3 Plattformen). TikTok immer `DIRECT_POST`.
- KI-Label auf allen Plattformen setzen (Plattformregeln + Art. 50 KI-VO).

## Fallstricke
- `render.py`: Bilder nicht auf 2× hochskalieren (zoompan wird >10 min langsam); 1,25× reicht.
- faster-whisper: `av.open(... metadata_errors)`-Fehler → Audio per ffmpeg als numpy-Array übergeben (so in render_blocks.py).
- Stimmen vergleichen: `librosa.pyin` (pip install librosa) für Tonhöhe; eigene Autokorrelation war unzuverlässig.
- Higgsfield: max. 6 gleichzeitige Jobs (sonst `submission_failed`). Hängende `queued`-Jobs blockieren Plätze.
- Regionale Gebühren immer an der Quelle prüfen (lrasha.de = LK Schwäbisch Hall, nicht Hohenlohe!). PDF lesen: `pdftotext -layout`.
- Costco-Zahlen: aktuell **Geschäftsjahr 2026** (nicht 2025). Immer das neueste Geschäftsjahr prüfen.
- `phrases` an den Satzpausen trennen (jeder Satz und „Der Trick:“ einzeln). Passt die Zahl der Sprechpausen nicht, verteilt das Skript proportional (ungenauer).
- **Marken & Logos:** Firmennamen dürfen sachlich genannt werden, aber **keine Logos, Markenprodukte oder Maskottchen in KI-Bildern** nachbauen (Markenrecht) und nie den Eindruck einer Kooperation erwecken. Bilder zeigen generische Szenen (Lager, Kasse, Fabrik).
- **Keine Anlageberatung:** keine Aktien-/Kaufempfehlungen, keine Renditeversprechen, keine „so wirst du reich“-Aussagen. Erklären, nicht empfehlen.
- **Zahlen nur aus Primärquellen** (Geschäftsbericht, offizielle Pressemitteilung, seriöse Presse) mit Jahr; im Video „laut Geschäftsbericht 2025“. Quelle in jedem Skript.
- **YouTube „inauthentic content“** (seit 15.07.2025): massenhaft gleichförmige Videos werden nicht monetarisiert. Jedes Video braucht eigenes Skript, echten Inhalt, Abwechslung in Bildern/Aufbau.
- Higgsfield-Credits teilt sich das Projekt mit `ai-influencerin/`. **Stand 26.11.2026 abends: 297,55 Credits.** Game-Stil kostet **≈ 42–45 Credits pro 40-s-Video** → 1 Video/Tag ≈ 1.300 Credits/Monat. Mit Plus nicht machbar → **erledigt durch Code-Produktion (0 Credits)**.
- Geplante Aufgaben starten frische Sitzungen: Higgsfield-Connector muss der Aufgabe ausdrücklich mitgegeben werden (`connectors`), Postiz-Key muss in der Umgebung hinterlegt sein.
- Postiz: jede Datei erst `postiz upload`, dann `.path` verwenden. `integrations:settings` vor dem Planen lesen (falsche Einstellungen werden still verworfen).
- Fakten müssen stimmen (UWG, Plattform-Fehlinformationsregeln): jedes Skript mit Quelle in `skripte/`.
- Keine fremden Inhalte/Musik ohne Lizenz (Originalitätsregel Instagram, Content ID YouTube).
