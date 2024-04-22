import React, { useState, useEffect } from 'react';
import RackHeatmap from './RackHeatmap';

const WarehouseKPIs = () => {

  const rackConfig = [
    { rack: 'A', level: 1, location: 1, isEmpty: false },
    { rack: 'A', level: 1, location: 2, isEmpty: true },
    { rack: 'A', level: 1, location: 3, isEmpty: false },
    { rack: 'A', level: 1, location: 4, isEmpty: true },
    { rack: 'A', level: 2, location: 1, isEmpty: true },
    { rack: 'A', level: 2, location: 2, isEmpty: true },
    { rack: 'A', level: 2, location: 3, isEmpty: true },
    { rack: 'A', level: 2, location: 4, isEmpty: true },
    { rack: 'A', level: 3, location: 1, isEmpty: false },
    { rack: 'A', level: 3, location: 2, isEmpty: true },
    { rack: 'A', level: 3, location: 3, isEmpty: false },
    { rack: 'A', level: 3, location: 4, isEmpty: true },
    { rack: 'A', level: 4, location: 1, isEmpty: true },
    { rack: 'A', level: 4, location: 2, isEmpty: true },
    { rack: 'A', level: 4, location: 3, isEmpty: true },
    { rack: 'A', level: 4, location: 4, isEmpty: false },
    { rack: 'B', level: 1, location: 1, isEmpty: false },
    { rack: 'B', level: 1, location: 2, isEmpty: true },
    { rack: 'B', level: 1, location: 3, isEmpty: false },
    { rack: 'B', level: 1, location: 4, isEmpty: true },
    { rack: 'B', level: 2, location: 1, isEmpty: false },
    { rack: 'B', level: 2, location: 2, isEmpty: false },
    { rack: 'B', level: 2, location: 3, isEmpty: true },
    { rack: 'B', level: 2, location: 4, isEmpty: true },
    { rack: 'B', level: 3, location: 1, isEmpty: false },
    { rack: 'B', level: 3, location: 2, isEmpty: false },
    { rack: 'B', level: 3, location: 3, isEmpty: false },
    { rack: 'B', level: 3, location: 4, isEmpty: false },
    { rack: 'B', level: 4, location: 1, isEmpty: true },
    { rack: 'B', level: 4, location: 2, isEmpty: false },
    { rack: 'B', level: 4, location: 3, isEmpty: true },
    { rack: 'B', level: 4, location: 4, isEmpty: true },
    { rack: 'C', level: 1, location: 1, isEmpty: false },
    { rack: 'C', level: 1, location: 2, isEmpty: true },
    { rack: 'C', level: 1, location: 3, isEmpty: false },
    { rack: 'C', level: 1, location: 4, isEmpty: false },
    { rack: 'C', level: 2, location: 1, isEmpty: true },
    { rack: 'C', level: 2, location: 2, isEmpty: false },
    { rack: 'C', level: 2, location: 3, isEmpty: true },
    { rack: 'C', level: 2, location: 4, isEmpty: true },
    { rack: 'C', level: 3, location: 1, isEmpty: false },
    { rack: 'C', level: 3, location: 2, isEmpty: true },
    { rack: 'C', level: 3, location: 3, isEmpty: false },
    { rack: 'C', level: 3, location: 4, isEmpty: false },
    { rack: 'C', level: 4, location: 1, isEmpty: false },
    { rack: 'C', level: 4, location: 2, isEmpty: false },
    { rack: 'C', level: 4, location: 3, isEmpty: true },
    { rack: 'C', level: 4, location: 4, isEmpty: true },
  ];

  // Group rackConfig by rack
  const racks = rackConfig.reduce((acc, location) => {
    const { rack } = location;
    acc[rack] = acc[rack] || [];
    acc[rack].push(location);
    return acc;
  }, {});

  const [currentRackIndex, setCurrentRackIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRackIndex((prevIndex) => (prevIndex + 1) % Object.keys(racks).length);
      console.log('Interval triggered. Current rack index:', currentRackIndex);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentRackIndex, racks]);

  const rackNames = Object.keys(racks);

  return (
    <section id="warehouse-kpis" className="dashboard-section">
      <h2>Warehouse KPIs</h2>
      <div>
        {rackNames.map((rackName, index) => (
          <RackHeatmap
            key={rackName}
            rackName={rackName}
            rackConfig={racks[rackName]}
            isVisible={index === currentRackIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default WarehouseKPIs;