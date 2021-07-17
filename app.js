const express = require("express");
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const register = require('./UserRoutes/register');
const login = require('./UserRoutes/login');
const update = require('./UserRoutes/updateProfile');
const forgetPassword = require('./UserRoutes/forgetPassword');
const verify = require('./UserRoutes/verify');
const upload = require('./UserRoutes/lic');
app.use(upload);
app.use(verify);
app.use(update);
app.use(login);
app.use(register);
app.use(forgetPassword);

const Product = require('./Models/products');
// app.use(Product);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose
    .connect("mongodb://localhost:27017", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to CompassDB"))
    .catch((err) => console.error("error found...", err));


const port = process.env.port || 3000;
app.listen((port), () => console.log(`listening to port ${port}`));

app.post("/products/", async(req, res, next) => {

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

app.put('/admin/products/:id', async(req, res, next) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
        product.price = req.body.price;
        const result = await product.save();
        return res.json({
            "Message": true,
            "Message": req.body
        });
    } else {
        return res.json({ message: false, message: "product not found" })
    }
    next();
});

app.delete('/admin/products/:id', async(req, res, next) => {
    const Nexus = await Product.findOne({ _id: req.params.id });
    if (Nexus) {
        Product.deleteMany(Nexus, function(err, obj) {
            if (err) throw err;
            console.log("Session completed");
            res.json({ message: "Deleted", })
        })
    } else {
        return res.json({ message: "Id Not found or deleted" })
    }
    next();

});

app.use((req, res, next) => {
    const error = new Error('Address Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: { message: error.message } });
})