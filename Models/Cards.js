const mongoose = require("mongoose");
const CardSchema = new mongoose.Schema({
    cardType: String,
    number: Number,
    expiry: String,
    cvv: Number,
    UserID: String,
    credit: Number,
    price: Number,
    sold: { type: Boolean, deafult: false },
    verify: { type: Boolean, deafult: false }
});
const cc = mongoose.model("Cards", CardSchema);
module.exports = cc;

//http://localhost:3000/AddCard/60c0e44cc9d86e2f8ce6e2db