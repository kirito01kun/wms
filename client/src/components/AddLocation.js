import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style/AddLocation.css';

const AddLocation = () => {
    const [locationData, setLocationData] = useState({ locationId: '', level: '', rack: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLocationData({ ...locationData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/locations/add', locationData);
            navigate('/locations');
        } catch (error) {
            console.error('Error adding location:', error);
        }
    };

    return (
        <div className="add-location-container">
            <h2>Add Location</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="locationId"
                    placeholder="Location ID"
                    onChange={handleChange}
                    value={locationData.locationId}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    name="level"
                    placeholder="Level"
                    onChange={handleChange}
                    value={locationData.level}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    name="rack"
                    placeholder="Rack"
                    onChange={handleChange}
                    value={locationData.rack}
                    required
                    className="input-field"
                />
                <button type="submit" className="submit-btn">Add Location</button>
            </form>
        </div>
    );
};

export default AddLocation;
