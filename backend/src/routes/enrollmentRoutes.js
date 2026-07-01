const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    enrollCourse,
    getMyCourses,
    getCourseStudents
} = require("../controllers/enrollmentController");

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Enroll in a course
 *     tags:
 *       - Enrollments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Enrollment successful
 */
router.post(
    "/",
    authMiddleware,
    enrollCourse
);

/**
 * @swagger
 * /api/enrollments/my-courses:
 *   get:
 *     summary: Get enrolled courses
 *     tags:
 *       - Enrollments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student courses
 */
router.get(
    "/my-courses",
    authMiddleware,
    getMyCourses
);
/**
 * @swagger
 * /api/enrollments/course/{id}/students:
 *   get:
 *     summary: Get students enrolled in a course
 *     tags:
 *       - Enrollments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of students
 */
router.get(
    "/course/:id/students",
    authMiddleware,
    getCourseStudents
);

module.exports = router;