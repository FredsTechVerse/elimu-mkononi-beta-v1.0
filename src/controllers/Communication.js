import axios from "../axios";

const fetchMessagesData = async () => {};

const messageUser = async ({ message, recipient }) => {
  console.log({ message, recipient });
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

  console.log(`SMS response data ${JSON.stringify(sentMessages)}`);
  return sentMessages;
};

export { messageUser, fetchMessagesData };
