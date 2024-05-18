import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Pallet List</h2>
            <Link to="/add-pallet">Add New Pallet</Link>
            <ul>
                {pallets.length === 0 ? (
                    <li>No pallets found</li>
                ) : (
                    pallets.map((pallet) => (
                        <li key={pallet.palletId}>
                            <h3>Pallet ID: {pallet.palletId}</h3>
                            <ul>
                                {pallet.products.map((product, index) => (
                                    <li key={index}>
                                        {product.productName} (ID: {product.productId}) - Quantity: {product.quantity}
                                    </li>
                                ))}
                            </ul>
                            <Link to={`/update-pallet/${pallet.palletId}`}>Edit</Link>
                            <button onClick={() => deletePallet(pallet._id)}>Delete</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default PalletList;
