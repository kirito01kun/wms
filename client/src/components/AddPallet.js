import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddPallet.css'; // Import CSS for styling

const AddPallet = () => {
    const [palletId, setPalletId] = useState('');
    const [products, setProducts] = useState([{ productId: '', productName: '', quantity: 0 }]);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

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
            const response = await axios.post('http://localhost:5000/api/pallets/add', { palletId, products });
            setSuccessMessage(`Pallet ${response.data.palletId} added successfully`);
            setPalletId('');
            setProducts([{ productId: '', productName: '', quantity: 0 }]);

            setTimeout(() => {
                setSuccessMessage('');
                navigate('/pallets');
            }, 3000);
        } catch (error) {
            console.error('Error adding pallet:', error);
        }
    };

    return (
        <div className="add-pallet-container">
            <h2>Add New Pallet</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
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
        </div>
    );
};

export default AddPallet;
