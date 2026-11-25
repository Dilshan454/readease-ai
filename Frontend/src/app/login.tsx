import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { API_URL } from "@/constants/api";   

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    setErrorMsg("");

    if (!email.trim || !password) {
      setErrorMsg("Please enter email and password");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setErrorMsg("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.token) {
        await AsyncStorage.setItem("authToken", data.token);
        await AsyncStorage.setItem("userEmail", email.trim().toLowerCase());
        if (data.user?.name) {
          await AsyncStorage.setItem("userName", data.user.name);
        }
        router.replace("/home");
      } else {
        setErrorMsg(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.log("Login Error:", error);
      setErrorMsg("Cannot connect to backend server. Is backend running?");
    } finally {
      setLoading(false);
    }
  };



  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo */}
        <Text style={styles.logo}>ReadEase</Text>

        {/* Title */}
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Continue your learning journey</Text>

        {/* Error box - only shows if errorMsg is not empty */}
        {errorMsg !== "" && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        )}

        {/* Email input */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none" 
          autoCorrect={false}
          editable={!loading}
        />

        {/* Password input */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} 
            editable={!loading}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showText}>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot password */}
        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Go to Register */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>

        {/* Demo button */}
        {/*<TouchableOpacity
          style={styles.demoButton}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.demoText}>Continue as Guest (Demo)</Text>
        </TouchableOpacity>*/}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F7F9FC", 
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 30,
  },
  logo: {
    fontSize: 30,
    fontWeight: "800",
    color: "#3157A4", 
    textAlign: "center",
    marginBottom: 35,
  },
  title: { fontSize: 30, fontWeight: "800", color: "#1F2937", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#6B7280", marginBottom: 25 },
  errorBox: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: { color: "#B91C1C", fontSize: 14, fontWeight: "600" },
  label: { fontSize: 15, fontWeight: "700", color: "#374151", marginBottom: 8, marginTop: 8 },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 10,
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
    marginBottom: 10,
  },
  passwordInput: { flex: 1, paddingVertical: 15, fontSize: 16, color: "#1F2937" },
  showText: { color: "#3157A4", fontSize: 14, fontWeight: "700" },
  forgotText: {
    color: "#3157A4",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
    marginBottom: 25,
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: "#3157A4",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  registerContainer: { flexDirection: "row", justifyContent: "center" },
  registerText: { color: "#6B7280", fontSize: 14 },
  registerLink: { color: "#3157A4", fontSize: 14, fontWeight: "700" },
  demoButton: {
    marginTop: 28,
    borderWidth: 1,
    borderColor: "#3157A4",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  demoText: { color: "#3157A4", fontWeight: "700", fontSize: 14 },
});