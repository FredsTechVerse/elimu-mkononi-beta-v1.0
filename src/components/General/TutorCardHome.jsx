import React from "react";
import { Link } from "react-router-dom";

const TutorCard = ({ unit }) => {
  return (
    <div className="flex-col-centered justify-start max-w-[320px] h-[250px] rounded-md shadow-md shadow-slate-400">
      <div className="h-2/5 w-full bg-primary flex-row-centered rounded-t-md">
        <h1 className="uppercase text-white font-extrabold">{unit.unitName}</h1>
      </div>
      <div className="flex flex-col w-full h-3/5  items-center">
        <div className=" py-4 flex-row-centered justify-evenly w-full">
          <div className="group flex-col-centered">
            <div className="number font-extrabold text-2xl text-black">
              {unit.unitChapters.length}
            </div>
            <div className="sub text-xs font-extraLight text-slate-500 capitalize">
              chapters
            </div>
          </div>
          <div className="group flex-col-centered">
            <div className="number font-extrabold text-2xl text-black">
              {50}
            </div>
            <div className="sub text-xs font-extraLight text-slate-500 capitalize">
              lessons
            </div>
          </div>
        </div>
        <Link to={`/tutor/unit/${unit._id}`}>
          <div className="cta flex flex-row-centered border-2 text-primary rounded-xl border-primary w-36 h-10 mt-1.5 hover:bg-primary hover:text-white">
            <div>Go to Unit</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TutorCard;
