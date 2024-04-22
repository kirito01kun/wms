import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Warehouse Dashboard</h1>
      </div>
      <ul className="navbar-links">
        <li className={activeLink === 'warehouse-kpis' ? 'active' : ''}>
          <a href="#warehouse-kpis" onClick={() => handleLinkClick('warehouse-kpis')}>
            Warehouse KPIs
          </a>
        </li>
        <li className={activeLink === 'stock-levels' ? 'active' : ''}>
          <a href="#stock-levels" onClick={() => handleLinkClick('stock-levels')}>
            Stock Levels
          </a>
        </li>
        <li className={activeLink === 'stock-alerts' ? 'active' : ''}>
          <a href="#stock-alerts" onClick={() => handleLinkClick('stock-alerts')}>
            Stock Alerts
          </a>
        </li>
        <li className={activeLink === 'forklift-status' ? 'active' : ''}>
          <a href="#forklift-status" onClick={() => handleLinkClick('forklift-status')}>
            Forklifts Status
          </a>
        </li>
        <li className={activeLink === 'statistics' ? 'active' : ''}>
          <a href="#statistics" onClick={() => handleLinkClick('statistics')}>
            Statistics
          </a>
        </li>
        <li className={activeLink === 'activity-log' ? 'active' : ''}>
          <a href="#activity-log" onClick={() => handleLinkClick('activity-log')}>
            Forklifts Status
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
