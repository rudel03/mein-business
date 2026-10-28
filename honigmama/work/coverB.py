import json
V=[("1","B1.jpg","#7E8F6A","#F6F1E4","#E9C46A","Was darf<br>ich essen?","Das Kochbuch für deine Schwangerschaft","70 Rezepte · 3 Wochenpläne · Lebensmittel-Hinweise"),
   ("2","B2.jpg","#B4532F","#FBF1E6","#F2C46D","Vorkochen fürs<br>Wochenbett","Das Kochbuch für die ersten Wochen mit Baby","40 Gerichte zum Einfrieren · 2 Kochtage · 6-Wochen-Plan"),
   ("3","B3.jpg","#E2A33C","#2E2219","#2E2219","Kraft-Küche fürs<br>erste Jahr","Schnelle Rezepte für Mamas mit Baby","50 Rezepte · 4 Wochenpläne · Fürs Baby abzweigen")]
for n,img,bg,fg,acc,t,sub,chips in V:
    html=f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:FR;src:url(fonts/fraunces-latin-700-normal.woff2);font-weight:700}}
@font-face{{font-family:FR;src:url(fonts/fraunces-latin-400-italic.woff2);font-style:italic}}
@font-face{{font-family:IN;src:url(fonts/inter-latin-600-normal.woff2);font-weight:600}}
@font-face{{font-family:IN;src:url(fonts/inter-latin-700-normal.woff2);font-weight:700}}
*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:1200px;height:1600px;background:{bg};color:{fg};font-family:IN;position:relative;overflow:hidden}}
.top{{position:absolute;left:90px;right:90px;top:80px;display:flex;justify-content:space-between;align-items:center}}
.brand{{display:flex;align-items:center;gap:16px;font-size:30px;letter-spacing:.18em;font-weight:700;text-transform:uppercase}}
.hex{{width:46px;height:52px;background:{acc};clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)}}
.band{{font-size:28px;font-weight:700;letter-spacing:.14em;border:3px solid {fg};border-radius:60px;padding:12px 28px}}
h1{{position:absolute;left:86px;right:80px;top:200px;font-family:FR;font-weight:700;font-size:{128 if n!="3" else 118}px;line-height:.98;letter-spacing:-.02em}}
.sub{{position:absolute;left:90px;top:{470 if n!="1" else 470}px;font-size:36px;font-weight:600;opacity:.92}}
.ph{{position:absolute;left:50%;bottom:-20px;transform:translateX(-50%);width:1080px;height:1080px;background:url(cover/{img}) center/cover;-webkit-mask-image:radial-gradient(circle at 50% 50%,#000 62%,transparent 71%)}}
.chips{{position:absolute;left:0;right:0;bottom:60px;text-align:center}}
.chips span{{display:inline-block;background:{fg};color:{bg};font-size:27px;font-weight:700;padding:16px 34px;border-radius:60px}}
</style></head><body>
<div class="top"><div class="brand"><div class="hex"></div>Honigmama</div><div class="band">BAND {n}</div></div>
<h1>{t}</h1><div class="sub">{sub}</div><div class="ph"></div>
<div class="chips"><span>{chips}</span></div></body></html>'''
    open(f'coverB_{n}.html','w').write(html)
