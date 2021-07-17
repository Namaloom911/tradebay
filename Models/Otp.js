const mongoose = require("mongoose");
const PassSchema = new mongoose.Schema({
    otp: { type: String, expiresIn: "1h" },
    otpFlag: { type: Boolean, deafult: false },
    email: String,
});
const Pass = mongoose.model("Otp", PassSchema);
module.exports = Pass;