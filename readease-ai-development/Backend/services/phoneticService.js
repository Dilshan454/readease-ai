const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generatePhonetic = async (word) => {

    const prompt = `
Provide phonetic assistance for the following word for a learner with dyslexia.

Word:
${word}

Rules:
- Give the IPA pronunciation.
- Break the word into simple syllables.
- Give an easy-to-read pronunciation guide.
- Use simple English.
- Do not give any extra explanation.

Return the result in this exact JSON format:

{
    "word": "the original word",
    "phonetic": "IPA pronunciation",
    "syllables": "syllable breakdown",
    "pronunciation": "easy pronunciation guide"
}
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
    generatePhonetic
};