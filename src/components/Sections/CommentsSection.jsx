import React from "react";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
import { useOutletContext } from "react-router-dom";
const CommentsSection = () => {
  const { currentLesson } = useCurrentLessonContext();

  return (
    <div className="w-full h-full flex-row-centered text-black">
      This is the CommentsSection
    </div>
  );
};

export default CommentsSection;
