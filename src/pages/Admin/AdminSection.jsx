import React from "react";
import { AdminSectionTable, PageTitle } from "../../components";

const AdminSection = () => {
  return (
    <div>
      <PageTitle text="admin's summary" />
      <div>
        <AdminSectionTable />
      </div>
    </div>
  );
};

export default AdminSection;
