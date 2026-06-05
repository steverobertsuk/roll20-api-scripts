const TRANSLATION = {
  titles: {
    error: "Ошибка",
    noTokenSelected: "Токен не выбран",
    tokenError: "Ошибка токена",
    missingDirection: "Отсутствует направление",
    invalidDirection: "Неверное направление",
    missingState: "Отсутствует государство",
    invalidState: "Недопустимое состояние",
    missingAction: "Отсутствует действие",
    invalidAction: "Неверное действие",
    accessDenied: "Доступ запрещен",
    invalidValue: "Неверное значение",
    unknownCommand: "Неизвестная команда",
    moveError: "Ошибка перемещения",
    macroExists: "Макрос существует",
    macroInstalled: "Макрос установлен",
    invalidUsage: "Неверное использование",
    profileAssigned: "Профиль назначен",
    profileRemoved: "Профиль удален",
    unknownProfile: "Неизвестный профиль",
    configuration: "Конфигурация",
    settingsReset: "Сброс настроек",
    scriptReady: "Сценарий готов",
    versionInfo: "Информация о версии",
    creditsTitle: "Кредиты",
    adamsMenu: "АДАМ. Панель управления",
    adamsHelp: "АДАМ. Помощь",
    adamsSettings: "АДАМ. Настройки",
    profiles: "Настроенные профили",
    tokenProfile: "Профиль токена",
    success: "Успех",
    langSet: "Языковой набор",
    langInvalid: "Неверный язык",
    profileCreated: "Профиль создан",
    profileUpdated: "Профиль обновлен",
    profileDeleted: "Профиль удален",
    profileRenamed: "Профиль переименован",
    draftSubmitted: "Черновик отправлен",
    draftApproved: "Проект одобрен",
    draftRejected: "Черновик отклонен",
    pendingDrafts: "Ожидаемые черновики профиля",
    profileCreationMode: "Режим создания профиля",
    draftNotification: "Проект профиля находится на рассмотрении",
  },
  errors: {
    noTokenSelected:
      "Токен не выбран. Сначала выберите токен, а затем нажмите кнопку направления.",
    noTokenSelectedStill: "Токен по-прежнему не выбран.",
    noTokenSelectedPersistent:
      "Я восхищаюсь вашей настойчивостью. Сначала выберите токен.",
    tokenNotFound: "Выбранный токен не найден.",
    missingDirection:
      "Пожалуйста, укажите направление. Пример: <code>!adam --move n</code><br><em>Направления: n, ne, e, se, s, sw, w, nw</em>",
    invalidDirection:
      "Неизвестное направление: <strong>{value}</strong><br><br>Действительно: n, ne, e, se, s, sw, w, nw (или полные имена, например север, северо-восток).",
    missingState: "Укажите штат.<br>Действительно: {states}.",
    invalidState:
      "Неизвестное состояние: <strong>{value}</strong><br><br>Действительно: {states}",
    missingAction:
      "Пожалуйста, укажите действие. Примеры: помощь, произнесение заклинаний, ярость, рывок, подкрадывание, бездействие, бой.",
    invalidAction:
      "Неизвестное действие: <strong>{value}</strong><br><br>Известные действия: {actions}",
    accessDeniedConfig: "Изменения конфигурации доступны только GM.",
    accessDeniedProfileAssign: "Назначение профиля доступно только GM.",
    accessDeniedProfileRemove: "Удаление профиля разрешено только GM.",
    accessDeniedMacro: "Установка макросов разрешена только GM.",
    accessDeniedReset: "Сброс настроек доступен только GM.",
    unknownCommand:
      "Неизвестная команда. Попробуйте <code>!adam --help</code> для получения списка доступных команд.",
    moveFailed: "Движение не удалось.",
    gridSizeInvalid:
      "Размер сетки должен быть целым числом от 10 до 1000 (пикселей).",
    moveDistanceInvalid:
      "Расстояние перемещения должно быть целым числом от 1 до 20 (квадратики).",
    autoFaceInvalid: "Автономинал должен быть включен или выключен.",
    humourInvalid: "Значение юмора должно быть: включено или выключено.",
    langInvalid: "Неверная локаль. Поддерживается: {locales}",
    profileUsage:
      "Использование: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>",
    profileAssignUsage:
      "Использование: <code>!adam --profile назначить &lt;profileId&gt;</code>",
    profileUnknown:
      "Профиль <strong>{id}</strong> не существует. Используйте <code>!adam --profile list</code>, чтобы просмотреть доступные профили.",
    profileUnknownSub:
      "Подкоманда неизвестного профиля: <strong>{sub}</strong><br><br>Действительно: список, показ, создание, редактирование, переименование, удаление, назначение, удаление, черновик, черновик, просмотр, утверждение, отклонение",
    profileIdInvalid:
      "Неверный идентификатор профиля: <strong>{id}</strong>. Используйте только буквы, цифры, дефисы и символы подчеркивания (максимум 50 символов).",
    profileAlreadyExists:
      "Профиль <strong>{id}</strong> уже существует. Используйте <code>!adam --profile на стороне редактирования</code>, чтобы изменить его или сначала удалить.",
    profileNotFound: "Профиль <strong>{id}</strong> не найден.",
    profileCreateUsage:
      "Использование: <code>!adam --profile create &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileEditSideUsage:
      "Использование: <code>!adam --profile на стороне редактирования &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileRenameUsage:
      "Использование: <code>!adam --profile переименовать &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDeleteUsage:
      "Использование: <code>!adam --profile удалить &lt;profileId&gt;</code>",
    profileDraftUsage:
      "Использование: <code>!adam --profile черновик &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDraftSideUsage:
      "Использование: <code>!adam --profile черновая сторона &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileDraftNotFound:
      "Не найден черновик для <strong>{id}</strong>. Отправьте его с <code>!adam --profile черновиком</code>.",
    profileGmOnly: "Создание профиля разрешено только GM.",
    profileEditGmOnly: "Изменение этого профиля разрешено только GM.",
    profileDeleteGmOnly: "Удаление этого профиля разрешено только GM.",
    profileGlobalReadOnly:
      "Профиль <strong>{id}</strong> является глобальным и может быть изменен только GM.",
    profileNotOwned:
      "Вы не являетесь владельцем профиля <strong>{id}</strong> и не можете его изменить.",
    profileModeRequiresDraft:
      "Для создания профиля в этой игре требуется одобрение ГМ. Используйте <code>!adam --profile черновик &lt;id&gt; &lt;name&gt;</code>, чтобы отправить черновик.",
    profileAssignNoControl:
      "Вы можете назначать личные профили только тем токенам, которыми вы управляете.",
    profileAssignNotOwned:
      "Вы можете назначать свои собственные профили только тем токенам, которыми вы управляете. Профиль <strong>{id}</strong> принадлежит другому игроку.",
    profileCreationModeInvalid:
      "Неверный режим создания профиля. Допустимо: только для GM, одобрено GM, для всех пользователей.",
    profileReviewGmOnly: "Только ГМ может просматривать ожидающие проекты.",
    profileApproveGmOnly: "Только ГМ может утверждать черновики профилей.",
    profileRejectGmOnly: "Только ГМ может отклонить черновики профиля.",
    invalidAnimSet: "Набор анимации должен быть: север или юг.",
    invalidSideNumber:
      "Боковой номер должен быть положительным целым числом (1 или больше).",
    noDrafts: "Нет ожидающих черновиков профиля.",
    profileDraftConflict:
      "Ожидаемый проект для <strong>{id}</strong> уже существует и принадлежит другому игроку.",
    profileDraftNotGmApproved:
      "Отправленные черновики доступны только в том случае, если режим создания профиля <code>одобрен gm</code>.",
    profileApproveConflict:
      "Активный профиль с именем <strong>{id}</strong> уже существует. Прежде чем одобрять этот черновик, удалите его.",
    macroExists: "Макрос с именем «<strong>{name}</strong>» уже существует.",
    simonUnknown:
      "Саймон не знает, как: <em>{command}</em><br><br>Попробуй: <code>!Саймон говорит: двигайся n</code>",
  },
  confirm: {
    facing:
      "<strong>{token}</strong> теперь сталкивается с <strong>{direction}</strong>.",
    stateSet:
      "Для состояния <strong>{token}</strong> установлено значение <strong>{state}</strong>.",
    actionSet:
      "<strong>{token}</strong> действие: <strong>{action}</strong> → состояние: <strong>{state}</strong>.",
    profileAssigned:
      "Профиль <strong>{id}</strong> назначен пользователю <strong>{token}</strong>.",
    profileRemoved: "Профиль удален из <strong>{token}</strong>.",
    profileCreated: "Профиль <strong>{id}</strong> создан.",
    profileSideSet:
      "Профиль <strong>{id}</strong>: {state}/{animSet} → сторона {number}.",
    profileRenamed:
      "Профиль <strong>{id}</strong> переименован в <strong>{name}</strong>.",
    profileDeleted: "Профиль <strong>{id}</strong> удален.",
    profileDraftSubmitted:
      "Черновик профиля <strong>{id}</strong> отправлен на утверждение GM.",
    profileDraftApproved:
      "Черновик профиля <strong>{id}</strong> одобрен и добавлен в активные профили.",
    profileDraftRejected: "Черновик профиля <strong>{id}</strong> отклонен.",
    macroInstalled:
      "Глобальный макрос «<strong>{name}</strong>» создан и виден всем игрокам.",
    configUpdated: "Настройки обновлены.",
    settingsReset: "<strong>Настройки сброшены до заводских настроек.</strong>",
    langSet: "Язык установлен на {locale}.",
  },
  settings: {
    gridSize: "Размер сетки",
    gridSizeDesc: "{size}px на квадрат",
    moveDistance: "Расстояние перемещения",
    moveDistanceDesc: "{squares} квадратов — {pixels}px за ход",
    autoFace: "Автоматическое определение лица при движении",
    humour: "Юмор (пасхалки)",
    language: "Язык",
    profileCreationMode: "Режим создания профиля",
    on: "На",
    off: "Выключенный",
  },
  profiles: {
    none: "Анимированные профили токенов не настроены.",
    noProfile: "Для выбранного токена не назначен профиль.",
    id: "Идентификатор профиля",
    displayName: "Отображаемое имя",
    mappedStates: "Сопоставленные штаты",
    noneValue: "(никто)",
    personal: "личный",
    owner: "Владелец",
    submittedBy: "представлено",
    approveHint:
      "Используйте !adam --profile утвердить &lt;id&gt;, чтобы одобрить, или отклонить &lt;id&gt;, чтобы отклонить.",
  },
  menu: {
    title: "АДАМ. Панель управления",
    movement: "Движение",
    facing: "Облицовка",
    state: "Состояние",
    stateLabel: "Состояние",
    facingLabel: "Облицовка",
    profileLabel: "Профиль",
    noProfile: "Нет профиля",
    help: "Помощь",
    config: "Конфигурация",
    states: {
      idle: "Праздный",
      combat: "Бой",
      walk: "Ходить",
      dash: "Бросаться",
      sneak: "Красться",
      rage: "Ярость",
      spellcasting: "Заклинание",
      help: "Помощь",
    },
  },
  info: {
    subtitle: "Анимированное направление и движение",
    versionLabel: "Версия",
    updatedLabel: "Обновлено",
    creditsBody:
      "A.D.A.M.<br>Анимированные направления и движения<br><br>При поддержке SIMON.<br>Определенно не по имени Саймон.",
    ready: "МОД ГОТОВ",
  },
  easter: {
    toTheLeft: "Налево, налево...",
    notGoingAnywhere:
      "АДАМ. определил, что на самом деле вы никуда не собираетесь.",
    areWeThereYet: "Мы уже там?",
    sneakSpam:
      "Никто тебя не видел.<br>Никто тебя не видел.<br>Никто тебя не видел.",
    helpSpam: "Кто такая добрая сова?",
    rageRage: "Дорн бы одобрил.",
    simonResponse: "...и не называй меня Саймоном!",
    simonNoSays: "Саймон что говорит?",
    versionEgg: "АДАМ. v{version}<br><br>Определенно не САЙМОН.",
  },
};

export default TRANSLATION;
