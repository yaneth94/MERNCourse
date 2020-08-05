const express = require("express");
const { getPosts, createPost } = require("../controllers/posts.controller");
const { requireSignin } = require("../controllers/auth.controller");
const { userById } = require("../controllers/users.controller");
const { createPostValidator } = require("../validator");

const router = express.Router();

router
    .route("/")
    //.get(requireSignin, getPosts)
    .get(getPosts)
    .post(requireSignin, createPostValidator, createPost);

// any route containing: userId, our app will first execute userById
router.param("userId", userById);

module.exports = router;