# UGC-Video 01 – „3 Hip-Thrust-Fehler“ (Produktionsbuch)

Format: Reel/TikTok 9:16, 1080×1920, **ca. 33 s** · Säule: Gym-Alltag (Mehrwert) · Status: ☐ Freigabe Produktionsbuch
Ziel-Signal: **Speichern + Teilen** (Tutorial zum Nachschlagen beim nächsten Leg Day).

---

## 1. Idee in einem Satz
Sie sitzt nach ihrem Satz an der Bank, zeigt **erst den Fehler, dann die richtige Ausführung**, direkt nebeneinander. Man **sieht** jede Korrektur am Körper, statt sie nur zu hören.

## 2. Inhalt fachlich (Mehrwert, geprüft)
| Fehler | Was man sieht | Korrektur | Warum (für die Bildunterschrift) |
|---|---|---|---|
| 1 · Kopf in den Nacken | Blick zur Decke, Rippen gehen hoch, unterer Rücken hohl | Kinn leicht zur Brust, Blick nach vorn zum Knie, Kopf bewegt sich **mit** dem Oberkörper | Kopf und Rippen ziehen den unteren Rücken ins Hohlkreuz |
| 2 · Füße falsch | Füße zu nah am Po: Knie weit vor den Zehen. Zu weit: Beine fast gestreckt | Füße hüftbreit, Zehen leicht nach außen, **oben Schienbeine senkrecht** (Knie über dem Sprunggelenk) | Zu nah = vorderer Oberschenkel übernimmt, zu weit = Beinrückseite |
| 3 · Oben Hohlkreuz | Hüfte wird über die Linie hochgedrückt, Bauch hängt durch | Oberkörper oben parallel zum Boden, Becken leicht nach hinten kippen, Po anspannen, **1 Sek. halten**, kontrolliert runter | Die Endposition kommt aus dem Po, nicht aus dem unteren Rücken |
| Bonus (Outro) | – | Jede Woche ein bisschen mehr (Gewicht oder Wiederholungen) | Progressive Überlastung, ohne Erfolgsversprechen |

Rechtlich sauber: keine Heil- oder Ergebnisversprechen („runder Po in 4 Wochen“ o. Ä.), keine Diagnose („Rückenschmerzen“), nur Technikhinweise.

## 3. Feste Bild-Bibel (für ALLE Shots identisch, sonst springt es im Schnitt)
- **Person:** Identitätsblock FINAL aus `persona/PERSONA.md`. Haare: hoher Pferdeschwanz, ein paar lose Strähnen, leichter Glanz auf der Stirn (nach dem Training).
- **Outfit:** eng anliegendes schwarzes Langarm-Shirt mit **hohem Rundhals**, nahtlos, endet an der Taille. Dunkelgraue High-Waist-Leggings ohne Logo, weiße Socken, schwarze flache Trainingsschuhe. Eng genug, dass Hüfte, Po und Beine die Bewegung klar zeigen. Kein Ausschnitt, nichts Freizügiges (Instagram-Empfehlungsregeln).
- **Gerät:** schwarze gepolsterte Flachbank, Längsseite an einer Wand bzw. einem Rack (kann nicht wegrutschen). Olympia-Langhantel 20 kg mit **2 × 15-kg-Bumper-Plates (schwarz, Gummi)** = 50 kg, dickes schwarzes Hip-Thrust-Polster über der Hüftbeuge. Schwarze Gummimatten auf dem Boden.
- **Ort:** modernes, gepflegtes Gym in Köln, später Nachmittag. Große Fensterfront links (weiches Tageslicht), dazu neutralweiße LED-Panels an der Decke. Im Hintergrund unscharf: Kabelzug, Kurzhantelablage, 2–3 Leute trainieren.
- **Kamera:** Ihr eigenes Handy auf einem kleinen Bodenstativ, **statisch**, 9:16. Nur Shot D steht tiefer und frontaler. Leichtes Handy-Rauschen, keine Kinoschärfe, kein Hautweichzeichner.
- **Ton im Clip:** echte Gym-Atmosphäre (Hanteln klappern, Scheibe auf Gummiboden, Kabelzug, leise gedämpfte Musik aus Deckenlautsprechern, Stimmen in der Ferne), ihr Atmen bei der Wiederholung. **Keine** Musik und **kein** Text erzeugen lassen.

## 4. Shotliste mit Seedance-Prompts
Modell: `seedance_2_5`, `omni_reference`, `generate_audio: true`, 9:16. Entwurf 480p, final 720p.
Startbild je Shot: Soul 2.0 + Soul ID mit derselben Bild-Bibel. **Nie** „phone video frame / front camera“ schreiben, sonst malt das Modell eine Kamera-Oberfläche ins Bild.

### Shot A · HOOK · 0,0–3,5 s · Seite · sie spricht
**Bild:** Seitenansicht in Hüfthöhe, ca. 1,8 m entfernt, Bank links, ihr Kopf rechts im Bild. Sie ist oben in der Bewegung und macht es **falsch**: Kopf im Nacken, Blick zur Decke, Rippen hoch. Sie senkt die Hantel ab, dreht den Kopf zur Kamera und spricht.
**Gesprochen:** „Du spürst Hip Thrusts nur im unteren Rücken? Stopp.“
```
Static vertical smartphone shot on a small floor tripod, side view at hip height, about 1.8 m away, in a bright modern gym in Cologne late afternoon, soft window light from the left and neutral white ceiling LED panels, black rubber floor. A 19-year-old Albanian woman, clearly an adult, long dark brown hair in a high ponytail with loose strands, light olive skin with a light post-workout sheen, wearing a fitted black long-sleeve top with a high round neckline and dark grey high-waisted leggings, white socks, flat black training shoes. Her upper back rests on the edge of a black padded flat bench placed against the wall, a barbell with two black 15 kg bumper plates and a thick black foam pad lies across her hip crease, feet flat on the floor. She is at the top of a hip thrust doing it wrong: head thrown back looking at the ceiling, ribs flared, lower back slightly arched. She lowers the bar under control, then turns her head to the camera and says in casual spoken German, slightly amused, native accent from Cologne: "Du spürst Hip Thrusts nur im unteren Rücken? Stopp." Accurate lip sync. Body proportions exactly as in the start frame, natural and unedited. Real gym ambience: plates clanking, a cable machine, muffled music from ceiling speakers, distant voices, her exhale. No music track, no subtitles, no text.
```

### Shot B · Versprechen · 3,5–7,0 s · halbnah frontal · sie spricht
**Bild:** Sie sitzt auf dem Boden, Rücken an der Bank, Hantel auf dem Schoß, Kamera auf Brusthöhe leicht schräg von vorn (wie im Testbild). Sie hebt **drei Finger** (Zeige-, Mittel- und Ringfinger) und nickt kurz.
**Gesprochen:** „Dann ist es fast immer einer von diesen drei Fehlern.“
```
Static vertical smartphone shot from the front, slightly to her right, at chest height, same gym, same light, same outfit. She sits on the rubber floor with her upper back against the black padded bench, the barbell with the foam pad resting across her hips, slightly out of breath, and talks straight into the camera like explaining something to a friend. She raises her hand and clearly shows exactly three fingers, index, middle and ring finger, thumb holding down the little finger, and gives a small nod. She says in casual German, quick and natural, stressing "drei": "Dann ist es fast immer einer von diesen DREI Fehlern." Accurate lip sync, natural blinking, small head movements. Gym ambience in the background, no music, no text.
```

### Shot C · Fehler 1 Kopf · 7,0–14,0 s · Seite · Off-Stimme
**Bild:** wie Shot A. **Wiederholung 1 falsch** (Kopf im Nacken, Blick nach oben), **Wiederholung 2 richtig** (Kinn zur Brust, Blick nach vorn zu den Knien, Kopf bewegt sich mit dem Oberkörper).
**Off-Stimme:** „Eins: Kopf im Nacken. Dann gehen deine Rippen hoch und du landest im Hohlkreuz. Kinn leicht zur Brust, Blick nach vorne, der Kopf geht einfach mit.“
```
Same side view, same gym, light, outfit and barbell setup as before. She performs two controlled hip thrust repetitions. Repetition one, wrong: she drives up while throwing her head back and looking at the ceiling, ribs flaring up. Repetition two, correct: chin slightly tucked toward her chest, eyes looking forward at her knees, her head and upper back move together as one unit, ribs down, hips rise until her torso is parallel to the floor, then lower slowly. Realistic weight and effort, the bar presses into the foam pad, her feet stay planted. She does not talk, only breathes audibly with each rep. Gym ambience: plates, cable machine, muffled music. No music track, no text.
```

### Shot D · Fehler 2 Füße · 14,0–21,0 s · tief schräg von vorn · Off-Stimme
**Bild:** Kamera tief auf dem Boden, schräg vorn auf Fußhöhe, Schienbeine und Knie groß im Bild, Hüfte und Gesicht dahinter sichtbar. Sie steht zuerst **zu nah** (Fersen fast am Po), rutscht dann mit den Füßen nach vorn, macht eine Wiederholung: oben **Schienbeine senkrecht**.
**Off-Stimme:** „Zwei: deine Füße. Zu nah, dann brennt vorne der Oberschenkel. Zu weit, dann die Rückseite. Oben müssen deine Schienbeine senkrecht stehen.“
```
Static vertical smartphone shot placed low on the rubber floor in front of her and slightly to the side, at foot level, her shins and knees large in the foreground, hips, torso and face visible behind them, same gym, light and outfit. She starts with her feet too close to her body, heels almost under her glutes, then slides both feet forward about one foot length to hip width with toes slightly turned out, and performs one controlled hip thrust: at the top her shins are vertical, knees stacked over ankles, torso parallel to the floor, short pause, then lowers. Natural effort, steady breathing, no talking. Gym ambience, a plate being racked nearby. No music, no text.
```

### Shot E · Fehler 3 Endposition · 21,0–28,0 s · Seite nah · Off-Stimme
**Bild:** Seitenansicht etwas näher (Hüfte bis Kopf). Sie geht **einmal zu hoch** ins Hohlkreuz, korrigiert direkt: Becken kippt nach hinten, Po angespannt, 1 Sekunde Halten (sichtbar), kontrolliert runter.
**Off-Stimme:** „Drei: oben nicht ins Hohlkreuz drücken. Becken leicht nach hinten kippen, Po fest anspannen, eine Sekunde halten und langsam runter.“
```
Closer static side view at hip height, framing from her knees to her head, same gym, light and outfit. At the top of a hip thrust she first pushes her hips too high so her lower back arches, then immediately corrects: she tilts her pelvis slightly backward, ribs down, chin tucked, squeezes her glutes hard, holds the top position still for one full second so the hold is clearly visible, then lowers the bar slowly and under control. The fitted leggings clearly show the hip and glute movement, body proportions natural and unedited. She exhales sharply at the top, no talking. Gym ambience, no music, no text.
```

### Shot F · Outro + CTA · 28,0–33,5 s · frontal nah · sie spricht
**Bild:** wie Shot B, etwas näher. Sie lacht, wischt sich mit dem Handrücken über die Stirn, schaut in die Kamera.
**Gesprochen:** „Und dann jede Woche ein bisschen mehr, Gewicht oder Wiederholungen. Speicher dir das für deinen nächsten Leg Day.“
```
Static vertical smartphone shot from the front at chest height, a little closer than before, same gym, light and outfit. She sits against the bench with the barbell across her hips, laughs briefly, wipes her forehead with the back of her hand, then looks straight into the camera and says in relaxed, warm, slightly faster casual German, stressing "jede Woche" and "speicher": "Und dann JEDE WOCHE ein bisschen mehr, Gewicht oder Wiederholungen. SPEICHER dir das für deinen nächsten Leg Day." At the end she gives a small smile and reaches toward the camera as if to stop the recording. Accurate lip sync, natural blinking. Gym ambience, no music, no text.
```

## 5. Stimme
- A, B und F sprechen **im Clip** (lippensynchron).
- C, D und E bekommen eine **Off-Stimme in derselben Stimme**. Dafür klone ich die Stimme aus dem besten gesprochenen Clip (`create_voice` aus dem Seedance-Ton; das ist eine KI-Stimme, keine reale Person). Damit erzeuge ich die drei Sätze locker, mit kurzen Stockern und Betonung.
- Plan B: ElevenLabs v4 mit der Stimme, die du ausgewählt hast, für alle Off-Stimmen.

## 6. Schnitt (ffmpeg bei mir, Feinschliff optional in CapCut)
| Zeit | Schnitt/Effekt | Text-Overlay (oben, Sicherheitszone ab 250 px) |
|---|---|---|
| 0,0 | Start **mitten in der falschen Wiederholung** (kein Vorlauf) | **„Hip Thrust nur im Rücken?“** |
| 1,8 | Zoom 100 → 112 % auf ihr Gesicht bei „Stopp“ + kurzer Ton-Stopp | – |
| 3,5 | harter Schnitt | **„3 Fehler“** |
| 7,0 | Rep 1 mit rotem ✕ in der Ecke, kurzes Standbild (0,4 s) am Fehler | **„1 · Kopf im Nacken“** ✕ |
| 10,5 | Rep 2 mit grünem ✓, Zoom auf Kopf/Kinn | **„Kinn zur Brust“** ✓ |
| 14,0 | Schnitt auf tiefe Kamera | **„2 · Füße“** |
| 18,0 | oben: Standbild + dünne weiße Hilfslinie Knie → Knöchel (senkrecht) | **„Schienbeine senkrecht“** ✓ |
| 21,0 | Hohlkreuz ✕, Korrektur ✓, Zeitlupe 0,7× beim 1-Sek.-Halten | **„3 · Oben 1 Sek. halten“** |
| 28,0 | Schnitt frontal | **„Jede Woche ein bisschen mehr“** |
| 31,0 | – | **„Speichern für Leg Day 🔖“** |
| 33,5 | letztes Bild passt zum Anfang → **Loop** | – |

- **Untertitel:** Wort für Wort, 2–4 Wörter pro Einblendung, weiße fette Schrift mit dunkler Kontur, Schlüsselwörter gelb (Kopf, Füße, Schienbeine, halten, speichern). Position Mitte unten, über der unteren Sicherheitszone (420 px frei).
- **Ton:** Gym-Atmo aus den Clips durchgehend (−22 LUFS unter der Stimme), Stimme auf −14 LUFS. Kurze Whoosh-Geräusche nur bei ✕/✓, sonst nichts. Musik später in der App aus der IG-Bibliothek (leise, 10–15 %).
- **Tempo:** Schnitt spätestens alle 2–3 s, keine Pause über 0,3 s zwischen Sätzen.
- **Cover (Titelbild):** Bild aus Shot E (Seitenansicht oben), Text „3 Hip-Thrust-Fehler“.

## 7. Caption (Copywriting)
> 3 Hip-Thrust-Fehler, wegen denen du sie nur im Rücken spürst 👇
>
> 1. Kopf im Nacken → Kinn zur Brust, Blick nach vorne
> 2. Füße zu nah/zu weit → oben Schienbeine senkrecht
> 3. Oben Hohlkreuz → Becken kippen, Po anspannen, 1 Sek. halten
>
> Und dann jede Woche ein bisschen mehr. Welcher Fehler war's bei dir: 1, 2 oder 3?
>
> #hipthrust #glutetraining #legday #gymtipps #gymalltag

- **Angehefteter Kommentar:** „Welche Übung soll ich als Nächstes zerlegen: RDL, Bulgarian Split Squat oder Kickbacks?“
- **Alt-Text:** „Junge Frau zeigt Hip Thrusts an der Hantelbank im Gym: drei typische Fehler und die richtige Ausführung.“
- **TikTok-Titel:** „3 Hip-Thrust-Fehler 🍑 #gymtok #hipthrust #legday“
- Kennzeichnung macht der Inhaber selbst.

## 8. Ablauf & Kosten (geschätzt)
1. 6 Startbilder mit Soul 2.0 (~6 Credits), vorher zur Freigabe zeigen.
2. 6 Seedance-Entwürfe in 480p (~150 Credits), Rohschnitt zur Abnahme.
3. Stimme klonen + 3 Off-Sätze (~5 Credits).
4. Final 720p nur für abgenommene Shots (~6 × 50 = ~300 Credits). Alternative: Entwürfe hochskalieren (günstiger, etwas weicher).
5. Schnitt, Untertitel, Overlays, Lautheit → fertiges MP4 1080×1920.

Guthaben vorher prüfen (zuletzt ~610 Credits).

## 9. Entwurf 1 (26.11.2026)
- Inhaber wollte nur **einen** Entwurf → ein Seedance-2.5-Clip mit 15 s und 5 Schnitten in einem Prompt (480p, Startbild `5edff574…`). Job `95559f81-1ddf-4df0-b413-4667ef353139`.
- Gesichtet (Standbilder): Hook seitlich ✓, Fußshot tief ✓, Halten oben ✓, Outro frontal mit Stirnwischen ✓. Abweichungen: **weiße statt schwarzer Schuhe**, seitliche Shots zeigen vor allem den Oberkörper (Hüfte/Po teils von der Hantel verdeckt) → beim nächsten Mal Kamera weiter weg und etwas höher, Schuhfarbe doppelt nennen.
- Ton und Lippensynchronität: Inhaber prüft.
