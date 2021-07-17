const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    manufacturer: String
});

const Product = mongoose.model('Products', productSchema);
module.exports = Product;