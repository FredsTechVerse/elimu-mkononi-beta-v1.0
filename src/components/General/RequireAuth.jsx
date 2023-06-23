import { Outlet, Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const roles = JSON.parse(localStorage.getItem("roles"));
  const location = useLocation();
  function hasJWT() {
    let flag = false;
    localStorage.getItem("accessToken") ? (flag = true) : (flag = false);
    return flag;
  }
  console.log(`Does the user have JWT ${hasJWT()}`);
  return roles?.find((role) => allowedRoles?.includes(role)) && hasJWT() ? (
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
