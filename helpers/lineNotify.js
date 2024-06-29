const axios = require("axios");
require("dotenv").config();

const LINE_NOTIFY_TOKEN = process.env.LINE_NOTIFY_TOKEN;

async function sendLineNotification(message) {
  try {
    await axios.post(
      "https://notify-api.line.me/api/notify",
      `message=${message}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${LINE_NOTIFY_TOKEN}`,
        },
      }
    );
    console.log("LINE notification sent successfully");
  } catch (error) {
    console.error("Error sending LINE notification:", error);
  }
}

module.exports = { sendLineNotification };
