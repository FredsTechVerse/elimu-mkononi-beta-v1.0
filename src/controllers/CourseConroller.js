import axios from "../axios";
const createCourse = async ({ courseTitle, courseImage }) => {
  const courseData = {
    courseTitle,
    courseImage,
  };
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data: createdCourse } = await axios.post(
    "/course",
    courseData,
    config
  );

  return createdCourse;
};

const fetchCoursesData = async () => {
  const { data: coursesData } = await axios.get("/course/all-courses");
  return coursesData;
};

const fetchCourseData = async ({ courseID }) => {
  const { data: courseData } = await axios.get(`/course/${courseID}`);
  return courseData;
};

const updateCourse = async ({
  courseTitle,
  courseImage,
  courseID,
  // oldImage,
}) => {
  const courseData = {
    courseTitle,
    courseImage,
  };
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data: updatedCourse } = await axios.put(
    `/course/${courseID}`,
    courseData,
    config
  );

  return updatedCourse;
};

const deleteCourse = async ({ courseID }) => {
  console.log(`Course ID  for deletion passed :  ${JSON.stringify(courseID)}`);
  const { data } = await axios.delete(`/course/${courseID}`);
  return data;
};

export {
  createCourse,
  fetchCourseData,
  fetchCoursesData,
  updateCourse,
  deleteCourse,
};