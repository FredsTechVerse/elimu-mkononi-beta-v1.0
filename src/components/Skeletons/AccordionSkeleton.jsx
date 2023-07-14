import React from "react";

const AccordionSkeleton = () => {
  return (
    <div className="relative z-10 flex flex-col items-center h-screen animate-pulse gap-2 ">
      <div className="flex items-center justify-between w-full px-2 h-12  font-bold bg-slate-300 text-center "></div>
      <div className="w-full gap-2 bg-slate-300"></div>
    </div>
  );
};

export default AccordionSkeleton;
