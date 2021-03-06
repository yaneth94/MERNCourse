const usersCtrl = {};
// use lodash
const _ = require("lodash");

const User = require("../models/User.js");

const fs = require("fs");

const formidable = require("formidable");
const { result } = require("lodash");

// you need because have the information at user that login user
usersCtrl.userById = (req, res, next, id) => {
    User.findById(id)
        // populate followers and following users array
        .populate("following", "_id name")
        .populate("followers", "_id name")
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    err: "User not found",
                });
            }
            req.profile = user; // adds profile object in req with user info
            //console.log(user);
            next();
        });
};

usersCtrl.hasAuthorization = (req, res, next) => {
    let sameUser = req.profile && req.auth && req.profile._id == req.auth._id;
    let adminUser = req.profile && req.auth && req.auth.role === "admin";

    const authorized = sameUser || adminUser;
    // const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

    // console.log("req.profile ", req.profile, " req.auth ", req.auth);
    // console.log("SAMEUSER", sameUser, "ADMINUSER", adminUser);

    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized to perform this action",
        });
    }
    next();
};

usersCtrl.getUsers = (req, res) => {
    //console.log(req.profile);
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        res.json({
            ok: true,
            users,
        });
    }).select("name email updated created role");
};

usersCtrl.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};
/*
usersCtrl.updateUser = (req, res, next) => {
    // save user
    let user = req.profile;
    user = _.extend(user, req.body); // extend -- mutate the source object

    user.updated = Date.now();

    user.save((err) => {
        if (err) {
            return res.status(400).json({
                err: "You are not authorized to perform this action",
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;

        res.json({
            ok: true,
            user,
        });
    });
};
*/

usersCtrl.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                err: "Photo could not be uploaded",
            });
        }
        // save user
        let user = req.profile;
        user = _.extend(user, fields);
        user.updated = Date.now();

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        user.save((err) => {
            if (err) {
                return res.status(400).json({
                    err,
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        });
    });
};

usersCtrl.deleteUser = (req, res, next) => {
    let user = req.profile;
    user.remove((err, user) => {
        if (err) {
            return res.status(400).json({
                err: err,
            });
        }
        res.json({ ok: true, message: "User deleted successfully" });
    });
};

usersCtrl.userPhoto = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set("Content-Type", req.profile.photo.contentType);
        return res.send(req.profile.photo.data);
    }
    next();
};

// follow unfollow
usersCtrl.addFollowing = (req, res, next) => {
    console.log(req.body);
    User.findByIdAndUpdate(
        req.body.userId, {
            $push: { following: req.body.followId },
        },
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    err,
                });
            }
            next();
        }
    );
};

usersCtrl.addFollower = (req, res) => {
    User.findByIdAndUpdate(
            req.body.followId, {
                $push: { followers: req.body.userId },
            }, { new: true }
        )
        .populate("following", "_id name")
        .populate("followers", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    err,
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};

// remove follow unfollow
usersCtrl.removeFollowing = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.userId, { $pull: { following: req.body.unfollowId } },
        (err, result) => {
            if (err) {
                return res.status(400).json({ err });
            }
            next();
        }
    );
};

usersCtrl.removeFollower = (req, res) => {
    User.findByIdAndUpdate(
            req.body.unfollowId, { $pull: { followers: req.body.userId } }, { new: true }
        )
        .populate("following", "_id name")
        .populate("followers", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    err,
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};

/**
 *
 * selects the documents where:
 * the field value is not in the specified array or
 * the field does not exist.
 */

usersCtrl.findPeople = (req, res) => {
    let following = req.profile.following;
    following.push(req.profile._id);
    User.find({ _id: { $nin: following } }, (err, users) => {
        if (err) {
            return res.status(400).json({
                err,
            });
        }
        res.json({
            ok: true,
            users,
        });
    }).select("name");
};

module.exports = usersCtrl;