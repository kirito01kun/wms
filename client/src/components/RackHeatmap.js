import React from 'react';
import './RackHeatmap.css';

const RackHeatmap = ({ rackName, rackConfig, isVisible }) => {
  console.log('Rendering RackHeatmap:', rackName, isVisible);
  const getColor = (isEmpty) => {
    return isEmpty ? '#2979FF' : '#FF1744';
  };

  // Group rackConfig by level
  const levels = rackConfig.reduce((acc, location) => {
    const { level } = location;
    acc[level] = acc[level] || [];
    acc[level].push(location);
    return acc;
  }, {});

  // Apply CSS class based on visibility
  const visibilityClass = isVisible ? '' : 'hidden';

  return (
    <div className={`rack-heatmap ${visibilityClass} overlay`}>
      <div className="rack-name">Rack {rackName}</div>
      <div className="heatmap-container">
        {Object.entries(levels).map(([level, locations]) => (
          <div key={`level-${level}`} className="level-row">
            <div className="level-number">Level {level}</div>
            {locations.map((location) => (
              <div
                key={`${location.rack}-${location.level}-${location.location}`}
                className="location-square"
                style={{ backgroundColor: getColor(location.isEmpty) }}
              >
                L{location.location}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RackHeatmap;