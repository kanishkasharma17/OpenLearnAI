const pool = require("../config/db");

const {
    updateStudentStatistics
} = require("./statisticsService");

async function submitQuiz(studentId, quizId, answers) {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const questionResult = await client.query(
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
                studentAnswer.selected ===
                question.correct_option;

            if (isCorrect)
                correct++;

            await client.query(
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
                    studentAnswer
                        ? studentAnswer.selected
                        : null,
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

        await client.query(
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

        await updateStudentStatistics(
            studentId,
            client
        );

        await client.query("COMMIT");

        return {

            totalQuestions: total,

            correctAnswers: correct,

            percentage,

            message:
                "Quiz submitted successfully."

        };

    }

    catch (error) {

        await client.query("ROLLBACK");

        throw error;

    }

    finally {

        client.release();

    }

}

module.exports = {
    submitQuiz
};
