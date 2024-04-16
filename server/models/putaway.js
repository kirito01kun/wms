const mongoose = require('mongoose');

const putawaySchema = new mongoose.Schema({
  palletId: {
    type: String,
  },
  location: {
    type: String,
  },
  timestamp: {
    type: Date,
  }
});

module.exports = mongoose.model('putaway', putawaySchema);
