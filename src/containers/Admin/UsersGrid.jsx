import React from "react";
import { UserCard, FancyMessage } from "../../components";
const UsersGrid = ({ usersQuery, role }) => {
  return (
    <div className="w-full tablet:hidden">
      {usersQuery?.data?.length > 0 ? (
        <div className="grid-sm ">
          {usersQuery?.data?.map((userData, userIndex) => {
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
      ) : (
        <FancyMessage message="No users registered" />
      )}
    </div>
  );
};

export default UsersGrid;
