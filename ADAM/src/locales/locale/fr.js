const TRANSLATION = {
  titles: {
    error: 'Erreur',
    noTokenSelected: 'Aucun jeton sélectionné',
    tokenError: 'Erreur de jeton',
    missingDirection: 'Direction manquante',
    invalidDirection: 'Direction invalide',
    missingState: 'État manquant',
    invalidState: 'État invalide',
    missingAction: 'Action manquante',
    invalidAction: 'Action invalide',
    accessDenied: 'Accès refusé',
    invalidValue: 'Valeur invalide',
    unknownCommand: 'Commande inconnue',
    moveError: 'Erreur de déplacement',
    macroExists: 'La macro existe',
    macroInstalled: 'Macro installée',
    invalidUsage: 'Utilisation invalide',
    profileAssigned: 'Profil attribué',
    profileRemoved: 'Profil supprimé',
    unknownProfile: 'Profil inconnu',
    configuration: 'Configuration',
    settingsReset: 'Réinitialisation des paramètres',
    scriptReady: 'Prêt pour le script',
    versionInfo: 'Informations sur la version',
    creditsTitle: 'Crédits',
    adamsMenu: 'ADAM. Plate-forme de contrôle',
    adamsHelp: 'ADAM. Aide',
    adamsSettings: 'ADAM. Paramètres',
    profiles: 'Profils configurés',
    tokenProfile: 'Profil de jeton',
    success: 'Succès',
    langSet: 'Ensemble de langues',
    langInvalid: 'Langue invalide',
    profileCreated: 'Profil créé',
    profileUpdated: 'Profil mis à jour',
    profileDeleted: 'Profil supprimé',
    profileRenamed: 'Profil renommé',
    draftSubmitted: 'Projet soumis',
    draftApproved: 'Projet approuvé',
    draftRejected: 'Brouillon rejeté',
    pendingDrafts: 'Brouillons de profil en attente',
    profileCreationMode: 'Mode de création de profil',
    draftNotification: 'Brouillon de profil en attente',
  },
  errors: {
    noTokenSelected:
      "Aucun jeton sélectionné. Veuillez d'abord sélectionner un jeton, puis cliquer sur un bouton de direction.",
    noTokenSelectedStill: 'Toujours aucun jeton sélectionné.',
    noTokenSelectedPersistent: "J'admire votre persévérance. Sélectionnez d'abord un jeton.",
    tokenNotFound: 'Le jeton sélectionné est introuvable.',
    missingDirection:
      'Veuillez fournir une direction. Exemple : <code>!adam --move n</code><br><em>Directions : n, ne, e, se, s, sw, w, nw</em>',
    invalidDirection:
      'Direction inconnue : <strong>{value}</strong><br><br>Valide : n, ne, e, se, s, sw, w, nw (ou noms complets tels que nord, nord-est)',
    missingState: 'Veuillez indiquer un état.<br>Valide : {states}',
    invalidState: 'État inconnu : <strong>{value}</strong><br><br>Valide : {states}',
    missingAction:
      'Veuillez fournir une action. Exemples : aide, lancement de sorts, rage, sprint, furtivité, inactivité, combat',
    invalidAction: 'Action inconnue : <strong>{value}</strong><br><br>Actions connues : {actions}',
    accessDeniedConfig: 'Les modifications de configuration sont limitées au GM.',
    accessDeniedProfileAssign: "L'attribution de profil est limitée au directeur général.",
    accessDeniedProfileRemove: 'La suppression du profil est limitée au directeur général.',
    accessDeniedMacro: "L'installation de macros est réservée au GM.",
    accessDeniedReset: 'La réinitialisation des paramètres est limitée au GM.',
    unknownCommand:
      'Commande inconnue. Essayez <code>!adam --help</code> pour une liste des commandes disponibles.',
    moveFailed: 'Le mouvement a échoué.',
    gridSizeInvalid:
      'La taille de la grille doit être un nombre entier compris entre 10 et 1 000 (pixels).',
    moveDistanceInvalid:
      'La distance de déplacement doit être un nombre entier compris entre 1 et 20 (carrés).',
    autoFaceInvalid: 'La valeur du visage automatique doit être : activée ou désactivée.',
    humourInvalid: "La valeur de l'humour doit être : activée ou désactivée.",
    langInvalid: 'Paramètres régionaux non valides. Pris en charge : {locales}',
    profileUsage:
      'Utilisation : <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
    profileAssignUsage: 'Utilisation : <code>!adam --profile assigner &lt;profileId&gt;</code>',
    profileUnknown:
      "Le profil <strong>{id}</strong> n'existe pas. Utilisez la <code>!adam --profile list</code> pour voir les profils disponibles.",
    profileUnknownSub:
      'Sous-commande de profil inconnue : <strong>{sub}</strong><br><br>Valide : répertorier, afficher, créer, modifier, renommer, supprimer, attribuer, supprimer, brouillon, brouillon, réviser, approuver, rejeter',
    profileIdInvalid:
      "ID de profil invalide : <strong>{id}</strong>. Utilisez uniquement des lettres, des chiffres, des traits d'union et des traits de soulignement (50 caractères maximum).",
    profileAlreadyExists:
      "Le profil <strong>{id}</strong> existe déjà. Utilisez <code>!adam --profile edit-side</code> pour le modifier, ou supprimez-le d'abord.",
    profileNotFound: 'Profil <strong>{id}</strong> introuvable.',
    profileCreateUsage:
      'Utilisation : <code>!adam --profile créer &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileEditSideUsage:
      'Utilisation : <code>!adam --profile côté édition &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileRenameUsage:
      'Utilisation : <code>!adam --profile renommer &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDeleteUsage: 'Utilisation : <code>!adam --profile supprimer &lt;profileId&gt;</code>',
    profileDraftUsage:
      'Utilisation : <code>!adam --profile brouillon &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDraftSideUsage:
      'Utilisation : <code>!adam --profile côté brouillon &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileDraftNotFound:
      'Aucun brouillon en attente trouvé pour <strong>{id}</strong>. Soumettez-en un avec <code>!adam --profile brouillon</code>.',
    profileGmOnly: 'La création de profil est réservée au MJ.',
    profileEditGmOnly: 'La modification de ce profil est réservée au GM.',
    profileDeleteGmOnly: 'La suppression de ce profil est réservée au GM.',
    profileGlobalReadOnly:
      'Le profil <strong>{id}</strong> est un profil global et ne peut être modifié que par le MJ.',
    profileNotOwned:
      "Vous n'êtes pas propriétaire du profil <strong>{id}</strong> et ne pouvez pas le modifier.",
    profileModeRequiresDraft:
      "La création de profil nécessite l'approbation du directeur général dans ce jeu. Utilisez <code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code> pour soumettre un brouillon.",
    profileAssignNoControl:
      "Vous ne pouvez attribuer des profils personnels qu'aux jetons que vous contrôlez.",
    profileAssignNotOwned:
      "Vous ne pouvez attribuer vos propres profils qu'aux jetons que vous contrôlez. Le profil <strong>{id}</strong> appartient à un autre joueur.",
    profileCreationModeInvalid:
      'Mode de création de profil invalide. Valide : gm uniquement, approuvé par gm, tous les utilisateurs.',
    profileReviewGmOnly: 'Seul le MJ peut examiner les brouillons en attente.',
    profileApproveGmOnly: 'Seul le directeur général peut approuver les brouillons de profil.',
    profileRejectGmOnly: 'Seul le MJ peut rejeter les brouillons de profil.',
    invalidAnimSet: 'Le décor d’animation doit être : nord ou sud.',
    invalidSideNumber: 'Le numéro de côté doit être un entier positif (1 ou plus).',
    noDrafts: 'Aucun brouillon de profil en attente.',
    profileDraftConflict:
      'Un draft en attente pour <strong>{id}</strong> existe déjà et appartient à un autre joueur.',
    profileDraftNotGmApproved:
      'Les brouillons de soumissions ne sont disponibles que lorsque le mode de création de profil est <code>approuvé par gm</code>.',
    profileApproveConflict:
      'Un profil actif nommé <strong>{id}</strong> existe déjà. Supprimez-le avant d’approuver ce brouillon.',
    macroExists: 'Une macro nommée « <strong>{name}</strong> » existe déjà.',
    simonUnknown:
      'Simon ne sait pas comment : <em>{command}</em><br><br>Essayez : <code>! Simon dit de bouger n</code>',
  },
  confirm: {
    facing: '<strong>{token}</strong> fait désormais face à <strong>{direction}</strong>.',
    stateSet: "L'état <strong>{token}</strong> est défini sur <strong>{state}</strong>.",
    actionSet:
      '<strong>{token}</strong> action : <strong>{action}</strong> → état : <strong>{state}</strong>.',
    profileAssigned: 'Profil <strong>{id}</strong> attribué à <strong>{token}</strong>.',
    profileRemoved: 'Profil supprimé de <strong>{token}</strong>.',
    profileCreated: 'Profil <strong>{id}</strong> créé.',
    profileSideSet: 'Profil <strong>{id}</strong> : {state}/{animSet} → côté {number}.',
    profileRenamed: 'Profil <strong>{id}</strong> renommé <strong>{name}</strong>.',
    profileDeleted: 'Profil <strong>{id}</strong> supprimé.',
    profileDraftSubmitted:
      "Brouillon du profil <strong>{id}</strong> soumis à l'approbation du directeur général.",
    profileDraftApproved:
      'Brouillon de profil <strong>{id}</strong> approuvé et ajouté aux profils actifs.',
    profileDraftRejected: 'Le brouillon du profil <strong>{id}</strong> a été rejeté.',
    macroInstalled:
      "La macro globale '<strong>{name}</strong>' a été créée et est visible par tous les joueurs.",
    configUpdated: 'Paramètres mis à jour.',
    settingsReset: '<strong>Les paramètres sont réinitialisés aux valeurs par défaut.</strong>',
    langSet: 'Langue définie sur {locale}.',
  },
  settings: {
    gridSize: 'Taille de la grille',
    gridSizeDesc: '{size}px par carré',
    moveDistance: 'Distance de déplacement',
    moveDistanceDesc: '{squares} carré(s) — {pixels}px par coup',
    autoFace: 'Face automatique en déplacement',
    humour: 'Humour (œufs de Pâques)',
    language: 'Langue',
    profileCreationMode: 'Mode de création de profil',
    on: 'Sur',
    off: 'Désactivé',
  },
  profiles: {
    none: "Aucun profil de jeton animé n'est configuré.",
    noProfile: "Le jeton sélectionné n'a aucun profil attribué.",
    id: 'Identifiant du profil',
    displayName: "Nom d'affichage",
    mappedStates: 'États mappés',
    noneValue: '(aucun)',
    personal: 'personnel',
    owner: 'Propriétaire',
    submittedBy: 'soumis par',
    approveHint:
      'Utilisez !adam --profile approuver &lt;id&gt; pour approuver ou rejeter &lt;id&gt; pour rejeter.',
  },
  menu: {
    title: 'ADAM. Plate-forme de contrôle',
    movement: 'Mouvement',
    facing: 'Parement',
    state: 'État',
    stateLabel: 'État',
    facingLabel: 'Parement',
    profileLabel: 'Profil',
    noProfile: 'Aucun profil',
    help: 'Aide',
    config: 'Configuration',
    states: {
      idle: 'Inactif',
      combat: 'Combat',
      walk: 'Marcher',
      dash: 'Tiret',
      sneak: 'Mouchard',
      rage: 'Rage',
      spellcasting: 'Lancement de sorts',
      help: 'Aide',
    },
  },
  info: {
    subtitle: 'Direction et mouvement animés',
    versionLabel: 'Version',
    updatedLabel: 'Mis à jour',
    creditsBody:
      'A.D.A.M.<br>Direction et mouvement animés<br><br>Propulsé par SIMON.<br>Certainement pas appelé Simon.',
    ready: 'MODÈLE PRÊT',
  },
  easter: {
    toTheLeft: 'A gauche, à gauche...',
    notGoingAnywhere: 'ADAM. a déterminé que vous n’allez nulle part.',
    areWeThereYet: 'Sommes-nous déjà là ?',
    sneakSpam: 'Personne ne vous a vu.<br>Personne ne vous a vu.<br>Personne ne vous a vu.',
    helpSpam: 'Qui est un bon hibou ?',
    rageRage: 'Dorn approuverait.',
    simonResponse: "...et ne m'appelle pas Simon !",
    simonNoSays: 'Simon dit quoi ?',
    versionEgg: 'ADAM. v{version}<br><br>Certainement pas SIMON.',
  },
};

export default TRANSLATION;
