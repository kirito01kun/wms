const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  locationId: String,
  level: String,
  rack: String
});

module.exports = mongoose.model('location', locationSchema);
