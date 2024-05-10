const mongoose = require('mongoose');

const putawaySchema = new mongoose.Schema({
  palletId: String,
  location: String,
  timestamp: Date,
});

module.exports = mongoose.model('putaway', putawaySchema);