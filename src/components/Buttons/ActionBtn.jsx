import React from "react";

const ActionBtn = ({ text, onClick, type, size = "large" }) => {
  return (
    <button
      className={` ${
        size === "small" ? "text-sm h-8 px-1 my-2" : " text-lg m-3 h-9 px-3"
      } capitalize w-max rounded-full text-white text-center bg-slate-900 hover:bg-purple-600`}
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
