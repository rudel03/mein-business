# Begleittexte, Grundlagen und Pläne für Band 2 und 3

IMPRINT = dict(
 publisher="Alexander Rudel · BeeQueen Kitchen<br>Folkenbornstraße 104 · 45472 Mülheim an der Ruhr · Deutschland<br>Telefon: 0163 1979818<br>E-Mail: alexrudel.03@web.de<br>beequeenkitchen.com",
 einordnung="Allgemeine Orientierung für die Zeit nach der Geburt; keine persönliche medizinische oder ernährungstherapeutische Beratung. Bei Erkrankungen, Allergien, Stillproblemen oder Beschwerden gelten die mit deiner Hebamme, deiner Ärztin oder deinem Arzt vereinbarten Empfehlungen.",
 transparenz="Texte entstanden mit KI-Unterstützung. Die Fotos der Gerichte und Kapitel sind KI-generierte Darstellungen, keine Aufnahmen nachgekochter Rezepte; Aussehen und Mengen können abweichen. Zeiten sind Richtwerte. Eine unabhängige Fachprüfung oder Zertifizierung wird nicht behauptet. Persönliche Nutzung; gesetzlich erlaubte Nutzungen bleiben unberührt.",
)

SOURCES = [
 ("Netzwerk Gesund ins Leben (BZfE)", "Handlungsempfehlungen zur Ernährung in der Stillzeit, u. a. zu Fisch, Jod, Alkohol, Koffein und Energiebedarf. gesund-ins-leben.de"),
 ("Deutsche Gesellschaft für Ernährung (DGE)", "Referenzwerte für die Nährstoffzufuhr in der Stillzeit; Empfehlungen zur ausgewogenen Ernährung. dge.de"),
 ("Bundesinstitut für Risikobewertung (BfR)", "Verbrauchertipps zur Küchenhygiene, zum Abkühlen und Aufwärmen (u. a. Reis) sowie zu Honig im ersten Lebensjahr. bfr.bund.de"),
 ("Bundeszentrum für Ernährung (BZfE)", "Hinweise zum Einfrieren, Auftauen und zur Lagerdauer von Lebensmitteln. bzfe.de"),
 ("Stillstudie SuSe II", "Stillen und Säuglingsernährung in Deutschland (BfR/DGE-Ernährungsbericht)."),
]

# ---------------------------------------------------------------- BAND 2
B2 = dict(
 key="b2", band="Band 2", short="Vorkochen fürs Wochenbett",
 title="Vorkochen fürs Wochenbett", sub="Das Kochbuch für die ersten Wochen mit Baby",
 edition="Digitale Erstausgabe · Stand: 28. Oktober 2026",
 count="55 Rezepte zum Einfrieren · über 160 Portionen · 2 Kochtage · 6-Wochen-Plan",
 howto=[
  ("1 · Plane deine zwei Kochtage", "Zwischen der 32. und 36. Schwangerschaftswoche: An jedem Kochtag entstehen in rund drei Stunden etwa 20 warme Portionen plus Frühstück und Snacks. Ablauf und Einkaufsliste stehen ab Seite {{P:kt1}}."),
  ("2 · Fülle die Lücken nach Lust", "Alle weiteren Rezepte kochst du an normalen Abenden einfach doppelt – eine Portion wird gegessen, die andere wandert in die Truhe."),
  ("3 · Lass dir helfen", "Gib Partner, Familie und Freundinnen die Liste „Wer bringt was?“ (Seite {{P:helfer}}). So wird jede Hilfe zu einer Mahlzeit, die wirklich passt."),
 ],
 basics=[
  ("Warum vorkochen?", [
   ("Die ersten Wochen sind kein Alltag", "Stillen oder Fläschchen alle zwei bis drei Stunden, kurze Nächte, ein Körper, der heilt. Kochen hat in dieser Zeit keinen Platz auf der Liste – essen aber schon."),
   ("Eine Truhe voller Fürsorge", "Jede Portion, die du jetzt einfrierst, ist eine Mahlzeit, über die du später nicht nachdenken musst. Mit zwei Kochtagen sind die ersten zwei bis drei Wochen abgedeckt."),
   ("Weniger Lieferdienst, mehr Ruhe", "Selbst gekocht weißt du, was drin ist, und du sparst Geld. Aufwärmen dauert kürzer als jede Bestellung."),
   ("Alle können helfen", "Jedes Gericht hat eine klare Aufwärm-Anleitung. So kann auch dein Partner oder Besuch dir in fünf Minuten ein warmes Essen hinstellen."),
  ]),
  ("Was dein Körper jetzt braucht.", [
   ("Eiweiß und Eisen", "Nach der Geburt baut der Körper Gewebe wieder auf, und durch den Blutverlust ist Eisen ein Thema. Fleisch, Hülsenfrüchte, Eier und Milchprodukte kommen deshalb in fast jedem Rezept vor. Vitamin C aus Gemüse, Obst oder Zitrone verbessert die Aufnahme von Eisen aus Pflanzen."),
   ("Ballaststoffe und Flüssigkeit", "Die Verdauung braucht nach der Geburt oft etwas Zeit. Vollkorn, Hülsenfrüchte, Gemüse und Leinsamen helfen – zusammen mit reichlich Flüssigkeit. Stell dir zu jedem Stillen ein Glas Wasser bereit."),
   ("Jod und Omega-3", "Für Stillende wird empfohlen, ein- bis zweimal pro Woche Fisch zu essen, davon einmal fettreichen Seefisch, und mit Jodsalz zu würzen. Zusätzlich wird meist eine Jodtablette empfohlen – sprich die Dosis mit deiner Ärztin oder deinem Arzt ab."),
   ("Energie statt Diät", "Wer voll stillt, braucht rund 500 kcal mehr pro Tag. Die ersten Wochen sind keine Zeit für Kalorienzählen: Iss regelmäßig und bis du satt bist."),
  ]),
  ("Stillzeit: Was stimmt?", [
   ("„Blähende Lebensmittel muss ich meiden.“", "Nicht vorbeugend. Kohl, Hülsenfrüchte und Zwiebeln musst du nicht vom Speiseplan streichen. Nur wenn du einen klaren Zusammenhang beobachtest, kannst du ein einzelnes Lebensmittel testweise weglassen."),
   ("„Stilltee oder Malzbier machen mehr Milch.“", "Eine Wirkung ist nicht belegt. Die Milchmenge regelt sich vor allem über häufiges Anlegen. Tee darfst du natürlich trotzdem trinken – Malzbier enthält allerdings viel Zucker."),
   ("„Kaffee ist tabu.“", "Nein. Moderate Mengen – etwa drei Tassen über den Tag verteilt – gelten in der Stillzeit als unbedenklich. Alkohol solltest du dagegen weiterhin meiden."),
   ("„Die Regeln aus der Schwangerschaft gelten weiter.“", "Die meisten nicht. Rohmilchkäse, Räucherlachs oder weiches Ei sind nach der Geburt wieder möglich, weil die besonderen Infektionsrisiken der Schwangerschaft wegfallen. Frische und gute Küchenhygiene bleiben wichtig."),
  ]),
  ("Einfrieren, aber richtig.", [
   ("Schnell abkühlen", "Große Mengen in flache Behälter verteilen, nicht im Topf auskühlen lassen und spätestens nach zwei Stunden in den Kühlschrank stellen. Erst gut gekühlt einfrieren."),
   ("Flach und portioniert", "Gefrierbeutel flach legen und stapeln: Sie frieren schneller durch, brauchen wenig Platz und tauen schnell auf. Am besten in Portionen für eine oder zwei Personen."),
   ("Beschriften", "Name, Datum, Portionen und den Aufwärm-Hinweis notieren. Fertige Etiketten findest du ab Seite {{P:etiketten}}."),
   ("Lagern, auftauen, aufwärmen", "Bei −18 °C halten Eintöpfe, Currys und Aufläufe bis zu drei Monate in guter Qualität, Fisch bis zu zwei, Brühe und Soßen bis zu sechs. Über Nacht im Kühlschrank auftauen und so erhitzen, dass das Essen überall mindestens 2 Minuten lang 70 °C erreicht. Aufgetautes nicht wieder einfrieren."),
  ]),
  ("Was sich einfrieren lässt.", [
   ("Sehr gut", "Suppen, Eintöpfe, Currys, Schmorgerichte, Aufläufe, Bällchen und Bratlinge, Muffins, Waffeln, Brötchen, Brühe, Tomatensoße, Kompott."),
   ("Mit kleinem Trick", "Kartoffeln lieber pürieren oder in Eintöpfen klein schneiden. Nudeln und Reis bissfest kochen oder frisch dazu machen. Sahnige Soßen nach dem Auftauen kräftig aufrühren. Schmand, Joghurt und frische Kräuter erst beim Servieren zugeben."),
   ("Lieber nicht", "Blattsalat, rohe Gurke und Tomate, hart gekochte ganze Eier, Mayonnaise-Salate, gebratene Panade (wird weich)."),
   ("Platzbedarf", "20 flach eingefrorene Portionen passen etwa in eine Gefrierschublade. Schaffe vor den Kochtagen Platz und lege die Inventar-Liste (Seite {{P:inventar}}) daneben."),
  ]),
 ],
)

B2_KOCHTAGE = [
 dict(key="kt1", name="Kochtag 1 · Der herzhafte Grundstock", recipes=["C02","S05","A02","F03","E01"],
  yields="8 × Rinder-Ragù · 6 × Linsen-Kichererbsen-Eintopf · 6 × Hähnchen-Brokkoli-Auflauf · 8 Stücke Ofenhafer · 20 Energiebällchen",
  steps=[
   ("0:00","Ragù starten (C02): Fleisch anbraten, Gemüse dünsten, alles zugedeckt schmoren lassen. Es läuft jetzt zwei Stunden fast von allein."),
   ("0:25","Eintopf ansetzen (S05): Zwiebeln, Gewürze, Linsen, Tomaten und Brühe – 30 Minuten köcheln."),
   ("0:35","Energiebällchen (E01): Aprikosen einweichen, alles mixen, Kugeln formen und kalt stellen."),
   ("0:55","Ofenhafer (F03) mischen und bei 180 °C 35 Minuten backen."),
   ("1:00","Eintopf fertig abschmecken und in flache Dosen verteilen."),
   ("1:10","Auflauf (A02): Nudeln und Brokkoli kochen, Hähnchen braten, Käsesoße rühren, alles mischen."),
   ("1:35","Ofenhafer herausnehmen, Auflauf bei 200 °C 20 Minuten überbacken."),
   ("2:10","Ragù zerzupfen und abschmecken. Alles abkühlen lassen."),
   ("2:30","Portionieren, beschriften, einfrieren – zuerst, was schon am kältesten ist. Küche aufräumen."),
  ]),
 dict(key="kt2", name="Kochtag 2 · Der Wohlfühl-Vorrat", recipes=["C01","S04","A01","F01","E06"],
  yields="6 × Butter-Chicken · 6 × Minestrone · 6 × Shepherd's Pie · 12 Blaubeer-Muffins · 20 Ofen-Falafel",
  steps=[
   ("0:00","Alle Süßkartoffeln schälen (für Pie und Falafel) und zusammen in einem großen Topf weich kochen."),
   ("0:10","Hähnchen für das Butter-Chicken (C01) in Joghurt und Gewürzen marinieren."),
   ("0:20","Minestrone (S04) ansetzen und köcheln lassen – Nudeln nicht dazugeben."),
   ("0:35","Muffinteig (F01) rühren und bei 180 °C 22 Minuten backen."),
   ("0:45","Butter-Chicken kochen."),
   ("1:05","Muffins herausnehmen. Falafel (E06) mixen, formen und bei 200 °C 25 Minuten backen."),
   ("1:15","Hackfüllung für den Shepherd's Pie (A01) braten, Süßkartoffeln zu Püree stampfen."),
   ("1:35","Pie in Formen schichten – er wird ungebacken eingefroren. Falafel herausnehmen."),
   ("1:45","Minestrone abschmecken. Alles abkühlen lassen, dann portionieren, beschriften und einfrieren."),
  ]),
]

B2_SIXWEEKS = [
 ("Woche 1", "Ankommen", "C02 ×2 · S05 ×4 · A02 ×2 · C01 ×2 · S04 ×2 · A01 ×2", "F03 Ofenhafer, F01 Muffins", "E01, E06", "Obst, Joghurt, Brot, Rohkost"),
 ("Woche 2", "Einpendeln", "C02 ×4 · A02 ×4 · C01 ×4 · S04 ×2", "F03, F01", "E01, E06", "Salat, Obst, Quark"),
 ("Woche 3", "Ersten Ausflug wagen", "C02 ×2 · S05 ×2 · S04 ×2 · A01 ×4 · B03 in Wraps ×4", "F04 Waffeln, F02 Burritos", "E02, E03", "Tortillas, Gurke, Tomate"),
 ("Woche 4", "Kleine Routinen", "S01 ×6 · C04 ×4 · E05 mit B02 ×4", "F04, F02", "E02, E03", "Nudeln, Reis frisch"),
 ("Woche 5", "Mehr Hunger", "S02 ×6 · C05 ×4 · A05 ×4", "F05 Scones, F06 Brötchen", "E04, E07, B05", "Brot, Gemüsesticks"),
 ("Woche 6", "Übergang in den Alltag", "C06 ×4 · A04 ×4 · S03 ×6", "F05, F06", "E04, E07, B05", "Nudeln, Obst, Joghurt"),
]

HELFER = [
 "Bitte bringt lieber eine Mahlzeit als Blumen – am besten in einer Dose, die wir behalten dürfen.",
 "Wir mögen: Suppen, Eintöpfe, Aufläufe, Currys mild gewürzt, Obst, frisches Brot.",
 "Bitte vorher kurz schreiben – wenn das Baby schläft, schlafen wir oft auch.",
 "Ihr wollt mehr helfen? Spülmaschine, Wäsche oder ein Einkauf sind Gold wert.",
]

# ---------------------------------------------------------------- BAND 3
B3 = dict(
 key="b3", band="Band 3", short="Kraft-Küche fürs erste Jahr",
 title="Kraft-Küche fürs erste Jahr", sub="Schnelle Rezepte für Mamas mit Baby",
 edition="Digitale Erstausgabe · Stand: 28. Oktober 2026",
 count="65 Rezepte · 4 Wochenpläne mit Einkaufslisten",
 howto=[
  ("1 · Wähle nach Zeit, nicht nach Kapitel", "Fünf Minuten? Dann ein Einhand-Frühstück oder ein Snack. Fünfzehn Minuten? Ein Mittagessen aus Kapitel 2. Die Zeit steht bei jedem Rezept ganz oben."),
  ("2 · Koch einmal für alle", "Die Rezepte aus „Ein Essen für alle“ sind für Erwachsene und – ab Beikoststart – für dein Baby gedacht. Der Kasten „Fürs Baby“ sagt dir, wann du die Portion abnimmst."),
  ("3 · Nimm einen Plan", "Ab Seite {{P:woche1}} findest du vier fertige Wochenpläne mit Einkaufslisten. Du musst nichts mehr planen – nur noch einkaufen."),
 ],
 basics=[
  ("Energie statt Diät.", [
   ("Dein Körper hat Großes geleistet", "Gewicht und Figur verändern sich über viele Monate – das ist normal. Dieses Buch hilft dir, gut versorgt zu sein, nicht, schnell etwas loszuwerden."),
   ("Stillen braucht Energie", "Wer voll stillt, braucht rund 500 kcal mehr pro Tag. Strenge Diäten sind in der Stillzeit nicht empfohlen; Hunger und Müdigkeit machen alles schwerer."),
   ("Satt, regelmäßig, bunt", "Drei Mahlzeiten und zwei kleine Snacks mit Eiweiß, Vollkorn und Gemüse halten den Energiepegel stabiler als Kaffee und Kekse."),
   ("Wenn du abnehmen möchtest", "Dann langsam und ohne Verbote – am besten abgesprochen mit deiner Ärztin oder Hebamme. Die Rezepte hier sind sättigend und eine gute Grundlage dafür."),
  ]),
  ("Der Honigmama-Teller.", [
   ("Halb Gemüse oder Obst", "Die Hälfte des Tellers ist bunt: Rohkost, Ofengemüse, Salat oder Obst. Das bringt Vitamine, Ballaststoffe und Volumen."),
   ("Ein Viertel Eiweiß", "Ei, Fisch, Fleisch, Hülsenfrüchte, Tofu, Quark oder Käse. Eiweiß macht lange satt – darum steckt es in jedem Rezept dieses Buchs."),
   ("Ein Viertel Vollkorn", "Vollkornbrot, Haferflocken, Vollkornnudeln, Reis, Kartoffeln. Sie liefern Energie, die nicht sofort verpufft."),
   ("Plus Wasser und etwas Gutes", "Ein Glas Wasser zu jeder Mahlzeit und jedem Stillen. Dazu eine kleine Portion gutes Fett: Nüsse, Olivenöl, Avocado."),
  ]),
  ("Was du jetzt brauchst.", [
   ("Eisen und Eiweiß", "Nach der Geburt sind die Eisenspeicher oft leer. Rotes Fleisch, Linsen und Haferflocken liefern Eisen – mit Vitamin C aus Paprika, Zitrus oder Beeren wird es besser aufgenommen."),
   ("Jod und Omega-3", "Ein- bis zweimal pro Woche Fisch, davon einmal fettreicher Seefisch wie Lachs. Würze mit Jodsalz. Eine Jodtablette wird für Stillende meist zusätzlich empfohlen – sprich die Dosis ärztlich ab."),
   ("Calcium", "Milchprodukte, Käse, calciumreiches Mineralwasser, grünes Gemüse und Tofu. Wer keine Milchprodukte isst, sollte das mit einer Fachkraft besprechen."),
   ("Alkohol und Koffein", "Alkohol möglichst meiden. Kaffee in moderater Menge – etwa drei Tassen über den Tag verteilt – gilt als unbedenklich."),
  ]),
  ("Fürs Baby abzweigen.", [
   ("Ab Beikoststart", "Meist zwischen dem 5. und 7. Monat, sobald dein Baby Interesse zeigt und gut sitzen kann. Sprich den Start mit deiner Kinderärztin oder Hebamme ab."),
   ("Vor dem Würzen abnehmen", "Babys brauchen kein Salz und keine scharfen Gewürze. Nimm die Portion ab, bevor du salzt – im Kasten „Fürs Baby“ steht, wann genau."),
   ("Kein Honig im ersten Jahr", "Honig kann Sporen enthalten, die für Babys gefährlich sind. Honig im Rezept gilt deshalb nur für die Erwachsenen-Portion."),
   ("Sicher essen", "Anfangs fein püriert, dann zerdrückt, später weiche Stücke. Ganze Nüsse, Popcorn, ganze Trauben und harte rohe Gemüsestücke sind wegen Verschluckungsgefahr nicht geeignet."),
  ]),
  ("Deine Snack-Station.", [
   ("Ein Korb am Stillplatz", "Wasserflasche, eine Handvoll Nüsse, Vollkorncracker, Obst, ein Riegel. Morgens auffüllen – so musst du nicht aufstehen, wenn der Hunger kommt."),
   ("Das Sofort-Fach im Kühlschrank", "Hart gekochte Eier, Hüttenkäse, Gemüsesticks im Wasserglas, Hummus, Joghurt. Alles, was ohne Messer geht."),
   ("Der 15-Minuten-Vorrat", "TK-Erbsen und -Spinat, Dosenlinsen und Kichererbsen, Vollkornnudeln, Tortillas, Haferflocken, Eier, Feta, passierte Tomaten. Damit gelingt fast jedes Rezept aus Kapitel 2."),
   ("Nachts", "Gegen Heißhunger um drei Uhr helfen Snacks mit Eiweiß besser als Süßes: Hüttenkäse, Nüsse, ein Käsebrot."),
  ]),
 ],
)

# Wochenpläne Band 3: je Tag (Frühstück, Mittag, Abend); "R:" = Rest vom Vortag
B3_WEEKS = [
 dict(key="woche1", name="Woche 1 · Ankommen im Alltag", note="Einfache Gerichte, viel Abwechslung, Reste werden zum Mittagessen.",
  days=[("Mo","F03","M02","A05"),("Di","F06","R:M02","A01"),("Mi","F01","R:A05","A06"),("Do","F03","M07","M05"),("Fr","F06","R:A06","A09"),("Sa","F08","M06","A10"),("So","F04","R:A10","A04")],
  snacks=["S01","S04","Z03"]),
 dict(key="woche2", name="Woche 2 · Mehr Gemüse", note="Viele vegetarische Gerichte, Fisch am Samstag.",
  days=[("Mo","F02","M01","A03"),("Di","R:F02","R:A03","A08"),("Mi","F05","M03","A02"),("Do","F03","R:A08","M09"),("Fr","F01","R:M09","A07"),("Sa","F07","M04","A05"),("So","F04","R:A05","V07")],
  snacks=["S02","S06","Z05"]),
 dict(key="woche3", name="Woche 3 · Vorbereitet durch die Woche", note="Sonntagabend oder Montag 30 Minuten vorbereiten, dann trägt dich die Woche.",
  days=[("Mo","F02","V01","A06"),("Di","R:F02","R:V01","A01"),("Mi","F06","R:V01","A09"),("Do","F05","V02","M05"),("Fr","F01","R:V02","V06"),("Sa","F08","R:V02","A10"),("So","F04","R:A10","A04")],
  snacks=["S03","S07","Z02"]),
 dict(key="woche4", name="Woche 4 · Alles im Fluss", note="Mischung aus Lieblingsrezepten und neuen Ideen.",
  days=[("Mo","F03","V04","A02"),("Di","F01","R:V04","A08"),("Mi","F06","M08","M10"),("Do","F05","V05","A07"),("Fr","F07","R:V05","V03"),("Sa","F08","V08","A03"),("So","F04","M06","A05")],
  snacks=["S05","S08","Z01","Z04","Z06"]),
]
