import axios from "axios";

const fetchMessageData = async () => {};

const messageUser = async ({ message, recipient }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        apikey: "9d1d8bb393c14550a5dfae8a2a1d5bd3",
      },
    };
    const smsPayload = {
      phone: "0112615416",
      message: message,
      recipient: [recipient],
    };

    const { data } = await axios.post(
      "https://bulk-sms-production.up.railway.app/api/v1/sms/send",
      smsPayload,
      config
    );

    console.log(`SMS response data ${JSON.stringify(data)}`);
  } catch (err) {
    // I will only invoke users attention if an error is present.
    console.log(`SMS send error ${JSON.stringify(err)}`);
  }
};

export { messageUser, fetchMessageData };
