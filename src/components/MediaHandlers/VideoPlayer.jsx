import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
import { VideoSkeleton } from "../../components";
const VideoPlayer = () => {
  const { currentLesson } = useCurrentLessonContext();
  const [videoReady, setVideoReady] = useState(false);
  const [lessonUrl, setLessonUrl] = useState("");
  const handleVideoReady = () => {
    setVideoReady(true);
  };

  const handleVideoError = () => {
    // setVideoReady(false);
  };
  const handleVideoEnd = () => {};
  const handleVideoPause = () => {};

  useEffect(() => {
    return () => {
      setLessonUrl("");
    };
  }, []);

  useEffect(() => {
    if (currentLesson?.lessonUrl) {
      setLessonUrl(currentLesson.lessonUrl);
      setVideoReady(false); // Reset videoReady when lessonUrl changes to show the VideoSkeleton until the new video is ready
    }
  }, [currentLesson?.lessonUrl]);

  return (
    <div className="w-full flex-row-centered my-2 ">
      <div
        className={` ${videoReady ? "block" : "hidden"} w-full aspect-video  `}
      >
        <ReactPlayer
          className="react-player"
          url={lessonUrl}
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
