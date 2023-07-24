import React from "react";
import { LogoutBtn, HomeBtn, NavBgBtn, Tooltip } from "../../components";
import { Link } from "react-router-dom";
const Navbar = () => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  return (
    <div className="absolute top-0 flex justify-between  z-10 w-full px-4 py-2 rounded-full m-2">
      <Link to="/">
        <div
          id="section-1"
          className="text-white font-bold phone:text-lg tablet:text-2xl font-sans"
        >
          ELIMU HUB
        </div>
      </Link>

      <div className="relative flex tablet:flex-row phone:gap- items-center  capitalize">
        <div className=" h-full flex">
          {roles?.includes("EM-202") && (
            <Tooltip tooltip="Dashboard">
              <HomeBtn to="/tutor" text="Dashboard" />
            </Tooltip>
          )}
        </div>
        <div className={`${!roles ? "flex gap-1 tablet:flex-row" : "hidden"}`}>
          <Tooltip tooltip="Register">
            <NavBgBtn to="/new-student" text="register" />
          </Tooltip>
          <Tooltip tooltip="Login">
            <NavBgBtn to="/log-in" text="Login" />
          </Tooltip>
        </div>
        <div className={`${!roles ? "hidden" : "flex"}`}>
          <Tooltip tooltip="Logout">
            <LogoutBtn />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
