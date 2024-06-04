const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: String,
    productName: String,
    quantity: Number,
    status: {
        type: String,
        enum: ['complete', 'partial', 'not_received'],
        default: 'not_received'
    }
});

const shipmentSchema = new mongoose.Schema({
    shipmentId: String,
    arrivalDateTime: Date,
    expectedArrivalDateTime: Date,
    supplier: String,
    products: [productSchema]
});

module.exports = mongoose.model('shipment', shipmentSchema);
