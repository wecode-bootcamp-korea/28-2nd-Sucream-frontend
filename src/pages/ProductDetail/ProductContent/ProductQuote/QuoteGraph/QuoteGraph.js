import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const QuoteGraph = ({ selectQuote }) => {
  const itemDays = selectQuote.map(item => item.created_at).reverse();
  const itemPrice = selectQuote.map(item => item.price).reverse();

  const data = {
    labels: itemDays,
    datasets: [
      {
        data: itemPrice,
        borderColor: '#EF6253',
        backgroundColor: 'rgba(239, 98, 83, 0.4)',
        pointRadius: 0,
      },
    ],
  };

  return <Line options={OPTION} data={data} />;
};

const OPTION = {
  responsive: true,
  plugins: {
    legend: {
      labels: false,
    },
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      position: 'right',
    },
  },
};

export default QuoteGraph;
