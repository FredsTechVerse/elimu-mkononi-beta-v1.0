import React from "react";
import { StatusPill, CTAButton } from "..";
const UsersTable = ({ usersQuery, role }) => {
  return (
    <table className="phone:hidden laptop:table  w-full bg-slate-50 shadow-lg shadow-slate-200  ">
      <thead className="w-full ">
        <tr className="text-white uppercase bg-primary h-10 ">
          <th className=" w-12  ">No</th>
          <th className=" w-48">F Name</th>
          <th className=" w-48">L Name</th>
          {role === "EM-202" && <th className=" w-36">Units</th>}
          <th className=" w-36">Status</th>
          <th className=" w-48">CTA</th>
        </tr>
      </thead>
      <tbody className="w-full ">
        {usersQuery.data &&
          usersQuery.data.map((user, index) => {
            const numberOfUnits = (role) => {
              if (role === "EM-202") {
                return user.units?.length;
              }
              return null;
            };
            return (
              <tr
                className={`${
                  index % 2 == 0 && "bg-blue-200  "
                } cursor-pointer text-center h-12  w-full`}
                key={`tutor-${index}`}
              >
                <td>{`${index + 1}`}</td>
                <td>{user.firstName}</td>
                <td className="">{user.surname}</td>
                {role === "EM-202" && <td>{numberOfUnits(role)}</td>}
                <td className="">
                  <div className=" flex-row-centered">
                    <StatusPill status={user.status} />
                  </div>
                </td>
                <td>
                  <CTAButton
                    userID={user._id}
                    contact={user.email}
                    role={role}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default UsersTable;
