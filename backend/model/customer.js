const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
   address: {
      type: String,
      required: true
   },
   town: {
      type: String,
      required: true
   },
   customerName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   contactNumber: {
      type: Number,
      require: true
   },
   deliveryTime: {
      type: String,
      required: true
   },
   floor: {
      type: String
   },
   companyName: {
      type: String
   },
   remarks: {
      type: String
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   orders: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
   }],
   cartId: {
      type: Schema.Types.ObjectId,
      ref: 'Cart'
    }
});

module.exports = mongoose.model('customer', customerSchema);