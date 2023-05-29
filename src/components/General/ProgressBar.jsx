import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="progressBar flex-col-centered w-full h-1.5 rounded-full px-2">
      <div
        className={`${
          progress === 100 ? "hidden" : "flex"
        } progress h-full bg-blue-400 rounded-full`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
