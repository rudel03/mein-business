# Spielerischer Planer – Konzept und Prüfung

Stand 04.11.2026. Ziel: Der Planer soll Spaß machen, seinen Nutzen sofort zeigen und so zum Kauf von Plus führen, **ohne** Druck, Täuschung oder Schuldgefühle (UWG, § 5a, DSA Art. 25, Projektregeln).

## Grundidee
Das Spielerische entsteht aus **echtem Nutzen, den man sieht**, nicht aus Punkten um der Punkte willen. Drei Momente tragen alles:

1. **Der Treffer-Zähler.** Während man Geräte, Ernährung und Allergien ankreuzt, zählt eine große Zahl live mit: „59 Rezepte passen zu deiner Küche“. Darunter der nächste sinnvolle Schritt: „Mit Pfanne kämen 23 dazu.“ Das ist der eine auffällige, bewegte Moment (die Zahl rollt bei jeder Änderung). Er beantwortet die Kernfrage jeder Marke: Was geht mit dem, was dasteht?
2. **Die Wochenkarte.** Der Plan zeigt Fotos statt Textlisten. An jedem Gericht drei Knöpfe: **Merken** (Herz, der Planer nimmt gemerkte Gerichte öfter), **Tauschen** (neuer Plan ohne dieses Gericht), **Gekocht** (zählt fürs Küchenbuch).
3. **Das Küchenbuch.** Gekochte Gerichte sammeln sich: wie viele der 195 Rezepte entdeckt sind, Abzeichen für echte Taten (erster Teller, fünf verschiedene Gerichte, ohne Herd gekocht, vorgekocht …), die gemerkten Lieblinge. Alles bleibt auf dem Gerät.

Dazu: Fortschrittsbalken beim Abhaken der Einkaufsliste („9 von 14 im Wagen“) und eine **ehrliche Vorschau** für Gratis-Nutzer: Die übrigen Tage der Woche werden mit Foto und Namen gezeigt, Rezepte, Einkauf und Vorkoch-Ablauf dafür gibt es mit Plus.

## Gestaltung
- Die vier Marken behalten ihre Farben und Schriften (Markenbücher). Neu ist nur der Treffer-Zähler als markantes Element: große Ziffern in der Markenschrift über dem Markenband.
- Bewegung nur als Antwort auf eine Handlung (Zahl rollt, Herz füllt sich, Abzeichen erscheint) und nie bei `prefers-reduced-motion`.
- Fotos klein (240 × 180) für die Wochenkarte, groß nur im Rezept.

## Prüfung gegen Dark Patterns (selbst geprüft, vor dem Bau)
| Muster | Bei uns? | Warum nicht |
|---|---|---|
| Künstliche Knappheit, Countdown | nein | keine Fristen, keine „nur heute“-Angebote |
| Verlustangst, Serien-Druck („Serie verloren!“) | nein | keine Tages-Serien, nichts verfällt, kein Hinweis auf Verpasstes |
| Beschämen beim Ablehnen | nein | Plus-Hinweis ohne „Nein, ich will nicht sparen“-Knopf, Gratis-Tag bleibt voll nutzbar |
| Versteckte Kosten | nein | Preis und Probezeit stehen am Plus-Hinweis |
| Erfundene Zahlen oder Kundenstimmen | nein | Zähler und Statistik kommen aus den echten Rezeptdaten bzw. aus dem, was der Nutzer selbst abhakt |
| Euro- oder Spar-Versprechen | nein | gesperrt bis Kassenbon-Test, Küchenbuch zählt Gerichte, nicht Euro |
| Daten für Gamification an Dritte | nein | alles im localStorage, löschbar unter Datenschutz |

## Alternativen (verworfen)
- Punkte und Ranglisten mit anderen Nutzern: bräuchte Konto und Server, widerspricht „ohne Konto“.
- Tägliche Erinnerungen per Push: nervt, braucht Einwilligung, wenig Nutzen.
- Glücksrad für Rabatte: Rabattcodes sind für Abos rechtlich möglich, wirken aber billig; bei den E-Book-Projekten gilt ohnehin Buchpreisbindung. Nicht nötig.
