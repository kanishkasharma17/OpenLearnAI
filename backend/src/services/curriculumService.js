const pool = require("../config/db");

const getNextCourse = async (studentId) => {

    // Courses the student has completed
    const completed = await pool.query(
        `
        SELECT DISTINCT l.course_id

        FROM student_progress sp

        JOIN lessons l
        ON sp.lesson_id = l.id

        WHERE sp.student_id = $1
        AND sp.completed = TRUE
        `,
        [studentId]
    );

    const completedCourses =
        completed.rows.map(row => row.course_id);

    // All courses
    const courses = await pool.query(
        `
        SELECT id,title
        FROM courses
        ORDER BY id
        `
    );

    // Check each course
    for (const course of courses.rows) {

        // Skip completed courses
        if (completedCourses.includes(course.id))
            continue;

        const prereq = await pool.query(
            `
            SELECT prerequisite_course_id

            FROM course_prerequisites

            WHERE course_id = $1
            `,
            [course.id]
        );

        const prerequisites =
            prereq.rows.map(row => row.prerequisite_course_id);

        const eligible =
            prerequisites.every(id =>
                completedCourses.includes(id)
            );

        if (eligible)
            return course;
    }

    return null;
};

module.exports = {
    getNextCourse
};