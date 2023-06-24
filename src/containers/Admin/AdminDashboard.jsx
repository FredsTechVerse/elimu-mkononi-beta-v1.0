import { AdminCard, DashboardUserButton, UserProfile } from "../../components";
import { profile } from "../../assets";
import {
  Square3Stack3DIcon,
  UserIcon,
  UserGroupIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
const AdminDashboard = () => {
  return (
    <div
      id="main"
      className="w-full h-full flex-col-centered justify-start bg-slate-100"
    >
      <div
        id="grid"
        className="w-full p-5 grid gap-5 phone:grid-cols-1 tablet:grid-cols-2 m-4"
      >
        <AdminCard Number="100" Text="Students" />
        <AdminCard Number="10" Text="Tutors" />
        <AdminCard Number="300" Text="Lessons" />
        <AdminCard Icon={Square3Stack3DIcon} Number="20" Text="Courses" />
      </div>
      <div id="table" className="w-56 gap-2 aspect-video grid grid-cols-2">
        <DashboardUserButton user="tutors" />
        <DashboardUserButton user="students" />
        <DashboardUserButton user="courses" />
        <DashboardUserButton user="admins" />
      </div>

      <UserProfile />
    </div>
  );
};

export default AdminDashboard;
