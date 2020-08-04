const express = require("express");
const { signup, signin, signout } = require("../controllers/auth.controller");
const { userSignupValidator } = require("../validator");

const router = express.Router();

router.route("/signup").post(userSignupValidator, signup);
router.route("/signin").post(signin);
router.route("/signout").get(signout);

module.exports = router;