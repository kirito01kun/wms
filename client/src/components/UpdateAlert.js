import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/UpdateAlert.css'; // Import CSS file for styling

const UpdateAlert = ({ alertId, onClose }) => {
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        threshold: '',
        alertType: 'normal',
    });

    useEffect(() => {
        const fetchAlert = async () => {
            try {
                console.log("Fetching alert with ID:", alertId);
                const response = await axios.get(`http://localhost:5000/api/alerts/display/${alertId}`);
                const { productId, productName, threshold, alertType } = response.data;
                console.log("Fetched Alert Data:", response.data);
                setFormData({ productId, productName, threshold: String(threshold), alertType });
            } catch (err) {
                console.error('Error fetching alert:', err);
            }
        };

        fetchAlert();
    }, [alertId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting alert update for ID:", alertId);
            await axios.patch(`http://localhost:5000/api/alerts/update/${alertId}`, formData);
            alert('Alert updated successfully');
            onClose();
        } catch (err) {
            console.error('Error updating alert:', err);
            alert('Error updating alert: ' + err.response.data.message); // Provide error message to user
        }
    };

    const handleDelete = async () => {
        try {
            console.log("Deleting alert with ID:", alertId);
            await axios.delete(`http://localhost:5000/api/alerts/del/${alertId}`);
            alert('Alert deleted successfully');
            onClose();
        } catch (err) {
            console.error('Error deleting alert:', err);
            alert('Error deleting alert: ' + err.response.data.message); // Provide error message to user
        }
    };

    return (
        <div className="update-alert-container">
            <h2 className="update-alert-heading">Update Alert</h2>
            <form onSubmit={handleSubmit} className="update-alert-form">
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
                <div className="button-container">
                    <button type="submit" className="form-button update-button">Update</button>
                    <button onClick={handleDelete} className="form-button delete-button">Delete</button>
                </div>
                <button onClick={onClose} className="form-button cancel-button">Cancel</button>
            </form>
        </div>
    );
};

export default UpdateAlert;
