"""Setzt das DURCHSCHICHT-Buch als HTML (eine Section = eine Seite). Render: node render.js ds.html ds.pdf"""
import html, os, re
import ds_data as D, ds_content as C

W = os.path.dirname(os.path.abspath(__file__))
B = os.path.join(W, "..", "brand")
e = html.escape
SHIFT = {"F": ("Früh", "#F2C230"), "S": ("Spät", "#FF5B1F"), "N": ("Nacht", "#3B6FE0"), "A": ("Danach", "#8A97A8"), "KT": ("Kochtag", "#0E1A2B")}
EQ = {"M": "Mikrowelle", "K": "Kühlschrank", "O": "ohne Kühlung", "T": "Thermobehälter"}
CAT = {"G": "Obst & Gemüse", "K": "Kühlregal", "F": "Fleisch & Fisch", "T": "Trocken & Konserven", "Z": "Tiefkühl", "V": "Vorrat"}


def eq_icon(c, size=18):
    s = size
    st = f'width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
    p = {
        "M": '<rect x="2" y="5" width="20" height="14" rx="2"/><rect x="5" y="8" width="10" height="8" rx="1"/><circle cx="18.5" cy="10" r="1"/><circle cx="18.5" cy="14" r="1"/>',
        "K": '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M5 10h14M9 5v2M9 13v3"/>',
        "O": '<path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/><path d="M8 14h8"/>',
        "T": '<rect x="7" y="6" width="10" height="16" rx="3"/><path d="M8 2h8v4H8z"/><path d="M10 11v6"/>',
    }[c]
    return f'<svg {st}>{p}</svg>'


def eq_badges(eqs):
    return "".join(f'<span class="eq">{eq_icon(c)}{EQ[c]}</span>' for c in eqs) or '<span class="eq">zu Hause</span>'


def slot_badges(slot):
    out = []
    i = 0
    while i < len(slot):
        k = "KT" if slot[i:i+2] == "KT" else slot[i]
        i += len(k)
        n, col = SHIFT[k]
        out.append(f'<span class="sh" style="--c:{col}">{n}</span>')
    return "".join(out)


CSS = """
@font-face{font-family:BC;src:url(../brand/fonts/barlow-condensed-latin-800-normal.woff2);font-weight:800}
@font-face{font-family:BC;src:url(../brand/fonts/barlow-condensed-latin-700-normal.woff2);font-weight:700}
@font-face{font-family:BC;src:url(../brand/fonts/barlow-condensed-latin-600-normal.woff2);font-weight:600}
@font-face{font-family:IN;src:url(../brand/fonts/inter-latin-400-normal.woff2);font-weight:400}
@font-face{font-family:IN;src:url(../brand/fonts/inter-latin-600-normal.woff2);font-weight:600}
@font-face{font-family:IN;src:url(../brand/fonts/inter-latin-700-normal.woff2);font-weight:700}
@font-face{font-family:MO;src:url(../brand/fonts/jetbrains-mono-latin-500-normal.woff2);font-weight:500}
@font-face{font-family:MO;src:url(../brand/fonts/jetbrains-mono-latin-700-normal.woff2);font-weight:700}
@page{size:210mm 280mm;margin:0}
:root{--navy:#0E1A2B;--or:#FF5B1F;--chalk:#F3F0E8;--steel:#8A97A8;--line:#D9D4C7;--y:#E9F24A}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:IN;color:var(--navy);font-size:9.6pt;line-height:1.45;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{width:210mm;height:280mm;position:relative;overflow:hidden;page-break-after:always;background:var(--chalk);padding:20mm 16mm 18mm}
.pg.dark{background:var(--navy);color:var(--chalk)}
.hd{position:absolute;top:8mm;left:16mm;right:16mm;display:flex;justify-content:space-between;font:500 7pt/1 MO;letter-spacing:.12em;text-transform:uppercase;color:var(--steel)}
.ft{position:absolute;bottom:8mm;left:16mm;right:16mm;display:flex;justify-content:space-between;align-items:center;font:500 7pt/1 MO;color:var(--steel);border-top:1px solid var(--line);padding-top:3mm}
.dark .ft{border-color:#24344d}
.ft b{font:700 9pt/1 MO;color:var(--or)}
h1{font:800 34pt/0.95 BC;text-transform:uppercase;letter-spacing:.005em;margin-bottom:5mm}
h2{font:700 18pt/1 BC;text-transform:uppercase;margin:0 0 3mm}
h3{font:700 12pt/1.1 BC;text-transform:uppercase;letter-spacing:.02em;margin-bottom:1.5mm}
.kick{font:700 7.5pt/1 MO;letter-spacing:.16em;text-transform:uppercase;color:var(--or);margin-bottom:3mm}
p+p{margin-top:2.5mm}
.lead{font-size:11pt;line-height:1.45;max-width:150mm}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:5mm}
.card{background:#fff;border:1px solid var(--line);border-radius:2mm;padding:4mm 5mm}
.dark .card{background:#162538;border-color:#24344d}
.card.o{border-left:3px solid var(--or)}
.eq{display:inline-flex;align-items:center;gap:1.2mm;font:500 7pt/1 MO;text-transform:uppercase;letter-spacing:.06em;border:1px solid var(--navy);border-radius:1mm;padding:1.2mm 2mm;margin:0 1.5mm 1.5mm 0}
.sh{display:inline-block;font:700 7pt/1 MO;text-transform:uppercase;letter-spacing:.08em;padding:1.3mm 2mm;border-radius:1mm;margin:0 1.5mm 1.5mm 0;background:var(--c);color:#fff}
.sh[style*="F2C230"]{color:var(--navy)}
.rid{font:700 9pt/1 MO;background:var(--navy);color:var(--chalk);padding:1.5mm 2.2mm;border-radius:1mm}
.ph{width:100%;object-fit:cover;border-radius:2mm;display:block}
.meta{font:500 7.6pt/1.4 MO;color:#4a5668;margin:1.5mm 0 3mm}
.ing{list-style:none}.ing li{display:flex;gap:2mm;padding:1.1mm 0;border-bottom:1px dotted var(--line);font-size:8.8pt}
.ing li span{flex:0 0 22mm;font:500 8pt/1.4 MO;color:#4a5668}
.st{list-style:none;counter-reset:s}.st li{counter-increment:s;position:relative;padding-left:8mm;margin-bottom:2.3mm;font-size:9pt}
.st li:before{content:counter(s);position:absolute;left:0;top:0;width:5.5mm;height:5.5mm;border-radius:1mm;background:var(--or);color:#fff;font:700 8pt/5.5mm MO;text-align:center}
.box{border-radius:2mm;padding:3mm 4mm;font-size:8.6pt}
.box .lab{font:700 7pt/1 MO;letter-spacing:.14em;text-transform:uppercase;margin-bottom:1.5mm}
.box.why{background:#fff;border:1px solid var(--line)}.box.why .lab{color:var(--or)}
.box.store{background:var(--navy);color:var(--chalk)}.box.store .lab{color:var(--y)}
.al{font:500 7pt/1.4 MO;color:#4a5668;margin-top:2mm}
table{width:100%;border-collapse:collapse;font-size:8.4pt}
th{font:700 7pt/1.2 MO;letter-spacing:.08em;text-transform:uppercase;text-align:left;background:var(--navy);color:var(--chalk);padding:2mm}
td{padding:2mm;border-bottom:1px solid var(--line);vertical-align:top}
tr:nth-child(even) td{background:#fbfaf6}
.toc a{display:flex;justify-content:space-between;gap:4mm;padding:2mm 0;border-bottom:1px solid var(--line);color:inherit;text-decoration:none;font-size:9.4pt}
.dark .toc a{border-color:#24344d}
.toc a span:last-child{font:700 9pt/1 MO;color:var(--or)}
.big{font:800 64pt/0.85 BC;text-transform:uppercase}
.lbl{display:grid;grid-template-columns:1fr 1fr 1fr;gap:3mm}
.lbl div{border:1.5px dashed var(--navy);border-radius:2mm;padding:3mm;height:30mm;font:500 7.5pt/1.9 MO;position:relative}
.lbl div b{display:block;font:800 11pt/1 BC;text-transform:uppercase;color:var(--or);margin-bottom:1mm}
.line{border-bottom:1px solid var(--line);height:9mm}
"""


class Book:
    def __init__(self):
        self.pages = []
        self.keys = {}

    def add(self, body, key=None, header=None, footer=True, dark=False, cls=""):
        if key:
            self.keys[key] = len(self.pages) + 1
        self.pages.append((body, key, header, footer, dark, cls))

    def render(self):
        out = []
        for i, (body, key, header, footer, dark, cls) in enumerate(self.pages):
            n = i + 1
            body = re.sub(r"\{\{P:([\w-]+)\}\}", lambda m: str(self.keys.get(m.group(1), "?")), body)
            idattr = f' id="p-{key}"' if key else ""
            hd = f'<div class="hd"><span>DURCHSCHICHT</span><span>{e(header)}</span></div>' if header else ""
            ft = f'<div class="ft"><span>Essen nach Dienstplan</span><b>{n}</b></div>' if footer else ""
            out.append(f'<section class="pg{" dark" if dark else ""} {cls}"{idattr}>{hd}{body}{ft}</section>')
        return f'<!doctype html><html lang="de"><head><meta charset="utf-8"><title>DURCHSCHICHT – {e(C.SUB)}</title><style>{CSS}</style></head><body>{"".join(out)}</body></html>'


def build():
    bk = Book()
    R = {r["id"]: r for r in D.R}
    # 1 Cover
    bk.add(f'<img src="cover.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">', key="cover", footer=False, dark=True, cls="cover")
    # 2 Über / Inhalt (TOC wird am Ende gefüllt)
    bk.add("", key="toc", header="Inhalt", dark=True)
    toc_i = len(bk.pages) - 1
    about = "".join(f"<p>{e(x)}</p>" for x in C.ABOUT)
    bk.add(f'<div class="kick">Bevor es losgeht</div><h1>Kein Diätbuch.<br>Ein Dienstplan fürs Essen.</h1><div class="lead">{about}</div>', key="about", header="Über dieses Buch")
    how = "".join(f'<div class="card o"><h3>{e(a)}</h3><p>{e(b)}</p></div>' for a, b in C.HOWTO)
    eqs = "".join(f'<div class="card"><h3 style="display:flex;gap:2mm;align-items:center">{eq_icon(c,20)}{e(n)}</h3><p>{e(t)}</p></div>' for c, n, t in C.EQUIP)
    bk.add(f'<div class="kick">So funktioniert es</div><h1>Vier Regeln.<br>Vier Symbole.</h1><div class="grid2" style="margin-bottom:6mm">{how}</div><div class="grid2">{eqs}</div>', key="howto", header="So funktioniert es")
    rh = ""
    for name, rows in C.RHYTHM:
        tr = "".join(f'<tr><td style="width:30mm;font:700 8.4pt MO">{e(t)}</td><td>{e(x)}</td></tr>' for t, x in rows)
        rh += f'<h3 style="margin-top:4mm">{e(name)}</h3><table>{tr}</table>'
    bk.add(f'<div class="kick">Der Rhythmus</div><h1>Wann essen –<br>je nach Schicht</h1><p class="lead">Ein Raster, keine Pflicht. Es folgt den Empfehlungen von DGE und NIOSH: die warme Hauptmahlzeit vor der Schicht, kleine Mahlzeiten in der zweiten Nachthälfte.</p>{rh}', key="rhythm", header="Rhythmus")
    ru = "".join(f'<div class="card o"><h3>{e(a)}</h3><p>{e(b)}</p></div>' for a, b in C.RULES)
    cf = "".join(f"<tr><td>{e(a)}</td><td style='font:700 8.4pt MO;text-align:right'>{e(b)}</td></tr>" for a, b in C.COFFEE)
    bk.add(f'<div class="kick">Was wirklich zählt</div><h1>Vier Dinge,<br>die belegt sind</h1><div class="grid2">{ru}</div><h3 style="margin-top:6mm">Koffein-Uhr: Wie viel steckt drin?</h3><table><tr><th>Getränk</th><th style="text-align:right">Koffein</th></tr>{cf}</table><p class="al">{e(C.COFFEE_SRC)}</p>', key="rules", header="Grundlagen")
    st = "".join(f"<tr><td style='width:42mm;font-weight:700'>{e(a)}</td><td>{e(b)}</td></tr>" for a, b in C.STORAGE)
    bk.add(f'<div class="kick">Lagerkarte · zum Ausdrucken</div><h1>Wie lange<br>hält das wirklich?</h1><table>{st}</table><div class="box store" style="margin-top:5mm"><div class="lab">Darum</div>{e(C.STORAGE_NOTE)}</div>', key="lager", header="Lagerkarte")
    # Pläne
    for pl in C.PLANS:
        if pl["key"] == "plan_kochtag":
            rows = "".join(f'<tr><td style="font:700 9pt MO;width:16mm">{e(a)}</td><td>{e(c)}</td><td>{e(d)}</td></tr>' for a, b, c, d, x in pl["days"])
            tab = f'<table><tr><th>Zeit</th><th>Herd & Ofen</th><th>Nebenher</th></tr>{rows}</table>'
        else:
            def sh(s):
                k = s[:1] if s[:1] in "FSN" else None
                return f'<span class="sh" style="--c:{SHIFT[k][1]}">{SHIFT[k][0]}</span>' if k and s in ("F", "S", "N") else e(s)
            rows = "".join(f'<tr><td style="font:700 8.6pt MO;width:24mm">{e(a)}</td><td style="width:22mm">{sh(b)}</td><td>{e(c)}</td><td>{e(d)}</td><td>{e(x)}</td></tr>' for a, b, c, d, x in pl["days"])
            tab = f'<table><tr><th>Tag</th><th>Schicht</th><th>Vor der Schicht</th><th>Pause</th><th>Klein / danach</th></tr>{rows}</table>'
        kocht = f'<div class="box store" style="margin:4mm 0"><div class="lab">Kochblock</div>{e(pl["kocht"])}</div>' if pl["kocht"] else ""
        rids = sorted(set(re.findall(r"\b[VMKTNAB]0\d\b", str(pl["days"]) + pl["kocht"])))
        refs = " · ".join(f'<a href="#p-r{x}" style="color:inherit">{x} {e(R[x]["title"])} (S. {{{{P:r{x}}}}})</a>' for x in rids)
        bk.add(f'<div class="kick">Plan · {e(pl["sub"])}</div><h1>{e(pl["name"])}</h1>{kocht}{tab}<div class="card o" style="margin-top:4mm"><p>{e(pl["note"])}</p></div><p class="al" style="margin-top:4mm">Rezepte in diesem Plan: {refs}</p>', key=pl["key"], header="Dienstplan-Plan")
    # Übergabe + Kochkette
    ho = "".join(f'<div class="line" style="height:auto;padding:3mm 0">{e(x)}</div>' for x in C.HANDOVER)
    bk.add(f'<div class="kick">Für zu Hause · ausdrucken, an den Kühlschrank</div><h1>Die Übergabe</h1><p class="lead">Auf der Arbeit gibt es eine Übergabe. Zu Hause nicht – dabei lebt dort jemand in einem anderen Rhythmus. Ein Blatt pro Woche reicht.</p><div class="card" style="margin-top:5mm">{ho}</div>', key="uebergabe", header="Übergabe")
    ch = "".join(f'<div class="card o"><h3>{e(a)}</h3><p>{e(b)}</p></div>' for a, b in C.CHAIN)
    bk.add(f'<div class="kick">Gemeinsam statt allein</div><h1>Die Kollegen-<br>Kochkette</h1><div class="grid2">{ch}</div>', key="kette", header="Kochkette")
    # Kapitel + Rezepte
    for ci, (cid, cname, cdesc, _) in enumerate(D.CHAPTERS):
        recs = [r for r in D.R if r["id"].startswith(cid)]
        rows = "".join(f'<a href="#p-r{r["id"]}"><span><b style="font-family:MO;margin-right:3mm">{r["id"]}</b>{e(r["title"])}</span><span>{{{{P:r{r["id"]}}}}}</span></a>' for r in recs)
        bk.add(f'''<img src="ph/ch_{cid}.jpg" style="position:absolute;inset:0;width:100%;height:58%;object-fit:cover">
          <div style="position:absolute;left:0;right:0;bottom:0;height:46%;background:var(--navy);padding:10mm 16mm">
          <div class="kick">Kapitel {ci+1:02d}</div><div class="big" style="margin-bottom:3mm">{e(cname)}</div><p style="max-width:140mm;margin-bottom:4mm">{e(cdesc)}</p><div class="toc" style="columns:2;column-gap:8mm">{rows}</div></div>''', key=f"ch{cid}", dark=True, footer=False)
        for r in recs:
            ing = "".join(f'<li><span>{e(x.split(";")[0])}</span>{e(x.split(";")[1])}</li>' for x in r["ing"])
            stp = "".join(f"<li>{e(s)}</li>" for s in r["steps"])
            bk.add(f'''<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3mm"><span class="rid">{r["id"]}</span><span>{slot_badges(r["slot"])}</span></div>
              <img class="ph" src="ph/{r["id"]}.jpg" style="height:74mm">
              <h2 style="margin-top:4mm">{e(r["title"])}</h2>
              <div class="meta">{r["time"]} Min. · aktiv {r["active"]} Min. · {e(r["yld"])} · {e(r["diet"])}</div>
              <div>{eq_badges(r["eq"])}</div>
              <div style="display:grid;grid-template-columns:72mm 1fr;gap:6mm;margin-top:2mm">
                <div><h3>Zutaten</h3><ul class="ing">{ing}</ul><p class="al">Allergene: {e(r["al"])}</p></div>
                <div><h3>So geht's</h3><ol class="st">{stp}</ol></div>
              </div>
              <div class="grid2" style="position:absolute;left:16mm;right:16mm;bottom:20mm">
                <div class="box why"><div class="lab">Warum das passt</div>{e(r["why"])}</div>
                <div class="box store"><div class="lab">Lagern & mitnehmen</div>{e(r["store"])}</div>
              </div>''', key=f"r{r['id']}", header=cname)
    # Etiketten
    cells = "".join('<div><b>DURCHSCHICHT</b>Gericht ____________<br>gekocht am ___.___ um ___:___<br>essen bis ___.___ · Name ______</div>' for _ in range(18))
    bk.add(f'<div class="kick">Ausdrucken · ausschneiden · aufkleben</div><h1 style="margin-bottom:4mm">Etiketten</h1><div class="lbl">{cells}</div>', key="etiketten", header="Etiketten")
    # Register
    allr = sorted(D.R, key=lambda r: r["title"])
    half = (len(allr) + 1) // 2
    for pi, chunk in enumerate((allr[:half], allr[half:])):
        rows = "".join(f'<a href="#p-r{r["id"]}"><span>{e(r["title"])}</span><span>{r["id"]} · {{{{P:r{r["id"]}}}}}</span></a>' for r in chunk)
        bk.add(f'<div class="kick">Register · {pi+1} von 2</div><h1>Von A bis Z</h1><div class="toc">{rows}</div>', key="register" if pi == 0 else None, header="Register")
    src = "".join(f"<tr><td style='width:70mm;font-weight:600'>{e(a)}</td><td>{e(b)}</td></tr>" for a, b in C.SOURCES)
    bk.add(f'<div class="kick">Belegt, nicht behauptet</div><h1>Quellen</h1><table>{src}</table><p class="al" style="margin-top:4mm">Stand der Informationen: Oktober 2026. Empfehlungen können sich ändern; maßgeblich sind die aktuellen Veröffentlichungen der genannten Stellen. Allgemeine Information, keine medizinische Beratung.</p>', key="quellen", header="Quellen")
    lines = "".join('<div class="line"></div>' for _ in range(16))
    bk.add(f'<div class="kick">Deine Seite</div><h1>Notizen</h1>{lines}<p class="al" style="margin-top:6mm">© 2026 DURCHSCHICHT · durchschicht.de · Dieses E-Book ist für den persönlichen Gebrauch der kaufenden Person bestimmt.</p>', key="notizen", header="Notizen")
    # TOC
    items = [("Kein Diätbuch – über dieses Buch", "about"), ("Vier Regeln, vier Symbole", "howto"), ("Wann essen – je nach Schicht", "rhythm"), ("Was belegt ist · Koffein-Uhr", "rules"), ("Lagerkarte", "lager")]
    items += [(f'Plan: {p["name"]}', p["key"]) for p in C.PLANS]
    items += [("Die Übergabe für zu Hause", "uebergabe"), ("Die Kollegen-Kochkette", "kette")]
    items += [(f"Kapitel {i+1:02d} · {c[1]}", f"ch{c[0]}") for i, c in enumerate(D.CHAPTERS)]
    items += [("Etiketten", "etiketten"), ("Register A–Z", "register"), ("Quellen", "quellen")]
    rows = "".join(f'<a href="#p-{k}"><span>{e(t)}</span><span>{{{{P:{k}}}}}</span></a>' for t, k in items)
    bk.pages[toc_i] = (f'<div class="kick">Antippen und hinspringen</div><h1>Inhalt</h1><div class="toc">{rows}</div>',) + bk.pages[toc_i][1:]
    return bk


if __name__ == "__main__":
    bk = build()
    open(os.path.join(W, "ds.html"), "w").write(bk.render())
    print("pages", len(bk.pages))
