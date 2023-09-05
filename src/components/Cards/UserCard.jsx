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
        userKey === "odd" ? "bg-blue-200" : ""
      }  relative flex laptop:hidden flex-col justify-evenly items-center w-[280px]  rounded-xl my-0.5 shadow-md shadow-slate-300 bg-slate-100  px-3`}
    >
      <StatusPill status={user.status} />
      <div className="flex items-center justify-start w-full text-lg h-20 ">
        <p className="capitalize w-full">
          <span>{user.firstName}</span> <span>{user.surname}</span>
        </p>
        {role === "EM-202" && <span>Units : {numberOfUnits(role)}</span>}
        <CTAButton userID={user._id} contact={user.contact} role={role} />
      </div>
    </div>
  );
};

export default UserCard;
