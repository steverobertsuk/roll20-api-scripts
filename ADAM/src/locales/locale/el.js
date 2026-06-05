const TRANSLATION = {
  titles: {
    error: "Σφάλμα",
    noTokenSelected: "Δεν έχει επιλεγεί διακριτικό",
    tokenError: "Σφάλμα διακριτικού",
    missingDirection: "Λείπει η κατεύθυνση",
    invalidDirection: "Μη έγκυρη κατεύθυνση",
    missingState: "Πολιτεία που λείπει",
    invalidState: "Μη έγκυρη κατάσταση",
    missingAction: "Δράση που λείπει",
    invalidAction: "Μη έγκυρη ενέργεια",
    accessDenied: "Δεν επιτρέπεται η πρόσβαση",
    invalidValue: "Μη έγκυρη τιμή",
    unknownCommand: "Άγνωστη Εντολή",
    moveError: "Σφάλμα μετακίνησης",
    macroExists: "Μακροεντολή Υπάρχει",
    macroInstalled: "Εγκατεστημένη μακροεντολή",
    invalidUsage: "Μη έγκυρη χρήση",
    profileAssigned: "Εκχωρήθηκε προφίλ",
    profileRemoved: "Το προφίλ καταργήθηκε",
    unknownProfile: "Άγνωστο προφίλ",
    configuration: "Διαμόρφωση",
    settingsReset: "Επαναφορά ρυθμίσεων",
    scriptReady: "Έτοιμο σενάριο",
    versionInfo: "Πληροφορίες έκδοσης",
    creditsTitle: "Πιστώσεις",
    adamsMenu: "ΑΔΑΜ. Κατάστρωμα ελέγχου",
    adamsHelp: "ΑΔΑΜ. Βοήθεια",
    adamsSettings: "ΑΔΑΜ. Ρυθμίσεις",
    profiles: "Διαμορφωμένα προφίλ",
    tokenProfile: "Token Προφίλ",
    success: "Επιτυχία",
    langSet: "Σύνολο γλώσσας",
    langInvalid: "Μη έγκυρη γλώσσα",
    profileCreated: "Δημιουργήθηκε προφίλ",
    profileUpdated: "Το προφίλ ενημερώθηκε",
    profileDeleted: "Το προφίλ διαγράφηκε",
    profileRenamed: "Το προφίλ μετονομάστηκε",
    draftSubmitted: "Το προσχέδιο υποβλήθηκε",
    draftApproved: "Εγκρίθηκε το σχέδιο",
    draftRejected: "Το σχέδιο απορρίφθηκε",
    pendingDrafts: "Προσχέδια προφίλ σε εκκρεμότητα",
    profileCreationMode: "Λειτουργία δημιουργίας προφίλ",
    draftNotification: "Εκκρεμεί το προσχέδιο προφίλ",
  },
  errors: {
    noTokenSelected:
      "Δεν έχει επιλεγεί διακριτικό. Επιλέξτε πρώτα ένα διακριτικό και μετά κάντε κλικ σε ένα κουμπί κατεύθυνσης.",
    noTokenSelectedStill: "Ακόμα δεν έχει επιλεγεί διακριτικό.",
    noTokenSelectedPersistent:
      "Θαυμάζω την επιμονή σου. Επιλέξτε πρώτα ένα διακριτικό.",
    tokenNotFound: "Δεν ήταν δυνατή η εύρεση του επιλεγμένου διακριτικού.",
    missingDirection:
      "Δώστε μια κατεύθυνση. Παράδειγμα: <code>!adam --move n</code><br><em>Οδηγίες: n, ne, e, se, s, sw, w, nw</em>",
    invalidDirection:
      "Άγνωστη κατεύθυνση: <strong>{value}</strong><br><br>Ισχύει: n, ne, e, se, s, sw, w, nw (ή πλήρη ονόματα όπως βόρεια, βορειοανατολικά)",
    missingState: "Καταχωρίστε μια κατάσταση.<br>Ισχύει: {states}",
    invalidState:
      "Άγνωστη κατάσταση: <strong>{value}</strong><br><br>Ισχύει: {states}",
    missingAction:
      "Δώστε μια ενέργεια. Παραδείγματα: βοήθεια, ξόρκι, οργή, παύλα, sneak, αδράνεια, μάχη",
    invalidAction:
      "Άγνωστη ενέργεια: <strong>{value}</strong><br><br>Γνωστές ενέργειες: {actions}",
    accessDeniedConfig: "Οι αλλαγές διαμόρφωσης περιορίζονται στο GM.",
    accessDeniedProfileAssign: "Η εκχώρηση προφίλ περιορίζεται στο GM.",
    accessDeniedProfileRemove: "Η αφαίρεση προφίλ περιορίζεται στο GM.",
    accessDeniedMacro: "Η εγκατάσταση μακροεντολής περιορίζεται στο GM.",
    accessDeniedReset: "Η επαναφορά ρυθμίσεων περιορίζεται στο GM.",
    unknownCommand:
      "Άγνωστη εντολή. Δοκιμάστε το <code>!adam --help</code> για μια λίστα με τις διαθέσιμες εντολές.",
    moveFailed: "Η κίνηση απέτυχε.",
    gridSizeInvalid:
      "Το μέγεθος του πλέγματος πρέπει να είναι ένας ακέραιος αριθμός μεταξύ 10 και 1000 (pixel).",
    moveDistanceInvalid:
      "Η απόσταση μετακίνησης πρέπει να είναι ακέραιος μεταξύ 1 και 20 (τετράγωνα).",
    autoFaceInvalid:
      "Η αυτόματη ονομαστική τιμή πρέπει να είναι: ενεργοποίηση ή απενεργοποίηση.",
    humourInvalid:
      "Η τιμή του χιούμορ πρέπει να είναι: ενεργοποιημένη ή απενεργοποιημένη.",
    langInvalid: "Μη έγκυρη τοπική ρύθμιση. Υποστηρίζεται: {locales}",
    profileUsage:
      "Χρήση: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>",
    profileAssignUsage:
      "Χρήση: <code>!adam --profile εκχώρηση &lt;profileId&gt;</code>",
    profileUnknown:
      "Το προφίλ <strong>{id}</strong> δεν υπάρχει. Χρησιμοποιήστε τη λίστα <code>!adam --profile</code> για να δείτε τα διαθέσιμα προφίλ.",
    profileUnknownSub:
      "Άγνωστη υποεντολή προφίλ: <strong>{sub}</strong><br><br>Ισχύει: λίστα, εμφάνιση, δημιουργία, πλευρά επεξεργασίας, μετονομασία, διαγραφή, εκχώρηση, αφαίρεση, πρόχειρο, σχέδιο, έλεγχος, έγκριση, απόρριψη",
    profileIdInvalid:
      "Μη έγκυρο αναγνωριστικό προφίλ: <strong>{id}</strong>. Χρησιμοποιήστε μόνο γράμματα, αριθμούς, παύλες και κάτω παύλες (έως 50 χαρακτήρες).",
    profileAlreadyExists:
      "Το προφίλ <strong>{id}</strong> υπάρχει ήδη. Χρησιμοποιήστε το <code>!adam --profile edit-side</code> για να το τροποποιήσετε ή να το διαγράψετε πρώτα.",
    profileNotFound: "Το προφίλ <strong>{id}</strong> δεν βρέθηκε.",
    profileCreateUsage:
      "Χρήση: <code>!adam --profile δημιουργία &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileEditSideUsage:
      "Χρήση: <code>!adam --profile edit-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileRenameUsage:
      "Χρήση: <code>!adam --profile μετονομασία &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDeleteUsage:
      "Χρήση: <code>!adam --profile διαγραφή &lt;profileId&gt;</code>",
    profileDraftUsage:
      "Χρήση: <code>!adam --profile πρόχειρο &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDraftSideUsage:
      "Χρήση: <code>!adam --profile draft-side &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileDraftNotFound:
      "Δεν βρέθηκε πρόχειρο σε εκκρεμότητα για <strong>{id}</strong>. Υποβάλετε ένα με <code>!adam --profile πρόχειρο</code>.",
    profileGmOnly: "Η δημιουργία προφίλ περιορίζεται στη GM.",
    profileEditGmOnly: "Η τροποποίηση αυτού του προφίλ περιορίζεται στο GM.",
    profileDeleteGmOnly: "Η διαγραφή αυτού του προφίλ περιορίζεται στο GM.",
    profileGlobalReadOnly:
      "Το προφίλ <strong>{id}</strong> είναι ένα παγκόσμιο προφίλ και μπορεί να τροποποιηθεί μόνο από την GM.",
    profileNotOwned:
      "Δεν σας ανήκει το προφίλ <strong>{id}</strong> και δεν μπορείτε να το τροποποιήσετε.",
    profileModeRequiresDraft:
      "Η δημιουργία προφίλ απαιτεί έγκριση της GM σε αυτό το παιχνίδι. Χρησιμοποιήστε το <code>!adam --profile πρόχειρο &lt;id&gt; &lt;name&gt;</code> για να υποβάλετε ένα πρόχειρο.",
    profileAssignNoControl:
      "Μπορείτε να εκχωρήσετε προσωπικά προφίλ μόνο σε διακριτικά που ελέγχετε.",
    profileAssignNotOwned:
      "Μπορείτε να εκχωρήσετε τα δικά σας προφίλ μόνο σε διακριτικά που ελέγχετε. Το προφίλ <strong>{id}</strong> ανήκει σε άλλο παίκτη.",
    profileCreationModeInvalid:
      "Μη έγκυρη λειτουργία δημιουργίας προφίλ. Ισχύει: μόνο για gm, εγκεκριμένο από gm, για όλους τους χρήστες.",
    profileReviewGmOnly: "Μόνο ο GM μπορεί να ελέγξει τα εκκρεμή προσχέδια.",
    profileApproveGmOnly: "Μόνο ο GM μπορεί να εγκρίνει προσχέδια προφίλ.",
    profileRejectGmOnly: "Μόνο ο GM μπορεί να απορρίψει προσχέδια προφίλ.",
    invalidAnimSet:
      "Το σετ κινουμένων σχεδίων πρέπει να είναι: βόρεια ή νότια.",
    invalidSideNumber:
      "Ο πλευρικός αριθμός πρέπει να είναι θετικός ακέραιος (1 ή μεγαλύτερος).",
    noDrafts: "Δεν υπάρχουν εκκρεμή προσχέδια προφίλ.",
    profileDraftConflict:
      "Ένα εκκρεμές προσχέδιο για το <strong>{id}</strong> υπάρχει ήδη και ανήκει σε άλλον παίκτη.",
    profileDraftNotGmApproved:
      "Οι υποβολές πρόχειρων είναι διαθέσιμες μόνο όταν η λειτουργία δημιουργίας προφίλ είναι <code>εγκεκριμένη από το gm</code>.",
    profileApproveConflict:
      "Υπάρχει ήδη ένα ενεργό προφίλ με το όνομα <strong>{id}</strong>. Διαγράψτε το πρώτα πριν εγκρίνετε αυτό το προσχέδιο.",
    macroExists:
      'Υπάρχει ήδη μια μακροεντολή με το όνομα "<strong>{name}</strong>".',
    simonUnknown:
      "Ο Simon δεν ξέρει πώς να: <em>{command}</em><br><br>Δοκιμάστε: <code>!Simon λέει μετακίνηση n</code>",
  },
  confirm: {
    facing:
      "Το <strong>{token}</strong> αντιμετωπίζει τώρα το <strong>{direction}</strong>.",
    stateSet:
      "Η κατάσταση <strong>{token}</strong> ορίστηκε σε <strong>{state}</strong>.",
    actionSet:
      "Ενέργεια <strong>{token}</strong>: <strong>{action}</strong> → κατάσταση: <strong>{state}</strong>.",
    profileAssigned:
      "Το προφίλ <strong>{id}</strong> εκχωρήθηκε σε <strong>{token}</strong>.",
    profileRemoved: "Το προφίλ καταργήθηκε από το <strong>{token}</strong>.",
    profileCreated: "Δημιουργήθηκε το προφίλ <strong>{id}</strong>.",
    profileSideSet:
      "Προφίλ <strong>{id}</strong>: {state}/{animSet} → πλευρά {number}.",
    profileRenamed:
      "Το προφίλ <strong>{id}</strong> μετονομάστηκε σε <strong>{name}</strong>.",
    profileDeleted: "Το προφίλ <strong>{id}</strong> διαγράφηκε.",
    profileDraftSubmitted:
      "Το προσχέδιο για το προφίλ <strong>{id}</strong> υποβλήθηκε για έγκριση της GM.",
    profileDraftApproved:
      "Το πρόχειρο προφίλ <strong>{id}</strong> εγκρίθηκε και προστέθηκε στα ενεργά προφίλ.",
    profileDraftRejected:
      "Το πρόχειρο προφίλ <strong>{id}</strong> απορρίφθηκε.",
    macroInstalled:
      "Η παγκόσμια μακροεντολή '<strong>{name}</strong>' έχει δημιουργηθεί και είναι ορατή σε όλους τους παίκτες.",
    configUpdated: "Οι ρυθμίσεις ενημερώθηκαν.",
    settingsReset:
      "<strong>Επαναφορά ρυθμίσεων στις εργοστασιακές προεπιλογές.</strong>",
    langSet: "Η γλώσσα ορίστηκε σε {locale}.",
  },
  settings: {
    gridSize: "Μέγεθος Πλέγματος",
    gridSizeDesc: "{size}px ανά τετράγωνο",
    moveDistance: "Μετακίνηση απόστασης",
    moveDistanceDesc: "{squares} τετράγωνα — {pixels}px ανά κίνηση",
    autoFace: "Αυτόματο πρόσωπο σε κίνηση",
    humour: "Χιούμορ (πασχαλινά αυγά)",
    language: "Γλώσσα",
    profileCreationMode: "Λειτουργία δημιουργίας προφίλ",
    on: "Επί",
    off: "Μακριά από",
  },
  profiles: {
    none: "Δεν έχουν διαμορφωθεί κινούμενα προφίλ διακριτικών.",
    noProfile: "Το επιλεγμένο διακριτικό δεν έχει εκχωρηθεί προφίλ.",
    id: "Αναγνωριστικό προφίλ",
    displayName: "Εμφανιζόμενο όνομα",
    mappedStates: "Χαρτογραφημένες Πολιτείες",
    noneValue: "(κανένας)",
    personal: "προσωπικός",
    owner: "Ιδιοκτήτης",
    submittedBy: "υποβλήθηκε από",
    approveHint:
      "Χρησιμοποιήστε το !adam --profile έγκριση &lt;id&gt; για έγκριση ή απόρριψη &lt;id&gt; για απόρριψη.",
  },
  menu: {
    title: "ΑΔΑΜ. Κατάστρωμα ελέγχου",
    movement: "Κίνηση",
    facing: "Αντιμέτωπος",
    state: "Κατάσταση",
    stateLabel: "Κατάσταση",
    facingLabel: "Αντιμέτωπος",
    profileLabel: "Προφίλ",
    noProfile: "Χωρίς προφίλ",
    help: "Βοήθεια",
    config: "Διαμόρφωση",
    states: {
      idle: "Αεργος",
      combat: "Μάχη",
      walk: "Βόλτα",
      dash: "Παύλα",
      sneak: "Ερπω",
      rage: "Οργή",
      spellcasting: "Ορθογραφία",
      help: "Βοήθεια",
    },
  },
  info: {
    subtitle: "Κινούμενα σχέδια σκηνοθεσίας και κίνησης",
    versionLabel: "Εκδοχή",
    updatedLabel: "Ενημερώθηκε",
    creditsBody:
      "A.D.A.M.<br>Animated Direction And Movement<br><br>Powered by SIMON.<br>Σίγουρα δεν ονομάζεται Simon.",
    ready: "MOD READY",
  },
  easter: {
    toTheLeft: "Αριστερά, αριστερά...",
    notGoingAnywhere:
      "ΑΔΑΜ. έχει αποφασίσει ότι στην πραγματικότητα δεν θα πάτε πουθενά.",
    areWeThereYet: "Είμαστε ακόμα εκεί;",
    sneakSpam:
      "Κανείς δεν σε έχει δει.<br>Κανείς δεν σε έχει δει.<br>Κανείς δεν σε έχει δει.",
    helpSpam: "Ποιος είναι μια καλή κουκουβάγια;",
    rageRage: "Ο Ντορν θα το ενέκρινε.",
    simonResponse: "...και μη με λες Σάιμον!",
    simonNoSays: "Τι λέει ο Σάιμον;",
    versionEgg: "ΑΔΑΜ. v{version}<br><br>Σίγουρα όχι SIMON.",
  },
};

export default TRANSLATION;
