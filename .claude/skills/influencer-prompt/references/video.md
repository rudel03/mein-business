# Video-Prompts (Reels, TikTok, Stories)

## Grundablauf
1. **Startbild** mit dem Bild-Workflow erzeugen und Qualitätscheck bestehen (9:16).
2. **Animieren** mit Startbild (`start_image`). Der Prompt beschreibt nur **Bewegung, Kamera, Ton**, nicht das Gesicht neu.
3. Mehrere Clips verketten: letzter Frame von Clip A = Startbild von Clip B. Nach 2–3 Clips wieder von einem frischen Standbild starten, weil sich kleine Fehler aufaddieren.
4. Schnitt, Text-Overlays, Musik: im Editing Room (Higgsfield) oder in CapCut/Edits-App. Text **nie** im Generator, immer danach einblenden.

## Modelle (Stand Higgsfield, Nov 2026 – Kosten siehe `ai-influencerin/system/11-kosten.md`)
**Standard für Clips: `kling3_0` mode `std`, `sound: "off"`, mit `start_image` (~7,5 Credits / 5 s).** Seedance 2.5 nur für Hero-Clips: erst `draft: true` (480p, ~15), dann mit `draft_job_id` finalisieren. 1080p Seedance kostet ~80 Credits / 5 s.

| Zweck | Modell | Hinweis |
|---|---|---|
| Lifestyle-Clip aus Startbild | `seedance_2_5` (mode `omni_reference`, start_image) | 5–10 s, 1080p, Ton an/aus |
| Persona per Element | `seedance_2_0` / `cinematic_studio_3_0` mit `<<<ELEMENT_ID>>>` | |
| Sprechend in die Kamera | `intone` | character_images = Persona-Bild, audio_references = Sprachdatei (2–30 s) |
| Bewegung übertragen (Tanz, Trend) | Genjutsu Motion Transfer (`hf_mult_motion_control`) | nur eigene/lizenzfreie Vorlagen-Videos |
| Gesicht in fertigem Clip korrigieren | Genjutsu Object Swap | |

## Video-Prompt-Struktur
```
[Shot]      handheld phone video, vertical 9:16, recorded by a friend / selfie video
[Handlung]  she ... (eine Hauptbewegung, max. zwei)
[Kamera]    slight handheld shake, slow push-in / static on a tripod / follows her walking
[Tempo]     natural real-time speed, no slow motion
[Umgebung]  background motion: steam from the cup, people walking by, leaves moving
[Ton]       ambient café noise, no music (Musik später in der App)
[Ausschluss] no morphing, no extra limbs, face stays consistent, no text
```

## Realismus-Tricks
- Handkamera-Wackeln und kurze Fokussuche wirken echt; perfekte Kamerafahrten wirken nach KI.
- Kurze Clips (3–6 s) und schnelle Schnitte verbergen Drift.
- Hände aus Nahaufnahmen raushalten, Gesicht nicht zu lange frontal ohne Bewegung.
- Für „Talking“-Videos: Stimme mit `create_voice` einmal festlegen (eigene, lizenzierte Stimme, nie die einer realen Person klonen) und Skript vorher mit dem Inhaber abstimmen.

## Reel-Formate, die ohne Sprechen funktionieren
- „Ein Tag in 7 Sekunden“: 5–7 Clips à 1 s mit Text-Overlay
- „Get ready with me“ mit Untertiteln
- POV-Clips (Hände, Kaffee, Laptop)
- Vorher/Nachher (Outfit, Zimmer, Rezept)
- Foto-Dump als Reel (Carousel-Bilder mit Beat-Schnitt)
