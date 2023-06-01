import React from "react";
const VideoComponent = ({ src, title, poster }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <video
        className="w-full aspect-video rounded-lg shadow-lg shadow-slate-500 "
        src={src}
        controls
      >
        This video is not supported by your browser.
      </video>
    </div>
  );
};

export default VideoComponent;
