const mongoose = require('mongoose');

const locationTransferSchema = new mongoose.Schema({
  palletId: String,
  sourceLocation: String,
  destinationLocation: String,
  transferDateTime: Date
});

module.exports = mongoose.model('locationTransfer', locationTransferSchema);
