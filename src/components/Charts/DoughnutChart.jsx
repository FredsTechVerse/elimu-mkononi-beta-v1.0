import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({ chartData, key = "Users", value = 50 }) => {
  const options = {
    borderRadius: 10,
    borderWidth: 1,
    spacing: 5,
    circumference: 360,
    cutout: "75%",
    animation: { animateScale: true, animateRotate: true },

    plugins: {
      title: { display: false, text: "Distribution of Users" },
      legend: { display: false },
    },
  };
  return (
    <div className="h-48 laptop:h-60 aspect-square flex-row-centered relative ">
      <Doughnut data={chartData} options={options}></Doughnut>
      <div className="absolute flex-col-centered">
        <div className="font-extralight text-xs">{key}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default DoughnutChart;
