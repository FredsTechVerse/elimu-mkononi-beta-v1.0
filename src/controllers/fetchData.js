import axios from "../axios";
const accessToken = localStorage.getItem("accessToken");
const verifyAccess = async () => {
  const { data: accessData } = await axios.get("/auth/verify-access");
  return accessData.message;
};

const fetchCoursesData = async () => {
  const { data: coursesData } = await axios.get("/course/all-courses");
  return coursesData;
};

const fetchCourseData = async (courseID) => {
  console.log(courseID);
  const { data: courseData } = await axios.get(`/course/${courseID}`);
  return courseData;
};

const fetchLessonNotes = async (notesID) => {
  const { data: notesData } = await axios.get(`notes/${notesID}`);
  return notesData.content;
};

const fetchUserDetails = async (role) => {
  if ((role = "EM-202")) {
    const { data: tutorData } = await axios.get("/auth/tutor", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return tutorData;
  } else if ((role = "EM-203")) {
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

const fetchUnitData = async (unitID) => {
  const { data: unitData } = await axios.get(`/unit/${unitID}`);
  return unitData;
};

export {
  fetchCoursesData,
  fetchCourseData,
  fetchUnitData,
  fetchUsersData,
  fetchLessonNotes,
  fetchUserDetails,
  verifyAccess,
};
