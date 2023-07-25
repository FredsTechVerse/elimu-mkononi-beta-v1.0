import React from "react";

const Heading = ({ heading }) => {
  return (
    <div className="flex flex-col-centered gap-2">
      <h1 className="font-bold text-xl text-slate-900 uppercase ">{heading}</h1>
      <span className="w-20 border-2 border-primary rounded-full"></span>
    </div>
  );
};

export default Heading;
