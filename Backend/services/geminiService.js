const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use a real model name
const MODEL_NAME = "gemini-1.5-flash";

async function generateText(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

const simplifyText = async (text) => {
  const prompt = `
Simplify the following text for a person with dyslexia.

Rules:
- Use simple English words.
- Use short sentences.
- Keep the original meaning.
- Do not add new information.
- Make it easy to read and understand.

Text:
${text}
`;
  return generateText(prompt);
};

const generateExercises = async (text) => {
  const prompt = `
Create 5 simple multiple-choice questions based only on the following text.

Rules:
- Suitable for a learner with dyslexia.
- Use simple English.
- Keep questions short and clear.
- Exactly 4 options for each question.
- Only one correct answer.
- Return ONLY a valid JSON array like this:

[
  {
    "question": "Question here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Correct option here"
  }
]

Text:
${text}
`;

  const output = await generateText(prompt);
  const cleaned = output.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};

const generateSummary = async (text) => {
  const prompt = `
Create a short and simple summary of the following text for a person with dyslexia.
Use simple words and short sentences. Keep only the main ideas.

Text:
${text}
`;
  return generateText(prompt);
};

const generateConversation = async (text) => {
  const prompt = `
Create a simple educational conversation between a Teacher and a Learner based only on the following text.
Use simple English and short sentences. Suitable for someone with dyslexia.

Text:
${text}
`;
  return generateText(prompt);
};

module.exports = {
  simplifyText,
  generateExercises,
  generateSummary,
  generateConversation,
};