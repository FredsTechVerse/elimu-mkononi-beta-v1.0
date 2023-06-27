import React from "react";

import {
  Square3Stack3DIcon,
  UserIcon,
  UserGroupIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
const AdminCard = ({ Text, Number }) => {
  return (
    <div className=" relative text flex justify-start  items-center  h-32 rounded-md gap-4 bg-white ">
      <div
        id="text"
        className="flex flex-col pl-4 items-start justify-center w-1/2  h-full pt-4 "
      >
        <p className=" top-2 left-3 absolute text-lg  text-slate-400 font-semibold uppercase">
          {Text}
        </p>
        <div className="number text-black font-extrabold text-4xl ">
          {Number}
        </div>
      </div>
      {Text === "Lessons" ? (
        <PresentationChartBarIcon className="w-20 aspect-square text-slate-800" />
      ) : Text === "Tutors" ? (
        <UserIcon className="w-20 aspect-square text-slate-800" />
      ) : Text === "Courses" ? (
        <Square3Stack3DIcon className="w-20 aspect-square text-slate-800" />
      ) : (
        <UserGroupIcon className="w-20 aspect-square text-slate-800" />
      )}
    </div>
  );
};

export default AdminCard;
