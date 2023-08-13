import axios from "../axios";

const createCourse = async ({ courseTitle, courseImage }) => {
  let courseData = {
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

const createUnit = async ({
  course,
  tutor,
  unitCode,
  unitName,
  unitDescription,
}) => {
  const unitData = {
    courseID: course,
    tutorID: tutor,
    unitCode: unitCode,
    unitName: unitName,
    unitDescription: unitDescription,
  };

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data: createdUnit } = await axios.post("/unit", unitData, config);
  return createdUnit;
};

const createChapter = async ({
  chapterNumber,
  chapterName,
  chapterDescription,
  unitID,
}) => {
  let chapterData = {
    unitID,
    chapterNumber,
    chapterName,
    chapterDescription,
  };
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data: createdChapter } = await axios.post(
    "/chapter",
    chapterData,
    config
  );
  return createdChapter;
};

const createLesson = async ({
  lessonNumber,
  lessonName,
  lessonUrl,
  chapterID,
}) => {
  const lessonData = {
    chapterID,
    lessonNumber: `${chapterID}-${lessonNumber}`,
    lessonName,
    lessonUrl,
  };

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data: createdLesson } = await axios.post(
    "/lesson",
    lessonData,
    config
  );
  return createdLesson;
};

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

const createResource = async ({ resourceName, resourceUrl, chapterID }) => {
  const resourceData = { resourceName, resourceUrl, chapterID };
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const { data: createdResource } = await axios.post(
    "/resources",
    resourceData,
    config
  );

  return createdResource;
};

export {
  createCourse,
  createUnit,
  createChapter,
  createLesson,
  createNotes,
  createResource,
};
