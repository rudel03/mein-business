#!/usr/bin/env python3
"""Setzt Honigmama Band 2 / Band 3 als HTML (220 x 270 mm) im Layout von Band 1."""
import re, sys, html, importlib.util, os
from collections import OrderedDict
import content as C

W = os.path.dirname(os.path.abspath(__file__))
def load(name):
    s = importlib.util.spec_from_file_location(name, os.path.join(W, f"{name}_data.py"))
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m

e = html.escape

CSS = """
@font-face{font-family:FR;src:url(fonts/fraunces-latin-600-normal.woff2);font-weight:600}
@font-face{font-family:FR;src:url(fonts/fraunces-latin-700-normal.woff2);font-weight:700}
@font-face{font-family:FR;src:url(fonts/fraunces-latin-400-italic.woff2);font-weight:400;font-style:italic}
@font-face{font-family:IN;src:url(fonts/inter-latin-400-normal.woff2);font-weight:400}
@font-face{font-family:IN;src:url(fonts/inter-latin-500-normal.woff2);font-weight:500}
@font-face{font-family:IN;src:url(fonts/inter-latin-600-normal.woff2);font-weight:600}
@font-face{font-family:IN;src:url(fonts/inter-latin-700-normal.woff2);font-weight:700}
@page{size:220mm 270mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#F5F0E8;--card:#EDE4D6;--card2:#FBF8F2;--gold:#A97016;--pill:#D9A54A;--ink:#362112;--mut:#7A6450;--line:#DCCFBB;--blue:#E3EBF0;--sage:#E4E9DC}
body{font-family:IN,Arial,sans-serif;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{width:220mm;height:270mm;position:relative;overflow:hidden;page-break-after:always;background:var(--bg);padding:17mm 18mm 20mm}
.hd{position:absolute;top:9mm;left:18mm;right:18mm;display:flex;justify-content:space-between;font-size:7pt;font-weight:600;letter-spacing:.12em;color:var(--gold);text-transform:uppercase}
.ft{position:absolute;bottom:8mm;left:18mm;right:18mm;display:flex;justify-content:space-between;font-size:7.5pt;color:var(--ink);border-top:1px solid var(--line);padding-top:2.5mm}
.ft b{color:var(--gold);font-weight:600}
h1,h2,h3,.fr{font-family:FR,Georgia,serif;font-weight:600}
h1{font-size:25pt;line-height:1.1;margin-bottom:6mm}
h2{font-size:18pt;line-height:1.15}
.kick{font-size:7.5pt;font-weight:600;letter-spacing:.12em;color:var(--gold);text-transform:uppercase;margin-bottom:2mm}
p{font-size:10pt;line-height:1.5}
.card{background:var(--card);border-radius:4mm;padding:5mm 6mm;margin-bottom:4mm}
.card.l{background:var(--card2)}
.card h3{font-family:IN;font-size:10pt;font-weight:600;margin-bottom:1.5mm}
.card p{font-size:9.6pt;line-height:1.5}
.pill{display:inline-block;background:var(--pill);color:var(--ink);font-size:8pt;font-weight:600;padding:1.4mm 4mm;border-radius:10mm}
.ph{width:100%;object-fit:cover;border-radius:4mm;display:block}
.meta{font-size:8.5pt;color:var(--gold);margin-top:2mm}
/* Rezeptseite */
.rh{display:flex;align-items:center;gap:4mm;margin-bottom:2mm}
.rh h2{font-size:17pt}
.rule{border-top:1px solid var(--line);margin:4mm 0 4mm}
.cols{display:grid;grid-template-columns:58mm 1fr;gap:8mm}
.lab{font-size:7.5pt;font-weight:600;letter-spacing:.1em;color:var(--gold);margin-bottom:3mm}
.ing div{font-size:11pt;line-height:1.3;margin-bottom:2.6mm}
.ing b{font-weight:600}
.al{font-size:7.8pt;line-height:1.4;border-top:1px solid var(--line);padding-top:2mm;margin-top:3mm}
.st{display:flex;gap:3.5mm;margin-bottom:3.6mm}
.st span{flex:0 0 7mm;height:7mm;border-radius:50%;background:var(--pill);font-size:8pt;font-weight:600;display:flex;align-items:center;justify-content:center;margin-top:.3mm}
.st p{font-size:11.2pt;line-height:1.42}
.boxes{position:absolute;left:18mm;right:18mm;bottom:20mm;display:grid;grid-template-columns:1fr 1fr;gap:5mm}
.boxes .card{margin:0;padding:4mm 5mm}
.boxes .card h3{font-size:7.5pt;letter-spacing:.1em;color:var(--gold);font-weight:600}
.boxes .card p{font-size:8.7pt;line-height:1.42}
.boxes .card.baby{background:var(--blue)}
/* Tabellen */
table{border-collapse:collapse;width:100%}
th{background:var(--pill);font-size:7.5pt;font-weight:600;letter-spacing:.06em;text-align:left;padding:2mm 2.5mm}
td{font-size:8.6pt;line-height:1.35;padding:2mm 2.5mm;border-bottom:1px solid var(--line);vertical-align:top}
tr:nth-child(even) td{background:var(--card2)}
td small{color:var(--gold);font-size:7.2pt}
.toc a{display:flex;justify-content:space-between;font-size:9.6pt;padding:2mm 0;border-bottom:1px solid var(--line);color:var(--ink);text-decoration:none}
.toc a span:last-child{color:var(--gold);font-weight:600}
.chk{display:inline-block;width:3.2mm;height:3.2mm;border:1px solid var(--gold);border-radius:.8mm;margin-right:2mm;vertical-align:-.5mm}
.shop{columns:2;column-gap:8mm}
.shop .grp{break-inside:avoid;margin-bottom:4mm}
.shop .grp h4{font-size:8pt;font-weight:600;color:var(--gold);margin-bottom:1.5mm;letter-spacing:.06em;text-transform:uppercase}
.shop .it{display:flex;justify-content:space-between;font-size:8.8pt;padding:1.1mm 0;border-bottom:1px dotted var(--line)}
.shop .it em{font-style:normal;color:var(--mut);font-size:7pt;display:block}
.shop.c3{columns:3;column-gap:5mm}.shop.c3 .it{font-size:7.5pt;padding:.6mm 0}.shop.c3 .it em{display:inline;font-size:6pt;margin-left:1mm}.shop.c3 .grp{margin-bottom:2.5mm}.shop.c3 .grp h4{font-size:7pt;margin-bottom:.8mm}.shop.c3 .chk{width:2.6mm;height:2.6mm;margin-right:1.2mm}
.lbl{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4mm}
.lbl div{border:1.2px dashed var(--gold);border-radius:3mm;padding:3mm;height:37mm;background:var(--card2)}
.lbl b{font-family:FR;font-size:10pt;display:block;margin-bottom:1mm}
.lbl i{font-style:normal;font-size:7pt;color:var(--mut);display:block;line-height:1.35}
.lbl .ln{border-bottom:1px solid var(--line);font-size:7pt;color:var(--gold);padding-top:2.4mm}
"""

UNI = {"½":.5,"¼":.25,"¾":.75}
PLUR = {"Zehe":"Zehen","Stange":"Stangen","Dose":"Dosen","Kugel":"Kugeln","Rolle":"Rollen","Scheibe":"Scheiben","Stück":"Stück","Bund":"Bund","Handvoll":"Handvoll","Würfel":"Würfel","Beet":"Beete","Kopf":"Köpfe"}
SING = {v:k for k,v in PLUR.items()}; SING.update({"Stücke":"Stück","Scheiben":"Scheibe"})

def num(s):
    s=s.strip()
    m=re.match(r"^(\d+)?([½¼¾])",s)
    if m: return (int(m.group(1)) if m.group(1) else 0)+UNI[m.group(2)], s[m.end():]
    m=re.match(r"^(\d+(?:,\d+)?)",s)
    if m: return float(m.group(1).replace(",",".")), s[m.end():]
    return None, s

def parse(amount):
    """-> (qty, unit, size)"""
    q, rest = num(amount); rest=rest.strip()
    size=None; pm=re.search(r"\((?:ca\.\s*|je\s*|à\s*)?(\d+(?:,\d+)?)\s*(g|ml|kg|l)\)", rest)
    if pm:
        v=float(pm.group(1).replace(",",".")); u=pm.group(2)
        if u=="kg": v*=1000; u="g"
        if u=="l": v*=1000; u="ml"
        size=(v,u); rest=rest[:pm.start()].strip()
    tok = rest.split(" ")[0] if rest else ""
    tok = re.sub(r"[^\wäöüÄÖÜß]","",tok)
    if tok in ("g","kg","ml","l"):
        v=q or 0
        if tok=="kg": v*=1000; tok="g"
        if tok=="l": v*=1000; tok="ml"
        return v, tok, None
    if tok in ("EL","TL","Prise","Spritzer"): return q, tok, None
    if tok.startswith("Dose"): return q, "Dose", size
    if tok in ("große","kleine","großer"): tok=""
    if size and tok in ("","Stück","Stücke","Kopf"):  # Gewicht bekannt
        per = size[0] if "je" in amount or "à" in amount else size[0]/(q or 1)
        return (q or 1)*per, size[1], None
    if tok=="": return q, "Stück", None
    return q, SING.get(tok,tok), size

def fmt(v):
    if v is None: return ""
    if abs(v-round(v))<1e-6: return str(int(round(v)))
    for k,x in UNI.items():
        if abs(v-int(v)-x)<1e-6: return (str(int(v)) if int(v) else "")+k
    return (f"{v:.1f}").replace(".",",")

def shopping(recipe_ids, R, extra_rec=None):
    groups = OrderedDict([("G","Obst & Gemüse"),("K","Kühlregal"),("F","Fleisch & Fisch"),("Z","Tiefkühl"),("T","Vorrat & Konserven")])
    acc = {k:OrderedDict() for k in groups}; vorrat=OrderedDict()
    for rid in recipe_ids:
        r=R[rid]
        for line in r["ing"]:
            amount,name,cat=line.split(";")
            if cat=="V": vorrat[name]=1; continue
            q,u,size=parse(amount)
            key=(name,u,size)
            d=acc[cat].setdefault(key,{"q":0,"src":[],"n":0})
            d["q"]+= (q or 0); d["n"]+=1
            if rid not in d["src"]: d["src"].append(rid)
    out=[]
    for c,title in groups.items():
        items=[]
        for (name,u,size),d in acc[c].items():
            q=d["q"]
            if u in("g","ml"):
                txt = (fmt(q/1000)+(" kg" if u=="g" else " l")) if q>=1000 else f"{fmt(q)} {u}"
            elif u=="Dose":
                txt=f"{fmt(q)} {'Dose' if q<=1 else 'Dosen'}"+(f" à {fmt(size[0])} {size[1]}" if size else "")
            elif u in("EL","TL"): txt=f"{fmt(q)} {u}"
            elif u in ("Prise","Spritzer"): txt="etwas"
            elif u=="Stück": txt=fmt(q) if q else "1"
            else: txt=f"{fmt(q)} {PLUR.get(u,u) if (q or 0)>1 else u}"
            items.append((name,txt,d["src"]))
        if items: out.append((title,items))
    return out, list(vorrat)

def shop_html(groups, vorrat, cls=''):
    h=[f'<div class="shop {cls}">']
    for title,items in groups:
        h.append(f'<div class="grp"><h4>{e(title)}</h4>')
        for n,t,src in items:
            h.append(f'<div class="it"><span><i class="chk"></i>{e(n)}<em>{" ".join(src)}</em></span><span>{e(t)}</span></div>')
        h.append('</div>')
    h.append('</div>')
    if vorrat: h.append(f'<p style="font-size:8.2pt;margin-top:3mm"><b>Aus dem Vorrat prüfen:</b> {e(", ".join(vorrat))}.</p>')
    return "".join(h)

def ing_html(line):
    amount,name,cat=line.split(";")
    return f'<div><b>{e(amount)}</b> {e(name)}</div>'

class Book:
    def __init__(self, B, mod, cover):
        self.B=B; self.mod=mod; self.R={r["id"]:r for r in mod.R}; self.cover=cover
        self.pages=[]; self.anchor={}
    def add(self, html_, key=None, header=None, footer=True):
        n=len(self.pages)+1
        if key: self.anchor[key]=n
        self.pages.append((html_,header,footer,key))
    def chrome(self, n, header, footer):
        h=""
        if header is not None:
            l,r=header
            h+=f'<div class="hd"><span>{e(l)}</span><span>{e(r)}</span></div>'
        if footer:
            h+=f'<div class="ft"><span>Honigmama · {e(self.B["short"])}</span><b>{n}</b></div>'
        return h
    def render(self):
        out=[]
        for i,(h,header,footer,key) in enumerate(self.pages,1):
            h=re.sub(r"\{\{P:([\w]+)\}\}", lambda m: str(self.anchor.get(m.group(1),"?")), h)
            idattr=f' id="p-{key}"' if key else ""
            out.append(f'<section class="pg"{idattr}>{self.chrome(i,header,footer)}{h}</section>'.replace('<section class="pg" id="p-cover">','<section class="pg" id="p-cover" style="padding:0">'))
        return f'<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Honigmama – {e(self.B["title"])}</title><style>{CSS}</style></head><body>{"".join(out)}</body></html>'

def L(key, text): return f'<a href="#p-{key}" style="color:inherit;text-decoration:none">{text}</a>'

def build(which):
    B = C.B2 if which=="b2" else C.B3
    mod = load(which)
    bk = Book(B, mod, f"cover/{which}.jpg")
    band=B["band"]; HB=("Honigmama · "+band, )
    def H(r): return ("Honigmama · "+band, r)
    # 1 Cover
    bk.add(f'<img src="{bk.cover}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block">', key="cover", footer=False)
    # 2 Über diese Ausgabe
    bk.add(f'''<h1>Über diese Ausgabe</h1>
     <div class="card"><h3>Titel und Ausgabe</h3><p>Honigmama · {band}<br><b>{e(B["title"])}</b><br>{e(B["sub"])}<br>{e(B["edition"])}</p></div>
     <div class="card l"><h3>Herausgabe und Kontakt</h3><p>{C.IMPRINT["publisher"]}</p></div>
     <div class="card"><h3>Einordnung</h3><p>{e(C.IMPRINT["einordnung"])}</p></div>
     <div class="card l"><h3>Transparenz und Nutzung</h3><p>{e(C.IMPRINT["transparenz"])}</p></div>''', key="about", header=H("Honigmama"))
    # 3 Inhalt (Platzhalter, wird unten gefüllt)
    toc_index=len(bk.pages); bk.add("", key="toc", header=H("Inhalt"))
    # 4 So nutzt du das Buch
    steps="".join(f'<div class="card{" l" if i%2 else ""}"><h3>{e(t)}</h3><p>{x}</p></div>' for i,(t,x) in enumerate(B["howto"]))
    bk.add(f'<h1>So nutzt du dieses Buch.</h1>{steps}<div style="display:flex;gap:6mm;align-items:center;margin-top:6mm"><img class="ph" src="ph/{which}_ch_{mod.CHAPTERS[0][0]}.jpg" style="width:62mm;height:44mm"><p class="fr" style="font-size:16pt;line-height:1.25">{"Heute vorkochen.<br>Später einfach genießen." if which=="b2" else "Ein Rezept. Eine Hand frei.<br>Ein guter Tag."}</p></div>', key="howto", header=H("Honigmama"))
    # 5 Grundlagen
    for gi,(title,cards) in enumerate(B["basics"]):
        cs="".join(f'<div class="card{" l" if i%2 else ""}"><h3>{e(t)}</h3><p>{x}</p></div>' for i,(t,x) in enumerate(cards))
        bk.add(f'<h1>{e(title)}</h1>{cs}', key=f"basics{gi}", header=H("Grundlagen"))
    # 6 Kapitel + Rezepte
    chapters=[]
    for ci,(cid,cname,cdesc,_) in enumerate(mod.CHAPTERS):
        recs=[r for r in mod.R if r["id"].startswith(cid)]
        bk.add(f'''<img src="ph/{which}_ch_{cid}.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
          <div style="position:absolute;left:12mm;right:12mm;bottom:14mm;background:var(--bg);border-radius:5mm;padding:9mm 10mm">
          <div class="kick">Honigmama · Kapitel {ci+1:02d}</div><h1 style="margin-bottom:3mm">{e(cname)}</h1><p>{e(cdesc)}</p></div>''', key=f"ch{cid}", footer=False)
        rows="".join(f'<a href="#p-r{r["id"]}"><span><span class="pill" style="font-size:7pt;padding:.8mm 2.5mm;margin-right:3mm">{r["id"]}</span>{e(r["title"])}</span><span>{{{{P:r{r["id"]}}}}}</span></a>' for r in recs)
        bk.add(f'<div class="kick">Kapitel {ci+1:02d}</div><h1>{e(cname)}</h1><p style="margin-bottom:6mm">{e(cdesc)} Zeiten sind Richtwerte; Zutaten, Zubereitung und {"Einfrier-Hinweise" if which=="b2" else "Tipps"} stehen beim Rezept.</p><div class="toc">{rows}</div>', key=f"chl{cid}", header=H(cname))
        chapters.append((cid,cname,recs))
        for r in recs:
            meta=f'{r["time"]} Min. · davon aktiv {r["active"]} Min. · ergibt {r["yld"]} · {r["diet"]}'
            bk.add(f'''<div style="display:flex;gap:3mm;align-items:center;margin-bottom:4mm"><span class="pill">{r["id"]}</span><span class="kick" style="margin:0">{e(cname)}</span></div>
             <img class="ph" src="ph/{which}_{r["id"]}.jpg" style="height:96mm">
             <div style="margin-top:7mm"><div class="kick">{e(r["nick"])}</div><h1 style="font-size:24pt;margin-bottom:1mm">{e(r["title"])}</h1><div class="meta">{e(meta)}</div></div>
             <div class="card" style="position:absolute;left:18mm;right:18mm;bottom:20mm;margin:0"><h3 style="font-size:7.5pt;letter-spacing:.1em;color:var(--gold)">WARUM DAS GUT TUT</h3><p>{e(r["why"])}</p></div>''',
             key=f"r{r['id']}", header=("Honigmama · "+band, cname))
            ings="".join(ing_html(x) for x in r["ing"])
            sts="".join(f'<div class="st"><span>{i+1}</span><p>{e(s)}</p></div>' for i,s in enumerate(r["steps"]))
            if which=="b2":
                b1=("EINFRIEREN",r["fr"],""); b2=("AUFTAUEN & AUFWÄRMEN",r["th"],"")
            else:
                b1=("SCHNELLER GEHT'S",r.get("tip",""),"")
                b2=("FÜRS BABY",r["baby"],"baby") if r.get("baby") else ("FRISCH HALTEN",r.get("keep",""),"")
            bk.add(f'''<div class="rh"><span class="pill">{r["id"]}</span><h2>{e(r["title"])}</h2></div><div class="meta">{e(meta)}</div><div class="rule"></div>
              <div class="cols"><div><div class="lab">ZUTATEN</div><div class="ing">{ings}</div><div class="al"><b>Allergene:</b> {e(r["al"])} Etiketten prüfen.</div></div>
              <div><div class="lab">SCHRITT FÜR SCHRITT</div>{sts}</div></div>
              <div class="boxes"><div class="card"><h3>{b1[0]}</h3><p>{e(b1[1])}</p></div><div class="card {b2[2]}"><h3>{b2[0]}</h3><p>{e(b2[1])}</p></div></div>''',
              header=("Honigmama · "+band, cname))
    # 7 Pläne
    if which=="b2":
        for kt in C.B2_KOCHTAGE:
            rl="".join(f'<a href="#p-r{x}"><span><span class="pill" style="font-size:7pt;padding:.8mm 2.5mm;margin-right:3mm">{x}</span>{e(bk.R[x]["title"])}</span><span>{{{{P:r{x}}}}}</span></a>' for x in kt["recipes"])
            tl="".join(f'<tr><td style="width:16mm"><b>{t}</b></td><td>{e(s)}</td></tr>' for t,s in kt["steps"])
            bk.add(f'<div class="kick">Dein Kochtag · ca. 3 Stunden</div><h1>{e(kt["name"])}</h1><div class="card"><h3>Das kommt in die Truhe</h3><p>{e(kt["yields"])}</p></div><div class="toc" style="margin-bottom:5mm">{rl}</div><table><tr><th>Zeit</th><th>Ablauf</th></tr>{tl}</table>', key=kt["key"], header=H("Kochtag"))
            g,v=shopping(kt["recipes"],bk.R)
            bk.add(f'<div class="kick">{e(kt["name"])}</div><h1>Deine Einkaufsliste</h1><p style="margin-bottom:4mm;font-size:9pt">Mengen für alle fünf Rezepte zusammen. Packungsgrößen aufrunden; die Kennungen zeigen, wofür du die Zutat brauchst.</p>{shop_html(g,v)}', key=kt["key"]+"list", header=H("Einkaufsliste"))
        def nm(txt, br=True):
            def rep(m): return f'{e(bk.R[m.group(0)]["title"])} <small>{m.group(0)}</small>'
            parts=[re.sub(r"\b[SCAFEB]\d\d\b", rep, e(x).replace(" in Wraps"," – in Wraps")) for x in re.split(r" · |, ", txt)]
            return ("<br>" if br else " · ").join(parts)
        for half in (0,1):
            rows="".join(f'<tr><td><b>{w}</b><br><small>{e(t)}</small></td><td>{nm(a)}</td><td>{nm(re.sub(r" (Ofenhafer|Muffins|Waffeln|Burritos|Scones|Brötchen)","",f))}</td><td>{nm(s)}</td><td>{e(x)}</td></tr>' for w,t,a,f,s,x in C.B2_SIXWEEKS[half*3:half*3+3])
            intro = '<p style="margin-bottom:4mm">Je Woche rund 14 warme Portionen – genug für ein warmes Essen am Tag für zwei Erwachsene. Die kleine Kennung verweist aufs Rezept, ×2 bedeutet zwei Portionen.</p>' if half==0 else ''
            note = f'<div class="card l" style="margin-top:5mm"><h3>So passt der Plan</h3><p>Wochen 1–3 kommen aus den beiden Kochtagen. Die Gerichte für Wochen 4–6 kochst du in den letzten Schwangerschaftswochen an normalen Abenden doppelt – oder gibst sie Helfern mit der Liste auf Seite {{{{P:helfer}}}}. Nichts muss perfekt sein: Ein Tag mit Brot und Rohkost ist auch ein guter Tag.</p></div>' if half==1 else '<div class="card l" style="margin-top:5mm"><h3>Frühstück und Snacks</h3><p>Nimm abends die Frühstücksportion aus der Truhe in den Kühlschrank. Snacks wie Energiebällchen und Falafel kannst du direkt gefroren in eine Dose am Stillplatz legen.</p></div>'
            bk.add(f'''<div class="kick">Nach der Geburt · {"Wochen 1–3" if half==0 else "Wochen 4–6"}</div><h1>Dein 6-Wochen-Plan</h1>{intro}
          <table><tr><th style="width:22mm">Woche</th><th>Warm aus der Truhe</th><th style="width:38mm">Frühstück</th><th style="width:38mm">Snacks</th><th style="width:22mm">Frisch dazu</th></tr>{rows}</table>{note}''', key="sixweeks" if half==0 else None, header=H("6-Wochen-Plan"))
        hl="".join(f'<div class="card{" l" if i%2 else ""}" style="padding:4mm 5mm"><p>{e(x)}</p></div>' for i,x in enumerate(C.HELFER))
        rows="".join('<tr><td style="height:9mm"></td><td></td><td></td></tr>' for _ in range(9))
        bk.add(f'<div class="kick">Zum Weiterleiten</div><h1>Wer bringt was?</h1>{hl}<table style="margin-top:3mm"><tr><th style="width:32mm">Datum</th><th>Wer?</th><th>Was?</th></tr>{rows}</table>', key="helfer", header=H("Helferliste"))
        allr=list(bk.R.values())
        for part in range(0,len(allr),15):
            cells="".join(f'<div><b>{e(r["title"])}</b><i>{e(r["id"])} · {e(r["th"][:70].rsplit(" ",1)[0])} …</i><div class="ln">Datum</div><div class="ln">Portionen</div></div>' for r in allr[part:part+15])
            bk.add(f'<div class="kick">Ausdrucken · ausschneiden · aufkleben</div><h1 style="margin-bottom:4mm">Gefrier-Etiketten</h1><div class="lbl">{cells}</div>', key="etiketten" if part==0 else None, header=H("Etiketten"))
        rows="".join('<tr><td style="height:8.4mm"></td><td></td><td></td><td></td></tr>' for _ in range(20))
        bk.add(f'<div class="kick">Für die Tür der Gefriertruhe</div><h1>Was ist in der Truhe?</h1><table><tr><th>Gericht</th><th style="width:22mm">Datum</th><th style="width:22mm">Portionen</th><th style="width:30mm">Gegessen</th></tr>{rows}</table>', key="inventar", header=H("Inventar"))
    else:
        for wk in C.B3_WEEKS:
            def cell(x):
                if x.startswith("R:"): rid=x[2:]; return f'<b>REST</b> {e(bk.R[rid]["title"])}<br><small>{rid} · S. {{{{P:r{rid}}}}}</small>'
                return f'{e(bk.R[x]["title"])}<br><small>{x} · S. {{{{P:r{x}}}}}</small>'
            rows="".join(f'<tr><td><b>{d}</b></td><td>{cell(a)}</td><td>{cell(b)}</td><td>{cell(c)}</td></tr>' for d,a,b,c in wk["days"])
            sn=" · ".join(f'{bk.R[x]["title"]} ({x})' for x in wk["snacks"])
            bk.add(f'<div class="kick">Flexibler Wochenplan</div><h1>{e(wk["name"])}</h1><p style="margin-bottom:4mm">{e(wk["note"])} REST = gekochte Portion vom Vortag, gekühlt aufbewahrt.</p><table><tr><th style="width:12mm">Tag</th><th>Frühstück</th><th>Mittag</th><th>Abend</th></tr>{rows}</table><div class="card l" style="margin-top:4mm"><h3>Snacks & Süßes der Woche</h3><p>{e(sn)}</p></div>', key=wk["key"], header=H("Wochenplan"))
            cook=[]
            for d,a,b,c in wk["days"]:
                for x in (a,b,c):
                    if not x.startswith("R:"): cook.append(x)
            cook+=wk["snacks"]
            g,v=shopping(cook,bk.R)
            bk.add(f'<div class="kick">{e(wk["name"])}</div><h1 style="margin-bottom:3mm">Deine Einkaufsliste</h1><p style="margin-bottom:3mm;font-size:8.6pt">Summen für alle Rezepte der Woche (einmal gekocht, Reste eingerechnet). Frühstücke sind oft für eine Person – für zwei verdoppeln.</p>{shop_html(g,v,'c3')}', key=wk["key"]+"list", header=H("Einkaufsliste"))
    # 8 Register, Quellen, Notizen
    allr=sorted(bk.R.values(), key=lambda r: r["title"])
    npg=-(-len(allr)//22); per=-(-len(allr)//npg)
    chunks=[allr[i:i+per] for i in range(0,len(allr),per)]
    for pi,chunk in enumerate(chunks):
        rows="".join(f'<a href="#p-r{r["id"]}"><span>{e(r["title"])}</span><span>{r["id"]} · {{{{P:r{r["id"]}}}}}</span></a>' for r in chunk)
        bk.add(f'<div class="kick">Rezeptregister · {pi+1} von {len(chunks)}</div><h1>Von A bis Z</h1><div class="toc">{rows}</div>', key="register" if pi==0 else None, header=H("Register"))
    src="".join(f'<div class="card{" l" if i%2 else ""}" style="padding:4mm 5mm"><h3>{e(a)}</h3><p>{e(b)}</p></div>' for i,(a,b) in enumerate(C.SOURCES))
    bk.add(f'<h1>Quellen und weiterführende Informationen</h1>{src}<p style="font-size:8.6pt;margin-top:3mm">Stand der Informationen: Oktober 2026. Empfehlungen können sich ändern; maßgeblich sind die aktuellen Veröffentlichungen der genannten Stellen und die Absprache mit deiner Hebamme oder Ärztin.</p>', key="quellen", header=H("Quellen"))
    series=('<div class="card"><h3>Die Honigmama-Reihe</h3><p><b>Band 1 · Was darf ich essen?</b> – 70 Rezepte für die Schwangerschaft.<br><b>Band 2 · Vorkochen fürs Wochenbett</b> – 55 Rezepte zum Einfrieren.<br><b>Band 3 · Kraft-Küche fürs erste Jahr</b> – 65 schnelle Rezepte für Mamas mit Baby.<br>Alle Bände auf beequeenkitchen.com</p></div>')
    lines="".join('<div style="border-bottom:1px solid var(--line);height:9mm"></div>' for _ in range(12))
    bk.add(f'<h1>Platz für deine Notizen</h1>{series}<div class="lab" style="margin-top:4mm">MEINE LIEBLINGSREZEPTE & ÄNDERUNGEN</div>{lines}', key="notizen", header=H("Notizen"))
    # TOC füllen
    items=[("Über diese Ausgabe","about"),("So nutzt du dieses Buch","howto")]
    items+=[(t,f"basics{i}") for i,(t,_) in enumerate(B["basics"])]
    items+=[(f"{i+1} · {n}",f"ch{cid}") for i,(cid,n,_) in enumerate(chapters)]
    if which=="b2":
        items+=[("Kochtag 1 · Ablauf und Einkaufsliste","kt1"),("Kochtag 2 · Ablauf und Einkaufsliste","kt2"),("Dein 6-Wochen-Plan","sixweeks"),("Wer bringt was? · Helferliste","helfer"),("Gefrier-Etiketten","etiketten"),("Was ist in der Truhe? · Inventar","inventar")]
    else:
        items+=[(w["name"].replace(" · "," – ")+" mit Einkaufsliste",w["key"]) for w in C.B3_WEEKS]
    items+=[("Rezeptregister A–Z","register"),("Quellen","quellen"),("Notizen und die Honigmama-Reihe","notizen")]
    rows="".join(f'<a href="#p-{k}"><span>{e(t).rstrip(".")}</span><span>{{{{P:{k}}}}}</span></a>' for t,k in items)
    bk.pages[toc_index]=(f'<div class="kick">Antippen und direkt weiterlesen</div><h1>Dein Weg durch das Buch</h1><div class="toc">{rows}</div>',)+bk.pages[toc_index][1:]
    return bk

if __name__=="__main__":
    which=sys.argv[1]
    bk=build(which)
    open(os.path.join(W,f"{which}.html"),"w").write(bk.render())
    print(which,"pages",len(bk.pages))
