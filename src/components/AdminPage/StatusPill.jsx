import React from "react";

const StatusPill = ({ status }) => {
  return (
    <div
      className={` ${
        status == "active"
          ? "bg-green-500 bg-opacity-70 text-green-900"
          : "bg-rose-500 bg-opacity-70 text-rose-900"
      } flex items-center justify-center rounded-full w-20 h-5 `}
    >
      <p className="text-center font-bold text-sm capitalize">{status}</p>
    </div>
  );
};

export default StatusPill;
