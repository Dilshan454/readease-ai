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

module.exports = {
    simplifyText
};