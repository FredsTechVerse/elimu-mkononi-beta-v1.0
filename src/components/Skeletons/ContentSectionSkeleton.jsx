import React from "react";
import {
  VideoSkeleton,
  UnitNavSkeleton,
  NotesSkeleton,
} from "../../components";
const ContentSectionSkeleton = () => {
  return (
    <div className="w-full animate-pulse flex flex-col justify-start items-center m-2 overflow-x-hidden  ">
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
