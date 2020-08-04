const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title: {
        type: String,
        required: true
            //required: "Title is required",
            //minlength: 4,
            //maxlength: 150,
    },
    body: {
        type: String,
        required: true
            //required: "Body is required",
            //minlength: 4,
            //maxlength: 2000,
    },
}, {
    timestamps: true,
});

module.exports = model("Post", postSchema);