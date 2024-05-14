import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
      navigate('/locations');
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Location ID:
        <input type="text" name="locationId" value={location.locationId} onChange={handleChange} />
      </label>
      <label>
        Level:
        <input type="text" name="level" value={location.level} onChange={handleChange} />
      </label>
      <label>
        Rack:
        <input type="text" name="rack" value={location.rack} onChange={handleChange} />
      </label>
      <label>
        Is Empty:
        <input
          type="checkbox"
          name="isEmpty"
          checked={location.isEmpty}
          onChange={(e) => setLocation(prevLocation => ({
            ...prevLocation,
            isEmpty: e.target.checked
          }))}
        />
      </label>
      <button type="submit">Update Location</button>
    </form>
  );
};

export default UpdateLocation;
