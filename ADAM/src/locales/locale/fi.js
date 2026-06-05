const TRANSLATION = {
  titles: {
    error: 'Virhe',
    noTokenSelected: 'Tunnuksia ei ole valittu',
    tokenError: 'Token Error',
    missingDirection: 'Suunta puuttuu',
    invalidDirection: 'Virheellinen suunta',
    missingState: 'Puuttuva osavaltio',
    invalidState: 'Virheellinen osavaltio',
    missingAction: 'Toiminto puuttuu',
    invalidAction: 'Virheellinen toiminto',
    accessDenied: 'Käyttö estetty',
    invalidValue: 'Virheellinen arvo',
    unknownCommand: 'Tuntematon komento',
    moveError: 'Siirtovirhe',
    macroExists: 'Makro on olemassa',
    macroInstalled: 'Makro asennettu',
    invalidUsage: 'Virheellinen käyttö',
    profileAssigned: 'Profiili määritetty',
    profileRemoved: 'Profiili poistettu',
    unknownProfile: 'Tuntematon profiili',
    configuration: 'Kokoonpano',
    settingsReset: 'Asetukset Reset',
    scriptReady: 'Script valmis',
    versionInfo: 'Versiotiedot',
    creditsTitle: 'Krediitit',
    adamsMenu: 'A.D.A.M. Ohjauslevy',
    adamsHelp: 'A.D.A.M. Auttaa',
    adamsSettings: 'A.D.A.M. Asetukset',
    profiles: 'Määritetyt profiilit',
    tokenProfile: 'Token-profiili',
    success: 'Menestys',
    langSet: 'Kieli asetettu',
    langInvalid: 'Virheellinen kieli',
    profileCreated: 'Profiili luotu',
    profileUpdated: 'Profiili päivitetty',
    profileDeleted: 'Profiili poistettu',
    profileRenamed: 'Profiili nimetty uudelleen',
    draftSubmitted: 'Luonnos lähetetty',
    draftApproved: 'Luonnos hyväksytty',
    draftRejected: 'Luonnos hylätty',
    pendingDrafts: 'Odottavat profiililuonnokset',
    profileCreationMode: 'Profiilin luontitila',
    draftNotification: 'Profiililuonnos odottaa',
  },
  errors: {
    noTokenSelected:
      'Tunnuksia ei ole valittu. Valitse ensin tunnus ja napsauta sitten suuntapainiketta.',
    noTokenSelectedStill: 'Tunnuksia ei vieläkään ole valittu.',
    noTokenSelectedPersistent: 'Ihailen sinnikkyyttäsi. Valitse ensin tunnus.',
    tokenNotFound: 'Valittua merkkiä ei löytynyt.',
    missingDirection:
      'Ole hyvä ja anna suunta. Esimerkki: <code>!adam --move n</code><br><em>Reittiohjeet: n, ne, e, se, s, sw, w, nw</em>',
    invalidDirection:
      'Tuntematon suunta: <strong>{value}</strong><br><br>Voimassa: n, ei, e, se, s, sw, w, nw (tai täydet nimet, kuten pohjoinen, koillinen)',
    missingState: 'Anna tila.<br>Voimassa: {states}',
    invalidState: 'Tuntematon tila: <strong>{value}</strong><br><br>Voimassa: {states}',
    missingAction:
      'Ole hyvä ja toimita. Esimerkkejä: apu, loitsu, raivo, viiva, hiipiminen, tyhjäkäynti, taistelu',
    invalidAction:
      'Tuntematon toiminta: <strong>{value}</strong><br><br>Tunnetut toiminnot: {actions}',
    accessDeniedConfig: 'Kokoonpanon muutokset rajoittuvat GM:ään.',
    accessDeniedProfileAssign: 'Profiilin antaminen on rajoitettu GM:lle.',
    accessDeniedProfileRemove: 'Profiilin poistaminen on rajoitettu GM:ään.',
    accessDeniedMacro: 'Makroasennus on rajoitettu GM:ään.',
    accessDeniedReset: 'Asetusten nollaus on rajoitettu GM:ään.',
    unknownCommand:
      'Tuntematon komento. Kokeile <code>!adam --help</code> luetteloa käytettävissä olevista komennoista.',
    moveFailed: 'Liikkuminen epäonnistui.',
    gridSizeInvalid: 'Ruudukon koon on oltava kokonaisluku välillä 10–1000 (pikseliä).',
    moveDistanceInvalid: 'Siirtoetäisyyden on oltava kokonaisluku väliltä 1–20 (neliöt).',
    autoFaceInvalid: 'Automaattisen arvon on oltava päällä tai pois päältä.',
    humourInvalid: 'Huumorin arvon on oltava päällä tai pois päältä.',
    langInvalid: 'Virheellinen maa-asetus. Tuettu: {locales}',
    profileUsage:
      'Käyttö: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
    profileAssignUsage: 'Käyttö: <code>!adam --profile assign &lt;profileId&gt;</code>',
    profileUnknown:
      'Profile <strong>{id}</strong> does not exist. Use <code>!adam --profile list</code> to see available profiles.',
    profileUnknownSub:
      'Tuntematon profiilin alakomento: <strong>{sub}</strong><br><br>Kelvollinen: luettelo, näytä, luo, muokkaa, nimeä uudelleen, poista, määritä, poista, luonnos, luonnospuoli, tarkista, hyväksy, hylkää',
    profileIdInvalid:
      'Virheellinen profiilitunnus: <strong>{id}</strong>. Käytä vain kirjaimia, numeroita, tavuviivoja ja alaviivoja (enintään 50 merkkiä).',
    profileAlreadyExists:
      'Profiili <strong>{id}</strong> on jo olemassa. Käytä <code>!adam --profile edit-side</code> -komentoa muokataksesi sitä tai poista se ensin.',
    profileNotFound: 'Profiilia <strong>{id}</strong> ei löydy.',
    profileCreateUsage:
      'Käyttö: <code>!adam --profile luo &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileEditSideUsage:
      'Käyttö: <code>!adam --profile edit-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileRenameUsage:
      'Käyttö: <code>!adam --profile nimeä uudelleen &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDeleteUsage: 'Käyttö: <code>!adam --profile poista &lt;profileId&gt;</code>',
    profileDraftUsage:
      'Käyttö: <code>!adam --profile luonnos &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDraftSideUsage:
      'Käyttö: <code>!adam --profile luonnospuoli &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileDraftNotFound:
      'Odottavaa luonnosta ei löytynyt kohteelle <strong>{id}</strong>. Lähetä yksi <code>!adam --profile luonnoksella</code>.',
    profileGmOnly: 'Profiilin luominen on rajoitettu GM:lle.',
    profileEditGmOnly: 'Tämän profiilin muokkaaminen on rajoitettu GM:ään.',
    profileDeleteGmOnly: 'Tämän profiilin poistaminen on rajoitettu GM:ään.',
    profileGlobalReadOnly:
      'Profiili <strong>{id}</strong> on maailmanlaajuinen profiili, ja vain GM voi muokata sitä.',
    profileNotOwned: 'Et omista profiilia <strong>{id}</strong>, etkä voi muokata sitä.',
    profileModeRequiresDraft:
      'Profiilin luominen vaatii GM:n hyväksynnän tässä pelissä. Käytä <code>!adam --profile luonnosta &lt;id&gt; &lt;name&gt;</code> luonnoksen lähettämiseen.',
    profileAssignNoControl:
      'Voit määrittää henkilökohtaisia ​​profiileja vain hallitsemillesi tunnuksille.',
    profileAssignNotOwned:
      'Voit määrittää omat profiilisi vain hallitsemillesi tunnuksille. Profiili <strong>{id}</strong> kuuluu toiselle pelaajalle.',
    profileCreationModeInvalid:
      'Virheellinen profiilin luontitila. Voimassa: vain gm, GM-hyväksytty, kaikki käyttäjät.',
    profileReviewGmOnly: 'Vain GM voi tarkastella vireillä olevia luonnoksia.',
    profileApproveGmOnly: 'Vain GM voi hyväksyä profiililuonnokset.',
    profileRejectGmOnly: 'Vain GM voi hylätä profiililuonnokset.',
    invalidAnimSet: 'Animaatiosarjan tulee olla pohjoinen tai etelä.',
    invalidSideNumber: 'Sivunumeron on oltava positiivinen kokonaisluku (1 tai suurempi).',
    noDrafts: 'Ei odottavia profiililuonnoksia.',
    profileDraftConflict:
      'Odottava luonnos kohteelle <strong>{id}</strong> on jo olemassa ja kuuluu toiselle pelaajalle.',
    profileDraftNotGmApproved:
      'Luonnokset ovat käytettävissä vain, kun profiilin luontitila on <code>gm-hyväksytty</code>.',
    profileApproveConflict:
      'Aktiivinen profiili nimeltä <strong>{id}</strong> on jo olemassa. Poista se ennen tämän luonnoksen hyväksymistä.',
    macroExists: 'Makro nimeltä <strong>{name}</strong> on jo olemassa.',
    simonUnknown:
      'Simon ei osaa: <em>{command}</em><br><br>Kokeile: <code>!simon sanoo liikkua n</code>',
  },
  confirm: {
    facing: '<strong>{token}</strong> kohtaa nyt <strong>{direction}</strong>.',
    stateSet: '<strong>{token}</strong>-tilaksi on asetettu <strong>{state}</strong>.',
    actionSet:
      '<strong>{token}</strong> toiminto: <strong>{action}</strong> → tila: <strong>{state}</strong>.',
    profileAssigned:
      'Profiili <strong>{id}</strong> on määritetty käyttäjälle <strong>{token}</strong>.',
    profileRemoved: 'Profiili poistettu kohteesta <strong>{token}</strong>.',
    profileCreated: 'Profiili <strong>{id}</strong> luotu.',
    profileSideSet: 'Profiili <strong>{id}</strong>: {state}/{animSet} → sivu {number}.',
    profileRenamed:
      'Profiili <strong>{id}</strong> nimettiin uudelleen muotoon <strong>{name}</strong>.',
    profileDeleted: 'Profiili <strong>{id}</strong> poistettu.',
    profileDraftSubmitted:
      'Profiilin <strong>{id}</strong> luonnos lähetetty GM:n hyväksyntää varten.',
    profileDraftApproved:
      'Profiililuonnos <strong>{id}</strong> hyväksytty ja lisätty aktiivisiin profiileihin.',
    profileDraftRejected: 'Profiililuonnos <strong>{id}</strong> on hylätty.',
    macroInstalled:
      'Maailmanlaajuinen makro <strong>{name}</strong> on luotu ja näkyy kaikille pelaajille.',
    configUpdated: 'Asetukset päivitetty.',
    settingsReset: '<strong>Asetukset palautetaan tehdasasetuksiin.</strong>',
    langSet: 'Kieleksi on asetettu {locale}.',
  },
  settings: {
    gridSize: 'Ruudukon koko',
    gridSizeDesc: '{size}px per neliö',
    moveDistance: 'Siirrä etäisyys',
    moveDistanceDesc: '{squares} neliötä – {pixels}px per liike',
    autoFace: 'Auto-Face on Move',
    humour: 'Huumori (pääsiäismunat)',
    language: 'Kieli',
    profileCreationMode: 'Profiilin luontitila',
    on: 'Päällä',
    off: 'Pois',
  },
  profiles: {
    none: 'Animoituja tunnusprofiileja ei ole määritetty.',
    noProfile: 'Valitulle tunnukselle ei ole määritetty profiilia.',
    id: 'Profiilin tunnus',
    displayName: 'Näyttönimi',
    mappedStates: 'Kartatut osavaltiot',
    noneValue: '(ei mitään)',
    personal: 'henkilökohtainen',
    owner: 'Omistaja',
    submittedBy: 'lähettänyt',
    approveHint:
      'Käytä !adam --profile hyväksy &lt;id&gt; hyväksyäksesi tai hylkää &lt;id&gt; hylkäämiseen.',
  },
  menu: {
    title: 'A.D.A.M. Ohjauslevy',
    movement: 'Liike',
    facing: 'Vastakkain',
    state: 'Osavaltio',
    stateLabel: 'Osavaltio',
    facingLabel: 'Vastakkain',
    profileLabel: 'Profiili',
    noProfile: 'Ei profiilia',
    help: 'Auttaa',
    config: 'Konfig',
    states: {
      idle: 'Tyhjäkäynti',
      combat: 'Taistele',
      walk: 'Kävellä',
      dash: 'Dash',
      sneak: 'Hiipiä',
      rage: 'Raivo',
      spellcasting: 'Spellcast',
      help: 'Auttaa',
    },
  },
  info: {
    subtitle: 'Animoitu suunta ja liike',
    versionLabel: 'Versio',
    updatedLabel: 'Päivitetty',
    creditsBody:
      'A.D.A.M.<br>Animated Direction and Movement<br><br>Tuottajana SIMON.<br>Ei todellakaan Simon.',
    ready: 'MOD VALMIS',
  },
  easter: {
    toTheLeft: 'Vasemmalle, vasemmalle...',
    notGoingAnywhere: 'A.D.A.M. on päättänyt, ettet ole menossa minnekään.',
    areWeThereYet: 'Olemmeko jo perillä?',
    sneakSpam:
      'Kukaan ei ole nähnyt sinua.<br>Kukaan ei ole nähnyt sinua.<br>Kukaan ei ole nähnyt sinua.',
    helpSpam: 'Kuka on hyvä pöllö?',
    rageRage: 'Dorn hyväksyisi.',
    simonResponse: '...äläkä kutsu minua Simoniksi!',
    simonNoSays: 'Simon sanoo mitä?',
    versionEgg: 'A.D.A.M. v{version}<br><br>Ei todellakaan SIMON.',
  },
};

export default TRANSLATION;
