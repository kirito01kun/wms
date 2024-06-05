// models/pallet.js
const mongoose = require('mongoose');

const palletSchema = new mongoose.Schema({
  palletId: String,
  products: [{
    productId: String,
    productName: String,
    quantity: Number
  }],
  isPlaced: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('pallet', palletSchema);
