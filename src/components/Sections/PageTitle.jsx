import React from "react";
const PageTitle = ({ text }) => {
  return (
    <div className="mt-1 phone:text-lg tablet:text-xl laptop:text-2xl text-slate-900 font-bold w-full text-center uppercase ">
      {text}
    </div>
  );
};

export default PageTitle;
