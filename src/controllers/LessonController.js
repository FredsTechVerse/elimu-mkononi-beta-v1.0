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

const fetchLessonData = async ({ lessonID }) => {
  console.log("Fetching lesson Data");
  const { data: lessonData } = await axios.get(`/lesson/${lessonID}`);
  console.log({ retrievedLessonData: lessonData });

  return lessonData;
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

const deleteLesson = async ({ lessonID }) => {
  if (lessonID) {
    console.log(
      `Lesson ID  for deletion passed :  ${JSON.stringify(lessonID)}`
    );
    const { data } = await axios.delete(`/lesson/${lessonID}`);
    return data;
  }
};

export { createLesson, fetchLessonData, updateLesson, deleteLesson };
