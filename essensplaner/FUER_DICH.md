# Für dich (Inhaber) – Schritte, die ich nicht selbst ausführen darf

Ich habe nichts gekauft, kein Konto angelegt, nichts registriert, nichts veröffentlicht und keine Anzeige gestartet. Ausgegeben habe ich nur Higgsfield-Credits für Bilder und Videos. Die Reihenfolge unten ist die empfohlene. Hake ab, was erledigt ist.

## 0. Zuerst entscheiden (je 5 Minuten, Details in `ENTSCHEIDUNGEN.md`)
- [ ] Namen behalten? Dachmarke **Tellerkontor**, Marken **Zimmerherd** (Montage), **Kochsatz** (Fitness), **Zweiflammer** (Camping), **Wochenschmaus** (Alltag).
- [ ] Domain-Modell: eine Domain je Marke (Vorschlag SEO-Bericht) oder zuerst alles unter `tellerkontor.de`. Danach `basisUrl` in `app/public/js/config.js` setzen und `python3 tools/seiten.py && python3 tools/landing.py` ausführen (oder mich bitten).
- [ ] Preis für Plus Jahr ab Monat 13 festlegen (heute: „danach monatlich kündbar“, Preis fehlt). **Vorher keine Kasse freischalten** (Claim-Freigabe A02).
- [ ] Wertersatz beim Widerruf: Vorschlag ist, keinen zu verlangen (einfacher, kundenfreundlich).
- [ ] Trainings-Crawler (GPTBot, ClaudeBot, Google-Extended) erlauben oder sperren. Vorschlag: erlauben (heute in `robots.txt`).
- [ ] Wer steht als Autor/Prüfer an den Ratgebern? (Name für E-E-A-T, darf auch „Redaktion Tellerkontor“ sein.)

## 1. Namen und Domains
- [ ] DPMA- und EUIPO-Recherche (gratis: register.dpma.de, euipo.europa.eu/eSearch) für alle fünf Namen in Klasse 9, 35, 41, 43. Bei Treffern Ausweichnamen aus `marke/Namen_und_Pruefung.md`.
- [ ] Domains kaufen. Am 29.10.2026 waren alle `.de` und `.com` per RDAP frei: tellerkontor, zimmerherd, kochsatz, zweiflammer, wochenschmaus.
- [ ] Optional: Wortmarke anmelden (DPMA ca. 290 €), sobald eine Nische trägt.

## 2. Gewerbe und Steuern
- [ ] Gewerbe anmelden bzw. bestehendes erweitern (Software/Online-Dienst).
- [ ] Steuerberatung: Kleinunternehmergrenze gilt über **alle drei Projekte** zusammen. Paddle ist Verkäufer (Merchant of Record) und führt die Umsatzsteuer der Endkunden ab, du stellst Paddle eine Rechnung.
- [ ] Betriebshaftpflicht mit Vermögensschaden (Angebote ca. 200–600 €/Jahr), wegen Allergenen und Rezepten.

## 3. Kasse (Paddle)
- [ ] Paddle-Konto eröffnen (Verifizierung dauert einige Tage).
- [ ] 4 Produkte anlegen: Plus Monat 6,99 €, Plus Jahr 44,99 € (12 Monate), Montage-Pass 17,99 € einmalig, Saison-Pass 24,99 € einmalig. 7 Tage 0 € beim Abo.
- [ ] Checkout-Links in `config.js` → `kasse.urls` eintragen.
- [ ] Im Checkout die Zustimmung zum vorzeitigen Beginn (§ 356 Abs. 5 BGB) als Pflicht-Checkbox einrichten.
- [ ] Webhook-Secret und API-Key für den Worker notieren.

## 4. Lizenz und Server
- [ ] Schlüsselpaar erzeugen: `cd essensplaner/app && node tools/lizenz.mjs neu`. Den **öffentlichen** Schlüssel in `config.js` → `lizenzSchluessel` eintragen. Den **privaten** Schlüssel nur als Secret im Worker speichern, nie ins Repository.
- [ ] Cloudflare-Konto (gratis), Worker aus `server/` einrichten, Anleitung in `server/README.md`. Danach `vertragEndpoint` in `config.js` eintragen.
- [ ] Mail-Dienst mit Double-Opt-in (z. B. Brevo, Mailjet, CleverReach; EU-Server, AV-Vertrag abschließen). Absender-Domain mit SPF/DKIM.
- [ ] **Testkauf** in der Paddle-Sandbox: kaufen → Mail mit Schlüssel → Planer freigeschaltet → „Verträge hier kündigen“ → Bestätigungsmail → „Vertrag widerrufen“ → Bestätigung. Ergebnis mir geben, ich prüfe es.

## 5. Recht
- [ ] Eigene Daten in `config.js` → `betreiber` eintragen (Name, Anschrift, E-Mail, Telefon). Erscheinen in Impressum, Datenschutz, Widerruf.
- [ ] Anwalt (IT-/Wettbewerbsrecht, ca. 800–2.000 €): AGB, Datenschutz, Widerrufsbelehrung, Kündigungs- und Widerrufsseite, Preisseite, Mails. Offene Punkte stehen in `marke/Claim_Freigabe.md` Abschnitt 7, wichtigster: **AGB nennen Paddle als Vertragspartner, die Widerrufsbelehrung dich**.
- [ ] Datenschutz: Hoster, Mail-Dienst und Paddle mit AV-Vertrag/DPA eintragen.

## 6. Daten prüfen
- [ ] **20 Rezepte testkochen** (Vorschlag: je 5 aus U, O, C, F). Mehr als 3 mit wesentlichen Änderungen → alle testkochen.
- [ ] **Kassenbon-Test**: ein Wochenplan bei Aldi und bei Rewe einkaufen, Bon fotografieren. Ich gleiche ab. Ungeprüfte Preise: kartoffel, zwiebel, apfel, banane, tomaten_dose, rote_linsen, kichererbsen_dose, thunfisch, rapsoel, reis, tk_erbsen, tk_spinat, zucker, couscous, feta, frischkaese, haferdrink, schweineschnitzel, eier, tk_haehnchen. Die Fleisch-/Fisch-Korrekturen aus `recherche/09` §5b sind schon in `zutaten.py` (z. B. Hähnchenbrust 11,29 €/kg).
- [ ] Bis dahin bleiben Euro-Beträge und „Protein pro Euro“ in der Werbung gesperrt.

## 7. Markt prüfen (gratis, nur Zeit)
- [ ] Meta-Werbebibliothek ansehen (für mich gesperrt): Suchwörter „Monteurzimmer“, „Meal Prep“, „Wohnmobil kochen“, „Wochenplan“.
- [ ] 5–10 Interviews je Nische, zuerst Montage. Leitfaden `recherche/04`.
- [ ] Regeln von Reddit, Facebook-Gruppen, Foren lesen, bevor du postest (Werbung oft verboten).
- [ ] Anfragen an 2 Kanal-Partner verschicken (Entwurf im Markenbuch Zimmerherd, z. B. Monteurzimmer-Portal und Fahrer-Community).

## 8. Live gehen (erst nach 1–6)
- [ ] Hosting: statisch (z. B. Cloudflare Pages, Netlify, eigener Webspace), gzip/Brotli, HTML `max-age=300`, Bilder/CSS/Fonts lang. Ordner `essensplaner/app/public/` hochladen.
- [ ] Search Console und Bing Webmaster Tools je Domain, `sitemap.xml` einreichen.
- [ ] Cookieloses Statistik-Tool wählen (oder nur Server-Logs).

## 9. Werbung (erst nach Validierung, Launchplan Phase 2)
- [ ] Meta Business Manager, Werbekonto, Zahlungsmittel.
- [ ] Pixel-ID in die Vorlage `app/public/js/einwilligung.js` eintragen und auf Landingpages und Preisseite einbinden (nie im Planer). Ich helfe beim Einbau.
- [ ] Kampagne nach `marketing/Kampagnen.md`: max. 150 € je Nische, **Audience Network aus**, 18+, keine sensiblen Zielgruppen.
- [ ] Videos und Bilder liegen in `marketing/creatives/<marke>/`. Videos sind stumm: Musik aus der Meta- oder TikTok-Bibliothek beim Hochladen wählen.

## 10. Querverkauf
- [ ] Im DURCHSCHICHT-Newsletter (nur Double-Opt-in-Abonnenten) auf Zimmerherd hinweisen. **Kein Rabatt** für E-Book-Käufer.
