# DURCHSCHICHT – Essen nach Dienstplan

E-Book und Shopify-Shop für Schichtarbeitende (Store: mystore).

| Ordner | Inhalt |
|---|---|
| `brand/` | Markenbuch, Logo (make_logo.py), Schriften, Moodbilder |
| `buch/` | Rezeptdaten (ds_data.py), Texte (ds_content.py), Buchsatz (ds_build.py → ds.html → render.js → ds.pdf), Fotos in ph/ |
| `final/` | Fertiges PDF und Cover |
| `web/` | Schichtplan-Rechner (JS/CSS) |
| `theme/` | Shopify-Sections, Assets, Templates; `python3 build.py` baut alles; produkt.json = Produktdaten; Rechtliches_Entwurf.md |
| `mockups/` | Produktbilder (Higgsfield) |
| `ads/` | 8 Anzeigen, Kampagne_DURCHSCHICHT.md (Texte, Mails, Launch-Plan) |

Buch neu bauen: `cd buch && python3 ds_build.py && node render.js ds.html ds.pdf && node check.js`

Offen: Theme + Produkt in mystore hochladen, Impressum-Daten, Kleinunternehmer ja/nein, PDF als digitalen Download anhängen, Domains durchschicht.de/.com, DPMA-Recherche.
