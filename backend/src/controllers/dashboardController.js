const pool = require("../config/db");

const getStudentDashboard = async (req, res) => {
    try {
        const studentId = req.user.id;

        const courses = await pool.query(
            `SELECT COUNT(*) AS count
             FROM enrollments
             WHERE student_id = $1`,
            [studentId]
        );

        const lessons = await pool.query(
            `SELECT COUNT(*) AS count
             FROM student_progress
             WHERE student_id = $1
             AND completed = TRUE`,
            [studentId]
        );

        const quizzes = await pool.query(
            `SELECT COUNT(*) AS count
             FROM quiz_attempts
             WHERE student_id = $1`,
            [studentId]
        );

        const avgScore = await pool.query(
            `SELECT COALESCE(AVG(score),0) AS avg
             FROM quiz_attempts
             WHERE student_id = $1`,
            [studentId]
        );

        res.json({
            coursesEnrolled:
                parseInt(courses.rows[0].count),

            lessonsCompleted:
                parseInt(lessons.rows[0].count),

            quizzesAttempted:
                parseInt(quizzes.rows[0].count),

            averageScore:
                Number(avgScore.rows[0].avg).toFixed(2)
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    getStudentDashboard
};