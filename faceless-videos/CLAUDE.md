# Faceless-Videos – Projektgedächtnis

Wird beim Start jeder Sitzung zu diesem Projekt gelesen. Übergreifende Regeln: `../CLAUDE.md`. Gesamtplan: `PLAN.md`.

## ⭐ FREIGEGEBENER STIL (26.11.2026) – IMMER SO PRODUZIEREN
Inhaber: **„Das ist perfekt, das gefällt mir sehr. Genau diesen Style festhalten.“**
- **Referenzvideo:** `ausgabe/005-umzug-v2.mp4` · Config `skripte/005-umzug/video_v2.json` · Szenen `engine/scenes/umzug.js`
- **Komplette Regeln + Muster-Skript + Ablauf: `FORMAT.md` (Pflichtlektüre vor jedem Video).** Skill dafür: `.claude/skills/geschaeftsmodell-video/`.
- Kurzfassung: unterschätztes Geschäftsmodell · Umgangssprache + Kraftausdrücke („verfickt“, „scheiß“, „geil“, „Digga“, „Bruder“) in fast jeder Zeile · für Dumme erklärt mit Rechnung zum Mitrechnen (Menge × Zeit × Preis, Lohn dagegen, was bleibt) · „warum macht das nicht jeder?“-Detail + „fettester Trick“ · Pro-Tipp · richtig absurder Plotwist mit trockener Pointe · 12–14 Zeilen, 70–80 s.
- Technik: eigene Three.js-Low-Poly-Engine (0 Credits) + Stimme ElevenLabs **„Orion“** über Higgsfield (`ed69c516-92d2-4b30-a967-617737a342e5`, `voice: {tempo: 1.15, tight: true}`, ≈ 6 Credits/Video) + 1-Wort-Untertitel + Etiketten für jede Zahl.

## Stand (26.11.2026)
- Nische: **Geschäftsmodelle, auf die keiner kommt**. Themen: `skripte/themen.md`.
- ✅ 005-umzug-v2 = freigegeben (Referenz).
- ✅ **011 Mietweihnachtsmann v2** (27.11.2026): Stimme zurück auf freigegebenes Rezept (Orion, jeder Satz einzeln, tempo 1.15, tight true) → `ausgabe/011-mietweihnachtsmann-v2.mp4`, 63,9 s, Config `video_v2.json`, Audio `audio_v2/`. Wartet auf Feedback.
- (v1, Stimme in einem Stück → abgelehnt) **011 Mietweihnachtsmann** (27.11.2026, nach Feedback „nicht gut – interessanteres Geschäft, mehr Humor“): Humor in jeder Szene (Running Gag Bart, E-Roller statt Rentiere, Wohnung 3B statt Nordpol, Hund/Kind/Onkel Jürgen), 11 Beats, 17 Einstellungen, Plotwist echter Weihnachtsmann wird Praktikant für Mindestlohn. `ausgabe/011-mietweihnachtsmann.mp4`, 70,7 s (Tempo 1,2, Pausen 0,22). Neue Bausteine: snowGround, snowfall, lightString, xmasHouse, xmasTree, present, santa (real), student, eScooter, dog, mug, mirror, sofaRoom; Nachtlicht + Sterne.
- ❌ **010 Kaugummiautomaten** vom Inhaber als „nicht gut“ bewertet (Thema zu trocken, zu wenig Humor).
- (alt) **010 Kaugummiautomaten** (27.11.2026, neue Regeln: ~1 Minute, starker Hook, kein Gelaber): Hook „Ein Typ in Deutschland soll 15.000 Kaugummiautomaten besitzen …“, 10 Beats, 16 eigene Einstellungen (Automatenwand, Nahaufnahme Münze/Kugel, Nachtverkauf, schlafender König, 15.000er-Raster, Geldregen, Nachfüll-Tour, Gewerbeamt, Kapselautomat, kaputtes Spielzeug, Thron …), Plotwist: Junge wirft 10 Jahre 50 Cent ein und besitzt am Ende alle Automaten. `ausgabe/010-kaugummiautomaten.mp4`, ~70 s, ≈ 1 Credit. Neue Bausteine: gumMachine, capsuleMachine, capsule, rowHouses, oldOwner, kid, bed, counterDesk, stamp, throne. Etiketten 40 % größer.
- ✅ **009 Golfball-Taucher v3 „hochwertig“** (27.11.2026, nach Feedback + Referenzvideo „Stau aus dem Nichts“/theoriefuchs): Engine-Upgrade (Bloom/Glow, ACES-Farben, Vignette/Korn, NaN-Filter, Sonnenscheibe, Wolken, Horizont-Hügel, Hintergrund-Leben, 3D-Etiketten an Objekten als eigene scharfe Ebene, Serien-Zeile oben). Szenen komplett neu: 19 einzigartige Einstellungen passend zu jedem Satz (echtes Clubhaus, Pro-Shop, Waschmaschine, Förderband, Clubmanager …). `ausgabe/009-golfball-taucher-v3.mp4`, Config `skripte/009-golfball-taucher/video_v3.json`. Render mit Glow ≈ 19 min. Wartet auf Feedback.
- (alt) **009 Golfball-Taucher v2** (Feinschliff nach Feedback „kein Ende-Teaser am Anfang, unpassende Pausen, weniger Digga“): ganzer Text in EINEM Sprachauftrag (`audio_full`), Pausen sanft auf 0,25 s, Tempo 1,12, „Digga“ nur im Hook → `ausgabe/009-golfball-taucher-v2.mp4`, 87 s, ≈ 1 Credit Stimme. Config `skripte/009-golfball-taucher/video_v2.json` = **neue Vorlage**. (v1: Orion, ≈ 6 Credits. Plotwist: Golfer seit 2009 im Teich kauft seinen Ball zurück (2,50 € + 10 Cent Ablöse). Neue Szenen `engine/scenes/golftaucher.js`, neue Bausteine: pond, flag, golfBall, ballField, golfer/swing, diver, netBag, oldGolfer, sortTable, Himmel `underwater`. Wartet auf Feedback.
- ⏳ **Nächster Schritt:** 006 Callcenter, 007 Folierer, 008 Schlüsseldienst im freigegebenen Stil neu schreiben (frecher, Rechnung zum Mitrechnen) und mit Orion neu sprechen. Szenen/Plotwists existieren schon (`engine/scenes/callcenter.js`, `folierer.js`, `schluesseldienst.js`), Quellen in `skripte/00x-*/skript.md`. Alte Fassungen (Dylan, alter Ton) liegen in `ausgabe/006–008*.mp4` und gelten als überholt.
- 004 Entrümpelung: alter Ton/Stimme (Dylan) → bei Bedarf ebenfalls im neuen Stil neu machen.
- **Offen:** Kanalname · Konten (YouTube, Instagram-Creator, TikTok) · Postiz verbinden + API-Key · danach Vollautomatik als geplante Aufgabe (Inhaber will voll automatisch posten).
- Higgsfield-Credits (geteilt mit `ai-influencerin/`): ≈ 250–270 übrig (Stand 26.11. spät, grob).

## Nicht machen (vom Inhaber abgelehnt)
- **🔒 Stimm-Verarbeitung NIE ohne Rückfrage ändern.** Rezept = 005-umzug-v2: Orion, jeder Beat einzeln, `tempo 1.15`, `tight: true`. „Ganzer Text in einem Stück“ (`audio_full`) + andere Tempi → Inhaber: „Stimme ist scheiße“ (27.11.2026).
- Ende-Teaser am Anfang („das Ende ist komplett lost“) · „Digga“ öfter als 1× · Einzelzeilen-Sprachaufträge + harte Pausenkürzung (klingt abgehackt) · Standbilder mit Zoom (001) · Higgsfield-Videoclips (002, zu teuer, „unlustig“) · Piper-Stimmen (alt, gelangweilt) · Stimme Dylan (zu hoch) · **Tonhöhen-Filter `pitch`** (klingt gedoppelt) · Slang „wie ein 30-Jähriger, der auf jung macht“ · zu wenig Umgangssprache · Plotwist nur leicht witzig.
- Unklar, nicht verwenden ohne Rückfrage: „Gundi“, „zirto“ (Bedeutung vom Inhaber erfragen).

## Technik
- Neue Sitzung: `bash pipeline/setup.sh` (piper, faster-whisper, three.js). Für Stimmvergleiche zusätzlich `pip install librosa` (pyin).
- `make_video.py` kann `audio_full` (ein Sprachstück → automatisch per Whisper an Beat-Grenzen geschnitten) und verwendet die 3D-Aufnahme wieder, wenn Plan + Szenen unverändert sind (nur Untertitel/Ton neu ≈ 1,5 min). Wort-Zuordnung toleriert Schreibvarianten („Digger“ ↔ „Digga“), Whisper bekommt 0,5 s Vorlauf.
- Ein Video: `python3 -I pipeline/make_video.py skripte/<nr>-<thema>/video.json` → Stimme je Zeile (Beat-Feld `audio`), 3D-Aufnahme `engine/render3d.mjs` (Headless-Chromium, SwiftShader, 1080×1920, 30 fps), Untertitel per faster-whisper, Etiketten, −14 LUFS. ≈ 10 min pro Video; 4 parallel ≈ 35 min.
- `video.json`-Felder: `scene`, `voice` {tempo, tight}, `beats` [{shot | [shots], audio, text, labels [{word, text, dur, color, x, y}]}], `highlight`, `source`, `source_beats`, `out`.
- Engine: `engine/world.js` (Baukasten: Figuren + Posen, Fahrzeuge, Gebäude, Büro, Münztürme, Uhr, Türen, Mond, Chrom-Effekt …), `engine/scenes/_common.js` (street, floorRoom, towersShot, tipShot, flyBills), pro Thema `engine/scenes/<thema>.js`.
- Alte Pipelines (`pipeline/render.py`, `render_blocks.py`) nur noch Reserve.

## Recht & Regeln
- Kraftausdrücke nur als Füllwörter; nie gegen echte Firmen, Personen, Gruppen (§ 185 StGB). Starke Flüche → YouTube schränkt Werbung ein; TikTok/IG ok.
- Jede Zahl mit Quelle; keine Einkommens-/„so wirst du reich“-Versprechen; Kosten ehrlich nennen (UWG).
- Keine Logos/Markenprodukte im Bild. KI-Label beim Posten setzen (Plattformregeln, Art. 50 KI-VO).
- YouTube „inauthentic content“: jedes Video eigenes Skript, eigene Szenen, Abwechslung.
- Posten über Postiz: Datei erst `postiz upload`, TikTok immer `DIRECT_POST`, `integrations:settings` vorher lesen.

## Fallstricke
- Lange Videos wurden gegen Ende schwarz: Grafikspeicher lief voll → `disposeScene` in index.html gibt jetzt Formen, Materialien, Texturen und Hintergründe frei. Nicht zurückbauen.
- Kamera-Korrekturen immer gegen Gebäude prüfen (Haus = massiver Block, Kamera darin = schwarz).
- Glow (UnrealBloom) verschmiert einzelne NaN-Pixel zu komplett schwarzen Bildern → `CleanShader` vor dem Bloom (in index.html) nicht entfernen.
- 3D-Etiketten `W.tag` liegen auf Layer 1 und werden NACH dem Glow gezeichnet (sonst unscharf/überstrahlt); Größe = Anteil der Bildhöhe (sizeAttenuation false).
- Higgsfield: max. 6 gleichzeitige Jobs; hängende `queued`-Jobs blockieren Plätze. Zahlen im Sprech-Prompt ausschreiben.
- faster-whisper: Audio per ffmpeg als numpy-Array übergeben (`av.open`-Fehler).
- Kamera nie in Figuren/Wände stellen → vor dem Rendern Standbilder prüfen (`--stills`).
- Türen: `W.door(color, {backing:true})` vor Häusern (Haus ist ein massiver Block).
- Regionale Gebühren an der Quelle prüfen (lrasha.de = LK Schwäbisch Hall). PDFs: `pdftotext -layout`.
- Geplante Aufgaben: Higgsfield-Connector mitgeben, Postiz-Key in der Umgebung hinterlegen.
