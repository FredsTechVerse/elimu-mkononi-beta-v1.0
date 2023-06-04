import React, { useState, useEffect } from "react";
import axios from "../../axios";
import {
  UsersDataTable,
  PageTitle,
  UsersTableAlternative,
} from "../../components";

const AdminSection = () => {
  const [usersData, setUsersData] = useState([]);
  let fetchUsersData = async () => {
    try {
      let { data } = await axios.get("/auth/all-tutors");
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
        <PageTitle text="list of admins" />
        <UsersDataTable
          users={usersData}
          fetchUsersData={fetchUsersData}
          role={"EM-203"}
        />
        <UsersTableAlternative
          users={usersData}
          fetchUsersData={fetchUsersData}
          role={"EM-203"}
        />
      </div>
    );
  } else {
    return <div>Data is populating please wait ---</div>;
  }
};

export default AdminSection;
