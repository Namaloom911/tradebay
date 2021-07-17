const express = require('express');
const router = express.Router();
const Model = require('../Models/Users');
const cc = require('../Models/Cards');
router.post('/admin/fs/:id', auth, (req, res) => {
    const user = await Model.find({ fsr: true });
    if (user) {
        user.fs = req.body.flag;
        res.json({ message: true, message: $ `"featured seller " + req.body.flag` });
    } else
        res.json({ message: false, messgae: "No requests found" });
})