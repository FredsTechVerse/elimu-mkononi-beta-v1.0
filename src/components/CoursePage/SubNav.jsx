import React from "react";

const SubNav = () => {
  return (
    <div className="navigation flex flex-row w-full justify-around bg-secondary text-dark py-3 mb-2">
      <div className="tab cursor-pointer group">
        <div className="capitalize">Chapters</div>
        <div className=" line h-1 rounded-md bg-primary  w-4 group-hover:w-full transition-all  "></div>
      </div>
      <div className="tab cursor-pointer group">
        <div className="capitalize">Quizzes</div>
        <div className=" line h-1 rounded-md bg-primary  w-4 group-hover:w-full transition-all "></div>
      </div>
      <div className="tab cursor-pointer group">
        <div className="capitalize">PPTX</div>
        <div className="line h-1 rounded-md bg-primary  w-4 group-hover:w-full transition-all "></div>
      </div>
      <div className="tab cursor-pointer group">
        <div className="capitalize">Notes</div>
        <div className="line h-1 rounded-md bg-primary  w-4 group-hover:w-full transition-all "></div>
      </div>
    </div>
  );
};

export default SubNav;
