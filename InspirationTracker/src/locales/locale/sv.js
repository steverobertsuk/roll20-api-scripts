const TRANSLATION = {
  terms: {
    heroic: 'Heroisk inspiration',
    classic: 'Inspiration',
  },
  titles: {
    ready: 'InspirationTracker är redo.',
    settings: 'Inställningar för InspirationTracker',
    help: 'Kommandon för InspirationTracker',
    party: 'Gruppens inspiration',
    yours: 'Dina rollpersoner',
    status: 'Status för InspirationTracker',
  },
  messages: {
    gained: '{name} har {term}!',
    spent: '{name} använder {term}.',
    spentBy: '{player} använde {term} åt {name}.',
    spentSheet: '{name} har inte längre {term} (ändrat på formuläret eller token).',
    restored: '{name} har {term} igen.',
    removed: '{term} togs bort från {name}.',
    already: '{name} har redan {term}.',
    none: '{name} har inte {term}.',
    busy: '{name} uppdateras fortfarande. Försök igen om en stund.',
    passOffer:
      '{name} har redan {term} och kan inte ha den två gånger. Ge den till en gruppmedlem som inte har den, eller släpp den.',
    passNobody: 'Alla andra gruppmedlemmar har den redan.',
    passAsked: 'Spelarna för {name} har tillfrågats vem som ska få {term}.',
    passed: '{from} ger {term} till {to}!',
    passAlready: '{to} har den redan. Välj någon annan.',
    declined: '{name} släpper den extra {term}.',
    undoAlready: '{name} har den redan igen.',
    synced: 'Formulär lästa: {checked}. Med inspiration: {inspired}.',
    migrated:
      'Inställningarna från version 0.1 behölls: markör, specialeffekt och dess typ. De nya inställningarna börjar på sina standardvärden.',
    legacyCommand: 'Ditt gamla kommando {command} fungerar fortfarande, liksom {main}.',
    macroHint:
      'Kör {command} för att ge spelarna en Använd-knapp. Den lägger till en token-åtgärd för alla.',
    macro:
      'Makrot "{name}" är klart: spelarna ser det som en token-åtgärd när de markerar en token de styr.',
    journal: 'Utdelningarna Hjälp och Kommandopanel har byggts om.',
    readyHint: 'Skriv {command} för menyn, eller öppna utdelningen Kommandopanel.',
  },
  errors: {
    denied: 'Du kan inte göra det för {name}.',
    gmOnly: 'Bara GM kan använda det kommandot.',
    gmOnlyHint: 'Spelare kan använda spend, party och help.',
    spendOff: 'GM har stängt av spelarnas möjlighet att använda inspiration.',
    noCharacter: 'Dessa tokens representerar ingen rollperson: {names}.',
    nothingSelected: 'Markera en token först.',
    nothingSelectedHint:
      'Markera tokens som representerar rollpersoner, eller lägg till --ids med token- eller rollperson-ID:n.',
    writeFailed: 'Kunde inte ändra formuläret för {name}.',
    offerGone: 'Det valet har redan gjorts, eller så har det gått ut.',
    passInvalid: 'Välj en annan gruppmedlem än den som har den.',
    undoGone: 'Den användningen har redan ångrats, eller är för gammal.',
    unknownMarker: 'Det finns ingen tokenmarkör som heter "{value}".',
    unknownMarkerHint:
      'Använd knappen Markör i inställningarna för att välja en ur dina markörsamlingar.',
    badSetting: 'Kan inte sätta {key} till "{value}".',
    badSettingHint: 'Skriv !inspiration set för att se alla inställningar och deras val.',
    unknownCommand: 'Okänt kommando: {command}.',
    unknownCommandHint: 'Skriv !inspiration help för listan över kommandon.',
  },
  menu: {
    selected: 'Markerade tokens',
    party: 'Grupp',
    tools: 'Verktyg',
    hint: 'Fullständiga instruktioner finns i utdelningen "{help}".',
    noSheet: 'inget formulär',
    noneYours: 'Du styr inga rollpersoner med formulär.',
    partyEmpty: 'Du styr inga gruppmedlemmar.',
    partyEmptyGm:
      'Ingen är med i gruppen än. Tilldela rollpersoner till spelare, eller markera tokens och klicka på Lägg till i grupp.',
    partyCount: '{count} av {total} har {term}.',
  },
  buttons: {
    menu: 'Meny',
    give: 'Ge',
    remove: 'Ta bort',
    toggle: 'Växla',
    spend: 'Använd',
    party: 'Grupp',
    partyAdd: 'Lägg till i grupp',
    partyRemove: 'Ta bort ur grupp',
    settings: 'Inställningar',
    macro: 'Spelarmakro',
    sync: 'Synka',
    status: 'Status',
    help: 'Hjälp',
    reset: 'Återställ inställningar',
    refresh: 'Uppdatera',
    undo: 'Ångra',
    decline: 'Släpp den',
  },
  values: {
    on: 'På',
    off: 'Av',
    wording: {
      auto: 'Från formuläret',
      2014: 'Inspiration (2014)',
      2024: 'Heroisk inspiration (2024)',
    },
    announce: {
      public: 'Alla',
      gm: 'GM och ägare',
      off: 'Ingen',
    },
  },
  settings: {
    language: {
      label: 'Språk',
      desc: 'Språk för menyer, meddelanden och utdelningar.',
    },
    marker: {
      label: 'Markör',
      desc: 'Tokenmarkör som visas medan en rollperson har inspiration. Egna markörsamlingar listas också.',
    },
    wording: {
      label: 'Benämning',
      desc: 'Kalla det Inspiration eller Heroisk inspiration. "Från formuläret" använder reglerna som valts på varje D&D 2024-formulär, och Inspiration på 2014-formuläret.',
    },
    announce: {
      label: 'Meddela',
      desc: 'Vem som ser chattmeddelandet när inspiration fås eller används.',
    },
    fx: {
      label: 'Specialeffekt',
      desc: 'Spela upp en specialeffekt på token när den får inspiration.',
    },
    fxType: {
      label: 'Effekttyp',
      desc: 'Vilken effekt som spelas upp, till exempel nova-holy, eller ID:t för en egen effekt.',
    },
    playerSpend: {
      label: 'Spelare kan använda',
      desc: 'Låt spelare använda inspiration för de rollpersoner de styr. GM meddelas, med en Ångra-knapp.',
    },
    playerOverview: {
      label: 'Spelare ser gruppen',
      desc: 'Låt spelare se vem i gruppen som har inspiration.',
    },
    passOn: {
      label: 'Skicka vidare (2024)',
      desc: 'Enligt 2024 års regler får en rollperson som skulle få Heroisk inspiration medan den redan har den ge den till en annan gruppmedlem.',
    },
  },
  status: {
    version: 'Version',
    beacon: 'D&D 2024-formulär',
    legacy: '2014-formulär',
    none: 'Rollpersoner utan inspirationsruta',
    rules2024: 'Använder 2024 års regler',
    party: 'Gruppmedlemmar',
    marker: 'Markör',
    fx: 'Specialeffekt',
    legacyCommand: 'Gammalt kommando',
  },
  help: {
    menu: 'Visar menyn. Med markerade tokens ger eller tar den bort inspiration, som version 0.1 gjorde.',
    give: 'Ger inspiration till de markerade rollpersonerna.',
    remove: 'Tar bort inspiration från de markerade rollpersonerna, utan att räkna den som använd.',
    toggle:
      'Ger inspiration till markerade rollpersoner som saknar den, och tar den från dem som har den.',
    spend: 'Använder inspiration för de markerade rollpersonerna och meddelar GM.',
    party:
      'Visar vem i gruppen som har inspiration, med knappar för att ge, ta bort eller använda den.',
    partyEdit: 'Lägger till de markerade rollpersonerna i gruppen, eller tar bort dem ur den.',
    ids: 'Arbetar på de angivna token- eller rollperson-ID:na i stället för de markerade tokens.',
    undo: 'Ger tillbaka inspiration som använts. ID:t kommer från meddelandet till GM om användningen.',
    macro:
      'Lägger till token-åtgärden "Inspiration", som spelarna klickar på för att använda inspiration.',
    sync: 'Läser alla formulär igen och rättar markörerna.',
    set: 'Visar inställningarna, eller ändrar en.',
    reset: 'Återställer alla inställningar till standard, utom språket.',
    status: 'Visar versionen, hittade formulär och de viktigaste inställningarna.',
    journal: 'Bygger om utdelningarna Hjälp och Kommandopanel.',
    help: 'Visar den här listan.',
  },
  helpPlayer: {
    menu: 'Visar dina rollpersoner och om de har inspiration.',
    spend: 'Använder inspiration för den markerade rollpersonen.',
    party: 'Visar gruppen, om GM tillåter det.',
    help: 'Visar den här listan.',
  },
  handout: {
    versionLabel: 'Version',
    subtitle: 'Inspiration och Heroisk inspiration för D&D 5e-formulären 2014 och 2024',
    overview: {
      heading: 'Översikt',
      body: 'InspirationTracker håller D&D-inspiration i takt på rollformuläret, token och i chatten. Ge den från menyn, formuläret eller tokenmarkören, så visar alla tokens för den rollpersonen markören. Spelare kan använda den med ett klick, och GM meddelas, med en Ångra-knapp. Det fungerar med D&D 2024-formuläret, där det kallas Heroisk inspiration, och med 2014 OGL-formuläret.',
    },
    quickStart: {
      heading: 'Snabbstart',
      steps: [
        'Öppna utdelningen Kommandopanel, eller skriv !inspiration för menyn.',
        'Markera en token och klicka på Ge. Rollpersonen får inspiration och dess tokens visar markören.',
        'Klicka på Spelarmakro en gång, så att spelarna får token-åtgärden "Inspiration" för att använda den.',
        'Klicka på Grupp för att se vem som har inspiration.',
      ],
    },
    sheets: {
      heading: 'Rollformulär',
      colSheet: 'Formulär',
      colWhere: 'Var inspirationen lagras',
      colSheet2014: 'D&D 5E by Roll20 (2014 OGL)',
      where2014: 'Rutan Inspiration, attributet "inspiration".',
      colSheet2024: 'D&D Fifth Edition (5E & 5.5E, 2024)',
      where2024: 'Rutan Heroisk inspiration, läst och skriven med getSheetItem och setSheetItem.',
      points: [
        'Att kryssa i eller ur rutan på ett formulär märks direkt: markören följer med, och att kryssa ur den räknas som att använda den.',
        'Med Benämning satt till "Från formuläret" använder varje D&D 2024-rollperson reglerna som valts i formulärets inställningar: 2024 års regler säger Heroisk inspiration, 2014 års regler säger Inspiration.',
        'Rollpersoner utan något av formulären lämnas i fred, så SLP-tokens ändras inte.',
      ],
    },
    players: {
      heading: 'Spelare',
      points: [
        'Spelare kan använda inspiration för rollpersoner de styr: klicka på Använd i chatten, eller på token-åtgärden "Inspiration".',
        'GM får ett meddelande om vem som använde den, med en Ångra-knapp.',
        'När en spelare skriver !inspiration visas spelarens rollpersoner och om de har inspiration.',
        'Stäng av Spelare kan använda för att bara GM ska kunna använda inspiration.',
      ],
    },
    passOn: {
      heading: 'Skicka vidare (2024 års regler)',
      points: [
        'En rollperson kan inte ha Heroisk inspiration två gånger. När en som har den skulle få den igen tillfrågas dess spelare om att ge den till en annan gruppmedlem som inte har den.',
        'Valet erbjuder alla gruppmedlemmar utan Heroisk inspiration, samt Släpp den. Det går ut efter en timme.',
        'Enligt 2014 års regler meddelas GM bara att rollpersonen redan har Inspiration.',
        'Stäng av Skicka vidare för att alltid få det meddelandet i stället.',
      ],
    },
    party: {
      heading: 'Gruppen',
      points: [
        'Gruppen är alla rollpersoner som en spelare styr. Markera tokens och klicka på Lägg till i grupp eller Ta bort ur grupp för att ändra den.',
        'GM:s översikt har knapparna Ge, Ta bort och Använd för varje medlem.',
        'Slå på Spelare ser gruppen för att låta spelarna också se översikten. De får bara Använd-knappar för sina egna rollpersoner.',
      ],
    },
    markers: {
      heading: 'Tokenmarkörer',
      points: [
        'Välj markören med inställningen Markör. Roll20:s färgade prickar, standardmarkörerna och dina egna markörsamlingar listas.',
        'Att lägga till markören på en token för hand, eller med TokenMod, ger rollpersonen inspiration. Att ta bort den använder den.',
        'Att byta markör flyttar den på alla tokens direkt.',
        'D&D 2024-formulärets egna tillståndsmarkörer erbjuds inte, eftersom formuläret sätter dem själv.',
      ],
    },
    commands: {
      heading: 'Kommandon',
      intro:
        'Alla kommandon börjar med !inspiration. Kommandon verkar på de markerade tokens om inte --ids anges.',
      mods: 'Andra Mods kan också skicka dessa kommandon, till exempel från ScriptCards. Andra Mods kan också anropa InspirationTracker.give, spend, remove och isInspired.',
      colCommand: 'Kommando',
      colDesc: 'Vad det gör',
    },
    settings: {
      heading: 'Inställningar',
      intro:
        'Ändra dessa med knappen Inställningar, eller skriv !inspiration set <setting> <value>.',
      colKey: 'Inställning',
      colName: 'Namn',
      colDesc: 'Vad den gör',
    },
    upgrading: {
      heading: 'Uppgradera från 0.1',
      points: [
        'Markören, specialeffekten och effekttypen från version 0.1 behålls.',
        'Om du valde ett eget kommando i 0.1 fungerar det fortfarande vid sidan av !inspiration.',
        '!inspiration med markerade tokens ger eller tar fortfarande bort inspiration.',
      ],
    },
    troubleshooting: {
      heading: 'Felsökning',
      points: [
        'Syns inte markören på en token? Klicka på Synka för att läsa alla formulär igen.',
        'En token som inte representerar en rollperson kan inte ha inspiration. Koppla den till en rollperson först.',
        'Händer inget när en spelare klickar på Använd? Kontrollera att rollpersonen är tilldelad den spelaren.',
        'Fel skrivs till API-konsolen på sidan Mod Scripts.',
      ],
    },
    languages: {
      heading: 'Språk',
      body: 'InspirationTracker är översatt till språken nedan. Välj ett med inställningen Språk.',
      colCode: 'Kod',
      colName: 'Språk',
      colNative: 'Eget namn',
    },
    credits: {
      heading: 'Tack till',
      original: 'Ursprunglig Mod av',
      maintainer: 'Version 1 underhålls av',
      support: 'Rapportera buggar och idéer på Roll20:s Mod-forum eller på GitHub.',
    },
    footer: 'Knappar för alla åtgärder finns i utdelningen "{deck}".',
  },
  deck: {
    subtitle: 'Kommandopanel',
    selectedDesc: 'Markera en eller flera tokens och klicka sedan.',
    partyDesc: 'Se vem som har inspiration, och välj vilka som är med i gruppen.',
    toolsDesc: 'Meny, inställningar, spelarmakrot och hjälp.',
    footer: 'Fullständiga instruktioner finns i utdelningen "{help}".',
  },
};

export default TRANSLATION;
