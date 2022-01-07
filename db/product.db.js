const Product = require('../Models/product.model');

var getProducts = async() => {
    try {
        let products = await Product.find();
        return products;
    } catch (error) {
        console.log(error);
        return [];
    }
}

var getProductById = async(id) => {
    try {
        let product = await Product.findById(id);
        return product;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

var addProduct = async(productobj) => {
    try {
        let product = await Product.create(productobj);
        return product;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

var updateProduct = async(id, product) => {
    try {
        await Product.findOneAndUpdate({ _id: id }, product);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

var deleteProductById = async(id) => {
    try {
        await Product.findOneAndDelete({ _id: id });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProductById
}