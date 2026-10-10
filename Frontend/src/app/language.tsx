import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";

type Language = "english" | "tamil" | "sinhala";

export default function LanguageScreen() {
  const router = useRouter();

  const { language, setLanguage, t } = useLanguage();

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(language);

  const languages = [
    {
      id: "english" as Language,
      name: "English",
      nativeName: "English",
      icon: "🇬🇧",
    },
    {
      id: "tamil" as Language,
      name: "Tamil",
      nativeName: "தமிழ்",
      icon: "🇱🇰",
    },
    {
      id: "sinhala" as Language,
      name: "Sinhala",
      nativeName: "සිංහල",
      icon: "🇱🇰",
    },
  ];

  const handleLanguageSelect = (languageId: Language) => {
    // Change the app language immediately
    setSelectedLanguage(languageId);
    setLanguage(languageId);
  };

  const handleContinue = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.header}>
        <Text style={styles.logo}>ReadEase</Text>
      </View>

      {/* Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>
          {t.chooseLanguage}
        </Text>

        <Text style={styles.subtitle}>
          {t.languageDescription}
        </Text>
      </View>

      {/* Language Cards */}
      <View style={styles.languageContainer}>
        {languages.map((item) => {
          const isSelected =
            selectedLanguage === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.languageCard,
                isSelected && styles.selectedCard,
              ]}
              onPress={() =>
                handleLanguageSelect(item.id)
              }
              activeOpacity={0.8}
            >
              {/* Flag */}
              <Text style={styles.icon}>
                {item.icon}
              </Text>

              {/* Language Name */}
              <View style={styles.languageText}>
                <Text style={styles.languageName}>
                  {item.name}
                </Text>

                <Text style={styles.nativeName}>
                  {item.nativeName}
                </Text>
              </View>

              {/* Radio Button */}
              <View
                style={[
                  styles.radio,
                  isSelected && styles.radioSelected,
                ]}
              >
                {isSelected && (
                  <View style={styles.radioDot} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        activeOpacity={0.8}
      >
        <Text style={styles.continueText}>
          {t.continue}
        </Text>
      </TouchableOpacity>

      {/* Note - Translated dynamically */}
      <Text style={styles.note}>
        {t.changeLanguageLater || "You can change your language later in Settings."}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    paddingHorizontal: 24,
    paddingTop: 55,
  },

  header: {
    alignItems: "center",
    marginBottom: 35,
  },

  logo: {
    fontSize: 30,
    fontWeight: "800",
    color: "#3157A4",
  },

  titleSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 330,
  },

  languageContainer: {
    gap: 14,
  },

  languageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },

  selectedCard: {
    borderColor: "#3157A4",
    backgroundColor: "#F0F5FF",
  },

  icon: {
    fontSize: 30,
    marginRight: 16,
  },

  languageText: {
    flex: 1,
  },

  languageName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 3,
  },

  nativeName: {
    fontSize: 14,
    color: "#6B7280",
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },

  radioSelected: {
    borderColor: "#3157A4",
  },

  radioDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#3157A4",
  },

  continueButton: {
    backgroundColor: "#3157A4",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 35,
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  note: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 18,
  },
});