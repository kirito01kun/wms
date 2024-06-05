const express = require('express');
const router = express.Router();
const Pallet = require('../../models/pallet');
const Alert = require('../../models/alert');

// GET all pallets
router.get('/display', async (req, res) => {
    try {
        const pallets = await Pallet.find().exec();
        res.json(pallets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one pallet by palletId
router.get('/display/:palletId', getPalletByPalletId, (req, res) => {
    res.json(res.pallet);
});

async function getPalletByPalletId(req, res, next) {
    let pallet;
    try {
        pallet = await Pallet.findOne({ palletId: req.params.palletId });
        if (pallet == null) {
            return res.status(404).json({ message: 'Cannot find pallet' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.pallet = pallet;
    next();
}

// POST new pallet
router.post('/add', async (req, res) => {
    console.log('Received POST request to add new pallet:', req.body);
    const pallet = new Pallet({
        palletId: req.body.palletId,
        products: req.body.products
    });

    try {
        const newPallet = await pallet.save();
        await checkAlerts(newPallet); // Check alerts after saving
        res.status(201).json(newPallet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update pallet
router.patch('/update/:palletId', getPalletByPalletId, async (req, res) => {
    try {
        const pallet = res.pallet;
        console.log('Received palletId:', req.params.palletId); // Log the received palletId

        // Update pallet fields
        if (req.body.palletId != null) {
            pallet.palletId = req.body.palletId;
        }
        if (req.body.products != null) {
            pallet.products = req.body.products;
        }
        if (req.body.isPlaced != null) {
            pallet.isPlaced = req.body.isPlaced;
        }

        const updatedPallet = await pallet.save();
        res.json(updatedPallet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete pallet
router.delete('/del/:id', getPallet, async (req, res) => {
    try {
        await res.pallet.deleteOne();
        res.json({ message: 'Pallet deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getPallet(req, res, next) {
    let pallet;
    try {
        pallet = await Pallet.findById(req.params.id);
        if (pallet == null) {
            return res.status(404).json({ message: 'Cannot find pallet' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.pallet = pallet;
    next();
}

module.exports = router;
