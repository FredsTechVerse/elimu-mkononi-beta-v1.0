// We should send the access token to get the tutor data.
import { TutorCardHome } from "../../components";
import { useOutletContext } from "react-router-dom";

const TutorPage = () => {
  const tutorData = useOutletContext();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden ">
      <div className="w-full tablet:w-4/5 laptop:w-2/3 h-full  py-3 px-4 grid phone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4 ">
        {tutorData &&
          tutorData.units.map((unit, index) => {
            return <TutorCardHome key={`unit-${index}`} unit={unit} />;
          })}
      </div>
    </div>
  );
};

export default TutorPage;
