# DURCHSCHICHT – Texte, Pläne, Infoseiten

TITLE = "DURCHSCHICHT"
SUB = "Das Essenssystem für Früh, Spät und Nacht"
COUNT = "48 Rezepte · 6 Dienstplan-Pläne · Lagerkarte · Etiketten"

ABOUT = [
 "Dieses Buch ist kein Diätbuch. Für Schichtarbeit gelten dieselben Ernährungsempfehlungen wie für alle anderen – nur die Verteilung der Mahlzeiten über den Tag ist anders (DGE 2024).",
 "Darum ist es nach etwas anderem sortiert als nach Vorspeise und Dessert: nach deiner Schicht, nach deiner Pause und nach dem, was im Pausenraum steht.",
 "Alle Aussagen zu Lagerung, Aufwärmen und Koffein stützen sich auf öffentliche Stellen wie BfR, BZfE, DGE und EFSA. Die Quellen stehen hinten im Buch. Wo die Stellen unterschiedliche Zeiten nennen, nehmen wir die vorsichtigere.",
 "Die Fotos der Gerichte sind mit KI erzeugte Darstellungen, keine Fotos nachgekochter Rezepte. Mengen und Zeiten sind Richtwerte. Bei Erkrankungen, Allergien oder in der Schwangerschaft gilt der Rat deiner Ärztin oder deines Arztes.",
]

HOWTO = [
 ("1 · Nimm deinen Dienstplan", "Such dir den Plan, der deiner nächsten Woche am nächsten kommt: Früh-Block, Spät-Block, Nacht-Block oder Wechsel. Die Pläne stehen vor den Rezepten."),
 ("2 · Schau auf die Symbole", "Jedes Rezept zeigt, was es am Arbeitsplatz braucht: Mikrowelle, Kühlschrank, gar nichts (Kühltasche) oder Thermobehälter. Nimm nur, was zu deinem Pausenraum passt."),
 ("3 · Ein Kochblock statt jeden Tag", "Gekochtes hält 2 Tage im Kühlschrank. Darum gibt es zwei kurze Kochblöcke pro Woche oder die Truhe – nie fünf Tage Vorrat im Kühlschrank."),
 ("4 · Datum UND Uhrzeit", "Wer nachts arbeitet, verliert schnell das Zeitgefühl. Auf jede Box kommt, wann gekocht wurde – mit Uhrzeit. Etiketten zum Ausdrucken sind hinten im Buch."),
]

EQUIP = [
 ("M", "Mikrowelle", "Abgedeckt erhitzen, zwischendurch umrühren, bis es überall dampfend heiß ist (mind. 70 °C für 2 Minuten)."),
 ("K", "Nur Kühlschrank", "Kalt gedacht und kalt gut. Box bis zur Pause im Kühlschrank lassen."),
 ("O", "Ohne Kühlschrank", "Kühltasche mit mindestens zwei Kühlakkus. Hält in der Regel durch eine Schicht – bei Hitze lieber Rezepte mit diesem Symbol, die ohne Kühlung sicher sind (z. B. N05, N06)."),
 ("T", "Thermobehälter", "Behälter 5 Minuten mit kochendem Wasser vorwärmen, Essen sprudelnd kochend einfüllen, sofort verschließen. Es muss bis zum Essen mindestens 60 °C haben (BfR) – prüf das einmal mit einem Thermometer."),
]

RHYTHM = [
 ("Frühdienst · ca. 6–14 Uhr", [("vor 5:30","kleines Frühstück oder Overnight Oats (N02)"),("ca. 9:30","Pause: Box oder Brot mit Gemüse"),("ca. 14:30","warme Hauptmahlzeit zu Hause"),("Abend","leicht, nicht zu spät – der Wecker klingelt früh")]),
 ("Spätdienst · ca. 14–22 Uhr", [("Vormittag","normales Frühstück"),("ca. 12:30","warme Hauptmahlzeit vor der Schicht (Kapitel V)"),("ca. 18:00","Pause: Box (Kapitel M, K oder T)"),("nach 22 Uhr","klein: Spätschicht-Teller (A04) statt Lieferdienst")]),
 ("Nachtdienst · ca. 22–6 Uhr", [("ca. 19–20 Uhr","warme Hauptmahlzeit vor der Nacht (Kapitel V)"),("ca. 0–1 Uhr","Pause: warme oder kalte Box"),("ca. 3–4 Uhr","nur bei Hunger etwas Kleines (Kapitel N)"),("nach Schichtende","kleines Frühstück vor dem Schlaf (A01–A03)")]),
]

RULES = [
 ("Hauptmahlzeit vor der Nacht", "Die warme, ausgewogene Mahlzeit gehört vor oder an den Anfang der Nacht. In der zweiten Nachthälfte nur bei Hunger etwas Kleines. Nicht hungrig, aber auch nicht vollgegessen ins Bett (NIOSH, DGE)."),
 ("Trinken nicht vergessen", "Rund 1,5 Liter am Tag, am besten Wasser oder ungesüßter Tee (DGE). Nachts wird erfahrungsgemäß oft zu wenig getrunken – stell dir eine Flasche sichtbar hin."),
 ("Koffein mit Plan", "Bis 400 mg Koffein am Tag und 200 mg auf einmal gelten für gesunde Erwachsene als unbedenklich (EFSA/BfR) – Schwangere höchstens 200 mg am Tag. Faustregel: Koffein eher in der ersten Schichthälfte, etwa 6 Stunden vor dem Schlafen nicht mehr."),
 ("Alkohol ist keine Schlafhilfe", "Er stört vor allem die zweite Schlafhälfte. Für den Tagschlaf nach der Nacht eine schlechte Idee."),
]

COFFEE = [("Filterkaffee, 1 Becher (200 ml)","ca. 90 mg"),("Espresso, 1 Tasse (60 ml)","ca. 80 mg"),("Energydrink, 250 ml","ca. 80 mg"),("Schwarztee, 1 Tasse (220 ml)","ca. 50 mg"),("Cola, 330 ml","ca. 35 mg")]
COFFEE_SRC = "Werte gerundet nach EFSA/BfR-Verbraucherinformation; Gehalt schwankt je nach Zubereitung und Produkt."

STORAGE = [
 ("Gegartes", "höchstens 2 Tage im Kühlschrank, sonst direkt nach dem Abkühlen einfrieren"),
 ("Reis", "innerhalb von 1 Stunde abkühlen, innerhalb von 24 Stunden essen, nur einmal aufwärmen"),
 ("Kühlschrank", "höchstens 7 °C, besser 5 °C – einmal mit einem Thermometer prüfen"),
 ("Abkühlen", "flach portionieren und innerhalb von 1–2 Stunden in den Kühlschrank"),
 ("Aufwärmen", "überall mindestens 70 °C für 2 Minuten, umrühren; nur die Portion, die du isst"),
 ("Thermobehälter", "vorwärmen, kochend einfüllen, bis zum Essen mindestens 60 °C"),
 ("Auftauen", "im Kühlschrank; Aufgetautes innerhalb von 24 Stunden essen"),
 ("Riechtest", "ist kein Sicherheitstest – Keime und Giftstoffe riecht man nicht"),
 ("Gemeinschaftskühlschrank", "Box nicht länger als deine Schicht drinlassen; beschriften mit Name, Datum und Uhrzeit"),
]
STORAGE_NOTE = "Warum Aufwärmen nichts rettet: Manche Bakteriengifte (z. B. von Bacillus cereus in Reis) halten sogar langes Kochen aus (BfR). Darum zählt das Abkühlen, nicht das Aufwärmen."

# Pläne: Tage mit (Schicht, Vor/Haupt, Pause, klein/nach) – Rezept-IDs
PLANS = [
 dict(key="plan_frueh", name="Früh-Block", sub="3 Frühdienste", kocht="Kochblock am Vortag (ca. 60 Min.): V03 Chili (5 Portionen), K01 Couscous-Salat (3 Gläser). Jeden Abend 5 Minuten: N02 Overnight Oats für den nächsten Morgen.",
  days=[("Vortag","frei","V03 Chili (warm)","—","K01 vorbereiten, 3 × V03 einfrieren, N02 ansetzen"),
        ("Tag 1","F","N02 Overnight Oats","K01 Couscous-Salat","V03 Chili (Portion 2), N02 ansetzen"),
        ("Tag 2","F","N02 Overnight Oats","K01 Couscous-Salat","M04 Gnocchi (20 Min., 2 Boxen), N02 ansetzen"),
        ("Tag 3","F","N02 Overnight Oats","M04 Gnocchi (Box 2)","V03 aus der Truhe")],
  note="Overnight Oats halten 24 Stunden – darum jeden Abend frisch ansetzen. Das dauert fünf Minuten."),
 dict(key="plan_spaet", name="Spät-Block", sub="3 Spätdienste", kocht="Kochblock am Vortag (ca. 60 Min.): V05 Curry (4 Portionen), M06 Linsen-Bolognese (4 Boxen, 2 davon sofort einfrieren)",
  days=[("Vortag","frei","V05 Curry (abends)","—","M06 kochen: 2 Boxen Kühlschrank, 2 Truhe"),
        ("Tag 1","S","V05 Curry (mittags)","M06 Bolognese","A04 Spätschicht-Teller"),
        ("Tag 2","S","V02 Ofen-Hähnchen (frisch, mittags)","M06 Bolognese","A05 Tomatensuppe"),
        ("Tag 3","S","V02 Hähnchen (Portion 2)","M06 aus der Truhe (morgens in den Kühlschrank)","A04 Spätschicht-Teller")],
  note="Nach 22 Uhr wird nicht mehr gekocht: Der Abend ist für den Spätschicht-Teller oder eine Suppe aus dem Vorrat."),
 dict(key="plan_nacht", name="Nacht-Block", sub="3 Nächte", kocht="Kochblock vor der ersten Nacht (ca. 75 Min.): V01 Eintopf (4 Portionen, 2 davon einfrieren), K04 Linsensalat, N05 Dattelkugeln",
  days=[("Tag vor N1","frei, nachmittags schlafen","mittags normal essen","—","V01, K04, N05 kochen"),
        ("Nacht 1","N","19 Uhr: V01 Eintopf","0 Uhr: K04 Linsensalat oder V01 im Thermobehälter","3–4 Uhr bei Hunger: N05 · danach A01"),
        ("Nacht 2","N","19 Uhr: V07 Reispfanne (frisch)","0 Uhr: K04 Linsensalat","bei Hunger: N01 · danach A02"),
        ("Nacht 3","N","19 Uhr: V01 aus der Truhe","0 Uhr: V01 aus der Truhe (Thermobehälter oder Mikrowelle)","bei Hunger: N04 · danach A03")],
  note="Hauptmahlzeit immer vor der Nacht. In der zweiten Nachthälfte nur bei Hunger etwas Kleines."),
 dict(key="plan_wechsel", name="Wechsel 2-2-3", sub="2 Früh · 2 Spät · 3 Nacht", kocht="Drei kurze Kochblöcke: vor F1 (V03, K01), am Vormittag von S1 (V05, M06) und vor N1 (V01, K04, N05)",
  days=[("F1","F","N02","K01","V03 (frisch, Vortag gekocht)"),("F2","F","N02","K01","V03 aus der Truhe"),
        ("S1","S","V05 mittags (frisch)","M06","A04"),("S2","S","V05 Portion 2","M06","A05"),
        ("N1","N","V01 vor der Nacht","K04 oder V01 im Thermobehälter","N05, danach A01"),("N2","N","V07 frisch","K04","N01, danach A02"),("N3","N","V01 aus der Truhe","V01 aus der Truhe","N04, danach A03")],
  note="Der Trick beim Wechsel: Die Truhe füllt sich in den Frühdiensten und leert sich in den Nächten."),
 dict(key="plan_umschalt", name="Erste Nacht & Umschalttag", sub="Die Tage, an denen der Rhythmus kippt", kocht="Nichts Neues kochen – nur aus Truhe und Vorrat",
  days=[("Tag vor der 1. Nacht","frei","normal frühstücken und mittagessen","nachmittags schlafen, wenn möglich","19 Uhr: V01 oder V05 – warm und ausgewogen"),
        ("1. Nacht","N","—","0 Uhr: T01 im Thermobehälter","3–4 Uhr: nur bei Hunger N02 oder N05"),
        ("Nach der letzten Nacht","frei","kleines Frühstück A01","Tagschlaf kürzer halten","abends normal essen: A06 aus der Truhe, früh ins Bett"),
        ("Erster freier Tag","frei","Frühstück zur normalen Zeit","Mittag zur normalen Zeit","Kochblock für die nächste Woche")],
  note="Nach der letzten Nacht kann ein kürzerer Tagschlaf helfen, wieder in den Nachtschlaf zu finden (DGUV-Information 206-027). Feste Mahlzeiten an den freien Tagen helfen dem Rhythmus (DGE)."),
 dict(key="plan_kochtag", name="Kochtag 90 Minuten", sub="Ein Block für die ganze Woche", kocht="",
  days=[("0:00","—","Ofen auf 220 °C, Gemüse für B01 schneiden","B02 Hähnchen rein","—"),
        ("0:15","—","B01 Gemüse auf zwei Blechen in den Ofen","B03 Getreide aufsetzen","—"),
        ("0:30","—","V01 Eintopf aufsetzen","B04 Soßen anrühren","—"),
        ("0:50","—","B01 raus, flach abkühlen","B02 raus, zupfen","—"),
        ("1:10","—","Boxen füllen: was in 2 Tagen gegessen wird in den Kühlschrank, der Rest sofort in die Truhe","Etiketten mit Datum + Uhrzeit","—"),
        ("1:30","—","Küche zu.","—","—")],
  note="Die Zeiten sind Planwerte und nicht gestoppt. Bei dir kann es schneller oder langsamer gehen."),
]

HANDOVER = [
 "Meine Schichten diese Woche: ______________________",
 "Ich esse vor der Schicht um: ______ Uhr",
 "In der Truhe ist: ______________________",
 "Bitte nicht essen (für meine Schicht): ______________________",
 "Ich schlafe von ______ bis ______ Uhr – bitte leise.",
 "Gemeinsames Essen geht am: ______________________",
]

CHAIN = [
 ("Die Idee", "Vier Kolleg:innen kochen je ein Gericht vierfach. In der nächsten Schicht wird getauscht – jede:r hat vier verschiedene Boxen und nur einmal gekocht."),
 ("Was sich eignet", "Gerichte mit M- oder K-Symbol, die 2 Tage halten: V01, V03, V05, M02, M06, K01, K04."),
 ("Die Regeln", "Gekocht wird am Tag vor dem Tausch. Gekühlt transportieren (Kühltasche). Auf jede Box Name, Gericht, Datum und Uhrzeit sowie die Allergene aus dem Rezept."),
 ("Fairness", "Jede:r zahlt die eigenen Zutaten. Wer etwas nicht verträgt, sagt es vorher – die Allergene stehen bei jedem Rezept."),
]

SOURCES = [
 ("DGE (2024): Ernährung bei Schichtarbeit, DGEwissen 3/2024", "Gleicher Bedarf, andere Verteilung; fester Rhythmus auch an freien Tagen."),
 ("BfR: Vorkochen für mehrere Tage (FAQ)", "Gegartes 2–3 Tage gekühlt, Aufwärmen auf 70 °C für 2 Minuten."),
 ("BZfE: Lagerung von Speisen", "Gegarte Speisen bis zu 2 Tage im Kühlschrank."),
 ("BfR: Heißhalten von Speisen (Stellungnahme 2020/2024)", "Erhitzte Speisen bis zum Verzehr mindestens 60 °C."),
 ("BfR: Bacillus cereus (2019)", "Hitzestabiles Toxin Cereulid; Reis schnell abkühlen."),
 ("FSA/NHS: Reis", "Innerhalb von 1 Stunde abkühlen, innerhalb von 24 Stunden essen."),
 ("EFSA (2015) / BfR: Koffein", "Bis 400 mg/Tag, 200 mg Einzeldosis für gesunde Erwachsene; Schwangere 200 mg/Tag."),
 ("NIOSH: Training for Nurses on Shift Work, Modul 9", "Hauptmahlzeit vor der Nacht, kleines Essen vor dem Tagschlaf."),
 ("DGUV Information 206-027", "Tagschlaf nach der letzten Nacht ggf. kürzen."),
 ("ArbZG § 4", "Pausen: 30 Minuten bei mehr als 6 Stunden, 45 Minuten bei mehr als 9 Stunden."),
]
