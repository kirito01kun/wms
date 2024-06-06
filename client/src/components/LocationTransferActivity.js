import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import './style/LocationTransferActivity.css';

// Register the components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LocationTransferActivity = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationTransfersResponse = await axios.get('http://localhost:5000/api/locationTransfers/display');
        const putawaysResponse = await axios.get('http://localhost:5000/api/putaways/display');
        const pickingsResponse = await axios.get('http://localhost:5000/api/pickings/display');
    
        const locationTransfers = locationTransfersResponse.data;
        const putaways = putawaysResponse.data;
        const pickings = pickingsResponse.data;
    
        // Group data by date
        const dateMap = {};
        [locationTransfers, putaways, pickings].forEach(dataSet => {
          dataSet.forEach(item => {
            let date;
            if ('transferDateTime' in item) {
              date = new Date(item.transferDateTime);
            } else if ('timestamp' in item) {
              date = new Date(item.timestamp);
            } else {
              date = new Date(item.pickDateTime);
            }
            // Format date as YYYY-MM-DD
            const formattedDate = date.toISOString().split('T')[0];
            if (!dateMap[formattedDate]) {
              dateMap[formattedDate] = { transfers: 0, putaways: 0, pickings: 0 };
            }
            if ('transferDateTime' in item) {
              dateMap[formattedDate].transfers++;
            } else if ('timestamp' in item) {
              dateMap[formattedDate].putaways++;
            } else {
              dateMap[formattedDate].pickings++;
            }
          });
        });
    
        const labels = Object.keys(dateMap).sort();
        const transferCounts = labels.map(date => dateMap[date].transfers);
        const putawayCounts = labels.map(date => dateMap[date].putaways);
        const pickingCounts = labels.map(date => dateMap[date].pickings);
    
        setData({
          labels,
          datasets: [
            {
              label: 'Transfers',
              data: transferCounts,
              fill: false,
              backgroundColor: '#FF6384',
              borderColor: '#FF6384'
            },
            {
              label: 'Putaways',
              data: putawayCounts,
              fill: false,
              backgroundColor: '#36A2EB',
              borderColor: '#36A2EB'
            },
            {
              label: 'Pickings',
              data: pickingCounts,
              fill: false,
              backgroundColor: '#FFCE56',
              borderColor: '#FFCE56'
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
  }, []);

  return (
    <Card className="transfer-card">
      <CardContent>
        <Typography variant="h6" component="div">
          Location Activity
        </Typography>
        <div className="chart-container">
          <Line
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false }
              },
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Number of Activities' } }
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationTransferActivity;
