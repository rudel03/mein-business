# Werkzeuge, Skills, Plugins, Connectors (geprüft 26.11.2026)

Legende: ✅ einsatzbereit · 🔑 vorhanden, Anmeldung/Konto nötig · ➕ optional, Inhaber installiert per Karte · ❌ bewusst nicht

## Kern: Higgsfield-Connector ✅
| Aufgabe | Werkzeug / Workflow |
|---|---|
| Persona entwerfen | `ai_influencer_get_options`, `ai_influencer_list_presets`, `ai_influencer_prepare` → `ai_influencer_generate` |
| Character Sheet (vorn/hinten/Porträt, Outfits) | Workflow `character-sheet` (Stil „Realism“) |
| Gesicht festhalten | Elements (`elements_create`, `<<<ID>>>` im Prompt), Soul ID (Training in der Higgsfield-Oberfläche), Modell `soul_2` mit `soul_id` |
| Fotos | `gpt_image_2_6`, `nano_banana_pro` (bis 14 Referenzen), `soul_2` (UGC-Look), `nano_banana_2_1` (Inpainting mit Maske), `flux_3_image` |
| Upscale / Format | `upscale_image`, `reframe`, `outpaint_image` |
| Reels aus Standbild | `seedance_2_5` (start_image), `kling3_0`, `cinematic_studio_3_0` |
| Sprechende Clips | `intone` + `create_voice` |
| UGC-Formate (Fit-Check/Try-on, Tutorial = Rezept Schritt für Schritt) | Workflow `ugc-video` |
| Kleidung/Supplements als Produktfoto, virtuelles Model | Workflow `product-photoshoot` |
| Clips schneiden, Musik, Untertitel | Workflows `video-montage`, `video-editing`, Editing Room |
| Soundeffekte | Workflow `video-sound-design` |
| Reel-Cover | Workflow `thumbnail-generation` |
| Mehrsprachig (später EN-Account) | Workflow `creator-dub` |
| TikTok posten + Trend-Musik | `tiktok_connect`, `tiktok_prepare_publish`, `tiktok_music_trending` |
| Viralität vorab schätzen | `virality_predictor` (nur als Hinweis) |

## Skills im Repo ✅
- Eigene: `influencer-prompt`, `influencer-redaktion`
- Marketing: `social` (Plattform-Taktik, Hooks, Carousels), `video` (Kurzvideo-Skripte), `copywriting`, `copy-editing` (KI-Floskeln entfernen), `marketing-psychology`, `content-strategy` über `social`, `ab-testing` (Hook-Tests), `pricing`/`offers` (eigenes E-Book), `launch`, `community-marketing`, `customer-research` (Kommentare/Reddit auswerten), `competitor-profiling` (andere Fitness-Creatorinnen)
- Plugin-Skills im Konto: `postiz` (planen/posten), `windsor-ai:instagram`, `windsor-ai:tiktok-organic`, `windsor-ai:social-media-insights`, `windsor-ai:social-media-create`, `small-business:social-content-engine`, `small-business:content-strategy`, `marketing:content-creation`, `canva:*`

## Konten / Anmeldungen 🔑
| Dienst | Wofür | Status |
|---|---|---|
| Higgsfield bezahlter Plan | Soul ID, kommerzielle Nutzung | prüfen mit `show_plans_and_credits` |
| Postiz | Instagram/TikTok planen | Konto + API-Key anlegen |
| Windsor.ai | Instagram- und TikTok-Zahlen | Accounts verbinden, sobald angelegt |
| Canva (Plugin + Connector) | Text-Overlays für Carousels, Mediakit | in claude.ai anmelden |
| Instagram App „Edits“ / CapCut | Feinschnitt, Musik aus Plattform-Bibliothek | auf dem Handy des Inhabers |

## Optional ➕ (Karten wurden angezeigt; vor Nutzung vollständig lesen)
- Plugin „image-generation“ – Prompting-Leitfaden für Bildmodelle
- Plugin „instagram“ – Kommentare/DMs über die offizielle Graph API (Antworten nur nach Freigabe)
- Plugin „Social Media Skills“ – 106 Skills, viele US-Taktiken → deutsches Recht hat Vorrang
- Plugin „Canva“, Connector „vidIQ“ (Trend-/Outlier-Recherche auch für Instagram/TikTok)

## Bewusst nicht ❌
Warm-up-Dienste mit Fremd-Handys/SIM-Karten, Anti-Detect-Browser, Follow-/Like-/Kommentar-Bots, gekaufte Follower, Reposting fremder Inhalte, Tools für sexuell explizite Inhalte, Umleitungs-Funnels zu Erotik-Plattformen.
