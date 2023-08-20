import axios from "../axios";
const updateCourse = async ({ courseTitle, courseImage }) => {
  const courseData = {
    courseTitle,
    courseImage,
  };
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data: updatedCourse } = await axios.put(
    "/course",
    courseData,
    config
  );

  return updatedCourse;
};

const updateUnit = async ({
  tutor,
  unitID,
  unitCode,
  unitName,
  unitDescription,
}) => {
  const unitData = {
    tutorID: tutor,
    unitCode: unitCode,
    unitName: unitName,
    unitDescription: unitDescription,
  };

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data: updatedUnit } = await axios.put(
    `/unit/${unitID}`,
    unitData,
    config
  );
  return updatedUnit;
};

const updateChapter = async ({
  chapterID,
  chapterNumber,
  chapterName,
  chapterDescription,
}) => {
  const chapterData = {
    chapterNumber,
    chapterName,
    chapterDescription,
  };
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data: updatedChapter } = await axios.put(
    `/chapter/${chapterID}`,
    chapterData,
    config
  );
  return updatedChapter;
};

const updateLesson = async ({
  lessonID,
  lessonName,
  lessonUrl,
  lessonNumber,
}) => {
  const lessonData = {
    lessonNumber,
    lessonName,
    lessonUrl,
  };

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data: updatedLesson } = await axios.put(
    `/lesson/${lessonID}`,
    lessonData,
    config
  );
  return updatedLesson;
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
  return updatedNotes;
};

const updateResource = async ({ resourceName, resourceUrl, resourceID }) => {
  const resourceData = { resourceName, resourceUrl };
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const { data: createdResource } = await axios.put(
    `/resources/${resourceID}`,
    resourceData,
    config
  );

  return createdResource;
};

export {
  updateCourse,
  updateUnit,
  updateChapter,
  updateLesson,
  updateNotes,
  updateResource,
};
