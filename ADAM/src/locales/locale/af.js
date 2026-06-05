const TRANSLATION = {
  titles: {
    error: 'Fout',
    noTokenSelected: 'Geen teken gekies nie',
    tokenError: 'Tokenfout',
    missingDirection: 'Ontbrekende rigting',
    invalidDirection: 'Ongeldige rigting',
    missingState: 'Vermiste staat',
    invalidState: 'Ongeldige staat',
    missingAction: 'Ontbrekende aksie',
    invalidAction: 'Ongeldige handeling',
    accessDenied: 'Toegang geweier',
    invalidValue: 'Ongeldige waarde',
    unknownCommand: 'Onbekende bevel',
    moveError: 'Skuiffout',
    macroExists: 'Makro bestaan',
    macroInstalled: 'Makro geïnstalleer',
    invalidUsage: 'Ongeldige gebruik',
    profileAssigned: 'Profiel toegewys',
    profileRemoved: 'Profiel verwyder',
    unknownProfile: 'Onbekende profiel',
    configuration: 'Konfigurasie',
    settingsReset: 'Stel instellings terug',
    scriptReady: 'Skrip gereed',
    versionInfo: 'Weergawe inligting',
    creditsTitle: 'Krediete',
    adamsMenu: 'A.D.A.M. Beheer dek',
    adamsHelp: 'A.D.A.M. Help',
    adamsSettings: 'A.D.A.M. Instellings',
    profiles: 'Gekonfigureerde profiele',
    tokenProfile: 'Tekenprofiel',
    success: 'Sukses',
    langSet: 'Taal Stel',
    langInvalid: 'Ongeldige taal',
    profileCreated: 'Profiel geskep',
    profileUpdated: 'Profiel opgedateer',
    profileDeleted: 'Profiel uitgevee',
    profileRenamed: 'Profiel hernoem',
    draftSubmitted: 'Konsep ingedien',
    draftApproved: 'Konsep goedgekeur',
    draftRejected: 'Konsep afgekeur',
    pendingDrafts: 'Hangende profielkonsepte',
    profileCreationMode: 'Profielskeppingsmodus',
    draftNotification: 'Profielkonsep hangende',
  },
  errors: {
    noTokenSelected:
      "Geen teken gekies nie. Kies asseblief eers 'n teken en klik dan 'n rigtingknoppie.",
    noTokenSelectedStill: 'Nog geen teken gekies nie.',
    noTokenSelectedPersistent: "Ek bewonder jou volharding. Kies eers 'n teken.",
    tokenNotFound: 'Geselekteerde token kon nie gevind word nie.',
    missingDirection:
      "Gee asseblief 'n rigting. Voorbeeld: <code>!adam --move n</code><br><em>Aanwysings: n, ne, e, se, s, sw, w, nw</em>",
    invalidDirection:
      'Onbekende rigting: <strong>{value}</strong><br><br>Geldig: n, ne, e, se, s, sw, w, nw (of volle name soos noord, noordoos)',
    missingState: "Verskaf asseblief 'n staat.<br>Geldig: {states}",
    invalidState: 'Onbekende toestand: <strong>{value}</strong><br><br>Geldig: {states}',
    missingAction:
      "Verskaf asseblief 'n aksie. Voorbeelde: hulp, spelling, woede, dash, sluip, ledig, geveg",
    invalidAction:
      'Onbekende handeling: <strong>{value}</strong><br><br>Bekende handelinge: {actions}',
    accessDeniedConfig: 'Konfigurasieveranderinge is beperk tot die GM.',
    accessDeniedProfileAssign: 'Profieltoewysing is beperk tot die GM.',
    accessDeniedProfileRemove: 'Profielverwydering is beperk tot die GM.',
    accessDeniedMacro: 'Makro-installasie is beperk tot die GM.',
    accessDeniedReset: 'Terugstelling van instellings is beperk tot die GM.',
    unknownCommand:
      "Onbekende opdrag. Probeer <code>!adam --help</code> vir 'n lys van beskikbare opdragte.",
    moveFailed: 'Beweging het misluk.',
    gridSizeInvalid: "Roostergrootte moet 'n heelgetal tussen 10 en 1000 (pixels) wees.",
    moveDistanceInvalid: "Beweegafstand moet 'n heelgetal tussen 1 en 20 (vierkante) wees.",
    autoFaceInvalid: 'Outo-sigwaarde moet aan of af wees.',
    humourInvalid: 'Humorwaarde moet wees: aan of af.',
    langInvalid: 'Ongeldige plek. Ondersteun: {locales}',
    profileUsage:
      'Gebruik: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
    profileAssignUsage: 'Gebruik: <code>!adam --profile ken &lt;profileId&gt;</code> toe',
    profileUnknown:
      'Profiel <strong>{id}</strong> bestaan ​​nie. Gebruik <code>!adam --profile lys</code> om beskikbare profiele te sien.',
    profileUnknownSub:
      'Onbekende profiel-subopdrag: <strong>{sub}</strong><br><br>Geldig: lys, wys, skep, wysig-kant, hernoem, verwyder, wys toe, verwyder, konsep, konsep-kant, hersien, keur, verwerp',
    profileIdInvalid:
      'Ongeldige profiel-ID: <strong>{id}</strong>. Gebruik slegs letters, syfers, koppeltekens en onderstrepings (maksimum 50 karakters).',
    profileAlreadyExists:
      'Profiel <strong>{id}</strong> bestaan ​​reeds. Gebruik <code>!adam --profile wysig-kant</code> om dit te wysig, of vee dit eers uit.',
    profileNotFound: 'Profiel <strong>{id}</strong> nie gevind nie.',
    profileCreateUsage:
      'Gebruik: <code>!adam --profile skep &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileEditSideUsage:
      'Gebruik: <code>!adam --profile wysig-kant &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileRenameUsage:
      'Gebruik: <code>!adam --profile hernoem &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDeleteUsage: 'Gebruik: <code>!adam --profile verwyder &lt;profileId&gt;</code>',
    profileDraftUsage:
      'Gebruik: <code>!adam --profile konsep &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDraftSideUsage:
      'Gebruik: <code>!adam --profile konsep-kant &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileDraftNotFound:
      'Geen hangende konsep gevind vir <strong>{id}</strong>. Dien een in met <code>!adam --profile konsep</code>.',
    profileGmOnly: 'Profielskepping is beperk tot die GM.',
    profileEditGmOnly: 'Die wysiging van hierdie profiel is beperk tot die GM.',
    profileDeleteGmOnly: 'Die uitvee van hierdie profiel is beperk tot die GM.',
    profileGlobalReadOnly:
      "Profiel <strong>{id}</strong> is 'n globale profiel en kan slegs deur die GM gewysig word.",
    profileNotOwned: 'Jy besit nie profiel <strong>{id}</strong> nie en kan dit nie verander nie.',
    profileModeRequiresDraft:
      "Profielskepping vereis GM-goedkeuring in hierdie speletjie. Gebruik <code>!adam --profile konsep &lt;id&gt; &lt;name&gt;</code> om 'n konsep in te dien.",
    profileAssignNoControl: 'Jy kan net persoonlike profiele toewys aan tokens wat jy beheer.',
    profileAssignNotOwned:
      "Jy kan net jou eie profiele toewys aan tokens wat jy beheer. Profiel <strong>{id}</strong> behoort aan 'n ander speler.",
    profileCreationModeInvalid:
      'Ongeldige profielskeppingmodus. Geldig: slegs gm, gm-goedgekeurde, alle gebruikers.',
    profileReviewGmOnly: 'Slegs die GM kan hangende konsepte hersien.',
    profileApproveGmOnly: 'Slegs die GM kan profielkonsepte goedkeur.',
    profileRejectGmOnly: 'Slegs die GM kan profielkonsepte verwerp.',
    invalidAnimSet: 'Animasiestel moet wees: noord of suid.',
    invalidSideNumber: "Sygetal moet 'n positiewe heelgetal (1 of groter) wees.",
    noDrafts: 'Geen hangende profielkonsepte nie.',
    profileDraftConflict:
      "'n Hangende konsep vir <strong>{id}</strong> bestaan ​​reeds en behoort aan 'n ander speler.",
    profileDraftNotGmApproved:
      'Konsepvoorleggings is slegs beskikbaar wanneer profielskeppingmodus <code>gm-goedgekeur</code> is.',
    profileApproveConflict:
      "'n Aktiewe profiel genaamd <strong>{id}</strong> bestaan ​​reeds. Vee dit eers uit voordat hierdie konsep goedgekeur word.",
    macroExists: "'n Makro genaamd '<strong>{name}</strong>' bestaan ​​reeds.",
    simonUnknown:
      'Simon weet nie hoe om: <em>{command}</em><br><br>Probeer: <code>!simon sê skuif n</code>',
  },
  confirm: {
    facing: '<strong>{token}</strong> staar nou <strong>{direction}</strong> in die gesig.',
    stateSet: '<strong>{token}</strong> staat gestel na <strong>{state}</strong>.',
    actionSet:
      '<strong>{token}</strong> handeling: <strong>{action}</strong> → meld: <strong>{state}</strong>.',
    profileAssigned: 'Profiel <strong>{id}</strong> is aan <strong>{token}</strong> toegewys.',
    profileRemoved: 'Profiel verwyder van <strong>{token}</strong>.',
    profileCreated: 'Profiel <strong>{id}</strong> geskep.',
    profileSideSet: 'Profiel <strong>{id}</strong>: {state}/{animSet} → kant {number}.',
    profileRenamed: 'Profiel <strong>{id}</strong> hernoem na <strong>{name}</strong>.',
    profileDeleted: 'Profiel <strong>{id}</strong> is uitgevee.',
    profileDraftSubmitted: 'Konsep vir profiel <strong>{id}</strong> ingedien vir GM-goedkeuring.',
    profileDraftApproved:
      'Profielkonsep <strong>{id}</strong> is goedgekeur en by aktiewe profiele gevoeg.',
    profileDraftRejected: 'Profielkonsep <strong>{id}</strong> is verwerp.',
    macroInstalled:
      "Globale makro '<strong>{name}</strong>' is geskep en is sigbaar vir alle spelers.",
    configUpdated: 'Instellings opgedateer.',
    settingsReset: '<strong>Instellings is teruggestel na fabrieksverstellings.</strong>',
    langSet: 'Taal gestel op {locale}.',
  },
  settings: {
    gridSize: 'Roostergrootte',
    gridSizeDesc: '{size}px per vierkant',
    moveDistance: 'Beweeg afstand',
    moveDistanceDesc: '{squares} vierkant(e) — {pixels}px per beweging',
    autoFace: 'Outo-gesig aan die beweeg',
    humour: 'Humor (Paaseiers)',
    language: 'Taal',
    profileCreationMode: 'Profielskeppingsmodus',
    on: 'Aan',
    off: 'Af',
  },
  profiles: {
    none: 'Geen geanimeerde tekenprofiele is opgestel nie.',
    noProfile: 'Geen profiel is toegewys aan die gekose teken nie.',
    id: 'Profiel ID',
    displayName: 'Vertoon Naam',
    mappedStates: 'Gekarteerde state',
    noneValue: '(geen)',
    personal: 'persoonlik',
    owner: 'Eienaar',
    submittedBy: 'ingedien deur',
    approveHint:
      'Gebruik !adam --profile keur &lt;id&gt; goed te keur of verwerp &lt;id&gt; om te verwerp.',
  },
  menu: {
    title: 'A.D.A.M. Beheer dek',
    movement: 'Beweging',
    facing: 'Gesig',
    state: 'Staat',
    stateLabel: 'Staat',
    facingLabel: 'Gesig',
    profileLabel: 'Profiel',
    noProfile: 'Geen profiel nie',
    help: 'Help',
    config: 'Config',
    states: {
      idle: 'Ledig',
      combat: 'Geveg',
      walk: 'Loop',
      dash: 'Dash',
      sneak: 'Sluip',
      rage: 'Woede',
      spellcasting: 'Spelling',
      help: 'Help',
    },
  },
  info: {
    subtitle: 'Geanimeerde Regie En Beweging',
    versionLabel: 'Weergawe',
    updatedLabel: 'Opgedateer',
    creditsBody:
      'A.D.A.M.<br>Animated Direction And Movement<br><br>Aangedryf deur SIMON.<br>Beslis nie Simon genoem nie.',
    ready: 'MOD GEREED',
  },
  easter: {
    toTheLeft: 'Links, links...',
    notGoingAnywhere: 'A.D.A.M. het vasgestel jy gaan eintlik nêrens heen nie.',
    areWeThereYet: 'Is ons al daar?',
    sneakSpam:
      'Niemand het jou gesien nie.<br>Niemand het jou gesien nie.<br>Niemand het jou gesien nie.',
    helpSpam: "Wie is 'n goeie uil?",
    rageRage: 'Dorn sou goedkeur.',
    simonResponse: '...en moenie my Simon noem nie!',
    simonNoSays: 'Simon sê wat?',
    versionEgg: 'A.D.A.M. v{version}<br><br>Beslis nie SIMON nie.',
  },
};

export default TRANSLATION;
