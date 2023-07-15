import React from "react";
// import ReactPlayer from "react-player/youtube";
import ReactPlayer from "react-player/youtube";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
import { HomeBtn } from "../../components";
const VideoPlayer = ({ src, title }) => {
  const { currentLesson } = useCurrentLessonContext();

  return (
    <div className="w-full aspect-video ">
      <ReactPlayer
        className="react-player"
        playIcon={<HomeBtn />}
        url={currentLesson.lessonUrl}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
