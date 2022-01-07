const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    brand: String
});

const Model = mongoose.model;
const Product = Model('product', ProductSchema);

module.exports = Product;