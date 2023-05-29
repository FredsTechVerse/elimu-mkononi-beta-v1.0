import React, { useState, useEffect } from "react";
import { StatusPill, CTAButton, NavigateBtn } from "..";
import axios from "../../axios";
const StudentsAdminTable = () => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    let fetchUsersData = async () => {
      try {
        let { data } = await axios.get("/auth/all-students");
        console.log(data);
        setStudentsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsersData();
  }, []);
  return (
    <>
      <div className="flex flex-col align-center relative shadow-md phone:rounded-lg w-full h-full pt-2 px-4">
        <div className="flex w-full items-center justify-end mb-3 pr-1">
          <NavigateBtn
            destination="new-student"
            text="Add student"
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
                <th className="justify-center items-center  flex py-2 w-64">
                  Reg Date
                </th>
                <th className="justify-center items-center flex py-2 w-48">
                  A/C Status
                </th>
                <th className="flex py-2 w-64 justify-center items-center">
                  CTA
                </th>
              </tr>
            </thead>

            <tbody className="flex flex-col w-full items-center justify-start">
              {studentsData &&
                studentsData.map((student, index) => {
                  let {
                    firstName: fName,
                    surname: lName,
                    email,
                    status,
                    _id,
                    updatedAt: dateOfRegistration,
                  } = student;
                  return (
                    <tr
                      className={`${
                        index % 2 == 0 ? "bg-cyan-100  " : ""
                      } flex w-full items-center justify-start px-2 cursor-pointer font-normal text-xl`}
                      key={`student-${index}`}
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
                      <td className="py-1 w-64   flex justify-center items-center">
                        {dateOfRegistration}
                      </td>
                      <td className="py-1 w-48  flex justify-center items-center ">
                        <StatusPill status={status} />
                      </td>
                      <td className="py-1 w-64 ">
                        <CTAButton _id={_id} contact={email} />
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

export default StudentsAdminTable;
