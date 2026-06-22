const pool = require("../config/db");

const addQuestion = async (req, res) => {
    try {
        const {
            quiz_id,
            question_text,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option
        } = req.body;

        const result = await pool.query(
            `INSERT INTO questions
            (
                quiz_id,
                question_text,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_option
            )
            VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING *`,
            [
                quiz_id,
                question_text,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_option
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const getQuizQuestions = async (req, res) => {
    try {
        const quizId = req.params.quizId;

        const result = await pool.query(
            `SELECT
                id,
                question_text,
                option_a,
                option_b,
                option_c,
                option_d
             FROM questions
             WHERE quiz_id = $1`,
            [quizId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    addQuestion,
    getQuizQuestions
};