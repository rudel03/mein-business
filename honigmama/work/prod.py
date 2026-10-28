#!/usr/bin/env python3
"""Produktbilder (1600x1600) für Band 2, Band 3 und die Bundles."""
FONT = """@font-face{font-family:FR;src:url(fonts/fraunces-latin-700-normal.woff2);font-weight:700}
@font-face{font-family:FR;src:url(fonts/fraunces-latin-400-italic.woff2);font-style:italic}
@font-face{font-family:IN;src:url(fonts/inter-latin-600-normal.woff2);font-weight:600}
@font-face{font-family:IN;src:url(fonts/inter-latin-700-normal.woff2);font-weight:700}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1600px;height:1600px;overflow:hidden;font-family:IN;color:#362112;background:#F5EDE0;position:relative}
.bk{position:absolute;border-radius:6px 14px 14px 6px;overflow:hidden;box-shadow:0 40px 70px rgba(54,33,18,.35), inset 8px 0 14px rgba(0,0,0,.12)}
.bk img{width:100%;height:100%;object-fit:cover;display:block}
.bk:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.18),rgba(255,255,255,.08) 3%,rgba(0,0,0,0) 6%)}
h1{font-family:FR;font-weight:700;letter-spacing:-.01em}
.pill{display:inline-block;background:#D9A54A;border-radius:60px;font-weight:700}
.pg{position:absolute;background:#fff;box-shadow:0 30px 60px rgba(54,33,18,.28);border-radius:6px;overflow:hidden}
.pg img{width:100%;display:block}
"""
B = {
 "b2": dict(cover="cover/b2.jpg", t="Vorkochen fürs Wochenbett", n="2", k=["55 Rezepte · über 160 warme Portionen","2 Kochtage mit Ablauf & Einkaufsliste","6-Wochen-Plan nach der Geburt","Gefrier-Etiketten & Helferliste"], pv=["pv_b2_13.png","pv_b2_14.png","pv_b2_104.png","pv_b2_106.png"], price="19,90 €"),
 "b3": dict(cover="cover/b3.jpg", t="Kraft-Küche fürs erste Jahr", n="3", k=["65 Rezepte in 5–25 Minuten","Einhand-Frühstück & Snack-Station","Ein Essen für alle + fürs Baby abzweigen","4 Wochenpläne mit Einkaufslisten"], pv=["pv_b3_16.png","pv_b3_17.png","pv_b3_122.png","pv_b3_63.png"], price="19,90 €"),
}
def page(name, body): open(f"prod_{name}.html","w").write(f"<!doctype html><html><head><meta charset='utf-8'><style>{FONT}</style></head><body>{body}</body></html>")

for k,b in B.items():
    # 1 Cover groß
    page(f"{k}_1", f"""<div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,#FBF5EC,#EADCC6)"></div>
      <div class="bk" style="left:380px;top:150px;width:840px;height:1120px"><img src="{b['cover']}"></div>
      <div style="position:absolute;left:0;right:0;bottom:90px;text-align:center"><span class="pill" style="font-size:38px;padding:20px 46px">Honigmama · Band {b['n']} · PDF sofort zum Download</span></div>""")
    # 2 Was drin ist
    items="".join(f'<div style="display:flex;gap:26px;align-items:center;margin-bottom:34px"><div style="width:64px;height:64px;border-radius:50%;background:#D9A54A;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:700;flex:none">✓</div><div style="font-size:46px;font-weight:600;line-height:1.15">{x}</div></div>' for x in b['k'])
    page(f"{k}_2", f"""<div style="position:absolute;left:100px;top:110px;right:100px"><div style="font-size:30px;letter-spacing:.16em;color:#A97016;font-weight:700">DAS STECKT DRIN</div><h1 style="font-size:84px;line-height:1.05;margin:16px 0 60px">{b['t']}</h1>{items}</div>
      <div class="bk" style="right:-90px;bottom:-120px;width:560px;height:746px;transform:rotate(-8deg)"><img src="{b['cover']}"></div>
      <div style="position:absolute;left:100px;bottom:110px;font-size:40px;font-weight:700">{b['price']} <span style="font-weight:600;color:#A97016">· einmalig · kein Abo</span></div>""")
    # 3 Blick ins Buch
    p=b['pv']
    page(f"{k}_3", f"""<div style="position:absolute;left:0;right:0;top:80px;text-align:center"><div style="font-size:30px;letter-spacing:.16em;color:#A97016;font-weight:700">BLICK INS BUCH</div><h1 style="font-size:72px;margin-top:10px">So sieht es innen aus</h1></div>
      <div class="pg" style="left:110px;top:290px;width:680px;transform:rotate(-2deg)"><img src="{p[0]}"></div>
      <div class="pg" style="left:810px;top:300px;width:680px;transform:rotate(1.5deg)"><img src="{p[1]}"></div>""")
    page(f"{k}_4", f"""<div style="position:absolute;left:0;right:0;top:80px;text-align:center"><div style="font-size:30px;letter-spacing:.16em;color:#A97016;font-weight:700">FERTIG GEPLANT</div><h1 style="font-size:72px;margin-top:10px">{"Kochtag & 6-Wochen-Plan" if k=="b2" else "Wochenplan & Einkaufsliste"}</h1></div>
      <div class="pg" style="left:110px;top:290px;width:680px;transform:rotate(-2deg)"><img src="{p[2]}"></div>
      <div class="pg" style="left:810px;top:300px;width:680px;transform:rotate(1.5deg)"><img src="{p[3]}"></div>""")

# Bundles
covers=["cover/b1.jpg","cover/b2.jpg","cover/b3.jpg"]
page("bundle12", f"""<div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,#FBF5EC,#EADCC6)"></div>
  <div style="position:absolute;left:0;right:0;top:80px;text-align:center"><div style="font-size:30px;letter-spacing:.16em;color:#A97016;font-weight:700">PAKET · SCHWANGERSCHAFT + WOCHENBETT</div><h1 style="font-size:76px;margin-top:10px">Band 1 + Band 2</h1></div>
  <div class="bk" style="left:200px;top:330px;width:600px;height:800px;transform:rotate(-5deg)"><img src="{covers[0]}"></div>
  <div class="bk" style="left:800px;top:330px;width:600px;height:800px;transform:rotate(4deg)"><img src="{covers[1]}"></div>
  <div style="position:absolute;left:0;right:0;bottom:90px;text-align:center"><span class="pill" style="font-size:44px;padding:22px 52px">29,90 € statt 34,89 €</span></div>""")
page("bundle123", f"""<div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,#FBF5EC,#EADCC6)"></div>
  <div style="position:absolute;left:0;right:0;top:80px;text-align:center"><div style="font-size:30px;letter-spacing:.16em;color:#A97016;font-weight:700">DIE KOMPLETTE HONIGMAMA-REIHE</div><h1 style="font-size:76px;margin-top:10px">Schwangerschaft · Wochenbett · erstes Jahr</h1></div>
  <div class="bk" style="left:110px;top:400px;width:520px;height:693px;transform:rotate(-7deg)"><img src="{covers[0]}"></div>
  <div class="bk" style="left:970px;top:400px;width:520px;height:693px;transform:rotate(7deg)"><img src="{covers[2]}"></div>
  <div class="bk" style="left:520px;top:340px;width:560px;height:746px;z-index:2"><img src="{covers[1]}"></div>
  <div style="position:absolute;left:0;right:0;bottom:90px;text-align:center"><span class="pill" style="font-size:44px;padding:22px 52px">39,90 € statt 54,79 € · 190 Rezepte</span></div>""")
