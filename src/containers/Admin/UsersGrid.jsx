import React from "react";
import { UserCard } from "../../components";
const UsersGrid = ({ usersQuery, role }) => {
  return (
    <div className="grid-sm laptop:hidden">
      {usersQuery?.data?.length > 0 &&
        usersQuery?.data.map((userData, userIndex) => {
          return (
            <UserCard
              user={userData}
              key={userIndex}
              userKey={userIndex % 2 === 0 ? "even" : "odd"}
              role={role}
            />
          );
        })}
    </div>
  );
};

export default UsersGrid;
