import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography } from '@mui/material';
import './style/ActiveAlertsOverview.css';

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

const ActiveAlertsOverview = () => {
  const [alertData, setAlertData] = useState({ normal: 0, warning: 0, critical: 0 });

  useEffect(() => {
    const fetchAlertData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/alerts/display');
        const normalAlerts = response.data.filter(alert => alert.alertType === 'normal').length;
        const warningAlerts = response.data.filter(alert => alert.alertType === 'warning').length;
        const criticalAlerts = response.data.filter(alert => alert.alertType === 'critical').length;
        setAlertData({ normal: normalAlerts, warning: warningAlerts, critical: criticalAlerts });
      } catch (error) {
        console.error('Error fetching alert data:', error);
      }
    };

    fetchAlertData();
  }, []);

  const chartData = {
    labels: ['Normal', 'Warning', 'Critical'],
    datasets: [{
      data: [alertData.normal, alertData.warning, alertData.critical],
      backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
    }]
  };

  return (
    <Card className="alert-card">
      <CardContent>
        <Typography variant="h6" component="div">
          Active Alerts Overview
        </Typography>
        <div className="chart-container">
          <Pie data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveAlertsOverview;
