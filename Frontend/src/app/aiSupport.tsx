import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";
import { API_BASE_URL } from "@/constants/api";

export default function AiSupportScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  
  // Explicitly defined ref type to avoid TS errors
  const scrollViewRef = useRef<ScrollView | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");

  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "ai",
      text:
        language === "tamil"
          ? "வணக்கம்! நான் உங்கள் AI உதவியாளன். இன்றைக்கு என்ன படிக்க உதவ வேண்டும்?"
          : language === "sinhala"
          ? "ආයුබෝවන්! මම ඔබේ AI සහායකයා. අද ඔබට මොනවාද කියවන්න උදව් ඕනේ?"
          : "Hello! I am your AI assistant. How can I help with your reading today?",
    },
  ]);

  const getLabel = (english: string, tamil: string, sinhala: string) => {
    if (language === "tamil") return tamil;
    if (language === "sinhala") return sinhala;
    return english;
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userText = inputText.trim();
    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          language: language,
        }),
      });

      const data = await response.json();

      let aiResponseText = "";
      if (data && data.reply) {
        aiResponseText = data.reply;
      } else {
        aiResponseText = getLabel(
          "Sorry, I couldn't process a response right now.",
          "மன்னிக்கவும், சரியான பதிலை பெற முடியவில்லை.",
          "සමාවෙන්න, නිසි පිළිතුරක් ලබා ගැනීමට නොහැකි විය."
        );
      }

      const aiReply = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiResponseText,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      console.error("Real AI Chat Fetch Error:", error);

      const errorReply = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: getLabel(
          "Unable to connect to the server. Please check your network connection.",
          "சேவையகத்துடன் இணைப்பதில் பிழை ஏற்பட்டது. தயவுசெய்து உங்கள் பிணைய இணைப்பைச் சரிபார்க்கவும்.",
          "සර්වර් එක සමඟ සම්බන්ධ වීමේ දෝෂයක් ඇත. කරුණාකර ජාල සබඳතාව පරීක්ෂා කරන්න."
        ),
      };

      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Consistent Header across screens */}
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
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            {getLabel("AI Support Assistant", "AI உதவி", "AI සහායකයා")}
          </Text>
          <Text style={styles.headerSubtitle}>
            {getLabel("Ask reading questions & simplify text", "கேள்விகளைக் கேளுங்கள்", "කියවීම සහ තේරුම් ගැනීමට උදව් අසන්න")}
          </Text>
        </View>
        <View style={styles.aiIconBadge}>
          <Text style={{ fontSize: 18 }}>🤖</Text>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              msg.sender === "user" ? styles.userRow : styles.aiRow,
            ]}
          >
            {msg.sender === "ai" && (
              <View style={styles.aiAvatar}>
                <Text style={styles.aiAvatarText}>🤖</Text>
              </View>
            )}

            <View
              style={[
                styles.messageBubble,
                msg.sender === "user" ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.sender === "user" ? styles.userText : styles.aiText,
                ]}
              >
                {msg.text}
              </Text>
            </View>
          </View>
        ))}

        {/* Loading State */}
        {isLoading && (
          <View style={[styles.messageRow, styles.aiRow]}>
            <View style={styles.aiAvatar}>
              <Text style={styles.aiAvatarText}>🤖</Text>
            </View>
            <View style={[styles.messageBubble, styles.aiBubble, styles.loadingBubble]}>
              <ActivityIndicator size="small" color="#3157A4" />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={getLabel(
              "Ask AI assistant...",
              "AI உதவியாளரிடம் கேட்கவும்...",
              "AI සහායකයාගෙන් විමසන්න..."
            )}
            placeholderTextColor="#9CA3AF"
            value={inputText}
            onChangeText={setInputText}
            editable={!isLoading}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim() && !isLoading
                ? styles.sendButtonActive
                : styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            <Text style={styles.sendIcon}>➔</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
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
  backButtonText: { fontSize: 32, color: "#3157A4", marginTop: -3 },
  headerTitleContainer: { flex: 1, marginLeft: 14 },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#1F2937" },
  headerSubtitle: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  aiIconBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  chatContainer: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 },
  messageRow: { flexDirection: "row", marginBottom: 16, alignItems: "flex-start" },
  userRow: { justifyContent: "flex-end" },
  aiRow: { justifyContent: "flex-start" },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#D0DDFB",
  },
  aiAvatarText: { fontSize: 18 },
  messageBubble: { maxWidth: "80%", paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16 },
  loadingBubble: { paddingVertical: 12, paddingHorizontal: 18 },
  userBubble: { backgroundColor: "#3157A4", borderBottomRightRadius: 4 },
  aiBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  messageText: { fontSize: 15, lineHeight: 22 },
  userText: { color: "#FFFFFF", fontWeight: "600" },
  aiText: { color: "#1F2937", fontWeight: "500" },
  inputWrapper: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 25 : 16,
    paddingTop: 10,
    backgroundColor: "#F7F9FC",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  input: { flex: 1, fontSize: 15, color: "#1F2937", maxHeight: 100, paddingTop: 8, paddingBottom: 8 },
  sendButton: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center", marginLeft: 8 },
  sendButtonActive: { backgroundColor: "#3157A4" },
  sendButtonDisabled: { backgroundColor: "#E5E7EB" },
  sendIcon: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
});