const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const teacherMiddleware = require("../middleware/teacherMiddleware");

const {
    createCourse,
    getCourses
} = require("../controllers/courseController");
/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Course created successfully
 */
router.post(
    "/",
    authMiddleware,
    teacherMiddleware,
    createCourse
);
/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses
 */
router.get(
    "/",
    authMiddleware,
    getCourses
);

module.exports = router;