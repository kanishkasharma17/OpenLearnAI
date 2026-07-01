const express=require("express");

const router=express.Router();

const auth=require("../middleware/authMiddleware");

const {
submit
}=require("../controllers/quizSubmissionController");

router.post(

"/:quizId/submit",

auth,

submit

);

module.exports=router;