const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
   ownerName: {
      type: String,
      required: true
   },
   restaurantName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      require: true
   },
   imagePath: {
      type: String,
      required: true
   },
   town: {
      type: String,
      required: true
   },
   street: {
      type: String,
      required: true
   },
   houseNumber: {
      type: String,
      required: true
   },
   contactNumber: {
      type: String,
      required: true
   },
   deliveryTime: {
      type: String,
      required: true
   },
   deliveryStatus: {
      type: String,
      require: true
   },
   minAmount: {
      type: Number,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   createrId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
   }],
   orders: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
   }]
});

module.exports = mongoose.model('restaurant', restaurantSchema);