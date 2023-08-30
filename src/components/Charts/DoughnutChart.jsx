import React from "react";
import { DoughnutSkeleton } from "../../components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({
  chartData = null,
  doughnutName = "default",
  doughnutValue = 0,
}) => {
  const options = {
    borderRadius: 10,
    borderWidth: 1,
    spacing: 5,
    circumference: 360,
    cutout: "75%",
    animation: { animateScale: true, animateRotate: true },

    plugins: {
      title: { display: false },
      legend: { display: false },
    },
  };

  return (
    <div className="h-60 tablet:h-48 laptop:h-60 aspect-square flex-row-centered relative ">
      {chartData ? (
        <Doughnut data={chartData} options={options}></Doughnut>
      ) : (
        <DoughnutSkeleton />
      )}

      <div className="absolute flex-col-centered">
        <div className="font-extralight text-md capitalize">{doughnutName}</div>
        <div className="text-2xl font-bold">{doughnutValue}</div>
      </div>
    </div>
  );
};

export default DoughnutChart;
