import axios from "../axios";

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

const createResource = async ({ resourceName, resourceUrl }) => {
  const resourceData = { resourceName, resourceUrl };
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const { data: createdResource } = await axios.post(
    "/resources/new-resource",
    resourceData,
    config
  );

  return createdResource;
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

  const { data: createdChapter } = await axios.post(
    "/chapter/new-chapter",
    chapterData,
    config
  );
  return createdChapter;
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

  const { data: createdUnit } = await axios.post(
    "/unit/new-unit",
    unitData,
    config
  );
  return createdUnit;
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

  console.log(
    `Lesson data to be passed to server ${JSON.stringify(lessonData)}`
  );

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data: createdLesson } = await axios.post(
    "/lesson/new-lesson",
    lessonData,
    config
  );
  return createdLesson;
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
    await axios.post("/auth/register-admin", userData);
    return;
  } else if (role === "EM-201") {
    await axios.post("/auth/register-student", userData);
    return;
  } else if (role === "EM-202") {
    await axios.post("/auth/register-tutor", userData);
    return;
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

  console.log(JSON.stringify(courseData));
  const { data: createdCourse } = await axios.post(
    "course/new-course",
    courseData,
    config
  );

  return createdCourse;
};

const createNotes = async ({ lessonNotes, lessonID }) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const notesData = {
    lessonNotes: lessonNotes,
    lessonID: lessonID,
  };
  console.log(`Notes creation operation set to ${JSON.stringify(notesData)}`);
  const { data: createdNotes } = await axios.post(
    "/notes/newNotes",
    notesData,
    config
  );
  return createdNotes;
};

const updateNotes = async ({ lessonNotes, notesID }) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const notesData = {
    lessonNotes: lessonNotes,
    notesID: notesID,
  };

  console.log(`Notes update operation to  ${JSON.stringify(notesData)}`);

  const { data: updatedNotes } = await axios.put(
    "/notes/updateNotes",
    notesData,
    config
  );
  return updatedNotes;
};

export {
  createChapter,
  createCourse,
  registerUser,
  createLesson,
  loginUser,
  createResource,
  createUnit,
  createNotes,
  updateNotes,
  logoutUser,
};
