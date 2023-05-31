import React, { useState } from "react";
import {
  S3Uploader,
  ReactPdf,
  VideoJsPlayer,
  PieChart,
  BarChart,
  LineChart,
} from "../components";

// CHART.JS CONFIGS
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "../utils/data";
Chart.register(CategoryScale);
// RESOURCES IMPORTATION
const pdfUrl =
  "https://us-central1-elearning-module-a887d.cloudfunctions.net/app/s3Direct/ac9ef86fccbe70ffbc0a326196440962.pdf";
const DraftPage = () => {
  const playerRef = React.useRef(null);

  // CREATING A PIE CHART CONFIGS
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  // END OF PIE CHART CONFIGS

  // VIDEOJS CONFIGS
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        // src: "https://us-central1-elearning-module-a887d.cloudfunctions.net/app/s3Direct/7c5905364cc40aecf1a5d052cda9740b.mp4",
        // src: "https://kapesha001-demo.s3.ap-south-1.amazonaws.com/7c5905364cc40aecf1a5d052cda9740b.mp4",
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  // END OF VIDEOJS CONFIGS

  return (
    <div className=" w-full h-full flex-col-centered justify-start">
      <ReactPdf pdfUrl={pdfUrl} />
      {/* <S3Uploader /> */}
      {/* <div className="border-2 border-primary rounded-lg w-[700px] my-auto h-auto ">
        <VideoJsPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </div> */}
      {/* <PieChart chartData={chartData} />
      <BarChart chartData={chartData} />
      <LineChart chartData={chartData} /> */}
    </div>
  );
};

export default DraftPage;
