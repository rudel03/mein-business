#!/usr/bin/env python3
"""Faceless-Short im Referenz-Stil: 10-s-Videoblöcke + eine Sprecherzeile pro Block
+ Ein-Wort-Untertitel (Whisper-Timing) + Etiketten ("Pills") + Quelle.

Aufruf:  python3 -I render_blocks.py video.json
{
  "blocks": [
    {"video": "b1.mp4", "voice": "l1.mp3",
     "text": "Stell dir vor, du musst Eintritt zahlen ...",          # Anzeige-Text (Untertitel)
     "labels": [{"word": "Eintritt", "text": "EINTRITT?!", "dur": 2.2, "color": "red"}]}
  ],
  "highlight": ["Costco", "Milliarden"],   # Wörter gelb
  "source": "Quelle: Costco, Geschäftsjahr 2025",  # klein unten, optional
  "source_blocks": [3],                     # in welchen Blöcken (1-basiert), optional = alle
  "out": "final.mp4"
}
Benötigt: ffmpeg, faster-whisper (Modell "small"), Schrift "Inter Display Black".
"""
import difflib, json, os, re, subprocess, sys
import numpy as np

W, H, FPS = 1080, 1920, 30
FONT = "Inter Display Black"
COLORS = {  # ASS: &HBBGGRR
    "yellow": ("&H0000D8FF", "&H00101010"),  # Box, Text
    "red": ("&H002A2AE0", "&H00FFFFFF"),
    "white": ("&H00FFFFFF", "&H00101010"),
    "dark": ("&H00202020", "&H00FFFFFF"),
    "green": ("&H0071CC2E", "&H00FFFFFF"),
}


def run(cmd, **kw):
    return subprocess.run(cmd, check=True, capture_output=True, text=True, **kw)


def dur(p):
    return float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p]).stdout)


def load16k(p):
    raw = subprocess.check_output(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", "16000", "-f", "f32le", "-"])
    return np.frombuffer(raw, np.float32)


def norm(w):
    return re.sub(r"[^\wäöüß]", "", w.lower())


def word_times(model, voice, text):
    """Zeiten pro Anzeige-Wort: Whisper-Wörter per difflib auf den Skripttext abbilden."""
    PAD = 0.5  # stiller Vorlauf, damit Whisper das erste Wort nicht überhört
    audio = np.concatenate([np.zeros(int(16000 * PAD), np.float32), load16k(voice)])
    segs, _ = model.transcribe(audio, language="de", word_timestamps=True)
    ww = [(w.word.strip(), max(0.0, w.start - PAD), max(0.0, w.end - PAD)) for s in segs for w in s.words]
    disp = text.split()
    a, b = [norm(x) for x in disp], [norm(x[0]) for x in ww]
    times = [None] * len(disp)
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        # gleich lange Abweichungen (z. B. „Digga“ vs. „Digger“) 1:1 übernehmen
        if tag == "equal" or (tag == "replace" and i2 - i1 == j2 - j1):
            for k in range(i2 - i1):
                times[i1 + k] = (ww[j1 + k][1], ww[j1 + k][2])
    # Lücken linear auffüllen
    total = dur(voice)
    known = [(i, t) for i, t in enumerate(times) if t]
    if not known:
        step = total / len(disp)
        return [(i * step, (i + 1) * step) for i in range(len(disp))]
    for i in range(len(disp)):
        if times[i]:
            continue
        prev = max([k for k in known if k[0] < i], default=(-1, (0.0, 0.0)), key=lambda k: k[0])
        nxt = min([k for k in known if k[0] > i], default=(len(disp), (total, total)), key=lambda k: k[0])
        span = nxt[0] - prev[0]
        t0, t1 = prev[1][1], nxt[1][0]
        s = t0 + (t1 - t0) * (i - prev[0]) / span
        e = t0 + (t1 - t0) * (i - prev[0] + 1) / span
        times[i] = (s, e)
    return times


def ts(t):
    t = max(0.0, t)
    h, r = divmod(t, 3600)
    m, s = divmod(r, 60)
    return f"{int(h)}:{int(m):02d}:{s:05.2f}"


def esc(t):
    return t.replace("{", "(").replace("}", ")")


def main(cfg_path):
    base = os.path.dirname(os.path.abspath(cfg_path))
    P = lambda x: os.path.join(base, x)
    cfg = json.load(open(cfg_path, encoding="utf-8"))
    from faster_whisper import WhisperModel
    model = WhisperModel("small", device="cpu", compute_type="int8")
    hl = {norm(w) for w in cfg.get("highlight", [])}

    events, t_block, audio_parts = [], 0.0, []
    tmp = P("_tmp")
    os.makedirs(tmp, exist_ok=True)
    vids = []
    for bi, b in enumerate(cfg["blocks"], 1):
        raw = dur(P(b["video"]))
        adur = dur(P(b["voice"]))
        # Ist die Stimme länger als der Clip, wird der CLIP verlangsamt (max. 20 %), nie die Stimme.
        speed = max(1.0, (adur + 0.35) / raw)
        if speed > 1.2:
            print(f"WARNUNG Block {bi}: Sprecher {adur:.1f}s viel länger als Clip {raw:.1f}s -> Text kürzen", file=sys.stderr)
            speed = 1.2
        vdur = raw * speed
        off = max(0.15, min(0.5, (vdur - adur) / 2))
        # Audio des Blocks: Stille + Stimme, auf Blocklänge gepolstert
        ab = os.path.join(tmp, f"a{bi}.wav")
        run(["ffmpeg", "-y", "-v", "error", "-i", P(b["voice"]), "-af",
             f"adelay={int(off*1000)}:all=1,apad,atrim=0:{vdur:.3f}", "-ar", "48000", "-ac", "2", ab])
        audio_parts.append(ab)
        vids.append((P(b["video"]), vdur, speed))

        words = b["text"].split()
        times = word_times(model, P(b["voice"]), b["text"])
        for i, (w, (s, e)) in enumerate(zip(words, times)):
            start = t_block + off + s
            end = t_block + off + (times[i + 1][0] if i + 1 < len(times) else e + 0.25)
            end = min(end, start + 1.2)
            disp = esc(re.sub(r"[,.:;]+$", "", w).upper())
            col = "&H0000D8FF&" if norm(w) in hl or re.search(r"\d", w) else "&H00FFFFFF&"
            events.append(f"Dialogue: 0,{ts(start)},{ts(end)},Word,,0,0,0,,"
                          f"{{\\c{col}\\fscx80\\fscy80\\t(0,80,\\fscx100\\fscy100)}}{disp}")
        for lab in b.get("labels", []):
            idx = next((i for i, w in enumerate(words) if norm(w) == norm(lab["word"])), 0)
            s = t_block + off + times[idx][0]
            box, txtc = COLORS.get(lab.get("color", "yellow"), COLORS["yellow"])
            y = lab.get("y", 560)
            events.append(f"Dialogue: 1,{ts(s)},{ts(s + lab.get('dur', 2.0))},Pill,,0,0,0,,"
                          f"{{\\pos({W//2},{y})\\3c{box}\\c{txtc}\\fscx60\\fscy60\\t(0,120,\\fscx100\\fscy100)}}{esc(lab['text'])}")
        if cfg.get("source") and bi in cfg.get("source_blocks", range(1, 999)):
            events.append(f"Dialogue: 2,{ts(t_block)},{ts(t_block + vdur)},Src,,0,0,0,,{esc(cfg['source'])}")
        t_block += vdur

    ass = os.path.join(tmp, "subs.ass")
    with open(ass, "w", encoding="utf-8") as f:
        f.write(f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Word,{FONT},118,&H00FFFFFF,&H00FFFFFF,&H00000000,&H96000000,-1,0,0,0,100,100,1,0,1,9,4,5,40,40,0,1
Style: Pill,{FONT},54,&H00101010,&H00FFFFFF,&H0000D8FF,&H00000000,-1,0,0,0,100,100,1,0,3,16,0,5,40,40,0,1
Style: Src,Inter Display SemiBold,30,&H00FFFFFF,&H00FFFFFF,&H00000000,&H78000000,0,0,0,0,100,100,0,0,1,2,1,2,40,40,70,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
""" + "\n".join(events) + "\n")

    # Video: alle Blöcke auf 1080x1920/30fps, aneinander, Untertitel einbrennen; Audio: Blöcke aneinander
    inputs, fl = [], []
    for i, (v, d, sp) in enumerate(vids):
        inputs += ["-i", v]
        fl.append(f"[{i}:v]setpts={sp:.4f}*(PTS-STARTPTS),scale={W}:{H}:force_original_aspect_ratio=increase,"
                  f"crop={W}:{H},fps={FPS},trim=0:{d:.3f},setpts=PTS-STARTPTS,setsar=1,format=yuv420p[v{i}]")
    n = len(vids)
    for j, a in enumerate(audio_parts):
        inputs += ["-i", a]
    fl.append("".join(f"[v{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=0[vc]")
    fl.append(f"[vc]ass='{ass}'[vout]")
    fl.append("".join(f"[{n+j}:a]" for j in range(n)) + f"concat=n={n}:v=0:a=1,loudnorm=I=-14:TP=-1.5:LRA=11[aout]")
    out = P(cfg.get("out", "final.mp4"))
    subprocess.run(["ffmpeg", "-y", "-v", "error", *inputs, "-filter_complex", ";".join(fl),
                    "-map", "[vout]", "-map", "[aout]", "-c:v", "libx264", "-preset", "veryfast", "-crf", "19",
                    "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", out], check=True)
    print(f"fertig: {out} ({dur(out):.1f} s)")


if __name__ == "__main__":
    main(sys.argv[1])
