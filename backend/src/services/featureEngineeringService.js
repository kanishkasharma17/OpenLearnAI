const pool=require("../config/db");

const {
    calculateStatistics
}=require("./statisticsService");

const buildFeatures=async(studentId)=>{

    const stats=await calculateStatistics(studentId);

    const preference=await pool.query(
    `
    SELECT *
    FROM student_preferences
    WHERE student_id=$1
    `,
    [studentId]
);
    let riskLevel="Low";
    if(Number(stats.completion_rate)<40)
        riskLevel="High"
    else if(Number(stats.average_quiz_score)<50)
        riskLevel="Medium"
    return{
        preferred_domain:
            preference.rows[0].preferred_domain,
        courses_enrolled:
            Number(stats.courses_enrolled),
        lessons_completed:
            Number(stats.lessons_completed),
        completion_rate:
            Number(stats.completion_rate),
        quiz_attempts:
            Number(stats.quiz_attempts),
        average_quiz_score:
            Number(stats.average_quiz_score),
        total_study_time:
            Number(stats.total_study_time),
        weekly_sessions:
            Number(stats.weekly_sessions),
        learning_streak:
            Number(stats.learning_streak),
        preferred_difficulty:
            preference.rows[0].preferred_difficulty,
        risk_level:
            riskLevel
    };
};




module.exports={
    buildFeatures
};