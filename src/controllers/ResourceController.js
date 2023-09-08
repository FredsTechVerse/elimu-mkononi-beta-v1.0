import axios from "../axios";
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

const deleteResource = async ({ resourceID, resourceUrl }) => {
  const { data } = await axios.delete(`/resources/${resourceID}`, {
    data: { resourceUrl },
  });
  return data;
};

export { createResource, updateResource, deleteResource };
