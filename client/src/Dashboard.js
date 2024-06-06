// Dashboard.js
import React from 'react';
import PalletOccupancyOverview from './components/PalletOccupancyOverview';
import LocationUtilizationByRack from './components/LocationUtilizationByRack';
import LocationTransferActivity from './components/LocationTransferActivity';
import ActiveAlertsOverview from './components/ActiveAlertsOverview';
import ProductQuantityDistribution from './components/ProductQuantityDistribution';
import ShipmentStatusOverview from './components/ShipmentStatusOverview';
import RackViz from './components/RackViz';
import AddShipment from './components/AddShipment';
// Import other visualization components as they are created

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Warehouse Dashboard</h1>
      <div className="dashboard-grid">
        <RackViz/>
        <PalletOccupancyOverview />
        <LocationUtilizationByRack />
        <LocationTransferActivity />
        <ActiveAlertsOverview/>
        <ProductQuantityDistribution/>
        <ShipmentStatusOverview/>
      </div>
    </div>
  );
};

export default Dashboard;
