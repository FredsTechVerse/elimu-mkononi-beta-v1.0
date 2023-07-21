import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
import { VideoSkeleton } from "../../components";
const VideoPlayer = () => {
  const { currentLesson } = useCurrentLessonContext();
  const [videoReady, setVideoReady] = useState(false);

  const handleVideoReady = () => {
    setVideoReady(true);
    // console.log("Video is ready to play");
  };

  const handleVideoError = () => {
    // setVideoReady(false);
    // console.log("We are experiencing an error");
  };
  const handleVideoEnd = () => {
    // console.log("Video has ended!");
  };
  const handleVideoPause = () => {
    // console.log("Video has been paused");
  };

  return (
    <div className="w-full flex-row-centered my-2 ">
      <div
        className={` ${videoReady ? "block" : "hidden"} w-full aspect-video  `}
      >
        <ReactPlayer
          className="react-player"
          url={currentLesson.lessonUrl}
          style={{ borderRadius: "0.5rem", overflow: "hidden" }}
          controls={true}
          onReady={handleVideoReady}
          onError={handleVideoError}
          onEnded={handleVideoEnd}
          onPause={handleVideoPause}
          width="100%"
          height="100%"
        />
      </div>
      {!videoReady && <VideoSkeleton />}
    </div>
  );
};

export default VideoPlayer;
