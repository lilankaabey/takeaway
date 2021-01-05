// const { validationResult } = require('express-validator');
const Product = require('../model/product');
const Restaurant = require('../model/restaurant');


//////////////////////////////
//// To get All Products /////
//////////////////////////////
exports.getProducts = (req, res, next) => {
   const userId = req.userId;
   Product.find({userId: userId})
      .then(products => {
         if (!products) {
            const error = new Error('Could not find any products.');
            error.statusCode = 404;
            throw error;
         }
         res.status(200).json({
            products: products
         })
      })
      .catch(err => {
      if (!err.statusCode) {
         err.statusCode = 500;
      }
      next(err);
   });
};

//////////////////////////////////


///////////////////////////////
//// To add single product ////
///////////////////////////////
exports.addProduct = (req, res, next) => {
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

   const userId = req.userId;
   let foundRestaurant;
   let product;
   /// To get restaurant ID
   Restaurant.findOne({userId: userId})
      .then( restaurant => {
        if (!restaurant) {
          const error = new Error('Could not find restaurant.');
          error.statusCode = 404;
          throw error;
        }

        foundRestaurant = restaurant;

        product = new Product({
          name: req.body.name,
          category: req.body.category,
          price: req.body.price,
          description: req.body.description,
          userId: userId,
          restaurantId: foundRestaurant._id
        });

        return product.save();
         
      })
      .then(result => {
        foundRestaurant.products.push(product);
        return foundRestaurant.save();
      })
      .then(result => {
         
         res.status(201).json({
            message: 'Product added Successfully',
            product: product
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


//////////////////////////////////////
//// To update single product /////
//////////////////////////////////////
exports.updateProduct = (req, res, next) => {
   const productId = req.params.productId;
   

   /* const errors = validationResult(req);
   if (!errors.isEmpty()) {
      const error = new Error('validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
   } */


   // Here, the constant product values are updated from req.body
   const name = req.body.name;
   const category = req.body.category;
   const price = req.body.price;
   const description = req.body.description;

   Product.findById(productId)
      .then( product => {
         if (!product) {
            const error = new Error('Could not find product.');
            error.statusCode = 404;
            throw error;
         }
         // Here, the current product values are updated from above constants
         product.name = name;
         product.category = category;
         product.price = price;
         product.description = description;
         return product.save();

      })
      .then( result => {
         res.status(200).json({
            message: 'Restaurant Updated!',
            product: result
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


///////////////////////////////////
//// To delete single product /////
///////////////////////////////////
exports.deleteProduct = (req, res, next) => {
   const productId = req.params.productId;

   let restaurantId;

   Product.findById(productId)
      .then(product => {
         if (!product) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
         }
         //Check logged in user :: to make sure the current login user created this restaurant
         restaurantId = product.restaurantId;
         console.log(restaurantId);


         return Product.findByIdAndRemove(productId);
      })
      .then( result => {
         return Restaurant.findById(restaurantId);
      })
      .then(restaurant => {
         restaurant.products.pull(productId);
         return restaurant.save();
      })
      .then(result => {
         // console.log(result);
         res.status(200).json({
            message: 'Deleted Product Scuccessfully!'
         })
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });
};


////////////////////////////////
//// To get single Product /////
////////////////////////////////
exports.getProduct = (req, res, next) => {
   const productId = req.params.productId;

   Product.findById(productId)
      .then( product => {
         if (!product) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
         }
         res.status(200).json({
            // if we want to we can pass the message, but here I pass the data only
            product: product
         })
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });
};


/// To get Restaurant Id

exports.getRestaurantId = (req, res, next) => {
   Restaurant.findOne({userId: req.userId})
      .then(restaurant => {
         if (!restaurant) {
            const error = new Error('Could not find restaurant.');
            error.statusCode = 404;
            throw error;
         }
         res.status(200).json({
            restaurantId: restaurant._id
         })
      });
}