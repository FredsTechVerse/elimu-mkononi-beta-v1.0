import { StudentsAdminTable, PageTitle } from "../../components";
import React from "react";

const StudentsPageAdmin = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <PageTitle text="student's summary" />
      <StudentsAdminTable />
    </div>
  );
};

export default StudentsPageAdmin;
