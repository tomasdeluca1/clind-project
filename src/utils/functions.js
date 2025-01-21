export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export async function sendNotifyMeNotification() {
  // Send the notification event to our servers
  await fetch(
    `https://sendpushnotification-tpbm5r3g3q-uc.a.run.app?uid=${process.env.NOTIFY_ME_UID}&projectid=${process.env.NOTIFY_ME_PROJECTID}&eventType=test`,
    {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOTIFY_ME_API_KEY,
      },
    }
  )
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}
