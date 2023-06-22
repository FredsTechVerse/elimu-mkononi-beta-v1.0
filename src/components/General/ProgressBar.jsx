const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-2 rounded-full  bg-white ">
      <div
        className={`${
          progress === 100 ? "hidden" : "flex"
        } progress h-full bg-blue-400 rounded-full`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
