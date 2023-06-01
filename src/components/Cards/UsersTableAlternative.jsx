import React from "react";
import { CTAButton, StatusPill, UsersCard } from "..";

const UsersTableAlternative = ({ users, fetchUsersData, role }) => {
  return (
    <div className="grid-display tablet:grid-cols-1 p-2">
      {users.length > 0 &&
        users.map((userData, userIndex) => {
          console.log(`Original user key is ${userIndex}`);
          return (
            <UsersCard
              user={userData}
              key={userIndex}
              fetchUsersData={fetchUsersData}
              userKey={userIndex % 2 === 0 ? "even" : "odd"}
              role={role}
            />
          );
        })}
    </div>
  );
};
export default UsersTableAlternative;
