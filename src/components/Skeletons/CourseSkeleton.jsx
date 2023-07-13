import React from "react";
const CourseSkeleton = () => {
  return (
    <div className="flex flex-col justify-start items-center max-w-sm mx-auto hover:scale-105 ease-in-out duration-300 animate-pulse">
      <div className="bg-gray-300 w-full h-[220px] tablet:h-[180px] laptop:h-[220px]  rounded-t-xl object-cover  bg-cover bg-center"></div>
      <p className="text-sm tablet:text-xs laptop:text-sm font-bold flex-row-centered bg-slate-500 text-white capitalize px-4 h-8 pt-0.5 mt-[203px] tablet:mt-[165px] laptop:mt-[203px]  absolute  text-center rounded-full "></p>

      <div className="flex flex-row justify-evenly items-start pt-8 w-full  h-[110px] rounded-b-xl">
        <div className="w-28 h-4  rounded-full bg-slate-400 "></div>
        <div className="w-20 h-4 px-2  rounded-full bg-slate-400 "></div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
