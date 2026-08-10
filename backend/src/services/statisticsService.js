const pool =require("../config/db");

const updateStudentStatistics=async(studentId,client=pool)=>{
    await client.query(
`
INSERT INTO student_statistics(student_id)
VALUES($1)
ON CONFLICT(student_id)
DO NOTHING
`,
[studentId]
);

    const courses=await client.query(
        `SELECT COUNT(*)
        FROM enrollments
        WHERE student_id=$1`,
        [studentId]
    );
    const lessons=await client.query(
        `SELECT COUNT(*)
        FROM student_progress
        WHERE student_id=$1
        AND completed=TRUE`,
        [studentId]
    );
    const attempts=await client.query(
        `SELECT COUNT(*)
        FROM quiz_attempts
        WHERE student_id=$1`,
        [studentId]
    );
    const average=await client.query(
        `SELECT 
        COALESCE(AVG(score),0) AS average_score
        FROM quiz_attempts
        WHERE student_id=$1`,
        [studentId]
    );
    

    const totalLessons = await client.query(
`
    SELECT COUNT(l.id) AS total_lessons
    FROM lessons l
    JOIN enrollments e
    ON l.course_id=e.course_id
    WHERE e.student_id=$1
`,
[studentId]
);

    const studyTime = await client.query(
        `SELECT COALESCE(SUM(duration_minutes),0) AS total_minutes
        FROM learning_activity
        WHERE student_id=$1`,
        [studentId]
    );

    const weeklySessions = await client.query(
        `SELECT COUNT(DISTINCT DATE(created_at)) AS session_days
        FROM learning_activity
        WHERE student_id=$1
        AND created_at >= NOW() - INTERVAL '7 days'`,
        [studentId]
    );

    const activityDates = await client.query(
        `SELECT DISTINCT DATE(created_at) AS activity_date
        FROM learning_activity
        WHERE student_id=$1
        ORDER BY activity_date DESC`,
        [studentId]
    );

    const coursesEnrolled = Number(courses.rows[0].count);

    const lessonsCompleted = Number(lessons.rows[0].count);

    const quizAttempts = Number(attempts.rows[0].count);

    const averageQuizScore = Number(average.rows[0].average_score);

    const totalLessonCount = Number(totalLessons.rows[0].total_lessons);

    const totalStudyTime = Number(studyTime.rows[0].total_minutes);

    const weeklySessionCount = Number(weeklySessions.rows[0].session_days);

    const learningStreak = calculateStreak(
        activityDates.rows.map(row => row.activity_date)
    );

    const completionRate =
        totalLessonCount === 0
            ? 0
            : (lessonsCompleted / totalLessonCount) * 100;

    
    const engagementScore =
    completionRate * 0.35 +
    averageQuizScore * 0.35 +
    Math.min(quizAttempts * 5, 100) * 0.15 +
    Math.min(totalStudyTime / 10, 100) * 0.15;

    await client.query(
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
    weekly_sessions=$8,
    learning_streak=$9,
    updated_at=NOW()
    WHERE student_id=$10
`,
[
    coursesEnrolled,
    lessonsCompleted,
    quizAttempts,
    averageQuizScore,
    totalStudyTime,
    completionRate,
    engagementScore,
    weeklySessionCount,
    learningStreak,
    studentId
]
);
    
};

/**
 * Given a list of dates (most recent first) a student had at least one
 * logged activity, returns how many consecutive days of activity lead
 * up to today (or yesterday, so a streak isn't lost just because a
 * student hasn't logged anything yet today).
 */
function calculateStreak(activityDates) {
    if (!activityDates.length) return 0;

    const toDateOnly = (d) => {
        const date = new Date(d);
        date.setHours(0, 0, 0, 0);
        return date;
    };

    const today = toDateOnly(new Date());
    const mostRecent = toDateOnly(activityDates[0]);

    const dayDiff = Math.round((today - mostRecent) / 86400000);

    // Most recent activity is older than yesterday -> streak is broken
    if (dayDiff > 1) return 0;

    let streak = 1;
    let cursor = mostRecent;

    for (let i = 1; i < activityDates.length; i++) {
        const current = toDateOnly(activityDates[i]);
        const diff = Math.round((cursor - current) / 86400000);

        if (diff === 1) {
            streak++;
            cursor = current;
        } else if (diff === 0) {
            continue;
        } else {
            break;
        }
    }

    return streak;
}
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