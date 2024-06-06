// LocationUtilizationByRack.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography } from '@mui/material';
import './style/LocationUtilizationByRack.css';

// Register the components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const LocationUtilizationByRack = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/locations/display');
        const locations = response.data;

        // Group data by rack
        const rackData = {};
        locations.forEach(location => {
          const rack = location.rack || 'Unknown';
          if (!rackData[rack]) {
            rackData[rack] = { occupied: 0, empty: 0 };
          }
          if (location.isEmpty) {
            rackData[rack].empty += 1;
          } else {
            rackData[rack].occupied += 1;
          }
        });

        const labels = Object.keys(rackData);
        const occupiedData = labels.map(rack => rackData[rack].occupied);
        const emptyData = labels.map(rack => rackData[rack].empty);

        setData({
          labels,
          datasets: [
            {
              label: 'Occupied',
              data: occupiedData,
              backgroundColor: '#FF6384'
            },
            {
              label: 'Empty',
              data: emptyData,
              backgroundColor: '#36A2EB'
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocationData();
  }, []);

  return (
    <Card className="location-card">
      <CardContent>
        <Typography variant="h6" component="div">
          Location Utilization by Rack
        </Typography>
        <div className="chart-container">
          <Bar
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false }
              },
              scales: {
                x: { stacked: true },
                y: { stacked: true }
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationUtilizationByRack;
