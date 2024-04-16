const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const palletRoutes = require('./routes/api/palletRoutes');
const locationRoutes = require('./routes/api/locationRoutes');
const locationTransferRoutes = require('./routes/api/locationTransferRoutes');
const shipementRoutes = require('./routes/api/shipementRoutes');
const pickingLogRoutes = require('./routes/api/pickingLogRoutes');
const putawayRoutes = require('./routes/api/putawayRoutes');
const Pallet = require('./models/pallet');
const Shipment = require('./models/shipment');
const Location = require('./models/location');
const Putaway = require('./models/putaway')
const LocationTransfer = require('./models/locationTransfer');
const PickingLog = require('./models/pickingLog');

// Create collections if they don't exist
Pallet.createCollection();
Shipment.createCollection();
Location.createCollection();
Putaway.createCollection();
LocationTransfer.createCollection();
PickingLog.createCollection();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use("/api/pallets", palletRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/locationTransfers", locationTransferRoutes);
app.use("/api/shipments", shipementRoutes);
app.use("/api/pickingLogs", pickingLogRoutes);
app.use("/api/putaways", putawayRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Harmony_PFE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
