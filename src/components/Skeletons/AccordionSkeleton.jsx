import React from "react";

const AccordionSkeleton = () => {
  return (
    <div className="relative z-10 flex flex-col items-center h-screen animate-pulse gap-2 ">
      <div className="flex items-center justify-between w-full px-2 h-12  font-bold bg-slate-400 text-center"></div>
      <div className="flex-col-centered gap-2">
        <div className="w-64 h-4  rounded-full bg-slate-400 "></div>
        <div className="w-56 h-4  rounded-full bg-slate-400 "></div>
        <div className="w-32 h-4  rounded-full bg-slate-400 "></div>{" "}
      </div>
    </div>
  );
};

export default AccordionSkeleton;
