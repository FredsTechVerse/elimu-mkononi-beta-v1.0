import axios from "../axios";
const messageUser = async ({
  message,
  contact = null,
  recipient = null,
  email = null,
}) => {
  console.log({
    message,
    contact,
    recipient,
    email,
  });
  const messageConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (recipient === "other") {
    const messagePayload = {
      recipients: [contact],
      email,
      message,
      role: "other",
    };
    const { data: sentMessages } = await axios.post(
      "/message",
      messagePayload,
      messageConfig
    );

    return sentMessages;
  } else if (recipient === "all-admins") {
    const messagePayload = {
      message,
      role: "EM-203",
    };
    const { data: sentMessages } = await axios.post(
      "/message/all-admins",
      messagePayload,
      messageConfig
    );

    return sentMessages;
  } else if (recipient === "all-tutors") {
    const messagePayload = {
      message,
      role: "EM-202",
    };
    const { data: sentMessages } = await axios.post(
      "/message/all-tutors",
      messagePayload,
      messageConfig
    );

    return sentMessages;
  } else if (recipient === "all-students") {
    const messagePayload = {
      message,
      role: "EM-201",
    };
    const { data: sentMessages } = await axios.post(
      "/message/all-students",
      messagePayload,
      messageConfig
    );

    return sentMessages;
  }
};

const fetchMessageData = async ({ messageID }) => {
  return {};
};

const fetchMessages = async () => {
  const { data: unitData } = await axios.get(`/message/all-messages`);
  return unitData;
};

export { fetchMessages, fetchMessageData, messageUser };
