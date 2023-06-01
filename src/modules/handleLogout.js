const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("roles");
  window.location.reload();
  return "Logged out successfully";
};

export { handleLogout };
