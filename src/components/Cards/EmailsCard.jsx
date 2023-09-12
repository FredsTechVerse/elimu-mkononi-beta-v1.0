import React from "react";

const EmailsCard = ({ email, emailKey }) => {
  return (
    <div
      className={` ${
        emailKey === "odd" && "bg-blue-200"
      }  relative flex laptop:hidden flex-col justify-evenly items-center w-full h-min  rounded-xl my-0.5 shadow-md shadow-slate-300 bg-slate-100  px-1.5 py-2 gap-2`}
    >
      <p className="flex flex-row items-center justify-between px-2 w-full text-sm">
        <span className="bg-primary text-white rounded-full px-1.5  text-xs bg-opacity-90 capitalize  ">
          {email.status}
        </span>
        <span>{email.role}</span>
      </p>
      <p className="text-center text-sm px-2">{email.text}</p>
    </div>
  );
};

export default EmailsCard;
