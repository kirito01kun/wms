import React from 'react';
import './Dashboard.css';
import Navbar from './components/Navbar';
import WarehouseKPIs from './components/WarehouseKPIs';
import StockLevels from './components/StockLevels';
import StockAlerts from './components/StockAlerts';
import ForkliftStatus from './components/ForkliftStatus';
import Statistics from './components/Statistics';
import ActivityLog from './components/ActivityLog';

const Dashboard = () => {

  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <WarehouseKPIs />
        <StockLevels />
        <StockAlerts />
        <ForkliftStatus />
        <Statistics />
        <ActivityLog />
      </div>
    </div>
  );
};
/*<ForkliftStatus />
        <Statistics />
        <ActivityLog />*/
export default Dashboard;
