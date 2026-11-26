#!/usr/bin/env bash
# Einrichtung für eine frische Sitzung (Container): Piper-Stimmen, faster-whisper, three.js.
set -e
cd "$(dirname "$0")/.."
pip install -q piper-tts faster-whisper
mkdir -p /root/piper
H=https://huggingface.co/rhasspy/piper-voices/resolve/main/de/de_DE
for v in thorsten/high/de_DE-thorsten-high thorsten_emotional/medium/de_DE-thorsten_emotional-medium; do
  n=$(basename $v); [ -f /root/piper/$n.onnx ] || { curl -sfL -o /root/piper/$n.onnx $H/$v.onnx; curl -sfL -o /root/piper/$n.onnx.json $H/$v.onnx.json; }
done
(cd engine && npm ci --silent 2>/dev/null || npm i --silent)
python3 -c "from faster_whisper import WhisperModel; WhisperModel('small', device='cpu', compute_type='int8')"
echo "Einrichtung fertig. Video bauen: python3 -I pipeline/make_video.py skripte/<ordner>/video.json"
