const express = require("express");
const {
    getPosts,
    createPost,
    postsByUser,
    postById,
    deletePost,
    isPoster,
    updatePost,
} = require("../controllers/posts.controller");
const { requireSignin } = require("../controllers/auth.controller");
const { userById } = require("../controllers/users.controller");
const { createPostValidator } = require("../validator");

const router = express.Router();

router
    .route("/")
    //.get(requireSignin, getPosts)
    .get(getPosts);
//.post(requireSignin, createPostValidator, createPost);

router.route("/:userId").post(requireSignin, createPost, createPostValidator);

router.route("/by/:userId").get(requireSignin, postsByUser);

router
    .route("/by/:postId")
    .delete(requireSignin, isPoster, deletePost)
    .put(requireSignin, isPoster, updatePost)
    .put(requireSignin, isPoster, updatePost);

// any route containing: userId, our app will first execute userById
router.param("userId", userById);

// any route containing: postId, our app will first execute postById
router.param("postId", postById);

module.exports = router;