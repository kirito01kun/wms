import React, { useState } from 'react';
import axios from 'axios';
import './style/AlertForm.css'; // Import CSS file for styling

const AlertForm = () => {
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        threshold: '',
        alertType: 'normal',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/alerts/add', formData);
            alert('Alert created successfully');
        } catch (err) {
            console.error('Error creating alert:', err);
            alert('Error creating alert');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="alert-form">
            <input
                type="text"
                name="productId"
                placeholder="Product ID"
                value={formData.productId}
                onChange={handleChange}
                className="form-input"
                required
            />
            <input
                type="text"
                name="productName"
                placeholder="Product Name"
                value={formData.productName}
                onChange={handleChange}
                className="form-input"
            />
            <input
                type="number"
                name="threshold"
                placeholder="Threshold"
                value={formData.threshold}
                onChange={handleChange}
                className="form-input"
                required
            />
            <select
                name="alertType"
                value={formData.alertType}
                onChange={handleChange}
                className="form-select"
            >
                <option value="normal">Normal</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
            </select>
            <button type="submit" className="form-button">Create Alert</button>
        </form>
    );
};

export default AlertForm;
