import React from "react";

import { useOutletContext } from "react-router-dom";
const CommentsSection = () => {
  const { currentLesson } = useOutletContext();

  return (
    <div className="w-full h-full flex-row-centered text-black">
      This is the CommentsSection
    </div>
  );
};

export default CommentsSection;
