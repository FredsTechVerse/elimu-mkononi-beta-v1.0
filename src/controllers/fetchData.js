import axios from "../axios";
const accessToken = localStorage.getItem("accessToken");

const verifyAccess = async () => {
  const { data: accessData } = await axios.get("/auth/verify-access");
  return accessData.message;
};

const getYoutubeAuthorizationURI = async () => {
  const { data: authorizationUri } = await axios.get("/oAuth/authorizationUri");
  return authorizationUri;
};

const fetchAllUsersData = async () => {
  const { data: usersData } = await axios.get("/auth/all-users");
  return usersData;
};

const fetchUserDetails = async (role) => {
  if (role === "EM-202") {
    const { data: tutorData } = await axios.get("/auth/tutor", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return tutorData;
  } else if (role === "EM-203") {
    const { data: adminData } = await axios.get("/auth/admin", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return adminData;
  }
};

const fetchUsersData = async (role) => {
  if (role === "EM-203") {
    let { data: adminData } = await axios.get("/auth/all-admins");
    return adminData;
  } else if (role === "EM-201") {
    let { data: studentData } = await axios.get("/auth/all-students");
    return studentData;
  } else if (role === "EM-202") {
    let { data: tutorData } = await axios.get("/auth/all-tutors");
    return tutorData;
  }
};

const fetchUserData = async ({ role, userID }) => {
  console.log(`User ID sent to server ${(role, userID)}`);
  if (role === "EM-203") {
    let { data: adminData } = await axios.get(`/auth/admin/${userID}`);
    return adminData;
  } else if (role === "EM-202") {
    let { data: tutorData } = await axios.get(`/auth/tutor/${userID}`);
    return tutorData;
  } else if (role === "EM-201") {
    let { data: studentData } = await axios.get(`/auth/student/${userID}`);
    return studentData;
  }
};

const fetchCoursesData = async () => {
  const { data: coursesData } = await axios.get("/course/all-courses");
  return coursesData;
};

const fetchCourseData = async ({ courseID }) => {
  const { data: courseData } = await axios.get(`/course/${courseID}`);
  return courseData;
};

const fetchChapterData = async ({ chapterID }) => {
  const { data: courseData } = await axios.get(`/chapter/${chapterID}`);
  return courseData;
};

const fetchLessonData = async ({ lessonID }) => {
  console.log("Fetching lesson Data");
  const { data: lessonData } = await axios.get(`/lesson/${lessonID}`);
  console.log({ retrievedLessonData: lessonData });

  return lessonData;
};

const fetchLessonNotes = async ({ notesID }) => {
  if (notesID) {
    const { data: notesData } = await axios.get(`notes/${notesID}`);
    return notesData.content;
  }
  return null;
};

const fetchUnitData = async ({ unitID }) => {
  console.log({ unitID });
  const { data: unitData } = await axios.get(`/unit/${unitID}`);
  return unitData;
};

export {
  verifyAccess,
  getYoutubeAuthorizationURI,
  fetchAllUsersData,
  fetchCoursesData,
  fetchCourseData,
  fetchChapterData,
  fetchUnitData,
  fetchLessonData,
  fetchLessonNotes,
  fetchUserData,
  fetchUsersData,
  fetchUserDetails,
};
