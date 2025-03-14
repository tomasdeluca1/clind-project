import { NextApiResponse } from "next";

export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function sendNotifyMeNotification(): Promise<void> {
  try {
    console.log("Sending notification...");

    await fetch("https://sendpushnotification-tpbm5r3g3q-uc.a.run.app", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOTIFY_ME_API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: process.env.NOTIFY_ME_UID || "",
        projectid: process.env.NOTIFY_ME_PROJECTID || "",
        eventType: "newLogin",
      }),
    });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

export function handleApiError(res: NextApiResponse, error: unknown): void {
  console.error("API Error:", error);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
}
