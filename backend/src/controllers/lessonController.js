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

module.exports = {
    createLesson,
    getCourseLessons
};