import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateAlert from './UpdateAlert';
import './style/AlertList.css';

const AlertsList = () => {
    const [alerts, setAlerts] = useState([]);
    const [selectedAlertId, setSelectedAlertId] = useState(null);
    const [updatedAlertId, setUpdatedAlertId] = useState(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/alerts/display');
                setAlerts(response.data);
            } catch (err) {
                console.error('Error fetching alerts:', err);
            }
        };

        fetchAlerts();
    }, [updatedAlertId]);

    const handleEditClick = (alertId) => {
        setSelectedAlertId(alertId);
    };

    const handleUpdateClose = () => {
        setSelectedAlertId(null);
        setUpdatedAlertId(alertId => alertId ? null : selectedAlertId); // Toggle to trigger alert list refresh
    };

// Inside the AlertsList component...

    const toggleActiveState = async (id, isActive) => {
        try {
            await axios.patch(`http://localhost:5000/api/alerts/update/${id}`, { isActive });
            // Update the state only after the patch request succeeds
            setAlerts((prevAlerts) =>
                prevAlerts.map((alert) =>
                    alert._id === id ? { ...alert, isActive } : alert
                )
            );
        } catch (err) {
            console.error('Error toggling active state:', err);
            alert('Error toggling active state');
        }
    };


    return (
        <div className="alerts-container">
            <h2 className="alerts-heading">Alerts</h2>
            <ul className="alerts-list">
                {alerts.map((alert) => (
                    <li key={alert._id} className="alert-item">
                        <div className="alert-info">
                            <span className="product-name">{alert.productName || alert.productId}</span>
                            <span className="threshold">Threshold: {alert.threshold}</span>
                            <span className="alert-type" data-alert-type={alert.alertType}>
                                Type: {alert.alertType}
                            </span>
                            <span className={`active-status ${alert.isActive ? 'active' : 'inactive'}`}>
                                {alert.isActive ? 'Active' : 'Inactive'}
                            </span>

                            <button onClick={() => toggleActiveState(alert._id, !alert.isActive)} className={`toggle-active-button ${alert.isActive ? 'active' : 'inactive'}`}>
                                {alert.isActive ? 'Deactivate' : 'Activate'}
                            </button>

                            <button onClick={() => handleEditClick(alert._id)} className="edit-button">
                                Edit
                            </button>
                        </div>
                        {selectedAlertId === alert._id && <UpdateAlert alertId={selectedAlertId} onClose={handleUpdateClose} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlertsList;
