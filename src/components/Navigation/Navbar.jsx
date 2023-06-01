import React, { useState } from "react";
import { LogoutButton, NavBtn, NavBgBtn } from "../../components";

import { RiMenu3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
const Navbar = ({ isNavOpen, showNavbar, hideNavbar }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = JSON.parse(localStorage.getItem("roles"));
  return (
    <div className="absolute top-0 flex justify-between backdrop-blur-md z-10 w-full p-3">
      <Link to="/">
        <div id="section-1" className="text-white font-bold text-2xl font-sans">
          E-LEARNING
        </div>
      </Link>
      <button
        className={`${isNavOpen ? "hidden" : "flex"} laptop:hidden`}
        onClick={() => {
          showNavbar();
        }}
      >
        <RiMenu3Line className="text-white text-3xl" />
      </button>
      {/* ACTUAL NAVBAR */}
      <div className="phone:hidden laptop:flex relative items-center  capitalize">
        <div id="section-2" className=" h-full flex">
          <NavBtn to="/" text="Home" />
          {roles?.includes("EM-202") && <NavBtn to="/tutor" text="Dashboard" />}
          {roles?.includes("EM-203") && <NavBtn to="/admin" text="Dashboard" />}
        </div>

        <div id="section-3" className={`${!user ? "flex" : "hidden"}`}>
          <NavBgBtn to="/new-student" text="Register" />
          <NavBgBtn to="/log-in" text="Log In" />
        </div>
        <div id="section-3" className={`${!user ? "hidden" : "flex"}`}>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
