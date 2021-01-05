const fs = require('fs');
const path = require('path');

// const { validationResult } = require('express-validator');

const Restaurant = require('../model/restaurant');
const user = require('../model/user');

/////////////////////////////
//// To get Restaurants /////
/////////////////////////////
exports.getRestaurants = (req, res, next) => {
   Restaurant.find()
      .then(restaurants => {
         res.status(200).json({
            restaurants: restaurants
         })
      })
      .catch(err => {
      if (!err.statusCode) {
         err.statusCode = 500;
      }
      next(err);
   });

}

///////////////////////////////////
//// To add single restaurant /////
///////////////////////////////////
exports.addRestaurant = (req, res, next) => {
   /* const errors = validationResult(req);
   if (!errors.isEmpty()) {
      const error = new Error('validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
      // return res.status(422).json({
      //    message: 'validation failed, entered data is incorrect.',
      //    errors: errors.array()
      // });
   } */
   // To check image provided or not, if not so, throw the error
   if (!req.file) {
      const error= new Error('No image provided.');
      error.statusCode = 422;
      throw error;
   }

   //const imagePath = req.file.path;
   let addRestaurantId;
   // Add Restaurant in DB
   const restaurant = new Restaurant({
      ownerName: req.body.ownerName,
      restaurantName: req.body.restaurantName,
      email: req.body.email,
      imagePath: req.file.path,
      town: req.body.town,
      street: req.body.street,
      houseNumber: req.body.houseNumber,
      contactNumber: req.body.contactNumber,
      deliveryTime: req.body.deliveryTime,
      deliveryStatus: req.body.deliveryStatus,
      minAmount: +req.body.minAmount,
      description: req.body.description,
      createrId: req.userId,
      userId: req.body.userId
   });

   restaurant.save()
      .then(result => {
         addRestaurantId = result._id;
         return user.findOne({_id: req.body.userId});
      })
      .then(user => {
         user.restaurantId = addRestaurantId;
         return user.save();
      })
      .then(response => {
         res.status(201).json({
            message: 'Restaurant added Successfully',
            restaurant: response
         });
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });
};

/////////////////////////////////////////


//////////////////////////////////////////////////////////////
//// To clear the uploaded image when updated or deleted  ////
//////////////////////////////////////////////////////////////
const clearImage = filePath => {
   filePath = path.join(__dirname, '..', filePath);
   fs.unlink(filePath, err => console.log(err));
};

//////////////////////////////////////////////////////////////


//////////////////////////////////////
//// To update single restaurant /////
//////////////////////////////////////
exports.updateRestaurant = (req, res, next) => {
   const restaurantId = req.params.restaurantId;

   /* const errors = validationResult(req);
   if (!errors.isEmpty()) {
      const error = new Error('validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
   } */

   let imagePath = req.body.imagePath;

   if (req.file) {
      imagePath = req.file.path;
   }
   if (!imagePath) {
      const error= new Error('No image provided.');
      error.statusCode = 422;
      throw error;
   }


   const ownerName = req.body.ownerName;
   const email = req.body.email;
   const restaurantName = req.body.restaurantName;
   const updatedImagePath = imagePath;
   const town = req.body.town;
   const street = req.body.street;
   const houseNumber = req.body.houseNumber;
   const contactNumber = req.body.contactNumber;
   const deliveryTime = req.body.deliveryTime;
   const deliveryStatus = req.body.deliveryStatus;
   const minAmount = +req.body.minAmount;
   const description = req.body.description;
   

   Restaurant.findById(restaurantId)
      .then( restaurant => {
         if (!restaurant) {
            const error = new Error('Could not find the restaurant.');
            error.statusCode = 404;
            throw error;
         }

         if (imagePath !== restaurant.imagePath) {
            clearImage(restaurant.imagePath);
         }

         restaurant.ownerName = ownerName;
         restaurant.email = email;
         restaurant.restaurantName = restaurantName;
         restaurant.imagePath = updatedImagePath;
         restaurant.town = town;
         restaurant.street = street;
         restaurant.houseNumber = houseNumber;
         restaurant.contactNumber = contactNumber;
         restaurant.deliveryTime = deliveryTime;
         restaurant.deliveryStatus = deliveryStatus;
         restaurant.minAmount = minAmount;
         restaurant.description = description;
         return restaurant.save();
      })
      .then( result => {
         res.status(200).json({
            message: 'Restaurant Updated!',
            restaurant: result
         });
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });

};

///////////////////////////////////


//////////////////////////////////////
//// To delete single restaurant /////
//////////////////////////////////////
exports.deleteRestaurant = (req, res, next) => {
   const restaurantId = req.params.restaurantId;

   Restaurant.findById(restaurantId)
      .then(restaurant => {
         if (!restaurant) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
         }
         //Check logged in user :: to make sure the current login user created this restaurant

         //clear the image
         clearImage(restaurant.imagePath);

         return restaurant.findByIdAndRemove(restaurantId);
      })
      .then( result => {
         console.log(result);
         res.status(200).json({
            message: 'Deleted Restaurant Scuccessfully!'
         })
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });
};


///////////////////////////////////
//// To get single restaurant /////
///////////////////////////////////
exports.getRestaurant = (req, res, next) => {
   const restaurantId = req.params.restaurantId;

   Restaurant.findById(restaurantId)
      .then( restaurant => {
         if (!restaurant) {
            const error = new Error('Could not find restaurant.');
            error.statusCode = 404;
            throw error;
         }
         res.status(200).json(
            // if we want to we can pass the message, but here I pass the data only
            restaurant
         )
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });
};

exports.setRestaurantIdtoUser = (req, res, next) => {
   const restaurantEmail = req.params.email;
   console.log(restaurantEmail);
   let restaurantId;
   // get email instead of userId:creater ID
   Restaurant.findOne({email: restaurantEmail})
      .then(restaurant => {
         if (!restaurant) {
            const error = new Error('Could not find Restaurant!.');
            error.statusCode = 404;
            throw error;
         }

         restaurantId = restaurant._id;

         return user.findOne({email: restaurant.email});
      })
      .then(user => {
         if (!user) {
            const error = new Error('Could not find user!.');
            error.statusCode = 404;
            throw error;
         }

         user.restaurantId = restaurantId;

         return user.save();
      })
      .then(result => {
         res.status(200).json({
            message: 'Restaurant Id is added to User model!'
         });
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });
};