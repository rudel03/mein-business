# Qualitätscheck (vor jeder Vorlage an den Inhaber)

Bild in voller Größe **und** als Thumbnail ansehen. Thumbnail-Fehler sind meist Komposition/Licht/Farbe, Vollbild-Fehler meist Textur/Anatomie/Text.

| # | Prüfen | Durchgefallen wenn | Erste Korrektur |
|---|---|---|---|
| 1 | Identität | Augenform, Nase, Muttermal, Haaransatz, Augenfarbe weichen ab | Element/Soul-ID prüfen, Identitätsblock wortgleich, kreativen Teil kürzen |
| 2 | Hände | ≠ 5 Finger, verschmolzen, Gelenke falsch, Ring im Finger | Pose vereinfachen oder Ausschnitt ändern (Hände raus oder groß) |
| 3 | Text & Logos | lesbare/falsche Schrift, Marken auf Tasse/Shirt/Schild | `no text, no logos`, Hintergrund vereinfachen |
| 4 | Licht | Schatten in verschiedene Richtungen, Gesicht heller als die Lichtquelle erlaubt | eine Lichtquelle mit Richtung benennen |
| 5 | Haut | wachsig, glänzend, oder Poren wie Tapete | Hauttext an Bildgröße anpassen (siehe SKILL.md) |
| 6 | Physik | Gegenstände schweben, Getränk falsch, Spiegelbild stimmt nicht, Schmuck asymmetrisch unpassend | Szene vereinfachen, „contact shadow“ |
| 7 | Hintergrund | verzerrte Gesichter, doppelte Stuhlbeine, unlogische Architektur | Hintergrund unscharf / weniger Personen |
| 8 | Kontinuität | Outfit/Ort/Jahreszeit widerspricht LOG.md oder Story | Prompt anpassen |
| 9 | Zu perfekt | symmetrisch, makellos, Stockfoto-Look | 1 Imperfektion ergänzen, Handy-Gattung statt „portrait“ |
| 10 | Plattform | Nacktheit/Anzüglichkeit, gefährliche Handlung, Waffen, Alkohol prominent | Neu planen |

Vorgehen bei Fehlern: **eine Variable pro Versuch** ändern, Versuch benennen („v2: Licht“). Nach 3 Versuchen Modell oder Methode wechseln (Element ↔ Soul ID ↔ Nano Banana Pro). Kleine Fehler lokal bearbeiten (Inpainting mit Maske bei `nano_banana_2_1`) statt neu würfeln.
