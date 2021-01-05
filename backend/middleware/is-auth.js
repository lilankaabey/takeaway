const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   // check header is set, otherwise throw the error
   const authHeader = req.get('Authorization');
   if (!authHeader) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
   }

   const token = req.headers.authorization.split(' ')[1];
   let decodedToken;

   try {
      decodedToken = jwt.verify(token, 'secretcredentials');
   } catch (err) {
      err.statusCode = 500;
      throw err;
   }

   if(!decodedToken) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
   }

   req.userId = decodedToken.userId;
   next();
}