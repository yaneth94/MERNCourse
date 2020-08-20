const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        //required: "Title is required",
        //minlength: 4,
        //maxlength: 150,
    },
    body: {
        type: String,
        required: true,
        //required: "Body is required",
        //minlength: 4,
        //maxlength: 2000,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: Date,
    likes: [{ type: ObjectId, ref: "User" }],
});

module.exports = model("Post", postSchema);