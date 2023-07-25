import React from "react";
const PageTitle = ({ title }) => {
  return (
    <div className="mt-1 phone:text-lg tablet:text-xl laptop:text-2xl text-slate-900 font-bold w-full text-center uppercase ">
      {title}
    </div>
  );
};

export default PageTitle;
