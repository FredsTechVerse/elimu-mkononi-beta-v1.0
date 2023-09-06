import React from "react";

const UserProfileSkeleton = () => {
  return (
    <div className="flex-col-centered gap-2  py-2 tablet:py-2 laptop:py-5  w-full rounded-xl phone:h-80 tablet:h-56 laptop:h-80   ">
      <div className="w-[220px] tablet:w-[130px] laptop:w-[220px] rounded-full aspect-square bg-slate-300 animate-pulse"></div>
      <div className="rounded-full h-6 animate-pulse bg-slate-300 w-[75%]"></div>
      <div className="rounded-full h-4 animate-pulse bg-slate-300 w-[45%]"></div>
    </div>
  );
};

export default UserProfileSkeleton;
