---
name: meta-ads-de
description: Meta-Werbung (Facebook/Instagram) für die Projekte in diesem Repository planen, prüfen und auswerten – nach deutschem/EU-Recht und unseren Regeln. Nutzen bei "Meta Ads", "Facebook-Anzeigen", "Instagram-Werbung", "Kampagne aufsetzen", "Anzeige prüfen", "Werbebudget", "Pixel/CAPI", "Kampagne auswerten". Ergänzt die Skills ads (Entscheidungssystem, Andromeda-Playbook), ad-creative (Formate, Hooks), conversion-tracking (Pixel, Conversions API) und ab-testing.
---

# Meta Ads nach deutschem Recht (Projektregeln)

Dieser Skill legt fest, **wie** wir Meta-Werbung machen. Das Fachwissen (Kampagnenaufbau, Kill/Keep/Scale-Mathematik, Formate) steht in den Skills `ads` und `ad-creative`; lies dort `references/meta-decision-system.md`, `references/meta-andromeda-playbook.md` und `references/meta-creative-formats.md`, bevor du eine Entscheidung zu einem laufenden Konto triffst. Bei Widerspruch gelten die Regeln hier, weil sie deutsches Recht und die Vorgaben des Inhabers abbilden.

## Vor jeder Arbeit lesen
1. `CLAUDE.md` (Projektregeln) und die `CLAUDE.md` des Projekts.
2. Die Produktkontext-Datei des Projekts: `<projekt>/.agents/product-marketing.md` (Zielgruppe, Ziel-CAC, Ereignisse, Learnings).
3. Die Claim-Freigabe bzw. die Werberegeln des Projekts (Essensplaner: `essensplaner/marke/Claim_Freigabe.md`).
4. Die bestehende Strategie (Essensplaner: `essensplaner/marketing/Meta_Strategie.md`).

## Harte Grenzen (nie ohne ausdrückliche Freigabe des Inhabers)
- **Kein Geld ausgeben, keine Kampagne starten, kein Budget ändern, nichts veröffentlichen.** Über den Windsor.ai-Connector nur lesen. Schreibende Aktionen (`execute_action`) erst, wenn der Inhaber genau diese Änderung bestätigt hat. Immer erst Entwurf: Ist-Zustand → Änderung → erwartete Wirkung → Rückweg.
- **Audience Network aus.** Messenger-Platzierung aus.
- **Tracking nur mit Einwilligung** (TDDDG § 25, DSGVO): Pixel lädt erst nach „Akzeptieren“; „Ablehnen“ gleich sichtbar. Conversions API nur für Personen mit Einwilligung bzw. nach anwaltlicher Prüfung. **Nie Gesundheits-, Ernährungs-, Allergie- oder Gerätedaten** an Meta (Art. 9 DSGVO). Keine Pixel auf Seiten, die solche Eingaben enthalten.
- **Keine Zielgruppen nach sensiblen Merkmalen** (Gesundheit, Religion, finanzielle Lage, sexuelle Orientierung). Mindestalter 18.

## Werbeaussagen (UWG, HWG, HCVO, Meta-Richtlinien)
- **Keine unbelegten Aussagen.** Zahlen nur mit Quelle und Datum; Produktzahlen aus den echten Daten (z. B. `landing.py`-Zählung), nie geschätzt.
- **Keine Sparversprechen** („spart X €“) und keine Vergleiche mit Wettbewerbern ohne Beleg (§ 6 UWG). Euro-Beträge nur, wenn das Projekt sie freigegeben hat, dann mit „ca.“, Laden und Preisstand.
- **Keine Heil-, Abnehm-, Muskel- oder Gesundheitsversprechen.** Nährwertbezogene Wörter („proteinreich“) nur, wenn die Bedingung der Health-Claims-Verordnung erfüllt ist.
- **Keine persönlichen Eigenschaften unterstellen** (Meta-Richtlinie): nicht „Du bist pleite?“, „Du hast Allergien?“, „Du bist übergewichtig?“. Erlaubt: Angebot für eine Gruppe beschreiben („für Familien“, „für zwei Personen“).
- **Keine erfundenen Kundenstimmen, Nutzerzahlen oder Bewertungen.** Keine Fake-Countdowns, keine künstliche Knappheit.
- **Probeabo:** Preis nach der Probezeit gleich sichtbar wie „0 €“. „Kündigen ohne Login“ ist Pflicht, kein Werbevorteil.
- **E-Books** (Honigmama, DURCHSCHICHT): Buchpreisbindung, also keine Rabatte und keine Rabattcodes in Anzeigen.
- **Marken Dritter:** keine Logos von Händlern (Aldi, Lidl …) oder Herstellern, Namen nur beschreibend im Text.
- **Creator/Partnerschaft:** immer als Werbung gekennzeichnet, schriftliche Nutzungsrechte, keine vorgegebenen Versprechen.

## Standard-Aufbau (Andromeda)
- Breit: Land Deutschland, Altersspanne, **keine Interessen**; Werbemittel machen die Zielgruppe.
- Test: 1 CBO-Kampagne, 1 Anzeigengruppe, 8–10 **verschiedene Konzepte** (nicht Varianten). Später 80 % Skalieren / 20 % Testen.
- Optimierungsziel: das häufigste Ereignis, das noch nah am Kauf liegt (≥ 50 je Woche), bewertet wird nach echten Käufen.
- UTM an jeder Anzeige: `utm_source=meta&utm_medium=paid&utm_campaign=<kampagne>&utm_content=<angle>-<format>-<nr>`.
- Benennung: `<Projektkürzel>_<Ziel>_<Phase>_<JJJJ-MM>`, Anzeigen `<angle>-<format>-<nr>`.
- Saison: Q4 (Black Friday, Weihnachten) teuer, Januar günstig. Tests bevorzugt im Januar/Februar.

## Entscheidungsregeln
- Ankerwert je Projekt: **Ziel-CAC = LTV ÷ 3**, Obergrenze = LTV. Daraus die Zielkosten je Optimierungsereignis (Ziel-CAC × Kaufquote).
- 72 Stunden nichts ändern. Laufende Anzeigen nie bearbeiten, sondern neu anlegen.
- Abschalten nach den Regeln der Projekt-Strategie; nie ohne Ersatz pausieren.
- Skalieren +20 % alle 5 Tage, nie mehr.
- Jede Auswertung endet mit **Fakten, Hypothesen, fehlenden Daten** (fehlende Werte als FEHLT markieren, nie schätzen) und genau einer Empfehlung: HALTEN, BEHEBEN, TESTEN oder PRÜFEN.

## Prüfliste vor dem Hochladen einer Anzeige
- [ ] Aussage durch Claim-Freigabe gedeckt oder belegt (Quelle, Datum)
- [ ] keine unterstellte persönliche Eigenschaft
- [ ] keine Euro-/Spar-/Gesundheitsaussage ohne Freigabe
- [ ] Preis und Probezeit vollständig, wenn ein Angebot genannt wird
- [ ] UTM gesetzt, Ziel-URL lädt im Instagram-Browser
- [ ] `marketing-psychology:dark-pattern-check` ohne Befund
- [ ] Kennzeichnung bei Creator-Inhalten

## Auswertung
- Daten über den Windsor.ai-Connector (`windsor-ai:facebook-ads`, `windsor-ai:campaign-report`) lesen; Meta-Zahlen gegen echte Käufe (Zahlungsanbieter) und UTM-Zahlen abgleichen.
- Wöchentlich: Montag Entscheidungen, Mittwoch neue Anzeigen, Freitag Budget. Kurzbericht unter 200 Wörtern für den Inhaber, auf Deutsch.
- Learnings in die Produktkontext-Datei (`.agents/product-marketing.md`, Abschnitt „Learnings“) eintragen, damit getestete Angles nicht wiederkommen.
