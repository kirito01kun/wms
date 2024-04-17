import React from 'react';
import navbar from './components/navbar';
import warehouseKPIs from './components/warehouseKPIs';
import stockLevels from './components/stockLevels';
import stockAlerts from './components/stockAlerts';
//import ForkliftStatus from './ForkliftStatus';
//import Statistics from './Statistics';
//import ActivityLog from './ActivityLog';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <navbar />
      <div className="content">
        <warehouseKPIs />
        <stockLevels />
        <stockAlerts />
        
      </div>
    </div>
  );
};
/*<ForkliftStatus />
        <Statistics />
        <ActivityLog />*/
export default Dashboard;
