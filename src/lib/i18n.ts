export type Language = "en" | "bn";

export const DEFAULT_LANGUAGE: Language = "en";

// Kept the key the Home page already used so a saved preference survives.
export const LANGUAGE_STORAGE_KEY = "agri-language";

export function isLanguage(value: unknown): value is Language {
  return value === "en" || value === "bn";
}

const en = {
  roles: {
    Farmer: "Farmer",
    Admin: "Admin",
    Expert: "Expert",
  },

  nav: {
    brand: "AgriTech",
    login: "Log in",
    register: "Register",
    // Label of the toggle: shows the language you switch *to*.
    language: "বাং",
    logout: "Log out",
  },

  home: {
    badge: "AI-Powered Smart Agriculture",

    title1: "Grow Smarter.",
    title2: "Farm Better.",
    title3: "Live Better.",

    description:
      "A smarter way to manage your farm with AI-powered crop insights, weather intelligence, soil analysis, disease detection and real-time market information.",

    exploreFarm: "Explore Your Farm",
    askAI: "Ask Agri AI",

    cropHealth: "Crop Health",
    aiAssistance: "AI Assistance",
    farmInsights: "Farm Insights",
    farmInsightsValue: "Live",

    weather: "Today's Weather",
    weatherValue: "28°C • Clear",

    farmLocation: "Farm Location",
    yourFarm: "Your Farm",

    cropHealthValue: "Excellent",
    healthScore: "Health score",

    soilMoisture: "Soil Moisture",
    aiMonitoring: "AI Monitoring",
    yieldForecast: "Yield Forecast",

    smartCrop: "Smart Crop Management",
    smartCropDesc: "Track crops and make better decisions.",

    weatherIntelligence: "Weather Intelligence",
    weatherDesc: "Understand conditions before they change.",

    aiFarmAssistant: "AI Farm Assistant",
    aiFarmDesc: "Get intelligent farming guidance anytime.",
  },

  dashboard: {
    loading: "Loading Dashboard...",
    dashboardLabel: "Dashboard",
    welcome: (name: string) => `Welcome back, ${name}`,
    settings: "Settings",
    logout: "Logout",

    systemStatus: "System Status",
    healthy: "Healthy",
    allServicesOnline: "All services online",
    totalUsers: "Total Users",
    usersBreakdown: (defaults: number, registered: number) =>
      `${defaults} defaults + ${registered} registered`,
    serverRegion: "Server Region",
    ping: "Ping",

    userRegistry: "User Registry",
    tableName: "Name",
    tableEmail: "Email",
    tableRole: "Role",
    tableSource: "Source",
    systemDefault: "System Default",
    registeredForm: "Registered Form",

    cropHealth: "Crop Health",
    cropHealthValue: "Excellent (91%)",
    weather: "Today's Weather",
    weatherValue: "28°C • Clear Sky",
    soilMoisture: "Soil Moisture",
    soilMoistureValue: "74% (Optimal)",
    alerts: "Alerts",
    alertsValue: "0 Warnings",

    cropManagement: "Crop Management",
    cropManagementDesc:
      "Monitor your crops' growth stages, track irrigation cycles, and optimize crop yields using AI recommendations.",
    viewMyCrops: "View My Crops",
    cropCalendar: "Crop Calendar",

    farmIntelligence: "Farm Intelligence",
    farmIntelligenceDesc:
      "Access weather intelligence reports, run disease diagnostic tool on crop images, or get expert AI recommendations.",
    consultAI: "Consult Agri AI",
    detectDisease: "Detect Disease",
  },

  profile: {
    loading: "Loading Profile...",
    backToDashboard: "Back to Dashboard",
    accountLabel: "Account",
    emailAddress: "Email address",
    accessLevel: "Access Level",
    privilegeLabel: "Privilege",
    memberSince: "Member Since",
    memberSinceValue: "August 2026",
    logoutFromAccount: "Logout from Account",
  },

  login: {
    loading: "Loading AgriTech...",

    heroTagline: "Smart Farming",
    heroTitle1: "Smarter farming,",
    heroTitle2: "better future.",
    heroDesc:
      "Manage your farm, monitor your crops, understand the market and make smarter farming decisions with AgriTech.",
    platform: "Smart Agriculture Platform",

    welcomeBack: "Welcome back",
    title: "Login to your account",
    subtitle: "Continue managing your farm with AgriTech.",

    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot password?",
    showPassword: "Show password",
    hidePassword: "Hide password",
    rememberMe: "Remember me",
    submit: "Login",

    noAccount: "Don't have an account?",
    createAccount: "Create account",

    errors: {
      fillAll: "Please fill in all fields.",
      invalid: "Invalid email or password.",
    },
  },

  register: {
    loading: "Loading AgriTech...",

    heroTagline: "Join AgriTech",
    heroTitle1: "Grow smarter.",
    heroTitle2: "Farm better.",
    heroDesc:
      "Create your AgriTech account and get access to smart farming tools, crop insights and agricultural intelligence.",
    benefits: [
      "Smart farm management",
      "Crop and weather insights",
      "AI-powered farming assistance",
    ],
    platform: "Smart Agriculture Platform",

    getStarted: "Get started",
    title: "Create your account",
    subtitle: "Join AgriTech and start your smarter farming journey.",

    nameLabel: "Full name",
    namePlaceholder: "Enter your full name",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Create a password",
    passwordHint: "Use at least 8 characters.",
    confirmLabel: "Confirm password",
    confirmPlaceholder: "Confirm your password",
    showPassword: "Show password",
    hidePassword: "Hide password",

    agreePrefix: "I agree to the ",
    terms: "Terms of Service",
    agreeMiddle: " and ",
    privacy: "Privacy Policy",
    agreeSuffix: ".",

    submit: "Create account",
    haveAccount: "Already have an account?",
    login: "Login",

    errors: {
      fillAll: "Please fill in all fields.",
      passwordShort: "Password must be at least 8 characters.",
      passwordMismatch: "Passwords do not match.",
      emailExists: "An account with this email already exists.",
      generic: "An error occurred during registration. Please try again.",
    },
  },
};

export type Translation = typeof en;

const bn: Translation = {
  roles: {
    Farmer: "কৃষক",
    Admin: "অ্যাডমিন",
    Expert: "বিশেষজ্ঞ",
  },

  nav: {
    brand: "এগ্রিটেক",
    login: "লগ ইন",
    register: "নিবন্ধন",
    language: "EN",
    logout: "লগ আউট",
  },

  home: {
    badge: "AI-চালিত স্মার্ট কৃষি",

    title1: "আরও স্মার্টভাবে",
    title2: "কৃষিকাজ করুন।",
    title3: "আরও ভালোভাবে বাঁচুন।",

    description:
      "AI-চালিত ফসলের তথ্য, আবহাওয়া বিশ্লেষণ, মাটি বিশ্লেষণ, রোগ শনাক্তকরণ এবং রিয়েল-টাইম বাজার তথ্যের মাধ্যমে আপনার কৃষিকে আরও স্মার্টভাবে পরিচালনা করুন।",

    exploreFarm: "আপনার খামার দেখুন",
    askAI: "এগ্রি AI-কে জিজ্ঞাসা করুন",

    cropHealth: "ফসলের স্বাস্থ্য",
    aiAssistance: "AI সহায়তা",
    farmInsights: "খামারের তথ্য",
    farmInsightsValue: "লাইভ",

    weather: "আজকের আবহাওয়া",
    weatherValue: "২৮°C • পরিষ্কার",

    farmLocation: "খামারের অবস্থান",
    yourFarm: "আপনার খামার",

    cropHealthValue: "চমৎকার",
    healthScore: "স্বাস্থ্য স্কোর",

    soilMoisture: "মাটির আর্দ্রতা",
    aiMonitoring: "AI পর্যবেক্ষণ",
    yieldForecast: "ফলন পূর্বাভাস",

    smartCrop: "স্মার্ট ফসল ব্যবস্থাপনা",
    smartCropDesc: "ফসল পর্যবেক্ষণ করুন এবং আরও ভালো সিদ্ধান্ত নিন।",

    weatherIntelligence: "আবহাওয়া বিশ্লেষণ",
    weatherDesc: "আবহাওয়ার পরিবর্তনের আগে পরিস্থিতি বুঝে নিন।",

    aiFarmAssistant: "AI কৃষি সহকারী",
    aiFarmDesc: "যেকোনো সময় বুদ্ধিমান কৃষি পরামর্শ পান।",
  },

  dashboard: {
    loading: "ড্যাশবোর্ড লোড হচ্ছে...",
    dashboardLabel: "ড্যাশবোর্ড",
    welcome: (name: string) => `স্বাগতম, ${name}`,
    settings: "সেটিংস",
    logout: "লগ আউট",

    systemStatus: "সিস্টেম অবস্থা",
    healthy: "সচল",
    allServicesOnline: "সব সার্ভিস চালু আছে",
    totalUsers: "মোট ব্যবহারকারী",
    usersBreakdown: (defaults: number, registered: number) =>
      `${defaults} জন ডিফল্ট + ${registered} জন নিবন্ধিত`,
    serverRegion: "সার্ভার রিজিয়ন",
    ping: "পিং",

    userRegistry: "ব্যবহারকারীর তালিকা",
    tableName: "নাম",
    tableEmail: "ইমেইল",
    tableRole: "ভূমিকা",
    tableSource: "উৎস",
    systemDefault: "সিস্টেম ডিফল্ট",
    registeredForm: "নিবন্ধন ফর্ম",

    cropHealth: "ফসলের স্বাস্থ্য",
    cropHealthValue: "চমৎকার (৯১%)",
    weather: "আজকের আবহাওয়া",
    weatherValue: "২৮°C • পরিষ্কার আকাশ",
    soilMoisture: "মাটির আর্দ্রতা",
    soilMoistureValue: "৭৪% (আদর্শ)",
    alerts: "সতর্কতা",
    alertsValue: "০টি সতর্কতা",

    cropManagement: "ফসল ব্যবস্থাপনা",
    cropManagementDesc:
      "আপনার ফসলের বৃদ্ধির ধাপ পর্যবেক্ষণ করুন, সেচের চক্র হিসাব রাখুন এবং AI পরামর্শ ব্যবহার করে ফলন বাড়ান।",
    viewMyCrops: "আমার ফসল দেখুন",
    cropCalendar: "ফসল ক্যালেন্ডার",

    farmIntelligence: "খামার বিশ্লেষণ",
    farmIntelligenceDesc:
      "আবহাওয়া বিশ্লেষণ রিপোর্ট দেখুন, ফসলের ছবি দিয়ে রোগ নির্ণয় করুন, অথবা বিশেষজ্ঞ AI পরামর্শ নিন।",
    consultAI: "এগ্রি AI-এর পরামর্শ নিন",
    detectDisease: "রোগ শনাক্ত করুন",
  },

  profile: {
    loading: "প্রোফাইল লোড হচ্ছে...",
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    accountLabel: "অ্যাকাউন্ট",
    emailAddress: "ইমেইল অ্যাড্রেস",
    accessLevel: "অ্যাক্সেস লেভেল",
    privilegeLabel: "অনুমতি",
    memberSince: "সদস্য হয়েছেন",
    memberSinceValue: "আগস্ট ২০২৬",
    logoutFromAccount: "অ্যাকাউন্ট থেকে লগ আউট",
  },

  login: {
    loading: "এগ্রিটেক লোড হচ্ছে...",

    heroTagline: "স্মার্ট কৃষি",
    heroTitle1: "আরও স্মার্ট কৃষি,",
    heroTitle2: "উন্নত ভবিষ্যৎ।",
    heroDesc:
      "এগ্রিটেকের সাথে আপনার খামার পরিচালনা করুন, ফসল পর্যবেক্ষণ করুন, বাজার বুঝুন এবং আরও স্মার্ট কৃষি সিদ্ধান্ত নিন।",
    platform: "স্মার্ট কৃষি প্ল্যাটফর্ম",

    welcomeBack: "আবার স্বাগতম",
    title: "আপনার অ্যাকাউন্টে লগ ইন করুন",
    subtitle: "এগ্রিটেকের সাথে আপনার খামার পরিচালনা করতে থাকুন।",

    emailLabel: "ইমেইল অ্যাড্রেস",
    emailPlaceholder: "you@example.com",
    passwordLabel: "পাসওয়ার্ড",
    passwordPlaceholder: "আপনার পাসওয়ার্ড লিখুন",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    showPassword: "পাসওয়ার্ড দেখান",
    hidePassword: "পাসওয়ার্ড লুকান",
    rememberMe: "আমাকে মনে রাখুন",
    submit: "লগ ইন",

    noAccount: "অ্যাকাউন্ট নেই?",
    createAccount: "অ্যাকাউন্ট তৈরি করুন",

    errors: {
      fillAll: "সব ঘর পূরণ করুন।",
      invalid: "ইমেইল বা পাসওয়ার্ড সঠিক নয়।",
    },
  },

  register: {
    loading: "এগ্রিটেক লোড হচ্ছে...",

    heroTagline: "এগ্রিটেকে যোগ দিন",
    heroTitle1: "আরও স্মার্টভাবে চাষ করুন।",
    heroTitle2: "আরও ভালো কৃষি করুন।",
    heroDesc:
      "এগ্রিটেক অ্যাকাউন্ট তৈরি করুন এবং স্মার্ট কৃষি টুল, ফসলের তথ্য ও কৃষি বিশ্লেষণে প্রবেশ করুন।",
    benefits: [
      "স্মার্ট খামার ব্যবস্থাপনা",
      "ফসল ও আবহাওয়ার তথ্য",
      "AI-চালিত কৃষি সহায়তা",
    ],
    platform: "স্মার্ট কৃষি প্ল্যাটফর্ম",

    getStarted: "শুরু করুন",
    title: "আপনার অ্যাকাউন্ট তৈরি করুন",
    subtitle: "এগ্রিটেকে যোগ দিন এবং স্মার্ট কৃষির যাত্রা শুরু করুন।",

    nameLabel: "পুরো নাম",
    namePlaceholder: "আপনার পুরো নাম লিখুন",
    emailLabel: "ইমেইল অ্যাড্রেস",
    emailPlaceholder: "you@example.com",
    passwordLabel: "পাসওয়ার্ড",
    passwordPlaceholder: "একটি পাসওয়ার্ড তৈরি করুন",
    passwordHint: "কমপক্ষে ৮টি অক্ষর ব্যবহার করুন।",
    confirmLabel: "পাসওয়ার্ড নিশ্চিত করুন",
    confirmPlaceholder: "আপনার পাসওয়ার্ড আবার লিখুন",
    showPassword: "পাসওয়ার্ড দেখান",
    hidePassword: "পাসওয়ার্ড লুকান",

    agreePrefix: "আমি ",
    terms: "সেবার শর্তাবলি",
    agreeMiddle: " এবং ",
    privacy: "গোপনীয়তা নীতি",
    agreeSuffix: " মেনে নিচ্ছি।",

    submit: "অ্যাকাউন্ট তৈরি করুন",
    haveAccount: "আগে থেকেই অ্যাকাউন্ট আছে?",
    login: "লগ ইন",

    errors: {
      fillAll: "সব ঘর পূরণ করুন।",
      passwordShort: "পাসওয়ার্ড কমপক্ষে ৮টি অক্ষরের হতে হবে।",
      passwordMismatch: "পাসওয়ার্ড দুটি মিলছে না।",
      emailExists: "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে।",
      generic: "নিবন্ধনের সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।",
    },
  },
};

export const translations: Record<Language, Translation> = { en, bn };

export type LoginErrorKey = keyof Translation["login"]["errors"];
export type RegisterErrorKey = keyof Translation["register"]["errors"];
