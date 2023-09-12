import React from "react";
import {
  TableSkeleton,
  NavMenuBtn,
  EmailsTable,
  PageTitle,
} from "../../components";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { fetchEmails, handleError } from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { EmailsGrid } from "../../containers";
import { useOutletContext } from "react-router-dom";
// const EmailSchema = new Schema({
//   from: { type: String, required: true },
//   to: [{ type: String, required: true }],
//   role: { type: String, required: true },
//   subject: { type: String, required: true },
//   text: { type: String, required: true },
//   status: { type: String, required: true },
// });

const EmailSection = () => {
  const { updateAlertBoxData } = useAlertBoxContext();
  const { isSideBarOpen, toggleSideBar } = useOutletContext();

  const queryClient = useQueryClient();
  const emailsDataQuery = useQuery(["emails"], fetchEmails, {
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["emails"]);
      }
    },
  });
  return (
    <div className="content p-2 m-2 rounded-xl  flex flex-col justify-start h-full overflow-auto">
      <div className="flex flex-row items-center justify-evenly gap-2 fixed bottom-2 right-2 tablet:right-5 z-20">
        <NavMenuBtn
          isNavOpen={isSideBarOpen}
          toggleNavbar={toggleSideBar}
          position="layout"
        />
      </div>
      {emailsDataQuery.status === "loading" ? (
        <TableSkeleton />
      ) : (
        <div className="flex-col-centered gap-5">
          <PageTitle title="List of emails" />
          <EmailsTable emailsQuery={emailsDataQuery} />
          <EmailsGrid emailsQuery={emailsDataQuery} />
        </div>
      )}
    </div>
  );
};

export default EmailSection;
