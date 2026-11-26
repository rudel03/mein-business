#!/usr/bin/env python3
"""Baut ein Faceless-Short (1080x1920) aus Bildern + Sprecherstimme + Untertiteln.

Aufruf:  python3 render.py video.json
video.json:
{
  "voice": "voice.mp3",                 # Sprecherstimme
  "images": ["1.png", ...],             # Szenenbilder (beliebige Groesse, werden 9:16 zugeschnitten)
  "scene_starts": [0, 1, 3, ...],       # pro Bild: ab welchem Satzteil es erscheint
  "phrases": ["Satzteil 1", ...],       # Sprechertext, getrennt an den Sprechpausen
  "title": "Wie verdient\\nCostco Geld?", # optional: Titel oben in den ersten Sekunden
  "out": "video.mp4"
}
Pfade sind relativ zur JSON-Datei. Untertitel-Timing: ffmpeg silencedetect findet die
Sprechpausen; passt die Zahl der Sprechabschnitte nicht zur Zahl der Satzteile, wird
proportional zur Zeichenzahl verteilt.
"""
import json, os, re, subprocess, sys

W, H, FPS = 1080, 1920, 30
FONT = "Inter Display Black"


def sh(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, check=True)


def duration(path):
    return float(sh(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                     "-of", "csv=p=0", path]).stdout.strip())


def speech_segments(voice, total):
    err = subprocess.run(["ffmpeg", "-hide_banner", "-i", voice, "-af",
                          "silencedetect=noise=-35dB:d=0.18", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    segs, cur = [], 0.0
    for s, e in zip(starts, ends):
        if s - cur > 0.15:
            segs.append((cur, s))
        cur = e
    if total - cur > 0.15:
        segs.append((cur, total))
    return segs


def phrase_times(phrases, segs, total):
    if len(segs) == len(phrases):
        return segs
    print(f"Hinweis: {len(segs)} Sprechabschnitte, {len(phrases)} Satzteile -> proportional", file=sys.stderr)
    lens = [len(p) for p in phrases]
    t, out = 0.0, []
    for n in lens:
        d = total * n / sum(lens)
        out.append((t, t + d))
        t += d
    return out


def ts(t):
    h, r = divmod(t, 3600)
    m, s = divmod(r, 60)
    return f"{int(h)}:{int(m):02d}:{s:05.2f}"


def build_ass(phrases, times, title, total, path):
    hdr = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Sub,{FONT},92,&H00FFFFFF,&H00FFFFFF,&H00000000,&H64000000,-1,0,0,0,100,100,0,0,1,7,3,5,80,80,0,1
Style: Title,{FONT},96,&H00101010,&H00FFFFFF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,3,24,0,8,80,80,220,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    ev = []
    if title:
        ev.append(f"Dialogue: 1,{ts(0)},{ts(min(3.0, total))},Title,,0,0,0,,{{\\3c&H00D8F0&\\fad(0,250)}}" + title.replace("\n", "\\N"))
    for phrase, (a, b) in zip(phrases, times):
        words = phrase.split()
        chunks = [words[i:i + 3] for i in range(0, len(words), 3)]
        # kurze Rest-Chunks an den vorherigen haengen
        if len(chunks) > 1 and len(chunks[-1]) == 1:
            chunks[-2] += chunks.pop()
        total_chars = sum(len(" ".join(c)) for c in chunks)
        t = a
        for c in chunks:
            d = (b - a) * len(" ".join(c)) / total_chars
            txt = " ".join(c).upper()
            # Zahlen gelb hervorheben
            txt = re.sub(r"(\d[\d.,]*)", r"{\\c&H00D8FF&}\1{\\c&HFFFFFF&}", txt)
            ev.append(f"Dialogue: 0,{ts(t)},{ts(t + d)},Sub,,0,0,0,,{{\\fscx92\\fscy92\\t(0,90,\\fscx100\\fscy100)}}{txt}")
            t += d
    with open(path, "w", encoding="utf-8") as f:
        f.write(hdr + "\n".join(ev) + "\n")


def main(cfg_path):
    base = os.path.dirname(os.path.abspath(cfg_path))
    cfg = json.load(open(cfg_path, encoding="utf-8"))
    p = lambda x: os.path.join(base, x)
    voice = p(cfg["voice"])
    total = duration(voice)
    segs = speech_segments(voice, total)
    times = phrase_times(cfg["phrases"], segs, total)

    # Szenengrenzen: Bild i beginnt am Start von Satzteil scene_starts[i] (erstes Bild bei 0)
    starts = [0.0] + [times[k][0] - 0.1 for k in cfg["scene_starts"][1:]]
    ends = starts[1:] + [total + 0.4]

    inputs, filters = [], []
    for i, (img, a, b) in enumerate(zip(cfg["images"], starts, ends)):
        d = b - a
        frames = max(1, round(d * FPS))
        inputs += ["-i", p(img)]
        zin = i % 2 == 0  # abwechselnd rein-/rauszoomen
        z = f"1+0.12*on/{frames}" if zin else f"1.12-0.12*on/{frames}"
        filters.append(
            f"[{i}:v]scale={int(W*1.25)}:{int(H*1.25)}:force_original_aspect_ratio=increase,crop={int(W*1.25)}:{int(H*1.25)},"
            f"zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={frames}:s={W}x{H}:fps={FPS},"
            f"setsar=1,format=yuv420p[v{i}]")
    n = len(cfg["images"])
    ass = p("untertitel.ass")
    build_ass(cfg["phrases"], times, cfg.get("title"), total, ass)
    filters.append("".join(f"[v{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=0[vc]")
    filters.append(f"[vc]ass='{ass}'[vout]")
    filters.append(f"[{n}:a]loudnorm=I=-14:TP=-1.5:LRA=11,apad=pad_dur=0.4[aout]")
    out = p(cfg.get("out", "video.mp4"))
    cmd = ["ffmpeg", "-y", "-v", "error", *inputs, "-i", voice,
           "-filter_complex", ";".join(filters), "-map", "[vout]", "-map", "[aout]",
           "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-r", str(FPS),
           "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest",
           "-movflags", "+faststart", out]
    subprocess.run(cmd, check=True)
    print(f"fertig: {out} ({duration(out):.1f} s)")


if __name__ == "__main__":
    main(sys.argv[1])
