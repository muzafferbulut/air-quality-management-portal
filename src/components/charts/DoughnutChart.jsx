import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const labels = ["PM10", "SO2", "O3", "NO2", "CO"];

const DoughnutChart = ({ contaminantCounts }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Etkin Kirletici Oranları",
        data: contaminantCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: "Dönem İçindeki Etkin Kirletici Oranları" },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
