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
const getLeaderboard = async (req, res) => {
    try {

        const result = await pool.query(
            `SELECT
                u.id AS student_id,
                u.name,
                ROUND(AVG(qa.score),2) AS average_score
             FROM users u
             JOIN quiz_attempts qa
             ON u.id = qa.student_id
             GROUP BY u.id, u.name
             ORDER BY average_score DESC`
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
const getCourseAnalytics = async (req, res) => {
    try {
        const courseId = req.params.courseId;

        const enrollments = await pool.query(
            `SELECT COUNT(*) AS count
             FROM enrollments
             WHERE course_id = $1`,
            [courseId]
        );

        const lessons = await pool.query(
            `SELECT COUNT(*) AS count
             FROM lessons
             WHERE course_id = $1`,
            [courseId]
        );

        const quizzes = await pool.query(
            `SELECT COUNT(*) AS count
             FROM quizzes
             WHERE course_id = $1`,
            [courseId]
        );

        const avgScore = await pool.query(
            `SELECT COALESCE(AVG(qa.score),0) AS avg
             FROM quiz_attempts qa
             JOIN quizzes q
             ON qa.quiz_id = q.id
             WHERE q.course_id = $1`,
            [courseId]
        );

        res.json({
            courseId: Number(courseId),
            enrollments: parseInt(enrollments.rows[0].count),
            lessons: parseInt(lessons.rows[0].count),
            quizzes: parseInt(quizzes.rows[0].count),
            averageScore: Number(avgScore.rows[0].avg).toFixed(2)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};
const getTopStudents = async (req, res) => {
    
    try {
        const courseId = req.params.courseId;
        console.log(courseId);
        const result = await pool.query(
            `SELECT
                u.id AS student_id,
                u.name,
                ROUND(AVG(qa.score),2) AS average_score
             FROM users u
             JOIN quiz_attempts qa
                 ON u.id = qa.student_id
             JOIN quizzes q
                 ON qa.quiz_id = q.id
             WHERE q.course_id = $1
             GROUP BY u.id, u.name
             ORDER BY average_score DESC
             LIMIT 5`,
            [courseId]
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
    getStudentDashboard,
    getLeaderboard,
    getCourseAnalytics,
    getTopStudents
};