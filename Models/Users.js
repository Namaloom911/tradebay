const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    otp: { type: String },
    token: String,
    fName: { type: String },
    sName: String,
    birth: Date,
    phone: Number,
    SSN: Number,
    verified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, deafult: false }
});
const Model = mongoose.model("Users", UserSchema);
module.exports = Model;