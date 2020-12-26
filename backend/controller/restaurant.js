const fs = require('fs');
const path = require('path');
const restaurant = require('../model/restaurant');

// const { validationResult } = require('express-validator/check');

const Restaurant = require('../model/restaurant');

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

   /* const restaurants = [
      {
         _id: 'dajdq4a5d456addasd',
         ownerName: 'Rahal Alwis',
         user: {
            _id: 'maba7488dadadwsdac',
            email:'alwis@gmail.com',
            password: 'asdaead',
            type: 'restaurant'
            },
         restaurantName: 'Kadira Cafe',
         imagePath: 'https://static.lieferando.de/images/restaurants/de/0ON1NQ5N/logo_465x320.png',
         town: 'Matara',
         street: 'Dharmapala Mawatha',
         houseNumber: '128',
         contactNumber: 745211521,
         description: 'Description is here'
      },
      {
         _id: 'dpekadna78455a2adasd',
         ownerName: 'Kumara Athapaththu',
         user: {
            _id: 'rtr4552144dadwsdac',
            email:'kumara@gmail.com',
            password: 'pass123456',
            type: 'restaurant'
            },
         restaurantName: 'Mayura Hotel',
         imagePath: 'https://static.lieferando.de/images/restaurants/de/0ON1NQ5N/logo_465x320.png',
         town: 'Matara',
         street: 'Beach Road',
         houseNumber: '42',
         contactNumber: 7457456821,
         description: 'Description is here what?'
      }
   ];

   
   res.status(200).json({
      restaurants: restaurants
   }); */
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
   /* if (!req.file) {
      const error= new Error('No image provided.');
      error.statusCode = 422;
      throw error;
   } */

   //const imagePath = req.file.path;

   // Add Restaurant in DB
   const restaurant = new Restaurant({
      ownerName: req.body.ownerName,
      user: req.body.user,
      restaurantName: req.body.restaurantName,
      imagePath: req.body.imagePath,
      town: req.body.town,
      street: req.body.street,
      houseNumber: req.body.houseNumber,
      contactNumber: req.body.contactNumber,
      description: req.body.description
   });

   restaurant.save().then(result => {
      console.log(result);
      res.status(201).json({
         message: 'Restaurant added Successfully',
         restaurant: result
      });

   }).catch(err => {
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
      // return res.status(422).json({
      //    message: 'validation failed, entered data is incorrect.',
      //    errors: errors.array()
      // });
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
   const user = req.body.user;
   const restaurantName = req.body.restaurantName;
   const town = req.body.town;
   const street = req.body.street;
   const houseNumber = req.body.houseNumber;
   const contactNumber = req.body.contactNumber;
   const description = req.body.description;
   

   Restaurant.findById(restaurantId)
      .then( restaurant => {
         if (!restaurant) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
         }

         if (imagePath !== restaurant.imagePath) {
            clearImage(restaurant.imagePath);
         }

         restaurant.ownerName = ownerName;
         restaurant.user = user;
         restaurant.restaurantName = restaurantName;
         restaurant.imagePath = imagePath;
         restaurant.town = town;
         restaurant.street = street;
         restaurant.houseNumber = houseNumber;
         restaurant.contactNumber = contactNumber;
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
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
         }
         res.status(200).json({
            // if we want to we can pass the message, but here I pass the data only
            restaurant
         })
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });
};