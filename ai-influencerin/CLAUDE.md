# KI-Influencerin – Projektgedächtnis

Wird beim Start jeder Sitzung zu diesem Projekt gelesen. Übergreifende Regeln: `../CLAUDE.md`. Start-Prompt für neue Sitzungen: `START-PROMPT.md`.

## Ziel
Eine fotorealistische, klar als KI gekennzeichnete Influencerin auf Instagram (+ TikTok) aufbauen. Der Inhaber gibt kurze Beschreibungen, Claude erstellt detaillierte Prompts, Bilder, Videos, Captions, Pläne und Auswertungen. Möglichst viel Automatisierung, ohne Qualität zu verlieren und ohne gegen Plattformregeln zu verstoßen.

## Stand (26.11.2026)
- System angelegt (ergänzt um `system/07-aufbau-playbook.md` = Fallstudien, Algorithmus 2026, Wochenrhythmus, Content-Ideen, Storyline; `system/08-werkzeuge.md` = alle Tools/Skills/Plugins; `system/09-profi-wissen.md` = 12 Fehler, Algorithmus, Maße, Formate, Routinen, Checkliste vor jedem Post, KI-/Werbekennzeichnung nach Wettbewerbszentrale/ZAW/Medienanstalten): Recherche, Account-Aufbau, Content-Strategie, Prompt-System, Recht, Workflow, Skills `influencer-prompt` + `influencer-redaktion`.
- **Offen (nächste Schritte, in dieser Reihenfolge):**
  1. ~~Nische entscheiden~~ → **Entschieden 26.11.2026: Frau, „High-Protein-Küche + Gym-Alltag + Athleisure/Mode“** (Details `system/03-content-strategie.md`, Abschnitt „Gewählte Nische“). Offen: Grundtyp/Aussehen der Persona.
  2. Persona anlegen (`system/06-workflow.md`, mit echten Tool-Schritten): Projektordner → 3 Character Sheets (tier normal!) → Element → 20 Trainingsbilder → Soul ID (`show_characters` train) → Identitätsblock → Testshooting.
  3. Benutzername prüfen, E-Mail anlegen.
  4. 30–40 Inhalte vorproduzieren (12 Raster-Posts, ~10 Reels, ~15 Stories).
  5. Account anlegen, Label an, Aufwärmen Tag 1 (`system/02-account-aufbau.md`).
  6. Optional: Postiz-Konto (Planen/Posten), Windsor.ai mit Instagram/TikTok verbinden. ✅ Canva-Connector verbunden (26.11.2026).
- ✅ Higgsfield: **Plus-Plan, 1.000 Credits** (geprüft 26.11.2026). Kein Blocker mehr. Credits sparsam: Persona + Trainingsset + erste Bilder zuerst, Videos später.
- Aussehen entschieden (26.11.2026): Name = Platzhalter „[Name]“, lange dunkelbraune Haare, sportlich-natürlich, Köln-Ehrenfeld, **kein Wiedererkennungsmerkmal** (weder Narbe noch Muttermal/Grübchen). Später geändert: **19 Jahre (klar erwachsen), Russin, süß, zierlich 1,60 m**, Figur siehe PERSONA.md. Danach geändert auf **ostasiatisch**, Make-up mit eigener Note, Sport-BH + Leggings. Character Sheets Runde 1–5 gelaufen (Stand ~971 Credits). Trick: Outfit über Stil-Referenz `item_medias` (siehe PERSONA.md). Danach Runden 6–8 (dunkle Haare, chinesische Model-Gesichter, Blondinen). D2 kurz gewählt (Element `d45ef319…`, überholt). Danach Albanerinnen direkt mit GPT Image 2.6. **FINAL gewählt: F3 (Albanerin, 19, dunkle Haare, kurvig; in Köln geboren, Familie aus dem Kosovo). Element `d5f71ebe-1744-41f9-84bd-595c2c73def1` (A4 erledigt).** Bildstil: GPT Image 2.6, 2k, quality high, unbearbeiteter Handy-Look. A5 erledigt (20 Trainingsbilder). **A6: Soul ID `85630d00-b8c2-4664-ba1d-5d1b2b6f1029` fertig (ready)**. A7 Identitätsblock erledigt. Läuft: A8 Testshooting Soul 2.0 vs. GPT 2.6. Guthaben 828,7. Keine realen Personen als Vorlage analysieren/nachbauen.
- Persona-Vorschläge (Steckbrief, Charakter, Kleiderschrank, Orte, Stimme, Baukasten-Einstellungen) sind in `persona/PERSONA.md` vorbereitet; Startvorrat 40 Inhalte in `content/plan/vorrat.md`, Rezepte in `content/rezepte.md`, Caption-/Hook-/Hashtag-Vorlagen in `content/vorlagen.md`, Kosten in `system/11-kosten.md`.
- Verbunden: Higgsfield, Canva, Windsor.ai, Shopify. Keine zusätzlichen Plugins aktiviert (nicht nötig für den Start).
- Phase: **0 – Vorbereitung**. Start-Datum Account: –
- **Modus A läuft (26.11.2026):** A0 erledigt (Guthaben 1.000, Higgsfield-Projekt „KI-Influencerin“ angelegt, folder_id `863d01bd-e756-40c7-9f8d-14845e0680c3`, steht in PERSONA.md). A1 (Briefing: Name, Haare, Typ, Stadt, Merkmal) an den Inhaber gestellt, Antwort offen. .de-Domains per RDAP frei: romyeats, romyprotein, miraprotein, nelekocht, nelefit (Instagram/TikTok-Handles muss der Inhaber in der App prüfen).

## Entscheidungen
- **Kennzeichnung: offen** (Entscheidung des Inhabers 26.11.2026: vorerst keine KI-Kennzeichnung erstellen). Produktion läuft ohne Kennzeichnung. Vor dem ersten Veröffentlichen entscheidet der Inhaber; Claude fasst dann einmal die Rechtslage zusammen (Instagram drosselt unmarkierte KI-Profile; Art. 50 KI-VO seit 02.08.2026, Bußgeld/Abmahnung möglich; Details `system/05-recht.md`, `09` F). Unabhängig davon: Die Figur behauptet nie, ein Mensch zu sein, und antwortet auf „Bist du echt?“ ehrlich.
- Recherche-Empfehlung (falls Kennzeichnung gewählt): Profil-Label „AI-generated profile“ + Bio „KI-Figur“ + „KI“-Kürzel/EU-Icon im Bild bzw. am Reel-Anfang.
- Engagement bei anderen (Folgen/Liken/Kommentieren) macht der Inhaber von Hand. Keine Bots, keine Warm-up-Dienste, kein VPN.
- Higgsfield als einziges Generierungswerkzeug (Repo-Regel). Konsistenz über Element + Soul ID + Identitätsblock.

## Fallstricke
- Higgsfield-Baukasten: `ai_influencer_prepare` mit `randomize:false` braucht explizit `tier:"normal"`; `fn_mole` + `fn_freckles` gleichzeitig → Fehler. Videos sind teuer (Seedance 1080p ~80 Credits/5 s), Kling std ~7,5 → `system/11-kosten.md`.
- **Kein Facebook-Profil für die Persona** und keine FB-Verknüpfung (dokumentierte Komplettsperrung, `system/10-praxis-von-betreibern.md`). Guru-Taktiken wie SIM-/IP-Farmen, Metadaten entfernen, Link-Tarnung sind ausgeschlossen.
- Originalitätsregel Instagram (seit 30.04.2026): keine fremden Inhalte reposten, sonst keine Empfehlungen (bewertet über 30 Tage).
- **Fansly verbietet fotorealistische KI-Inhalte, auch mit Label** (Help-Artikel 08.07.2026: https://help.fansly.com/en/articles/12315578-ai-generated-content-on-fansly). Fanvue erlaubt realistische KI-Figuren mit klarer Kennzeichnung + KYC des Inhabers (https://help.fanvue.com/en/articles/9538738-is-ai-content-allowed-on-fanvue, Stand 16.10.2026).
- Higgsfield verbietet sexuell explizite Inhalte (Nutzungsbedingungen, Abschnitt 5) → Claude erstellt nur SFW-Content.
- Instagram: Link/Verweis auf Erotik-Abo-Seiten + anzüglicher Content wird als „sexual solicitation“ gewertet (Sperrrisiko). JMStV § 6: Werbung für pornografische Angebote nur unter denselben Bedingungen wie das Angebot selbst (Altersverifikation) → nicht auf Instagram bewerben.
- Erotik-Konto würde Supplement-/Mode-Kooperationen und die Verbindung zu eigenen Marken (Essensplaner, Honigmama) gefährden → Entscheidung des Inhabers offen.
- Gym-Nische: keine Transformationen, keine Wirkversprechen zu Supplements (Health-Claims-VO), keine erfundenen Trainingserfolge. Nicht sexualisieren (Reichweite + falsche Zielgruppe).
- Mode verkaufen: Kleidung im Bild muss dem echten Produkt entsprechen → immer Produktfotos als Referenz.
- Warm-up-Zahlen und Tageslimits in Blogs stammen von Anbietern, nicht von Instagram. Wir bleiben deutlich darunter.
- Soul ID ist nicht exportierbar (an Higgsfield gebunden).
- Element-Platzhalter nur als `<<<UUID>>>` im Prompt, nicht `@name`. Kling 3.0 braucht zusätzlich ein Startbild.
- Text nie im Generator erzeugen, sondern nachträglich (Canva/Edits/CapCut).
- TikTok-Supportseite ist nur per JavaScript lesbar; Regeln über Sekundärquellen bestätigt.
