import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, TextField, FormControlLabel, RadioGroup, Radio } from '@mui/material';

const PickOperation = ({ setLocations }) => {
  const [pallets, setPallets] = useState([]);
  const [selectedPallet, setSelectedPallet] = useState('');
  const [pickType, setPickType] = useState('full');
  const [palletProducts, setPalletProducts] = useState([]);
  const [pickedProducts, setPickedProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPallets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pallets/display');
        // Filter out pallets that are not placed
        const placedPallets = response.data.filter(pallet => pallet.isPlaced);        
        setPallets(placedPallets);
      } catch (error) {
        console.error('Error fetching pallets:', error);
        setError('Error fetching pallets');
      }
    };

    fetchPallets();
  }, []);

  useEffect(() => {
    const fetchPalletProducts = async () => {
      if (selectedPallet) {
        try {
          const response = await axios.get(`http://localhost:5000/api/pallets/display/${selectedPallet}`);
          setPalletProducts(response.data.products);

          if (pickType === 'loose') {
            const initialPickedProducts = response.data.products.map(product => ({
              productId: product.productId,
              productName: product.productName,
              quantityPicked: 0,
            }));
            setPickedProducts(initialPickedProducts);
          } else {
            setPickedProducts([]);
          }
        } catch (error) {
          console.error('Error fetching pallet products:', error);
          setError('Error fetching pallet products');
        }
      }
    };

    fetchPalletProducts();
  }, [selectedPallet, pickType]);

  const handlePickTypeChange = (event) => {
    setPickType(event.target.value);
    if (event.target.value === 'full') {
      setPickedProducts([]);
    }
  };

  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...pickedProducts];
    updatedProducts[index][key] = value;
  
    // Adjust the quantity based on the picked quantity
    if (key === 'quantityPicked') {
      const availableQuantity = palletProducts[index]?.quantity || 0;
      updatedProducts[index]['quantity'] = availableQuantity - parseInt(value);
    }
  
    setPickedProducts(updatedProducts);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const pickingData = {
      palletId: selectedPallet,
      pickType: pickType,
      pickedProducts: pickType === 'full' ? [] : pickedProducts,
      pickDateTime: new Date(),
    };
  
    try {
      await axios.post('http://localhost:5000/api/pickings/add', pickingData);
  
      if (pickType === 'full') {
        // Update pallet to be empty and not placed
        await axios.patch(`http://localhost:5000/api/pallets/update/${selectedPallet}`, {
          products: [],
          isPlaced: false,
        });
        const locationResponse = await axios.get(`http://localhost:5000/api/locations/pallet/${selectedPallet}`);
        if (locationResponse.data) {
          const locationId = locationResponse.data.locationId;
          console.log(locationId)
          // Update corresponding location to indicate it's empty and clear linked pallet
          await axios.patch(`http://localhost:5000/api/locations/update/${locationId}`, {
            isEmpty: true,
            pallet: ''
          });
        }
      } else {
        // Update pallet with remaining products for loose pick
        await axios.patch(`http://localhost:5000/api/pallets/update/${selectedPallet}`, {
          products: pickedProducts,
        });
      }
  
      // Alert user about successful pick operation
      alert('Pick operation successful!');
  
      // Reset form fields
      setSelectedPallet('');
      setPickType('full');
      setPalletProducts([]);
      setPickedProducts([]);
    } catch (error) {
      console.error('Error creating pick record:', error);
      // Handle error
    }
  };
  
  

  if (error) {
    return <div className="error-message">{error}</div>;
  }

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
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <RadioGroup row value={pickType} onChange={handlePickTypeChange}>
          <FormControlLabel value="full" control={<Radio />} label="Full Pick" />
          <FormControlLabel value="loose" control={<Radio />} label="Loose Pick" />
        </RadioGroup>
      </FormControl>
      {pickType === 'loose' && (
        <div>
          {palletProducts.map((product, index) => (
            <div key={index} className="product-item">
              <TextField
                label="Product ID"
                value={product.productId}
                disabled
                sx={{ mb: 2, mr: 2 }}
              />
              <TextField
                label="Product Name"
                value={product.productName}
                disabled
                sx={{ mb: 2, mr: 2 }}
              />
              <TextField
                label="Quantity Available"
                value={product.quantity}
                disabled
                sx={{ mb: 2, mr: 2 }}
              />
              <TextField
                label="Quantity Picked"
                type="number"
                value={pickedProducts[index]?.quantityPicked || 0}
                onChange={(e) => handleProductChange(index, 'quantityPicked', e.target.value)}
                sx={{ mb: 2, mr: 2 }}
              />
            </div>
          ))}
        </div>
      )}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Submit Pick
      </Button>
    </Box>
  );
};

export default PickOperation;
