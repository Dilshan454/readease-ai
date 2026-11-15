
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguage } from "@/context/LanguageContext";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000/api";

interface ProgressSummary {
  totalRecords: number;
  completedLessons: number;
  completionRate: number;
  totalExercisesAttempted: number;
  totalExercisesCompleted: number;
  averageScore: number;
}

interface ProgressRecord {
  _id: string;
  lesson: {
    title: string;
  } | null;
  exercisesCompleted: number;
  exercisesAttempted: number;
  score: number;
  completed: boolean;
  createdAt: string;
}

const emptySummary: ProgressSummary = {
  totalRecords: 0,
  completedLessons: 0,
  completionRate: 0,
  totalExercisesAttempted: 0,
  totalExercisesCompleted: 0,
  averageScore: 0,
};

export default function ProgressScreen() {
  const router = useRouter();
  const { language } = useLanguage();

  const [summary, setSummary] =
    useState<ProgressSummary>(emptySummary);

  const [history, setHistory] = useState<ProgressRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getLabel = (
    english: string,
    tamil: string,
    sinhala: string
  ) => {
    if (language === "tamil") return tamil;
    if (language === "sinhala") return sinhala;
    return english;
  };

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        setError("Please login to view your progress.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [summaryResponse, historyResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/progress/summary`, { headers }),
        fetch(`${API_BASE_URL}/progress`, { headers }),
      ]);

      if (!summaryResponse.ok || !historyResponse.ok) {
        if (
          summaryResponse.status === 401 ||
          historyResponse.status === 401
        ) {
          throw new Error("Session expired. Please login again.");
        }

        throw new Error("Unable to retrieve progress data.");
      }

      const summaryData = await summaryResponse.json();
      const historyData = await historyResponse.json();

      setSummary({
        ...emptySummary,
        ...summaryData.summary,
      });

      setHistory(historyData.progress || []);
    } catch (err) {
      console.error("Progress fetch error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const renderStat = (
    emoji: string,
    value: string | number,
    label: string
  ) => (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
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

        <TouchableOpacity
          onPress={fetchProgress}
          style={styles.refreshButton}
        >
          <Text style={styles.refreshText}>↻</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#3157A4" />
          <Text style={styles.messageText}>
            Loading your progress...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchProgress}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.overviewCard}>
            <Text style={styles.overviewTitle}>
              {getLabel(
                "Overall Completion",
                "மொத்த நிறைவு",
                "සමස්ත සම්පූර්ණත්වය"
              )}
            </Text>

            <Text style={styles.overviewPercentage}>
              {summary.completionRate}%
            </Text>

            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${Math.min(
                      100,
                      Math.max(0, summary.completionRate)
                    )}%`,
                  },
                ]}
              />
            </View>

            <Text style={styles.overviewFooter}>
              {summary.completedLessons} completed out of{" "}
              {summary.totalRecords} progress records
            </Text>
          </View>

          <Text style={styles.sectionTitle}>
            {getLabel(
              "Key Statistics",
              "முக்கிய புள்ளிவிவரங்கள்",
              "ප්‍රධාන සංඛ්‍යාලේඛන"
            )}
          </Text>

          <View style={styles.statsGrid}>
            {renderStat(
              "📚",
              summary.completedLessons,
              "Completed Lessons"
            )}

            {renderStat(
              "🎯",
              `${summary.averageScore}%`,
              "Average Score"
            )}

            {renderStat(
              "✏️",
              summary.totalExercisesCompleted,
              "Exercises Completed"
            )}

            {renderStat(
              "📝",
              summary.totalExercisesAttempted,
              "Exercises Attempted"
            )}
          </View>

          <Text style={styles.sectionTitle}>
            {getLabel(
              "Recent Activity",
              "சமீபத்திய செயல்பாடு",
              "මෑතකාලීන ක්‍රියාකාරකම්"
            )}
          </Text>

          <View style={styles.activityCard}>
            {history.length === 0 ? (
              <Text style={styles.emptyText}>
                No progress records yet. Start a lesson to track your
                learning progress!
              </Text>
            ) : (
              history.map((record) => (
                <View key={record._id} style={styles.historyItem}>
                  <View style={styles.historyInfo}>
                    <Text style={styles.lessonTitle}>
                      {record.lesson?.title || "Learning Activity"}
                    </Text>

                    <Text style={styles.historyDate}>
                      {formatDate(record.createdAt)}
                    </Text>

                    <Text style={styles.historyDetails}>
                      {record.exercisesCompleted}/
                      {record.exercisesAttempted} exercises completed
                    </Text>
                  </View>

                  <View style={styles.historyRight}>
                    <Text style={styles.historyScore}>
                      {record.score}%
                    </Text>

                    <Text
                      style={[
                        styles.statusText,
                        {
                          color: record.completed
                            ? "#16A34A"
                            : "#D97706",
                        },
                      ]}
                    >
                      {record.completed ? "Completed" : "In Progress"}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </>
      )}

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
    fontSize: 30,
    color: "#334155",
    marginTop: -3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F2937",
  },
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  refreshText: {
    fontSize: 25,
    color: "#3157A4",
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
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E8ECF2",
  },
  historyInfo: {
    flex: 1,
    paddingRight: 10,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 5,
  },
  historyDate: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  historyDetails: {
    fontSize: 12,
    color: "#6B7280",
  },
  historyRight: {
    alignItems: "flex-end",
  },
  historyScore: {
    fontSize: 18,
    fontWeight: "800",
    color: "#3157A4",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  centerContainer: {
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginTop: 20,
  },
  messageText: {
    marginTop: 12,
    color: "#6B7280",
  },
  errorText: {
    color: "#DC2626",
    textAlign: "center",
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: "#3157A4",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  emptyText: {
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  bottomSpace: {
    height: 20,
  },
});