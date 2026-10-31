# Den Essensplaner auf deinem Computer testen – Schritt für Schritt

Dauer beim ersten Mal: etwa 15 Minuten. Du brauchst keine Programmierkenntnisse. Es kostet nichts, und nichts wird veröffentlicht: Der Planer läuft nur auf deinem Computer.

---

## Teil 1: Einmalig vorbereiten

### Schritt 1 – Node.js installieren
1. Öffne im Browser **https://nodejs.org**.
2. Klicke auf den großen grünen Knopf mit **„LTS“** (das ist die stabile Version).
3. Öffne die heruntergeladene Datei und klicke dich durch die Installation (immer „Weiter“ bzw. „Fortfahren“, am Ende „Fertig“).

### Schritt 2 – Die Dateien herunterladen
1. Öffne **https://github.com/rudel03/mein-business** und melde dich bei GitHub an.
2. Oben links steht ein Knopf mit dem Namen des Zweigs (meist **„main“**). Klicke darauf und wähle **`claude/magical-thompson-q4xhj0`**.
3. Klicke auf den grünen Knopf **„Code“** und dann auf **„Download ZIP“**.
4. Öffne deinen Ordner **Downloads** und entpacke die ZIP-Datei:
   - **Mac:** Doppelklick auf die Datei.
   - **Windows:** Rechtsklick → „Alle extrahieren“ → „Extrahieren“.
5. Es entsteht ein Ordner, z. B. `mein-business-claude-magical-thompson-q4xhj0`. Darin liegt `essensplaner`, darin `app`.

---

## Teil 2: Den Planer starten (jedes Mal, wenn du testen willst)

### Schritt 3 – Das Terminal im richtigen Ordner öffnen
- **Mac:**
  1. Öffne den Finder und gehe in den Ordner `essensplaner`.
  2. Klicke mit der rechten Maustaste auf den Ordner **`app`**.
  3. Wähle **„Dienste“ → „Neues Terminal beim Ordner“**. Fehlt der Eintrag: Programm **Terminal** öffnen (Spotlight: Cmd + Leertaste, „Terminal“ tippen), `cd ` eingeben (mit Leerzeichen danach), den Ordner `app` aus dem Finder ins Terminalfenster ziehen und Enter drücken.
- **Windows:**
  1. Öffne im Explorer den Ordner `essensplaner` und dann den Ordner **`app`**.
  2. Klicke oben in die Adresszeile, tippe **`cmd`** und drücke Enter.

Es öffnet sich ein Fenster mit Text. Das ist das Terminal.

### Schritt 4 – Den Testserver starten
Tippe diese Zeile ins Terminal und drücke Enter:

```
node tools/server.mjs 8765
```

Wenn keine Fehlermeldung erscheint, läuft der Server. **Lass dieses Fenster offen**, solange du testest.

### Schritt 5 – Im Browser öffnen
Öffne Chrome, Firefox, Safari oder Edge und tippe in die Adresszeile:

**http://localhost:8765/**

Du siehst die Startseite von Tellerkontor mit den vier Planern.

---

## Teil 3: Was du testen kannst

### Schritt 6 – Die vier Landingpages
| Marke | Adresse |
|---|---|
| Zimmerherd (Montage) | http://localhost:8765/montage.html |
| Kochsatz (Fitness) | http://localhost:8765/fitness.html |
| Zweiflammer (Camping) | http://localhost:8765/camping.html |
| Wochenschmaus (Alltag) | http://localhost:8765/alltag.html |

Probier auf jeder Seite den **Check** aus: Geräte antippen, dann zählt die Seite live, wie viele Rezepte gehen. Bei Kochsatz zeigt der Check „Protein pro Euro“ je Laden.

### Schritt 7 – Den Planer benutzen
1. Klicke auf **„Tagesplan gratis erstellen“**.
2. Kreuze an, was du hast: Geräte, Kühlschrank ja/nein, Laden, Budget, Personen, Allergien.
3. Klicke unten auf **„Plan erstellen“**.
4. Sieh dir an:
   - den **Plan** mit den Mahlzeiten (Rezept antippen öffnet Zutaten und Schritte),
   - die **Einkaufsliste** nach Abteilungen mit geschätzten Kosten,
   - den **Vorkoch-Ablauf** mit Uhrzeiten und „essen bis“.
5. Ohne Plus gibt es nur **1 Tag**. Das ist so gewollt (Gratis-Version).

Tipp: Eine andere Marke testest du mit `?v=...` am Ende, z. B. http://localhost:8765/planer.html?v=camping (oder `montage`, `fitness`, `alltag`).

### Schritt 8 – Die Rechtsseiten ansehen
Unten auf jeder Seite stehen Links zu Preise, Impressum, Datenschutz, AGB, Widerrufsbelehrung, „Verträge hier kündigen“ und „Vertrag widerrufen“. Die Formulare zum Kündigen und Widerrufen kannst du ausfüllen, **absenden geht noch nicht**, weil der Server dafür noch nicht eingerichtet ist (FUER_DICH.md, Schritt 4). In Impressum und Datenschutz stehen noch Platzhalter wie `[Vorname Nachname]`.

### Schritt 9 – Auf dem Handy testen (optional)
1. Handy und Computer müssen im **selben WLAN** sein.
2. Finde die Adresse deines Computers:
   - **Mac:** Systemeinstellungen → WLAN → bei deinem Netz auf „Details“ → „IP-Adresse“ (z. B. `192.168.178.23`).
   - **Windows:** im Terminal `ipconfig` eintippen, Enter, die Zeile **„IPv4-Adresse“** ablesen.
3. Am Handy im Browser öffnen: `http://192.168.178.23:8765/` (deine Zahl einsetzen).
4. Fragt der Computer, ob Node Verbindungen annehmen darf: „Erlauben“.

---

## Teil 4: Plus testen (ganze Woche statt 1 Tag) – optional

Dafür erzeugst du einen **Test-Schlüssel**. Öffne ein **zweites** Terminal im Ordner `app` (wie Schritt 3), der Server im ersten läuft weiter.

### Schritt 10 – Schlüsselpaar erzeugen
```
node tools/lizenz.mjs neu
```
Es erscheinen zwei lange Zeichenketten: **öffentlich** und **privat**. Kopiere beide in eine Textdatei.

### Schritt 11 – Öffentlichen Schlüssel eintragen
1. Öffne die Datei `app/public/js/config.js` mit einem Texteditor (Mac: TextEdit, Windows: Editor/Notepad; Rechtsklick → „Öffnen mit“).
2. Suche die Zeile mit `lizenzSchluessel:`.
3. Ersetze den Text zwischen den beiden `'` durch deinen **öffentlichen** Schlüssel. Die `'` bleiben stehen.
4. Speichern.

### Schritt 12 – Test-Lizenz erzeugen
Tippe (statt `PRIVAT` deinen **privaten** Schlüssel einsetzen):
```
node tools/lizenz.mjs signieren PRIVAT jahr 2027-10-29
```
Heraus kommt der **Lizenzschlüssel**. Kopieren.

### Schritt 13 – Lizenz im Planer eingeben
1. Browser neu laden (bei hartnäckig alter Version: Strg + Umschalt + R, am Mac Cmd + Umschalt + R).
2. Öffne **http://localhost:8765/preise.html**, füge den Schlüssel ins Feld **„Dein Lizenzschlüssel aus der E-Mail“** ein und klicke auf **„Plus freischalten“**.
3. Im Planer steht oben jetzt **„Plus aktiv“**, und du kannst ganze Wochen planen.

**Wichtig:** Dieses Schlüsselpaar ist nur zum Testen. Für den echten Start erzeugst du ein neues, und der private Schlüssel bleibt geheim (nur im Passwortmanager und später im Server). Die geänderte `config.js` lädst du nicht auf GitHub hoch.

---

## Teil 5: Beenden
- Im Terminal mit dem Server **Strg + C** drücken, dann das Fenster schließen.
- Zum nächsten Test: Schritte 3 bis 5 wiederholen.

## Wenn etwas nicht klappt
| Problem | Lösung |
|---|---|
| `node: command not found` bzw. „Befehl nicht gefunden“ | Node.js ist nicht installiert oder das Terminal war schon offen. Schritt 1 wiederholen, Terminal schließen und neu öffnen. |
| `Cannot find module ... tools/server.mjs` | Das Terminal ist im falschen Ordner. Es muss im Ordner **`app`** sein (Schritt 3). |
| `EADDRINUSE` | Der Server läuft schon in einem anderen Fenster. Dieses benutzen oder dort Strg + C drücken. |
| Seite lädt nicht | Läuft das Terminal mit dem Server noch? Adresse genau so tippen: `http://localhost:8765/` |
| Alte Version wird angezeigt | Strg + Umschalt + R (Mac: Cmd + Umschalt + R). |
| Handy erreicht den Computer nicht | Gleiches WLAN? Firewall-Abfrage am Computer erlaubt? Gast-WLANs blockieren das oft. |

Fehler, die dir auffallen (falsche Mengen, unklare Texte, etwas sieht kaputt aus): einfach mit Screenshot und Adresse der Seite an mich schicken.
