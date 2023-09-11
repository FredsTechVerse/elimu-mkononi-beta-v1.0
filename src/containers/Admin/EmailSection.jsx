import React from "react";
import { TableSkeleton, EmailsTable, PageTitle } from "../../components";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { fetchEmails, handleError } from "../../controllers";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
    <div className="content p-2 m-2 rounded-xl  flex flex-col justify-start ">
      {emailsDataQuery.status === "loading" ? (
        <TableSkeleton />
      ) : (
        <div className="flex-col-centered gap-5">
          <PageTitle title="List of emails" />
          <EmailsTable emailsQuery={emailsDataQuery} />
        </div>
      )}
    </div>
  );
};

export default EmailSection;
