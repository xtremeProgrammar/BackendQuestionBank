const express = require("express")
const router = express.Router();

const { loginHandler, signupHandler, loginTestHandler } = require("../controller/authController")
const catchAsync = require("../utils/catchAsync")
const { validateUserLogin } = require("../middlewares/validateUserLogin")
const { validateUserSignup } = require("../middlewares/validateUserSignup")
const { validateUserLoginTest } = require("../middlewares/validateUserLoginTest")



router.post("/login", validateUserLogin, catchAsync(loginHandler));


router.post("/signup", validateUserSignup, catchAsync(signupHandler));


router.post("/loginTest", validateUserLoginTest, catchAsync(loginTestHandler));

module.exports = router;