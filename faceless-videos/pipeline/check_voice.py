"""Aussprache-Check: jede Sprachzeile per Whisper (Deutsch) gegenlesen.
Aufruf: python3 -I check_voice.py skripte/<nr>-<thema>/video.json
Markiert Zeilen mit falsch erkannten Wörtern oder niedriger Sicherheit (oft = Akzent/komische Betonung) → neu sprechen lassen."""
import json, os, re, subprocess, sys, difflib
import numpy as np
from faster_whisper import WhisperModel

def norm(w): return re.sub(r"[^a-zäöüß0-9]", "", w.lower())
def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "s16le", "-ac", "1", "-ar", "16000", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

cfg_path = sys.argv[1]; base = os.path.dirname(os.path.abspath(cfg_path)); cfg = json.load(open(cfg_path))
wm = WhisperModel("small", device="cpu", compute_type="int8")
bad = []
for i, b in enumerate(cfg["beats"], 1):
    segs, _ = wm.transcribe(load(os.path.join(base, b["audio"])), language="de", word_timestamps=True, initial_prompt=b["text"][:0])
    segs = list(segs); heard = " ".join(s.text for s in segs).strip()
    ws = [w for s in segs for w in s.words]
    exp = [norm(w) for w in re.sub(r"(\d)\.(\d)", r"\1\2", b["text"]).split() if norm(w)]
    got = [norm(w.word) for w in ws if norm(w.word)]
    ratio = difflib.SequenceMatcher(None, exp, got).ratio()
    low = [w.word.strip() for w in ws if w.probability < 0.45]
    flag = ratio < 0.8 or len(low) >= 2
    if flag: bad.append(i)
    print(f"{'⚠' if flag else '✓'} {i:02d} match {ratio:.2f} unsicher {low}\n   soll: {b['text']}\n   hört: {heard}")
print("NEU SPRECHEN:", bad or "keine")
