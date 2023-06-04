import React from "react";
import { FancyLine } from "../../components";
const PageTitle = ({ text }) => {
  return (
    <div className="flex-col-centered">
      <div className="phone:text-lg tablet:text-2xl laptop:text-4xl text-slate-500 font-bold w-full pl-10 text-center uppercase ">
        {text}
      </div>
    </div>
  );
};

export default PageTitle;
