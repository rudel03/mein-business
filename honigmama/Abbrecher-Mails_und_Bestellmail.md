# Honigmama: Mails für abgebrochene Checkouts und Bestellbestätigung

Hier aktivierst du die Mails: Shopify Admin → Marketing → Automatisierungen → Vorlage „Abgebrochener Checkout“. Die Shopify-Vorlage nutzt eine einzige Mail. Für zwei Mails im Abstand fügst du im Ablauf nach der ersten Mail eine Wartezeit von 23 Stunden ein und dahinter die zweite Mail.

**Einstellungen, bevor du startest:**
- **Empfänger:** nur Personen mit Marketing-Einwilligung. In der Automatisierung die Bedingung „Kunde abonniert E-Mail-Marketing“ setzen.
- **Kein Rabattcode.** Wegen der Buchpreisbindung darf es auf die Bücher keinen Rabatt geben. Erlaubt ist der Hinweis auf die Pakete, denn die haben einen eigenen festen Preis.

---

## Mail 1 · nach 1 Stunde

**Betreff:** Dein Honigmama-Kochbuch wartet noch auf dich 🍯
**Vorschautext:** Ein Klick, und die PDF ist sofort bei dir.

> Hallo {{ customer.first_name | default: "du" }},
>
> du warst gerade kurz davor, dir dein Honigmama-Kochbuch zu holen. Vielleicht kam etwas dazwischen – das kennen wir gut.
>
> Dein Warenkorb ist noch für dich gespeichert:
>
> **[Zum Warenkorb zurück]**
>
> Nach dem Kauf bekommst du die PDF sofort per E-Mail. Kein Abo, kein Versand, einfach öffnen und loskochen.
>
> Liebe Grüße
> Alexander von BeeQueen Kitchen

---

## Mail 2 · nach 24 Stunden

**Betreff:** Kleiner Tipp: Im Paket bekommst du mehr für dein Geld
**Vorschautext:** Band 1 + 2 für 29,90 € statt 34,89 € einzeln.

> Hallo {{ customer.first_name | default: "du" }},
>
> falls du noch überlegst: Viele Mamas planen nicht nur die Schwangerschaft, sondern gleich auch die Zeit danach.
>
> **Paket Schwangerschaft + Wochenbett** – Band 1 „Was darf ich essen?“ und Band 2 „Vorkochen fürs Wochenbett“ für **29,90 €** statt 34,89 € einzeln.
>
> **Die komplette Honigmama-Reihe** – alle drei Bände, 190 Rezepte und 13 fertige Pläne für **39,90 €** statt 54,79 € einzeln.
>
> **[Dein Warenkorb]** · **[Pakete ansehen]** (Link: https://beequeenkitchen.com/#hm-reihe)
>
> Fragen? Antworte einfach auf diese Mail.
>
> Liebe Grüße
> Alexander von BeeQueen Kitchen

---

## Hinweis in der Bestellbestätigung (Upsell nach dem Kauf)

Wo: Einstellungen → Benachrichtigungen → Bestellbestätigung → „Code bearbeiten“. Den folgenden Block vor dem Footer einfügen:

```liquid
<table style="width:100%;margin-top:24px;background:#fff7ef;border:2px solid #b4532f;border-radius:12px"><tr><td style="padding:18px;font-family:Arial,sans-serif;color:#362112">
<p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#b4532f"><strong>Die Honigmama-Reihe</strong></p>
<p style="margin:0 0 10px;font-size:16px"><strong>Schon an die Zeit nach der Geburt gedacht?</strong></p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.5">Band 2 „Vorkochen fürs Wochenbett“: 2 Kochtage, 55 Rezepte zum Einfrieren, über 160 warme Portionen für 6 Wochen. Band 3 „Kraft-Küche fürs erste Jahr“: 65 schnelle Rezepte für Mamas mit Baby.</p>
<a href="https://beequeenkitchen.com/#hm-reihe" style="display:inline-block;background:#362112;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:14px">Zur Reihe</a>
</td></tr></table>
```
