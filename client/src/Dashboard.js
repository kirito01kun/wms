// Dashboard.js
import React from 'react';
import PalletOccupancyOverview from './components/PalletOccupancyOverview';
import LocationUtilizationByRack from './components/LocationUtilizationByRack';
import LocationTransferActivity from './components/LocationTransferActivity';
import ActiveAlertsOverview from './components/ActiveAlertsOverview';
import ProductQuantityDistribution from './components/ProductQuantityDistribution';
import RackViz from './components/RackViz';
import './Dashboard.css';// Import other visualization components as they are created

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Warehouse Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-item rack-viz">
          <RackViz />
        </div>
        <div className="dashboard-item pallet-occupancy">
          <PalletOccupancyOverview />
        </div>
        <div className="dashboard-item location-utilization">
          <LocationUtilizationByRack />
        </div>
        <div className="dashboard-item location-transfer">
          <LocationTransferActivity />
        </div>
        <div className="dashboard-item active-alerts">
          <ActiveAlertsOverview />
        </div>
        <div className="dashboard-item product-quantity">
          <ProductQuantityDistribution />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
