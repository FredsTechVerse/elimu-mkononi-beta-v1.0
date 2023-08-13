import React from "react";
import { StatusPill, NavigateBtn, DashboardUserButton, CTAButton } from "..";
import { Link, useLocation } from "react-router-dom";

const UsersDataTable = ({ users, role }) => {
  const location = useLocation();

  return (
    <div className="hidden laptop:flex-col-centered w-full px-3 relative">
      <div className="flex-row-centered self-end  mb-2 w-32 h-10 ">
        <DashboardUserButton
          isRounded={false}
          item={
            role === "EM-203"
              ? "admin"
              : role === "EM-202"
              ? "tutor"
              : "student"
          }
        />
      </div>

      <table className="table-fixed w-full bg-slate-300 bg-opacity-10 shadow-lg shadow-slate-200">
        <thead>
          <tr className="text-white uppercase bg-primary h-10 ">
            <th className=" w-12  ">No</th>
            <th className=" w-48">F Name</th>
            <th className=" w-48">L Name</th>
            {role === "EM-202" && <th className=" w-36">Units</th>}
            <th className=" w-36">Status</th>
            <th className=" w-48">CTA</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => {
              let numberOfUnits = (role) => {
                if (role === "EM-202") {
                  return user.units?.length;
                }
                return null;
              };
              return (
                <tr
                  className={`${
                    index % 2 == 0 ? "bg-cyan-100  " : ""
                  } cursor-pointer text-center h-8`}
                  key={`tutor-${index}`}
                >
                  <td>{`${index + 1}`}</td>
                  <td>{user.firstName}</td>
                  <td>{user.surname}</td>
                  {role === "EM-202" && <td>{numberOfUnits(role)}</td>}
                  <td className="pt-1.5 flex-row-centered">
                    <StatusPill status={user.status} />
                  </td>
                  <td>
                    <CTAButton userID={user._id} contact={user.email} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersDataTable;
