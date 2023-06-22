import { Link } from "react-router-dom";

const CourseCardV2 = ({ courseID, courseImage, courseTitle }) => {
  return (
    <div className="group relative flex flex-col justify-center items-center  h-[345px]  bg-yellow-200 bg-opacity-40 w-[270px] laptop:w-72 rounded-xl m-3 ">
      <div className="absolute w-full h-full group-hover:bg-black group-hover:bg-opacity-10 rounded-xl"></div>
      <img
        src={`https://us-central1-elearning-module-a887d.cloudfunctions.net/app/s3Direct/003d359d7cda174c02331bb17e44c800.png`}
        alt="course image"
        className="bg-gray-300 w-full h-[230px] rounded-t-lg  shadow-md bg-cover bg-center"
      ></img>
      <div className=" w-full flex flex-row h-15 py-2">
        <div className="h-15 mx-3 w-1 group-hover:w-1.5 bg-yellow-300 rounded-y-full"></div>
        <p className="text-lg uppercase text-gray-800 font-bold w-36">
          Civil Engineering
        </p>
      </div>
      <div className="flex-row-centered w-full ">
        <Link className="w-full " to={`/course/${courseID}`}>
          <button className="flex flex-row justify-start items-center px-4 group-hover:pl-9 gap-2 group-hover:gap-7 text-slate-900 text-sm py-3  font-extralight group-hover:font-bold capitalize w-full h-14">
            <span>Click to Access Content</span>
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
