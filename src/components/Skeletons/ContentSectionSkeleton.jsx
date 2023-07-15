import React from "react";
import {
  VideoSkeleton,
  UnitNavSkeleton,
  NotesSkeleton,
} from "../../components";
const ContentSectionSkeleton = () => {
  return (
    <div className="w-full animate-pulse flex flex-col justify-start items-center m-2 ">
      <UnitNavSkeleton />
      <NotesSkeleton />
    </div>
  );
};

export default ContentSectionSkeleton;
