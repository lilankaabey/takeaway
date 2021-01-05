const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   userType: {
      type: String,
      required: true
   },
   customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
   },
   restaurantId: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant'
   }
});

module.exports = mongoose.model('User', userSchema);