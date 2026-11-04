import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";

export default function LessonDetailScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const { id } = useLocalSearchParams();

  const getLabel = (english: string, tamil: string, sinhala: string) => {
    if (language === "tamil") return tamil;
    if (language === "sinhala") return sinhala;
    return english;
  };

  const getLessonInfo = () => {
    switch (id) {
      case "1":
        return {
          title: getLabel("Basic English Words", "அடிப்படை ஆங்கில சொற்கள்", "මූලික ඉංග්‍රීසි වචන"),
          desc: getLabel(
            "Learn common English words through simple everyday examples and clear audio pronunciation.",
            "எளிய அன்றாட உதாரணங்கள் மற்றும் தெளிவான உச்சரிப்புடன் பொதுவான ஆங்கில சொற்களைக் கற்றுக்கொள்ளுங்கள்.",
            "සරල දෛනික උදාහරණ සහ පැහැදිලි උච්චාරණය හරහා සාමාන්‍ය ඉංග්‍රීසි වචන ඉගෙන ගන්න."
          ),
          icon: "📖",
        };
      case "2":
        return {
          title: getLabel("Everyday Sentences", "அன்றாட வாக்கியங்கள்", "දෛනික වාක්‍ය"),
          desc: getLabel(
            "Practice simple sentences used in everyday communication to boost confidence.",
            "நம்பிக்கையை வளர்க்க அன்றாடத் தொடர்பாடலில் பயன்படுத்தப்படும் எளிய வாக்கியங்களைப் பயிற்சி செய்யுங்கள்.",
            "විශ්වාසය වර්ධනය කර ගැනීමට දෛනික සන්නිවේදනයේ භාවිතා වන සරල වාක්‍ය පුහුණු වන්න."
          ),
          icon: "💬",
        };
      default:
        return {
          title: getLabel("Reading Lesson", "வாசிப்பு பாடம்", "කියවීමේ පාඩම"),
          desc: getLabel("Interactive reading practice session.", "ஊடாடும் வாசிப்பு பயிற்சி அமர்வு.", "අන්තර්ක්‍රියාකාරී කියවීමේ පුහුණු සැසියක්."),
          icon: "📚",
        };
    }
  };

  const lesson = getLessonInfo();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getLabel("Lesson Details", "பாட விவரங்கள்", "පාඩමේ විස්තර")}</Text>
        <View style={{ width: 42 }} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardIcon}>{lesson.icon}</Text>
        <Text style={styles.cardTitle}>{lesson.title}</Text>
        <Text style={styles.cardDesc}>{lesson.desc}</Text>
      </View>

      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => router.push("/reading")}
      >
        <Text style={styles.actionBtnText}>
          {getLabel("Start Practice", "பயிற்சியைத் தொடங்குக", "පුහුණුව ආරම්භ කරන්න")}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC" },
  content: { padding: 20, paddingTop: 55 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 25 },
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
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#1F2937" },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E7EBF1",
    marginBottom: 20,
  },
  cardIcon: { fontSize: 45, marginBottom: 15 },
  cardTitle: { fontSize: 22, fontWeight: "800", color: "#1F2937", marginBottom: 10, textAlign: "center" },
  cardDesc: { fontSize: 14, color: "#6B7280", textAlign: "center", lineHeight: 22 },
  actionBtn: {
    backgroundColor: "#3157A4",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  actionBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
});