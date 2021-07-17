const express = require('express')
const router = express.Router();
const app = express();
const Product = require('../Models/products');
app.use(Product);
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
const Model = require('../Models/Users');
app.use(Model);
router.post("/products/", async(req, res) => {

    try {

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            manufacturer: req.body.manufacturer
        });
        const result = await product.save();
        console.log(result);
        return res.json({ "Message": true, message: result });
    } catch {
        return res.json({ message: false })
    }
});

router.put('/products/:id', (req, res) => {
    const product = new Product({
        price: req.body.price
    });
});

router.delete('/products/:id', async(req, res) => {
    const Nexus = await Product.findOne({ _id: req.params.id });
    Product.deleteMany(Nexus, function(err, obj) {
        if (err) throw err;
        console.log("Session completed");
    })
});

module.exports = router;