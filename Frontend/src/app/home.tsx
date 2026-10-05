import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeScreen() {
  const router = useRouter();
  const { language } = useLanguage();

  const getGreeting = () => {
    if (language === "tamil") {
      return "வணக்கம்! 👋";
    }

    if (language === "sinhala") {
      return "ආයුබෝවන්! 👋";
    }

    return "Hello! 👋";
  };

  const getSubtitle = () => {
    if (language === "tamil") {
      return "இன்றைய கற்றல் பயணத்தைத் தொடங்குவோம்.";
    }

    if (language === "sinhala") {
      return "අද ඔබේ ඉගෙනුම් ගමන ආරම්භ කරමු.";
    }

    return "Let's continue your learning journey.";
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            {getGreeting()}
          </Text>

          <Text style={styles.subtitle}>
            {getSubtitle()}
          </Text>
        </View>

        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressTitle}>
              {getLabel(
                "Your Progress",
                "உங்கள் முன்னேற்றம்",
                "ඔබේ ප්‍රගතිය"
              )}
            </Text>

            <Text style={styles.progressSubtitle}>
              {getLabel(
                "Great progress! Keep going.",
                "நல்ல முன்னேற்றம்! தொடர்ந்து செல்லுங்கள்.",
                "හොඳ ප්‍රගතියක්! දිගටම කරගෙන යන්න."
              )}
            </Text>
          </View>

          <Text style={styles.progressPercentage}>
            35%
          </Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View style={styles.progressBar} />
        </View>

        <Text style={styles.progressFooter}>
          {getLabel(
            "Keep improving your learning journey.",
            "உங்கள் கற்றல் பயணத்தை தொடர்ந்து மேம்படுத்துங்கள்.",
            "ඔබේ ඉගෙනුම් ගමන තවදුරටත් වැඩිදියුණු කරන්න."
          )}
        </Text>
      </View>

      {/* Learning Features */}
      <Text style={styles.sectionTitle}>
        {getLabel(
          "Learning Features",
          "கற்றல் அம்சங்கள்",
          "ඉගෙනුම් විශේෂාංග"
        )}
      </Text>

      <View style={styles.featureGrid}>

        {/* Reading */}
        <TouchableOpacity
          style={styles.featureCard}
          activeOpacity={0.8}
          onPress={() => router.push("/reading")}
        >
          <View
            style={[
              styles.iconBox,
              styles.readingIcon,
            ]}
          >
            <Text style={styles.icon}>📖</Text>
          </View>

          <Text style={styles.featureTitle}>
            {getLabel(
              "Reading",
              "வாசிப்பு",
              "කියවීම"
            )}
          </Text>

          <Text style={styles.featureDescription}>
            {getLabel(
              "Read more easily",
              "எளிதாக வாசிக்கவும்",
              "පහසුවෙන් කියවන්න"
            )}
          </Text>
        </TouchableOpacity>

        {/* AI Support */}
        <TouchableOpacity
          style={styles.featureCard}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.iconBox,
              styles.aiIcon,
            ]}
          >
            <Text style={styles.icon}>🤖</Text>
          </View>

          <Text style={styles.featureTitle}>
            {getLabel(
              "AI Support",
              "AI உதவி",
              "AI සහාය"
            )}
          </Text>

          <Text style={styles.featureDescription}>
            {getLabel(
              "Learn with AI",
              "AI மூலம் கற்றுக்கொள்ளுங்கள்",
              "AI සමඟ ඉගෙන ගන්න"
            )}
          </Text>
        </TouchableOpacity>

        {/* Games */}
        <TouchableOpacity
          style={styles.featureCard}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.iconBox,
              styles.gameIcon,
            ]}
          >
            <Text style={styles.icon}>🎮</Text>
          </View>

          <Text style={styles.featureTitle}>
            {getLabel(
              "Games",
              "விளையாட்டுகள்",
              "ක්‍රීඩා"
            )}
          </Text>

          <Text style={styles.featureDescription}>
            {getLabel(
              "Learn through play",
              "விளையாடி கற்றுக்கொள்ளுங்கள்",
              "ක්‍රීඩා කරමින් ඉගෙන ගන්න"
            )}
          </Text>
        </TouchableOpacity>

        {/* Progress */}
        <TouchableOpacity
          style={styles.featureCard}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.iconBox,
              styles.progressIcon,
            ]}
          >
            <Text style={styles.icon}>📊</Text>
          </View>

          <Text style={styles.featureTitle}>
            {getLabel(
              "Progress",
              "முன்னேற்றம்",
              "ප්‍රගතිය"
            )}
          </Text>

          <Text style={styles.featureDescription}>
            {getLabel(
              "Track your progress",
              "உங்கள் முன்னேற்றத்தைப் பாருங்கள்",
              "ඔබේ ප්‍රගතිය බලන්න"
            )}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recommended Section */}
      <View style={styles.recommendedHeader}>
        <Text style={styles.sectionTitle}>
          {getLabel(
            "Recommended for You",
            "இன்றைய பரிந்துரை",
            "අද නිර්දේශය"
          )}
        </Text>

        <Text style={styles.seeAll}>
          {getLabel(
            "See All",
            "அனைத்தும்",
            "සියල්ල"
          )}
        </Text>
      </View>

      {/* Recommended Lesson */}
      <TouchableOpacity
        style={styles.lessonCard}
        activeOpacity={0.85}
      >
        <View style={styles.lessonIcon}>
          <Text style={styles.lessonEmoji}>
            🧠
          </Text>
        </View>

        <View style={styles.lessonContent}>
          <Text style={styles.lessonTitle}>
            {getLabel(
              "Word Practice",
              "சொல் பயிற்சி",
              "වචන පුහුණුව"
            )}
          </Text>

          <Text style={styles.lessonDescription}>
            {getLabel(
              "Practice new words",
              "புதிய சொற்களைப் பயிற்சி செய்யுங்கள்",
              "නව වචන පුහුණු කරන්න"
            )}
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  greeting: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  profileIcon: {
    fontSize: 22,
  },

  progressCard: {
    backgroundColor: "#3157A4",
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 5,
  },

  progressSubtitle: {
    color: "#DCE7FF",
    fontSize: 13,
  },

  progressPercentage: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
  },

  progressBarBackground: {
    height: 8,
    backgroundColor: "#5878B5",
    borderRadius: 5,
    marginTop: 20,
    overflow: "hidden",
  },

  progressBar: {
    width: "35%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },

  progressFooter: {
    color: "#DCE7FF",
    fontSize: 12,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 15,
  },

  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  featureCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  readingIcon: {
    backgroundColor: "#EAF1FF",
  },

  aiIcon: {
    backgroundColor: "#F0EFFF",
  },

  gameIcon: {
    backgroundColor: "#FFF1E8",
  },

  progressIcon: {
    backgroundColor: "#E9F8F0",
  },

  icon: {
    fontSize: 24,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 5,
  },

  featureDescription: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
  },

  recommendedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  seeAll: {
    color: "#3157A4",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 15,
  },

  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },

  lessonIcon: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#FFF5D9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  lessonEmoji: {
    fontSize: 25,
  },

  lessonContent: {
    flex: 1,
  },

  lessonTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 5,
  },

  lessonDescription: {
    fontSize: 12,
    color: "#6B7280",
  },

  arrow: {
    fontSize: 30,
    color: "#9CA3AF",
    marginLeft: 8,
  },

  bottomSpace: {
    height: 30,
  },
});