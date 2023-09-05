import React from "react";
import { HomeBtn } from "../../components";
const UnitNav = ({ unitData }) => {
  return (
    <div className="navigation flex flex-row w-full justify-between gap-10 items-center text-dark  text-sm text-white bg-primary px-3 h-16  ">
      <span>{unitData?.unitName}</span>
      <span>
        <HomeBtn icon={true} />
      </span>
    </div>
  );
};
export default UnitNav;
