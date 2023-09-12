import React from "react";
import {
  TableSkeleton,
  MessagesTable,
  NavMenuBtn,
  PageTitle,
} from "../../components";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { fetchMessages, handleError } from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MessagesGrid } from "../../containers";
import { useOutletContext } from "react-router-dom";

const MessagesSection = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const { isSideBarOpen, toggleSideBar } = useOutletContext();

  const messagesDataQuery = useQuery(["messages"], fetchMessages, {
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["messages"]);
      }
    },
  });
  return (
    <div className="content p-2 m-2 rounded-xl   flex flex-col justify-start  h-full overflow-auto">
      <div className="flex flex-row items-center justify-evenly gap-2 fixed bottom-2 right-2 tablet:right-5 z-20">
        <NavMenuBtn
          isNavOpen={isSideBarOpen}
          toggleNavbar={toggleSideBar}
          position="layout"
        />
      </div>
      {messagesDataQuery.status === "loading" ? (
        <TableSkeleton />
      ) : (
        <div className="flex-col-centered gap-5   ">
          <PageTitle title="List of messages" />
          <MessagesTable messagesQuery={messagesDataQuery} />
          <MessagesGrid messagesQuery={messagesDataQuery} />
        </div>
      )}
    </div>
  );
};

export default MessagesSection;
