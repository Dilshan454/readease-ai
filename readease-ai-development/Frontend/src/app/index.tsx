import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>ReadEase</Text>

          <Text style={styles.logoSubtitle}>
            Learn. Read. Grow.
          </Text>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>
            Welcome to ReadEase 👋
          </Text>

          <Text style={styles.description}>
            A personalized learning experience designed
            to make reading and learning easier.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📖</Text>

            <Text style={styles.featureTitle}>
              Easier Reading
            </Text>

            <Text style={styles.featureText}>
              Customize text to make reading comfortable.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🤖</Text>

            <Text style={styles.featureTitle}>
              AI Support
            </Text>

            <Text style={styles.featureText}>
              Get personalized help while learning.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🎮</Text>

            <Text style={styles.featureTitle}>
              Fun Learning
            </Text>

            <Text style={styles.featureText}>
              Learn through interactive activities.
            </Text>
          </View>
        </View>

        {/* Get Started */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/language")}
        >
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </TouchableOpacity>

        <Text style={styles.bottomText}>
          Personalized learning for everyone
        </Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 35,
    justifyContent: "space-between",
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  logo: {
    fontSize: 36,
    fontWeight: "800",
    color: "#3157A4",
  },

  logoSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  welcomeSection: {
    alignItems: "center",
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 14,
  },

  description: {
    fontSize: 16,
    lineHeight: 25,
    color: "#6B7280",
    textAlign: "center",
  },

  featuresContainer: {
    gap: 12,
  },

  featureCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  featureIcon: {
    fontSize: 28,
    marginRight: 14,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 3,
  },

  featureText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: "#6B7280",
  },

  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#3157A4",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  bottomText: {
    textAlign: "center",
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 12,
  },
});