const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// POST /api/games/generate-quiz
router.post("/generate-quiz", async (req, res) => {
  try {
    const { language } = req.body;

    const prompt = `Generate a unique multiple-choice vocabulary/reading question suitable for a learning app in ${language || "english"}.
    Provide 3 option choices and specify the correct option index (0, 1, or 2).
    Return strictly JSON format without any markdown wrapper:
    {
      "question": "Question text",
      "options": ["Option 1", "Option 2", "Option 3"],
      "correctIndex": 0
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let rawText = response.text();
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    const quizData = JSON.parse(rawText);

    return res.status(200).json({ success: true, quiz: quizData });
  } catch (error) {
    console.error("Gemini Quiz Generation Error:", error);
    return res.status(500).json({ success: false, error: "Failed to generate quiz" });
  }
});

module.exports = router;