const mongoose = require('mongoose');

const palletSchema = new mongoose.Schema({
  palletId: String,
  products: [{
    productId: String,
    productName: String,
    quantity: Number
  }]
});

module.exports = mongoose.model('pallet', palletSchema);