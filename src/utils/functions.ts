import { NextApiResponse } from "next";

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function sendNotifyMeNotification(): Promise<void> {
  try {
    await fetch(process.env.NOTIFY_ME_WEBHOOK_URL || "", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: "New user registered on Clind!",
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
