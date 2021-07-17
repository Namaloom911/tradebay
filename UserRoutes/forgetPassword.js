const express = require('express')
const router = express.Router();
const app = express();
const bcrypt = require("bcrypt");
const otpGenerator = require('otp-generator');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const nodemailer = require("nodemailer");
const Model = require('../Models/Users');
const Pass = require('../Models/Otp')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.put("/NewPass/", async(req, res) => {
    const User = await Model.findOne({ email: req.body.email });
    const Nexus = await Pass.findOne({ email: req.body.email });
    var mark = Date.now();
    console.log(mark);
    if (Nexus.email === User.email) {
        if (req.body.otp === Nexus.otp) {
            if (Nexus.otpFlag === false) {
                User.password = await bcrypt.hash(req.body.password, 10);
                Nexus.otpFlag = true;
                const result = await User.save();
                Pass.deleteMany(Nexus, function(err, obj) {
                    if (err) throw err;
                    console.log("Session completed");
                })
                res.json({ "Success": true });
            } else {
                res.json({ "session timed out request new token": false });
            }
        } else {
            res.json({ "otp": false })
        }
    } else {
        res.json({ message: false });
    }
});
module.exports = router;