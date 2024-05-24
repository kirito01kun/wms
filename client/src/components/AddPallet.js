import React, { useState } from 'react';
import axios from 'axios';
import './style/AddPallet.css';

const AddPallet = () => {
    const [palletId, setPalletId] = useState('');
    const [products, setProducts] = useState([{ productId: '', productName: '', quantity: 0 }]);
    const [showNotification, setShowNotification] = useState(false);

    const handleAddProduct = () => {
        setProducts([...products, { productId: '', productName: '', quantity: 0 }]);
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newProducts = [...products];
        newProducts[index][name] = value;
        setProducts(newProducts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('before response:');
            setShowNotification(true);
            setProducts([{ productId: '', productName: '', quantity: 0 }]);
            setTimeout(() => setShowNotification(false), 3000);
            await axios.post('http://localhost:5000/api/pallets/add', { palletId, products });
        } catch (error) {
            console.error('Error adding pallet:', error);
        }
    };

    return (
        <div className="add-pallet-container">
            <h2>Add New Pallet</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Pallet ID:</label>
                    <input
                        type="text"
                        value={palletId}
                        onChange={(e) => setPalletId(e.target.value)}
                        className="input-field"
                    />
                </div>
                <h3>Products</h3>
                {products.map((product, index) => (
                    <div key={index} className="product-item">
                        <div className="form-group">
                            <label>Product ID:</label>
                            <input
                                type="text"
                                name="productId"
                                value={product.productId}
                                onChange={(e) => handleChange(e, index)}
                                className="input-field"
                            />
                        </div>
                        <div className="form-group">
                            <label>Product Name:</label>
                            <input
                                type="text"
                                name="productName"
                                value={product.productName}
                                onChange={(e) => handleChange(e, index)}
                                className="input-field"
                            />
                        </div>
                        <div className="form-group">
                            <label>Quantity:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={product.quantity}
                                onChange={(e) => handleChange(e, index)}
                                className="input-field"
                            />
                        </div>
                    </div>
                ))}
                <button type="button" className="add-product-btn" onClick={handleAddProduct}>Add Product</button>
                <button type="submit" className="save-pallet-btn">Save Pallet</button>
            </form>
            {showNotification && <div className="notification">Pallet created successfully!</div>}
        </div>
    );
};

export default AddPallet;