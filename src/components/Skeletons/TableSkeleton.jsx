import React from "react";

const TableSkeleton = () => {
  return (
    <div className="hidden laptop:block w-full bg-white animate-pulse">
      <div className="w-full h-12 bg-slate-300"></div>
      <hr className="my-2" />
      <div className="w-full body h-48 bg-slate-300"></div>
    </div>
  );
};

export default TableSkeleton;
