// Dashboard.js
import React from 'react';
import PalletOccupancyOverview from './components/PalletOccupancyOverview';
import LocationUtilizationByRack from './components/LocationUtilizationByRack';
// Import other visualization components as they are created

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Warehouse Dashboard</h1>
      <div className="dashboard-grid">
        <PalletOccupancyOverview />
        <LocationUtilizationByRack/>
      </div>
    </div>
  );
};

export default Dashboard;
