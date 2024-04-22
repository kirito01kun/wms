const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  locationId: String,
  level: String,
  rack: String,
  isEmpty: {
    type: Boolean,
    default: true // By default, assume the location is empty
  }
});

module.exports = mongoose.model('Location', locationSchema);