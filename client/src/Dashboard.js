import React from 'react';
import './Dashboard.css';
import Navbar from './components/Sidebar';
import WarehouseKPIs from './components/WarehouseKPIs';
import StockLevels from './components/StockLevels';
import StockAlerts from './components/StockAlerts';
import ForkliftStatus from './components/ForkliftStatus';
import Statistics from './components/Statistics';
import ActivityLog from './components/ActivityLog';

const Dashboard = () => {

  return (
    <div className="dashboard">
        <WarehouseKPIs />
    </div>
  );
};
/*<ForkliftStatus />
        <Statistics />
        <ActivityLog />*/
export default Dashboard;
