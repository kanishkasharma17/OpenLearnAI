const {
    submitQuiz
} = require("../services/quizSubmissionService");

const submit = async (req,res,next)=>{

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

        next(error);

    }

};

module.exports={
    submit
};