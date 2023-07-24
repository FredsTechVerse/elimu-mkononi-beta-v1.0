import React from "react";

const Tooltip = ({ children, tooltip }) => {
  return (
    <div className="w-full px-4 sm:w-1/2 lg:w-1/4 ">
      <div>
        <div className="group relative inline-block">
          {children}
          <div className="absolute top-full left-1/2 z-20 mt-3 -translate-x-1/2 whitespace-nowrap rounded bg-slate-700 py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100">
            <span className="absolute top-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-slate-700"></span>
            {tooltip}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
