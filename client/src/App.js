import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import LocationEntry from './LocationEntry';
import AddLocation from './components/AddLocation';
import UpdateLocation from './components/UpdateLocation';
import PalletEntry from './PalletEntry';
import UpdatePallet from './components/UpdatePallet';
import AddPallet from './components/AddPallet';
import AlertList from './components/AlertList';
import AlertForm from './components/AlertForm';
import Shipment from './Shipment';
import AddShipment from './components/AddShipment';
import PalletList from './components/PalletList';
import Layout from './components/Layout'
import Putaway from './components/Putaway';
import PickOperation from './components/PickOperation';
import LocationTransfer from './components/LocationTransfer';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="shipments" element={<Shipment />} />
          <Route path="putaway" element={<Putaway />} />
          <Route path="picking" element={<PickOperation />} />
          <Route path="inventory" element={<PalletList />} />
          <Route path="transfer" element={<LocationTransfer />} />
          <Route path="reports" element={<AlertList />} />
          <Route path="locations" element={<LocationEntry />} />
          <Route path="add-location" element={<AddLocation />} />
          <Route path="update-location/:id" element={<UpdateLocation />} />
          <Route path="pallets" element={<PalletEntry />} />
          <Route path="update-pallet/:id" element={<UpdatePallet />} />
          <Route path="add-pallet" element={<AddPallet />} />
          <Route path="alerts" element={<AlertList />} />
          <Route path="alerts-form" element={<AlertForm />} />
          <Route path="add-shipment" element={<AddShipment />} />
          
      </Route>
      </Routes>
    </Router>
  );
};

export default App;