const TRANSLATION = {
  titles: {
    error: 'Error',
    noTokenSelected: "No s'ha seleccionat cap testimoni",
    tokenError: 'Error de testimoni',
    missingDirection: 'Falta direcció',
    invalidDirection: 'Direcció no vàlida',
    missingState: 'Estat desaparegut',
    invalidState: 'Estat no vàlid',
    missingAction: 'Falta acció',
    invalidAction: 'Acció no vàlida',
    accessDenied: 'Accés denegat',
    invalidValue: 'Valor no vàlid',
    unknownCommand: 'Comandament desconegut',
    moveError: 'Error de moviment',
    macroExists: 'La macro existeix',
    macroInstalled: 'Macro instal·lada',
    invalidUsage: 'Ús no vàlid',
    profileAssigned: 'Perfil assignat',
    profileRemoved: "S'ha eliminat el perfil",
    unknownProfile: 'Perfil desconegut',
    configuration: 'Configuració',
    settingsReset: 'Restableix la configuració',
    scriptReady: 'Guió llest',
    versionInfo: 'Informació de la versió',
    creditsTitle: 'Crèdits',
    adamsMenu: 'A.D.A.M. Coberta de control',
    adamsHelp: 'A.D.A.M. Ajuda',
    adamsSettings: 'A.D.A.M. Configuració',
    profiles: 'Perfils configurats',
    tokenProfile: 'Perfil de testimoni',
    success: 'Èxit',
    langSet: "Conjunt d'idiomes",
    langInvalid: 'Idioma no vàlid',
    profileCreated: 'Perfil creat',
    profileUpdated: 'Perfil actualitzat',
    profileDeleted: 'Perfil suprimit',
    profileRenamed: 'Perfil canviat de nom',
    draftSubmitted: 'Esborrany enviat',
    draftApproved: 'Esborrany aprovat',
    draftRejected: 'Esborrany rebutjat',
    pendingDrafts: 'Esborranys de perfil pendents',
    profileCreationMode: 'Mode de creació de perfils',
    draftNotification: 'Esborrany del perfil pendent',
  },
  errors: {
    noTokenSelected:
      "No s'ha seleccionat cap testimoni. Seleccioneu primer un testimoni i, a continuació, feu clic a un botó de direcció.",
    noTokenSelectedStill: "Encara no s'ha seleccionat cap testimoni.",
    noTokenSelectedPersistent: 'Admiro la teva persistència. Seleccioneu primer un testimoni.',
    tokenNotFound: "No s'ha pogut trobar el testimoni seleccionat.",
    missingDirection:
      'Si us plau, proporcioneu una direcció. Exemple: <code>!adam --move n</code><br><em>Indicacions: n, ne, e, se, s, sw, w, nw</em>',
    invalidDirection:
      'Direcció desconeguda: <strong>{value}</strong><br><br>Vàlid: n, ne, e, se, s, sw, w, nw (o noms complets com ara nord, nord-est)',
    missingState: 'Proporcioneu un estat.<br>Vàlid: {states}',
    invalidState: 'Estat desconegut: <strong>{value}</strong><br><br>Vàlid: {states}',
    missingAction:
      "Proporcioneu una acció. Exemples: ajuda, evocació d'encanteris, ràbia, guió, furtiva, ociosa, combat",
    invalidAction:
      'Acció desconeguda: <strong>{value}</strong><br><br>Accions conegudes: {actions}',
    accessDeniedConfig: 'Els canvis de configuració estan restringits al GM.',
    accessDeniedProfileAssign: "L'assignació del perfil està restringida al director general.",
    accessDeniedProfileRemove: "L'eliminació del perfil està restringida al GM.",
    accessDeniedMacro: 'La instal·lació de macros està restringida al GM.',
    accessDeniedReset: 'El restabliment de la configuració està restringit al GM.',
    unknownCommand:
      "Comandament desconegut. Proveu <code>!adam --help</code> per obtenir una llista d'ordres disponibles.",
    moveFailed: 'El moviment ha fallat.',
    gridSizeInvalid: 'La mida de la quadrícula ha de ser un nombre enter entre 10 i 1000 (píxels).',
    moveDistanceInvalid:
      'La distància de moviment ha de ser un nombre enter entre 1 i 20 (quadrats).',
    autoFaceInvalid: 'El valor facial automàtic ha de ser: activat o desactivat.',
    humourInvalid: "El valor de l'humor ha de ser: activat o desactivat.",
    langInvalid: 'Localització no vàlida. Admesos: {locales}',
    profileUsage:
      'Ús: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
    profileAssignUsage: 'Ús: <code>!adam --profile assignar &lt;profileId&gt;</code>',
    profileUnknown:
      'El perfil <strong>{id}</strong> no existeix. Utilitzeu <code>!adam --profile list</code> per veure els perfils disponibles.',
    profileUnknownSub:
      'Subordre de perfil desconeguda: <strong>{sub}</strong><br><br>Vàlid: llistar, mostrar, crear, editar, canviar el nom, suprimir, assignar, eliminar, esborrany, esborrany, revisar, aprovar, rebutjar',
    profileIdInvalid:
      'Identificador de perfil no vàlid: <strong>{id}</strong>. Utilitzeu només lletres, números, guions i guions baixos (màxim 50 caràcters).',
    profileAlreadyExists:
      "El perfil <strong>{id}</strong> ja existeix. Feu servir <code>!adam --profile al costat d'edició</code> per modificar-lo o suprimir-lo primer.",
    profileNotFound: "No s'ha trobat el perfil <strong>{id}</strong>.",
    profileCreateUsage:
      'Ús: <code>!adam --profile crea &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileEditSideUsage:
      "Ús: <code>!adam --profile al costat d'edició &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileRenameUsage:
      'Ús: <code>!adam --profile canviar el nom de &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDeleteUsage: 'Ús: <code>!adam --profile suprimeix &lt;profileId&gt;</code>',
    profileDraftUsage:
      'Ús: <code>!adam --profile esborrany &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDraftSideUsage:
      'Ús: <code>!adam --profile esborrany &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileDraftNotFound:
      "No s'ha trobat cap esborrany pendent per a <strong>{id}</strong>. Envieu-ne un amb <code>!adam --profile esborrany</code>.",
    profileGmOnly: 'La creació del perfil està restringida al GM.',
    profileEditGmOnly: "La modificació d'aquest perfil està restringida al GM.",
    profileDeleteGmOnly: "L'eliminació d'aquest perfil està restringida al GM.",
    profileGlobalReadOnly:
      'El perfil <strong>{id}</strong> és un perfil global i només el pot modificar el director general.',
    profileNotOwned: 'No sou propietari del perfil <strong>{id}</strong> i no el podeu modificar.',
    profileModeRequiresDraft:
      "La creació del perfil requereix l'aprovació del GM en aquest joc. Utilitzeu <code>!adam --profile esborrany &lt;id&gt; &lt;name&gt;</code> per enviar un esborrany.",
    profileAssignNoControl: 'Només podeu assignar perfils personals als fitxes que controleu.',
    profileAssignNotOwned:
      'Només podeu assignar els vostres propis perfils als fitxes que controleu. El perfil <strong>{id}</strong> pertany a un altre jugador.',
    profileCreationModeInvalid:
      'El mode de creació de perfil no és vàlid. Vàlid: només gm, aprovat per gm, tots els usuaris.',
    profileReviewGmOnly: 'Només el director general pot revisar els esborranys pendents.',
    profileApproveGmOnly: 'Només el director general pot aprovar els esborranys del perfil.',
    profileRejectGmOnly: 'Només el director general pot rebutjar els esborranys de perfil.',
    invalidAnimSet: "El conjunt d'animació ha de ser: nord o sud.",
    invalidSideNumber: 'El nombre del costat ha de ser un nombre enter positiu (1 o més).',
    noDrafts: 'No hi ha cap esborrany de perfil pendent.',
    profileDraftConflict:
      'Ja existeix un esborrany pendent per a <strong>{id}</strong> i pertany a un altre jugador.',
    profileDraftNotGmApproved:
      'Els esborranys enviats només estan disponibles quan el mode de creació de perfil està <code>aprovat per gm</code>.',
    profileApproveConflict:
      "Ja existeix un perfil actiu anomenat <strong>{id}</strong>. Suprimeix-lo primer abans d'aprovar aquest esborrany.",
    macroExists: 'Ja existeix una macro anomenada "<strong>{name}</strong>".',
    simonUnknown:
      'Simon no sap com: <em>{command}</em><br><br>Provar: <code>!Simon diu mou n</code>',
  },
  confirm: {
    facing: "<strong>{token}</strong> ara s'enfronta a <strong>{direction}</strong>.",
    stateSet: "L'estat <strong>{token}</strong> s'ha definit en <strong>{state}</strong>.",
    actionSet:
      '<strong>{token}</strong> acció: <strong>{action}</strong> → estat: <strong>{state}</strong>.',
    profileAssigned: 'Perfil <strong>{id}</strong> assignat a <strong>{token}</strong>.',
    profileRemoved: "S'ha eliminat el perfil de <strong>{token}</strong>.",
    profileCreated: "S'ha creat el perfil <strong>{id}</strong>.",
    profileSideSet: 'Perfil <strong>{id}</strong>: {state}/{animSet} → lateral {number}.',
    profileRenamed: 'Perfil <strong>{id}</strong> canviat de nom a <strong>{name}</strong>.',
    profileDeleted: "S'ha suprimit el perfil <strong>{id}</strong>.",
    profileDraftSubmitted:
      "Esborrany del perfil <strong>{id}</strong> enviat per a l'aprovació de GM.",
    profileDraftApproved:
      'Esborrany de perfil <strong>{id}</strong> aprovat i afegit als perfils actius.',
    profileDraftRejected: "S'ha rebutjat l'esborrany del perfil <strong>{id}</strong>.",
    macroInstalled:
      'La macro global "<strong>{name}</strong>" s\'ha creat i és visible per a tots els jugadors.',
    configUpdated: "S'ha actualitzat la configuració.",
    settingsReset:
      '<strong>La configuració es restableix als valors predeterminats de fàbrica.</strong>',
    langSet: "S'ha definit l'idioma a {locale}.",
  },
  settings: {
    gridSize: 'Mida de la graella',
    gridSizeDesc: '{size}px per quadrat',
    moveDistance: 'Move Distance',
    moveDistanceDesc: '{squares} quadrat(s) — {pixels}px per moviment',
    autoFace: 'Cara automàtica en moviment',
    humour: 'Humor (ous de Pasqua)',
    language: 'Llengua',
    profileCreationMode: 'Mode de creació de perfils',
    on: 'Encès',
    off: 'Apagat',
  },
  profiles: {
    none: "No s'ha configurat cap perfil de testimoni animat.",
    noProfile: 'El testimoni seleccionat no té cap perfil assignat.',
    id: 'ID del perfil',
    displayName: 'Nom de visualització',
    mappedStates: 'Estats cartografiats',
    noneValue: '(cap)',
    personal: 'personals',
    owner: 'Propietari',
    submittedBy: 'presentat per',
    approveHint:
      'Utilitzeu !adam --profile approve &lt;id&gt; per aprovar o rebutjar &lt;id&gt; per rebutjar.',
  },
  menu: {
    title: 'A.D.A.M. Coberta de control',
    movement: 'Moviment',
    facing: 'De cara',
    state: 'Estat',
    stateLabel: 'Estat',
    facingLabel: 'De cara',
    profileLabel: 'Perfil',
    noProfile: 'Sense perfil',
    help: 'Ajuda',
    config: 'Config',
    states: {
      idle: 'Inactiu',
      combat: 'Combat',
      walk: 'Caminar',
      dash: 'Dash',
      sneak: 'Colar',
      rage: 'ràbia',
      spellcasting: 'Encanteri',
      help: 'Ajuda',
    },
  },
  info: {
    subtitle: 'Direcció i moviment animats',
    versionLabel: 'Versió',
    updatedLabel: 'Actualitzat',
    creditsBody:
      'A.D.A.M.<br>Direcció i moviment animats<br><br>Impulsat per SIMON.<br>Definitivament, no es diu Simon.',
    ready: 'MOD LEST',
  },
  easter: {
    toTheLeft: "A l'esquerra, a l'esquerra...",
    notGoingAnywhere: 'A.D.A.M. ha determinat que en realitat no vas enlloc.',
    areWeThereYet: 'Ja hi som?',
    sneakSpam: "Ningú t'ha vist.<br>Ningú t'ha vist.<br>Ningú t'ha vist.",
    helpSpam: 'Qui és un bon mussol?',
    rageRage: 'Dorn ho aprovaria.',
    simonResponse: '...i no em digueu Simon!',
    simonNoSays: 'Simon què diu?',
    versionEgg: 'A.D.A.M. v{version}<br><br>Definitivament no SIMON.',
  },
};

export default TRANSLATION;
