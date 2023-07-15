import React, { useEffect } from "react";
// import ReactPlayer from "react-player/youtube";
import ReactPlayer from "react-player";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { HomeBtn } from "../../components";
const VideoPlayer = ({ src, title }) => {
  const { currentLesson } = useCurrentLessonContext();

  useEffect(() => {
    console.log("Video section is changing well");
  }, [currentLesson]);

  return (
    <div className="w-full aspect-video ">
      <ReactPlayer
        className="react-player rounded-lg debug"
        playIcon={<HomeBtn />}
        // url="https://www.youtube.com/watch?v=CdqO1Giihyg"
        url="https://youtu.be/5LSzMkig10M"
        // controls={true}
        pip={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
