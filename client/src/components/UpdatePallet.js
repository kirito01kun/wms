import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePallet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pallet, setPallet] = useState({
        palletId: '',
        products: [{ productId: '', productName: '', quantity: 0 }]
    });

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
        const updatedProducts = [...pallet.products];
        updatedProducts.splice(index, 1);
        setPallet(prevPallet => ({
            ...prevPallet,
            products: updatedProducts
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/api/pallets/update/${id}`, pallet);
            navigate('/pallets');
        } catch (error) {
            console.error('Error updating pallet:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Pallet ID:
                <input type="text" name="palletId" value={pallet.palletId} onChange={(e) => setPallet(prevPallet => ({
                    ...prevPallet,
                    palletId: e.target.value
                }))} />
            </label>
            <h3>Products</h3>
            {pallet.products.map((product, index) => (
                <div key={index}>
                    <label>
                        Product ID:
                        <input type="text" value={product.productId} onChange={(e) => handleChange(index, 'productId', e.target.value)} />
                    </label>
                    <label>
                        Product Name:
                        <input type="text" value={product.productName} onChange={(e) => handleChange(index, 'productName', e.target.value)} />
                    </label>
                    <label>
                        Quantity:
                        <input type="number" value={product.quantity} onChange={(e) => handleChange(index, 'quantity', e.target.value)} />
                    </label>
                    <button type="button" onClick={() => handleRemoveProduct(index)}>Remove</button>
                </div>
            ))}
            <button type="button" onClick={handleAddProduct}>Add Product</button>
            <button type="submit">Update Pallet</button>
        </form>
    );
};

export default UpdatePallet;
