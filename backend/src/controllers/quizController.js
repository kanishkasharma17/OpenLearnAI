const pool = require("../config/db");

const createQuiz = async (req, res,next) => {
    try {
        const { course_id, title } = req.body;

        const result = await pool.query(
            `INSERT INTO quizzes(course_id,title)
             VALUES($1,$2)
             RETURNING *`,
            [course_id, title]
        );

        res.status(201).json(result.rows[0]);

    } 
    catch (error) {
       next(error);
    }
};

const getCourseQuizzes = async (req, res,next) => {
    try {
        const courseId = req.params.courseId;

        const result = await pool.query(
            `SELECT * FROM quizzes
             WHERE course_id=$1`,
            [courseId]
        );

        res.json(result.rows);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createQuiz,
    getCourseQuizzes
};