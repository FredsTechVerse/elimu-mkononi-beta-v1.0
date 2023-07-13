import React from "react";

const ContentSectionSkeleton = () => {
  return (
    <div className="w-full animate-pulse flex flex-col justify-start items-center m-2 ">
      <div className="bg-slate-400 h-8 w-full"></div>
      <div className="w-full aspect-video bg-slate-400"></div>
      <div className="w-full bg-slate-400 flex flex-col justify-start items-center">
        <div className="w-28 h-4  rounded-full bg-slate-400 "></div>
        <div className="w-64 h-4 px-2  rounded-full bg-slate-400 "></div>
        <div className="w-36 h-4  rounded-full bg-slate-400 "></div>
        <div className="w-24 h-4 px-2  rounded-full bg-slate-400 "></div>
      </div>
    </div>
  );
};

export default ContentSectionSkeleton;
