const pool = require("../config/db");

const createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;

        const teacherId = req.user.id;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const result = await pool.query(
            `INSERT INTO courses
            (title, description, teacher_id)
            VALUES ($1,$2,$3)
            RETURNING *`,
            [title, description, teacherId]
        );

        res.status(201).json({
            message: "Course created successfully",
            course: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

const getCourses = async (req, res) => {
    try {

        const result = await pool.query(
            `SELECT
                courses.id,
                courses.title,
                courses.description,
                users.name AS teacher
             FROM courses
             JOIN users
             ON courses.teacher_id = users.id`
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    createCourse,
    getCourses
};