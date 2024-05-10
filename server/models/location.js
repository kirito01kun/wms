const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  locationId: String,
  level: String,
  rack: String,
  isEmpty: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Location', locationSchema);