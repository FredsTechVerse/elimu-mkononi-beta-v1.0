import { XCircleIcon } from "@heroicons/react/24/solid";
import { LogoutBtn, NavBtn, NavBgBtn } from "../../components";

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
        <XCircleIcon className="w-8 h-8 text-black text-4xl" />
      </button>
      <div id="section-2" className="h-full w-full flex-col-centered">
        <div id="section-2" className=" h-full flex-col-centered">
          {roles?.includes("EM-202") && <NavBtn to="/tutor" text="Dashboard" />}
          {roles?.includes("EM-203") && <NavBtn to="/admin" text="Dashboard" />}
        </div>
      </div>
      {!user ? (
        <div id="section-3" className="flex-col-centered w-full">
          <NavBgBtn to="/new-student" text="Register" />
          <NavBgBtn to="/log-in" text="Log In" />
        </div>
      ) : (
        <div id="section-3" className="flex-row-centered w-full mt-2">
          <LogoutBtn position="navbar" />
        </div>
      )}
    </div>
  );
};

export default NavbarSmall;
