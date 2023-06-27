import React from "react";
import {
  UsersDataTable,
  PageTitle,
  UsersTableAlternative,
} from "../../components";
import { fetchUsersData } from "../../controllers/fetchData";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const UsersPage = () => {
  const { role } = useParams();
  console.log(`Current role ${role}`);

  const assignUserRole = () => {
    if (role === "students") {
      return "EM-201";
    } else if (role === "tutors") {
      return "EM-202";
    } else if (role === "admins") {
      return "EM-203";
    }
  };
  const userRole = assignUserRole();

  const tutorsQuery = useQuery({
    queryKey: [userRole],
    queryFn: () => fetchUsersData(userRole),
  });

  return (
    <div className="w-full flex-col-centered">
      <PageTitle
        text={
          userRole === "EM-201"
            ? "Student's Summary"
            : userRole === "EM-202"
            ? "tutor's summary"
            : "Admin's Summary"
        }
      />

      {tutorsQuery.status === "loading" ? (
        <div className="w-full h-full flex-row-centered bg-slate-300">
          <p className=" flex-col-centered text-center text-slate-700 py-3 px-2 m-2 rounded-lg h-24 ">
            User Data is Loading
          </p>
        </div>
      ) : tutorsQuery.status === "error" ? (
        <p className="bg-red-300 rounded-lg p-4">
          {JSON.stringify(tutorsQuery.error.message)}
        </p>
      ) : (
        <div className="w-full">
          <UsersDataTable
            users={tutorsQuery.data}
            fetchUsersData={fetchUsersData}
            role={userRole}
          />
          <UsersTableAlternative
            users={tutorsQuery.data}
            fetchUsersData={fetchUsersData}
            role={userRole}
          />
        </div>
      )}
    </div>
  );
};

export default UsersPage;
