const express = require("express");
const {
    getUsers,
    userById,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
} = require("../controllers/users.controller");
const { requireSignin } = require("../controllers/auth.controller");

const router = express.Router();

router.route("/").get(getUsers);
router
    .route("/:userId")
    .get(requireSignin, getUser)
    .put(requireSignin, updateUser)
    .delete(requireSignin, deleteUser);

// route get photo
router.route("/photo/:userId").get(userPhoto);

// any route containing: userId, our app will first execute userById
router.param("userId", userById);

module.exports = router;