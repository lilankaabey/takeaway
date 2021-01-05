const express = require('express');
const { body } = require('express-validator');

const User = require('../model/user');
const authController = require('../controller/auth');

const router = express. Router();


// To signup user
router.put('/signup', [
      body('email')
         .isEmail()
         .withMessage('Please enter a valid email')
         .custom((value, { req }) => {
            return User.findOne({email: value}).then(userDoc => {
               if(userDoc) {
                  return Promise.reject('E-mail address already exists!');
               }
            });
         })
         .normalizeEmail(),
      body('password')
         .trim()
         .isLength({min: 8}),
      body('userType')
         .trim()
         .not()
         .isEmpty()
   ],
   authController.signup
);

// To login user
router.post('/login', authController.login);

module.exports = router;