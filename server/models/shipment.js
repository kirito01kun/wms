const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  shipmentId: String,
  arrivalDateTime: Date,
  productsReceived: [{
    productId: String,
    productName: String,
    quantityReceived: Number
  }]
});

module.exports = mongoose.model('shipment', shipmentSchema);
