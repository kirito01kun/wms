const express = require('express');
const router = express.Router();
const LocationTransfer = require('../../models/locationTransfer');

// GET all location transfers
router.get('/display', async (req, res) => {
    try {
        const locationTransfers = await LocationTransfer.find();
        res.json(locationTransfers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one location transfer
router.get('/display/:id', getLocationTransfer, (req, res) => {
    res.json(res.locationTransfer);
});

// POST new location transfer
router.post('/add', async (req, res) => {
    const locationTransfer = new LocationTransfer({
        palletId: req.body.palletId,
        sourceLocation: req.body.sourceLocation,
        destinationLocation: req.body.destinationLocation,
        transferDateTime: req.body.transferDateTime
    });
    try {
        const newLocationTransfer = await locationTransfer.save();
        res.status(201).json(newLocationTransfer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update location transfer
router.patch('/update/:id', getLocationTransfer, async (req, res) => {
    if (req.body.palletId != null) {
        res.locationTransfer.palletId = req.body.palletId;
    }
    if (req.body.sourceLocation != null) {
        res.locationTransfer.sourceLocation = req.body.sourceLocation;
    }
    if (req.body.destinationLocation != null) {
        res.locationTransfer.destinationLocation = req.body.destinationLocation;
    }
    if (req.body.transferDateTime != null) {
        res.locationTransfer.transferDateTime = req.body.transferDateTime;
    }
    try {
        const updatedLocationTransfer = await res.locationTransfer.save();
        res.json(updatedLocationTransfer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete location transfer
router.delete('/del/:id', getLocationTransfer, async (req, res) => {
    try {
        await res.locationTransfer.deleteOne();
        res.json({ message: 'Location transfer deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getLocationTransfer(req, res, next) {
    let locationTransfer;
    try {
        locationTransfer = await LocationTransfer.findById(req.params.id);
        if (locationTransfer == null) {
            return res.status(404).json({ message: 'Cannot find location transfer' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.locationTransfer = locationTransfer;
    next();
}

module.exports = router;
