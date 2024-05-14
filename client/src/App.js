import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ApiUI from './ApiUI';
import AddLocation from './components/AddLocation';
import UpdateLocation from './components/UpdateLocation';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/display" element={<ApiUI />} />
      <Route path="/add" element={<AddLocation />} />
      <Route path="/update/:id" element={<UpdateLocation />} />
      </Routes>
    </Router>
  );
};

export default App;