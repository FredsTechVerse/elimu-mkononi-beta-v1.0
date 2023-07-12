import React, { useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
const VideoPlayer = ({ src, title }) => {
  const { currentLesson } = useCurrentLessonContext();
  useEffect(() => {
    console.log("Video section is changing well");
  }, [currentLesson]);
  return (
    <div className="w-full aspect-video rounded-lg shadow-lg shadow-slate-500 ">
      <ReactPlayer
        className="react-player"
        url="https://youtu.be/Xur1awpUN9Y"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
