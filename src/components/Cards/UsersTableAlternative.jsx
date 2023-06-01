import React from "react";
import { UserCard, NavigateBtn } from "../../components";

const UsersTableAlternative = ({ users, fetchUsersData, role }) => {
  return (
    <div className="phone:block laptop:hidden w-full debug border-black flex-col-centered">
      <div className="flex items-center justify-start mb-1">
        <NavigateBtn
          destination={
            role === "EM-203"
              ? "new-admin"
              : role === "EM-202"
              ? "new-tutor"
              : "new-student"
          }
          text={
            role === "EM-203"
              ? "new admin"
              : role === "EM-202"
              ? "new tutor"
              : "new student"
          }
          icon="tenantIcon"
        />
      </div>
      <div className="flex-col-centered">
        <div className="grid-display tablet:grid-cols-1 p-2 ">
          {users.length > 0 &&
            users.map((userData, userIndex) => {
              return (
                <UserCard
                  user={userData}
                  key={userIndex}
                  fetchUsersData={fetchUsersData}
                  userKey={userIndex % 2 === 0 ? "even" : "odd"}
                  role={role}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default UsersTableAlternative;
