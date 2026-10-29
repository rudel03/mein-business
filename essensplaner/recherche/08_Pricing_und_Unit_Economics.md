# 08 · Pricing und Unit Economics (Essensplaner)

Stand: 28.10.2026 · Rolle: Finanzanalyse + Pricing (Prüfung durch Steuerberatung/Jurist:in steht aus) · Abrufdatum aller Web-Quellen: **28.10.2026**, sofern nicht anders angegeben.
> **Korrigiert nach Faktencheck (10) am 29.10.2026:** Eat-This-Much-Webpreis korrigiert, Mealime als Benchmark ergänzt (Preissenkung 2021, Einstellung 21.10.2026), Cookidoo als Stand 07/2024 gekennzeichnet und AS-Preis 69,99 € ergänzt, Preisband geprüft, Stripe Managed Payments mit Primärquelle, OLG Nürnberg um Login-Ausnahme ergänzt. Geänderte Stellen tragen „(korr. 10)“.
>
> **Achtung, ersetzt:** Die Szenarien, Netto- und LTV-Werte in den Abschnitten 0, 2.2, 3 und 5 beruhen auf Stripe, alten Fixkosten und ohne Saison-Pass. **Sie sind durch Abschnitt 9 „Aktualisierung 29.10.2026 (Paddle, Pässe, Startkosten)“ ersetzt** und bleiben nur zur Nachvollziehbarkeit stehen.

Kennzeichnung: **[Beleg]** = Quelle verlinkt · **[Annahme]** = frei gesetzt, im Test zu messen · **[Unbekannt]** = nicht prüfbar · **[Prüfen]** = Fachprüfung nötig.
Methodik: Skills `pricing`, `paywalls`, `marketing-psychology` (US-geprägt; deutsches Recht hat Vorrang, keine Fake-Countdowns, keine versteckte Kündigung). Kalkulationslogik analog `recherche/Schichtkochbuch Markt und Vermarktung.md`, Abschnitt 7. Rechenmodell: Szenario-CSV `essensplaner/finanzen/szenarien.csv`.

---

## 0. Kurzfassung (für den Inhaber)

> Stand 28.10.2026, mit Stripe gerechnet. **Aktuelle Zahlen (Paddle, 4 Tarife, Startkosten): Abschnitt 9.**

1. **Empfehlung:** Eine Preisstruktur für alle Varianten (Montage, Fitness, dritte Nische, allgemein), verkauft als **Web-App (PWA) mit Stripe** statt über App-Stores:
   - **Kostenlos:** Gerätefilter + 1 Tagesplan pro Woche (Lead-Magnet, Double-Opt-in für Mails getrennt).
   - **Plus Jahr: 44,99 €** (≈ 3,75 €/Monat), auf der Preisseite **vorausgewählt**, mit 7 Tagen kostenlos testen (Erinnerung 2 Tage vor Ablauf).
   - **Plus Monat: 6,99 €**, monatlich kündbar.
   - **Montage-Pass 3 Monate: 17,99 € einmalig**, endet automatisch (keine Verlängerung) – für Monteure und alle, die „nur für einen Einsatz“ planen.
2. Nach USt (19 %) und Gebühren bleiben je Zahlung etwa **5,37 € (Monat), 36,24 € (Jahr), 14,43 € (Pass)**. Ein Merchant of Record (Paddle) kostet je Zahlung rund 0,30–1,10 € mehr, nimmt dafür USt/OSS-Arbeit ab.
3. **LTV realistisch ≈ 33 € (Monat), 47 € (Jahr), 16 € (Pass)** → **Ziel-CAC (LTV/3) nur ≈ 11–16 €.** Mit Meta-Klickpreisen von 0,40–0,90 € braucht eine Anzeige **3,5–7 % Kaufquote je Linkklick** – das ist für eine unbekannte Marke sehr hoch. **Bezahlte Werbung trägt sich am Anfang voraussichtlich nicht**; Wachstum muss über Cross-Selling (Honigmama/DURCHSCHICHT), SEO, Creator und Nischen-Communities kommen. Werbung nur als kleiner Test mit Abbruchregel.
4. **Fixkosten ≈ 90–150 €/Monat**; Break-even der Fixkosten ab **ca. 30–40 zahlenden Nutzern**. Im realistischen Szenario dreht das Monatsergebnis in **Monat 9** ins Plus, die Startkosten sind nach 12 Monaten **noch nicht** zurück (kumuliert −2.081 €). Konservativ: −3.654 €. Optimistisch: +3.235 €.
5. **Buchpreisbindung:** E-Books (Honigmama, DURCHSCHICHT 19,90 €) **nicht** rabattiert bündeln und nicht „gratis zum Abo“ verschenken. Erlaubt und sauber: getrennter Verkauf zu Festpreisen, Hinweis/Cross-Sell. Ein Bundle nur als eigenes Festpreis-Produkt, dessen Preis das E-Book nicht verbilligt (Details 1.4) **[Prüfen]**.
6. **Kündigungsbutton (§ 312k BGB) gilt auch für den 3-Monats-Pass mit Einmalzahlung** (BGH, Urteil vom 22.05.2025, I ZR 161/24). Er muss also überall eingebaut werden.

---
## 1. Geschäftsmodelle und Benchmarks

### 1.1 Preise der Konkurrenz (DE, wo verfügbar)

Hinweis zur Methode: Die App-Store-Seiten listen „In-App-Käufe“ ohne eindeutige Zuordnung (Aktions-, Test- und Altpreise stehen nebeneinander). Angegeben ist die **Spanne** der gelisteten Preise. Was Listen- und was Aktionspreis ist, lässt sich daraus nicht sicher ablesen **[Unbekannt]**.

| Anbieter | Monat | Jahr | Sonstiges | Quelle |
|---|---|---|---|---|
| Yazio PRO | – (nur Laufzeiten) | 23,90 € / 35,90 € / 83,90 € | 3 Monate 35,99 €; 6 Monate 14,99 € | [App Store DE](https://apps.apple.com/de/app/yazio-kalorienz%C3%A4hler-fasten/id946099227) |
| Lifesum Premium | 9,99 € / 14,99 € | 99,99 € (Probeabo-Angebot 49,99 €) | 3 Monate 21,99–39,99 € | [App Store DE](https://apps.apple.com/de/app/lifesum-kalorien-z%C3%A4hler-ai/id286906691) |
| MyFitnessPal Premium | 9,99 € / 21,99 € | 49,99 € / 87,99 € (höhere Stufe vermutlich Premium+) | – | [App Store DE](https://apps.apple.com/DE/app/id341232718) |
| Eat This Much | 8,99–84,99 € (8 Einträge, Laufzeit nicht zugeordnet) | „Winter Sale Yearly“ 55,99 € | Web: $5/Monat bei Jahreszahlung, $14,99 monatlich (promealplan 2026) (korr. 10) | [App Store DE](https://apps.apple.com/de/app/id981637806); [promealplan](https://www.promealplan.com/en/blog/eat-this-much-review-2026) |
| Mealime Pro | 2,99 $ (bzw. Landespreis) | **kein Jahresabo mehr** | Preissenkung vom Anbieter angekündigt; Preissenkung auf 2,99 $ war 2021; Mealime wird am 21.10.2026 eingestellt, daher kein aktueller Benchmark (korr. 10) | [mealime.com/lower-prices](https://www.mealime.com/lower-prices) |
| Samsung Food+ | 6,99 $ (Stand 2024, USA) | [Unbekannt] | DE-Preis nicht gefunden | [Ubergizmo 2024](https://ubergizmo.com/2024/09/samsung-ai-food-platform); [Samsung Newsroom DE](https://news.samsung.com/de/schluss-mit-pesto-pasta-samsung-prasentiert-neue-samsung-food-funktionen-auf-der-ifa-2024) |
| Plan to Eat | 5,95 $ | 49 $ | 14 Tage Test ohne Karte | [plantoeat.com/pricing](https://www.plantoeat.com/pricing) |
| KptnCook Premium/Pro | 5,99 € (vermutlich Monat) | Premium 29,99–47,99 €; Pro 39,99–59,90 €; „Wochenplan 1 Jahr“ 59,99 € | „Wochenplaner für Rezepte“ 41,99 € | [App Store DE](https://apps.apple.com/DE/app/id795495986) |
| Chefkoch PLUS | 5,99 € | 29,99 € / 39,99 € / 49,99 € | Chefkoch PUR (werbefrei) 1,99 €/Monat, 14,99 €/Jahr | [App Store DE](https://apps.apple.com/DE/app/id478618165) |
| Kitchen Stories Plus | 7,99 € | 79,99 € (Angebote 19,99 € / 39,99 €) | – | [App Store DE](https://apps.apple.com/de/app/id771068291) |
| (Zusatz) Cookidoo | – | 60 € (Erhöhung von 48 €), **Stand 07/2024**; App Store DE 2026: **69,99 €/Jahr** (Bericht 05) (korr. 10) | Thermomix-Bindung | [iphone-ticker](https://www.iphone-ticker.de/thermomix-app-preis-fuer-cookidoo-abo-steigt-25-prozent-237796/) |

**[Interpretation]** Der deutsche Markt hat zwei Preisbänder: **Rezept-/Koch-Apps** bei **30–60 €/Jahr bzw. 5,99–7,99 €/Monat** (Chefkoch, KptnCook, Kitchen Stories; Cookidoo liegt 2026 mit 69,99 € darüber, Band gilt ohne Cookidoo) (korr. 10) und **Tracker/Diät-Apps** bei **35–100 €/Jahr bzw. 9,99–22 €/Monat** (Yazio, Lifesum, MyFitnessPal). Fast alle zeigen dauerhaft Aktionspreise; der „Listenpreis“ dient als Anker. Mealime zeigt das Gegenrisiko: nicht die Preissenkung (2021), sondern die **Einstellung des Dienstes am 21.10.2026** – ein günstiger Planer ohne tragfähige Erlöse hält sich nicht (korr. 10). Ein neuer Planer ohne Markenbekanntheit sollte **im Band der Koch-Apps** starten, nicht bei den Trackern.

### 1.2 Benchmarks aus Abo-Apps (RevenueCat u. a.)

| Kennzahl (Health & Fitness) | Wert | Quelle |
|---|---|---|
| Trial → bezahlt, Median | **37,7 %** (oberes Quartil > 51,4 %) | [RevenueCat SOSA 2026](https://www.revenuecat.com/state-of-subscription-apps) |
| Trial → bezahlt, Median (Vorjahr) | 39,9 % (Top 10 %: 68,3 %); Trials ≤ 4 Tage nur 26,8 % | [RevenueCat SOSA 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/); [SaaStr-Zusammenfassung](https://www.saastr.com/the-top-10-learnings-from-revenuecats-state-of-subscription-apps/) |
| Trial → bezahlt (andere Quelle) | 35,0 % (global 25,6 %) | [Adapty 2026](https://adapty.io/state-of-in-app-subscriptions/) |
| Download → Trial (D30), Median | 6,9 % (Top > 23 %) | RevenueCat 2026 |
| Download → bezahlt (D35), Median | **2,9 %** (oberes Quartil > 6,2 %; alle Kategorien 2,0 %) | RevenueCat 2026 |
| Anteil Jahresabos | 2025: **67 %** der verkauften H&F-Abos; 2026: Jahresabos = **59 % des Umsatzes** (Abschnitt zur Abo-Anzahl im 2026-Bericht widersprüchlich: „68 %“ einmal jährlich, einmal monatlich) | RevenueCat 2025 / 2026 |
| Medianpreise H&F | Monat **9,99 $**, Jahr **39,94 $** | RevenueCat 2026 |
| Trial-Länge | 54 % der H&F-Trials 5–9 Tage | RevenueCat 2026 |
| Realisierter LTV je Zahler (Median) | Monatsabo 24,23 $, Jahresabo 35,64 $ | RevenueCat 2026 |
| Erstattungsquote | H&F **4,71 %** (zweithöchste Kategorie); Westeuropa insgesamt < 3 % | RevenueCat 2025 |
| Retention M1 / M12 | **[Unbekannt]** – in der frei abrufbaren Fassung nicht als H&F-Zahl ausgewiesen (nur Grafiken im PDF) | RevenueCat 2025/2026 |
| Rückkehr nach Kündigung Jahresabo | ca. 5 % | [SaaStr zu SOSA 2026](https://saastr.com/the-top-10-learnings-from-revenuecats-state-of-subscription-apps-how-115000-mobile-apps-deliver-16b-in-revenue-whats-working-whats-quietly-killing-growth) (Sekundärquelle) |

**Wichtig:** Diese Werte stammen aus **nativen Store-Apps** (Download = hohe Absicht). Für eine Web-App gilt die Kette „Besucher → Lead → Käufer“, die Quoten sind **nicht direkt übertragbar** **[Annahme]**. Retention-Annahmen in Abschnitt 3 sind deshalb Szenarien, keine Benchmarks.

### 1.3 Geschäftsmodelle im Vergleich

| Modell | Vorteile | Nachteile / Risiken | Eignung |
|---|---|---|---|
| **Einmalkauf** (z. B. 29,99 €) | einfach, kein Abo-Misstrauen, passt zu E-Book-Kundschaft | Kein laufender Umlauf, aber laufende Kosten (Hosting, Preis- und Rezeptpflege); Supermarktpreise veralten → Leistungsversprechen „aktuelle Kosten“ nicht dauerhaft finanzierbar | mittel (als Alternative B) |
| **Monatsabo** | niedrige Einstiegshürde, passt zu wechselnden Lebensphasen | hohe Kündigungsquote, Gebühren-Fixanteil (0,25–0,39 €) frisst bei kleinen Beträgen | gut, als Zweitoption |
| **Jahresabo** | Vorauskasse, bessere Bindung, Fixgebühr fällt einmal an; in H&F Standard (67 % der Abos 2025) | Hürde für Neukunden; Ärger bei vergessener Verlängerung → Erinnerungsmail Pflicht aus Fairness | **Hauptprodukt** |
| **Freemium** | Lead-Aufbau, SEO, „Aha-Moment“ vor der Zahlung (Paywall-Skill: „Value before ask“) | Gratis-Nutzer kosten Infrastruktur; Free-Umfang muss knapp sein | **ja, kombiniert** |
| **Lifetime** (z. B. 79,99 €) | Startkapital, Fans | Laufende Kosten ohne Gegenfinanzierung; kannibalisiert Jahresabo; Lifetime-Versprechen bei Einstellung problematisch | **nein** (höchstens später, echt limitiert und begründet) |
| **Zeitlich begrenzter Pass** (Montage-Pass 3 Monate, 17,99 €) | passt zu Einsätzen auf Montage; kein Abo-Misstrauen; ehrlich | Kündigungsbutton trotzdem nötig (BGH I ZR 161/24); geringer LTV | **ja, für Montage** |
| **Bundle mit E-Book** | Cross-Selling, höherer Warenkorb | Buchpreisbindung, gemischte USt (7 %/19 %) | nur eingeschränkt (1.4) |
| **Wochen-Abo** | in Store-Apps verbreitet (Median 5,99 $/Woche laut RevenueCat 2026) | wirkt in DE schnell wie Abo-Falle | **nein** |

### 1.4 Bundle mit E-Books und Buchpreisbindung

- E-Books sind preisgebunden; auch indirekte Nachlässe (Zugaben, Gratisexemplare, Koppelungsvorteile) gelten grundsätzlich als unzulässig ([it-recht-kanzlei: Gratisabgabe](https://www.it-recht-kanzlei.de/gratisabgabe-preisgebundene-buecher-buchpreisbindung.html); [VLB-Webinar Preisbindung](https://vlb.de/assets/images/Webinar_Preisbindung_20200326.pdf); [§ 5 BuchPrG](https://lxgesetze.de/buchprg/5)).
- Bei Kombiprodukten zählt, was aus Käufersicht Hauptsache ist ([VLB-Webinar](https://vlb.de/assets/images/Webinar_Preisbindung_20200326.pdf)). Ein Planer-Jahresabo mit E-Book: Hauptsache wäre je nach Preisverhältnis unklar **[Prüfen]**.
- **Daraus folgt [Interpretation, Prüfen]:**
  1. **Kein** „E-Book gratis zum Jahresabo“ und **kein** „Abo 3 Monate gratis beim E-Book-Kauf“ (wirtschaftlich ein Nachlass auf das Buch).
  2. Ein Bundle-Produkt nur zu einem Festpreis, bei dem der E-Book-Anteil **mindestens den gebundenen Preis** behält. Beispiel: DURCHSCHICHT 19,90 € + Plus-Jahr 44,99 € = **64,89 €** als „Schicht-Paket“. Rechnerisch bietet das dem Kunden keinen Preisvorteil, nur Bequemlichkeit. Wenn ein Vorteil gewünscht ist, darf er nur auf den **nicht preisgebundenen** Teil gehen. Ob ein Nachlass auf das Abo im Paket als indirekter Buchnachlass gilt, ist ungeklärt → **vor Umsetzung Börsenverein/Preisbindungstreuhänder bzw. Anwalt fragen**.
  3. USt-Aufteilung im Paket: E-Book 7 %, App-Abo 19 % → Aufteilung nach Einzelverkaufspreisen **[Prüfen: Steuerberatung]**.
  4. **Empfohlen statt Bundle:** Cross-Selling ohne Preisvorteil (Hinweis in der App „Passende Rezepte als E-Book“, Mail an Bestandskunden mit Double-Opt-in) und umgekehrt in den E-Book-Shops ein Link auf die kostenlose Planer-Stufe.

---
## 2. Zahlungsgebühren und Fixkosten

### 2.1 Zahlungsanbieter (aktuelle Sätze geprüft am 28.10.2026)

| Anbieter | Satz | Bemerkung | Quelle |
|---|---|---|---|
| **Stripe** EWR-Standardkarten | **1,5 % + 0,25 €** | Premium-/Firmenkarten 2,8 % + 0,25 €; UK 2,5 % + 0,25 €; Nicht-EWR 3,15 % + 0,25 € (+2 % Währung) | [stripe.com/de/pricing](https://stripe.com/de/pricing) |
| Stripe SEPA-Lastschrift | **0,35 €** pauschal | Rücklastschriften möglich, Gebühr dafür nicht geprüft **[Unbekannt]** | ebd. |
| Stripe Klarna | ab 2,99 % + 0,35 € | – | ebd. |
| **Stripe Billing** (Abos) | **+0,7 %** des Abo-Volumens | kommt bei Abos zu den Kartengebühren dazu | ebd. |
| Stripe Tax | 0,5 % je Transaktion (No-Code) | erst nötig bei EU-Verkäufen über OSS-Schwelle (10.000 €) **[Prüfen]** | ebd. |
| Stripe Rückbuchung | 20 € je Fall (+20 € für Widerspruch, erstattet bei Erfolg) | – | ebd. |
| **PayPal Checkout** (gewerblich, DE) | **2,99 % + 0,39 €** | **Korrektur zum Auftrag:** 2,49 % + 0,35 € gilt nur für „Waren und Dienstleistungen senden/empfangen“, nicht für den Checkout. Fixgebühr wird bei Erstattung einbehalten. Rückbuchung 16 €, Konfliktgebühr 14 €. Micropayments 4,99 % + 0,09 € (nur nach Freigabe; bei 6,99 € **günstiger** als Standard: 0,44 € statt 0,60 €) | [PayPal Gebühren DE](https://www.paypal.com/de/business/paypal-business-fees) (Stand der Seite 07.09.2026) |
| **Paddle** (Merchant of Record) | **5 % + 0,50 $** | inkl. USt-Abführung weltweit, Betrug, Rückbuchungen, Käufer-Support; für Produkte < 10 $ individuelle Preise auf Anfrage | [paddle.com/pricing](https://www.paddle.com/pricing) |
| **Lemon Squeezy** (MoR) | **5 % + 0,50 $** | außerhalb USA „kleine Zusatzgebühren“; gehört inzwischen zu Stripe („Sold through Link, LLC“), Übergang zu **Stripe Managed Payments** | [lemonsqueezy.com/pricing](https://www.lemonsqueezy.com/pricing) |
| Stripe Managed Payments (MoR) | ca. **+3,5 %** auf die Stripe-Kartengebühr | Primärquelle: stripe.com/de/pricing („3,5 % pro erfolgreicher Transaktion mit Managed Payments zusätzlich zu Zahlungsgebühren“) (korr. 10) | [stripe.com/de/pricing](https://stripe.com/de/pricing); [userjot](https://userjot.com/blog/stripe-managed-payments-for-saas); [dodopayments](https://dodopayments.com/blogs/stripe-managed-payments-fees-explained) (Wettbewerber) |
| **Digistore24** (Reseller/MoR) | **7,9 % + 1 €** | Erstattung kostet 0,60 €/1 € extra; Reserve 10 % für 60 Tage laut Dritten | [Digistore24 Hilfe](https://help.digistore24.com/hc/en-us/articles/23694504392721); [Fastlancer 07/2026](https://www.fastlancer.org/fastlancer-blog/digistore24-review/) |
| **CopeCart** (Reseller) | **4,9 % + 1 €** vom Brutto | keine Grundgebühr; US-Seiten nennen abweichende Sätze | [CopeCart Hilfe EU](https://help-eu.copecart.com/en/articles/9061163-copecart-fee) |
| **Apple App Store** (EU, neue Bedingungen ab 01.10.2026) | In-App-Kauf 26 % Standard, **15 %** im Small Business Program und für Abos ab dem 2. Jahr; alternative Zahlung 20 %/10 %; Link-out 15 %/10 % | nur nach Zustimmung zu den neuen EU-Bedingungen; Core Technology Fee entfällt (ob eine 5-%-„Commission“ bleibt, widersprüchlich) **[Prüfen]** | [basic-tutorials.de](https://basic-tutorials.de/news/apple-app-store-eu-neue-gebuehren-und-regeln/); [Daring Fireball 08/2026](https://daringfireball.net/2026/08/apple_eu_business_terms_conceding_little) |
| **Google Play** | Abos **15 %**; neues EWR-Modell ab 30.06.2026 (Service- + Abrechnungsgebühr getrennt) | Details nicht belegt **[Prüfen]** | [splitmetrics](https://splitmetrics.com/blog/google-play-apple-app-store-fees/); [magora 10/2026](https://magora-systems.com/google-play-developer-account-cost/) |

**Annahme für das Modell (Stripe-Mix) [Annahme]:** 55 % Karte (Ø 1,9 % + 0,25 €, Mischung Standard/Premium), 35 % PayPal (2,99 % + 0,39 €), 10 % SEPA (0,35 €), bei Abos zusätzlich 0,7 % Billing. Ergebnis: **ca. 0,50 € Gebühr bei 6,99 €**, **1,57 € bei 44,99 €**, **0,69 € bei 17,99 €**.

### 2.2 Nettoerlös je Zahlung nach USt (19 %) und Gebühren

Die App ist eine elektronische Dienstleistung → **19 % USt**, nicht 7 % wie beim E-Book **[Prüfen: Steuerberatung]**. Kleinunternehmerregelung voraussichtlich nicht anwendbar, weil die Umsätze aller Unternehmen des Inhabers (Honigmama, DURCHSCHICHT, Essensplaner) zusammengerechnet werden **[Annahme, Prüfen]**. Beim MoR (Paddle, Digistore24, CopeCart) führt der Anbieter die USt ab; gerechnet ist hier vereinfachend „Netto − Gebühr auf Brutto“.

| Produkt | Brutto | Netto (÷ 1,19) | Stripe-Mix | Paddle | CopeCart | Digistore24 | App Store 15 % |
|---|---|---|---|---|---|---|---|
| Plus Monat | 6,99 € | 5,87 € | **5,37 €** | 5,09 € | 4,53 € | 4,32 € | 4,99 € |
| Plus Jahr | 44,99 € | 37,81 € | **36,24 €** | 35,13 € | 34,60 € | 33,25 € | 32,14 € |
| Montage-Pass 3 Monate | 17,99 € | 15,12 € | **14,43 €** | 13,79 € | 13,24 € | 12,70 € | 12,85 € |
| Einmalkauf (Alternative B) | 29,99 € | 25,20 € | 24,27 € | 23,27 € | 22,73 € | 21,83 € | 21,42 € |
| Lifetime (nicht empfohlen) | 79,99 € | 67,22 € | 65,24 € | 62,79 € | 62,30 € | 59,90 € | 57,14 € |
| Monat hoch (Alternative C) | 9,99 € | 8,39 € | 7,81 € | 7,47 € | 6,91 € | 6,61 € | 7,14 € |
| Jahr hoch (Alternative C) | 59,99 € | 50,41 € | 48,43 € | 46,98 € | 46,47 € | 44,67 € | 42,85 € |

Paddle-Fixanteil mit 0,50 $ ≈ 0,43 € umgerechnet **[Annahme Kurs]**.

**[Interpretation]** Zwischen Stripe und Paddle liegen beim Monatsabo 0,28 €, beim Jahresabo 1,11 € je Zahlung. Bei 100 Jahresabos sind das ≈ 110 € im Jahr – weniger als eine Stunde Steuerberatung für OSS-Fragen. **Start mit Stripe** (DE-Kunden), **Wechsel zu Paddle** erwägen, sobald nennenswert EU-/CH-Kundschaft kommt. Digistore24/CopeCart sind für ein Abo-Produkt mit kleinen Beträgen am teuersten (1-€-Fixanteil).

### 2.3 Fixkosten pro Monat

| Posten | Konservativ | Realistisch | Optimistisch | Quelle / Status |
|---|---|---|---|---|
| Hosting PWA (Cloudflare Pages; Alternativen Netlify, Hetzner) | 5 € | 0–5 € | 0 € | Cloudflare Pages Free: 500 Builds/Monat, Bandbreite für statische Dateien ohne Limit laut Dritten; Workers Paid ca. 5 $/Monat ([Cloudflare Docs](https://developers.cloudflare.com/pages/platform/limits); [temps.sh](https://temps.sh/blog/cloudflare-pages-free-tier-limits-2026)) |
| Supabase (Konto, Speicherstände; EU-Region wählen) | 23 € | 23 € | 23 € | Free: 50.000 MAU, 500 MB, **pausiert nach 1 Woche Inaktivität** → für Produktion Pro **25 $/Monat** ([supabase.com/pricing](https://supabase.com/pricing)); EU-Region/DPA auf der Preisseite nicht genannt **[Prüfen]** |
| Domain (.de) | 1 € | 1 € | 1 € | ca. 5–15 €/Jahr **[Annahme]** |
| E-Mail-Tool mit Double-Opt-in | 16 € | 7 € | 0 € | Brevo Free 300 Mails/Tag mit Brevo-Logo, Starter ab 7 €/Monat netto, Logo entfernen +9 € ([trusted.de](https://trusted.de/brevo-kosten); [emailtooltester](https://www.emailtooltester.com/de/?p=10551)); MailerLite Free bis 250 Abonnenten / 2.500 Mails, bezahlt ab 12 $/Monat ([mailerlite.com/pricing](https://www.mailerlite.com/pricing)) |
| Rechtstexte-Abo (AGB, Datenschutz, Widerruf, Abo) | 25 € | 15 € | 10 € | **[Annahme]**; bei DURCHSCHICHT 9,90–24,90 € angesetzt |
| Steuerberatung (Mehraufwand durch Abo-Umsätze, ggf. OSS) | 70 € | 50 € | 40 € | **[Annahme]**, Angebot einholen |
| Analyse/Monitoring (datensparsam) | 10 € | 9 € | 0 € | **[Annahme]** |
| **Summe** | **≈ 150 €** | **≈ 110 €** | **≈ 90 €** | im Modell verwendet (Optimistisch-Summe gerundet) |
| Variabel je zahlendem Nutzer und Monat | 0,10 € | 0,10 € | 0,10 € | Support/Infrastruktur **[Annahme]**; keine KI-Kosten pro Plan (regelbasiert im Browser) |
| Einmalige Startkosten (Rezepttests, Higgsfield über Kontingent, Rechtsprüfung, Logo) | 1.500 € | 1.200 € | 1.000 € | **[Annahme]**, Eigenzeit nicht bewertet |

Optional später: LLM-Funktion. Dann je Plan Kosten in Cent-Bereich, abhängig von Modell und Tokens **[Unbekannt]** – nur als Plus-Funktion mit Kontingent einführen, nicht im Free-Tarif.

---
## 3. Unit Economics und Szenarien

> Ersetzt durch Abschnitt 9 (Paddle, 4 Tarife, Startkosten). Die Tabellen unten bleiben als Stand 28.10.2026 stehen.

### 3.1 Begriffe und Formeln

- **Nettoerlös N** = Brutto ÷ 1,19. **Erstattung r** = 5 % (RevenueCat-H&F-Wert 4,71 % gerundet; Westeuropa eher < 3 %) **[Annahme]**.
- **Deckungsbeitrag je Zahlung (DB)** = N × (1 − r) − Zahlungsgebühr − variable Kosten (0,10 € je Nutzer-Monat).
  → **Monat 4,98 € · Jahr 33,15 € · Pass 13,38 €**.
- **LTV Monatsabo** = DB ÷ monatliche Kündigungsquote. **LTV Jahresabo** = DB ÷ (1 − Verlängerungsquote). **LTV Pass** = DB × (1 + Wiederkaufquote).
- **Ziel-CAC** = LTV ÷ 3 (Vorgabe). **Max-CAC** = LTV (Break-even ohne Fixkosten).
- **Paid-CAC** = CPC ÷ (Kaufquote je Linkklick).

### 3.2 LTV und Ziel-CAC je Preisoption (Stripe-Mix)

| Annahme **[Annahme]** | Konservativ | Realistisch | Optimistisch |
|---|---|---|---|
| Kündigung Monatsabo je Monat | 20 % | 15 % | 10 % |
| Verlängerung Jahresabo | 20 % | 30 % | 40 % |
| Wiederkauf Montage-Pass | 10 % | 20 % | 30 % |

| Produkt | LTV kons. | LTV real. | LTV opt. | **Ziel-CAC real. (LTV/3)** |
|---|---|---|---|---|
| Plus Monat 6,99 € | 24,88 € | 33,17 € | 49,76 € | **11,06 €** |
| Plus Jahr 44,99 € | 41,44 € | 47,36 € | 55,25 € | **15,79 €** |
| Montage-Pass 17,99 € | 14,71 € | 16,05 € | 17,39 € | **5,35 €** |
| Mix (real. 45 % Monat / 40 % Jahr / 15 % Pass) | 29,15 € | **36,28 €** | 49,27 € | **12,09 €** |
| Alternative C: Monat 9,99 € | 36,44 € | 48,58 € | 72,87 € | 16,19 € |
| Alternative C: Jahr 59,99 € | 55,88 € | 63,87 € | 74,51 € | 21,29 € |

Zum Vergleich: RevenueCat-Median des realisierten LTV je Zahler in H&F: 24,23 $ (Monat), 35,64 $ (Jahr). Die Annahmen liegen in derselben Größenordnung.

**[Interpretation]** Der Pass ist als **Einstiegsprodukt** sinnvoll, aber kein Werbeprodukt (Ziel-CAC ≈ 5 €). Werbung lohnt sich, wenn überhaupt, nur auf das **Jahresabo**.

### 3.3 Break-even der Fixkosten

- Durchschnittlicher DB je zahlendem Nutzer und Monat ≈ 3,50–4,50 € (Jahresabo 33,15 € ÷ 12 = 2,76 €; Monat 4,98 €; Pass 13,38 € ÷ 3 = 4,46 €).
- **Fixkosten 110 €/Monat ÷ ≈ 3,70 € ≈ 30 zahlende Nutzer** (realistisch); konservativ 150 € ÷ 3,70 € ≈ **40**.
- Startkosten 1.200 € zusätzlich: bei 100 zahlenden Nutzern und ohne Werbung ≈ 260 € DB-Überschuss pro Monat → **≈ 5 Monate** Amortisation ab diesem Bestand.

### 3.4 Meta-Ads-Benchmarks Deutschland

| Quelle | CPM | CPC | CTR | Basis |
|---|---|---|---|---|
| Keyman Consulting (Website-Besuche) | 5,19–11,01 € | **0,36–0,67 €** | 1,2–1,7 % (Link) | 6 Kampagnen, 5 Konten, 01.01.–27.09.2026 (dünn) |
| Keyman Consulting (Lead-Formulare) | 11–29 € (Median 23 €) | 1,11–3,26 € (Median 2,10 €) | 0,8–1,2 % | 71 Kampagnen, 20 Konten DE, 152.763 € Spend |
| Superads (über Keyman zitiert) | Ø **14,80 €** (Feb 2026 9,81 €, Nov 2025 23,74 €) | Ø **0,91 €** (0,76–1,33 €) | – | 09/2025–08/2026, alle Ziele gemischt |
| zweidigital (über Keyman zitiert) | ≈ 6 € | ≈ 0,40 € | – | 09/2026, > 100 große Kunden |
| Lebesgue (über Keyman zitiert) | 9,05 $ | – | – | 2026, > 1.400 Onlineshops |
| recvision (zitiert WordStream 2025) | 4,50–12 € | 0,38–0,52 € (B2C) | 2–5 % „bei guten Creatives“ (ohne Quelle) | Agentur-Blog |

Quellen: [keymanconsulting.de](https://keymanconsulting.de/rechner/instagram-facebook-werbung-kosten/), [recvision.de](https://recvision.de/blog/meta-ads-kosten-2026/).
**[Interpretation]** Für Traffic-Kampagnen in DE sind **0,40–0,90 € CPC** und **6–15 € CPM** plausibel; im Q4 (Nov/Dez) deutlich teurer. Agenturquellen haben Eigeninteresse; im eigenen Test messen (Windsor.ai-Connector).

### 3.5 Welche Kaufquote je Linkklick braucht Werbung?

Nötige Kaufquote = CPC ÷ Ziel-CAC.

| Ziel-CAC \ CPC | 0,45 € | 0,60 € | 0,90 € |
|---|---|---|---|
| 11 € (Monatsabo) | 4,1 % | 5,5 % | 8,2 % |
| 13 € (Mix) | 3,5 % | 4,6 % | 6,9 % |
| 16 € (Jahresabo) | 2,8 % | 3,8 % | 5,6 % |

In den Szenarien liegt die Kaufquote je Besucher bei **0,32 % / 0,72 % / 1,28 %** → **Paid-CAC 281 € / 83 € / 35 €**. **[Interpretation]** Selbst optimistisch liegt der bezahlte CAC über dem Ziel-CAC. Werbung ist deshalb im Modell nur ein **gedeckelter Test** (konservativ: 3 Monate, dann Stopp; realistisch: 3 Monate 300 €, dann 150 € Retargeting/Lookalike). Regel: Eine Anzeige wird gestoppt, wenn sie ohne Kauf etwa **2 × Ziel-CAC (≈ 25–30 €)** ausgegeben hat; skaliert wird erst, wenn der im Stripe-Dashboard bestätigte CAC über ≥ 10 Käufe unter 16 € liegt.

### 3.6 Szenario-Annahmen (12 Monate) **[alle Annahme]**

| Größe | Konservativ | Realistisch | Optimistisch |
|---|---|---|---|
| Organische Besucher Monat 1 (SEO, Cross-Sell Honigmama/DURCHSCHICHT, Gruppen, Creator) | 250 | 500 | 800 |
| Wachstum organisch je Monat | +8 % | +12 % | +15 % |
| Werbebudget | 250 €/Monat in M1–3, danach 0 € | 300 € in M1–3, danach 150 € | 300 → 1.000 € (steigend) |
| CPC | 0,90 € | 0,60 € | 0,45 € |
| Besucher → Lead (Gratis-Konto/DOI) | 8 % | 12 % | 16 % |
| Lead → Käufer | 4 % | 6 % | 8 % |
| Mix Monat / Jahr / Pass | 50 / 35 / 15 % | 45 / 40 / 15 % | 40 / 50 / 10 % |
| Kündigung Monatsabo | 20 % | 15 % | 10 % |
| Fixkosten | 150 € | 110 € | 90 € |
| Startkosten (Monat 1) | 1.500 € | 1.200 € | 1.000 € |

Weitere Regeln: Jahresabos werden bei Kauf vollständig als Einnahme gezählt (Kassenblick); Verlängerungen fallen erst ab Monat 13 an und fehlen deshalb in der Tabelle. Pässe laufen 3 Monate. „Aktive Zahlende“ = laufende Monatsabos + Jahresabos + aktive Pässe. „Erlös netto“ = nach USt und 5 % Erstattung. „Fix + Gebühren + var.“ enthält Zahlungsgebühren und 0,10 € je Nutzer. „Ergebnis“ = Erlös netto − Werbung − Fix/Gebühren/variabel; kumuliert inkl. Startkosten. Gleiche Daten mit Ads- und organischen Besuchern getrennt: `essensplaner/finanzen/szenarien.csv` (Semikolon, Dezimalkomma).

### 3.7 Konservativ
| Monat | Besucher | Leads | Neue Käufer | Aktive Zahlende | Umsatz brutto | Erlös netto | Werbung | Fix+Gebühren+var. | Ergebnis | kumuliert |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 528 | 42 | 2 | 2 | 37 € | 30 € | 250 € | 152 € | -372 € | -1.872 € |
| 2 | 548 | 44 | 2 | 3 | 43 € | 34 € | 250 € | 152 € | -368 € | -2.240 € |
| 3 | 569 | 46 | 2 | 5 | 49 € | 39 € | 250 € | 153 € | -364 € | -2.604 € |
| 4 | 315 | 25 | 1 | 5 | 34 € | 27 € | 0 € | 152 € | -125 € | -2.729 € |
| 5 | 340 | 27 | 1 | 6 | 36 € | 29 € | 0 € | 152 € | -123 € | -2.852 € |
| 6 | 367 | 29 | 1 | 6 | 39 € | 31 € | 0 € | 153 € | -122 € | -2.974 € |
| 7 | 397 | 32 | 1 | 7 | 42 € | 33 € | 0 € | 153 € | -120 € | -3.094 € |
| 8 | 428 | 34 | 1 | 7 | 45 € | 36 € | 0 € | 153 € | -117 € | -3.211 € |
| 9 | 463 | 37 | 2 | 8 | 48 € | 38 € | 0 € | 153 € | -115 € | -3.326 € |
| 10 | 500 | 40 | 2 | 9 | 52 € | 41 € | 0 € | 154 € | -112 € | -3.438 € |
| 11 | 540 | 43 | 2 | 10 | 56 € | 44 € | 0 € | 154 € | -109 € | -3.548 € |
| 12 | 583 | 47 | 2 | 11 | 60 € | 48 € | 0 € | 154 € | -106 € | -3.654 € |
**Summe 12 Monate:** Erlös netto ≈ 430 €, Käufe ≈ 18, Ergebnis kumuliert inkl. Startkosten ≈ -3654 €.

### 3.8 Realistisch
| Monat | Besucher | Leads | Neue Käufer | Aktive Zahlende | Umsatz brutto | Erlös netto | Werbung | Fix+Gebühren+var. | Ergebnis | kumuliert |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1.000 | 120 | 7 | 7 | 172 € | 137 € | 300 € | 118 € | -281 € | -1.481 € |
| 2 | 1.060 | 127 | 8 | 14 | 201 € | 161 € | 300 € | 120 € | -260 € | -1.740 € |
| 3 | 1.127 | 135 | 8 | 22 | 230 € | 184 € | 300 € | 123 € | -239 € | -1.979 € |
| 4 | 952 | 114 | 7 | 26 | 216 € | 173 € | 150 € | 123 € | -100 € | -2.079 € |
| 5 | 1.037 | 124 | 8 | 31 | 241 € | 193 € | 150 € | 125 € | -82 € | -2.161 € |
| 6 | 1.131 | 136 | 8 | 36 | 268 € | 214 € | 150 € | 127 € | -63 € | -2.224 € |
| 7 | 1.237 | 148 | 9 | 42 | 297 € | 237 € | 150 € | 129 € | -42 € | -2.266 € |
| 8 | 1.355 | 163 | 10 | 48 | 328 € | 262 € | 150 € | 131 € | -19 € | -2.285 € |
| 9 | 1.488 | 179 | 11 | 54 | 363 € | 290 € | 150 € | 133 € | 6 € | -2.278 € |
| 10 | 1.637 | 196 | 12 | 62 | 401 € | 320 € | 150 € | 136 € | 34 € | -2.245 € |
| 11 | 1.803 | 216 | 13 | 70 | 443 € | 354 € | 150 € | 139 € | 65 € | -2.180 € |
| 12 | 1.989 | 239 | 14 | 79 | 490 € | 391 € | 150 € | 142 € | 99 € | -2.081 € |
**Summe 12 Monate:** Erlös netto ≈ 2914 €, Käufe ≈ 114, Ergebnis kumuliert inkl. Startkosten ≈ -2081 €.

### 3.9 Optimistisch
| Monat | Besucher | Leads | Neue Käufer | Aktive Zahlende | Umsatz brutto | Erlös netto | Werbung | Fix+Gebühren+var. | Ergebnis | kumuliert |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1.467 | 235 | 19 | 19 | 509 € | 406 € | 300 € | 112 € | -6 € | -1.006 € |
| 2 | 1.587 | 254 | 20 | 38 | 597 € | 477 € | 300 € | 119 € | 58 € | -947 € |
| 3 | 2.391 | 383 | 31 | 68 | 923 € | 737 € | 600 € | 136 € | 1 € | -946 € |
| 4 | 2.550 | 408 | 33 | 96 | 1.046 € | 835 € | 600 € | 146 € | 89 € | -857 € |
| 5 | 3.177 | 508 | 41 | 131 | 1.329 € | 1.061 € | 800 € | 162 € | 99 € | -759 € |
| 6 | 3.387 | 542 | 43 | 166 | 1.481 € | 1.183 € | 800 € | 174 € | 208 € | -550 € |
| 7 | 3.850 | 616 | 49 | 206 | 1.720 € | 1.373 € | 900 € | 190 € | 283 € | -267 € |
| 8 | 4.128 | 660 | 53 | 247 | 1.902 € | 1.519 € | 900 € | 204 € | 414 € | 147 € |
| 9 | 4.669 | 747 | 60 | 294 | 2.176 € | 1.737 € | 1.000 € | 222 € | 515 € | 662 € |
| 10 | 5.037 | 806 | 64 | 343 | 2.398 € | 1.914 € | 1.000 € | 239 € | 675 € | 1.337 € |
| 11 | 5.459 | 873 | 70 | 396 | 2.641 € | 2.109 € | 1.000 € | 257 € | 852 € | 2.188 € |
| 12 | 5.944 | 951 | 76 | 452 | 2.911 € | 2.324 € | 1.000 € | 277 € | 1.047 € | 3.235 € |
**Summe 12 Monate:** Erlös netto ≈ 15673 €, Käufe ≈ 559, Ergebnis kumuliert inkl. Startkosten ≈ 3235 €.

### 3.10 Was die Szenarien sagen

- **Konservativ:** Nach dem Werbetest bleiben ≈ 11 Zahlende; die Fixkosten werden nie gedeckt (−3.654 € nach 12 Monaten). **Abbruch- bzw. Umbaukriterium:** weniger als 15 zahlende Nutzer nach 6 Monaten.
- **Realistisch:** Monatlich positiv ab **Monat 9**, ≈ 79 Zahlende nach 12 Monaten, kumuliert −2.081 €. Amortisation der Startkosten bei gleichem Trend etwa im **2. Jahr** (Monat 20–24) **[Extrapolation]**; die erste Welle Jahresverlängerungen (Monat 13) hilft zusätzlich.
- **Optimistisch:** Kumuliert positiv ab **Monat 8**, ≈ 450 Zahlende, +3.235 € nach 12 Monaten.
- **Größter Hebel ist nicht der Preis, sondern Besucher → Käufer und organische Reichweite.** Ein Prozentpunkt mehr Lead→Käufer verändert das Ergebnis stärker als 1 € mehr Preis. Der Preis kann später (für Neukunden) angehoben werden; Bestandskunden zum alten Preis behalten, solange sie nicht kündigen (Pricing-Skill: „Test on new customers first“).
- **Vorsichtsregel:** Bei Supermarkt-Preisdaten fallen eventuell Lizenzkosten an (siehe Recherche Datenquellen) – im Modell **nicht** enthalten **[Unbekannt]**.

---
## 4. Preis-Empfehlung je Variante

### 4.1 Grundsatzentscheidung: eine Preisstruktur für alle Varianten

**Empfehlung:** Ein Preissystem für alle Nischen, unterschiedliche **Landingpages, Bilder und Texte** je Variante. Gründe:
1. Varianten nutzen dieselbe Planer-Logik; getrennte Preise würden Kunden verwirren, die zwei Nischen gleichzeitig angehören (Monteur + Fitness).
2. Unterschiedliche Preise für dasselbe Produkt je Landingpage sind zwar zulässig, wirken aber unfair, wenn sie bekannt werden (Vertrauen bei kleiner Marke) **[Interpretation]**.
3. Die **Unterschiede in der Zahlungsbereitschaft** werden über das **Produktformat** abgebildet: Monteure bekommen den **Pass** prominent, Fitness das **Jahresabo mit Makros**, die allgemeine Variante den **Gratis-Einstieg**.
4. Preis zentral konfigurierbar halten (eine Datei, z. B. `app/config/preise.json`), damit Änderungen ohne Code möglich sind.

### 4.2 Hauptempfehlung (Variante A) – „Gratis · Monat · Jahr · Pass“

| Stufe | Preis | Inhalt | Rolle |
|---|---|---|---|
| **Gratis** | 0 € | Geräte-/Unterkunftsfilter, 1 Tagesplan pro Woche, Einkaufsliste für diesen Tag, kein Export | Lead-Magnet, „Aha-Moment“ vor der Zahlung |
| **Plus Monat** | **6,99 €/Monat**, monatlich kündbar | alles: Wochen-/Monatspläne, Budget je Laden, Personen, Allergien, Diät, Makros, Meal-Prep-Ablauf, PDF/Handy-Export | Einstieg für Unentschlossene |
| **Plus Jahr** (vorausgewählt) | **44,99 €/Jahr** (entspricht 3,75 €/Monat, 46 % unter 12 × 6,99 €) | wie Monat; 7 Tage kostenlos testen, Erinnerung 2 Tage vor der ersten Abbuchung | Hauptprodukt |
| **Montage-Pass 3 Monate** | **17,99 € einmalig**, endet automatisch | wie Plus, 90 Tage | Monteure, Projekt-/Saisonarbeit, Ausprobieren ohne Abo |

Begründung der Preispunkte:
- **6,99 €** liegt im Band der Koch-Apps (Chefkoch PLUS 5,99 €, Kitchen Stories 7,99 €) und unter den Trackern (9,99 €+). Der Pricing-Skill warnt vor der „9-$-Falle“ (zu billig, falsche Signale); 6,99 € ist für ein Consumer-Produkt im deutschen Markt keine Billigpositionierung, sondern Marktmitte.
- **44,99 €** liegt zwischen Chefkoch PLUS (29,99–49,99 €), Yazio (35,90 €), MyFitnessPal (49,99 €) und KptnCook-Wochenplan (59,99 €), nahe am RevenueCat-Median 39,94 $. Darüber (59,99 €) bräuchte es Bekanntheit oder belegte Ersparnis.
- **17,99 €** für 3 Monate = 6,00 €/Monat → bewusst **teurer pro Monat als das Jahr**, günstiger als 3 × 6,99 € (20,97 €). So kannibalisiert der Pass das Jahresabo nicht.

### 4.3 Je Variante: Darstellung und Argumente

| Variante | Zahlungsbereitschaft (Belege / Annahmen) | Was prominent gezeigt wird | Rahmung (nur belegbare Aussagen) |
|---|---|---|---|
| **Montage** | Inländische Verpflegungspauschale **14 € / 28 € pro Tag** (§ 9 Abs. 4a EStG; [steuerschroeder.de](https://www.steuerschroeder.de/Werbungskosten_Verpflegung.html), [finom](https://finom.co/de-de/blog/verpflegungspauschale/)) zeigt das Tagesbudget, mit dem Monteure rechnen; ob die Pauschale ausgezahlt wird, hängt vom Arbeitgeber ab **[Annahme]**. Einsätze sind zeitlich begrenzt → Abo-Skepsis wahrscheinlich **[Annahme]** | **Montage-Pass** zuerst, Jahresabo als „für Dauer-Monteure“ | „17,99 € für 90 Tage – das sind 20 Cent pro Tag.“ (rechnerisch richtig). **Nicht** behaupten „spart X € pro Woche“, solange die Ersparnis nicht gemessen ist (UWG). Später prüfen: **Firmenlizenz** für Montagefirmen (B2B, Rechnung netto, mehrere Plätze) |
| **Fitness** | an 5–10 €/Monat gewöhnt (MyFitnessPal 9,99 €, Lifesum 9,99–14,99 €, Yazio-Jahr 35,90 €; RevenueCat-Median 9,99 $) | **Jahresabo** vorausgewählt; Makro-Einstellungen im Gratis-Plan sichtbar, aber Wochenplan erst in Plus | „Plant Makros, Einkauf und Meal-Prep in einem“ – keine Abnehm- oder Gesundheitsversprechen (HWG, Health-Claims-VO) |
| **Dritte Nische** (wird gesondert gewählt) | **[Unbekannt]** bis zur Nischenentscheidung | gleiche Struktur; ggf. eigener Pass (z. B. „Semester-Pass“), wenn die Nische zeitlich begrenzt ist | nach Nischenrecherche |
| **Allgemein** | preissensibel; Referenz Chefkoch PLUS 29,99 € (Aktion) – 49,99 €/Jahr | **Gratis-Stufe** + Jahresabo | „Weniger überlegen, was es heute gibt“ statt Preisversprechen |

### 4.4 Preispsychologie (ethisch, nach deutschem Recht)

- **Anker:** Auf der Preisseite zuerst den Monatspreis zeigen, dann das Jahresabo mit „entspricht 3,75 €/Monat“. Die Ersparnis „46 % günstiger als 12 Monate Monatsabo“ ist rechnerisch belegt und zulässig. **Keine Streichpreise** („statt 59,99 €“), solange kein früherer Preis bestand – bei Preisermäßigungen gilt der niedrigste Preis der letzten 30 Tage (§ 11 PAngV) **[Prüfen]**.
- **Jahresplan als Voreinstellung (Default Effect):** zulässig, solange der Monatsplan gleich sichtbar und gleich leicht wählbar ist. Gesamtpreis (44,99 €) muss **mindestens so deutlich** wie der Monatsgegenwert stehen (PAngV-Grundsatz der Preisklarheit) **[Prüfen]**.
- **,99 statt glatt:** ,99 wie der Markt (Chefkoch, KptnCook, Kitchen Stories, MyFitnessPal). Glatte Preise wirken „premium“ (Marketing-Psychology-Skill); das passt nicht zur Positionierung „praktisch, Budget“. Ein A/B-Test 44,99 € vs. 45 € lohnt nicht bei kleinen Fallzahlen.
- **Drei Optionen statt mehr (Hick's Law / Paradox of Choice):** Monat, Jahr, Pass. Kein „Decoy“-Tarif ohne echten Zweck.
- **Mental Accounting:** „20 Cent pro Tag“ beim Pass, „3,75 € im Monat“ beim Jahr – nur mit Gesamtpreis daneben.
- **Endowment / IKEA-Effekt:** Gratis-Nutzer richten ihre Geräte, Läden und Allergien ein; beim Upgrade bleibt alles erhalten.
- **Verboten / nicht machen:** Fake-Countdowns, „nur noch heute“, erfundene Nutzerzahlen oder Bewertungen, versteckter „Weiter ohne Abo“-Link, vorangekreuzte Zusatzleistungen, Kündigung nur per Mail oder Hotline.

### 4.5 Abo-Fallen vermeiden (Pflichten und eigene Regeln)

1. **Kündigungsbutton § 312k BGB** auf der Website gut sichtbar, ohne Login erreichbar (OLG Nürnberg 2024: Button erst nach Login reicht nicht; Ausnahme denkbar, wenn der Dienst seiner Natur nach ohnehin Login erfordert, höchstrichterlich nicht geklärt, deshalb Button ohne Login bauen (korr. 10); OLG München 20.03.2025: Verstecken hinter „Weitere Links“ unzulässig – via [haendlerbund](https://www.haendlerbund.de/de/ratgeber/recht/kuendigungsbutton-nach-312k-bgb), [ferner-alsdorf](https://www.ferner-alsdorf.de/versteckter-kuendigungsbutton-ist-unzulaessig/)). Bestätigungsseite ohne Werbung/Halte-Angebote ([finanztip](https://www.finanztip.de/daily/neues-urteil-kuendigungsbutton-muss-werbefrei-sein/); BGH I ZR 200/25 vom 16.07.2026 laut [vzbv](https://www.vzbv.de/urteile/kuendigen-ohne-tricks), nicht im Volltext geprüft **[Prüfen]**).
2. **Auch der Pass braucht den Button:** BGH, Urteil vom 22.05.2025, **I ZR 161/24** („OTTO UP Plus“, Einmalzahlung, endet automatisch) – Dauerschuldverhältnis, außerordentliche Kündigung nicht ausschließbar ([vzbv](https://www.vzbv.de/urteile/bundesgerichtshof-kuendigungsbutton-ist-auch-bei-laufzeitvertraegen-mit-einmalzahlung); [it-recht-kanzlei](https://www.it-recht-kanzlei.de/kuendigungsbutton-bgh-feste-vertragslaufzeit-einmalzahlung.html); [beck-aktuell](https://www.beck-aktuell.de/heute-im-recht/rechtsprechung/bgh-izr16124-online-abo-kuendigung-schaltflaeche-2025-06-13)).
3. **Verlängerung des Jahresabos:** Bei AGB-Verträgen mit Verbrauchern darf sich ein Vertrag nach der Erstlaufzeit stillschweigend nur **auf unbestimmte Zeit mit höchstens einem Monat Kündigungsfrist** verlängern ([§ 309 Nr. 9 BGB](https://www.gesetze-im-internet.de/bgb/__309.html)). Umsetzung **[Prüfen: Jurist:in]**: entweder nach Jahr 1 monatlich kündbar mit anteiliger Erstattung, oder keine automatische Verlängerung (Erinnerung + 1-Klick-Verlängerung). Das senkt die Verlängerungsquote eher → Annahme 20–40 % ist vorsichtig gewählt.
4. **Button-Lösung § 312j Abs. 3 BGB:** Bestell-Button eindeutig, z. B. „Zahlungspflichtig abonnieren“; beim Testzeitraum klar „7 Tage gratis, danach 44,99 € pro Jahr“ **[Prüfen]**.
5. **Widerruf:** Projektregel ist § 356 Abs. 5 BGB mit Zustimmungs-Checkbox. Ob der Planer als **digitaler Inhalt** (Abs. 5) oder als **digitale Dienstleistung** (dann Abs. 4, ggf. anteiliger Wertersatz) gilt, muss die Juristin klären **[Prüfen]**.
6. **Eigene Fairness-Regeln:** Erinnerungsmail 2 Tage vor Trial-Ende und 7 Tage vor jeder Jahresabbuchung; Kündigung in 2 Klicks auch in der App; keine Preiserhöhung für laufende Abos ohne Zustimmung.

### 4.6 Zwei Alternativen

| | **A (Empfehlung)** | **B „Ohne Abo“ – nur Pässe** | **C „Premium“** |
|---|---|---|---|
| Struktur | Gratis · 6,99 €/Monat · 44,99 €/Jahr · Pass 17,99 € | Gratis · Pass 3 Monate 17,99 € · Pass 12 Monate 49,99 € (beide ohne Verlängerung) | Gratis · 9,99 €/Monat · 59,99 €/Jahr · 14 Tage Test |
| Stärke | Marktmitte, Abo-Erlös planbar, Pass deckt Abo-Skeptiker ab | Maximales Vertrauen („kein Abo“) – starkes Argument bei Monteuren und E-Book-Käufern; kein Verlängerungsrecht nötig | höherer LTV (Ziel-CAC 16–21 €) – macht Werbung realistischer |
| Schwäche | Ziel-CAC nur ≈ 12 € | Kein automatischer Wiederkauf → niedriger LTV; Kündigungsbutton trotzdem Pflicht | Höhe der Tracker-Apps ohne deren Bekanntheit; mehr Abbrüche erwartet **[Annahme]** |
| Wann wechseln | – | wenn im Test viele „Abo“-Abbrüche/Rückfragen auftreten | wenn Lead→Käufer bei 6,99 € > 8 % liegt („Prospects don't flinch“) |

---

## 5. Web-App vs. native App vs. PWA

| Kriterium | **PWA (Web-App, installierbar)** | Native App (iOS + Android) | Store-Hülle um Web-App (TWA/Capacitor) |
|---|---|---|---|
| Fixkosten Konten | 0 € | Apple Developer **99 $/Jahr**, Google Play **25 $ einmalig** ([splitmetrics](https://splitmetrics.com/blog/google-play-apple-app-store-fees/); [magora 10/2026](https://magora-systems.com/google-play-developer-account-cost/)) | wie nativ |
| Gebühr je Zahlung | Stripe ≈ 2–7 % (s. 2.1) | Apple 15 % (Small Business) bis 26 % in der EU; Google 15 % auf Abos; alternative Zahlung/Link-out günstiger, aber mit Auflagen **[Prüfen]** | wie nativ, wenn digitale Inhalte in der App verkauft werden |
| Entwicklung | eine Codebasis, Offline per Service Worker, Push auf iOS seit 16.4 für Home-Bildschirm-Web-Apps ([WebKit](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)) | zwei Plattformen oder Framework; Store-Review bei jedem Update | Zusatzaufwand gering bis mittel |
| Reichweite | Google-Suche, Links aus Ads, Mails, Gruppen; Installation auf iOS umständlicher (Safari → „Zum Home-Bildschirm“) | Store-Suche und -Vertrauen; Downloads konvertieren besser (RevenueCat D35 2,9 %) | Store-Präsenz ohne Neuentwicklung |
| Recht | Kündigungsbutton, Widerruf, Preisangaben **selbst** in der Hand → klar umsetzbar | Abo läuft über Apple/Google; Kündigung im Store-Konto. Ob das § 312k genügt, ist nicht entschieden; Verbraucherzentrale mahnte z. B. fraenk ab, weil nur die App eine Kündigung bot ([teltarif 2026](https://www.teltarif.de/arch/2026/kw28/s104573.html)) **[Prüfen]** | wie nativ, sobald Store-Abrechnung |
| Daten/DSGVO | eigene Kontrolle, EU-Hosting | zusätzlich Store-Datenschutzangaben | wie nativ |
| Netto bei 44,99 € | **36,24 €** | 32,14 € (15 %) bzw. ≈ 28,00 € (26 %) | wie nativ |

**Empfehlung:** **PWA zuerst**, Bezahlung über **Stripe Checkout + Kundenportal** (Kündigungsbutton führt dorthin bzw. auf eine eigene Kündigungsseite ohne Login). Store-Versionen erst, wenn (a) mindestens ≈ 100 zahlende Nutzer und (b) Hinweise, dass Kunden die App im Store suchen. Dann zuerst **Google Play als TWA** (25 $, geringe Kosten), iOS danach mit Link-out-Modell, falls die EU-Bedingungen das wirtschaftlich zulassen. Monteure ohne WLAN: Offline-Modus der PWA (Plan + Einkaufsliste lokal gespeichert) ist Pflicht.

---

## 6. Offene Punkte und Prüfaufträge

| Punkt | Wer | Status |
|---|---|---|
| USt 19 % auf das Abo, Aufteilung im Bundle (7/19 %), Kleinunternehmer ja/nein über alle drei Projekte, OSS ab 10.000 € EU-Umsatz | Steuerberatung | **[Prüfen]** |
| Buchpreisbindung bei Paketen mit E-Book | Jurist:in / Börsenverein | **[Prüfen]** |
| Verlängerung Jahresabo (§ 309 Nr. 9 BGB), Widerruf Abs. 4 vs. Abs. 5, Trial-Button-Text | Jurist:in | **[Prüfen]** |
| Supabase EU-Region + AVV, Brevo/MailerLite AVV | Entwickler:in / Jurist:in | **[Prüfen]** |
| Echte Kaufquoten, CPC, Kündigungsquoten | Performance-Marketing (nach Launch) | **[Unbekannt]** bis Test |
| Kosten Supermarkt-Preisdaten | Datenrecherche | **[Unbekannt]** |
| RevenueCat-Retention-Kurven (Vollversion PDF) | Finanzanalyse | Vollbericht bei Bedarf herunterladen |

---

## 7. Quellen (alle abgerufen am 28.10.2026)

**Benchmarks Abo-Apps:** [RevenueCat State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps) · [RevenueCat 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/) · [Adapty State of In-App Subscriptions 2026](https://adapty.io/state-of-in-app-subscriptions/) · [SaaStr: Learnings aus SOSA 2026](https://saastr.com/the-top-10-learnings-from-revenuecats-state-of-subscription-apps-how-115000-mobile-apps-deliver-16b-in-revenue-whats-working-whats-quietly-killing-growth) · [SaaStr: Learnings 2025](https://www.saastr.com/the-top-10-learnings-from-revenuecats-state-of-subscription-apps/)

**Konkurrenzpreise:** [Yazio App Store DE](https://apps.apple.com/de/app/yazio-kalorienz%C3%A4hler-fasten/id946099227) · [Lifesum App Store DE](https://apps.apple.com/de/app/lifesum-kalorien-z%C3%A4hler-ai/id286906691) · [MyFitnessPal App Store DE](https://apps.apple.com/DE/app/id341232718) · [Eat This Much App Store DE](https://apps.apple.com/de/app/id981637806) · [Eat This Much Review 2026](https://www.promealplan.com/en/blog/eat-this-much-review-2026) · [Mealime Lower Prices](https://www.mealime.com/lower-prices) · [Plan to Eat Pricing](https://www.plantoeat.com/pricing) · [Samsung Food (Ubergizmo 2024)](https://ubergizmo.com/2024/09/samsung-ai-food-platform) · [Samsung Newsroom DE](https://news.samsung.com/de/schluss-mit-pesto-pasta-samsung-prasentiert-neue-samsung-food-funktionen-auf-der-ifa-2024) · [KptnCook App Store DE](https://apps.apple.com/DE/app/id795495986) · [Chefkoch App Store DE](https://apps.apple.com/DE/app/id478618165) · [Kitchen Stories App Store DE](https://apps.apple.com/de/app/id771068291) · [Cookidoo-Preis (iphone-ticker)](https://www.iphone-ticker.de/thermomix-app-preis-fuer-cookidoo-abo-steigt-25-prozent-237796/)

**Zahlung:** [Stripe Preise DE](https://stripe.com/de/pricing) · [PayPal Gebühren DE](https://www.paypal.com/de/business/paypal-business-fees) · [Paddle Pricing](https://www.paddle.com/pricing) · [Lemon Squeezy Pricing](https://www.lemonsqueezy.com/pricing) · [Stripe Managed Payments (userjot)](https://userjot.com/blog/stripe-managed-payments-for-saas) · [dodopayments](https://dodopayments.com/blogs/stripe-managed-payments-fees-explained) · [Digistore24 Hilfe](https://help.digistore24.com/hc/en-us/articles/23694504392721) · [Fastlancer zu Digistore24](https://www.fastlancer.org/fastlancer-blog/digistore24-review/) · [CopeCart Gebühr EU](https://help-eu.copecart.com/en/articles/9061163-copecart-fee) · [Apple EU-Gebühren ab 01.10.2026 (basic-tutorials)](https://basic-tutorials.de/news/apple-app-store-eu-neue-gebuehren-und-regeln/) · [Daring Fireball 08/2026](https://daringfireball.net/2026/08/apple_eu_business_terms_conceding_little) · [Store-Gebühren (splitmetrics)](https://splitmetrics.com/blog/google-play-apple-app-store-fees/) · [Google-Play-Konto (magora)](https://magora-systems.com/google-play-developer-account-cost/)

**Infrastruktur:** [Supabase Pricing](https://supabase.com/pricing) · [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits) · [Cloudflare Free Tier 2026 (temps.sh)](https://temps.sh/blog/cloudflare-pages-free-tier-limits-2026) · [MailerLite Pricing](https://www.mailerlite.com/pricing) · [Brevo Kosten (trusted.de)](https://trusted.de/brevo-kosten) · [Brevo Preise (emailtooltester)](https://www.emailtooltester.com/de/?p=10551) · [WebKit: Web Push iOS](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)

**Werbung:** [Keyman Consulting – Meta-Kosten DE 2026](https://keymanconsulting.de/rechner/instagram-facebook-werbung-kosten/) · [recvision – Meta Ads Kosten 2026](https://recvision.de/blog/meta-ads-kosten-2026/)

**Recht/Steuer:** [§ 309 BGB](https://www.gesetze-im-internet.de/bgb/__309.html) · [§ 5 BuchPrG](https://lxgesetze.de/buchprg/5) · [VLB-Webinar Preisbindung](https://vlb.de/assets/images/Webinar_Preisbindung_20200326.pdf) · [it-recht-kanzlei: Gratisabgabe Bücher](https://www.it-recht-kanzlei.de/gratisabgabe-preisgebundene-buecher-buchpreisbindung.html) · [vzbv: BGH I ZR 161/24](https://www.vzbv.de/urteile/bundesgerichtshof-kuendigungsbutton-ist-auch-bei-laufzeitvertraegen-mit-einmalzahlung) · [it-recht-kanzlei: BGH Einmalzahlung](https://www.it-recht-kanzlei.de/kuendigungsbutton-bgh-feste-vertragslaufzeit-einmalzahlung.html) · [beck-aktuell](https://www.beck-aktuell.de/heute-im-recht/rechtsprechung/bgh-izr16124-online-abo-kuendigung-schaltflaeche-2025-06-13) · [vzbv: Kündigen ohne Tricks](https://www.vzbv.de/urteile/kuendigen-ohne-tricks) · [Händlerbund § 312k](https://www.haendlerbund.de/de/ratgeber/recht/kuendigungsbutton-nach-312k-bgb) · [Ferner Alsdorf](https://www.ferner-alsdorf.de/versteckter-kuendigungsbutton-ist-unzulaessig/) · [Finanztip: werbefrei](https://www.finanztip.de/daily/neues-urteil-kuendigungsbutton-muss-werbefrei-sein/) · [teltarif: fraenk](https://www.teltarif.de/arch/2026/kw28/s104573.html) · [Verpflegungspauschale (steuerschroeder)](https://www.steuerschroeder.de/Werbungskosten_Verpflegung.html) · [finom](https://finom.co/de-de/blog/verpflegungspauschale/)

**Nicht erneut abgerufen (Projektwissen):** Kalkulationsvorlage `recherche/Schichtkochbuch Markt und Vermarktung.md`, Abschnitt 7.
