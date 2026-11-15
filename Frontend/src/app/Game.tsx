import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";

export default function GameScreen() {
  const router = useRouter();
  const { language } = useLanguage();

  const [stats, setStats] = useState({
    xp: 120,
    streak: 5,
    level: 2,
    badges: ["First Step", "Reader", "Quiz Master"],
  });

  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSolved, setQuizSolved] = useState(false);

  // AI Quiz States
  const [quizLoading, setQuizLoading] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState({
    question: "What is the meaning of 'Courage'?",
    options: ["Fear / Scared", "Bravery / Strength", "Sadness"],
    correctIndex: 1,
  });

  const getLabel = (english: string, tamil: string, sinhala: string) => {
    if (language === "tamil") return tamil;
    if (language === "sinhala") return sinhala;
    return english;
  };

  const fetchAIQuiz = async () => {
    try {
      setQuizLoading(true);
      setSelectedAnswer(null);
      setQuizSolved(false);

      const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL || "http://172.20.10.9:5000";
      
      const response = await fetch(`${apiBaseUrl}/api/games/generate-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });

      const data = await response.json();
      if (response.ok && data.success && data.quiz) {
        setCurrentQuiz(data.quiz);
      } else {
        console.error("Failed to generate quiz:", data.error);
      }
    } catch (error) {
      console.log("Quiz fetch error:", error);
      Alert.alert("Error", "Could not connect to AI quiz generator.");
    } finally {
      setQuizLoading(false);
    }
  };

  useEffect(() => {
    fetchAIQuiz();
  }, []);

  const handleClaimReward = () => {
    if (dailyClaimed) return;
    setStats((prev) => ({ ...prev, xp: prev.xp + 20 }));
    setDailyClaimed(true);
    Alert.alert(
      getLabel("Bonus Claimed! 🎉", "போனஸ் பெறப்பட்டது! 🎉", "බෝනස් ලකුණු ලැබුණා! 🎉"),
      getLabel("You received +20 XP!", "உங்களுக்கு +20 XP கிடைத்தது!", "ඔබට +20 XP ලැබුණි!")
    );
  };

  const handleQuizAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === currentQuiz.correctIndex) {
      setStats((prev) => ({ ...prev, xp: prev.xp + 50 }));
      setQuizSolved(true);
      Alert.alert(
        getLabel("Correct! 🌟", "சரி! 🌟", "නිවැරදියි! 🌟"),
        getLabel("You earned +50 XP!", "நீங்கள் +50 XP சம்பாதித்தீர்கள்!", "ඔබට +50 XP එකතු විය!")
      );
    } else {
      Alert.alert(
        getLabel("Try Again!", "மீண்டும் முயற்சிக்கவும்!", "නැවත උත්සාහ කරන්න!"),
        getLabel("That's not correct.", "அது சரியல்ல.", "එය නිවැරදි නැත.")
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            {getLabel("Games & Challenges", "விளையாட்டுகள்", "ක්‍රීඩා සහ අභියෝග")}
          </Text>
          <Text style={styles.headerSubtitle}>
            {getLabel("Interactive Quizzes & XP", "வினாடி வினாக்கள்", "අන්තර්ක්‍රියාකාරී ප්‍රශ්න")}
          </Text>
        </View>
        <View style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>🎮</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statNumber}>{stats.streak}</Text>
            <Text style={styles.statLabel}>{getLabel("Day Streak", "தொடர்ச்சி", "දින අඛණ්ඩතාව")}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={styles.statNumber}>{stats.xp}</Text>
            <Text style={styles.statLabel}>{getLabel("Total XP", "மொத்த XP", "මුළු XP")}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>🏆</Text>
            <Text style={styles.statNumber}>Lvl {stats.level}</Text>
            <Text style={styles.statLabel}>{getLabel("Level", "மட்டம்", "මට්ටම")}</Text>
          </View>
        </View>

        {/* Daily Bonus */}
        <View style={styles.rewardCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rewardTitle}>
              {getLabel("🎁 Daily Login Bonus", "🎁 தினசரி போனஸ்", "🎁 දෛනික ත්‍යාගය")}
            </Text>
            <Text style={styles.rewardSub}>
              {getLabel("Claim your daily reward to boost XP!", "வெகுமதியைப் பெறுங்கள்!", "දෛනික ත්‍යාගය ලබා ගන්න!")}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.claimBtn, dailyClaimed && styles.claimedBtn]}
            onPress={handleClaimReward}
            disabled={dailyClaimed}
          >
            <Text style={styles.claimBtnText}>
              {dailyClaimed ? getLabel("Claimed ✓", "பெறப்பட்டது ✓", "ලබාගන්න ලදී ✓") : "+20 XP"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* AI Quick Quiz Section */}
        <View style={styles.section}>
          <View style={styles.quizHeaderRow}>
            <Text style={styles.sectionTitle}>
              {getLabel("⚡ AI Quick Quiz", "⚡ AI வினாடி வினா", "⚡ AI ඉක්මන් ප්‍රශ්නාවලිය")}
            </Text>
            <TouchableOpacity onPress={fetchAIQuiz} disabled={quizLoading}>
              <Text style={styles.newQuizText}>
                🔄 {getLabel("New Quiz", "புதிய வினாடி வினா", "අලුත් ප්‍රශ්නයක්")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.interactiveQuizCard}>
            {quizLoading ? (
              <ActivityIndicator size="large" color="#3157A4" style={{ marginVertical: 20 }} />
            ) : (
              <>
                <Text style={styles.quizQuestion}>{currentQuiz.question}</Text>
                {currentQuiz.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuiz.correctIndex;
                  let bgStyle = styles.optionItem;

                  if (selectedAnswer !== null) {
                    if (isCorrect) bgStyle = [styles.optionItem, styles.correctOption];
                    else if (isSelected && !isCorrect) bgStyle = [styles.optionItem, styles.wrongOption];
                  }

                  return (
                    <TouchableOpacity
                      key={index}
                      style={bgStyle}
                      disabled={quizSolved}
                      onPress={() => handleQuizAnswer(index)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  );
                })}
              </>
            )}
          </View>
        </View>

        {/* Badges Earned */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {getLabel("Badges & Achievements", "சாதனைகள்", "පදක්කම් සහ ජයග්‍රහණ")}
          </Text>
          <View style={styles.badgeRow}>
            {stats.badges.map((badge, index) => (
              <View key={index} style={styles.badgeContainer}>
                <Text style={styles.badgeIcon}>🎖️</Text>
                <Text style={styles.badgeName}>{badge}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC" },
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
  backIcon: { fontSize: 32, color: "#3157A4", marginTop: -3 },
  headerTitleContainer: { flex: 1, marginLeft: 14 },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#1F2937" },
  headerSubtitle: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: { fontSize: 19 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  statsCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#3157A4",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  statBox: { alignItems: "center" },
  statEmoji: { fontSize: 24, marginBottom: 4 },
  statNumber: { fontSize: 20, fontWeight: "800", color: "#FFFFFF" },
  statLabel: { fontSize: 12, color: "#E0E7FF", marginTop: 2 },
  rewardCard: {
    backgroundColor: "#FEF3C7",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  rewardTitle: { fontSize: 15, fontWeight: "800", color: "#92400E", marginBottom: 3 },
  rewardSub: { fontSize: 12, color: "#B45309" },
  claimBtn: { backgroundColor: "#D97706", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  claimedBtn: { backgroundColor: "#10B981" },
  claimBtnText: { color: "#FFFFFF", fontWeight: "800", fontSize: 13 },
  section: { marginBottom: 25 },
  quizHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 19, fontWeight: "800", color: "#1F2937" },
  newQuizText: { color: "#3157A4", fontWeight: "700", fontSize: 14 },
  interactiveQuizCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  quizQuestion: { fontSize: 15, fontWeight: "700", color: "#1F2937", marginBottom: 14 },
  optionItem: {
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 8,
  },
  optionText: { fontSize: 14, fontWeight: "600", color: "#334155" },
  correctOption: { backgroundColor: "#DEF7EC", borderColor: "#31C48D" },
  wrongOption: { backgroundColor: "#FDE8E8", borderColor: "#F05252" },
  badgeRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  badgeContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    width: 100,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  badgeIcon: { fontSize: 32, marginBottom: 6 },
  badgeName: { fontSize: 12, fontWeight: "600", color: "#374151", textAlign: "center" },
  bottomSpace: { height: 30 },
});