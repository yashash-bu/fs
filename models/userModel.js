const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    userName : {
        type: String,
        required: [true,"Name of user is required"]
    },
    userEmail : {
        type: String,
        required: [true,"Email of user is required"]
    },
    userPass : {
        type: String,
        required: [true,"Password of user is required"]
    }
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("userPass")) return next();
    this.userPass = await bcrypt.hash(this.userPass, 12);  
    next();
});

const User = mongoose.model("User",userSchema);
module.exports = User;