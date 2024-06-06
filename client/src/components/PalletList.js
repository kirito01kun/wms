import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style/PalletList.css'; // Import CSS for styling

const PalletList = () => {
    const [pallets, setPallets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPallets();
    }, []);

    const fetchPallets = async () => {
        try {
            console.log("Fetching pallets...");
            const response = await axios.get('http://localhost:5000/api/pallets/display');
            console.log("Response data:", response.data);
            setPallets(response.data);
        } catch (error) {
            console.error('Error fetching pallets:', error);
            setError('Error fetching pallets');
        }
    };

    const deletePallet = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/pallets/del/${id}`);
            setPallets(pallets.filter(pallet => pallet._id !== id)); // Update the state after deletion
        } catch (error) {
            console.error('Error deleting pallet:', error);
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="pallet-list-container">
            <h2>Pallet List</h2>
            <Link to="/add-pallet" className="add-pallet-link">Add New Pallet</Link>
            <div className="pallet-list-scrollable">
                <ul className="pallet-list">
                    {pallets.length === 0 ? (
                        <li className="no-pallets">No pallets found</li>
                    ) : (
                        pallets.map((pallet) => (
                            <li key={pallet.palletId} className="pallet-item">
                                <h3>Pallet ID: {pallet.palletId}</h3>
                                <p>Availability: {pallet.isPlaced ? 'Placed' : 'Available'}</p>
                                <ul className="product-list">
                                    {pallet.products.map((product, index) => (
                                        <li key={index} className="product-item">
                                            {product.productName} (ID: {product.productId}) - Quantity: {product.quantity}
                                        </li>
                                    ))}
                                </ul>
                                <div className="pallet-actions">
                                    <Link to={`/update-pallet/${pallet.palletId}`} className="edit-link">Edit</Link>
                                    <button onClick={() => deletePallet(pallet._id)} className="delete-btn">Delete</button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PalletList;
