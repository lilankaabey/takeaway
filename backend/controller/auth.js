const { validationResult } = require('express-validator');

const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

////////////////////////////////////
/////////// User SignUp  ///////////
//////////////////////////////////// 

exports.signup = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
   }
   const email = req.body.email;
   const password = req.body.password;
   const userType = req.body.userType;

   bcrypt.hash(password, 12)
      .then(hashedPassword => {
         const user = new User({
            email: email,
            password: hashedPassword,
            userType: userType
         });

         return user.save();
      })
      .then(result => {
         res.status(201).json({
            message: 'User created',
            userId: result._id.toString()
         });
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });

};

////////////////////////////////////////


////////////////////////////////////
/////////// User LogIn  ////////////
////////////////////////////////////

exports.login = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;
   const userType = req.body.userType;
   let loadedUser;
   User.findOne({email: email})
      .then(user => {
         if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
         }
         loadedUser = user;
         return (bcrypt.compare(password, user.password) && (userType === user.userType));
      })
      .then(isEqual => {
         if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
         }

         const token = jwt.sign({
               email: loadedUser.email,
               userType: loadedUser.userType,
               userId: loadedUser._id.toString()
            }, 'secretcredentials', { expiresIn: '1h' }
         );

         if (loadedUser.userType === 'restaurant') {
            res.status(200).json({
               token: token,
               userId: loadedUser._id.toString(),
               userType: loadedUser.userType,
               restaurantId: loadedUser.restaurantId.toString(),
               expiresIn: 3600
            });
         } else if (loadedUser.userType === 'customer') {
            res.status(200).json({
               token: token,
               userId: loadedUser._id.toString(),
               userType: loadedUser.userType,
               customerId: loadedUser.customerId.toString(),
               expiresIn: 3600
            });
         } else {
            res.status(200).json({
               token: token,
               userId: loadedUser._id.toString(),
               userType: loadedUser.userType,
               expiresIn: 3600
            });
         }
         
      })
      .catch(err => {
         if (!err.statusCode) {
            err.statusCode = 500;
         }
         next(err);
      });
}