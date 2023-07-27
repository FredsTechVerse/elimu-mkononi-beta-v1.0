import React from "react";
import { Navbar, NavbarSmall } from "../../components";
const HeroSection = ({ isNavOpen, showNavbar, hideNavbar }) => {
  return (
    <div className="homepage w-full h-[80vh]">
      <div className="relative flex-row-centered w-full h-full bg-opacity-10 bg-slate-900 ">
        <Navbar
          isNavOpen={isNavOpen}
          showNavbar={showNavbar}
          hideNavbar={hideNavbar}
        />
        <div className="text-white w-full tablet:w-[90%] text-center flex-col-centered gap-2">
          <h1 className="phone:text-2xl tablet:text-4xl laptop:text-6xl uppercase font-bold font-sans">
            Unlocking Excellence
          </h1>
          <p className="text-sm tablet:text-md laptop:text-lg font-extralight ">
            Welcome to Elimu Hub, where we revolutionize the way learners excel
            in their studies! We address the common challenges faced by students
            and provide effective solutions to elevate their learning journey.
          </p>
          <div className="absolute h-7  bg-white w-full bottom-0 rounded-t-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
