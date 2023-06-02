import React from "react";
import { CTAButton, StatusPill } from "..";

const UserCard = ({ user, fetchUsersData, userKey, role }) => {
  let numberOfUnits = (role) => {
    if (role === "EM-202") {
      return user.units?.length;
    }
    return "N/A";
  };
  return (
    <div
      className={` ${
        userKey === "odd" && "bg-cyan-100"
      } flex laptop:hidden flex-col justify-evenly items-center w-[280px] py-2 rounded-lg my-0.5 shadow-md shadow-slate-300 space-y-1 px-3`}
    >
      <div className="flex items-center justify-between w-full text-lg ">
        <p className="capitalize w-full">
          <span>{user.firstName}</span> <span>{user.surname}</span>
        </p>
        <StatusPill status={user.status} />
      </div>
      <div className="flex items-center justify-between w-full">
        {role === "EM-202" && <span>Units : {numberOfUnits(role)}</span>}
        <CTAButton
          _id={user._id}
          contact={user.email}
          fetchUsersData={fetchUsersData}
        />
      </div>
    </div>
  );
};

export default UserCard;
