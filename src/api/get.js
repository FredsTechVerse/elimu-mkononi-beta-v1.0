import axios from "../axios";

const fetchCoursesData = async () => {
  const { data: coursesData } = await axios.get("/course/all-courses");
  return coursesData;
};

const fetchCourseData = async (courseID) => {
  const { data: courseData } = await axios.get(`/course/${courseID}`);
  return courseData;
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

export { fetchCoursesData, fetchCourseData, fetchUnitData, fetchUsersData };
