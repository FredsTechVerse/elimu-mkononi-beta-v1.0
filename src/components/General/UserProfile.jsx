import React from "react";
import { profile } from "../../assets";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
const UserProfile = ({ name, role }) => {
  return (
    <div className=" tablet:bg-blue-500  tablet:bg-opacity-10  flex-col-centered py-1 tablet:py-2 laptop:py-5  w-full rounded-xl h-max tablet:h-56 laptop:h-80   ">
      <img
        src={profile}
        alt="Profile Picture"
        className="w-[210px] tablet:w-[130px] laptop:w-[220px] rounded-full aspect-square  dark:bg-gray-500"
      />
      <div className="name capitalize mt-2 font-bold phone:text-xl tablet:text-xl laptop:text-3xl">
        {name}
      </div>
      <h1 className="role capitalize m-0.5 laptop:m-2 text-center text-slate-500  font-bold text-lg flex-row-centered gap-1">
        <span className="text-slate-900 opacity-80 text-sm ">{role}</span>
        <span>
          <ShieldCheckIcon className="w-4 aspect-square text-primary" />
        </span>
      </h1>
    </div>
  );
};

export default UserProfile;
