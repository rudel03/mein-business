#!/usr/bin/env python3
"""Komplettes Faceless-Short ohne Higgsfield: Text -> Piper-Stimme -> 3D-Szenen (Three.js) -> Ein-Wort-Untertitel.

Aufruf:  python3 -I make_video.py video.json
{
  "scene": "costco",                      # engine/scenes/<scene>.js
  "voice": {"model": "de_DE-thorsten-high", "speed": 0.8, "tempo": 1.0},  # Piper length_scale / atempo für fertige Dateien
  # pro Beat optional: "audio": "datei.mp3" (fertige Stimme) oder "say": "Text für die Stimme" (Zahlen ausgeschrieben)
  "beats": [                               # eine Sprecherzeile pro Einstellung
    {"shot": "approach", "text": "Stell dir vor ...",
     "labels": [{"word": "Eintritt", "text": "EINTRITT?!", "dur": 2.0, "color": "red", "x": 540, "y": 560}]}
  ],
  "highlight": ["Costco", "Milliarden"],
  "source": "Zahlen: Costco, Geschäftsjahr 2026", "source_beats": [5, 6],
  "out": "final.mp4"
}
Voraussetzungen: piper-tts + Stimmen in /root/piper, faster-whisper, Node + Playwright (global), three in engine/node_modules.
"""
import json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from render_blocks import word_times, ts, esc, norm, dur, COLORS, FONT, W, H  # noqa: E402

ENGINE = os.path.join(os.path.dirname(HERE), "engine")
PIPER_DIR = os.environ.get("PIPER_VOICES", "/root/piper")
GAP = 0.06  # Pause zwischen Zeilen (s)


def tts(text, model, speed, out):
    subprocess.run(["piper", "-m", os.path.join(PIPER_DIR, model + ".onnx"), "--length-scale", str(speed),
                    "--sentence-silence", "0.12", "-f", out], input=text, text=True, check=True, capture_output=True)
    # Stille am Anfang/Ende abschneiden, damit das Tempo hoch bleibt
    trimmed = out.replace(".wav", "_t.wav")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", out, "-af",
                    "silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
                    "silenceremove=start_periods=1:start_threshold=-45dB,areverse", trimmed], check=True)
    os.replace(trimmed, out)


def main(cfg_path):
    base = os.path.dirname(os.path.abspath(cfg_path))
    P = lambda x: os.path.join(base, x)
    cfg = json.load(open(cfg_path, encoding="utf-8"))
    tmp = P("_tmp"); os.makedirs(tmp, exist_ok=True)
    v = cfg.get("voice", {})
    model, speed = v.get("model", "de_DE-thorsten-high"), v.get("speed", 0.8)

    # 1) Stimme pro Zeile
    beats, t = [], 0.0
    for i, b in enumerate(cfg["beats"], 1):
        wav = os.path.join(tmp, f"beat{i}.wav")
        if b.get("audio"):  # fertige Sprachdatei (z. B. ElevenLabs über Higgsfield)
            src = b["audio"] if os.path.isabs(b["audio"]) else P(b["audio"])
            tempo = v.get("tempo", 1.0)
            semis = v.get("pitch", 0)  # Halbtöne, negativ = tiefer (Formanten bleiben erhalten -> klingt natürlich)
            fx = (f"rubberband=tempo={tempo}:pitch={2 ** (semis / 12):.4f}:formant=preserved:pitchq=quality"
                  if semis else f"atempo={tempo}")
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", src, "-af",
                            f"{fx},silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
                            "silenceremove=start_periods=1:start_threshold=-45dB,areverse", "-ar", "44100", wav], check=True)
        else:
            tts(b.get("say", b["text"]), model, speed, wav)
        d = dur(wav) + GAP
        beats.append({**b, "wav": wav, "start": t, "dur": d})
        t += d
    total = t + 0.4
    beats[-1]["dur"] += 0.4
    print(f"Sprecher: {total:.1f} s, {len(beats)} Zeilen")

    # 2) 3D-Aufnahme
    shots = []
    for b in beats:  # "shot" darf auch eine Liste sein -> Zeile wird gleichmäßig auf mehrere Einstellungen verteilt
        names = b["shot"] if isinstance(b["shot"], list) else [b["shot"]]
        for k, n in enumerate(names):
            shots.append({"name": n, "start": b["start"] + b["dur"] * k / len(names), "dur": b["dur"] / len(names)})
    plan = {"scene": cfg["scene"], "W": W, "H": H, "fps": 30, "shots": shots}
    plan_path = os.path.join(tmp, "plan.json"); json.dump(plan, open(plan_path, "w"))
    silent = os.path.join(tmp, "silent.mp4")
    env = {**os.environ, "NODE_PATH": subprocess.check_output(["npm", "root", "-g"], text=True).strip()}
    subprocess.run(["node", os.path.join(ENGINE, "render3d.mjs"), plan_path, silent], check=True, env=env)

    # 3) Tonspur
    narr = os.path.join(tmp, "narration.wav")
    lst = os.path.join(tmp, "list.txt")
    with open(lst, "w") as f:
        for b in beats:
            padded = b["wav"].replace(".wav", "_p.wav")
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", b["wav"], "-af", f"apad,atrim=0:{b['dur']:.3f}",
                            "-ar", "48000", "-ac", "2", padded], check=True)
            f.write(f"file '{padded}'\n")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lst, narr], check=True)

    # 4) Untertitel (1 Wort) + Etiketten
    from faster_whisper import WhisperModel
    wm = WhisperModel("small", device="cpu", compute_type="int8")
    hl = {norm(w) for w in cfg.get("highlight", [])}
    ev = []
    for bi, b in enumerate(beats, 1):
        words = b["text"].split()
        times = word_times(wm, b["wav"], b["text"])
        for i, (w, (s, e)) in enumerate(zip(words, times)):
            st = b["start"] + s
            en = b["start"] + (times[i + 1][0] if i + 1 < len(times) else e + 0.15)
            en = min(en, st + 1.0)
            disp = esc(re.sub(r"[,.:;]+$", "", w).upper())
            col = "&H0000D8FF&" if norm(w) in hl or re.search(r"\d", w) else "&H00FFFFFF&"
            sc = min(100, int(100 * 12 / max(12, len(disp))))  # lange Wörter verkleinern
            ev.append(f"Dialogue: 0,{ts(st)},{ts(en)},Word,,0,0,0,,{{\\c{col}\\fscx{int(sc*0.8)}\\fscy{int(sc*0.8)}\\t(0,80,\\fscx{sc}\\fscy{sc})}}{disp}")
        for lab in b.get("labels", []):
            idx = next((i for i, w in enumerate(words) if norm(w) == norm(lab["word"])), 0)
            s0 = b["start"] + times[idx][0]
            boxc, txtc = COLORS.get(lab.get("color", "yellow"), COLORS["yellow"])
            ev.append(f"Dialogue: 1,{ts(s0)},{ts(s0 + lab.get('dur', 2.0))},Pill,,0,0,0,,"
                      f"{{\\pos({lab.get('x', W // 2)},{lab.get('y', 560)})\\3c{boxc}\\c{txtc}\\fscx60\\fscy60\\t(0,120,\\fscx100\\fscy100)}}{esc(lab['text'])}")
        if cfg.get("source") and bi in cfg.get("source_beats", []):
            ev.append(f"Dialogue: 2,{ts(b['start'])},{ts(b['start'] + b['dur'])},Src,,0,0,0,,{esc(cfg['source'])}")
    ass = os.path.join(tmp, "subs.ass")
    with open(ass, "w", encoding="utf-8") as f:
        f.write(f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Word,{FONT},120,&H00FFFFFF,&H00FFFFFF,&H00000000,&H96000000,-1,0,0,0,100,100,1,0,1,9,4,5,40,40,0,1
Style: Pill,{FONT},54,&H00101010,&H00FFFFFF,&H0000D8FF,&H00000000,-1,0,0,0,100,100,1,0,3,16,0,5,40,40,0,1
Style: Src,Inter Display SemiBold,30,&H00FFFFFF,&H00FFFFFF,&H00000000,&H78000000,0,0,0,0,100,100,0,0,1,2,1,2,40,40,70,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
""" + "\n".join(ev) + "\n")

    # 5) Zusammensetzen
    out = P(cfg.get("out", "final.mp4"))
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", silent, "-i", narr, "-filter_complex",
                    f"[0:v]ass='{ass}'[v];[1:a]loudnorm=I=-14:TP=-1.5:LRA=11[a]", "-map", "[v]", "-map", "[a]",
                    "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-c:a", "aac", "-b:a", "192k",
                    "-shortest", "-movflags", "+faststart", out], check=True)
    print(f"fertig: {out} ({dur(out):.1f} s)")


if __name__ == "__main__":
    main(sys.argv[1])
