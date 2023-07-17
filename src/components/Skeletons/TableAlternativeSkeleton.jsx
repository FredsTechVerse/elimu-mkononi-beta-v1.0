import React from "react";

const TableAlternativeSkeleton = () => {
  return (
    <div className="phone:block laptop:hidden w-full gap-3 flex flex-col justify-start items-center animate-pulse">
      <div className="w-[95%]  h-4 rounded-full bg-slate-300 "></div>
      <div className="w-2/3 h-4 px-2  rounded-full bg-slate-300 "></div>
      <div className="w-1/2 h-4 rounded-full bg-slate-300 "></div>
    </div>
  );
};

export default TableAlternativeSkeleton;
