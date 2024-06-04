import React, { useState } from 'react';
import axios from 'axios';
import './style/AddShipment.css'; // Import CSS file for styling

const AddShipment = () => {
    const [shipmentId, setShipmentId] = useState('');
    const [arrivalDateTime, setArrivalDateTime] = useState('');
    const [expectedArrivalDateTime, setExpectedArrivalDateTime] = useState('');
    const [supplier, setSupplier] = useState('');
    const [products, setProducts] = useState([{ productId: '', productName: '', quantity: '', status: 'not_received' }]);

    const handleProductChange = (index, event) => {
        const newProducts = [...products];
        newProducts[index][event.target.name] = event.target.value;
        setProducts(newProducts);
    };

    const addProduct = () => {
        setProducts([...products, { productId: '', productName: '', quantity: '', status: 'not_received' }]);
    };

    const removeProduct = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newShipment = {
                shipmentId,
                arrivalDateTime,
                expectedArrivalDateTime,
                supplier,
                products
            };
            await axios.post('http://localhost:5000/api/shipments/add', newShipment);
            alert('Shipment added successfully');

            // Reset form fields
            setShipmentId('');
            setArrivalDateTime('');
            setExpectedArrivalDateTime('');
            setSupplier('');
            setProducts([{ productId: '', productName: '', quantity: '', status: 'not_received' }]);
        } catch (err) {
            console.error('Error adding shipment:', err);
        }
    };

    return (
        <div className="add-shipment-container">
            <h2 className="add-shipment-heading">Add New Shipment</h2>
            <form className="add-shipment-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Shipment ID:</label>
                    <input type="text" value={shipmentId} onChange={(e) => setShipmentId(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Arrival Date:</label>
                    <input type="datetime-local" value={arrivalDateTime} onChange={(e) => setArrivalDateTime(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Expected Arrival Date:</label>
                    <input type="datetime-local" value={expectedArrivalDateTime} onChange={(e) => setExpectedArrivalDateTime(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Supplier:</label>
                    <input type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Products:</label>
                    {products.map((product, index) => (
                        <div key={index} className="product-group">
                            <input type="text" name="productId" value={product.productId} onChange={(e) => handleProductChange(index, e)} placeholder="Product ID" required />
                            <input type="text" name="productName" value={product.productName} onChange={(e) => handleProductChange(index, e)} placeholder="Product Name" required />
                            <input type="number" name="quantity" value={product.quantity} onChange={(e) => handleProductChange(index, e)} placeholder="Quantity" required />
                            <select name="status" value={product.status} onChange={(e) => handleProductChange(index, e)}>
                                <option value="not_received">Not Received</option>
                                <option value="partial">Partial</option>
                                <option value="complete">Complete</option>
                            </select>
                            <button type="button" className="remove-product-button" onClick={() => removeProduct(index)}>Remove Product</button>
                        </div>
                    ))}
                    <button type="button" onClick={addProduct}>Add Another Product</button>
                </div>
                <button type="submit">Add Shipment</button>
            </form>
        </div>
    );
};

export default AddShipment;
