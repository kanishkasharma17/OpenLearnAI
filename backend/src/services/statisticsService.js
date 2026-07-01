const pool =require("../config/db");

const updateStudentStatistics=async(studentId)=>{
    const courses=await pool.query(
        `SELECT COUNT(*)
        FROM enrollments
        WHERE student_id=$1`,
        [studentId]
    );
    const lessons=await pool.query(
        `SELECT COUNT(*)
        FROM student_progress
        WHERE student_id=$1
        AND completed=TRUE`,
        [studentId]
    );
    const attempts=await pool.query(
        `SELECT COUNT(*)
        FROM quiz_attempts
        WHERE student_id=$1`,
        [studentId]
    );
    const average=await pool.query(
        `SELECT 
        COALESCE(AVG(score),0) AS average_score
        FROM quiz_attempts
        WHERE student_id=$1`,
        [studentId]
    );
    // const studyTime=await pool.query(
    //     `select 
    //     COALESCE(SUM(duration_miutes),0)
    //     FROM learning_activity
    //     WHERE student_id=$1`,
    //     [studentId]
    // );

    const totalLessons = await pool.query(
`
    SELECT COUNT(l.id) AS total_lessons
    FROM lessons l
    JOIN enrollments e
    ON l.course_id=e.course_id
    WHERE e.student_id=$1
`,
[studentId]
);
    const coursesEnrolled = Number(courses.rows[0].count);

    const lessonsCompleted = Number(lessons.rows[0].count);

    const quizAttempts = Number(attempts.rows[0].count);

    const averageQuizScore = Number(average.rows[0].average_score);

    const totalLessonCount = Number(totalLessons.rows[0].total_lessons);

    const totalStudyTime = 0;

    const completionRate =
        totalLessonCount === 0
            ? 0
            : (lessonsCompleted / totalLessonCount) * 100;

    
    const engagementScore =
    completionRate * 0.35 +
    averageQuizScore * 0.35 +
    Math.min(quizAttempts * 5, 100) * 0.15 +
    Math.min(totalStudyTime / 10, 100) * 0.15;

    await pool.query(
`
    UPDATE student_statistics
    SET
    courses_enrolled=$1,
    lessons_completed=$2,
    quiz_attempts=$3,
    average_quiz_score=$4,
    total_study_time=$5,
    completion_rate=$6,
    engagement_score=$7,
    updated_at=NOW()
    WHERE student_id=$8
`,
[
    coursesEnrolled,
    lessonsCompleted,
    quizAttempts,
    averageQuizScore,
    totalStudyTime,
    completionRate,
    engagementScore,
    studentId
]
);
    
};
const calculateStatistics=async (studentId)=>{
    await updateStudentStatistics(studentId);
    const result=await pool.query(
        `SELECT *
        FROM student_statistics
        WHERE student_id=$1`,
        [studentId]
    );
    return result.rows[0];
};

module.exports={
    calculateStatistics,
    updateStudentStatistics
};