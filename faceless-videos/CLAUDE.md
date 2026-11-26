# Faceless-Videos – Projektgedächtnis

Wird beim Start jeder Sitzung zu diesem Projekt gelesen. Übergreifende Regeln: `../CLAUDE.md`. Gesamtplan: `PLAN.md`.

## Ziel
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
- ✅ **Testvideo 002 Costco im Game-Stil** (26.11.2026): `ausgabe/002-costco-gamestyle-test.mp4`, 41,7 s. Skript/Belege/Config in `skripte/002-costco-gamestyle/`. **≈ 46 Credits**. Wartet auf Feedback des Inhabers. Stimmproben (5 ElevenLabs-Stimmen) in `ausgabe/stimmproben.mp3`, Reihenfolge Cillian, Marcus, Brooks, Bram, Max (Pieps davor, Ton steigt).
- ✅ Pipeline `pipeline/render_blocks.py`: 10-s-Clips + 1 Sprecherzeile je Clip → Ein-Wort-Untertitel per faster-whisper (Modell small) an Skripttext ausgerichtet, Pills per Wort ausgelöst, Quellenzeile, −14 LUFS. Ist eine Zeile länger als der Clip, wird der Clip verlangsamt (max. 20 %), nie die Stimme.
- Werkzeuge im Container geprüft: ffmpeg 6.1, ffprobe, Node 22, jq vorhanden. Postiz-CLI noch nicht installiert (`npm i -g postiz`).

## Entscheidungen
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
- Costco-Zahlen: aktuell **Geschäftsjahr 2026** (nicht 2025). Immer das neueste Geschäftsjahr prüfen.
- `phrases` an den Satzpausen trennen (jeder Satz und „Der Trick:“ einzeln). Passt die Zahl der Sprechpausen nicht, verteilt das Skript proportional (ungenauer).
- **Marken & Logos:** Firmennamen dürfen sachlich genannt werden, aber **keine Logos, Markenprodukte oder Maskottchen in KI-Bildern** nachbauen (Markenrecht) und nie den Eindruck einer Kooperation erwecken. Bilder zeigen generische Szenen (Lager, Kasse, Fabrik).
- **Keine Anlageberatung:** keine Aktien-/Kaufempfehlungen, keine Renditeversprechen, keine „so wirst du reich“-Aussagen. Erklären, nicht empfehlen.
- **Zahlen nur aus Primärquellen** (Geschäftsbericht, offizielle Pressemitteilung, seriöse Presse) mit Jahr; im Video „laut Geschäftsbericht 2025“. Quelle in jedem Skript.
- **YouTube „inauthentic content“** (seit 15.07.2025): massenhaft gleichförmige Videos werden nicht monetarisiert. Jedes Video braucht eigenes Skript, echten Inhalt, Abwechslung in Bildern/Aufbau.
- Higgsfield-Credits teilt sich das Projekt mit `ai-influencerin/`. **Stand 26.11.2026 abends: 297,55 Credits.** Game-Stil kostet **≈ 42–45 Credits pro 40-s-Video** → 1 Video/Tag ≈ 1.300 Credits/Monat. Mit Plus nicht machbar; größerer Plan oder 2–3 Videos/Woche nötig.
- Geplante Aufgaben starten frische Sitzungen: Higgsfield-Connector muss der Aufgabe ausdrücklich mitgegeben werden (`connectors`), Postiz-Key muss in der Umgebung hinterlegt sein.
- Postiz: jede Datei erst `postiz upload`, dann `.path` verwenden. `integrations:settings` vor dem Planen lesen (falsche Einstellungen werden still verworfen).
- Fakten müssen stimmen (UWG, Plattform-Fehlinformationsregeln): jedes Skript mit Quelle in `skripte/`.
- Keine fremden Inhalte/Musik ohne Lizenz (Originalitätsregel Instagram, Content ID YouTube).
