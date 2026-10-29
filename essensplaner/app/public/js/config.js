// Zentrale Einstellungen. Name, Preise, Texte und Voreinstellungen der Varianten werden NUR hier geändert.
// Begründungen und Alternativen: ../../ENTSCHEIDUNGEN.md

export const CONFIG = {
  dachmarke: 'Tellerkontor',            // ENTSCHEIDUNGEN.md #B1 – erscheint klein in Fußzeile, Impressum, Kasse
  betreiber: {
    // Platzhalter: der Inhaber trägt seine Daten ein (FUER_DICH.md)
    name: '[Vorname Nachname]', strasse: '[Straße Nr.]', ort: '[PLZ Ort]', email: '[kontakt@domain.de]', telefon: '[Telefon]',
    ustid: '[USt-IdNr. oder „Kleinunternehmer nach § 19 UStG“]',
  },

  // Preise (ENTSCHEIDUNGEN.md #P1). Endpreise inkl. MwSt. – Verkauf über einen Merchant of Record.
  preise: {
    monat: { betrag: 6.99, text: '6,99 € im Monat', laufzeit: 'monatlich kündbar' },
    jahr: { betrag: 44.99, text: '44,99 € im Jahr', laufzeit: 'nach dem ersten Jahr monatlich kündbar', standard: true },
    pass: { betrag: 17.99, text: '17,99 € einmalig für 3 Monate', laufzeit: 'Endet automatisch, keine Verlängerung', varianten: ['montage'] },
    saison: { betrag: 24.99, text: '24,99 € einmalig für 6 Monate', laufzeit: 'Endet automatisch, keine Verlängerung', varianten: ['camping'] },
  },
  probeTage: 7,
  kostenlos: { tage: 1 }, // ohne Plus: Tagesplan (1 Tag) mit Einkaufsliste

  // Kasse und Verträge – vom Inhaber nach Kontoeröffnung einzutragen (FUER_DICH.md). Leer = Kasse noch nicht aktiv.
  kasse: { anbieter: 'Paddle', urls: { monat: '', jahr: '', pass: '', saison: '' } },
  vertragEndpoint: '', // nimmt Kündigung und Widerruf entgegen (server/vertrag-worker.js)
  lizenzSchluessel: 'MCowBQYDK2VwAyEAPLATZHALTER_OEFFENTLICHER_SCHLUESSEL_000000000=', // Ed25519, SPKI Base64 (tools/lizenz.mjs)

  varianten: {
    montage: {
      name: 'Zimmerherd', claim: 'Satt werden mit dem, was dasteht.',
      kurz: 'Für Monteure, Bau, Außendienst und Fernfahrer in Unterkünften.',
      theme: 'montage',
      profil: {
        geraete: { herd: 0, topf: false, pfanne: false, ofen: false, airfryer: false, mikrowelle: true, wasserkocher: true, kuehlschrank: true, gefrier: false },
        pause: 'kalt', kcalRichtwert: 2800, mahlzeiten: ['fruehstueck', 'mittag', 'abend'], laden: 'aldi', personen: 1,
      },
      herdName: 'Kochplatten',
    },
    fitness: {
      name: 'Kochsatz', claim: 'Deine Makros. Dein Discounter. Dein Plan.',
      kurz: 'Für Training, Meal-Prep und feste Kalorien- und Proteinziele.',
      theme: 'fitness',
      profil: {
        geraete: { herd: 2, topf: true, pfanne: true, ofen: true, airfryer: true, mikrowelle: true, wasserkocher: true, kuehlschrank: true, gefrier: true },
        makros: { kcal: 2600, p: 160, kh: 290, f: 80 }, kochtage: [6, 2], pause: 'mikrowelle', mahlzeiten: ['fruehstueck', 'mittag', 'abend', 'snack'], laden: 'lidl',
      },
      herdName: 'Herdplatten',
    },
    camping: {
      name: 'Zweiflammer', claim: 'Zwei Flammen. Eine Woche. Entspannt.',
      kurz: 'Für Wohnmobil, Van, Wohnwagen und Dauercamping.',
      theme: 'camping',
      profil: {
        geraete: { herd: 2, topf: true, pfanne: true, ofen: false, omnia: true, grill: false, airfryer: false, mikrowelle: false, wasserkocher: false, kuehlschrank: true, gefrier: false },
        personen: 2, mahlzeiten: ['fruehstueck', 'mittag', 'abend'], pause: 'zuhause', laden: 'lidl', arbeitstage: [],
      },
      herdName: 'Gasflammen',
    },
    alltag: {
      name: 'Wochenschmaus', claim: 'Die Woche ist geplant. Der Einkauf auch.',
      kurz: 'Für alle, die nicht jeden Tag neu überlegen wollen, was es gibt.',
      theme: 'alltag',
      profil: {
        geraete: { herd: 4, topf: true, pfanne: true, ofen: true, airfryer: false, mikrowelle: true, wasserkocher: true, kuehlschrank: true, gefrier: true },
        personen: 2, mahlzeiten: ['fruehstueck', 'mittag', 'abend'], pause: 'zuhause', laden: 'aldi',
      },
      herdName: 'Herdplatten',
    },
  },
};
