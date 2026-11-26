---
name: influencer-prompt
description: "Macht aus einer kurzen Beschreibung des Inhabers (z. B. 'Lena im Café, Herbst, müde aber happy') einen sehr detaillierten, fotorealistischen Bild- oder Video-Prompt für die KI-Influencerin und generiert ihn auf Higgsfield. Verwenden bei: 'mach ein Bild von ihr', 'neuer Post', 'Reel von ...', 'Story-Bild', 'Prompt für', 'Influencerin', 'Persona-Bild', 'Carousel-Fotos', 'realistischer machen', 'sieht nach KI aus'. Liest immer zuerst die Persona-Bibel in ai-influencerin/persona/."
---

# Influencer-Prompt: Kurzbeschreibung → Profi-Prompt → Higgsfield

Ziel: Der Inhaber schreibt einen Satz, du lieferst Bilder, die wie echte Handyfotos aussehen und immer dieselbe Person zeigen. So wenig Rückfragen wie möglich, so viel Qualität wie möglich.

## 0. Vor jedem Prompt (Pflicht)
1. `ai-influencerin/persona/PERSONA.md` lesen (Identitätsblock, Kleiderschrank, Wohnung, Orte, Stil-Regeln, Element-/Soul-ID). Gibt es sie noch nicht → Skill-Abschnitt „Persona anlegen“ in `ai-influencerin/system/06-workflow.md` zuerst ausführen.
2. `ai-influencerin/content/LOG.md` überfliegen: Was wurde zuletzt gepostet (Outfits, Orte, Tageszeit)? Wiederholungen vermeiden, Kontinuität halten (gleiche Wohnung, gleicher Hund, gleiche Jacke im selben Monat).
3. Fehlende Angaben **nicht erfragen, sondern sinnvoll ergänzen** (Jahreszeit = aktuelles Datum, Ort = einer aus der Persona-Orteliste, Outfit = passend aus dem Kleiderschrank). Nur fragen, wenn die Beschreibung widersprüchlich ist.

## 1. Kurzbeschreibung zerlegen (intern, nicht ausgeben)
Fülle diese 12 Felder. Was fehlt, ergänzt du aus Persona + Kontext:

| Feld | Frage | Beispiel |
|---|---|---|
| Format | Feed 4:5, Story/Reel 9:16, Carousel (Anzahl) | 4:5 |
| Shot-Typ | Selfie / Spiegel-Selfie / Freund fotografiert / Stativ-Selbstauslöser / POV / Detail ohne Gesicht | Freund fotografiert |
| Handlung | konkrete, kleine Tätigkeit (nie nur „posiert“) | pustet in den Cappuccino-Schaum |
| Ort | spezifisch, mit 2–3 Requisiten | Ecktisch in kleinem Café, Holztisch mit Kratzern, Zuckerdose aus Metall |
| Zeit/Licht | Tageszeit + eine Lichtquelle + Richtung | 16 Uhr, tiefe Herbstsonne seitlich durchs Fenster |
| Wetter/Saison | passt zum echten Datum | Ende November, Nieselregen draußen |
| Outfit | aus Kleiderschrank, inkl. Stoff | olivgrüner Strickpulli Rippstrick, leicht fusselig |
| Haare/Make-up | Zustand heute | lockerer Dutt, ein paar Strähnen fallen raus, kaum Make-up |
| Emotion/Mimik | ehrlich, nicht „perfekt lächelnd“ | halb lachend, Augen leicht zusammengekniffen |
| Kamera | Gerät + Perspektive + Fokus | iPhone-Hauptkamera, Augenhöhe, Fokus auf Gesicht |
| Imperfektion | 1–2 Stück, nicht mehr | leichte Bewegungsunschärfe der Hand, Krümel auf dem Tisch |
| Ausschlüsse | kurz, nur echte Risiken | kein Text, keine Logos, keine Wachshaut |

## 2. Prompt bauen (feste Reihenfolge)
Nach Recherche (`ai-influencerin/system/01-recherche.md`): Realismus entsteht, wenn man beschreibt, was eine echte Kamera aufnimmt, wie echtes Licht fällt und wie echte Haut aussieht. Wörter wie „ultra realistic, 8k, masterpiece, hyperreal, CGI, render, octane, unreal engine“ machen Bilder künstlicher → **nie verwenden**.

```
[1 FOTOGRAFIE-GATTUNG]  Candid smartphone photo / mirror selfie / casual photo taken by a friend …
[2 IDENTITÄT]           <<<ELEMENT_ID>>> + Identitätsblock aus PERSONA.md WORTGLEICH (nie umformulieren)
[3 HANDLUNG + MIMIK]    what she is doing right now, genuine expression
[4 OUTFIT + HAARE]      fabrics, fit, wrinkles, state of hair
[5 ORT + REQUISITEN]    specific place, 2–3 lived-in props, background people blurred if any
[6 KAMERA]              device, lens equivalent, height/angle, focus target, depth of field
[7 LICHT]               one key light, direction, softness, colour temperature, catchlights
[8 REALISMUS]           skin/hair detail passend zur Bildgröße + 1–2 Imperfektionen
[9 FARBE/LOOK]          natural colour grade, slight phone HDR, no filter look
[10 AUSSCHLÜSSE]        no text, no logos, no watermark, no waxy skin, natural hands with five fingers
```

Prompts auf **Englisch** schreiben (Modelle verstehen es am besten), Captions auf Deutsch.

### Bausteine je Shot-Typ (in `references/bausteine.md` ausführlich)
- **Handy-Selfie:** "front camera selfie, arm extended slightly out of frame, ~24mm wide-angle phone lens, mild wide-angle perspective on the face, slight phone HDR, focus on eyes"
- **Spiegel-Selfie:** "mirror selfie, phone held at chest height covering part of the chin, slight smudges on the mirror, phone case visible" (Handy-Modell neutral, kein Markenlogo)
- **Freund fotografiert:** "photo taken by a friend from about 2 metres, 1x main phone camera, eye level, natural perspective, moderate depth of field"
- **Selbstauslöser/Stativ:** "photo from a small tripod on a table, slightly low angle, she is mid-movement"
- **Portrait-Modus:** "phone portrait mode, 2x lens (~52mm equivalent), soft computational background blur with slight edge errors around the hair" (gewollter Echtheitsfehler)
- **POV / ohne Gesicht:** Hände, Kaffee, Buch, Füße am Strand. Ideal für Füllposts und Stories (kein Identitätsrisiko).

### Haut nach Bildgröße
- Nahaufnahme: "natural unretouched skin with subtle pore detail at close focus, slight tonal variation across cheeks and forehead, fine vellus hair catching the light, restrained highlights"
- Halbtotale/Lifestyle: nur "natural skin texture, no beauty filter" (sonst „Poren-Tapete“)
- Ganzkörper: Haut gar nicht erwähnen, stattdessen Stoffe und Licht.

### Imperfektionen (genau 1–2 wählen)
tiny flyaway hairs · slight motion blur on one hand · mild sensor noise in shadows · crumbs / used napkin on table · slightly crooked framing · lens flare from a window · small wrinkle in clothing · chipped nail polish · faint under-eye texture · other guests blurred in background

## 3. Modell & Parameter (Higgsfield)
- **Gesicht soll exakt stimmen:** Element der Persona einbinden: `<<<ELEMENT_ID>>>` im Prompt, Modell `gpt_image_2_6` oder `nano_banana_pro`. Alternativ `soul_2` mit `soul_id` (trainierte Identität, stärkste Konsistenz, „realistic UGC“-Look).
- **Ohne Gesicht / Szene / Produkt:** `gpt_image_2_6` (Repo-Standard laut CLAUDE.md ist gpt_image_2_5; das neuere 2.6 vorziehen, wenn verfügbar).
- **Erst testen:** für jede neue Bildidee 2–4 Varianten (verschiedene Kamera oder Licht), dann die beste hochskalieren (`upscale_image`) – nicht 20 Varianten blind.
- Batch: höchstens ~8 Jobs auf einmal (Fehler 429), `jobs_wait` höchstens 12 Jobs, `timeout_seconds` ≤ 15 und wiederholen.
- Kosten vorher mit `estimate_image_cost` prüfen, wenn > 10 Bilder.

## 4. Qualitätskontrolle (jedes Bild, bevor es dem Inhaber gezeigt wird)
Bild ansehen und Checkliste in `references/qualitaetscheck.md` durchgehen. Kurzform:
1. Gesicht = Persona? (Augenform, Muttermal, Nase, Haaransatz) 2. Hände: 5 Finger, Gelenke, Ringe nicht verschmolzen 3. Text/Logos im Bild? (Schilder, Tassen, Kleidung) 4. Licht: eine Richtung, Schatten passen 5. Haut: nicht wachsig, nicht Poren-Tapete 6. Physik: Kaffee in Tasse, Gegenstände berühren Flächen, Spiegelbild stimmt 7. Hintergrundmenschen: keine Gesichter-Matsch 8. Zur Jahreszeit/Story passend.
Fehler → **eine** Variable ändern und neu generieren (oder lokal bearbeiten mit Erhaltungssatz: "Edit only X. Keep her face, expression, crop and background unchanged."). Nach 3 Versuchen Modell wechseln statt Adjektive anhäufen.

## 5. Video / Reels
Siehe `references/video.md`. Grundprinzip: **erst das perfekte Standbild, dann animieren** (start_image), Prompt beschreibt nur Bewegung + Kamera, nicht das Gesicht. Sprechende Clips: Higgsfield `intone` (Charakterbild + Sprachaufnahme), Stimme einmal mit `create_voice` festlegen und immer gleich verwenden.

## 5b. Formate
Feed/Carousel **3:4** (1080 × 1440; über Postiz/API 4:5), Reels/Stories **9:16**, danach `upscale_image`. Bei Carousels alle Bilder im selben Format. Wichtiges im Reel in der Mitte (UI-Ränder oben/unten frei). Das „KI“-Kürzel kommt nachträglich (Canva), nie im Generator.

## 6. Ausgabe an den Inhaber
Kurz auf Deutsch: welche Bilder (Vorschau), welcher Prompt (aufklappbar/als Datei), Vorschlag für Caption + Hashtags (Skill `influencer-redaktion`), Hinweis „KI-Label beim Posten aktivieren“. Gewählte Bilder unter `ai-influencerin/content/bilder/JJJJ-MM-TT_kurzname.png` ablegen (keine Dateien > 50 MB committen) und Prompt + Job-ID in `ai-influencerin/content/LOG.md` eintragen.

## Harte Regeln
- Niemals eine reale Person nachbilden oder ihr ähneln lassen (Recht am eigenen Bild, KUG/DSGVO). Keine Promi-Namen in Prompts.
- Keine Minderjährigen, keine sexualisierten Inhalte, keine Markenlogos, keine echten Marken ohne Vertrag.
- Kein Content, der echte Erlebnisse vortäuscht, um Produkte zu bewerben („habe ich 4 Wochen getestet“) – UWG. Werbung immer als „Anzeige“ kennzeichnen.
- Jeder fotorealistische Post bekommt das Plattform-KI-Label (Instagram „AI-generated profile“ + Post-Label, TikTok „AI-generated“). Details: `ai-influencerin/system/05-recht.md`.
