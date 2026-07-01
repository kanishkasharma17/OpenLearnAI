const pool = require("../config/db");

async function detectWeakTopics(studentId) {

    const result = await pool.query(
        `
        SELECT

            l.id,
            l.title,

            COUNT(*) AS total_attempts,

            COUNT(*) FILTER (
                WHERE qa.is_correct = TRUE
            ) AS correct_attempts,

            ROUND(
                (
                    COUNT(*) FILTER (
                        WHERE qa.is_correct = TRUE
                    )::numeric
                    /
                    COUNT(*)
                ) * 100,
                2
            ) AS accuracy

        FROM question_attempts qa

        JOIN questions q
        ON qa.question_id = q.id

        JOIN quizzes qu
        ON q.quiz_id = qu.id

        JOIN lessons l
        ON qu.lesson_id = l.id

        WHERE qa.student_id = $1

        GROUP BY l.id

        HAVING
        COUNT(*) > 0
        AND
        ROUND(
        (
            COUNT(*) FILTER (
            WHERE qa.is_correct = TRUE
            )::numeric
            /
        COUNT(*)
        ) * 100,
        2
        ) < 70

        ORDER BY accuracy ASC

        LIMIT 5
        `,
        [studentId]
    );

    return result.rows;

}

module.exports = {
    detectWeakTopics
};