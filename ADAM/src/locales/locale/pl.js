const TRANSLATION = {
  titles: {
    error: 'Błąd',
    noTokenSelected: 'Nie wybrano tokena',
    tokenError: 'Błąd tokena',
    missingDirection: 'Brakujący kierunek',
    invalidDirection: 'Nieprawidłowy kierunek',
    missingState: 'Brakujący stan',
    invalidState: 'Nieprawidłowy stan',
    missingAction: 'Brakujące działanie',
    invalidAction: 'Nieprawidłowa akcja',
    accessDenied: 'Odmowa dostępu',
    invalidValue: 'Nieprawidłowa wartość',
    unknownCommand: 'Nieznane polecenie',
    moveError: 'Błąd przenoszenia',
    macroExists: 'Makro istnieje',
    macroInstalled: 'Makro zainstalowane',
    invalidUsage: 'Nieprawidłowe użycie',
    profileAssigned: 'Profil przypisany',
    profileRemoved: 'Profil usunięty',
    unknownProfile: 'Nieznany profil',
    configuration: 'Konfiguracja',
    settingsReset: 'Reset ustawień',
    scriptReady: 'Skrypt gotowy',
    versionInfo: 'Informacje o wersji',
    creditsTitle: 'Kredyty',
    adamsMenu: 'ADAM. Platforma kontrolna',
    adamsHelp: 'ADAM. Pomoc',
    adamsSettings: 'ADAM. Ustawienia',
    profiles: 'Skonfigurowane profile',
    tokenProfile: 'Profil tokena',
    success: 'Sukces',
    langSet: 'Zestaw językowy',
    langInvalid: 'Nieprawidłowy język',
    profileCreated: 'Profil został utworzony',
    profileUpdated: 'Profil zaktualizowany',
    profileDeleted: 'Profil usunięty',
    profileRenamed: 'Zmieniono nazwę profilu',
    draftSubmitted: 'Wersja robocza przesłana',
    draftApproved: 'Projekt zatwierdzony',
    draftRejected: 'Wersja robocza odrzucona',
    pendingDrafts: 'Oczekujące wersje robocze profilu',
    profileCreationMode: 'Tryb tworzenia profilu',
    draftNotification: 'Wersja robocza profilu w oczekiwaniu',
  },
  errors: {
    noTokenSelected:
      'Nie wybrano tokena. Najpierw wybierz token, a następnie kliknij przycisk kierunkowy.',
    noTokenSelectedStill: 'Nadal nie wybrano tokena.',
    noTokenSelectedPersistent: 'Podziwiam Twoją wytrwałość. Najpierw wybierz token.',
    tokenNotFound: 'Nie można znaleźć wybranego tokena.',
    missingDirection:
      'Proszę o kierunek. Przykład: <code>!adam --move n</code><br><em>Kierunki: n, ne, e, se, s, sw, w, nw</em>',
    invalidDirection:
      'Nieznany kierunek: <strong>{value}</strong><br><br>Prawidłowy: n, ne, e, se, s, sw, w, nw (lub pełne nazwy, takie jak północ, północny wschód)',
    missingState: 'Podaj stan.<br>Prawidłowy: {states}',
    invalidState: 'Nieznany stan: <strong>{value}</strong><br><br>Ważny: {states}',
    missingAction:
      'Proszę podać działanie. Przykłady: pomoc, rzucanie zaklęć, wściekłość, doskok, skradanie się, bezczynność, walka',
    invalidAction: 'Nieznane działanie: <strong>{value}</strong><br><br>Znane działania: {actions}',
    accessDeniedConfig: 'Zmiany konfiguracji są ograniczone do GM.',
    accessDeniedProfileAssign: "Przypisanie profilu jest ograniczone do GM'a.",
    accessDeniedProfileRemove: "Usuwanie profilu jest zastrzeżone dla GM'a.",
    accessDeniedMacro: 'Instalacja makr jest ograniczona do GM.',
    accessDeniedReset: "Reset ustawień jest zastrzeżony dla GM'a.",
    unknownCommand:
      'Nieznane polecenie. Spróbuj <code>!adam --help</code>, aby wyświetlić listę dostępnych poleceń.',
    moveFailed: 'Ruch nie powiódł się.',
    gridSizeInvalid: 'Rozmiar siatki musi być liczbą całkowitą z zakresu od 10 do 1000 (pikseli).',
    moveDistanceInvalid:
      'Odległość ruchu musi być liczbą całkowitą z zakresu od 1 do 20 (kwadratów).',
    autoFaceInvalid: 'Wartość automatycznej twarzy musi być: włączona lub wyłączona.',
    humourInvalid: 'Wartość humoru musi być: włączona lub wyłączona.',
    langInvalid: 'Nieprawidłowe ustawienia regionalne. Obsługiwane: {locales}',
    profileUsage:
      'Użycie: <kod>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
    profileAssignUsage: 'Użycie: <code>!adam --profile przypisz &lt;profileId&gt;</code>',
    profileUnknown:
      'Profil <strong>{id}</strong> nie istnieje. Użyj <code>!adam --profile listy</code>, aby zobaczyć dostępne profile.',
    profileUnknownSub:
      'Nieznane polecenie profilu: <strong>{sub}</strong><br><br>Prawidłowe: wyświetlanie, wyświetlanie, tworzenie, edytowanie, zmiana nazwy, usuwanie, przypisywanie, usuwanie, wersja robocza, wersja robocza, przeglądanie, zatwierdzanie, odrzucanie',
    profileIdInvalid:
      'Nieprawidłowy identyfikator profilu: <strong>{id}</strong>. Używaj tylko liter, cyfr, łączników i podkreśleń (maks. 50 znaków).',
    profileAlreadyExists:
      'Profil <strong>{id}</strong> już istnieje. Użyj <code>!adam --profile strony edycyjnej</code>, aby go zmodyfikować lub najpierw go usunąć.',
    profileNotFound: 'Nie znaleziono profilu <strong>{id}</strong>.',
    profileCreateUsage:
      'Użycie: <kod>!adam --profile utwórz &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileEditSideUsage:
      'Użycie: <kod>!adam --profile strona edycji &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileRenameUsage:
      'Użycie: <kod>!adam --profile zmień nazwę &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDeleteUsage: 'Użycie: <kod>!adam --profile usuń &lt;profileId&gt;</code>',
    profileDraftUsage:
      'Użycie: <kod>!adam --profile wersja robocza &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDraftSideUsage:
      'Użycie: <kod>!adam --profile strona zanurzeniowa &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileDraftNotFound:
      'Nie znaleziono oczekującej wersji roboczej dla <strong>{id}</strong>. Prześlij go z <code>!adam --profile wersją roboczą</code>.',
    profileGmOnly: "Tworzenie profilu jest ograniczone do GM'a.",
    profileEditGmOnly: "Modyfikowanie tego profilu jest zastrzeżone dla GM'a.",
    profileDeleteGmOnly: "Usunięcie tego profilu jest zastrzeżone dla GM'a.",
    profileGlobalReadOnly:
      "Profil <strong>{id}</strong> jest profilem globalnym i może być modyfikowany wyłącznie przez GM'a.",
    profileNotOwned:
      'Nie jesteś właścicielem profilu <strong>{id}</strong> i nie możesz go modyfikować.',
    profileModeRequiresDraft:
      'Utworzenie profilu wymaga zgody GM w tej grze. Użyj <code>!adam --profile wersja robocza &lt;id&gt; &lt;name&gt;</code>, aby przesłać wersję roboczą.',
    profileAssignNoControl:
      'Profile osobiste możesz przypisywać wyłącznie do tokenów, które kontrolujesz.',
    profileAssignNotOwned:
      'Możesz przypisywać własne profile tylko do tokenów, które kontrolujesz. Profil <strong>{id}</strong> należy do innego gracza.',
    profileCreationModeInvalid:
      'Nieprawidłowy tryb tworzenia profilu. Ważne: tylko gm, zatwierdzone przez gm, wszyscy użytkownicy.',
    profileReviewGmOnly: 'Tylko GM może przeglądać oczekujące wersje robocze.',
    profileApproveGmOnly: 'Tylko GM może zatwierdzać wersje robocze profili.',
    profileRejectGmOnly: 'Tylko GM może odrzucić wersje robocze profili.',
    invalidAnimSet: 'Zestaw animacji musi być: północ lub południe.',
    invalidSideNumber: 'Numer boczny musi być dodatnią liczbą całkowitą (1 lub większą).',
    noDrafts: 'Brak oczekujących wersji roboczych profili.',
    profileDraftConflict:
      'Oczekująca wersja robocza dla <strong>{id}</strong> już istnieje i należy do innego gracza.',
    profileDraftNotGmApproved:
      'Zgłoszenia wersji roboczej są dostępne tylko wtedy, gdy tryb tworzenia profilu jest <code>zatwierdzony przez gm</code>.',
    profileApproveConflict:
      'Aktywny profil o nazwie <strong>{id}</strong> już istnieje. Usuń go najpierw przed zatwierdzeniem tej wersji roboczej.',
    macroExists: 'Makro o nazwie „<strong>{name}</strong>” już istnieje.',
    simonUnknown:
      'Simon nie wie, jak: <em>{command}</em><br><br>Spróbuj: <code>!simon mówi: przesuń n</code>',
  },
  confirm: {
    facing: '<strong>{token}</strong> stoi teraz twarzą w twarz z <strong>{direction}</strong>.',
    stateSet: 'Stan <strong>{token}</strong> ustawiony na <strong>{state}</strong>.',
    actionSet:
      '<strong>{token}</strong> akcja: <strong>{action}</strong> → stan: <strong>{state}</strong>.',
    profileAssigned: 'Profil <strong>{id}</strong> przypisany do <strong>{token}</strong>.',
    profileRemoved: 'Profil został usunięty z <strong>{token}</strong>.',
    profileCreated: 'Profil <strong>{id}</strong> został utworzony.',
    profileSideSet: 'Profil <strong>{id}</strong>: {state}/{animSet} → strona {number}.',
    profileRenamed:
      'Nazwa profilu <strong>{id}</strong> została zmieniona na <strong>{name}</strong>.',
    profileDeleted: 'Profil <strong>{id}</strong> został usunięty.',
    profileDraftSubmitted:
      'Wersja robocza profilu <strong>{id}</strong> przesłana do zatwierdzenia przez GM.',
    profileDraftApproved:
      'Wersja robocza profilu <strong>{id}</strong> została zatwierdzona i dodana do aktywnych profili.',
    profileDraftRejected: 'Wersja robocza profilu <strong>{id}</strong> została odrzucona.',
    macroInstalled:
      'Makro globalne „<strong>{name}</strong>” zostało utworzone i jest widoczne dla wszystkich graczy.',
    configUpdated: 'Ustawienia zaktualizowane.',
    settingsReset: '<strong>Ustawienia zostały zresetowane do wartości fabrycznych.</strong>',
    langSet: 'Język ustawiony na {locale}.',
  },
  settings: {
    gridSize: 'Rozmiar siatki',
    gridSizeDesc: '{size}px na kwadrat',
    moveDistance: 'Przesuń odległość',
    moveDistanceDesc: '{squares} kwadratów — {pixels}px na ruch',
    autoFace: 'Automatyczna twarz w ruchu',
    humour: 'Humor (Jajka wielkanocne)',
    language: 'Język',
    profileCreationMode: 'Tryb tworzenia profilu',
    on: 'NA',
    off: 'Wyłączony',
  },
  profiles: {
    none: 'Nie skonfigurowano żadnych animowanych profili tokenów.',
    noProfile: 'Selected token has no profile assigned.',
    id: 'Identyfikator profilu',
    displayName: 'Nazwa wyświetlana',
    mappedStates: 'Mapowane Stany',
    noneValue: '(nic)',
    personal: 'osobisty',
    owner: 'Właściciel',
    submittedBy: 'przesłane przez',
    approveHint:
      'Użyj !adam --profile zatwierdź &lt;id&gt;, aby zatwierdzić lub odrzucić &lt;id&gt;, aby odrzucić.',
  },
  menu: {
    title: 'ADAM. Platforma kontrolna',
    movement: 'Ruch',
    facing: 'Okładzina',
    state: 'Państwo',
    stateLabel: 'Państwo',
    facingLabel: 'Okładzina',
    profileLabel: 'Profil',
    noProfile: 'Brak profilu',
    help: 'Pomoc',
    config: 'Konfig',
    states: {
      idle: 'Bezczynny',
      combat: 'Walka',
      walk: 'Chodzić',
      dash: 'Kropla',
      sneak: 'Donosiciel',
      rage: 'Wściekłość',
      spellcasting: 'Rzucanie zaklęć',
      help: 'Pomoc',
    },
  },
  info: {
    subtitle: 'Animowany kierunek i ruch',
    versionLabel: 'Wersja',
    updatedLabel: 'Zaktualizowano',
    creditsBody:
      'A.D.A.M.<br>Animowana reżyseria i ruch<br><br>Powered by SIMON.<br>Zdecydowanie nie nazywa się Simon.',
    ready: 'MOD GOTOWY',
  },
  easter: {
    toTheLeft: 'W lewo, w lewo...',
    notGoingAnywhere: 'ADAM. ustaliło, że tak naprawdę nigdzie się nie wybierasz.',
    areWeThereYet: 'Czy już tam jesteśmy?',
    sneakSpam: 'Nikt cię nie widział.<br>Nikt cię nie widział.<br>Nikt cię nie widział.',
    helpSpam: 'Kto jest dobrą sową?',
    rageRage: 'Dorn by to zaakceptował.',
    simonResponse: '...i nie mów do mnie Simon!',
    simonNoSays: 'Simon co mówi?',
    versionEgg: 'ADAM. v{version}<br><br>Zdecydowanie nie SIMON.',
  },
};

export default TRANSLATION;
