import React, { useState, useEffect } from 'react';
import RackHeatmap from './RackHeatmap';
import RackBarchart from './RackBarchart';

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
  
    // Calculate fullness of each rack
    const calculateRackFullness = (rackConfig) => {
      const totalLocations = rackConfig.length;
      const filledLocations = rackConfig.filter((location) => !location.isEmpty).length;
      return Math.floor((filledLocations / totalLocations) * 100);
    };
  
    // Initialize state for current rack index
    const [currentRackIndex, setCurrentRackIndex] = useState(0);
  
    // Set interval to update current rack index
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentRackIndex((prevIndex) => (prevIndex + 1) % Object.keys(racks).length);
      }, 3000); // Change interval to 3 seconds
  
      return () => clearInterval(intervalId);
    }, [racks]);
  
    // Get rack names
    const rackNames = Object.keys(racks);
  
    return (
      <section id="warehouse-kpis" className="dashboard-section">
        <h2>Warehouse KPIs</h2>
        <div className="rack-container">
          {rackNames.map((rackName, index) => (
            <div key={rackName} className="rack">
              <RackHeatmap
                rackName={rackName}
                rackConfig={racks[rackName]}
                isVisible={index === currentRackIndex}
                rackFullness={calculateRackFullness(racks[rackName])} // Pass rack fullness data
              />
              <RackBarchart
                rackFullness={calculateRackFullness(racks[rackName])} // Pass rack fullness data
              />
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default WarehouseKPIs;