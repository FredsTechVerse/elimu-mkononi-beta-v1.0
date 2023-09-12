import React from "react";
import { EmailsCard, FancyMessage } from "../../components";
const EmailsGrid = ({ emailsQuery }) => {
  return (
    <div className="w-full tablet:hidden">
      {emailsQuery?.data?.length > 0 ? (
        <div className="grid-sm ">
          {emailsQuery?.data?.map((email, emailIndex) => {
            return (
              <EmailsCard
                email={email}
                key={emailIndex}
                emailKey={emailIndex % 2 === 0 ? "even" : "odd"}
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

export default EmailsGrid;
