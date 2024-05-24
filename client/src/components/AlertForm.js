import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/AlertForm.css'; // Import CSS file for styling

const AlertForm = () => {
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        threshold: '',
        alertType: 'normal',
    });
    const [products, setProducts] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/pallets/display');
                const pallets = response.data;

                // Extract unique products from pallets
                const uniqueProducts = [];
                const productIds = new Set();
                pallets.forEach(pallet => {
                    pallet.products.forEach(product => {
                        if (!productIds.has(product.productId)) {
                            productIds.add(product.productId);
                            uniqueProducts.push(product);
                        }
                    });
                });
                setProducts(uniqueProducts);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, []);

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
            console.log("sent");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
            setFormData({
                productId: '',
                productName: '',
                threshold: '',
                alertType: 'normal',
            });
        } catch (err) {
            console.error('Error creating alert:', err);
            alert('Error creating alert');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="alert-form">
                <select
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="" disabled>Select Product</option>
                    {products.map(product => (
                        <option key={product.productId} value={product.productId}>
                            {product.productName} (ID: {product.productId})
                        </option>
                    ))}
                </select>
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
            {showNotification && <div className="notification">Alert created successfully!</div>}
        </div>
    );
};

export default AlertForm;
