import axios from "../axios";

const fetchMessagesData = async () => {};

const messageUser = async ({ message, recipient }) => {
  const messagePayload = {
    recipients: [recipient],
    message,
  };

  const messageConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data: sentMessages } = await axios.post(
    "/message",
    messagePayload,
    messageConfig
  );

  return sentMessages;
};

export { messageUser, fetchMessagesData };
