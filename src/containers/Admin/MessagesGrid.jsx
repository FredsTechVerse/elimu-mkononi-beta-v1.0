import React from "react";
import { MessagesCard, FancyMessage } from "../../components";
const MessagesGrid = ({ messagesQuery }) => {
  return (
    <div className="w-full tablet:hidden debug">
      {messagesQuery?.data?.length > 0 ? (
        <div className="grid-sm ">
          {messagesQuery?.data?.map((message, messageIndex) => {
            return (
              <MessagesCard
                message={message}
                key={messageIndex}
                messageKey={messageIndex % 2 === 0 ? "even" : "odd"}
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

export default MessagesGrid;
