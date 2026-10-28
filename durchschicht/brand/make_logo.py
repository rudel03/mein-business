"""DURCHSCHICHT Logo: Schicht-Uhr (24 h in drei Schichten) + Wortmarke als echte Pfade."""
import math
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

F = "fonts/barlow-condensed-latin-800-normal.woff2"
M = "fonts/jetbrains-mono-latin-500-normal.woff2"
NAVY, ORANGE, CHALK, STEEL = "#0E1A2B", "#FF5B1F", "#F3F0E8", "#8A97A8"
EARLY, LATE, NIGHT = "#F2C230", "#FF5B1F", "#3B6FE0"


def text_path(text, fontfile, size, x, y, tracking=0.0):
    f = TTFont(fontfile)
    gs, cmap, hmtx = f.getGlyphSet(), f.getBestCmap(), f["hmtx"]
    upm = f["head"].unitsPerEm
    s = size / upm
    pen = SVGPathPen(gs)
    cx = x
    for ch in text:
        g = cmap[ord(ch)]
        tp = TransformPen(pen, (s, 0, 0, -s, cx, y))
        gs[g].draw(tp)
        cx += hmtx[g][0] * s + tracking * size
    return pen.getCommands(), cx - x


def arc(cx, cy, r, a0, a1):
    """Tortenstück von a0 bis a1 (Grad, 0 = oben, im Uhrzeigersinn)."""
    def pt(a):
        rad = math.radians(a - 90)
        return cx + r * math.cos(rad), cy + r * math.sin(rad)
    x0, y0 = pt(a0); x1, y1 = pt(a1)
    large = 1 if (a1 - a0) % 360 > 180 else 0
    return f"M{cx:.2f},{cy:.2f} L{x0:.2f},{y0:.2f} A{r},{r} 0 {large} 1 {x1:.2f},{y1:.2f} Z"


def mark(cx, cy, r, bg):
    """24-h-Zifferblatt: Früh 6–14, Spät 14–22, Nacht 22–6. 1 h = 15°."""
    gap = 3
    s = []
    for a0, a1, col in ((6 * 15, 14 * 15, EARLY), (14 * 15, 22 * 15, LATE), (22 * 15, 30 * 15, NIGHT)):
        s.append(f'<path d="{arc(cx, cy, r, a0 + gap, a1 - gap)}" fill="{col}"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r*0.56:.2f}" fill="{bg}"/>')
    # Löffel als Zeiger auf 3 Uhr nachts (= 45°)
    ang = math.radians(3 * 15 - 90)
    hx, hy = cx + r * 0.42 * math.cos(ang), cy + r * 0.42 * math.sin(ang)
    s.append(f'<line x1="{cx}" y1="{cy}" x2="{hx:.2f}" y2="{hy:.2f}" stroke="{CHALK if bg==NAVY else NAVY}" stroke-width="{r*0.11:.2f}" stroke-linecap="round"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r*0.12:.2f}" fill="{CHALK if bg==NAVY else NAVY}"/>')
    return "".join(s)


def logo(bg, fg, sub, fname, with_bg=True, claim=True):
    W, H = 1200, 300
    word, wlen = text_path("DURCHSCHICHT", F, 150, 300, 172, tracking=0.01)
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">']
    if with_bg:
        out.append(f'<rect width="{W}" height="{H}" fill="{bg}"/>')
    out.append(mark(150, 150, 105, bg))
    out.append(f'<path d="{word}" fill="{fg}"/>')
    if claim:
        c, _ = text_path("ESSEN NACH DIENSTPLAN", M, 34, 304, 232, tracking=0.12)
        out.append(f'<path d="{c}" fill="{sub}"/>')
    out.append("</svg>")
    open(fname, "w").write("".join(out))
    return wlen


def icon(bg, fname, size=512):
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">',
           f'<rect width="{size}" height="{size}" rx="{size*0.18}" fill="{bg}"/>', mark(size/2, size/2, size*0.38, bg), "</svg>"]
    open(fname, "w").write("".join(out))


if __name__ == "__main__":
    print(logo(NAVY, CHALK, ORANGE, "logo_dunkel.svg"))
    logo(CHALK, NAVY, ORANGE, "logo_hell.svg")
    logo(NAVY, NAVY, ORANGE, "logo_transparent_dunkleschrift.svg", with_bg=False)
    logo(NAVY, CHALK, ORANGE, "logo_transparent_hellschrift.svg", with_bg=False)
    logo(NAVY, CHALK, ORANGE, "logo_ohne_claim_hellschrift.svg", with_bg=False, claim=False)
    icon(NAVY, "icon.svg")
