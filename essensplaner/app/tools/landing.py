#!/usr/bin/env python3
"""Erzeugt die vier Nischen-Landingpages und die Startseite der Dachmarke in ../public/.

Aufruf: python3 tools/landing.py   (nach Änderungen an Rezepten, config.js oder den Texten unten)
Alle Zahlen (Rezepte je Gerät usw.) werden aus public/data/daten.json gezählt – keine Zahl ist von Hand gesetzt.
Texte folgen den Markenbüchern (marke/*) und der Claim-Freigabe (marke/Claim_Freigabe.md).
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

VARIANTEN = {
    "montage": dict(
        datei="montage.html", titel="Zimmerherd – Essensplan für Monteure im Monteurzimmer",
        beschreibung=f"Wochenplan für Montage: Du kreuzt an, was im Zimmer steht – Wasserkocher, Mikrowelle, Kochplatte. {N_MIKRO_WK} Rezepte gehen schon ohne Herd. Einkaufsliste nach Laden sortiert.",
        h1="Was steht im Zimmer?", unter=f"Kreuz an, was dasteht: Wasserkocher, Mikrowelle, Kochplatte. Zimmerherd plant die Woche, schreibt den Einkaufszettel für den Laden deiner Wahl und sagt, was wie lange im Kühlschrank hält. Nur Wasserkocher, Mikrowelle und Kühlschrank? Dann gehen {N_MIKRO_WK} unserer {N_GESAMT} Rezepte.",
        probleme=[("Ausstattung erst vor Ort klar", "Mal Kochplatte, mal nur Wasserkocher, mal ein Kühlschrank für alle. Der Plan richtet sich nach dem, was diese Woche dasteht."),
                  ("Nach zehn Stunden kein Kopf fürs Kochen", "Viele Gerichte brauchen zehn Minuten Arbeit oder weniger. Die Box für morgen entsteht gleich mit."),
                  ("Raststätte zu, Imbiss teuer", "Der Einkaufszettel ist nach Abteilungen sortiert, mit geschätzten Kosten für Aldi, Lidl, Netto, Penny, Rewe, Edeka oder Kaufland.")],
        check_titel="Zimmer-Check", check_text="Tipp an, was in deinem Zimmer steht. Wir zählen live, wie viele Rezepte damit gehen.",
        check_geraete=["wasserkocher", "mikrowelle", "herd", "topf", "pfanne", "sandwichmaker", "kuehlschrank", "gefrier"],
        check_start=["wasserkocher", "mikrowelle", "kuehlschrank"],
        punkte=[f"{N_WASSERKOCHER} Rezepte nur mit Wasserkocher (und Kühlschrank)", f"{N_OHNE_GERAET} Rezepte ganz ohne Gerät, für Pausen und Kabine",
                "Lagerregeln nach BfR, teils strenger: was in den Kühlschrank muss und wie lange es hält", "Ohne Kühlschrank planen wir nur Zutaten, die ungekühlt lagern dürfen",
                "Einmal kochen, bis zu zwei Tage essen: Boxen mit Datum"],
        faq=[("Brauche ich ein Konto?", "Nein. Der Planer läuft im Browser. Deine Eingaben bleiben auf deinem Handy."),
             ("Was, wenn es im Zimmer nur einen Wasserkocher gibt?", f"Dann plant Zimmerherd nur Rezepte, die damit gehen. Mit Kühlschrank im Zimmer sind das {N_WASSERKOCHER} von {N_GESAMT}."),
             ("Wie genau sind die Preise?", "Es sind Schätzwerte je Laden, keine Tagespreise. Ein Teil ist per Stichprobe vom 29.10.2026 geprüft."),
             ("Was kostet Zimmerherd?", "Ein Tagesplan ist gratis. Für ganze Wochen gibt es den Montage-Pass für 3 Monate oder Plus im Abo.")],
        rezepte=["U10", "U19", "H03", "U31", "H16", "U03"],
    ),
    "fitness": dict(
        datei="fitness.html", titel="Kochsatz – Meal-Prep-Plan nach Makros vom Discounter",
        beschreibung="Kalorien und Makros eingeben, Laden und Budget wählen: Kochsatz plant Meal-Prep mit zwei Kochtagen, Einkaufsliste und Boxen mit Datum. Nährwerte aus dem BLS 4.0.",
        h1="Deine Makros. Dein Discounter. Dein Plan.", unter="Gib Kalorien, Protein, Kohlenhydrate und Fett ein, wähl Laden und Budget. Kochsatz baut die Woche aus zwei Kochtagen, rechnet die Portionen an dein Ziel an und schreibt die Einkaufsliste nach Abteilungen sortiert.",
        probleme=[("Makros treffen ist Rechnerei", "Kochsatz skaliert die Portionen, bis Kalorien und Protein im Wochenschnitt passen. Im automatischen Test (2.800 kcal, 180 g Protein) liegt das Protein im Wochenschnitt bei mindestens 90 % des Ziels."),
                  ("Meal-Prep nach Gefühl", "Zwei Kochtage, ein Ablauf mit Uhrzeiten, Boxen mit „essen bis“-Datum nach den Lagerempfehlungen des BfR, teils strenger."),
                  ("Tracking nach dem Essen nervt", "Vorher planen statt hinterher eintragen. Die Nährwerte kommen aus einer Quelle: dem Bundeslebensmittelschlüssel 4.0.")],
        check_titel="Protein pro Euro", check_text="Welche Zutaten bringen beim gewählten Laden am meisten Protein fürs Geld? Berücksichtigt sind nur Lebensmittel, bei denen mindestens 20 % der Energie aus Protein stammen.",
        check_geraete=[], check_start=[],
        punkte=[f"{N_EIWEISS} Rezepte mit mindestens 30 g Protein je Portion", f"{N_VORKOCH} Rezepte zum Vorkochen",
                "Ofen und Heißluftfritteuse als zwei Wege im selben Rezept", "Kalorien und Budget in einem Plan",
                "Deine Zahlen bleiben auf deinem Handy"],
        faq=[("Ist Kochsatz ein Diätprogramm?", "Nein. Kochsatz plant Essen nach den Zahlen, die du eingibst. Unter 1.200 kcal am Tag planen wir nicht."),
             ("Woher kommen die Nährwerte?", "Aus dem Bundeslebensmittelschlüssel 4.0 des Max Rubner-Instituts. Echte Produkte können abweichen."),
             ("Kann ich mit Heißluftfritteuse statt Ofen kochen?", "Ja. Die meisten Ofenrezepte haben einen zweiten Weg für die Heißluftfritteuse."),
             ("Was kostet Kochsatz?", "Ein Tagesplan ist gratis. Plus kostet 6,99 € im Monat oder 44,99 € im Jahr (Laufzeit 12 Monate, danach monatlich kündbar), die ersten 7 Tage 0 €.")],
        rezepte=["O01", "O05", "O12", "O17", "O22", "O30"],
    ),
    "camping": dict(
        datei="camping.html", titel="Zweiflammer – Wochenplan für die Bordküche im Wohnmobil",
        beschreibung=f"Essensplan für Wohnmobil, Van und Wohnwagen: Flammen, Omnia und Kühlbox ankreuzen. {N_ZWEI_FLAMMEN_OMNIA} Rezepte gehen mit zwei Gasflammen, Omnia-Backofen und Kühlbox. Einkaufsliste für bis zu 14 Tage.",
        h1="Kochen, wie dein Camper es kann.", unter=f"Zwei Flammen, ein Omnia, eine kleine Kühlbox: Zweiflammer plant die Woche für genau diese Bordküche. Mit Einkaufsliste vor der Abfahrt und Hinweisen, was in die Kühlung muss. Mit zwei Flammen, Omnia und Kühlbox gehen {N_ZWEI_FLAMMEN_OMNIA} unserer Rezepte.",
        probleme=[("Kühlschrank-Tetris", "Wenig Platz in der Kühlung. Zweiflammer plant ohne Kühlschrank nur ungekühlt lagerbare Zutaten und sucht für angebrochene Packungen weitere Gerichte."),
                  ("Eine Flamme, ein Topf", f"{N_EINE_PLATTE} Rezepte gehen mit einer einzigen Flamme, Topf und Pfanne. Der Omnia macht Gratin und Crumble auf dem Gasherd."),
                  ("Weit zum nächsten Laden", "Der Einkauf für mehrere Tage steht vor der Abfahrt, nach Abteilungen sortiert.")],
        check_titel="Bordküchen-Check", check_text="Was hat deine Bordküche? Wir zählen live, wie viele Rezepte damit gehen.",
        check_geraete=["herd", "topf", "pfanne", "omnia", "grill", "wasserkocher", "kuehlschrank"],
        check_start=["herd", "topf", "pfanne", "omnia", "kuehlschrank"],
        punkte=[f"{N_ZWEI_FLAMMEN_OMNIA} Rezepte für zwei Gasflammen mit Omnia und Kühlbox", "Grillrezepte mit zweitem Weg in der Pfanne",
                "Plan für 2 Personen voreingestellt, bis 14 Tage", "Funktioniert offline, auch ohne Netz auf dem Stellplatz",
                "Saison-Pass: 6 Monate, endet von selbst"],
        faq=[("Funktioniert das ohne Internet?", "Ja. Einmal geöffnet, läuft der Planer auch offline. Installier ihn dafür auf dem Startbildschirm."),
             ("Was ist ein Omnia?", "Ein Backofen, den man auf die Gasflamme stellt. Wenn du keinen hast, lässt du das Kästchen leer."),
             ("Gibt es Preise für Läden im Ausland?", "Noch nicht. Die Preise sind Schätzwerte für deutsche Ketten."),
             ("Was kostet Zweiflammer?", "Ein Tagesplan ist gratis. Der Saison-Pass kostet 24,99 € einmalig für 6 Monate und endet von selbst.")],
        rezepte=["C07", "C11", "C17", "C03", "C27", "C24"],
    ),
    "alltag": dict(
        datei="alltag.html", titel="Wochenschmaus – Wochenplan mit Einkaufsliste nach Budget",
        beschreibung="Die Woche ist geplant, der Einkauf auch: Wochenplan nach Geräten, Laden, Budget, Personen und Allergien. Einkaufsliste nach Abteilungen sortiert, ohne Konto.",
        h1="Die Woche ist geplant. Der Einkauf auch.", unter="Sag uns, wer mitisst, was ihr nicht mögt und wo du einkaufst. Wochenschmaus plant sieben Tage, schreibt die Einkaufsliste nach Abteilungen sortiert und rechnet mit ganzen Packungen statt halben Avocados.",
        probleme=[("Die Frage um 17:30", "Was gibt es heute? Der Plan steht für die ganze Woche, angebrochene Packungen plant der Planer, wo es geht, in die nächsten Tage ein."),
                  ("Ganze Packungen, geschätzte Kosten", "Wir rechnen mit echten Packungsgrößen und zeigen, was übrig bleibt. Die Preise sind Schätzwerte je Laden."),
                  ("Allergien gehören in jeden Plan", "Filter für die 14 Hauptallergene und Abneigungen. Was du ausschließt, filtert der Planer nach unseren Zutatendaten heraus. Prüf bei Allergien immer das Etikett.")],
        check_titel="Was geht mit meiner Küche?", check_text="Tipp an, was in deiner Küche steht. Wir zählen live, wie viele Rezepte damit gehen.",
        check_geraete=["herd", "topf", "pfanne", "ofen", "airfryer", "mikrowelle", "wasserkocher", "kuehlschrank", "gefrier"],
        check_start=["herd", "topf", "pfanne", "ofen", "kuehlschrank", "gefrier"],
        punkte=[f"{N_GESAMT} Rezepte, alle mit Foto", "Familienrezepte für 4 Portionen", "Vegetarisch, vegan, ohne Schweinefleisch",
                "Einkaufsliste zum Abhaken und Teilen", "Ohne Konto und ohne Werbung im Planer"],
        faq=[("Brauche ich ein Konto?", "Nein. Alles bleibt in deinem Browser."),
             ("Für wie viele Personen?", "Für 1 bis 8 Personen. Die Mengen werden umgerechnet."),
             ("Wie genau sind die Preise?", "Es sind Schätzwerte je Laden, keine Tagespreise. Ein Teil ist per Stichprobe vom 29.10.2026 geprüft."),
             ("Was kostet Wochenschmaus?", "Ein Tagesplan ist gratis. Plus kostet 6,99 € im Monat oder 44,99 € im Jahr (Laufzeit 12 Monate, danach monatlich kündbar), die ersten 7 Tage 0 €.")],
        rezepte=["F23", "F30", "F25", "F13", "F33", "F01"],
    ),
}

GERAET_NAME = {"wasserkocher": "Wasserkocher", "mikrowelle": "Mikrowelle", "herd": "Kochplatte/Flamme", "topf": "Topf", "pfanne": "Pfanne",
               "ofen": "Backofen", "airfryer": "Heißluftfritteuse", "omnia": "Omnia-Backofen", "grill": "Grill", "sandwichmaker": "Sandwichmaker",
               "kuehlschrank": "Kühlschrank", "gefrier": "Gefrierfach"}

KOPF = """<!doctype html>
<html lang="de" data-theme="{v}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titel}</title>
<meta name="description" content="{beschreibung}">
<link rel="canonical" href="{datei}">
<link rel="icon" href="img/logo-{v}.svg" type="image/svg+xml">
<link rel="manifest" href="manifest-{v}.webmanifest">
<link rel="preload" as="image" href="img/hero-{v}-480.jpg" imagesrcset="img/hero-{v}-480.jpg 480w, img/hero-{v}.jpg 900w" imagesizes="(min-width: 800px) 420px, 100vw">
<link rel="stylesheet" href="css/stil.css">
<meta property="og:title" content="{titel}"><meta property="og:description" content="{beschreibung}"><meta property="og:image" content="img/hero-{v}.jpg">
<script type="application/ld+json">{ld}</script>
</head>
<body>
"""


def faq_ld(faq, name):
    return json.dumps({"@context": "https://schema.org", "@graph": [
        {"@type": "SoftwareApplication", "name": name, "applicationCategory": "LifestyleApplication", "operatingSystem": "Web",
         "offers": {"@type": "Offer", "price": "0", "priceCurrency": "EUR", "description": "Tagesplan gratis"}},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": f, "acceptedAnswer": {"@type": "Answer", "text": a}} for f, a in faq]}]}, ensure_ascii=False)


def seite(v, t):
    V = CONFIG["varianten"][v]
    name = V["name"]
    rz = {r["id"]: r for r in R}
    karten = "".join(f'<figure class="rk"><img src="img/rezepte/{i}.jpg" alt="{esc(rz[i]["titel"])}" width="800" height="600" loading="lazy"><figcaption>{esc(rz[i]["titel"])}</figcaption></figure>' for i in t["rezepte"] if i in rz)
    if t["check_geraete"]:
        chips = "".join(f'<label class="chip"><input type="checkbox" value="{g}"{" checked" if g in t["check_start"] else ""}><span>{GERAET_NAME[g]}</span></label>' for g in t["check_geraete"])
        check = f'<div class="chips" id="check-geraete">{chips}</div><p class="check-ergebnis" id="check-ergebnis" aria-live="polite">&nbsp;</p><div class="rk-reihe" id="check-beispiele"></div>'
    else:
        laeden = "".join(f'<option value="{k}">{k.capitalize()}</option>' for k in ["aldi", "lidl", "netto", "penny", "kaufland", "rewe", "edeka"])
        check = f'<div class="feld"><label for="check-laden">Laden</label><select id="check-laden">{laeden}</select></div><table class="nw-tabelle" id="check-protein"><thead><tr><th>Zutat</th><th>Protein je €</th><th>Packung ca.</th></tr></thead><tbody></tbody></table><p class="hilfe">Packungspreise sind Schätzwerte (Stand 10/2026, teils per Stichprobe geprüft). Fleisch und Fisch kosten laut Stichprobe oft mehr als hier geschätzt. Nährwerte: BLS 4.0, Max Rubner-Institut, CC BY 4.0.</p>'
    P = CONFIG["preise"]
    pass_txt = ""
    if v in P["pass"]["varianten"]:
        pass_txt = f'<li><b>Montage-Pass:</b> {P["pass"]["text"]}, endet automatisch</li>'
    if v in P["saison"]["varianten"]:
        pass_txt = f'<li><b>Saison-Pass:</b> {P["saison"]["text"]}, endet automatisch</li>'
    body = f"""<header class="kopf"><div class="wrap"><a href="{t['datei']}"><img class="logo" src="img/logo-{v}.svg" alt="" width="36" height="36"><span class="name">{esc(name)}</span></a>
<span class="rechts"><a href="planer.html?v={v}">Zum Planer</a></span></div></header>
<div class="markenband" aria-hidden="true"></div>
<main>
<section class="held wrap">
  <div class="held-text">
    <h1>{esc(t['h1'])}</h1>
    <p class="gross">{esc(t['unter'])}</p>
    <p><a class="knopf" href="planer.html?v={v}">Tagesplan gratis erstellen</a></p>
    <p class="datenhinweis">Ohne Konto. Deine Eingaben bleiben auf deinem Gerät.</p>
  </div>
  <img class="held-bild" src="img/hero-{v}-480.jpg" srcset="img/hero-{v}-480.jpg 480w, img/hero-{v}.jpg 900w" sizes="(min-width: 800px) 420px, 100vw" alt="" width="900" height="1125" fetchpriority="high">
</section>
<section class="wrap abschnitt"><h2>Kennst du das?</h2><div class="drei">
{''.join(f'<article><h3>{esc(a)}</h3><p>{esc(b)}</p></article>' for a, b in t['probleme'])}
</div></section>
<section class="wrap abschnitt check" id="check" data-variante="{v}"><h2>{esc(t['check_titel'])}</h2><p>{esc(t['check_text'])}</p>{check}
<p><a class="knopf" href="planer.html?v={v}">Mit meiner Ausstattung planen</a></p></section>
<section class="wrap abschnitt"><h2>So geht's</h2><ol class="schritte">
<li><b>Ankreuzen</b> – Geräte, Laden, Budget, wer mitisst, was nicht auf den Teller soll.</li>
<li><b>Plan bekommen</b> – Mahlzeiten für die Woche, Einkaufsliste nach Abteilungen, geschätzte Kosten.</li>
<li><b>Vorkochen</b> – Ablauf mit Uhrzeiten, Boxen mit „essen bis“, Lagerhinweise nach BfR, teils strenger.</li></ol></section>
<section class="wrap abschnitt"><h2>Was drin ist</h2><ul class="punkte">{''.join(f'<li>{esc(p)}</li>' for p in t['punkte'])}</ul>
<div class="rk-reihe">{karten}</div></section>
<section class="wrap abschnitt"><h2>Preise</h2><ul class="punkte">
<li><b>Gratis:</b> Tagesplan mit Einkaufsliste, so oft du willst</li>
<li><b>Plus:</b> {P['monat']['text']} oder {P['jahr']['text']}, die ersten {CONFIG['probeTage']} Tage 0 €. Jahr: Laufzeit 12 Monate, danach monatlich kündbar</li>{pass_txt}</ul>
<p><a href="preise.html?v={v}">Alle Preise und Bedingungen</a> · Kündigen über „Verträge hier kündigen“, ohne Login, wirksam zum Ende der Laufzeit.</p></section>
<section class="wrap abschnitt"><h2>Fragen</h2>{''.join(f'<details class="mehr"><summary>{esc(f)}</summary><p>{esc(a)}</p></details>' for f, a in t['faq'])}</section>
</main>
<footer class="fuss"><div class="wrap"><nav aria-label="Rechtliches">
<a href="preise.html?v={v}">Preise</a><a href="impressum.html?v={v}">Impressum</a><a href="datenschutz.html?v={v}">Datenschutz</a><a href="agb.html?v={v}">AGB</a>
<a href="widerruf.html?v={v}">Widerrufsbelehrung</a><a href="kuendigen.html?v={v}">Verträge hier kündigen</a><a href="widerrufen.html?v={v}">Vertrag widerrufen</a></nav>
<p>{esc(name)} ist ein Angebot von {esc(CONFIG['dachmarke'])}. Weitere Planer: {' · '.join(f'<a href="{VARIANTEN[k]["datei"]}">{esc(CONFIG["varianten"][k]["name"])}</a>' for k in VARIANTEN if k != v)}.</p>
<p>Nährwerte: Bundeslebensmittelschlüssel 4.0, Max Rubner-Institut (2025), CC BY 4.0. Preise sind Schätzungen. Rezeptfotos: KI-generiert (Higgsfield), zeigen die Gerichte beispielhaft.</p></div></footer>
<script type="module" src="js/check.js"></script>
</body></html>
"""
    return KOPF.format(v=v, titel=esc(t["titel"]), beschreibung=esc(t["beschreibung"]), datei=t["datei"], ld=faq_ld(t["faq"], name)) + body


for v, t in VARIANTEN.items():
    open(os.path.join(ZIEL, t["datei"]), "w", encoding="utf-8").write(seite(v, t))
    print("geschrieben:", t["datei"])

# Startseite der Dachmarke
karten = "".join(f'''<a class="marken-karte" data-theme="{v}" href="{t["datei"]}"><img src="img/logo-{v}.svg" alt="" width="56" height="56">
<span><b>{esc(CONFIG["varianten"][v]["name"])}</b><br>{esc(CONFIG["varianten"][v]["kurz"])}</span></a>''' for v, t in VARIANTEN.items())
start = KOPF.format(v="alltag", titel=f"{esc(CONFIG['dachmarke'])} – Wochenpläne nach deinen Geräten", beschreibung="Vier Essensplaner für Montage, Training, Camping und Alltag: Geräte ankreuzen, Laden wählen, Plan und Einkaufsliste bekommen.", datei="index.html", ld="{}").replace('href="manifest-alltag.webmanifest"', 'href="manifest-alltag.webmanifest"').replace('<link rel="preload" as="image" href="img/hero-alltag-480.jpg" imagesrcset="img/hero-alltag-480.jpg 480w, img/hero-alltag.jpg 900w" imagesizes="(min-width: 800px) 420px, 100vw">', "")
start = start.replace('<link rel="icon" href="img/logo-alltag.svg"', '<link rel="icon" href="img/logo-dach.svg"')
start += f"""<header class="kopf"><div class="wrap"><a href="index.html"><img class="logo" src="img/logo-dach.svg" alt="" width="36" height="36"><span class="name">{esc(CONFIG['dachmarke'])}</span></a></div></header>
<main class="wrap abschnitt"><h1>Welcher Planer passt zu deiner Küche?</h1>
<p class="gross">Alle vier planen mit denselben {N_GESAMT} Rezepten und Lagerregeln. Sie unterscheiden sich darin, was voreingestellt ist und wie sie mit dir reden.</p>
<div class="marken">{karten}</div></main>
<footer class="fuss"><div class="wrap"><nav aria-label="Rechtliches"><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a><a href="agb.html">AGB</a><a href="kuendigen.html">Verträge hier kündigen</a><a href="widerrufen.html">Vertrag widerrufen</a></nav></div></footer>
</body></html>"""
open(os.path.join(ZIEL, "index.html"), "w", encoding="utf-8").write(start)
print("geschrieben: index.html", "| Zahlen:", dict(gesamt=N_GESAMT, wasserkocher=N_WASSERKOCHER, mikro_wk=N_MIKRO_WK, eine_platte=N_EINE_PLATTE, camping=N_ZWEI_FLAMMEN_OMNIA, ohne=N_OHNE_GERAET, eiweiss=N_EIWEISS, vorkoch=N_VORKOCH))
