import React from "react";

const TableAlternativeSkeleton = () => {
  return (
    <div className="phone:block laptop:hidden w-full flex-col-centered animate-pulse">
      <div className="w-56 h-4  rounded-full bg-slate-300 "></div>
      <div className="w-48 h-4  rounded-full bg-slate-300 "></div>
      <div className="w-52 h-4  rounded-full bg-slate-300 "></div>
      <div className="w-36 h-4  rounded-full bg-slate-300 "></div>
    </div>
  );
};

export default TableAlternativeSkeleton;
