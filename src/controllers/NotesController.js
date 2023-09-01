import axios from "../axios";

const createNotes = async ({ lessonNotes, lessonID }) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const notesData = {
    lessonNotes: lessonNotes,
    lessonID: lessonID,
  };
  const { data: createdNotes } = await axios.post("/notes", notesData, config);
  return createdNotes;
};

const fetchLessonNotes = async ({ notesID }) => {
  if (notesID) {
    const { data: notesData } = await axios.get(`notes/${notesID}`);
    return notesData.content;
  }
  return null;
};

const updateNotes = async ({ lessonNotes, notesID }) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const notesData = {
    lessonNotes: lessonNotes,
    notesID: notesID,
  };

  const { data: updatedNotes } = await axios.put(
    `/notes/${notesID}`,
    notesData,
    config
  );
  console.log({ updatedNotes });
  return updatedNotes;
};

const deleteNotes = async ({ notesID }) => {
  const { data } = await axios.delete(`/notes/${notesID}`);
  return data;
};

export { createNotes, fetchLessonNotes, updateNotes, deleteNotes };
