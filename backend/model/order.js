const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   products: [{
      product: {
         type: Object,
         required: true
      },
      quantity: {
         type: Number,
         required: true
      },
      productsCost: {
         type: Number,
         required: true
      }
   }],
   totalCost: {
      type: Number,
      required: true
   },
   customer: {
      type: Object,
      required: true
   },
   restaurantId: {
      type: Schema.Types.ObjectId,
      required: true
   }
});

module.exports = mongoose.model('Order', orderSchema);