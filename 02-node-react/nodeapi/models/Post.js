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
        type: Buffer,
        contenType: String,
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
});

module.exports = model("Post", postSchema);