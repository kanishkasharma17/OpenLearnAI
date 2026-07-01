const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    getWeakTopics
} = require("../controllers/weakTopicController");

router.get(
    "/",
    auth,
    getWeakTopics
);

module.exports = router;