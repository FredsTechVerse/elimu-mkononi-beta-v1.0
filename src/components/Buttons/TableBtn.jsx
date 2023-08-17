import { FC } from "react";

const TableBtn = (props) => {
  return (
    <button
      className="h-12  flex bg-text items-center text-white justify-center capitalize bg-slate-800 hover:bg-slate-900 transition-all  duration-300  px-10 "
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default TableBtn;
