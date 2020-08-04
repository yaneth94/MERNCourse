const express = require("express");
const { getPosts, createPost } = require("../controllers/posts.controller");
const { createPostValidator } = require("../validator");

const router = express.Router();

router.route("/").get(getPosts).post(createPostValidator, createPost);

module.exports = router;