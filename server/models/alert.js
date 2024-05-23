const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    // userId: { type: String, required: true },
    productId: { type: String, required: true },
    productName: { type: String },
    threshold: { type: Number, required: true },
    alertType: { type: String, enum: ['normal', 'warning', 'critical'], default: 'normal' },
    isActive: { type: Boolean, default: true },
    lastTriggered: { type: Date },
}, {
    timestamps: true
});

module.exports = mongoose.model('alert', alertSchema);