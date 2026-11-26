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
- ✅ **Testvideo 001 „Wie verdient Costco Geld?“ fertig** (26.11.2026): `ausgabe/001-costco-test.mp4`, 33 s, 1080×1920. Skript + Belege + Schnittdatei in `skripte/001-costco/`. **Kosten: ca. 5,5 Credits** (7 Bilder à 0,25 + Stimme 3,7). Schnitt dauert ~12 s im Container.
- ✅ Pipeline `pipeline/render.py`: Bilder + Stimme → Zoom-Effekt, Untertitel (3 Wörter, Zahlen gelb, Pausen per silencedetect synchron), Titel oben in den ersten 3 s, Lautheit −14 LUFS.
- Werkzeuge im Container geprüft: ffmpeg 6.1, ffprobe, Node 22, jq vorhanden. Postiz-CLI noch nicht installiert (`npm i -g postiz`).

## Entscheidungen
- Stil: stilisierter 3D-Render, gedämpftes Petrol + warmes Orange, „No text, no letters, no logos“ in jedem Prompt. Stimme: Higgsfield `seed_audio`, Preset „Julian“ (`95429266-c0ac-4137-a209-63b8812b0f23`), `speech_rate` 12. Deutsch klingt gut.
- Untertitel: Schrift Inter Display Black (im Container vorhanden). Zahlen im Sprechertext als Ziffern in `phrases` schreiben, damit sie gelb werden.
- Fertige Videos nicht ins Repo (nur dieser eine Test); sie liegen in Postiz.
- Generierung nur mit Higgsfield (Repo-Regel): Bilder `gpt_image_2_5`, Stimme `generate_audio`, ggf. kurze Bewegung per günstigem Videomodell.
- Schnitt/Untertitel/Ken-Burns-Zoom mit ffmpeg im Container (kostet keine Credits).
- Posten über Postiz (eine Schnittstelle für alle 3 Plattformen). TikTok immer `DIRECT_POST`.
- KI-Label auf allen Plattformen setzen (Plattformregeln + Art. 50 KI-VO).

## Fallstricke
- `render.py`: Bilder nicht auf 2× hochskalieren (zoompan wird >10 min langsam); 1,25× reicht.
- `phrases` an den Satzpausen trennen (jeder Satz und „Der Trick:“ einzeln). Passt die Zahl der Sprechpausen nicht, verteilt das Skript proportional (ungenauer).
- **Marken & Logos:** Firmennamen dürfen sachlich genannt werden, aber **keine Logos, Markenprodukte oder Maskottchen in KI-Bildern** nachbauen (Markenrecht) und nie den Eindruck einer Kooperation erwecken. Bilder zeigen generische Szenen (Lager, Kasse, Fabrik).
- **Keine Anlageberatung:** keine Aktien-/Kaufempfehlungen, keine Renditeversprechen, keine „so wirst du reich“-Aussagen. Erklären, nicht empfehlen.
- **Zahlen nur aus Primärquellen** (Geschäftsbericht, offizielle Pressemitteilung, seriöse Presse) mit Jahr; im Video „laut Geschäftsbericht 2025“. Quelle in jedem Skript.
- **YouTube „inauthentic content“** (seit 15.07.2025): massenhaft gleichförmige Videos werden nicht monetarisiert. Jedes Video braucht eigenes Skript, echten Inhalt, Abwechslung in Bildern/Aufbau.
- Higgsfield-Credits teilt sich das Projekt mit `ai-influencerin/`. **Stand 26.11.2026: 350,9 Credits** vor dem Testvideo. Bei ~5,5 Credits/Video reichen 30 Videos ≈ 165 Credits.
- Geplante Aufgaben starten frische Sitzungen: Higgsfield-Connector muss der Aufgabe ausdrücklich mitgegeben werden (`connectors`), Postiz-Key muss in der Umgebung hinterlegt sein.
- Postiz: jede Datei erst `postiz upload`, dann `.path` verwenden. `integrations:settings` vor dem Planen lesen (falsche Einstellungen werden still verworfen).
- Fakten müssen stimmen (UWG, Plattform-Fehlinformationsregeln): jedes Skript mit Quelle in `skripte/`.
- Keine fremden Inhalte/Musik ohne Lizenz (Originalitätsregel Instagram, Content ID YouTube).
