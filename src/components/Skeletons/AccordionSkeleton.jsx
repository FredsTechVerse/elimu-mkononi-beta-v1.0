import React from "react";

const AccordionSkeleton = () => {
  return (
    <div className=" flex flex-col justify-start items-center h-screen animate-pulse gap-2 ">
      <div className="flex items-center justify-center w-full px-2 h-10  font-bold bg-slate-300 text-center "></div>
      <div className="w-full bg-white flex flex-col justify-center items-center  gap-2  ">
        <div className="w-[100%]  h-8  rounded-md bg-slate-300 "></div>
        <div className="w-[100%]  h-8  rounded-md bg-slate-300 "></div>
        <div className="w-[100%]  h-8  rounded-md bg-slate-300 "></div>
        <div className="w-[100%]  h-8  rounded-md bg-slate-300 "></div>
        <div className="w-[100%]  h-8  rounded-md bg-slate-300 "></div>
        <div className="w-[100%]  h-8  rounded-md bg-slate-300 "></div>
        <div className="w-[100%]  h-8  rounded-md bg-slate-300 "></div>
      </div>
    </div>
  );
};

export default AccordionSkeleton;
