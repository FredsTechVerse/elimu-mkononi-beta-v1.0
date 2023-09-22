import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useCurrentLessonContext } from "../../context/currentLessonContext";
import { FancyMessage, VideoSkeleton } from "../../components";
const VideoPlayer = () => {
  const { currentLesson } = useCurrentLessonContext();
  const [videoReady, setVideoReady] = useState(false);
  const [lessonUrl, setLessonUrl] = useState("");
  const [isVideoPresent, setIsVideoPresent] = useState(false);
  const handleVideoReady = () => {
    setVideoReady(true);
  };

  const handleVideoError = () => {
    setVideoReady(false);
  };

  const handleVideoEnd = () => {
    // Will be used to update student data on lesson that he/she has just completed watching.
  };

  useEffect(() => {
    return () => {
      setLessonUrl("");
    };
  }, []);

  useEffect(() => {
    if (currentLesson?.lessonUrl) {
      setLessonUrl(currentLesson.lessonUrl);
      setIsVideoPresent(true);
      setVideoReady(false);
    } else {
      setIsVideoPresent(false);
    }
  }, [currentLesson?.lessonUrl]);

  return (
    <div className="w-full flex-col-centered   ">
      <div
        className={` ${
          videoReady && isVideoPresent ? "block" : "hidden"
        } w-full aspect-video rounded-b-lg shadow-slate-200 shadow-lg`}
      >
        <ReactPlayer
          className="react-player"
          url={lessonUrl}
          style={{
            borderBottomRightRadius: "0.5rem",
            borderBottomLeftRadius: "0.5rem",
            overflow: "hidden",
          }}
          controls={true}
          onReady={handleVideoReady}
          onError={handleVideoError}
          onEnded={handleVideoEnd}
          width="100%"
          height="100%"
        />
      </div>
      {!videoReady && isVideoPresent && <VideoSkeleton />}
      {!isVideoPresent && (
        <div className="w-full aspect-video">
          <FancyMessage message="No video is present" />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
