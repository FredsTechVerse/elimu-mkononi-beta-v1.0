import React from "react";
const CourseSkeleton = () => {
  return (
    <div className=" flex flex-col items-center w-full h-full  rounded-xl m-3 bg-white animate-pulse">
      <div className="bg-gray-300 w-full h-[220px] tablet:h-[180px] laptop:h-[220px]  rounded-t-xl object-cover  bg-cover bg-center"></div>

      <div className="flex flex-col justify-start items-center gap-2 pt-4 w-full  h-[110px] rounded-b-xl">
        <div className="w-[85%] h-4  rounded-full bg-slate-300 "></div>
        <div className="w-3/4 h-4 px-2  rounded-full bg-slate-300 "></div>
        <div className="w-1/2 h-4 px-2  rounded-full bg-slate-300 "></div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
