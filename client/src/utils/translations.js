import { getNodeDisplayName } from './landmarkTranslations.js';

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
];

export const translations = {
  en: {
    // App Header
    appTitle: 'Chennai RailNav: Station Accessibility Guide',
    appSubtitle: 'Indoor Accessibility & Facility Guide',
    networkTag: 'Chennai Network • Live Indoor Nav',
    divyangjanTag: 'Divyangjan Friendly',
    accessibilityOptions: 'Accessibility',
    wcagDisplayModes: 'WCAG Display Modes',
    highContrast: 'High Contrast (Pitch Black)',
    largeText: 'Large Text Zoom',
    facilityControl: 'Facility Control',
    languageSelector: 'Language',

    // Route Planner Controls
    routePlannerTitle: 'Station Route Planner',
    startLocation: 'Start Location',
    destination: 'Destination (Where to go?)',
    orClickOnMap: 'Or click on map',
    clickNodeOnMap: 'Click node on map...',
    selectStartPrompt: 'Select Start: Click any point on the map',
    selectDestPrompt: 'Select Destination: Click where you want to go',
    selectStartPoint: 'Select your current location...',
    selectEndPoint: 'Where do you want to go?...',
    swapPoints: 'Swap Locations',
    reset: 'Reset',
    stepFreeMode: 'Step-Free / Wheelchair Path',
    activeBadge: 'Active',
    stepFreeDesc: 'Uses elevators and gentle ramps only. Avoids all stairs and escalators.',
    findRoute: 'Show Route',
    findAccessibleRoute: 'Show Step-Free Route',
    calculatingPath: 'Finding best route...',
    totalDistance: 'Total Distance',
    estWalkTime: 'Est. Walk Time',
    meters: 'm',
    minutes: 'min',

    // Voice Guidance
    voiceGuideTitle: 'Voice Audio Guide',
    speakingStep: 'Speaking Step',
    of: 'of',
    voiceGuideActiveDesc: 'Speaking step-by-step navigation instructions clearly.',
    voiceGuideInactiveDesc: 'Listen to step-by-step spoken audio directions.',
    startAudioGuidance: 'Start Voice Guide',
    stopAudioGuidance: 'Stop Voice',
    mute: 'Mute',
    unmute: 'Unmute',
    audioNotSupported: 'Audio guidance is not supported in this browser.',
    nowSpeaking: 'Now Speaking',

    // Directions List
    turnByTurnTitle: 'Turn-by-Turn Navigation',
    noRouteSelected: 'No Route Selected',
    noRouteDesc: 'Choose your location and destination from the controls or click nodes directly on the interactive map.',
    stepFreeTag: 'Step-Free',
    standardTag: 'Standard',
    stepsCount: 'steps',
    targetFloor: 'Target Floor',
    step: 'Step',
    accessibleStep: 'Accessible',

    // Map Canvas & Decks
    floorDeck: 'Floor Deck:',
    allDecks: 'All Decks',
    ground: 'Ground Floor',
    level1: 'Level 1 FOB',
    subway: 'Subway Pass',
    accessibleRouteBadge: 'Accessible Route (Step-Free)',
    standardRouteBadge: 'Standard Walking Route',
    entrancePrsHall: 'ENTRANCE & PRS HALL',
    centralFobSubway: 'CENTRAL FOB & SUBWAY',
    platformDecks: 'PLATFORM DECKS',
    tracksAndPlatforms: 'PLATFORM TRACKS & BOARDING DECKS',
    concourseAndEntry: 'MAIN CONCOURSE & ENTRANCE',
    fobSkywalk: 'CENTRAL FOB SKYWALK (LEVEL 1)',
    subwayPassage: 'UNDERGROUND SUBWAY PASSAGE',
    startPin: 'START',
    destPin: 'DESTINATION',
    setAsStart: 'Set as Start',
    setAsDest: 'Set as Destination',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    resetZoom: 'Reset View',
    stepFreeCertified: 'Green dot = Step-Free Certified',
    clickToSetPrompt: 'Click to select as Start or Destination',
    deck: 'Floor',
    type: 'Type',

    // Facility Simulator Modal
    facilityControlTitle: 'Station Facility Control & Maintenance Simulator',
    facilityControlSubtitle: 'Simulate lift outages or repairs to trigger live passenger rerouting.',
    facilityControlBanner: 'Toggle any elevator or ramp to Under Maintenance. The navigation engine will immediately detect the disruption, issue an alert banner, and compute an alternate accessible path.',
    stepFree: 'Step-Free',
    stairs: 'Stairs',
    operational: 'Operational',
    underMaintenance: 'Under Maintenance',
    simulateOutage: 'Simulate Outage',
    markRepaired: 'Mark Repaired',
    facilityModalFooter: 'Changes update MongoDB and affect real-time routing immediately.',
    done: 'Done',

    // Maintenance Alerts & Errors
    disruptionDetected: 'Facility Disruption Alert',
    dismiss: 'Dismiss',
    maintenanceOutageMsg: 'is currently out of service. Rerouting via alternate accessible path...',
    criticalBlockedMsg: 'is unavailable and all alternate paths require stairs. Please contact Divyangjan Special Assistance desk for buggy transfer.',
    restoredMsg: 'is now working again. Recalculating optimal path.',
    cannotBeIdentical: 'Start location and destination cannot be the same place.',
    selectBothPoints: 'Please select both your location and where you want to go.',

    // Footer
    footerTitle: 'Chennai Railway Station Facility Navigation & Accessibility System',
    footerSubtitle: 'Multilingual Edition • WCAG AAA High Contrast • Voice Guided • Southern Railway',

    // Language Modal
    welcomeTitle: 'Select Your Language',
    welcomeSubtitle: 'Please choose your preferred language for navigation and voice guidance',
  },

  ta: {
    // App Header (Spoken Tamil)
    appTitle: 'சென்னை ரயில்வே ஸ்டேஷன் வழிகாட்டி',
    appSubtitle: 'எளிதான நடைபாதை மற்றும் சக்கர நாற்காலி வழிகாட்டி',
    networkTag: 'சென்னை ரயில்வே நெட்வொர்க்',
    divyangjanTag: 'மாற்றுத்திறனாளி சிறப்பு உதவி',
    accessibilityOptions: 'வசதிகள்',
    wcagDisplayModes: 'திரைக் காட்சி முறைகள்',
    highContrast: 'கருப்பு-மஞ்சள் காட்சி (High Contrast)',
    largeText: 'பெரிய எழுத்துக்கள் (Large Text)',
    facilityControl: 'பராமரிப்பு கட்டுப்பாடு',
    languageSelector: 'மொழி',

    // Route Planner Controls (Spoken Tamil)
    routePlannerTitle: 'வழிகாட்டி திட்டம்',
    startLocation: 'நீங்க இருக்கும் இடம்',
    destination: 'எங்கே போக வேண்டும்?',
    orClickOnMap: 'அல்லது மேப்பில் கிளிக் பண்ணுங்க',
    clickNodeOnMap: 'மேப்பில் தேர்வு செய்யவும்...',
    selectStartPrompt: 'தொடக்க இடம்: மேப்பில் உள்ள புள்ளியை கிளிக் செய்யவும்',
    selectDestPrompt: 'சேருமிடம்: மேப்பில் செல்ல வேண்டிய இடத்தை கிளிக் செய்யவும்',
    selectStartPoint: 'இப்போது இருக்கும் இடத்தை தேர்வு செய்யவும்...',
    selectEndPoint: 'எந்த இடத்திற்கு போக வேண்டும்?...',
    swapPoints: 'இடங்களை மாற்று',
    reset: 'மீட்டமைக்க',
    stepFreeMode: 'படி இல்லாத வழி (வீல்சேர் பாதை)',
    activeBadge: 'செயலில்',
    stepFreeDesc: 'லிஃப்ட் மற்றும் ரேம்ப் வழியா மட்டுமே கூட்டிட்டு போகும். படிக்கட்டு வராது.',
    findRoute: 'வழியைக் காட்டு',
    findAccessibleRoute: 'படி இல்லாத வழியைக் காட்டு',
    calculatingPath: 'சிறந்த வழியை தேடுகிறது...',
    totalDistance: 'மொத்த தூரம்',
    estWalkTime: 'தோராயமான நேரம்',
    meters: 'மீட்டர்',
    minutes: 'நிமிடம்',

    // Voice Guidance (Station Announcer Tamil)
    voiceGuideTitle: 'நிலைய குரல் வழிகாட்டல் (Voice Guide)',
    speakingStep: 'அறிவிப்பு ஒலிபரப்பாகிறது',
    of: '/',
    voiceGuideActiveDesc: 'நிலைய அறிவிப்பாளர் குரலில் ஒவ்வொரு வழிகாட்டுதலும் தெளிவாக அறிவிக்கப்படுகிறது.',
    voiceGuideInactiveDesc: 'ரயில்வே நிலைய அறிவிப்பாளர் குரலில் வழிகாட்டுதலைக் கேளுங்கள்.',
    startAudioGuidance: 'நிலைய அறிவிப்பைத் தொடங்கு',
    stopAudioGuidance: 'அறிவிப்பை நிறுத்து',
    mute: 'ஒலியடக்கு',
    unmute: 'ஒலி எழுப்பு',
    audioNotSupported: 'இந்த உலாவியில் குரல் வழிகாட்டல் வசதி ஆதரிக்கப்படவில்லை.',
    nowSpeaking: 'தற்போது அறிவிக்கப்படுகிறது',

    // Directions List (Station Announcer Tamil)
    turnByTurnTitle: 'கட்ட-கட்டமான நிலைய வழிகாட்டுதல்',
    noRouteSelected: 'பாதை தேர்வு செய்யப்படவில்லை',
    noRouteDesc: 'நீங்கள் இருக்கும் இடம் மற்றும் செல்ல வேண்டிய இடத்தை மேலே தேர்வு செய்யவும்.',
    stepFreeTag: 'படி இல்லாதது',
    standardTag: 'வழக்கமான வழி',
    stepsCount: 'படிகள்',
    targetFloor: 'செல்ல வேண்டிய தளம்',
    step: 'படி',
    accessibleStep: 'அணுகக்கூடியது',

    // Map Canvas & Decks (Spoken Tamil)
    floorDeck: 'தளம்:',
    allDecks: 'எல்லா தளங்களும்',
    ground: 'தரைத்தளம்',
    level1: 'FOB நடைமேம்பாலம்',
    subway: 'சுரங்க நடைபாதை',
    accessibleRouteBadge: 'சக்கர நாற்காலி பாதை (படி இல்லை)',
    standardRouteBadge: 'வழக்கமான நடைபாதை',
    entrancePrsHall: 'நுழைவு & டிக்கெட் கவுண்ட்டர்',
    centralFobSubway: 'நடைமேம்பாலம் & சுரங்கப்பாதை',
    platformDecks: 'பிளாட்பாரங்கள்',
    tracksAndPlatforms: 'ரயில் தடங்கள் & நடைமேடைகள்',
    concourseAndEntry: 'பிரதான அரங்கம் & நுழைவு',
    fobSkywalk: 'மத்திய நடைமேம்பாலம் (FOB)',
    subwayPassage: 'சுரங்க நடைபாதை தடம்',
    startPin: 'தொடக்க இடம்',
    destPin: 'சேருமிடம்',
    setAsStart: 'தொடக்கமாக தேர்வு செய்',
    setAsDest: 'சேருமிடமாக தேர்வு செய்',
    zoomIn: 'பெரிதாக்கு',
    zoomOut: 'சிறிதாக்கு',
    resetZoom: 'இயல்பு நிலை',
    stepFreeCertified: 'பச்சை புள்ளி = வீல்சேர் போகலாம்',
    clickToSetPrompt: 'இடத்தை தேர்வு செய்ய கிளிக் பண்ணுங்க',
    deck: 'தளம்',
    type: 'வகை',

    // Facility Simulator Modal
    facilityControlTitle: 'லிஃப்ட் & வசதிகள் பராமரிப்பு சோதனை',
    facilityControlSubtitle: 'லிஃப்ட் பழுதானால் மாற்று வழியை உடனடியாக பார்க்க சோதனை செய்யுங்கள்.',
    facilityControlBanner: 'ஏதேனும் ஒரு லிஃப்ட்டை பழுது என மாற்றினால், மாற்று வழியை சிஸ்டம் தானாகவே காட்டும்.',
    stepFree: 'வீல்சேர் வழி',
    stairs: 'படிக்கட்டு',
    operational: 'இயங்குகிறது',
    underMaintenance: 'பழுது / பராமரிப்பில் உள்ளது',
    simulateOutage: 'பழுதை உருவாக்கு',
    markRepaired: 'சரிசெய்ததாகக் குறி',
    facilityModalFooter: 'மாற்றங்கள் உடனடியாக பாதையை மாற்றி அமைக்கும்.',
    done: 'முடிந்தது',

    // Maintenance Alerts (Station Announcer Tamil)
    disruptionDetected: 'முக்கிய அறிவிப்பு: லிஃப்ட் சேவை தற்காலிக நிறுத்தம்',
    dismiss: 'சரி',
    maintenanceOutageMsg: 'தற்காலிகமாக செயல்படவில்லை. மாற்றுப் பாதை கணக்கிடப்பட்டுள்ளது.',
    criticalBlockedMsg: 'முக்கிய அறிவிப்பு: இந்த லிஃப்ட் தற்காலிகமாக செயல்படவில்லை, மற்றும் அனைத்து மாற்று வழிகளிலும் படிக்கட்டுகள் உள்ளன. பேட்டரி காருக்கு, தயவுசெய்து மாற்றுத்திறனாளி சிறப்பு உதவி மையத்தை அணுகவும்.',
    restoredMsg: 'அறிவிப்பு: லிஃப்ட் மீண்டும் செயல்படத் தொடங்கியுள்ளது... உகந்த பாதை புதுப்பிக்கப்படுகிறது.',
    cannotBeIdentical: 'தொடக்க இடமும் சேருமிடமும் ஒன்றாக இருக்க முடியாது.',
    selectBothPoints: 'நீங்க இருக்கும் இடம் மற்றும் போக வேண்டிய இடம் இரண்டையும் தேர்வு செய்யுங்க.',

    // Footer
    footerTitle: 'சென்னை ரயில்வே ஸ்டேஷன் வசதிகள் & அணுகல்தன்மை வழிகாட்டி',
    footerSubtitle: 'எளிய பேச்சுத்தமிழ் • WCAG AAA உயர் மாறுபாடு • குரல் வழிகாட்டல் • தெற்கு ரயில்வே',

    // Language Modal
    welcomeTitle: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    welcomeSubtitle: 'வழிகாட்டலுக்கான உங்கள் மொழியைத் தேர்வு செய்யுங்கள்',
  },

  te: {
    // App Header (Telugu)
    appTitle: 'చెన్నై రైల్వే స్టేషన్ గైడ్',
    appSubtitle: 'ఇండోర్ నావిగేషన్ మరియు యాక్సెసిబిలిటీ గైడ్',
    networkTag: 'చెన్నై నెట్‌వర్క్ • లైవ్ నావిగేషన్',
    divyangjanTag: 'దివ్యాంగుల ప్రత్యేక సహాయం',
    accessibilityOptions: 'సదుపాయాలు',
    wcagDisplayModes: 'డిస్ప్లే మోడ్‌లు',
    highContrast: 'హై కాంట్రాస్ట్ (నలుపు-పసుపు)',
    largeText: 'పెద్ద అక్షరాలు (Large Text)',
    facilityControl: 'సదుపాయాల నియంత్రణ',
    languageSelector: 'భాష',

    // Route Planner Controls (Telugu)
    routePlannerTitle: 'స్టేషన్ రూట్ ప్లానర్',
    startLocation: 'మీరు ఉన్న స్థలం',
    destination: 'ఎక్కడికి వెళ్లాలి?',
    orClickOnMap: 'లేదా మ్యాప్‌పై క్లిక్ చేయండి',
    clickNodeOnMap: 'మ్యాప్‌పై క్లిక్ చేయండి...',
    selectStartPrompt: 'ప్రారంభం: మ్యాప్‌లోని పాయింట్‌పై క్లిక్ చేయండి',
    selectDestPrompt: 'గమ్యం: మీరు వెళ్లాలనుకుంటున్న స్థలాన్ని క్లిక్ చేయండి',
    selectStartPoint: 'ప్రస్తుతం ఉన్న స్థలాన్ని ఎంచుకోండి...',
    selectEndPoint: 'ఎక్కడికి వెళ్లాలో ఎంచుకోండి...',
    swapPoints: 'స్థలాలను మార్చుకోండి',
    reset: 'రీసెట్ చేయండి',
    stepFreeMode: 'మెట్లు లేని దారి (వీల్ చైర్ మార్గం)',
    activeBadge: 'యాక్టివ్',
    stepFreeDesc: 'లిఫ్ట్‌లు మరియు ర్యాంప్‌లను మాత్రమే ఉపయోగిస్తుంది. మెట్లు ఉండవు.',
    findRoute: 'దారి చూపించు',
    findAccessibleRoute: 'మెట్లు లేని దారి చూపించు',
    calculatingPath: 'ఉత్తమ మార్గాన్ని శోధిస్తోంది...',
    totalDistance: 'మొత్తం దూరం',
    estWalkTime: 'సుమారు సమయం',
    meters: 'మీటర్లు',
    minutes: 'నిమిషాలు',

    // Voice Guidance (Telugu)
    voiceGuideTitle: 'వాయిస్ ఆడియో గైడ్',
    speakingStep: 'దశ చెబుతోంది',
    of: '/',
    voiceGuideActiveDesc: 'ప్రతి మలుపును స్పష్టంగా చెబుతూ దారి చూపుతుంది.',
    voiceGuideInactiveDesc: 'దారి వివరాలను వాయిస్ ద్వారా వినండి.',
    startAudioGuidance: 'వాయిస్ గైడ్ ప్రారంభించు',
    stopAudioGuidance: 'వాయిస్ ఆపు',
    mute: 'మ్యూట్',
    unmute: 'అన్‌మ్యూట్',
    audioNotSupported: 'ఈ బ్రౌజర్‌లో ఆడియో గైడ్ సదుపాయం లేదు.',
    nowSpeaking: 'ఇప్పుడు చెబుతోంది',

    // Directions List (Telugu)
    turnByTurnTitle: 'దశలవారీ మార్గదర్శకం',
    noRouteSelected: 'మార్గం ఎంచుకోలేదు',
    noRouteDesc: 'మీరు ఉన్న స్థలం మరియు వెళ్లాల్సిన స్థలాన్ని ఎంచుకోండి.',
    stepFreeTag: 'మెట్లు లేనిది',
    standardTag: 'సాధారణ మార్గం',
    stepsCount: 'దశలు',
    targetFloor: 'చేరాల్సిన అంతస్తు',
    step: 'దశ',
    accessibleStep: 'సులభ మార్గం',

    // Map Canvas & Decks (Telugu)
    floorDeck: 'అంతస్తు:',
    allDecks: 'అన్ని అంతస్తులు',
    ground: 'నేల అంతస్తు',
    level1: 'FOB నడక వంతెన',
    subway: 'సబ్వే సొరంగం',
    accessibleRouteBadge: 'వీల్ చైర్ మార్గం (మెట్లు లేవు)',
    standardRouteBadge: 'సాధారణ నడక మార్గం',
    entrancePrsHall: 'ప్రవేశం & బుకింగ్ హాల్',
    centralFobSubway: 'వంతెన & సబ్వే',
    platformDecks: 'ప్లాట్‌ఫారమ్‌లు',
    tracksAndPlatforms: 'రైలు ట్రాక్‌లు & ప్లాట్‌ఫారమ్‌లు',
    concourseAndEntry: 'ప్రధాన కాన్‌కోర్స్ & ప్రవేశం',
    fobSkywalk: 'సెంట్రల్ ఫుట్ ఓవర్‌బ్రిడ్జ్ (FOB)',
    subwayPassage: 'సబ్‌వే మార్గం',
    startPin: 'ప్రారంభం',
    destPin: 'గమ్యం',
    setAsStart: 'ప్రారంభంగా సెట్ చేయండి',
    setAsDest: 'గమ్యంగా సెట్ చేయండి',
    zoomIn: 'జూమ్ ఇన్',
    zoomOut: 'జూమ్ అవుట్',
    resetZoom: 'రీసెట్ చేయండి',
    stepFreeCertified: 'ఆకుపచ్చ చుక్క = వీల్ చైర్ మార్గం',
    clickToSetPrompt: 'స్థలాన్ని ఎంచుకోవడానికి క్లిక్ చేయండి',
    deck: 'అంతస్తు',
    type: 'రకం',

    // Facility Simulator Modal
    facilityControlTitle: 'లిఫ్ట్ & సదుపాయాల నిర్వహణ పరీక్ష',
    facilityControlSubtitle: 'లిఫ్ట్ పనిచేయకపోతే ప్రత్యామ్నాయ మార్గాన్ని పరీక్షించండి.',
    facilityControlBanner: 'ఏదైనా లిఫ్ట్‌ను మరమ్మతులో ఉన్నట్లు మార్చితే, సిస్టమ్ వెంటనే ప్రత్యామ్నాయ మార్గాన్ని చూపిస్తుంది.',
    stepFree: 'వీల్ చైర్ మార్గం',
    stairs: 'మెట్లు',
    operational: 'పనిచేస్తోంది',
    underMaintenance: 'మరమ్మతులో ఉంది',
    simulateOutage: 'అంతరాయం కలిగించండి',
    markRepaired: 'మరమ్మతు పూర్తయింది',
    facilityModalFooter: 'మార్పులు వెంటనే మార్గాన్ని నవీకరిస్తాయి.',
    done: 'పూర్తయింది',

    // Maintenance Alerts
    disruptionDetected: 'సదుపాయాల అంతరాయం హెచ్చరిక',
    dismiss: 'సరే',
    maintenanceOutageMsg: 'ప్రస్తుతం పనిచేయడం లేదు. ప్రత్యామ్నాయ మార్గం ద్వారా మళ్ళించబడుతోంది...',
    criticalBlockedMsg: 'పనిచేయడం లేదు మరియు ప్రత్యామ్నాయ మార్గాలలో మెట్లు ఉన్నాయి. బ్యాటరీ కారు కోసం దివ్యాంగుల సహాయ కేంద్రాన్ని సంప్రదించండి.',
    restoredMsg: 'తిరిగి పనిచేస్తోంది. ఉత్తమ మార్గాన్ని లెక్కిస్తోంది.',
    cannotBeIdentical: 'ప్రారంభ స్థలం మరియు చేరాల్సిన స్థలం ఒకటి కాకూడదు.',
    selectBothPoints: 'మీరు ఉన్న స్థలం మరియు వెళ్లాల్సిన స్థలాన్ని ఎంచుకోండి.',

    // Footer
    footerTitle: 'చెన్నై రైల్వే స్టేషన్ సదుపాయాలు మరియు నావిగేషన్ సిస్టమ్',
    footerSubtitle: 'తెలుగు ఎడిషన్ • WCAG AAA హై కాంట్రాస్ట్ • వాయిస్ గైడ్ • దక్షిణ రైల్వే',

    // Language Modal
    welcomeTitle: 'భాషను ఎంచుకోండి',
    welcomeSubtitle: 'నావిగేషన్ మరియు వాయిస్ గైడ్ కోసం మీ భాషను ఎంచుకోండి',
  },

  kn: {
    // App Header (Kannada)
    appTitle: 'ಚೆನ್ನೈ ರೈಲ್ವೆ ನಿಲ್ದಾಣ ಮಾರ್ಗದರ್ಶಿ',
    appSubtitle: 'ಒಳಾಂಗಣ ಸಂಚಾರ ಮತ್ತು ಪ್ರವೇಶಸಾಧ್ಯತೆ ಮಾರ್ಗದರ್ಶಿ',
    networkTag: 'ಚೆನ್ನೈ ನೆಟ್‌ವರ್ಕ್ • ಲೈವ್ ಸಂಚಾರ',
    divyangjanTag: 'ವಿಕಲಚೇತನರ ವಿಶೇಷ ಸಹಾಯ',
    accessibilityOptions: 'ಸೌಲಭ್ಯಗಳು',
    wcagDisplayModes: 'ಡಿಸ್ಪ್ಲೇ ವಿಧಾನಗಳು',
    highContrast: 'ಹೈ ಕಾಂಟ್ರಾಸ್ಟ್ (ಕಪ್ಪು-ಹಳದಿ)',
    largeText: 'ದೊಡ್ಡ ಅಕ್ಷರಗಳು (Large Text)',
    facilityControl: 'ಸೌಲಭ್ಯ ನಿಯಂತ್ರಣ',
    languageSelector: 'ಭಾಷೆ',

    // Route Planner Controls (Kannada)
    routePlannerTitle: 'ನಿಲ್ದಾಣ ಮಾರ್ಗ ಯೋಜಕ',
    startLocation: 'ನೀವಿರುವ ಸ್ಥಳ',
    destination: 'ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?',
    orClickOnMap: 'ಅಥವಾ ನಕ್ಷೆಯಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ',
    clickNodeOnMap: 'ನಕ್ಷೆಯಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ...',
    selectStartPrompt: 'ಪ್ರಾರಂಭ: ನಕ್ಷೆಯಲ್ಲಿ ಪಾಯಿಂಟ್ ಕ್ಲಿಕ್ ಮಾಡಿ',
    selectDestPrompt: 'ಗಮ್ಯಸ್ಥಾನ: ನೀವು ಹೋಗಬೇಕಾದ ಸ್ಥಳವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ',
    selectStartPoint: 'ನೀವಿರುವ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ...',
    selectEndPoint: 'ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕೆಂದು ಆಯ್ಕೆಮಾಡಿ...',
    swapPoints: 'ಸ್ಥಳಗಳನ್ನು ಅದಲುಬದಲು ಮಾಡಿ',
    reset: 'ಮರುಹೊಂದಿಸಿ',
    stepFreeMode: 'ಮೆಟ್ಟಿಲುಗಳಿಲ್ಲದ ದಾರಿ (ವೀಲ್ಚೇರ್ ಮಾರ್ಗ)',
    activeBadge: 'ಸಕ್ರಿಯ',
    stepFreeDesc: 'ಲಿಫ್ಟ್‌ಗಳು ಮತ್ತು ರಾಂಪ್‌ಗಳನ್ನು ಮಾತ್ರ ಬಳಸುತ್ತದೆ. ಮೆಟ್ಟಿಲುಗಳಿರುವುದಿಲ್ಲ.',
    findRoute: 'ಮಾರ್ಗ ತೋರಿಸು',
    findAccessibleRoute: 'ಮೆಟ್ಟಿಲುಗಳಿಲ್ಲದ ಮಾರ್ಗ ತೋರಿಸು',
    calculatingPath: 'ಉತ್ತಮ ಮಾರ್ಗ ಹುಡುಕಲಾಗುತ್ತಿದೆ...',
    totalDistance: 'ಒಟ್ಟು ದೂರ',
    estWalkTime: 'ಅಂದಾಜು ಸಮಯ',
    meters: 'ಮೀಟರ್',
    minutes: 'ನಿಮಿಷ',

    // Voice Guidance (Kannada)
    voiceGuideTitle: 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ',
    speakingStep: 'ಹಂತ ಹೇಳುತ್ತಿದೆ',
    of: '/',
    voiceGuideActiveDesc: 'ಪ್ರತಿ ತಿರುವನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಹೇಳುತ್ತಾ ಮಾರ್ಗದರ್ಶನ ಮಾಡುತ್ತದೆ.',
    voiceGuideInactiveDesc: 'ಮಾರ್ಗದ ವಿವರಗಳನ್ನು ಧ್ವನಿಯ ಮೂಲಕ ಕೇಳಿ.',
    startAudioGuidance: 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಪ್ರಾರಂಭಿಸಿ',
    stopAudioGuidance: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    mute: 'ಮ್ಯೂಟ್',
    unmute: 'ಅನ್‌ಮ್ಯೂಟ್',
    audioNotSupported: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಬೆಂಬಲಿಸುವುದಿಲ್ಲ.',
    nowSpeaking: 'ಈಗ ಹೇಳಲಾಗುತ್ತಿದೆ',

    // Directions List (Kannada)
    turnByTurnTitle: 'ಹಂತ ಹಂತದ ಮಾರ್ಗದರ್ಶನ',
    noRouteSelected: 'ಮಾರ್ಗ ಆಯ್ಕೆ ಮಾಡಿಲ್ಲ',
    noRouteDesc: 'ನೀವಿರುವ ಸ್ಥಳ ಮತ್ತು ತಲುಪಬೇಕಾದ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    stepFreeTag: 'ಮೆಟ್ಟಿಲುಗಳಿಲ್ಲ',
    standardTag: 'ಸಾಮಾನ್ಯ ಮಾರ್ಗ',
    stepsCount: 'ಹಂತಗಳು',
    targetFloor: 'ತಲುಪಬೇಕಾದ ಮಹಡಿ',
    step: 'ಹಂತ',
    accessibleStep: 'ಸುಲಭ ಮಾರ್ಗ',

    // Map Canvas & Decks (Kannada)
    floorDeck: 'ಮಹಡಿ:',
    allDecks: 'ಎಲ್ಲಾ ಮಹಡಿಗಳು',
    ground: 'ನೆಲ ಮಹಡಿ',
    level1: 'FOB ನಡಿಗೆ ಸೇತುವೆ',
    subway: 'ಸಬ್ವೇ ಸುರಂಗ',
    accessibleRouteBadge: 'ವೀಲ್ಚೇರ್ ಮಾರ್ಗ (ಮೆಟ್ಟಿಲುಗಳಿಲ್ಲ)',
    standardRouteBadge: 'ಸಾಮಾನ್ಯ ನಡಿಗೆ ಮಾರ್ಗ',
    entrancePrsHall: 'ಪ್ರವೇಶ & ಬುಕಿಂಗ್ ಹಾಲ್',
    centralFobSubway: 'ಸೇತುವೆ & ಸಬ್ವೇ',
    platformDecks: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳು',
    tracksAndPlatforms: 'ರೈಲು ಟ್ರ್ಯಾಕ್‌ಗಳು & ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳು',
    concourseAndEntry: 'ಮುಖ್ಯ ಹಾಲ್ & ಪ್ರವೇಶ',
    fobSkywalk: 'ಸೆಂಟ್ರಲ್ ಪಾದಚಾರಿ ಸೇತುವೆ (FOB)',
    subwayPassage: 'ಸಬ್‌ವೇ ಸುರಂಗ ಮಾರ್ಗ',
    startPin: 'ಪ್ರಾರಂಭ',
    destPin: 'ಗಮ್ಯಸ್ಥಾನ',
    setAsStart: 'ಪ್ರಾರಂಭವಾಗಿ ಹೊಂದಿಸಿ',
    setAsDest: 'ಗಮ್ಯಸ್ಥಾನವಾಗಿ ಹೊಂದಿಸಿ',
    zoomIn: 'ಜೂಮ್ ಇನ್',
    zoomOut: 'ಜೂಮ್ ಔಟ್',
    resetZoom: 'ಮರುಹೊಂದಿಸಿ',
    stepFreeCertified: 'ಹಸಿರು ಚುಕ್ಕೆ = ವೀಲ್ಚೇರ್ ಮಾರ್ಗ',
    clickToSetPrompt: 'ಸ್ಥಳ ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
    deck: 'ಮಹಡಿ',
    type: 'ವಿಧ',

    // Facility Simulator Modal
    facilityControlTitle: 'ಲಿಫ್ಟ್ ಮತ್ತು ಸೌಲಭ್ಯಗಳ ನಿರ್ವಹಣೆ ಪರೀಕ್ಷೆ',
    facilityControlSubtitle: 'ಲಿಫ್ಟ್ ಸ್ಥಗಿತಗೊಂಡರೆ ಪರ್ಯಾಯ ಮಾರ್ಗವನ್ನು ಪರೀಕ್ಷಿಸಿ.',
    facilityControlBanner: 'ಯಾವುದಾದರೂ ಲಿಫ್ಟ್ ಸ್ಥಗಿತಗೊಂಡರೆ ಸಿಸ್ಟಮ್ ತಕ್ಷಣ ಪರ್ಯಾಯ ಮಾರ್ಗ ತೋರಿಸುತ್ತದೆ.',
    stepFree: 'ವೀಲ್ಚೇರ್ ಮಾರ್ಗ',
    stairs: 'ಮೆಟ್ಟಿಲುಗಳು',
    operational: 'ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ',
    underMaintenance: 'ದುರಸ್ತಿಯಲ್ಲಿದೆ',
    simulateOutage: 'ಸ್ಥಗಿತಗೊಳಿಸಿ',
    markRepaired: 'ದುರಸ್ತಿ ಪೂರ್ಣಗೊಂಡಿದೆ',
    facilityModalFooter: 'ಬದಲಾವಣೆಗಳು ತಕ್ಷಣವೇ ಮಾರ್ಗವನ್ನು ನವೀಕರಿಸುತ್ತವೆ.',
    done: 'ಮುಗಿಯಿತು',

    // Maintenance Alerts
    disruptionDetected: 'ಸೌಲಭ್ಯ ಸ್ಥಗಿತ ಎಚ್ಚರಿಕೆ',
    dismiss: 'ಸರಿ',
    maintenanceOutageMsg: 'ಪ್ರಸ್ತುತ ಸೇವೆಯಲ್ಲಿಲ್ಲ. ಪರ್ಯಾಯ ಮಾರ್ಗದ ಮೂಲಕ ಮರುಮಾರ್ಗಗೊಳಿಸಲಾಗುತ್ತಿದೆ...',
    criticalBlockedMsg: 'ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿಲ್ಲ ಮತ್ತು ಪರ್ಯಾಯ ಮಾರ್ಗಗಳಲ್ಲಿ ಮೆಟ್ಟಿಲುಗಳಿವೆ. ಬ್ಯಾಟರಿ ಕಾರ್‌ಗಾಗಿ ವಿಕಲಚೇತನರ ಸಹಾಯ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    restoredMsg: 'ಮತ್ತೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ. ಅತ್ಯುತ್ತಮ ಮಾರ್ಗ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತಿದೆ.',
    cannotBeIdentical: 'ಆರಂಭಿಕ ಸ್ಥಳ ಮತ್ತು ಗಮ್ಯಸ್ಥಾನ ಒಂದೇ ಆಗಿರಬಾರದು.',
    selectBothPoints: 'ನೀವಿರುವ ಸ್ಥಳ ಮತ್ತು ತಲುಪಬೇಕಾದ ಸ್ಥಳ ಎರಡನ್ನೂ ಆಯ್ಕೆಮಾಡಿ.',

    // Footer
    footerTitle: 'ಚೆನ್ನೈ ರೈಲ್ವೆ ನಿಲ್ದಾಣ ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಸಂಚಾರ ವ್ಯವಸ್ಥೆ',
    footerSubtitle: 'ಕನ್ನಡ ಆವೃತ್ತಿ • WCAG AAA ಹೈ ಕಾಂಟ್ರಾಸ್ಟ್ • ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ • ದಕ್ಷಿಣ ರೈಲ್ವೆ',

    // Language Modal
    welcomeTitle: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    welcomeSubtitle: 'ಸಂಚಾರ ಮತ್ತು ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  },

  ml: {
    // App Header (Malayalam)
    appTitle: 'ചെന്നൈ റെയിൽവേ സ്റ്റേഷൻ ഗൈഡ്',
    appSubtitle: 'ഇൻഡോർ നാവിഗേഷനും പ്രവേശനക്ഷമത ഗൈഡും',
    networkTag: 'ചെന്നൈ നെറ്റ്‌വർക്ക് • ലൈവ് നാവിഗേഷൻ',
    divyangjanTag: 'ഭിന്നശേഷಿ സൗഹൃദം',
    accessibilityOptions: 'സൗകര്യങ്ങൾ',
    wcagDisplayModes: 'ഡിസ്പ്ലേ രീതികൾ',
    highContrast: 'ഹൈ കോൺട്രാസ്റ്റ് (കറുപ്പ്-മഞ്ഞ)',
    largeText: 'വലിയ അക്ഷരങ്ങൾ (Large Text)',
    facilityControl: 'സൗകര്യ നിയന്ത്രണം',
    languageSelector: 'ഭാഷ',

    // Route Planner Controls (Malayalam)
    routePlannerTitle: 'സ്റ്റേഷൻ റൂട്ട് പ്ലാനർ',
    startLocation: 'നിങ്ങൾ നിൽക്കുന്ന സ്ഥലം',
    destination: 'എങ്ങോട്ടാണ് പോകേണ്ടത്?',
    orClickOnMap: 'അല്ലെങ്കിൽ മാപ്പിൽ ക്ലിക്ക് ചെയ്യുക',
    clickNodeOnMap: 'മാപ്പിൽ ക്ലിക്ക് ചെയ്യുക...',
    selectStartPrompt: 'തുടക്കം: മാപ്പിലെ പോയിന്റിൽ ക്ലിക്ക് ചെയ്യുക',
    selectDestPrompt: 'ലക്ഷ്യസ്ഥാനം: പോകേണ്ട സ്ഥലം ക്ലിക്ക് ചെയ്യുക',
    selectStartPoint: 'നിങ്ങൾ ഇപ്പോൾ നിൽക്കുന്ന സ്ഥലം തിരഞ്ഞെടുക്കുക...',
    selectEndPoint: 'എങ്ങോട്ടാണ് പോകേണ്ടതെന്ന് തിരഞ്ഞെടുക്കുക...',
    swapPoints: 'സ്ഥലങ്ങൾ പരസ്പരം മാറ്റുക',
    reset: 'റീസെറ്റ്',
    stepFreeMode: 'പടികൾ ഇല്ലാത്ത വഴി (വീൽചെയർ റൂട്ട്)',
    activeBadge: 'ആക്ടീവ്',
    stepFreeDesc: 'ലിഫ്റ്റുകളും റാംപുകളും മാത്രം ഉപയോഗിക്കുന്നു. പടികൾ ഉണ്ടാകില്ല.',
    findRoute: 'വഴി കാണിക്കുക',
    findAccessibleRoute: 'പടികളില്ലാത്ത വഴി കാണിക്കുക',
    calculatingPath: 'മികച്ച വഴി കണ്ടെത്തുന്നു...',
    totalDistance: 'ആകെ ദൂരം',
    estWalkTime: 'ഏകദേശ സമയം',
    meters: 'മീറ്റർ',
    minutes: 'മിനിറ്റ്',

    // Voice Guidance (Malayalam)
    voiceGuideTitle: 'വോയ്സ് ഓഡിയോ ഗൈഡ്',
    speakingStep: 'ഘട്ടം പറയുന്നു',
    of: '/',
    voiceGuideActiveDesc: 'ഓരോ തിരിവും കൃത്യമായി പറഞ്ഞുകൊണ്ട് വഴി കാണിക്കുന്നു.',
    voiceGuideInactiveDesc: 'വഴി വിവരങ്ങൾ ശബ്ദത്തിലൂടെ കേൾക്കുക.',
    startAudioGuidance: 'വോയ്സ് ഗൈഡ് തുടങ്ങുക',
    stopAudioGuidance: 'വോയ്സ് നിർത്തുക',
    mute: 'മ്യൂട്ട്',
    unmute: 'അൺമ്യൂട്ട്',
    audioNotSupported: 'ഈ ബ്രൗസറിൽ ഓഡിയോ ഗൈഡ് പിന്തുണയ്ക്കുന്നില്ല.',
    nowSpeaking: 'ഇപ്പോൾ പറയുന്നു',

    // Directions List (Malayalam)
    turnByTurnTitle: 'ഘട്ടം ഘട്ടമായുള്ള വഴികൾ',
    noRouteSelected: 'വഴി തിരഞ്ഞെടുത്തിട്ടില്ല',
    noRouteDesc: 'നിങ്ങൾ നിൽക്കുന്ന സ്ഥലവും പോകേണ്ട സ്ഥലവും തിരഞ്ഞെടുക്കുക.',
    stepFreeTag: 'പടികളില്ല',
    standardTag: 'സാധാരണ വഴി',
    stepsCount: 'ഘട്ടങ്ങൾ',
    targetFloor: 'എത്തേണ്ട നില',
    step: 'ഘട്ടം',
    accessibleStep: 'എളുപ്പവഴി',

    // Map Canvas & Decks (Malayalam)
    floorDeck: 'നില:',
    allDecks: 'എല്ലാ നിലകളും',
    ground: 'താഴത്തെ നില',
    level1: 'FOB നടപ്പാലം',
    subway: 'സബ്‌വേ തുരങ്കം',
    accessibleRouteBadge: 'വീൽചെയർ റൂട്ട് (പടികളില്ല)',
    standardRouteBadge: 'സാധാരണ നടപ്പാത',
    entrancePrsHall: 'പ്രവേശന കവാടം & ബുക്കിംഗ് ഹാൾ',
    centralFobSubway: 'നടപ്പാലം & സബ്‌വേ',
    platformDecks: 'പ്ലാറ്റ്‌ഫോമുകൾ',
    tracksAndPlatforms: 'റെയിൽ ട്രാക്കുകളും പ്ലാറ്റ്ഫോമുകളും',
    concourseAndEntry: 'മെയിൻ കോൺകോഴ്സും പ്രവേശനവും',
    fobSkywalk: 'സെൻട്രൽ നടപ്പാലം (FOB)',
    subwayPassage: 'സബ്‌വേ പാസേജ്',
    startPin: 'തുടക്കം',
    destPin: 'ലക്ഷ്യസ്ഥാനം',
    setAsStart: 'തുടക്കമായി സജ്ജീകരിക്കുക',
    setAsDest: 'ലക്ഷ്യസ്ഥാനമായി സജ്ജീകരിക്കുക',
    zoomIn: 'സൂം ഇൻ',
    zoomOut: 'സൂം ഔട്ട്',
    resetZoom: 'റീസെറ്റ് ചെയ്യുക',
    stepFreeCertified: 'പച്ച കുത്ത് = വീൽചെയർ സൗഹൃദം',
    clickToSetPrompt: 'സ്ഥലം തിരഞ്ഞെടുക്കാൻ ക്ലിക്ക് ചെയ്യുക',
    deck: 'നില',
    type: 'ഇനം',

    // Facility Simulator Modal
    facilityControlTitle: 'ലിഫ്റ്റ് & സൗകര്യങ്ങളുടെ നിയന്ത്രണം',
    facilityControlSubtitle: 'ലിഫ്റ്റ് തകരാറിലായാൽ ബദൽ വഴി പരിശോധിച്ച് ഉറപ്പുവരുത്തുക.',
    facilityControlBanner: 'ഏതെങ്കിലും ലിഫ്റ്റ് തകരാറിലായാൽ സിസ്റ്റം തനിയെ ബദൽ വഴി കണക്കാക്കി കാണിക്കും.',
    stepFree: 'വീൽചെയർ റൂട്ട്',
    stairs: 'പടികൾ',
    operational: 'പ്രവർത്തിക്കുന്നു',
    underMaintenance: 'അറ്റകുറ്റപ്പണിയിലാണ്',
    simulateOutage: 'തടസ്സം സൃഷ്ടിക്കുക',
    markRepaired: 'ശരിയാക്കി എന്ന് അടയാളപ്പെടുത്തുക',
    facilityModalFooter: 'മാറ്റങ്ങൾ തത്സമയം റൂട്ട് അപ്‌ഡേറ്റ് ചെയ്യും.',
    done: 'പൂർത്തിയായി',

    // Maintenance Alerts
    disruptionDetected: 'സൗകര്യ തടസ്സ മുന്നറിയിപ്പ്',
    dismiss: 'ശരി',
    maintenanceOutageMsg: 'ഇപ്പോൾ പ്രവർത്തനരഹിതമാണ്. ഇതര വഴിയിലൂടെ മാറ്റുന്നു...',
    criticalBlockedMsg: 'പ്രവർത്തനരഹിതമാണ്, ബദൽ വഴികളിൽ പടികളുണ്ട്. ബാറ്ററി കാറിനായി ഭിന്നശേഷി സഹായ കേന്ദ്രവുമായി ബന്ധപ്പെടുക.',
    restoredMsg: 'വീണ്ടും പ്രവർത്തിച്ചു തുടങ്ങി. മികച്ച വഴി പുനഃക്രമീകരിക്കുന്നു.',
    cannotBeIdentical: 'ആരംഭ സ്ഥലവും ലക്ഷ്യസ്ഥാനവും ഒന്നാകാൻ പാടില്ല.',
    selectBothPoints: 'നിങ്ങൾ നിൽക്കുന്ന സ്ഥലവും പോകേണ്ട സ്ഥലവും തിരഞ്ഞെടുക്കുക.',

    // Footer
    footerTitle: 'ചെന്നൈ റെയിൽവേ സ്റ്റേഷൻ നാവിഗേഷൻ & ആക്സസിബിലിറ്റി സിസ്റ്റം',
    footerSubtitle: 'മലയാളം പതിപ്പ് • WCAG AAA ഹൈ കോൺട്രാസ്റ്റ് • വോയ്സ് ഗൈഡ് • ദക്ഷിണ റെയിൽവേ',

    // Language Modal
    welcomeTitle: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    welcomeSubtitle: 'നാവിഗേഷനും വോയ്സ് ഗൈഡിനുമായി നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',
  },

  hi: {
    // App Header
    appTitle: 'चेन्नई रेलवे स्टेशन नेविगेशन एवं सुविधा गाइड',
    appSubtitle: 'स्टेशन सुलभता एवं सुविधा गाइड (Indoor Navigation)',
    networkTag: 'चेन्नई नेटवर्क • लाइव इनडोर नेविगेशन',
    divyangjanTag: 'दिव्यांगजन विशेष सहायता',
    accessibilityOptions: 'सुलभता सुविधाएं',
    wcagDisplayModes: 'डिस्प्ले मोड्स',
    highContrast: 'हाई कंट्रास्ट मोड',
    largeText: 'बड़े अक्षर (Large Text Zoom)',
    facilityControl: 'सुविधा नियंत्रण (Maintenance)',
    languageSelector: 'भाषा',

    // Route Planner Controls
    routePlannerTitle: 'स्टेशन रूट प्लानर',
    startLocation: 'आपकी वर्तमान जगह (शुरुआत)',
    destination: 'कहाँ जाना है? (मंज़िल)',
    orClickOnMap: 'या नक्शे पर क्लिक करें',
    clickNodeOnMap: 'नक्शे पर क्लिक करें...',
    selectStartPrompt: 'आरंभ: नक्शे पर किसी बिंदु पर क्लिक करें',
    selectDestPrompt: 'मंज़िल: जहाँ जाना है उस बिंदु पर क्लिक करें',
    selectStartPoint: 'शुरुआती स्थान चुनें...',
    selectEndPoint: 'मंज़िल चुनें...',
    swapPoints: 'स्थान आपस में बदलें',
    reset: 'रीसेट करें',
    stepFreeMode: 'सीढ़ी-मुक्त / व्हीलचेयर मार्ग',
    activeBadge: 'सक्रिय',
    stepFreeDesc: 'केवल लिफ्ट और आसान रैंप का उपयोग करता है। सभी सीढ़ियों से बचता है।',
    findRoute: 'रास्ता दिखाएं',
    findAccessibleRoute: 'सीढ़ी-मुक्त रास्ता दिखाएं',
    calculatingPath: 'सर्वोत्तम रास्ता खोजा जा रहा है...',
    totalDistance: 'कुल दूरी',
    estWalkTime: 'अनुमानित समय',
    meters: 'मीटर',
    minutes: 'मिनट',

    // Voice Guidance
    voiceGuideTitle: 'बोलकर रास्ता बताएं (Voice Guide)',
    speakingStep: 'चरण बोला जा रहा है',
    of: '/',
    voiceGuideActiveDesc: 'प्रत्येक मोड़ और दिशा की आवाज़ में स्पष्ट जानकारी दी जा रही है।',
    voiceGuideInactiveDesc: 'कदम-दर-कदम बोलकर दिशा-निर्देश सुनें।',
    startAudioGuidance: 'बोलकर रास्ता बताएं',
    stopAudioGuidance: 'आवाज़ बंद करें',
    mute: 'म्यूट करें',
    unmute: 'अनम्यूट करें',
    audioNotSupported: 'इस ब्राउज़र में ऑडियो गाइड समर्थित नहीं है।',
    nowSpeaking: 'अभी बोला जा रहा है',

    // Directions List
    turnByTurnTitle: 'कदम-दर-कदम दिशा-निर्देश',
    noRouteSelected: 'कोई रास्ता नहीं चुना गया',
    noRouteDesc: 'ऊपर दिए गए विकल्पों से शुरुआती स्थान और मंज़िल चुनें या नक्शे पर क्लिक करें।',
    stepFreeTag: 'सीढ़ी-मुक्त',
    standardTag: 'सामान्य मार्ग',
    stepsCount: 'चरण',
    targetFloor: 'मंज़िल का तल',
    step: 'चरण',
    accessibleStep: 'सुलभ मार्ग',

    // Map Canvas & Decks
    floorDeck: 'तल (Floor):',
    allDecks: 'सभी तल',
    ground: 'ग्राउंड फ्लोर (भू-तल)',
    level1: 'लेवल 1 एफओबी (FOB)',
    subway: 'सबवे सुरंग (Subway)',
    accessibleRouteBadge: 'सुलभ व्हीलचेयर मार्ग (सीढ़ी-मुक्त)',
    standardRouteBadge: 'सामान्य पैदल मार्ग',
    entrancePrsHall: 'प्रवेश एवं टिकट बुकिंग हॉल',
    centralFobSubway: 'फुट ओवरब्रिज एवं सबवे',
    platformDecks: 'प्लेटफॉर्म क्षेत्र',
    tracksAndPlatforms: 'प्लेटफॉर्म ट्रैक एवं बोर्डिंग डेक',
    concourseAndEntry: 'मुख्य कॉनकोर्स एवं प्रवेश',
    fobSkywalk: 'सेंट्रल फुट ओवरब्रिज (FOB)',
    subwayPassage: 'भूमिगत सबवे मार्ग',
    startPin: 'आरंभ',
    destPin: 'मंज़िल',
    setAsStart: 'आरंभ बिंदु बनाएं',
    setAsDest: 'मंज़िल बिंदु बनाएं',
    zoomIn: 'ज़ूम इन',
    zoomOut: 'ज़ूम आउट',
    resetZoom: 'रीसेट करें',
    stepFreeCertified: 'हरा बिंदु = व्हीलचेयर सुलभ',
    clickToSetPrompt: 'स्थान चुनने के लिए क्लिक करें',
    deck: 'तल',
    type: 'प्रकार',

    // Facility Simulator Modal
    facilityControlTitle: 'स्टेशन सुविधा नियंत्रण एवं मरम्मत सिम्युलेटर',
    facilityControlSubtitle: 'लिफ्ट या रैंप खराबी की स्थिति में तुरंत वैकल्पिक सुलभ रास्ता देखें।',
    facilityControlBanner: 'किसी भी लिफ्ट या रैंप को खराबी में बदलें। सिस्टम तुरंत चेतावनी देगा और वैकल्पिक सुलभ मार्ग तैयार करेगा।',
    stepFree: 'व्हीलचेयर मार्ग',
    stairs: 'सीढ़ियाँ',
    operational: 'चालू है',
    underMaintenance: 'मरम्मत जारी है',
    simulateOutage: 'खराबी सिमुलेट करें',
    markRepaired: 'ठीक हो गया मार्क करें',
    facilityModalFooter: 'बदलाव तुरंत लाइव रूटिंग को अपडेट करते हैं।',
    done: 'हो गया',

    // Maintenance Alerts
    disruptionDetected: 'सुविधा में रुकावट की चेतावनी',
    dismiss: 'ठीक है',
    maintenanceOutageMsg: 'वर्तमान में सेवा में नहीं है। वैकल्पिक सुलभ मार्ग से पुनः रूट किया जा रहा है...',
    criticalBlockedMsg: 'उपलब्ध नहीं है और सभी वैकल्पिक रास्तों में सीढ़ियाँ हैं। कृपया बैटरी कार हेतु दिव्यांगजन सहायता केंद्र से संपर्क करें।',
    restoredMsg: 'अब पुनः कार्य कर रहा है। सर्वोत्तम मार्ग फिर से निकाला जा रहा है।',
    cannotBeIdentical: 'शुरुआती स्थान और मंज़िल एक ही नहीं हो सकते।',
    selectBothPoints: 'कृपया शुरुआती स्थान और मंज़िल दोनों चुनें।',

    // Footer
    footerTitle: 'चेन्नई रेलवे स्टेशन सुविधा नेविगेशन एवं सुलभता प्रणाली',
    footerSubtitle: 'हिंदी संस्करण • WCAG AAA हाई कंट्रास्ट • वॉयस गाइडेड • दक्षिण रेलवे',

    // Language Modal
    welcomeTitle: 'अपनी भाषा चुनें',
    welcomeSubtitle: 'नेविगेशन और बोलकर रास्ता जानने के लिए अपनी पसंदीदा भाषा चुनें',
  },
};

export const t = (key, lang = 'en') => {
  const currentLang = translations[lang] ? lang : 'en';
  return translations[currentLang]?.[key] || translations['en']?.[key] || key;
};

/**
 * Generates natural conversational turn-by-turn instruction steps in the target language
 */
export function generateLocalizedStep(step, nextNode, edge, lang = 'en') {
  const toPlace = getNodeDisplayName(nextNode, lang);
  const dist = edge.distance || 30;

  // Destination reached
  if (step.type === 'arrive') {
    switch (lang) {
      case 'ta':
        return `நீங்கள் செல்ல வேண்டிய ${toPlace} பகுதியை, வெற்றிகரமாக அடைந்துவிட்டீர்கள்... உங்கள் பயணம் இனிதாக அமைய வாழ்த்துகள்.`;
      case 'te':
        return `మీరు ${toPlace} చేరుకున్నారు!`;
      case 'kn':
        return `ನೀವು ${toPlace} ತಲುಪಿದ್ದೀರಿ!`;
      case 'ml':
        return `നിങ്ങൾ ${toPlace} എത്തിക്കഴിഞ്ഞു!`;
      case 'hi':
        return `आप ${toPlace} पर पहुँच गए हैं!`;
      default:
        return `You have arrived at ${toPlace}`;
    }
  }

  // Start step
  if (step.type === 'start') {
    switch (lang) {
      case 'ta':
        return `பயணிகள் கவனத்திற்கு... உங்கள் பயண வழிகாட்டுதல் தொடங்குகிறது... ${toPlace}-ல் இருந்து புறப்படவும்.`;
      case 'te':
        return `${toPlace} నుండి ప్రారంభించండి`;
      case 'kn':
        return `${toPlace} ನಿಂದ ಪ್ರಾರಂಭಿಸಿ`;
      case 'ml':
        return `${toPlace}-ൽ നിന്ന് ആരംഭിക്കുക`;
      case 'hi':
        return `${toPlace} से शुरुआत करें`;
      default:
        return `Start from ${toPlace}`;
    }
  }

  // Elevator / Lift
  if (edge.hasElevator) {
    const floorMap = {
      en: { Ground: 'Ground Floor', 'Level 1': 'Level 1 FOB', Subway: 'Subway' },
      ta: { Ground: 'தரைத்தளம்', 'Level 1': 'முதல் தளம் நடைமேம்பாலம்', Subway: 'சுரங்க நடைபாதை' },
      te: { Ground: 'నేల అంతస్తు', 'Level 1': 'లెవల్ 1 వంతెన', Subway: 'సబ్వే' },
      kn: { Ground: 'ನೆಲ ಮಹಡಿ', 'Level 1': 'ಲೆವೆಲ್ 1 ಸೇತುವೆ', Subway: 'ಸಬ್ವೇ' },
      ml: { Ground: 'താഴത്തെ നില', 'Level 1': 'ലെവൽ 1 നടപ്പാലം', Subway: 'സബ്‌വേ' },
      hi: { Ground: 'ग्राउंड फ्लोर', 'Level 1': 'लेवल 1 एफओबी', Subway: 'सबवे' },
    };
    const floorStr = floorMap[lang]?.[nextNode.floor] || nextNode.floor;
    const liftName = getNodeDisplayName(step.fromNode, lang);

    switch (lang) {
      case 'ta':
        return `அடுத்ததாக, ${floorStr} தளத்தை அடைய, ${liftName}-ஐ பயன்படுத்தவும்.`;
      case 'te':
        return `${floorStr} వెళ్ళడానికి ${liftName} ఎక్కండి`;
      case 'kn':
        return `${floorStr} ಹೋಗಲು ${liftName} ಬಳಸಿ`;
      case 'ml':
        return `${floorStr}-ലേക്ക് പോകാൻ ${liftName} ഉപയോഗിക്കുക`;
      case 'hi':
        return `${floorStr} पर जाने के लिए ${liftName} का उपयोग करें`;
      default:
        return `Take ${liftName} to ${floorStr}`;
    }
  }

  // Ramp
  if (edge.hasRamp) {
    switch (lang) {
      case 'ta':
        return `சக்கர நாற்காலி மற்றும் எளிதான பயணத்திற்கு, இந்த சாய்வுதளப் பாதையை (Ramp) பயன்படுத்தவும்... ${toPlace} நோக்கி ${dist} மீட்டர் செல்லவும்.`;
      case 'te':
        return `${toPlace} వెళ్ళేందుకు ర్యాంప్ దారిలో వెళ్ళండి (${dist} మీటర్లు)`;
      case 'kn':
        return `${toPlace} ಗೆ ರಾಂಪ್ ದಾರಿ ಬಳಸಿ (${dist} ಮೀಟರ್)`;
      case 'ml':
        return `${toPlace}-ലേക്ക് റാംപ് വഴി കയറുക (${dist} മീറ്റർ)`;
      case 'hi':
        return `${toPlace} के लिए रैंप से आगे बढ़ें (${dist} मीटर)`;
      default:
        return `Take the ramp (${dist}m) towards ${toPlace}`;
    }
  }

  // Stairs
  if (edge.hasStairs) {
    switch (lang) {
      case 'ta':
        if (nextNode.type === 'fob' || step.fromNode?.type === 'fob') {
          return `தற்போது நடைமேம்பாலம் வழியாக, அடுத்த நடைமேடைக்கு செல்லவும்... தூரம் ${dist} மீட்டர்.`;
        }
        if (nextNode.type === 'subway' || step.fromNode?.type === 'subway') {
          return `தற்போது சுரங்கப்பாதை வழியாக, ${toPlace} நோக்கி செல்லவும்... தூரம் ${dist} மீட்டர்.`;
        }
        return `தற்போது படிக்கட்டுகள் வழியாக, ${toPlace} நோக்கி கவனமாக செல்லவும்... தூரம் ${dist} மீட்டர்.`;
      case 'te':
        return `${toPlace} వెళ్ళేందుకు మెట్లు ఎక్కండి (${dist} మీటర్లు)`;
      case 'kn':
        return `${toPlace} ಗೆ ಮೆಟ್ಟಿಲುಗಳ ಮೂಲಕ ಹೋಗಿ (${dist} ಮೀಟರ್)`;
      case 'ml':
        return `${toPlace}-ലേക്ക് പടികൾ വഴി പോകുക (${dist} മീറ്റർ)`;
      case 'hi':
        return `${toPlace} के लिए सीढ़ियों का उपयोग करें (${dist} मीटर)`;
      default:
        return `Take stairs (${dist}m) to ${toPlace}`;
    }
  }

  // Walk straight default
  switch (lang) {
    case 'ta':
      return `தற்போது ${toPlace} நோக்கி, நேராக ${dist} மீட்டர் செல்லவும்.`;
    case 'te':
      return `${toPlace} వైపు సూటిగా ${dist} మీటర్లు వెళ్ళండి`;
    case 'kn':
      return `${toPlace} ಕಡೆಗೆ ನೇರವಾಗಿ ${dist} ಮೀಟರ್ ನಡೆಯಿರಿ`;
    case 'ml':
      return `${toPlace} ഭാഗത്തേക്ക് നേരെ ${dist} മീറ്റർ നടക്കുക`;
    case 'hi':
      return `${toPlace} की तरफ सीधे ${dist} मीटर चलें`;
    default:
      return `Walk straight for ${dist}m towards ${toPlace}`;
  }
}

/**
 * Generates full array of localized turn-by-turn steps from pathNodes
 */
export function generateRouteInstructions(pathNodes, lang = 'en') {
  if (!pathNodes || pathNodes.length === 0) return [];
  if (pathNodes.length === 1) {
    const place = getNodeDisplayName(pathNodes[0], lang);
    return [t('cannotBeIdentical', lang)];
  }

  const result = [];
  result.push(generateLocalizedStep({ type: 'start' }, pathNodes[0], {}, lang));

  for (let i = 0; i < pathNodes.length - 1; i++) {
    const from = pathNodes[i];
    const to = pathNodes[i + 1];

    // Determine edge properties
    const isFloorChange = from.floor !== to.floor;
    const hasElevator = (from.type === 'lift' || to.type === 'lift') && (isFloorChange || from.type === 'lift');
    const hasRamp = from.type === 'ramp' || to.type === 'ramp';
    const hasStairs = (from.type === 'stairs' || to.type === 'stairs') && !hasElevator && !hasRamp;
    let distance = 35;
    if (from.x !== undefined && to.x !== undefined && from.y !== undefined && to.y !== undefined) {
      const pixelDist = Math.hypot(to.x - from.x, to.y - from.y);
      distance = Math.max(15, Math.round((pixelDist * 0.35) / 5) * 5);
    }
    if (hasElevator) {
      distance = 15;
    }

    const liftNode = from.type === 'lift' ? from : to.type === 'lift' ? to : from;

    const step = generateLocalizedStep(
      { type: 'step', fromNode: liftNode },
      to,
      { hasElevator, hasRamp, hasStairs, distance },
      lang
    );
    result.push(step);
  }

  result.push(generateLocalizedStep({ type: 'arrive' }, pathNodes[pathNodes.length - 1], {}, lang));
  return result;
}

export default translations;
