const pool = require("../config/db");

const completeLesson = async (req, res,next) => {
    try {
        const studentId = req.user.id;
        const { lesson_id } = req.body;

        const result = await pool.query(
            `INSERT INTO student_progress
            (student_id, lesson_id, completed, completed_at)
            VALUES ($1,$2,TRUE,NOW())
            ON CONFLICT (student_id, lesson_id)
            DO UPDATE SET
            completed = TRUE,
            completed_at = NOW()
            RETURNING *`,
            [studentId, lesson_id]
        );

        res.status(201).json({
            message: "Lesson completed",
            progress: result.rows[0]
        });

    } catch (error) {
        next(error);
    }
};

const getMyProgress = async (req, res,next) => {
    try {
        const studentId = req.user.id;
        const courseId = req.params.courseId;

        const totalLessons = await pool.query(
            `SELECT COUNT(*) AS total
             FROM lessons
             WHERE course_id = $1`,
            [courseId]
        );

        const completedLessons = await pool.query(
            `SELECT COUNT(*) AS completed
             FROM student_progress sp
             JOIN lessons l
             ON sp.lesson_id = l.id
             WHERE sp.student_id = $1
             AND l.course_id = $2
             AND sp.completed = TRUE`,
            [studentId, courseId]
        );

        const total = parseInt(totalLessons.rows[0].total);
        const completed = parseInt(completedLessons.rows[0].completed);

        const percentage =
            total === 0
                ? 0
                : ((completed / total) * 100).toFixed(2);

        res.json({
            totalLessons: total,
            completedLessons: completed,
            progressPercentage: percentage
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    completeLesson,
    getMyProgress
};