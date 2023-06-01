import React from "react";
import { Link } from "react-router-dom";
import Students from "../../assets/students.png";
import Tutors from "../../assets/tutor-1.png";
import Courses from "../../assets/courses-icon.png";
import { BsChevronRight } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";

const lists = [
  { name: "Dashboard", link: "/admin/", icon: Students },
  { name: "Students", link: "/admin/students", icon: Students },
  { name: "Tutors", link: "/admin/tutors", icon: Tutors },
  { name: "Courses", link: "/admin/courses", icon: Courses },
  { name: "Admin", link: "/admin/admins", icon: Tutors },
];

const AdminSidebar = ({ closeSideBar }) => {
  // const userData = useContext(UserdataContext);
  return (
    <div className="relative flex flex-col items-center justify-start h-full w-full bg-slate-200 z-5">
      <div
        className="absolute top-5 right-5 text-3xl tablet:hidden"
        onClick={() => {
          closeSideBar();
        }}
      >
        <IoMdCloseCircle />
      </div>
      <div className="flex-col-centered pt-5">
        <img
          src="https://source.unsplash.com/100x100/?portrait"
          alt=""
          className="w-[170px] h-[170px] rounded-full dark:bg-gray-500"
        />
        <div className="name capitalize mt-4 font-bold text-3xl">
          John Mwangi
        </div>
        <div className="role capitalize m-4 text-center text-white bg-primary  px-5 py-1 rounded-3xl font-bold text-lg">
          Admin
        </div>
      </div>
      <ul className="py-2 my-1 flex flex-col items-center justify-start gap-2 w-full">
        {lists.map((list, index) => {
          return (
            <Link to={list.link} key={index}>
              <li
                className="flex justify-between hover:bg-primary  hover:text-white text-dark border-2 border-primary rounded-md px-2 w-64 py-1.5"
                onClick={() => {
                  closeSideBar();
                }}
              >
                <span key={index}>{list.name}</span>
                <span className="text-xl ml-auto">
                  <BsChevronRight />
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
