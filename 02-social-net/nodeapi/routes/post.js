const express = require("express");
const {
    getPosts,
    createPost,
    postsByUser,
    postById,
    deletePost,
    isPoster,
    updatePost,
    postPhoto,
    singlePost,
    like,
    unlike,
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

router.route("/like").put(requireSignin, like);
router.route("/unlike").put(requireSignin, unlike);

router.route("/:userId").post(requireSignin, createPost, createPostValidator);

router
    .route("/by/:postId")
    .get(singlePost)
    .delete(requireSignin, isPoster, deletePost)
    .put(requireSignin, isPoster, updatePost)
    .put(requireSignin, isPoster, updatePost);

router.route("/user/:userId").get(requireSignin, postsByUser);

// route get photo
router.route("/photo/:postId").get(postPhoto);

// any route containing: userId, our app will first execute userById
router.param("userId", userById);

// any route containing: postId, our app will first execute postById
router.param("postId", postById);

module.exports = router;