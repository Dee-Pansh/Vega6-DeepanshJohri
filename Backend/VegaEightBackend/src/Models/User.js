const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const argon2 = require("argon2");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
});

userSchema.methods.generateToken = function (userId) {
    return jsonwebtoken.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30m" });
}

userSchema.methods.VerifyPassword = function(inputPassword)
{
    return argon2.verify(this.password,inputPassword);
}

userSchema.pre("save", async function (next) {
    this.password = await argon2.hash(this.password);
    next();
});

userSchema.index({ email: "text" });

const User = mongoose.model("User", userSchema);

module.exports = User;