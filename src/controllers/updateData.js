const updateCourse = async ({ courseTitle, courseImage }) => {
  let courseData = {
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
  course,
  tutor,
  unitCode,
  unitName,
  unitDescription,
}) => {
  const unitData = {
    courseID: course,
    tutorId: tutor,
    unitCode: unitCode,
    unitName: unitName,
    unitDescription: unitDescription,
  };

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data: updatedUnit } = await axios.put("/unit", unitData, config);
  return updatedUnit;
};

const updateChapter = async ({
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

  const { data: updatedChapter } = await axios.put(
    "/chapter",
    chapterData,
    config
  );
  return updatedChapter;
};

const updateLesson = async ({
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

  const { data: updatedLesson } = await axios.put(
    "/lesson",
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

  const { data: updatedNotes } = await axios.put("/notes", notesData, config);
  return updatedNotes;
};

const updateResource = async ({ resourceName, resourceUrl, chapterID }) => {
  const resourceData = { resourceName, resourceUrl, chapterID };
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const { data: createdResource } = await axios.put(
    "/resources",
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
