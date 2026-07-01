const pool = require("../config/db");

const getCourseStates = async (studentId) => {

    const result = await pool.query(
        `
        SELECT

            c.id,
            c.title,

            COUNT(l.id) AS total_lessons,

            COUNT(sp.lesson_id)
            FILTER(
                WHERE sp.completed = TRUE
            ) AS completed_lessons

        FROM courses c

        LEFT JOIN lessons l
        ON c.id = l.course_id

        LEFT JOIN student_progress sp
        ON l.id = sp.lesson_id
        AND sp.student_id = $1

        GROUP BY c.id

        ORDER BY c.id
        `,
        [studentId]
    );

    console.log(result.rows);

    return result.rows.map(course => {

        let state = "LOCKED";

        if (Number(course.completed_lessons) === 0)
            state = "LOCKED";

        if (
            Number(course.completed_lessons) > 0 &&
            Number(course.completed_lessons) <
            Number(course.total_lessons)
        )
            state = "ENROLLED";

        if (
            Number(course.completed_lessons) ===
            Number(course.total_lessons) &&
            Number(course.total_lessons) > 0
        )
            state = "COMPLETED";

        return {

            id: course.id,

            title: course.title,

            totalLessons:
                Number(course.total_lessons),

            completedLessons:
                Number(course.completed_lessons),

            state

        };

    });

};

module.exports = {
    getCourseStates
};