const express=require("express");

const router=express.Router();

const authMiddleware=require("../middleware/authMiddleware");

const {getTrainingData}=require("../controllers/mlController");

router.get(
    "/training-data",
    authMiddleware,
    getTrainingData
);

module.exports=router;