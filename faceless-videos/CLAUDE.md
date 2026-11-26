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
- Werkzeuge im Container geprüft: ffmpeg 6.1, ffprobe, Node 22, jq vorhanden. Postiz-CLI noch nicht installiert (`npm i -g postiz`).

## Entscheidungen
- Generierung nur mit Higgsfield (Repo-Regel): Bilder `gpt_image_2_5`, Stimme `generate_audio`, ggf. kurze Bewegung per günstigem Videomodell.
- Schnitt/Untertitel/Ken-Burns-Zoom mit ffmpeg im Container (kostet keine Credits).
- Posten über Postiz (eine Schnittstelle für alle 3 Plattformen). TikTok immer `DIRECT_POST`.
- KI-Label auf allen Plattformen setzen (Plattformregeln + Art. 50 KI-VO).

## Fallstricke
- **Marken & Logos:** Firmennamen dürfen sachlich genannt werden, aber **keine Logos, Markenprodukte oder Maskottchen in KI-Bildern** nachbauen (Markenrecht) und nie den Eindruck einer Kooperation erwecken. Bilder zeigen generische Szenen (Lager, Kasse, Fabrik).
- **Keine Anlageberatung:** keine Aktien-/Kaufempfehlungen, keine Renditeversprechen, keine „so wirst du reich“-Aussagen. Erklären, nicht empfehlen.
- **Zahlen nur aus Primärquellen** (Geschäftsbericht, offizielle Pressemitteilung, seriöse Presse) mit Jahr; im Video „laut Geschäftsbericht 2025“. Quelle in jedem Skript.
- **YouTube „inauthentic content“** (seit 15.07.2025): massenhaft gleichförmige Videos werden nicht monetarisiert. Jedes Video braucht eigenes Skript, echten Inhalt, Abwechslung in Bildern/Aufbau.
- Higgsfield-Credits teilt sich das Projekt mit `ai-influencerin/` (Plus, 1.000 Credits). Budget pro Video vorher festlegen.
- Geplante Aufgaben starten frische Sitzungen: Higgsfield-Connector muss der Aufgabe ausdrücklich mitgegeben werden (`connectors`), Postiz-Key muss in der Umgebung hinterlegt sein.
- Postiz: jede Datei erst `postiz upload`, dann `.path` verwenden. `integrations:settings` vor dem Planen lesen (falsche Einstellungen werden still verworfen).
- Fakten müssen stimmen (UWG, Plattform-Fehlinformationsregeln): jedes Skript mit Quelle in `skripte/`.
- Keine fremden Inhalte/Musik ohne Lizenz (Originalitätsregel Instagram, Content ID YouTube).
