import { Link } from "react-router-dom";

const CourseCardV2 = ({ courseID, courseImage, courseTitle }) => {
  return (
    <div className="group relative flex flex-col justify-between items-center w-full  h-[345px]  bg-opacity-20  tablet:h-[320px] laptop:w-80 rounded-xl m-3 bg-slate-300 shadow-slate-200 shadow-lg ">
      {/* <div className="absolute w-full h-full group-hover:bg-black group-hover:bg-opacity-10 rounded-xl"></div> */}
      <img
        src={`https://us-central1-elearning-module-a887d.cloudfunctions.net/app/s3Direct/${courseImage}`}
        alt="course image"
        className="bg-gray-300 w-full h-[220px] tablet:h-[180px] laptop:h-[220px]  rounded-t-xl object-cover  bg-cover bg-center"
      />
      <div className=" w-full flex justify-center gap-2 items-center py-2">
        {/* <span className="h-8 mx-2 w-2 group-hover:w-1.5 bg-yellow-500 rounded-full"></span> */}
        <span className="text-2xl uppercase text-slate-700 font-bold w-36 h-full ">
          {courseTitle}
        </span>
      </div>
      <div className="w-full flex flex-row justify-end">
        <Link to={`/course/${courseID}`}>
          <button className="flex flex-row justify-center items-center px-4  gap-2 group-hover:font-bold group-hover:gap-4 text-sm h-8  font-extralight capitalize w-48 tablet:w-full laptop:w-44 bg-primary  text-white rounded-tl-xl rounded-br-xl">
            <span>Go to Course</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCardV2;
