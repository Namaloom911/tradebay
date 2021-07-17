const express = require('express')
const router = express.Router();
const Model = require('../Models/Users');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Model);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
router.post('/verify/:id', async(req, res) => {
    var User = await Model.findOne({ _id: req.params.id });

    if (User) {
        if (await Model.findOne({ otp: req.body.otp })) {
            User.verified = true;
            Model.findOneAndUpdate({ otp: User.otp }, { $unset: { otp: 1 } }, (err, res) => {
                if (err) console.log(err)
                else console.log("succesful");
            });

            const result = await User.save();
            console.log("Verified");
            return res.json({ "Message": true });
        } else {
            return res.json({ "wrong otp": false })
        }

    } else {
        res.json({ "not found": false });
    }
});
module.exports = router;