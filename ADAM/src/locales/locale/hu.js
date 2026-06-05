const TRANSLATION = {
  titles: {
    error: "Hiba",
    noTokenSelected: "Nincs kiválasztva token",
    tokenError: "Token hiba",
    missingDirection: "Hiányzó Irány",
    invalidDirection: "Érvénytelen irány",
    missingState: "Hiányzó állam",
    invalidState: "Érvénytelen állam",
    missingAction: "Hiányzó akció",
    invalidAction: "Érvénytelen művelet",
    accessDenied: "Hozzáférés megtagadva",
    invalidValue: "Érvénytelen érték",
    unknownCommand: "Ismeretlen parancs",
    moveError: "Mozgatási hiba",
    macroExists: "Makró létezik",
    macroInstalled: "Makró telepítve",
    invalidUsage: "Érvénytelen használat",
    profileAssigned: "Profil hozzárendelve",
    profileRemoved: "Profil eltávolítva",
    unknownProfile: "Ismeretlen profil",
    configuration: "Konfiguráció",
    settingsReset: "Beállítások visszaállítása",
    scriptReady: "Szkript kész",
    versionInfo: "Verzió információ",
    creditsTitle: "Kredit",
    adamsMenu: "ÁDÁM. Control Deck",
    adamsHelp: "ÁDÁM. Segítség",
    adamsSettings: "ÁDÁM. Beállítások elemre",
    profiles: "Konfigurált profilok",
    tokenProfile: "Token profil",
    success: "Siker",
    langSet: "Nyelv beállítása",
    langInvalid: "Érvénytelen nyelv",
    profileCreated: "Profil létrehozva",
    profileUpdated: "Profil frissítve",
    profileDeleted: "Profil törölve",
    profileRenamed: "Profil átnevezve",
    draftSubmitted: "Vázlat benyújtva",
    draftApproved: "Tervezet jóváhagyva",
    draftRejected: "Tervezet elutasítva",
    pendingDrafts: "Függőben lévő profilvázlatok",
    profileCreationMode: "Profil létrehozási mód",
    draftNotification: "Profilvázlat függőben",
  },
  errors: {
    noTokenSelected:
      "Nincs kiválasztva token. Kérjük, először válasszon ki egy tokent, majd kattintson az irányjelző gombra.",
    noTokenSelectedStill: "Még mindig nincs kiválasztva token.",
    noTokenSelectedPersistent:
      "Csodálom a kitartásodat. Először válasszon ki egy tokent.",
    tokenNotFound: "A kiválasztott token nem található.",
    missingDirection:
      "Kérjük, adjon irányt. Példa: <code>!adam --move n</code><br><em>Útvonal: n, ne, e, se, s, sw, w, nw</em>",
    invalidDirection:
      "Ismeretlen irány: <strong>{value}</strong><br><br>Érvényes: n, ne, e, se, s, sw, w, nw (vagy teljes nevek, például észak, északkelet)",
    missingState: "Adjon meg egy állapotot.<br>Érvényes: {states}",
    invalidState:
      "Ismeretlen állapot: <strong>{value}</strong><br><br>Érvényes: {states}",
    missingAction:
      "Adjon meg egy műveletet. Példák: segítség, varázslat, düh, csapás, besurranás, tétlenség, harc",
    invalidAction:
      "Ismeretlen művelet: <strong>{value}</strong><br><br>Ismert műveletek: {actions}",
    accessDeniedConfig: "Configuration changes are restricted to the GM.",
    accessDeniedProfileAssign: "A profil hozzárendelése a GM-re korlátozódik.",
    accessDeniedProfileRemove: "A profil eltávolítása a GM-re korlátozódik.",
    accessDeniedMacro: "A makró telepítése a GM-re korlátozódik.",
    accessDeniedReset: "A beállítások visszaállítása a GM-re korlátozódik.",
    unknownCommand:
      "Ismeretlen parancs. Az elérhető parancsok listájához próbálja ki az <code>!adam --help</code> parancsot.",
    moveFailed: "A mozgás nem sikerült.",
    gridSizeInvalid:
      "A rács méretének 10 és 1000 (pixel) közötti egész számnak kell lennie.",
    moveDistanceInvalid:
      "A mozgási távolságnak 1 és 20 közötti egész számnak kell lennie (négyzetek).",
    autoFaceInvalid:
      "Az automatikus arc értékének a következőnek kell lennie: be vagy ki.",
    humourInvalid: "A humor értékének a következőnek kell lennie: be vagy off.",
    langInvalid: "Érvénytelen nyelvi beállítás. Támogatott: {locales}",
    profileUsage:
      "Használat: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>",
    profileAssignUsage:
      "Használat: <code>!adam --profile hozzárendelése &lt;profileId&gt;</code>",
    profileUnknown:
      "A(z) <strong>{id}</strong> profil nem létezik. Az elérhető profilok megtekintéséhez használja az <code>!adam --profile listát</code>.",
    profileUnknownSub:
      "Ismeretlen profil-alparancs: <strong>{sub}</strong><br><br>Érvényes: listázás, megjelenítés, létrehozás, szerkesztési oldal, átnevezés, törlés, hozzárendelés, eltávolítás, vázlat, vázlatoldal, áttekintés, jóváhagyás, elutasítás",
    profileIdInvalid:
      "Érvénytelen profilazonosító: <strong>{id}</strong>. Csak betűket, számokat, kötőjeleket és aláhúzásjeleket használjon (max. 50 karakter).",
    profileAlreadyExists:
      "A(z) <strong>{id}</strong> profil már létezik. A <code>!adam --profile edit-side</code> használatával módosítsa, vagy először törölje.",
    profileNotFound: "A(z) <strong>{id}</strong> profil nem található.",
    profileCreateUsage:
      "Használat: <code>!adam --profile létrehozás &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileEditSideUsage:
      "Használat: <code>!adam --profile szerkesztési oldal &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileRenameUsage:
      "Használat: <code>!adam --profile átnevezés &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDeleteUsage:
      "Használat: <code>!adam --profile törlés &lt;profileId&gt;</code>",
    profileDraftUsage:
      "Használat: <code>!adam --profile piszkozat &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDraftSideUsage:
      "Használat: <code>!adam --profile piszkozat oldali &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileDraftNotFound:
      "Nem található függőben lévő piszkozat a következőhöz: <strong>{id}</strong>. Küldjön be egyet a <code>!adam --profile piszkozattal</code>.",
    profileGmOnly: "A profil létrehozása a GM-re korlátozódik.",
    profileEditGmOnly: "Ennek a profilnak a módosítása a GM-re korlátozódik.",
    profileDeleteGmOnly: "A profil törlése a GM-re korlátozódik.",
    profileGlobalReadOnly:
      "A <strong>{id}</strong> profil egy globális profil, és csak a GM módosíthatja.",
    profileNotOwned:
      "Nem Ön a(z) <strong>{id}</strong> profil tulajdonosa, és nem módosíthatja azt.",
    profileModeRequiresDraft:
      "A profil létrehozásához a GM jóváhagyása szükséges ebben a játékban. Piszkozat benyújtásához használja a <code>!adam --profile piszkozatot &lt;id&gt; &lt;name&gt;</code>-t.",
    profileAssignNoControl:
      "Csak az Ön által irányított tokenekhez rendelhet személyes profilokat.",
    profileAssignNotOwned:
      "Csak saját profilokat rendelhet hozzá az általa irányított tokenekhez. A <strong>{id}</strong> profil egy másik játékoshoz tartozik.",
    profileCreationModeInvalid:
      "Érvénytelen profillétrehozási mód. Érvényes: csak GM, GM által jóváhagyott, minden felhasználó.",
    profileReviewGmOnly:
      "Csak a GM tekintheti át a függőben lévő piszkozatokat.",
    profileApproveGmOnly:
      "Csak a főigazgató hagyhatja jóvá a profilvázlatokat.",
    profileRejectGmOnly: "Csak a GM utasíthatja el a profilvázlatokat.",
    invalidAnimSet: "Az animációs készletnek északnak vagy délnek kell lennie.",
    invalidSideNumber:
      "Az oldalszámnak pozitív egész számnak kell lennie (1 vagy nagyobb).",
    noDrafts: "Nincsenek függőben lévő profilvázlatok.",
    profileDraftConflict:
      "A(z) <strong>{id}</strong> függőben lévő piszkozata már létezik, és egy másik játékosé.",
    profileDraftNotGmApproved:
      "A beküldött piszkozatok csak akkor érhetők el, ha a profillétrehozási mód <code>gm-jóváhagyott</code>.",
    profileApproveConflict:
      "Már létezik <strong>{id}</strong> nevű aktív profil. A tervezet jóváhagyása előtt törölje azt.",
    macroExists: "Már létezik „<strong>{name}</strong>” makró.",
    simonUnknown:
      "Simon nem tudja, hogyan kell: <em>{command}</em><br><br>Próbáld meg: <code>!simon azt mondja, hogy mozog n</code>",
  },
  confirm: {
    facing:
      "<strong>{token}</strong> most a következővel néz szembe: <strong>{direction}</strong>.",
    stateSet: "<strong>{token}</strong> állapota <strong>{state}</strong>.",
    actionSet:
      "<strong>{token}</strong> művelet: <strong>{action}</strong> → állapot: <strong>{state}</strong>.",
    profileAssigned:
      "A(z) <strong>{id}</strong> profil hozzárendelve a következőhöz: <strong>{token}</strong>.",
    profileRemoved: "A profil eltávolítva innen: <strong>{token}</strong>.",
    profileCreated: "A(z) <strong>{id}</strong> profil létrehozva.",
    profileSideSet:
      "Profil <strong>{id}</strong>: {state}/{animSet} → oldal {number}.",
    profileRenamed:
      "A(z) <strong>{id}</strong> profil átnevezve erre: <strong>{name}</strong>.",
    profileDeleted: "A(z) <strong>{id}</strong> profil törölve.",
    profileDraftSubmitted:
      "A(z) <strong>{id}</strong> profil tervezete benyújtva a GM jóváhagyására.",
    profileDraftApproved:
      "A <strong>{id}</strong> profilvázlat jóváhagyva, és hozzáadva az aktív profilokhoz.",
    profileDraftRejected: "A(z) <strong>{id}</strong> profilvázlat elutasítva.",
    macroInstalled:
      "A globális makró „<strong>{name}</strong>” létrejött, és minden játékos számára látható.",
    configUpdated: "Beállítások frissítve.",
    settingsReset:
      "<strong>A beállítások visszaállnak a gyári alapértékekre.</strong>",
    langSet: "A nyelv beállítása a következőre: {locale}.",
  },
  settings: {
    gridSize: "Rács mérete",
    gridSizeDesc: "{size}px négyzetenként",
    moveDistance: "Mozgás távolság",
    moveDistanceDesc: "{squares} négyzet – {pixels}px lépésenként",
    autoFace: "Automatikus arc mozgás közben",
    humour: "Humor (húsvéti tojás)",
    language: "Nyelv",
    profileCreationMode: "Profil létrehozási mód",
    on: "On",
    off: "Le",
  },
  profiles: {
    none: "Nincsenek animált tokenprofilok konfigurálva.",
    noProfile: "A kiválasztott tokenhez nincs hozzárendelve profil.",
    id: "Profilazonosító",
    displayName: "Megjelenítési név",
    mappedStates: "Feltérképezett államok",
    noneValue: "(egyik sem)",
    personal: "személyes",
    owner: "Tulajdonos",
    submittedBy: "által benyújtott",
    approveHint:
      "A jóváhagyáshoz használja az !adam --profile jóváhagyása &lt;id&gt; vagy az elutasításhoz az &lt;id&gt; parancsot.",
  },
  menu: {
    title: "ÁDÁM. Control Deck",
    movement: "Mozgás",
    facing: "Szembenézve",
    state: "Állami",
    stateLabel: "Állami",
    facingLabel: "Szembenézve",
    profileLabel: "Profil",
    noProfile: "Nincs profil",
    help: "Segítség",
    config: "Konfig",
    states: {
      idle: "Tétlen",
      combat: "Harc",
      walk: "Séta",
      dash: "Gondolatjel",
      sneak: "Settenkedik",
      rage: "Harag",
      spellcasting: "Varázslat",
      help: "Segítség",
    },
  },
  info: {
    subtitle: "Animált Irány és Mozgás",
    versionLabel: "Változat",
    updatedLabel: "Frissítve",
    creditsBody:
      "A.D.A.M.<br>Animált rendezés és mozgás<br><br>Simon üzemeltetője.<br>Határozottan nem Simonnak hívják.",
    ready: "MOD KÉSZ",
  },
  easter: {
    toTheLeft: "Balra, balra...",
    notGoingAnywhere: "ÁDÁM. megállapította, hogy valójában nem mész sehova.",
    areWeThereYet: "ott vagyunk már?",
    sneakSpam:
      "Senki nem látott téged.<br>Senki nem látott.<br>Senki nem látott.",
    helpSpam: "Ki a jó bagoly?",
    rageRage: "Dorn helyeselné.",
    simonResponse: "...és ne hívj Simonnak!",
    simonNoSays: "Simon mit mond?",
    versionEgg: "ÁDÁM. v{version}<br><br>Egyértelműen nem SIMON.",
  },
};

export default TRANSLATION;
