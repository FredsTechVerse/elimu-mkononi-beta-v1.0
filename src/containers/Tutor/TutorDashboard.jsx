// We should send the access token to get the tutor data.
import {
  TutorCardHome,
  UserProfile,
  DashboardUserButton,
} from "../../components";
import { useOutletContext } from "react-router-dom";

const TutorDashboard = () => {
  const tutorData = useOutletContext();
  return (
    <div className="w-full pt-2 h-full grid phone:grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4 gap-5 ">
      <div className="col-span-1 h-full">
        <div className="flex flex-col items-start justify-center phone:col-span-1 phone:row-span-2  tablet:row-start-2 tablet:col-start-1 tablet:col-span-2 laptop:col-start-3 laptop:row-start-1 laptop:col-span-1 laptop:row-span-3 ">
          <UserProfile />
          <div className="controls w-full h-full flex-col-centered">
            <h1 className="text-slate-900 font-bold text-lg text-center capitalize mt-3 w-full h-12 flex-row-centered  ">
              Quick Access Controls
            </h1>
            <div className=" gap-1 laptop:gap-3 p-2 aspect-video grid tablet:grid-cols-2 laptop:grid-cols-3 place-item-center h-full w-full">
              <DashboardUserButton user="chapter" />
              <DashboardUserButton user="lesson" />
              <DashboardUserButton user="resource" />
              <DashboardUserButton user="information" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-full overflow-auto tablet:col-span-2 laptop:col-span-3 grid tablet:grid-cols-2 laptop:grid-cols-3 gap-4">
        <div className="greetings col-start-1 tablet:col-span-2 laptop:col-span-3 row-span-1  flex-row-centered rounded-xl h-48 flex">
          <div className="w-2/3 h-full bg-slate-200 rounded-xl">
            <h1 className="text-slate-900 font-bold text-lg uppercase w-full h-12 flex-row-centered ">
              GREETINGS
            </h1>
            <p className="text-center text-lg px-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Delectus, sint.
            </p>
          </div>

          <div className=" w-1/3 flex flex-col justify-evenly  rounded-xl h-full gap-2 p-2">
            <div className="h-full w-full flex-row-centered text-white rounded-lg bg-primary rounded-ms">
              View Students
            </div>
            <div className="h-full w-full flex-row-centered text-white rounded-lg bg-primary rounded-ms">
              View Tutors
            </div>
            <div className="h-full w-full flex-row-centered text-white rounded-lg bg-primary rounded-ms">
              View Course
            </div>
            <div className="h-full w-full flex-row-centered text-white rounded-lg bg-primary rounded-ms">
              View Admins
            </div>
          </div>
        </div>
        {tutorData &&
          tutorData.units.map((unit, index) => {
            return <TutorCardHome key={`unit-${index}`} unit={unit} />;
          })}
      </div>
    </div>
  );
};

export default TutorDashboard;
