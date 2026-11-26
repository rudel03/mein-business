# Arbeitsablauf (das automatisierte System)

```
Inhaber: 1 Satz  ─►  Claude: Skill influencer-prompt  ─►  Higgsfield (Bild/Video)  ─►  Qualitätscheck
                                                                                      │
Inhaber: Freigabe ◄── Vorschau + Caption (Skill influencer-redaktion) ◄───────────────┘
      │
      └─►  Postiz / Higgsfield-TikTok / von Hand  ─►  LOG.md  ─►  wöchentliche Auswertung (Windsor.ai)  ─►  besserer Plan
```

## Was der Inhaber tut (ca. 20–30 Min./Tag)
1. Morgens: Plan der Woche ansehen oder „mach Plan für KW xx“ sagen.
2. Bilder/Videos freigeben (👍 / „Bild 3 nochmal mit anderem Licht“).
3. In der App: posten (bis Post 20 von Hand), Label prüfen, 10–15 Min. Community (antworten, kommentieren, folgen – selbst).
4. Freitags: Insights-Screenshot oder Windsor-Verbindung → Auswertung.

## Was Claude tut
- Aus Kurzbeschreibung → Profi-Prompt → Generierung → Prüfung → beste 1–3 Bilder zeigen.
- Wochenpläne, Captions, Hashtags, Hooks, Story-Ideen, Kommentarvorschläge.
- Upscaling, Formatwechsel (4:5 / 9:16 via `reframe`/`outpaint_image`), Reels animieren.
- LOG.md und CLAUDE.md pflegen, committen, pushen.

## Befehle (so kann der Inhaber mit Claude sprechen)
| Du sagst | Claude macht |
|---|---|
| „Lena im Park, sonnig, Jacke von letzter Woche“ | 3 Varianten, prüft, zeigt die beste + Caption |
| „Carousel: 5 Meal-Prep-Boxen“ | 5–7 Bilder (Boxen + Lena), Overlay-Texte, Caption |
| „Reel: Morgenroutine 10 s“ | 5 Startbilder → 5 Clips → Schnittliste + Hook + Musikvorschlag |
| „Plan für nächste Woche“ | Tabelle in `content/plan/`, nach Freigabe alle Bilder |
| „Auswertung“ | Zahlen holen, Learnings, Test für nächste Woche |
| „Das sieht nach KI aus“ | Qualitätscheck, eine Variable ändern, neu |
| „Neue Story-Ideen“ | 7 Stories mit Sticker-Vorschlägen |

## Persona anlegen (einmalig, Schritt für Schritt – mit den echten Higgsfield-Werkzeugen)
**Vorbereitung (einmal):** `balance` prüfen · `get_preferences` · Higgsfield-Projekt „KI-Influencerin“ mit `create_project` anlegen und dessen `default_folder_id` bei **jeder** Generierung als `folder_id` mitgeben (ID in PERSONA.md).

1. **Briefing** (eine Nachricht an den Inhaber): Name, Haarfarbe/-länge, Typ (sportlich-natürlich / Streetwear), Stadt, Wiedererkennungsmerkmal – zu jedem Punkt die VORSCHLÄGE aus PERSONA.md mit Empfehlung zeigen.
2. **Charakter bestätigen:** VORSCHLAG-Abschnitte (Steckbrief, Meinungen, Macken, Running Gags, Stimme) vorlegen, Änderungen einarbeiten.
3. **3 Character Sheets:** Basis-Einstellungen aus PERSONA.md („Higgsfield-Baukasten-Einstellungen“), pro Variante **eine** Achse ändern. Jede mit `ai_influencer_prepare` (**`tier: "normal"`, `randomize: false`**) quoten → Preis nennen → nach OK die Params **unverändert** an `ai_influencer_generate` mit `max_credits` = Quote. Warten mit `jobs_wait` (timeout ≤ 15 s, wiederholen). Nicht automatisch neu senden, wenn unklar.
   - Auswahlkriterien: wirkt echt (Haut, Augen, Proportionen), attraktiv aber nahbar, unverwechselbar (Merkmal sichtbar), passt zu Gym + Küche + Mode.
   - Gefällt keine: eine Achse ändern, erneut 2–3 Varianten (je ~1,4 Credits).
4. **Element anlegen:** `elements_create` mit `category: "character"`, `display_name` = Name, `medias` = gewählter Sheet-Job (`type: "image_job"`). Element-ID in PERSONA.md. Platzhalter im Prompt: `<<<ELEMENT_ID>>>`. Unterstützte Bildmodelle: `gpt_image_2_6`, `nano_banana_pro`, `nano_banana_2`, `gpt_image_2`, `seedream_v4_5`, `seedream_v5_lite`, `cinematic_studio_2_5`; Video: `seedance_2_0`, `cinematic_studio_3_0`, `kling3_0` (nur mit Startbild).
5. **Trainingsset (20 Bilder):** mit Element + Skill `influencer-prompt` in 3 Batches (≤ 8 Jobs). Pflicht-Mix: 8× frontal/¾ Kopf-Schulter (Fensterlicht, draußen bewölkt, Abendlampe), 4× Profil/halbes Profil, 4× lachend/nachdenklich/neutral, 4× Halbtotale (Gym-Outfit, Strick, Blazer). Keine Sonnenbrille, keine verdeckten Gesichter, keine extremen Grimassen. Jedes Bild Qualitätscheck Punkt 1 (Muttermal rechts! Augenfarbe, Nase, Haaransatz) – Abweichler aussortieren.
6. **Soul ID trainieren:** `show_characters` mit `action: "train"`, `type: "soul_2"`, `name` = Personaname, `images` = 15–20 beste Job-IDs. Dauer ca. 10 Min. (Widget pollt). Danach `show_characters` `action: "status"` → Soul-ID in PERSONA.md. Nutzung nur mit `soul_2` / `soul_cinematic` (`generate_image` mit `soul_id`); für alle anderen Modelle das Element.
7. **Identitätsblock** final schreiben (Vorlage in PERSONA.md an das gewählte Sheet anpassen, 40–70 Wörter).
8. **Testshooting (10 Bilder):** je 1 Situation pro Kategorie aus `content/plan/vorrat.md` (Küche, Rezept-Draufsicht, Gym-Spiegel, Gym-Pause, Café, Spiegel-Outfit, Street, Sofa, Park, Story-POV), jeweils **Soul 2.0 vs. Element-Modell** vergleichen → Learnings („welches Modell für welche Situation“) in PERSONA.md.
9. **Stimme (optional, später für Reels):** `create_voice` mit einer neu erzeugten Stimme (keine reale Person klonen) → Voice-ID in PERSONA.md.
10. **Abschluss:** „VORSCHLAG“-Markierungen entfernen, Status oben auf „angelegt“ setzen, committen, pushen.
**Budget Persona-Phase:** Sheets ~5–10 Credits + Trainingsset + Testshooting (Kosten vorher mit `estimate_image_cost` schätzen). Ziel: unter 300 Credits bleiben.

## Notfall-Paket (monatlich)
Instagram-Datenexport anstoßen, alle Originale/Prompts/Captions/Referenzbilder sichern (Higgsfield + Repo für kleine Dateien), Voice-ID notieren, E-Mail-Liste (Double-Opt-in) pflegen.

## Kosten im Blick
- Vor jedem großen Batch `estimate_image_cost` / `estimate_video_cost`, Guthaben mit `balance`.
- Richtwert Woche (Phase 2): ~40 Bilder (inkl. Ausschuss) + 6–10 Videoclips. Videos sind der Hauptkostentreiber → erst Standbild perfekt, dann 1 Clip, nicht 5 Varianten.

## Dateien
- `content/bilder/` und `content/videos/`: nur freigegebene Endversionen (< 50 MB, große Videos nicht committen, nur Higgsfield-Link in LOG.md).
- `content/plan/JJJJ-KWxx.md`: Wochenpläne.
- `content/LOG.md`: jede Veröffentlichung (Datum, Plattform, Format, Prompt-Kurzform, Job-ID, Kennzahlen nach 48 h und 7 Tagen).
