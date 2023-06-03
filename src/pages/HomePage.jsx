import React, { useState } from "react";
import { CoursesSection, TeamSection, HeroSection } from "../components";

const HomePage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const showNavbar = () => {
    setIsNavOpen(true);
  };
  const hideNavbar = () => {
    setIsNavOpen(false);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 w-full ">
        <HeroSection
          isNavOpen={isNavOpen}
          showNavbar={showNavbar}
          hideNavbar={hideNavbar}
        />
        <CoursesSection />
        {/* <TeamSection /> */}
      </div>
    </>
  );
};

export default HomePage;
