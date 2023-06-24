import { Link } from "react-router-dom";
import { LogoutBtn, HomeBtn } from "../../components";
import { XCircleIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { profile } from "../../assets";

const lists = [
  { name: "Dashboard", link: "/admin/" },
  { name: "Students", link: "/admin/students" },
  { name: "Tutors", link: "/admin/tutors" },
  { name: "Courses", link: "/admin/courses" },
  { name: "Admin", link: "/admin/admins" },
];

const AdminSidebar = ({ closeSideBar }) => {
  return (
    <div className="relative flex flex-col items-center justify-start h-full w-full tablet:w-72 laptop:w-full bg-slate-200 z-5 px-2">
      <div className="absolute flex items-center justify-between w-full p-2">
        <div className="flex">
          <div>
            <HomeBtn />
          </div>
          <div>
            <LogoutBtn />
          </div>
        </div>
        <div
          className="text-4xl flex-row-centered laptop:hidden"
          onClick={() => {
            closeSideBar();
          }}
        >
          <XCircleIcon className="icon-styling " />
        </div>
      </div>

      <div className="flex-col-centered pt-5">
        <img
          src={profile}
          alt="Profile Picture"
          className="w-[170px] h-[170px] rounded-full dark:bg-gray-500"
        />
        <div className="name capitalize mt-4 font-bold text-3xl">
          John Mwangi
        </div>
        <div className="role capitalize m-4 text-center text-white bg-primary  px-5 py-1 rounded-3xl font-bold text-lg">
          Admin
        </div>
      </div>
      <ul className="py-2 px-1 flex flex-col items-center justify-start gap-2 w-full">
        {lists.map((list, index) => {
          return (
            <Link to={list.link} key={index} className="w-full">
              <li
                className="flex justify-between hover:bg-primary  hover:text-white text-dark  rounded-md px-2 w-full py-1.5 "
                onClick={() => {
                  closeSideBar();
                }}
              >
                <span key={index}>{list.name}</span>
                <span className="text-xl ml-auto">
                  <ChevronRightIcon className="icon-styling  hover:text-white" />
                </span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminSidebar;
