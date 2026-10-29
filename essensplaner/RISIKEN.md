# Risiken

Stand 29.10.2026. Quellen: Advocatus Diaboli Phase A (`recherche/11`), Phase B–D (`recherche/13`), Claim-Freigabe (`marke/Claim_Freigabe.md`), Faktencheck (`recherche/10`). W = Wahrscheinlichkeit, A = Auswirkung (n = niedrig, m = mittel, h = hoch, e = existenziell).

| # | Risiko | W | A | Gegenmaßnahme | Stand |
|---|---|---|---|---|---|
| 1 | Bezahlte Werbung rechnet sich nicht (Paid-CAC 35–281 € gegen Ziel-CAC ≈ 12 €) | h | e | Test gedeckelt auf 150 € je Nische, Abbruchregeln im Launchplan, Schwerpunkt organisch, SEO und Kanal-Partner | vorbereitet |
| 2 | Zahlungsbereitschaft nicht gemessen | h | e | Warteliste, 5–10 Interviews und Preistest je Nische vor Werbegeld (A4) | offen, Inhaber |
| 3 | Fokus: vier Marken und zwei bestehende Shops für eine Person | h | h | eine Nische nach der anderen (A3), gemeinsamer Code und gemeinsame Rezepte, Alltag nur SEO | entschieden |
| 4 | Geschätzte Preise weichen an der Kasse ab (Fleisch/Fisch 16–32 % zu niedrig) | h | h | Kosten-Aussagen in Werbung gesperrt, „geschätzte Kosten“ überall, Korrekturliste `recherche/09` §5b ist in `zutaten.py` übernommen, Kassenbon-Test fehlt | teilweise, Inhaber |
| 5 | Rezepte nicht testgekocht, Fehler in Mengen oder Zeiten | m | h | Rezeptprüfung (`recherche/12`) erledigt, 20 Rezepte testkochen, Rezeptseiten erst nach Testkochen indexieren | offen, Inhaber |
| 6 | Allergen-Haftung (Spuren, Rezepturänderungen der Hersteller) | m | e | Filter für 14 Hauptallergene nur nach eigenen Zutatendaten, Hinweis „Etikett prüfen“ und „ersetzt keine ärztliche Beratung“, kein „glutenfrei“-Versprechen, AGB-Haftungsklausel, Betriebshaftpflicht | Text erledigt, Versicherung offen |
| 7 | Lebensmittelsicherheit: Lagerfristen nur bei ≤ 7 °C, Kühlboxen schaffen das bei Hitze oft nicht | m | h | Fristen teils strenger als BfR, Kühlbox zählt nur als Kühlschrank bei < 7 °C, ohne Kühlung nur ungekühlt lagerbare Zutaten, Reis 1 h nach dem Kochen kühlen | erledigt |
| 8 | Abmahnung wegen Werbeaussagen (UWG, HCVO, HWG) | m | h | Claim-Freigabe mit 241 Aussagen (13 gesperrt), keine Kundenstimmen, keine Gesundheitsversprechen, Anwaltsprüfung | Prüfung durch Anwalt offen |
| 9 | Abo-Recht: Kündigungsbutton (§ 312k), Widerrufsbutton (§ 356a seit 19.06.2026), Jahresabo-Laufzeit | m | h | Seiten „Verträge hier kündigen“ und „Vertrag widerrufen“ ohne Login, Worker-Vorlage mit Eingangsbestätigung, „jederzeit kündbar“ beim Jahresabo gesperrt | Vorlage fertig, Deployment offen |
| 10 | Widerspruch AGB (Paddle als Verkäufer) und Widerrufsbelehrung (Inhaber) | h | m | Anwalt klärt, Texte an Paddle-Modell (Merchant of Record) anpassen | offen, Inhaber |
| 11 | DSGVO Art. 9: Gesundheitsnahe Daten (Ziele, Allergien) | n | h | alles bleibt im Browser (localStorage), kein Tracking im Planer, Pixel nur auf Landingpages mit Einwilligung | erledigt |
| 12 | Lizenzschlüssel offline prüfbar und damit teilbar oder umgehbar | m | n | Ed25519-Signatur mit Ablaufdatum, Abos erneuern den Schlüssel; bewusst akzeptiert, weil Konto-Pflicht dem Versprechen „ohne Konto“ widerspricht | akzeptiert |
| 13 | Datenverlust bei gelöschtem Browser-Speicher | m | n | Lizenzschlüssel steht in der Kauf-Mail und lässt sich neu eingeben; Profil-Export als Ausbau (Backlog) | teilweise |
| 14 | Markenrechte: Namen nicht amtlich geprüft | m | h | DPMA/EUIPO-Recherche vor Domainkauf, Ausweichnamen in `marke/Namen_und_Pruefung.md` | offen, Inhaber |
| 15 | Montage-Zielgruppe über Meta schwer erreichbar, kaum Suchvolumen | m | h | SEO über die Gerätefrage („kochen ohne herd“), Kanal-Partner (Monteurzimmer-Portale, Zeitarbeit), Abbruchregel bei 0 von 2 Antworten | vorbereitet |
| 16 | Camping saisonal (Umsatz März–September), Markt −6,5 % | h | m | Saison-Pass statt Abo, Start im Februar, Abbruch bei < 5 Vorbestellungen bis Mai | entschieden |
| 17 | Wettbewerb: Kochbox- und Planer-Apps mit großem Budget | m | m | Nische über Geräte und Unterkunft, kein Konto, Discounter-Liste; Alltag nur nebenbei | entschieden |
| 18 | KI-Fotos zeigen das Gericht nicht realistisch | m | n | Kennzeichnung „KI-generiert, beispielhaft“, nach dem Testkochen echte Fotos | teilweise |
| 19 | Kleinunternehmergrenze über alle drei Projekte | m | m | Steuerberatung vor Start | offen, Inhaber |
| 20 | Abhängigkeit von Paddle (Kontosperre, Gebühren) | n | h | Kasse über `config.js` austauschbar, Lizenzlogik unabhängig vom Zahlungsanbieter | vorbereitet |
