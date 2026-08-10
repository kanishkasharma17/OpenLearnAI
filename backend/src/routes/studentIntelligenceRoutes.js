const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");
const teacherMiddleware=require("../middleware/teacherMiddleware");
const{
    getStudentIntelligence,
    getCourseRiskOverview,
    getTeacherOverview
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

/**
 * @swagger
 * /api/student-intelligence/course/{courseId}/risk:
 *   get:
 *     summary: Get a risk breakdown for every student in a course (teacher only)
 *     tags:
 *       - Student Intelligence
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Course risk overview retrieved
 */
router.get("/course/:courseId/risk",
    authMiddleware,
    teacherMiddleware,
    getCourseRiskOverview
);

/**
 * @swagger
 * /api/student-intelligence/teacher/overview:
 *   get:
 *     summary: Get an overview across all of a teacher's courses (enrollment, completion, risk)
 *     tags:
 *       - Student Intelligence
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teacher overview retrieved
 */
router.get("/teacher/overview",
    authMiddleware,
    teacherMiddleware,
    getTeacherOverview
);

module.exports=router;
