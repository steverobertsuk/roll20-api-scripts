const TRANSLATION = {
  titles: {
    error: 'Error',
    noTokenSelected: 'Ningún token seleccionado',
    tokenError: 'Error de token',
    missingDirection: 'dirección perdida',
    invalidDirection: 'Dirección no válida',
    missingState: 'Estado desaparecido',
    invalidState: 'Estado no válido',
    missingAction: 'Acción faltante',
    invalidAction: 'Acción no válida',
    accessDenied: 'Acceso denegado',
    invalidValue: 'Valor no válido',
    unknownCommand: 'Comando desconocido',
    moveError: 'Error de movimiento',
    macroExists: 'La macro existe',
    macroInstalled: 'Macro instalada',
    invalidUsage: 'Uso no válido',
    profileAssigned: 'Perfil asignado',
    profileRemoved: 'Perfil eliminado',
    unknownProfile: 'Perfil desconocido',
    configuration: 'Configuración',
    settingsReset: 'Restablecer configuración',
    scriptReady: 'Guión listo',
    versionInfo: 'Información de versión',
    creditsTitle: 'Créditos',
    adamsMenu: 'ADÁN. Plataforma de control',
    adamsHelp: 'ADÁN. Ayuda',
    adamsSettings: 'ADÁN. Ajustes',
    profiles: 'Perfiles configurados',
    tokenProfile: 'Perfil de token',
    success: 'Éxito',
    langSet: 'Conjunto de idiomas',
    langInvalid: 'Idioma no válido',
    profileCreated: 'Perfil creado',
    profileUpdated: 'Perfil actualizado',
    profileDeleted: 'Perfil eliminado',
    profileRenamed: 'Perfil renombrado',
    draftSubmitted: 'Borrador enviado',
    draftApproved: 'Borrador aprobado',
    draftRejected: 'Borrador rechazado',
    pendingDrafts: 'Borradores de perfil pendientes',
    profileCreationMode: 'Modo de creación de perfil',
    draftNotification: 'Borrador de perfil pendiente',
  },
  errors: {
    noTokenSelected:
      'No se seleccionó ningún token. Primero seleccione un token y luego haga clic en un botón de dirección.',
    noTokenSelectedStill: 'Aún no se ha seleccionado ningún token.',
    noTokenSelectedPersistent: 'Admiro tu persistencia. Seleccione un token primero.',
    tokenNotFound: 'No se pudo encontrar el token seleccionado.',
    missingDirection:
      'Por favor proporcione una dirección. Ejemplo: <code>!adam --move n</code><br><em>Direcciones: n, ne, e, se, s, sw, w, nw</em>',
    invalidDirection:
      'Dirección desconocida: <strong>{value}</strong><br><br>Válido: n, ne, e, se, s, sw, w, nw (o nombres completos como norte, noreste)',
    missingState: 'Proporcione un estado.<br>Válido: {states}',
    invalidState: 'Estado desconocido: <strong>{value}</strong><br><br>Válido: {states}',
    missingAction:
      'Por favor proporcione una acción. Ejemplos: ayuda, lanzamiento de hechizos, rabia, carrera, sigilo, inactivo, combate',
    invalidAction:
      'Acción desconocida: <strong>{value}</strong><br><br>Acciones conocidas: {actions}',
    accessDeniedConfig: 'Los cambios de configuración están restringidos al GM.',
    accessDeniedProfileAssign: 'La asignación de perfil está restringida al GM.',
    accessDeniedProfileRemove: 'La eliminación de perfiles está restringida al GM.',
    accessDeniedMacro: 'La instalación de macros está restringida al GM.',
    accessDeniedReset: 'El restablecimiento de la configuración está restringido al GM.',
    unknownCommand:
      'Comando desconocido. Pruebe <code>!adam --help</code> para obtener una lista de comandos disponibles.',
    moveFailed: 'El movimiento fracasó.',
    gridSizeInvalid:
      'El tamaño de la cuadrícula debe ser un número entero entre 10 y 1000 (píxeles).',
    moveDistanceInvalid:
      'La distancia de movimiento debe ser un número entero entre 1 y 20 (cuadrados).',
    autoFaceInvalid: 'El valor nominal automático debe estar: activado o desactivado.',
    humourInvalid: 'El valor del humor debe estar: activado o desactivado.',
    langInvalid: 'Configuración regional no válida. Compatible: {locales}',
    profileUsage:
      'Uso: <código>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</código>',
    profileAssignUsage: 'Uso: <code>!adam --profile asignar &lt;profileId&gt;</code>',
    profileUnknown:
      'El perfil <strong>{id}</strong> no existe. Utilice <code>!adam --profile list</code> para ver los perfiles disponibles.',
    profileUnknownSub:
      'Subcomando de perfil desconocido: <strong>{sub}</strong><br><br>Válido: enumerar, mostrar, crear, editar, renombrar, eliminar, asignar, eliminar, borrador, borrador, revisar, aprobar, rechazar',
    profileIdInvalid:
      'ID de perfil no válido: <strong>{id}</strong>. Utilice únicamente letras, números, guiones y guiones bajos (máximo 50 caracteres).',
    profileAlreadyExists:
      'El perfil <strong>{id}</strong> ya existe. Utilice <code>!adam --profile edit-side</code> para modificarlo o eliminarlo primero.',
    profileNotFound: 'Perfil <strong>{id}</strong> no encontrado.',
    profileCreateUsage:
      'Uso: <código>!adam --profile crear &lt;profileId&gt; &lt;displayName&gt;</código>',
    profileEditSideUsage:
      'Uso: <code>!adam --profile lado de edición &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileRenameUsage:
      'Uso: <code>!adam --profile renombrar &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDeleteUsage: 'Uso: <code>!adam --profile eliminar &lt;profileId&gt;</code>',
    profileDraftUsage:
      'Uso: <code>!adam --profile borrador &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDraftSideUsage:
      'Uso: <code>!adam --profile lado del borrador &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileDraftNotFound:
      'No se encontró ningún borrador pendiente para <strong>{id}</strong>. Envíe uno con <code>!adam --profile borrador</code>.',
    profileGmOnly: 'La creación de perfiles está restringida al GM.',
    profileEditGmOnly: 'La modificación de este perfil está restringida al DJ.',
    profileDeleteGmOnly: 'La eliminación de este perfil está restringida al GM.',
    profileGlobalReadOnly:
      'El perfil <strong>{id}</strong> es un perfil global y solo puede ser modificado por el DJ.',
    profileNotOwned:
      'No eres propietario del perfil <strong>{id}</strong> y no puedes modificarlo.',
    profileModeRequiresDraft:
      'La creación de perfiles requiere la aprobación del GM en este juego. Utilice <code>!adam --profile borrador &lt;id&gt; &lt;name&gt;</code> para enviar un borrador.',
    profileAssignNoControl: 'Solo puedes asignar perfiles personales a los tokens que controlas.',
    profileAssignNotOwned:
      'Solo puedes asignar tus propios perfiles a los tokens que controlas. El perfil <strong>{id}</strong> pertenece a otro jugador.',
    profileCreationModeInvalid:
      'Modo de creación de perfil no válido. Válido: solo para GM, aprobado para GM, para todos los usuarios.',
    profileReviewGmOnly: 'Sólo el DJ puede revisar los borradores pendientes.',
    profileApproveGmOnly: 'Sólo el DJ puede aprobar borradores de perfil.',
    profileRejectGmOnly: 'Sólo el DJ puede rechazar borradores de perfil.',
    invalidAnimSet: 'El conjunto de animación debe ser: norte o sur.',
    invalidSideNumber: 'El número lateral debe ser un número entero positivo (1 o mayor).',
    noDrafts: 'No hay borradores de perfil pendientes.',
    profileDraftConflict:
      'Ya existe un borrador pendiente para <strong>{id}</strong> y pertenece a otro jugador.',
    profileDraftNotGmApproved:
      'Los borradores solo están disponibles cuando el modo de creación de perfil está <code>aprobado por gm</code>.',
    profileApproveConflict:
      'Ya existe un perfil activo llamado <strong>{id}</strong>. Bórrelo primero antes de aprobar este borrador.',
    macroExists: "Ya existe una macro denominada '<strong>{name}</strong>'.",
    simonUnknown:
      'Simon no sabe cómo: <em>{command}</em><br><br>Intenta: <code>!simon dice mover n</code>',
  },
  confirm: {
    facing: '<strong>{token}</strong> ahora se enfrenta a <strong>{direction}</strong>.',
    stateSet: 'Estado <strong>{token}</strong> establecido en <strong>{state}</strong>.',
    actionSet:
      '<strong>{token}</strong> acción: <strong>{action}</strong> → estado: <strong>{state}</strong>.',
    profileAssigned: 'Perfil <strong>{id}</strong> asignado a <strong>{token}</strong>.',
    profileRemoved: 'Perfil eliminado de <strong>{token}</strong>.',
    profileCreated: 'Perfil <strong>{id}</strong> creado.',
    profileSideSet: 'Perfil <strong>{id}</strong>: {state}/{animSet} → lado {number}.',
    profileRenamed: 'Perfil <strong>{id}</strong> renombrado a <strong>{name}</strong>.',
    profileDeleted: 'Perfil <strong>{id}</strong> eliminado.',
    profileDraftSubmitted:
      'Borrador del perfil <strong>{id}</strong> enviado para la aprobación del GM.',
    profileDraftApproved:
      'Borrador de perfil <strong>{id}</strong> aprobado y agregado a los perfiles activos.',
    profileDraftRejected: 'El borrador del perfil <strong>{id}</strong> ha sido rechazado.',
    macroInstalled:
      "Se ha creado la macro global '<strong>{name}</strong>' y es visible para todos los jugadores.",
    configUpdated: 'Configuración actualizada.',
    settingsReset:
      '<strong>La configuración se restablece a los valores predeterminados de fábrica.</strong>',
    langSet: 'Idioma establecido en {locale}.',
  },
  settings: {
    gridSize: 'Tamaño de cuadrícula',
    gridSizeDesc: '{size}px por cuadrado',
    moveDistance: 'Mover distancia',
    moveDistanceDesc: '{squares} cuadrado(s) — {pixels}px por movimiento',
    autoFace: 'Cara automática en movimiento',
    humour: 'Humor (huevos de Pascua)',
    language: 'Idioma',
    profileCreationMode: 'Modo de creación de perfil',
    on: 'En',
    off: 'Apagado',
  },
  profiles: {
    none: 'No se configuran perfiles de tokens animados.',
    noProfile: 'El token seleccionado no tiene ningún perfil asignado.',
    id: 'ID de perfil',
    displayName: 'Nombre para mostrar',
    mappedStates: 'Estados mapeados',
    noneValue: '(ninguno)',
    personal: 'personal',
    owner: 'Dueño',
    submittedBy: 'presentado por',
    approveHint:
      'Utilice !adam --profile aprobar &lt;id&gt; para aprobar o rechazar &lt;id&gt; para rechazar.',
  },
  menu: {
    title: 'ADÁN. Plataforma de control',
    movement: 'Movimiento',
    facing: 'Frente a',
    state: 'Estado',
    stateLabel: 'Estado',
    facingLabel: 'Frente a',
    profileLabel: 'Perfil',
    noProfile: 'Sin perfil',
    help: 'Ayuda',
    config: 'configuración',
    states: {
      idle: 'Inactivo',
      combat: 'Combatir',
      walk: 'Caminar',
      dash: 'Estrellarse',
      sneak: 'Furtivo',
      rage: 'Furia',
      spellcasting: 'Lanzamiento de hechizos',
      help: 'Ayuda',
    },
  },
  info: {
    subtitle: 'Dirección y movimiento animados.',
    versionLabel: 'Versión',
    updatedLabel: 'Actualizado',
    creditsBody:
      'A.D.A.M.<br>Dirección y movimiento animados<br><br>Desarrollado por SIMON.<br>Definitivamente no se llama Simon.',
    ready: 'MODO LISTO',
  },
  easter: {
    toTheLeft: 'A la izquierda, a la izquierda...',
    notGoingAnywhere: 'ADÁN. ha determinado que en realidad no irás a ninguna parte.',
    areWeThereYet: '¿Ya llegamos?',
    sneakSpam: 'Nadie te ha visto.<br>Nadie te ha visto.<br>Nadie te ha visto.',
    helpSpam: '¿Quién es un buen búho?',
    rageRage: 'Dorn lo aprobaría.',
    simonResponse: '...¡y no me llames Simón!',
    simonNoSays: '¿Simón dice qué?',
    versionEgg: 'ADÁN. v{version}<br><br>Definitivamente no SIMON.',
  },
};

export default TRANSLATION;
