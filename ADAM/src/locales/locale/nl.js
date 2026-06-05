const TRANSLATION = {
  titles: {
    error: 'Fout',
    noTokenSelected: 'Geen token geselecteerd',
    tokenError: 'Tokenfout',
    missingDirection: 'Ontbrekende richting',
    invalidDirection: 'Ongeldige richting',
    missingState: 'Ontbrekende staat',
    invalidState: 'Ongeldige staat',
    missingAction: 'Ontbrekende actie',
    invalidAction: 'Ongeldige actie',
    accessDenied: 'Toegang geweigerd',
    invalidValue: 'Ongeldige waarde',
    unknownCommand: 'Onbekend commando',
    moveError: 'Verplaatsingsfout',
    macroExists: 'Macro bestaat',
    macroInstalled: 'Macro geïnstalleerd',
    invalidUsage: 'Ongeldig gebruik',
    profileAssigned: 'Profiel toegewezen',
    profileRemoved: 'Profiel verwijderd',
    unknownProfile: 'Onbekend profiel',
    configuration: 'Configuratie',
    settingsReset: 'Instellingen Resetten',
    scriptReady: 'Script klaar',
    versionInfo: 'Versie-informatie',
    creditsTitle: 'Kredieten',
    adamsMenu: 'ADAM. Controledek',
    adamsHelp: 'ADAM. Hulp',
    adamsSettings: 'ADAM. Instellingen',
    profiles: 'Geconfigureerde profielen',
    tokenProfile: 'Tokenprofiel',
    success: 'Succes',
    langSet: 'Taal ingesteld',
    langInvalid: 'Ongeldige taal',
    profileCreated: 'Profiel aangemaakt',
    profileUpdated: 'Profiel bijgewerkt',
    profileDeleted: 'Profiel verwijderd',
    profileRenamed: 'Profiel hernoemd',
    draftSubmitted: 'Concept ingediend',
    draftApproved: 'Concept goedgekeurd',
    draftRejected: 'Concept afgewezen',
    pendingDrafts: 'Profielconcepten in behandeling',
    profileCreationMode: 'Modus voor het maken van profielen',
    draftNotification: 'Profielconcept in behandeling',
  },
  errors: {
    noTokenSelected:
      'Geen token geselecteerd. Selecteer eerst een token en klik vervolgens op een richtingsknop.',
    noTokenSelectedStill: 'Er is nog steeds geen token geselecteerd.',
    noTokenSelectedPersistent: 'Ik bewonder je doorzettingsvermogen. Selecteer eerst een token.',
    tokenNotFound: 'Het geselecteerde token kan niet worden gevonden.',
    missingDirection:
      'Geef een richting op. Voorbeeld: <code>!adam --move n</code><br><em>Routebeschrijving: n, ne, e, se, s, sw, w, nw</em>',
    invalidDirection:
      'Onbekende richting: <strong>{value}</strong><br><br>Geldig: n, ne, e, se, s, sw, w, nw (of volledige namen zoals noord, noordoost)',
    missingState: 'Geef een staat op.<br>Geldig: {states}',
    invalidState: 'Onbekende staat: <strong>{value}</strong><br><br>Geldig: {states}',
    missingAction:
      'Geef een actie op. Voorbeelden: help, spreuk, woede, sprint, sluipen, inactief, vechten',
    invalidAction: 'Onbekende actie: <strong>{value}</strong><br><br>Bekende acties: {actions}',
    accessDeniedConfig: 'Configuratiewijzigingen zijn beperkt tot de GM.',
    accessDeniedProfileAssign: 'Profieltoewijzing is beperkt tot de GM.',
    accessDeniedProfileRemove: 'Profielverwijdering is beperkt tot de GM.',
    accessDeniedMacro: 'Macro-installatie is beperkt tot de GM.',
    accessDeniedReset: 'Het resetten van instellingen is beperkt tot de GM.',
    unknownCommand:
      'Onbekend commando. Probeer <code>!adam --help</code> voor een lijst met beschikbare opdrachten.',
    moveFailed: 'Beweging mislukt.',
    gridSizeInvalid: 'De rastergrootte moet een geheel getal tussen 10 en 1000 (pixels) zijn.',
    moveDistanceInvalid:
      'De verplaatsingsafstand moet een geheel getal zijn tussen 1 en 20 (vierkantjes).',
    autoFaceInvalid: 'Auto-face-waarde moet: aan of uit zijn.',
    humourInvalid: 'Humorwaarde moet zijn: aan of uit.',
    langInvalid: 'Ongeldige landinstelling. Ondersteund: {locales}',
    profileUsage:
      'Gebruik: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
    profileAssignUsage: 'Gebruik: <code>!adam --profile wijs &lt;profileId&gt;</code> toe',
    profileUnknown:
      'Profiel <strong>{id}</strong> bestaat niet. Gebruik <code>!adam --profile lijst</code> om beschikbare profielen te bekijken.',
    profileUnknownSub:
      'Onbekend profielsubcommando: <strong>{sub}</strong><br><br>Geldig: lijst, weergeven, maken, bewerkingszijde, hernoemen, verwijderen, toewijzen, verwijderen, concept, conceptzijde, beoordelen, goedkeuren, afwijzen',
    profileIdInvalid:
      'Ongeldige profiel-ID: <strong>{id}</strong>. Gebruik alleen letters, cijfers, koppeltekens en onderstrepingstekens (max. 50 tekens).',
    profileAlreadyExists:
      'Profiel <strong>{id}</strong> bestaat al. Gebruik <code>!adam --profile edit-side</code> om het te wijzigen, of verwijder het eerst.',
    profileNotFound: 'Profiel <strong>{id}</strong> niet gevonden.',
    profileCreateUsage:
      'Gebruik: <code>!adam --profile maak &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileEditSideUsage:
      'Gebruik: <code>!adam --profile bewerkingszijde &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileRenameUsage:
      'Gebruik: <code>!adam --profile hernoemen &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDeleteUsage: 'Gebruik: <code>!adam --profile verwijder &lt;profileId&gt;</code>',
    profileDraftUsage:
      'Gebruik: <code>!adam --profile concept &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDraftSideUsage:
      'Gebruik: <code>!adam --profile conceptzijde &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileDraftNotFound:
      'Geen concept in behandeling gevonden voor <strong>{id}</strong>. Dien er een in met <code>!adam --profile concept</code>.',
    profileGmOnly: 'Het aanmaken van een profiel is beperkt tot de GM.',
    profileEditGmOnly: 'Het wijzigen van dit profiel is beperkt tot de GM.',
    profileDeleteGmOnly: 'Het verwijderen van dit profiel is beperkt tot de GM.',
    profileGlobalReadOnly:
      'Profiel <strong>{id}</strong> is een globaal profiel en kan alleen worden gewijzigd door de GM.',
    profileNotOwned:
      'Je bent niet de eigenaar van profiel <strong>{id}</strong> en je kunt dit niet wijzigen.',
    profileModeRequiresDraft:
      'Voor het maken van een profiel is goedkeuring van GM vereist in dit spel. Gebruik <code>!adam --profile concept &lt;id&gt; &lt;name&gt;</code> om een ​​concept in te dienen.',
    profileAssignNoControl:
      'U kunt alleen persoonlijke profielen toewijzen aan tokens die u beheert.',
    profileAssignNotOwned:
      'Je kunt alleen je eigen profielen toewijzen aan tokens die jij beheert. Profiel <strong>{id}</strong> is van een andere speler.',
    profileCreationModeInvalid:
      'Ongeldige modus voor het maken van profielen. Geldig: alleen gm, gm-goedgekeurd, alle gebruikers.',
    profileReviewGmOnly: 'Alleen de GM kan hangende concepten beoordelen.',
    profileApproveGmOnly: 'Alleen de GM kan profielconcepten goedkeuren.',
    profileRejectGmOnly: 'Alleen de GM kan profielconcepten afwijzen.',
    invalidAnimSet: 'Animatieset moet zijn: noord of zuid.',
    invalidSideNumber: 'Zijdenummer moet een positief geheel getal zijn (1 of groter).',
    noDrafts: 'Geen lopende profielconcepten.',
    profileDraftConflict:
      'Er bestaat al een in behandeling zijnd concept voor <strong>{id}</strong> en is eigendom van een andere speler.',
    profileDraftNotGmApproved:
      'Conceptinzendingen zijn alleen beschikbaar als de modus voor het maken van profielen <code>gm-approved</code> is.',
    profileApproveConflict:
      'Er bestaat al een actief profiel met de naam <strong>{id}</strong>. Verwijder het eerst voordat u dit concept goedkeurt.',
    macroExists: "Er bestaat al een macro met de naam '<strong>{name}</strong>'.",
    simonUnknown:
      'Simon weet niet hoe hij het volgende moet doen: <em>{command}</em><br><br>Probeer: <code>!simon zegt zet n</code>',
  },
  confirm: {
    facing: '<strong>{token}</strong> staat nu tegenover <strong>{direction}</strong>.',
    stateSet: '<strong>{token}</strong> status ingesteld op <strong>{state}</strong>.',
    actionSet:
      '<strong>{token}</strong> actie: <strong>{action}</strong> → staat: <strong>{state}</strong>.',
    profileAssigned: 'Profiel <strong>{id}</strong> toegewezen aan <strong>{token}</strong>.',
    profileRemoved: 'Profiel verwijderd van <strong>{token}</strong>.',
    profileCreated: 'Profiel <strong>{id}</strong> gemaakt.',
    profileSideSet: 'Profiel <strong>{id}</strong>: {state}/{animSet} → zijkant {number}.',
    profileRenamed: 'Profiel <strong>{id}</strong> hernoemd naar <strong>{name}</strong>.',
    profileDeleted: 'Profiel <strong>{id}</strong> verwijderd.',
    profileDraftSubmitted:
      'Concept voor profiel <strong>{id}</strong> ingediend voor goedkeuring door GM.',
    profileDraftApproved:
      'Profielconcept <strong>{id}</strong> goedgekeurd en toegevoegd aan actieve profielen.',
    profileDraftRejected: 'Profielconcept <strong>{id}</strong> is afgewezen.',
    macroInstalled:
      "De globale macro '<strong>{name}</strong>' is gemaakt en is zichtbaar voor alle spelers.",
    configUpdated: 'Instellingen bijgewerkt.',
    settingsReset: '<strong>Instellingen teruggezet naar fabrieksinstellingen.</strong>',
    langSet: 'Taal ingesteld op {locale}.',
  },
  settings: {
    gridSize: 'Rastergrootte',
    gridSizeDesc: '{size}px per vierkant',
    moveDistance: 'Verplaats afstand',
    moveDistanceDesc: '{squares} vierkant(en) — {pixels}px per zet',
    autoFace: 'Automatisch gezicht bij beweging',
    humour: 'Humor (paaseieren)',
    language: 'Taal',
    profileCreationMode: 'Modus voor het maken van profielen',
    on: 'Op',
    off: 'Uit',
  },
  profiles: {
    none: 'Er zijn geen geanimeerde tokenprofielen geconfigureerd.',
    noProfile: 'Aan het geselecteerde token is geen profiel toegewezen.',
    id: 'Profiel-ID',
    displayName: 'Weergavenaam',
    mappedStates: 'In kaart gebrachte staten',
    noneValue: '(geen)',
    personal: 'persoonlijk',
    owner: 'Eigenaar',
    submittedBy: 'ingediend door',
    approveHint:
      'Gebruik !adam --profile goedkeuren &lt;id&gt; om goed te keuren of af te wijzen &lt;id&gt; om af te wijzen.',
  },
  menu: {
    title: 'ADAM. Controledek',
    movement: 'Beweging',
    facing: 'Geconfronteerd',
    state: 'Staat',
    stateLabel: 'Staat',
    facingLabel: 'Geconfronteerd',
    profileLabel: 'Profiel',
    noProfile: 'Geen profiel',
    help: 'Hulp',
    config: 'Configuratie',
    states: {
      idle: 'Inactief',
      combat: 'Gevecht',
      walk: 'Wandeling',
      dash: 'Streepje',
      sneak: 'Sluip',
      rage: 'Woede',
      spellcasting: 'Spreuken',
      help: 'Hulp',
    },
  },
  info: {
    subtitle: 'Geanimeerde richting en beweging',
    versionLabel: 'Versie',
    updatedLabel: 'Bijgewerkt',
    creditsBody:
      'A.D.A.M.<br>Geanimeerde regie en beweging<br><br>Mogelijk gemaakt door SIMON.<br>Zeker niet Simon genoemd.',
    ready: 'MOD KLAAR',
  },
  easter: {
    toTheLeft: 'Naar links, naar links...',
    notGoingAnywhere: 'ADAM. heeft vastgesteld dat je eigenlijk nergens heen gaat.',
    areWeThereYet: 'Zijn we er al?',
    sneakSpam: 'Niemand heeft je gezien.<br>Niemand heeft je gezien.<br>Niemand heeft je gezien.',
    helpSpam: 'Wie is een goede uil?',
    rageRage: 'Dorn zou het goedkeuren.',
    simonResponse: '...en noem mij geen Simon!',
    simonNoSays: 'Simon zegt wat?',
    versionEgg: 'ADAM. v{version}<br><br>Zeker niet SIMON.',
  },
};

export default TRANSLATION;
