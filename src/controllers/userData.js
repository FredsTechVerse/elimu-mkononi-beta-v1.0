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

const deleteUser = async ({ userID }) => {
  console.log(`User ID  for deletion passed :  ${JSON.stringify(userID)}`);
  await axios.delete(`/auth/student/${userID}`);
};

const messageUser = ({ contact }) => {
  console.log("Contact data to api responsible ${JSON.stingify(contact)}");
};

export { registerUser, loginUser, logoutUser, deleteUser, messageUser };
