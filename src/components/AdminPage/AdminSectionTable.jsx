import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { StatusPill, CTAButton, NavigateBtn } from "..";

const AdminSectionTable = () => {
  const [adminsData, setAdminsData] = useState([]);
  let fetchUsersData = async () => {
    try {
      let { data } = await axios.get("/auth/all-admins");
      console.log(data);
      setAdminsData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <>
      <div className="flex flex-col align-center relative shadow-md phone:rounded-lg w-full h-full pt-2 px-4">
        <div className="flex w-full items-center justify-end mb-3 pr-1">
          <NavigateBtn
            destination="new-admin"
            text="New Admin"
            icon="tenantIcon"
          />
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full bg-cyan-50">
            <thead className="text-secondary flex w-full items-center justify-center uppercase h-full">
              <tr className="flex w-full items-center justify-center px-2 bg-primary  h-12">
                <th className="flex w-28 px-2 ">No</th>
                <th className="justify-center items-start flex py-2 w-64">
                  F Name
                </th>
                <th className="justify-center items-center  flex py-2 w-64">
                  L Name
                </th>
                <th className="justify-center items-center  flex py-2 w-56">
                  Units
                </th>
                <th className="justify-center items-center flex py-2 w-56">
                  Status
                </th>
                <th className="flex py-2 w-64 justify-center items-center">
                  CTA
                </th>
              </tr>
            </thead>
            <tbody className="flex flex-col w-full items-center justify-start">
              {adminsData.map((tutor, index) => {
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
                    } flex w-full items-center justify-start px-2 cursor-pointer font-normal text-xl`}
                    key={`tutor-${index}`}
                  >
                    <td className="py-1 px-2 w-28 justify-center">{`${
                      index + 1
                    }`}</td>
                    <td className="py-1 w-64  flex justify-center items-center">
                      {fName}
                    </td>
                    <td className="py-1 w-64  flex justify-center items-center">
                      {lName}
                    </td>
                    <td className="py-1 w-56   flex justify-center items-center">
                      {numberOfUnits}
                    </td>
                    <td className="py-1 w-56  flex justify-center items-center ">
                      <StatusPill status={status} />
                    </td>
                    <td className="py-1 w-64 ">
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
      </div>
    </>
  );
};

export default AdminSectionTable;
