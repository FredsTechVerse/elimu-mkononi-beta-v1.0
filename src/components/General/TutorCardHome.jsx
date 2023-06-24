import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  UsersIcon,
  ClockIcon,
  Square3Stack3DIcon,
  PresentationChartLineIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
const TutorCard = ({ unit }) => {
  return (
    <div className="flex-col-centered justify-start w-full h-full rounded-xl">
      <div className="relative h-20 w-full bg-primary flex-row-centered rounded-t-xl ">
        <Link to={`/tutor/unit/${unit._id}`}>
          <div className="bg-slate-300 bg-opacity-70 w-8 aspect-square rounded-full flex-row-centered absolute top-2 right-2">
            <PencilSquareIcon className="icon-styling w-4" />
          </div>
        </Link>
      </div>
      <div className="flex flex-col w-full h-3/5  items-center relative bg-slate-200 rounded-b-xl">
        <span className="absolute flex-col-centered w-24 top-[-50px] bg-slate-100 aspect-square rounded-full">
          <Square3Stack3DIcon className="w-12 aspect-square text-slate-800" />
        </span>
        <h1 className="capitalize text-slate-600 text-xl font-extrabold mt-12 ">
          {unit.unitName}
        </h1>
        <div className=" flex-row-centered justify-evenly w-full mb-2">
          <div className="group flex-row-centered  bg-slate-200 rounded-lg h-10 aspect-square">
            <BookOpenIcon className="icon-styling text-slate-900" />
            <span className="number font-extrabold text-md text-black">
              {unit.unitChapters.length}
            </span>
          </div>
          <div className="group flex-row-centered bg-slate-200 rounded-lg w-12 aspect-square">
            <ClockIcon className="icon-styling text-slate-900" />
            <span className="number font-extrabold text-md text-black">
              {50}
            </span>
          </div>
          <div className="group flex-row-centered  bg-slate-200 rounded-lg w-12 aspect-square">
            <PresentationChartLineIcon className="icon-styling text-slate-900" />
            <span className="number font-extrabold text-md text-black">
              {50}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
