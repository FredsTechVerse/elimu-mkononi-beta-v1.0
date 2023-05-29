import React from "react";
import {
  AdminCard,
  UnitsAdminTable,
  PageTitle,
  Footer,
} from "../../components";
import { tutorIcon, coursesIcon, studentsIcon, lessonIcon } from "../../assets";
// import tutorIcon from "../../assets/tutor-icon.png";
// import coursesIcon from "../../assets/courses-icon.png";
// import studentsIcon from "../../assets/students-icon.png";
// import lessonIcon from "../../assets/lesson-icon.png";
const AdminDashboard = () => {
  return (
    <div id="main" className="w-full h-full flex-col-centered justify-start">
      <div
        id="grid"
        className="w-full p-5 grid gap-5 phone:grid-cols-1 tablet:grid-cols-2 m-4"
      >
        <AdminCard Icon={studentsIcon} Number="100" Text="Students" />
        <AdminCard Icon={tutorIcon} Number="10" Text="Tutors" />
        <AdminCard Icon={lessonIcon} Number="300" Text="Lessons" />
        <AdminCard Icon={coursesIcon} Number="20" Text="Courses" />
      </div>
      <div
        id="table"
        className="w-full flex flex-col jusitfy-start items-center"
      >
        <PageTitle text="units summary" />

        <UnitsAdminTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
