import json
src = json.load(open('_neu_005_008.json'))
L = lambda w, t, c='yellow', d=2.4, **k: {"word": w, "text": t, "dur": d, "color": c, **k}
labels = {
 "005-umzug": {
  "hook": [L("Kartons", "KARTONS VON A NACH B", "white", 1.8)],
  "intro": [L("Umzugsunternehmen.", "UMZUGSUNTERNEHMEN", 'yellow', 2.0)],
  "price": [L("830", "3 ZIMMER ≈ 830–2.100 €", 'yellow', 3.0)],
  "hourly": [L("42", "≈ 42 € PRO MANN & STUNDE", 'yellow', 2.6)],
  "wage": [L("13,90", "MINDESTLOHN 2026: 13,90 €", 'white', 2.6, y=420), L("Gewinn.", "GEWINN", 'green', 1.6)],
  "halteverbot": [L("Halteverbotszone", "HALTEVERBOT: 80–200 €", 'red', 2.6)],
  "stairs": [L("extra.", "ALLES EXTRA", 'red', 1.6)],
  "storage": [L("Lagerräume.", "LAGER = JEDEN MONAT GELD", 'green', 2.6)],
  "tip": [L("Besichtigung.", "IMMER BESICHTIGUNG + FESTPREIS", 'green', 2.6)],
  "tax": [L("20", "§ 35a EStG: 20 % ABSETZBAR", 'white', 2.6)],
  "twist1": [],
  "twist2": [L("Mond.", "NEUE ADRESSE: MOND", 'yellow', 2.0), L("Halteverbotszone", "+ 200 € HALTEVERBOT", 'red', 2.0)],
 },
 "006-callcenter": {
  "hook": [],
  "intro": [L("Callcenter.", "CALLCENTER", 'yellow', 2.0)],
  "outsource": [L("Minute,", "PRO MINUTE · PRO ANRUF · PRO STUNDE", 'white', 3.0)],
  "perMinute": [L("50", "0,50–1,20 € PRO MINUTE", 'yellow', 2.8)],
  "perHour": [L("25", "25–45 € PRO STUNDE", 'yellow', 2.6)],
  "wage": [L("13,90", "MINDESTLOHN: 13,90 €", 'white', 2.6, y=420), L("Gewinn.", "GEWINN", 'green', 1.6)],
  "mass": [L("Masse.", "MASSE", 'yellow', 1.8)],
  "commission": [L("Provision", "PROVISION PRO ABSCHLUSS", 'green', 2.4)],
  "tip": [L("verboten.", "§ 7 UWG: OHNE EINWILLIGUNG VERBOTEN", 'red', 2.6), L("300.000", "BUSSGELD BIS 300.000 €", 'white', 2.2)],
  "twist1": [],
  "twist2": [L("4.000", "4.000 VERTRÄGE", 'yellow', 2.0), L("Jahres.", "CALLCENTER DES JAHRES", 'green', 2.0)],
 },
 "007-folierer": {
  "hook": [L("Lack.", "0 % LACK", 'white', 1.8)],
  "intro": [L("Folierer.", "FOLIERER", 'yellow', 2.0)],
  "price": [L("2.000", "VOLLFOLIERUNG: 2.000–5.000 €", 'yellow', 3.0)],
  "foil": [L("20", "FOLIE: 20–50 € / m²", 'yellow', 2.6)],
  "work": [L("Zwei", "2–5 TAGE ARBEIT", 'white', 2.4)],
  "fleet": [L("Firmenkunden.", "FIRMENKUNDEN", 'green', 2.4)],
  "extras": [L("Extras:", "EXTRAS = EXTRA GELD", 'green', 2.4)],
  "protect": [L("Steinschlag", "LACKSCHUTZ", 'green', 2.0)],
  "tip": [L("1.500", "UNTER 1.500 € = OFT BILLIGFOLIE", 'red', 2.8)],
  "twist1": [],
  "twist2": [L("Mond.", "DER MOND. IN CHROM.", 'yellow', 2.2), L("NASA.", "RECHNUNG: NASA", 'red', 1.8)],
 },
 "008-schluesseldienst": {
  "hook": [L("100", "> 100 €", 'red', 2.0)],
  "intro": [L("Schlüsseldienst.", "SCHLÜSSELDIENST", 'yellow', 2.0)],
  "click": [L("Minuten", "OFT IN MINUTEN OFFEN", 'white', 2.2)],
  "price": [L("100", "TAGS ≈ 100 €", 'yellow', 2.4, x=330, y=1480), L("180.", "NACHTS ≈ 180 €", 'white', 2.4, x=760, y=1400)],
  "night": [L("drei", "03:00 UHR", 'white', 2.0)],
  "middleman": [L("Vermittler-Callcenter.", "VERMITTLER", 'red', 2.4)],
  "tip": [L("Festpreis", "FESTPREIS INKL. ANFAHRT", 'green', 2.6)],
  "court": [L("112", "≈ 112 € (AG LINGEN)", 'white', 2.4)],
  "twist1": [],
  "twist2": [L("Australien.", "AUSTRALIEN", 'yellow', 2.0), L("Rechnung", "300 × TÜRÖFFNUNG", 'red', 2.0)],
 },
}
scene = {"005-umzug": "umzug", "006-callcenter": "callcenter", "007-folierer": "folierer", "008-schluesseldienst": "schluesseldienst"}
srcs = {
 "005-umzug": "Quellen: Trustlocal · AMÖ via Meister-Job · Aroundhome · Verbraucherzentrale · § 35a EStG",
 "006-callcenter": "Quellen: yoummday (Marktspannen 2026) · MiLoG · § 7, § 20 UWG",
 "007-folierer": "Quellen: motor.com.de · ADAC · web.de · fairgarage · AutoScout24",
 "008-schluesseldienst": "Quellen: Verbraucherzentrale Hamburg/NRW/Niedersachsen · AG Lingen",
}
hl = ["Trick:", "Pro-Tipp:", "absurd.", "Gewinn.", "Mond.", "NASA.", "Australien.", "Chrom.", "doppelt.", "Masse.", "verdammt", "Provision", "Festpreis", "verboten.", "Mindestlohn", "extra."]
for k, lines in src.items():
    beats = []
    for i, (shot, text, say) in enumerate(lines, 1):
        b = {"shot": shot, "audio": f"audio/{i:02d}.mp3", "text": text}
        if labels[k].get(shot): b["labels"] = labels[k][shot]
        beats.append(b)
    n = len(beats)
    cfg = {"scene": scene[k], "voice": {"tempo": 1.2, "pitch": -2}, "beats": beats, "highlight": hl,
           "source": srcs[k], "source_beats": list(range(3, n - 1)), "out": f"../../ausgabe/{k}.mp4"}
    json.dump(cfg, open(f"{k}/video.json", "w"), ensure_ascii=False, indent=1)
    print(k, n, "Zeilen")
