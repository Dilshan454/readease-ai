import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type Language = "english" | "tamil" | "sinhala";

const translations = {
  english: {
    // Welcome
    welcome: "Welcome to ReadEase",
    welcomeDescription:
      "A personalized learning experience designed to make reading and learning easier.",
    getStarted: "Get Started",

    // Language
    chooseLanguage: "Choose Your Language",
    languageDescription:
      "Select your preferred language to personalize your learning experience.",
    continue: "Continue",
    changeLanguageNote:
      "You can change your language later in Settings.",

    // Login
    login: "Login",
    welcomeBack: "Welcome Back",
    continueLearning: "Continue your learning journey",
    register: "Register",
    createAccount: "Create Account",

    // Form
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",

    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    enterFullName: "Enter your full name",
    confirmYourPassword: "Confirm your password",

    // Password
    show: "Show",
    hide: "Hide",
    forgotPassword: "Forgot Password?",

    // Account
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",

    // Features
    easierReading: "Easier Reading",
    aiSupport: "AI Support",
    funLearning: "Fun Learning",

    // Common
    save: "Save",
    cancel: "Cancel",
    back: "Back",
    next: "Next",
    submit: "Submit",
    loading: "Loading...",
    error: "Something went wrong",
    success: "Success",
  },

  tamil: {
    // Welcome
    welcome: "ReadEase-க்கு வரவேற்கிறோம்",
    welcomeDescription:
      "வாசிப்பையும் கற்றலையும் எளிதாக்கும் தனிப்பயனாக்கப்பட்ட கற்றல் அனுபவம்.",
    getStarted: "தொடங்குங்கள்",

    // Language
    chooseLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    languageDescription:
      "உங்கள் கற்றல் அனுபவத்தை தனிப்பயனாக்க விரும்பும் மொழியைத் தேர்ந்தெடுக்கவும்.",
    continue: "தொடரவும்",
    changeLanguageNote:
      "பின்னர் Settings-ல் உங்கள் மொழியை மாற்றலாம்.",

    // Login
    login: "உள்நுழைக",
    welcomeBack: "மீண்டும் வரவேற்கிறோம்",
    continueLearning:
      "உங்கள் கற்றல் பயணத்தைத் தொடருங்கள்",
    register: "பதிவு செய்க",
    createAccount: "கணக்கை உருவாக்குக",

    // Form
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    confirmPassword:
      "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    fullName: "முழுப் பெயர்",

    enterEmail:
      "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
    enterPassword:
      "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
    enterFullName:
      "உங்கள் முழுப் பெயரை உள்ளிடவும்",
    confirmYourPassword:
      "உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்",

    // Password
    show: "காண்பி",
    hide: "மறை",
    forgotPassword:
      "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",

    // Account
    dontHaveAccount:
      "கணக்கு இல்லையா?",
    alreadyHaveAccount:
      "ஏற்கனவே கணக்கு உள்ளதா?",

    // Features
    easierReading: "எளிதான வாசிப்பு",
    aiSupport: "AI உதவி",
    funLearning: "வினோதமான கற்றல்",

    // Common
    save: "சேமி",
    cancel: "ரத்து செய்",
    back: "பின்செல்",
    next: "அடுத்து",
    submit: "சமர்ப்பிக்கவும்",
    loading: "ஏற்றுகிறது...",
    error: "ஏதோ தவறு ஏற்பட்டுள்ளது",
    success: "வெற்றி",
  },

  sinhala: {
    // Welcome
    welcome: "ReadEase වෙත සාදරයෙන් පිළිගනිමු",
    welcomeDescription:
      "කියවීම සහ ඉගෙනීම පහසු කිරීම සඳහා නිර්මාණය කළ පුද්ගලීකරණය කළ ඉගෙනුම් අත්දැකීමක්.",
    getStarted: "ආරම්භ කරන්න",

    // Language
    chooseLanguage: "ඔබේ භාෂාව තෝරන්න",
    languageDescription:
      "ඔබේ ඉගෙනුම් අත්දැකීම පුද්ගලීකරණය කිරීමට ඔබ කැමති භාෂාව තෝරන්න.",
    continue: "ඉදිරියට",
    changeLanguageNote:
      "පසුව Settings තුළ ඔබේ භාෂාව වෙනස් කළ හැකිය.",

    // Login
    login: "ඇතුල් වන්න",
    welcomeBack: "නැවත සාදරයෙන් පිළිගනිමු",
    continueLearning:
      "ඔබගේ ඉගෙනුම් ගමන දිගටම කරගෙන යන්න",
    register: "ලියාපදිංචි වන්න",
    createAccount: "ගිණුම සාදන්න",

    // Form
    email: "විද්‍යුත් තැපෑල",
    password: "මුරපදය",
    confirmPassword:
      "මුරපදය තහවුරු කරන්න",
    fullName: "සම්පූර්ණ නම",

    enterEmail:
      "ඔබගේ විද්‍යුත් තැපෑල ඇතුළත් කරන්න",
    enterPassword:
      "ඔබගේ මුරපදය ඇතුළත් කරන්න",
    enterFullName:
      "ඔබගේ සම්පූර්ණ නම ඇතුළත් කරන්න",
    confirmYourPassword:
      "ඔබගේ මුරපදය තහවුරු කරන්න",

    // Password
    show: "පෙන්වන්න",
    hide: "සඟවන්න",
    forgotPassword:
      "මුරපදය අමතකද?",

    // Account
    dontHaveAccount:
      "ගිණුමක් නොමැතිද?",
    alreadyHaveAccount:
      "දැනටමත් ගිණුමක් තිබේද?",

    // Features
    easierReading: "පහසු කියවීම",
    aiSupport: "AI සහාය",
    funLearning: "විනෝදජනක ඉගෙනීම",

    // Common
    save: "සුරකින්න",
    cancel: "අවලංගු කරන්න",
    back: "ආපසු",
    next: "ඊළඟ",
    submit: "ඉදිරිපත් කරන්න",
    loading: "පූරණය වෙමින්...",
    error: "යම් දෝෂයක් සිදුවී ඇත",
    success: "සාර්ථකයි",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof translations.english;
};

const LanguageContext =
  createContext<LanguageContextType | undefined>(
    undefined
  );

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguage] =
    useState<Language>("english");

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}