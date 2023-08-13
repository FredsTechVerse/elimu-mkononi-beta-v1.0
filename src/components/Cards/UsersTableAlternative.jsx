import React from "react";
import { UserCard, DashboardUserButton } from "../../components";

const UsersTableAlternative = ({ users, fetchUsersData, role }) => {
  return (
    <div className="phone:block laptop:hidden w-full flex-col-centered">
      <div className="flex-col-centered">
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

        <div className="grid-sm">
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
