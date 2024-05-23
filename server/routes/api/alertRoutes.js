const express = require('express');
const router = express.Router();
const Alert = require('../../models/alert');

// GET all alerts
router.get('/display', async (req, res) => {
    try {
        const alerts = await Alert.find().exec();
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET alert by ID
router.get('/display/:id', async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id).exec();
        if (!alert) {
            return res.status(404).json({ message: 'Cannot find alert' });
        }
        res.json(alert);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE new alert
router.post('/add', async (req, res) => {
    const alert = new Alert({
        productId: req.body.productId,
        productName: req.body.productName,
        threshold: req.body.threshold,
        alertType: req.body.alertType,
    });

    try {
        const newAlert = await alert.save();
        res.status(201).json(newAlert);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update alert by ID
router.patch('/update/:id', async (req, res) => {
    try {
        const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!alert) {
            return res.status(404).json({ message: 'Cannot find alert' });
        }
        res.json(alert);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE alert by ID
router.delete('/del/:id', async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id).exec();
        if (!alert) {
            return res.status(404).json({ message: 'Cannot find alert' });
        }
        await alert.deleteOne();
        res.json({ message: 'Alert deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;