import axios from "../axios";

const fetchCoursesData = async () => {
  const { data: coursesData } = await axios.get("/course/all-courses");
  return coursesData;
};

const fetchCourseData = async (courseID) => {
  const { data: courseData } = await axios.get(`/course/${courseID}`);
  return courseData;
};

const fetchUnitData = async (unitID) => {
  console.log(unitID);
  const { data: unitData } = await axios.get(`/unit/${unitID}`);
  return unitData;
};

export { fetchCoursesData, fetchCourseData, fetchUnitData };
