import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";

export default function ReadingScreen() {
  const router = useRouter();
  const { language } = useLanguage();

  const [fontSize, setFontSize] = useState(20);
  const [lineSpacing, setLineSpacing] = useState(10);
  const [letterSpacing, setLetterSpacing] = useState(0);

  const getText = () => {
    if (language === "tamil") {
      return "வாசிப்பு என்பது புதிய விஷயங்களை அறிந்து கொள்வதற்கான ஒரு சிறந்த வழியாகும். தினமும் சிறிது நேரம் வாசிப்பதன் மூலம் உங்கள் சொற்களஞ்சியத்தையும் புரிந்துகொள்ளும் திறனையும் மேம்படுத்தலாம்.";
    }

    if (language === "sinhala") {
      return "කියවීම නව දේවල් ඉගෙන ගැනීමට හොඳ ක්‍රමයකි. සෑම දිනකම සුළු වේලාවක් කියවීමෙන් ඔබේ වචන මාලාව සහ අවබෝධතා හැකියාව වැඩිදියුණු කරගත හැකිය.";
    }

    return "Reading is a great way to learn new things. By reading a little every day, you can improve your vocabulary and understanding.";
  };

  const getTitle = () => {
    if (language === "tamil") {
      return "இன்றைய வாசிப்பு";
    }

    if (language === "sinhala") {
      return "අද කියවීම";
    }

    return "Today's Reading";
  };

  const getDescription = () => {
    if (language === "tamil") {
      return "உங்கள் வசதிக்கேற்ப உரையை மாற்றி வாசிக்கலாம்.";
    }

    if (language === "sinhala") {
      return "ඔබේ පහසුව අනුව පෙළ වෙනස් කර කියවන්න.";
    }

    return "Customize the text to make reading more comfortable.";
  };

  const getLabel = (
    english: string,
    tamil: string,
    sinhala: string
  ) => {
    if (language === "tamil") {
      return tamil;
    }

    if (language === "sinhala") {
      return sinhala;
    }

    return english;
  };

  const decreaseFont = () => {
    if (fontSize > 14) {
      setFontSize(fontSize - 2);
    }
  };

  const increaseFont = () => {
    if (fontSize < 30) {
      setFontSize(fontSize + 2);
    }
  };

  const decreaseLineSpacing = () => {
    if (lineSpacing > 4) {
      setLineSpacing(lineSpacing - 2);
    }
  };

  const increaseLineSpacing = () => {
    if (lineSpacing < 18) {
      setLineSpacing(lineSpacing + 2);
    }
  };

  const decreaseLetterSpacing = () => {
    if (letterSpacing > 0) {
      setLetterSpacing(letterSpacing - 0.5);
    }
  };

  const increaseLetterSpacing = () => {
    if (letterSpacing < 4) {
      setLetterSpacing(letterSpacing + 0.5);
    }
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            {getLabel("Reading", "வாசிப்பு", "කියවීම")}
          </Text>

          <Text style={styles.headerSubtitle}>
            {getLabel(
              "Reading Support",
              "வாசிப்பு உதவி",
              "කියවීමේ සහාය"
            )}
          </Text>
        </View>

        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Reading Header */}
        <View style={styles.introSection}>
          <Text style={styles.title}>{getTitle()}</Text>

          <Text style={styles.description}>
            {getDescription()}
          </Text>
        </View>

        {/* Reading Card */}
        <View style={styles.readingCard}>

          <View style={styles.lessonHeader}>
            <View style={styles.lessonBadge}>
              <Text style={styles.lessonBadgeText}>
                {getLabel(
                  "Lesson 01",
                  "பாடம் 01",
                  "පාඩම 01"
                )}
              </Text>
            </View>

            <Text style={styles.bookIcon}>📖</Text>
          </View>

          <Text
            style={[
              styles.readingText,
              {
                fontSize,
                lineHeight: fontSize + lineSpacing,
                letterSpacing,
              },
            ]}
          >
            {getText()}
          </Text>

          {/* TTS Button */}
          <TouchableOpacity
            style={styles.readButton}
            activeOpacity={0.8}
          >
            <Text style={styles.readButtonIcon}>🔊</Text>

            <Text style={styles.readButtonText}>
              {getLabel(
                "Read Aloud",
                "சத்தமாக வாசிக்கவும்",
                "ශබ්දයෙන් කියවන්න"
              )}
            </Text>
          </TouchableOpacity>

          {/* Phonetic Button */}
          <TouchableOpacity
            style={styles.phoneticButton}
            activeOpacity={0.8}
          >
            <Text style={styles.phoneticIcon}>🗣️</Text>

            <Text style={styles.phoneticText}>
              {getLabel(
                "Phonetic Assistance",
                "ஒலிப்பு உதவி",
                "ශබ්ද උච්චාරණ සහාය"
              )}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reading Controls */}
        <Text style={styles.sectionTitle}>
          {getLabel(
            "Reading Preferences",
            "வாசிப்பு விருப்பங்கள்",
            "කියවීමේ මනාප"
          )}
        </Text>

        {/* Font Size */}
        <View style={styles.controlCard}>
          <View style={styles.controlHeader}>
            <View>
              <Text style={styles.controlTitle}>
                {getLabel(
                  "Font Size",
                  "எழுத்து அளவு",
                  "අකුරු ප්‍රමාණය"
                )}
              </Text>

              <Text style={styles.controlValue}>
                {fontSize}px
              </Text>
            </View>

            <View style={styles.controlButtons}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={decreaseFont}
              >
                <Text style={styles.controlButtonText}>
                  −
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={increaseFont}
              >
                <Text style={styles.controlButtonText}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Line Spacing */}
        <View style={styles.controlCard}>
          <View style={styles.controlHeader}>
            <View>
              <Text style={styles.controlTitle}>
                {getLabel(
                  "Line Spacing",
                  "வரி இடைவெளி",
                  "පේළි අතර ඉඩ"
                )}
              </Text>

              <Text style={styles.controlValue}>
                {lineSpacing}
              </Text>
            </View>

            <View style={styles.controlButtons}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={decreaseLineSpacing}
              >
                <Text style={styles.controlButtonText}>
                  −
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={increaseLineSpacing}
              >
                <Text style={styles.controlButtonText}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Letter Spacing */}
        <View style={styles.controlCard}>
          <View style={styles.controlHeader}>
            <View>
              <Text style={styles.controlTitle}>
                {getLabel(
                  "Letter Spacing",
                  "எழுத்து இடைவெளி",
                  "අකුරු අතර ඉඩ"
                )}
              </Text>

              <Text style={styles.controlValue}>
                {letterSpacing}
              </Text>
            </View>

            <View style={styles.controlButtons}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={decreaseLetterSpacing}
              >
                <Text style={styles.controlButtonText}>
                  −
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={increaseLetterSpacing}
              >
                <Text style={styles.controlButtonText}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Background */}
        <Text style={styles.sectionTitle}>
          {getLabel(
            "Reading Background",
            "வாசிப்பு பின்னணி",
            "කියවීමේ පසුබිම"
          )}
        </Text>

        <View style={styles.backgroundCard}>
          <TouchableOpacity
            style={[
              styles.backgroundOption,
              styles.whiteBackground,
            ]}
          >
            <Text style={styles.backgroundText}>
              Aa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.backgroundOption,
              styles.creamBackground,
            ]}
          >
            <Text style={styles.backgroundText}>
              Aa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.backgroundOption,
              styles.blueBackground,
            ]}
          >
            <Text style={styles.backgroundText}>
              Aa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.backgroundOption,
              styles.greenBackground,
            ]}
          >
            <Text style={styles.backgroundText}>
              Aa
            </Text>
          </TouchableOpacity>
        </View>

        {/* Helpful Tip */}
        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              {getLabel(
                "Reading Tip",
                "வாசிப்பு குறிப்பு",
                "කියවීමේ උපදෙස"
              )}
            </Text>

            <Text style={styles.tipText}>
              {getLabel(
                "Choose a font size and spacing that feels comfortable for you.",
                "உங்களுக்கு வசதியாக இருக்கும் எழுத்து அளவு மற்றும் இடைவெளியைத் தேர்ந்தெடுக்கவும்.",
                "ඔබට පහසු අකුරු ප්‍රමාණයක් සහ ඉඩක් තෝරන්න."
              )}
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpace} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F9FC",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  backIcon: {
    fontSize: 32,
    color: "#3157A4",
    marginTop: -3,
  },

  headerTitleContainer: {
    flex: 1,
    marginLeft: 14,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
  },

  headerSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  settingsIcon: {
    fontSize: 19,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  introSection: {
    marginBottom: 20,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 7,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
  },

  readingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E7EBF1",
    marginBottom: 28,
  },

  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  lessonBadge: {
    backgroundColor: "#EAF0FF",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },

  lessonBadgeText: {
    color: "#3157A4",
    fontSize: 12,
    fontWeight: "700",
  },

  bookIcon: {
    fontSize: 25,
  },

  readingText: {
    color: "#1F2937",
    fontWeight: "500",
    marginBottom: 22,
  },

  readButton: {
    backgroundColor: "#3157A4",
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  readButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  readButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  phoneticButton: {
    backgroundColor: "#F0F5FF",
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DCE6FF",
  },

  phoneticIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  phoneticText: {
    color: "#3157A4",
    fontSize: 14,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 13,
  },

  controlCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E7EBF1",
  },

  controlHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  controlTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },

  controlValue: {
    fontSize: 13,
    color: "#6B7280",
  },

  controlButtons: {
    flexDirection: "row",
    gap: 8,
  },

  controlButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EEF3FF",
    alignItems: "center",
    justifyContent: "center",
  },

  controlButtonText: {
    color: "#3157A4",
    fontSize: 25,
    fontWeight: "500",
  },

  backgroundCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E7EBF1",
  },

  backgroundOption: {
    width: 58,
    height: 58,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D5D9E0",
  },

  whiteBackground: {
    backgroundColor: "#FFFFFF",
  },

  creamBackground: {
    backgroundColor: "#FFFBEA",
  },

  blueBackground: {
    backgroundColor: "#EAF4FF",
  },

  greenBackground: {
    backgroundColor: "#ECF8F1",
  },

  backgroundText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
  },

  tipCard: {
    backgroundColor: "#FFF8E7",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  tipIcon: {
    fontSize: 22,
    marginRight: 12,
  },

  tipContent: {
    flex: 1,
  },

  tipTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#5B4A20",
    marginBottom: 5,
  },

  tipText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#766431",
  },

  bottomSpace: {
    height: 30,
  },
});