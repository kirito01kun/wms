const express = require('express');
const router = express.Router();
const Putaway = require('../../models/putaway');
const Pallet = require('../../models/pallet')
const Location = require('../../models/location');


// GET all putaway records
router.get('/display', async (req, res) => {
    try {
        const putaways = await Putaway.find();
        res.json(putaways);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one putaway record by ID
router.get('/display/:id', getPutaway, (req, res) => {
    res.json(res.putaway);
});


// POST new putaway record
router.post('/add', async (req, res) => {
    const { palletId, locationId } = req.body;

    const putaway = new Putaway({
        palletId,
        location: locationId,
        timestamp: new Date()
    });

    try {
        const newPutaway = await putaway.save();

        // Update the location's isEmpty field to false
        const locationDoc = await Location.findOne({ locationId: locationId });
        if (locationDoc) {
            locationDoc.isEmpty = false;
            await locationDoc.save();
        } else {
            return res.status(404).json({ message: 'Location not found' });
        }

        // Update the pallet's isPlaced field to true
        const palletDoc = await Pallet.findOne({ palletId: palletId });
        if (palletDoc) {
            palletDoc.isPlaced = true;
            await palletDoc.save();
        } else {
            return res.status(404).json({ message: 'Pallet not found' });
        }

        res.status(201).json(newPutaway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// PATCH update putaway record
router.patch('/update/:id', getPutaway, async (req, res) => {
    if (req.body.location != null) {
        res.putaway.location = req.body.location;
    }
    try {
        const updatedPutaway = await res.putaway.save();
        res.json(updatedPutaway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE putaway record
router.delete('/del/:id', getPutaway, async (req, res) => {
    try {
        await res.putaway.deleteOne();
        res.json({ message: 'Putaway deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getPutaway(req, res, next) {
    let putaway;
    try {
        putaway = await Putaway.findById(req.params.id);
        if (putaway == null) {
            return res.status(404).json({ message: 'Cannot find putaway' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.putaway = putaway;
    next();
}

module.exports = router;
