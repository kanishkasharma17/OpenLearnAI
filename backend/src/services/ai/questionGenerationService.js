const pool = require("../../config/db");

const {
    generateQuiz
} = require("./geminiService");

async function generateQuestionsForLesson(lessonId) {

    const lesson = await pool.query(
        `
        SELECT *
        FROM lessons
        WHERE id=$1
        `,
        [lessonId]
    );

    if (lesson.rows.length === 0)
        throw new Error("Lesson not found");

    const lessonData = lesson.rows[0];

    const quiz = await pool.query(
        `
        SELECT id
        FROM quizzes
        WHERE lesson_id=$1
        `,
        [lessonId]
    );

    const quizId = quiz.rows[0].id;

    const aiResponse = await generateQuiz(
        lessonData.title,
        lessonData.content
    );

    const cleaned = aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const questions = JSON.parse(cleaned);

    for (const q of questions) {

        await pool.query(
            `
            INSERT INTO questions
            (
                quiz_id,
                question_text,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_option
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7)
            `,
            [
                quizId,
                q.question,
                q.option_a,
                q.option_b,
                q.option_c,
                q.option_d,
                q.correct_option
            ]
        );

    }

    return {
        message: "Questions generated successfully",
        generated: questions.length
    };

}

module.exports = {
    generateQuestionsForLesson
};