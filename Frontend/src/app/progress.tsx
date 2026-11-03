import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";

export default function ProgressScreen() {
  const router = useRouter();
  const { language } = useLanguage();

  const getLabel = (english: string, tamil: string, sinhala: string) => {
    if (language === "tamil") return tamil;
    if (language === "sinhala") return sinhala;
    return english;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push("/");
            }
          }}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {getLabel("Your Progress", "உங்கள் முன்னேற்றம்", "ඔබේ ප්‍රගතිය")}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Main Overview Card */}
      <View style={styles.overviewCard}>
        <Text style={styles.overviewTitle}>
          {getLabel("Overall Completion", "ஒட்டுமொத்த நிறைவு", "සමස්ත ප්‍රගතිය")}
        </Text>
        <Text style={styles.overviewPercentage}>35%</Text>
        <View style={styles.progressBarBackground}>
          <View style={styles.progressBarFill} />
        </View>
        <Text style={styles.overviewFooter}>
          {getLabel(
            "You are making steady progress this week!",
            "இந்த வாரம் நீங்கள் சீரான முன்னேற்றம் காண்கிறீர்கள்!",
            "මෙම සතියේ ඔබ ක්‍රමානුකූල ප්‍රගතියක් ලබා ඇත!"
          )}
        </Text>
      </View>

      {/* Stats Grid */}
      <Text style={styles.sectionTitle}>
        {getLabel("Key Statistics", "முக்கிய புள்ளிவிவரங்கள்", "ප්‍රධාන සංඛ්‍යාලේඛන")}
      </Text>

      <View style={styles.statsGrid}>
        {/* Stat 1: Reading Accuracy */}
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🎯</Text>
          <Text style={styles.statValue}>88%</Text>
          <Text style={styles.statLabel}>
            {getLabel("Reading Accuracy", "வாசிப்புத் துல்லியம்", "කියවීමේ නිරවද්‍යතාව")}
          </Text>
        </View>

        {/* Stat 2: Words Learned */}
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>📚</Text>
          <Text style={styles.statValue}>124</Text>
          <Text style={styles.statLabel}>
            {getLabel("Words Learned", "கற்ற சொற்கள்", "ඉගෙනගත් වචන")}
          </Text>
        </View>

        {/* Stat 3: Practice Streak */}
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statValue}>5 Days</Text>
          <Text style={styles.statLabel}>
            {getLabel("Practice Streak", "தொடர்ச்சி நாட்கள்", "අඛණ්ඩ දින සංඛ්‍යාව")}
          </Text>
        </View>

        {/* Stat 4: Time Spent */}
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>⏱️</Text>
          <Text style={styles.statValue}>2.5 Hrs</Text>
          <Text style={styles.statLabel}>
            {getLabel("Time Spent", "செலவிட்ட நேரம்", "ගත කළ කාලය")}
          </Text>
        </View>
      </View>

      {/* Weekly Breakdown */}
      <Text style={styles.sectionTitle}>
        {getLabel("Weekly Activity", "வாராந்திர செயல்பாடு", "සාමාන්‍ය සතිපතා ක්‍රියාකාරකම")}
      </Text>

      <View style={styles.activityCard}>
        <View style={styles.activityRow}>
          <Text style={styles.dayText}>Mon</Text>
          <View style={styles.barBg}><View style={[styles.barFill, { width: "70%" }]} /></View>
          <Text style={styles.scoreText}>25m</Text>
        </View>
        <View style={styles.activityRow}>
          <Text style={styles.dayText}>Tue</Text>
          <View style={styles.barBg}><View style={[styles.barFill, { width: "90%" }]} /></View>
          <Text style={styles.scoreText}>40m</Text>
        </View>
        <View style={styles.activityRow}>
          <Text style={styles.dayText}>Wed</Text>
          <View style={styles.barBg}><View style={[styles.barFill, { width: "40%" }]} /></View>
          <Text style={styles.scoreText}>15m</Text>
        </View>
        <View style={styles.activityRow}>
          <Text style={styles.dayText}>Thu</Text>
          <View style={styles.barBg}><View style={[styles.barFill, { width: "80%" }]} /></View>
          <Text style={styles.scoreText}>35m</Text>
        </View>
        <View style={styles.activityRow}>
          <Text style={styles.dayText}>Fri</Text>
          <View style={styles.barBg}><View style={[styles.barFill, { width: "60%" }]} /></View>
          <Text style={styles.scoreText}>20m</Text>
        </View>
      </View>

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
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 26,
    color: "#334155",
    marginTop: -2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F2937",
  },
  overviewCard: {
    backgroundColor: "#3157A4",
    borderRadius: 22,
    padding: 22,
    marginBottom: 25,
    shadowColor: "#3157A4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  overviewTitle: {
    color: "#DCE7FF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  overviewPercentage: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#5878B5",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBarFill: {
    width: "35%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
  },
  overviewFooter: {
    color: "#E2E8F0",
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 14,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    alignItems: "flex-start",
  },
  statEmoji: {
    fontSize: 26,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E8ECF2",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  dayText: {
    width: 35,
    fontSize: 13,
    fontWeight: "700",
    color: "#4B5563",
  },
  barBg: {
    flex: 1,
    height: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#4F46E5",
    borderRadius: 4,
  },
  scoreText: {
    width: 35,
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "right",
  },
  bottomSpace: {
    height: 20,
  },
});