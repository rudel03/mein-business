# Vertrags-Worker (Vorlage, nicht deployt)

Ein kleines Programm bei Cloudflare, das drei Dinge erledigt:

1. **Nach dem Kauf** (Paddle meldet `transaction.completed`) einen Lizenzschlüssel erzeugen und dem Käufer mailen. Bei jeder Abo-Verlängerung kommt automatisch ein neuer Schlüssel.
2. **Kündigungen** von `kuendigen.html` annehmen: mit Zeitstempel speichern, dem Kunden sofort eine Eingangsbestätigung in Textform mailen (§ 312k Abs. 4 BGB), dir Bescheid geben und, wenn das Abo eindeutig zuzuordnen ist, die Kündigung bei Paddle zum Laufzeitende vormerken.
3. **Widerrufe** von `widerrufen.html` annehmen: speichern, Eingangsbestätigung an den Kunden (§ 356a BGB), Benachrichtigung an dich. Die **Erstattung löst du selbst in Paddle aus**.

Es werden nur Name, E-Mail, Vertrag, Art, Grund und Daten angenommen. Allergien, Ziele oder Makros erreichen den Worker nie.

## Wege (Endpunkte)
| Weg | Wer ruft auf | Was |
|---|---|---|
| `POST /paddle-webhook` | Paddle | Kauf/Verlängerung → Lizenzschlüssel |
| `POST /vertrag` | `kuendigen.html` und `widerrufen.html` (über `config.vertragEndpoint`) | Art kommt aus dem Feld `typ` |
| `POST /kuendigen`, `POST /widerrufen` | gleichwertig, falls du getrennte Adressen willst | |

In `app/public/js/config.js` trägst du später ein: `vertragEndpoint: 'https://<dein-worker>.workers.dev/vertrag'`, danach `python3 tools/seiten.py` (aus `app/`).

## Was du brauchst
- Cloudflare-Konto (der kostenlose Tarif reicht für den Anfang)
- Paddle-Konto, zuerst **Sandbox** (Testumgebung, kein echtes Geld)
- Mail-Dienst für Transaktionsmails, z. B. Postmark oder Brevo (EU-Server bevorzugen, AV-Vertrag abschließen). Diese Mails sind Vertragsmails und brauchen kein Double-Opt-in. Werbung darüber ist **verboten**.
- Node.js auf deinem Rechner

## Schritt für Schritt

### 1. Schlüsselpaar für Lizenzen
```
cd essensplaner/app
node tools/lizenz.mjs neu
```
- Den **öffentlichen** Teil in `public/js/config.js` bei `lizenzSchluessel` eintragen.
- Den **privaten** Teil in deinen Passwortmanager. Er kommt nur als Secret in den Worker, **nie** ins Repository.

### 2. Paddle (Sandbox) einrichten
1. Produkte und Preise anlegen: Plus Monat, Plus Jahr (je mit 7 Tagen Probezeit), Montage-Pass, Saison-Pass.
2. Bei jedem Preis unter *Custom data* eintragen: `{"tarif":"monat"}` bzw. `jahr`, `pass`, `saison`. (Alternativ die Preis-IDs in `PADDLE_PREISE` eintragen.)
3. *Developer Tools → Notifications → New destination*: URL `https://<dein-worker>.workers.dev/paddle-webhook`, Ereignisse **transaction.completed** und **subscription.updated**. Den angezeigten *Secret key* kopieren.
4. *Developer Tools → Authentication*: API-Schlüssel erzeugen (Rechte: Kunden lesen, Abos lesen und ändern).

### 3. Worker vorbereiten
```
cd essensplaner/server
cp wrangler.toml.beispiel wrangler.toml
npx wrangler login
npx wrangler kv namespace create VERTRAG_KV
```
Die ausgegebene `id` in `wrangler.toml` eintragen. Dann die Werte unter `[vars]` anpassen (Domain, Absender, deine E-Mail).

### 4. Lokal testen (ohne echte Mails)
1. Datei `.dev.vars` anlegen (wird nicht committet):
   ```
   PADDLE_WEBHOOK_SECRET=irgendein-testwert
   LIZENZ_PRIVAT=<privater Schlüssel aus Schritt 1>
   ```
   `MAIL_ANBIETER` bleibt `log`, dann erscheinen die Mails nur im Terminal.
2. `npx wrangler dev` starten (läuft auf `http://localhost:8787`).
3. In einem zweiten Terminal einen Kauf simulieren:
   `node test/webhook-senden.mjs irgendein-testwert pass test@example.de`
   Im ersten Terminal erscheint die Mail mit dem Schlüssel. Den Schlüssel auf `preise.html` (lokal: `node ../app/tools/server.mjs 8765`) eingeben, er muss Plus freischalten.
4. Kündigung testen: in `wrangler.toml` vorübergehend `ERLAUBTE_ORIGIN = "http://localhost:8765"`, in `config.js` `vertragEndpoint: 'http://localhost:8787/vertrag'`, dann `kuendigen.html` ausfüllen. Ohne `PADDLE_API_KEY` landet sie als „HANDELN“ bei dir. **Beides danach zurückstellen.**
5. Automatische Tests: `npm test` (braucht kein Internet).

### 5. Veröffentlichen (erst wenn alles geprüft ist)
```
npx wrangler secret put PADDLE_WEBHOOK_SECRET
npx wrangler secret put PADDLE_API_KEY
npx wrangler secret put LIZENZ_PRIVAT
npx wrangler secret put MAIL_TOKEN
npx wrangler deploy
```
`MAIL_ANBIETER` auf `postmark` oder `brevo` stellen. Testkauf in der Sandbox, Kündigung und Widerruf einmal selbst durchspielen. Erst dann `PADDLE_UMGEBUNG = "live"` und Live-Secrets setzen.

## Was automatisch passiert und was du tun musst
| Fall | Automatisch | Du |
|---|---|---|
| Kauf / Verlängerung | Schlüssel per Mail | nichts |
| Ordentliche Kündigung, genau ein Abo zur E-Mail | Kündigung bei Paddle zum Periodenende, Bestätigung mit Enddatum | nichts (Kontrollmail kommt) |
| Kündigung unklar (kein/mehrere Abos, E-Mail passt nicht, Wunschtermin später, außerordentlich, Pass) | Eingangsbestätigung an Kunden | Mail mit „HANDELN“: in Paddle bearbeiten und dem Kunden das Enddatum mailen (Versprechen: zwei Werktage) |
| Widerruf | Eingangsbestätigung | in Paddle erstatten und Abo sofort beenden (innerhalb 14 Tagen) |

Alle Eingänge liegen in KV unter `eingang:<art>:<zeit>:<referenz>` (Cloudflare-Dashboard → KV) und werden nach 3 Jahren gelöscht.

## Vor dem Start prüfen lassen (Anwalt)
- Texte der Eingangsbestätigungen (`bestaetigungText` in `vertrag-worker.js`) und der Lizenzmail.
- Ob Kündigungen bei unklarer Zuordnung so ausreichen (Bestätigung sofort, Enddatum nachgereicht).
- Widerruf: anteiliger Wertersatz und Erstattungsweg über Paddle als Merchant of Record (wer erstattet formal?).
- Datenschutzerklärung: Cloudflare (Worker, KV), Mail-Dienst und Paddle als Empfänger nennen, Speicherdauer 3 Jahre; AV-Verträge abschließen.
- Ob Paddle selbst bereits Kündigungsbestätigungen verschickt (dann keine widersprüchlichen Mails).
