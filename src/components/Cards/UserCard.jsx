import React from "react";

import { CTAButton, StatusPill } from "..";

const UserCard = ({ user, userKey, role }) => {
  let numberOfUnits = (role) => {
    if (role === "EM-202") {
      return user.units?.length;
    }
    return "N/A";
  };
  return (
    <div
      className={` ${
        userKey === "odd" && "bg-blue-200"
      }  relative flex laptop:hidden flex-col justify-evenly items-center w-full h-20 pt-1.5  rounded-xl my-0.5 shadow-md shadow-slate-300 bg-slate-100  px-1.5`}
    >
      <StatusPill status={user.status} />
      <div className="flex flex-col items-center justify-between w-full h-full ">
        <span>
          {role === "EM-202" && (
            <p className="absolute top-1 left-2 flex-row-centered gap-2">
              <span className="bg-slate-800 flex-row-centered w-7 h-4 rounded-full text-white text-xs">
                {numberOfUnits(role)}
              </span>
              <span className="text-sm">Units</span>
            </p>
          )}
        </span>
        <div className="w-full flex items-center justify-between  h-full pt-1.5">
          <p className="capitalize text-start  flex gap-2 font-bold text-[15px] pl-1.5">
            {user.firstName} {user.surname}
          </p>
          <CTAButton userID={user._id} contact={user.contact} role={role} />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
