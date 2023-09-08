import React from "react";
import { HomeBtn } from "../../components";
import { useNavigate } from "react-router-dom";
const UnitNav = ({ unitData }) => {
  const navigate = useNavigate();
  return (
    <div className="navigation flex flex-row w-full justify-between gap-10 items-center text-dark  text-sm text-white bg-primary px-3 h-16  ">
      <div>
        <HomeBtn isBlue={true} icon={true} />
      </div>
      <span>{unitData?.unitName}</span>
      <div className="flex-row-centered gap-2">
        <button
          className="capitalize"
          onClick={() => navigate(`/unit/${unitData?._id}`)}
        >
          notes
        </button>
        <button
          className="capitalize"
          onClick={() => navigate(`/unit/${unitData?._id}/comments`)}
        >
          comments
        </button>
        <button
          className="capitalize"
          onClick={() => navigate(`/unit-overview/${unitData?._id}`)}
        >
          outline
        </button>
      </div>
    </div>
  );
};
export default UnitNav;
