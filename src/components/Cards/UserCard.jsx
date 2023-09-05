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
      }  relative flex laptop:hidden flex-col justify-evenly items-center w-[280px]  rounded-xl my-0.5 pt-5 shadow-md shadow-slate-300 bg-slate-100  px-3`}
    >
      <StatusPill status={user.status} />
      <div className="flex flex-col items-center justify-between w-full text-lg h-16 py-5 ">
        <span>
          {role === "EM-202" && (
            <p className="absolute top-1 left-2 flex-row-centered gap-2">
              <div className="bg-slate-800 flex-row-centered w-9 h-5 rounded-full text-white text-sm">
                {numberOfUnits(role)}
              </div>
              Units
            </p>
          )}
        </span>
        <div className="w-full flex items-center justify-between">
          <p className="capitalize  flex gap-2 font-bold">
            {user.firstName} {user.surname}
          </p>
          <CTAButton userID={user._id} contact={user.contact} role={role} />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
