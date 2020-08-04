const authCtrl = {};

const User = require("../models/User.js");

const _ = require("underscore");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

authCtrl.signup = async(req, res) => {
    let body = _.pick(req.body, ["name", "email", "password"]);
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists)
            return res.status(403).json({
                ok: false,
                err: "Email is taken!",
            });
        const user = await new User(body);
        await user.save();
        res.json({
            ok: true,
            message: "Signup sucess! Please Login",
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            err,
        });
    }
};

authCtrl.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        // if err or no user
        if (err || !user) {
            return res.status(401).json({
                error: "User with that email does not exist. Please signup.",
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in model and use here
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match",
            });
        }
        // generate a token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        /* const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.EXPIRE,
                }); */
        // persist the token as 't' in cookie with expiry date
        res.cookie("t", token, { expire: new Date() + process.env.EXPIRE });
        // retrun response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res
            .status(200)
            .json({ ok: true, token, user: { _id, email, name } });
    });
};

authCtrl.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "Signout success!" });
};

module.exports = authCtrl;