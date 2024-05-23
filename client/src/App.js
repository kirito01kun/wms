import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import LocationEntry from './LocationEntry';
import PalletEntry from './PalletEntry';
import UpdatePallet from './components/UpdatePallet';
import AddPallet from './components/AddPallet';
import AlertList from './components/AlertList';
import AlertForm from './components/AlertForm';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/locations" element={<LocationEntry />} />
      <Route path="/pallets" element={<PalletEntry />} />
      <Route path="/update-pallet/:id" element={<UpdatePallet />} />
      <Route path="/add-pallet" element={<AddPallet />} />
      <Route path="/alerts" element={<AlertList />} />
      <Route path="/alerts-form" element={<AlertForm />} />
      </Routes>
    </Router>
  );
};

export default App;