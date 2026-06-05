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
    settingsReset: "Redefinir as configurações",
    scriptReady: "Script pronto",
    versionInfo: "Informações da versão",
    creditsTitle: "Créditos",
    adamsMenu: "ADÃO. Plataforma de controlo",
    adamsHelp: "ADÃO. Ajuda",
    adamsSettings: "ADÃO. Configurações",
    profiles: "Perfis configurados",
    tokenProfile: "Perfil de token",
    success: "Sucesso",
    langSet: "Language Set",
    langInvalid: "Idioma inválido",
    profileCreated: "Perfil criado",
    profileUpdated: "Perfil atualizado",
    profileDeleted: "Perfil excluído",
    profileRenamed: "Perfil renomeado",
    draftSubmitted: "Rascunho enviado",
    draftApproved: "Rascunho aprovado",
    draftRejected: "Rascunho rejeitado",
    pendingDrafts: "Rascunhos de perfil pendentes",
    profileCreationMode: "Modo de criação de perfis",
    draftNotification: "Rascunho de perfil pendente",
  },
  errors: {
    noTokenSelected:
      "Nenhum token selecionado. Selecione primeiro um token e depois clique num botão de direção.",
    noTokenSelectedStill: "Ainda nenhum token selecionado.",
    noTokenSelectedPersistent:
      "Admiro a sua persistência. Selecione primeiro um token.",
    tokenNotFound: "O token selecionado não foi encontrado.",
    missingDirection:
      "Por favor, forneça uma orientação. Exemplo: <code>!adam --move n</code><br><em>Percursos: n, ne, e, se, s, sw, w, nw</em>",
    invalidDirection:
      "Direção desconhecida: <strong>{value}</strong><br><br>Válido: n, ne, e, se, s, sw, w, nw (ou nomes completos, como norte, nordeste)",
    missingState: "Forneça um estado. <br>Válido: {states}",
    invalidState:
      "Estado desconhecido: <strong>{value}</strong><br><br>Válido: {states}",
    missingAction:
      "Forneça uma ação. Exemplos: ajuda, feitiço, raiva, corrida, esgueirar-se, ocioso, combate",
    invalidAction:
      "Acção desconhecida: <strong>{value}</strong><br><br>Acções conhecidas: {actions}",
    accessDeniedConfig: "As alterações de configuração estão restritas ao GM.",
    accessDeniedProfileAssign: "A atribuição de perfil é restrita ao GM.",
    accessDeniedProfileRemove: "A remoção do perfil é restrita ao GM.",
    accessDeniedMacro: "A instalação da macro está restrita ao GM.",
    accessDeniedReset: "A reposição das definições é restrita ao GM.",
    unknownCommand:
      "Comando desconhecido. Experimente <code>!adam --help</code> para obter uma lista dos comandos disponíveis.",
    moveFailed: "O movimento falhou.",
    gridSizeInvalid:
      "O tamanho da grelha deve ser um número inteiro entre 10 e 1000 (pixéis).",
    moveDistanceInvalid:
      "A distância do movimento deve ser um número inteiro entre 1 e 20 (quadrados).",
    autoFaceInvalid:
      "O valor facial automático deve ser: ativado ou desativado.",
    humourInvalid: "O valor do humor deve ser: ativado ou desativado.",
    langInvalid: "Local inválido. Compatível: {locales}",
    profileUsage:
      "Utilização: <código>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>",
    profileAssignUsage:
      "Utilização: <code>!adam --profile assign &lt;profileId&gt;</code>",
    profileUnknown:
      "O perfil <strong>{id}</strong> não existe. Utilize <code>!adam --profile list</code> para ver os perfis disponíveis.",
    profileUnknownSub:
      "Subcomando de perfil desconhecido: <strong>{sub}</strong><br><br>Válido: listar, mostrar, criar, editar, renomear, apagar, atribuir, remover, rascunho, rascunho, rever, aprovar, rejeitar",
    profileIdInvalid:
      "ID de perfil inválido: <strong>{id}</strong>. Utilize apenas letras, números, hífens e sublinhados (máximo de 50 caracteres).",
    profileAlreadyExists:
      "O perfil <strong>{id}</strong> já existe. Utilize <code>!adam --profile edit-side</code> para o modificar ou eliminar primeiro.",
    profileNotFound: "Perfil <strong>{id}</strong> não encontrado.",
    profileCreateUsage:
      "Utilização: <código>!adam --profile criar &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileEditSideUsage:
      "Utilização: <code>!adam --profile lado da edição &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileRenameUsage:
      "Utilização: <code>!adam --profile renomear &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDeleteUsage:
      "Utilização: <code>!adam --profile apagar &lt;profileId&gt;</code>",
    profileDraftUsage:
      "Utilização: <code>!adam --profile rascunho &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDraftSideUsage:
      "Utilização: <code>!adam --profile lado do rascunho &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileDraftNotFound:
      "Não foi encontrado nenhum rascunho pendente para <strong>{id}</strong>. Envie um com <code>!adam --profile rascunho</code>.",
    profileGmOnly: "A criação de perfis é restrita ao GM.",
    profileEditGmOnly: "A modificação deste perfil restringe-se ao GM.",
    profileDeleteGmOnly: "A exclusão deste perfil é restrita ao GM.",
    profileGlobalReadOnly:
      "O perfil <strong>{id}</strong> é um perfil global e só pode ser modificado pelo GM.",
    profileNotOwned:
      "Não tem o perfil <strong>{id}</strong> e não pode modificá-lo.",
    profileModeRequiresDraft:
      "A criação de perfis requer aprovação do GM neste jogo. Utilize <code>!adam --profile draft &lt;id&gt; &lt;name&gt;</code> para enviar um rascunho.",
    profileAssignNoControl:
      "Só pode atribuir perfis pessoais aos tokens que controla.",
    profileAssignNotOwned:
      "Só pode atribuir os seus próprios perfis aos tokens que controla. O perfil <strong>{id}</strong> pertence a outro jogador.",
    profileCreationModeInvalid:
      "Modo de criação de perfil inválido. Válido: apenas GM, aprovado por GM, todos os utilizadores.",
    profileReviewGmOnly: "Apenas o GM pode rever rascunhos pendentes.",
    profileApproveGmOnly: "Apenas o GM pode aprovar os rascunhos de perfil.",
    profileRejectGmOnly: "Apenas o GM pode rejeitar os rascunhos de perfil.",
    invalidAnimSet: "O conjunto de animação deve ser: norte ou sul.",
    invalidSideNumber:
      "O número lateral deve ser um número inteiro positivo (1 ou superior).",
    noDrafts: "Sem rascunho de perfil pendente.",
    profileDraftConflict:
      "Um draft pendente para <strong>{id}</strong> já existe e pertence a outro jogador.",
    profileDraftNotGmApproved:
      "Os envios de rascunhos só estão disponíveis quando o modo de criação de perfis é <code>aprovado pela GM</code>.",
    profileApproveConflict:
      "Já existe um perfil ativo chamado <strong>{id}</strong>. Apague-o antes de aprovar este rascunho.",
    macroExists: "Uma macro chamada '<strong>{name}</strong>' já existe.",
    simonUnknown:
      "Simon não sabe como: <em>{command}</em><br><br>Tente: <code>!simon diz para mover n</code>",
  },
  confirm: {
    facing:
      "<strong>{token}</strong> enfrenta agora <strong>{direction}</strong>.",
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
    profileDeleted: "Perfil <strong>{id}</strong> eliminado.",
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
      "<strong>As definições foram repostas para os valores de fábrica.</strong>",
    langSet: "Idioma definido como {locale}.",
  },
  settings: {
    gridSize: "Tamanho da grelha",
    gridSizeDesc: "{size}px por quadrado",
    moveDistance: "Mover distância",
    moveDistanceDesc: "{squares} quadrado(s) — {pixels}px por movimento",
    autoFace: "Rosto automático em movimento",
    humour: "Humor (ovos da Páscoa)",
    language: "Idioma",
    profileCreationMode: "Modo de criação de perfis",
    on: "Em",
    off: "Desligado",
  },
  profiles: {
    none: "Nenhum perfil de token animado está configurado.",
    noProfile: "O token selecionado não tem perfil atribuído.",
    id: "ID do perfil",
    displayName: "Nome de exibição",
    mappedStates: "Estados mapeados",
    noneValue: "(nenhum)",
    personal: "pessoal",
    owner: "Proprietário",
    submittedBy: "enviado por",
    approveHint:
      "Utilize !adam --profile aprovar &lt;id&gt; para aprovar ou rejeitar &lt;id&gt; para rejeitar.",
  },
  menu: {
    title: "ADÃO. Plataforma de controlo",
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
      idle: "Ocioso",
      combat: "Combate",
      walk: "Caminhada",
      dash: "Travessão",
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
      "A.D.A.M.<br>Realização e movimento animado<br><br>Desenvolvido por SIMON. <br>Definitivamente não se chama Simon.",
    ready: "MOD PRONTO",
  },
  easter: {
    toTheLeft: "Para a esquerda, para a esquerda...",
    notGoingAnywhere: "ADÃO. determinou que não vai realmente a lado nenhum.",
    areWeThereYet: "Já chegámos?",
    sneakSpam: "Ninguém te viu. <br>Ninguém te viu. <br>Ninguém te viu.",
    helpSpam: "Quem é uma boa coruja?",
    rageRage: "Dorn aprovaria.",
    simonResponse: "...e não me chame Simon!",
    simonNoSays: "O Simão diz o quê?",
    versionEgg: "ADÃO. v{version}<br><br>Definitivamente não é SIMON.",
  },
};

export default TRANSLATION;
