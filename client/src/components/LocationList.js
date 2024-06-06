import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style/LocationList.css';

const LocationList = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/locations/display');
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const deleteLocation = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/locations/del/${id}`);
            fetchLocations(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting location:', error);
        }
    };

    return (
        <div className="location-list-container">
            <h2>Location List</h2>
            <Link to="/add-location" className="add-location">Add New Location</Link>
            <ul className="location-list">
                {locations.map((location) => (
                    <li key={location._id} className="location-item">
                        <div className="location-info">
                            {location.locationId} - {location.level} - {location.isEmpty ? 'Empty' : 'Occupied'}
                            {location.pallet && (
                                <span> - Pallet ID: {location.pallet}</span>
                            )}
                        </div>
                        <div className="actions">
                            <Link to={`/update-location/${location.locationId}`} className="edit">Edit</Link>
                            <button onClick={() => deleteLocation(location._id)} className="delete">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationList;
