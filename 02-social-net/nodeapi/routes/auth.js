const express = require("express");
const { signup, signin, signout } = require("../controllers/auth.controller");
const { userById } = require("../controllers/users.controller");
const { userSignupValidator } = require("../validator");

const router = express.Router();

router.route("/signup").post(userSignupValidator, signup);
router.route("/signin").post(signin);
router.route("/signout").get(signout);

// any route containing: userId, our app will first execute userById
router.param("userId", userById);

module.exports = router;