import React from "react";
import { VideoComponent, VideoSkeleton, VideoPlayer } from "..";
const VideoSection = ({ currentLesson }) => {
  if (currentLesson?.lessonUrl) {
    return (
      <div className="w-full text-center text-white flex flex-col justify-start text-3xl font-extrabold">
        {/* <VideoComponent
          title={currentLesson?.lessonName}
          src="https://youtu.be/Xur1awpUN9Y"
        /> */}
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
