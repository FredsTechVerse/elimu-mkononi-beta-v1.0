import axios from "../axios";

async function createChapter({
  chapterNumber,
  chapterName,
  chapterDescription,
  unitID,
}) {
  let chapterData = {
    unitID,
    chapterNumber,
    chapterName,
    chapterDescription,
  };
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  console.log(
    ` Chapter Data going to the database ${JSON.stringify(chapterData)}`
  );

  const { data } = await axios.post(
    "/chapter/new-chapter",
    chapterData,
    config
  );
  console.log(JSON.stringify(data));
  return data;
}

export { createChapter };
