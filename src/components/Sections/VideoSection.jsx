import { VideoComponent, VideoSkeleton } from "..";
const VideoSection = ({ currentLesson }) => {
  if (currentLesson?.lessonUrl) {
    return (
      <div className="w-full text-center text-white flex flex-col justify-start text-3xl font-extrabold">
        <VideoComponent
          src={`https://us-central1-elearning-module-a887d.cloudfunctions.net/app/s3Direct/${currentLesson?.lessonUrl}`}
          // src={`http://localhost:5000/elearning-module-a887d/us-central1/app/s3Direct/${currentLesson?.lessonUrl}`}
          title={currentLesson?.lessonName}
        />
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
