import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import * as DocumentPicker from "expo-document-picker";
import { useLanguage } from "@/context/LanguageContext";

export default function ReadingScreen() {
  const router = useRouter();
  const { language } = useLanguage();

  const [fontSize, setFontSize] = useState(20);
  const [lineSpacing, setLineSpacing] = useState(10);
  const [letterSpacing, setLetterSpacing] = useState(0);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState(0.85);
  const [pastedText, setPastedText] = useState("");
  const [uploadedText, setUploadedText] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  const [summaryText, setSummaryText] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  const getText = () => {
    if (language === "tamil") {
      return "வாசிப்பு என்பது புதிய விஷயங்களை அறிந்து கொள்வதற்கான ஒரு சிறந்த வழியாகும். தினமும் சிறிது நேரம் வாசிப்பதன் மூலம் உங்கள் சொற்களஞ்சியத்தையும் புரிந்துகொள்ளும் திறனையும் மேம்படுத்தலாம்.";
    }

    if (language === "sinhala") {
      return "කියවීම නව දේවල් ඉගෙන ගැනීමට හොඳ ක්‍රමයකි. සෑම දිනකම සුළු වේලාවක් කියවීමෙන් ඔබේ වචන මාලාව සහ අවබෝධතා හැකියාව වැඩිදියුණු කරගත හැකිය.";
    }

    return "Reading is a great way to learn new things. By reading a little every day, you can improve your vocabulary and understanding.";
  };

  const getCurrentReadingText = () => {
    const suppliedText = pastedText.trim() || uploadedText.trim();
    return suppliedText || getText();
  };

  const getSpeechLanguage = () => {
    if (language === "tamil") {
      return "ta-IN";
    }

    if (language === "sinhala") {
      return "si-LK";
    }

    return "en-US";
  };

  const handlePickAndExtractFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/msword",
          "text/plain",
          "image/*",
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled || !result.assets?.length) return;
      const file = result.assets[0];
      const maxBytes = 10 * 1024 * 1024;
      if (file.size && file.size > maxBytes) {
        Alert.alert(
          getLabel("File too large", "கோப்பு மிகப் பெரியது", "ගොනුව විශාල වැඩියි"),
          getLabel("Please choose a file smaller than 10 MB.", "10 MB-ஐ விடச் சிறிய கோப்பைத் தேர்ந்தெடுக்கவும்.", "කරුණාකර 10 MB ට අඩු ගොනුවක් තෝරන්න.")
        );
        return;
      }

      setIsExtracting(true);
      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        name: file.name || "reading-upload",
        type: file.mimeType || "application/octet-stream",
      } as any);

      // For a physical phone, set EXPO_PUBLIC_API_URL to your computer's LAN IP,
      // for example http://192.168.1.10:5000. Android emulator may use 10.0.2.2.
      const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiBaseUrl}/api/text-extraction/extract`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Text extraction failed.");
      const extracted = typeof data.text === "string" ? data.text.trim() : "";
      if (!extracted) {
        Alert.alert(
          getLabel("No text found", "உரை கிடைக்கவில்லை", "පාඨයක් හමු වුණේ නැහැ"),
          getLabel("Try a clearer image or a document that contains selectable text.", "தெளிவான படத்தை அல்லது உரை உள்ள ஆவணத்தை முயற்சிக்கவும்.", "වඩා පැහැදිලි පින්තූරයක් හෝ text තිබෙන ලේඛනයක් උත්සාහ කරන්න.")
        );
        return;
      }
      setUploadedText(extracted);
      setPastedText("");
      setSelectedFileName(file.name || "Uploaded file");
      Alert.alert(
        getLabel("Text ready", "உரை தயார்", "පාඨය සූදානම්"),
        getLabel("The extracted text is ready to read aloud.", "பெறப்பட்ட உரையை இப்போது சத்தமாக வாசிக்கலாம்.", "ලබාගත් පාඨය දැන් ශබ්දයෙන් කියවිය හැකිය.")
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      Alert.alert(
        getLabel("Could not read file", "கோப்பைப் படிக்க முடியவில்லை", "ගොනුව කියවිය නොහැක"),
        `${message}\n\n${getLabel("Check that the backend is running and EXPO_PUBLIC_API_URL is correct.", "Backend இயங்குகிறதா மற்றும் EXPO_PUBLIC_API_URL சரியா என்பதைச் சரிபார்க்கவும்.", "Backend එක ක්‍රියාත්මකද සහ EXPO_PUBLIC_API_URL නිවැරදිද පරීක්ෂා කරන්න.")}`
      );
    } finally {
      setIsExtracting(false);
    }
  };

  const handleGenerateSummary = async () => {
    const textToSummarize = getCurrentReadingText();
    if (!textToSummarize) return;

    try {
      setIsSummarizing(true);
      const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000";
      
      const response = await fetch(`${apiBaseUrl}/api/documents/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textToSummarize }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Summarization failed");

      setSummaryText(data.summary || "");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      Alert.alert(
        getLabel("Summarization Error", "சுருக்கம் தோல்வி", "සාරාංශ කිරීම අසාර්ථකයි"),
        message
      );
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleReadAloud = async () => {
    const text = getCurrentReadingText();

    if (isSpeaking) {
      await Speech.stop();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);

    Speech.speak(text, {
      language: getSpeechLanguage(),
      rate: speechSpeed,
      pitch: 1.0,

      onDone: () => {
        setIsSpeaking(false);
      },

      onStopped: () => {
        setIsSpeaking(false);
      },

      onError: () => {
        setIsSpeaking(false);
      },
    });
  };

  const handleSpeedChange = async (speed: number) => {
    setSpeechSpeed(speed);

    // If speech is currently playing,
    // stop it and restart using the new speed.
    if (isSpeaking) {
      await Speech.stop();
      setIsSpeaking(false);
    }
  };

  const getSpeedLabel = () => {
    if (speechSpeed === 0.6) {
      return getLabel("Slow", "மெதுவாக", "මන්දගාමී");
    }

    if (speechSpeed === 1.1) {
      return getLabel("Fast", "வேகமாக", "වේගවත්");
    }

    return getLabel("Medium", "நடுத்தரம்", "මධ්‍යම");
  };

  const getTitle = () => {
    if (language === "tamil") {
      return "இன்றைய வாசிப்பு";
    }

    if (language === "sinhala") {
      return "අද කියවීම";
    }

    return "Today's Reading";
  };

  const getDescription = () => {
    if (language === "tamil") {
      return "உங்கள் வசதிக்கேற்ப உரையை மாற்றி வாசிக்கலாம்.";
    }

    if (language === "sinhala") {
      return "ඔබේ පහසුව අනුව පෙළ වෙනස් කර කියවන්න.";
    }

    return "Customize the text to make reading more comfortable.";
  };

  const getLabel = (
    english: string,
    tamil: string,
    sinhala: string
  ) => {
    if (language === "tamil") {
      return tamil;
    }

    if (language === "sinhala") {
      return sinhala;
    }

    return english;
  };

  const decreaseFont = () => {
    if (fontSize > 14) {
      setFontSize(fontSize - 2);
    }
  };

  const increaseFont = () => {
    if (fontSize < 30) {
      setFontSize(fontSize + 2);
    }
  };

  const decreaseLineSpacing = () => {
    if (lineSpacing > 4) {
      setLineSpacing(lineSpacing - 2);
    }
  };

  const increaseLineSpacing = () => {
    if (lineSpacing < 18) {
      setLineSpacing(lineSpacing + 2);
    }
  };

  const decreaseLetterSpacing = () => {
    if (letterSpacing > 0) {
      setLetterSpacing(letterSpacing - 0.5);
    }
  };

  const increaseLetterSpacing = () => {
    if (letterSpacing < 4) {
      setLetterSpacing(letterSpacing + 0.5);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            Speech.stop();
            setIsSpeaking(false);
            router.back();
          }}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            {getLabel(
              "Reading",
              "வாசிப்பு",
              "කියවීම"
            )}
          </Text>

          <Text style={styles.headerSubtitle}>
            {getLabel(
              "Reading Support",
              "வாசிப்பு உதவி",
              "කියවීමේ සහාය"
            )}
          </Text>
        </View>

        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro */}

        <View style={styles.introSection}>
          <Text style={styles.title}>
            {getTitle()}
          </Text>

          <Text style={styles.description}>
            {getDescription()}
          </Text>
        </View>

        {/* Upload a document or paste text */}
        <View style={styles.inputCard}>
          <Text style={styles.inputTitle}>
            {getLabel("Upload or paste a paragraph", "ஒரு பத்தியைப் பதிவேற்றவும் அல்லது ஒட்டவும்", "ජේදයක් upload කරන්න හෝ paste කරන්න")}
          </Text>
          <Text style={styles.inputHint}>
            {getLabel("Supports PDF, Word, TXT and images. The app extracts the text before reading.", "PDF, Word, TXT மற்றும் படங்களை ஆதரிக்கிறது.", "PDF, Word, TXT සහ පින්තූර සහාය දක්වයි. කියවීමට පෙර පාඨය ලබාගනී.")}
          </Text>
          <TouchableOpacity
            style={styles.uploadButton}
            activeOpacity={0.8}
            onPress={handlePickAndExtractFile}
            disabled={isExtracting}
          >
            {isExtracting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.uploadButtonText}>📎  {getLabel("Choose a file", "கோப்பைத் தேர்ந்தெடுக்கவும்", "ගොනුවක් තෝරන්න")}</Text>}
          </TouchableOpacity>
          {selectedFileName ? <Text style={styles.fileName}>{selectedFileName}</Text> : null}
          <Text style={styles.orText}>{getLabel("OR paste text below", "அல்லது கீழே உரையை ஒட்டவும்", "නැතිනම් පහතින් text paste කරන්න")}</Text>
          <TextInput
            style={[styles.pasteInput, { fontSize: Math.min(fontSize, 24), lineHeight: Math.min(fontSize, 24) + lineSpacing, letterSpacing }]}
            value={pastedText}
            onChangeText={(value) => {
              setPastedText(value);
              if (value.trim()) {
                setUploadedText("");
                setSelectedFileName("");
              }
            }}
            placeholder={getLabel("Paste your paragraph here...", "உங்கள் பத்தியை இங்கே ஒட்டவும்...", "ඔබගේ ජේදය මෙතැන paste කරන්න...")}
            placeholderTextColor="#8A94A6"
            multiline
            textAlignVertical="top"
            accessibilityLabel={getLabel("Paragraph text input", "பத்தி உரை உள்ளீடு", "ජේද පෙළ ඇතුළත් කිරීම")}
          />
          {(pastedText.trim() || uploadedText.trim()) ? (
            <TouchableOpacity
              style={styles.clearTextButton}
              onPress={() => {
                setPastedText("");
                setUploadedText("");
                setSelectedFileName("");
                setSummaryText("");
                Speech.stop();
                setIsSpeaking(false);
              }}
            >
              <Text style={styles.clearTextButtonText}>{getLabel("Clear uploaded/pasted text", "பதிவேற்றிய/ஒட்டிய உரையை அழிக்கவும்", "upload/paste කළ පාඨය ඉවත් කරන්න")}</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Reading Card */}

        <View style={styles.readingCard}>
          <View style={styles.lessonHeader}>
            <View style={styles.lessonBadge}>
              <Text style={styles.lessonBadgeText}>
                {getLabel(
                  "Lesson 01",
                  "பாடம் 01",
                  "පාඩම 01"
                )}
              </Text>
            </View>

            <Text style={styles.bookIcon}>📖</Text>
          </View>

          <Text
            style={[
              styles.readingText,
              {
                fontSize,
                lineHeight: fontSize + lineSpacing,
                letterSpacing,
              },
            ]}
          >
            {getCurrentReadingText()}
          </Text>

          {/* Read Aloud */}

          <TouchableOpacity
            style={[
              styles.readButton,
              isSpeaking && styles.stopButton,
            ]}
            activeOpacity={0.8}
            onPress={handleReadAloud}
          >
            <Text style={styles.readButtonIcon}>
              {isSpeaking ? "⏹️" : "🔊"}
            </Text>

            <Text style={styles.readButtonText}>
              {isSpeaking
                ? getLabel(
                    "Stop Reading",
                    "வாசிப்பை நிறுத்தவும்",
                    "කියවීම නවත්වන්න"
                  )
                : getLabel(
                    "Read Aloud",
                    "சத்தமாக வாசிக்கவும்",
                    "ශබ්දයෙන් කියවන්න"
                  )}
            </Text>
          </TouchableOpacity>

          {/* Speech Speed */}

          <View style={styles.speedSection}>
            <View style={styles.speedHeader}>
              <Text style={styles.speedTitle}>
                {getLabel(
                  "Reading Speed",
                  "வாசிப்பு வேகம்",
                  "කියවීමේ වේගය"
                )}
              </Text>

              <Text style={styles.speedValue}>
                {getSpeedLabel()}
              </Text>
            </View>

            <View style={styles.speedButtons}>
              <TouchableOpacity
                style={[
                  styles.speedButton,
                  speechSpeed === 0.6 &&
                    styles.selectedSpeedButton,
                ]}
                onPress={() =>
                  handleSpeedChange(0.6)
                }
              >
                <Text
                  style={[
                    styles.speedButtonText,
                    speechSpeed === 0.6 &&
                      styles.selectedSpeedText,
                  ]}
                >
                  🐢{" "}
                  {getLabel(
                    "Slow",
                    "மெது",
                    "මන්දගාමී"
                  )}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.speedButton,
                  speechSpeed === 0.85 &&
                    styles.selectedSpeedButton,
                ]}
                onPress={() =>
                  handleSpeedChange(0.85)
                }
              >
                <Text
                  style={[
                    styles.speedButtonText,
                    speechSpeed === 0.85 &&
                      styles.selectedSpeedText,
                  ]}
                >
                  ▶️{" "}
                  {getLabel(
                    "Medium",
                    "நடுத்தரம்",
                    "මධ්‍යම"
                  )}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.speedButton,
                  speechSpeed === 1.1 &&
                    styles.selectedSpeedButton,
                ]}
                onPress={() =>
                  handleSpeedChange(1.1)
                }
              >
                <Text
                  style={[
                    styles.speedButtonText,
                    speechSpeed === 1.1 &&
                      styles.selectedSpeedText,
                  ]}
                >
                  ⚡{" "}
                  {getLabel(
                    "Fast",
                    "வேகம்",
                    "වේගවත්"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Phonetic Assistance */}

          <TouchableOpacity
            style={styles.phoneticButton}
            activeOpacity={0.8}
          >
            <Text style={styles.phoneticIcon}>
              🗣️
            </Text>

            <Text style={styles.phoneticText}>
              {getLabel(
                "Phonetic Assistance",
                "ஒலிப்பு உதவி",
                "ශබ්ද උච්චාරණ සහාය"
              )}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reading Preferences */}

        <Text style={styles.sectionTitle}>
          {getLabel(
            "Reading Preferences",
            "வாசிப்பு விருப்பங்கள்",
            "කියවීමේ මනාප"
          )}
        </Text>

        {/* Font Size */}

        <View style={styles.controlCard}>
          <View style={styles.controlHeader}>
            <View>
              <Text style={styles.controlTitle}>
                {getLabel(
                  "Font Size",
                  "எழுத்து அளவு",
                  "අකුරු ප්‍රමාණය"
                )}
              </Text>

              <Text style={styles.controlValue}>
                {fontSize}px
              </Text>
            </View>

            <View style={styles.controlButtons}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={decreaseFont}
              >
                <Text style={styles.controlButtonText}>
                  −
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={increaseFont}
              >
                <Text style={styles.controlButtonText}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Line Spacing */}

        <View style={styles.controlCard}>
          <View style={styles.controlHeader}>
            <View>
              <Text style={styles.controlTitle}>
                {getLabel(
                  "Line Spacing",
                  "வரி இடைவெளி",
                  "පේළි අතර ඉඩ"
                )}
              </Text>

              <Text style={styles.controlValue}>
                {lineSpacing}
              </Text>
            </View>

            <View style={styles.controlButtons}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={decreaseLineSpacing}
              >
                <Text style={styles.controlButtonText}>
                  −
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={increaseLineSpacing}
              >
                <Text style={styles.controlButtonText}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Letter Spacing */}

        <View style={styles.controlCard}>
          <View style={styles.controlHeader}>
            <View>
              <Text style={styles.controlTitle}>
                {getLabel(
                  "Letter Spacing",
                  "எழுத்து இடைவெளி",
                  "අකුරු අතර ඉඩ"
                )}
              </Text>

              <Text style={styles.controlValue}>
                {letterSpacing}
              </Text>
            </View>

            <View style={styles.controlButtons}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={decreaseLetterSpacing}
              >
                <Text style={styles.controlButtonText}>
                  −
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={increaseLetterSpacing}
              >
                <Text style={styles.controlButtonText}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Background */}

        <Text style={styles.sectionTitle}>
          {getLabel(
            "Reading Background",
            "வாசிப்பு பின்னணி",
            "කියවීමේ පසුබිම"
          )}
        </Text>

        <View style={styles.backgroundCard}>
          <TouchableOpacity
            style={[
              styles.backgroundOption,
              styles.whiteBackground,
            ]}
          >
            <Text style={styles.backgroundText}>
              Aa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.backgroundOption,
              styles.creamBackground,
            ]}
          >
            <Text style={styles.backgroundText}>
              Aa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.backgroundOption,
              styles.blueBackground,
            ]}
          >
            <Text style={styles.backgroundText}>
              Aa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.backgroundOption,
              styles.greenBackground,
            ]}
          >
            <Text style={styles.backgroundText}>
              Aa
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reading Tip */}

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>
            💡
          </Text>

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              {getLabel(
                "Reading Tip",
                "வாசிப்பு குறிப்பு",
                "කියවීමේ උපදෙස"
              )}
            </Text>

            <Text style={styles.tipText}>
              {getLabel(
                "Choose a font size and spacing that feels comfortable for you.",
                "உங்களுக்கு வசதியாக இருக்கும் எழுத்து அளவு மற்றும் இடைவெளியைத் தேர்ந்தெடுக்கவும்.",
                "ඔබට පහසු අකුරු ප්‍රමාණයක් සහ ඉඩක් තෝරන්න."
              )}
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

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

  backIcon: {
    fontSize: 32,
    color: "#3157A4",
    marginTop: -3,
  },

  headerTitleContainer: {
    flex: 1,
    marginLeft: 14,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
  },

  headerSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  settingsIcon: {
    fontSize: 19,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  introSection: {
    marginBottom: 20,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 7,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
  },

  readingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E7EBF1",
    marginBottom: 28,
  },

  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  lessonBadge: {
    backgroundColor: "#EAF0FF",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },

  lessonBadgeText: {
    color: "#3157A4",
    fontSize: 12,
    fontWeight: "700",
  },

  bookIcon: {
    fontSize: 25,
  },

  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E7EBF1",
    marginBottom: 20,
  },
  inputTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 6,
  },
  inputHint: {
    fontSize: 13,
    lineHeight: 19,
    color: "#6B7280",
    marginBottom: 14,
  },
  uploadButton: {
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: "#3157A4",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  fileName: {
    fontSize: 12,
    color: "#3157A4",
    marginTop: 4,
  },
  orText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginVertical: 12,
  },
  pasteInput: {
    minHeight: 120,
    maxHeight: 260,
    borderWidth: 1,
    borderColor: "#D8DEE9",
    borderRadius: 12,
    padding: 12,
    color: "#1F2937",
    backgroundColor: "#FBFCFE",
  },
  clearTextButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingVertical: 7,
  },
  clearTextButtonText: {
    color: "#B42318",
    fontSize: 13,
    fontWeight: "700",
  },

  readingText: {
    color: "#1F2937",
    fontWeight: "500",
    marginBottom: 22,
  },

  readButton: {
    backgroundColor: "#3157A4",
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  stopButton: {
    backgroundColor: "#B84A4A",
  },

  readButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  readButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  speedSection: {
    marginBottom: 16,
  },

  speedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  speedTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },

  speedValue: {
    fontSize: 12,
    color: "#3157A4",
    fontWeight: "700",
  },

  speedButtons: {
    flexDirection: "row",
    gap: 8,
  },

  speedButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  selectedSpeedButton: {
    backgroundColor: "#EAF0FF",
    borderColor: "#3157A4",
  },

  speedButtonText: {
    color: "#4B5563",
    fontSize: 12,
    fontWeight: "700",
  },

  selectedSpeedText: {
    color: "#3157A4",
  },

  phoneticButton: {
    backgroundColor: "#F0F5FF",
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DCE6FF",
  },

  phoneticIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  phoneticText: {
    color: "#3157A4",
    fontSize: 14,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 13,
  },

  controlCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E7EBF1",
  },

  controlHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  controlTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },

  controlValue: {
    fontSize: 13,
    color: "#6B7280",
  },

  controlButtons: {
    flexDirection: "row",
    gap: 8,
  },

  controlButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EEF3FF",
    alignItems: "center",
    justifyContent: "center",
  },

  controlButtonText: {
    color: "#3157A4",
    fontSize: 25,
    fontWeight: "500",
  },

  backgroundCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E7EBF1",
  },

  backgroundOption: {
    width: 58,
    height: 58,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D5D9E0",
  },

  whiteBackground: {
    backgroundColor: "#FFFFFF",
  },

  creamBackground: {
    backgroundColor: "#FFFBEA",
  },

  blueBackground: {
    backgroundColor: "#EAF4FF",
  },

  greenBackground: {
    backgroundColor: "#ECF8F1",
  },

  backgroundText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
  },

  tipCard: {
    backgroundColor: "#FFF8E7",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  tipIcon: {
    fontSize: 22,
    marginRight: 12,
  },

  tipContent: {
    flex: 1,
  },

  tipTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#5B4A20",
    marginBottom: 5,
  },

  tipText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#766431",
  },

  bottomSpace: {
    height: 30,
  },
});
