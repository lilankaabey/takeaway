const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
   ownerName: {
      type: String,
      required: true
   },
   user: {
      type: Object,
      required: true
   },
   restaurantName: {
      type: String,
      required: true
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
      type: Number,
      required: true
   },
   description: {
      type: String,
      required: true
   }
});

module.exports = mongoose.model('restaurant', restaurantSchema);