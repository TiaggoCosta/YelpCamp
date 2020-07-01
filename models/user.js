var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: String,
    avatar: {type: String, default: "https://png.pngtree.com/svg/20161212/personal_default_avatar_for_mobile_phone_app__146524.png"},
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""},
    emailToken: String,
    isVerified: Boolean,
    email: {type: String, unique: true, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);