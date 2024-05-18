import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h2>Add New Pallet</h2>
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Pallet ID:
                    <input
                        type="text"
                        value={palletId}
                        onChange={(e) => setPalletId(e.target.value)}
                    />
                </label>
                <h3>Products</h3>
                {products.map((product, index) => (
                    <div key={index}>
                        <label>
                            Product ID:
                            <input
                                type="text"
                                name="productId"
                                value={product.productId}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </label>
                        <label>
                            Product Name:
                            <input
                                type="text"
                                name="productName"
                                value={product.productName}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </label>
                        <label>
                            Quantity:
                            <input
                                type="number"
                                name="quantity"
                                value={product.quantity}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </label>
                    </div>
                ))}
                <button type="button" onClick={handleAddProduct}>Add Product</button>
                <button type="submit">Save Pallet</button>
            </form>
        </div>
    );
};

export default AddPallet;
