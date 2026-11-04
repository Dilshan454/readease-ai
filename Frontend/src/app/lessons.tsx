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

export default function LessonsScreen() {
  const router = useRouter();
  const { language } = useLanguage();

  const getLabel = (
    english: string,
    tamil: string,
    sinhala: string
  ) => {
    if (language === "tamil") return tamil;
    if (language === "sinhala") return sinhala;
    return english;
  };

  const lessons = [
    {
      id: "1",
      number: "01",
      title: getLabel(
        "Basic English Words",
        "அடிப்படை ஆங்கில சொற்கள்",
        "මූලික ඉංග්‍රීසි වචන"
      ),
      description: getLabel(
        "Learn common English words through simple examples.",
        "எளிய உதாரணங்கள் மூலம் பொதுவான ஆங்கில சொற்களை கற்றுக்கொள்ளுங்கள்.",
        "සරල උදාහරණ හරහා සාමාන්‍ය ඉංග්‍රීසි වචන ඉගෙන ගන්න."
      ),
      progress: 100,
      status: "completed",
      icon: "📖",
    },
    {
      id: "2",
      number: "02",
      title: getLabel(
        "Everyday Sentences",
        "அன்றாட வாக்கியங்கள்",
        "දෛනික වාක්‍ය"
      ),
      description: getLabel(
        "Practice simple sentences used in everyday communication.",
        "தினசரி தொடர்புகளில் பயன்படுத்தப்படும் எளிய வாக்கியங்களைப் பயிற்சி செய்யுங்கள்.",
        "දෛනික සන්නිවේදනයේ භාවිතා වන සරල වාක්‍ය පුහුණු වන්න."
      ),
      progress: 45,
      status: "current",
      icon: "💬",
    },
    {
      id: "3",
      number: "03",
      title: getLabel(
        "Reading Practice",
        "வாசிப்பு பயிற்சி",
        "කියවීමේ පුහුණුව"
      ),
      description: getLabel(
        "Improve your reading skills with short and simple passages.",
        "குறுகிய மற்றும் எளிய பகுதிகள் மூலம் உங்கள் வாசிப்பு திறனை மேம்படுத்துங்கள்.",
        "කෙටි සහ සරල පාඨ මගින් ඔබේ කියවීමේ හැකියාව වැඩිදියුණු කරගන්න."
      ),
      progress: 0,
      status: "locked",
      icon: "📚",
    },
    {
      id: "4",
      number: "04",
      title: getLabel(
        "Vocabulary Builder",
        "சொற்களஞ்சிய வளர்ப்பு",
        "වචන මාලාව වර්ධනය"
      ),
      description: getLabel(
        "Build your vocabulary with useful new words.",
        "பயனுள்ள புதிய சொற்கள் மூலம் உங்கள் சொற்களஞ்சியத்தை வளர்த்துக் கொள்ளுங்கள்.",
        "ප්‍රයෝජනවත් නව වචන මගින් ඔබේ වචන මාලාව වර්ධනය කරගන්න."
      ),
      progress: 0,
      status: "locked",
      icon: "🧠",
    },
  ];

  const getStatusText = (status: string) => {
    if (status === "completed") {
      return getLabel("Completed", "முடிந்தது", "සම්පූර්ණයි");
    }
    if (status === "current") {
      return getLabel("Continue", "தொடரவும்", "ඉදිරියට යන්න");
    }
    return getLabel("Locked", "பூட்டப்பட்டுள்ளது", "අගුළු දමා ඇත");
  };

  const handleLessonPress = (id: string, status: string) => {
    if (status === "locked") return;
    router.push(`/lessons/${id}`); // Dynamic route වෙත යයි
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            {getLabel("Lessons", "பாடங்கள்", "පාඩම්")}
          </Text>
          <Text style={styles.headerSubtitle}>
            {getLabel("Learn at your own pace", "உங்கள் வேகத்தில் கற்றுக்கொள்ளுங்கள்", "ඔබේම වේගයෙන් ඉගෙන ගන්න")}
          </Text>
        </View>

        <View style={styles.headerIconContainer}>
          <Text style={styles.headerIcon}>📚</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro */}
        <View style={styles.introSection}>
          <Text style={styles.title}>
            {getLabel("Your Learning Lessons", "உங்கள் கற்றல் பாடங்கள்", "ඔබේ ඉගෙනුම් පාඩම්")}
          </Text>
          <Text style={styles.description}>
            {getLabel(
              "Choose a lesson and learn step by step.",
              "ஒரு பாடத்தைத் தேர்ந்தெடுத்து படிப்படியாக கற்றுக்கொள்ளுங்கள்.",
              "පාඩමක් තෝරාගෙන පියවරෙන් පියවර ඉගෙන ගන්න."
            )}
          </Text>
        </View>

        {/* Overall Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View>
              <Text style={styles.progressLabel}>
                {getLabel("Overall Progress", "மொத்த முன்னேற்றம்", "සමස්ත ප්‍රගතිය")}
              </Text>
              <Text style={styles.progressPercentage}>35%</Text>
            </View>
            <View style={styles.progressIconContainer}>
              <Text style={styles.progressIcon}>🎯</Text>
            </View>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.progressText}>
            {getLabel(
              "Keep going! You are making progress.",
              "தொடர்ந்து முயற்சி செய்யுங்கள்! நீங்கள் முன்னேறிக் கொண்டிருக்கிறீர்கள்.",
              "දිගටම කරගෙන යන්න! ඔබ ප්‍රගතියක් ලබා ගනිමින් සිටී."
            )}
          </Text>
        </View>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>
          {getLabel("Available Lessons", "கிடைக்கும் பாடங்கள்", "ලබා ගත හැකි පාඩම්")}
        </Text>

        {/* Lesson Cards */}
        {lessons.map((lesson) => (
          <View
            key={lesson.id}
            style={[
              styles.lessonCard,
              lesson.status === "locked" && styles.lockedLessonCard,
            ]}
          >
            <View style={styles.lessonTop}>
              <View
                style={[
                  styles.lessonIconContainer,
                  lesson.status === "completed" && styles.completedIconContainer,
                  lesson.status === "current" && styles.currentIconContainer,
                  lesson.status === "locked" && styles.lockedIconContainer,
                ]}
              >
                <Text style={styles.lessonIcon}>
                  {lesson.status === "locked" ? "🔒" : lesson.icon}
                </Text>
              </View>

              <View style={styles.lessonNumberContainer}>
                <Text style={styles.lessonNumber}>
                  {getLabel(`Lesson ${lesson.number}`, `பாடம் ${lesson.number}`, `පාඩම ${lesson.number}`)}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    lesson.status === "completed" && styles.completedBadge,
                    lesson.status === "current" && styles.currentBadge,
                    lesson.status === "locked" && styles.lockedBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      lesson.status === "completed" && styles.completedStatusText,
                      lesson.status === "current" && styles.currentStatusText,
                      lesson.status === "locked" && styles.lockedStatusText,
                    ]}
                  >
                    {getStatusText(lesson.status)}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonDescription}>{lesson.description}</Text>

            {lesson.status !== "locked" && (
              <View style={styles.lessonProgressSection}>
                <View style={styles.lessonProgressHeader}>
                  <Text style={styles.lessonProgressLabel}>
                    {getLabel("Progress", "முன்னேற்றம்", "ප්‍රගතිය")}
                  </Text>
                  <Text style={styles.lessonProgressValue}>{lesson.progress}%</Text>
                </View>
                <View style={styles.lessonProgressBackground}>
                  <View
                    style={[
                      styles.lessonProgressFill,
                      { width: `${lesson.progress}%` },
                    ]}
                  />
                </View>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.lessonButton,
                lesson.status === "locked" && styles.lockedLessonButton,
              ]}
              activeOpacity={0.8}
              disabled={lesson.status === "locked"}
              onPress={() => handleLessonPress(lesson.id, lesson.status)}
            >
              <Text
                style={[
                  styles.lessonButtonText,
                  lesson.status === "locked" && styles.lockedLessonButtonText,
                ]}
              >
                {getStatusText(lesson.status)}
              </Text>
              {lesson.status !== "locked" && (
                <Text style={styles.lessonButtonArrow}>→</Text>
              )}
            </TouchableOpacity>
          </View>
        ))}

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
  headerIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: { fontSize: 20 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  introSection: { marginBottom: 20 },
  title: { fontSize: 27, fontWeight: "800", color: "#1F2937", marginBottom: 7 },
  description: { fontSize: 14, lineHeight: 21, color: "#6B7280" },
  progressCard: {
    backgroundColor: "#3157A4",
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },
  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  progressLabel: { fontSize: 13, color: "#DCE6FF", fontWeight: "600", marginBottom: 4 },
  progressPercentage: { fontSize: 28, color: "#FFFFFF", fontWeight: "800" },
  progressIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  progressIcon: { fontSize: 23 },
  progressBarBackground: {
    height: 8,
    borderRadius: 10,
    backgroundColor: "#5C7BC0",
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBarFill: { width: "35%", height: "100%", backgroundColor: "#FFFFFF", borderRadius: 10 },
  progressText: { fontSize: 12, color: "#EAF0FF", lineHeight: 18 },
  sectionTitle: { fontSize: 19, fontWeight: "800", color: "#1F2937", marginBottom: 13 },
  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E7EBF1",
  },
  lockedLessonCard: { opacity: 0.65 },
  lessonTop: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  lessonIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#F3F6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  completedIconContainer: { backgroundColor: "#ECF8F1" },
  currentIconContainer: { backgroundColor: "#EAF0FF" },
  lockedIconContainer: { backgroundColor: "#F3F4F6" },
  lessonIcon: { fontSize: 22 },
  lessonNumberContainer: { flex: 1 },
  lessonNumber: { fontSize: 12, color: "#6B7280", fontWeight: "700", marginBottom: 5 },
  statusBadge: { alignSelf: "flex-start", paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8 },
  completedBadge: { backgroundColor: "#E8F7EE" },
  currentBadge: { backgroundColor: "#EAF0FF" },
  lockedBadge: { backgroundColor: "#F1F2F4" },
  statusText: { fontSize: 10, fontWeight: "800" },
  completedStatusText: { color: "#2D7A4B" },
  currentStatusText: { color: "#3157A4" },
  lockedStatusText: { color: "#6B7280" },
  lessonTitle: { fontSize: 18, fontWeight: "800", color: "#1F2937", marginBottom: 7 },
  lessonDescription: { fontSize: 13, lineHeight: 19, color: "#6B7280", marginBottom: 15 },
  lessonProgressSection: { marginBottom: 15 },
  lessonProgressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },
  lessonProgressLabel: { fontSize: 11, color: "#6B7280", fontWeight: "600" },
  lessonProgressValue: { fontSize: 11, color: "#3157A4", fontWeight: "800" },
  lessonProgressBackground: { height: 6, backgroundColor: "#EEF1F5", borderRadius: 10, overflow: "hidden" },
  lessonProgressFill: { height: "100%", backgroundColor: "#3157A4", borderRadius: 10 },
  lessonButton: {
    backgroundColor: "#3157A4",
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  lockedLessonButton: { backgroundColor: "#F1F2F4" },
  lessonButtonText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  lockedLessonButtonText: { color: "#6B7280" },
  lessonButtonArrow: { color: "#FFFFFF", fontSize: 18, marginLeft: 8 },
  bottomSpace: { height: 30 },
});