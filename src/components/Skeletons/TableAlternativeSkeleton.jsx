import React from "react";
import { UserCardSkeleton } from "../../components";
const TableAlternativeSkeleton = () => {
  return (
    <div className="phone:block laptop:hidden w-full flex-col-centered">
      <div className="flex-col-centered">
        <div className="bg-slate-300 flex items-center justify-start w-full ml-7 mb-1"></div>
        <div className="grid-sm">
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
        </div>
      </div>
    </div>
  );
};

export default TableAlternativeSkeleton;
