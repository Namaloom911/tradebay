const express = require('express')
const router = express.Router();
const app = express();
const bcrypt = require("bcrypt");
const otpGenerator = require('otp-generator');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const nodemailer = require("nodemailer");
//const { urlencoded } = require("body-parser");
const Model = require('../Models/Users');
app.use(Model);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shahidmuneerawan@gmail.com',
        pass: 'Pakistan0337'
    }
});

router.post("/register/", async(req, res) => {

    const model = new Model({
        email: req.body.email,
        password: req.body.password
    });

    const mask = await Model.findOne({
        email: req.body.email
    });
    if (!mask) {

        const a = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        var mailOptions = {
            from: 'shahidmuneerawan@gmail.com',
            to: req.body.email,
            subject: 'Protocol 5416',
            text: a
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        model.email = req.body.email;
        model.otp = a;
        model.password = await bcrypt.hash(req.body.password, 10);
        const result = await model.save();

        return res.json({
            message: true,
            message: "user registered"
        });
    } else {

        console.log("Already exists");
        res.status(404).json({ 'Message': false });
    }
});



module.exports = router;