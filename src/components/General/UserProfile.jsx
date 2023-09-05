import React from "react";
import { profile } from "../../assets";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
const UserProfile = ({ name, role }) => {
  return (
    <div className=" tablet:bg-slate-300 tablet:bg-opacity-60 laptop:bg-transparent  flex-col-centered py-2 tablet:py-2 laptop:py-5  w-full rounded-xl phone:h-80 tablet:h-56 laptop:h-80   ">
      <img
        src={profile}
        alt="Profile Picture"
        className="w-[220px] tablet:w-[130px] laptop:w-[220px] rounded-full aspect-square  dark:bg-gray-500"
      />
      <div className="name capitalize mt-2 font-bold phone:text-xl tablet:text-xl laptop:text-3xl">
        {name}
      </div>
      <h1 className="role capitalize m-2 tablet:m-1 laptop:m-2 text-center text-slate-500  font-bold text-lg flex-row-centered gap-1">
        <span>{role}</span>
        <span>
          <ShieldCheckIcon className="w-4 aspect-square text-primary" />
        </span>
      </h1>
    </div>
  );
};

export default UserProfile;
