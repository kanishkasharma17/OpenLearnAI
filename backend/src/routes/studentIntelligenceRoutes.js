const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");
const{
    getStudentIntelligence
}=require("../controllers/studentIntelligenceController");

/**
 * @swagger
 * /api/student-intelligence:
 *   get:
 *     summary: Get student learning statistics and AI recommendation
 *     tags:
 *       - Student Intelligence
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student intelligence data retrieved
 */
router.get("/",
    authMiddleware,
    getStudentIntelligence
);
module.exports=router;
