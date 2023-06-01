import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import Person_3 from "../../assets/person_3.jpg";
const TutorSideBar = ({ tutor, closeSideBar }) => {
  return (
    <div className="relative h-full w-full bg-slate-200">
      <div
        className="relative top-0 right-2 tablet:hidden"
        onClick={() => {
          closeSideBar();
        }}
      >
        <IoMdCloseCircle />
      </div>
      <div className="flex-col-centered pt-5">
        <img src={Person_3} className=" rounded-full w-[170px] h-[170px]"></img>
        <div className="name capitalize mt-4 font-bold text-3xl">
          {tutor && `${tutor.firstName} ${tutor.surname}`}
        </div>
        <div className="capitalize flex-col-centered  text-white bg-primary px-6 py-0.5 rounded-full font-bold text-lg">
          {tutor && tutor.role}
        </div>
      </div>
      <div className="flex-col-centered w-full mt-10 gap-5">
        <div className="flex-row-centered justify-evenly w-full">
          <div className="group flex-col-centered">
            <div className="sub text-sm font-light text-slate-500 capitalize">
              Total Units
            </div>
            <div className="number font-extrabold text-2xl text-black">
              {tutor && tutor.units.length}
            </div>
          </div>
          <div className="group flex-col-centered">
            <div className="sub text-sm font-light text-slate-500 capitalize">
              Total Lessons
            </div>
            <div className="number font-extrabold text-2xl text-black">65</div>
          </div>
        </div>
        <div className="group flex-col-centered w-full">
          <div className="text-sm font-light text-slate-500 capitalize">
            Account Status
          </div>
          <div className="number font-extrabold text-2xl text-black">
            Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorSideBar;
