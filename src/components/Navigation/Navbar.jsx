import React, { useState, useEffect } from "react";
import { LogoutBtn, HomeBtn, NavBgBtn, NavMenuBtn } from "../../components";
import { Link } from "react-router-dom";

const Navbar = () => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-evenly gap-2 fixed bottom-2 right-2 tablet:right-5 z-20">
        <NavMenuBtn
          isNavOpen={isNavOpen}
          toggleNavbar={toggleNavbar}
          scroll={scroll}
        />
      </div>

      <section
        onClick={toggleNavbar}
        className={` mt-3 ${
          isNavOpen ? "flex " : "hidden"
        }  rounded-lg  text-slate-800 fixed z-50  bottom-[55px] flex right-3  phone:flex-col  items-center justify-center phone:w-[45%] tablet:w-[30%] laptop:w-[15%]  overflow-hidden `}
      >
        <NavBgBtn isBlue={false} to="/new-user" text="register" />
        <HomeBtn isBlue={false} position="dashboard" />

        <div
          className={`w-full ${
            !roles ? "flex gap-1 tablet:flex-row" : "hidden"
          }`}
        >
          <NavBgBtn isBlue={false} to="/log-in" text="login" />
        </div>
        <div className={`${!roles ? "hidden" : "flex w-full "}`}>
          <LogoutBtn isBlue={false} position="navbar" />
        </div>
      </section>
    </>
  );
};

export default Navbar;
