import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { API_BASE_URL } from "@/config/api"; // or process.env.EXPO_PUBLIC_API_URL

export default function GameScreen() {
  const [stats, setStats] = useState({
    xp: 120,
    streak: 5,
    level: 2,
    badges: ["First Step", "Reader"],
  });
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header Stats */}
      <View style={styles.statsCard}>
        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statNumber}>{stats.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>⭐</Text>
          <Text style={styles.statNumber}>{stats.xp}</Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statEmoji}>🏆</Text>
          <Text style={styles.statNumber}>Lvl {stats.level}</Text>
          <Text style={styles.statLabel}>Current Level</Text>
        </View>
      </View>

      {/* Daily Challenges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Reading Quizzes</Text>
        
        <TouchableOpacity style={styles.gameCard} activeOpacity={0.8}>
          <Text style={styles.gameTitle}>🎯 Speed Reading Challenge</Text>
          <Text style={styles.gameSub}>Read a short story and answer 3 questions (+50 XP)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gameCard} activeOpacity={0.8}>
          <Text style={styles.gameTitle}>🗣️ Phonetic Pronunciation Game</Text>
          <Text style={styles.gameSub}>Practice tricky words with speech feedback (+30 XP)</Text>
        </TouchableOpacity>
      </View>

      {/* Badges Earned */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Badges & Achievements</Text>
        <View style={styles.badgeRow}>
          {stats.badges.map((badge, index) => (
            <View key={index} style={styles.badgeContainer}>
              <Text style={styles.badgeIcon}>🎖️</Text>
              <Text style={styles.badgeName}>{badge}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC", padding: 20 },
  statsCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#3157A4",
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  statBox: { alignItems: "center" },
  statEmoji: { fontSize: 24, marginBottom: 4 },
  statNumber: { fontSize: 20, fontWeight: "800", color: "#FFFFFF" },
  statLabel: { fontSize: 12, color: "#E0E7FF", marginTop: 2 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: "#1F2937", marginBottom: 15 },
  gameCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  gameTitle: { fontSize: 16, fontWeight: "700", color: "#1F2937", marginBottom: 4 },
  gameSub: { fontSize: 13, color: "#6B7280" },
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
});