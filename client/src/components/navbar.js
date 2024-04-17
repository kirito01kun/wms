import React from 'react';

const navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#warehouse-kpis">Warehouse KPIs</a></li>
        <li><a href="#stock-levels">Stock Levels</a></li>
        <li><a href="#stock-alerts">Stock Alerts</a></li>
      </ul>
    </nav>
  );
};

export default navbar;
