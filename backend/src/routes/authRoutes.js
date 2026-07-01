const express = require("express");

const router = express.Router();
const validate = require("../middleware/validationMiddleware");

const {
    registerValidator,
    loginValidator
} = require("../validators/authValidator");
const {
    registerUser,
    loginUser
} = require("../controllers/authController");

router.post(
    "/register", 
    registerValidator,
    validate,
    registerUser);

router.post(
    "/login", 
    loginValidator,
    validate,
    loginUser
);

module.exports = router;