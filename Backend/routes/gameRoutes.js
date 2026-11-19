const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


router.post("/generate-quiz", async (req, res) => {
  try {
    const { language } = req.body;
    
    const randomSeed = Math.floor(Math.random() * 100000);

    const prompt = `Generate a unique, random multiple-choice vocabulary or reading comprehension question suitable for a dyslexia-friendly learning app in ${language || "english"}. 
    Ensure the question is completely different and fresh (Random seed ID: ${randomSeed}).
    Provide 3 simple option choices and specify the correct option index (0, 1, or 2).
    Return ONLY valid JSON format without any markdown code blocks or backticks. Example format:
    {
      "question": "Question text here",
      "options": ["Option 1", "Option 2", "Option 3"],
      "correctIndex": 0
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    let rawText = response.text || "";
    
    
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    
    const jsonStartIndex = rawText.indexOf("{");
    const jsonEndIndex = rawText.lastIndexOf("}");
    
    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
      rawText = rawText.substring(jsonStartIndex, jsonEndIndex + 1);
    }

    const quizData = JSON.parse(rawText);

    return res.status(200).json({ success: true, quiz: quizData });
  } catch (error) {
    console.error("Gemini Quiz Generation Error:", error);
    return res.status(500).json({ success: false, error: error.message || "Failed to generate quiz" });
  }
});

module.exports = router;