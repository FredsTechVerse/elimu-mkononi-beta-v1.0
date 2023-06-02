import React from "react";

const CourseSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-sm mx-auto hover:scale-105 ease-in-out duration-300 animate-pulse">
      <div className="bg-gray-300 h-48 lg:w-56 w-48 rounded-lg shadow-md bg-cover bg-center"></div>

      <div className="w-44  md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden flex-col-centered gap-2 py-2">
        <div className="w-28 h-5  rounded-full bg-slate-400 "></div>
        <div className="w-20 h-6 px-2  rounded-full bg-slate-400 "></div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
