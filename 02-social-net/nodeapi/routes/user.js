const express = require("express");
const {
    getUsers,
    userById,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople,
} = require("../controllers/users.controller");
const { requireSignin } = require("../controllers/auth.controller");

const router = express.Router();

// route follow
router.route("/follow").put(requireSignin, addFollowing, addFollower);
//route unfollow
router.route("/unfollow").put(requireSignin, removeFollowing, removeFollower);

router.route("/").get(getUsers);
router
    .route("/:userId")
    .get(requireSignin, getUser)
    .put(requireSignin, updateUser)
    .delete(requireSignin, deleteUser);

// route get photo
router.route("/photo/:userId").get(userPhoto);

// who to follow
router.route("/findpeople/:userId").get(requireSignin, findPeople);

// any route containing: userId, our app will first execute userById
router.param("userId", userById);

module.exports = router;