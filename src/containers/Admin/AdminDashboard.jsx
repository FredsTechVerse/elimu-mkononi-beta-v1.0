import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminSideBar } from "../../containers";
import {
  handleError,
  fetchUserDetails,
  fetchCoursesAggregate,
  fetchUnitsAggregate,
  fetchUsersAggregate,
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

  const [allUsers, setAllUsers] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [coursesData, setCoursesData] = useState(null);
  const [unitsDistribution, setUnitsDistribution] = useState(null);

  const userDataQuery = useQuery(["user"], () => fetchUserDetails(role), {
    retry: 1,
    onError: (error) => {
      handleError(error, updateAlertBoxData);
      if (error.response && error.response.data.message === "Token expired") {
        queryClient.invalidateQueries(["user"]);
      }
    },
  });

  const coursesAggregationQuery = useQuery(
    ["courseAggregate"],
    fetchCoursesAggregate,
    {
      staleTime: 1000 * 60 * 60,
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["courseAggregate"]);
        }
      },
    }
  );
  const unitsAggregationQuery = useQuery(
    ["unitsAggregate"],
    fetchUnitsAggregate,
    {
      staleTime: 1000 * 60 * 60,
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["unitsAggregate"]);
        }
      },
    }
  );

  const usersAggregationQuery = useQuery(
    ["usersAggregate"],
    fetchUsersAggregate,
    {
      staleTime: 1000 * 60 * 60,
      onError: (error) => {
        handleError(error, updateAlertBoxData);
        if (error.response && error.response.data.message === "Token expired") {
          queryClient.invalidateQueries(["usersAggregate"]);
        }
      },
    }
  );

  useEffect(() => {
    if (
      unitsAggregationQuery.status === "success" &&
      unitsAggregationQuery.data
    ) {
      let totalUnits = 0;
      let coursesOffered = [];
      let unitsPerCourse = [];
      let totalCourses = coursesAggregationQuery?.data?.coursesCount.length;
      unitsAggregationQuery.data.map((unit) => {
        totalUnits += unit.unitCount;
        coursesOffered.push(unit._id);
        unitsPerCourse.push(unit.unitCount);
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
            label: "Total ",
            data: unitsPerCourse,
            backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
            borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
          },
        ],
      });
    }
  }, [unitsAggregationQuery.status]);

  useEffect(() => {
    if (
      usersAggregationQuery.status === "success" &&
      usersAggregationQuery.data
    ) {
      setAllUsers({
        labels: ["Students", "Tutors", "Admins"],
        datasets: [
          {
            label: "Total",
            data: [
              usersAggregationQuery.data?.totalStudents,
              usersAggregationQuery.data?.totalTutors,
              usersAggregationQuery.data?.totalAdmins,
            ],
            backgroundColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
            borderColor: ["#8B1874", "#B71375", "#FC4F00", "#F79540"],
          },
        ],
      });
      setTotalUsers(
        usersAggregationQuery.data?.totalStudents +
          usersAggregationQuery.data?.totalTutors +
          usersAggregationQuery.data?.totalAdmins
      );
    }
  }, [usersAggregationQuery.status]);

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
          unitsDistribution,
          userDataQuery,
          usersAggregationQuery,
          allUsers,
        }}
      />
    </div>
  );
};

export default AdminDashboard;
