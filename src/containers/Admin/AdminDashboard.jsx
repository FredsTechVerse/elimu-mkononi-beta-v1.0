import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminSideBar, AdminSummary } from "../../containers";
import {
  handleError,
  fetchUserDetails,
  fetchCoursesData,
  fetchAllUsersData,
} from "../../controllers";
import { useAlertBoxContext } from "../../context/AlertBoxContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AdminDashboard = () => {
  const role = "EM-203";
  const queryClient = useQueryClient();
  const { updateAlertBoxData } = useAlertBoxContext();
  const [totalUnits, setTotalUnits] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const openSideBar = () => {
    setIsSideBarOpen(true);
  };
  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  const [allUsers, setAllUsers] = useState({
    labels: ["Students , Tutors , Admins"],
    datasets: [
      {
        label: "Users",
        data: [0, 0, 0],
        backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
        borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
      },
    ],
  });
  const [totalUsers, setTotalUsers] = useState(0);
  const [coursesData, setCoursesData] = useState({
    labels: ["Total Units", "Total Lessons"],
    datasets: [
      {
        label: "Workload",
        data: [0, 0],
        backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
        borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
      },
    ],
  });

  const [unitsDistribution, setUnitsDistribution] = useState({
    labels: ["Total Units", "Total Lessons"],
    datasets: [
      {
        label: "Workload",
        data: [0, 0],
        backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
        borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
      },
    ],
  });

  const userDataQuery = useQuery(["user"], () => fetchUserDetails(role), {
    retry: 1,
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["user"]);
      }
    },
  });

  const coursesQuery = useQuery(["courseAnalysis"], fetchCoursesData, {
    staleTime: 1000 * 60 * 60,
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["courseAnalysis"]);
      }
    },
  });

  const allUsersQuery = useQuery(["users"], fetchAllUsersData, {
    staleTime: 1000 * 60 * 60,
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["courses"]);
      }
    },
  });

  useEffect(() => {
    if (coursesQuery.status === "success" && coursesQuery?.data) {
      let totalUnits = 0;
      let coursesOffered = [];
      let unitsPerCourse = [];
      let totalCourses = coursesQuery?.data?.length;
      coursesQuery?.data.forEach((course) => {
        totalUnits += course?.units?.length;
        coursesOffered.push(course?.courseTitle);
        unitsPerCourse.push(course?.units?.length);
      });

      setTotalCourses(totalCourses);
      setTotalUnits(totalUnits);
      setCoursesData({
        labels: coursesOffered,
        datasets: [
          {
            label: "Total Units",
            data: unitsPerCourse,
            backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
            borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
          },
        ],
      });
      setUnitsDistribution({
        labels: coursesOffered,
        datasets: [
          {
            label: "Units per course",
            data: unitsPerCourse,
            backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
            borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
          },
        ],
      });
    }
  }, [coursesQuery?.status]);

  useEffect(() => {
    if (allUsersQuery.status === "success" && allUsersQuery?.data) {
      setAllUsers({
        labels: ["Students", "Tutors", "Admins"],
        datasets: [
          {
            label: "Users",
            data: [
              allUsersQuery?.data?.totalStudents,
              allUsersQuery?.data?.totalTutors,
              allUsersQuery?.data?.totalAdmins,
            ],
            backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
            borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
          },
        ],
      });
      setTotalUsers(
        allUsersQuery?.data?.totalStudents +
          allUsersQuery?.data?.totalTutors +
          allUsersQuery?.data?.totalAdmins
      );
    }
  }, [allUsersQuery.status]);

  return (
    <div className="h-screen w-full flex phone:flex-col tablet:flex-row relative ">
      <AdminSideBar
        userDataQuery={userDataQuery}
        closeSideBar={closeSideBar}
        isSideBarOpen={isSideBarOpen}
      />
      <Outlet
        context={{
          openSideBar,
          isSideBarOpen,
          totalUnits,
          totalCourses,
          totalUsers,
          coursesData,
          coursesQuery,
          unitsDistribution,
          userDataQuery,
          allUsersQuery,
          allUsers,
        }}
      />
    </div>
  );
};

export default AdminDashboard;
