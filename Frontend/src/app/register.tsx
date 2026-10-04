import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";

export default function RegisterScreen() {
  const router = useRouter();

  const { t } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (
    <View style={styles.container}>

      {/* Logo */}
      <Text style={styles.logo}>ReadEase</Text>

      {/* Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.title}>
          {t.createAccount}
        </Text>

        <Text style={styles.subtitle}>
          {t.continueLearning}
        </Text>
      </View>

      {/* Full Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          {t.fullName}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={t.enterFullName}
          placeholderTextColor="#9CA3AF"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          {t.email}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={t.enterEmail}
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          {t.password}
        </Text>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder={t.enterPassword}
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity
            onPress={() =>
              setShowPassword(!showPassword)
            }
          >
            <Text style={styles.showText}>
              {showPassword ? t.hide : t.show}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          {t.confirmPassword}
        </Text>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder={t.confirmYourPassword}
            placeholderTextColor="#9CA3AF"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />

          <TouchableOpacity
            onPress={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            <Text style={styles.showText}>
              {showConfirmPassword
                ? t.hide
                : t.show}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.registerButton}
        activeOpacity={0.8}
      >
        <Text style={styles.registerButtonText}>
          {t.createAccount}
        </Text>
      </TouchableOpacity>

      {/* Login */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>
          {t.alreadyHaveAccount}{" "}
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginLink}>
            {t.login}
          </Text>
        </TouchableOpacity>
      </View>

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

  logo: {
    fontSize: 30,
    fontWeight: "800",
    color: "#3157A4",
    textAlign: "center",
    marginBottom: 35,
  },

  headingContainer: {
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
  },

  inputContainer: {
    marginBottom: 16,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1F2937",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 14,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1F2937",
  },

  showText: {
    color: "#3157A4",
    fontSize: 14,
    fontWeight: "700",
  },

  registerButton: {
    backgroundColor: "#3157A4",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 25,
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    color: "#6B7280",
    fontSize: 14,
  },

  loginLink: {
    color: "#3157A4",
    fontSize: 14,
    fontWeight: "700",
  },
});