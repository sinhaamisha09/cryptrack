"use client";  

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
} from 'chart.js';
import { HistoricalUIData } from '../@types'; 
import { fetchCryptoHistory } from '../services/cryptoService';
import { chartDays } from '../config/chart.config';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface CryptoChartProps {
  cryptoId: string;
  cryptoName: string;
}

const CryptoChart: React.FC<CryptoChartProps> = ({ cryptoId, cryptoName }) => {
  const [history, setHistory] = useState<HistoricalUIData[]>([]);
  const [days, setDays] = useState(30); // Default to 30 days

  useEffect(() => {
    const fetchData = async () => {
      const now = new Date().getTime();
      const start = now - days * 24 * 60 * 60 * 1000; // Calculate start date based on days
      const end = now;

      const historyData = await fetchCryptoHistory(cryptoId, 'd1', start, end);
      setHistory(historyData);
    };

    fetchData();
  }, [cryptoId, days]);

  const data = {
    labels: history.map((dataPoint) => dataPoint.date),
    datasets: [
      {
        label: `${cryptoName} Price History`,
        data: history.map((dataPoint) => dataPoint.priceUsd),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Price History',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
      <div className="mt-4 flex justify-center">
        {chartDays.map((day) => (
          <button
            key={day.value}
            className={`btn ${day.value === days ? 'btn-primary' : 'btn-secondary'} mx-1`}
            onClick={() => setDays(day.value)}
          >
            {day.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CryptoChart;
