const pool = require("../config/db");
const axios =require("axios");

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

const getRecommendation = async (req, res) => {

    try {

        const studentId = req.user.id;

        const result = await pool.query(
            `
            SELECT

                COUNT(DISTINCT e.course_id) AS courses_enrolled,

                COUNT(DISTINCT sp.lesson_id)
                FILTER (WHERE sp.completed=TRUE)
                AS lessons_completed,

                COUNT(DISTINCT qa.id)
                AS quiz_attempts,

                COALESCE(AVG(qa.score),0)
                AS average_quiz_score

            FROM users u

            LEFT JOIN enrollments e
            ON u.id=e.student_id

            LEFT JOIN student_progress sp
            ON u.id=sp.student_id

            LEFT JOIN quiz_attempts qa
            ON u.id=qa.student_id

            WHERE u.id=$1

            GROUP BY u.id
            `,
            [studentId]
        );

        if(result.rows.length===0){

            return res.status(404).json({
                message:"Student not found"
            });

        }

        const stats=result.rows[0];

        const features={

            preferred_domain:"DSA",

            courses_enrolled:Number(stats.courses_enrolled),

            lessons_completed:Number(stats.lessons_completed),

            completion_rate:80,

            quiz_attempts:Number(stats.quiz_attempts),

            average_quiz_score:Number(stats.average_quiz_score),

            total_study_time:500,

            weekly_sessions:5,

            learning_streak:15,

            preferred_difficulty:"Intermediate",

            risk_level:"Low"

        };

        const prediction=await axios.post(
            "http://127.0.0.1:5000/predict",
            features
        );

        res.json({
            student_id:studentId,
            recommendation:prediction.data
        });

    }
    catch(error){

        console.error(error);

        res.status(500).json({
            message:"Server Error"
        });

    }

};

module.exports={
    getTrainingData,
    getRecommendation
};