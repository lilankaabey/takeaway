const express = require('express');
// const { body } = require('express-validator');

const productController = require('../controller/product');

const router = express.Router();
const isAuth = require('../middleware/is-auth');


// GET /system/product  ::to get all products
router.get('/products', isAuth, productController.getProducts);
// GET /system/product/:productId 
router.get('/product/:productId', isAuth, productController.getProduct);

//GET /system/product/getId
router.get('/product/getId', isAuth, productController.getRestaurantId);

// POST /system/add-product/:productId
router.post('/product/add', isAuth, productController.addProduct);

//PUT /system/edit-product/:productId
router.put('/product/edit/:productId', isAuth, productController.updateProduct);

// DELETE /system/delete-product/:productId
router.delete('/product/delete/:productId', isAuth, productController.deleteProduct);

module.exports = router;