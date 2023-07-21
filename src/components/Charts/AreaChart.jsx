import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: true,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];
const chartData = {
  labels,
  datasets: [
    {
      label: "Units",
      data: [24, 15, 36, 28, 30, 37, 33, 30, 28],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      fill: true,
    },
  ],
};

const AreaChart = () => {
  return <Line data={chartData} options={options} />;
};

export default AreaChart;
