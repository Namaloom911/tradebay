const express = require('express');
const router = express.Router();
const Model = require('../Models/Users');
const cc = require('../Models/Cards');
router.get('/buy/fs/', async(req, res) => {
    await cc.find({ ranked: true }).sort({ bid: asc }).exec(function(err, model) {
        try {
            if (model) {
                const users = await cc.find({ fsale: true });
                const user = await Model.findOne({ _id: users.UserID });
                res.json({ "Card": model, bid: 0, password: 0, verified: 0, fs: 0, fsr: 0 });
            } else
                res.json({ message: "none fc found" });

        } catch {
            res.json(err);
        }
    });
})