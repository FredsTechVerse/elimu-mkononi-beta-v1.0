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
      <Link
        to="/"
        className="fixed z-50 top-0 left-2 text-white h-[8vh] flex items-center justify-center  uppercase text-3xl  font-extrabold tracking-widest  laptop:py-0 "
      >
        Elimu Hub
      </Link>

      <NavMenuBtn
        isNavOpen={isNavOpen}
        toggleNavbar={toggleNavbar}
        scroll={scroll}
      />

      <section
        onClick={toggleNavbar}
        className={` mt-3 ${
          isNavOpen ? "flex" : "hidden"
        }  bg-slate-100 rounded-lg  text-slate-800 fixed z-50  top-[8vh] flex right-3  phone:flex-col  items-center justify-center phone:w-[45%] tablet:w-[30%] laptop:w-[15%] `}
      >
        <NavBgBtn to="/new-user" text="register" />
        <HomeBtn />

        <div
          className={`w-full ${
            !roles ? "flex gap-1 tablet:flex-row" : "hidden"
          }`}
        >
          <NavBgBtn to="/log-in" text="login" />
        </div>
        <div className={`${!roles ? "hidden" : "flex w-full "}`}>
          <LogoutBtn position="navbar" />
        </div>
      </section>
    </>
  );
};

export default Navbar;
