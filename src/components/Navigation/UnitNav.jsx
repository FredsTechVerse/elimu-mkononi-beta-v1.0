import React from "react";
import { BackBtn } from "../../components";
const UnitNav = ({ unitData }) => {
  return (
    <div className="navigation flex flex-row w-full justify-between gap-10 items-center text-dark  text-sm text-white bg-primary px-3  h-14 rounded-t-lg ">
      <BackBtn />
      <span>{unitData?.unitName}</span>
    </div>
  );
};
export default UnitNav;
