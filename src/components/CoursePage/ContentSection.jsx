import React, { useState, useEffect } from "react";
import { VideoComponent, TutorCoverPage } from "../../components";
const ContentSection = ({ currentLesson }) => {
  const [lessonType, setLessonType] = useState(null);
  const identifyLessonType = (lessonUrl) => {
    if (lessonUrl !== null) {
      const lessonType = lessonUrl.split(".")[1];
      return lessonType;
    }
  };
  useEffect(() => {
    if (currentLesson?.lessonUrl) {
      setLessonType(identifyLessonType(currentLesson?.lessonUrl));
    }
  }, [currentLesson]);

  return (
    <div className="w-full text-center text-white flex flex-col justify-start text-3xl font-extrabold">
      {lessonType == "mp4" ? (
        <VideoComponent
          src={`https://us-central1-elearning-module-a887d.cloudfunctions.net/app/s3Direct/${currentLesson.lessonUrl}`}
          // src={`https://us-central1-elearning-module-a887d.cloudfunctions.net/app/s3Direct/1982d655351ec7abde4869fd4968f7a7.mp4`}
          title={`Simple Test`}
        />
      ) : (
        <TutorCoverPage />
      )}
    </div>
  );
};

export default ContentSection;
