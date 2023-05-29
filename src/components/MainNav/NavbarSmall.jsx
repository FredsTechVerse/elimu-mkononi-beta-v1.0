import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { LogoutButton, NavBtn, NavBgBtn } from "..";

const NavbarSmall = ({ isNavOpen, hideNavbar }) => {
  const roles = JSON.parse(localStorage.getItem("roles")) || ["EM-201"];

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div
      className={`${
        isNavOpen ? "flex" : "hidden"
      }  fixed top-0 right-0 z-10  w-48 flex-col justify-start items-start capitalize  text-white bg-primary px-2 py-4`}
    >
      <button
        className=""
        onClick={() => {
          hideNavbar();
        }}
      >
        <MdCancel className="text-black text-4xl" />
      </button>
      <div id="section-2" className="h-full w-full flex-col-centered">
        <div id="section-2" className=" h-full flex-col-centered">
          <NavBtn to="/" text="Home" />
          {roles[0] === "EM-202" && <NavBtn to="/tutor" text="Dashboard" />}
          {roles[0] === "EM-203" && <NavBtn to="/admin" text="Dashboard" />}
        </div>
      </div>
      {!user ? (
        <div id="section-3" className="flex-col-centered w-full">
          <NavBgBtn to="/new-student" text="Register" />
          <NavBgBtn to="/log-in" text="Log In" />
        </div>
      ) : (
        <div id="section-3" className="flex-row-centered w-full">
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default NavbarSmall;
