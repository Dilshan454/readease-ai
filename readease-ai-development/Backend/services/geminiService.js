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

const generateSummary = async (text) => {
    const prompt = `
Create a short and simple summary of the following text for a person with dyslexia.

Rules:
- Use simple English words.
- Use short sentences.
- Include only the main ideas.
- Keep the original meaning.
- Do not add new information.
- Avoid difficult words when possible.
- Make the summary easy to read and understand.

Text:
${text}
`;

    const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: prompt
    });

    return interaction.output_text;
};

const generateConversation = async (text) => {
    const prompt = `
Create a simple educational conversation based only on the following text.

Rules:
- Create a conversation between a teacher and a learner.
- Use simple English.
- Keep sentences short and clear.
- Make it suitable for a person with dyslexia.
- Use 6 to 8 dialogue lines.
- Cover the main ideas from the text.
- Do not add new information.
- Make the conversation easy to read and understand.

Return the conversation in this format:

Teacher: ...
Learner: ...
Teacher: ...
Learner: ...

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
    simplifyText,
    generateExercises,
    generateSummary,
    generateConversation
};