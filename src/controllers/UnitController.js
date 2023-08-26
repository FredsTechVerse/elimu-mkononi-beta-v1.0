import axios from "../axios";
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

const fetchUnitData = async ({ unitID }) => {
  console.log({ unitID });
  const { data: unitData } = await axios.get(`/unit/${unitID}`);
  return unitData;
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

const deleteUnit = async ({ unitID }) => {
  console.log(`Unit ID  for deletion passed :  ${JSON.stringify(unitID)}`);
  const { data } = await axios.delete(`/unit/${unitID}`);
  return data;
};

export { createUnit, fetchUnitData, updateUnit, deleteUnit };
