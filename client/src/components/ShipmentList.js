import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/ShipmentList.css'; // Import CSS file for styling

const ShipmentList = () => {
    const [shipments, setShipments] = useState([]);
    const [hoveredProductId, setHoveredProductId] = useState(null);

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/shipments/display');
                // Sort shipments by expected arrival date
                const sortedShipments = response.data.sort((a, b) => new Date(a.expectedArrivalDateTime) - new Date(b.expectedArrivalDateTime));
                setShipments(sortedShipments);
            } catch (err) {
                console.error('Error fetching shipments:', err);
            }
        };

        fetchShipments();
    }, []);

    const handleMouseEnter = (productId) => {
        setHoveredProductId(productId);
    };

    const handleMouseLeave = () => {
        setHoveredProductId(null);
    };

    const handleDelete = async (shipmentId) => {
        try {
            await axios.delete(`http://localhost:5000/api/shipments/del/${shipmentId}`);
            // Remove the deleted shipment from the state
            setShipments(shipments.filter(shipment => shipment._id !== shipmentId));
        } catch (err) {
            console.error('Error deleting shipment:', err);
        }
    };

    return (
        <div className="shipments-container">
            <h2 className="shipments-heading">Shipments</h2>
            <ul className="shipments-list">
                {shipments.map((shipment) => {
                    const arrivalDate = new Date(shipment.arrivalDateTime);
                    const isDefaultDate = arrivalDate.getFullYear() < 2024; // Check if the arrival date is a default or past date
                    return (
                        <li key={shipment._id} className="shipment-item">
                            <div className="shipment-info">
                                <span className="shipment-id">Shipment ID: {shipment.shipmentId}</span>
                                <span className="arrival-date">
                                    Arrival Date: {isDefaultDate ? 'In Progress' : arrivalDate.toLocaleString()}
                                </span>
                                <span className="expected-arrival-date">Expected Arrival Date: {new Date(shipment.expectedArrivalDateTime).toLocaleString()}</span>
                                <span className="supplier">Supplier: {shipment.supplier}</span>

                                <h3 className="products-heading">Products:</h3>
                                <ul className="products-list">
                                    {shipment.products.map((product) => (
                                        <li key={product.productId} className="product-item">
                                            <span
                                                className="product-name"
                                                onMouseEnter={() => handleMouseEnter(product.productId)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                {product.productName}
                                            </span>

                                            {hoveredProductId === product.productId && (
                                                <div className="popup-box">
                                                    <span className="popup-content">
                                                        Quantity: {product.quantity} <br />
                                                        Status: {product.status}
                                                    </span>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <button className="delete-button" onClick={() => handleDelete(shipment._id)}>Delete</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ShipmentList;
