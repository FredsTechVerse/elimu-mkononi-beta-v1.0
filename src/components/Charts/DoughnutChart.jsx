import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

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
    borderRadius: 10,
    borderWidth: 1,
    spacing: 5,
    circumference: 360,
    cutout: "75%",
    animation: { animateScale: true, animateRotate: true },

    plugins: {
      title: { display: true, text: "Distribution of Users" },
      legend: { display: false },
    },
  };
  return (
    <div className="h-48 laptop:h-60 aspect-square flex-row-centered relative ">
      <Doughnut data={chartData} options={options}></Doughnut>
      <div className="absolute flex-col-centered">
        <div className="font-extralight text-xs">Total Users</div>
        <div className="text-2xl font-bold">45</div>
      </div>
    </div>
  );
};

export default DoughnutChart;
