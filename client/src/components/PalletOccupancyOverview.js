import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography } from '@mui/material';
import './style/PalletOccupancyOverview.css';

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

const PalletOccupancyOverview = () => {
  const [data, setData] = useState({ placed: 0, available: 0 });

  useEffect(() => {
    const fetchPalletData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pallets/display');
        const placed = response.data.filter(pallet => pallet.isPlaced).length;
        const available = response.data.filter(pallet => !pallet.isPlaced).length;
        setData({ placed, available });
      } catch (error) {
        console.error('Error fetching pallet data:', error);
      }
    };

    fetchPalletData();
  }, []);

  const chartData = {
    labels: ['Placed', 'Available'],
    datasets: [{
      data: [data.placed, data.available],
      backgroundColor: ['#FF6384', '#36A2EB'],
    }]
  };

  return (
    <Card className="pallet-card">
      <CardContent>
        <Typography variant="h6" component="div">
          Pallet Occupancy Overview
        </Typography>
        <div className="chart-container">
          <Pie data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PalletOccupancyOverview;
