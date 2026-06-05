const TRANSLATION = {
  titles: {
    error: '오류',
    noTokenSelected: '토큰을 선택하지 않았습니다.',
    tokenError: '토큰 오류',
    missingDirection: '누락된 방향',
    invalidDirection: '잘못된 방향',
    missingState: '누락된 상태',
    invalidState: '잘못된 상태',
    missingAction: '누락된 작업',
    invalidAction: '잘못된 작업',
    accessDenied: '접근 불가',
    invalidValue: '잘못된 값',
    unknownCommand: '알 수 없는 명령',
    moveError: '이동 오류',
    macroExists: '매크로가 존재함',
    macroInstalled: '매크로가 설치됨',
    invalidUsage: '잘못된 사용법',
    profileAssigned: '프로필이 할당됨',
    profileRemoved: '프로필이 삭제되었습니다.',
    unknownProfile: '알 수 없는 프로필',
    configuration: '구성',
    settingsReset: '설정 재설정',
    scriptReady: '스크립트 준비',
    versionInfo: '버전 정보',
    creditsTitle: '크레딧',
    adamsMenu: '아담. 컨트롤 데크',
    adamsHelp: '아담. 돕다',
    adamsSettings: '아담. 설정',
    profiles: '구성된 프로필',
    tokenProfile: '토큰 프로필',
    success: '성공',
    langSet: '언어 세트',
    langInvalid: '잘못된 언어',
    profileCreated: '프로필이 생성되었습니다.',
    profileUpdated: '프로필이 업데이트되었습니다.',
    profileDeleted: '프로필이 삭제되었습니다.',
    profileRenamed: '프로필 이름이 변경됨',
    draftSubmitted: '초안이 제출됨',
    draftApproved: '초안이 승인됨',
    draftRejected: '초안이 거부됨',
    pendingDrafts: '보류 중인 프로필 초안',
    profileCreationMode: '프로필 생성 모드',
    draftNotification: '프로필 초안 보류 중',
  },
  errors: {
    noTokenSelected: '선택된 토큰이 없습니다. 먼저 토큰을 선택한 후 방향 버튼을 클릭하세요.',
    noTokenSelectedStill: '아직 선택된 토큰이 없습니다.',
    noTokenSelectedPersistent: '나는 당신의 끈기를 존경합니다. 먼저 토큰을 선택하세요.',
    tokenNotFound: '선택한 토큰을 찾을 수 없습니다.',
    missingDirection:
      '방향을 알려주십시오. 예: <code>!adam --move n</code><br><em>길찾기: n, ne, e, se, s, sw, w, nw</em>',
    invalidDirection:
      '알 수 없는 방향: <strong>{value}</strong><br><br>유효: n, ne, e, se, s, sw, w, nw(또는 north, northeast와 같은 전체 이름)',
    missingState: '주를 입력하세요.<br>유효: {states}',
    invalidState: '알 수 없는 상태: <strong>{value}</strong><br><br>유효: {states}',
    missingAction: '작업을 제공하십시오. 예: 도움말, 주문 시전, 분노, 돌진, 몰래, 유휴, 전투',
    invalidAction: '알 수 없는 작업: <strong>{value}</strong><br><br>알려진 작업: {actions}',
    accessDeniedConfig: '구성 변경은 GM으로 제한됩니다.',
    accessDeniedProfileAssign: '프로필 할당은 GM으로 제한됩니다.',
    accessDeniedProfileRemove: '프로필 제거는 GM으로 제한됩니다.',
    accessDeniedMacro: '매크로 설치는 GM으로 제한됩니다.',
    accessDeniedReset: '설정 재설정은 GM으로 제한됩니다.',
    unknownCommand:
      '알 수 없는 명령입니다. 사용 가능한 명령 목록을 보려면 <code>!adam --help</code>을 사용해 보세요.',
    moveFailed: '이동에 실패했습니다.',
    gridSizeInvalid: '그리드 크기는 10에서 1000(픽셀) 사이의 정수여야 합니다.',
    moveDistanceInvalid: '이동 거리는 1에서 20(제곱) 사이의 정수여야 합니다.',
    autoFaceInvalid: '자동 얼굴 값은 켜짐 또는 꺼짐이어야 합니다.',
    humourInvalid: '유머 값은 켜짐 또는 꺼짐이어야 합니다.',
    langInvalid: '로캘이 잘못되었습니다. 지원됨: {locales}',
    profileUsage:
      '사용법: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>',
    profileAssignUsage: '사용법: <code>!adam --profile 할당 &lt;profileId&gt;</code>',
    profileUnknown:
      '<strong>{id}</strong> 프로필이 존재하지 않습니다. 사용 가능한 프로필을 보려면 <code>!adam --profile 목록</code>을 사용하세요.',
    profileUnknownSub:
      '알 수 없는 프로필 하위 명령: <strong>{sub}</strong><br><br>유효: 나열, 표시, 생성, 편집측, 이름 바꾸기, 삭제, 할당, 제거, 초안, 초안측, 검토, 승인, 거부',
    profileIdInvalid:
      '잘못된 프로필 ID: <strong>{id}</strong>. 문자, 숫자, 하이픈, 밑줄만 사용하세요(최대 50자).',
    profileAlreadyExists:
      '<strong>{id}</strong> 프로필이 이미 존재합니다. <code>!adam --profile edit-side</code>를 사용하여 수정하거나 먼저 삭제하세요.',
    profileNotFound: '<strong>{id}</strong> 프로필을 찾을 수 없습니다.',
    profileCreateUsage:
      '사용법: <code>!adam --profile 생성 &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileEditSideUsage:
      '사용법: <code>!adam --profile 편집측 &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileRenameUsage:
      '사용법: <code>!adam --profile 이름 바꾸기 &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDeleteUsage: '사용법: <code>!adam --profile 삭제 &lt;profileId&gt;</code>',
    profileDraftUsage:
      '사용법: <code>!adam --profile 초안 &lt;profileId&gt; &lt;displayName&gt;</code>',
    profileDraftSideUsage:
      '사용법: <code>!adam --profile 초안 쪽 &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>',
    profileDraftNotFound:
      '<strong>{id}</strong>에 대해 대기 중인 초안이 없습니다. <code>!adam --profile 초안</code>을 포함하여 제출하세요.',
    profileGmOnly: '프로필 생성은 GM으로 제한됩니다.',
    profileEditGmOnly: '이 프로필 수정은 GM으로 제한됩니다.',
    profileDeleteGmOnly: '이 프로필 삭제는 GM으로 제한됩니다.',
    profileGlobalReadOnly:
      '프로필 <strong>{id}</strong>은 전역 프로필이며 GM만 수정할 수 있습니다.',
    profileNotOwned:
      '귀하는 <strong>{id}</strong> 프로필을 소유하고 있지 않으며 프로필을 수정할 수 없습니다.',
    profileModeRequiresDraft:
      '이 게임에서는 프로필을 생성하려면 GM 승인이 필요합니다. 초안을 제출하려면 <code>!adam --profile 초안 &lt;id&gt; &lt;name&gt;</code>를 사용하세요.',
    profileAssignNoControl: '귀하가 관리하는 토큰에만 개인 프로필을 할당할 수 있습니다.',
    profileAssignNotOwned:
      '귀하는 귀하가 제어하는 ​​토큰에만 귀하의 프로필을 할당할 수 있습니다. 프로필 <strong>{id}</strong>이(가) 다른 플레이어에 속해 있습니다.',
    profileCreationModeInvalid:
      '프로필 생성 모드가 잘못되었습니다. 유효: GM 전용, GM 승인, 모든 사용자.',
    profileReviewGmOnly: 'GM만이 보류 중인 초안을 검토할 수 있습니다.',
    profileApproveGmOnly: 'GM만이 프로필 초안을 승인할 수 있습니다.',
    profileRejectGmOnly: 'GM만이 프로필 초안을 거부할 수 있습니다.',
    invalidAnimSet: '애니메이션 세트는 북쪽 또는 남쪽이어야 합니다.',
    invalidSideNumber: '변 번호는 양의 정수(1 이상)여야 합니다.',
    noDrafts: '보류 중인 프로필 초안이 없습니다.',
    profileDraftConflict:
      '<strong>{id}</strong>에 대해 대기 중인 초안이 이미 존재하며 다른 플레이어에게 속해 있습니다.',
    profileDraftNotGmApproved:
      '초안 제출은 프로필 생성 모드가 <code>gm 승인</code>인 경우에만 사용할 수 있습니다.',
    profileApproveConflict:
      '이름이 <strong>{id}</strong>인 활성 프로필이 이미 존재합니다. 이 초안을 승인하기 전에 먼저 삭제하세요.',
    macroExists: "'<strong>{name}</strong>'이라는 매크로가 이미 존재합니다.",
    simonUnknown:
      'Simon은 <em>{command}</em><br><br>다음 방법을 모릅니다. <code>!simon이 n 이동이라고 말합니다</code>',
  },
  confirm: {
    facing: '<strong>{token}</strong>은(는) 이제 <strong>{direction}</strong>과 마주하게 됩니다.',
    stateSet: '<strong>{token}</strong> 상태가 <strong>{state}</strong>로 설정되었습니다.',
    actionSet:
      '<strong>{token}</strong> 작업: <strong>{action}</strong> → 상태: <strong>{state}</strong>.',
    profileAssigned: '<strong>{id}</strong> 프로필이 <strong>{token}</strong>에 할당되었습니다.',
    profileRemoved: '<strong>{token}</strong>에서 프로필이 삭제되었습니다.',
    profileCreated: '<strong>{id}</strong> 프로필이 생성되었습니다.',
    profileSideSet: '프로필 <strong>{id}</strong>: {state}/{animSet} → {number} 쪽.',
    profileRenamed:
      '프로필 <strong>{id}</strong>의 이름이 <strong>{name}</strong>로 변경되었습니다.',
    profileDeleted: '<strong>{id}</strong> 프로필이 삭제되었습니다.',
    profileDraftSubmitted: 'GM 승인을 위해 <strong>{id}</strong> 프로필 초안이 제출되었습니다.',
    profileDraftApproved:
      '프로필 초안 <strong>{id}</strong>이(가) 승인되어 활성 프로필에 추가되었습니다.',
    profileDraftRejected: '프로필 초안 <strong>{id}</strong>이 거부되었습니다.',
    macroInstalled:
      "전역 매크로 '<strong>{name}</strong>'이 생성되었으며 모든 플레이어가 볼 수 있습니다.",
    configUpdated: '설정이 업데이트되었습니다.',
    settingsReset: '<strong>설정이 공장 기본값으로 재설정되었습니다.</strong>',
    langSet: '언어가 {locale}로 설정되었습니다.',
  },
  settings: {
    gridSize: '그리드 크기',
    gridSizeDesc: '정사각형당 {size}픽셀',
    moveDistance: '이동 거리',
    moveDistanceDesc: '{squares} 정사각형 — 이동당 {pixels}px',
    autoFace: '이동 시 자동 얼굴 인식',
    humour: '유머(부활절 달걀)',
    language: '언어',
    profileCreationMode: '프로필 생성 모드',
    on: '~에',
    off: '끄다',
  },
  profiles: {
    none: '애니메이션 토큰 프로필이 구성되지 않았습니다.',
    noProfile: '선택한 토큰에는 할당된 프로필이 없습니다.',
    id: '프로필 ID',
    displayName: '표시 이름',
    mappedStates: '매핑된 상태',
    noneValue: '(없음)',
    personal: '개인의',
    owner: '소유자',
    submittedBy: '에 의해 제출됨',
    approveHint:
      '!adam --profile 승인 &lt;id&gt;을 사용하여 승인하거나 거부하려면 &lt;id&gt;을 사용하세요.',
  },
  menu: {
    title: '아담. 컨트롤 데크',
    movement: '움직임',
    facing: '깃 달기',
    state: '상태',
    stateLabel: '상태',
    facingLabel: '깃 달기',
    profileLabel: '윤곽',
    noProfile: '프로필 없음',
    help: '돕다',
    config: '구성',
    states: {
      idle: '게으른',
      combat: '전투',
      walk: '걷다',
      dash: '대시',
      sneak: '좀도둑',
      rage: '격노',
      spellcasting: '주문 시전',
      help: '돕다',
    },
  },
  info: {
    subtitle: '애니메이션 방향 및 이동',
    versionLabel: '버전',
    updatedLabel: '업데이트됨',
    creditsBody:
      'A.D.A.M.<br>방향 및 움직임 애니메이션<br><br>SIMON 제공.<br>물론 Simon이라고 부르지는 않습니다.',
    ready: '모드 준비됨',
  },
  easter: {
    toTheLeft: '왼쪽으로, 왼쪽으로...',
    notGoingAnywhere: '아담. 당신은 실제로 아무데도 가지 않을 것이라고 결정했습니다.',
    areWeThereYet: '아직 도착하지 않았나요?',
    sneakSpam:
      '아무도 당신을 본 적이 없습니다.<br>아무도 당신을 본 적이 없습니다.<br>아무도 당신을 본 적이 없습니다.',
    helpSpam: '좋은 올빼미는 누구입니까?',
    rageRage: '돈은 승인할 것이다.',
    simonResponse: '...그리고 나를 사이먼이라고 부르지 마세요!',
    simonNoSays: '사이먼이 뭐라고 말했어요?',
    versionEgg: '아담. v{version}<br><br>물론 SIMON은 아닙니다.',
  },
};

export default TRANSLATION;
