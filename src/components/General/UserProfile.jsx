import React from "react";
import { profile } from "../../assets";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
const UserProfile = () => {
  return (
    <div className="flex-col-centered py-5  w-full rounded-xl h-full bg-slate-200  ">
      <img
        src={profile}
        alt="Profile Picture"
        className="w-[240px] rounded-full aspect-square  dark:bg-gray-500"
      />
      <div className="name capitalize mt-4 font-bold text-3xl">John Mwangi</div>
      <h1 className="role capitalize m-2 text-center text-slate-500  font-bold text-lg flex-row-centered gap-1">
        <span>Admin</span>
        <span>
          <ShieldCheckIcon className="w-4 aspect-square text-primary" />
        </span>
      </h1>
    </div>
  );
};

export default UserProfile;
