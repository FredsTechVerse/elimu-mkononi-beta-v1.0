const deleteCourse = async ({ courseID }) => {
  console.log(`Course ID  for deletion passed :  ${JSON.stringify(unitID)}`);
  await axios.delete(`/course/${courseID}`);
};

const deleteUnit = async ({ unitID }) => {
  console.log(`Unit ID  for deletion passed :  ${JSON.stringify(unitID)}`);
  await axios.delete(`/unit/${unitID}`);
};

const deleteChapter = async ({ chapterID }) => {
  console.log(`User ID  for deletion passed :  ${JSON.stringify(chapterID)}`);
  await axios.delete(`/chapter/${chapterID}`);
};

const deleteLesson = async ({ lessonID }) => {
  console.log(
    `Resource ID  for deletion passed :  ${JSON.stringify(lessonID)}`
  );
  await axios.delete(`/lesson/${lessonID}`);
};

const deleteNotes = async ({ notesID }) => {
  console.log(`NotesID  for deletion passed :  ${JSON.stringify(notesID)}`);
  await axios.delete(`/notes/${notesID}`);
};

const deleteResource = async ({ resourceID }) => {
  console.log(
    `Resource ID  for deletion passed :  ${JSON.stringify(resourceID)}`
  );
  await axios.delete(`/resources/${resourceID}`);
};

export {
  deleteCourse,
  deleteUnit,
  deleteChapter,
  deleteLesson,
  deleteNotes,
  deleteResource,
};
