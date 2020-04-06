require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
const db = require('./database');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

db.connection.sync({ force: true, alter: false }).then(() => {
    app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));
});

var products = require('./routes/products');
app.use('/products', products);

var manufacturers = require('./routes/manufacturers');
app.use('/manufacturers', manufacturers);

var taxes = require('./routes/taxes');
app.use('/taxes', taxes);

var options = require('./routes/options');
app.use('/options', options);

var warehouses = require('./routes/warehouses');
app.use('/warehouses', warehouses);

var categories = require('./routes/categories');
app.use('/categories', categories);
