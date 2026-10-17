const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = `${API_BASE_URL}/auth/login`;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginScreen() {
  const router = useRouter();

  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login Success Data:", data);
        Alert.alert("Success", "Login Successful!");
        router.push("/home"); 
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "Cannot connect to backend server");
    }
  };

  return (
    <View style={styles.container}>

      {/* Logo */}
      <Text style={styles.logo}>ReadEase</Text>

      {/* Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.title}>
          {t.welcomeBack}
        </Text>

        <Text style={styles.subtitle}>
          {t.continueLearning}
        </Text>
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

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>
          {t.forgotPassword}
        </Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        activeOpacity={0.8}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>
          {t.login}
        </Text>
      </TouchableOpacity>

      {/* Register */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          {t.dontHaveAccount}{" "}
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/register")}
        >
          <Text style={styles.registerLink}>
            {t.register}
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
    paddingTop: 70,
  },

  logo: {
    fontSize: 30,
    fontWeight: "800",
    color: "#3157A4",
    textAlign: "center",
    marginBottom: 45,
  },

  headingContainer: {
    marginBottom: 35,
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
    marginBottom: 22,
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
    paddingVertical: 15,
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
    paddingVertical: 15,
    fontSize: 16,
    color: "#1F2937",
  },

  showText: {
    color: "#3157A4",
    fontSize: 14,
    fontWeight: "700",
  },

  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: 25,
  },

  forgotText: {
    color: "#3157A4",
    fontSize: 14,
    fontWeight: "600",
  },

  loginButton: {
    backgroundColor: "#3157A4",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 25,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  registerText: {
    color: "#6B7280",
    fontSize: 14,
  },

  registerLink: {
    color: "#3157A4",
    fontSize: 14,
    fontWeight: "700",
  },
});