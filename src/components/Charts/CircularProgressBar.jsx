import React, { useState, useEffect } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const CircularProgressBar = ({ percentCompleted = 0 }) => {
  const [percentRemaining, setPercentRemaining] = useState(0);

  useEffect(() => {
    setPercentRemaining(100 - percentCompleted);
  }, [percentCompleted]);
  const chartData = {
    labels: ["Remaining", "Completed"],
    datasets: [
      {
        label: "Progress",
        data: [percentRemaining, percentCompleted],
        backgroundColor: ["rgb(226 232 240)", "006adb"],
        borderColor: ["rgb(226 232 240)", "blue"],
      },
    ],
  };

  const options = {
    cutout: "87%",
    animation: { animateScale: true, animateRotate: true },
    plugins: {
      legend: { display: false },
    },
  };
  return (
    <div className="h-20 aspect-square flex-row-centered relative">
      <Doughnut data={chartData} options={options}></Doughnut>
      <div className="absolute flex-col-centered">
        <p className="text-center text-md font-bold">{percentCompleted} %</p>
        <p className="font-extralight text-xs">Uploaded</p>
      </div>
    </div>
  );
};

export default CircularProgressBar;
