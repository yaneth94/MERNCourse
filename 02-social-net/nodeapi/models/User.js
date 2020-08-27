const { Schema, model } = require("mongoose");

const { ObjectId } = Schema;

const crypto = require("crypto");

let uuidv1 = require("uuidv1");

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now,
    },
    updated: Date,
    photo: {
        data: Buffer,
        contentType: String,
    },
    about: {
        type: String,
        trim: true,
    },
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
    resetPasswordLink: {
        data: String,
        default: "",
    },
    role: {
        type: String,
        default: "subscriber",
    },
});

/**
 * Virtual fields are additional fields for a given model
 * Their values can be set manually or automally with defined functionaly
 * Keep in mind: virtual properties don´t get persisted in the database
 * They only exist logically and are not written to the documents collection
 */

//virtual fields
userSchema
    .virtual("password")
    .set(function(password) {
        //create temporary variable called _password
        this._password = password;
        // generate a timestamp
        this.salt = uuidv1();
        // encrypPassword()
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

//methods
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
};

module.exports = model("User", userSchema);