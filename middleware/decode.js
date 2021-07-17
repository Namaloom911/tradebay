const jwt = require('jsonwebtoken');
const SECRET = "a06f1c347f2f36e47006";

module.exports = (req) => {

    const decode = jwt.decode(req.headers['authorization'], SECRET)
    return decode.id;
}