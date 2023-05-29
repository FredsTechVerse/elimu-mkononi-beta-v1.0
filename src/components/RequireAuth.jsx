import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  //We unconvert the string converted at first.
  const roles = JSON.parse(localStorage.getItem("roles"));
  // console.log(roles);
  const location = useLocation();

  //Confirming the requested variabls.
  // console.log(roles);
  // console.log(user);

  // LOGIC
  // If the roles are there , it is just that the person of interest is not authorized to access the said content.

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
