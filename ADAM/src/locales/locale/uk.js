const TRANSLATION = {
  titles: {
    error: "Помилка",
    noTokenSelected: "Токен не вибрано",
    tokenError: "Помилка маркера",
    missingDirection: "Відсутній напрямок",
    invalidDirection: "Недійсний напрямок",
    missingState: "Відсутня держава",
    invalidState: "Недійсний стан",
    missingAction: "Відсутня дія",
    invalidAction: "Недійсна дія",
    accessDenied: "Доступ заборонено",
    invalidValue: "Недійсне значення",
    unknownCommand: "Невідома команда",
    moveError: "Помилка переміщення",
    macroExists: "Макрос існує",
    macroInstalled: "Макрос встановлено",
    invalidUsage: "Недійсне використання",
    profileAssigned: "Профіль призначено",
    profileRemoved: "Профіль видалено",
    unknownProfile: "Невідомий профіль",
    configuration: "Конфігурація",
    settingsReset: "Скидання налаштувань",
    scriptReady: "Сценарій готовий",
    versionInfo: "Інформація про версію",
    creditsTitle: "Кредити",
    adamsMenu: "A.D.A.M. Контрольна колода",
    adamsHelp: "A.D.A.M. Довідка",
    adamsSettings: "A.D.A.M. Налаштування",
    profiles: "Налаштовані профілі",
    tokenProfile: "Профіль маркера",
    success: "Успіх",
    langSet: "Мовний набір",
    langInvalid: "Недійсна мова",
    profileCreated: "Профіль створено",
    profileUpdated: "Профіль оновлено",
    profileDeleted: "Профіль видалено",
    profileRenamed: "Профіль перейменовано",
    draftSubmitted: "Проект надіслано",
    draftApproved: "Проект схвалено",
    draftRejected: "Чернетку відхилено",
    pendingDrafts: "Чернетки профілю, що очікують на розгляд",
    profileCreationMode: "Режим створення профілю",
    draftNotification: "Чернетка профілю очікує на розгляд",
  },
  errors: {
    noTokenSelected:
      "Жетон не вибрано. Будь ласка, спочатку виберіть маркер, а потім натисніть кнопку напрямку.",
    noTokenSelectedStill: "Жетон не вибрано.",
    noTokenSelectedPersistent:
      "Я захоплююся вашою наполегливістю. Спочатку виберіть маркер.",
    tokenNotFound: "Вибраний маркер не знайдено.",
    missingDirection:
      "Будь ласка, дайте напрямок. Приклад: <code>!adam --move n</code><br><em>Напрямки: n, ne, e, se, s, sw, w, nw</em>",
    invalidDirection:
      "Невідомий напрямок: <strong>{value}</strong><br><br>Дійсно: n, ne, e, se, s, sw, w, nw (або повні назви, як-от північ, північний схід)",
    missingState: "Укажіть стан.<br>Дійсно: {states}",
    invalidState:
      "Невідомий стан: <strong>{value}</strong><br><br>Дійсний: {states}",
    missingAction:
      "Укажіть дію. Приклади: help, spellcast, rage, dash, sneak, idle, combat",
    invalidAction:
      "Невідома дія: <strong>{value}</strong><br><br>Відомі дії: {actions}",
    accessDeniedConfig: "Зміни конфігурації обмежені для GM.",
    accessDeniedProfileAssign: "Призначення профілю обмежується GM.",
    accessDeniedProfileRemove: "Видалення профілю обмежується GM.",
    accessDeniedMacro: "Встановлення макросу обмежено GM.",
    accessDeniedReset: "Скидання налаштувань обмежено для GM.",
    unknownCommand:
      "Невідома команда. Спробуйте <code>!adam --help</code>, щоб переглянути список доступних команд.",
    moveFailed: "Рух не вдалося.",
    gridSizeInvalid:
      "Розмір сітки має бути цілим числом від 10 до 1000 (пікселів).",
    moveDistanceInvalid:
      "Відстань переміщення має бути цілим числом від 1 до 20 (квадрати).",
    autoFaceInvalid: "Автоматичне номінал має бути: увімкнено або вимкнено.",
    humourInvalid: "Значення гумору має бути: увімкнено або вимкнено.",
    langInvalid: "Недійсна мова. Підтримується: {locales}",
    profileUsage:
      "Використання: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>",
    profileAssignUsage:
      "Використання: <code>!adam --profile призначити &lt;profileId&gt;</code>",
    profileUnknown:
      "Профіль <strong>{id}</strong> не існує. Використовуйте <code>!adam --profile list</code>, щоб переглянути доступні профілі.",
    profileUnknownSub:
      "Невідома підкоманда профілю: <strong>{sub}</strong><br><br>Дійсна: список, показати, створити, на стороні редагування, перейменувати, видалити, призначити, видалити, чернетка, на стороні чернетки, переглянути, схвалити, відхилити",
    profileIdInvalid:
      "Недійсний ідентифікатор профілю: <strong>{id}</strong>. Використовуйте лише літери, цифри, дефіси та підкреслення (максимум 50 символів).",
    profileAlreadyExists:
      "Профіль <strong>{id}</strong> вже існує. Використовуйте <code>!adam --profile edit-side</code>, щоб змінити його, або спочатку видаліть.",
    profileNotFound: "Профіль <strong>{id}</strong> не знайдено.",
    profileCreateUsage:
      "Використання: <code>!adam --profile create &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileEditSideUsage:
      "Використання: <code>!adam --profile edit-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileRenameUsage:
      "Використання: <code>!adam --profile перейменувати &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDeleteUsage:
      "Використання: <code>!adam --profile delete &lt;profileId&gt;</code>",
    profileDraftUsage:
      "Використання: <code>!adam --profile чернетка &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDraftSideUsage:
      "Використання: <code>!adam --profile чернетка &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileDraftNotFound:
      "Для <strong>{id}</strong> не знайдено чернетки, що очікує на розгляд. Надішліть один із <code>!adam --profile чернетка</code>.",
    profileGmOnly: "Profile creation is restricted to the GM.",
    profileEditGmOnly: "Змінювати цей профіль може лише GM.",
    profileDeleteGmOnly: "Видалення цього профілю обмежено для GM.",
    profileGlobalReadOnly:
      "Профіль <strong>{id}</strong> є глобальним профілем і може бути змінений лише GM.",
    profileNotOwned:
      "Ви не є власником профілю <strong>{id}</strong> і не можете його змінити.",
    profileModeRequiresDraft:
      "Для створення профілю в цій грі потрібне схвалення GM. Використовуйте <code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code>, щоб надіслати чернетку.",
    profileAssignNoControl:
      "Ви можете призначити особисті профілі лише тим маркерам, якими ви керуєте.",
    profileAssignNotOwned:
      "Ви можете призначити власні профілі лише тим маркерам, якими ви керуєте. Профіль <strong>{id}</strong> належить іншому гравцеві.",
    profileCreationModeInvalid:
      "Недійсний режим створення профілю. Дійсний: тільки для gm, схвалено gm, для всіх користувачів.",
    profileReviewGmOnly:
      "Лише GM може розглядати проекти, що очікують на розгляд.",
    profileApproveGmOnly: "Тільки GM може затверджувати проекти профілів.",
    profileRejectGmOnly: "Лише GM може відхилити чернетки профілю.",
    invalidAnimSet: "Набір анімації повинен бути: північ або південь.",
    invalidSideNumber:
      "Номер сторони має бути додатним цілим числом (1 або більше).",
    noDrafts: "Немає незавершених чернеток профілю.",
    profileDraftConflict:
      "Чернетка для <strong>{id}</strong> вже існує та належить іншому гравцеві.",
    profileDraftNotGmApproved:
      "Чернетки доступні, лише якщо режим створення профілю <code>схвалено gm</code>.",
    profileApproveConflict:
      "Активний профіль під назвою <strong>{id}</strong> вже існує. Перш ніж затверджувати чернетку, видаліть його.",
    macroExists: 'Макрос під назвою "<strong>{name}</strong>" вже існує.',
    simonUnknown:
      "Саймон не знає, як: <em>{command}</em><br><br>Спробуйте: <code>!Саймон каже рухатися</code>",
  },
  confirm: {
    facing:
      "<strong>{token}</strong> тепер стикається з <strong>{direction}</strong>.",
    stateSet:
      "Для <strong>{token}</strong> встановлено <strong>{state}</strong>.",
    actionSet:
      "<strong>{token}</strong> дія: <strong>{action}</strong> → стан: <strong>{state}</strong>.",
    profileAssigned:
      "Профіль <strong>{id}</strong> призначено для <strong>{token}</strong>.",
    profileRemoved: "Профіль видалено з <strong>{token}</strong>.",
    profileCreated: "Профіль <strong>{id}</strong> створено.",
    profileSideSet:
      "Профіль <strong>{id}</strong>: {state}/{animSet} → сторона {number}.",
    profileRenamed:
      "Профіль <strong>{id}</strong> перейменовано на <strong>{name}</strong>.",
    profileDeleted: "Профіль <strong>{id}</strong> видалено.",
    profileDraftSubmitted:
      "Проект профілю <strong>{id}</strong> подано на затвердження GM.",
    profileDraftApproved:
      "Чернетку профілю <strong>{id}</strong> схвалено та додано до активних профілів.",
    profileDraftRejected: "Чернетку профілю <strong>{id}</strong> відхилено.",
    macroInstalled:
      'Глобальний макрос "<strong>{name}</strong>" створено, і його бачать усі гравці.',
    configUpdated: "Налаштування оновлено.",
    settingsReset:
      "<strong>Скидання налаштувань до заводських значень.</strong>",
    langSet: "Вибрано мову {locale}.",
  },
  settings: {
    gridSize: "Розмір сітки",
    gridSizeDesc: "{size}px на квадрат",
    moveDistance: "Відстань переміщення",
    moveDistanceDesc: "{squares} квадрат(ів) — {pixels}px за хід",
    autoFace: "Автоматичне обличчя під час руху",
    humour: "Гумор (пасхальні яйця)",
    language: "Мова",
    profileCreationMode: "Режим створення профілю",
    on: "Увімкнено",
    off: "Вимкнено",
  },
  profiles: {
    none: "Профілі анімованих маркерів не налаштовано.",
    noProfile: "Вибраному маркеру не призначено профіль.",
    id: "ID профілю",
    displayName: "Відображуване ім'я",
    mappedStates: "Нанесені на карту держави",
    noneValue: "(жоден)",
    personal: "особистий",
    owner: "Власник",
    submittedBy: "подано",
    approveHint:
      "Використовуйте !adam --profile approve &lt;id&gt;, щоб схвалити, або відхилити &lt;id&gt;, щоб відхилити.",
  },
  menu: {
    title: "A.D.A.M. Контрольна колода",
    movement: "Рух",
    facing: "Облицювання",
    state: "Держава",
    stateLabel: "Держава",
    facingLabel: "Облицювання",
    profileLabel: "Профіль",
    noProfile: "Без профілю",
    help: "Довідка",
    config: "Конфігурація",
    states: {
      idle: "Бездіяльність",
      combat: "Бойовий",
      walk: "Прогулянка",
      dash: "Тире",
      sneak: "Підкрастися",
      rage: "лють",
      spellcasting: "Заклинання",
      help: "Довідка",
    },
  },
  info: {
    subtitle: "Анімований напрямок і рух",
    versionLabel: "Версія",
    updatedLabel: "Оновлено",
    creditsBody:
      "A.D.A.M.<br>Анімаційний напрямок і рух<br><br>На основі SIMON.<br>Звичайно не називається Саймон.",
    ready: "МОД ГОТОВИЙ",
  },
  easter: {
    toTheLeft: "Наліво, наліво...",
    notGoingAnywhere: "A.D.A.M. вирішив, що ти насправді нікуди не збираєшся.",
    areWeThereYet: "Ми вже там?",
    sneakSpam:
      "Вас ніхто не бачив.<br>Вас ніхто не бачив.<br>Вас ніхто не бачив.",
    helpSpam: "Хто хороша сова?",
    rageRage: "Дорн схвалив би.",
    simonResponse: "...і не називай мене Саймон!",
    simonNoSays: "Саймон каже що?",
    versionEgg: "A.D.A.M. v{version}<br><br>Безумовно не SIMON.",
  },
};

export default TRANSLATION;
