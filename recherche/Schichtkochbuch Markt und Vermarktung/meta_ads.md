# Meta Ads für ein E-Book (15–30 €) aus eigenem Shopify-Shop, Deutschland, kleines Budget (Stand der Recherche: 27.10.2026)

> **Methodik-Hinweis (wichtig für den Report-Writer):** In dieser Sitzung konnten Seiten nicht direkt abgerufen werden (WebFetch/curl wurden vom Proxy blockiert bzw. DNS-Fehler, u. a. bei facebook.com/business/help). Alle Belege stammen aus Suchergebnis-Zusammenfassungen. Offizielle Meta-Help-Center-Artikel wurden in den Suchen **nicht** direkt angezeigt. Ausnahmen: Meta-Entwicklerdokumentation (developers.facebook.com, developers.meta.com), transparency.meta.com, about.fb.com, sec.gov (Meta-10-Q), help.shopify.com und shopify.dev. Vieles stützt sich daher auf Sekundärquellen (Agentur- und Tool-Blogs). Das ist bei jedem Punkt gekennzeichnet:
> - **[DOKU]** = in offizieller Meta- oder Shopify-Doku belegt bzw. von mehreren Quellen übereinstimmend Meta zugeschrieben
> - **[KONTO]** = Verfügbarkeit hängt vom Konto oder Rollout ab bzw. die Angaben widersprechen sich
> - **[EMPF]** = Empfehlung, gekennzeichnet als „Agentur/Blog“ oder „eigene Ableitung“

## 1. Kampagnenziel, Optimierungsereignis, Lernphase

### Takeaway
Standard-Setup: Ziel „Umsatz“ (OUTCOME_SALES), Conversion-Ort Website, Optimierung auf Purchase. Die meistzitierte Schwelle zum Verlassen der Lernphase liegt bei ca. 50 Optimierungsereignissen pro Anzeigengruppe in 7 Tagen. Wer darunter bleibt, bekommt „Lernphase eingeschränkt“ (Learning limited). Bei einem 15–30-€-Produkt und kleinem Budget wird diese Schwelle realistisch kaum erreicht. Der Wortlaut des offiziellen Help-Center-Artikels konnte nicht direkt geprüft werden.

### Cited Findings
- [DOKU, indirekt] Mehrere Sekundärquellen schreiben Meta zu: Pro Anzeigengruppe sind ca. 50 Optimierungsereignisse innerhalb von 7 Tagen nötig, um die Lernphase zu verlassen. Das Fenster läuft ab der letzten wesentlichen Änderung. Gezählt wird nur das Optimierungsereignis, bei Purchase-Optimierung also nur Käufe. — [ppc.land](https://ppc.land/learning-phase/); [admanage.ai](https://admanage.ai/blog/facebook-ads-learning-phase-guide)
- [DOKU] Meta-eigene Entwicklerdoku (für Horizon-App-Kampagnen) nennt ebenfalls mindestens 50 Ereignisse über 7 Tage. — [developers.meta.com](https://developers.meta.com/horizon/resources/launch-ad-campaign/)
- [DOKU, indirekt] Anzeigengruppen unter der Schwelle werden als „Learning Limited“ markiert. — [ppc.land](https://ppc.land/learning-phase/)
- Die Schwelle gilt pro Anzeigengruppe. Budget auf viele Anzeigengruppen zu verteilen, erschwert das Erreichen. — [jetfuel.agency](https://jetfuel.agency/what-is-the-meta-ads-learning-phase-how-to-exit-it-faster-in-2026/); [cometly](https://www.cometly.com/post/facebook-ads-learning-phase-optimization)
- Als „wesentliche Änderungen“ (significant edits) gelten laut Sekundärquelle: Targeting, Optimierungsereignis, Gebotsstrategie, Budget, neue Anzeige hinzufügen sowie Pausieren für 7 Tage oder länger. — [jumpfly](https://www.jumpfly.com/blog/what-can-you-learn-from-the-meta-learning-phase/)
- [KONTO/WIDERSPRUCH] Ein Guide behauptet, Meta habe im Juni 2024 die Schwelle für Purchase- und App-Install-Kampagnen auf 10 Ereignisse gesenkt. Das Ads-Manager-UI zeige aber weiterhin 50. Dafür gibt es keine offizielle Bestätigung, also unbestätigt. — via Suchzusammenfassung zu [tryvizup](https://www.tryvizup.com/blog/meta-ads-minimum-budget-requirements-2026) / [benly.ai](https://benly.ai/learn/meta-ads/learning-phase-optimization)
- [EMPF Agentur/Blog] Budgetänderungen über ca. 20 % setzen die Lernphase zurück, darunter gelten sie meist als unkritisch. Ausdrücklich **keine** offizielle Meta-Zahl. — [admanage.ai](https://admanage.ai/blog/facebook-ads-learning-phase-guide); [cometly](https://www.cometly.com/post/facebook-ads-learning-phase-optimization)
- [EMPF Agentur/Blog] Faustregel für das Tagesbudget: Ziel-CPA × 50 ÷ 7. — [tryvizup](https://www.tryvizup.com/blog/meta-ads-minimum-budget-requirements-2026)

### Inferences
- Eigene Ableitung: Bei z. B. 20 € Ziel-CPA (Beispielwert, kein Benchmark) ergibt die Faustregel ca. 143 €/Tag, um 50 Käufe pro Woche zu erreichen. Für ein kleines Budget ist das unrealistisch. Eine Anzeigengruppe wird also dauerhaft „Learning limited“ bleiben. Das bedeutet nicht, dass sie nicht funktioniert, nur dass die Auslieferung weniger stabil ist.
- Eigene Ableitung: Bei kleinem Budget ist **eine** Kampagne mit **einer** (oder sehr wenigen) Anzeigengruppen sinnvoll, statt das Budget aufzusplitten. Änderungen sollten gebündelt und selten erfolgen.
- Eigene Ableitung: Optimierung auf ein höher im Funnel liegendes Ereignis (z. B. AddToCart oder InitiateCheckout) bringt mehr Signale, aber es besteht das Risiko, auf „Klicker“ statt Käufer zu optimieren. Das wäre ein Test wert, aber nicht offiziell empfohlen (Gap).

### Gaps
- Der offizielle Wortlaut des Meta-Help-Center-Artikels „About the learning phase“ (facebook.com/business/help/112167992830700) konnte nicht abgerufen werden. Die 50/7-Tage-Zahl ist darum nur indirekt belegt, und die angebliche 10-Ereignis-Absenkung ist unbestätigt.
- Es gibt keine offizielle Meta-Prozentzahl, ab der eine Budgetänderung als „wesentlich“ gilt.
- Mindestbudgets in EUR: Keine offizielle Meta-Zahl gefunden. Meta legt Mindestbudgets je Währung und Optimierungsereignis fest, die Werte zeigt der Ads Manager an.

## 2. Advantage+ Sales, Zielgruppen, Detailed Targeting, Platzierungen, Creative-Features

### Takeaway
Seit 2025 heißen Advantage+-Shopping-Kampagnen „Advantage+ Sales Campaigns“ und sind in einen einheitlichen Erstellungsflow integriert. Das Erstellen der Legacy-ASC-Struktur per API wurde 2025/26 abgeschaltet. Bei den Zielgruppen geht der Trend klar zu Advantage+ Audience mit „Vorschlägen“ statt harten Interessen. Ausschlüsse über Detailed Targeting wurden 2025 entfernt, Interessen zusammengelegt. Bei den Creatives sind viele KI-„Enhancements“ standardmäßig aktiv und sollten bewusst geprüft werden.

### Cited Findings
- Umbenennung von Advantage+ Shopping zu Advantage+ Sales Campaigns Anfang 2025. Ein einheitlicher Kampagnen-Erstellungsflow kam laut einer Quelle am 29.05.2025. — [topgrowthmarketing](https://topgrowthmarketing.com/advantage-plus-shopping-campaigns/); [ppc.land](https://ppc.land/advantage/)
- [KONTO/WIDERSPRUCH bei Daten] Meta kündigte am 08.10.2025 die Abschaffung der Legacy-APIs für ASC (Advantage Shopping) und AAC an. Marketing API v24.0 stoppte die Neuanlage, mit v25.0 (laut ppc.land 18.02.2026) gilt das für alle Versionen. Bestehende Legacy-Kampagnen laufen weiter, Strukturänderungen sind nicht möglich. — [ppc.land](https://ppc.land/meta-deprecates-legacy-campaign-apis-for-advantage-structure/); [aiadvantageagency](https://aiadvantageagency.com/advantage-shopping/)
- Die frühere ASC-Einstellung, den Ausgabenanteil für Bestandskunden zu deckeln, gibt es in Advantage+ Sales laut Bericht über die Meta-Hilfe nicht mehr. — Suchzusammenfassung zu [selzee](https://selzee.com/meta-advantage-plus) / [saifursaif](https://saifursaif.com/blog/advantage-plus-sales-campaigns-guide/)
- Ausschlüsse über Detailed Targeting wurden 2025 entfernt. Die Datumsangaben schwanken je nach Quelle (Januar 2025, 31.03.2025, Juni 2025). Ausschlüsse über Custom Audiences sind weiterhin möglich. — [socialmediatoday](https://www.socialmediatoday.com/news/meta-removes-detailed-targeting-exclusions-from-ad-campaigns/723389/); [onlineoptimism](https://onlineoptimism.com/blog/detailed-targeting-exclusions-in-meta-ad-campaigns/); [adsuploader](https://adsuploader.com/blog/facebook-custom-audience-exclusions)
- [KONTO] Im Juni 2025 wurden viele granulare Interessen zu breiteren Gruppen zusammengelegt. Betroffene Kampagnen mussten laut Sekundärquelle bis 15.01.2026 angepasst werden. — Suchzusammenfassung zu [pixelmovers](https://pixelmovers.co/blog/meta-detailed-targeting-removed-what-works-2026) / [outra](https://outra.co.uk/blog/meta-removed-detailed-targeting)
- [KONTO/UNBESTÄTIGT] Job-Titel- und Arbeitgeber-Targeting: Ein Guide listet „Work“ (Job titles, Industries, Employers) für 2025 noch als verfügbar. Eine offizielle Bestätigung oder EU-spezifische Info fehlt. — [lineardesign](https://lineardesign.com/blog/facebook-detailed-targeting-list-2024/)
- Advantage+ Creative wendet standardmäßig „Standard-Enhancements“ an (z. B. Musik bei Reels, 3D-Animation statischer Bilder, Textüberlagerungen). Sie sind einzeln abschaltbar, aber per Default aktiv. Daneben gibt es „Test-Enhancements“ (generierte Hintergründe, Textextraktion) ohne Vorschau. — [adsuploader](https://adsuploader.com/blog/advantage-plus-creative-enhancements); [leapbuzz](https://leapbuzz.com/blog/meta-advantage-plus-creative-ai/)
- [KONTO] Generative KI: Laut Berichten wird Metas Bildgenerator „Muse“ in Advantage+ Creative integriert (Hintergründe, Lifestyle-Varianten, Standbilder aus Videos). Die Daten widersprechen sich (Juli vs. Oktober 2026). — [benly.ai](https://benly.ai/learn/meta-ads/advantage-plus-updates-2026); [commonthreadco](https://commonthreadco.com/blogs/coachs-corner/meta-ads-changes-2026)
- [UNBESTÄTIGT] Laut einer Quelle verlangt Meta seit März 2026 eine Kennzeichnung von KI-generierten oder KI-veränderten Anzeigeninhalten. — [commonthreadco](https://commonthreadco.com/blogs/coachs-corner/meta-ads-changes-2026)

### Inferences
- Eigene Ableitung: Für ein E-Book mit Nischen-Zielgruppe (z. B. Schichtarbeitende) wird man kaum mehr exakt per Interesse oder Beruf targeten können. Die Zielgruppen-Definition passiert faktisch über das Creative: Die Ansprache im Bild und Text „selektiert“ die Zielgruppe. Dabei sind die Regeln für persönliche Merkmale zu beachten (Abschnitt 6).
- Eigene Ableitung: KI-Enhancements (v. a. Textüberlagerungen und generierte Bilder) vor dem Start prüfen und gegebenenfalls abschalten. Bei einem Kochbuch könnten generierte Food-Bilder einen falschen Eindruck vom Inhalt erzeugen.
- Platzierungen: Advantage+ Placements (automatisch, inkl. Reels/Stories) sind Metas Standard. Hochformat 9:16 plus 1:1 bzw. 4:5 deckt die meisten Flächen ab (Trainingswissen, nicht in dieser Recherche belegt).

### Gaps
- Die offiziellen Help-Center-Artikel zu Advantage+ Sales, Advantage+ Audience („Zielgruppenvorschläge“), Flexible Format und Advantage+ Placements konnten nicht abgerufen werden.
- Keine Belege für EU-spezifische Einschränkungen beim Job-Titel-Targeting.
- Keine offizielle Mindestbudget-Angabe in EUR für Advantage+ Sales gefunden.
- „Flexible format“: keine verlässliche aktuelle Definition gefunden.

## 3. EU-spezifisch: DMA/DSA, werbefreies Abo, „weniger personalisierte Werbung“, Polit-Anzeigen

### Takeaway
Im Rahmen des DMA bietet Meta EU-Nutzer:innen ein werbefreies Abo sowie seit November 2024 die Option „weniger personalisierte Werbung“ (LPA). Nach der Kommissions-Entscheidung im April 2025 (200 Mio. € Strafe) wurde eine überarbeitete Wahlmöglichkeit am 08.12.2025 von der Kommission akzeptiert und ab Januar 2026 ausgerollt. Für Werbetreibende heißt das: Ein Teil der EU-Nutzer:innen ist nur über Sitzungs- und Basisdaten erreichbar. Wie groß dieser Anteil ist, ist öffentlich nicht bekannt.

### Cited Findings
- Meta schreibt, dass LPA im November 2024 eingeführt und nach der finalen Kommissionsentscheidung (April 2025, 200 Mio. € Strafe wegen „Subscription for no ads“) deutlich verändert wurde. Meta legt Berufung ein. Laut Meta können weitere Änderungen das europäische Geschäft erheblich beeinträchtigen. — [Meta 10-Q Q2/2026, sec.gov](https://www.sec.gov/Archives/edgar/data/0001326801/000162828026050705/meta-20260630.htm); [Meta 10-Q Q1/2026](https://www.sec.gov/Archives/edgar/data/0001326801/000162828026028526/meta-20260331.htm)
- Meta kritisiert die Kommissionsentscheidung. Laut Meta erzielen weniger personalisierte Anzeigen in frühen Daten 70 % weniger Onsite- und 61 % weniger Offsite-Conversions. Das sind Meta-eigene, interessengeleitete Zahlen. — [about.fb.com, Juli 2025](https://about.fb.com/news/2025/07/why-the-commissions-decision-undermines-the-goals-of-the-dma/)
- Abo-Preise seit November 2024: von 9,99 auf 5,99 €/Monat (Web) und von 12,99 auf 7,99 € (iOS/Android), also −40 %. Ob die Preise noch aktuell sind, ist nicht verifiziert. — [techrepublic](https://www.techrepublic.com/article/meta-less-personalised-ads-eu/); [phonearena](https://phonearena.com/news/meta-cuts-ad-free-subscription-price_id164765)
- Die Kommission akzeptierte Metas überarbeitetes Angebot am 08.12.2025, Rollout im Januar 2026. Nutzer:innen wählen zwischen voller Personalisierung und weniger Daten. Die Kommission beobachtet die Umsetzung weiter. — [siliconrepublic](https://www.siliconrepublic.com/business/meta-facebook-instagram-european-commission-ads-data-protection-digital-markets-act); [mockingbird](https://mockingbird.digital/blog/meta-less-personalised-ads-eu); [sigma.world](https://sigma.world/news/meta-eu-ad-settings-2026/)
- Bei LPA werden Anzeigen laut Sekundärquelle anhand dessen gewählt, was die Person in der aktuellen Sitzung ansieht, plus Alter, Ort, Geschlecht und Interaktion mit Anzeigen, nicht anhand des breiteren Profils. Nutzungszahlen hat bis Oktober 2026 niemand veröffentlicht. — [adlibrary.com](https://adlibrary.com/posts/meta-ads-eu-2026); [cittago](https://cittago.com/blog/meta-less-personalised-ads-eu-filings-2026/)
- Polit- und gesellschaftspolitische Anzeigen: Meta hatte angekündigt, diese ab Oktober 2025 in der EU wegen der EU-Verordnung TTPA nicht mehr zuzulassen. Für ein Kochbuch ist das irrelevant. (Trainingswissen, in dieser Sitzung nicht neu belegt.)

### Inferences
- Eigene Ableitung: LPA und Consent-Ablehnungen (Abschnitt 4) verringern die Signale in der EU zusätzlich. Das spricht nochmals für breite Zielgruppen und starke, selbstselektierende Creatives statt feiner Segmentierung.
- Für ein deutsches Nischenprodukt sind keine separaten „EU-Targeting-Änderungen 2026“ belegt, die über LPA und die Interessen-Konsolidierung hinausgehen.

### Gaps
- Kein Beleg dafür, wie hoch der LPA-Anteil in Deutschland ist oder wie Advertiser ihn im Reporting sehen.
- Offizielle Meta-Newsroom-Seite zum Rollout im Januar 2026 nicht abgerufen.

## 4. Messung: Pixel + Conversions API über Shopify, Deduplizierung, EMQ, AEM, Attribution, Consent

### Takeaway
Die Shopify-App „Facebook & Instagram“ bietet Data-Sharing-Stufen. Ab „Enhanced/Maximum“ wird die Conversions API (CAPI) zusätzlich zum Pixel genutzt. Deduplizierung läuft über identische event_id und event_name. Beim Attributionsfenster gab es 2026 Änderungen: Die 7- und 28-Tage-View-Fenster wurden aus der Insights-API entfernt, Click-through wurde enger definiert und es gibt eine neue „Engage-through“-Kategorie sowie „Incremental attribution“. CAPI ersetzt keine Einwilligung. In der EU muss Consent über die Shopify Customer Privacy API bzw. ein Cookie-Banner korrekt greifen.

### Cited Findings
- [DOKU Shopify] Data-Sharing-Stufen der Facebook-&-Instagram-App: „Standard“ = nur Browser-Pixel. „Enhanced“ = Pixel plus Conversions API. „Maximum“ = zusätzlich Metas neueste Werbetechnologie. Die Optionen hängen vom Installationszeitpunkt der App ab. Bei Enhanced und Maximum werden u. a. Name, Ort, E-Mail, Telefon und Shop-Verhalten zum Matching übertragen. — [help.shopify.com](https://help.shopify.com/en/manual/promoting-marketing/analyze-marketing/meta-data-sharing)
- [DOKU Shopify, indirekt] Unter Einstellungen > Kundenereignisse hat jede App-Pixel einen Datenzugriffstyp, Standard ist „Optimiert“. Shopify kann dabei Daten eines Pixels pausieren, wenn es mehr teilt als nötig. — Suchzusammenfassung zu [help.shopify.com](https://help.shopify.com/en/manual/promoting-marketing/analyze-marketing/meta-data-sharing)
- [DOKU Shopify] Die Customer Privacy API wendet Consent-Entscheidungen auf Shopify-verwaltete Flächen an (Pixel, Audiences, Checkout). In Regionen mit Einwilligungspflicht sind nicht-essenzielle Zwecke bis zum Opt-in deaktiviert. — [shopify.dev customer-privacy](https://shopify.dev/docs/api/customer-privacy); [shopify.dev cookie-banner](https://shopify.dev/themes/trust-security/cookie-banner)
- Ein manuell in den Theme-Code eingefügter Meta-Pixel liegt außerhalb dieser Steuerung und feuert ohne zusätzliche Prüfung auch ohne Consent. Die Shopify-App-Integration bzw. Customer Events ist vorzuziehen (Analyse eines Consent-Anbieters). — [cookiebot](https://www.cookiebot.com/en/shopify-cookie-consent/)
- CAPI hebt die Pflicht zu Einwilligung, Datenschutzerklärung und Cookie-Banner nicht auf. — Suchzusammenfassung zu [customerlabs](https://www.customerlabs.com/blog/setup-facebook-conversion-api-on-shopify-native-integration/) / [wetracked](https://www.wetracked.io/post/why-is-my-facebook-pixel-not-tracking-correctly-on-shopify)
- Deduplizierung: dieselbe event_id und derselbe event_name von Pixel und CAPI führen dazu, dass die Conversion einmal gezählt wird. Mehrere Quellen nennen ein 48-Stunden-Fenster. — [trackparity](https://www.trackparity.com/blog/meta-aggregated-event-measurement-aem-shopify/); [adlibrary](https://adlibrary.com/posts/meta-events-manager)
- Event Match Quality (EMQ): Skala 0–10. Treiber sind E-Mail, Telefon und fbc/fbp. Zielwerte wie „>7“ bzw. „>8,5 für Purchase“ stammen aus Blogs und sind keine Meta-Vorgabe. — [adplay.ai](https://adplay.ai/blog/meta-event-match-quality-emq); [adlibrary](https://adlibrary.com/posts/meta-events-manager)
- [WIDERSPRUCH] Aggregated Event Measurement: Laut TrackParity hat Meta um Mitte 2025 die manuelle 8-Ereignis-Priorisierung abgeschafft und automatisiert. Das sei aber nicht klar auf einer Primärseite dokumentiert. Andere Guides von 2026 nennen das 8-Ereignis-Limit weiterhin. — [trackparity](https://www.trackparity.com/blog/meta-aggregated-event-measurement-aem-shopify/); [segwise](https://segwise.ai/blog/facebook-aggregated-event-measurement); [usecortana](https://www.usecortana.ai/blog/meta-aem-event-limits)
- [KONTO/teilweise widersprüchlich] Attribution 2026:
  - Am 12.01.2026 wurden die 7- und 28-Tage-View-Fenster in der Ads Insights API eingestellt. Click-Fenster und 1-Tag-View bleiben.
  - Im März 2026 wurde Click-through auf Link-Klicks verengt, andere Interaktionen fallen nun unter „Engage-through“.
  - Als Standard wird teils „7 Tage Klick, 1 Tag Engage-through, 1 Tag View“ genannt. Teils gilt noch „7 Tage Klick, 1 Tag View“, im eigenen Konto prüfen.
  - „Incremental attribution“ ist eine Option auf Anzeigengruppen-Ebene und modellbasiert.
  - Ein Seer-Interactive-Test (1,05 Mio. $ Spend) fand 87 % Meta-gemeldete vs. 67 % GA4-Inkrementalität. Das ist eine Einzelstudie aus Sekundärquelle.
  - Quellen: [jonloomer](https://www.jonloomer.com/meta-ads-attribution-reporting/); [karb.ai](https://karb.ai/blog/meta-ads-attribution-settings); [zentric](https://www.zentric.digital/insights/meta-ads-attribution-settings-guide); [threechaptermedia](https://www.threechaptermedia.com/blog/incremental-attribution-guide-2026); [theoptimizer](https://theoptimizer.io/blog/how-meta-ads-attribution-actually-works-in-2026)

### Inferences
- Eigene Ableitung: Für die meisten deutschen Shops gilt: Facebook-&-Instagram-App von Shopify mit Enhanced oder Maximum, Consent über das Shopify-eigene Cookie-Banner oder ein mit der Customer Privacy API integriertes CMP. Keine zweite, manuelle Pixel-Installation, sonst drohen Doppelzählung und Consent-Verstöße. Den „Testereignisse“-Tab im Events Manager mit einem Testkauf nutzen (Funktion bekannt, Help-Seite nicht abgerufen).
- Eigene Ableitung: Abweichungen zwischen Meta und Shopify sind systembedingt zu erwarten. Gründe sind unterschiedliche Attributionslogik (Meta: Klick/View-Fenster und Modellierung, Shopify: Last-Click/UTM), Consent-Lücken und Zeitzonen. Entscheidungen auf Basis von Shopify-Umsatz plus UTM-Auswertung absichern. UTM-Parameter lassen sich auf Anzeigenebene über „URL-Parameter“ und dynamische Platzhalter setzen (Trainingswissen, nicht neu belegt).
- Für ein digitales Produkt: Purchase-Event mit value und currency=EUR wird von der Shopify-App automatisch übergeben (Trainingswissen, nicht neu belegt).

### Gaps
- Offizielle developers.facebook.com-Seiten zu CAPI-Deduplizierung, EMQ und AEM sowie das Meta-Changelog zu den Attributionsänderungen konnten nicht abgerufen werden. Die Attributionsdaten 2026 stützen sich nur auf Sekundärquellen.
- Ob Shopifys Customer Privacy API auch die serverseitigen CAPI-Events der Meta-App bei fehlendem Marketing-Consent unterdrückt, ist nicht primär belegt. Das ist rechtlich relevant und sollte mit Shopify-Doku oder Datenschutzberatung geprüft werden.
- Typische Verzögerungen der Datenverarbeitung bei Meta sind nicht offiziell belegt.

## 5. Retargeting bei wenig Traffic

### Takeaway
Website-Custom-Audiences halten Personen maximal 180 Tage. Für die Auslieferung werden meist mindestens ca. 100 Personen genannt. Bei kleinem Shop-Traffic bleiben Retargeting-Zielgruppen sehr klein. Separates Retargeting lohnt sich anfangs kaum, Advantage+ bezieht warme Nutzer:innen ohnehin automatisch ein.

### Cited Findings
- [DOKU] Website-Custom-Audiences: retention_days liegt zwischen 1 und 180 Tagen, Prefill ebenfalls bis 180 Tage. — [developers.facebook.com](https://developers.facebook.com/docs/marketing-api/audiences/guides/website-custom-audiences)
- Mindestgröße ca. 100 Personen, darunter ist die Auslieferung unzuverlässig. Über 1.000 funktioniert laut Blog deutlich besser. — [stackmatix](https://www.stackmatix.com/blog/meta-custom-audiences); [adsuploader](https://adsuploader.com/blog/facebook-custom-audience)

### Inferences
- Eigene Ableitung: Bei z. B. ein paar Hundert Besucher:innen pro Monat und Consent-Verlusten in der EU reicht die Zielgruppe für eigenständiges Retargeting kaum. Sinnvoller ist eine einzige breite Kampagne, ergänzt um Engagement-Zielgruppen (Video- und Profilinteraktionen auf Instagram/Facebook), die nicht vom Website-Consent abhängen.

### Gaps
- Retention-Fenster für Engagement-Zielgruppen (oft 365 Tage genannt) nicht belegt.

## 6. Ad Library (DSA) und Richtlinien (persönliche Merkmale, Gesundheit, Vorher/Nachher)

### Takeaway
In der EU zeigt die Meta Ad Library dank DSA auch kommerzielle Anzeigen bis ein Jahr nach der letzten Impression, mit Targeting-Angaben und geschätzter EU-Reichweite. Das ist für die Wettbewerbsanalyse sehr nützlich. Die Richtlinie zu persönlichen Merkmalen verbietet Formulierungen, die Wissen über Gesundheit, Körper oder ähnliche Merkmale der betrachtenden Person behaupten oder unterstellen. Das ist relevant für Schicht-, Gesundheits- und Gewichts-Ansprache.

### Cited Findings
- [DOKU, Meta-Toolseite + Sekundär] EU-Anzeigen bleiben ein Jahr ab letzter Ausspielung in der Ad Library. Angezeigt werden das gewählte Targeting (Alter, Geschlecht, Orte inkl./exkl.), geschätzte EU-Reichweite (auch je Mitgliedstaat) sowie Begünstigter und Zahler. Für den API-Zugang ist eine Identitätsbestätigung nötig. Außerhalb der EU sind kommerzielle Anzeigen nur sichtbar, solange sie aktiv sind. — [transparency.meta.com](https://transparency.meta.com/en-gb/researchtools/ad-library-tools/); [adlibrary.com](https://adlibrary.com/posts/eu-dsa-ad-repositories-developers); [ppc.land](https://ppc.land/ads-library/)
- Persönliche Merkmale: Anzeigen dürfen nicht behaupten oder unterstellen, die Gesundheit, den Körper, das Gewicht oder die Finanzen der betrachtenden Person zu kennen. Beispiele für Verstöße: „Are you struggling with anxiety?“, „Tired of your weight?“. — [auditsocials](https://www.auditsocials.com/blog/meta-ad-misleading-claims-personal-attributes-prohibited-content-policy-2026); [adsuploader](https://adsuploader.com/blog/meta-ad-guidelines)
- [WIDERSPRUCH] Vorher/Nachher: Ältere Zusammenfassungen sprechen von einem Verbot bei Gewichtsverlust. Neuere sagen, das pauschale Verbot sei entfallen. Laut einer Quelle sind die Health-&-Wellness-Regeln ab 22.07.2026 „claims-basiert“: Vorher/Nachher ist nur in Kombination mit unzulässigen Aussagen ein Verstoß. Close-ups von „Fettfalten“ sind weiterhin verboten. Für Gewichtsverlust-Produkte gilt Targeting ab 18. Zeitversprechen wie „20 Pfund in 2 Wochen“ werden beanstandet. — [clikim](https://clikim.com/meta-health-wellness-policy-update/); [aimerce](https://www.aimerce.ai/blogs/what-metas-health-wellness-ad-policy-actually-allows); [zappush](https://www.zappush.com/blog/why-meta-doesnt-allow-before-and-after-images-in-health-ads); [primores](https://primores.org/wiki/marketing/meta-ad-policy/)

### Inferences
- Eigene Ableitung für ein Schichtkochbuch: „Arbeitest du Nachtschicht?“ bzw. „Are you a nurse working nights?“ ist ein klassischer Fall der Personal-Attributes-Regel. Besonders riskant ist die Verknüpfung mit Gesundheit (Schlaf, Verdauung, Gewicht). Sicherer sind Formulierungen über das Produkt oder Dritte: „Rezepte für alle, die im Schichtdienst arbeiten“, „Das Kochbuch für Nachtschicht-Wochen“. Gewichts- und Gesundheitsversprechen vermeiden.
- Die Ad Library mit Filter Deutschland eignet sich, um die Anzeigen von Wettbewerbern, deren Laufzeit (als grober Erfolgsindikator) und deren gewählte Zielgruppen zu sehen.

### Gaps
- Offizieller Text von transparency.meta.com bzw. den Werberichtlinien („Persönliche Merkmale“, „Gesundheit und Wellness“) nicht direkt abgerufen. Das Juli-2026-Update ist nur über eine Sekundärquelle belegt.
- Einschränkungen für gesundheitsbezogene Custom Audiences bzw. Event-Daten (Meta beschränkt seit 2025 bestimmte Health-Websites bei Events) nicht belegt.

## 7. Testmethodik und Benchmarks

### Takeaway
Meta bietet A/B-Tests (Experimente) und seit 2025 ein „Creative Testing“-Feature innerhalb bestehender Anzeigengruppen: zunächst bis zu 5 Anzeigen, in manchen Konten bis zu 10, bis zu 30 Tage. Bei kleinem Budget sind statistisch belastbare Tests auf Purchase-Ebene kaum möglich. Entscheidungsregeln an einem Max-CPA ausrichten. Seriöse, quellengesicherte Benchmarks für E-Book-CPAs in Deutschland wurden nicht gefunden.

### Cited Findings
- [KONTO] Creative Testing: bis zu 5 neue Ads in einer bestehenden Anzeigengruppe, in manchen Konten bis zu 10. Setup über die Bearbeitungsansicht einer Anzeige („Creative Testing“ > „Test einrichten“). Budgetanteil und Dauer bis 30 Tage wählbar. Jede Person sieht nur eine Variante, Auswertung unter „Experimente“. Bestehende Ads lassen sich nicht testen. — [jonloomer](https://www.jonloomer.com/meta-creative-testing/); [jonloomer QVT](https://www.jonloomer.com/qvt/meta-expanding-creative-testing-10-ads/)
- [EMPF Agentur/Blog] Laut einer Quelle empfiehlt Meta, höchstens ca. 20 % des Budgets für Creative-Tests einzusetzen. Nach Testende gibt es keine automatische Budgetverschiebung zum Gewinner. Unbestätigt. — Suchzusammenfassung zu [toco.marketing](https://toco.marketing/blog/creative-strategy/how-to-test-ads-on-meta-in-2026-creative-testing-frameworks/) / [extuitive](https://extuitive.com/articles/meta-ads-creative-testing)

### Inferences
- Eigene Ableitung bzw. Empfehlung: Bei kleinem Budget 3–5 klar unterschiedliche Creative-Konzepte in einer Anzeigengruppe laufen lassen und Meta verteilen lassen.
- Abschaltregel eigene Ableitung, Beispiel: Max-CPA = Deckungsbeitrag pro Verkauf. Bei einem E-Book sind das ca. Preis minus USt. minus Gebühren. Eine Anzeige abschalten, wenn sie Ausgaben von ca. 1,5–2× Max-CPA ohne Kauf erreicht. Vorlaufindikatoren (CTR, Kosten pro AddToCart) nur als Frühsignal nutzen.
- Bei wenigen Käufen ist der Zufall groß. Unterschiede von 1–3 Käufen sind nicht aussagekräftig.
- Benchmarks: Keine belastbaren, quellengesicherten Werte für CPM, CTR oder CPA bei E-Books in DE gefunden, daher keine Zahlen nennen.

### Gaps
- Offizielle Meta-Doku zum Creative-Testing-Tool und zu A/B-Test-Mindestbudgets nicht abgerufen.
- Keine verlässlichen Benchmarks für Deutschland 2025/2026 gefunden.
