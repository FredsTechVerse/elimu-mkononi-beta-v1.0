import React from "react";
import ReactPlayer from "react-player/youtube";
const VideoPlayer = ({ src, title }) => {
  useEffect(() => {
    console.log("Video section is changing well");
  }, []);
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
