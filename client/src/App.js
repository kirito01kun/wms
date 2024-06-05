import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
import LocationEntry from './LocationEntry';
import AddLocation from './components/AddLocation';
import UpdateLocation from './components/UpdateLocation';
import PalletEntry from './PalletEntry';
import UpdatePallet from './components/UpdatePallet';
import AddPallet from './components/AddPallet';
import AlertList from './components/AlertList';
import AlertForm from './components/AlertForm';
import ShipmentList from './components/ShipmentList';
import AddShipment from './components/AddShipment';
import PalletList from './components/PalletList';
import RackViz from './components/RackViz';
import Layout from './components/Layout'
import LocationList from './components/LocationList';
import Putaway from './components/Putaway';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="shipments" element={<ShipmentList />} />
          <Route path="putaway" element={<Putaway />} />
          <Route path="picking" element={<LocationList />} />
          <Route path="inventory" element={<PalletList />} />
          <Route path="reports" element={<AlertList />} />
          <Route path="admin" element={<Dashboard />} />
          <Route path="locations" element={<LocationEntry />} />
          <Route path="add-location" element={<AddLocation />} />
          <Route path="update-location/:id" element={<UpdateLocation />} />
          <Route path="pallets" element={<PalletEntry />} />
          <Route path="update-pallet/:id" element={<UpdatePallet />} />
          <Route path="add-pallet" element={<AddPallet />} />
          <Route path="alerts" element={<AlertList />} />
          <Route path="shipments" element={<ShipmentList />} />
          <Route path="alerts-form" element={<AlertForm />} />
          <Route path="add-shipment" element={<AddShipment />} />
          
      </Route>
      </Routes>
    </Router>
  );
};

export default App;