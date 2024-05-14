import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        <div>
            <h2>Location List</h2>
            <Link to="/add">Add New Location</Link>
            <ul>
                {locations.map((location) => (
                    <li key={location._id}>
                        {location.rack} - {location.level} - {location.isEmpty ? 'Empty' : 'Occupied'}
                        <Link to={`/update/${location._id}`}>Edit</Link>
                        <button onClick={() => deleteLocation(location._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationList;
