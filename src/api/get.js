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
  console.log(`The role that has been passed ${role}`);
  if (role === "EM-203") {
    let { data } = await axios.get("/auth/all-admins");
    return data;
  } else if (role === "EM-201") {
    let { data } = await axios.get("/auth/all-students");
    console.log(`Student Data ${data}`);
    return data;
  } else if (role === "EM-202") {
    let { data } = await axios.get("/auth/all-tutors");
    console.log(`Tutor Data ${data}`);
    return data;
  }
};

const fetchUnitData = async (unitID) => {
  console.log(unitID);
  const { data: unitData } = await axios.get(`/unit/${unitID}`);
  return unitData;
};

export { fetchCoursesData, fetchCourseData, fetchUnitData, fetchUsersData };
