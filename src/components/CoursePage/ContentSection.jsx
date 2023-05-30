import React from "react";
import { VideoComponent, VideoEmptyPoster } from "../../components";
const ContentSection = ({ currentLessonUrl, lessonName }) => {
  if (currentLessonUrl) {
    return (
      <div className="w-full text-center text-white flex flex-col justify-start text-3xl font-extrabold">
        <VideoComponent
          src={`https://us-central1-elearning-module-a887d.cloudfunctions.net/app/s3Direct/${currentLessonUrl}`}
          title={lessonName}
        />
      </div>
    );
  } else {
    return (
      <div className="w-full text-center text-white flex flex-col justify-start text-3xl font-extrabold">
        <VideoEmptyPoster />
      </div>
    );
  }
};

export default ContentSection;
