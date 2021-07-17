const express = require('express')
const router = express.Router();
// const app = express();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const nodemailer = require("nodemailer");
const Model = require('../Models/Users');
// const bodyParser = require('body-parser');
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// require('../nodemon.json');
//require('dotenv').config();
// app.use(Model);
router.post("/login/", async(req, res) => {
    const cursor = await Model.findOne({
        email: req.body.email
    });
    if (cursor) {

        if (cursor.verified == true) {
            try {
                if (await bcrypt.compare(req.body.password, cursor.password)) {


                    const SECRET = "a06f1c347f2f36e47006";
                    const token = jwt.sign({
                        email: cursor.email,
                        id: cursor._id
                    }, SECRET, { expiresIn: "1h" });
                    //http://localhost:3000/users/60c0e44cc9d86e2f8ce6e2db
                    return res.json({
                        message: true,
                        token: token
                    })
                } else {
                    res.status(404).json({ 'Message': false })
                }
            } catch {
                res.status(500).json()
            }
        } else {
            return res.json({
                "success": false,
                "message": "user isn't verified"
            });
        }
    } else {
        return res.json({
            message: false,
            message: "auth failed"
        });
    }
});


module.exports = router;




// const username = req.body.email;
// const pass = req.body.password;
// const user = { name: username, password: pass };
// const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
// cursor.token = accessToken;
// const result = await cursor.save();




// const token = jwt.sign({
//     email: cursor.email,
//     userId: cursor._id
// }, "process.env.JWT.KEY", { expiresIn: "1h" });
// console.log(token)