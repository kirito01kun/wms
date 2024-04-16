const express = require('express');
const router = express.Router();
const Shipment = require('../../models/shipment');

// GET all shipments
router.get('/display', async (req, res) => {
    try {
        const shipments = await Shipment.find();
        res.json(shipments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one shipment
router.get('/display/:id', getShipment, (req, res) => {
    res.json(res.shipment);
});

// POST new shipment
router.post('/add', async (req, res) => {
    const shipment = new Shipment({
        shipmentId: req.body.shipmentId,
        arrivalDateTime: req.body.arrivalDateTime,
        productsReceived: req.body.productsReceived
    });
    try {
        const newShipment = await shipment.save();
        res.status(201).json(newShipment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update shipment
router.patch('/update/:id', getShipment, async (req, res) => {
    if (req.body.shipmentId != null) {
        res.shipment.shipmentId = req.body.shipmentId;
    }
    if (req.body.arrivalDateTime != null) {
        res.shipment.arrivalDateTime = req.body.arrivalDateTime;
    }
    if (req.body.productsReceived != null) {
        res.shipment.productsReceived = req.body.productsReceived;
    }
    try {
        const updatedShipment = await res.shipment.save();
        res.json(updatedShipment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete shipment
router.delete('/del/:id', getShipment, async (req, res) => {
    try {
        await res.shipment.deleteOne();
        res.json({ message: 'Shipment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getShipment(req, res, next) {
    let shipment;
    try {
        shipment = await Shipment.findById(req.params.id);
        if (shipment == null) {
            return res.status(404).json({ message: 'Cannot find shipment' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.shipment = shipment;
    next();
}

module.exports = router;
