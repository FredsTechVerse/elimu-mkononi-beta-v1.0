import axios from "../axios";

const loginUser = async ({ firstName, password }) => {
  console.log("Loggin in the user");
  const credentials = { firstName, password };
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const { data } = await axios.post("/auth/login", credentials, config);
  return data;
};

const createResource = async ({ resourceName, resourceUrl }) => {
  const resourceData = { resourceName, resourceUrl };
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const { data } = await axios.post(
    "/resources/new-resource",
    resourceData,
    config
  );

  return data;
};
const createChapter = async ({
  chapterNumber,
  chapterName,
  chapterDescription,
  unitID,
}) => {
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
};

const createUnit = async ({
  course,
  tutor,
  unitCode,
  unitName,
  unitDescription,
}) => {
  const unitData = {
    courseID: course,
    tutorId: tutor,
    unitCode: unitCode,
    unitName: unitName,
    unitDescription: unitDescription,
  };

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data } = await axios.post("/unit/new-unit", unitData, config);
  return data;
};
const createLesson = async ({
  lessonNumber,
  lessonName,
  lessonUrl,
  chapterID,
}) => {
  const lessonData = {
    chapterID,
    lessonNumber: `${chapterID}-${lessonNumber}`,
    lessonName,
    lessonUrl,
  };

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data } = await axios.post("/lesson/new-lesson", lessonData, config);
  return data;
};
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

export {
  createChapter,
  createCourse,
  registerUser,
  createLesson,
  loginUser,
  createResource,
  createUnit,
};
