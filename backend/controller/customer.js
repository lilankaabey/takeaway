const Customer = require('../model/customer');

const Restaurant = require('../model/restaurant');
const Product = require('../model/product');
const Cart = require('../model/cart');
const Order = require('../model/order');


exports.getSearchRestaurants = (req, res, next) => {
   const restauratLocation = req.params.location;
   
   Restaurant.find({town: restauratLocation})
      .then(restaurants => {
         if (!restaurants) {
            const error = new Error('Could not find the restaurants.');
            error.statusCode = 404;
            throw error;
         }
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

exports.getProducts = (req, res, next) => {
   const restaurantId = req.params.restaurantId;

   Product.find({restaurantId: restaurantId})
      .then(products => {
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


exports.getRestaurantDetails = (req, res, next) => {
   const restaurantId = req.params.restaurantId;

   Restaurant.findOne({_id: restaurantId})
      .then(result => {
         res.status(200).json({
            restaurant: result
         })
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(result => {
      if (!result) {
        const error = new Error('Could not find the product.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        product: result
      })

    })
    .catch(err => {
      if (!err.statusCode) {
         err.statusCode = 500;
      }
      next(err);
   });
};

////////////////////////////
///// Add to Cart  /////////
////////////////////////////

exports.postAddToCart = (req, res, next) => {
   const reqProductId = req.body.productId;
   const cartId = req.body.cartId;

   console.log(cartId);

   Product.findById(reqProductId)
      .then(product => {

         let newQuantity = 1;

         if (!cartId) {
            const cart = new Cart({
               items: [{
                  productId: product._id,
                  quantity: newQuantity
               }]
            })
            return cart.save();
         } else {
            let getCart;
            return Cart.findById(cartId)
               .then(cart => {
                  console.log('cart', cart);
                  if (cart) {
                     cart.items.push({ productId: product._id, quantity: newQuantity});

                     return cart.save();
                  }
               })
               // .then(result => {
               //    console.log(result);
               //    res.status(201).json({
               //       message: 'Product is added to the cart',
               //       cartId: result._id.toString(),
               //       cart: result
               //    });
               // })

         }

         // Bucket.find({'cart.items': { $elemMatch: {productId: product._id}}})
         // Bucket.aggregate( { $match : {'cart.items.productId': product._id}},
         //    { 
         //       $cart : {
         //          $item : {
         //             $indexOfArray : [
                  
         //                "$productId", product._id
         //             ]
         //          }
         //       }
         //    }
         // )
         // const cartProductIndex = Bucket.cart.items.findIndex(cp => {
         //    return cp.productId.toString() === product._id.toString();
         // });

         // console.log(cartProductIndex);
      
         // let newQuantity = 1;
      
         // const updatedCartItems = [...Cart.cart.items];
      
         // if (cartProductIndex >= 0) {
         //    newQuantity = Cart.cart.items[cartProductIndex].quantity + 1;
         //    updatedCartItems[cartProductIndex].quantity = newQuantity;
         // } else {
         //    updatedCartItems.push({
         //       productId: product._id,
         //       quantity: newQuantity
         //    });
         // }
      
         // const updatedCart = {
         //    items: updatedCartItems
         // };
      
         // Cart.cart = updatedCart;
         // return Cart.save();
      })
      .then(result => {
         console.log(result);
         res.status(201).json({
            message: 'Product is added to the cart',
            cartId: result._id.toString(),
            cart: result
         });
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });

   // Product

   
};


/////////////////////////////
///////// Get Cart /////////
////////////////////////////

exports.getCart = (req, res, next) => {
  const cartId = req.params.cartId;

  Cart.findById(cartId)
    .then(cart => {
      if (!cart) {
        const error = new Error('Could not find the cart.');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        cart: cart
      });
    })
    .catch(err => {
      if (!err.statusCode) {
         err.statusCode = 500;
      }
      next(err);
   });
}


///////////////////////////////
//////// Add Customer /////////
///////////////////////////////

exports.postAddCustomer = (req, res, next) => {
   const customer = new Customer({
      address: req.body.address,
      town: req.body.town,
      customerName: req.body.customerName,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      deliveryTime: req.body.deliveryTime
   });

   customer.save()
      .then(result => {
         res.status(201).json({
            customer: result
         });
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });

}


///////////////////////////////
///////// Add Order ///////////
///////////////////////////////

exports.postAddOrder = (req, res, next) => {
   const order = new Order({
      products: req.body.products,
      totalCost: req.body.totalCost,
      customer: req.body.customer,
      restaurantId: req.body.restaurantId
   })

   order.save()
      .then(order => {
         res.status(201).json({
            order: order
         });
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });
};


///////////////////////////////
/////////// Get Order /////////
///////////////////////////////

exports.getOrder = (req, res, next) => {
  const orderId = req.params.orderId;

  Order.findById(orderId)
    .then(order => {
      res.status(200).json({
        order: order
      });
    })
    .catch(err => {
      if (!err.statusCode) {
         err.statusCode = 500;
      }
      next(err);
   });
};