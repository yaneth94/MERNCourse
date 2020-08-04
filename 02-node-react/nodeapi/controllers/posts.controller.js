const postsCtrl = {};

const Post = require("../models/Post.js");

const _ = require("underscore");

postsCtrl.getPosts = async(req, res) => {
    try {
        const posts = await Post.find().select("_id title body"); // {},{}
        res.json({
            ok: true,
            posts,
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            err,
        });
    }
};

postsCtrl.createPost = async(req, res) => {
    // arreglo de propiedades validas
    let body = _.pick(req.body, ["title", "body"]);
    const newPost = Post(body);
    try {
        let post = await newPost.save();
        res.json({
            ok: true,
            post,
            message: "Post save correctly",
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
    }
};

module.exports = postsCtrl;