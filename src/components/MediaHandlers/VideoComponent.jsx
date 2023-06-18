const VideoComponent = ({ src, currentLesson, title, updateCurrentLesson }) => {
  // const onVideoEnd = () => {
  //   updateCurrentLesson({
  //     ...unitData?.unitChapters[chapterIndex]?.chapterLessons[lessonIndex + 1],
  //     lessonIndex: lessonIndex + 1,
  //     chapterIndex: chapterIndex + 1,
  //   });
  // };
  const onVideoEnd = () => {
    console.log("Video ended");
  };

  const onError = () => {
    console.log("An Error has occured");
  };
  const onLoadedData = () => {
    console.log("The first frame of the media has finished loading");
  };
  const onPause = () => {
    console.log("Playback has been paused");
  };

  const onPlay = () => {
    console.log(
      "Playback is ready to start after having been paused or delayed due to lack of data."
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 z-0">
      <video
        className="w-full aspect-video rounded-lg shadow-lg shadow-slate-500 "
        src={src}
        // onPlay={onPlay}
        // onPause={onPause}
        // onEnded={onVideoEnd}
        // onLoadedData={onLoadedData}
        // onError={onError}
        controls
      >
        This video is not supported by your browser.
      </video>
    </div>
  );
};

export default VideoComponent;
