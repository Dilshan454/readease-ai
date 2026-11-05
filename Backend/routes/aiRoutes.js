const express = require("express");
const protect = require("../middleware/authMiddleware");
const { GoogleGenAI } = require("@google/genai");

const {
    simplifyText,
    generateExercises,
    generateSummary,
    generateConversation
} = require("../controllers/aiController");

const router = express.Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/simplify", protect, simplifyText);
router.post("/generate-exercises", protect, generateExercises);
router.post("/generate-summary", protect, generateSummary);
router.post("/generate-conversation", protect, generateConversation);

// Added AI Support Chat Route
router.post("/chat", protect, async (req, res) => {
  try {
    const { message, language } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: "Message is required" });
    }

    const prompt = `You are ReadEase AI, a supportive and encouraging learning assistant for students with dyslexia.
    Reply to the user's message in ${language || "english"}.
    Keep your explanations short, simple, clear, and very easy to read. Avoid complicated words.
    User question: "${message}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reply = response.text();
    return res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Gemini AI Chat Error:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch response from AI" });
  }
});

module.exports = router;