import React, { useState } from "react";
import { CoursesSection, HeroSection, Footer } from "../components";

const HomePage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const accessToken = localStorage.getItem("youtubeAccessToken");
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

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
