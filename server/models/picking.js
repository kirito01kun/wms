const mongoose = require('mongoose');

const pickingSchema = new mongoose.Schema({
  palletId: String,
  pickType: String, // "full" or "loose"
  pickedProducts: [{
    productId: String,
    productName: String,
    quantityPicked: Number
  }],
  pickDateTime: Date
});

module.exports = mongoose.model('picking', pickingSchema);
