const TRANSLATION = {
  titles: {
    error: "エラー",
    noTokenSelected: "トークンが選択されていません",
    tokenError: "トークンエラー",
    missingDirection: "方向がありません",
    invalidDirection: "無効な方向",
    missingState: "欠落状態",
    invalidState: "無効な状態",
    missingAction: "不足しているアクション",
    invalidAction: "無効なアクション",
    accessDenied: "アクセスが拒否されました",
    invalidValue: "無効な値",
    unknownCommand: "不明なコマンド",
    moveError: "移動エラー",
    macroExists: "マクロが存在します",
    macroInstalled: "マクロがインストールされました",
    invalidUsage: "無効な使用法",
    profileAssigned: "プロファイルが割り当てられました",
    profileRemoved: "プロファイルが削除されました",
    unknownProfile: "不明なプロフィール",
    configuration: "構成",
    settingsReset: "設定のリセット",
    scriptReady: "スクリプトの準備完了",
    versionInfo: "バージョン情報",
    creditsTitle: "クレジット",
    adamsMenu: "アダム。コントロールデッキ",
    adamsHelp: "アダム。ヘルプ",
    adamsSettings: "アダム。設定",
    profiles: "設定されたプロファイル",
    tokenProfile: "トークンプロファイル",
    success: "成功",
    langSet: "言語セット",
    langInvalid: "無効な言語",
    profileCreated: "プロファイルが作成されました",
    profileUpdated: "プロフィールが更新されました",
    profileDeleted: "プロファイルが削除されました",
    profileRenamed: "プロファイルの名前が変更されました",
    draftSubmitted: "草案が提出されました",
    draftApproved: "草案が承認されました",
    draftRejected: "ドラフトは拒否されました",
    pendingDrafts: "保留中のプロファイルの下書き",
    profileCreationMode: "プロファイル作成モード",
    draftNotification: "プロファイルのドラフトは保留中です",
  },
  errors: {
    noTokenSelected:
      "トークンが選択されていません。最初にトークンを選択してから、方向ボタンをクリックしてください。",
    noTokenSelectedStill: "まだトークンが選択されていません。",
    noTokenSelectedPersistent:
      "あなたの粘り強さに敬意を表します。最初にトークンを選択します。",
    tokenNotFound: "選択されたトークンが見つかりませんでした。",
    missingDirection:
      "方向性を教えてください。例: <code>!adam --move n</code><br><em>方向: n、ne、e、se、s、sw、w、nw</em>",
    invalidDirection:
      "不明な方向: <strong>{value}</strong><br><br>有効: n、ne、e、se、s、sw、w、nw (または北、北東などの完全な名前)",
    missingState: "州を入力してください。<br>有効: {states}",
    invalidState: "不明な状態: <strong>{value}</strong><br><br>有効: {states}",
    missingAction:
      "アクションを提供してください。例: ヘルプ、スペルキャスト、レイジ、ダッシュ、スニーク、アイドル、戦闘",
    invalidAction:
      "不明なアクション: <strong>{value}</strong><br><br>既知のアクション: {actions}",
    accessDeniedConfig: "設定の変更は GM に制限されます。",
    accessDeniedProfileAssign: "プロファイルの割り当ては GM に限定されます。",
    accessDeniedProfileRemove: "プロファイルの削除は GM に制限されています。",
    accessDeniedMacro: "マクロのインストールは GM に限定されます。",
    accessDeniedReset: "設定のリセットはGMに限定されます。",
    unknownCommand:
      "不明なコマンドです。使用可能なコマンドのリストについては、<code>!adam --help</code> を試してください。",
    moveFailed: "移動に失敗しました。",
    gridSizeInvalid:
      "グリッド サイズは 10 ～ 1000 (ピクセル) の整数である必要があります。",
    moveDistanceInvalid:
      "移動距離は 1 ～ 20 (正方形) の整数でなければなりません。",
    autoFaceInvalid: "自動額面値はオンまたはオフでなければなりません。",
    humourInvalid: "ユーモアの値はオンまたはオフである必要があります。",
    langInvalid: "無効なロケールです。サポートされている: {locales}",
    profileUsage:
      "使用法: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>",
    profileAssignUsage:
      "使用法: <code>!adam --profile assign &lt;profileId&gt;</code>",
    profileUnknown:
      "プロファイル <strong>{id}</strong> は存在しません。使用可能なプロファイルを確認するには、<code>!adam --profile list</code> を使用します。",
    profileUnknownSub:
      "不明なプロファイル サブコマンド: <strong>{sub}</strong><br><br>有効: リスト、表示、作成、編集側、名前変更、削除、割り当て、削除、下書き、下書き側、レビュー、承認、拒否",
    profileIdInvalid:
      "無効なプロファイル ID: <strong>{id}</strong>。文字、数字、ハイフン、アンダースコアのみを使用してください (最大 50 文字)。",
    profileAlreadyExists:
      "プロファイル <strong>{id}</strong> はすでに存在します。 <code>!adam --profile edit-side</code> を使用して変更するか、最初に削除してください。",
    profileNotFound: "プロファイル <strong>{id}</strong> が見つかりません。",
    profileCreateUsage:
      "使用法: <code>!adam --profile create &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileEditSideUsage:
      "使用法: <code>!adam --profile 編集側 &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileRenameUsage:
      "使用法: <code>!adam --profile 名前を変更 &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDeleteUsage:
      "使用法: <code>!adam --profile &lt;profileId&gt; を削除</code>",
    profileDraftUsage:
      "使用法: <code>!adam --profile ドラフト &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDraftSideUsage:
      "使用法: <code>!adam --profile ドラフト側 &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileDraftNotFound:
      "<strong>{id}</strong> の保留中のドラフトは見つかりませんでした。 <code>!adam --profile ドラフト</code> を使用して提出してください。",
    profileGmOnly: "プロフィールの作成は GM に制限されています。",
    profileEditGmOnly: "このプロファイルの変更は GM に制限されています。",
    profileDeleteGmOnly: "このプロファイルの削除は GM に制限されています。",
    profileGlobalReadOnly:
      "プロファイル <strong>{id}</strong> はグローバル プロファイルであり、GM のみが変更できます。",
    profileNotOwned:
      "プロファイル <strong>{id}</strong> を所有していないため、変更できません。",
    profileModeRequiresDraft:
      "このゲームではプロフィールの作成には GM の承認が必要です。ドラフトを送信するには、<code>!adam --profile ドラフト &lt;id&gt; &lt;name&gt;</code> を使用します。",
    profileAssignNoControl:
      "個人プロファイルは、自分が管理するトークンにのみ割り当てることができます。",
    profileAssignNotOwned:
      "独自のプロファイルは、自分が管理するトークンにのみ割り当てることができます。プロフィール <strong>{id}</strong> は別のプレイヤーに属しています。",
    profileCreationModeInvalid:
      "無効なプロファイル作成モードです。有効: gm のみ、gm 承認、すべてのユーザー。",
    profileReviewGmOnly: "GM のみが保留中のドラフトをレビューできます。",
    profileApproveGmOnly: "プロフィールの下書きを承認できるのは GM だけです。",
    profileRejectGmOnly: "プロフィール草稿を拒否できるのは GM のみです。",
    invalidAnimSet:
      "アニメーション セットは次のとおりである必要があります: 北または南。",
    invalidSideNumber: "辺番号は正の整数 (1 以上) でなければなりません。",
    noDrafts: "保留中のプロファイルの下書きはありません。",
    profileDraftConflict:
      "<strong>{id}</strong> の保留中のドラフトはすでに存在しており、別のプレイヤーに属しています。",
    profileDraftNotGmApproved:
      "ドラフトの送信は、プロファイル作成モードが <code>gm-approved</code> の場合にのみ利用可能です。",
    profileApproveConflict:
      "<strong>{id}</strong> という名前のアクティブなプロファイルはすでに存在します。このドラフトを承認する前に、まず削除してください。",
    macroExists:
      "「<strong>{name}</strong>」という名前のマクロはすでに存在します。",
    simonUnknown:
      "Simon は方法がわかりません: <em>{command}</em><br><br>試してください: <code>!simon は n を移動と言います</code>",
  },
  confirm: {
    facing:
      "<strong>{token}</strong> は <strong>{direction}</strong> と対戦するようになりました。",
    stateSet:
      "<strong>{token}</strong> の状態が <strong>{state}</strong> に設定されました。",
    actionSet:
      "<strong>{token}</strong> アクション: <strong>{action}</strong> → 状態: <strong>{state}</strong>。",
    profileAssigned:
      "プロファイル <strong>{id}</strong> が <strong>{token}</strong> に割り当てられました。",
    profileRemoved:
      "プロフィールが <strong>{token}</strong> から削除されました。",
    profileCreated: "プロファイル <strong>{id}</strong> が作成されました。",
    profileSideSet:
      "プロフィール <strong>{id}</strong>: {state}/{animSet} → サイド {number}。",
    profileRenamed:
      "プロファイル <strong>{id}</strong> の名前が <strong>{name}</strong> に変更されました。",
    profileDeleted: "プロフィール <strong>{id}</strong> が削除されました。",
    profileDraftSubmitted:
      "プロフィール <strong>{id}</strong> のドラフトが GM の承認のために送信されました。",
    profileDraftApproved:
      "プロファイルの下書き <strong>{id}</strong> が承認され、アクティブなプロファイルに追加されました。",
    profileDraftRejected:
      "プロファイルの下書き <strong>{id}</strong> は拒否されました。",
    macroInstalled:
      "グローバル マクロ '<strong>{name}</strong>' が作成され、すべてのプレイヤーに表示されます。",
    configUpdated: "設定が更新されました。",
    settingsReset:
      "<strong>設定が工場出荷時のデフォルトにリセットされます。</strong>",
    langSet: "言語は {locale} に設定されました。",
  },
  settings: {
    gridSize: "グリッドサイズ",
    gridSizeDesc: "{size}px/平方",
    moveDistance: "移動距離",
    moveDistanceDesc: "{squares} 正方形 — 移動ごとに {pixels}px",
    autoFace: "移動中の自動顔調整",
    humour: "ユーモア (イースターエッグ)",
    language: "言語",
    profileCreationMode: "プロファイル作成モード",
    on: "の上",
    off: "オフ",
  },
  profiles: {
    none: "アニメーション化されたトークン プロファイルは構成されていません。",
    noProfile: "選択したトークンにはプロファイルが割り当てられていません。",
    id: "プロフィールID",
    displayName: "表示名",
    mappedStates: "マップされた州",
    noneValue: "（なし）",
    personal: "個人的",
    owner: "所有者",
    submittedBy: "によって提出されました",
    approveHint:
      "承認するには !adam --profile を使用し、&lt;id&gt; を承認するか、拒否するには &lt;id&gt; を使用します。",
  },
  menu: {
    title: "アダム。コントロールデッキ",
    movement: "動き",
    facing: "対面",
    state: "州",
    stateLabel: "州",
    facingLabel: "対面",
    profileLabel: "プロフィール",
    noProfile: "プロフィールなし",
    help: "ヘルプ",
    config: "構成",
    states: {
      idle: "アイドル状態",
      combat: "戦闘",
      walk: "歩く",
      dash: "ダッシュ",
      sneak: "こっそり",
      rage: "怒り",
      spellcasting: "スペルキャスト",
      help: "ヘルプ",
    },
  },
  info: {
    subtitle: "アニメーションの方向と動き",
    versionLabel: "バージョン",
    updatedLabel: "更新されました",
    creditsBody:
      "A.D.A.M.<br>アニメーションの方向と動き<br><br>SIMON によって提供されています。<br>決して Simon とは呼ばれません。",
    ready: "MOD対応",
  },
  easter: {
    toTheLeft: "左へ、左へ…",
    notGoingAnywhere:
      "アダム。あなたは実際にはどこにも行かないと判断しました。",
    areWeThereYet: "もう到着しましたか？",
    sneakSpam:
      "誰もあなたを見ていません<br>誰もあなたを見ていません<br>誰もあなたを見ていません。",
    helpSpam: "良いフクロウは誰ですか？",
    rageRage: "ドーン氏なら同意するだろう。",
    simonResponse: "...サイモンと呼ばないでください!",
    simonNoSays: "サイモンは何と言っていますか？",
    versionEgg: "アダム。 v{version}<br><br>決してサイモンではありません。",
  },
};

export default TRANSLATION;
