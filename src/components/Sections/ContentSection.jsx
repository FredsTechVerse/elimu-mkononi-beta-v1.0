import React from "react";
import { VideoComponent, VideoSkeleton } from "../../components";
const ContentSection = ({ currentLessonData, updateCurrentLesson }) => {
  if (currentLessonData) {
    return (
      <div className="w-full text-center text-white flex flex-col justify-start text-3xl font-extrabold">
        <VideoComponent
          // src={`http://localhost:5000/elearning-module-a887d/us-central1/app/s3Direct/${currentLessonData?.lessonUrl}`}
          src={`https://us-central1-elearning-module-a887d.cloudfunctions.net/app/s3Direct/${currentLessonData?.lessonUrl}`}
          title={currentLessonData?.lessonName}
          currentLesson={currentLessonData}
          updateCurrentLesson={updateCurrentLesson}
        />
      </div>
    );
  }
  return (
    <div className="w-full text-center text-white flex flex-col justify-start text-3xl font-extrabold">
      <VideoSkeleton />
    </div>
  );
};

export default ContentSection;
