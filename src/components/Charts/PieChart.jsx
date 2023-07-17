import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({ chartData }) => {
  console.log(chartData);
  const options = {
    borderRadius: 4,

    plugins: {
      title: { display: false, text: "Distribution of Users" },
      legend: { display: false },
    },
  };
  return (
    <div className="w-full h-full flex-col-centered gap-2">
      <h1 className="uppercase font-bold">Workload</h1>
      <div className="h-48 laptop:h-60 aspect-square flex-row-centered relative ">
        <Pie data={chartData} options={options}></Pie>
      </div>
    </div>
  );
};

export default DoughnutChart;
