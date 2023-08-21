import React, { useState, useEffect } from "react";
import {
  LogoutBtn,
  HomeBtn,
  NavBgBtn,
  NavMenuBtn,
  NavItemBtn,
} from "../../components";
import { Link } from "react-router-dom";

import { NavBtn, MenuBtn } from "../../components";
const MainNav = () => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <Link
        to="/"
        className="fixed z-50 top-0 left-2 text-white h-[10vh] flex items-center justify-center  uppercase text-3xl  font-extrabold tracking-widest  laptop:py-0 "
      >
        AIPCA
      </Link>

      <NavMenuBtn
        isNavOpen={isNavOpen}
        isDark={false}
        toggleNavbar={toggleNavbar}
      />

      <section
        className={`${
          isNavOpen ? "flex" : "hidden laptop:flex"
        }  bg-white laptop:bg-transparent rounded-lg laptop:rounded-none text-slate-800 fixed z-50  top-[10vh] flex laptop:top-0  right-3   laptop:h-14 phone:flex-col laptop:flex-row laptop:gap-3  items-center justify-center phone:w-[95%] tablet:w-[40%] laptop:w-fit laptop:py-2  `}
      >
        <NavBgBtn to="/new-user" text="register" />
        <HomeBtn />

        <div
          className={`w-full ${
            !roles ? "flex gap-1 tablet:flex-row" : "hidden"
          }`}
        >
          <NavBgBtn to="/log-in" text="Login" />
        </div>
        <div className={`${!roles ? "hidden" : "flex w-full "}`}>
          <LogoutBtn />
        </div>
      </section>
    </>
  );
};

export default MainNav;
