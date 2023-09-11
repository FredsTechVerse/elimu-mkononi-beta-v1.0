import axios from "../axios";

const fetchEmails = async () => {
  const { data: unitData } = await axios.get(`/email/all-emails`);
  return unitData;
};

export { fetchEmails };
