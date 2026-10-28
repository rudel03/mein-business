# 08 · Pricing und Unit Economics (Essensplaner)

Stand: 28.10.2026 · Rolle: Finanzanalyse + Pricing (Prüfung durch Steuerberatung/Jurist:in steht aus) · Abrufdatum aller Web-Quellen: **28.10.2026**, sofern nicht anders angegeben.
Kennzeichnung: **[Beleg]** = Quelle verlinkt · **[Annahme]** = frei gesetzt, im Test zu messen · **[Unbekannt]** = nicht prüfbar · **[Prüfen]** = Fachprüfung nötig.
Methodik: Skills `pricing`, `paywalls`, `marketing-psychology` (US-geprägt; deutsches Recht hat Vorrang, keine Fake-Countdowns, keine versteckte Kündigung). Kalkulationslogik analog `recherche/Schichtkochbuch Markt und Vermarktung.md`, Abschnitt 7. Rechenmodell: Szenario-CSV `essensplaner/finanzen/szenarien.csv`.

---

## 0. Kurzfassung (für den Inhaber)

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
| Eat This Much | 8,99–84,99 € (8 Einträge, Laufzeit nicht zugeordnet) | „Winter Sale Yearly“ 55,99 € | Web: Dritte nennen 8,99–14,99 $/Monat | [App Store DE](https://apps.apple.com/de/app/id981637806); [promealplan](https://www.promealplan.com/en/blog/eat-this-much-review-2026) |
| Mealime Pro | 2,99 $ (bzw. Landespreis) | **kein Jahresabo mehr** | Preissenkung vom Anbieter angekündigt | [mealime.com/lower-prices](https://www.mealime.com/lower-prices) |
| Samsung Food+ | 6,99 $ (Stand 2024, USA) | [Unbekannt] | DE-Preis nicht gefunden | [Ubergizmo 2024](https://ubergizmo.com/2024/09/samsung-ai-food-platform); [Samsung Newsroom DE](https://news.samsung.com/de/schluss-mit-pesto-pasta-samsung-prasentiert-neue-samsung-food-funktionen-auf-der-ifa-2024) |
| Plan to Eat | 5,95 $ | 49 $ | 14 Tage Test ohne Karte | [plantoeat.com/pricing](https://www.plantoeat.com/pricing) |
| KptnCook Premium/Pro | 5,99 € (vermutlich Monat) | Premium 29,99–47,99 €; Pro 39,99–59,90 €; „Wochenplan 1 Jahr“ 59,99 € | „Wochenplaner für Rezepte“ 41,99 € | [App Store DE](https://apps.apple.com/DE/app/id795495986) |
| Chefkoch PLUS | 5,99 € | 29,99 € / 39,99 € / 49,99 € | Chefkoch PUR (werbefrei) 1,99 €/Monat, 14,99 €/Jahr | [App Store DE](https://apps.apple.com/DE/app/id478618165) |
| Kitchen Stories Plus | 7,99 € | 79,99 € (Angebote 19,99 € / 39,99 €) | – | [App Store DE](https://apps.apple.com/de/app/id771068291) |
| (Zusatz) Cookidoo | – | 60 € (Erhöhung von 48 €) | Thermomix-Bindung | [iphone-ticker](https://www.iphone-ticker.de/thermomix-app-preis-fuer-cookidoo-abo-steigt-25-prozent-237796/) |

**[Interpretation]** Der deutsche Markt hat zwei Preisbänder: **Rezept-/Koch-Apps** bei **30–60 €/Jahr bzw. 5,99–7,99 €/Monat** (Chefkoch, KptnCook, Kitchen Stories, Cookidoo) und **Tracker/Diät-Apps** bei **35–100 €/Jahr bzw. 9,99–22 €/Monat** (Yazio, Lifesum, MyFitnessPal). Fast alle zeigen dauerhaft Aktionspreise; der „Listenpreis“ dient als Anker. Mealime zeigt das Gegenrisiko: Preissenkung auf 2,99 $ und Abschaffung des Jahresabos. Ein neuer Planer ohne Markenbekanntheit sollte **im Band der Koch-Apps** starten, nicht bei den Trackern.

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
| Stripe Managed Payments (MoR) | ca. **+3,5 %** auf die Stripe-Kartengebühr | nur Sekundärquellen, Preisseite nicht erreichbar **[Prüfen]** | [userjot](https://userjot.com/blog/stripe-managed-payments-for-saas); [dodopayments](https://dodopayments.com/blogs/stripe-managed-payments-fees-explained) (Wettbewerber) |
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
