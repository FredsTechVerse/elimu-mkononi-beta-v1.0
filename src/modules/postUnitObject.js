import axios from "../axios";
//   A FUNCTION THAT CREATES OUR POST OBJECT
//==========================================

const postObject = async ({
  course,
  tutor,
  unitCode,
  unitName,
  unitDescription,
}) => {
  const formData = {
    courseId: course,
    tutorId: tutor,
    unitCode: unitCode,
    unitName: unitName,
    unitDescription: unitDescription,
  };

  // REQUEST CONFIG.
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  // AXIOS REQUEST.
  try {
    const response = await axios.post("/unit/new-unit", formData, config);
    return response;
  } catch (err) {
    let { data } = err.response;
    console.log(JSON.stringify(data));
  }
};

export { postObject };
