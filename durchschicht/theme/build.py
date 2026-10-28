"""Baut Theme-Dateien (Liquid) und eine lokale Vorschau aus src/."""
import re, json, shutil
home = open('src/ds-home.html').read()
rech = open('../web/dsr-body.html').read().replace('<section class="dsr"', '<section class="dsr" id="rechner-tool"')
home = home.replace('<div id="rechner">RECHNER</div>', '<div id="rechner">' + rech + '</div>')
FONTS = [("Barlow Condensed", 600, "barlow-condensed-latin-600-normal"), ("Barlow Condensed", 700, "barlow-condensed-latin-700-normal"), ("Barlow Condensed", 800, "barlow-condensed-latin-800-normal"),
         ("Inter", 400, "inter-latin-400-normal"), ("Inter", 600, "inter-latin-600-normal"), ("Inter", 700, "inter-latin-700-normal"),
         ("JetBrains Mono", 500, "jetbrains-mono-latin-500-normal"), ("JetBrains Mono", 700, "jetbrains-mono-latin-700-normal")]
def face(url):
    return "".join('@font-face{font-family:"%s";font-weight:%d;font-style:normal;font-display:swap;src:url(%s) format("woff2")}' % (f, w, url(n)) for f, w, n in FONTS)
fonts = "<style>" + face(lambda n: "{{ '%s.woff2' | asset_url }}" % n) + "</style>"
fonts_prev = "<style>" + face(lambda n: "assets/%s.woff2" % n) + "</style>"
recipes = json.load(open('../web/recipes.json'))
js = open('../web/ds-rechner.js').read().replace('__RECIPES__', json.dumps(recipes, ensure_ascii=False, separators=(',', ':')))
open('assets/ds-rechner.js', 'w').write(js)
shutil.copy('../web/ds-rechner.css', 'assets/ds-rechner.css')
shutil.copy('src/ds-home.css', 'assets/ds-home.css')

liq = re.sub(r'ASSET\(([^)]+)\)', r"{{ '\1' | asset_url }}", home)
schema = {"name": "DS Startseite", "tag": "section", "class": "ds-section", "settings": [], "presets": [{"name": "DS Startseite"}]}
open('sections/ds-home.liquid', 'w').write(
    fonts + "\n{{ 'ds-home.css' | asset_url | stylesheet_tag }}\n{{ 'ds-rechner.css' | asset_url | stylesheet_tag }}\n"
    + liq + "\n<script src=\"{{ 'ds-rechner.js' | asset_url }}\" defer></script>\n{% schema %}\n" + json.dumps(schema, ensure_ascii=False, indent=1) + "\n{% endschema %}\n")

prev = re.sub(r'ASSET\(([^)]+)\)', r'assets/\1', home)
open('preview.html', 'w').write('<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DURCHSCHICHT</title>' + fonts_prev
    + '<link rel="stylesheet" href="assets/ds-home.css"><link rel="stylesheet" href="assets/ds-rechner.css"><body style="margin:0;background:#0E1A2B">' + prev + '<script src="assets/ds-rechner.js"></script>')
print('ok')

prod = open('src/ds-product.liquid').read()
pschema = {"name": "DS Produkt", "tag": "section", "class": "ds-section", "settings": []}
open('sections/ds-product.liquid', 'w').write(fonts + "\n{{ 'ds-home.css' | asset_url | stylesheet_tag }}\n" + prod + "\n{% schema %}\n" + json.dumps(pschema, ensure_ascii=False, indent=1) + "\n{% endschema %}\n")
json.dump({"sections": {"main": {"type": "ds-home", "settings": {}}}, "order": ["main"]}, open('templates/index.json', 'w'), indent=1)
json.dump({"sections": {"main": {"type": "ds-product", "settings": {}}}, "order": ["main"]}, open('templates/product.json', 'w'), indent=1)
print('product ok')
