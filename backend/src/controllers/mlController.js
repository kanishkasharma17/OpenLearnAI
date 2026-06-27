const pool = require("../config/db");

const getTrainingData = async (req,res)=>{

    try{

        const result=await pool.query(
            `SELECT
                u.id AS student_id,
                u.name,

                COUNT(DISTINCT e.course_id) AS courses_enrolled,

                COUNT(DISTINCT sp.lesson_id)
                FILTER (WHERE sp.completed=TRUE)
                AS lessons_completed,

                COALESCE(AVG(qa.score),0)
                AS average_quiz_score,

                COALESCE(SUM(la.duration_minutes),0)
                AS total_study_time

            FROM users u

            LEFT JOIN enrollments e
            ON u.id=e.student_id

            LEFT JOIN student_progress sp
            ON u.id=sp.student_id

            LEFT JOIN quiz_attempts qa
            ON u.id=qa.student_id

            LEFT JOIN learning_activity la
            ON u.id=la.student_id

            WHERE u.role='student'

            GROUP BY u.id,u.name

            ORDER BY u.id`
        );

        res.json(result.rows);

    }
    catch(error){

        console.error(error);

        res.status(500).json({
            message:"Server Error"
        });

    }

};

module.exports={
    getTrainingData
};