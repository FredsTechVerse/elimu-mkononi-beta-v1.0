import React from "react";
import { CTAButton, StatusPill } from "..";

const UsersCard = ({ userData, fetchUsersData, userKey }) => {
  console.log(`User Key is ${userKey}`);
  let {
    firstName: fName,
    surname: lName,
    units,
    email,
    status,
    _id,
  } = userData;
  let numberOfUnits = units.length;
  return (
    <div
      className={` ${
        userKey === "odd" && "bg-cyan-100"
      } flex laptop:hidden flex-col justify-evenly items-center w-[300px] py-2 rounded-lg my-0.5 shadow-md shadow-slate-300 space-y-1 px-3`}
    >
      <div className="flex items-center justify-between w-full text-lg px-2 ">
        <p className="capitalize w-full">
          <span>{fName}</span> {"  "}
          <span>{lName}</span>
        </p>
        <StatusPill status={status} />
      </div>
      <div className="flex items-center justify-between w-full">
        <span>Units : {numberOfUnits}</span>
        <CTAButton _id={_id} contact={email} fetchUsersData={fetchUsersData} />
      </div>
    </div>
  );
};

export default UsersCard;
