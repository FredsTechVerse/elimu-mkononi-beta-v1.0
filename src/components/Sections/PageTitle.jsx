import React from "react";
const PageTitle = ({ text }) => {
  return (
    <div className="mt-3 phone:text-lg tablet:text-2xl laptop:text-3xl text-slate-700 font-bold w-full text-center uppercase ">
      {text}
    </div>
  );
};

export default PageTitle;
