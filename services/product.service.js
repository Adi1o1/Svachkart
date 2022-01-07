var Response = require('../Models/response.model');
var ProductDb = require('../db/product.db');

var getProducts = async() => {
    try {
        var products = await ProductDb.getProducts();
        if (products.length == 0) {
            var response = new Response(404, false, "Products not found");
            response["products"] = [];
        } else {
            var response = new Response(200, true, "Products retrieved");
            response["products"] = products;
        }
    } catch (error) {
        var response = new Response(500, false, "Internal server error");
    }
    return response;
}

var getProductById = async(id) => {
    try {
        var product = await ProductDb.getProductById(id);
        if (product != undefined) {
            var response = new Response(200, true, "Product retrieved");
            response["product"] = product;
        } else {
            var response = new Response(404, false, "Product not found");
        }
    } catch (error) {
        var response = new Response(500, false, "Internal server error");
    }
    return response;
}

var addProduct = async(body) => {
    try {
        if (Object.keys(body).length == 0) {
            var response = new Response(400, false, "Bad request. Please send request body.");
        } else if (!validateAddBody(body)) {
            var response = new Response(400, false, "Bad request. Please send valid request body.");
        } else {
            var product = await ProductDb.addProduct(body);
            if (product != undefined) {
                var response = new Response(200, true, "Product added");
            } else {
                var response = new Response(500, false, "Internal server error");
            }
        }
    } catch (error) {
        var response = new Response(500, false, "Internal server error");
    }
    return response;
}

var updateProduct = async(id, body) => {
    try {
        if (Object.keys(body).length == 0) {
            var response = new Response(400, false, "Bad request. Please send request body.");
        } else if (!validateUpdateBody(body)) {
            var response = new Response(400, false, "Bad request. Please send valid request body.");
        } else {
            var product = await ProductDb.getProductById(id);
            if (product != undefined) {
                var isUpdated = await ProductDb.updateProduct(id, body);
                if (isUpdated) {
                    var response = new Response(200, true, "Product updated");
                } else {
                    var response = new Response(500, false, "Internal server error");
                }
            } else {
                var response = new Response(404, false, "Product to update not found");
            }
        }
    } catch (error) {
        var response = new Response(500, false, "Internal server error");
    }
    return response;
}

var deleteProductById = async(id) => {
    try {
        var product = await ProductDb.getProductById(id);
        if (product != undefined) {
            var isDeleted = await ProductDb.deleteProductById(id);
            if (isDeleted) {
                var response = new Response(200, true, "Product deleted");
            } else {
                var response = new Response(404, false, "Product not found");
            }
        } else {
            var response = new Response(404, false, "Product to delete not found");
        }
    } catch (error) {
        var response = new Response(500, false, "Internal server error");
    }
    return response;
}

var validateAddBody = (body) => {
    var productProperties = ["name", "description", "price", "brand"];
    var objectKeys = Object.keys(body);
    var isValid = true;
    objectKeys.forEach(key => {
        if (productProperties.indexOf(key) == -1) {
            isValid = false;
        }
    });
    productProperties.forEach(property => {
        if (objectKeys.indexOf(property) == -1) {
            isValid = false;
        }
    });
    return isValid;
}

var validateUpdateBody = (body) => {
    var productProperties = ["name", "description", "price", "brand"];
    var objectKeys = Object.keys(body);
    var isValid = true;
    objectKeys.forEach(key => {
        if (productProperties.indexOf(key) == -1) {
            isValid = false;
        }
    });
    return isValid;
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProductById
}