import React from "react";

import { Pie } from "react-chartjs-2";

function PieChart() {
  const chartData = {
    labels: ["Tutors ,Students , Admin"],
    datasets: [
      {
        label: "Poll",
        data: [24, 3, 36],
        backgroundColor: ["red", "green", "blue"],
        borderColor: ["red", "green", "blue"],
      },
    ],
  };
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
          },
        }}
      />
    </div>
  );
}
export default PieChart;
