const TRANSLATION = {
  titles: {
    error: "שְׁגִיאָה",
    noTokenSelected: "לא נבחר אסימון",
    tokenError: "שגיאת אסימון",
    missingDirection: "כיוון חסר",
    invalidDirection: "כיוון לא חוקי",
    missingState: "מצב חסר",
    invalidState: "מדינה לא חוקית",
    missingAction: "פעולה חסרה",
    invalidAction: "פעולה לא חוקית",
    accessDenied: "הגִישָׁה נִדחֲתָה",
    invalidValue: "ערך לא חוקי",
    unknownCommand: "פקודה לא ידועה",
    moveError: "שגיאת העברה",
    macroExists: "מאקרו קיים",
    macroInstalled: "מאקרו מותקן",
    invalidUsage: "שימוש לא חוקי",
    profileAssigned: "פרופיל הוקצה",
    profileRemoved: "הפרופיל הוסר",
    unknownProfile: "פרופיל לא ידוע",
    configuration: "תְצוּרָה",
    settingsReset: "איפוס הגדרות",
    scriptReady: "תסריט מוכן",
    versionInfo: "פרטי גרסה",
    creditsTitle: "קרדיטים",
    adamsMenu: "אָדָם רִאשׁוֹן. סיפון בקרה",
    adamsHelp: "אָדָם רִאשׁוֹן. עֶזרָה",
    adamsSettings: "אָדָם רִאשׁוֹן. הגדרות",
    profiles: "פרופילים מוגדרים",
    tokenProfile: "פרופיל אסימון",
    success: "הַצלָחָה",
    langSet: "סט שפה",
    langInvalid: "שפה לא חוקית",
    profileCreated: "פרופיל נוצר",
    profileUpdated: "הפרופיל עודכן",
    profileDeleted: "הפרופיל נמחק",
    profileRenamed: "שם הפרופיל שונה",
    draftSubmitted: "הטיוטה הוגשה",
    draftApproved: "הטיוטה אושרה",
    draftRejected: "הטיוטה נדחתה",
    pendingDrafts: "טיוטות פרופיל ממתינות",
    profileCreationMode: "מצב יצירת פרופיל",
    draftNotification: "טיוטת פרופיל בהמתנה",
  },
  errors: {
    noTokenSelected:
      "לא נבחר אסימון. אנא בחר תחילה אסימון ולאחר מכן לחץ על לחצן כיוון.",
    noTokenSelectedStill: "עדיין לא נבחר אסימון.",
    noTokenSelectedPersistent: "אני מעריץ את ההתמדה שלך. תחילה בחר אסימון.",
    tokenNotFound: "האסימון שנבחר לא נמצא.",
    missingDirection:
      "אנא ספק כיוון. דוגמה: <code>!adam --move n</code><br><em>כיוונים: n, ne, e, se, s, sw, w, nw</em>",
    invalidDirection:
      "כיוון לא ידוע: <strong>{value}</strong><br><br>תקף: n, ne, e, se, s, sw, w, nw (או שמות מלאים כגון צפון, צפון מזרח)",
    missingState: "אנא ספק מצב.<br>תקף: {states}",
    invalidState: "מצב לא ידוע: <strong>{value}</strong><br><br>תקף: {states}",
    missingAction:
      "אנא ספק פעולה. דוגמאות: עזרה, קסם, זעם, מקף, התגנבות, סרק, קרב",
    invalidAction:
      "פעולה לא ידועה: <strong>{value}</strong><br><br>פעולות ידועות: {actions}",
    accessDeniedConfig: "שינויים בתצורה מוגבלים ל-GM.",
    accessDeniedProfileAssign: "הקצאת פרופיל מוגבלת ל-GM.",
    accessDeniedProfileRemove: "הסרת פרופיל מוגבלת ל-GM.",
    accessDeniedMacro: "התקנת מאקרו מוגבלת ל-GM.",
    accessDeniedReset: "איפוס ההגדרות מוגבל ל-GM.",
    unknownCommand:
      "פקודה לא ידועה. נסה את <code>!adam --help</code> לקבלת רשימה של פקודות זמינות.",
    moveFailed: "התנועה נכשלה.",
    gridSizeInvalid: "גודל הרשת חייב להיות מספר שלם בין 10 ל-1000 (פיקסלים).",
    moveDistanceInvalid:
      "מרחק התנועה חייב להיות מספר שלם בין 1 ל-20 (ריבועים).",
    autoFaceInvalid: "ערך הנקוב האוטומטי חייב להיות: מופעל או כבוי.",
    humourInvalid: "ערך ההומור חייב להיות: מופעל או כבוי.",
    langInvalid: "מקום לא חוקי. נתמך: {locales}",
    profileUsage:
      "שימוש: <code>!adam --profile &lt;list|show|create|edit-side|rename|delete|assign|remove&gt;</code>",
    profileAssignUsage:
      "שימוש: <code>!adam --profile הקצה &lt;profileId&gt;</code>",
    profileUnknown:
      "הפרופיל <strong>{id}</strong> אינו קיים. השתמש ב-<code>!adam --profile list</code> כדי לראות פרופילים זמינים.",
    profileUnknownSub:
      "פקודת משנה של פרופיל לא ידוע: <strong>{sub}</strong><br><br>תקף: רשימה, הצג, צור, צד ערוך, שנה שם, מחק, הקצה, הסר, טיוטה, צד טיוטה, סקירה, אישור, דחה",
    profileIdInvalid:
      "מזהה פרופיל לא חוקי: <strong>{id}</strong>. השתמש רק באותיות, מספרים, מקפים וקווים תחתונים (מקסימום 50 תווים).",
    profileAlreadyExists:
      "הפרופיל <strong>{id}</strong> כבר קיים. השתמש ב-<code>!adam --profile edit-side</code> כדי לשנות אותו, או למחוק אותו תחילה.",
    profileNotFound: "הפרופיל <strong>{id}</strong> לא נמצא.",
    profileCreateUsage:
      "שימוש: <code>!adam --profile צור &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileEditSideUsage:
      "שימוש: <code>!adam --profile צד עריכה &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileRenameUsage:
      "שימוש: <code>!adam --profile שנה שם &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDeleteUsage:
      "שימוש: <code>!adam --profile מחק &lt;profileId&gt;</code>",
    profileDraftUsage:
      "שימוש: <code>!adam --profile טיוטה &lt;profileId&gt; &lt;displayName&gt;</code>",
    profileDraftSideUsage:
      "שימוש: <code>!adam --profile צד הטיוטה &lt;profileId&gt; &lt;state&gt; &lt;north|south&gt; &lt;number&gt;</code>",
    profileDraftNotFound:
      "לא נמצאה טיוטה ממתינה עבור <strong>{id}</strong>. שלח אחד עם <code>!adam --profile טיוטה</code>.",
    profileGmOnly: "יצירת פרופיל מוגבלת ל-GM.",
    profileEditGmOnly: "שינוי פרופיל זה מוגבל ל-GM.",
    profileDeleteGmOnly: "מחיקת פרופיל זה מוגבלת ל-GM.",
    profileGlobalReadOnly:
      "הפרופיל <strong>{id}</strong> הוא פרופיל גלובלי וניתן לשנותו רק על ידי ה-GM.",
    profileNotOwned:
      "אין לך פרופיל <strong>{id}</strong> ואינך יכול לשנות אותו.",
    profileModeRequiresDraft:
      "יצירת פרופיל דורשת אישור GM במשחק הזה. השתמש ב-<code>!adam --profile טיוטה &lt;id&gt; &lt;name&gt;</code> כדי לשלוח טיוטה.",
    profileAssignNoControl:
      "אתה יכול להקצות פרופילים אישיים רק לאסימונים שאתה שולט בהם.",
    profileAssignNotOwned:
      "אתה יכול להקצות את הפרופילים שלך רק לאסימונים שאתה שולט בהם. הפרופיל <strong>{id}</strong> שייך לשחקן אחר.",
    profileCreationModeInvalid:
      "מצב יצירת פרופיל לא חוקי. תקף: gm בלבד, gm-approved, כל המשתמשים.",
    profileReviewGmOnly: "רק ה-GM יכול לבדוק טיוטות ממתינות.",
    profileApproveGmOnly: "רק ה-GM יכול לאשר טיוטות פרופיל.",
    profileRejectGmOnly: "רק ה-GM יכול לדחות טיוטות פרופיל.",
    invalidAnimSet: "סט הנפשה חייב להיות: צפון או דרום.",
    invalidSideNumber: "מספר צד חייב להיות מספר שלם חיובי (1 או יותר).",
    noDrafts: "אין טיוטות פרופיל ממתינות.",
    profileDraftConflict:
      "טיוטה ממתינה עבור <strong>{id}</strong> כבר קיימת ושייכת לשחקן אחר.",
    profileDraftNotGmApproved:
      "הגשת טיוטות זמינות רק כאשר מצב יצירת הפרופיל <code>מאושר על ידי gm</code>.",
    profileApproveConflict:
      "פרופיל פעיל בשם <strong>{id}</strong> כבר קיים. מחק אותו תחילה לפני אישור הטיוטה הזו.",
    macroExists: "מאקרו בשם '<strong>{name}</strong>' כבר קיים.",
    simonUnknown:
      "סיימון לא יודע איך: <em>{command}</em><br><br>נסה: <code>!סיימון אומר להעביר n</code>",
  },
  confirm: {
    facing:
      "<strong>{token}</strong> מתמודד כעת עם <strong>{direction}</strong>.",
    stateSet: "מצב <strong>{token}</strong> מוגדר ל<strong>{state}</strong>.",
    actionSet:
      "פעולה <strong>{token}</strong>: <strong>{action}</strong> → מצב: <strong>{state}</strong>.",
    profileAssigned:
      "הפרופיל <strong>{id}</strong> הוקצה ל-<strong>{token}</strong>.",
    profileRemoved: "הפרופיל הוסר מ-<strong>{token}</strong>.",
    profileCreated: "הפרופיל <strong>{id}</strong> נוצר.",
    profileSideSet:
      "פרופיל <strong>{id}</strong>: {state}/{animSet} → צד {number}.",
    profileRenamed:
      "שם הפרופיל <strong>{id}</strong> שונה ל<strong>{name}</strong>.",
    profileDeleted: "הפרופיל <strong>{id}</strong> נמחק.",
    profileDraftSubmitted:
      "טיוטה לפרופיל <strong>{id}</strong> הוגשה לאישור GM.",
    profileDraftApproved:
      "טיוטת הפרופיל <strong>{id}</strong> אושרה ונוספה לפרופילים פעילים.",
    profileDraftRejected: "טיוטת הפרופיל <strong>{id}</strong> נדחתה.",
    macroInstalled:
      "המאקרו הגלובלי '<strong>{name}</strong>' נוצר והוא גלוי לכל השחקנים.",
    configUpdated: "ההגדרות עודכנו.",
    settingsReset: "<strong>ההגדרות אופסו לברירות המחדל של היצרן.</strong>",
    langSet: "השפה מוגדרת ל-{locale}.",
  },
  settings: {
    gridSize: "גודל רשת",
    gridSizeDesc: "{size}px לכל ריבוע",
    moveDistance: "הזז מרחק",
    moveDistanceDesc: "{squares} ריבוע(ים) - {pixels}px לכל מהלך",
    autoFace: "פנים אוטומטית בתנועה",
    humour: "הומור (ביצי פסחא)",
    language: "שָׂפָה",
    profileCreationMode: "מצב יצירת פרופיל",
    on: "עַל",
    off: "כבוי",
  },
  profiles: {
    none: "לא מוגדרים פרופילי אסימון מונפש.",
    noProfile: "לאסימון שנבחר לא הוקצה פרופיל.",
    id: "מזהה פרופיל",
    displayName: "שם תצוגה",
    mappedStates: "מדינות ממופות",
    noneValue: "(אַף לֹא אֶחָד)",
    personal: "אִישִׁי",
    owner: "בַּעַל",
    submittedBy: "הוגש על ידי",
    approveHint:
      "השתמש ב-!adam --profile לאשר &lt;id&gt; כדי לאשר או לדחות את &lt;id&gt; כדי לדחות.",
  },
  menu: {
    title: "אָדָם רִאשׁוֹן. סיפון בקרה",
    movement: "תְנוּעָה",
    facing: "מוּל",
    state: "מְדִינָה",
    stateLabel: "מְדִינָה",
    facingLabel: "מוּל",
    profileLabel: "פּרוֹפִיל",
    noProfile: "אין פרופיל",
    help: "עֶזרָה",
    config: "Config",
    states: {
      idle: "לְהִתְבַּטֵל",
      combat: "לְחִימָה",
      walk: "לָלֶכֶת",
      dash: "לְזַנֵק",
      sneak: "לְהִתְגַנֵב",
      rage: "זַעַם",
      spellcasting: "יציאת איות",
      help: "עֶזרָה",
    },
  },
  info: {
    subtitle: "בימוי ותנועה אנימציה",
    versionLabel: "גִרְסָה",
    updatedLabel: "מְעוּדכָּן",
    creditsBody:
      "A.D.A.M.<br>כיוון ותנועה מונפשת<br><br>מופעל על ידי SIMON.<br>בהחלט לא נקרא סיימון.",
    ready: "MOD מוכן",
  },
  easter: {
    toTheLeft: "שמאלה, שמאלה...",
    notGoingAnywhere: "אָדָם רִאשׁוֹן. קבע שאתה לא הולך לשום מקום.",
    areWeThereYet: "אנחנו כבר שם?",
    sneakSpam:
      "אף אחד לא ראה אותך.<br>אף אחד לא ראה אותך.<br>אף אחד לא ראה אותך.",
    helpSpam: "מי ינשוף טוב?",
    rageRage: "דורן היה מאשר.",
    simonResponse: "...ואל תקרא לי סיימון!",
    simonNoSays: "סיימון אומר מה?",
    versionEgg: "אָדָם רִאשׁוֹן. v{version}<br><br>בהחלט לא SIMON.",
  },
};

export default TRANSLATION;
