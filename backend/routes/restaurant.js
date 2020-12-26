const express = require('express');
// const { body } = require("express-validator/check");

const restaurantController = require('../controller/restaurant');

const router = express.Router();

//GET /restaurant/foods
// router.get('/foods', restaurantController.getFoods);

// router.post('/food', restaurantController.createFood);

//GET /admin/restaurants   ::to get all restaurants 
router.get('/restaurants', restaurantController.getRestaurants);
//GET /admin/restaurant/:restaurantId  ::to get a single resturant (info)
router.get('/restaurant/:restaurantId', restaurantController.getRestaurant);

//POST /admin/add-restaurant   ::to add a single restaurant
router.post('/add-restaurant', restaurantController.addRestaurant);
   // validataion [body('ownerName').trim().isLength( {min: 5} ), body('restaurantName').trim()]

//PUT /admin/edit-restaurant/:restaurantId  ::to update a single restaurant (info)
router.put('/edit-restaurant/:restaurantId', restaurantController.updateRestaurant);

//DELETE /admin/delete-restaurant/::restaurantId  ::to delete a single restaurant
router.delete('/delete-restaurant/::restaurantId', restaurantController.deleteRestaurant);




module.exports = router;