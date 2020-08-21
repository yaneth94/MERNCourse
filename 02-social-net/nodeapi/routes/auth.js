const express = require("express");
const {
    signup,
    signin,
    signout,
    forgotPassword,
    resetPassword,
} = require("../controllers/auth.controller");
const { userById } = require("../controllers/users.controller");
const { userSignupValidator, passwordResetValidator } = require("../validator");

const router = express.Router();

router.route("/signup").post(userSignupValidator, signup);
router.route("/signin").post(signin);
router.route("/signout").get(signout);

// password forgot and reset routes
router.route("/forgot-password").put(forgotPassword);
router.route("/reset-password").put(passwordResetValidator, resetPassword);

// any route containing: userId, our app will first execute userById
router.param("userId", userById);

module.exports = router;