import React from 'react';
import './style/SideKPIs.css'; // Import the CSS for styling

const SideKPIs = () => {
  return (
    <div className="side-kpis-container">
      <div className="side-kpis-card"></div> {/* Empty card on the left */}
      <div className="side-kpis-card"></div> {/* Empty card on the right */}
    </div>
  );
};

export default SideKPIs;
