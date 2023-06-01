import React, { useState, useEffect } from "react";
import axios from "../../axios";
import {
  UsersDataTable,
  PageTitle,
  UsersTableAlternative,
} from "../../components";
const StudentsPageAdmin = () => {
  const [usersData, setUsersData] = useState([]);

  let fetchUsersData = async () => {
    try {
      let { data } = await axios.get("/auth/all-students");
      console.log(data);
      setUsersData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsersData();
  }, []);

  if (usersData.length > 0) {
    return (
      <div className=" w-full flex-col-centered">
        <PageTitle text="list of students" />
        <UsersDataTable
          users={usersData}
          fetchUsersData={fetchUsersData}
          role={"EM-201"}
        />
        <UsersTableAlternative
          users={usersData}
          fetchUsersData={fetchUsersData}
          role={"EM-201"}
        />
      </div>
    );
  } else {
    return <div>Data is populating please wait ---</div>;
  }
};

export default StudentsPageAdmin;
