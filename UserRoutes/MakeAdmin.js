const express = require('express')
const router = express.Router();
const Model = require('../Models/Users');
const auth = require('../middleware/check-auth');
const dc = require('../middleware/decode');
router.post('/admin/make/:id', auth, async(req, res, next) => {

    const user = Model.findOne({ _id: req.params.id });
    try {
        if (user) {
            user.isAdmin = req.body.flag;
            const result = await user.save();
            res.json({ message: "Operation succesful" });
        }
    } catch {
        res.json({ message: "Unable to perform operation" });
    }

})
module.exports = router;