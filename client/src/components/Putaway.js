import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Putaway = () => {
  const [pallets, setPallets] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedPallet, setSelectedPallet] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    const fetchPallets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pallets/display');
        // Filter the pallets to only include those that are not placed
        const availablePallets = response.data.filter(pallet => !pallet.isPlaced);
        setPallets(availablePallets);
      } catch (error) {
        console.error('Error fetching pallets:', error);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/locations/display');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchPallets();
    fetchLocations();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create putaway record
      await axios.post('http://localhost:5000/api/putaways/add', {
        palletId: selectedPallet,
        locationId: selectedLocation,
      });
  
      // Update selected location's pallet variable with the _id of the selected pallet
      await axios.patch(`http://localhost:5000/api/locations/update/${selectedLocation}`, {
        pallet: selectedPallet,
        isEmpty: false // Assuming the location is no longer empty after putaway
      });
  
      alert('Putaway operation successful!');
  
      // Reset form fields
      setSelectedPallet('');
      setSelectedLocation('');
  
      // Refresh the pallets and locations list to reflect the changes
      const palletResponse = await axios.get('http://localhost:5000/api/pallets/display');
      const availablePallets = palletResponse.data.filter(pallet => !pallet.isPlaced);
      setPallets(availablePallets);
  
      const locationResponse = await axios.get('http://localhost:5000/api/locations/display');
      setLocations(locationResponse.data);
  
    } catch (error) {
      console.error('Error creating putaway record:', error);
    }
  };
  

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="pallet-select-label">Select Pallet</InputLabel>
        <Select
          labelId="pallet-select-label"
          value={selectedPallet}
          onChange={(e) => setSelectedPallet(e.target.value)}
        >
          {pallets.map((pallet) => (
            <MenuItem key={pallet._id} value={pallet.palletId}>
              {pallet.palletId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="location-select-label">Select Location</InputLabel>
        <Select
          labelId="location-select-label"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          {locations.filter(loc => loc.isEmpty).map((location) => (
            <MenuItem key={location._id} value={location.locationId}>
              {location.locationId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Submit Putaway
      </Button>
    </Box>
  );
};

export default Putaway;
