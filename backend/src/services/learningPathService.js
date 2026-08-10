const pool = require("../config/db");
const { detectWeakTopics } = require("./weakTopicService");

/**
 * Builds a short, ordered list of "what to do next" steps for a student:
 *  1. Review steps for topics they're weak on (accuracy < 70%).
 *  2. The next not-yet-completed lessons across their enrolled courses.
 *
 * This intentionally stays simple/rule-based (no separate ML model) since
 * it's derived directly from data the risk/recommendation pipeline already
 * computes - the value here is turning "you're at risk" into concrete,
 * actionable next steps rather than a raw score.
 */
const generateLearningPath = async (studentId, weakTopicsOverride = null) => {

    const weakTopics = weakTopicsOverride || await detectWeakTopics(studentId);

    const reviewSteps = weakTopics.slice(0, 3).map(topic => ({
        type: "review",
        lesson_id: topic.id,
        title: topic.title,
        reason: `Only ${topic.accuracy}% quiz accuracy so far - worth revisiting`
    }));

    const nextLessons = await pool.query(
        `
        SELECT
            l.id,
            l.title,
            c.title AS course_title
        FROM lessons l
        JOIN enrollments e
            ON l.course_id = e.course_id
        JOIN courses c
            ON l.course_id = c.id
        LEFT JOIN student_progress sp
            ON sp.lesson_id = l.id
            AND sp.student_id = e.student_id
            AND sp.completed = TRUE
        WHERE e.student_id = $1
            AND sp.id IS NULL
        ORDER BY l.course_id, l.id
        LIMIT 5
        `,
        [studentId]
    );

    const nextSteps = nextLessons.rows.map(lesson => ({
        type: "next_lesson",
        lesson_id: lesson.id,
        title: lesson.title,
        course: lesson.course_title
    }));

    return {
        review: reviewSteps,
        next: nextSteps
    };

};

module.exports = {
    generateLearningPath
};
