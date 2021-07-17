const mongoose = require('mongoose');
const imagesSchema = new mongoose.Schema({
    FrontImage: String,
    BackImage: String,
    userID: String
})
const img = new mongoose.model('images', imagesSchema)
module.exports = img;