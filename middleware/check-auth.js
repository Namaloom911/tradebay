const jwt = require('jsonwebtoken');
const SECRET = "a06f1c347f2f36e47006";

module.exports = (req, res, next) => {
    try {
        const verify = jwt.verify(req.headers['authorization'], SECRET)
        next(verify.id);
    } catch (error) { return res.status(401).json({ message: false, message: "authorisation failed" }) }
};