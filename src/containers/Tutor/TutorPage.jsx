import React from "react";
// We should send the access token to get the tutor data.
import { TutorCardHome } from "../../components";
import { useOutletContext } from "react-router-dom";

const TutorPage = () => {
  const tutorData = useOutletContext();
  return (
    <div className="flex flex-col items-start justify-start w-full h-full ">
      <div className="w-full max-h-full overflow-y-auto py-3 px-4 grid phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-10 ">
        {tutorData &&
          tutorData.units.map((unit, index) => {
            return (
              <>
                <TutorCardHome key={`unit-${index}`} unit={unit} />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default TutorPage;
