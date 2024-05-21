import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdatePallet.css'; // Import CSS for styling

const UpdatePallet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pallet, setPallet] = useState({
        palletId: '',
        products: [{ productId: '', productName: '', quantity: 0 }]
    });
    const [productsToRemove, setProductsToRemove] = useState([]);

    useEffect(() => {
        const fetchPallet = async () => {
            try {
                console.log('ID:', id);
                const response = await axios.get(`http://localhost:5000/api/pallets/display/${id}`);
                setPallet(response.data);
            } catch (error) {
                console.error('Error fetching pallet:', error);
            }
        };
        fetchPallet();
    }, [id]);

    const handleChange = (index, key, value) => {
        const updatedProducts = [...pallet.products];
        updatedProducts[index][key] = value;
        setPallet(prevPallet => ({
            ...prevPallet,
            products: updatedProducts
        }));
    };

    const handleAddProduct = () => {
        setPallet(prevPallet => ({
            ...prevPallet,
            products: [...prevPallet.products, { productId: '', productName: '', quantity: 0 }]
        }));
    };

    const handleRemoveProduct = (index) => {
        setProductsToRemove(prevState => {
            const newState = [...prevState];
            if (newState.includes(index)) {
                newState.splice(newState.indexOf(index), 1);
            } else {
                newState.push(index);
            }
            return newState;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPallet = {
            ...pallet,
            products: pallet.products.filter((_, index) => !productsToRemove.includes(index))
        };
        try {
            await axios.patch(`http://localhost:5000/api/pallets/update/${id}`, updatedPallet);
            navigate('/pallets');
        } catch (error) {
            console.error('Error updating pallet:', error);
        }
    };

    return (
        <div className="update-pallet-container">
            <h2>Update Pallet</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Pallet ID:</label>
                    <input 
                        type="text" 
                        name="palletId" 
                        value={pallet.palletId} 
                        onChange={(e) => setPallet(prevPallet => ({
                            ...prevPallet,
                            palletId: e.target.value
                        }))} 
                        className="input-field"
                    />
                </div>
                <h3>Products</h3>
                {pallet.products.map((product, index) => (
                    <div key={index} className={`product-item ${productsToRemove.includes(index) ? 'marked-for-removal' : ''}`}>
                        <div className="form-group">
                            <label>Product ID:</label>
                            <input 
                                type="text" 
                                value={product.productId} 
                                onChange={(e) => handleChange(index, 'productId', e.target.value)} 
                                className="input-field"
                            />
                        </div>
                        <div className="form-group">
                            <label>Product Name:</label>
                            <input 
                                type="text" 
                                value={product.productName} 
                                onChange={(e) => handleChange(index, 'productName', e.target.value)} 
                                className="input-field"
                            />
                        </div>
                        <div className="form-group">
                            <label>Quantity:</label>
                            <input 
                                type="number" 
                                value={product.quantity} 
                                onChange={(e) => handleChange(index, 'quantity', e.target.value)} 
                                className="input-field"
                            />
                        </div>
                        <button type="button" className="remove-product-btn" onClick={() => handleRemoveProduct(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" className="add-product-btn" onClick={handleAddProduct}>Add Product</button>
                <button type="submit" className="update-pallet-btn">Update Pallet</button>
            </form>
        </div>
    );
};

export default UpdatePallet;
