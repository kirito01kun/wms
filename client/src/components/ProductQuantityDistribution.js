import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import './style/ProductQuantityDistribution.css';

const ProductQuantityDistribution = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pallets/display');
        const products = response.data.flatMap(pallet => pallet.products);
        const productQuantities = {};
        products.forEach(product => {
          if (productQuantities[product.productId]) {
            productQuantities[product.productId].push(product.quantity);
          } else {
            productQuantities[product.productId] = [product.quantity];
          }
        });
        const productDistribution = Object.entries(productQuantities).map(([productId, quantities]) => ({
          productId,
          maxQuantity: Math.max(...quantities),
          minQuantity: Math.min(...quantities),
          avgQuantity: quantities.reduce((acc, cur) => acc + cur, 0) / quantities.length
        }));
        setProductData(productDistribution);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  const chartData = {
    labels: productData.map(product => product.productId),
    datasets: [
      {
        label: 'Maximum Quantity',
        data: productData.map(product => product.maxQuantity),
        backgroundColor: '#FF6384',
      },
      {
        label: 'Minimum Quantity',
        data: productData.map(product => product.minQuantity),
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Average Quantity',
        data: productData.map(product => product.avgQuantity),
        backgroundColor: '#FFCE56',
      },
    ],
  };

  return (
    <Card className="product-distribution-card">
      <CardContent>
        <Typography variant="h6" component="div">
          Product Quantity Distribution
        </Typography>
        <div className="chart-container">
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductQuantityDistribution;

