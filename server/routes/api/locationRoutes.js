const express = require('express');
const router = express.Router();
const Location = require('../../models/location');

// GET all locations
router.get('/display', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one location
router.get('/displa/:id', getLocation, (req, res) => {
    res.json(res.location);
});

// POST new location
router.post('/add', async (req, res) => {
    const location = new Location({
        locationId: req.body.locationId,
        level: req.body.level,
        rack: req.body.rack,
        isEmpty: true
    });
    try {
        const newLocation = await location.save();
        res.status(201).json(newLocation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Update location
router.patch('/update/:id', getLocation, async (req, res) => {
    try {
        // Get the location from the middleware
        const location = res.location;

        if (req.body.locationId) {
            location.locationId = req.body.locationId;
        }
        if (req.body.level) {
            location.level = req.body.level;
        }
        if (req.body.rack) {
            location.rack = req.body.rack;
        }
        if (req.body.isEmpty !== undefined) {
            location.isEmpty = req.body.isEmpty;
        }

        // Save the updated location
        const updatedLocation = await location.save();
        res.json(updatedLocation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Delete location
router.delete('/del/:id', getLocation, async (req, res) => {
    try {
        await res.location.deleteOne();
        res.json({ message: 'Location deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all locations in all racks
router.get('/rackstatus', async (req, res) => {
    try {
        // Fetch all locations sorted by level descendingly
        const locations = await Location.find().sort({ level: -1 });
        
        // Initialize an object to store rack statuses
        const rackStatus = {};
        
        // Iterate through locations
        locations.forEach(location => {
            // Extract rack name and location status
            const { rack, isEmpty } = location;
            
            // Initialize the rack if not already present
            if (!rackStatus[rack]) {
                rackStatus[rack] = '';
            }
            
            // Append location status to rack status
            rackStatus[rack] += isEmpty ? '0' : '1';
        });
        
        // Convert rack status object to array of strings
        const rackStatusArray = Object.entries(rackStatus).map(([rack, status]) => `${rack}${status}`);
        
        res.json(rackStatusArray);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



async function getLocation(req, res, next) {
    let location;
    try {
        location = await Location.findById(req.params.id);
        if (location == null) {
            return res.status(404).json({ message: 'Cannot find location' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.location = location;
    next();
}

module.exports = router;
