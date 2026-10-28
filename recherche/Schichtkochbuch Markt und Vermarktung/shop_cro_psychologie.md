# Shop-Setup, Kosten, CRO/UX-Evidenz und Kaufpsychologie: digitales Kochbuch (PDF) über einen schlanken Shopify-Shop in DE (Stand der Recherche: 27.10.2026)

> **Methodenhinweis (wichtig für die Weiterverwendung):** In dieser Sitzung war der direkte Seitenabruf (WebFetch/curl) für ALLE Domains technisch blockiert (DNS-/Proxy-Fehler, u. a. shopify.com, help.shopify.com, baymard.com). Alle Angaben unten stammen aus Suchergebnissen bzw. Such-Snippets (WebSearch, 27.10.2026) sowie aus der Shopify-Entwicklerdoku (shopify.dev über das Shopify-Doku-Tool). **Offizielle Preis- und Gebührenseiten (Shopify, Klarna, Händlerbund, App-Store-Einträge) konnten NICHT direkt geöffnet und geprüft werden.** Alle Preise vor Verwendung im Wirtschaftlichkeitsmodell auf den Originalseiten nachprüfen. Kommerzielle/Blog-Quellen sind als solche gekennzeichnet.

## 1. Shopify: Pläne, Gebühren, Apps, Recht, Steuern, Checkout

### Takeaway
Die Shopify-Planpreise für DE sind derzeit in Sekundärquellen widersprüchlich (laut einem Blog im September 2026 erhöht); nur Advanced (384 €/289 €) ist übereinstimmend. Rechtlich kritisch: Eine echte Pflicht-Checkbox für den Widerrufsverzicht (§ 356 Abs. 5 BGB) lässt sich im Shopify-Checkout auf Nicht-Plus-Plänen nicht nativ in die Informations-/Zahlungsschritte einbauen – es braucht Workarounds (Warenkorb-/Produktseiten-Checkbox, Apps) plus Bestätigungs-E-Mail nach § 312f BGB.

### Cited Findings
**Planpreise (DE, EUR) – nur Sekundärquellen, widersprüchlich**
- Zikanalytics (Blog, „Stand 1. Oktober 2026“): Basic 32 € monatlich / 24 € bei Jahreszahlung; Grow 92 € / 69 €; Advanced 384 € / 289 €; deutsche Preise laut Quelle im September 2026 erhöht — [Zikanalytics](https://www.zikanalytics.de/blog/shopify-kosten)
- Yagemi (Blog, Stand Juli 2026): Basic 33 €/25 €, Grow 88 €/66 € — [Yagemi](https://www.yagemi.de/blog/e-commerce/shopify-kosten/)
- Kassenklingeln/Greenblut (Blogs): Basic 36 €/25 €, Grow 105 €/66 € — [Kassenklingeln](https://kassenklingeln.de/shopify-kosten/); [Greenblut](https://www.greenblut.com/ratgeber/shopify-kosten)
- Falke Consulting (Stand Sept. 2026) und Ostend Digital nennen „ab 27 €“ (Jahreszahlung) — [Falke Consulting](https://falkeconsulting.com/pages/shopify-kosten); [Ostend Digital](https://ostend.digital/shopify-kosten/)
- Advanced: übereinstimmend 384 € monatlich bzw. 289 €/Monat jährlich — [Zikanalytics](https://www.zikanalytics.de/blog/shopify-kosten)
- Starter-Plan: Preis in DE nicht verlässlich gefunden (Gap).

**Shopify Payments Kartengebühren DE (online) – widersprüchlich**
- Mehrheit der Blogs: Basic 2,1 % + 0,30 €, Grow 1,8 % + 0,30 €, Advanced 1,6 % + 0,30 € — [Zusammenfassung mehrerer Blogs, u. a. Kassenklingeln](https://kassenklingeln.de/shopify-kosten/)
- Zikanalytics (Okt. 2026) dagegen: Basic 1,6 % + 0,25 €, Grow 1,5 % + 0,25 €, Advanced 1,4 % + 0,25 € (vermutlich EWR-Standardkarten vs. andere Kartenarten – nicht prüfbar) — [Zikanalytics](https://www.zikanalytics.de/blog/shopify-kosten)
- Bei Rückerstattungen wird die Shopify-Payments-Bearbeitungsgebühr laut Shopify-Hilfe nicht erstattet (auch bei Klarna) — [Shopify Help Center Klarna](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods/klarna)
- Wallets (Apple/Google Pay) haben laut Sekundärquellen keinen eigenen Aufschlag; es gilt die normale Kartenrate des Plans — [ecom-store.pro (Blog)](https://shopify.ecom-store.pro/blog/shop-pay-vs-apple-pay-vs-google-pay/)
- Klarna-Kosten DE: nur Drittschätzungen (Pay Now ca. 1,4–2,0 % + ~0,30 €; Rechnung ca. 2,5–4,5 % + ~0,35 €) — [monkeyman.agency (Agentur-Blog)](https://monkeyman.agency/insights/klarna-vs-sofort-vs-sepa-shopify-germany-2026/)
- Drittanbieter-Transaktionsgebühr ohne Shopify Payments: ältere Agenturseite nennt Basic 2,0 %, Shopify/Grow 1,0 %, Advanced 0,5 % (Seite ca. 900 Tage alt, evtl. veraltet) — [qualimero (Blog)](https://qualimero.com/en/blog/shopify-payments). Bei gemischtem Setup sollen Shop Pay/lokale Methoden einen Aufschlag von 1,25 % haben (US-Blog, unbestätigt für DE) — [ecom-store.pro](https://shopify.ecom-store.pro/blog/shop-pay-vs-apple-pay-vs-google-pay/)
- Mit Shopify Payments als Hauptanbieter entfällt die Drittanbietergebühr für PayPal-Transaktionen; PayPals eigene Gebühr bleibt — [Shopify DE Blog PayPal-Gebühren](https://www.shopify.com/de/blog/paypal-gebuhren)

**PayPal Händlerkonditionen DE (offizielle Seite laut Suche, Stand 7.9.2026)**
- PayPal Checkout Inland: 2,99 % + Festgebühr 0,39 € (Euro); „Waren und Dienstleistungen“ 2,49 % + Festgebühr; internationaler Zuschlag: +0 % EWR, +1,29 % UK, +1,99 % sonstige; SEPA-Lastschrift 0,35 € (Standard) — [PayPal Händler- und Verkäufergebühren](https://www.paypal.com/de/business/paypal-business-fees)
- Rückbuchungsgebühr Karten via PayPal: 16 € bei Euro-Zahlungen (laut Shopify-DE-Blog, nicht auf PayPal-Seite selbst verifiziert) — [Shopify DE Blog](https://www.shopify.com/de/blog/paypal-gebuhren)
- Shopify-Payments-Chargeback-Gebühr DE: nicht gefunden (Gap).

**Digital Downloads & Alternativ-Apps (Blogs, Preise widersprüchlich)**
- Shopify „Digital Downloads“ (gratis): max. 5 GB pro Datei, max. 50 Dateien pro Produkt, kein Streaming — [fulfile (Vergleichsblog, Juli 2026)](https://fulfile.app/guides/best-shopify-digital-download-apps-2026)
- Sky Pilot: Free 100 MB Speicher / 1 GB Bandbreite pro Monat; bezahlt laut 2026-Quellen 9 / 24,99 / 54,99 USD (ältere Quellen 20/75/125 USD) — [delightchat](https://www.delightchat.io/best-shopify-apps/for-digital-downloads); [fulfile](https://fulfile.app/guides/best-shopify-digital-download-apps-2026)
- Filemonk: Free 250 MB / 50 Bestellungen pro Monat; bezahlt 10 bzw. 25 USD/Monat — [fulfile](https://fulfile.app/guides/best-shopify-digital-download-apps-2026)
- SendOwl: 39/87/159 USD/Monat laut neuester Quelle, andere nennen 14,99–44,99 USD — [SendOwl-Blog](https://www.sendowl.com/blog/tips-and-advice/shopify-digital-downloads); [fulfile](https://fulfile.app/guides/best-shopify-digital-download-apps-2026)
- Download-Limits/E-Mail-Zustellung der nativen App: nicht verifiziert (Gap).

**Starter-Plan**
- Offiziell (Help Center laut Suche): keine Kollektionen, kein Staff, keine neuen Templates; Verkauf über Produktlinks (Social, Messenger) — [Shopify Help Center Starter](https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/plans-features/shopify-starter-plan)
- Digitale Dateien auf Starter nur mit kompatibler App ohne Online-Store-Kanal-Abhängigkeit (Community, nicht offiziell); viele Drittanbieter-Apps nicht kompatibel — [Shopify Community](https://community.shopify.com/t/can-i-sell-digital-files-on-the-starter-plan/214308)
- Checkbox zur aktiven AGB-Zustimmung im Starter-Plan nicht verfügbar (Community) — [Shopify Community](https://community.shopify.com/t/einfugen-einer-checkbox-agb-akzeptieren-im-shopify-starterplan/377070)
- Checkout-UI-Erweiterungen auf Danke-/Bestellstatusseite: alle Pläne außer Starter — [shopify.dev](https://shopify.dev/docs/api/checkout-extensions)

**Checkout & Widerrufsverzicht**
- Offizielle Entwicklerdoku: „Checkout UI extensions that render on the information and shipping and payment steps in checkout are available only to stores on a Shopify Plus plan.“ — [shopify.dev Custom fields & banners](https://shopify.dev/docs/apps/build/checkout/fields-banners)
- § 356 Abs. 5 BGB: Widerrufsrecht bei digitalen Inhalten erlischt nur bei ausdrücklicher Zustimmung zum vorzeitigen Beginn + Bestätigung der Kenntnis vom Verlust + Bestätigung nach § 312f BGB auf dauerhaftem Datenträger (z. B. E-Mail) — [gesetze-im-internet.de § 356 BGB](https://www.gesetze-im-internet.de/bgb/__356.html); [dawidweb (Blog)](https://dawidweb.com/blog/widerrufsrecht-digitale-produkte-dienstleistungen/); [Lexology](https://www.lexology.com/library/detail.aspx?g=cb130e3d-8c6e-4400-9594-0635cfa1ee2e)
- LG Karlsruhe: eine Checkbox kann beide Erklärungen abdecken; vorangekreuzt genügt nicht — [shopbetreiber-blog (Händlerbund)](https://shopbetreiber-blog.de/2022/07/11/lg-karlsruhe-zum-erloeschen-des-widerrufsrechts-bei-digitalen-inhalten)
- Community-Workarounds: Checkbox im Warenkorb/auf Produktseite (umgehbar durch direkten /checkout-Aufruf), Apps (z. B. Terms-Checkbox-Apps, SendOwl, Sky Pilot), Pflicht-Kundenkonto mit Checkbox — [Shopify Community](https://community.shopify.com/t/chekbox-fur-digitale-produkte-rechtskonform-einrichten-ausschluss-widerrufsrecht/93176); [Shopify Community 2](https://community.shopify.com/t/opt-in-box-fur-digitale-produkte-erloschen-des-widerrufsrechts/105925)

**Rechtstexte & Cookie-Banner**
- IT-Recht Kanzlei: Starter 9,90 €/Monat (1 Präsenz), Premium 24,90 €/Monat (bis 5 Präsenzen) (laut Suche von eigener Seite) — [Kassenklingeln/IT-Recht-Bezug](https://kassenklingeln.de/shopify-kosten/)
- Händlerbund ca. 20 €/Monat (Blog, unbestätigt); Trusted Shops Siegel ab ca. 75 €/Monat (Blog, unbestätigt) — [xonic-solutions](https://www.xonic-solutions.de/news/rechtstexte-im-onlineshop-impressum-datenschutzerklaerung-widerruf-cookie-banner.html); [qualimero](https://qualimero.com/blog/shopify-cookie-banner)
- Pandectes: Basic gratis, Plus 9 USD/Monat (Consent Mode v2); Consentmo ab 9 USD/Monat; Enterprise (TCF v2.3) 49 USD/Monat — [Craftshift (Blog)](https://craftshift.com/shopify-gdpr-cookie-consent-2026/)
- IT-Recht Kanzlei prüft Shopifys native Cookie-Consent-Lösung kritisch — [IT-Recht Kanzlei](https://www.it-recht-kanzlei.de/shopify-cookie-consent-tool-rechtskonform-ja-nein.html)

**Steuer 7 % E-Book**
- Seit 18.12.2019 gilt für E-Books der ermäßigte Satz (§ 12 Abs. 2 Nr. 14 UStG); ausgenommen u. a. Werbepublikationen und überwiegend Video/Musik — [IT-Recht Kanzlei](https://www.it-recht-kanzlei.de/steuerermaessigung-ebooks-stickmuster-schnittmuster-strickmuster.html); [Bundestag WD 10-012-23](https://www.bundestag.de/resource/blob/944944/WD-10-012-23-pdf.pdf)
- Shopify-„Steuerüberschreibung“ (Tax Override) für Produkt/Kollektion: offizielle Doku nicht abrufbar; Achtung: Starter hat keine Kollektionen — [Shopify Help Center Starter](https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/plans-features/shopify-starter-plan)

**Shopify Email**
- 10.000 Gratis-E-Mails/Monat in allen Plänen, danach 1 USD je 1.000 (Blogs, nicht offiziell geprüft) — [Omnisend (Wettbewerber-Blog)](https://www.omnisend.com/blog/shopify-email-vs-klaviyo/)

### Inferences
- Für ein einzelnes PDF ist Basic (oder Starter, falls die Download-App kompatibel ist) ausreichend; Grow/Advanced lohnen sich gebührenseitig erst bei hohem Umsatz.
- Bei einem Preis um 15–25 € dominieren Fixanteile (0,25–0,39 €) die Zahlungskosten; PayPal (2,99 % + 0,39 €) ist pro Bestellung spürbar teurer als Karte.
- Rechtssicherer Widerrufsverzicht ist auf Shopify-Nicht-Plus der größte Reibungspunkt; ggf. Download erst auf der Bestellstatusseite/per E-Mail nach Bestätigung freigeben oder MoR-Plattform nutzen.
- Kalkulatorisch 7 % USt. ansetzen, sofern das PDF als E-Book (Buchcharakter) gilt.

### Gaps
- Offizielle Shopify-Preise/Gebühren DE (inkl. Starter, Klarna, Chargeback) – Seiten nicht abrufbar.
- Shopify Markets AT/CH (Kosten, CH-Mehrwertsteuer), Tax-Override-Doku, Download-Limits der nativen App.
- Judge.me/Okendo-Preise nicht recherchiert; zu § 5b Abs. 3 UWG nur bestätigt, dass seit 28.5.2022 Informationspflichten gelten (ob/wie Echtheit von Bewertungen geprüft wird) — Inhalte nicht im Detail verifiziert ([ratgeberrecht.eu](https://www.ratgeberrecht.eu/aktuell/wettbewerbswidrige-angaben-im-online-shop/)).

## 2. Alternativen zu Shopify (Digistore24, CopeCart, ablefy, Gumroad, Payhip, Lemon Squeezy, Ko-fi)

### Takeaway
Reseller/Merchant-of-Record-Plattformen (Digistore24, CopeCart, Gumroad, Lemon Squeezy) übernehmen Rechnung und USt. gegen deutlich höhere Gebühren; Payhip (Free) ist pro Verkauf günstig, lässt Steuerthemen aber teils beim Verkäufer. Alle Zahlen stammen aus Vergleichs-/Affiliate-Blogs.

### Cited Findings
- Digistore24: keine Grundgebühr, 7,9 % + 1 € pro Verkauf (über 400 € Warenkorb geringer); Reseller-Modell (Rechnung + USt. durch D24) — [justdenis (Blog)](https://www.justdenis.de/digistore24-alternativen/); [rabbit-checkout](https://rabbit-checkout.de/zahlungsanbieter-vergleich-digitale-produkte/)
- CopeCart: 4,9 % + 1 €, keine Grundgebühr, Reseller — [justdenis](https://www.justdenis.de/copecart-alternativen/)
- ablefy (ehem. elopage): Sept. 2026 „Sell“ 27 €/Monat + 2,7 % + 0,50 € pro Zahlung, Reseller-Modell mit Zusatzgebühren; ältere Angaben ab 39 €/Monat — [365digital](https://365digital.de/ablefy-preise/); [stark.marketing](https://www.stark.marketing/blog/ablefy-test/)
- Gumroad: 10 % (teils + 0,50 USD) bei Direktverkauf, MoR — [wearefounders](https://www.wearefounders.uk/best-platforms-for-selling-digital-products-in-2026/); [theeliteengines](https://theeliteengines.com/guides/gumroad-vs-payhip-vs-lemonsqueezy.html)
- Payhip: Free 5 % + Zahlungsgebühren (~2,9 % + 30 ¢); 2 % bei 29 USD/Monat, 0 % bei 99 USD/Monat; übernimmt EU/UK-VAT teils — [Payhip-Blog (Wettbewerber)](https://payhip.com/blog/gumroad-alternatives/); [wearefounders](https://www.wearefounders.uk/best-platforms-for-selling-digital-products-in-2026/)
- Lemon Squeezy: 5 % + 50 ¢, MoR; Zuschläge (z. B. +1,5 % international) — [insightraider](https://insightraider.com/en/compare/gumroad-vs-lemonsqueezy)
- Buchpreisbindung: gilt seit 1.9.2016 auch für dauerhaft erworbene E-Books; ob Selbstverleger erfasst sind, ist in Quellen umstritten (IT-Recht Kanzlei: ja, Verleger-Eigenschaft; ältere literaturcafe-Lesart: nein); Kochbuch mit Buchcharakter wahrscheinlich erfasst (keine direkte Quelle) — [IT-Recht Kanzlei Leitfaden](https://www.it-recht-kanzlei.de/buchpreisbindungsgesetz-buchpreisbindung-buecher.html); [literaturcafe](https://www.literaturcafe.de/e-book-schizophrenie-bringen-selbstverleger-die-preisbindung-ins-wanken/); [selfpublisherbibel](https://www.selfpublisherbibel.de/autoren-tipp-was-das-preisbindungsgesetz-verbietet-und-was-nicht/)

### Inferences
- Falls Buchpreisbindung greift: einheitlicher Endpreis auf allen Kanälen (Shop, Digistore etc.); Rabattaktionen/Bundles/„Launch-Preise“ rechtlich prüfen.
- Bei 19 € Preis: Digistore24 ≈ 2,50 € Gebühr, CopeCart ≈ 1,93 €, Shopify Basic Karte ≈ 0,70 € + Fixkosten (eigene Rechnung).

### Gaps
- Ko-fi-Gebühren, Meta-Ads-Kompatibilität dieser Plattformen (Pixel/Conversion API) nicht recherchiert; offizielle Preisseiten nicht abrufbar; Lemon-Squeezy-Übernahme durch Stripe nur einfach belegt.

## 3. Conversion/UX-Evidenz

### Takeaway
Baymard liefert belastbare Leitlinien (u. a. klar abgesetzter Add-to-Cart-Button, keine konkurrierenden CTAs), aber öffentlich keinen harten Beleg für Sticky-ATC-Uplift; Lift-Zahlen stammen von Anbietern. Conversion-Benchmarks (~1,7–2,6 %) sind kommerziell und nicht spezifisch für digitale Produkte.

### Cited Findings
- Baymard: durchschnittliche Warenkorbabbruchrate 70,19 % (Meta-Wert über viele Studien) — [Baymard Best Practices](https://baymard.com/blog/ecommerce-ux-best-practices)
- Baymard-Guideline: primären „In den Warenkorb“-Button visuell abheben, konkurrierende CTAs entfernen; Sticky-Button mit ausreichend Weißraum, nicht vollflächig — [Baymard Best Practices](https://baymard.com/blog/ecommerce-ux-best-practices)
- Baymard „sticky product summary“ nur als Large-Screen-Idee — [Baymard Responsive Upscaling](https://baymard.com/blog/responsive-upscaling)
- Sticky-ATC-Uplift: 2,74 % in einem Shopify-Test (82,7 % Wahrscheinlichkeit besser) — [tractionmarketing.nz (Agentur)](https://tractionmarketing.nz/insights/unlocking-small-wins-that-scale-what-we-learned-from-testing-a-sticky-add-to-cart-button-on-mobile/); „8–15 %“-Behauptung eines App-Anbieters (unbelegt) — [easyappsecom](https://easyappsecom.com/guides/sticky-add-to-cart-best-practices)
- Core Web Vitals „gut“: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 am 75. Perzentil — [DEV Community](https://dev.to/apogeewatcher/core-web-vitals-benchmarks-for-shopify-stores-2026-data-1mel)
- Benchmarks (kommerziell): Shogun-Studie H1 2026, 745 Shopify-Stores: Mittelwert 2,61 %, Median 1,74 %; IRP Commerce Juli 2026: 2,26 % — [blendcommerce](https://blendcommerce.com/blogs/shopify/ecommerce-conversion-rate-benchmarks-2026)
- CWV-Bestehensquote Shopify mobil widersprüchlich (48 % vs. 65–75 %) — [sherocommerce](https://sherocommerce.com/blogs/insights/shopify-speed-benchmarks); [fudge.ai](https://www.fudge.ai/blog/state-of-shopify-performance-2026/)

### Inferences
- Für ein PDF: eine fokussierte Produktseite, ein CTA, Express-Checkout (Apple/Google Pay, PayPal) und leichtes Theme sind evidenzkonform; Sticky-ATC kann man testen, ohne Uplift einzuplanen.
- Im Modell eher Median (~1,7 %) als Mittelwert ansetzen; Paid-Social-Traffic konvertiert typischerweise darunter (nicht belegt – als Sensitivität modellieren).

### Gaps
- NN/g-Studien zu mobiler Lesbarkeit nicht gefunden; Littledata-Benchmark und Benchmarks speziell für digitale Produkte nicht gefunden; Baymard-Volltexte (Paywall/Abruf blockiert).

## 4. Psychologie: Evidenz vs. Heuristik; Dark Patterns

### Takeaway
Robust: Social Proof durch die ersten Bewertungen, Implementation Intentions, Fluency. Fragil/kontextabhängig: Choice Overload (Mittelwert ~0), Decoy-Effekt (schlechte Replikation bei realen/erfahrbaren Optionen). Geld-zurück-Garantien wirken meist positiv, aber nicht immer. Fake-Countdowns sind rechtlich riskant; echte Befristungen sind nicht per se verboten.

### Cited Findings
**Gut belegt / plausibel**
- Spiegel Research Center (2017): Kaufwahrscheinlichkeit mit 5 Bewertungen 270 % höher als mit 0; Grenznutzen sinkt nach den ersten 5 rasch; +190 % bei günstigerem, +380 % bei teurerem Produkt (Daten eines Bewertungsplattform-Partners, korrelativ) — [Medill Spiegel Research Center](https://spiegel.medill.northwestern.edu/how-online-reviews-influence-sales/)
- IKEA-Effekt (Norton, Mochon & Ariely 2012): Selbst Zusammengebautes wird höher bewertet; Meta-Analyse k = 55, N = 5.454; erfordert erfolgreiche Fertigstellung — [Harvard DASH](https://dash.harvard.edu/bitstreams/7312037d-2473-6bd4-e053-0100007fdf3b/download); [Konzeptionelle Replikation](https://www.researchgate.net/publication/310491448_The_IKEA_Effect_A_Conceptual_Replication)
- Implementation Intentions (Wenn-dann-Pläne): Meta-Analysen zeigen Effekte auf Zielerreichung; z. B. körperliche Aktivität 0,25 (KI 0,05–0,45) — [PMC6235272](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6235272/); [PMC8149892](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8149892/)
- Geld-zurück-Garantie: zwei Experimente (Suwelack et al. 2011) – positive Emotion, höhere Kaufabsicht und Zahlungsbereitschaft; andere Studien (Luxus online, Service-Garantien) ohne Effekt; strenge Bedingungen senken Glaubwürdigkeit — [ScienceDirect Suwelack et al.](https://www.sciencedirect.com/science/article/abs/pii/S0022435911000820); [Luxus-Studie](http://u3isjournal.isvouga.pt/index.php/ijmcnm/article/view/333)

**Gemischt / fragil**
- Choice Overload: Scheibehenne, Greifeneder & Todd (2010), 63 Bedingungen, N = 5.036 – mittlere Effektstärke praktisch null, hohe Varianz — [Scheibehenne et al. 2010 (PDF)](https://scheibehenne.com/ScheibehenneGreifenederTodd2010.pdf)
- Chernev, Böckenholt & Goodman (2015), 99 Beobachtungen, N = 7.202: Effekt tritt unter Moderatoren auf (Komplexität des Sets, Schwierigkeit, Präferenzunsicherheit, Entscheidungsziel) — [Wiley JCP](https://myscp.onlinelibrary.wiley.com/doi/abs/10.1016/j.jcps.2014.08.002)
- Decoy/Attraktionseffekt: Frederick, Lee & Baskin (2014, JMR 51(4)) – Effekt nur bei numerischer Darstellung; Yang & Lynn (2014): 11 reliable Effekte in 91 Versuchen über 23 Produktklassen; Kritiker bemängeln Design — [ResearchGate Yang & Lynn](https://www.researchgate.net/publication/286371907_More_Evidence_Challenging_the_Robustness_and_Usefulness_of_the_Attraction_Effect); [Nature Palgrave Comms 2016](https://www.nature.com/articles/palcomms201682)

**Nur aus Fachwissen (Quelle nicht live geprüft – als Gap/zu verifizieren behandeln)**
- Iyengar & Lepper 2000 (Marmeladen-Studie), Kruger et al. 2004 (Effort-Heuristik), Prelec & Loewenstein 1998 („pain of paying“), Gollwitzer & Sheeran 2006 (Meta-Analyse, d ≈ 0,65), Alter & Oppenheimer 2009 (Fluency) – in dieser Recherche nicht über Suchtreffer belegt.

**Dark Patterns / Recht**
- LG Hanau (5.11.2025, 6 O 27/25): Countdown irreführend, weil Angebot danach erneut angeboten wurde (nicht rechtskräftig, Berufung OLG Frankfurt) — [ratgeberrecht.eu](https://www.ratgeberrecht.eu/aktuell/dark-patterns-im-online-shop/); [AnwaltOnline](https://www.anwaltonline.com/firmen-_-gewerbe/urteile/41445/online-handel-wann-wird-rabattwerbung-mit-countdown-zur-unzulaessigen-manipulation)
- LG Deggendorf (27.3.2026, 1 HK O 6/25): Countdown allein nicht irreführend — [shopbetreiber-blog](https://shopbetreiber-blog.de/lg-deggendorf-countdown-uhr-im-online-shop-allein-nicht-irrefuehrend)
- LG Berlin II: 15-Minuten-Countdown, der beim Neuladen neu startet = unwahre Angabe — [sbs-legal](https://www.sbs-legal.de/blog/countdown-werbung-zwischen-zulaessigkeit-und-irrefuehrung)
- OLG Bamberg (4.2.2026, 3 UKl 8/25 e): kein pauschales Verbot befristeter Angebote als Dark Pattern nach Art. 25 DSA; UWG/UGP-RL vorrangig, DSA-Wertungen fließen über § 4a UWG ein — [shopbetreiber-blog](https://shopbetreiber-blog.de/olg-bamberg-kein-verbot-befristeter-angebotswerbung-als-dark-patterns)
- Anhang Nr. 7 UWG (falsche Behauptung, Angebot nur sehr begrenzt verfügbar) als „stets unzulässig“ genannt — Reichweite nicht verifiziert — [ratgeberrecht.eu](https://www.ratgeberrecht.eu/aktuell/wettbewerbswidrige-dark-patterns-im-online-shop/)

### Inferences
- Für ein Kochbuch: wenige klare Optionen (1 Produkt, ggf. 1 Bundle) ist vertretbar, aber nicht wegen „Choice Overload“, sondern wegen Einfachheit; kein künstliches Decoy-Pricing als Kernstrategie.
- Früh 5+ echte Bewertungen sammeln (mit § 5b Abs. 3 UWG-Hinweis zur Verifizierung); Leseprobe/Vorschauseiten als Unsicherheitsreduktion (Effekt für Digitalgüter nicht direkt belegt).
- Garantie freiwillig und großzügig formulieren (kollidiert nicht mit Widerrufsverzicht); keine Fake-Timer/Fake-Knappheit.
- „Wenn-dann“-Plan im Produkt (z. B. „Wenn Frühdienst, dann Box X am Vorabend“) nutzt Implementation Intentions für Nutzung/Zufriedenheit.

### Gaps
- Keine Studie zum Effekt von Vorschauseiten/Leseproben bei E-Books gefunden; keine BGH/EuGH-Entscheidung speziell zu Countdowns gefunden; UCPD-Leitlinie der Kommission nicht abgerufen.

## 5. Creatives: Formate, Hooks, KI-Bilder

### Takeaway
Schichtdienst-Meal-Prep ist auf TikTok/Instagram bereits als Nische sichtbar; Creator verlinken Bücher in Bio und nutzen kostenlose E-Books als Lead-Magnet. KI-Werbung: Meta labelt KI-Inhalte („AI info“), deutsche Verbraucher sind gespalten und erwarten Offenlegung.

### Cited Findings
- TikTok-Creator bewerben „schnelle Foodprep-Rezepte für deine Arbeit … Ideal für jeden Schichtdienst“ — [TikTok Discover](https://www.tiktok.com/discover/essen-vorbereiten-f%C3%BCr-die-arbeit)
- Instagram-Account mit „0 € Meal-Prep-E-Book“ als Lead-Magnet — [Instagram mealprepmitadhs](https://www.instagram.com/mealprepmitadhs/)
- Deutsche Meal-Prep-Marke mit Buch/Programm: Lena Merz — [lenamerz.de](https://lenamerz.de/)
- Hook-Empfehlung (Blog): mit fertigen Gerichten/Vorher-Nachher starten, kein Talking-Head-Intro — [gen.pro (Blog)](https://gen.pro/blog/top-10-hooks-meal-prep-creators/)
- Meta (Feb. 2025): „AI info“-Label unter „Über diese Werbeanzeige“ für Anzeigen mit Metas GenAI-Tools; Erkennung von Drittanbieter-KI angekündigt — [Meta Newsroom](https://about.fb.com/news/2025/02/gen-ai-transparency-metas-ads-products/); Ab 1.6.2026 automatische Erkennung von Drittanbieter-KI (lt. Transparency-Seite) — [Meta Transparency](https://transparency.meta.com/policies/ad-standards/SIEP-advertising/SIEP); kleine Edits (Zuschnitt, Farbkorrektur) ohne Label — [adgenz (Blog)](https://www.adgenz.ai/blog/meta-ai-generated-ad-disclosure-label)
- Ipsos KI-Monitor 2026: 42 % finden KI-Markenwerbung in Ordnung, 43 % nicht; 75 % erwarten Offenlegung — [Ipsos](https://www.ipsos.com/de-de/ipsos-ki-monitor-2026); [prweb](https://www.prweb.de/2026/10/07/ki-werbeinhalte-spalten-die-verbraucher-42-prozent-finden-ki-erstellte-markenwerbung-in-ordnung-43-prozent-nicht-75-prozent-erwarten-offenlegung/)
- Verve/Censuswide 2026: 35 % – Vertrauen in Marke würde leiden (18–24: 45 %); nur 26 % halten KI-werbende Marken für vertrauenswürdig — [onlinemarketing.de](https://onlinemarketing.de/technologie/ki-werbung-schwindet-vertrauen); [W&V](https://www.wuv.de/themen/media/warum-sichtbare-ki-werbung-fuer-marken-zum-vertrauensrisiko-wird)

### Inferences
- Echte Food-Fotos/UGC (Schichtkraft mit Box im Spind/Pausenraum) gegenüber sichtbaren KI-Bildern bevorzugen; KI eher für Hintergründe/Mockups, ohne realistische „Menschen-Testimonials“.
- Formate: 9:16 (Reels/TikTok/Stories), 4:5 (Feed), 1:1 – Standard bei Meta (nicht in dieser Recherche verifiziert).

### Gaps
- Keine Daten aus der Meta Ad Library zu deutschen Kochbuch-E-Book-Anzeigen; Fähigkeiten aktueller Bild-/Video-Generatoren (Textrendering, Seitenverhältnisse) nicht recherchiert; Kennzeichnung „Werbung“ bei Influencer-Kooperationen nicht recherchiert.

## 6. E-Mail/Organisch: Lead-Magnet vs. Direktverkauf, Tools, DOI

### Takeaway
Shopify Email (10.000 Gratis-Sends/Monat) genügt für den Start; Klaviyo Free nur bis 250 Profile. Belastbare Evidenz „Lead-Magnet schlägt Direktverkauf“ wurde nicht gefunden.

### Cited Findings
- Shopify Email: 10.000 Sends/Monat inklusive, danach 1 USD/1.000 (Blogs) — [Omnisend](https://www.omnisend.com/blog/shopify-email-vs-klaviyo/); [devaland](https://devaland.com/blog/klaviyo-vs-shopify-email-2026-review)
- Klaviyo Free: 250 aktive Profile, 500 Sends/Monat; bezahlt ab 20 USD/Monat (500 Kontakte); ca. 150 USD/€ bei 10.000 Kontakten; seit Feb. 2025 automatische Tarifanhebung bei Listenwachstum — [charleagency](https://www.charleagency.com/articles/klaviyo-pricing/); [digitalsprung](https://digitalsprung.de/blog/klaviyo-email-marketing-tool-fuer-shopify-nutzen)
- Kostenloses Meal-Prep-E-Book als Lead-Magnet wird in der Nische praktiziert — [Instagram mealprepmitadhs](https://www.instagram.com/mealprepmitadhs/)

### Inferences
- Hybrid: kostenlose Mini-Wochenplan-PDF gegen DOI-Anmeldung + 3–5-teilige Sequenz, parallel Direktverkauf; Wirkung über eigenes A/B-Testing messen.

### Gaps
- DOI-Pflicht: Nachweispflicht der Einwilligung (§ 7 UWG, BGH-Rechtsprechung) in dieser Recherche nicht über Quelle belegt – separat prüfen; keine empirische Studie zu Lead-Magnet- vs. Direktverkauf-Conversion gefunden.
