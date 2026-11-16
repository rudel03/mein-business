# Wochenbon – Gestaltung und Bedienung

Stand 04.11.2026. Grundlage: `recherche/14_Eine_Ausrichtung.md` (eine Marke, Discounter-Wochenplan für alle). Ersetzt die vier Nischen-Stile.

## Idee in einem Satz
Wochenbon zeigt die Woche als **Kassenbon, bevor man einkauft**: links die Gerichte als große Fotos, rechts bzw. im zweiten Reiter der Bon mit jeder Packung und dem geschätzten Betrag.

## Farben
| Name | Hex | Rolle |
|---|---|---|
| Tinte | `#1A2238` | Text, Navigationsleiste |
| Papier | `#FFFFFF` | Bon, Karten |
| Grund | `#ECEFF4` | Hintergrund der App (kühles Grau, kein Creme) |
| Violett | `#5634E8` | Marke, Hauptknöpfe, aktive Auswahl |
| Preisschild | `#FFE14D` | nur für den Betrag auf dem Bon und das Plus-Schild |
| Frisch | `#128A5C` | erledigt, im Wagen |

## Schrift
- **Bricolage Grotesque** (800/700) für Überschriften, Tageszahlen und den Bon-Betrag. Leicht eigenwillige Form, passt zu gedrucktem Kassenzettel und Preisschild.
- **Atkinson Hyperlegible** (400/700) für alles andere, gut lesbar beim Einkaufen mit einer Hand.

## Bedienung (neu)
- **Kein Formular.** Der Plan steht beim Öffnen. Oben eine Zeile mit vier Schaltern: **Küche**, **Personen**, **Laden**, **Essen**. Jeder öffnet ein Blatt von unten mit großen Antippflächen; jede Wahl plant sofort neu.
- **Küche** bietet fertige Situationen statt Geräte-Listen: „Normale Küche“, „Herd ohne Ofen“, „Airfryer-Küche“, „Nur Wasserkocher und Mikrowelle“, „Camper mit Gasherd“. Einzelne Geräte nur darunter, für wer will.
- **Woche:** Tagesleiste zum Antippen oder Wischen, je Tag große Fotokarten. Pro Gericht zwei Knöpfe: Tauschen, Gekocht.
- **Einkauf:** der Bon. Abhaken mit Fortschritt, Summe auf dem gelben Preisschild.
- **Untere Leiste** wie in einer App: Woche, Einkauf, Küchenbuch.
- **Gratis:** ein Tag ganz, die anderen Tage sichtbar mit Foto und Name, Rezept und Einkauf dafür mit Plus.

## Landingpage
Eine Seite statt vier. Oben links die Frage „Weißt du, was deine Woche kostet?“, rechts ein echter Beispiel-Bon, den man mit Personen und Laden umschaltet. Euro-Beträge erscheinen dort erst, wenn `preiseInWerbung` in `config.js` auf `true` steht (nach dem Kassenbon-Test, Claim-Freigabe). Bis dahin zeigt der Bon Mengen und „Preis je Laden im Planer“.

## Selbstprüfung gegen Standard-Muster
- Kein Creme-Hintergrund, kein Terrakotta, kein Schwarz mit Neon: kühles Grau, Tinte, Violett.
- Das eine auffällige Element ist der Bon mit Zackenrand und gelbem Preisschild. Alles andere bleibt ruhig.
- Keine Großbuchstaben-Etiketten, keine Pfeile in Knopftexten, Nummern nur bei „So geht’s“ (echte Abfolge).
- Bewegung nur als Antwort: Bon „druckt“ beim Umschalten (abschaltbar per reduzierter Bewegung).
