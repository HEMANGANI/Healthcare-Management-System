import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);

const SharedChart = ({ data, options, chartType }) => {
  let ChartComponent;

  switch (chartType) {
    case 'line':
      ChartComponent = Line;
      break;
    case 'bar':
      ChartComponent = Bar;
      break;
    // Add more cases for different chart types if needed
    default:
      ChartComponent = Line; // Default to line chart
  }

  return <ChartComponent data={data} options={options} />;
};

export default SharedChart;
