const {
    submitQuiz
} = require("../services/quizSubmissionService");

const submit = async (req,res)=>{

    try{

        const result=
            await submitQuiz(

                req.user.id,

                req.params.quizId,

                req.body.answers

            );

        res.json(result);

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports={
    submit
};