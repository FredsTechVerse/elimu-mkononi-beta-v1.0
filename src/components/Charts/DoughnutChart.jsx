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
    <div className="h-60 tablet:h-44 laptop:h-60 aspect-square flex-row-centered relative ">
      {chartData ? (
        <Doughnut data={chartData} options={options}></Doughnut>
      ) : (
        <DoughnutSkeleton />
      )}

      <div className="absolute flex-col-centered">
        <p className="font-extralight text-md tablet:text-sm laptop:text-md capitalize">
          {doughnutName}
        </p>
        <p className="text-2xl tablet:text-xl laptop:text-2xl font-bold">
          {doughnutValue}
        </p>
      </div>
    </div>
  );
};

export default DoughnutChart;
