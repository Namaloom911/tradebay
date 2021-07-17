const express = require('express');
const router = express.Router();
const Model = require('../Models/Users');
const auth = require('../middleware/check-auth')
const cc = require('../Models/Cards');

// router.post('/buy/:id', auth, (req, res) => {

// })
router.get(('/buy/'), auth, async(req, res) => {
    const flag = await cc.findOne({ verified: true });
    res.json(flag);
})
module.exports = router;