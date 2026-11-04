const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/generate-quiz', async (req, res) => {
  try {
    const { language } = req.body; // 'sinhala', 'tamil', හෝ 'english'

    const prompt = `Generate a vocabulary quiz question in ${language || 'english'} with 3 multiple-choice options and indicate the correct answer index (0, 1, or 2). 
    Return ONLY a valid JSON object in this exact format:
    {
      "question": "The question text here",
      "options": ["Option 1", "Option 2", "Option 3"],
      "correctIndex": 1
    }`;

    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const textResponse = response.text();
    
    const jsonStartIndex = textResponse.indexOf('{');
    const jsonEndIndex = textResponse.lastIndexOf('}') + 1;
    const jsonString = textResponse.substring(jsonStartIndex, jsonEndIndex);
    
    const aiQuiz = JSON.parse(jsonString);

    return res.status(200).json({ success: true, quiz: aiQuiz });
  } catch (error) {
    console.error("Gemini AI Quiz error:", error);
    return res.status(500).json({ success: false, message: "AI generation failed" });
  }
});

module.exports = router;