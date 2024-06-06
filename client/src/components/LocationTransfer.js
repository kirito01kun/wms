import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

const LocationTransfer = () => {
  const [locations, setLocations] = useState([]);
  const [pallets, setPallets] = useState([]);
  const [selectedPallet, setSelectedPallet] = useState('');
  const [sourceLocation, setSourceLocation] = useState('');
  const [targetLocation, setTargetLocation] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationsAndPallets = async () => {
      try {
        const [locationsResponse, palletsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/locations/display'),
          axios.get('http://localhost:5000/api/pallets/display'),
        ]);
        setLocations(locationsResponse.data);
        setPallets(palletsResponse.data.filter(pallet => pallet.isPlaced));
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchLocationsAndPallets();
  }, []);

  const handlePalletChange = (event) => {
    const palletId = event.target.value;
    setSelectedPallet(palletId);

    const location = locations.find(l => l.pallet === palletId);
    setSourceLocation(location ? location.locationId : '');
  };

  const handleTransfer = async () => {
    if (!selectedPallet || !sourceLocation || !targetLocation || sourceLocation === targetLocation) {
      setError('Please select valid locations and pallet.');
      return;
    }

    try {
      // Clear pallet from the source location
      await axios.patch(`http://localhost:5000/api/locations/update/${sourceLocation}`, {
        isEmpty: true,
        pallet: ''
      });

      // Place pallet in the target location
      await axios.patch(`http://localhost:5000/api/locations/update/${targetLocation}`, {
        isEmpty: false,
        pallet: selectedPallet
      });

      // Update pallet to reflect new location
      await axios.patch(`http://localhost:5000/api/pallets/update/${selectedPallet}`, {
        isPlaced: true,
        location: targetLocation
      });

      // Fetch updated data
      const [updatedLocationsResponse, updatedPalletsResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/locations/display'),
        axios.get('http://localhost:5000/api/pallets/display'),
      ]);
      setLocations(updatedLocationsResponse.data);
      setPallets(updatedPalletsResponse.data.filter(pallet => pallet.isPlaced));

      // Reset selection
      setSelectedPallet('');
      setSourceLocation('');
      setTargetLocation('');
      setError(null);

      alert('Pallet transferred successfully!');
    } catch (error) {
      console.error('Error transferring pallet:', error);
      setError('Error transferring pallet');
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Location Transfer
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="pallet-select-label">Select Pallet</InputLabel>
        <Select
          labelId="pallet-select-label"
          value={selectedPallet}
          onChange={handlePalletChange}
        >
          {pallets.map((pallet) => (
            <MenuItem key={pallet._id} value={pallet.palletId}>
              {pallet.palletId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="source-location-label">Source Location</InputLabel>
        <Select
          labelId="source-location-label"
          value={sourceLocation}
          disabled
        >
          <MenuItem value={sourceLocation}>
            {sourceLocation}
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="target-location-label">Target Location</InputLabel>
        <Select
          labelId="target-location-label"
          value={targetLocation}
          onChange={(e) => setTargetLocation(e.target.value)}
        >
          {locations.filter(location => location.isEmpty).map((location) => (
            <MenuItem key={location._id} value={location.locationId}>
              {location.locationId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleTransfer}>
        Transfer Pallet
      </Button>
    </Box>
  );
};

export default LocationTransfer;
