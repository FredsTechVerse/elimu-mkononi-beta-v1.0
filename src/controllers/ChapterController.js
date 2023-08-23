import axios from "../axios";
const createChapter = async ({
  chapterNumber,
  chapterName,
  chapterDescription,
  unitID,
}) => {
  const chapterData = {
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

const fetchChapterData = async ({ chapterID }) => {
  const { data: courseData } = await axios.get(`/chapter/${chapterID}`);
  return courseData;
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

const deleteChapter = async ({ chapterID }) => {
  console.log(
    `Chapter ID  for deletion passed :  ${JSON.stringify(chapterID)}`
  );
  const { data } = await axios.delete(`/chapter/${chapterID}`);
  return data;
};

export { createChapter, fetchChapterData, updateChapter, deleteChapter };
