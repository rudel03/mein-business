#!/usr/bin/env python3
"""Erzeugt die Startseite von Wochenbon (index.html) sowie robots.txt, sitemap.xml und llms.txt in ../public/.

Aufruf: python3 tools/landing.py   (nach Änderungen an Rezepten, config.js oder den Texten unten)
Alle Zahlen (Rezepte je Gerät usw.) werden aus public/data/daten.json gezählt – keine Zahl ist von Hand gesetzt.
Texte folgen marke/wochenbon/Gestaltung.md, recherche/14 und der Claim-Freigabe (marke/Claim_Freigabe.md).
Euro-Beträge erscheinen auf der Startseite nur, wenn CONFIG.preiseInWerbung true ist (nach dem Kassenbon-Test).
"""
import json, os, subprocess, html

HIER = os.path.dirname(os.path.abspath(__file__))
ZIEL = os.path.join(HIER, "..", "public")
CONFIG = json.loads(subprocess.check_output(
    ["node", "-e", "import('./js/config.js').then(m=>process.stdout.write(JSON.stringify(m.CONFIG)))"], cwd=ZIEL))
D = json.load(open(os.path.join(ZIEL, "data", "daten.json"), encoding="utf-8"))
R = D["rezepte"]
Z = D["zutaten"]


def moeglich(r, g):
    for w in r["wege"]:
        ok = True
        for x in w["geraete"]:
            if x == "herd":
                ok &= g.get("herd", 0) >= 1
            elif x == "herd2":
                ok &= g.get("herd", 0) >= 2
            else:
                ok &= bool(g.get(x))
        if ok:
            return True
    return False


def lagerbar(z, g):
    """Gleiche Regel wie im Planer (js/engine/grundlagen.js zutatLagerbar)."""
    if z["lager"] == "k":
        return bool(g.get("kuehlschrank")) or "e" in z["flags"]
    if z["lager"] == "t":
        return bool(g.get("gefrier"))
    return True


def zaehle(g):
    """Rezepte, die mit diesen Geräten UND dieser Lagerung gehen (wie der Geräte-Check auf der Seite)."""
    return sum(1 for r in R if moeglich(r, g) and all(lagerbar(Z[z[0]], g) for z in r["zutaten"] if not (len(z) > 3 and z[3] == "opt")))


N_GESAMT = len(R)
N_WASSERKOCHER = zaehle({"wasserkocher": 1, "kuehlschrank": 1})
N_MIKRO_WK = zaehle({"wasserkocher": 1, "mikrowelle": 1, "kuehlschrank": 1})
N_EINE_PLATTE = zaehle({"herd": 1, "topf": 1, "pfanne": 1, "kuehlschrank": 1})
N_ZWEI_FLAMMEN_OMNIA = zaehle({"herd": 2, "topf": 1, "pfanne": 1, "omnia": 1, "kuehlschrank": 1})
N_OHNE_GERAET = zaehle({})
N_EIWEISS = sum(1 for r in R if r["n"]["p"] * 4 >= 0.2 * max(r["n"]["kcal"], 1) and r["n"]["p"] >= 30)
N_VORKOCH = sum(1 for r in R if r["mealprep"])

esc = html.escape
BASIS = CONFIG["basisUrl"]
P = CONFIG["preise"]
PREISE_AN = CONFIG.get("preiseInWerbung", False)
DEMO = json.loads(subprocess.check_output(["node", os.path.join(HIER, "demo.mjs")]))
TAGE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
eur = lambda x: f"{x:.2f}".replace(".", ",") + " €"

TITEL = "Wochenplan mit Einkaufszettel für Aldi & Lidl | Wochenbon"
BESCHREIBUNG = "Wochenbon plant deine Woche und schreibt den Einkaufszettel für deinen Discounter, sortiert und mit geschätztem Preis. Ohne Konto, ein Tag gratis."
assert len(TITEL) <= 60 and len(BESCHREIBUNG) <= 155, (len(TITEL), len(BESCHREIBUNG))

FAQ = [
    ("Brauche ich ein Konto?", "Nein. Wochenbon läuft im Browser. Was du einstellst, bleibt auf deinem Gerät."),
    ("Wie genau sind die Preise?", "Es sind Schätzwerte je Laden aus Packungspreisen, keine Tagespreise und keine Angebote. Ein Teil ist per Stichprobe vom 29.10.2026 geprüft."),
    ("Welche Läden gibt es?", "Aldi, Lidl, Netto, Penny, Kaufland, Rewe und Edeka. Der Zettel ist nach Abteilungen sortiert, wie es dort meist liegt."),
    ("Ich habe nur Wasserkocher und Mikrowelle. Geht das?", f"Ja. Tipp auf „Küche“ und wähl die passende Situation. Mit Wasserkocher, Mikrowelle und Kühlschrank gehen {N_MIKRO_WK} unserer {N_GESAMT} Rezepte."),
    ("Kann ich eiweißreich planen?", f"Ja, mit einem Schalter unter „Essen“. {N_EIWEISS} Rezepte haben mindestens 30 g Eiweiß je Portion. Wochenbon ist kein Diät- oder Therapieprogramm."),
    ("Was kostet Wochenbon?", f"Ein Tagesplan ist gratis, so oft du willst. Plus kostet {P['monat']['text']} oder {P['jahr']['text']} (Laufzeit 12 Monate, danach monatlich kündbar), die ersten {CONFIG['probeTage']} Tage 0 €."),
]


def ld():
    return json.dumps({"@context": "https://schema.org", "@graph": [
        {"@type": "Organization", "name": CONFIG["marke"], "url": BASIS, "logo": BASIS + "img/logo-wochenbon.svg"},
        {"@type": "SoftwareApplication", "name": CONFIG["marke"], "url": BASIS, "description": BESCHREIBUNG, "inLanguage": "de",
         "applicationCategory": "LifestyleApplication", "operatingSystem": "Web",
         "offers": [{"@type": "Offer", "price": "0", "priceCurrency": "EUR", "description": "Tagesplan gratis"},
                    {"@type": "Offer", "price": f"{P['monat']['betrag']:.2f}", "priceCurrency": "EUR", "description": "Plus, monatlich"},
                    {"@type": "Offer", "price": f"{P['jahr']['betrag']:.2f}", "priceCurrency": "EUR", "description": "Plus, jährlich (Laufzeit 12 Monate)"}]},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": f, "acceptedAnswer": {"@type": "Answer", "text": a}} for f, a in FAQ]}]}, ensure_ascii=False)


def bon_zeilen(d):
    """Gleiche Gerichte an Folgetagen zusammenfassen: einmal kochen, mehrmals essen."""
    gruppen = []
    for g in d["gerichte"]:
        if gruppen and gruppen[-1]["id"] == g["id"]:
            gruppen[-1]["bis"] = g["tag"]
        else:
            gruppen.append({**g, "von": g["tag"], "bis": g["tag"]})
    out = []
    for g in gruppen:
        tage = TAGE[g["von"]] if g["von"] == g["bis"] else f"{TAGE[g['von']]} bis {TAGE[g['bis']]}"
        n = g["bis"] - g["von"] + 1
        out.append(f'<div class="demo-zeile"><span><b>{esc(g["titel"])}</b><small>{tage}{", einmal gekocht" if n > 1 else ""}</small></span><span>{n} ×</span></div>')
    return "".join(out)


def demo_bon(personen, laden):
    d = DEMO[f"{personen}-{laden}"]
    summe = f'<span class="preisschild">ca. {eur(d["summe"])}</span>' if PREISE_AN else '<span class="preisschild">im Planer</span>'
    return f"""<div class="bon-kopf"><b>Wochenbon</b><small>7 Abendessen · {personen} {"Person" if personen == 1 else "Personen"}{f" · {esc(d['laden'])}" if PREISE_AN else ""}</small></div>
{bon_zeilen(d)}
<div class="demo-zeile"><span><b>Einkaufszettel</b><small>nach Abteilungen sortiert</small></span><span>{d["posten"]} Posten</span></div>
<div class="bon-summe"><span>{"Summe ca." if PREISE_AN else "Preis je Laden"}</span>{summe}</div>"""


DEMO_HTML = {f"{pp}-{l}": demo_bon(pp, l) for pp in [1, 2, 3, 4] for l in ["aldi", "lidl", "rewe"]}
FOTOS = ["F23", "O16", "H06", "F30", "U09", "C17", "F13", "O05"]
RZ = {r["id"]: r for r in R}
LEAD_URL = esc(CONFIG.get("warteliste", {}).get("url", ""))

laden_chips = "".join(f'<label class="chip"><input type="radio" name="demo-laden" value="{k}"{" checked" if k == "aldi" else ""}><span>{n}</span></label>' for k, n in [("aldi", "Aldi"), ("lidl", "Lidl"), ("rewe", "Rewe")]) if PREISE_AN else ""
personen_chips = "".join(f'<label class="chip"><input type="radio" name="demo-personen" value="{n}"{" checked" if n == 2 else ""}><span>{n} {"Person" if n == 1 else "Personen"}</span></label>' for n in [1, 2, 3, 4])

seite = f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(TITEL)}</title>
<meta name="description" content="{esc(BESCHREIBUNG)}">
<link rel="canonical" href="{BASIS}">
<link rel="icon" href="img/logo-wochenbon.svg" type="image/svg+xml">
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#ECEFF4">
<link rel="preload" href="fonts/bricolage-grotesque-latin-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="css/stil.css">
<meta property="og:type" content="website"><meta property="og:locale" content="de_DE"><meta property="og:site_name" content="Wochenbon"><meta property="og:url" content="{BASIS}">
<meta property="og:title" content="{esc(TITEL)}"><meta property="og:description" content="{esc(BESCHREIBUNG)}"><meta property="og:image" content="{BASIS}img/rezepte/F23.jpg"><meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{ld()}</script>
</head>
<body>
<header class="kopf"><div class="wrap">
<a class="marke" href="./"><img src="img/logo-wochenbon.svg" alt="" width="34" height="34">Wochenbon</a>
<span class="rechts"><a class="nur-breit" href="preise.html">Preise</a><a class="knopf" href="planer.html">Woche planen</a></span>
</div></header>
<main>
<section class="wrap held">
  <div>
    <h1>{esc(CONFIG["claim"])}</h1>
    <p class="unter">Wochenbon plant deine Woche und schreibt den Einkaufszettel für deinen Discounter, nach Abteilungen sortiert, mit geschätztem Preis für jede Packung.</p>
    <div class="knoepfe"><a class="knopf" href="planer.html">Woche planen, ein Tag gratis</a><a class="knopf zweit" href="#so-gehts">So geht’s</a></div>
    <p class="klein">Ohne Konto. Für Aldi, Lidl, Netto, Penny, Kaufland, Rewe und Edeka.</p>
  </div>
  <div class="demo" aria-label="Beispiel">
    <div class="chips" role="group" aria-label="Personen">{personen_chips}</div>
    {f'<div class="chips" role="group" aria-label="Laden">{laden_chips}</div>' if laden_chips else ''}
    <div class="bon" id="demo-bon" aria-live="polite">{DEMO_HTML["2-aldi"]}</div>
  </div>
</section>

<section class="abschnitt papier" id="so-gehts"><div class="wrap">
  <h2>So geht’s</h2>
  <ol class="schritte">
    <li><h3>Öffnen</h3><p>Der Plan für die Woche steht schon, du musst nichts ausfüllen.</p></li>
    <li><h3>Antippen, was anders ist</h3><p>Küche, Personen, Laden, Essen. Jede Wahl ändert den Plan sofort.</p></li>
    <li><h3>Einkaufen</h3><p>Der Zettel ist nach Abteilungen sortiert. Abhaken, und der Bon zeigt, was noch fehlt.</p></li>
  </ol>
</div></section>

<section class="abschnitt"><div class="wrap">
  <h2>Was Wochenbon anders macht</h2>
  <div class="vorteile">
    <article class="vorteil"><h3>Ganze Packungen statt halber Avocados</h3><p>Gerechnet wird mit echten Packungsgrößen. Was übrig bleibt, steht auf dem Bon, angebrochene Packungen kommen in die nächsten Tage.</p></article>
    <article class="vorteil"><h3>Einmal kochen, zweimal essen</h3><p>Wo es sich lohnt, kochst du mehr und isst am nächsten Tag noch einmal davon. Mit Lagerhinweisen, wie lange es hält.</p></article>
    <article class="vorteil"><h3>Passt zu deiner Küche</h3><p>Normale Küche, kleine Küche, nur Wasserkocher und Mikrowelle oder Camper: ein Tipp, und es kommen nur Rezepte, die damit gehen.</p>
      <div class="situationen">{"".join(f"<span>{esc(x['name'])}</span>" for x in CONFIG["situationen"].values())}</div></article>
    <article class="vorteil"><h3>Allergien gehören in jeden Plan</h3><p>Filter für die 14 Hauptallergene, auch gratis. Prüf bei Allergien trotzdem immer das Etikett.</p></article>
    <article class="vorteil"><h3>Mehr Eiweiß aus dem normalen Regal</h3><p>Ein Schalter, und der Plan setzt auf Eiweiß: Quark, Linsen, Eier, Hähnchen. {N_EIWEISS} Rezepte haben mindestens 30 g je Portion.</p></article>
    <article class="vorteil"><h3>Ohne Konto, ohne Werbung</h3><p>Deine Einstellungen bleiben im Browser. Wochenbon funktioniert auch offline, etwa im Laden ohne Netz.</p></article>
  </div>
  <div class="foto-streifen" tabindex="0" role="region" aria-label="Beispielgerichte">{"".join(f'<figure><img src="img/rezepte/klein/{i}.jpg" alt="" width="240" height="180" loading="lazy"><figcaption>{esc(RZ[i]["titel"])}</figcaption></figure>' for i in FOTOS if i in RZ)}</div>
  <p class="hilfe">{N_GESAMT} Rezepte. Fotos KI-generiert, zeigen die Gerichte beispielhaft.</p>
</div></section>

<section class="abschnitt papier" id="preise"><div class="wrap">
  <h2>Was Wochenbon kostet</h2>
  <div class="preise">
    <article class="preis-karte"><h3>Gratis</h3><b>0 €</b><p>Ein Tag mit Rezepten und Einkaufszettel, so oft du willst. Die Woche siehst du als Vorschau.</p><a class="knopf zweit" href="planer.html">Ausprobieren</a></article>
    <article class="preis-karte empfohlen"><h3>Plus Jahr</h3><b>{esc(P['jahr']['text'].replace(' im Jahr', ''))}</b><p>im Jahr. Bis zu 14 Tage am Stück, Vorkoch-Ablauf und PDF. Die ersten {CONFIG['probeTage']} Tage 0 €, Laufzeit 12 Monate, danach monatlich kündbar.</p><a class="knopf" href="preise.html">Plus ansehen</a></article>
    <article class="preis-karte"><h3>Plus Monat</h3><b>{esc(P['monat']['text'].replace(' im Monat', ''))}</b><p>im Monat, kündbar zum Ende des Abrechnungsmonats. Die ersten {CONFIG['probeTage']} Tage 0 €.</p><a class="knopf zweit" href="preise.html">Plus ansehen</a></article>
  </div>
</div></section>

<section class="abschnitt"><div class="wrap schmal" id="liste">
  <h2>Ein fertiger Wochenplan per Mail</h2>
  <p>Zum Ausprobieren schicken wir dir einen Wochenplan mit Einkaufszettel. Danach höchstens alle zwei Wochen einen neuen.</p>
  <form class="lead" id="leadform" method="post" action="{LEAD_URL}" novalidate>
    <div class="feld"><label for="lead-mail">E-Mail-Adresse</label><input id="lead-mail" name="email" type="email" autocomplete="email" required></div>
    <label class="einwilligung"><input type="checkbox" name="einwilligung" value="ja" required><span>Ja, schickt mir den Wochenplan zum Ausprobieren und danach höchstens alle zwei Wochen einen neuen Plan mit Tipps und Angeboten zu Wochenbon. Abmelden geht jederzeit über den Link in jeder Mail. <a href="datenschutz.html">Datenschutz</a></span></label>
    <input type="hidden" name="liste" value="wochenbon">
    <p><button class="knopf" type="submit">Plan anfordern</button></p>
    <p class="hilfe">Du bekommst zuerst eine Mail mit einem Bestätigungslink. Erst nach dem Klick tragen wir dich ein.</p>
    <p id="leadstatus" role="status" aria-live="polite"></p>
  </form>
</div></section>

<section class="abschnitt papier"><div class="wrap schmal">
  <h2>Häufige Fragen</h2>
  {"".join(f'<details class="frage"><summary>{esc(f)}</summary><p>{esc(a)}</p></details>' for f, a in FAQ)}
</div></section>
</main>
<footer class="fuss"><div class="wrap"><nav aria-label="Rechtliches">
<a href="preise.html">Preise</a><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a><a href="agb.html">AGB</a>
<a href="widerruf.html">Widerrufsbelehrung</a><a href="kuendigen.html">Verträge hier kündigen</a><a href="widerrufen.html">Vertrag widerrufen</a></nav>
<p>Wochenbon. Nährwerte: Bundeslebensmittelschlüssel 4.0, Max Rubner-Institut (2025), CC BY 4.0. Preise sind Schätzungen, Stand 10/2026, keine Tagespreise.</p></div></footer>
<script>window.WB_DEMO = {json.dumps(DEMO_HTML, ensure_ascii=False)};</script>
<script type="module" src="js/start.js"></script>
<script type="module" src="js/einwilligung.js"></script>
</body></html>
"""
open(os.path.join(ZIEL, "index.html"), "w", encoding="utf-8").write(seite)
print("geschrieben: index.html | Zahlen:", dict(gesamt=N_GESAMT, mikro_wk=N_MIKRO_WK, eiweiss=N_EIWEISS), "| Preise in Werbung:", PREISE_AN)

# robots.txt, sitemap.xml, llms.txt
heute = __import__("datetime").date.today().isoformat()
INDEX = ["index.html", "preise.html", "impressum.html", "datenschutz.html", "agb.html", "widerruf.html"]
open(os.path.join(ZIEL, "robots.txt"), "w").write(f"User-agent: *\nAllow: /\nDisallow: /planer.html\n\nSitemap: {BASIS}sitemap.xml\n")
open(os.path.join(ZIEL, "sitemap.xml"), "w").write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + "".join(f"  <url><loc>{BASIS}{'' if d == 'index.html' else d}</loc><lastmod>{heute}</lastmod></url>\n" for d in INDEX) + "</urlset>\n")
llms = [f"# {CONFIG['marke']}", "",
        "> Wochenplaner fürs Essen als Web-App (PWA, Deutsch, ohne Konto): Wochenplan, Einkaufszettel nach Abteilungen und geschätzter Preis für Aldi, Lidl, Netto, Penny, Kaufland, Rewe und Edeka. Passt sich Küche, Personen, Ernährung und Allergien an. Eingaben bleiben im Browser.", "",
        f"## Fakten (Stand {heute})",
        f"- {N_GESAMT} Rezepte; mit Wasserkocher, Mikrowelle und Kühlschrank {N_MIKRO_WK}; mit mindestens 30 g Eiweiß je Portion {N_EIWEISS}",
        "- Nährwerte: Bundeslebensmittelschlüssel 4.0 (Max Rubner-Institut, CC BY 4.0). Preise: eigene Schätzung je Laden, keine Tagespreise",
        "- Lagerfristen nach BfR, FSA und USDA, teils strenger, bei höchstens 7 °C",
        f"- Preise: Tagesplan gratis; Plus {P['monat']['text']} oder {P['jahr']['text']} (Laufzeit 12 Monate), die ersten {CONFIG['probeTage']} Tage 0 €", "",
        "## Seiten", f"- [Planer]({BASIS}planer.html)", f"- [Preise]({BASIS}preise.html)", f"- [Impressum]({BASIS}impressum.html)", f"- [Datenschutz]({BASIS}datenschutz.html)", ""]
open(os.path.join(ZIEL, "llms.txt"), "w", encoding="utf-8").write("\n".join(llms))
print("geschrieben: robots.txt, sitemap.xml, llms.txt")
