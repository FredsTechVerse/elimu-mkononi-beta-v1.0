import React from "react";

const StatusPill = ({ status }) => {
  return (
    <p
      className={` ${
        status == "active"
          ? "bg-green-500 bg-opacity-70 text-green-900"
          : "bg-rose-500 bg-opacity-70 text-rose-900"
      }  w-20 h-5  phone:absolute laptop:relative top-0 right-0   rounded-tr-xl rounded-bl-xl laptop:rounded-full flex-row-centered text-sm capitalize  `}
    >
      {status}
    </p>
  );
};

export default StatusPill;
