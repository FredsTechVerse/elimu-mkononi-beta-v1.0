import { FC } from "react";

const TableBtn = (props) => {
  return (
    <button
      className="h-8  flex items-center text-sm text-white justify-center capitalize bg-slate-600 hover:bg-slate-900 transition-all  duration-300  px-3 rounded-full "
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default TableBtn;