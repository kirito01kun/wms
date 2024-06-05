// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const palletRoutes = require('./routes/api/palletRoutes');
const alertRoutes = require('./routes/api/alertRoutes');
const locationRoutes = require('./routes/api/locationRoutes');
const locationTransferRoutes = require('./routes/api/locationTransferRoutes');
const shipementRoutes = require('./routes/api/shipementRoutes');
const pickingRoutes = require('./routes/api/pickingRoutes');
const putawayRoutes = require('./routes/api/putawayRoutes');
const Pallet = require('./models/pallet');
const Alert = require('./models/alert');
const Shipment = require('./models/shipment');
const Location = require('./models/location');
const Putaway = require('./models/putaway');
const LocationTransfer = require('./models/locationTransfer');
const Picking = require('./models/picking');
const kafkaProducer = require('./kafkaProducer'); // Import the Kafka producer

// Create collections if they don't exist
Pallet.createCollection();
Alert.createCollection();
Shipment.createCollection();
Location.createCollection();
Putaway.createCollection();
LocationTransfer.createCollection();
Picking.createCollection();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use("/api/pallets", palletRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/locationTransfers", locationTransferRoutes);
app.use("/api/shipments", shipementRoutes);
app.use("/api/pickings", pickingRoutes);
app.use("/api/putaways", putawayRoutes);
app.use("/api/alerts", alertRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Harmony_PFE')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Inventory Management API!');
});

const startServer = async () => {
  try {
    await kafkaProducer.connect(); // Connect the Kafka producer
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();