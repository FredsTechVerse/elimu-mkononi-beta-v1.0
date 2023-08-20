import axios from "../axios";
const deleteCourse = async ({ courseID }) => {
  console.log(`Course ID  for deletion passed :  ${JSON.stringify(unitID)}`);
  const { data } = await axios.delete(`/course/${courseID}`);
  return data;
};

const deleteUnit = async ({ unitID }) => {
  console.log(`Unit ID  for deletion passed :  ${JSON.stringify(unitID)}`);
  const { data } = await axios.delete(`/unit/${unitID}`);
  return data;
};

const deleteChapter = async ({ chapterID }) => {
  console.log(`User ID  for deletion passed :  ${JSON.stringify(chapterID)}`);
  const { data } = await axios.delete(`/chapter/${chapterID}`);
  return data;
};

const deleteLesson = async ({ lessonID }) => {
  console.log(
    `Resource ID  for deletion passed :  ${JSON.stringify(lessonID)}`
  );
  const { data } = await axios.delete(`/lesson/${lessonID}`);
  return data;
};

const deleteNotes = async ({ notesID }) => {
  console.log(`NotesID  for deletion passed :  ${JSON.stringify(notesID)}`);
  const { data } = await axios.delete(`/notes/${notesID}`);
  return data;
};

const deleteResource = async ({ resourceID }) => {
  console.log(
    `Resource ID  for deletion passed :  ${JSON.stringify(resourceID)}`
  );
  const { data } = await axios.delete(`/resources/${resourceID}`);
  return data;
};

export {
  deleteCourse,
  deleteUnit,
  deleteChapter,
  deleteLesson,
  deleteNotes,
  deleteResource,
};
