import React from "react";

const NotesSkeleton = () => {
  return (
    <div className="w-full bg-white flex flex-col justify-start gap-3 items-start mt-4 ">
      <div className="w-[95%]  h-4 rounded-full bg-slate-300 "></div>
      <div className="w-2/3 h-4 px-2  rounded-full bg-slate-300 "></div>
      <div className="w-3/4 h-4 rounded-full bg-slate-300 "></div>
      <div className="w-4/5  h-4 px-2  rounded-full bg-slate-300 "></div>
      <div className="w-[85%]  h-4 rounded-full bg-slate-300 "></div>{" "}
      <div className="w-[95%]  h-4 rounded-full bg-slate-300 "></div>
      <div className="w-2/3 h-4 px-2  rounded-full bg-slate-300 "></div>
      <div className="w-3/4 h-4 rounded-full bg-slate-300 "></div>
      <div className="w-4/5  h-4 px-2  rounded-full bg-slate-300 "></div>
      <div className="w-[85%]  h-4 rounded-full bg-slate-300 "></div>
    </div>
  );
};

export default NotesSkeleton;
