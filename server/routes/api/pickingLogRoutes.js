const express = require('express');
const router = express.Router();
const PickingLog = require('../../models/pickingLog');

// GET all picking logs
router.get('/display', async (req, res) => {
    try {
        const pickingLogs = await PickingLog.find();
        res.json(pickingLogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single picking log by ID
router.get('/display/:id', getPickingLog, (req, res) => {
    res.json(res.pickingLog);
});

// POST a new picking log
router.post('/add', async (req, res) => {
    const pickingLog = new PickingLog({
        palletId: req.body.palletId,
        pickType: req.body.pickType,
        pickedProducts: req.body.pickedProducts,
        pickDateTime: req.body.pickDateTime
    });
    try {
        const newPickingLog = await pickingLog.save();
        res.status(201).json(newPickingLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH (update) a picking log by ID
router.patch('/update/:id', getPickingLog, async (req, res) => {
    if (req.body.palletId != null) {
        res.pickingLog.palletId = req.body.palletId;
    }
    if (req.body.pickType != null) {
        res.pickingLog.pickType = req.body.pickType;
    }
    if (req.body.pickedProducts != null) {
        res.pickingLog.pickedProducts = req.body.pickedProducts;
    }
    if (req.body.pickDateTime != null) {
        res.pickingLog.pickDateTime = req.body.pickDateTime;
    }
    try {
        const updatedPickingLog = await res.pickingLog.save();
        res.json(updatedPickingLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// DELETE a picking log by ID
router.delete('/del/:id', getPickingLog, async (req, res) => {
    try {
        await res.pickingLog.deleteOne();
        res.json({ message: 'Picking log deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getPickingLog(req, res, next) {
    let pickingLog;
    try {
        pickingLog = await PickingLog.findById(req.params.id);
        if (pickingLog == null) {
            return res.status(404).json({ message: 'Cannot find picking log' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.pickingLog = pickingLog;
    next();
}

module.exports = router;
