const express = require('express');

const customerController = require('../controller/customer');

const router = express.Router();

const isAuth = require('../middleware/is-auth');


//Get Search Restaurants
router.get('/search/:location', customerController.getSearchRestaurants);

// Get Product
router.get('/getproduct/:productId', customerController.getProduct);

// Get Cart
router.get('/getcart/:cartId', customerController.getCart);

//Get Search Products
router.get('/products/:restaurantId', customerController.getProducts);

// Get Restaurant Details
router.get('/getrestaurant/:restaurantId', customerController.getRestaurantDetails);

// Get order
router.get('/getorder/:orderId', customerController.getOrder);

// POST 
router.post('/addtocart', customerController.postAddToCart);

// POST /customer/addorder
router.post('/addorder', customerController.postAddOrder);

// POSt /customer/addorder
router.post('/addcustomer', customerController.postAddCustomer);

module.exports = router;