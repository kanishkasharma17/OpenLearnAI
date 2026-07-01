const pool = require("../config/db");

const enrollCourse = async (req, res,next) => {
    try {
        const studentId = req.user.id;
        const { course_id } = req.body;

        const result = await pool.query(
            `INSERT INTO enrollments
            (student_id, course_id)
            VALUES ($1, $2)
            RETURNING *`,
            [studentId, course_id]
        );

        res.status(201).json({
            message: "Enrollment successful",
            enrollment: result.rows[0]
        });

    } catch (error) {
        

        if (error.code === "23505") {
            return res.status(400).json({
                message: "Already enrolled"
            });
        }

        next(error);
    }
};

const getMyCourses = async (req, res,next) => {
    try {
        const studentId = req.user.id;

        const result = await pool.query(
            `SELECT
                courses.id,
                courses.title,
                courses.description,
                users.name AS teacher
             FROM enrollments
             JOIN courses
                ON enrollments.course_id = courses.id
             JOIN users
                ON courses.teacher_id = users.id
             WHERE enrollments.student_id = $1`,
            [studentId]
        );

        res.json(result.rows);

    } catch (error) {
        next(error);
    }
};

const getCourseStudents = async (req, res,next) => {
    try {
        const courseId = req.params.id;

        const result = await pool.query(
            `SELECT
                users.id,
                users.name,
                users.email
             FROM enrollments
             JOIN users
                ON enrollments.student_id = users.id
             WHERE enrollments.course_id = $1`,
            [courseId]
        );

        res.json(result.rows);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    enrollCourse,
    getMyCourses,
    getCourseStudents
};