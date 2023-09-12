import React from "react";

const MessageCard = ({ message, messageKey }) => {
  return (
    <div
      className={` ${
        messageKey === "odd" && "bg-blue-200"
      }  relative flex laptop:hidden flex-col justify-evenly items-center w-full h-min  rounded-xl my-0.5 shadow-md shadow-slate-300 bg-slate-100  px-1.5 py-2 gap-2`}
    >
      <p className="flex flex-row items-center justify-between px-2 w-full text-sm">
        <span>{message.role}</span>
        <span className="bg-primary text-white rounded-full px-1.5 text-xs bg-opacity-90 capitalize">
          {message.status}
        </span>
      </p>
      <p className="text-center text-sm px-2">{message.message}</p>
    </div>
  );
};

export default MessageCard;
