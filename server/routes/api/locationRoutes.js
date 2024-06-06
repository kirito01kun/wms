// routes/location.js

const express = require('express');
const router = express.Router();
const Location = require('../../models/location');
const kafkaProducer = require('../../kafkaProducer');

// Middleware to publish message to Kafka after database modification
const publishToKafka = async (req, res, next) => {
  res.on('finish', async () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      // Fetch the rack status
      try {
        const locations = await Location.find().sort({ level: -1 });
        const rackStatus = {};
        locations.forEach(location => {
          const { rack, isEmpty } = location;
          if (!rackStatus[rack]) {
            rackStatus[rack] = '';
          }
          rackStatus[rack] += isEmpty ? '0' : '1';
        });
        const rackStatusArray = Object.entries(rackStatus).map(([rack, status]) => `${rack}${status}`);

        // Send each value in rackStatusArray as a separate message to Kafka with a small delay
        for (const [index, status] of rackStatusArray.entries()) {
          setTimeout(async () => {
            await kafkaProducer.produceMessage('SquareColorViz', status);
          }, index * 3000); // Adjust the delay time as needed (1000 milliseconds = 1 second)
        }

      } catch (error) {
        console.error('Error fetching rack status:', error);
      }
    }
  });
  next();
};

// GET all locations
router.get('/display', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one location by locationId
router.get('/display/:locationId', getLocationByLocationId, (req, res) => {
  res.json(res.location);
});

// POST new location
router.post('/add', publishToKafka, async (req, res) => {
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

// GET location by pallet ID
router.get('/pallet/:palletId', async (req, res) => {
  try {
    const location = await Location.findOne({ pallet: req.params.palletId });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update location
router.patch('/update/:locationId', getLocationByLocationId, publishToKafka, async (req, res) => {
  try {
    const location = res.location;
    console.log('Received locationId:', req); // Log the received locationId
    // Update location fields
    if (req.body.locationId != null) {
      location.locationId = req.body.locationId;
    }
    if (req.body.level != null) {
      location.level = req.body.level;
    }
    if (req.body.rack != null) {
      location.rack = req.body.rack;
    }
    if (req.body.isEmpty != null) {
      location.isEmpty = req.body.isEmpty;
    }
    if (req.body.pallet != null) {
      location.pallet = req.body.pallet;
    }
    const updatedLocation = await location.save();
    res.json(updatedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete location by _id
router.delete('/del/:id', getLocationById, publishToKafka, async (req, res) => {
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
    const locations = await Location.find().sort({ level: -1 });
    const rackStatus = {};
    locations.forEach(location => {
      const { rack, isEmpty } = location;
      if (!rackStatus[rack]) {
        rackStatus[rack] = '';
      }
      rackStatus[rack] += isEmpty ? '0' : '1';
    });
    const rackStatusArray = Object.entries(rackStatus).map(([rack, status]) => `${rack}${status}`);
    res.json(rackStatusArray);
  } catch (err) {
    res.status500json({ message: err.message });
  }
});

async function getLocationByLocationId(req, res, next) {
  let location;
  try {
    location = await Location.findOne({ locationId: req.params.locationId });
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.location = location;
  next();
}

async function getLocationById(req, res, next) {
  let location;
  try {
    location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.location = location;
  next();
}

module.exports = router;
