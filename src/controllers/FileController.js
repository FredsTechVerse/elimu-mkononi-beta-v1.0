import axios from "../axios";

const deleteFile = async ({ fileKey }) => {
  console.log(`File key  for deletion to passed :  ${JSON.stringify(fileKey)}`);
  const { data } = await axios.delete(`/file/${fileKey}`);
  return data;
};
export { deleteFile };
