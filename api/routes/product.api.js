var router = require('express').Router();
var productService = require('../../services/product.service.js');

/* GET products listing. */
router.get('/list', async(req, res, next) => {
    var response = await productService.getProducts()
    res.status(response.code).send(response);
});

/* GET product by id. */
router.get('/:id', async(req, res, next) => {
    var response = await productService.getProductById(req.params.id);
    res.status(response.code).send(response);
});

/* Add product. */
router.post('/add', async(req, res, next) => {
    var response = await productService.addProduct(req.body);
    res.status(response.code).send(response);
});

/* Update product. */
router.put('/:id', async(req, res, next) => {
    var response = await productService.updateProduct(req.params.id, req.body);
    res.status(response.code).send(response);
});

/* Delete product. */
router.delete('/:id', async(req, res, next) => {
    var response = await productService.deleteProductById(req.params.id);
    res.status(response.code).send(response);
});

module.exports = router;