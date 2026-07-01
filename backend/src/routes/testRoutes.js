const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    test
} = require("../controllers/testController");

router.get("/", auth, test);

module.exports = router;