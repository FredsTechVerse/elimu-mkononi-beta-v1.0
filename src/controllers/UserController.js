import axios from "../axios";
const accessToken = localStorage.getItem("accessToken");

const registerUser = async ({
  firstName,
  surname,
  password,
  contact,
  email,
  role,
}) => {
  const userInfo = { firstName, surname, password, contact, email };
  if (role === "EM-203") {
    const { data: userData } = await axios.post("/admin", userInfo);
    return userData;
  } else if (role === "EM-201") {
    const { data: userData } = await axios.post("/student", userInfo);
    return userData;
  } else if (role === "EM-202") {
    const { data: userData } = await axios.post("/tutor", userInfo);
    return userData;
  }
};

const updateUser = async ({
  userID,
  firstName,
  surname,
  contact,
  email,
  role,
}) => {
  const userData = { firstName, surname, contact, email };
  if (role === "EM-203") {
    await axios.put(`/admin/${userID}`, userData);
    return;
  } else if (role === "EM-201") {
    await axios.put(`/student/${userID}`, userData);
    return;
  } else if (role === "EM-202") {
    await axios.put(`/tutor/${userID}`, userData);
    return;
  }
};

const verifyContact = async ({ contact, email }) => {
  const credentials = { contact, email };
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const { data: authorizedUser } = await axios.post(
    "/auth/verify-contact",
    credentials,
    config
  );
  return authorizedUser;
};

const confirmResetToken = async ({ resetToken, role, userID }) => {
  const userData = { resetToken };
  if (role === "EM-203") {
    await axios.post(`/admin/${userID}`, userData);
    return;
  } else if (role === "EM-201") {
    await axios.post(`/student/${userID}`, userData);
    return;
  } else if (role === "EM-202") {
    await axios.post(`/tutor/${userID}`, userData);
    return;
  }
};

const confirmUserCredentials = async ({
  contactVerification,
  emailVerification,
  role,
  userID,
}) => {
  console.log({ contactVerification, emailVerification, role, userID });
  const userData = { contactVerification, emailVerification, role };
  if (role === "EM-203") {
    await axios.post(`/admin/confirmation/${userID}`, userData);
    return;
  } else if (role === "EM-201") {
    await axios.post(`/student/confirmation/${userID}`, userData);
    return;
  } else if (role === "EM-202") {
    await axios.post(`/tutor/confirmation/${userID}`, userData);
    return;
  }
};

const updatePassword = async ({ role, userID, password }) => {
  const userData = { password, userID };
  if (role === "EM-203") {
    await axios.put(`/admin/password`, userData);
    return;
  } else if (role === "EM-201") {
    await axios.put(`/student/password`, userData);
    return;
  } else if (role === "EM-202") {
    await axios.put(`/tutor/password`, userData);
    return;
  }
};

const loginUser = async ({ email, password }) => {
  const credentials = { email, password };
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const { data: authorizedUser } = await axios.post(
    "/auth/login",
    credentials,
    config
  );
  return authorizedUser;
};

const logoutUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const config = {
    headers: { "Content-Type": "application/json" },
    data: { refreshToken: refreshToken },
  };
  await axios.delete("/auth/logout", config);
};

const deleteUser = async ({ userID, role }) => {
  if (role === "EM-203") {
    let { data: adminData } = await axios.delete(`/admin/${userID}`);
    return adminData;
  } else if (role === "EM-202") {
    let { data: tutorData } = await axios.delete(`/tutor/${userID}`);
    return tutorData;
  } else if (role === "EM-201") {
    let { data: studentData } = await axios.delete(`/student/${userID}`);
    return studentData;
  } else {
    throw new Error(`Unsupported role: ${role}`);
  }
};

const fetchAllUsersData = async () => {
  const { data: usersData } = await axios.get("/auth/all-users");
  return usersData;
};

const fetchUsersAggregate = async () => {
  const { data: userCount } = await axios.get(`/auth/aggregated-users`);
  return userCount;
};

const fetchUserDetails = async (role) => {
  if (role === "EM-202") {
    const { data: tutorData } = await axios.get("/tutor", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return tutorData;
  } else if (role === "EM-203") {
    const { data: adminData } = await axios.get("/admin", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return adminData;
  }
};

const fetchUsersData = async (role) => {
  if (role === "EM-203") {
    let { data: adminData } = await axios.get("/admin/all-admins");
    return adminData;
  } else if (role === "EM-201") {
    let { data: studentData } = await axios.get("/student/all-students");
    return studentData;
  } else if (role === "EM-202") {
    let { data: tutorData } = await axios.get("/tutor/all-tutors");
    return tutorData;
  }
};

const fetchUserData = async ({ role, userID }) => {
  console.log(`User ID sent to server ${(role, userID)}`);
  if (role === "EM-203") {
    let { data: adminData } = await axios.get(`/admin/${userID}`);
    return adminData;
  } else if (role === "EM-202") {
    let { data: tutorData } = await axios.get(`/tutor/${userID}`);
    return tutorData;
  } else if (role === "EM-201") {
    let { data: studentData } = await axios.get(`/student/${userID}`);
    return studentData;
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  updateUser,
  fetchAllUsersData,
  fetchUsersAggregate,
  fetchUserDetails,
  fetchUsersData,
  fetchUserData,
  verifyContact,
  updatePassword,
  confirmResetToken,
  confirmUserCredentials,
};
