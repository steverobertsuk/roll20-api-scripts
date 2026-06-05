const TRANSLATION = {
  titles: {
    error: "Erro",
    noTokenSelected: "Nenhum token selecionado",
    tokenError: "Erro de token",
    missingDirection: "Direção ausente",
    invalidDirection: "Direção inválida",
    missingState: "Estado ausente",
    invalidState: "Estado inválido",
    missingAction: "Ação ausente",
    invalidAction: "Ação inválida",
    accessDenied: "Acesso negado",
    invalidValue: "Valor inválido",
    unknownCommand: "Comando desconhecido",
    moveError: "Erro ao mover",
    macroExists: "Macro existe",
    macroInstalled: "Macro instalada",
    invalidUsage: "Uso inválido",
    profileAssigned: "Perfil atribuído",
    profileRemoved: "Perfil removido",
    unknownProfile: "Perfil desconhecido",
    configuration: "Configuração",
    settingsReset: "Redefinir configurações",
    scriptReady: "Script pronto",
    versionInfo: "Informações da versão",
    creditsTitle: "Créditos",
    adamsMenu: "ADÃO. Plataforma de controle",
    adamsHelp: "ADÃO. Ajuda",
    adamsSettings: "ADÃO. Configurações",
    profiles: "Perfis configurados",
    tokenProfile: "Perfil de token",
    success: "Sucesso",
    langSet: "Conjunto de idiomas",
    langInvalid: "Idioma inválido",
    profileCreated: "Perfil criado",
    profileUpdated: "Perfil atualizado",
    profileDeleted: "Perfil excluído",
    profileRenamed: "Perfil renomeado",
    draftSubmitted: "Rascunho enviado",
    draftApproved: "Rascunho aprovado",
    draftRejected: "Rascunho rejeitado",
    pendingDrafts: "Rascunhos de perfil pendentes",
    profileCreationMode: "Modo de criação de perfil",
    draftNotification: "Rascunho de perfil pendente",
  },
  errors: {
    noTokenSelected:
      "Nenhum token selecionado. Selecione um token primeiro e depois clique em um botão de direção.",
    noTokenSelectedStill: "Ainda nenhum token selecionado.",
    noTokenSelectedPersistent:
      "Admiro sua persistência. Selecione um token primeiro.",
    tokenNotFound: "O token selecionado não foi encontrado.",
    missingDirection:
      "Por favor, forneça uma orientação. Exemplo: <code>!adam --move n</code><br><em>Rotas: n, ne, e, se, s, sw, w, nw</em>",
    invalidDirection:
      "Direção desconhecida: <strong>{value}</strong><br><br>Válido: n, ne, e, se, s, sw, w, nw (ou nomes completos, como norte, nordeste)",
    missingState: "Forneça um estado.<br>Válido: {states}",
    invalidState:
      "Estado desconhecido: <strong>{value}</strong><br><br>Válido: {states}",
    missingAction:
      "Forneça uma ação. Exemplos: ajuda, feitiço, raiva, corrida, esgueirar-se, ocioso, combate",
    invalidAction:
      "Ação desconhecida: <strong>{value}</strong><br><br>Ações conhecidas: {actions}",
    accessDeniedConfig: "As alterações de configuração são restritas ao GM.",
    accessDeniedProfileAssign: "A atribuição de perfil é restrita ao GM.",
    accessDeniedProfileRemove: "A remoção do perfil é restrita ao GM.",
    accessDeniedMacro: "A instalação da macro é restrita ao GM.",
    accessDeniedReset: "A redefinição das configurações é restrita ao GM.",
    unknownCommand:
      "Comando desconhecido. Experimente <code>!adam --help</code> para obter uma lista de comandos disponíveis.",
    moveFailed: "O movimento falhou.",
    gridSizeInvalid:
      "O tamanho da grade deve ser um número inteiro entre 10 e 1000 (pixels).",
    moveDistanceInvalid:
      "A distância do movimento deve ser um número inteiro entre 1 e 20 (quadrados).",
    autoFaceInvalid:
      "O valor facial automático deve ser: ativado ou desativado.",
    humourInvalid: "O valor do humor deve ser: ativado ou desativado.",
    langInvalid: "Local inválido. Compatível: {locales}",
    profileUsage:
      "Uso: <código>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>",
    profileAssignUsage:
      "Uso: <code>!adam --profile atribuir &lt;profileId&gt;</code>",
    profileUnknown:
      "O perfil <strong>{id}</strong> não existe. Use <code>!adam --profile list</code> para ver os perfis disponíveis.",
    profileUnknownSub:
      "Subcomando de perfil desconhecido: <strong>{sub}</strong><br><br>Válido: listar, mostrar, criar, editar, renomear, excluir, atribuir, remover, rascunho, rascunho, revisar, aprovar, rejeitar",
    profileIdInvalid:
      "ID de perfil inválido: <strong>{id}</strong>. Use apenas letras, números, hífens e sublinhados (máximo de 50 caracteres).",
    profileAlreadyExists:
      "O perfil <strong>{id}</strong> já existe. Use <code>!adam --profile edit-side</code> para modificá-lo ou excluí-lo primeiro.",
    profileNotFound: "Perfil <strong>{id}</strong> não encontrado.",
    profileCreateUsage:
      "Uso: <código>!adam --profile criar &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileEditSideUsage:
      "Uso: <code>!adam --profile lado da edição &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileRenameUsage:
      "Uso: <code>!adam --profile renomear &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDeleteUsage:
      "Uso: <code>!adam --profile deletar &lt;profileId&gt;</code>",
    profileDraftUsage:
      "Uso: <code>!adam --profile rascunho &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDraftSideUsage:
      "Uso: <code>!adam --profile lado do rascunho &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileDraftNotFound:
      "Nenhum rascunho pendente encontrado para <strong>{id}</strong>. Envie um com <code>!adam --profile rascunho</code>.",
    profileGmOnly: "A criação de perfil é restrita ao GM.",
    profileEditGmOnly: "A modificação deste perfil é restrita ao GM.",
    profileDeleteGmOnly: "A exclusão deste perfil é restrita ao GM.",
    profileGlobalReadOnly:
      "O perfil <strong>{id}</strong> é um perfil global e só pode ser modificado pelo GM.",
    profileNotOwned:
      "Você não possui o perfil <strong>{id}</strong> e não pode modificá-lo.",
    profileModeRequiresDraft:
      "A criação de perfil requer aprovação do GM neste jogo. Use <code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code> para enviar um rascunho.",
    profileAssignNoControl:
      "Você só pode atribuir perfis pessoais aos tokens que você controla.",
    profileAssignNotOwned:
      "Você só pode atribuir seus próprios perfis aos tokens que você controla. O perfil <strong>{id}</strong> pertence a outro jogador.",
    profileCreationModeInvalid:
      "Modo de criação de perfil inválido. Válido: somente GM, aprovado por GM, todos os usuários.",
    profileReviewGmOnly: "Somente o GM pode revisar rascunhos pendentes.",
    profileApproveGmOnly: "Somente o GM pode aprovar rascunhos de perfil.",
    profileRejectGmOnly: "Somente o GM pode rejeitar rascunhos de perfil.",
    invalidAnimSet: "O conjunto de animação deve ser: norte ou sul.",
    invalidSideNumber:
      "O número lateral deve ser um número inteiro positivo (1 ou maior).",
    noDrafts: "Nenhum rascunho de perfil pendente.",
    profileDraftConflict:
      "Um draft pendente para <strong>{id}</strong> já existe e pertence a outro jogador.",
    profileDraftNotGmApproved:
      "Os envios de rascunhos só estão disponíveis quando o modo de criação de perfil é <code>aprovado pela GM</code>.",
    profileApproveConflict:
      "Já existe um perfil ativo chamado <strong>{id}</strong>. Exclua-o antes de aprovar este rascunho.",
    macroExists: "Uma macro chamada '<strong>{name}</strong>' já existe.",
    simonUnknown:
      "Simon não sabe como: <em>{command}</em><br><br>Tente: <code>!simon diz para mover n</code>",
  },
  confirm: {
    facing:
      "<strong>{token}</strong> agora enfrenta <strong>{direction}</strong>.",
    stateSet:
      "Estado <strong>{token}</strong> definido como <strong>{state}</strong>.",
    actionSet:
      "<strong>{token}</strong> ação: <strong>{action}</strong> → estado: <strong>{state}</strong>.",
    profileAssigned:
      "Perfil <strong>{id}</strong> atribuído a <strong>{token}</strong>.",
    profileRemoved: "Perfil removido de <strong>{token}</strong>.",
    profileCreated: "Perfil <strong>{id}</strong> criado.",
    profileSideSet:
      "Perfil <strong>{id}</strong>: {state}/{animSet} → lado {number}.",
    profileRenamed:
      "Perfil <strong>{id}</strong> renomeado para <strong>{name}</strong>.",
    profileDeleted: "Perfil <strong>{id}</strong> excluído.",
    profileDraftSubmitted:
      "Rascunho do perfil <strong>{id}</strong> enviado para aprovação do GM.",
    profileDraftApproved:
      "Rascunho de perfil <strong>{id}</strong> aprovado e adicionado aos perfis ativos.",
    profileDraftRejected:
      "O rascunho do perfil <strong>{id}</strong> foi rejeitado.",
    macroInstalled:
      "A macro global '<strong>{name}</strong>' foi criada e está visível para todos os jogadores.",
    configUpdated: "Configurações atualizadas.",
    settingsReset:
      "<strong>As configurações foram redefinidas para os padrões de fábrica.</strong>",
    langSet: "Idioma definido como {locale}.",
  },
  settings: {
    gridSize: "Tamanho da grade",
    gridSizeDesc: "{size}px por quadrado",
    moveDistance: "Mover distância",
    moveDistanceDesc: "{squares} quadrado(s) — {pixels}px por movimento",
    autoFace: "Rosto automático em movimento",
    humour: "Humor (ovos de Páscoa)",
    language: "Linguagem",
    profileCreationMode: "Modo de criação de perfil",
    on: "Sobre",
    off: "Desligado",
  },
  profiles: {
    none: "Nenhum perfil de token animado está configurado.",
    noProfile: "O token selecionado não possui perfil atribuído.",
    id: "ID do perfil",
    displayName: "Nome de exibição",
    mappedStates: "Estados mapeados",
    noneValue: "(nenhum)",
    personal: "pessoal",
    owner: "Proprietário",
    submittedBy: "enviado por",
    approveHint:
      "Use !adam --profile aprovar &lt;id&gt; para aprovar ou rejeitar &lt;id&gt; para rejeitar.",
  },
  menu: {
    title: "ADÃO. Plataforma de controle",
    movement: "Movimento",
    facing: "Enfrentando",
    state: "Estado",
    stateLabel: "Estado",
    facingLabel: "Enfrentando",
    profileLabel: "Perfil",
    noProfile: "Sem perfil",
    help: "Ajuda",
    config: "Configuração",
    states: {
      idle: "Parado",
      combat: "Combate",
      walk: "Andar",
      dash: "Traço",
      sneak: "Esgueirar-se",
      rage: "Raiva",
      spellcasting: "Feitiço",
      help: "Ajuda",
    },
  },
  info: {
    subtitle: "Direção e movimento animado",
    versionLabel: "Versão",
    updatedLabel: "Atualizado",
    creditsBody:
      "A.D.A.M.<br>Direção e movimento animado<br><br>Desenvolvido por SIMON.<br>Definitivamente não se chama Simon.",
    ready: "MOD PRONTO",
  },
  easter: {
    toTheLeft: "Para a esquerda, para a esquerda...",
    notGoingAnywhere:
      "ADÃO. determinou que você não vai realmente a lugar nenhum.",
    areWeThereYet: "Já chegamos?",
    sneakSpam: "Ninguém te viu.<br>Ninguém te viu.<br>Ninguém te viu.",
    helpSpam: "Quem é uma boa coruja?",
    rageRage: "Dorn aprovaria.",
    simonResponse: "...e não me chame de Simon!",
    simonNoSays: "Simão diz o quê?",
    versionEgg: "ADÃO. v{version}<br><br>Definitivamente não é SIMON.",
  },
};

export default TRANSLATION;
