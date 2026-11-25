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

router.post("/chat", async (req, res) => {
  try {
    const { message, language } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: "Message is required" });
    }

    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are ReadEase AI, a supportive and encouraging learning assistant for students with dyslexia.
Reply to the user's message in ${language || "english"}.
Keep your explanations short, simple, clear, and very easy to read. Avoid complicated words.
User question: "${message}"`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text() || "No response generated";

    return res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Gemini AI Chat Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch response from AI",
    });
  }
});

module.exports = router;