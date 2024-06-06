import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography } from '@mui/material';
import './style/ShipmentStatusOverview.css';

// Register the components
ChartJS.register(Tooltip, Legend);

const ShipmentStatusOverview = () => {
  const [shipmentData, setShipmentData] = useState({
    complete: 0,
    partial: 0,
    notReceived: 0
  });

  useEffect(() => {
    const fetchShipmentData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/shipments/display');
        const shipments = response.data;

        let completeCount = 0;
        let partialCount = 0;
        let notReceivedCount = 0;

        shipments.forEach(shipment => {
          shipment.products.forEach(product => {
            switch (product.status) {
              case 'complete':
                completeCount++;
                break;
              case 'partial':
                partialCount++;
                break;
              case 'not_received':
                notReceivedCount++;
                break;
              default:
                break;
            }
          });
        });

        setShipmentData({
          complete: completeCount,
          partial: partialCount,
          notReceived: notReceivedCount
        });
      } catch (error) {
        console.error('Error fetching shipment data:', error);
      }
    };

    fetchShipmentData();
  }, []);

  const chartData = {
    labels: ['Complete', 'Partial', 'Not Received'],
    datasets: [{
      data: [shipmentData.complete, shipmentData.partial, shipmentData.notReceived],
      backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
    }]
  };

  return (
    <Card className="shipment-card">
      <CardContent>
        <Typography variant="h6" component="div">
          Shipment Status Overview
        </Typography>
        <div className="chart-container">
          <Pie data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentStatusOverview;
