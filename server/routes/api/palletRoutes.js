const express = require('express');
const router = express.Router();
const Pallet = require('../../models/pallet');

// GET all pallets
router.get('/display', async (req, res) => {
    try {
        const pallets = await Pallet.find().exec();
        res.json(pallets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one pallet
router.get('/display/:id', getPallet, (req, res) => {
    res.json(res.pallet);
});

// POST new pallet
router.post('/add', async (req, res) => {

    const pallet = new Pallet({
        palletId: req.body.palletId,
        products: req.body.products // Assign the products array directly
    });

    try {
        const newPallet = await pallet.save();
        res.status(201).json(newPallet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Update pallet
router.patch('/update/:id', getPallet, async (req, res) => {
    if (req.body.palletId != null) {
        res.pallet.palletId = req.body.palletId;
    }
    if (req.body.products != null) {
        res.pallet.products = req.body.products;
    }
    try {
        const updatedPallet = await res.pallet.save();
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
