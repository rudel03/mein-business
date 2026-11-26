# FREIGEGEBENER STIL – „Geschäftsmodelle, auf die keiner kommt“

**Vom Inhaber freigegeben am 26.11.2026: „Das ist perfekt, das gefällt mir sehr. Genau diesen Style festhalten.“**
**Referenzvideo: `ausgabe/005-umzug-v2.mp4`** · Skript/Config: `skripte/005-umzug/video_v2.json` · Szenen: `engine/scenes/umzug.js`

Jedes neue Video wird **genau so** gemacht. Abweichungen nur, wenn der Inhaber es ausdrücklich sagt.

> **Feinschliff 26.11.2026 (gilt ab sofort, Vorrang vor dem Muster unten):**
> - **Am Anfang NICHT ankündigen, dass das Ende lost/absurd ist** – Baustein 2 endet ohne Teaser („Golfball-Taucher. Klingt scheiß bescheuert, ist aber safe eins der krassesten Geschäfte überhaupt.“).
> - **„Digga“ höchstens 1× pro Video** (am besten im Hook). Sonst „Bruder“, „Alter“, „safe“, „krass“ und die Kraftausdrücke.
> - **Geschmeidig sprechen:** ganzer Text in **einem** Sprach-Auftrag (`audio_full`), keine Einzelzeilen; Pausen nur sanft begrenzen (`"tight": 0.25`), Tempo 1.12. Weniger Kommas/Doppelpunkte im Sprechtext („Jetzt rechnen wir mal.“ statt „Jetzt rechnen wir, Digga:“), Rückfragen mit „?“ („Und das Krasseste?“).
> - Referenz für den Feinschliff: `skripte/009-golfball-taucher/video_v2.json`.

---

## 1. Die 7 Stil-Regeln (nicht verhandelbar)
1. **Thema:** ein unterschätztes Geschäftsmodell, auf das keiner kommt (Umzug, Entrümpelung, Callcenter, Folierer, Schlüsseldienst …).
2. **Ton:** Umgangssprache wie Jugendliche reden, **Kraftausdrücke als Adjektive in fast jeder Zeile**: „verfickt“, „scheiß“, „geil“, „krass“, „safe“, „null Bock“, „Digga“, „Bruder“, „komplett lost“. Nie gegen echte Firmen, Personen oder Gruppen richten.
3. **Für Dumme erklärt:** „Pass auf, ganz easy:“ + Alltagssituation des Zuschauers, dann eine **Rechnung zum Mitrechnen** (Menge × Zeit × Preis = Umsatz an 1 Tag; Lohn dagegen; was übrig bleibt).
4. **„Warum macht das nicht jeder?“-Moment:** ein Detail, das den Einstieg leicht wirken lässt (z. B. „Transporter bis 3,5 t fährst du mit normalem Führerschein“) + der „fetteste Trick“ (versteckte Zusatz-Einnahme, z. B. Lagerräume = jeden Monat Geld).
5. **Ehrlich bleiben:** Kosten nennen (Lkw, Sprit, Versicherung, Abgaben), keine Einkommensversprechen, jede Zahl mit Quelle, Spannen statt Scheingenauigkeit.
6. **Mehrwert für den Zuschauer:** ein Pro-Tipp (sparen, Steuer, Abzocke vermeiden).
7. **Plotwist am Ende: RICHTIG absurd und unrealistisch**, logisch aus dem Geschäftsmodell übertrieben + trockene Schlusspointe. Kein Abo-Aufruf danach; das Video endet auf der Pointe.

## 2. Aufbau (12–14 Zeilen, ca. 70–80 s)
| # | Baustein | Muster aus dem Referenzvideo |
|---|---|---|
| 1 | **Hook** (paradox, 0–3 s) | „Digga, diese Typen tragen einfach nur Kartons von A nach B. Und machen damit verfickt viel Geld.“ |
| 2 | **Name** (ohne Ende-Teaser!) | „Umzugsfirma, Bruder. Klingt scheiß langweilig, ist aber safe eins der geilsten Geschäfte überhaupt.“ |
| 3 | **Für Dumme: Alltag** | „Pass auf, ganz easy: Du ziehst um, hast null Bock zu schleppen, also rufst du die Jungs an.“ |
| 4 | **Preis mit Quelle** | „Die nehmen pro Mann und Stunde im Schnitt so 42 Euro. Sagt der Branchenverband, kein Witz.“ |
| 5 | **Rechnung: Umsatz** | „Jetzt rechnen wir, Digga: Drei Jungs, acht Stunden, mal 42 Euro. Macht 1.008 Euro. Für einen verfickten Tag.“ |
| 6 | **Rechnung: Kosten** | „Und die Jungs? Kriegen mindestens Mindestlohn, 13,90 Euro. Drei mal acht Stunden sind rund 334 Euro.“ |
| 7 | **Was bleibt (ehrlich)** | „Heißt: Von 1.000 Euro bleiben rund 670 übrig. Davon gehen noch Lkw, Sprit, Versicherung und Abgaben weg. Der Rest gehört dem Chef.“ |
| 8 | **„Das Krasseste“ (leichter Einstieg)** | „Und das Krasseste: Für nen Transporter bis 3,5 Tonnen brauchst du keinen extra Führerschein. Der normale reicht.“ |
| 9 | **Extras** | „Dann die Extras: Halteverbotszone 80 bis 200 Euro, Möbel abbauen extra, vierter Stock ohne Aufzug extra. Alles scheiß extra, Digga.“ |
| 10 | **Der fetteste Trick** | „Und der fetteste Trick: Lagerräume. Leute lagern ihren Scheiß ein und zahlen jeden Monat. Ohne dass einer was schleppt.“ |
| 11 | **Pro-Tipp** | „Pro-Tipp: Kein Angebot ohne Besichtigung, sonst wird's am Umzugstag plötzlich scheiß teuer. Und 20 Prozent vom Arbeitslohn kannst du von der Steuer absetzen.“ |
| 12 | **Plotwist Teil 1** | „Und jetzt das Beste: Am Umzugstag packen die Jungs alles ein. Und zwar wirklich alles.“ |
| 13 | **Plotwist Teil 2 + Pointe** | „Das ganze verfickte Haus. Mit dir drin. Neue Adresse: der Mond. Halteverbotszone haben sie trotzdem berechnet.“ |

Weitere freigegebene Plotwist-Ideen: Callcenter ruft sich selbst an und wird „Callcenter des Jahres“ · Folierer foliert den Mond in Chrom, Rechnung an die NASA · 300 Türen hinter der Tür bis Australien · du kaufst deine eigene Couch vom Entrümpler zurück.

## 3. Bild & Schnitt
- Eigene 3D-Engine (Three.js), Low-Poly, Abendhimmel lila → orange, Held = gelber Hoodie + schwarze Cap rückwärts, Arbeiter = dunkelgrau + orange Cap.
- **Neuer Kamerawinkel alle 2–3 s**; lange Zeilen auf 2 Einstellungen verteilen: `"shot": ["math", "price"]`.
- Rechnungen als **Münztürme** (Umsatz vs. Lohn), Zeit als **Uhr**, Geldfluss als **fliegende Scheine/Münzen**.
- **Untertitel: 1 Wort**, groß, Mitte, weiß mit schwarzem Rand; Kraftausdrücke, Zahlen und Schlüsselwörter **gelb** (`highlight`).
- **Etiketten (Pills) für jede Zahl und jede Rechnung**: „3 JUNGS × 8 STD × 42 €“, „= 1.008 € AN 1 TAG“, „≈ 670 € ÜBRIG“, „KLASSE B: BIS 3,5 t“. Farben: gelb = Zahl, grün = Gewinn/gut, rot = Kosten/Warnung, weiß = Info.
- Quellenzeile klein unten in den Zahlen-Zeilen (`source`, `source_beats`).

## 4. Stimme (freigegeben)
- ElevenLabs **„Orion“** über Higgsfield: `text2speech_v2`, `variant: "elevenlabs"`, `voice_type: "preset"`, `voice_id: "ed69c516-92d2-4b30-a967-617737a342e5"`.
- In `video.json`: **`"audio_full": "audio/full.mp3"`** (ganzer Text in einem Stück) + `"voice": {"tempo": 1.12, "tight": 0.25}`. Das Programm schneidet per Whisper automatisch an den Beat-Grenzen. (Alt: Einzelzeilen + `tight: true` → abgehackte Pausen, nicht mehr nutzen.)
- **Kein `pitch`** (Tonhöhen-Filter klingt „gedoppelt“ – vom Inhaber abgelehnt).
- Im Sprech-Prompt Zahlen **ausschreiben** („zweiundvierzig Euro“, „drei komma fünf Tonnen“), im Untertitel-Text (`text`) als Ziffern.
- Ein Auftrag pro Video (≈ 1.300 Zeichen gehen problemlos); danach Vollständigkeit per Whisper prüfen.

## 5. Faktencheck (Pflicht vor dem Sprechen)
- Jede Zahl mit Quelle in `skripte/<nr>-<thema>/skript.md` (Link + Stand/Jahr).
- Regionale Preise mit Region benennen; Branchen-/Anbieterzahlen als Spanne und „im Schnitt/so“.
- Gesetze/Gebühren an der Primärquelle prüfen (PDF mit `pdftotext -layout`).
- Rechnungen nachrechnen (z. B. 3 × 8 × 13,90 = 333,60 → „rund 334“).

## 6. Produktion (Ablauf)
1. Thema aus `skripte/themen.md` wählen, recherchieren, Skript nach Abschnitt 2 schreiben.
2. `skripte/<nr>-<thema>/video.json` anlegen (Vorlage: `skripte/005-umzug/video_v2.json`) + `skript.md` mit Quellen.
3. Ganzen Sprechtext (Zahlen ausgeschrieben) in **einem** `generate_audio`-Auftrag mit Orion erzeugen → `audio/full.mp3`; Vollständigkeit per Whisper prüfen.
4. Szenen: vorhandene Einstellungen aus `engine/scenes/*.js` und `_common.js` wiederverwenden (towersShot, tipShot …), neue nur bei Bedarf. Vorschau: `node engine/render3d.mjs plan.json st --stills 1,4,7`.
5. `python3 -I pipeline/make_video.py skripte/<nr>-<thema>/video.json` (≈ 10 min). Neue Sitzung: vorher `bash pipeline/setup.sh`.
6. Prüfen: Standbilder ansehen, Whisper-Transkript einer Zeile gegenlesen, Länge 60–85 s.
