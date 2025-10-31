import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ timeSeries }) => {
  const data = {
    labels: timeSeries.labels.map((label) =>
      new Date(label).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "AQI İndeks Değişimi",
        data: timeSeries.aqiIndex,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Zamana Göre AQI İndeksi Değişimi" },
    },
    scales: {
      x: { title: { display: true, text: "Okuma Zamanı" } },
      y: { title: { display: true, text: "AQI İndeksi" }, beginAtZero: true },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
