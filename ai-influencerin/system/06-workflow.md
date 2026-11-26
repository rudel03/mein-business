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

## Persona anlegen (einmalig, Schritt für Schritt)
1. **Briefing** mit dem Inhaber (5 Fragen): Nische, Alter (erwachsen, z. B. 24–32), Herkunft/Stadt, Typ/Aussehen grob, Charakter in 3 Worten. Der Rest wird vorgeschlagen.
2. **Optionen holen:** `ai_influencer_get_options` (Merkmale), `ai_influencer_list_presets` (Beispiele).
3. **3 Varianten** mit `ai_influencer_prepare` vorbereiten (Preis anzeigen), nach Freigabe mit `ai_influencer_generate` erzeugen → Character Sheets. Inhaber wählt eine.
   - Bewusst kleine Unregelmäßigkeiten wählen (Sommersprossen, Muttermal, leicht asymmetrische Augenbrauen), sonst wirkt sie „zu perfekt“.
4. **Element** aus dem gewählten Sheet anlegen (`elements_create`), ID in PERSONA.md.
5. **Trainingsset:** 30 Porträts (Skill influencer-prompt, Modell mit Element): Winkel frontal/¾/Profil, Licht Fenster/draußen/abends, Ausdrücke neutral/lachend/nachdenklich, Haare offen/Zopf. Ausmisten, was abweicht.
6. **Soul ID** trainieren (Higgsfield-Oberfläche „Soul → Train new character“, 20–80 Bilder ≥ 960 px). Soul-ID in PERSONA.md eintragen.
7. **Identitätsblock** final schreiben (englisch, 40–70 Wörter, nur unveränderliche Merkmale) → PERSONA.md.
8. **Stimme** (optional, für Reels): `create_voice` mit einer eigens erstellten/lizenzierten Stimme → Voice-ID in PERSONA.md.
9. **Testshooting:** 10 Bilder in 10 Situationen → Qualitätscheck → Learnings in PERSONA.md („Nano Banana Pro trifft das Muttermal besser“ usw.).

## Kosten im Blick
- Vor jedem großen Batch `estimate_image_cost` / `estimate_video_cost`, Guthaben mit `balance`.
- Richtwert Woche (Phase 2): ~40 Bilder (inkl. Ausschuss) + 6–10 Videoclips. Videos sind der Hauptkostentreiber → erst Standbild perfekt, dann 1 Clip, nicht 5 Varianten.

## Dateien
- `content/bilder/` und `content/videos/`: nur freigegebene Endversionen (< 50 MB, große Videos nicht committen, nur Higgsfield-Link in LOG.md).
- `content/plan/JJJJ-KWxx.md`: Wochenpläne.
- `content/LOG.md`: jede Veröffentlichung (Datum, Plattform, Format, Prompt-Kurzform, Job-ID, Kennzahlen nach 48 h und 7 Tagen).
