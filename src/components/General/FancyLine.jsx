import React from "react";

const FancyLine = ({ size }) => {
  return (
    <div
      className={`${
        size === "sm" ? "w-20" : size === "md" ? "w-28" : "w-36"
      } bg-primary rounded-full h-5`}
    ></div>
  );
};

export default FancyLine;
