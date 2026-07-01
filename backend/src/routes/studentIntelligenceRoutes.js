const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/AuthMiddleware");
const{
    getStudentIntelligence
}=require("../controllers/studentIntelligenceController");

router.get("/",
    authMiddleware,
    getStudentIntelligence
);
module.exports=router;
