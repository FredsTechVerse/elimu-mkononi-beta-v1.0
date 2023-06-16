import axios from "../axios";

async function createChapter({
  chapterNumber,
  chapterName,
  chapterDescription,
  unitID,
}) {
  let chapterData = {
    unitID,
    chapterNumber,
    chapterName,
    chapterDescription,
  };
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  console.log(
    ` Chapter Data going to the database ${JSON.stringify(chapterData)}`
  );

  const { data } = await axios.post(
    "/chapter/new-chapter",
    chapterData,
    config
  );
  console.log(JSON.stringify(data));
  return data;
}

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
    let { data } = await axios.post("/auth/register-admin", userData);
    return data;
  } else if (role === "EM-201") {
    let { data } = await axios.post("/auth/register-student", userData);
    console.log(`Student Data ${data}`);
    return data;
  } else if (role === "EM-202") {
    let { data } = await axios.post("/auth/register-tutor", userData);
    console.log(`Tutor Data ${data}`);
    return data;
  }
};

const createCourse = async ({ courseTitle, courseImage }) => {
  let courseData = {
    courseTitle,
    courseImage,
  };

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data } = await axios.post("course/new-course", courseData, config);
  console.log(`CourseData created ${JSON.stringify(data)}`);
  return data;
};

export { createChapter, createCourse, registerUser };
