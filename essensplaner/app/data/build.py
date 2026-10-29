#!/usr/bin/env python3
"""Prüft alle Rezepte und baut die Datendatei für die App.

Aufruf:  python3 build.py            -> prüft + schreibt ../public/data/daten.json
         python3 build.py --check X  -> prüft nur die Datei rezepte/X.json (für Rezept-Autoren)

Nährwerte: BLS 4.0 (Max Rubner-Institut 2025, CC BY 4.0). Gewürze ("-") zählen mit 0.
"""
import csv, json, glob, os, sys

HIER = os.path.dirname(os.path.abspath(__file__))
GERAETE = {"herd", "herd2", "topf", "pfanne", "ofen", "airfryer", "mikrowelle", "wasserkocher",
           "puerierstab", "toaster", "sandwichmaker", "omnia", "grill"}
# Essbarer Anteil bei Zutaten, die mit Knochen gewogen werden (BLS-Werte gelten für den essbaren Teil)
ESSBAR = {"haehnchen_unterschenkel": 0.7}
MAHLZEITEN = {"fruehstueck", "mittag", "abend", "snack"}
AUFWAERMEN = {"mikrowelle", "topf", "pfanne", "wasserkocher", "nein", "thermo"}
# Zutaten, bei denen gegarte Gerichte höchstens 1 Tag im Kühlschrank bleiben (BfR/BZfE)
KURZ = {"reis", "parboiled", "couscous", "bulgur", "quinoa", "nudeln", "vollkornnudeln", "gnocchi",
        "rinderhack", "gemischtes_hack", "lachs", "tk_seelachs", "tk_fischstaebchen", "eier",
        "thunfisch", "makrele_dose", "sardinen_dose", "hering_tomate", "lachs_geraeuchert"}
# Rohe Komponenten: kalt gegessene Gerichte damit höchstens 1 Tag im Kühlschrank (BfR-FAQ, Regel L3)
ROH = {"gurke", "eisberg", "rucola", "spinat_frisch", "tomate", "cherrytomate", "paprika", "fruehlingszwiebel",
       "petersilie", "schnittlauch", "avocado", "zucchini", "champignon", "moehre", "weisskohl"}
NAEHR = ["enercc", "prot625", "fat", "cho", "fibt", "sugar", "nacl"]


def zahl(x):
    """BLS-Wert als Zahl; leer oder "<LOD" (unter Nachweisgrenze) zählt als 0."""
    try:
        return float(x)
    except (TypeError, ValueError):
        return 0.0


def lade_zutaten():
    ns = {}
    exec(open(os.path.join(HIER, "zutaten.py"), encoding="utf-8").read(), ns)
    bls = {r["code"]: r for r in csv.DictReader(open(os.path.join(HIER, "bls_kompakt.csv"), encoding="utf-8"))}
    out = {}
    for (zid, name, code, abt, pack, einheit, preis, stk_g, al, flags, lager) in ns["ZUTATEN"]:
        n = {k: 0.0 for k in NAEHR}
        if code != "-":
            r = bls[code]
            n = {k: zahl(r[k]) * ESSBAR.get(zid, 1) for k in NAEHR}
        out[zid] = dict(id=zid, name=name, bls=code, abt=abt, pack=pack, einheit=einheit, preis=preis,
                        stk_g=stk_g, al=al.split(), flags=flags.split(), lager=lager,
                        n100={"kcal": n["enercc"], "p": n["prot625"], "f": n["fat"], "kh": n["cho"],
                              "bst": n["fibt"], "zucker": n["sugar"], "salz": n["nacl"]})
    return out


def gramm(z, menge, einheit):
    """Menge einer Rezeptzeile in Gramm (bzw. ml ~ g)."""
    if einheit == "stk":
        if z["einheit"] == "stk" or z["stk_g"]:
            g = z["stk_g"] or 0
            if not g:
                raise ValueError(f"{z['id']}: keine Grammzahl je Stück")
            return menge * g
        raise ValueError(f"{z['id']}: Stückangabe nicht möglich")
    if z["einheit"] == "stk":
        return menge  # Grammangabe bei Stückware (z. B. 120 g Eier) ist erlaubt
    return menge


def pruefe(rezepte, Z, datei=""):
    fehler, ids = [], set()
    for r in rezepte:
        rid = r.get("id", "?")
        def f(msg):
            fehler.append(f"{datei}:{rid}: {msg}")
        for key in ["id", "titel", "mahlzeit", "portionen", "zutaten", "wege", "lager", "mealprep", "tags", "tipp", "foto"]:
            if key not in r:
                f(f"Feld fehlt: {key}")
        if rid in ids:
            f("doppelte id")
        ids.add(rid)
        if not set(r.get("mahlzeit", [])) <= MAHLZEITEN or not r.get("mahlzeit"):
            f(f"mahlzeit ungültig: {r.get('mahlzeit')}")
        if r.get("portionen") not in (1, 2, 4):
            f("portionen muss 1, 2 oder 4 sein")
        for zeile in r.get("zutaten", []):
            if not isinstance(zeile, list) or len(zeile) < 2:
                f(f"Zutatenzeile ungültig: {zeile}"); continue
            if zeile[0] not in Z:
                f(f"unbekannte Zutat: {zeile[0]}"); continue
            einheit = zeile[2] if len(zeile) > 2 and zeile[2] in ("stk",) else ""
            try:
                g = gramm(Z[zeile[0]], zeile[1], einheit)
                if g <= 0 or g > 3000:
                    f(f"Menge unplausibel: {zeile}")
            except ValueError as e:
                f(str(e))
        wege = r.get("wege", [])
        if not wege:
            f("kein Zubereitungsweg")
        for w in wege:
            if not set(w.get("geraete", [])) <= GERAETE:
                f(f"unbekanntes Gerät: {w.get('geraete')}")
            if not w.get("schritte"):
                f("Weg ohne Schritte")
            if not (0 < w.get("zeit", 0) <= 240) or not (0 < w.get("aktiv", 0) <= w.get("zeit", 0)):
                f(f"zeit/aktiv unplausibel: {w.get('zeit')}/{w.get('aktiv')}")
            if ("herd" in w.get("geraete", []) or "herd2" in w.get("geraete", [])) and not ({"topf", "pfanne"} & set(w.get("geraete", []))):
                f("Herd ohne Topf/Pfanne")
        L = r.get("lager", {})
        for key in ["kuehl_tage", "einfrierbar", "ungekuehlt_h", "kalt_essbar", "aufwaermen"]:
            if key not in L:
                f(f"lager.{key} fehlt")
        if L.get("kuehl_tage", 0) not in (0, 1, 2):
            f("kuehl_tage muss 0, 1 oder 2 sein")
        if L.get("ungekuehlt_h") not in (0, 2, 24):
            f("ungekuehlt_h muss 0, 2 oder 24 sein")
        if L.get("aufwaermen") not in AUFWAERMEN:
            f(f"aufwaermen ungültig: {L.get('aufwaermen')}")
        zids = {z[0] for z in r.get("zutaten", [])}
        gegart = any(set(w.get("geraete", [])) - {"toaster"} for w in wege)
        if gegart and zids & KURZ and L.get("kuehl_tage", 0) > 1:
            f(f"Lagerregel: mit {sorted(zids & KURZ)} höchstens 1 Tag im Kühlschrank")
        if L.get("aufwaermen") == "nein" and zids & ROH and L.get("kuehl_tage", 0) > 1:
            f(f"Lagerregel L3: kalt mit roher Komponente {sorted(zids & ROH)} höchstens 1 Tag im Kühlschrank")
        if L.get("ungekuehlt_h") == 24:
            leicht = [z for z in zids if Z.get(z, {}).get("lager") in ("k", "t") and "e" not in Z.get(z, {}).get("flags", [])]
            if leicht:
                f(f"ungekuehlt_h=24, aber kühlpflichtige Zutaten: {leicht}")
        if r.get("mealprep") and L.get("kuehl_tage", 0) == 0 and not L.get("einfrierbar"):
            f("mealprep=true, aber weder kühl- noch einfrierbar")
        if "ohne_kuehlschrank" in r.get("tags", []):
            leicht = [z for z in zids if Z.get(z, {}).get("lager") in ("k", "t") and "e" not in Z.get(z, {}).get("flags", [])]
            if leicht:
                f(f"Tag ohne_kuehlschrank, aber kühlpflichtige Zutaten: {leicht}")
    return fehler


def naehrwerte(r, Z):
    s = {"kcal": 0, "p": 0, "f": 0, "kh": 0, "bst": 0, "zucker": 0, "salz": 0}
    for zeile in r["zutaten"]:
        if len(zeile) > 3 and zeile[3] == "opt":
            continue
        z = Z[zeile[0]]
        g = gramm(z, zeile[1], zeile[2] if len(zeile) > 2 else "")
        for k in s:
            s[k] += z["n100"][k] * g / 100
    return {k: round(v / r["portionen"], 1) for k, v in s.items()}


def main():
    Z = lade_zutaten()
    if len(sys.argv) > 2 and sys.argv[1] == "--check":
        pfad = os.path.join(HIER, "rezepte", sys.argv[2] + ".json")
        rez = json.load(open(pfad, encoding="utf-8"))
        fehler = pruefe(rez, Z, sys.argv[2])
        for r in rez:
            if not any(r["id"] in x for x in fehler):
                n = naehrwerte(r, Z)
                print(f"{r['id']:5} {r['titel'][:42]:42} {n['kcal']:5.0f} kcal  P {n['p']:4.0f}  KH {n['kh']:4.0f}  F {n['f']:4.0f}")
        print("\n".join(fehler) if fehler else f"OK: {len(rez)} Rezepte fehlerfrei")
        sys.exit(1 if fehler else 0)
    alle, fehler = [], []
    for pfad in sorted(glob.glob(os.path.join(HIER, "rezepte", "*.json"))):
        rez = json.load(open(pfad, encoding="utf-8"))
        fehler += pruefe(rez, Z, os.path.basename(pfad))
        alle += rez
    ids = [r["id"] for r in alle]
    fehler += [f"doppelte id über Dateien: {i}" for i in set(ids) if ids.count(i) > 1]
    if fehler:
        print("\n".join(fehler)); sys.exit(1)
    for r in alle:
        r["n"] = naehrwerte(r, Z)
        al, diaet = set(), {"vegan": True, "vegetarisch": True, "pescetarisch": True, "ohne_schwein": True}
        for zeile in r["zutaten"]:
            if len(zeile) > 3 and zeile[3] == "opt":
                continue
            z = Z[zeile[0]]
            al |= set(z["al"])
            fl = z["flags"]
            if "v" not in fl: diaet["vegan"] = False
            if "v" not in fl and "vg" not in fl: diaet["vegetarisch"] = False
            if "s" in fl or "fl" in fl: diaet["pescetarisch"] = False
            if "s" in fl: diaet["ohne_schwein"] = False
        r["al"] = sorted(al)
        r["diaet"] = [k for k, v in diaet.items() if v]
    out = {"quelle": "Nährwerte: Max Rubner-Institut (2025): Bundeslebensmittelschlüssel (BLS) 4.0, CC BY 4.0, DOI 10.25826/Data20251217-134202-0. Preise: Schätzung Stand 10/2026.",
           "zutaten": Z, "rezepte": alle}
    ziel = os.path.join(HIER, "..", "public", "data")
    os.makedirs(ziel, exist_ok=True)
    json.dump(out, open(os.path.join(ziel, "daten.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print(f"OK: {len(alle)} Rezepte, {len(Z)} Zutaten -> public/data/daten.json")


if __name__ == "__main__":
    main()
