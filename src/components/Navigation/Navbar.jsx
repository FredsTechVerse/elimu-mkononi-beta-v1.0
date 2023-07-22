import React from "react";
import { LogoutBtn, NavBtn, NavBgBtn, Tooltip } from "../../components";
import { Link } from "react-router-dom";
const Navbar = () => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  return (
    <div className="absolute top-0 flex justify-between  z-10 w-full pl-4 pr-2 py-2 rounded-full m-2">
      <Link to="/">
        <div id="section-1" className="text-white font-bold text-2xl font-sans">
          E-LEARNING
        </div>
      </Link>

      {/* ACTUAL NAVBAR */}
      <div className="relative flex tablet:flex-row phone:gap- items-center  capitalize">
        <div id="section-2" className=" h-full flex">
          {roles?.includes("EM-202") && (
            <Tooltip tooltip="Dashboard">
              <NavBtn to="/tutor" text="Dashboard" />
            </Tooltip>
          )}
          {roles?.includes("EM-203") && (
            <Tooltip tooltip="Dashboard">
              <NavBtn to="/admin" text="Dashboard" />
            </Tooltip>
          )}
        </div>

        <div
          id="section-3"
          className={`${!roles ? "flex gap-1 tablet:flex-row" : "hidden"}`}
        >
          <Tooltip tooltip="Register">
            <NavBgBtn to="/new-student" text="register" />
          </Tooltip>
          <Tooltip tooltip="Login">
            <NavBgBtn to="/log-in" text="Log In" />
          </Tooltip>
        </div>
        <div id="section-3" className={`${!roles ? "hidden" : "flex"}`}>
          <Tooltip tooltip="Log Out">
            <LogoutBtn />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
