import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const location = useLocation();

  return roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : roles ? (
    <Navigate to="/forbidden" state={{ from: location }} replace />
  ) : (
    <Navigate
      to="/log-in"
      state={{ from: location, background: "/" }}
      replace
    />
  );
};

export default RequireAuth;
