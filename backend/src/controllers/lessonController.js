const pool = require("../config/db");

const createLesson = async (req, res,next) => {
    try {
        const { course_id, title, content } = req.body;

        const result = await pool.query(
            `INSERT INTO lessons(course_id,title,content)
             VALUES($1,$2,$3)
             RETURNING *`,
            [course_id, title, content]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        next(error);
    }
};

const getCourseLessons = async (req, res,next) => {
    try {
        const courseId = req.params.courseId;

        const result = await pool.query(
            `SELECT *
             FROM lessons
             WHERE course_id = $1
             ORDER BY id`,
            [courseId]
        );

        res.json(result.rows);

    } catch (error) {
        next(error);
    }
};

const getLessonById = async (req, res, next) => {
    try {
        const lessonId = req.params.id;
        const studentId = req.user.id;

        const lesson = await pool.query(
            `SELECT
                l.id,
                l.course_id,
                l.title,
                l.content,
                c.title AS course_title,
                sp.completed
             FROM lessons l
             JOIN courses c
                ON l.course_id = c.id
             LEFT JOIN student_progress sp
                ON sp.lesson_id = l.id
                AND sp.student_id = $2
             WHERE l.id = $1`,
            [lessonId, studentId]
        );

        if (lesson.rows.length === 0) {
            return res.status(404).json({
                message: "Lesson not found"
            });
        }

        const quiz = await pool.query(
            `SELECT id, title
             FROM quizzes
             WHERE lesson_id = $1
             LIMIT 1`,
            [lessonId]
        );

        res.json({
            ...lesson.rows[0],
            completed: lesson.rows[0].completed || false,
            quiz: quiz.rows[0] || null
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createLesson,
    getCourseLessons,
    getLessonById
};