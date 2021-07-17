const express = require('express');
const router = express.Router();
const Model = require('../Models/Users');
const auth = require('../middleware/check-auth')
const cc = require('../Models/Cards');

router.put('/approve/', async(req, res) => {

    const flag = await cc.findOne({ UserID: req.body.userID })
    if (flag) {
        if (flag.verified == true) {
            if (flag.sold == false) {
                flag.sold = req.body.flag;
                const result = await flag.save();
                res.json({ message: true })
            } else res.json({ message: false, message: "card already sold" })
        } else res.json({ message: false, message: "card not verified" })

    } else res.json({ message: false, message: "unauthorise id" })
})
module.exports = router;