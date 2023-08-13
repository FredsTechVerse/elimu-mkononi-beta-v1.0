import React from "react";
import { LogoutBtn, HomeBtn, NavBgBtn, Tooltip } from "../../components";
import { Link } from "react-router-dom";
const Navbar = () => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  return (
    <>
      <Link
        className="text-white font-bold phone:text-lg tablet:text-2xl font-sans fixed top-0 z-10 left-2 h-[10vh] flex-row-centered "
        to="/"
      >
        ELIMU HUB
      </Link>

      <div className="h-[10vh] fixed top-0 right-2 z-10 flex-row-centered ">
        {roles?.includes("EM-202") ||
          (roles?.includes("EM-203") && (
            <Tooltip tooltip="Dashboard">
              <HomeBtn to="/tutor" text="Dashboard" />
            </Tooltip>
          ))}
        <div className={`${!roles ? "flex gap-1 tablet:flex-row" : "hidden"}`}>
          <Tooltip tooltip="Register">
            <NavBgBtn to="/new-user" text="register" />
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
    </>
  );
};

export default Navbar;
