import React from "react";
import { VideoSkeleton, VideoPlayer } from "..";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
const VideoSection = () => {
  const { currentLesson } = useCurrentLessonContext();

  if (currentLesson?.lessonUrl) {
    return (
      <div className="w-full text-center text-white flex flex-col justify-start text-3xl font-extrabold">
        <VideoPlayer title={currentLesson?.lessonName} />
      </div>
    );
  } else {
    return (
      <div className="w-full text-center text-white flex flex-col justify-start text-3xl font-extrabold">
        <VideoSkeleton />
      </div>
    );
  }
};

export default VideoSection;
