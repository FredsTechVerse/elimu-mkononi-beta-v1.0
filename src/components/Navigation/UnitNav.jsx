import React from "react";
import { useParams } from "react-router-dom";
import { BackBtn } from "../../components";
import { useNavigate } from "react-router-dom";
const UnitNav = ({ unitData }) => {
  const { courseID } = useParams();
  const navigate = useNavigate();
  return (
    <div className="navigation flex flex-row w-full justify-between gap-10 items-center text-dark  text-sm text-white bg-primary px-4 h-14 rounded-bl-lg ">
      <div>
        <BackBtn to={`/course/${courseID}`} isBlue={true} icon={true} />
      </div>
      <span>{unitData?.unitName}</span>
      <div className="flex-row-centered gap-4">
        <button
          className="capitalize"
          onClick={() =>
            navigate(`/course/${courseID}/${unitData?._id}/content`)
          }
        >
          notes
        </button>
        <button
          className="capitalize"
          onClick={() =>
            navigate(`/course/${courseID}/${unitData?._id}/content/comments`)
          }
        >
          comments
        </button>
        <button
          className="capitalize"
          onClick={() =>
            navigate(`/course/${courseID}/${unitData?._id}/unit-overview`)
          }
        >
          outline
        </button>
      </div>
    </div>
  );
};
export default UnitNav;
