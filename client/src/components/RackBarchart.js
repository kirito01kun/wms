import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

const RackBarchart = ({ rackFullness }) => {
  const data = {
    labels: ['Rack Fullness'],
    datasets: [
      {
        label: 'Rack Fullness',
        data: [rackFullness],
        backgroundColor: ['#4CAF50'],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear', // Change linear to category
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RackBarchart;