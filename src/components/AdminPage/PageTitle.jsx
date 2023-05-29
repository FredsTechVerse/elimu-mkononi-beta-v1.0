import React from "react";

const PageTitle = ({ text }) => {
  return (
    <div className="phone:text-lg tablet:text-2xl laptop:text-4xl text-slate-500 font-bold w-full pl-10 text-center uppercase my-4">
      {text}
    </div>
  );
};

export default PageTitle;
