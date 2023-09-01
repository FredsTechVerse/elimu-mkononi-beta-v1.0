import axios from "../axios";

const deleteFile = async ({ fileKey }) => {
  const { data } = await axios.delete(`/file/${fileKey}`);
  return data;
};
export { deleteFile };
