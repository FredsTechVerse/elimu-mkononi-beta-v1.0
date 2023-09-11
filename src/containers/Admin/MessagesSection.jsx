import React from "react";
import { TableSkeleton, MessagesTable, PageTitle } from "../../components";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { fetchMessages, handleError } from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const MessagesSection = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const messagesDataQuery = useQuery(["messages"], fetchMessages, {
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["messages"]);
      }
    },
  });
  return (
    <div className="content p-2 m-2 rounded-xl   flex flex-col justify-start ">
      {messagesDataQuery.status === "loading" ? (
        <TableSkeleton />
      ) : (
        <div className="flex-col-centered gap-5">
          <PageTitle title="List of messages" />
          <MessagesTable messagesQuery={messagesDataQuery} />
        </div>
      )}
    </div>
  );
};

export default MessagesSection;
