import React from "react";
const CourseSkeleton = () => {
  return (
    <div className=" flex flex-col items-center w-full h-full  rounded-xl m-3 bg-white animate-pulse">
      <div className="bg-gray-300 w-full h-[220px] tablet:h-[180px] laptop:h-[220px]  rounded-t-xl object-cover  bg-cover bg-center"></div>
      <p className="text-sm tablet:text-xs laptop:text-sm font-bold flex-row-centered bg-slate-300 text-white capitalize px-4 h-8 pt-0.5 w-24 mt-[203px] tablet:mt-[165px] laptop:mt-[203px]  absolute  text-center rounded-full "></p>

      <div className="flex flex-col justify-start items-center pt-8 w-full  h-[110px] rounded-b-xl">
        <div className="w-48 h-4  rounded-full bg-slate-300 "></div>
        <div className="w-36 h-4 px-2  rounded-full bg-slate-300 "></div>
        <div className="w-44 h-4 px-2  rounded-full bg-slate-300 "></div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
