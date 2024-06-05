import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './style/UpdateLocation.css';

const UpdateLocation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    locationId: '',
    level: '',
    rack: '',
    isEmpty: false
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        console.log('ID:', id); // Log the id value
        const response = await axios.get(`http://localhost:5000/api/locations/display/${id}`);
        setLocation(response.data);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    fetchLocation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation(prevLocation => ({
      ...prevLocation,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updating location with id:', location.locationId); // Log the locationId value
    try {
      await axios.patch(`http://localhost:5000/api/locations/update/${location.locationId}`, location);
      navigate('/picking');
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  return (
    <div className="update-location-container">
      <h2>Update Location</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Location ID:</label>
          <input
            type="text"
            name="locationId"
            value={location.locationId}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Level:</label>
          <input
            type="text"
            name="level"
            value={location.level}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Rack:</label>
          <input
            type="text"
            name="rack"
            value={location.rack}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group form-group-checkbox">
          <input
            type="checkbox"
            name="isEmpty"
            checked={location.isEmpty}
            onChange={(e) => setLocation(prevLocation => ({
              ...prevLocation,
              isEmpty: e.target.checked
            }))}
          />
          <label>Is Empty</label>
        </div>
        <button type="submit" className="submit-btn">Update Location</button>
      </form>
    </div>
  );
};

export default UpdateLocation;
