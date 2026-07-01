const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateQuiz(lessonTitle, lessonContent) {

    const prompt = `
You are an expert computer science professor.

Generate exactly 4 multiple choice questions.

Lesson Title:
${lessonTitle}

Lesson Content:
${lessonContent}

Return ONLY valid JSON.

Format:

[
{
"question":"...",
"option_a":"...",
"option_b":"...",
"option_c":"...",
"option_d":"...",
"correct_option":"A"
}
]
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text;
}

module.exports = {
    generateQuiz
};