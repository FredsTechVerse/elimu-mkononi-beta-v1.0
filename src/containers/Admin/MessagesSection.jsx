import React from "react";
import {
  TableSkeleton,
  MessagesTable,
  NavMenuBtn,
  PageTitle,
  FancyMessage,
} from "../../components";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { fetchMessages, handleError } from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MessagesGrid } from "../../containers";
import { useOutletContext, Link, useLocation } from "react-router-dom";

const MessagesSection = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const queryClient = useQueryClient();
  const location = useLocation();
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
    <div className="relative w-full laptop:w-3/4  flex flex-col justify-start items-center  h-full overflow-auto p-3 overflow-x-hidden ">
      <Link
        to={{ pathname: "/new-message" }}
        state={{ background: location }}
        className={`absolute top-2 right-2  navbar-link h-8 rounded-lg group 
            bg-slate-700 hover:bg-slate-900  
           text-white `}
      >
        Message
      </Link>
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
          {messagesDataQuery.data.length > 0 ? (
            <div className="w-full ">
              <PageTitle title="List of messages" />
              <MessagesTable messagesQuery={messagesDataQuery} />
              <MessagesGrid messagesQuery={messagesDataQuery} />
            </div>
          ) : (
            <FancyMessage message="There are currently no messages" />
          )}
        </div>
      )}
    </div>
  );
};

export default MessagesSection;
