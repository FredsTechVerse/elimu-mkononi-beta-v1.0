import React from "react";
import {
  VideoSkeleton,
  UnitNavSkeleton,
  NotesSkeleton,
} from "../../components";
const ContentSectionSkeleton = () => {
  return (
    <div className="w-full animate-pulse flex flex-col gap-1 justify-start items-center overflow-x-hidden p-0.5 ">
      <UnitNavSkeleton />
      <VideoSkeleton />
      <div className="w-full bg-white flex-col-centered gap-3 mt-4 ">
        <div className="w-[95%]  h-3 rounded-full bg-slate-300 "></div>
        <div className="w-3/4 h-3 rounded-full bg-slate-300 "></div>
        <div className="w-2/3 h-3 px-2  rounded-full bg-slate-300 "></div>
      </div>
    </div>
  );
};

export default ContentSectionSkeleton;
