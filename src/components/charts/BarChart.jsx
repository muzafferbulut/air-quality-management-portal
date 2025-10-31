import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["PM10", "SO2", "O3", "NO2", "CO"];

const BarChart = ({ averageMetrics }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Ortalama İndeks Değerleri",
        data: averageMetrics,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Ortalama Kirlilik İndeksi Değerleri (Seçili Dönem)",
      },
    },
    scales: { y: { beginAtZero: true } },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
