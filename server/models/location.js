// models/location.js

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  locationId: String,
  level: String,
  rack: String,
  isEmpty: {
    type: Boolean,
    default: true
  },
  pallet: {
    type: String,
    ref: 'Pallet',
    default: null
  }
});

module.exports = mongoose.model('Location', locationSchema);
