import axios from "../axios";
const deleteCourse = async ({ courseID }) => {
  console.log(`Course ID  for deletion passed :  ${JSON.stringify(courseID)}`);
  const { data } = await axios.delete(`/course/${courseID}`);
  return data;
};
const deleteFile = async ({ fileKey }) => {
  console.log(`File key  for deletion to passed :  ${JSON.stringify(fileKey)}`);
  const { data } = await axios.delete(`/file/${fileKey}`);
  return data;
};

const deleteUnit = async ({ unitID }) => {
  console.log(`Unit ID  for deletion passed :  ${JSON.stringify(unitID)}`);
  const { data } = await axios.delete(`/unit/${unitID}`);
  return data;
};

const deleteChapter = async ({ chapterID }) => {
  console.log(
    `Chapter ID  for deletion passed :  ${JSON.stringify(chapterID)}`
  );
  const { data } = await axios.delete(`/chapter/${chapterID}`);
  return data;
};

const deleteLesson = async ({ lessonID }) => {
  if (lessonID) {
    console.log(
      `Lesson ID  for deletion passed :  ${JSON.stringify(lessonID)}`
    );
    const { data } = await axios.delete(`/lesson/${lessonID}`);
    return data;
  }
  return "";
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
  deleteFile,
  deleteLesson,
  deleteNotes,
  deleteResource,
};
