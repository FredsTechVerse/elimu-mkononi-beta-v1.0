import React from "react";
import { Button, Navbar, NavbarSmall } from "..";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
const HeroSection = ({ isNavOpen, showNavbar, hideNavbar }) => {
  return (
    <div className="homepage w-full h-[90vh]">
      <div className="relative flex-row-centered w-full h-full bg-opacity-10 bg-slate-900 ">
        <Navbar
          isNavOpen={isNavOpen}
          showNavbar={showNavbar}
          hideNavbar={hideNavbar}
        />
        <NavbarSmall isNavOpen={isNavOpen} hideNavbar={hideNavbar} />
        <div className="text-white w-full tablet:w-3/5 text-center flex-col-centered">
          <p className="text-6xl uppercase font-bold font-sans">
            A better way to learn
          </p>
          <p className="text-md font-extralight ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            quo labore facere, totam delectus quidem eligendi nihil aliquid
            dolor esse deleniti? Sequi nemo dolore asperiores omnis natus,
            repudiandae,
          </p>
          <a
            href="#courses"
            className="button w-36 bg-primary text-white hover:bg-purple-500 flex-row-centered rounded-md my-5"
          >
            <p className="capitalize">Get Started</p>
          </a>
          <div className="custom-shape-divider-bottom-1679515507">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
