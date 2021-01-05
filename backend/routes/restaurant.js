const express = require('express');
// const { body } = require("express-validator/check");

const restaurantController = require('../controller/restaurant');

const router = express.Router();

const isAuth = require('../middleware/is-auth');



//GET /admin/restaurants   ::to get all restaurants 
router.get('/restaurants', isAuth, restaurantController.getRestaurants);
//GET /admin/restaurant/:restaurantId  ::to get a single resturant (info)
router.get('/restaurant/:restaurantId', isAuth, restaurantController.getRestaurant);
//Get /admin/restaurant/setUserId  ::to set userId
router.get('/set-restaurant-id/:email', isAuth, restaurantController.setRestaurantIdtoUser);

//POST /admin/restaurant/add   ::to add a single restaurant
router.post('/restaurant/add', isAuth, restaurantController.addRestaurant);
   // validataion [body('ownerName').trim().isLength( {min: 5} ), body('restaurantName').trim()]

//PUT /admin/edit-restaurant/:restaurantId  ::to update a single restaurant (info)
router.put('/restaurant/edit/:restaurantId', isAuth, restaurantController.updateRestaurant);

//DELETE /admin/delete-restaurant/::restaurantId  ::to delete a single restaurant
router.delete('/restaurant/delete/:restaurantId', isAuth, restaurantController.deleteRestaurant);




module.exports = router;