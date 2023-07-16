import React from "react";
import {
  UsersDataTable,
  PageTitle,
  UsersTableAlternative,
} from "../../components";
import { fetchUsersData } from "../../controllers/fetchData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { handleError } from "../../controllers/handleErrors";
const UsersPage = () => {
  const { role } = useParams();
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();

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

  const usersQuery = useQuery([userRole], () => fetchUsersData(userRole), {
    retry: 1,
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries([userRole]);
      }
    },
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

      {usersQuery.status === "loading" ? (
        <div className="w-full h-full flex-row-centered bg-slate-300">
          <p className=" flex-col-centered text-center text-slate-700 py-3 px-2 m-2 rounded-lg h-24 ">
            User Data is Loading
          </p>
        </div>
      ) : (
        <div className="w-full debug">
          <UsersDataTable
            users={usersQuery.data}
            fetchUsersData={fetchUsersData}
            role={userRole}
          />
          <UsersTableAlternative
            users={usersQuery.data}
            fetchUsersData={fetchUsersData}
            role={userRole}
          />
        </div>
      )}
    </div>
  );
};

export default UsersPage;
