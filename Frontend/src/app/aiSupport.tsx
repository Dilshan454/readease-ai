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

export default function AiSupportScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const scrollViewRef = useRef<ScrollView>(null);

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
      // Connect to your Node.js/Express Backend API
      const baseUrl = process.env.EXPO_PUBLIC_API_URL || "http://172.20.10.9:5000/api";
      
      const response = await fetch(`${baseUrl}/ai/chat`, {
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
        aiResponseText =
          language === "sinhala"
            ? "සමාවෙන්න, නිසි පිළිතුරක් ලබා ගැනීමට නොහැකි විය."
            : language === "tamil"
            ? "மன்னிக்கவும், சரியான பதிலை பெற முடியவில்லை."
            : "Sorry, I couldn't process a response right now.";
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
        text:
          language === "sinhala"
            ? "සර්වර් එක සමඟ සම්බන්ධ වීමේ දෝෂයක් ඇත. කරුණාකර ජාල සබඳතාව පරීක්ෂා කරන්න."
            : language === "tamil"
            ? "சேவையகத்துடன் இணைப்பதில் பிழை ஏற்பட்டது. தயவுசெய்து உங்கள் பிணைய இணைப்பைச் சரிபார்க்கவும்."
            : "Unable to connect to the server. Please check your network connection.",
      };

      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const getLabel = (english: string, tamil: string, sinhala: string) => {
    if (language === "tamil") return tamil;
    if (language === "sinhala") return sinhala;
    return english;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Top Header with Navigation Fallback */}
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
          {getLabel("AI Support", "AI உதவி", "AI සහාය")}
        </Text>
        <View style={{ width: 36 }} />
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

        {/* Loading Indicator for AI Thinking State */}
        {isLoading && (
          <View style={[styles.messageRow, styles.aiRow]}>
            <View style={styles.aiAvatar}>
              <Text style={styles.aiAvatarText}>🤖</Text>
            </View>
            <View style={[styles.messageBubble, styles.aiBubble, styles.loadingBubble]}>
              <ActivityIndicator size="small" color="#4F46E5" />
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
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
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
    fontSize: 26,
    color: "#334155",
    marginTop: -2,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E293B",
    letterSpacing: 0.3,
  },
  chatContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 18,
    alignItems: "flex-start",
  },
  userRow: {
    justifyContent: "flex-end",
  },
  aiRow: {
    justifyContent: "flex-start",
  },
  aiAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 2,
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  aiAvatarText: {
    fontSize: 16,
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  loadingBubble: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  userBubble: {
    backgroundColor: "#4F46E5",
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  aiText: {
    color: "#1E293B",
  },
  inputWrapper: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 25 : 16,
    paddingTop: 10,
    backgroundColor: "#F8FAFC",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1E293B",
    maxHeight: 100,
    paddingTop: 6,
    paddingBottom: 6,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: "#4F46E5",
  },
  sendButtonDisabled: {
    backgroundColor: "#E2E8F0",
  },
  sendIcon: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});