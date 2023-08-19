import axios from "../axios";

const registerUser = async ({
  firstName,
  surname,
  password,
  contact,
  email,
  role,
}) => {
  const userData = { firstName, surname, password, contact, email };
  if (role === "EM-203") {
    await axios.post("/auth/admin", userData);
    return;
  } else if (role === "EM-201") {
    await axios.post("/auth/student", userData);
    return;
  } else if (role === "EM-202") {
    await axios.post("/auth/tutor", userData);
    return;
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
    await axios.put(`/auth/admin/${userID}`, userData);
    return;
  } else if (role === "EM-201") {
    await axios.put(`/auth/student/${userID}`, userData);
    return;
  } else if (role === "EM-202") {
    await axios.put(`/auth/tutor/${userID}`, userData);
    return;
  }
};

const loginUser = async ({ firstName, password }) => {
  const credentials = { firstName, password };
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
  console.log(
    `The delete user function is active with the roles ${(userID, role)}`
  );
  if (role === "EM-203") {
    let { data: adminData } = await axios.delete(`/auth/admin/${userID}`);
    return adminData;
  } else if (role === "EM-202") {
    let { data: tutorData } = await axios.delete(`/auth/tutor/${userID}`);
    return tutorData;
  } else if (role === "EM-201") {
    let { data: studentData } = await axios.delete(`/auth/student/${userID}`);
    return studentData;
  } else {
    throw new Error(`Unsupported role: ${role}`);
  }
};

const messageUser = ({ contact }) => {
  console.log("Contact data to api responsible ${JSON.stingify(contact)}");
};

export {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  messageUser,
  updateUser,
};