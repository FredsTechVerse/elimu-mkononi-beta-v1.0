import React from "react";
import { StatusPill, CTAButton, NavigateBtn } from "..";

const UsersDataTable = ({ usersData, fetchUsersData }) => {
  return (
    <div className="hidden laptop:block w-full px-3">
      <div className="flex items-center justify-start mb-1">
        <NavigateBtn
          destination="new-tutor"
          text="New tutor"
          icon="tenantIcon"
        />
      </div>

      <table class="table-fixed w-full bg-slate-300 bg-opacity-10 shadow-lg shadow-slate-200">
        <thead>
          <tr className="text-white uppercase bg-primary h-10 ">
            <th className=" w-12  ">No</th>
            <th className=" w-48">F Name</th>
            <th className=" w-48">L Name</th>
            <th className=" w-36">Units</th>
            <th className=" w-36">Status</th>
            <th className=" w-48">CTA</th>
          </tr>
        </thead>
        <tbody>
          {usersData &&
            usersData.map((tutor, index) => {
              let {
                firstName: fName,
                surname: lName,
                units,
                email,
                status,
                _id,
              } = tutor;
              let numberOfUnits = units.length;
              return (
                <tr
                  className={`${
                    index % 2 == 0 ? "bg-cyan-100  " : ""
                  } cursor-pointer text-center`}
                  key={`tutor-${index}`}
                >
                  <td>{`${index + 1}`}</td>
                  <td>{fName}</td>
                  <td>{lName}</td>
                  <td>{numberOfUnits}</td>
                  <td className="pt-1.5 flex-row-centered">
                    <StatusPill status={status} />
                  </td>
                  <td>
                    <CTAButton
                      _id={_id}
                      contact={email}
                      fetchUsersData={fetchUsersData}
                    />
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
