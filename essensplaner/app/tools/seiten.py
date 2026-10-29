#!/usr/bin/env python3
"""Erzeugt Preis-, Rechts- und Vertragsseiten mit gemeinsamem Kopf und Fuß in ../public/.

Aufruf: python3 tools/seiten.py
Alle Rechtstexte sind ENTWÜRFE (Stand 29.10.2026) und müssen vor dem Start von einer Anwältin/einem Anwalt
geprüft werden (FUER_DICH.md). Platzhalter in [eckigen Klammern] füllt der Inhaber in public/js/config.js aus.
"""
import json, os, re, subprocess

HIER = os.path.dirname(os.path.abspath(__file__))
ZIEL = os.path.join(HIER, "..", "public")
# Einstellungen direkt aus public/js/config.js lesen (eine Quelle für Namen, Preise, Betreiberdaten)
CONFIG = json.loads(subprocess.check_output(
    ["node", "-e", "import('./js/config.js').then(m=>process.stdout.write(JSON.stringify(m.CONFIG)))"], cwd=ZIEL))
# Ein Stylesheet statt zwei (weniger blockierende Anfragen)
open(os.path.join(ZIEL, "css", "stil.css"), "w", encoding="utf-8").write(
    open(os.path.join(ZIEL, "css", "themes.css"), encoding="utf-8").read() + "\n" + open(os.path.join(ZIEL, "css", "app.css"), encoding="utf-8").read())


def feld(pfad):
    w = CONFIG
    for k in pfad.split("."):
        w = w.get(k, "") if isinstance(w, dict) else ""
    return str(w)


def fuelle(html):
    """data-feld-Platzhalter schon beim Bauen füllen (kein Nachladen, kein Springen)."""
    return re.sub(r'<span data-feld="([^"]+)">[^<]*</span>', lambda m: f'<span data-feld="{m.group(1)}">{feld(m.group(1))}</span>', html)


def preiskarten():
    P = CONFIG["preise"]
    t = CONFIG["probeTage"]
    karten = [
        ("jahr", "Plus Jahr (empfohlen)", f"{P['jahr']['text']}. Die ersten {t} Tage kosten 0 €. Erste Abbuchung am {t + 1}. Tag. Laufzeit 12 Monate, danach monatlich kündbar.", "", "Jetzt zahlungspflichtig abonnieren"),
        ("monat", "Plus Monat", f"{P['monat']['text']}. Die ersten {t} Tage kosten 0 €. Erste Abbuchung am {t + 1}. Tag. Kündbar zum Ende des laufenden Abrechnungsmonats.", "", "Jetzt zahlungspflichtig abonnieren"),
        ("pass", "Montage-Pass", f"{P['pass']['text']}. {P['pass']['laufzeit']}.", " ".join(P["pass"]["varianten"]), "Zahlungspflichtig kaufen"),
        ("saison", "Saison-Pass", f"{P['saison']['text']}. {P['saison']['laufzeit']}.", " ".join(P["saison"]["varianten"]), "Zahlungspflichtig kaufen"),
    ]
    out = []
    for k, titel, text, nur, knopf in karten:
        url = CONFIG["kasse"]["urls"].get(k, "")
        k_html = f'<a class="knopf" href="{url}">{knopf}</a>' if url else '<p class="hilfe"><b>Die Kasse ist noch nicht freigeschaltet.</b> Bald kannst du hier kaufen.</p>'
        attr = f' data-nur="{nur}"' if nur else ""
        out.append(f'<article class="tag"{attr}><h2 class="karte">{titel}</h2><div class="inhalt-box"><p>{text}</p>{k_html}</div></article>')
    return "\n".join(out)

KOPF = """<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titel}</title>
<meta name="description" content="{beschreibung}">
<meta name="robots" content="{robots}">
<link rel="icon" href="img/logo-dach.svg" type="image/svg+xml">
<link rel="stylesheet" href="css/stil.css">
<script>(function(){{var v=new URLSearchParams(location.search).get('v');var t={{montage:1,fitness:1,camping:1,alltag:1}};document.documentElement.dataset.theme=t[v]?v:'alltag';}})();</script>
<script type="module" src="js/seiten.js"></script>
</head>
<body>
<header class="kopf"><div class="wrap">
<a href="planer.html" id="heimlink"><img class="logo" id="logo" src="img/logo-dach.svg" alt="" width="36" height="36"><span class="name" id="vname">Tellerkontor</span></a>
<span class="rechts"><a href="planer.html" data-v>Zum Planer</a></span>
</div></header>
<div class="markenband" aria-hidden="true"></div>
<main class="wrap text">
"""

FUSS = """</main>
<footer class="fuss"><div class="wrap">
<nav aria-label="Rechtliches">
<a href="preise.html">Preise</a><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a><a href="agb.html">AGB</a>
<a href="widerruf.html">Widerrufsbelehrung</a><a href="kuendigen.html">Verträge hier kündigen</a><a href="widerrufen.html">Vertrag widerrufen</a>
</nav>
<p>Ein Angebot von <span data-feld="dachmarke">Tellerkontor</span>. Nährwerte: Bundeslebensmittelschlüssel 4.0, Max Rubner-Institut (2025), CC BY 4.0.</p>
</div></footer>
</body>
</html>
"""

ENTWURF = '<p class="meldung"><b>Entwurf</b> – vor Veröffentlichung rechtlich prüfen lassen.</p>'

BETREIBER = """<p><span data-feld="betreiber.name"></span><br><span data-feld="betreiber.strasse"></span><br><span data-feld="betreiber.ort"></span><br>
E-Mail: <span data-feld="betreiber.email"></span><br>Telefon: <span data-feld="betreiber.telefon"></span></p>"""

SEITEN = {
"preise.html": ("Preise – Plus", "Preise für Plus: ganze Woche, Vorkoch-Ablauf, PDF. Ohne Konto.", "index,follow", """
<h1>Plus</h1>
<p>Ohne Plus planst du einen Tag mit Einkaufsliste, so oft du willst. Mit Plus planst du bis zu 14 Tage am Stück, mit Vorkoch-Ablauf, Boxen-Plan und PDF zum Ausdrucken.</p>
<div id="preisliste">{PREISKARTEN}</div>
<p class="hilfe">Alle Preise sind Endpreise. Der Verkauf läuft über unseren Zahlungsdienstleister, der als Verkäufer auftritt und dir die Rechnung schickt. Kündigen kannst du jederzeit über <a href="kuendigen.html">Verträge hier kündigen</a> – ohne Login.</p>
<h2>Schon gekauft? Plus freischalten</h2>
<form id="lizenzform" class="feld">
<label for="schluessel">Dein Lizenzschlüssel aus der E-Mail</label>
<textarea id="schluessel" name="schluessel" rows="3" autocomplete="off" spellcheck="false"></textarea>
<p><button class="knopf" type="submit">Plus freischalten</button></p>
<p id="lizenzstatus" role="status" aria-live="polite"></p>
</form>
<p class="hilfe">Der Schlüssel wird nur auf deinem Gerät gespeichert. Auf einem neuen Gerät gibst du ihn einfach noch einmal ein.</p>
"""),

"kuendigen.html": ("Verträge hier kündigen", "Plus-Vertrag kündigen, ohne Login.", "noindex,follow", """
<h1>Verträge hier kündigen</h1>
<div id="vertragbereich" tabindex="-1">
<p>Du brauchst kein Konto und kein Passwort. Fülle die Felder aus und bestätige mit „Jetzt kündigen“.</p>
<form id="vertragform" data-typ="kuendigung" novalidate>
<fieldset><legend>Deine Kündigung</legend>
<p class="lbl"><b>Art der Kündigung</b></p>
<div class="chips"><label class="chip"><input type="radio" name="art" value="ordentlich" checked><span>Ordentliche Kündigung</span></label>
<label class="chip"><input type="radio" name="art" value="ausserordentlich"><span>Außerordentliche Kündigung</span></label></div>
<div class="feld" id="grund-feld" hidden><label for="grund">Grund der außerordentlichen Kündigung</label><textarea id="grund" name="grund" rows="3"></textarea></div>
<div class="feld"><label for="name">Vor- und Nachname</label><input id="name" name="name" type="text" autocomplete="name" required></div>
<div class="feld"><label for="email">E-Mail-Adresse für die Kündigungsbestätigung</label><input id="email" name="email" type="email" autocomplete="email" required></div>
<div class="feld"><label for="vertrag">Vertrag (z. B. „Plus Jahr“) und, falls zur Hand, Bestell- oder Lizenznummer</label><input id="vertrag" name="vertrag" type="text" required></div>
<div class="feld"><label for="zum">Kündigen zum (leer lassen = frühestmöglicher Termin)</label><input id="zum" name="zum" type="date"></div>
</fieldset>
<button class="knopf" type="submit">Jetzt kündigen</button>
<p id="vertragstatus" role="status" aria-live="polite"></p>
</form>
</div>
"""),

"widerrufen.html": ("Vertrag widerrufen", "Vertrag innerhalb der Widerrufsfrist widerrufen, ohne Login.", "noindex,follow", """
<h1>Vertrag widerrufen</h1>
<div id="vertragbereich" tabindex="-1">
<p>Innerhalb von 14 Tagen nach Vertragsschluss kannst du ohne Angabe von Gründen widerrufen. Details stehen in der <a href="widerruf.html">Widerrufsbelehrung</a>.</p>
<form id="vertragform" data-typ="widerruf" novalidate>
<fieldset><legend>Dein Widerruf</legend>
<div class="feld"><label for="name">Vor- und Nachname</label><input id="name" name="name" type="text" autocomplete="name" required></div>
<div class="feld"><label for="email">E-Mail-Adresse für die Eingangsbestätigung</label><input id="email" name="email" type="email" autocomplete="email" required></div>
<div class="feld"><label for="vertrag">Vertrag (z. B. „Plus Monat“) und, falls zur Hand, Bestellnummer</label><input id="vertrag" name="vertrag" type="text" required></div>
<div class="feld"><label for="datum">Bestellt am (falls bekannt)</label><input id="datum" name="bestellt" type="date"></div>
</fieldset>
<button class="knopf" type="submit">Widerruf bestätigen</button>
<p id="vertragstatus" role="status" aria-live="polite"></p>
</form>
</div>
"""),

"impressum.html": ("Impressum", "Impressum", "index,follow", ENTWURF + """
<h1>Impressum</h1>
<h2>Angaben gemäß § 5 DDG</h2>
""" + BETREIBER + """
<p>Umsatzsteuer: <span data-feld="betreiber.ustid"></span></p>
<p>Inhaltlich verantwortlich nach § 18 Abs. 2 MStV: <span data-feld="betreiber.name"></span>, Anschrift wie oben.</p>
<h2>Verbraucherstreitbeilegung</h2>
<p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
<h2>Quellen</h2>
<p>Nährwerte: Max Rubner-Institut (2025): Bundeslebensmittelschlüssel (BLS), Version 4.0. DOI 10.25826/Data20251217-134202-0, Lizenz CC BY 4.0. Lagerhinweise nach den Verbrauchertipps des Bundesinstituts für Risikobewertung (BfR), teils strenger (u. a. FSA für Reis, USDA für die 2-Stunden-Regel). Schriften: SIL Open Font License.</p>
"""),

"datenschutz.html": ("Datenschutz", "Datenschutzerklärung: Deine Planer-Eingaben bleiben auf deinem Gerät.", "index,follow", ENTWURF + """
<h1>Datenschutz</h1>
<h2>Das Wichtigste zuerst</h2>
<p>Der Planer rechnet in deinem Browser. Alles, was du dort eingibst – Geräte, Laden, Budget, Personen, Ernährungsform, Allergien, Abneigungen, Kalorien- und Makroziele – wird <b>nur auf deinem Gerät</b> gespeichert (im Browser-Speicher „localStorage“) und <b>nicht an uns oder Dritte übertragen</b>. Wir können diese Angaben nicht sehen.</p>
<p><button class="knopf leise" type="button" id="loeschen">Alle meine Eingaben auf diesem Gerät löschen</button></p>
<p class="hilfe">Das löscht auch einen gespeicherten Plus-Schlüssel. Bewahre die E-Mail mit dem Schlüssel auf.</p>
<h2>Verantwortlicher</h2>
""" + BETREIBER + """
<h2>Was auf unserem Server ankommt</h2>
<ul>
<li><b>Aufruf der Website:</b> Unser Hoster verarbeitet technisch nötige Daten (IP-Adresse, Zeitpunkt, aufgerufene Datei, Browser) für die Auslieferung und Sicherheit der Seite, Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO. Server-Logs werden nach spätestens [7] Tagen gelöscht. Hoster: [Name, Anschrift, Sitz in der EU], Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.</li>
<li><b>Kauf von Plus:</b> Der Kauf läuft über [Paddle.com Market Ltd., London, als Verkäufer („Merchant of Record“)]. Paddle verarbeitet Name, E-Mail, Zahlungs- und Rechnungsdaten als eigener Verantwortlicher; es gilt dessen Datenschutzerklärung. Wir erhalten E-Mail, Bestellnummer und Produkt, um dir den Lizenzschlüssel zu schicken (Art. 6 Abs. 1 lit. b DSGVO). Aufbewahrung nach Handels- und Steuerrecht bis zu 10 Jahre.</li>
<li><b>Kündigung und Widerruf:</b> Name, E-Mail und Vertragsangaben aus dem Formular verarbeiten wir zur Bearbeitung und Bestätigung (Art. 6 Abs. 1 lit. b und c DSGVO).</li>
<li><b>Newsletter (nur falls angeboten):</b> nur nach Bestätigung per E-Mail (Double-Opt-in), Rechtsgrundlage Einwilligung, Art. 6 Abs. 1 lit. a DSGVO, jederzeit abbestellbar.</li>
</ul>
<h2>Keine Tracking-Cookies im Planer</h2>
<p>Im Planer setzen wir keine Analyse- oder Werbe-Cookies und binden keine Schriften, Karten oder Skripte von Dritten ein. Auf unseren Werbe-Landingpages kann – nur mit deiner Einwilligung über ein Einwilligungsbanner – ein Messpixel (z. B. Meta) aktiv sein. [Abschnitt ergänzen, sobald eingesetzt.]</p>
<h2>Deine Rechte</h2>
<p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO) sowie auf Beschwerde bei einer Aufsichtsbehörde, z. B. [Landesdatenschutzbehörde des Inhabers].</p>
"""),

"agb.html": ("AGB", "Allgemeine Geschäftsbedingungen für Plus.", "index,follow", ENTWURF + """
<h1>Allgemeine Geschäftsbedingungen</h1>
<h2>1. Geltung und Vertragspartner</h2>
<p>Diese Bedingungen gelten für die Nutzung des Planers und den Zugang „Plus“. Verkäufer und Vertragspartner für den Kauf ist unser Zahlungsdienstleister [Paddle] als Händler („Merchant of Record“); Anbieter der Leistung ist <span data-feld="betreiber.name"></span> (siehe Impressum).</p>
<h2>2. Leistung</h2>
<p>Der Planer erstellt aus deinen Angaben Essenspläne, Einkaufslisten mit geschätzten Kosten und Vorkoch-Abläufe. Preise sind Schätzwerte und keine Tagespreise der Händler. Nährwerte sind aus Durchschnittswerten berechnet (BLS 4.0) und können von konkreten Produkten abweichen. Allergene werden nach den 14 Hauptallergenen gefiltert; Spuren und Rezepturänderungen der Hersteller können wir nicht erkennen – prüf bei Allergien immer das Etikett. Der Planer ist kein Medizinprodukt, keine Ernährungstherapie und keine Diät.</p>
<h2>3. Laufzeit und Kündigung</h2>
<ul>
<li><b>Plus Monat:</b> Laufzeit ein Monat, verlängert sich jeweils um einen Monat, jederzeit zum Ende des laufenden Abrechnungsmonats kündbar.</li>
<li><b>Plus Jahr:</b> Erstlaufzeit 12 Monate. Danach läuft der Vertrag auf unbestimmte Zeit weiter und ist jederzeit mit einer Frist von einem Monat kündbar.</li>
<li><b>Montage-Pass / Saison-Pass:</b> feste Laufzeit (3 bzw. 6 Monate), endet automatisch ohne Kündigung.</li>
<li><b>Testphase:</b> Die ersten <span data-feld="probeTage">7</span> Tage eines Abos kosten 0 €. Kündigst du in dieser Zeit, zahlst du nichts.</li>
<li>Kündigen kannst du jederzeit über <a href="kuendigen.html">Verträge hier kündigen</a> – ohne Login – oder in Textform per E-Mail.</li>
</ul>
<h2>4. Preise und Preisänderungen</h2>
<p>Es gelten die bei Bestellung angezeigten Endpreise. Preiserhöhungen für bestehende Abos gelten nur, wenn du ihnen aktiv zustimmst; ohne Zustimmung endet das Abo zum nächstmöglichen Termin.</p>
<h2>5. Änderungen am Planer</h2>
<p>Wir dürfen den Planer weiterentwickeln (z. B. neue Rezepte, Fehlerbehebung, Anpassung an Gesetze), wenn dir dadurch keine Zusatzkosten entstehen und die vereinbarten Funktionen erhalten bleiben. Bei mehr als unerheblicher Beeinträchtigung kannst du innerhalb von 30 Tagen kostenfrei kündigen (§ 327r BGB).</p>
<h2>6. Haftung</h2>
<p>Wir haften unbeschränkt bei Vorsatz, grober Fahrlässigkeit, Verletzung von Leben, Körper oder Gesundheit und nach dem Produkthaftungsgesetz. Im Übrigen haften wir bei leichter Fahrlässigkeit nur für die Verletzung wesentlicher Vertragspflichten, begrenzt auf den vorhersehbaren, vertragstypischen Schaden.</p>
<h2>7. Widerrufsrecht</h2>
<p>Verbrauchern steht ein Widerrufsrecht zu, siehe <a href="widerruf.html">Widerrufsbelehrung</a>. Widerrufen kannst du auch über <a href="widerrufen.html">Vertrag widerrufen</a>.</p>
<h2>8. Schlussbestimmungen</h2>
<p>Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts; zwingende Verbraucherschutzvorschriften deines Wohnsitzstaats bleiben unberührt.</p>
"""),

"widerruf.html": ("Widerrufsbelehrung", "Widerrufsbelehrung für Plus.", "index,follow", ENTWURF + """
<h1>Widerrufsbelehrung</h1>
<h2>Widerrufsrecht</h2>
<p>Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
<p>Um dein Widerrufsrecht auszuüben, musst du uns (<span data-feld="betreiber.name"></span>, <span data-feld="betreiber.strasse"></span>, <span data-feld="betreiber.ort"></span>, E-Mail <span data-feld="betreiber.email"></span>) mittels einer eindeutigen Erklärung (z. B. E-Mail) über deinen Entschluss, diesen Vertrag zu widerrufen, informieren. Am einfachsten geht das über <a href="widerrufen.html">Vertrag widerrufen</a>. Du kannst dafür auch das Muster-Widerrufsformular unten verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass du die Mitteilung vor Ablauf der Widerrufsfrist absendest.</p>
<h2>Folgen des Widerrufs</h2>
<p>Wenn du diesen Vertrag widerrufst, haben wir dir alle Zahlungen, die wir von dir erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über deinen Widerruf bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das du bei der ursprünglichen Transaktion eingesetzt hast, es sei denn, mit dir wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden dir wegen dieser Rückzahlung Entgelte berechnet.</p>
<p>Hast du verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll, so hast du uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem du uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichtest, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.</p>
<h2>Muster-Widerrufsformular</h2>
<p>(Wenn du den Vertrag widerrufen willst, dann fülle bitte dieses Formular aus und sende es zurück.)</p>
<p>An <span data-feld="betreiber.name"></span>, <span data-feld="betreiber.strasse"></span>, <span data-feld="betreiber.ort"></span>, <span data-feld="betreiber.email"></span>:<br>
Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung (*)<br>
Bestellt am (*)/erhalten am (*)<br>Name des/der Verbraucher(s)<br>Anschrift des/der Verbraucher(s)<br>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)<br>Datum<br>(*) Unzutreffendes streichen.</p>
"""),
}

for datei, (titel, beschreibung, robots, inhalt) in SEITEN.items():
    html = KOPF.format(titel=titel, beschreibung=beschreibung, robots=robots) + inhalt.strip().replace("{PREISKARTEN}", preiskarten()) + "\n" + FUSS
    html = fuelle(html)
    open(os.path.join(ZIEL, datei), "w", encoding="utf-8").write(html)
    print("geschrieben:", datei)

# Planer-Seite: Texte aller Varianten eingebettet, damit Name und Claim ohne Nachladen erscheinen
texte = {k: {"name": v["name"], "claim": v["claim"], "kurz": v["kurz"]} for k, v in CONFIG["varianten"].items()}
vorlage = open(os.path.join(HIER, "planer.vorlage.html"), encoding="utf-8").read()
open(os.path.join(ZIEL, "planer.html"), "w", encoding="utf-8").write(fuelle(vorlage.replace("/*TEXTE*/{}", json.dumps(texte, ensure_ascii=False))))
print("geschrieben: planer.html")
