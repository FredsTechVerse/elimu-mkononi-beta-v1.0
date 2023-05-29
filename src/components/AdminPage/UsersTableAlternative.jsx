import React from "react";
import { CTAButton, StatusPill, UsersCard } from "../../components";

const UsersTableAlternative = ({ usersData, fetchUsersData }) => {
  return (
    <div className="grid-display tablet:grid-cols-1 p-2">
      {usersData.length > 0 &&
        usersData.map((userData, userIndex) => {
          console.log(`Original user key is ${userIndex}`);
          return (
            <UsersCard
              userData={userData}
              key={userIndex}
              fetchUsersData={fetchUsersData}
              userKey={userIndex % 2 === 0 ? "even" : "odd"}
            />
          );
        })}
    </div>
  );
};
export default UsersTableAlternative;
