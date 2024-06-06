// Dashboard.js
import React from 'react';
import ShipmentList from './components/ShipmentList';
import AddShipment from './components/AddShipment';
import ShipmentStatusOverview from './components/ShipmentStatusOverview';
import ShipmentCalendar from './components/ShipmentCalendar';

const Shipment = () => {
  return (
      <div>
        <ShipmentCalendar/>
        <ShipmentList/>
        <AddShipment/>
        <ShipmentStatusOverview/>
      </div>
  );
};

export default Shipment;
