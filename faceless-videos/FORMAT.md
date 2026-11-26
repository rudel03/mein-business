# Videoformat „Geschäftsmodelle, auf die keiner kommt“ (Stand 26.11.2026)

Vorgabe des Inhabers: unterschätzte Geschäftsmodelle (Entrümpelung, Umzug, Callcenter, Folierer …) so erklären, dass der Zuschauer **jedes Detail** mitnimmt und echten Mehrwert hat. Am Ende ein **unerwarteter Plotwist**, der das Video lächerlich macht. Ton: wie Jugendliche wirklich reden, nicht wie ein 30-Jähriger, der auf jung macht.

## Aufbau (60–70 s, 12–14 Zeilen, je 1 Zeile = 1–2 Einstellungen)
1. **Hook (0–3 s):** paradoxe Aussage, sofort Bild dazu. „Digga, dieser Typ kriegt Geld dafür, dass er deinen Müll mitnimmt. Und verkauft ihn danach nochmal.“
2. **Name + offene Schleife:** „Entrümpelung, Bro. … Und am Ende wird's komplett lost, bleib dran.“ (hält bis zum Plotwist)
3. **Preis für den Kunden** (Zahl + Etikett), dann **Beispielrechnung**.
4. **Ablauf / Kosten** (Leute, Fahrzeug, Zeit, Material).
5. **Der Trick** (wo das eigentliche Geld herkommt) – 2–3 Zeilen mit konkreten Zahlen.
6. **Was kostet den Unternehmer** (ehrlich, mit Zahl).
7. **Zusammenfassung in einem Satz** („Die kassieren doppelt.“).
8. **Pro-Tipp für den Zuschauer** (Mehrwert: sparen, Steuer, worauf achten).
9. **Plotwist (2 Zeilen):** absurd, aber logisch aus dem Modell heraus (z. B. du kaufst deine eigene Couch zurück). Kein CTA danach, Video endet auf der Pointe → Loop.

## Bindung
- Alle 2–3 s neuer Schnitt/Kamerawinkel; lange Zeilen → `"shot": ["a", "b"]`.
- Jede Zahl als Etikett (Pill) im Bild; Schlüsselwörter gelb.
- Keine Begrüßung, kein „Heute erkläre ich…“, kein Abo-Aufruf am Anfang.

## Sprache
- Natürlich: „Digga“, „Bro“, „lowkey“, „safe“, „wild“, „komplett lost“, „Bude“, „nem“, „aufm“, „kassieren“. Sparsam dosieren (2–4 pro Video), nicht in jedem Satz.
- Kraftausdrücke als Füllwörter erlaubt („verfickt“, „Scheiß“), **nie gegen echte Firmen, Personen oder Gruppen**.
- Vom Inhaber genannt: „Gundi“, „zirto“ → Bedeutung/Verwendung vom Inhaber bestätigen lassen, bevor sie eingesetzt werden.

## Faktencheck (Pflicht)
- Jede Zahl mit Quelle in `skripte/<nr>/skript.md`; regionale Preise mit Region benennen (Etikett z. B. „LK Schwäbisch Hall 2026“).
- Spannen statt Scheingenauigkeit („30–50 €/m²“). Beispielrechnungen als solche kennzeichnen.
- Keine Versprechen „so wirst du reich“, keine Einkommensbehauptungen ohne Beleg.

## Produktion
1. Skript schreiben → `skripte/<nr>-<thema>/video.json` (+ `skript.md` mit Quellen).
2. Stimme: Higgsfield `generate_audio_batch`, `text2speech_v2`, `variant:"elevenlabs"`, Stimme **Dylan** `b847bc29-f184-583a-8ad9-d1f1e16d1a60`; max. 6 gleichzeitig; Zahlen im Prompt ausschreiben. Dateien nach `audio/01.mp3 …` laden. ≈ 0,45 Credits/Zeile.
3. Szenen: `engine/scenes/<thema>.js` (Baukasten `engine/world.js`). Vorschau: `node engine/render3d.mjs plan.json st --stills 1,4,7`.
4. `python3 -I pipeline/make_video.py skripte/<nr>/video.json` (≈ 9 min für 70 s).
