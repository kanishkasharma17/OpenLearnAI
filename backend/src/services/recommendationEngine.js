const pool = require("../config/db");

const filterRecommendations = async (studentId, recommendations) => {

    const enrolled = await pool.query(
        `
        SELECT c.title
        FROM enrollments e
        JOIN courses c
        ON e.course_id=c.id
        WHERE e.student_id=$1
        `,
        [studentId]
    );

    const enrolledCourses =
        enrolled.rows.map(course => course.title);

    const filtered =
        recommendations.filter(course =>
            !enrolledCourses.includes(course.course)
        );

    return filtered;

};

module.exports = {
    filterRecommendations
};