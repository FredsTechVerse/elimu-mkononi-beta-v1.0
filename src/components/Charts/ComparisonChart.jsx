import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
import { Line } from "react-chartjs-2";
import { Data } from "../../utils/data";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

const months = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels: months,
  datasets: [
    {
      label: "Users Gained",
      data: Data.map((data) => data.userGain),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Users Lost",
      data: Data.map((data) => data.userLost),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const ComparisonChart = () => {
  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Line Chart",
          },
        },
      }}
      data={data}
    />
  );
};

export default ComparisonChart;
