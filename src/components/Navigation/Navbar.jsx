import { useState } from "react";
import { LogoutBtn, NavBtn, NavBgBtn, Tooltip } from "../../components";

import { RiMenu3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
const Navbar = ({ isNavOpen, showNavbar, hideNavbar }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = JSON.parse(localStorage.getItem("roles"));
  return (
    <div className="absolute top-0 flex justify-between  z-10 w-full pl-4 pr-2 py-2 backdrop-blur-md rounded-full m-2">
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
          {roles?.includes("EM-202") && (
            <Tooltip tooltip="Dashborad">
              <NavBtn to="/tutor" text="Dashboard" />
            </Tooltip>
          )}
          {roles?.includes("EM-203") && (
            <Tooltip tooltip="Dashborad">
              <NavBtn to="/admin" text="Dashboard" />
            </Tooltip>
          )}
        </div>

        <div id="section-3" className={`${!user ? "flex" : "hidden"}`}>
          <Tooltip tooltip="Register">
            <NavBgBtn to="/new-student" text="register" />
          </Tooltip>
          <Tooltip tooltip="Login">
            <NavBgBtn to="/log-in" text="Log In" />
          </Tooltip>
        </div>
        <div id="section-3" className={`${!user ? "hidden" : "flex"}`}>
          <Tooltip tooltip="Logout">
            <LogoutBtn />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
