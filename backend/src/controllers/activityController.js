const pool = require("../config/db");

const logActivity = async (req, res) => {
    try {
        const student_id = req.user.id;

        const {
            course_id,
            lesson_id,
            activity_type,
            duration_minutes
        } = req.body;

        const result = await pool.query(
            `INSERT INTO learning_activity
            (student_id, course_id, lesson_id, activity_type, duration_minutes)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [
                student_id,
                course_id,
                lesson_id,
                activity_type,
                duration_minutes
            ]
        );

        res.status(201).json({
            message: "Activity logged successfully",
            activity: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

const getMyActivity = async (req, res, next) => {
    try {

        const student_id = req.user.id;

        const result = await pool.query(
            `SELECT *
             FROM learning_activity
             WHERE student_id = $1
             ORDER BY created_at DESC`,
            [student_id]
        );

        res.json(result.rows);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    logActivity,
    getMyActivity
};