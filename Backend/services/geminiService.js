const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

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

    const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: prompt
    });

    return interaction.output_text;
};

const generateExercises = async (text) => {
    const prompt = `
Create 5 simple multiple-choice questions based only on the following text.

Rules:
- Questions must be suitable for a learner with dyslexia.
- Use simple English.
- Keep questions short and clear.
- Each question must have exactly 4 options.
- Provide only one correct answer.
- Do not add information that is not in the text.

Return the result as a JSON array using this exact format:

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

    const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: prompt
    });

    const output = interaction.output_text;

    const cleanedOutput = output
        .replace("```json", "")
        .replace("```", "")
        .trim();

    return JSON.parse(cleanedOutput);
};

module.exports = {
    simplifyText,
    generateExercises
};