import React from 'react';
import RackViz from './RackViz';
import AlertList from './AlertList';
import ShipmentList from './ShipmentList';
import PalletList from './PalletList';
import LocationList from './LocationList';


const WarehouseKPIs = () => {
  return (
    <section id="warehousekpis" className="dashboard-section">
      <RackViz />

    </section>
  );
};

export default WarehouseKPIs;