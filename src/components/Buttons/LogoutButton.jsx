import React from "react";

const LogoutButton = () => {
  //THE CLEANUP TEAM.
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("roles");
    window.location.reload();
  };
  return (
    <button
      className="navbar-link border-2 border-white"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
