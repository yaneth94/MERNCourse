const usersCtrl = {};

const User = require("../models/User");

const _ = require("underscore");

usersCtrl.getUsers = async(req, res) => {
    try {
        const users = await User.find(); // {},{}
        res.json({
            ok: true,
            users,
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
    }
};

usersCtrl.createUser = async(req, res) => {
    let { username } = req.body;
    const newUser = new User({
        username,
    });
    try {
        let user = await newUser.save();
        res.json({
            ok: true,
            user,
            message: "User saved correctly",
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
    }
};

usersCtrl.getUser = async(req, res) => {
    let id = req.params.id;
    try {
        let user = await User.findById(id);
        res.json({
            ok: true,
            user,
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
    }
};

usersCtrl.updateUser = async(req, res) => {
    let id = req.params.id;
    // arreglo de propiedades validas
    let body = _.pick(req.body, ["username"]);
    try {
        let user = await User.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
            context: "query",
        });
        res.json({
            ok: true,
            user,
            message: "User Updated",
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
    }
};

usersCtrl.deleteUser = async(req, res) => {
    let id = req.params.id;

    try {
        let userDelete = await User.findByIdAndRemove(id);
        res.json({
            ok: true,
            user: userDelete,
            message: "User Deleted",
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
    }
};

module.exports = usersCtrl;