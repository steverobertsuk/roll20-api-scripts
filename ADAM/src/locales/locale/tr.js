const TRANSLATION = {
  titles: {
    error: "Hata",
    noTokenSelected: "Jeton Seçilmedi",
    tokenError: "Belirteç Hatası",
    missingDirection: "Eksik Yön",
    invalidDirection: "Geçersiz Yön",
    missingState: "Eksik Durum",
    invalidState: "Geçersiz Durum",
    missingAction: "Eksik İşlem",
    invalidAction: "Geçersiz İşlem",
    accessDenied: "Erişim engellendi",
    invalidValue: "Geçersiz Değer",
    unknownCommand: "Bilinmeyen Komut",
    moveError: "Taşıma Hatası",
    macroExists: "Makro Var",
    macroInstalled: "Makro Yüklendi",
    invalidUsage: "Geçersiz Kullanım",
    profileAssigned: "Profil Atandı",
    profileRemoved: "Profil Kaldırıldı",
    unknownProfile: "Bilinmeyen Profil",
    configuration: "Yapılandırma",
    settingsReset: "Ayarları Sıfırla",
    scriptReady: "Senaryo Hazır",
    versionInfo: "Sürüm Bilgisi",
    creditsTitle: "Kredi",
    adamsMenu: "A.D.A.M. Kontrol Paneli",
    adamsHelp: "A.D.A.M. Yardım",
    adamsSettings: "A.D.A.M. Ayarlar",
    profiles: "Yapılandırılmış Profiller",
    tokenProfile: "Jeton Profili",
    success: "Başarı",
    langSet: "Dil Seti",
    langInvalid: "Geçersiz Dil",
    profileCreated: "Profil Oluşturuldu",
    profileUpdated: "Profil Güncellendi",
    profileDeleted: "Profil Silindi",
    profileRenamed: "Profil Yeniden Adlandırıldı",
    draftSubmitted: "Taslak Gönderildi",
    draftApproved: "Taslak Onaylandı",
    draftRejected: "Taslak Reddedildi",
    pendingDrafts: "Bekleyen Profil Taslakları",
    profileCreationMode: "Profil Oluşturma Modu",
    draftNotification: "Profil Taslağı Bekleniyor",
  },
  errors: {
    noTokenSelected:
      "Belirteç seçilmedi. Lütfen önce bir jeton seçin, ardından bir yön düğmesine tıklayın.",
    noTokenSelectedStill: "Hala jeton seçilmedi.",
    noTokenSelectedPersistent: "Azmine hayranım. Önce bir jeton seçin.",
    tokenNotFound: "Seçilen jeton bulunamadı.",
    missingDirection:
      "Lütfen bir yön belirtin. Örnek: <code>!adam --move n</code><br><em>Yol Tarifi: n, ne, e, se, s, sw, w, nw</em>",
    invalidDirection:
      "Bilinmeyen yön: <strong>{value}</strong><br><br>Geçerli: n, ne, e, se, s, sw, w, nw (veya kuzey, kuzeydoğu gibi tam adlar)",
    missingState: "Lütfen bir durum belirtin.<br>Geçerli: {states}",
    invalidState:
      "Bilinmeyen durum: <strong>{value}</strong><br><br>Geçerli: {states}",
    missingAction:
      "Lütfen bir işlem sağlayın. Örnekler: yardım, büyü yapma, öfke, atılma, gizlice girme, boşta kalma, dövüş",
    invalidAction:
      "Bilinmeyen eylem: <strong>{value}</strong><br><br>Bilinen eylemler: {actions}",
    accessDeniedConfig: "Konfigürasyon değişiklikleri GM ile sınırlıdır.",
    accessDeniedProfileAssign: "Profil ataması GM ile sınırlıdır.",
    accessDeniedProfileRemove: "Profil kaldırma GM ile sınırlıdır.",
    accessDeniedMacro: "Makro kurulumu GM ile sınırlıdır.",
    accessDeniedReset: "Ayarların sıfırlanması GM ile sınırlıdır.",
    unknownCommand:
      "Bilinmeyen komut. Kullanılabilir komutların listesi için <code>!adam --help</code> komutunu deneyin.",
    moveFailed: "Hareket başarısız oldu.",
    gridSizeInvalid:
      "Izgara boyutu 10 ile 1000 (piksel) arasında bir tam sayı olmalıdır.",
    moveDistanceInvalid:
      "Hareket mesafesi 1 ile 20 arasında bir tam sayı (kareler) olmalıdır.",
    autoFaceInvalid:
      "Otomatik yüz değeri şu şekilde olmalıdır: açık veya kapalı.",
    humourInvalid: "Mizah değeri şu şekilde olmalıdır: açık veya kapalı.",
    langInvalid: "Geçersiz yerel ayar. Desteklenen: {locales}",
    profileUsage:
      "Kullanım: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>",
    profileAssignUsage:
      "Kullanım: <code>!adam --profile atama &lt;profileId&gt;</code>",
    profileUnknown:
      "<strong>{id}</strong> profili mevcut değil. Kullanılabilir profilleri görmek için <code>!adam --profile list</code>'i kullanın.",
    profileUnknownSub:
      "Bilinmeyen profil alt komutu: <strong>{sub}</strong><br><br>Geçerli: listele, göster, oluştur, düzenleme tarafı, yeniden adlandır, sil, atama, kaldır, taslak, taslak tarafı, incele, onayla, reddet",
    profileIdInvalid:
      "Geçersiz profil kimliği: <strong>{id}</strong>. Yalnızca harf, sayı, kısa çizgi ve alt çizgi kullanın (en fazla 50 karakter).",
    profileAlreadyExists:
      "<strong>{id}</strong> profili zaten mevcut. Değiştirmek için <code>!adam --profile düzenleme tarafı</code>'nı kullanın veya önce silin.",
    profileNotFound: "<strong>{id}</strong> profili bulunamadı.",
    profileCreateUsage:
      "Kullanım: <code>!adam --profile create &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileEditSideUsage:
      "Kullanım: <code>!adam --profile düzenleme tarafı &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileRenameUsage:
      "Kullanım: <code>!adam --profile yeniden adlandır &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDeleteUsage:
      "Kullanım: <code>!adam --profile sil &lt;profileId&gt;</code>",
    profileDraftUsage:
      "Kullanım: <code>!adam --profile taslak &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDraftSideUsage:
      "Kullanım: <code>!adam --profile taslak tarafı &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileDraftNotFound:
      "<strong>{id}</strong> için bekleyen taslak bulunamadı. <code>!adam --profile taslağını</code> içeren bir tane gönderin.",
    profileGmOnly: "Profil oluşturma GM ile sınırlıdır.",
    profileEditGmOnly: "Bu profilin değiştirilmesi GM ile sınırlıdır.",
    profileDeleteGmOnly: "Bu profilin silinmesi GM ile sınırlıdır.",
    profileGlobalReadOnly:
      "<strong>{id}</strong> profili global bir profildir ve yalnızca GM tarafından değiştirilebilir.",
    profileNotOwned:
      "<strong>{id}</strong> profilinin sahibi değilsiniz ve onu değiştiremezsiniz.",
    profileModeRequiresDraft:
      "Bu oyunda profil oluşturmak GM onayı gerektirir. Taslak göndermek için <code>!adam --profile taslak &lt;id&gt; &lt;name&gt;</code> kullanın.",
    profileAssignNoControl:
      "Kişisel profilleri yalnızca kontrol ettiğiniz tokenlara atayabilirsiniz.",
    profileAssignNotOwned:
      "Kendi profillerinizi yalnızca kontrol ettiğiniz tokenlara atayabilirsiniz. <strong>{id}</strong> profili başka bir oyuncuya ait.",
    profileCreationModeInvalid:
      "Geçersiz profil oluşturma modu. Geçerli: yalnızca gm, gm onaylı, tüm kullanıcılar.",
    profileReviewGmOnly: "Bekleyen taslakları yalnızca GM inceleyebilir.",
    profileApproveGmOnly: "Profil taslaklarını yalnızca GM onaylayabilir.",
    profileRejectGmOnly: "Profil taslaklarını yalnızca GM reddedebilir.",
    invalidAnimSet: "Animasyon seti şu şekilde olmalıdır: kuzey veya güney.",
    invalidSideNumber:
      "Yan numara pozitif bir tamsayı (1 veya daha büyük) olmalıdır.",
    noDrafts: "Bekleyen profil taslağı yok.",
    profileDraftConflict:
      "<strong>{id}</strong> için beklemede olan bir taslak zaten mevcut ve başka bir oyuncuya ait.",
    profileDraftNotGmApproved:
      "Taslak gönderimleri yalnızca profil oluşturma modu <code>gm onaylı</code> olduğunda kullanılabilir.",
    profileApproveConflict:
      "<strong>{id}</strong> adlı etkin bir profil zaten mevcut. Bu taslağı onaylamadan önce onu silin.",
    macroExists: "'<strong>{name}</strong>' adlı bir makro zaten mevcut.",
    simonUnknown:
      "Simon nasıl yapılacağını bilmiyor: <em>{command}</em><br><br>Dene: <code>!simon n'yi hareket ettir diyor</code>",
  },
  confirm: {
    facing:
      "<strong>{token}</strong> artık <strong>{direction}</strong> ile karşı karşıya.",
    stateSet:
      "<strong>{token}</strong> durumu <strong>{state}</strong> olarak ayarlandı.",
    actionSet:
      "<strong>{token}</strong> eylem: <strong>{action}</strong> → durum: <strong>{state}</strong>.",
    profileAssigned:
      "<strong>{id}</strong> profili <strong>{token}</strong>'e atandı.",
    profileRemoved: "Profil <strong>{token}</strong> konumundan kaldırıldı.",
    profileCreated: "<strong>{id}</strong> profili oluşturuldu.",
    profileSideSet:
      "Profil <strong>{id}</strong>: {state}/{animSet} → yan {number}.",
    profileRenamed:
      "<strong>{id}</strong> profili <strong>{name}</strong> olarak yeniden adlandırıldı.",
    profileDeleted: "<strong>{id}</strong> profili silindi.",
    profileDraftSubmitted:
      "<strong>{id}</strong> profiline ilişkin taslak GM onayına gönderildi.",
    profileDraftApproved:
      "Profil taslağı <strong>{id}</strong> onaylandı ve etkin profillere eklendi.",
    profileDraftRejected: "<strong>{id}</strong> profil taslağı reddedildi.",
    macroInstalled:
      "Küresel makro '<strong>{name}</strong>' oluşturuldu ve tüm oyuncular tarafından görülebilir.",
    configUpdated: "Ayarlar güncellendi.",
    settingsReset:
      "<strong>Ayarlar fabrika varsayılanlarına sıfırlandı.</strong>",
    langSet: "Dil {locale} olarak ayarlandı.",
  },
  settings: {
    gridSize: "Izgara Boyutu",
    gridSizeDesc: "Kare başına {size}px",
    moveDistance: "Hareket Mesafesi",
    moveDistanceDesc: "{squares} kareler — hamle başına {pixels}px",
    autoFace: "Hareket Halinde Otomatik Yüzleşme",
    humour: "Mizah (Paskalya Yumurtaları)",
    language: "Dil",
    profileCreationMode: "Profil Oluşturma Modu",
    on: "Açık",
    off: "Kapalı",
  },
  profiles: {
    none: "Hiçbir animasyonlu belirteç profili yapılandırılmamış.",
    noProfile: "Seçilen belirtecin atanmış profili yok.",
    id: "Profil Kimliği",
    displayName: "Ekran adı",
    mappedStates: "Haritalanmış Eyaletler",
    noneValue: "(hiçbiri)",
    personal: "kişisel",
    owner: "Mal sahibi",
    submittedBy: "tarafından gönderildi",
    approveHint:
      "Onaylamak için !adam --profile onaylama &lt;id&gt; kullanın veya reddetmek için &lt;id&gt; kullanın.",
  },
  menu: {
    title: "A.D.A.M. Kontrol Paneli",
    movement: "Hareket",
    facing: "bakan",
    state: "Durum",
    stateLabel: "Durum",
    facingLabel: "bakan",
    profileLabel: "Profil",
    noProfile: "Profil yok",
    help: "Yardım",
    config: "Yapılandırma",
    states: {
      idle: "Boşta",
      combat: "Dövüş",
      walk: "Yürümek",
      dash: "Çizgi",
      sneak: "Gizlice",
      rage: "Öfkelenmek",
      spellcasting: "Büyü Yayını",
      help: "Yardım",
    },
  },
  info: {
    subtitle: "Animasyonlu Yön ve Hareket",
    versionLabel: "Sürüm",
    updatedLabel: "Güncellendi",
    creditsBody:
      "A.D.A.M.<br>Animasyonlu Yön ve Hareket<br><br>SIMON Tarafından Desteklenmiştir.<br>Kesinlikle Simon olarak adlandırılmamıştır.",
    ready: "MOD HAZIR",
  },
  easter: {
    toTheLeft: "Sola, sola...",
    notGoingAnywhere: "A.D.A.M. aslında hiçbir yere gitmeyeceğinizi belirledi.",
    areWeThereYet: "Henüz orada mıyız?",
    sneakSpam:
      "Kimse seni görmedi.<br>Kimse seni görmedi.<br>Kimse seni görmedi.",
    helpSpam: "İyi bir baykuş kimdir?",
    rageRage: "Dorn bunu onaylardı.",
    simonResponse: "...ve bana Simon deme!",
    simonNoSays: "Simon ne diyor?",
    versionEgg: "A.D.A.M. v{version}<br><br>Kesinlikle SIMON değil.",
  },
};

export default TRANSLATION;
