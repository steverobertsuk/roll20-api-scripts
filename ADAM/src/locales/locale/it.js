const TRANSLATION = {
  titles: {
    error: 'Errore',
    noTokenSelected: 'Nessun token selezionato',
    tokenError: 'Errore token',
    missingDirection: 'Direzione mancante',
    invalidDirection: 'Direzione non valida',
    missingState: 'Stato mancante',
    invalidState: 'Stato non valido',
    missingAction: 'Azione mancante',
    invalidAction: 'Azione non valida',
    accessDenied: 'Accesso negato',
    invalidValue: 'Valore non valido',
    unknownCommand: 'Comando sconosciuto',
    moveError: 'Errore di spostamento',
    macroExists: 'La macro esiste',
    macroInstalled: 'Macro installata',
    invalidUsage: 'Utilizzo non valido',
    profileAssigned: 'Profilo assegnato',
    profileRemoved: 'Profilo rimosso',
    unknownProfile: 'Profilo sconosciuto',
    configuration: 'Configurazione',
    settingsReset: 'Ripristina impostazioni',
    scriptReady: 'Sceneggiatura pronta',
    versionInfo: 'Informazioni sulla versione',
    creditsTitle: 'Crediti',
    adamsMenu: 'ADAMO. Mazzo di controllo',
    adamsHelp: 'ADAMO. Aiuto',
    adamsSettings: 'ADAMO. Impostazioni',
    profiles: 'Profili configurati',
    tokenProfile: 'Profilo token',
    success: 'Successo',
    langSet: 'Impostazione della lingua',
    langInvalid: 'Lingua non valida',
    profileCreated: 'Profilo creato',
    profileUpdated: 'Profilo aggiornato',
    profileDeleted: 'Profilo eliminato',
    profileRenamed: 'Profilo rinominato',
    draftSubmitted: 'Bozza inviata',
    draftApproved: 'Bozza approvata',
    draftRejected: 'Bozza respinta',
    pendingDrafts: 'Bozze del profilo in sospeso',
    profileCreationMode: 'Modalità di creazione del profilo',
    draftNotification: 'Bozza del profilo in sospeso',
  },
  errors: {
    noTokenSelected:
      'Nessun token selezionato. Seleziona prima un token, quindi fai clic su un pulsante di direzione.',
    noTokenSelectedStill: 'Ancora nessun token selezionato.',
    noTokenSelectedPersistent: 'Ammiro la tua tenacia. Seleziona prima un token.',
    tokenNotFound: 'Impossibile trovare il token selezionato.',
    missingDirection:
      'Si prega di fornire una direzione. Esempio: <code>!adam --move n</code><br><em>Direzioni: n, ne, e, se, s, sw, w, nw</em>',
    invalidDirection:
      'Direzione sconosciuta: <strong>{value}</strong><br><br>Valido: n, ne, e, se, s, sw, w, nw (o nomi completi come nord, nord-est)',
    missingState: 'Fornisci uno stato.<br>Valido: {states}',
    invalidState: 'Stato sconosciuto: <strong>{value}</strong><br><br>Valido: {states}',
    missingAction: "Fornisci un'azione. Examples: help, spellcast, rage, dash, sneak, idle, combat",
    invalidAction:
      'Azione sconosciuta: <strong>{value}</strong><br><br>Azioni conosciute: {actions}',
    accessDeniedConfig: 'Le modifiche alla configurazione sono limitate al GM.',
    accessDeniedProfileAssign: "L'assegnazione del profilo è limitata al GM.",
    accessDeniedProfileRemove: 'La rimozione del profilo è limitata al GM.',
    accessDeniedMacro: "L'installazione delle macro è limitata al GM.",
    accessDeniedReset: 'Il ripristino delle impostazioni è limitato al GM.',
    unknownCommand:
      'Comando sconosciuto. Prova <code>!adam --help</code> per un elenco dei comandi disponibili.',
    moveFailed: 'Movimento fallito.',
    gridSizeInvalid:
      'La dimensione della griglia deve essere un numero intero compreso tra 10 e 1000 (pixel).',
    moveDistanceInvalid:
      'La distanza di spostamento deve essere un numero intero compreso tra 1 e 20 (quadrati).',
    autoFaceInvalid: 'Il valore facciale automatico deve essere: attivato o disattivato.',
    humourInvalid: "Il valore dell'umorismo deve essere: attivato o disattivato.",
    langInvalid: 'Impostazioni locali non valide. Supportato: {locales}',
    profileUsage:
      'Utilizzo: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
    profileAssignUsage: 'Utilizzo: <code>!adam --profile assegna &lt;profileId&gt;</code>',
    profileUnknown:
      'Il profilo <strong>{id}</strong> non esiste. Utilizza <code>!adam --profile list</code> per vedere i profili disponibili.',
    profileUnknownSub:
      'Sottocomando profilo sconosciuto: <strong>{sub}</strong><br><br>Valido: elenca, mostra, crea, modifica, rinomina, elimina, assegna, rimuovi, bozza, bozza, rivedi, approva, rifiuta',
    profileIdInvalid:
      'ID profilo non valido: <strong>{id}</strong>. Utilizza solo lettere, numeri, trattini e trattini bassi (massimo 50 caratteri).',
    profileAlreadyExists:
      'Il profilo <strong>{id}</strong> esiste già. Utilizza <code>!adam --profile edit-side</code> per modificarlo o eliminarlo prima.',
    profileNotFound: 'Profilo <strong>{id}</strong> non trovato.',
    profileCreateUsage:
      'Utilizzo: <code>!adam --profile crea &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileEditSideUsage:
      'Utilizzo: <code>!adam --profile edit-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileRenameUsage:
      'Utilizzo: <code>!adam --profile rinomina &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDeleteUsage: 'Utilizzo: <code>!adam --profile elimina &lt;profileId&gt;</code>',
    profileDraftUsage:
      'Utilizzo: <code>!adam --profile bozza &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDraftSideUsage:
      'Utilizzo: <code>!adam --profile draft-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileDraftNotFound:
      'Nessuna bozza in sospeso trovata per <strong>{id}</strong>. Inviane uno con la <code>!adam --profile bozza</code>.',
    profileGmOnly: 'La creazione del profilo è limitata al GM.',
    profileEditGmOnly: 'La modifica di questo profilo è riservata al GM.',
    profileDeleteGmOnly: "L'eliminazione di questo profilo è riservata al GM.",
    profileGlobalReadOnly:
      'Il profilo <strong>{id}</strong> è un profilo globale e può essere modificato solo dal GM.',
    profileNotOwned: 'Non possiedi il profilo <strong>{id}</strong> e non puoi modificarlo.',
    profileModeRequiresDraft:
      "La creazione del profilo richiede l'approvazione del GM in questo gioco. Utilizza <code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code> per inviare una bozza.",
    profileAssignNoControl: 'Puoi assegnare profili personali solo ai token che controlli.',
    profileAssignNotOwned:
      'Puoi assegnare i tuoi profili solo ai token che controlli. Il profilo <strong>{id}</strong> appartiene a un altro giocatore.',
    profileCreationModeInvalid:
      'Modalità di creazione del profilo non valida. Valido: solo gm, approvato gm, tutti gli utenti.',
    profileReviewGmOnly: 'Solo il GM può rivedere le bozze in sospeso.',
    profileApproveGmOnly: 'Solo il GM può approvare le bozze del profilo.',
    profileRejectGmOnly: 'Solo il GM può rifiutare le bozze del profilo.',
    invalidAnimSet: "Il set dell'animazione deve essere: nord o sud.",
    invalidSideNumber: 'Il numero laterale deve essere un numero intero positivo (1 o maggiore).',
    noDrafts: 'Nessuna bozza del profilo in sospeso.',
    profileDraftConflict:
      'Una bozza in sospeso per <strong>{id}</strong> esiste già e appartiene a un altro giocatore.',
    profileDraftNotGmApproved:
      'Le bozze inviate sono disponibili solo quando la modalità di creazione del profilo è <code>approvata da gm</code>.',
    profileApproveConflict:
      'Esiste già un profilo attivo denominato <strong>{id}</strong>. Eliminalo prima di approvare questa bozza.',
    macroExists: 'Esiste già una macro denominata "<strong>{name}</strong>".',
    simonUnknown:
      'Simon non sa come: <em>{command}</em><br><br>Prova: <code>!simon dice sposta n</code>',
  },
  confirm: {
    facing: '<strong>{token}</strong> ora affronta <strong>{direction}</strong>.',
    stateSet: 'Stato <strong>{token}</strong> impostato su <strong>{state}</strong>.',
    actionSet:
      '<strong>{token}</strong> azione: <strong>{action}</strong> → stato: <strong>{state}</strong>.',
    profileAssigned: 'Profilo <strong>{id}</strong> assegnato a <strong>{token}</strong>.',
    profileRemoved: 'Profilo rimosso da <strong>{token}</strong>.',
    profileCreated: 'Profilo <strong>{id}</strong> creato.',
    profileSideSet: 'Profilo <strong>{id}</strong>: {state}/{animSet} → lato {number}.',
    profileRenamed: 'Profilo <strong>{id}</strong> rinominato in <strong>{name}</strong>.',
    profileDeleted: 'Profilo <strong>{id}</strong> eliminato.',
    profileDraftSubmitted:
      "Bozza del profilo <strong>{id}</strong> inviata per l'approvazione del GM.",
    profileDraftApproved:
      'Bozza del profilo <strong>{id}</strong> approvata e aggiunta ai profili attivi.',
    profileDraftRejected: 'La bozza del profilo <strong>{id}</strong> è stata rifiutata.',
    macroInstalled:
      "La macro globale '<strong>{name}</strong>' è stata creata ed è visibile a tutti i giocatori.",
    configUpdated: 'Impostazioni aggiornate.',
    settingsReset: '<strong>Impostazioni ripristinate ai valori predefiniti di fabbrica.</strong>',
    langSet: 'Lingua impostata su {locale}.',
  },
  settings: {
    gridSize: 'Dimensione della griglia',
    gridSizeDesc: '{size}px per quadrato',
    moveDistance: 'Spostare la distanza',
    moveDistanceDesc: '{squares} quadrato/i — {pixels}px per mossa',
    autoFace: 'Volto automatico in movimento',
    humour: 'Umorismo (Uova di Pasqua)',
    language: 'Lingua',
    profileCreationMode: 'Modalità di creazione del profilo',
    on: 'SU',
    off: 'Spento',
  },
  profiles: {
    none: 'Nessun profilo token animato è configurato.',
    noProfile: 'Al token selezionato non è assegnato alcun profilo.',
    id: 'Identificativo del profilo',
    displayName: 'Nome da visualizzare',
    mappedStates: 'Stati mappati',
    noneValue: '(nessuno)',
    personal: 'personale',
    owner: 'Proprietario',
    submittedBy: 'presentato da',
    approveHint:
      'Utilizza !adam --profile approva &lt;id&gt; per approvare o rifiuta &lt;id&gt; per rifiutare.',
  },
  menu: {
    title: 'ADAMO. Mazzo di controllo',
    movement: 'Movimento',
    facing: 'Di fronte',
    state: 'Stato',
    stateLabel: 'Stato',
    facingLabel: 'Di fronte',
    profileLabel: 'Profilo',
    noProfile: 'Nessun profilo',
    help: 'Aiuto',
    config: 'Configurazione',
    states: {
      idle: 'Oziare',
      combat: 'Combattere',
      walk: 'Camminare',
      dash: 'Trattino',
      sneak: 'Sgattaiolare',
      rage: 'Rabbia',
      spellcasting: 'Incantesimi',
      help: 'Aiuto',
    },
  },
  info: {
    subtitle: 'Direzione e movimento animati',
    versionLabel: 'Versione',
    updatedLabel: 'Aggiornato',
    creditsBody:
      'A.D.A.M.<br>Direzione e movimento animati<br><br>Powered by SIMON.<br>Sicuramente non si chiama Simon.',
    ready: 'MODELLO PRONTO',
  },
  easter: {
    toTheLeft: 'A sinistra, a sinistra...',
    notGoingAnywhere: 'ADAMO. ha stabilito che in realtà non andrai da nessuna parte.',
    areWeThereYet: 'Siamo già arrivati?',
    sneakSpam: 'Nessuno ti ha visto.<br>Nessuno ti ha visto.<br>Nessuno ti ha visto.',
    helpSpam: 'Chi è un bravo gufo?',
    rageRage: 'Dorn approverebbe.',
    simonResponse: '...e non chiamarmi Simon!',
    simonNoSays: 'Simone cosa dice?',
    versionEgg: 'ADAMO. v{version}<br><br>Sicuramente non SIMON.',
  },
};

export default TRANSLATION;
