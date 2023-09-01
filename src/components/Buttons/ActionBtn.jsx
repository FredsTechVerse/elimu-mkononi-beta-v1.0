import React from "react";

const ActionBtn = ({ text, onClick, type, size = "large" }) => {
  return (
    <button
      className={` ${
        size === "small" ? "text-xs w-24 h-6 my-2" : " text-lg  w-40 m-3 h-9"
      } capitalize rounded-full text-white text-center bg-slate-900 hover:bg-purple-600`}
      type={type}
      onClick={onClick}
    >
      <p className="w-full h-full flex items-center justify-center gap-3 px-2">
        <span className="capitalize">{text}</span>
      </p>
    </button>
  );
};

export default ActionBtn;
