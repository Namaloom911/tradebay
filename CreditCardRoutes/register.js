const express = require("express");

const CreditCard = require('credit-card');
const router = express.Router();
const cc = require('../Models/Cards');
const Model = require('../Models/Users');
const auth = require('../middleware/check-auth');
const dc = require('../middleware/decode');

router.post("/AddCard/", auth, async(req, res) => {
    const decode = dc(req);
    const User = await Model.findOne({ _id: decode })
    const c = await cc.findOne({ number: req.body.n });
    const card = new cc({});
    const validation = CreditCard.validate(req.body);
    if (User) {
        if (!c) {
            if (validation) {
                card.UserID = req.params.id;
                card.cardType = req.body.t;
                card.number = req.body.n;
                card.expiry = req.body.e;
                card.ccv = req.body.ccv;
                card.credit = req.body.cr;
                card.price = req.body.pr;
                card.sold = false;
                card.verify = false;
                const result = await card.save();

                return res.json({
                    message: true,
                    "Results": result
                });
            } else {
                return res.json({
                    message: false,
                    message: "invalid parameters of card"
                });
            }
        } else {
            res.json({ message: false, message: "card already exist" })
        }

    } else {
        return res.json({ message: false, message: "wrong id" });
    }
});

module.exports = router;