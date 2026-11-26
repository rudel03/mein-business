# KI-Influencerin – Projektgedächtnis

Wird beim Start jeder Sitzung zu diesem Projekt gelesen. Übergreifende Regeln: `../CLAUDE.md`. Start-Prompt für neue Sitzungen: `START-PROMPT.md`.

## Ziel
Eine fotorealistische, klar als KI gekennzeichnete Influencerin auf Instagram (+ TikTok) aufbauen. Der Inhaber gibt kurze Beschreibungen, Claude erstellt detaillierte Prompts, Bilder, Videos, Captions, Pläne und Auswertungen. Möglichst viel Automatisierung, ohne Qualität zu verlieren und ohne gegen Plattformregeln zu verstoßen.

## Stand (26.11.2026)
- System angelegt: Recherche, Account-Aufbau, Content-Strategie, Prompt-System, Recht, Workflow, Skills `influencer-prompt` + `influencer-redaktion`.
- **Offen (nächste Schritte, in dieser Reihenfolge):**
  1. ~~Nische entscheiden~~ → **Entschieden 26.11.2026: Frau, „High-Protein-Küche + Gym-Alltag + Athleisure/Mode“** (Details `system/03-content-strategie.md`, Abschnitt „Gewählte Nische“). Offen: Grundtyp/Aussehen der Persona.
  2. Persona anlegen (`system/06-workflow.md`): AI Influencer Builder → Element → 30 Porträts → Soul ID → Identitätsblock in `persona/PERSONA.md`.
  3. Benutzername prüfen, E-Mail anlegen.
  4. 12 Feed-Posts + 10 Stories vorproduzieren.
  5. Account anlegen, Label an, Aufwärmen Tag 1 (`system/02-account-aufbau.md`).
  6. Optional: Postiz-Konto (Planen/Posten), Windsor.ai mit Instagram/TikTok verbinden, Canva anmelden.
- Phase: **0 – Vorbereitung**. Start-Datum Account: –

## Entscheidungen
- Transparenz statt Versteckspiel: Label „AI-generated profile“ ab Tag 1, KI-Hinweis in der Bio (Instagram drosselt sonst die Reichweite; EU AI Act Art. 50).
- Engagement bei anderen (Folgen/Liken/Kommentieren) macht der Inhaber von Hand. Keine Bots, keine Warm-up-Dienste, kein VPN.
- Higgsfield als einziges Generierungswerkzeug (Repo-Regel). Konsistenz über Element + Soul ID + Identitätsblock.

## Fallstricke
- Gym-Nische: keine Transformationen, keine Wirkversprechen zu Supplements (Health-Claims-VO), keine erfundenen Trainingserfolge. Nicht sexualisieren (Reichweite + falsche Zielgruppe).
- Mode verkaufen: Kleidung im Bild muss dem echten Produkt entsprechen → immer Produktfotos als Referenz.
- Warm-up-Zahlen und Tageslimits in Blogs stammen von Anbietern, nicht von Instagram. Wir bleiben deutlich darunter.
- Soul ID ist nicht exportierbar (an Higgsfield gebunden).
- Element-Platzhalter nur als `<<<UUID>>>` im Prompt, nicht `@name`. Kling 3.0 braucht zusätzlich ein Startbild.
- Text nie im Generator erzeugen, sondern nachträglich (Canva/Edits/CapCut).
- TikTok-Supportseite ist nur per JavaScript lesbar; Regeln über Sekundärquellen bestätigt.
