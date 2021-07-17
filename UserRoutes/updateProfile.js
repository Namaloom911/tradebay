const express = require('express')
const router = express.Router();
// const app = express();
const Model = require('../Models/Users');
// app.use(Model);
const auth = require('../middleware/check-auth');
const dc = require('../middleware/decode');
// const bodyParser = require('body-parser');
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
//process.env.ACCESS_TOKEN_SECRET
router.put("/users/", auth, async(req, res) => {
    //console.log(next);
    const decode = dc(req);
    console.log(decode);
    const user = await Model.findOne({ _id: decode })
    if (user) {
        user.fName = req.body.fName
        user.sName = req.body.sName
        user.birth = req.body.birth
        user.phone = req.body.phone
        user.SSN = req.body.SSN
        const result = await user.save();
        return res.json({
            "Message": true,
            "Message": req.body
        });
    } else {
        return res.status(404).json({ "message": false });
    }
});
module.exports = router;