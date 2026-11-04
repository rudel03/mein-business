// Zentrale Einstellungen. Name, Preise, Texte und Küchen-Situationen werden NUR hier geändert.
// Begründungen und Alternativen: ../../ENTSCHEIDUNGEN.md (C17: eine Marke Wochenbon)

export const CONFIG = {
  marke: 'Wochenbon',                   // ENTSCHEIDUNGEN.md #C17 – DPMA/EUIPO-Prüfung offen (FUER_DICH.md)
  dachmarke: 'Wochenbon',               // erscheint in Fußzeile, Impressum, Kasse
  claim: 'Weißt du, was deine Woche kostet?',
  kurz: 'Wochenplan, Einkaufszettel und geschätzter Preis für deinen Discounter.',
  betreiber: {
    // Platzhalter: der Inhaber trägt seine Daten ein (FUER_DICH.md)
    name: '[Vorname Nachname]', strasse: '[Straße Nr.]', ort: '[PLZ Ort]', email: '[kontakt@domain.de]', telefon: '[Telefon]',
    ustid: '[USt-IdNr. oder „Kleinunternehmer nach § 19 UStG“]',
  },

  // Preise (ENTSCHEIDUNGEN.md #P1). Endpreise inkl. MwSt. – Verkauf über einen Merchant of Record.
  preise: {
    monat: { betrag: 6.99, text: '6,99 € im Monat', laufzeit: 'monatlich kündbar' },
    jahr: { betrag: 44.99, text: '44,99 € im Jahr', laufzeit: 'nach dem ersten Jahr monatlich kündbar', standard: true },
  },
  probeTage: 7,
  kostenlos: { tage: 1 }, // ohne Plus: Tagesplan (1 Tag) mit Einkaufsliste

  // Euro-Beträge in Werbung und auf der Startseite erst nach bestandenem Kassenbon-Test (Claim-Freigabe).
  // Im Planer selbst stehen die Schätzungen immer, deutlich als „ca.“ und „geschätzt“ markiert.
  preiseInWerbung: false,

  // Basis-URL für Canonical, og:image, Sitemap. Platzhalter, bis die Domain gekauft ist (FUER_DICH.md)
  basisUrl: 'https://wochenbon.de/',

  // Kasse und Verträge – vom Inhaber nach Kontoeröffnung einzutragen (FUER_DICH.md). Leer = Kasse noch nicht aktiv.
  kasse: { anbieter: 'Paddle', urls: { monat: '', jahr: '' } },
  vertragEndpoint: '', // nimmt Kündigung und Widerruf entgegen (server/vertrag-worker.js)
  lizenzSchluessel: 'MCowBQYDK2VwAyEAPLATZHALTER_OEFFENTLICHER_SCHLUESSEL_000000000=', // Ed25519, SPKI Base64 (tools/lizenz.mjs)
  // Warteliste: Formular-Adresse des Mail-Dienstes mit Double-Opt-in (z. B. Brevo-Formular). Leer = Anmeldung noch nicht offen.
  warteliste: { url: '' },
  tracking: { metaPixelId: '' }, // leer = kein Pixel, kein Banner (js/einwilligung.js, nur Startseite + Preisseite)

  // Voreinstellung beim ersten Öffnen
  profil: { situation: 'normal', personen: 2, laden: 'aldi', mahlzeiten: ['fruehstueck', 'mittag', 'abend'], pause: 'zuhause' },

  // Küchen-Situationen: ein Tipp stellt alle Geräte ein (früher vier Marken, jetzt Filter)
  situationen: {
    normal: { name: 'Normale Küche', kurz: 'Herd, Backofen, Kühlschrank', geraete: { herd: 4, topf: true, pfanne: true, ofen: true, mikrowelle: true, wasserkocher: true, kuehlschrank: true, gefrier: true } },
    airfryer: { name: 'Küche mit Airfryer', kurz: 'wie normal, plus Heißluftfritteuse', geraete: { herd: 4, topf: true, pfanne: true, ofen: true, airfryer: true, mikrowelle: true, wasserkocher: true, kuehlschrank: true, gefrier: true } },
    klein: { name: 'Kleine Küche', kurz: 'zwei Platten, kein Backofen', geraete: { herd: 2, topf: true, pfanne: true, mikrowelle: true, wasserkocher: true, kuehlschrank: true, gefrier: true } },
    zimmer: { name: 'Nur Wasserkocher und Mikrowelle', kurz: 'Wohnheim, Büro, Monteurzimmer', geraete: { wasserkocher: true, mikrowelle: true, kuehlschrank: true }, pause: 'kalt' },
    camper: { name: 'Camper mit Gasherd', kurz: 'zwei Flammen, Kühlbox', geraete: { herd: 2, topf: true, pfanne: true, omnia: true, kuehlschrank: true }, einkauf: 'woche' },
  },
};
