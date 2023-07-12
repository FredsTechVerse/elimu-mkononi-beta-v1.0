import axios from "../axios";

const loginUser = async ({ firstName, password }) => {
  const credentials = { firstName, password };
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const { data } = await axios.post("/auth/login", credentials, config);
  console.log(JSON.stringify(data));
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

  const { data } = await axios.post(
    "/chapter/new-chapter",
    chapterData,
    config
  );
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
  thumbnails,
}) => {
  const lessonData = {
    chapterID,
    lessonNumber: `${chapterID}-${lessonNumber}`,
    lessonName,
    lessonUrl,
    thumbnails,
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
  return data;
};

const createNotes = async (content, lessonID) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const notesData = {
    lessonNotes: content,
    lessonID: lessonID,
  };

  const { data } = await axios.post("/notes/newNotes", notesData, config);
  return data;
};

const updateNotes = async (content, notesID) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const notesData = {
    lessonNotes: content,
    notesID: notesID,
  };

  const { data } = await axios.put("/notes/updateNotes", notesData, config);
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
  createNotes,
  updateNotes,
};
