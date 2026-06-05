const TRANSLATION = {
  titles: {
    error: 'Fel',
    noTokenSelected: 'Ingen token har valts',
    tokenError: 'Tokenfel',
    missingDirection: 'Saknar riktning',
    invalidDirection: 'Ogiltig riktning',
    missingState: 'Saknad stat',
    invalidState: 'Ogiltig stat',
    missingAction: 'Saknad åtgärd',
    invalidAction: 'Ogiltig åtgärd',
    accessDenied: 'Åtkomst nekad',
    invalidValue: 'Ogiltigt värde',
    unknownCommand: 'Okänt kommando',
    moveError: 'Flytta fel',
    macroExists: 'Makro finns',
    macroInstalled: 'Makro installerat',
    invalidUsage: 'Ogiltig användning',
    profileAssigned: 'Profil tilldelad',
    profileRemoved: 'Profil borttagen',
    unknownProfile: 'Okänd profil',
    configuration: 'Konfiguration',
    settingsReset: 'Inställningar Återställ',
    scriptReady: 'Manus redo',
    versionInfo: 'Version info',
    creditsTitle: 'Krediter',
    adamsMenu: 'A.D.A.M. Kontrolldäck',
    adamsHelp: 'A.D.A.M. Hjälp',
    adamsSettings: 'A.D.A.M. Inställningar',
    profiles: 'Konfigurerade profiler',
    tokenProfile: 'Token-profil',
    success: 'Framgång',
    langSet: 'Språkinställning',
    langInvalid: 'Ogiltigt språk',
    profileCreated: 'Profil skapad',
    profileUpdated: 'Profilen uppdaterad',
    profileDeleted: 'Profilen raderad',
    profileRenamed: 'Profil Bytt namn',
    draftSubmitted: 'Utkast inlämnat',
    draftApproved: 'Utkast godkänt',
    draftRejected: 'Utkastet avvisats',
    pendingDrafts: 'Väntande profilutkast',
    profileCreationMode: 'Skapa profilläge',
    draftNotification: 'Profilutkast väntar',
  },
  errors: {
    noTokenSelected:
      'Ingen token har valts. Välj först en token och klicka sedan på en riktningsknapp.',
    noTokenSelectedStill: 'Fortfarande ingen token vald.',
    noTokenSelectedPersistent: 'Jag beundrar din uthållighet. Välj en token först.',
    tokenNotFound: 'Det gick inte att hitta den valda token.',
    missingDirection:
      'Vänligen ange en riktning. Exempel: <code>!adam --move n</code><br><em>Vägbeskrivning: n, ne, e, se, s, sw, w, nw</em>',
    invalidDirection:
      'Okänd riktning: <strong>{value}</strong><br><br>Giltigt: n, ne, e, se, s, sw, w, nw (eller fullständiga namn som north, northeast)',
    missingState: 'Ange ett tillstånd.<br>Giltigt: {states}',
    invalidState: 'Okänd status: <strong>{value}</strong><br><br>Giltigt: {states}',
    missingAction: 'Ange en åtgärd. Exempel: hjälp, spellcast, rage, dash, smyga, tomgång, strid',
    invalidAction: 'Okänd åtgärd: <strong>{value}</strong><br><br>Kända åtgärder: {actions}',
    accessDeniedConfig: 'Konfigurationsändringar är begränsade till GM.',
    accessDeniedProfileAssign: 'Profiltilldelning är begränsad till GM.',
    accessDeniedProfileRemove: 'Borttagning av profil är begränsad till GM.',
    accessDeniedMacro: 'Makroinstallation är begränsad till GM.',
    accessDeniedReset: 'Återställning av inställningar är begränsad till GM.',
    unknownCommand:
      'Okänt kommando. Försök med <code>!adam --help</code> för en lista över tillgängliga kommandon.',
    moveFailed: 'Rörelsen misslyckades.',
    gridSizeInvalid: 'Rutnätsstorleken måste vara ett heltal mellan 10 och 1000 (pixlar).',
    moveDistanceInvalid: 'Flyttavstånd måste vara ett heltal mellan 1 och 20 (kvadrat).',
    autoFaceInvalid: 'Automatiskt ansiktsvärde måste vara: på eller av.',
    humourInvalid: 'Humorvärdet måste vara: på eller av.',
    langInvalid: 'Ogiltigt språk. Stöds: {locales}',
    profileUsage:
      'Användning: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
    profileAssignUsage: 'Användning: <code>!adam --profile tilldela &lt;profileId&gt;</code>',
    profileUnknown:
      'Profilen <strong>{id}</strong> finns inte. Använd <code>!adam --profile lista</code> för att se tillgängliga profiler.',
    profileUnknownSub:
      'Okänd profilunderkommando: <strong>{sub}</strong><br><br>Giltigt: lista, visa, skapa, redigera-sida, byt namn på, ta bort, tilldela, ta bort, utkast, utkast-sida, granska, godkänn, avvisa',
    profileIdInvalid:
      'Ogiltigt profil-ID: <strong>{id}</strong>. Använd endast bokstäver, siffror, bindestreck och understreck (max 50 tecken).',
    profileAlreadyExists:
      'Profilen <strong>{id}</strong> finns redan. Använd <code>!adam --profile edit-side</code> för att ändra den, eller ta bort den först.',
    profileNotFound: 'Profilen <strong>{id}</strong> hittades inte.',
    profileCreateUsage:
      'Användning: <code>!adam --profile skapa &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileEditSideUsage:
      'Användning: <code>!adam --profile redigeringssida &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileRenameUsage:
      'Användning: <code>!adam --profile byt namn på &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDeleteUsage: 'Användning: <code>!adam --profile radera &lt;profileId&gt;</code>',
    profileDraftUsage:
      'Användning: <code>!adam --profile utkast &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDraftSideUsage:
      'Användning: <code>!adam --profile draft-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileDraftNotFound:
      'Inget väntande utkast hittades för <strong>{id}</strong>. Skicka in en med <code>!adam --profile utkast</code>.',
    profileGmOnly: 'Skapandet av profil är begränsat till GM.',
    profileEditGmOnly: 'Ändring av denna profil är begränsad till GM.',
    profileDeleteGmOnly: 'Att ta bort denna profil är begränsat till GM.',
    profileGlobalReadOnly:
      'Profilen <strong>{id}</strong> är en global profil och kan endast ändras av GM.',
    profileNotOwned: 'Du äger inte profilen <strong>{id}</strong> och kan inte ändra den.',
    profileModeRequiresDraft:
      'Skapande av profil kräver GM-godkännande i det här spelet. Använd <code>!adam --profile utkast &lt;id&gt; &lt;name&gt;</code> för att skicka ett utkast.',
    profileAssignNoControl:
      'Du kan bara tilldela personliga profiler till tokens som du kontrollerar.',
    profileAssignNotOwned:
      'Du kan bara tilldela dina egna profiler till tokens du kontrollerar. Profilen <strong>{id}</strong> tillhör en annan spelare.',
    profileCreationModeInvalid:
      'Ogiltigt läge för att skapa profil. Giltigt: endast gm, gm-godkänd, alla användare.',
    profileReviewGmOnly: 'Endast GM kan granska väntande utkast.',
    profileApproveGmOnly: 'Endast GM kan godkänna profilutkast.',
    profileRejectGmOnly: 'Endast GM kan avvisa profilutkast.',
    invalidAnimSet: 'Animationsuppsättningen måste vara: norr eller söder.',
    invalidSideNumber: 'Sidnummer måste vara ett positivt heltal (1 eller högre).',
    noDrafts: 'Inga väntande profilutkast.',
    profileDraftConflict:
      'A pending draft for <strong>{id}</strong> already exists and belongs to another player.',
    profileDraftNotGmApproved:
      'Inlämningar av utkast är endast tillgängliga när läget för att skapa profil är <code>gm-godkänt</code>.',
    profileApproveConflict:
      'En aktiv profil med namnet <strong>{id}</strong> finns redan. Ta bort det först innan du godkänner det här utkastet.',
    macroExists: "Ett makro med namnet '<strong>{name}</strong>' finns redan.",
    simonUnknown:
      'Simon vet inte hur man: <em>{command}</em><br><br>Prova: <code>!simon säger flytta n</code>',
  },
  confirm: {
    facing: '<strong>{token}</strong> står nu inför <strong>{direction}</strong>.',
    stateSet: '<strong>{token}</strong> tillstånd inställt på <strong>{state}</strong>.',
    actionSet:
      '<strong>{token}</strong> åtgärd: <strong>{action}</strong> → ange: <strong>{state}</strong>.',
    profileAssigned: 'Profil <strong>{id}</strong> tilldelad <strong>{token}</strong>.',
    profileRemoved: 'Profilen har tagits bort från <strong>{token}</strong>.',
    profileCreated: 'Profilen <strong>{id}</strong> har skapats.',
    profileSideSet: 'Profil <strong>{id}</strong>: {state}/{animSet} → sida {number}.',
    profileRenamed: 'Profilen <strong>{id}</strong> har bytt namn till <strong>{name}</strong>.',
    profileDeleted: 'Profilen <strong>{id}</strong> har tagits bort.',
    profileDraftSubmitted:
      'Utkast till profilen <strong>{id}</strong> har skickats in för GM-godkännande.',
    profileDraftApproved:
      'Profilutkast <strong>{id}</strong> har godkänts och lagts till i aktiva profiler.',
    profileDraftRejected: 'Profilutkast <strong>{id}</strong> har avvisats.',
    macroInstalled:
      'Det globala makrot "<strong>{name}</strong>" har skapats och är synligt för alla spelare.',
    configUpdated: 'Inställningar uppdaterade.',
    settingsReset: '<strong>Inställningarna har återställts till fabriksinställningarna.</strong>',
    langSet: 'Språket är inställt på {locale}.',
  },
  settings: {
    gridSize: 'Rutnätsstorlek',
    gridSizeDesc: '{size}px per kvadrat',
    moveDistance: 'Flytta avstånd',
    moveDistanceDesc: '{squares} kvadrat(ar) — {pixels}px per drag',
    autoFace: 'Auto-ansikte i rörelse',
    humour: 'Humor (påskägg)',
    language: 'Språk',
    profileCreationMode: 'Skapa profilläge',
    on: 'På',
    off: 'Av',
  },
  profiles: {
    none: 'Inga animerade tokenprofiler är konfigurerade.',
    noProfile: 'Den valda token har ingen profil tilldelad.',
    id: 'Profil-ID',
    displayName: 'Visningsnamn',
    mappedStates: 'Kartlagda stater',
    noneValue: '(ingen)',
    personal: 'personlig',
    owner: 'Ägare',
    submittedBy: 'inlämnat av',
    approveHint:
      'Använd !adam --profile godkänn &lt;id&gt; för att godkänna eller avvisa &lt;id&gt; för att avvisa.',
  },
  menu: {
    title: 'A.D.A.M. Kontrolldäck',
    movement: 'Rörelse',
    facing: 'Motstående',
    state: 'Ange',
    stateLabel: 'Ange',
    facingLabel: 'Motstående',
    profileLabel: 'Profil',
    noProfile: 'Ingen profil',
    help: 'Hjälp',
    config: 'Konfig',
    states: {
      idle: 'På tomgång',
      combat: 'Bekämpa',
      walk: 'Promenad',
      dash: 'Rusa',
      sneak: 'Smyga sig',
      rage: 'Rasa',
      spellcasting: 'Spellcast',
      help: 'Hjälp',
    },
  },
  info: {
    subtitle: 'Animerad riktning och rörelse',
    versionLabel: 'Version',
    updatedLabel: 'Uppdaterad',
    creditsBody:
      'A.D.A.M.<br>Animerad regi och rörelse<br><br>Drift av SIMON.<br>Definitivt inte kallad Simon.',
    ready: 'MOD KLART',
  },
  easter: {
    toTheLeft: 'Till vänster, till vänster...',
    notGoingAnywhere: 'A.D.A.M. har bestämt att du faktiskt inte ska någonstans.',
    areWeThereYet: 'Är vi där än?',
    sneakSpam: 'Ingen har sett dig.<br>Ingen har sett dig.<br>Ingen har sett dig.',
    helpSpam: 'Vem är en bra uggla?',
    rageRage: 'Dorn skulle godkänna.',
    simonResponse: '...och kalla mig inte Simon!',
    simonNoSays: 'Simon säger vad?',
    versionEgg: 'A.D.A.M. v{version}<br><br>Definitivt inte SIMON.',
  },
};

export default TRANSLATION;
