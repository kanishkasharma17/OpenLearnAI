const {
    calculateStatistics
} = require("../services/statisticsService");

const {
    getRecommendation
} = require("../services/recommendationService");

const {
    analyzeRisk
} = require("../services/riskAnalysisService");

const {
    generateLearningPath
} = require("../services/learningPathService");

const getStudentIntelligence = async (req, res,next) => {

    try {

        const statistics = await calculateStatistics(req.user.id);

        const [recommendation, risk, learningPath] = await Promise.all([
            getRecommendation(req.user.id),
            analyzeRisk(req.user.id, statistics),
            generateLearningPath(req.user.id)
        ]);

        res.json({
            statistics,
            recommendation,
            risk,
            learningPath
        });

    } catch (error) {

        next(error);

    }

};



const pool = require("../config/db");

/**
 * Teacher-facing: risk breakdown for every student enrolled in one of
 * the teacher's courses, sorted highest-risk first, so a teacher can
 * see who needs attention without opening each student individually.
 */
const getCourseRiskOverview = async (req, res, next) => {

    try {

        const courseId = req.params.courseId;

        const course = await pool.query(
            `SELECT id, title, teacher_id
             FROM courses
             WHERE id = $1`,
            [courseId]
        );

        if (course.rows.length === 0) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        if (course.rows[0].teacher_id !== req.user.id) {
            return res.status(403).json({
                message: "You can only view risk data for your own courses"
            });
        }

        const students = await pool.query(
            `SELECT users.id, users.name, users.email
             FROM enrollments
             JOIN users
                ON enrollments.student_id = users.id
             WHERE enrollments.course_id = $1`,
            [courseId]
        );

        const overview = await Promise.all(
            students.rows.map(async (student) => {
                const statistics = await calculateStatistics(student.id);
                const risk = await analyzeRisk(student.id, statistics);

                return {
                    student_id: student.id,
                    name: student.name,
                    email: student.email,
                    risk_level: risk.risk_level,
                    risk_score: risk.risk_score,
                    reasons: risk.reasons
                };
            })
        );

        overview.sort((a, b) => b.risk_score - a.risk_score);

        res.json({
            course: course.rows[0].title,
            students: overview
        });

    } catch (error) {
        next(error);
    }

};

/**
 * Teacher-facing: a single overview across every course the teacher
 * teaches - enrolled counts, per-course completion averages, a risk
 * breakdown, and the top at-risk students per course. This is what
 * powers the professor/teacher dashboard landing page.
 */
const getTeacherOverview = async (req, res, next) => {

    try {

        const teacherId = req.user.id;

        const coursesResult = await pool.query(
            `SELECT id, title
             FROM courses
             WHERE teacher_id = $1
             ORDER BY id`,
            [teacherId]
        );

        const courses = [];
        // Cache risk-per-student since risk is computed globally for a
        // student (not scoped to one course) - no point recomputing it
        // if the same student is enrolled in more than one of this
        // teacher's courses.
        const riskCache = new Map();

        for (const course of coursesResult.rows) {

            const studentsResult = await pool.query(
                `SELECT users.id, users.name, users.email
                 FROM enrollments
                 JOIN users
                    ON enrollments.student_id = users.id
                 WHERE enrollments.course_id = $1`,
                [course.id]
            );

            const students = studentsResult.rows;
            const studentIds = students.map(s => s.id);

            const lessonsCountResult = await pool.query(
                `SELECT COUNT(*) AS total
                 FROM lessons
                 WHERE course_id = $1`,
                [course.id]
            );
            const totalLessons = Number(lessonsCountResult.rows[0].total);

            const completionByStudent = {};

            if (studentIds.length > 0) {
                const completionResult = await pool.query(
                    `SELECT sp.student_id, COUNT(*) AS completed
                     FROM student_progress sp
                     JOIN lessons l
                        ON sp.lesson_id = l.id
                     WHERE l.course_id = $1
                       AND sp.completed = TRUE
                       AND sp.student_id = ANY($2::int[])
                     GROUP BY sp.student_id`,
                    [course.id, studentIds]
                );

                completionResult.rows.forEach(row => {
                    completionByStudent[row.student_id] = Number(row.completed);
                });
            }

            const riskCounts = { Low: 0, Medium: 0, High: 0 };
            const studentDetails = [];

            for (const student of students) {

                let risk = riskCache.get(student.id);

                if (!risk) {
                    const statistics = await calculateStatistics(student.id);
                    const analyzed = await analyzeRisk(student.id, statistics);

                    risk = {
                        risk_level: analyzed.risk_level,
                        risk_score: analyzed.risk_score,
                        reasons: analyzed.reasons
                    };

                    riskCache.set(student.id, risk);
                }

                riskCounts[risk.risk_level] = (riskCounts[risk.risk_level] || 0) + 1;

                const completed = completionByStudent[student.id] || 0;
                const completionRate = totalLessons === 0
                    ? 0
                    : Number(((completed / totalLessons) * 100).toFixed(1));

                studentDetails.push({
                    student_id: student.id,
                    name: student.name,
                    risk_level: risk.risk_level,
                    risk_score: risk.risk_score,
                    completion_rate: completionRate
                });

            }

            const avgCompletionRate = studentDetails.length === 0
                ? 0
                : Number(
                    (
                        studentDetails.reduce((sum, s) => sum + s.completion_rate, 0)
                        / studentDetails.length
                    ).toFixed(1)
                );

            studentDetails.sort((a, b) => b.risk_score - a.risk_score);

            courses.push({
                id: course.id,
                title: course.title,
                enrolled_count: students.length,
                total_lessons: totalLessons,
                avg_completion_rate: avgCompletionRate,
                risk_counts: riskCounts,
                top_risk_students: studentDetails.slice(0, 3)
            });

        }

        const totalStudents = riskCache.size;
        const totalAtRisk = Array.from(riskCache.values())
            .filter(r => r.risk_level === "High").length;

        res.json({
            total_courses: courses.length,
            total_students: totalStudents,
            total_at_risk: totalAtRisk,
            courses
        });

    } catch (error) {
        next(error);
    }

};

module.exports = {
    getStudentIntelligence,
    getCourseRiskOverview,
    getTeacherOverview
};