import React from "react";

const QuillEditorSkeleton = () => {
  return (
    <div className="w-full bg-white flex flex-col justify-start gap-3 items-start mt-4 ">
      <div className="w-[95%]  h-3  rounded-full bg-slate-300 "></div>
      <div className="w-2/3 h-3 px-2  rounded-full bg-slate-300 "></div>
      <div className="w-3/4 h-3  rounded-full bg-slate-300 "></div>
      <div className="w-4/5  h-3 px-2  rounded-full bg-slate-300 "></div>
      <div className="w-[85%]  h-3  rounded-full bg-slate-300 "></div>
      <div className="w-3/4 h-3 px-2  rounded-full bg-slate-300 "></div>
    </div>
  );
};

export default QuillEditorSkeleton;
