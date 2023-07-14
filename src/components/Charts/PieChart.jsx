import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = () => {
  const chartData = {
    labels: ["Tutors", "Students", "Admin"],
    datasets: [
      {
        label: "Poll",
        data: [24, 3, 36],
        backgroundColor: ["red", "green", "blue"],
        borderColor: ["red", "green", "blue"],
      },
    ],
  };

  const options = {
    borderRadius: 4,
    spacing: 1,
    circumference: 360,
    animation: { animateScale: true, animateRotate: true },

    plugins: {
      title: { display: true, text: "Distribution of Users" },
      legend: { display: false },
    },
  };
  return (
    <div className="h-48 laptop:h-60 aspect-square flex-row-centered relative ">
      <Pie data={chartData} options={options}></Pie>
      <div className="absolute flex-col-centered">
        <div className="font-extralight text-xs">Total Users</div>
        <div className="text-2xl font-bold">45</div>
      </div>
    </div>
  );
};

export default DoughnutChart;
