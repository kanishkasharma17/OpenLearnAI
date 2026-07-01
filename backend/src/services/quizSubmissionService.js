const pool = require("../config/db");

const {
    updateStudentStatistics
} = require("./statisticsService");

async function submitQuiz(studentId, quizId, answers) {

    const questionResult = await pool.query(
        `
        SELECT
        id,
        correct_option
        FROM questions
        WHERE quiz_id=$1
        `,
        [quizId]
    );

    const questions = questionResult.rows;

    if (questions.length === 0)
        throw new Error("Quiz has no questions.");

    let correct = 0;

for (const question of questions) {

    const studentAnswer = answers.find(
        a => a.questionId == question.id
    );

    const isCorrect =
        studentAnswer &&
        studentAnswer.selected === question.correct_option;

    if (isCorrect)
        correct++;

    await pool.query(
        `
        INSERT INTO question_attempts
        (
            student_id,
            quiz_id,
            question_id,
            selected_option,
            is_correct
        )
        VALUES
        ($1,$2,$3,$4,$5)
        `,
        [
            studentId,
            quizId,
            question.id,
            studentAnswer ? studentAnswer.selected : null,
            isCorrect
        ]
    );

}

    const total = questions.length;

    const percentage =
        Number(
            (
                correct /
                total *
                100
            ).toFixed(2)
        );

    await pool.query(
        `
        INSERT INTO quiz_attempts
        (
            student_id,
            quiz_id,
            score,
            total_questions,
            correct_answers,
            percentage
        )
        VALUES
        ($1,$2,$3,$4,$5,$6)
        `,
        [
            studentId,
            quizId,
            percentage,
            total,
            correct,
            percentage
        ]
    );

    await updateStudentStatistics(studentId);

    return {

        totalQuestions: total,

        correctAnswers: correct,

        percentage,

        message:
            "Quiz submitted successfully."

    };

}

module.exports = {
    submitQuiz
};