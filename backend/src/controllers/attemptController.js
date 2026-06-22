const pool = require("../config/db");

const submitQuiz = async (req, res) => {
    try {
        const studentId = req.user.id;

        const { quiz_id, answers } = req.body;

        const questions = await pool.query(
            `SELECT id, correct_option
             FROM questions
             WHERE quiz_id = $1`,
            [quiz_id]
        );

        let score = 0;

        for (const q of questions.rows) {
            if (answers[q.id] === q.correct_option) {
                score++;
            }
        }

        const result = await pool.query(
            `INSERT INTO quiz_attempts
            (student_id, quiz_id, score)
            VALUES ($1,$2,$3)
            RETURNING *`,
            [studentId, quiz_id, score]
        );

        res.status(201).json({
            message: "Quiz submitted",
            score,
            attempt: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    submitQuiz
};