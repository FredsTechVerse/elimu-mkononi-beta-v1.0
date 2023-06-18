const CourseSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-sm mx-auto hover:scale-105 ease-in-out duration-300 animate-pulse">
      <div className="bg-gray-300 h-44 w-44 laptop:w-56 laptop:h-60 rounded-lg shadow-md bg-cover bg-center"></div>

      <div className="w-36 laptop:w-48  bg-white -mt-10 shadow-lg rounded-lg overflow-hidden flex-col-centered gap-2 py-2">
        <div className="w-28 h-4  rounded-full bg-slate-400 "></div>
        <div className="w-20 h-4 px-2  rounded-full bg-slate-400 "></div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
