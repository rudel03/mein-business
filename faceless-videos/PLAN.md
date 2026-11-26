# Faceless-Videos – Gesamtplan

## 1. Die automatische Kette (pro Video)

| Schritt | Was passiert | Werkzeug | Kosten |
|---|---|---|---|
| 1. Thema | Nächstes Thema aus `skripte/themen.md` nehmen | Claude | – |
| 2. Skript | Hook (erste 2 s), 60–110 Wörter Sprechertext, Quelle, Caption, Hashtags, Titel | Claude | – |
| 3. Bilder | 5–7 Szenenbilder 9:16 im festen Kanal-Stil | Higgsfield `gpt_image_2_5` (Batch ≤ 8) | Credits |
| 4. Stimme | Sprechertext als deutsche KI-Stimme | Higgsfield `generate_audio` | Credits |
| 5. Schnitt | Bilder mit langsamem Zoom/Schwenk auf Länge der Stimme, Übergänge, Musik leise | ffmpeg im Container | 0 |
| 6. Untertitel | Wort-für-Wort-Untertitel groß in der Mitte, eingebrannt | ffmpeg (ASS-Untertitel) | 0 |
| 7. Prüfung | Automatische Checkliste: Länge, Lautstärke, Format 1080×1920, Faktenquelle vorhanden, keine verbotenen Aussagen | Skript + Claude | 0 |
| 8. Posten | Hochladen, KI-Label, zu fester Uhrzeit auf YT/IG/TikTok planen | Postiz | Abo |
| 9. Lernen | Nach 7 Tagen Zahlen holen, gute Hooks/Themen merken | Postiz-Statistik | 0 |

Vollautomatik: eine **geplante Aufgabe** startet z. B. täglich eine frische Claude-Sitzung, die Schritte 1–9 abarbeitet, in `CLAUDE.md`/`ausgabe/log.md` protokolliert und pusht.

## 2. Nische – **entschieden: „Business-Modelle leicht erklärt“** (26.11.2026)

Format: eine Frage als Hook („Warum verdient Costco fast nichts an seinen Produkten?“), 3–4 Schritte Erklärung, eine überraschende Pointe, Frage an die Zuschauer. Themenvorrat: `skripte/themen.md`.

Ursprüngliche Vorschläge (zur Einordnung):

Kriterien: auf Deutsch wenig Konkurrenz mit guter Qualität, gut mit KI-Bildern darstellbar, unbegrenzt Themen, rechtlich unkritisch, später monetarisierbar.

| Nische | Warum | Risiko |
|---|---|---|
| **Geschichte in 30 Sekunden** („Was wirklich geschah …“) | Sehr bildstark, endlos Themen, hohe Watchtime | Fakten sauber belegen |
| **Psychologie-Fakten / Alltagspsychologie** | Hohe Teilen-Rate, breite Zielgruppe | Nichts Medizinisches versprechen (HWG), belegte Studien |
| **Mysterien & ungelöste Fälle** | Starke Hooks, Serienpotenzial | Keine realen Opfer/Verbrechen reißerisch, Persönlichkeitsrechte |
| **Tiere & Natur – kuriose Fakten** | Familienfreundlich, werbefreundlich | Mehr Konkurrenz (meist Englisch) |
| **Küchenwissen / Lebensmittel-Fakten** | Passt später zu Essensplaner & E-Books | Keine Gesundheitsversprechen |

Nicht empfohlen: Finanzen/Krypto (Haftung, Anlageberatung), Promi-Gerüchte, Gesundheit/Abnehmen (HWG), Nachrichten.

## 3. Einmalige Einrichtung (Inhaber, mit Anleitung)

1. Eigene E-Mail-Adresse für den Kanal anlegen.
2. Kanalname festlegen und auf YouTube, Instagram, TikTok prüfen (gleicher Name überall).
3. **YouTube:** Google-Konto → Kanal mit Kanalnamen anlegen → Telefon bestätigen (für längere Videos/eigene Thumbnails).
4. **Instagram:** Konto anlegen → in **Creator- oder Business-Konto** umstellen (Pflicht für Postiz). Hinweis: Instagram verlangt dafür heute keine Facebook-Seite mehr, Postiz bietet „Instagram (Standalone)“.
5. **TikTok:** Konto anlegen, Geburtsdatum korrekt, später Business-Konto möglich.
6. **Postiz** (postiz.com) anmelden, Tarif mit 3+ Kanälen wählen, die drei Konten verbinden.
7. In Postiz unter Einstellungen einen **API-Key** erzeugen. Claude fordert ihn über das sichere Formular an (nie in den Chat einfügen).
8. Impressum: Bei geschäftlichen Kanälen in DE Pflicht (§ 5 DDG) → Link in Bio auf Impressumsseite.

## 4. Recht & Plattformregeln
- **KI-Kennzeichnung** setzen: YouTube („veränderte oder synthetische Inhalte“), TikTok („KI-generiert“), Instagram („KI-Info“). Zusätzlich Art. 50 KI-VO.
- Keine unbelegten Fakten, keine Heil-/Abnehmversprechen, keine erfundenen Zahlen.
- Musik nur lizenzfrei bzw. aus den plattformeigenen Bibliotheken.
- YouTube-Monetarisierung: Variation und echter Mehrwert pro Video, keine Kopien desselben Musters.

## 5. Rhythmus
- Woche 1–2: 1 Video/Tag, Ergebnisse jeden Abend prüfen (Qualität, Fehler).
- Danach: Vollautomatik 1–2 Videos/Tag, wöchentliche Auswertung.
- Posting-Zeiten anfangs 18:00 Uhr (DE), später nach Zahlen anpassen.
