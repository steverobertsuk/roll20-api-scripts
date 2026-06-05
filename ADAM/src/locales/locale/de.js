const TRANSLATION = {
  titles: {
    error: "Fehler",
    noTokenSelected: "Kein Token ausgewählt",
    tokenError: "Token-Fehler",
    missingDirection: "Fehlende Richtung",
    invalidDirection: "Ungültige Richtung",
    missingState: "Fehlender Staat",
    invalidState: "Ungültiger Status",
    missingAction: "Fehlende Aktion",
    invalidAction: "Ungültige Aktion",
    accessDenied: "Zugriff verweigert",
    invalidValue: "Ungültiger Wert",
    unknownCommand: "Unbekannter Befehl",
    moveError: "Fehler beim Verschieben",
    macroExists: "Makro vorhanden",
    macroInstalled: "Makro installiert",
    invalidUsage: "Ungültige Nutzung",
    profileAssigned: "Profil zugewiesen",
    profileRemoved: "Profil entfernt",
    unknownProfile: "Unbekanntes Profil",
    configuration: "Konfiguration",
    settingsReset: "Einstellungen zurücksetzen",
    scriptReady: "Skript bereit",
    versionInfo: "Versionsinformationen",
    creditsTitle: "Credits",
    adamsMenu: "ADAM. Kontrolldeck",
    adamsHelp: "ADAM. Helfen",
    adamsSettings: "ADAM. Einstellungen",
    profiles: "Konfigurierte Profile",
    tokenProfile: "Token-Profil",
    success: "Erfolg",
    langSet: "Sprachsatz",
    langInvalid: "Ungültige Sprache",
    profileCreated: "Profil erstellt",
    profileUpdated: "Profil aktualisiert",
    profileDeleted: "Profil gelöscht",
    profileRenamed: "Profil umbenannt",
    draftSubmitted: "Entwurf eingereicht",
    draftApproved: "Entwurf genehmigt",
    draftRejected: "Entwurf abgelehnt",
    pendingDrafts: "Ausstehende Profilentwürfe",
    profileCreationMode: "Profilerstellungsmodus",
    draftNotification: "Profilentwurf ausstehend",
  },
  errors: {
    noTokenSelected:
      "Kein Token ausgewählt. Bitte wählen Sie zuerst einen Token aus und klicken Sie dann auf eine Richtungsschaltfläche.",
    noTokenSelectedStill: "Immer noch kein Token ausgewählt.",
    noTokenSelectedPersistent:
      "Ich bewundere Ihre Beharrlichkeit. Wählen Sie zunächst einen Token aus.",
    tokenNotFound: "Der ausgewählte Token konnte nicht gefunden werden.",
    missingDirection:
      "Bitte geben Sie eine Richtung an. Beispiel: <code>!adam --move n</code><br><em>Richtungen: n, ne, e, se, s, sw, w, nw</em>",
    invalidDirection:
      "Unbekannte Richtung: <strong>{value}</strong><br><br>Gültig: n, ne, e, se, s, sw, w, nw (oder vollständige Namen wie Norden, Nordosten)",
    missingState: "Bitte geben Sie einen Bundesstaat an.<br>Gültig: {states}",
    invalidState:
      "Unbekannter Status: <strong>{value}</strong><br><br>Gültig: {states}",
    missingAction:
      "Bitte geben Sie eine Aktion an. Beispiele: Hilfe, Zauber, Wut, Sprint, Schleichen, Leerlauf, Kampf",
    invalidAction:
      "Unbekannte Aktion: <strong>{value}</strong><br><br>Bekannte Aktionen: {actions}",
    accessDeniedConfig: "Konfigurationsänderungen sind auf den GM beschränkt.",
    accessDeniedProfileAssign: "Die Profilvergabe ist auf den GM beschränkt.",
    accessDeniedProfileRemove:
      "Das Entfernen von Profilen ist auf den GM beschränkt.",
    accessDeniedMacro: "Die Makroinstallation ist auf den GM beschränkt.",
    accessDeniedReset:
      "Das Zurücksetzen der Einstellungen ist auf den GM beschränkt.",
    unknownCommand:
      "Unbekannter Befehl. Probieren Sie <code>!adam --help</code> aus, um eine Liste der verfügbaren Befehle zu erhalten.",
    moveFailed: "Die Bewegung ist gescheitert.",
    gridSizeInvalid:
      "Die Rastergröße muss eine Ganzzahl zwischen 10 und 1000 (Pixel) sein.",
    moveDistanceInvalid:
      "Die Bewegungsentfernung muss eine Ganzzahl zwischen 1 und 20 (Quadrate) sein.",
    autoFaceInvalid:
      "Der Wert für die automatische Schriftart muss aktiviert oder deaktiviert sein.",
    humourInvalid: "Der Humorwert muss sein: an oder aus.",
    langInvalid: "Ungültiges Gebietsschema. Unterstützt: {locales}",
    profileUsage:
      "Verwendung: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>",
    profileAssignUsage:
      "Verwendung: <code>!adam --profile zuweisen &lt;profileId&gt;</code>",
    profileUnknown:
      "Profil <strong>{id}</strong> existiert nicht. Verwenden Sie <code>!adam --profile list</code>, um verfügbare Profile anzuzeigen.",
    profileUnknownSub:
      "Unbekannter Profil-Unterbefehl: <strong>{sub}</strong><br><br>Gültig: Auflisten, Anzeigen, Erstellen, Bearbeitungsseite, Umbenennen, Löschen, Zuweisen, Entfernen, Entwurf, Entwurfsseite, Überprüfen, Genehmigen, Ablehnen",
    profileIdInvalid:
      "Ungültige Profil-ID: <strong>{id}</strong>. Verwenden Sie nur Buchstaben, Zahlen, Bindestriche und Unterstriche (maximal 50 Zeichen).",
    profileAlreadyExists:
      "Das Profil <strong>{id}</strong> existiert bereits. Verwenden Sie <code>!adam --profile edit-side</code>, um es zu ändern, oder löschen Sie es zuerst.",
    profileNotFound: "Profil <strong>{id}</strong> nicht gefunden.",
    profileCreateUsage:
      "Verwendung: <code>!adam --profile create &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileEditSideUsage:
      "Verwendung: <code>!adam --profile edit-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileRenameUsage:
      "Verwendung: <code>!adam --profile umbenennen &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDeleteUsage:
      "Verwendung: <code>!adam --profile delete &lt;profileId&gt;</code>",
    profileDraftUsage:
      "Verwendung: <code>!adam --profile Draft &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDraftSideUsage:
      "Verwendung: <code>!adam --profile entwurfsseitig &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileDraftNotFound:
      "Für <strong>{id}</strong> wurde kein ausstehender Entwurf gefunden. Senden Sie einen mit <code>!adam --profile Entwurf</code>.",
    profileGmOnly: "Die Profilerstellung ist auf den GM beschränkt.",
    profileEditGmOnly: "Das Ändern dieses Profils ist dem GM vorbehalten.",
    profileDeleteGmOnly:
      "Das Löschen dieses Profils ist auf den GM beschränkt.",
    profileGlobalReadOnly:
      "Profil <strong>{id}</strong> ist ein globales Profil und kann nur vom GM geändert werden.",
    profileNotOwned:
      "Sie besitzen das Profil <strong>{id}</strong> nicht und können es nicht ändern.",
    profileModeRequiresDraft:
      "Für die Profilerstellung ist in diesem Spiel die Genehmigung des GM erforderlich. Verwenden Sie <code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code>, um einen Entwurf einzureichen.",
    profileAssignNoControl:
      "Sie können nur Tokens, die Sie kontrollieren, persönliche Profile zuweisen.",
    profileAssignNotOwned:
      "Sie können Ihre eigenen Profile nur den von Ihnen kontrollierten Token zuweisen. Profil <strong>{id}</strong> gehört einem anderen Spieler.",
    profileCreationModeInvalid:
      "Ungültiger Profilerstellungsmodus. Gültig: nur für GM, von GM genehmigt, für alle Benutzer.",
    profileReviewGmOnly: "Nur der GM kann ausstehende Entwürfe überprüfen.",
    profileApproveGmOnly: "Nur der GM kann Profilentwürfe genehmigen.",
    profileRejectGmOnly: "Nur der GM kann Profilentwürfe ablehnen.",
    invalidAnimSet: "Der Animationssatz muss lauten: Norden oder Süden.",
    invalidSideNumber:
      "Die Seitenzahl muss eine positive Ganzzahl sein (1 oder größer).",
    noDrafts: "Keine ausstehenden Profilentwürfe.",
    profileDraftConflict:
      "Ein ausstehender Entwurf für <strong>{id}</strong> existiert bereits und gehört einem anderen Spieler.",
    profileDraftNotGmApproved:
      "Entwurfseinreichungen sind nur verfügbar, wenn der Profilerstellungsmodus <code>gm-approved</code> ist.",
    profileApproveConflict:
      "Ein aktives Profil mit dem Namen <strong>{id}</strong> ist bereits vorhanden. Löschen Sie es zuerst, bevor Sie diesen Entwurf genehmigen.",
    macroExists:
      "Ein Makro mit dem Namen „<strong>{name}</strong>“ ist bereits vorhanden.",
    simonUnknown:
      "Simon weiß nicht, wie man: <em>{command}</em><br><br>Versuchen Sie: <code>!simon sagt „Verschieben n“</code>",
  },
  confirm: {
    facing:
      "<strong>{token}</strong> steht nun <strong>{direction}</strong> gegenüber.",
    stateSet:
      "Der Status von <strong>{token}</strong> ist auf <strong>{state}</strong> festgelegt.",
    actionSet:
      "<strong>{token}</strong> Aktion: <strong>{action}</strong> → Status: <strong>{state}</strong>.",
    profileAssigned:
      "Profil <strong>{id}</strong> ist <strong>{token}</strong> zugewiesen.",
    profileRemoved: "Profil aus <strong>{token}</strong> entfernt.",
    profileCreated: "Profil <strong>{id}</strong> erstellt.",
    profileSideSet:
      "Profil <strong>{id}</strong>: {state}/{animSet} → Seite {number}.",
    profileRenamed:
      "Profil <strong>{id}</strong> wurde in <strong>{name}</strong> umbenannt.",
    profileDeleted: "Profil <strong>{id}</strong> gelöscht.",
    profileDraftSubmitted:
      "Entwurf für Profil <strong>{id}</strong> zur GM-Genehmigung eingereicht.",
    profileDraftApproved:
      "Profilentwurf <strong>{id}</strong> genehmigt und zu aktiven Profilen hinzugefügt.",
    profileDraftRejected:
      "Der Profilentwurf <strong>{id}</strong> wurde abgelehnt.",
    macroInstalled:
      "Das globale Makro „<strong>{name}</strong>“ wurde erstellt und ist für alle Spieler sichtbar.",
    configUpdated: "Einstellungen aktualisiert.",
    settingsReset:
      "<strong>Einstellungen auf Werkseinstellungen zurückgesetzt.</strong>",
    langSet: "Die Sprache ist auf {locale} festgelegt.",
  },
  settings: {
    gridSize: "Rastergröße",
    gridSizeDesc: "{size}px pro Quadrat",
    moveDistance: "Distanz verschieben",
    moveDistanceDesc: "{squares} Quadrat(e) – {pixels}px pro Zug",
    autoFace: "Auto-Face bei Bewegung",
    humour: "Humor (Ostereier)",
    language: "Sprache",
    profileCreationMode: "Profilerstellungsmodus",
    on: "An",
    off: "Aus",
  },
  profiles: {
    none: "Es sind keine animierten Tokenprofile konfiguriert.",
    noProfile: "Dem ausgewählten Token ist kein Profil zugewiesen.",
    id: "Profil-ID",
    displayName: "Anzeigename",
    mappedStates: "Kartierte Staaten",
    noneValue: "(keiner)",
    personal: "persönlich",
    owner: "Eigentümer",
    submittedBy: "eingereicht von",
    approveHint:
      "Verwenden Sie !adam --profile genehmigen &lt;id&gt; zum Genehmigen oder ablehnen &lt;id&gt; zum Ablehnen.",
  },
  menu: {
    title: "ADAM. Kontrolldeck",
    movement: "Bewegung",
    facing: "Gegenüber",
    state: "Zustand",
    stateLabel: "Zustand",
    facingLabel: "Gegenüber",
    profileLabel: "Profil",
    noProfile: "Kein Profil",
    help: "Helfen",
    config: "Konfig",
    states: {
      idle: "Leerlauf",
      combat: "Kampf",
      walk: "Gehen",
      dash: "Bindestrich",
      sneak: "Schleichen",
      rage: "Wut",
      spellcasting: "Zauberspruch",
      help: "Helfen",
    },
  },
  info: {
    subtitle: "Animierte Richtung und Bewegung",
    versionLabel: "Version",
    updatedLabel: "Aktualisiert",
    creditsBody:
      "A.D.A.M.<br>Animierte Richtung und Bewegung<br><br>Unterstützt von SIMON.<br>Auf jeden Fall nicht Simon genannt.",
    ready: "MOD BEREIT",
  },
  easter: {
    toTheLeft: "Nach links, nach links...",
    notGoingAnywhere:
      "ADAM. hat festgestellt, dass Sie eigentlich nirgendwo hingehen.",
    areWeThereYet: "Sind wir schon da?",
    sneakSpam:
      "Niemand hat dich gesehen.<br>Niemand hat dich gesehen.<br>Niemand hat dich gesehen.",
    helpSpam: "Wer ist eine gute Eule?",
    rageRage: "Dorn würde zustimmen.",
    simonResponse: "...und nenn mich nicht Simon!",
    simonNoSays: "Simon sagt was?",
    versionEgg: "ADAM. v{version}<br><br>Definitiv nicht SIMON.",
  },
};

export default TRANSLATION;
