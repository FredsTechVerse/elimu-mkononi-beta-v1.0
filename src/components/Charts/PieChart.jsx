import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData, doughnutName = "Users" }) => {
  const options = {
    borderRadius: 4,

    plugins: {
      title: { display: false, text: "Distribution of Users" },
      legend: { display: false },
    },
  };
  return (
    <div className="w-full h-full flex-col-centered gap-2">
      <div className="h-56 laptop:h-64 aspect-square flex-row-centered relative ">
        <Pie data={chartData} options={options}></Pie>
      </div>
    </div>
  );
};

export default PieChart;
